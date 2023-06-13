import { PersonalInfo } from "@/helpers/database/PersonalInfoCtor";
import { SocialNetworksMetadata } from "@/helpers/database/PersonalInfoCtor/SocialNetworksCtor";
import { i18n } from "@/i18n/config";
import FCi18n from "@/i18n/types/FCi18n";
import Link from "next/link";
import { CSSProperties, DetailedHTMLProps, HTMLAttributes } from "react";
import {
    FaLinkedin,
    FaGithub,
    FaTwitter,
    FaTelegram,
    FaEnvelope,
    FaInstagram,
    FaFacebook,
    FaSoundcloud,
    FaYoutube,
} from "react-icons/fa";
import { dict } from "./dictionary";

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
    const localeDict = dict[lang ?? i18n.defaultLocale];
    return (
        <div {...props}>
            {socialNetworks.linkedin && (
                <Link
                    rel="noreferrer noopener"
                    target="_blank"
                    title={`${localeDict.followMeOn} LinkedIn!`}
                    href={SocialNetworksMetadata.linkedin.userUrl(
                        socialNetworks.linkedin
                    )}
                >
                    <FaLinkedin className={classNameIcons} style={styleIcons} />
                </Link>
            )}
            {socialNetworks.github && (
                <Link
                    rel="noreferrer noopener"
                    target="_blank"
                    title={`${localeDict.followMeOn} GitHub!`}
                    href={SocialNetworksMetadata.github.userUrl(
                        socialNetworks.github
                    )}
                >
                    <FaGithub className={classNameIcons} style={styleIcons} />
                </Link>
            )}
            {socialNetworks.twitter && (
                <Link
                    rel="noreferrer noopener"
                    target="_blank"
                    title={`${localeDict.followMeOn} Twitter!`}
                    href={SocialNetworksMetadata.twitter.userUrl(
                        socialNetworks.twitter
                    )}
                >
                    <FaTwitter className={classNameIcons} style={styleIcons} />
                </Link>
            )}
            {socialNetworks.telegram && (
                <Link
                    rel="noreferrer noopener"
                    target="_blank"
                    title={`${localeDict.sendMeAMessageOver} Telegram!`}
                    href={SocialNetworksMetadata.telegram.userUrl(
                        socialNetworks.telegram
                    )}
                >
                    <FaTelegram className={classNameIcons} style={styleIcons} />
                </Link>
            )}
            {socialNetworks.instagram && (
                <Link
                    rel="noreferrer noopener"
                    target="_blank"
                    title={`${localeDict.followMeOn} Instagram!`}
                    href={SocialNetworksMetadata.instagram.userUrl(
                        socialNetworks.instagram
                    )}
                >
                    <FaInstagram
                        className={classNameIcons}
                        style={styleIcons}
                    />
                </Link>
            )}
            {socialNetworks.facebook && (
                <Link
                    rel="noreferrer noopener"
                    target="_blank"
                    title={`${localeDict.followMeOn} Facebook!`}
                    href={SocialNetworksMetadata.facebook.userUrl(
                        socialNetworks.facebook
                    )}
                >
                    <FaFacebook className={classNameIcons} style={styleIcons} />
                </Link>
            )}
            {socialNetworks.soundcloud && (
                <Link
                    rel="noreferrer noopener"
                    target="_blank"
                    title={`${localeDict.followMeOn} SoundCloud!`}
                    href={SocialNetworksMetadata.soundcloud.userUrl(
                        socialNetworks.soundcloud
                    )}
                >
                    <FaSoundcloud
                        className={classNameIcons}
                        style={styleIcons}
                    />
                </Link>
            )}
            {socialNetworks.youtube && (
                <Link
                    rel="noreferrer noopener"
                    target="_blank"
                    title={`${localeDict.followMeOn} YouTube!`}
                    href={SocialNetworksMetadata.youtube.userUrl(
                        socialNetworks.youtube
                    )}
                >
                    <FaYoutube className={classNameIcons} style={styleIcons} />
                </Link>
            )}
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
