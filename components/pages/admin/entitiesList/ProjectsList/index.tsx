"use client";
import FCi18n from "@/i18n/types/FCi18n";
import { Project } from "@/helpers/database/collections/project";
import ProjectsRow from "./ProjectsRow";
import useEntitiesList from "../useEntitiesList";
import WithStringId from "@/types/WithStringId";

export interface ProjectsListProps
    extends React.DetailedHTMLProps<
        React.TableHTMLAttributes<HTMLTableElement>,
        HTMLTableElement
    > {
    projects: WithStringId<Project>[];
}

const ProjectsList: FCi18n<ProjectsListProps> = ({
    lang,
    projects,
    className,
    ...props
}) => {
    const { handleDelete, handleUpdate, loadingId } =
        useEntitiesList("projects");
    return (
        <table
            {...props}
            className={`table border-primary caption-top ${className}`}
        >
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
                            lang={lang}
                            key={i}
                            project={p}
                            handleUpdate={handleUpdate}
                            handleDelete={handleDelete}
                            rowNr={i + 1}
                            loading={loadingId === p._id}
                        />
                    );
                })}
            </tbody>
        </table>
    );
};

export default ProjectsList;
