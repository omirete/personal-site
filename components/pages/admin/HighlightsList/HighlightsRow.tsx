"use client";

import { Highlight } from "@/helpers/database/HighlightsCtor";
import { DetailedHTMLProps, HTMLAttributes, useState } from "react";
import { FaSave, FaTrash } from "react-icons/fa";

export interface ExperienceRowProps
    extends DetailedHTMLProps<
        HTMLAttributes<HTMLTableRowElement>,
        HTMLTableRowElement
    > {
    rowNr: number;
    loading?: boolean;
    highlight: Highlight;
    handleUpdate: (highlight: Highlight) => void;
    handleDelete: (id: string) => void;
}

const HighlightsRow: React.FC<ExperienceRowProps> = ({
    loading,
    highlight,
    className,
    rowNr,
    handleDelete,
    handleUpdate,
    ...props
}) => {
    const [virtualHighlight, setVirtualHighlight] =
        useState<Highlight>(highlight);
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
                        setVirtualHighlight((prev) => ({
                            ...prev,
                            title: e.target.value,
                        }))
                    }
                    value={virtualHighlight.title}
                />
            </td>
            <td>
                <input
                    className="form-control form-control-sm"
                    onChange={(e) =>
                        setVirtualHighlight((prev) => ({
                            ...prev,
                            description: e.target.value,
                        }))
                    }
                    value={virtualHighlight.description}
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
                    onClick={() => handleDelete(highlight.id)}
                >
                    <FaTrash className="text-dark opacity-75" />
                </button>
            </td>
        </tr>
    );
};

export default HighlightsRow;
