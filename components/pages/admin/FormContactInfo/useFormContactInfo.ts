"use client";

import { FormEventHandler, RefObject, useRef, useState } from "react";

export interface UseFormContactInfo {
    handleSubmit: FormEventHandler<HTMLFormElement>;
    loading: boolean;
    formRef: RefObject<HTMLFormElement>;
}

const useFormContactInfo = (): UseFormContactInfo => {
    const [loading, setLoading] = useState(false);
    const formRef = useRef<HTMLFormElement>(null);
    const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        setLoading(true);
        const form = e.target as HTMLFormElement;
        const data = new FormData(form);

        const url = `${process.env.NEXT_PUBLIC_API_BASE_FETCH_URL}/api/personal-info/contact-info`;
        try {
            const res = await fetch(url, {
                method: "PUT",
                body: data,
            });
            const res_text = await res.text();
            if (!res.ok) {
                throw new Error(`Error saving. ${res_text}`);
            }
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
        setLoading(false);
    };
    return { handleSubmit, loading, formRef };
};

export default useFormContactInfo;
