import { Experience } from "@/helpers/database/collections/experience";
import { i18n } from "@/i18n/config";
import parseStringI18N from "@/i18n/helpers/parseStringI18N";
import FCi18n from "@/i18n/types/FCi18n";
import { Fragment } from "react";
import { dict } from "../dictionary";

export interface ExperienceTimelineProps {
    experience: Experience[];
}

const ExperienceTimeline: FCi18n<ExperienceTimelineProps> = ({
    lang,
    experience,
}) => {
    const localeDict = dict[lang] ?? dict[i18n.defaultLocale];
    return (
        <table className="text-white">
            <tbody>
                <tr>
                    <td className="border-2 border-start-0 border-top-0 border-bottom-0 border-white"></td>
                    <td></td>
                    <td></td>
                    <td style={{ height: "20px" }}></td>
                </tr>
                {experience.map((e, i) => {
                    return (
                        <Fragment key={i}>
                            <tr>
                                <td colSpan={2} className="p-2">
                                    <span className="border rounded-circle p-1 fs-4 border-2">
                                        {e.type === "work" && "💼"}
                                        {e.type === "studies" && "🎓"}
                                    </span>
                                </td>
                                <td className="opacity-100 opacity-md-75">
                                    <div className="">
                                        <b>{parseStringI18N(e.title, lang)}</b>
                                    </div>
                                    <div>{e.institution}</div>
                                </td>
                            </tr>
                            <tr>
                                <td className="border-2 border-start-0 border-top-0 border-bottom-0 border-white"></td>
                                <td></td>
                                <td className="d-block d-md-none mb-3">
                                    <div className="badge bg-secondary bg-opacity-75">
                                        <span>
                                            {new Date(
                                                e.dateFrom,
                                            ).toLocaleDateString(undefined, {
                                                year: "numeric",
                                                month: "short",
                                            })}
                                        </span>
                                        {e.dateTo && (
                                            <>
                                                <span>, </span>
                                                <span>
                                                    {new Date(
                                                        e.dateTo,
                                                    ).toLocaleDateString(
                                                        undefined,
                                                        {
                                                            year: "numeric",
                                                            month: "short",
                                                        },
                                                    )}
                                                </span>
                                            </>
                                        )}
                                    </div>
                                    <div className="text-muted bg-white bg-opacity-20 rounded py-1 px-2 mt-2">
                                        {parseStringI18N(e.description, lang)}
                                    </div>
                                    {e.relevantUrl && (
                                        <a
                                            href={e.relevantUrl}
                                            className="badge bg-info text-decoration-none mt-2 text-muted"
                                            target="_blank"
                                            rel="noreferrer noopener"
                                        >
                                            {e.type === "studies" &&
                                                localeDict.viewCertificate}
                                            {e.type !== "studies" &&
                                                localeDict.seeLink}
                                        </a>
                                    )}
                                </td>
                                <td
                                    className="d-none d-md-block"
                                    style={{ height: "20px" }}
                                ></td>
                            </tr>
                        </Fragment>
                    );
                })}
            </tbody>
        </table>
    );
};

export default ExperienceTimeline;
