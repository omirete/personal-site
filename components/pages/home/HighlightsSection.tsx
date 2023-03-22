import FullHeightSection from "@/components/ui/FullHeightSection";
import { Experience } from "@/helpers/database/ExperienceCtor";

const HighlightsSection: React.FC<{ highlights: Experience[] }> = ({
    highlights,
}) => {
    return (
        <FullHeightSection id="highlights" className="py-4 px-5">
            <h3 className="mt-5">Highlights</h3>
        </FullHeightSection>
    );
};

export default HighlightsSection;
