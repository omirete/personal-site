"use client";

import { upload } from "@vercel/blob/client";
import { getUploadConfig, MAX_UPLOAD_SIZE } from "@/helpers/fileStorage/uploadConfig";
import { FormEventHandler, RefObject, useRef, useState } from "react";

export interface UseFormFileUpload {
    handleSubmit: FormEventHandler<HTMLFormElement>;
    loading: boolean;
    formRef: RefObject<HTMLFormElement | null>;
    error: string | null;
    uploadedUrl: string | null;
}

const useFormFileUpload = (): UseFormFileUpload => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
    const formRef = useRef<HTMLFormElement>(null);
    const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        setLoading(true);
        setError(null);
        setUploadedUrl(null);
        try {
            const data = new FormData(form);
            const file = data.get("filepath-src");
            const type = data.get("file-type")?.toString();
            const lang = data.get("file-lang")?.toString();
            if (!(file instanceof File) || !file.size || !type || !lang) {
                throw new Error("Select a file, file type, and language.");
            }
            if (file.size > MAX_UPLOAD_SIZE) throw new Error("File must be 50 MB or smaller.");
            const config = getUploadConfig(type, lang, file.name);
            const blob = await upload(config.pathname, file, {
                access: "public",
                handleUploadUrl: "/api/files",
                clientPayload: JSON.stringify({ type, lang, name: file.name }),
                contentType: config.contentTypes.includes(file.type) ? file.type : config.contentTypes[0],
                multipart: true,
            });
            setUploadedUrl(blob.url);
            window.dispatchEvent(new Event("files-updated"));
        } catch (error) {
            setError(error instanceof Error ? error.message : "Upload failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };
    return { handleSubmit, loading, formRef, error, uploadedUrl };
};

export default useFormFileUpload;
