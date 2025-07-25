import { NextResponse } from "next/server";
import { chromium } from "playwright"; // uncomment and use as needed
import jsYaml from "js-yaml";
import fs from "fs";
import { RAGApplicationBuilder, SIMPLE_MODELS } from '@llm-tools/embedjs';
import { OpenAiEmbeddings } from '@llm-tools/embedjs-openai';
import { WebLoader } from '@llm-tools/embedjs-loader-web';
import { QdrantDb } from '@llm-tools/embedjs-qdrant';

function readCOnfig() {
    // read yaml file for config in config/spider.yaml

    const fileContents = fs.readFileSync("config/spider.yaml", "utf8");
    const config = jsYaml.load(fileContents);
    return config as SpiderConfig;
}

async function revalidateFunction() {
    const config = readCOnfig();

    const ragApplication = await new RAGApplicationBuilder()
        .setModel(SIMPLE_MODELS.OPENAI_GPT4_O)
        .setEmbeddingModel(new OpenAiEmbeddings())
        .setVectorDatabase(new QdrantDb({
            apiKey: process.env.QDRANT_API_KEY || "",
            url: process.env.QDRANT_URL || "",
            clusterName: process.env.QDRANT_CLUSTER_NAME || ""
        }))
        .build();

    try {
        const browser = await chromium.launch();
        const page = await browser.newPage();

        for (const site of config['listing-sites']) {
            // console.log(`Crawling site: ${site}`);
            await page.goto(site["url"], { timeout: 60000 });
            // get all listings email and save to database
            // const listings = await page.$$eval(site["listings"]["selector"], (elements) => {
            //     return elements.map((el) => {
            //         const item: any = {};
            //         for (const key in site["listings"]["item"]) {
            //             if (key === "link") {
            //                 item[key] = el.querySelector(site["listings"]["item"][key])?.getAttribute("href") || "";
            //             }
            //         }
            //         return item;
            //     });
            // });  

            const listings = await page.$$eval(
                site["listings"]["selector"],
                (elements, itemConfig) => {
                    return elements.map((el) => {
                        const item: any = {};
                        for (const key in itemConfig) {
                            if (key === "link") {
                                item[key] = el.querySelector(itemConfig[key])?.getAttribute("href") || "";
                            }
                        }
                        return item;
                    });
                },
                site["listings"]["item"] // <-- passed as 3rd argument to $$eval
            );

            for (const listing of listings) {
                if (listing.link) {
                    await ragApplication.addLoader(new WebLoader({ urlOrContent: listing["link"] }));
                }
            }
        }

        return true;
    } catch (error) {
        console.error("Revalidation failed:", error);
        return false;
    }
}

export async function POST(req: Request) {
    (async () => {
        const success = await revalidateFunction();
        if (!success) {
            console.error("Crawling failed in background");
        }
    })();

    return NextResponse.json({ message: "Revalidation triggered" }, { status: 200 });
}
