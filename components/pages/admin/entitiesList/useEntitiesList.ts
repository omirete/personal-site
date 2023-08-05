"use client";
import WithStringId from "@/types/WithStringId";
import { useCallback, useState } from "react";

interface UseEntitiesList<T> {
    loadingId: string | undefined;
    handleUpdate: (entity: WithStringId<T>) => void;
    handleDelete: (id: string) => void;
}
function useEntitiesList<T>(
    entity: "experience" | "highlights" | "projects"
): UseEntitiesList<T> {
    const [loadingId, setLoadingId] = useState<string | undefined>(undefined);

    const handleUpdate = useCallback(async (value: WithStringId<T>) => {
        const url = `/api/${entity}`;
        setLoadingId(value._id);
        const res = await fetch(url, {
            method: "PUT",
            body: JSON.stringify(value),
        });
        if (res.status === 200) {
            alert("Updated correctly.");
            window.location.reload();
        } else {
            alert(`Could not update correctly. Error: ${await res.text()}`);
        }
        setLoadingId(undefined);
    }, [entity]);
    const handleDelete = useCallback(async (id: string) => {
        if (id) {
            const url = `/api/${entity}?id=${id}`;
            setLoadingId(id);
            const res = await fetch(url, { method: "DELETE" });
            if (res.status === 200) {
                alert("Deleted correctly.");
                window.location.reload();
            } else {
                alert(`Could not delete correctly. Error: ${await res.text()}`);
            }
            setLoadingId(undefined);
        } else {
            alert(`Could not delete correctly. Error: "Missing id"}`);
        }
    }, [entity]);
    return {
        loadingId,
        handleDelete,
        handleUpdate,
    };
}

export default useEntitiesList;
