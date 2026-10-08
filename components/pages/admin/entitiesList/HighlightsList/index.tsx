"use client";
import type { FC } from "react";
import type { Locale } from "@/i18n/config";
import { Highlight } from "@/helpers/database/collections/highlight";
import HighlightsRow from "./HighlightsRow";
import useEntitiesList from "../useEntitiesList";
import WithStringId from "@/types/WithStringId";

export interface HighlightsListProps
    extends React.DetailedHTMLProps<
        React.TableHTMLAttributes<HTMLTableElement>,
        HTMLTableElement
    > {
    highlights: WithStringId<Highlight>[];
}

const HighlightsList: FC<{ lang: Locale } & HighlightsListProps> = ({
    lang,
    highlights,
    className,
    ...props
}) => {
    const { handleDelete, handleUpdate, loadingId } =
        useEntitiesList("highlights");
    return (
        <table
            {...props}
            className={`table border-primary caption-top ${className}`}
        >
            <thead>
                <tr>
                    <th scope="col">#</th>
                    {/* <th scope="col">id</th> */}
                    <th scope="col">Title</th>
                    <th scope="col">Description</th>
                    <th scope="col" className="text-center">
                        Action
                    </th>
                </tr>
            </thead>
            <tbody>
                {highlights.map((h, i) => {
                    return (
                        <HighlightsRow
                            lang={lang}
                            key={i}
                            highlight={h}
                            handleUpdate={handleUpdate}
                            handleDelete={handleDelete}
                            rowNr={i + 1}
                            loading={loadingId === h._id}
                        />
                    );
                })}
            </tbody>
        </table>
    );
};

export default HighlightsList;
