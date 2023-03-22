"use client";

import { FormEventHandler, RefObject, useRef, useState } from "react";

export interface UseFormBasicInfo {
    handleSubmit: FormEventHandler<HTMLFormElement>;
    loading: boolean;
    formRef: RefObject<HTMLFormElement>;
}

const useFormBasicInfo = (): UseFormBasicInfo => {
    const [loading, setLoading] = useState(false);
    const formRef = useRef<HTMLFormElement>(null);
    const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        setLoading(true);
        const form = e.target as HTMLFormElement;
        const data = new FormData(form);

        const url = `${process.env.NEXT_PUBLIC_API_BASE_FETCH_URL}/api/personal-info/basic-info`;
        try {
            const res = await fetch(url, {
                method: "PUT",
                body: data,
            });
            if (!res.ok) {
                throw new Error(`Error saving. ${await res.text()}`);
            }
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
        setLoading(false);
    };
    return { handleSubmit, loading, formRef };
};

export default useFormBasicInfo;
