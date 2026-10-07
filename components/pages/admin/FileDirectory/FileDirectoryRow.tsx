import { DetailedHTMLProps, HTMLAttributes } from "react";
import { FaDownload, FaPen, FaTrash } from "react-icons/fa";
import type { StoredFile } from "@/helpers/fileStorage/types";

export interface FileDirectoryRowProps
    extends DetailedHTMLProps<
        HTMLAttributes<HTMLTableRowElement>,
        HTMLTableRowElement
    > {
    rowNr: number;
    file: StoredFile;
}

const FileDirectoryRow: React.FC<FileDirectoryRowProps> = ({
    file,
    rowNr,
    ...props
}) => {
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
                <button className="btn m-0 p-0 border-0 shadow-none">
                    <FaPen className="text-info opacity-75" />
                </button>{" "}
                <button className="btn m-0 p-0 border-0 shadow-none">
                    <FaTrash className="text-dark opacity-75" />
                </button>
            </td>
        </tr>
    );
};

export default FileDirectoryRow;
