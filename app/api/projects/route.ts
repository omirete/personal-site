import { NextRequest, NextResponse } from "next/server";
import DB from "@/helpers/database/DB";
import { i18n, Locale } from "@/i18n/config";
import StringI18N from "@/i18n/types/StringI18N";
import { Project } from "@/helpers/database/collections/project";
import WithStringId from "@/types/WithStringId";
import PUTGeneric from "@/helpers/api/PUTGeneric";
import DELETEGeneric from "@/helpers/api/DELETEGeneric";
import POSTGeneric from "@/helpers/api/POSTGeneric";
import buildStringI18N from "@/i18n/helpers/buildStringI18N";

export const GET = async (req: NextRequest): Promise<NextResponse> => {
    const projects = await DB.projects.find().toArray();
    return NextResponse.json(projects);
};

export const POST = async (req: NextRequest): Promise<NextResponse> => {
    const lang = req.nextUrl.searchParams.get("locale");
    if (lang && i18n.locales.includes(lang as any)) {
        const formData: FormData = await req.formData();
        const alias = formData.get("alias")?.toString();
        if (alias) {
            return await POSTGeneric(req, DB.projects, {
                alias,
                name: buildStringI18N(
                    lang as Locale,
                    formData.get("name")?.toString() ?? ""
                ) as StringI18N,
                description: buildStringI18N(
                    lang as Locale,
                    formData.get("description")?.toString() ?? ""
                ) as StringI18N,
                fullContent: buildStringI18N(
                    lang as Locale,
                    formData.get("fullContent")?.toString() ?? ""
                ) as StringI18N,
                tags: formData.get("tags")?.toString().split(",") ?? [],
                imgUrl: formData.get("imgUrl")?.toString(),
            });
        } else {
            return NextResponse.json(
                { error: "Missing alias." },
                { status: 400 }
            );
        }
    } else {
        return NextResponse.json(
            { error: "Missing or unsupported locale." },
            { status: 400 }
        );
    }
};

export const PUT = async (req: NextRequest): Promise<NextResponse> => {
    const body: WithStringId<Project> = await req.json();
    const id = body._id;
    return await PUTGeneric(req, DB.projects, id, {
        alias: body.alias,
        name: body.name,
        description: body.description,
        fullContent: body.fullContent,
        tags: body.tags ?? [],
        imgUrl: body.imgUrl ?? "",
    });
};

export const DELETE = async (req: NextRequest): Promise<NextResponse> => {
    return await DELETEGeneric(req, DB.projects);
};
