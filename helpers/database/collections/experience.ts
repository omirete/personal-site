import StringI18N from "@/i18n/types/StringI18N";

export type SupportedExperienceTypes = "work" | "studies";

export interface Experience {
    institution: string;
    relevantUrl?: string;
    title: StringI18N;
    dateFrom: string;
    dateTo?: string;
    description?: StringI18N;
    type: SupportedExperienceTypes;
    tags: string[];
}
