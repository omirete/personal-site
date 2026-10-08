import { Metadata } from "next";
import { BasicInfo } from "./database/collections/personalInfo/basicInfo";
import { PersonalInfo } from "./database/collections/personalInfo";
import { Locale } from "@/i18n/config";
import parseStringI18N from "@/i18n/helpers/parseStringI18N";
import { getFileUrl } from "./fileStorage/publicUrl";

export const getFullName = (basicInfo: BasicInfo): string =>
    [basicInfo.name, basicInfo.lastName].map((part) => part?.trim()).filter(Boolean).join(" ");

export const getPersonalInfoMetadata = (
    personalInfo: PersonalInfo | null,
    lang: Locale,
): Metadata => {
    const name = personalInfo ? getFullName(personalInfo.basicInfo) : "";
    const description = personalInfo
        ? [personalInfo.basicInfo.title, personalInfo.basicInfo.subtitle]
            .map((text) => parseStringI18N(text, lang).trim())
            .filter(Boolean).join(" ")
        : "";
    const twitterUserId = personalInfo?.socialNetworks
        .find((network) => network.code === "twitter")?.userId.trim().replace(/^@+/, "");
    const twitterHandle = twitterUserId ? `@${twitterUserId}` : undefined;
    return {
        title: name || undefined,
        description: description || undefined,
        twitter: {
            card: "summary_large_image",
            title: name || undefined,
            description: description || undefined,
            ...(twitterHandle ? { site: twitterHandle, creator: twitterHandle } : {}),
            images: [{
                url: getFileUrl("meta/twitter-card.webp"),
                width: 1000,
                height: 500,
                alt: "Twitter card for website federicogiancarelli.com",
            }],
        },
        openGraph: {
            title: name || undefined,
            description: description || undefined,
            type: "website",
            images: [{
                url: getFileUrl("meta/twitter-card.webp"),
                width: 1000,
                height: 500,
            }],
            url: "https://federicogiancarelli.com",
        },
    };
};
