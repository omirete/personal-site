import { Highlight } from "@/helpers/database/collections/highlight";
import parseStringI18N from "@/i18n/helpers/parseStringI18N";
import type { FC } from "react";
import type { Locale } from "@/i18n/config";
import { DetailedHTMLProps, LiHTMLAttributes } from "react";

export interface HighlightTileProps
    extends DetailedHTMLProps<LiHTMLAttributes<HTMLLIElement>, HTMLLIElement> {
    highlight: Highlight;
    active?: boolean;
    isLastChild?: boolean;
}

const HighlightTile: FC<{ lang: Locale } & HighlightTileProps> = ({
    lang,
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
                ${isLastChild ? "mb-0" : "mb-2"}
                border-0 rounded shadow
                bg-white
                transition-all
                ${active ? "bg-opacity-75" : "bg-opacity-50"}
                ${className ?? ""}
            `}
            {...props}
        >
            {parseStringI18N(highlight.title, lang)}
        </li>
    );
};

export default HighlightTile;
