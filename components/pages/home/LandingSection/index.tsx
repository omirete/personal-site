import FullHeightSection from "@/components/ui/FullHeightSection";
import { PersonalInfo } from "@/helpers/database/PersonalInfoCtor";
import { FaChevronDown } from "react-icons/fa";
import IconBlob from "@/assets/svg/blob-7.svg";
import { dict } from "./dictionary";
import FCi18n from "@/i18n/types/FCi18n";
import parseStringI18N from "@/i18n/helpers/parseStringI18N";
import { i18n } from "@/i18n/config";

const LandingSection: FCi18n<{ personalInfo: PersonalInfo }> = ({
    lang,
    personalInfo,
}) => {
    const localeDict = dict[lang] ?? dict[i18n.defaultLocale];
    if (localeDict) {
        return (
            <FullHeightSection
                id="home"
                className="px-3 py-5 py-sm-4 px-sm-5 d-flex flex-column"
            >
                <div className="d-flex flex-grow-1 flex-wrap align-items-center">
                    <div className="col-12 col-sm-6 h-100 mt-3 mt-sm-0">
                        <div className="p-2 px-sm-4 pt-sm-4 pb-sm-5 rounded shadow bg-white d-flex">
                            <div className="flex-grow-1">
                                <p className="m-0">
                                    <code className="fs-2">
                                        {localeDict.hello}
                                    </code>
                                </p>
                                <p className="m-0 fs-4">
                                    {localeDict.iamName(
                                        personalInfo.basicInfo.name
                                    )}
                                </p>
                                <p className="m-0">
                                    {parseStringI18N(
                                        personalInfo.basicInfo.title,
                                        lang
                                    )}
                                </p>
                                <p>
                                    {parseStringI18N(
                                        personalInfo.basicInfo.subtitle,
                                        lang
                                    )}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-sm-6 h-100 d-flex flex-column justify-content-center align-items-center mt-3 mt-sm-0">
                        <div className="position-relative">
                            <IconBlob
                                className="position-absolute opacity-50"
                                style={{
                                    scale: 1.4,
                                    fill: "#ffffff",
                                    width: "100%",
                                    height: "auto",
                                }}
                            />
                            <img
                                src={`${process.env.NEXT_PUBLIC_FILES_BASE_FETCH_URL}/profile.png`}
                                alt={localeDict.profilePictureAlt}
                                className="rounded-circle shadow h-100 w-100 position-relative mb-3"
                                style={{
                                    maxHeight: "180px",
                                    maxWidth: "180px",
                                }}
                            />
                        </div>
                        <div className="px-3">
                            <audio
                                controls
                                style={{
                                    maxWidth: "100%",
                                }}
                                src={`${process.env.NEXT_PUBLIC_FILES_BASE_FETCH_URL}/voice-notes/${lang}.m4a`}
                            />
                        </div>
                    </div>
                </div>
                <a
                    className={`
                        d-flex flex-column
                        align-items-center justify-content-center
                        pt-3 mb-4 mb-sm-0
                        text-white text-decoration-none
                    `}
                    href="#highlights"
                >
                    <p>{localeDict.seeMore}</p>
                    <FaChevronDown />
                </a>
            </FullHeightSection>
        );
    } else {
        return <div>Loading...</div>;
    }
};

export default LandingSection;
