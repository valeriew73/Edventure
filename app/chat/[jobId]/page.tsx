"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Props {
    params: Promise<{
        jobId: string;
    }>;
}

// Mock function to simulate fetching job info
async function getJobInfo(jobId: string) {
    // In real usage, call your API or database here
    return {
        name: `Job ${jobId}`,
        link: `/jobs/${jobId}`,
    };
}

// Simulated chat messages
const mockMessages = [
    { id: 1, type: "text", content: "Hello! I'm the AI Agent." },
    { id: 2, type: "text", content: "Can I help you with something?" },
    {
        id: 3,
        type: "custom",
        content: <div className="bg-blue-100 p-2 rounded">Custom Component Injected</div>,
    },
];

export default function Page({ params }: Props) {
    const [jobInfo, setJobInfo] = useState<{ name: string; link: string } | null>(null);
    const [messages, setMessages] = useState<typeof mockMessages>(mockMessages);
    const [input, setInput] = useState("");

    useEffect(() => {
        params.then(async ({ jobId }) => {
            const info = await getJobInfo(jobId);
            setJobInfo(info);
        });
    }, [params]);

    return (
        <div className="max-w-6xl mx-auto p-4 grid grid-cols-3">
            <div className="col-span-2">

            </div>
            <div className="flex flex-col">
                {/* Top Navbar */}
                <div className="bg-gray-100 px-4 py-2 border-b flex justify-between items-center">
                    <h1 className="text-lg font-semibold">{jobInfo?.name ?? "Loading..."}</h1>
                    {jobInfo && (
                        <Link href={jobInfo.link} className="text-blue-500 underline text-sm">
                            View Job
                        </Link>
                    )}
                </div>

                {/* Chat History Area */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-white">
                    {messages.map((msg) =>
                        msg.type === "text" ? (
                            <div key={msg.id} className="bg-gray-200 p-2 rounded max-w-md">
                                {msg.content}
                            </div>
                        ) : (
                            <div key={msg.id}>{msg.content}</div>
                        )
                    )}
                </div>

                {/* Chat Input Area */}
                <div className="border-t p-4 bg-gray-50 flex gap-2">
                    <textarea
                        className="flex-1 p-2 border rounded resize-none"
                        rows={1}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type your message..."
                    />
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                        onClick={() => {
                            if (input.trim()) {
                                setMessages((prev) => [...prev, { id: Date.now(), type: "text", content: input }]);
                                setInput("");
                            }
                        }}
                    >
                        Send
                    </button>
                </div>
            </div>

        </div>
    );
}
