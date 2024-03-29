import { useEffect, useState } from "react";
import { FileInfo } from "ssh2-sftp-client";

export interface UseFileDirectory {
    files: FileInfo[];
    loading: boolean;
}

const useFileDirectory = () => {
    const [files, setFiles] = useState<FileInfo[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`/api/files`, {
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
    }, []);

    return { files, loading };
};

export default useFileDirectory;
