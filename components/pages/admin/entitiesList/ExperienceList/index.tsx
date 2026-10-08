"use client";
import type { FC } from "react";
import type { Locale } from "@/i18n/config";
import { Experience } from "@/helpers/database/collections/experience";
import ExperienceRow from "./ExperienceRow";
import useEntitiesList from "../useEntitiesList";
import WithStringId from "@/types/WithStringId";
import useCertificates from "../../useCertificates";

export interface ExperienceListProps
    extends React.DetailedHTMLProps<
        React.TableHTMLAttributes<HTMLTableElement>,
        HTMLTableElement
    > {
    experience: WithStringId<Experience>[];
}

const ExperienceList: FC<{ lang: Locale } & ExperienceListProps> = ({
    lang,
    experience,
    className,
    ...props
}) => {
    const { handleDelete, handleUpdate, loadingId } =
        useEntitiesList("experience");
    const { certificates, loading: certificatesLoading, error } = useCertificates();
    return (
        <table
            {...props}
            className={`table border-primary caption-top ${className}`}
        >
            {error && <caption className="text-danger" role="alert">{error}</caption>}
            <thead>
                <tr>
                    <th scope="col">#</th>
                    {/* <th scope="col">id</th> */}
                    <th scope="col">Type</th>
                    <th scope="col">Title</th>
                    <th scope="col">Institution</th>
                    <th scope="col">Reference URL / certificate</th>
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
                            certificates={certificates}
                            certificatesLoading={certificatesLoading}
                            handleUpdate={handleUpdate}
                            handleDelete={handleDelete}
                            rowNr={i + 1}
                            loading={loadingId === exp._id}
                        />
                    );
                })}
            </tbody>
        </table>
    );
};

export default ExperienceList;
