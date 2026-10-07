import { useEffect, useState } from "react";
import type { StoredFile } from "@/helpers/fileStorage/types";

export interface UseFileDirectory {
    files: StoredFile[];
    loading: boolean;
    onDeleted: (pathname: string) => void;
}

const useFileDirectory = () => {
    const [files, setFiles] = useState<StoredFile[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const refresh = () => fetch(`/api/files`, {
            method: "GET",
        })
            .then(async (res) => {
                if (res.status === 200) {
                    return await res.json();
                } else {
                    throw new Error(await res.text());
                }
            })
            .then((data) => {
                if (data.error) {
                    throw new Error(data.error);
                } else {
                    setFiles(data.files);
                }
            })
            .catch((error) => {
                alert(error);
            })
            .finally(() => {
                setLoading(false);
            });
        void refresh();
        window.addEventListener("files-updated", refresh);
        return () => window.removeEventListener("files-updated", refresh);
    }, []);

    const onDeleted = (pathname: string) => {
        setFiles((currentFiles) => currentFiles.filter((file) => file.pathname !== pathname));
    };

    return { files, loading, onDeleted };
};

export default useFileDirectory;
