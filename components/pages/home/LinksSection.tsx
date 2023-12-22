import FullHeightSection from "@/components/ui/FullHeightSection";
import LinkInfo from "@/types/DataObjects/LinkInfo";
import WithStringId from "@/types/WithStringId";
import Link from "next/link";

const LinksSection: React.FC<{ links: WithStringId<LinkInfo>[] }> = ({
    links,
}) => {
    return (
        <FullHeightSection id="links" className="p-3 px-sm-4 py-sm-5 bg-info">
            <p>Here are some links you may find interesting!</p>
            <div className="list-group">
                {links.map((link) => {
                    return (
                        <Link
                            key={link._id}
                            href={link.url}
                            className="list-group-item list-group-item-action"
                            aria-current="true"
                        >
                            {link.text ?? link.url}
                        </Link>
                    );
                })}
            </div>
        </FullHeightSection>
    );
};

export default LinksSection;
