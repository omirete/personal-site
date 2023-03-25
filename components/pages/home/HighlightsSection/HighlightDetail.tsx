import { Highlight } from "@/helpers/database/HighlightsCtor";
import { DetailedHTMLProps, HTMLAttributes, useEffect, useState } from "react";

export interface HighlightDetailProps
    extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    highlight: Highlight;
}

const HighlightDetail: React.FC<HighlightDetailProps> = ({
    highlight,
    className,
    style,
    ...props
}) => {
    return (
        <div
            className={`
                    ${className}
                `}
            style={{
                // opacity: showClass ? "100%" : "0%",
                // transform: `translateY(${showClass ? "0" : "20%"})`,
                ...style,
            }}
            {...props}
        >
            {highlight.description}
        </div>
    );
};

export default HighlightDetail;
