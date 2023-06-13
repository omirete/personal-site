import { NextRequest, NextResponse } from "next/server";
import { DB } from "@/helpers/firebase";
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
        await saveToCache(
            "public/cache/personalInfo.json",
            await DB.data.personalInfo.ALL.get()
        );
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
    try {
        await saveToCache(
            "public/cache/highlights.json",
            await DB.data.highlights.getAll()
        );
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
    try {
        await saveToCache(
            "public/cache/experience.json",
            await DB.data.experience.getAll()
        );
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
    try {
        await saveToCache(
            "public/cache/projects.json",
            await DB.data.projects.getAll()
        );
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
    return NextResponse.json({ ok: true });
};
