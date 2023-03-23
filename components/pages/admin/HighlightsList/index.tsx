"use client";

import { Highlight } from "@/helpers/database/HighlightsCtor";
import HighlightsRow from "./HighlightsRow";
import useHighlightsList from "./useExperienceList";

export interface HighlightsListProps
    extends React.DetailedHTMLProps<
        React.TableHTMLAttributes<HTMLTableElement>,
        HTMLTableElement
    > {
    highlights: Highlight[];
}

const HighlightsList: React.FC<HighlightsListProps> = ({
    highlights,
    className,
    ...props
}) => {
    const { handleDelete, handleUpdate, loadingId } = useHighlightsList();
    return (
        <table {...props} className={`table caption-top ${className}`}>
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
