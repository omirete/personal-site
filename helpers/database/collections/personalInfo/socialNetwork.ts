import {
    FaFacebook,
    FaGithub,
    FaInstagram,
    FaLinkedin,
    FaSoundcloud,
    FaTelegram,
    FaTwitter,
    FaYoutube,
} from "react-icons/fa";
import { IconType } from "react-icons";

export type SupportedSocialNetwork =
    | "twitter"
    | "github"
    | "facebook"
    | "soundcloud"
    | "instagram"
    | "linkedin"
    | "youtube"
    | "telegram";

export interface SocialNetwork {
    code: SupportedSocialNetwork;
    userId: string;
}

export class SocialNetworksMetadata {
    static readonly twitter = new SocialNetworksMetadata(
        "twitter",
        "Twitter",
        FaTwitter,
        (username) => `https://twitter.com/${username}`
    );
    static readonly github = new SocialNetworksMetadata(
        "github",
        "GitHub",
        FaGithub,
        (username) => `https://github.com/${username}`
    );
    static readonly facebook = new SocialNetworksMetadata(
        "facebook",
        "Facebook",
        FaFacebook,
        (username) => `https://www.facebook.com/${username}`
    );
    static readonly soundcloud = new SocialNetworksMetadata(
        "soundcloud",
        "SoundCloud",
        FaSoundcloud,
        (username) => `https://soundcloud.com/${username}`
    );
    static readonly instagram = new SocialNetworksMetadata(
        "instagram",
        "Instagram",
        FaInstagram,
        (username) => `https://www.instagram.com/${username}`
    );
    static readonly linkedin = new SocialNetworksMetadata(
        "linkedin",
        "LinkedIn",
        FaLinkedin,
        (username) => `https://www.linkedin.com/in/${username}`
    );
    static readonly youtube = new SocialNetworksMetadata(
        "youtube",
        "YouTube",
        FaYoutube,
        (username) => `https://www.youtube.com/channel/${username}`
    );
    static readonly telegram = new SocialNetworksMetadata(
        "telegram",
        "Telegram",
        FaTelegram,
        (username) => `https://t.me/${username}`
    );

    // private to disallow creating other instances of this type
    private constructor(
        public readonly code: SupportedSocialNetwork,
        public readonly label: string,
        public readonly icon: IconType,
        public readonly userUrl: (username: string) => string
    ) {}
}
