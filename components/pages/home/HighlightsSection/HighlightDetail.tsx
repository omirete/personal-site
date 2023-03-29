import { Highlight } from "@/helpers/database/HighlightsCtor";
import { DetailedHTMLProps, HTMLAttributes, useEffect, useState } from "react";

export interface HighlightDetailProps
    extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    highlight: Highlight;
}

const HighlightDetail: React.FC<HighlightDetailProps> = ({
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
            {highlight.description}
        </div>
    );
};

export default HighlightDetail;
