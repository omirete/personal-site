"use client";

import { Project } from "@/helpers/database/ProjectsCtor";
import parseStringI18N from "@/i18n/helpers/parseStringI18N";
import FCi18n from "@/i18n/types/FCi18n";
import StringI18N from "@/i18n/types/StringI18N";
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

const ProjectsRow: FCi18n<ProjectsRowProps> = ({
    lang,
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
                    onChange={(e) => {
                        e.preventDefault();
                        setVirtualProject((prev) => {
                            const newVal = { ...prev.name };
                            newVal[lang] = e.target.value;
                            return {
                                ...prev,
                                name: newVal as StringI18N,
                            };
                        });
                    }}
                    defaultValue={parseStringI18N(virtualProject.name, lang)}
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
                    onChange={(e) => {
                        e.preventDefault();
                        setVirtualProject((prev) => {
                            const newVal = { ...prev.description };
                            newVal[lang] = e.target.value;
                            return {
                                ...prev,
                                description: newVal as StringI18N,
                            };
                        });
                    }}
                    defaultValue={parseStringI18N(
                        virtualProject.description,
                        lang
                    )}
                />
            </td>
            <td>
                <textarea
                    className="form-control form-control-sm"
                    onChange={(e) => {
                        e.preventDefault();
                        setVirtualProject((prev) => {
                            const newVal = { ...prev.fullContent };
                            newVal[lang] = e.target.value;
                            return {
                                ...prev,
                                fullContent: newVal as StringI18N,
                            };
                        });
                    }}
                    style={{
                        resize: "both",
                    }}
                    defaultValue={parseStringI18N(
                        virtualProject.fullContent,
                        lang
                    )}
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
