"use client";

import { Highlight } from "@/helpers/database/HighlightsCtor";
import { useCallback, useState } from "react";

interface UseHighlightsList {
    loadingId: string | undefined;
    handleUpdate: (highlight: Highlight) => void;
    handleDelete: (id: string) => void;
}
const useHighlightsList = (): UseHighlightsList => {
    const [loadingId, setLoadingId] = useState<string | undefined>(undefined);

    const handleUpdate = useCallback(async (highlight: Highlight) => {
        if (highlight.id) {
            const url = `/api/highlights`;
            setLoadingId(highlight.id);
            const res = await fetch(url, {
                method: "PUT",
                body: JSON.stringify(highlight),
            });
            if (res.status === 200) {
                alert("Highlight updated correctly.");
                window.location.reload();
            } else {
                alert(`Could not update highlight. Error: ${await res.text()}`);
            }
            setLoadingId(undefined);
        } else {
            alert(`Could not update highlight. Error: "Missing id"}`);
        }
    }, []);
    const handleDelete = useCallback(async (id: string) => {
        if (id) {
            const url = `/api/highlights?id=${id}`;
            setLoadingId(id);
            const res = await fetch(url, { method: "DELETE" });
            if (res.status === 200) {
                alert("Highlights deleted correctly.");
                window.location.reload();
            } else {
                alert(`Could not delete highlight. Error: ${await res.text()}`);
            }
            setLoadingId(undefined);
        } else {
            alert(`Could not delete highlight. Error: "Missing id"}`);
        }
    }, []);
    return {
        loadingId,
        handleDelete,
        handleUpdate,
    };
};

export default useHighlightsList;
