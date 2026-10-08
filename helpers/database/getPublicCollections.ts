import { cacheLife, cacheTag } from "next/cache";
import DB from "./DB";
import { Highlight } from "./collections/highlight";
import { Experience } from "./collections/experience";
import { Project } from "./collections/project";
import { PersonalInfo } from "./collections/personalInfo";
import WithStringId from "@/types/WithStringId";
import parseIdsAsStringIds from "./parseIdsAsStringIds";
import { PUBLIC_CONTENT_TAG } from "./publicCache";

export async function getPublicPersonalInfo(): Promise<PersonalInfo> {
    "use cache: remote";
    cacheTag(PUBLIC_CONTENT_TAG);
    cacheLife("max");
    const [basicInfo, contactInfo, socialNetworks] = await Promise.all([
        DB.personalInfo.basicInfo.get(),
        DB.personalInfo.contactInfo.get(),
        DB.personalInfo.socialNetworks.find().toArray(),
    ]);
    return {
        basicInfo: basicInfo ?? { name: "" },
        contactInfo: contactInfo ?? { email: "" },
        socialNetworks: parseIdsAsStringIds(socialNetworks),
    };
}

export async function getPublicHighlights(): Promise<WithStringId<Highlight>[]> {
    "use cache: remote";
    cacheTag(PUBLIC_CONTENT_TAG);
    cacheLife("max");
    return parseIdsAsStringIds(await DB.highlights.find().toArray());
}

export async function getPublicExperience(): Promise<WithStringId<Experience>[]> {
    "use cache: remote";
    cacheTag(PUBLIC_CONTENT_TAG);
    cacheLife("max");
    return parseIdsAsStringIds(await DB.experience.find().toArray());
}

export async function getPublicProjects(): Promise<WithStringId<Project>[]> {
    "use cache: remote";
    cacheTag(PUBLIC_CONTENT_TAG);
    cacheLife("max");
    return parseIdsAsStringIds(await DB.projects.find().toArray());
}
