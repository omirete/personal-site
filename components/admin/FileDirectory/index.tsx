"use client";

import useFileDirectory from "./useFileDirectory";
import { FaPen, FaTrash, FaDownload } from "react-icons/fa";

export interface FileDirectoryProps
    extends React.DetailedHTMLProps<
        React.TableHTMLAttributes<HTMLTableElement>,
        HTMLTableElement
    > {}

const FileDirectory: React.FC<FileDirectoryProps> = ({
    className,
    ...props
}) => {
    const { files, loading } = useFileDirectory();
    if (loading) {
        return (
            <div
                className={`bg-dark bg-opacity-25 rounded ${className}`}
                style={{
                    height: "300px",
                }}
            />
        );
    } else {
        return (
            <table {...props} className={`table caption-top ${className}`}>
                <caption>Uploaded files</caption>
                <tbody>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">File path</th>
                        <th scope="col">Last modified</th>
                        <th scope="col">Size</th>
                        <th scope="col">Type</th>
                        {/* <th scope="col">Mime</th> */}
                        <th scope="col" className="text-center">
                            Action
                        </th>
                    </tr>
                    {files.map((file, i) => (
                        <tr key={i}>
                            <td scope="row">{i + 1}</td>
                            <td>{file.filename}</td>
                            <td>
                                {new Date(file.lastmod).toLocaleDateString(
                                    undefined,
                                    {
                                        year: "numeric",
                                        month: "2-digit",
                                        day: "2-digit",
                                        hour: "2-digit",
                                        minute: "2-digit",
                                        second: "2-digit",
                                    }
                                )}
                            </td>
                            <td>{file.size}</td>
                            <td>{file.type}</td>
                            {/* <td>{file.mime}</td> */}
                            <td className="text-center">
                                <a
                                    className="btn m-0 p-0 border-0 shadow-none"
                                    href={`${process.env.NEXT_PUBLIC_FILES_BASE_FETCH_URL}${file.filename}`}
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
                    ))}
                </tbody>
            </table>
        );
    }
};

export default FileDirectory;
