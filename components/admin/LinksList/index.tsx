"use client";

import LinkInfo from "@/types/DataObjects/LinkInfo";
import Link from "next/link";
import { useCallback, useState } from "react";
import { FaTrash, FaLink, FaSave } from "react-icons/fa";

export interface LinksListProps
    extends React.DetailedHTMLProps<
        React.TableHTMLAttributes<HTMLTableElement>,
        HTMLTableElement
    > {
    links: LinkInfo[];
}

const LinksList: React.FC<LinksListProps> = ({
    links,
    className,
    ...props
}) => {
    const [newUrl, setNewUrl] = useState("");
    const [newUrlText, setNewUrlText] = useState("");
    const handleCreate = useCallback(async () => {
        if (newUrl !== "") {
            const url = `${process.env.NEXT_PUBLIC_API_BASE_FETCH_URL}/api/links`;
            const res = await fetch(url, {
                method: "POST",
                body: JSON.stringify({
                    url: newUrl,
                    text: newUrlText,
                }),
            });
            if (res.status === 200) {
                alert("Link created correctly.");
                window.location.reload();
            } else {
                alert(`Could not create link. Error: ${await res.text()}`);
            }
        } else {
            alert("You need to specify a url first.");
        }
    }, [newUrl, newUrlText]);
    const handleUpdate = useCallback(async (updatedLink: LinkInfo) => {
        if (updatedLink.url !== "") {
            const url = `${process.env.NEXT_PUBLIC_API_BASE_FETCH_URL}/api/links`;
            const res = await fetch(url, {
                method: "PUT",
                body: JSON.stringify(updatedLink),
            });
            if (res.status === 200) {
                alert("Link updated correctly.");
                window.location.reload();
            } else {
                alert(`Could not update link. Error: ${await res.text()}`);
            }
        } else {
            alert("You need to specify a url first.");
        }
    }, []);
    const handleRemove = useCallback(async (id: string) => {
        const url = `${process.env.NEXT_PUBLIC_API_BASE_FETCH_URL}/api/links`;
        const res = await fetch(url, {
            method: "DELETE",
            body: JSON.stringify({ id }),
        });
        if (res.status === 200) {
            alert("Link removed correctly.");
            window.location.reload();
        } else {
            alert(`Could not remove link. Error: ${await res.text()}`);
        }
    }, []);
    return (
        <table {...props} className={`table caption-top ${className}`}>
            <tbody>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Text</th>
                    <th scope="col">Url</th>
                    <th scope="col" className="text-center">
                        Action
                    </th>
                </tr>
                {links.map((link, i) => {
                    const [text, setText] = useState(link.text);
                    const [url, setUrl] = useState(link.url);

                    return (
                        <tr key={i}>
                            <td scope="row" className="align-middle">
                                {i + 1}
                            </td>
                            <td>
                                <input
                                    className="form-control form-control-sm"
                                    onChange={(e) => setText(e.target.value)}
                                    value={text}
                                />
                            </td>
                            <td>
                                <input
                                    className="form-control form-control-sm"
                                    onChange={(e) => setUrl(e.target.value)}
                                    value={url}
                                />
                            </td>
                            <td className="text-center">
                                {(url !== link.url || text !== link.text) && (
                                    <button
                                        className="btn m-0 p-0 border-0 shadow-none"
                                        onClick={() =>
                                            handleUpdate({
                                                id: link.id,
                                                url,
                                                text,
                                            })
                                        }
                                    >
                                        <FaSave className="text-success opacity-75 me-1" />
                                    </button>
                                )}
                                <Link
                                    className="btn m-0 p-0 border-0 shadow-none"
                                    href={{ host: url }}
                                    rel="noreferrer noopener"
                                    target="_blank"
                                >
                                    <FaLink className="text-primary opacity-75 me-1" />
                                </Link>
                                <button
                                    className="btn m-0 p-0 border-0 shadow-none"
                                    onClick={() => handleRemove(link.id)}
                                >
                                    <FaTrash className="text-dark opacity-75" />
                                </button>
                            </td>
                        </tr>
                    );
                })}
                <tr>
                    <td scope="row" className="align-middle">
                        {links.length + 1}
                    </td>
                    <td>
                        <input
                            className="form-control form-control-sm"
                            onChange={(e) => setNewUrl(e.target.value)}
                            value={newUrl}
                        />
                    </td>
                    <td>
                        <input
                            className="form-control form-control-sm"
                            onChange={(e) => setNewUrlText(e.target.value)}
                            value={newUrlText}
                        />
                    </td>
                    <td className="text-center">
                        <button className="btn m-0 p-0 border-0 shadow-none">
                            <FaSave
                                className="text-success opacity-75"
                                onClick={handleCreate}
                            />
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    );
};

export default LinksList;
