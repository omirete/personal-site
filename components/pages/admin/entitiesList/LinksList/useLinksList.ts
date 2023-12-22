"use client";
import LinkInfo from "@/types/DataObjects/LinkInfo";
import { useCallback, useState } from "react";

export interface UseLinksList {
    loading: boolean;
    handleCreate: (link: Omit<LinkInfo, "id">) => Promise<void>;
    handleUpdate: (link: LinkInfo) => Promise<void>;
    handleDelete: (id: string) => Promise<void>;
}

const useLinksList = (): UseLinksList => {
    const [loading, setLoading] = useState(false);
    const handleCreate = useCallback(async (link: Omit<LinkInfo, "id">) => {
        if (link.url !== "") {
            const url = `/api/links`;
            setLoading(true);
            const res = await fetch(url, {
                method: "POST",
                body: JSON.stringify(link),
            });
            if (res.status === 200) {
                alert("Link created correctly.");
                window.location.reload();
            } else {
                alert(`Could not create link. Error: ${await res.text()}`);
            }
            setLoading(false);
        } else {
            alert("You need to specify a url first.");
        }
    }, []);

    const handleUpdate = useCallback(async (link: LinkInfo) => {
        if (link.url !== "") {
            const url = `/api/links`;
            setLoading(true);
            const res = await fetch(url, {
                method: "PUT",
                body: JSON.stringify(link),
            });
            if (res.status === 200) {
                alert("Link updated correctly.");
                window.location.reload();
            } else {
                alert(`Could not update link. Error: ${await res.text()}`);
            }
            setLoading(false);
        } else {
            alert("You need to specify a url first.");
        }
    }, []);

    const handleDelete = useCallback(async (id: string) => {
        const url = `/api/links`;
        setLoading(true);
        const res = await fetch(url, {
            method: "DELETE",
            body: JSON.stringify({ id }),
        });
        if (res.status === 200) {
            alert("Link removed correctly.");
            window.location.reload();
        } else {
            alert(`Could not remove link. Error: ${await res.text()}`);
        }
        setLoading(false);
    }, []);

    return {
        loading,
        handleCreate,
        handleUpdate,
        handleDelete,
    };
};

export default useLinksList;
