import { NextRequest, NextResponse } from "next/server";

import { DB } from "@/helpers/firebase";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import getMissingProperties from "@/helpers/getMissingParams";
import { Project } from "@/helpers/database/ProjectsCtor";
import { i18n, Locale } from "@/i18n/config";
import StringI18N from "@/i18n/types/StringI18N";

export const GET = async (req: NextRequest): Promise<NextResponse> => {
    const projects = await DB.data.projects.getAll();
    return NextResponse.json(projects);
};

export const POST = async (req: NextRequest): Promise<NextResponse> => {
    const session = await getServerSession(authOptions);
    if (session) {
        // Authorized
        const lang = req.nextUrl.searchParams.get("locale");
        if (lang && i18n.locales.includes(lang as any)) {
            try {
                const formData: FormData = await req.formData();

                // id: string;
                // alias: string;
                // name: string;
                // description: string;
                // fullContent: string;
                // tags: string[];
                // imgUrl?: string;

                const alias = formData.get("alias")?.toString();
                const name = {} as StringI18N;
                name[lang as Locale] = formData.get("name")?.toString();
                const description = {} as StringI18N;
                description[lang as Locale] = formData
                    .get("description")
                    ?.toString();
                const fullContent = {} as StringI18N;
                fullContent[lang as Locale] = formData
                    .get("fullContent")
                    ?.toString();
                const tags = formData.get("tags")?.toString();
                const imgUrl = formData.get("imgUrl")?.toString();

                if (alias && name && description && fullContent) {
                    const project: Project = await DB.data.projects.create({
                        alias,
                        name,
                        fullContent,
                        description,
                        tags: tags?.split(",") ?? [],
                        imgUrl: imgUrl ?? "",
                    });
                    return NextResponse.json({ project });
                } else {
                    const missingProperties = getMissingProperties({
                        alias,
                        name,
                        description,
                        fullContent,
                    });
                    return NextResponse.json({
                        error: `Missing properties: ${missingProperties.join(
                            ", "
                        )}`,
                    });
                }
            } catch (error) {
                return NextResponse.json({ error });
            }
        } else {
            return NextResponse.json(
                {
                    error: "Missing or unsupported locale.",
                },
                { status: 400 }
            );
        }
    } else {
        return NextResponse.json({
            error: "You must be signed in to.",
        });
    }
};

export const PUT = async (req: NextRequest): Promise<NextResponse> => {
    const session = await getServerSession(authOptions);
    if (session) {
        // Authorized
        try {
            const body: Project = await req.json();

            // id: string;
            // alias: string;
            // name: string;
            // description: string;
            // fullContent: string;
            // tags: string[];
            // imgUrl?: string;

            const id = body.id;
            const alias = body.alias;
            const name = body.name;
            const description = body.description;
            const fullContent = body.fullContent;
            const tags = body.tags ?? [];
            const imgUrl = body.imgUrl ?? "";

            if (id && alias && name && description && fullContent) {
                const project: Project | false = await DB.data.projects.update({
                    id,
                    alias,
                    name,
                    description,
                    fullContent,
                    tags,
                    imgUrl,
                });
                if (project !== false) {
                    return NextResponse.json({ project });
                } else {
                    return NextResponse.json(
                        { error: "Could not update project" },
                        { status: 400 }
                    );
                }
            } else {
                const missingProperties = getMissingProperties({
                    id,
                    alias,
                    name,
                    description,
                    fullContent,
                });
                return NextResponse.json({
                    error: `Missing properties: ${missingProperties.join(
                        ", "
                    )}`,
                });
            }
        } catch (error) {
            return NextResponse.json({ error });
        }
    } else {
        return NextResponse.json({
            error: "You must be signed in.",
        });
    }
};

export const DELETE = async (req: NextRequest): Promise<NextResponse> => {
    const session = await getServerSession(authOptions);
    if (session) {
        // Authorized
        try {
            const id = req.nextUrl.searchParams.get("id");
            if (id) {
                const success: boolean = await DB.data.projects.remove(id);
                return NextResponse.json(success);
            } else {
                return NextResponse.json({
                    error: `Missing properties: id`,
                });
            }
        } catch (error) {
            return NextResponse.json({ error });
        }
    } else {
        return NextResponse.json({
            error: "You must be signed in.",
        });
    }
};
