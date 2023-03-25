"use client";

import { Project } from "@/helpers/database/ProjectsCtor";
import { useCallback, useState } from "react";

interface UseProjectsList {
    loadingId: string | undefined;
    handleUpdate: (project: Project) => void;
    handleDelete: (id: string) => void;
}
const useProjectsList = (): UseProjectsList => {
    const [loadingId, setLoadingId] = useState<string | undefined>(undefined);

    const handleUpdate = useCallback(async (project: Project) => {
        if (project.id) {
            const url = `${process.env.NEXT_PUBLIC_API_BASE_FETCH_URL}/api/projects`;
            setLoadingId(project.id);
            const res = await fetch(url, {
                method: "PUT",
                body: JSON.stringify(project),
            });
            if (res.status === 200) {
                alert("Project updated correctly.");
                window.location.reload();
            } else {
                alert(`Could not update project. Error: ${await res.text()}`);
            }
            setLoadingId(undefined);
        } else {
            alert(`Could not update project. Error: "Missing id"}`);
        }
    }, []);
    const handleDelete = useCallback(async (id: string) => {
        if (id) {
            const url = `${process.env.NEXT_PUBLIC_API_BASE_FETCH_URL}/api/projects?id=${id}`;
            setLoadingId(id);
            const res = await fetch(url, { method: "DELETE" });
            if (res.status === 200) {
                alert("Project deleted correctly.");
                window.location.reload();
            } else {
                alert(`Could not delete project. Error: ${await res.text()}`);
            }
            setLoadingId(undefined);
        } else {
            alert(`Could not delete project. Error: "Missing id"}`);
        }
    }, []);
    return {
        loadingId,
        handleDelete,
        handleUpdate,
    };
};

export default useProjectsList;
