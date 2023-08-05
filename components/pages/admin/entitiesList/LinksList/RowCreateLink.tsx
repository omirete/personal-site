"use client";

import LinkInfo from "@/types/DataObjects/LinkInfo";
import { DetailedHTMLProps, HTMLAttributes, useState } from "react";
import { FaSave } from "react-icons/fa";
import useLinksList from "./useLinksList";

export interface RowCreateLinkProps
    extends DetailedHTMLProps<
        HTMLAttributes<HTMLTableRowElement>,
        HTMLTableRowElement
    > {
    rowNr: number;
}

const RowCreateLink: React.FC<RowCreateLinkProps> = ({
    rowNr,
    className,
    ...props
}) => {
    const [link, setLink] = useState<LinkInfo>({
        url: "",
        text: "",
    });
    const { loading, handleCreate } = useLinksList();
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
                        setLink((prev) => ({
                            ...prev,
                            url: e.target.value,
                        }))
                    }
                    value={link.url}
                />
            </td>
            <td>
                <input
                    className="form-control form-control-sm"
                    onChange={(e) =>
                        setLink((prev) => ({
                            ...prev,
                            text: e.target.value,
                        }))
                    }
                    value={link.text}
                />
            </td>
            <td className="text-center">
                <button className="btn m-0 p-0 border-0 shadow-none">
                    <FaSave
                        className="text-success opacity-75"
                        onClick={() => handleCreate(link)}
                    />
                </button>
            </td>
        </tr>
    );
};

export default RowCreateLink;
