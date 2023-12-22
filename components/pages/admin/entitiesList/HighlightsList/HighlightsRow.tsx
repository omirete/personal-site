"use client";
import { Highlight } from "@/helpers/database/collections/highlight";
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
    highlight: WithStringId<Highlight>;
    handleUpdate: (highlight: WithStringId<Highlight>) => void;
    handleDelete: (id: string) => void;
}

const HighlightsRow: FCi18n<ExperienceRowProps> = ({
    lang,
    loading,
    highlight,
    className,
    rowNr,
    handleDelete,
    handleUpdate,
    ...props
}) => {
    const [virtualHighlight, setVirtualHighlight] =
        useState<WithStringId<Highlight>>(highlight);
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
                        setVirtualHighlight((prev) => {
                            const newVal = { ...prev.title };
                            newVal[lang] = e.target.value;
                            return {
                                ...prev,
                                title: newVal as StringI18N,
                            };
                        });
                    }}
                    defaultValue={parseStringI18N(virtualHighlight.title, lang)}
                />
            </td>
            <td>
                <input
                    className="form-control form-control-sm"
                    onChange={(e) => {
                        e.preventDefault();
                        setVirtualHighlight((prev) => {
                            const newVal = { ...prev.description };
                            newVal[lang] = e.target.value;
                            return {
                                ...prev,
                                description: newVal as StringI18N,
                            };
                        });
                    }}
                    defaultValue={parseStringI18N(
                        virtualHighlight.description,
                        lang,
                    )}
                />
            </td>
            <td className="text-center">
                {JSON.stringify(highlight) !==
                    JSON.stringify(virtualHighlight) && (
                    <button
                        className="btn m-0 p-0 border-0 shadow-none"
                        onClick={() => handleUpdate(virtualHighlight)}
                    >
                        <FaSave className="text-success opacity-75 me-1" />
                    </button>
                )}
                <button
                    className="btn m-0 p-0 border-0 shadow-none"
                    onClick={() => handleDelete(highlight._id)}
                >
                    <FaTrash className="text-dark opacity-75" />
                </button>
            </td>
        </tr>
    );
};

export default HighlightsRow;
