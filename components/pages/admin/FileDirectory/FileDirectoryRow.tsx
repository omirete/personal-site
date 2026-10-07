import { DetailedHTMLProps, HTMLAttributes, useRef, useState } from "react";
import { FaDownload, FaTrash } from "react-icons/fa";
import type { StoredFile } from "@/helpers/fileStorage/types";

export interface FileDirectoryRowProps
    extends DetailedHTMLProps<
        HTMLAttributes<HTMLTableRowElement>,
        HTMLTableRowElement
    > {
    rowNr: number;
    file: StoredFile;
    onDeleted: (pathname: string) => void;
}

const FileDirectoryRow: React.FC<FileDirectoryRowProps> = ({
    file,
    rowNr,
    onDeleted,
    ...props
}) => {
    const [deleting, setDeleting] = useState(false);
    const deleteInProgress = useRef(false);
    const handleDelete = async () => {
        if (deleteInProgress.current || !window.confirm(
            `Delete "${file.pathname}" permanently? This cannot be undone.`,
        )) return;

        deleteInProgress.current = true;
        setDeleting(true);
        try {
            const query = new URLSearchParams({ pathname: file.pathname });
            const res = await fetch(`/api/files?${query}`, { method: "DELETE" });
            const data = await res.json();
            if (!res.ok || !data.success) {
                throw new Error(data.error || "Could not delete the file. Please try again.");
            }
            onDeleted(file.pathname);
        } catch (error) {
            window.alert(error instanceof Error ? error.message : "Could not delete the file. Please try again.");
        } finally {
            deleteInProgress.current = false;
            setDeleting(false);
        }
    };

    return (
        <tr {...props}>
            <td scope="row">{rowNr}</td>
            <td>{file.pathname}</td>
            <td>
                {new Date(file.uploadedAt).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                })}
            </td>
            <td>{file.size}</td>
            <td>{file.pathname.split(".").pop()}</td>
            {/* <td>{file.mime}</td> */}
            <td className="text-center">
                <a
                    className="btn m-0 p-0 border-0 shadow-none"
                    href={file.downloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    download
                >
                    <FaDownload className="text-primary opacity-75" />
                </a>{" "}
                <button
                    type="button"
                    className="btn m-0 p-0 border-0 shadow-none"
                    aria-label={`Delete ${file.pathname}`}
                    title={deleting ? "Deleting…" : "Delete file"}
                    disabled={deleting}
                    onClick={handleDelete}
                >
                    <FaTrash className="text-dark opacity-75" />
                </button>
            </td>
        </tr>
    );
};

export default FileDirectoryRow;
