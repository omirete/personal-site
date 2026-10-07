export const MAX_UPLOAD_SIZE = 50 * 1024 * 1024;

export const getUploadConfig = (type: string, lang: string, name: string) => {
    const language = lang.toLowerCase();
    if (language !== "-1" && !["en", "es", "de"].includes(language)) {
        throw new Error("Invalid language.");
    }
    if (type === "certificate") {
        if (name.split(".").pop()?.toLowerCase() !== "pdf") {
            throw new Error("File must be .pdf.");
        }
        const filename = name.replace(/\\/g, "/").split("/").pop()!;
        return {
            extension: "pdf",
            contentTypes: ["application/pdf"],
            pathname: `certificates/${filename}`,
        };
    }
    const formats: Record<string, { extension: string; contentTypes: string[]; pathname: string }> = {
        "profile-pic": { extension: "png", contentTypes: ["image/png"], pathname: "profile.png" },
        "contact-pic": { extension: "webp", contentTypes: ["image/webp"], pathname: "contact.webp" },
        "signature-line": { extension: "svg", contentTypes: ["image/svg+xml"], pathname: "signature-line.svg" },
        signature: { extension: "svg", contentTypes: ["image/svg+xml"], pathname: "signature.svg" },
        cv: { extension: "pdf", contentTypes: ["application/pdf"], pathname: `cv/Federico_Giancarelli_${language.toUpperCase()}.pdf` },
        "voice-note": { extension: "m4a", contentTypes: ["audio/mp4", "audio/x-m4a", "audio/m4a"], pathname: `voice-notes/${language}.m4a` },
    };
    if (!Object.hasOwn(formats, type)) throw new Error("Invalid file type.");
    if (["cv", "voice-note"].includes(type) && language === "-1") {
        throw new Error("You must specify a language for this file.");
    }
    const config = formats[type];
    if (name.split(".").pop()?.toLowerCase() !== config.extension) {
        throw new Error(`File must be .${config.extension}.`);
    }
    return config;
};
