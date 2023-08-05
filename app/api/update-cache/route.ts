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
        const basicInfo = await DB.personalInfo.basicInfo.get();
        const contactInfo = await DB.personalInfo.contactInfo.get();
        const personalInfo = {
            basicInfo: basicInfo ?? { name: "" },
            contactInfo: contactInfo ?? { email: "" },
            socialNetworks: await DB.personalInfo.socialNetworks
                .find()
                .toArray(),
        };
        await saveToCache("public/cache/personalInfo.json", personalInfo);
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
    try {
        await saveToCache(
            "public/cache/highlights.json",
            await DB.highlights.find().toArray()
        );
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
    try {
        await saveToCache(
            "public/cache/experience.json",
            await DB.experience.find().toArray()
        );
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
    try {
        await saveToCache(
            "public/cache/projects.json",
            await DB.projects.find().toArray()
        );
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
    return NextResponse.json({ ok: true });
};
