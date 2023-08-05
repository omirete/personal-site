import StringI18N from "@/i18n/types/StringI18N";

export interface BasicInfo {
    name: string;
    lastName?: string;
    dateOfBirth?: string;
    title?: StringI18N;
    subtitle?: StringI18N;
    description?: StringI18N;
}
