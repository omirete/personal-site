import { cache } from "react";
import DB from "./DB";
import { Highlight } from "./collections/highlight";
import { Experience } from "./collections/experience";
import { Project } from "./collections/project";
import { PersonalInfo } from "./collections/personalInfo";
import WithStringId from "@/types/WithStringId";
import parseIdsAsStringIds from "./parseIdsAsStringIds";
import { readPublicCache } from "./readPublicCache";

export const getPublicPersonalInfo = cache(() =>
    readPublicCache<PersonalInfo | null>("personalInfo.json", async () => {
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
    }),
);

export const getPublicHighlights = cache(() =>
    readPublicCache<WithStringId<Highlight>[]>("highlights.json", async () =>
        parseIdsAsStringIds(await DB.highlights.find().toArray()),
    ),
);

export const getPublicExperience = cache(() =>
    readPublicCache<WithStringId<Experience>[]>("experience.json", async () =>
        parseIdsAsStringIds(await DB.experience.find().toArray()),
    ),
);

export const getPublicProjects = cache(() =>
    readPublicCache<WithStringId<Project>[]>("projects.json", async () =>
        parseIdsAsStringIds(await DB.projects.find().toArray()),
    ),
);
