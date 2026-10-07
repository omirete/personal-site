import type { StoredFile } from "@/helpers/fileStorage/types";

interface CertificateReferenceProps {
    certificates: StoredFile[];
    loading: boolean;
    value: string;
    onChange: (url: string) => void;
    name?: string;
    id?: string;
}

export default function CertificateReference({ certificates, loading, value, onChange, name, id }: CertificateReferenceProps) {
    return (
        <div>
            <input
                className="form-control form-control-sm"
                type="url"
                aria-label="Reference URL"
                placeholder="Paste a reference URL or choose a certificate"
                name={name}
                id={id}
                value={value}
                onChange={(event) => onChange(event.target.value)}
            />
            <select
                className="form-select form-select-sm mt-1"
                aria-label="Uploaded certificate"
                disabled={loading || certificates.length === 0}
                value={certificates.some((file) => file.url === value) ? value : ""}
                onChange={(event) => onChange(event.target.value)}
            >
                <option value="">
                    {loading ? "Loading certificates…" : certificates.length ? "Choose a certificate" : "No certificates uploaded"}
                </option>
                {certificates.map((file) => (
                    <option key={file.url} value={file.url}>{file.pathname.replace(/^certificates\//, "")}</option>
                ))}
            </select>
        </div>
    );
}
