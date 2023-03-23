"use client";

import { Experience } from "@/helpers/database/ExperienceCtor";
import { DetailedHTMLProps, HTMLAttributes, useState } from "react";
import { FaSave, FaTrash } from "react-icons/fa";

export interface ExperienceRowProps
    extends DetailedHTMLProps<
        HTMLAttributes<HTMLTableRowElement>,
        HTMLTableRowElement
    > {
    rowNr: number;
    loading?: boolean;
    experience: Experience;
    handleUpdate: (experience: Experience) => void;
    handleDelete: (id: string) => void;
}

const ExperienceRow: React.FC<ExperienceRowProps> = ({
    loading,
    experience,
    className,
    rowNr,
    handleDelete,
    handleUpdate,
    ...props
}) => {
    const [virtualExp, setVirtualExp] = useState<Experience>(experience);
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
                        setVirtualExp((prev) => ({
                            ...prev,
                            company: e.target.value,
                        }))
                    }
                    value={virtualExp.company}
                />
            </td>
            <td>
                <input
                    className="form-control form-control-sm"
                    onChange={(e) =>
                        setVirtualExp((prev) => ({
                            ...prev,
                            companyUrl: e.target.value,
                        }))
                    }
                    value={virtualExp.companyUrl}
                />
            </td>
            <td>
                <input
                    className="form-control form-control-sm"
                    onChange={(e) =>
                        setVirtualExp((prev) => ({
                            ...prev,
                            position: e.target.value,
                        }))
                    }
                    value={virtualExp.position}
                />
            </td>
            <td>
                <input
                    className="form-control form-control-sm"
                    onChange={(e) =>
                        setVirtualExp((prev) => ({
                            ...prev,
                            dateFrom: e.target.value,
                        }))
                    }
                    value={virtualExp.dateFrom}
                    type="date"
                />
            </td>
            <td>
                <input
                    className="form-control form-control-sm"
                    onChange={(e) =>
                        setVirtualExp((prev) => ({
                            ...prev,
                            dateTo: e.target.value,
                        }))
                    }
                    value={virtualExp.dateTo}
                    type="date"
                />
            </td>
            <td>
                <input
                    className="form-control form-control-sm"
                    onChange={(e) =>
                        setVirtualExp((prev) => ({
                            ...prev,
                            description: e.target.value,
                        }))
                    }
                    value={virtualExp.description}
                />
            </td>
            <td>
                <input
                    className="form-control form-control-sm"
                    onChange={(e) =>
                        setVirtualExp((prev) => ({
                            ...prev,
                            tags: e.target.value.split(","),
                        }))
                    }
                    value={virtualExp.tags.join(",")}
                />
            </td>
            <td className="text-center">
                {JSON.stringify(experience) !== JSON.stringify(virtualExp) && (
                    <button
                        className="btn m-0 p-0 border-0 shadow-none"
                        onClick={() => handleUpdate(virtualExp)}
                    >
                        <FaSave className="text-success opacity-75 me-1" />
                    </button>
                )}
                <button
                    className="btn m-0 p-0 border-0 shadow-none"
                    onClick={() => handleDelete(experience.id)}
                >
                    <FaTrash className="text-dark opacity-75" />
                </button>
            </td>
        </tr>
    );
};

export default ExperienceRow;
