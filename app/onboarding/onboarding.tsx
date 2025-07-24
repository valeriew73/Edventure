"use client";

import { FileUpIcon, NotebookTextIcon } from "lucide-react";
import { useState } from "react";

import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import UserCVUpload from "@/components/user-cv-upload";
import UserForm from "@/components/user-form";
import { SubmitHandler } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { setUserMutation } from "../action-server/user";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { extractPDFWithRAG } from "../action-server/rag";

type UserInputs = Omit<UserMetadata, "userId" | "createdAt" | "updatedAt">;

export default function Onboarding({ userId }: { userId: string }) {
    const router = useRouter();

    const [selectedOption, setSelectedOption] = useState<"cv" | "form" | undefined>(undefined);

    const { mutate: setUser } = useMutation({
        mutationFn: setUserMutation,
        onSuccess: () => toast.success("User data saved successfully"),
        onError: (error) => {
            // console.error("Error saving user data:", error);
            toast.error("Failed to save user data");
        },
    });

    const handleDialogChange = () => setSelectedOption(undefined);

    const onSubmit: SubmitHandler<UserInputs> = (data) => {
        setUser({ cvData: data, userId });
    };

    const handleCVChange = async (url: string) => {
        const extracted = await extractPDFWithRAG(url);

        // console.log("Extracted data:", extracted);

        setUser({ cvUrl: url, userId, cvEmbeddingId: extracted.uniqueId });

        // setUser({ cvUrl: url, userId });

        setSelectedOption(undefined);

        router.replace("/");
    };

    return (
        <div className="space-y-5 my-20">
            <h1 className="text-6xl font-black text-center">Welcome!</h1>
            <p className="text-center text-lg font-light">Choose one to continue registration process</p>

            <div className="flex gap-4 items-center justify-center">
                <Dialog open={selectedOption === "cv"} onOpenChange={handleDialogChange}>
                    <DialogTrigger>
                        <Card
                            onClick={(e) => {
                                e.preventDefault();
                                setSelectedOption("cv")
                            }}
                            className="size-56 cursor-pointer hover:shadow-xl transition"
                        >
                            <CardContent className="flex flex-col items-center gap-4 justify-center h-full">
                                <FileUpIcon className="size-20" />
                                <p className="text-lg font-semibold">Upload CV</p>
                            </CardContent>
                        </Card>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>
                                Upload your CV
                            </DialogTitle>
                        </DialogHeader>

                        <UserCVUpload onChange={handleCVChange} userId={userId} />
                    </DialogContent>
                </Dialog>

                <Dialog open={selectedOption === "form"} onOpenChange={handleDialogChange}>
                    <DialogTrigger>
                        <Card
                            onClick={(e) => {
                                e.preventDefault();
                                setSelectedOption("form")
                            }}
                            className="size-56 cursor-pointer hover:shadow-xl transition"
                        >
                            <CardContent className="flex flex-col items-center gap-4 justify-center h-full">
                                <NotebookTextIcon className="size-20" />
                                <p className="text-lg font-semibold">Fill Form</p>
                            </CardContent>
                        </Card>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>
                                Fill the Registration Form
                            </DialogTitle>
                        </DialogHeader>

                        <UserForm onSubmit={onSubmit} />
                    </DialogContent>
                </Dialog>

            </div>
        </div>
    )
}