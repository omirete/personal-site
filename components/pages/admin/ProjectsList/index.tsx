"use client";

import { Highlight } from "@/helpers/database/HighlightsCtor";
import { Project } from "@/helpers/database/ProjectsCtor";
import ProjectsRow from "./ProjectsRow";
import useProjectsList from "./useProjectsList";

export interface ProjectsListProps
    extends React.DetailedHTMLProps<
        React.TableHTMLAttributes<HTMLTableElement>,
        HTMLTableElement
    > {
    projects: Project[];
}

const ProjectsList: React.FC<ProjectsListProps> = ({
    projects,
    className,
    ...props
}) => {
    const { handleDelete, handleUpdate, loadingId } = useProjectsList();
    return (
        <table {...props} className={`table caption-top ${className}`}>
            <thead>
                <tr>
                    <th scope="col">#</th>
                    {/* <th scope="col">id</th> */}
                    <th scope="col">Name</th>
                    <th scope="col">Alias</th>
                    <th scope="col">Description</th>
                    <th scope="col">Full content</th>
                    <th scope="col">Tags</th>
                    <th scope="col">Image url</th>
                    <th scope="col" className="text-center">
                        Action
                    </th>
                </tr>
            </thead>
            <tbody>
                {projects.map((p, i) => {
                    return (
                        <ProjectsRow
                            key={i}
                            project={p}
                            handleUpdate={handleUpdate}
                            handleDelete={handleDelete}
                            rowNr={i + 1}
                            loading={loadingId === p.id}
                        />
                    );
                })}
            </tbody>
        </table>
    );
};

export default ProjectsList;
