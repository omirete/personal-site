import type { FC } from "react";
import type { Locale } from "@/i18n/config";
import Link from "next/link";
import { CSSProperties, DetailedHTMLProps, HTMLAttributes } from "react";
import { FaEnvelope } from "react-icons/fa";
import { getDictionary } from "@/app/[lang]/dictionaries";
import { PersonalInfo } from "@/helpers/database/collections/personalInfo";
import { SocialNetworksMetadata } from "@/helpers/database/collections/personalInfo/socialNetwork";

export interface SocialRowProps
    extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    personalInfo: PersonalInfo;
    classNameIcons?: string;
    styleIcons?: CSSProperties;
}

const SocialRow: FC<{ lang: Locale } & SocialRowProps> = async ({
    lang,
    personalInfo,
    classNameIcons,
    styleIcons,
    ...props
}) => {
    const socialNetworks = personalInfo.socialNetworks;
    const localeDict = (await getDictionary(lang)).socialRow;
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
