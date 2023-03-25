import { Highlight } from "@/helpers/database/HighlightsCtor";
import { DetailedHTMLProps, LiHTMLAttributes } from "react";

export interface HighlightTileProps
    extends DetailedHTMLProps<LiHTMLAttributes<HTMLLIElement>, HTMLLIElement> {
    highlight: Highlight;
    active?: boolean;
    isLastChild?: boolean;
}

const HighlightTile: React.FC<HighlightTileProps> = ({
    highlight,
    active,
    className,
    isLastChild,
    ...props
}) => {
    return (
        <li
            className={`
                list-group-item
                p-3
                ${isLastChild ? 'mb-0' : 'mb-2'}
                border-0 rounded shadow
                bg-white
                transition-all
                ${active ? "bg-opacity-75" : "bg-opacity-50"}
                ${className ?? ""}
            `}
            {...props}
        >
            {highlight.title}
        </li>
    );
};

export default HighlightTile;
