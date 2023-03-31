"use client";

import { Experience } from "@/helpers/database/ExperienceCtor";
import FCi18n from "@/i18n/types/FCi18n";
import ExperienceRow from "./ExperienceRow";
import useExperienceList from "./useExperienceList";

export interface ExperienceListProps
    extends React.DetailedHTMLProps<
        React.TableHTMLAttributes<HTMLTableElement>,
        HTMLTableElement
    > {
    experience: Experience[];
}

const ExperienceList: FCi18n<ExperienceListProps> = ({
    lang,
    experience,
    className,
    ...props
}) => {
    const { handleDelete, handleUpdate, loadingId } = useExperienceList();
    return (
        <table {...props} className={`table border-primary caption-top ${className}`}>
            <thead>
                <tr>
                    <th scope="col">#</th>
                    {/* <th scope="col">id</th> */}
                    <th scope="col">Type</th>
                    <th scope="col">Title</th>
                    <th scope="col">Institution</th>
                    <th scope="col">Relevant url</th>
                    <th scope="col">From</th>
                    <th scope="col">To</th>
                    <th scope="col">Description</th>
                    <th scope="col">Tags</th>
                    <th scope="col" className="text-center">
                        Action
                    </th>
                </tr>
            </thead>
            <tbody>
                {experience.map((exp, i) => {
                    return (
                        <ExperienceRow
                            lang={lang}
                            key={i}
                            experience={exp}
                            handleUpdate={handleUpdate}
                            handleDelete={handleDelete}
                            rowNr={i + 1}
                            loading={loadingId === exp.id}
                        />
                    );
                })}
            </tbody>
        </table>
    );
};

export default ExperienceList;
