import { useEffect, useState } from "react";
import type { StoredFile } from "@/helpers/fileStorage/types";

export default function useCertificates() {
    const [certificates, setCertificates] = useState<StoredFile[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const controller = new AbortController();
        const refresh = async () => {
            try {
                const response = await fetch("/api/files", { signal: controller.signal });
                if (!response.ok) throw new Error("Could not load certificates. You can still paste a reference URL.");
                const data: { files: StoredFile[] } = await response.json();
                if (!controller.signal.aborted) {
                    setCertificates(data.files.filter((file) => file.pathname.startsWith("certificates/")));
                    setError(null);
                }
            } catch {
                if (!controller.signal.aborted) {
                    setError("Could not load certificates. You can still paste a reference URL.");
                }
            } finally {
                if (!controller.signal.aborted) setLoading(false);
            }
        };
        void refresh();
        window.addEventListener("files-updated", refresh);
        return () => {
            controller.abort();
            window.removeEventListener("files-updated", refresh);
        };
    }, []);

    return { certificates, loading, error };
}
