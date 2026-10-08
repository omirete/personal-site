import Signature from "@/assets/svg/signature.svg";
import SocialRow from "@/components/social/SocialRow";
import type { FC } from "react";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/app/[lang]/dictionaries";
import { PersonalInfo } from "@/helpers/database/collections/personalInfo";

const Footer: FC<{ lang: Locale } & { personalInfo: PersonalInfo }> = async ({
    lang,
    personalInfo,
}) => {
    const localeDict = (await getDictionary(lang)).footer;
    return (
        <div className="text-decoration-none text-center bg-dark py-4">
            <SocialRow
                lang={lang}
                className="h3"
                classNameIcons="text-white me-1 opacity-50 opacity-100-hover transition-all"
                personalInfo={personalInfo}
            />
            <Signature
                className="mt-4 opacity-50"
                style={{ fill: "#ffffff" }}
            />
            <div className="mt-4 text-light opacity-50">
                {localeDict.sourceCodeAvailableOn}{" "}
                <a
                    href="https://github.com/omirete/personal-site"
                    className="link-info"
                >
                    GitHub!
                </a>
            </div>
        </div>
    );
};

export default Footer;
