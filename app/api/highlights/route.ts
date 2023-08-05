import { NextRequest, NextResponse } from "next/server";
import DB from "@/helpers/database/DB";
import { i18n, Locale } from "@/i18n/config";
import StringI18N from "@/i18n/types/StringI18N";
import { Highlight } from "@/helpers/database/collections/highlight";
import WithStringId from "@/types/WithStringId";
import PUTGeneric from "@/helpers/api/PUTGeneric";
import DELETEGeneric from "@/helpers/api/DELETEGeneric";
import POSTGeneric from "@/helpers/api/POSTGeneric";
import buildStringI18N from "@/i18n/helpers/buildStringI18N";

export const GET = async (req: NextRequest): Promise<NextResponse> => {
    const highlights = await DB.highlights.find().toArray();
    return NextResponse.json(highlights);
};

export const POST = async (req: NextRequest): Promise<NextResponse> => {
    const lang = req.nextUrl.searchParams.get("locale");
    if (lang && i18n.locales.includes(lang as any)) {
        const formData: FormData = await req.formData();

        return await POSTGeneric(req, DB.highlights, {
            title: buildStringI18N(
                lang as Locale,
                formData.get("title")?.toString() ?? ""
            ) as StringI18N,
            description: buildStringI18N(
                lang as Locale,
                formData.get("description")?.toString()
            ),
        });
    } else {
        return NextResponse.json(
            { error: "Missing or unsupported locale." },
            { status: 400 }
        );
    }
};

export const PUT = async (req: NextRequest): Promise<NextResponse> => {
    const body: WithStringId<Highlight> = await req.json();
    const id = body._id;
    return await PUTGeneric(req, DB.highlights, id, {
        title: body.title,
        description: body.description,
    });
};

export const DELETE = async (req: NextRequest): Promise<NextResponse> => {
    return await DELETEGeneric(req, DB.highlights);
};
