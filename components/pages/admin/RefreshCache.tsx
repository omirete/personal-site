"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RefreshCache() {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    async function refresh() {
        setLoading(true);
        setMessage("");
        setError("");
        try {
            const response = await fetch("/api/invalidate-cache", { method: "POST" });
            const result = await response.json();
            if (!response.ok || !result.ok) {
                throw new Error(result.error || "Unable to refresh the website cache.");
            }
            setMessage("Website cache refreshed. Saved changes will appear on the next public page load.");
            router.refresh();
        } catch (error) {
            setError(error instanceof Error ? error.message : "Unable to refresh the website cache.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="mb-3 pb-3 border-bottom">
            <div className="d-flex flex-wrap align-items-center gap-2">
                <button type="button" className="btn btn-primary" disabled={loading} onClick={refresh}>
                    {loading ? "Refreshing cache…" : "Refresh website cache"}
                </button>
                <span>Publish saved changes to the public website.</span>
            </div>
            <div role="status" aria-live="polite">{loading ? "Refreshing website cache…" : message}</div>
            {error && <div className="text-danger mt-2" role="alert">{error}</div>}
        </div>
    );
}
