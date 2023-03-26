"use client";

import getMissingProperties from "@/helpers/getMissingParams";
import { FormEventHandler, RefObject, useRef, useState } from "react";

export interface UseFormFileUpload {
    handleSubmit: FormEventHandler<HTMLFormElement>;
    loading: boolean;
    formRef: RefObject<HTMLFormElement>;
}

const useFormFileUpload = (): UseFormFileUpload => {
    const [loading, setLoading] = useState(false);
    const formRef = useRef<HTMLFormElement>(null);
    const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        setLoading(true);
        const form = e.target as HTMLFormElement;
        const data = new FormData(form);
        const src = data.get("filepath-src")?.valueOf() as File | undefined;
        const filetype = data.get("file-type")?.toString();
        const lang = data.get("file-lang")?.toString();

        if (src && filetype && lang) {
            const url = `/api/files?type=${filetype}&lang=${lang}&name=${src?.name}`;
            try {
                const res = await fetch(url, {
                    method: "POST",
                    headers: {
                        // Content-Type may need to be completely **omitted**
                        // or you may need something
                        "Content-Type": "multipart/form-data",
                    },
                    body: src,
                });
                if (!res.ok) {
                    throw new Error(
                        `Error uploading file. ${await res.text()}`
                    );
                }
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        } else {
            const missingProperties = getMissingProperties({
                src,
                filetype,
                lang,
            });
            console.error(
                `Error uploading file. Missing params: ${missingProperties.join(
                    ", "
                )}`
            );
        }

        setLoading(false);
    };
    return { handleSubmit, loading, formRef };
};

export default useFormFileUpload;
