import StringI18N from "@/i18n/types/StringI18N";

export interface Project {
    alias: string;
    name: StringI18N;
    description: StringI18N;
    fullContent: StringI18N;
    tags: string[];
    imgUrl?: string;
}
