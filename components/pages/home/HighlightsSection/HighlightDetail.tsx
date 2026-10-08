import { Highlight } from "@/helpers/database/collections/highlight";
import parseStringI18N from "@/i18n/helpers/parseStringI18N";
import type { FC } from "react";
import type { Locale } from "@/i18n/config";
import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface HighlightDetailProps
    extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    highlight: Highlight;
}

const HighlightDetail: FC<{ lang: Locale } & HighlightDetailProps> = ({
    lang,
    highlight,
    className,
    ...props
}) => {
    return (
        <div
            className={`
                    ${className}
                `}
            {...props}
        >
            {parseStringI18N(highlight.description, lang)}
        </div>
    );
};

export default HighlightDetail;
