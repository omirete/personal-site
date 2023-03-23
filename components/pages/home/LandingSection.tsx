import FullHeightSection from "@/components/ui/FullHeightSection";
import { PersonalInfo } from "@/helpers/database/PersonalInfoCtor";
import { FaChevronDown } from "react-icons/fa";
import IconBlob from "@/assets/svg/blob-1.svg";

const LandingSection: React.FC<{ personalInfo: PersonalInfo }> = ({
    personalInfo,
}) => {
    return (
        <FullHeightSection
            className="p-3 py-sm-4 px-sm-5 d-flex flex-column"
            style={{
                // backgroundImage:
                //     "linear-gradient(to right top,#3b4969,#7a5283,#be5678,#e3704f,#d7a319)",
            }}
        >
            <div className="d-flex flex-grow-1 flex-wrap align-items-center">
                <div className="col-12 col-sm-6 h-100 mt-3 mt-sm-0">
                    <div className="p-2 px-sm-4 pt-sm-4 pb-5 rounded shadow bg-white d-flex">
                        <div className="flex-grow-1">
                            <p className="m-0">
                                <code className="fs-2">Hello,</code>
                            </p>
                            <p className="m-0 fs-4">
                                I am {personalInfo.basicInfo.name}
                            </p>
                            <p className="m-0">
                                {personalInfo.basicInfo.title}
                            </p>
                            <p>{personalInfo.basicInfo.subtitle}</p>
                        </div>
                        <div className="position-relative d-block d-sm-none">
                            <IconBlob
                                className="position-absolute"
                                style={{
                                    scale: 1.4,
                                    fill: "#44444433",
                                    width: "100%",
                                    height: "auto",
                                    zIndex: 1
                                }}
                            />
                            <img
                                src={`${process.env.NEXT_PUBLIC_FILES_BASE_FETCH_URL}/profile.png`}
                                alt="Profile picture."
                                className="rounded-circle shadow h-100 w-100 position-relative mb-3"
                                style={{
                                    maxHeight: "100px",
                                    maxWidth: "100px",
                                    zIndex: 2
                                }}
                            />
                        </div>
                    </div>
                </div>
                <div className="col-12 col-sm-6 h-100 d-flex flex-column justify-content-center align-items-center mt-3 mt-sm-0">
                    <div className="position-relative d-none d-sm-block">
                        <IconBlob
                            className="position-absolute"
                            style={{
                                scale: 1.4,
                                fill: "#ffffff33",
                                width: "100%",
                                height: "auto",
                            }}
                        />
                        <img
                            src={`${process.env.NEXT_PUBLIC_FILES_BASE_FETCH_URL}/profile.png`}
                            alt="Profile picture."
                            className="rounded-circle shadow h-100 w-100 position-relative mb-3"
                            style={{
                                maxHeight: "200px",
                                maxWidth: "200px",
                            }}
                        />
                    </div>
                    <div className="px-3">
                        <audio
                            controls
                            style={{
                                maxWidth: "100%",
                            }}
                            src={`${process.env.NEXT_PUBLIC_FILES_BASE_FETCH_URL}/voice-notes/en.m4a`}
                        />
                    </div>
                </div>
            </div>
            <div className="d-flex py-3 flex-column align-items-center justify-content-center text-white">
                <p>See more</p>
                <FaChevronDown />
            </div>
        </FullHeightSection>
    );
};

export default LandingSection;
