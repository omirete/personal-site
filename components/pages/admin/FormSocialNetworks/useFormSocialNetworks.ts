"use client";

import { FormEventHandler, RefObject, useRef, useState } from "react";

export interface UseFormSocialNetworks {
    handleSubmit: FormEventHandler<HTMLFormElement>;
    loading: boolean;
    formRef: RefObject<HTMLFormElement>;
}

const useFormSocialNetworks = (): UseFormSocialNetworks => {
    const [loading, setLoading] = useState(false);
    const formRef = useRef<HTMLFormElement>(null);
    const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        setLoading(true);
        const form = e.target as HTMLFormElement;
        const data = new FormData(form);

        const url = `/api/personal-info/social-networks`;
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

export default useFormSocialNetworks;
