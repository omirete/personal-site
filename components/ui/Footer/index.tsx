import Signature from "assets/svg/signature.svg";
import { useContext } from "react";
import SocialRow from "@/components/social/SocialRow";
import { PersonalInfo } from "@/helpers/database/PersonalInfoCtor";

const Footer: React.FC<{ personalInfo: PersonalInfo }> = ({ personalInfo }) => {
    return (
        <div className="text-decoration-none text-center bg-dark py-4">
            <SocialRow
                className="h3"
                classNameIcons="text-white me-1 opacity-50 opacity-100-hover transition-all"
                personalInfo={personalInfo}
            />
            <Signature
                className="mt-4 opacity-50"
                style={{ fill: "#ffffff" }}
            />
            <div className="mt-4 text-light opacity-50">
                Source code available on{" "}
                <a
                    href="https://github.com/omirete/federicogiancarelli.com"
                    className="link-secondary"
                >
                    GitHub!
                </a>
            </div>
        </div>
    );
};

export default Footer;
