import { i18n } from "@/i18n/config";
import FCi18n from "@/i18n/types/FCi18n";
import Link from "next/link";
import { CSSProperties, DetailedHTMLProps, HTMLAttributes } from "react";
import { FaEnvelope } from "react-icons/fa";
import { dict } from "./dictionary";
import { PersonalInfo } from "@/helpers/database/collections/personalInfo";
import { SocialNetworksMetadata } from "@/helpers/database/collections/personalInfo/socialNetwork";

export interface SocialRowProps
    extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    personalInfo: PersonalInfo;
    classNameIcons?: string;
    styleIcons?: CSSProperties;
}

const SocialRow: FCi18n<SocialRowProps> = ({
    lang,
    personalInfo,
    classNameIcons,
    styleIcons,
    ...props
}) => {
    const socialNetworks = personalInfo.socialNetworks;
    const localeDict = dict[lang] ?? dict[i18n.defaultLocale];
    return (
        <div {...props}>
            {socialNetworks.map((sn) => {
                if (sn.userId && sn.userId !== "") {
                    const SocialNetworkIcon =
                        SocialNetworksMetadata[sn.code].icon;
                    const SNLabel = SocialNetworksMetadata[sn.code].label;
                    const url = SocialNetworksMetadata[sn.code].userUrl(
                        sn.userId,
                    );
                    return (
                        <Link
                            key={sn.code}
                            rel="noreferrer noopener"
                            target="_blank"
                            title={`${
                                sn.code === "telegram"
                                    ? localeDict.sendMeAMessageOver
                                    : localeDict.followMeOn
                            } ${SNLabel}!`}
                            href={url}
                        >
                            <SocialNetworkIcon
                                className={classNameIcons}
                                style={styleIcons}
                            />
                        </Link>
                    );
                }
            })}
            <Link
                rel="noreferrer noopener"
                target="_blank"
                title={localeDict.sendMeAnEmail}
                href={`mailto:${personalInfo.contactInfo.email}`}
            >
                <FaEnvelope className={classNameIcons} style={styleIcons} />
            </Link>
        </div>
    );
};

export default SocialRow;
