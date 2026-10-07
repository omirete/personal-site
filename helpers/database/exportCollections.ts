export const exportCollections = [
    "experience",
    "highlights",
    "links",
    "projects",
    "basicInfo",
    "contactInfo",
    "socialNetworks",
] as const;

export type ExportCollection = (typeof exportCollections)[number];

export function isExportCollection(value: string): value is ExportCollection {
    return exportCollections.some((collection) => collection === value);
}
