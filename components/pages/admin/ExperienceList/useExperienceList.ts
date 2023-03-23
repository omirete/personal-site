"use client";

import { Experience } from "@/helpers/database/ExperienceCtor";
import { useCallback, useState } from "react";

interface UseExperienceList {
    loadingId: string | undefined;
    handleUpdate: (experience: Experience) => void;
    handleDelete: (id: string) => void;
}
const useExperienceList = (): UseExperienceList => {
    const [loadingId, setLoadingId] = useState<string | undefined>(undefined);

    const handleUpdate = useCallback(async (experience: Experience) => {
        if (experience.id) {
            const url = `${process.env.NEXT_PUBLIC_API_BASE_FETCH_URL}/api/experience`;
            setLoadingId(experience.id);
            const res = await fetch(url, {
                method: "PUT",
                body: JSON.stringify(experience),
            });
            if (res.status === 200) {
                alert("Experience updated correctly.");
                window.location.reload();
            } else {
                alert(
                    `Could not update experience. Error: ${await res.text()}`
                );
            }
            setLoadingId(undefined);
        } else {
            alert(`Could not update experience. Error: "Missing id"}`);
        }
    }, []);
    const handleDelete = useCallback(async (id: string) => {
        if (id) {
            const url = `${process.env.NEXT_PUBLIC_API_BASE_FETCH_URL}/api/experience?id=${id}`;
            setLoadingId(id);
            const res = await fetch(url, { method: "DELETE" });
            if (res.status === 200) {
                alert("Experience deleted correctly.");
                window.location.reload();
            } else {
                alert(
                    `Could not delete experience. Error: ${await res.text()}`
                );
            }
            setLoadingId(undefined);
        } else {
            alert(`Could not delete experience. Error: "Missing id"}`);
        }
    }, []);
    return {
        loadingId,
        handleDelete,
        handleUpdate,
    };
};

export default useExperienceList;
