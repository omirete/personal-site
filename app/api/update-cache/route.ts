import { NextRequest, NextResponse } from "next/server";
import DB from "@/helpers/database/DB";
import { writeFile } from "fs/promises";
import { PathLike, existsSync, mkdirSync } from "fs";

const saveToCache = async (path: PathLike, data: any): Promise<void> => {
    await writeFile(path, JSON.stringify(data), { encoding: "utf-8" });
};

export const GET = async (req: NextRequest): Promise<NextResponse> => {
    if (!existsSync("public/cache")) {
        mkdirSync("public/cache", { recursive: true });
    }
    try {
        const [
            basicInfo,
            contactInfo,
            socialNetworks,
            highlights,
            experience,
            projects,
        ] = await Promise.all([
            DB.personalInfo.basicInfo.get(),
            DB.personalInfo.contactInfo.get(),
            DB.personalInfo.socialNetworks.find().toArray(),
            DB.highlights.find().toArray(),
            DB.experience.find().toArray(),
            DB.projects.find().toArray(),
        ]);
        const personalInfo = {
            basicInfo: basicInfo ?? { name: "" },
            contactInfo: contactInfo ?? { email: "" },
            socialNetworks,
        };
        await Promise.all([
            saveToCache("public/cache/personalInfo.json", personalInfo),
            saveToCache("public/cache/highlights.json", highlights),
            saveToCache("public/cache/experience.json", experience),
            saveToCache("public/cache/projects.json", projects),
        ]);
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
    return NextResponse.json({ ok: true });
};
