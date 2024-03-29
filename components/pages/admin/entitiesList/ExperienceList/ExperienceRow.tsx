"use client";
import {
    Experience,
    SupportedExperienceTypes,
} from "@/helpers/database/collections/experience";
import parseStringI18N from "@/i18n/helpers/parseStringI18N";
import FCi18n from "@/i18n/types/FCi18n";
import StringI18N from "@/i18n/types/StringI18N";
import WithStringId from "@/types/WithStringId";
import { DetailedHTMLProps, HTMLAttributes, useState } from "react";
import { FaSave, FaTrash } from "react-icons/fa";

export interface ExperienceRowProps
    extends DetailedHTMLProps<
        HTMLAttributes<HTMLTableRowElement>,
        HTMLTableRowElement
    > {
    rowNr: number;
    loading?: boolean;
    experience: WithStringId<Experience>;
    handleUpdate: (experience: WithStringId<Experience>) => void;
    handleDelete: (id: string) => void;
}

const ExperienceRow: FCi18n<ExperienceRowProps> = ({
    lang,
    loading,
    experience,
    className,
    rowNr,
    handleDelete,
    handleUpdate,
    ...props
}) => {
    const [virtualExp, setVirtualExp] =
        useState<WithStringId<Experience>>(experience);
    return (
        <tr
            className={`${loading ? "bg-secondary" : ""} ${className ?? ""}`}
            {...props}
        >
            <td scope="row" className="align-middle">
                {rowNr}
            </td>
            <td>
                <select
                    className="form-control form-control-sm"
                    onChange={(e) =>
                        setVirtualExp((prev) => ({
                            ...prev,
                            type: e.target.value as SupportedExperienceTypes,
                        }))
                    }
                    defaultValue={virtualExp.type}
                >
                    <option value="work">💼</option>
                    <option value="studies">🎓</option>
                </select>
            </td>
            <td>
                <input
                    className="form-control form-control-sm"
                    onChange={(e) => {
                        e.preventDefault();
                        setVirtualExp((prev) => {
                            const newVal = { ...prev.title };
                            newVal[lang] = e.target.value;
                            return {
                                ...prev,
                                title: newVal as StringI18N,
                            };
                        });
                    }}
                    value={parseStringI18N(virtualExp.title, lang)}
                />
            </td>
            <td>
                <input
                    className="form-control form-control-sm"
                    onChange={(e) =>
                        setVirtualExp((prev) => ({
                            ...prev,
                            institution: e.target.value,
                        }))
                    }
                    value={virtualExp.institution}
                />
            </td>
            <td>
                <input
                    className="form-control form-control-sm"
                    onChange={(e) =>
                        setVirtualExp((prev) => ({
                            ...prev,
                            relevantUrl: e.target.value,
                        }))
                    }
                    value={virtualExp.relevantUrl}
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
                    onChange={(e) => {
                        e.preventDefault();
                        setVirtualExp((prev) => {
                            const newVal = { ...prev.description };
                            newVal[lang] = e.target.value;
                            return {
                                ...prev,
                                description: newVal as StringI18N,
                            };
                        });
                    }}
                    value={parseStringI18N(virtualExp.description, lang)}
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
                    onClick={() => handleDelete(experience._id)}
                >
                    <FaTrash className="text-dark opacity-75" />
                </button>
            </td>
        </tr>
    );
};

export default ExperienceRow;
