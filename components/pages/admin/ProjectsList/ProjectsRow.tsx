"use client";

import { Project } from "@/helpers/database/ProjectsCtor";
import { DetailedHTMLProps, HTMLAttributes, useState } from "react";
import { FaSave, FaTrash } from "react-icons/fa";

export interface ProjectsRowProps
    extends DetailedHTMLProps<
        HTMLAttributes<HTMLTableRowElement>,
        HTMLTableRowElement
    > {
    rowNr: number;
    loading?: boolean;
    project: Project;
    handleUpdate: (project: Project) => void;
    handleDelete: (id: string) => void;
}

const ProjectsRow: React.FC<ProjectsRowProps> = ({
    loading,
    project,
    className,
    rowNr,
    handleDelete,
    handleUpdate,
    ...props
}) => {
    const [virtualProject, setVirtualProject] = useState<Project>(project);
    return (
        <tr
            className={`${loading ? "bg-secondary" : ""} ${className ?? ""}`}
            {...props}
        >
            <td scope="row" className="align-middle">
                {rowNr}
            </td>
            <td>
                <input
                    className="form-control form-control-sm"
                    onChange={(e) =>
                        setVirtualProject((prev) => ({
                            ...prev,
                            name: e.target.value,
                        }))
                    }
                    value={virtualProject.name}
                />
            </td>
            <td>
                <input
                    className="form-control form-control-sm"
                    onChange={(e) =>
                        setVirtualProject((prev) => ({
                            ...prev,
                            alias: e.target.value,
                        }))
                    }
                    value={virtualProject.alias}
                />
            </td>
            <td>
                <input
                    className="form-control form-control-sm"
                    onChange={(e) =>
                        setVirtualProject((prev) => ({
                            ...prev,
                            description: e.target.value,
                        }))
                    }
                    value={virtualProject.description}
                />
            </td>
            <td>
                <textarea
                    className="form-control form-control-sm"
                    onChange={(e) =>
                        setVirtualProject((prev) => ({
                            ...prev,
                            fullContent: e.target.value,
                        }))
                    }
                    style={{
                        resize: 'both'
                    }}
                    value={virtualProject.fullContent}
                />
            </td>
            <td>
                <input
                    className="form-control form-control-sm"
                    onChange={(e) =>
                        setVirtualProject((prev) => ({
                            ...prev,
                            tags: e.target.value.split(","),
                        }))
                    }
                    value={virtualProject.tags.join(",")}
                />
            </td>
            <td>
                <input
                    className="form-control form-control-sm"
                    onChange={(e) =>
                        setVirtualProject((prev) => ({
                            ...prev,
                            imgUrl: e.target.value,
                        }))
                    }
                    value={virtualProject.imgUrl}
                />
            </td>
            {/* ---------------- */}
            <td className="text-center">
                {JSON.stringify(project) !== JSON.stringify(virtualProject) && (
                    <button
                        className="btn m-0 p-0 border-0 shadow-none"
                        onClick={() => handleUpdate(virtualProject)}
                    >
                        <FaSave className="text-success opacity-75 me-1" />
                    </button>
                )}
                <button
                    className="btn m-0 p-0 border-0 shadow-none"
                    onClick={() => handleDelete(project.id)}
                >
                    <FaTrash className="text-dark opacity-75" />
                </button>
            </td>
        </tr>
    );
};

export default ProjectsRow;
