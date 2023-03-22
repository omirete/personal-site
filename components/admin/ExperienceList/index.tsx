"use client";

import { Experience } from "@/helpers/database/ExperienceCtor";
import ExperienceRow from "./ExperienceRow";
import useExperienceList from "./useExperienceList";

export interface ExperienceListProps
    extends React.DetailedHTMLProps<
        React.TableHTMLAttributes<HTMLTableElement>,
        HTMLTableElement
    > {
    experience: Experience[];
}

const ExperienceList: React.FC<ExperienceListProps> = ({
    experience,
    className,
    ...props
}) => {
    const { handleDelete, handleUpdate, loadingId } = useExperienceList();
    return (
        <table {...props} className={`table caption-top ${className}`}>
            <thead>
                <tr>
                    <th scope="col">#</th>
                    {/* <th scope="col">id</th> */}
                    <th scope="col">Company</th>
                    <th scope="col">CompanyUrl</th>
                    <th scope="col">Position</th>
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
