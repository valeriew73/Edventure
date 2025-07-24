"use client";

import {
    FileUpIcon,
    FileTextIcon,
    PencilIcon,
    Trash2Icon
} from "lucide-react";
import React, { useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { Progress } from "./ui/progress";


interface Props {
    userId: string;
    onChange: (url: string) => void;
    defaultValues?: string;
}

const UserCVUpload: React.FC<Props> = ({ userId, onChange, defaultValues }) => {
    const [cvUrl, setCvUrl] = React.useState(defaultValues);
    const [fileName, setFileName] = React.useState("");
    const [uploading, setUploading] = React.useState(false);
    const [progress, setProgress] = React.useState(0);

    const onDrop = React.useCallback(
        (acceptedFiles: File[]) => {
            const file = acceptedFiles[0];
            if (!file) return;

            const fileExt = file.name.split(".").pop();
            const storage = getStorage();
            const storageRef = ref(storage, `users/${userId}/cv.${fileExt}`);

            const uploadTask = uploadBytesResumable(storageRef, file);
            setUploading(true);
            setFileName(file.name);

            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const percent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setProgress(percent);
                },
                (error) => {
                    toast.error("Upload CV error!");
                    setUploading(false);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setCvUrl(downloadURL);
                        setUploading(false);
                    });
                }
            );
        },
        [userId, onChange]
    );

    useEffect(() => {
        if (cvUrl) {
            onChange(cvUrl);
        }
    }, [cvUrl, onChange]);

    const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
        onDrop,
        maxFiles: 1,
        maxSize: 10 * 1024 * 1024, // 10MB
        accept: {
            "application/pdf": [],
            "application/msword": [],
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document": []
        }
    });

    return (
        <form className="flex justify-center items-center">
            <div
                {...getRootProps()}
                className="w-full max-w-md rounded-xl overflow-hidden border border-dashed aspect-[3/2] bg-white/50 dark:bg-black/50 text-zinc-700 dark:text-zinc-300 relative"
            >
                <input {...getInputProps()} />

                <div className="flex flex-col w-full h-full items-center justify-center gap-3 text-muted-foreground cursor-pointer p-5">
                    {uploading ? (
                        <Progress
                            aria-label="Uploading..."
                            color="success"
                            value={progress}
                            className="w-full"
                        />
                    ) : cvUrl ? (
                        <div className="flex flex-col items-center">
                            <FileTextIcon className="w-10 h-10 mb-2" />
                            <p className="text-center text-sm">{fileName || "File uploaded"}</p>
                        </div>
                    ) : (
                        <React.Fragment>
                            <FileUpIcon className="w-10 h-10" />
                            <p className="text-center">
                                {isDragActive
                                    ? "Drop your CV here..."
                                    : "Drag and drop your CV here, or click to select"}
                            </p>
                            <p className="text-sm text-muted-foreground">.pdf, .doc, .docx</p>
                        </React.Fragment>
                    )}
                </div>
            </div>
        </form>
    );
};

export default UserCVUpload;