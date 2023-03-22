import FullHeightSection from "@/components/ui/FullHeightSection";
import { Highlight } from "@/helpers/database/HighlightsCtor";

const HighlightsSection: React.FC<{ highlights: Highlight[] }> = ({
    highlights,
}) => {
    return (
        <FullHeightSection id="highlights" className="py-4 px-5">
            <h3 className="mt-5">Highlights</h3>
        </FullHeightSection>
    );
};

export default HighlightsSection;
