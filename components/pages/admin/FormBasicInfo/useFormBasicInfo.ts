"use client";
import { BasicInfo } from "@/helpers/database/collections/personalInfo/basicInfo";
import { FormEvent, RefObject, useRef, useState } from "react";

export interface UseFormBasicInfo {
    handleSubmit: (e: FormEvent<HTMLFormElement>, basicInfo: BasicInfo) => void;
    loading: boolean;
    formRef: RefObject<HTMLFormElement>;
}

const useFormBasicInfo = (): UseFormBasicInfo => {
    const [loading, setLoading] = useState(false);
    const formRef = useRef<HTMLFormElement>(null);
    const handleSubmit = async (
        e: FormEvent<HTMLFormElement>,
        basicInfo: BasicInfo
    ) => {
        e.preventDefault();
        setLoading(true);
        const url = `/api/personal-info/basic-info`;
        try {
            const res = await fetch(url, {
                method: "PUT",
                body: JSON.stringify(basicInfo),
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
