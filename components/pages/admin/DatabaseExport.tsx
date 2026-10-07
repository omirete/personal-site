"use client";

import { FormEvent, useState } from "react";
import { exportCollections } from "@/helpers/database/exportCollections";

export default function DatabaseExport() {
    const [collection, setCollection] = useState("all");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setLoading(true);
        setError("");
        try {
            const response = await fetch(`/api/admin/export?collection=${encodeURIComponent(collection)}`, {
                cache: "no-store",
            });
            if (!response.ok) {
                const result = await response.json();
                throw new Error(result.error || "Unable to export the database.");
            }
            const blob = await response.blob();
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = response.headers.get("Content-Disposition")?.match(/filename="([^"]+)"/)?.[1]
                || `federicogiancarelli-${collection}.json`;
            document.body.appendChild(link);
            link.click();
            link.remove();
            setTimeout(() => URL.revokeObjectURL(url), 1000);
        } catch (error) {
            setError(error instanceof Error ? error.message : "Unable to export the database.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <h1 className="h4">Export database</h1>
            <p>
                Download a collection as MongoDB Extended JSON, preserving IDs and dates.
                All collections downloads one JSON file grouped by collection name.
                Uploaded files are not included.
            </p>
            <label htmlFor="export-collection" className="form-label">Collection</label>
            <select
                id="export-collection"
                className="form-select mb-3"
                value={collection}
                onChange={(event) => setCollection(event.target.value)}
                disabled={loading}
            >
                <option value="all">All collections</option>
                {exportCollections.map((name) => <option key={name} value={name}>{name}</option>)}
            </select>
            {error && <div className="alert alert-danger" role="alert">{error}</div>}
            <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? "Exporting…" : "Download JSON"}
            </button>
            <span className="visually-hidden" role="status">{loading ? "Exporting database" : ""}</span>
        </form>
    );
}
