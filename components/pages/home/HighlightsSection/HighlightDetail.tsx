import { Highlight } from "@/helpers/database/HighlightsCtor";
import parseStringI18N from "@/i18n/helpers/parseStringI18N";
import FCi18n from "@/i18n/types/FCi18n";
import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface HighlightDetailProps
    extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    highlight: Highlight;
}

const HighlightDetail: FCi18n<HighlightDetailProps> = ({
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
