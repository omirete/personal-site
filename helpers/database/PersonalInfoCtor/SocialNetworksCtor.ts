import { Database, get, ref, set } from "firebase/database";
import { ReactNode } from "react";
import { PropertyGetterSetterCtor } from "../GenericCtors";
import { FaTwitter, FaFacebook, FaSoundcloud, FaLinkedin, FaGithub, FaInstagram, FaYoutube, FaTelegram } from 'react-icons/fa'
import { IconType } from "react-icons";

export interface SocialNetworks {
    twitter?: string;
    github?: string;
    facebook?: string;
    soundcloud?: string;
    instagram?: string;
    linkedin?: string;
    youtube?: string;
    telegram?: string;
}

export class SocialNetworksMetadata {
    static readonly twitter = new SocialNetworksMetadata("twitter", "Twitter", FaTwitter, (username) => `https://twitter.com/${username}`)
    static readonly github = new SocialNetworksMetadata("github", "GitHub", FaGithub, (username) => `https://github.com/${username}`)
    static readonly facebook = new SocialNetworksMetadata("facebook", "Facebook", FaFacebook, (username) => `https://www.facebook.com/${username}`)
    static readonly soundcloud = new SocialNetworksMetadata("soundcloud", "SoundCloud", FaSoundcloud, (username) => `https://soundcloud.com/${username}`)
    static readonly instagram = new SocialNetworksMetadata("instagram", "Instagram", FaInstagram, (username) => `https://www.instagram.com/${username}`)
    static readonly linkedin = new SocialNetworksMetadata("linkedin", "LinkedIn", FaLinkedin, (username) => `https://www.linkedin.com/in/${username}`)
    static readonly youtube = new SocialNetworksMetadata("youtube", "YouTube", FaYoutube, (username) => `https://www.youtube.com/channel/${username}`)
    static readonly telegram = new SocialNetworksMetadata("telegram", "Telegram", FaTelegram, (username) => `https://t.me/${username}`)

    // private to disallow creating other instances of this type
    private constructor(
        public readonly code: keyof SocialNetworks,
        public readonly label: string,
        public readonly icon: IconType | null,
        public readonly userUrl: (username: string) => string,
    ) {}

    // toString() {
    //     return this.key;
    // }
}

export default class SocialNetworksCtor {
    ALL: PropertyGetterSetterCtor<Record<keyof SocialNetworks, string> | undefined>;
    twitter: PropertyGetterSetterCtor<string | undefined>;
    github: PropertyGetterSetterCtor<string | undefined>;
    facebook: PropertyGetterSetterCtor<string | undefined>;
    soundcloud: PropertyGetterSetterCtor<string | undefined>;
    instagram: PropertyGetterSetterCtor<string | undefined>;
    linkedin: PropertyGetterSetterCtor<string | undefined>;
    youtube: PropertyGetterSetterCtor<string | undefined>;
    telegram: PropertyGetterSetterCtor<string | undefined>;
    
    constructor(db: Database, parent_path: string) {
        const path = `${parent_path}/socialNetworks`;
        this.ALL = new PropertyGetterSetterCtor(
            db,
            path
        )
        this.twitter = new PropertyGetterSetterCtor(
            db,
            path,
            "twitter"
        );
        this.github = new PropertyGetterSetterCtor(
            db,
            path,
            "github"
        );
        this.facebook = new PropertyGetterSetterCtor(
            db,
            path,
            "facebook"
        );
        this.soundcloud = new PropertyGetterSetterCtor(
            db,
            path,
            "soundcloud"
        );
        this.instagram = new PropertyGetterSetterCtor(
            db,
            path,
            "instagram"
        );
        this.linkedin = new PropertyGetterSetterCtor(
            db,
            path,
            "linkedin"
        );
        this.youtube = new PropertyGetterSetterCtor(
            db,
            path,
            "youtube"
        );
        this.telegram = new PropertyGetterSetterCtor(
            db,
            path,
            "telegram"
        );
    }
}
