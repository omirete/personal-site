"use client";

import LinkInfo from "@/types/DataObjects/LinkInfo";
import LinksRow from "./LinksRow";
import RowCreateLink from "./RowCreateLink";

export interface LinksListProps
    extends React.DetailedHTMLProps<
        React.TableHTMLAttributes<HTMLTableElement>,
        HTMLTableElement
    > {
    links: LinkInfo[];
}

const LinksList: React.FC<LinksListProps> = ({
    links,
    className,
    ...props
}) => {
    return (
        <table {...props} className={`table caption-top ${className}`}>
            <tbody>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Text</th>
                    <th scope="col">Url</th>
                    <th scope="col" className="text-center">
                        Action
                    </th>
                </tr>
                {links.map((link, i) => {
                    return <LinksRow rowNr={i + 1} link={link} />;
                })}
                <RowCreateLink rowNr={links.length + 1} />
            </tbody>
        </table>
    );
};

export default LinksList;
