"use client";

import useFileDirectory from "./useFileDirectory";
import FileDirectoryRow from "./FileDirectoryRow";

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
            <table
                {...props}
                className={`table border-primary caption-top ${className}`}
            >
                <caption>Uploaded files</caption>
                <thead>
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
                </thead>
                <tbody>
                    {files.map((file, i) => (
                        <FileDirectoryRow key={i} rowNr={i + 1} file={file} />
                    ))}
                </tbody>
            </table>
        );
    }
};

export default FileDirectory;
