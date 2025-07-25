"use client";

import { FileUpIcon, NotebookTextIcon } from "lucide-react";
import { useEffect, useState } from "react";

import { Card, CardContent } from "@/components/ui/card"
import {
    Dialog,
    DialogContent,
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
import { extractPDFWithRAG, extractPDFWithRAGMutation } from "../action-server/rag";

type UserInputs = Omit<UserMetadata, "userId" | "createdAt" | "updatedAt">;


export default function Onboarding({ userId }: { userId: string }) {
    const router = useRouter();

    const [cvDialogOpen, setCvDialogOpen] = useState(false);
    const [formDialogOpen, setFormDialogOpen] = useState(false);

    const { mutate: setUser } = useMutation({
        mutationFn: setUserMutation,
        onSuccess: () => {
            setCvDialogOpen(false);
            setFormDialogOpen(false);
            toast.success("User data saved successfully")
            router.push("/");
        },
        onError: (error) => toast.error("Failed to save user data"),
    });

    const onSubmit: SubmitHandler<UserInputs> = (data) => {
        setUser({ cvData: data, userId, onboardingCompleted: true });
    };

    const handleCVChange = async (url: string) => {
        await extractPDFWithRAG(url);

        setUser({ cvUrl: url, userId, onboardingCompleted: true });
    };

    return (
        <div className="space-y-5 my-20">
            <h1 className="text-6xl font-black text-center">Welcome!</h1>
            <p className="text-center text-lg font-light">Choose one to continue registration process</p>

            <div className="flex gap-4 items-center justify-center">
                <Dialog open={cvDialogOpen} onOpenChange={(open) => setCvDialogOpen(open)}>
                    <DialogTrigger asChild>
                        <Card className="size-56 cursor-pointer hover:shadow-xl transition">
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

                <Dialog open={formDialogOpen} onOpenChange={(open) => setFormDialogOpen(open)}>
                    <DialogTrigger asChild>
                        <Card className="size-56 cursor-pointer hover:shadow-xl transition">
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