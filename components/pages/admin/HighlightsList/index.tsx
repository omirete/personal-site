"use client";

import { Highlight } from "@/helpers/database/HighlightsCtor";
import FCi18n from "@/i18n/types/FCi18n";
import HighlightsRow from "./HighlightsRow";
import useHighlightsList from "./useHighlightsList";

export interface HighlightsListProps
    extends React.DetailedHTMLProps<
        React.TableHTMLAttributes<HTMLTableElement>,
        HTMLTableElement
    > {
    highlights: Highlight[];
}

const HighlightsList: FCi18n<HighlightsListProps> = ({
    lang,
    highlights,
    className,
    ...props
}) => {
    const { handleDelete, handleUpdate, loadingId } = useHighlightsList();
    return (
        <table {...props} className={`table border-primary caption-top ${className}`}>
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
                            loading={loadingId === h.id}
                        />
                    );
                })}
            </tbody>
        </table>
    );
};

export default HighlightsList;
