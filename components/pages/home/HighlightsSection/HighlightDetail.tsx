import { Highlight } from "@/helpers/database/HighlightsCtor";
import { useEffect, useState } from "react";

export interface HighlightDetailProps {
    highlight: Highlight;
    show: boolean;
}

const HighlightDetail: React.FC<HighlightDetailProps> = ({
    highlight,
    show,
}) => {
    const [showClass, setShowClass] = useState(false);
    useEffect(() => {
        const timer = setTimeout(() => {
            setShowClass(show);
        }, 50);
        () => clearTimeout(timer);
    }, [show]);
    return (
        // <div className={`${show ? "d-block" : "d-none"}`}>
        <div
            className={`
                    bg-dark text-white rounded p-3 fade
                    transition-all-500-ms
                    ${show ? "d-block" : "d-none"}
                `}
            style={{
                opacity: showClass ? "100%" : "0%",
                // scale: showClass ? "100%" : "0%",
                transform: `translateY(${showClass ? '0' : '20%'})`
            }}
        >
            {highlight.description}
        </div>
    );
};

export default HighlightDetail;
