"use client";

import LinkInfo from "@/types/DataObjects/LinkInfo";
import Link from "next/link";
import { DetailedHTMLProps, HTMLAttributes, useState } from "react";
import { FaLink, FaSave, FaTrash } from "react-icons/fa";
import useLinksList from "./useLinksList";
import WithStringId from "@/types/WithStringId";

export interface LinksRowProps
    extends DetailedHTMLProps<
        HTMLAttributes<HTMLTableRowElement>,
        HTMLTableRowElement
    > {
    rowNr: number;
    link: WithStringId<LinkInfo>;
}

const LinksRow: React.FC<LinksRowProps> = ({
    rowNr,
    link,
    className,
    ...props
}) => {
    const [virtualLink, setVirtualLink] =
        useState<WithStringId<LinkInfo>>(link);
    const { loading, handleDelete, handleUpdate } = useLinksList();

    return (
        <tr
            className={`${loading ? "bg-info" : ""} ${className ?? ""}`}
            {...props}
        >
            <td scope="row" className="align-middle">
                {rowNr}
            </td>
            <td>
                <input
                    className="form-control form-control-sm"
                    onChange={(e) =>
                        setVirtualLink((prev) => ({
                            ...prev,
                            text: e.target.value,
                        }))
                    }
                    value={virtualLink.text}
                />
            </td>
            <td>
                <input
                    className="form-control form-control-sm"
                    onChange={(e) =>
                        setVirtualLink((prev) => ({
                            ...prev,
                            url: e.target.value,
                        }))
                    }
                    value={virtualLink.url}
                />
            </td>
            <td className="text-center">
                {JSON.stringify(virtualLink) !== JSON.stringify(link) && (
                    <button
                        className="btn m-0 p-0 border-0 shadow-none"
                        onClick={() => handleUpdate(virtualLink)}
                    >
                        <FaSave className="text-success opacity-75 me-1" />
                    </button>
                )}
                <Link
                    className="btn m-0 p-0 border-0 shadow-none"
                    href={{ host: virtualLink.url }}
                    rel="noreferrer noopener"
                    target="_blank"
                >
                    <FaLink className="text-primary opacity-75 me-1" />
                </Link>
                <button
                    className="btn m-0 p-0 border-0 shadow-none"
                    onClick={() => handleDelete(link._id)}
                >
                    <FaTrash className="text-dark opacity-75" />
                </button>
            </td>
        </tr>
    );
};

export default LinksRow;
