import { NextRequest, NextResponse } from "next/server";
import DB from "@/helpers/database/DB";
import { i18n, Locale } from "@/i18n/config";
import {
    Experience,
    SupportedExperienceTypes,
} from "@/helpers/database/collections/experience";
import WithStringId from "@/types/WithStringId";
import PUTGeneric from "@/helpers/api/PUTGeneric";
import DELETEGeneric from "@/helpers/api/DELETEGeneric";
import POSTGeneric from "@/helpers/api/POSTGeneric";
import buildStringI18N from "@/i18n/helpers/buildStringI18N";
import StringI18N from "@/i18n/types/StringI18N";

export const GET = async (req: NextRequest): Promise<NextResponse> => {
    const experience = await DB.experience.find().toArray();
    return NextResponse.json(experience);
};

export const POST = async (req: NextRequest): Promise<NextResponse> => {
    const lang = req.nextUrl.searchParams.get("locale");
    if (lang && i18n.locales.includes(lang as any)) {
        const formData: FormData = await req.formData();
        return await POSTGeneric(req, DB.experience, {
            type:
                (formData
                    .get("type")
                    ?.toString() as SupportedExperienceTypes) ?? "work",
            title: buildStringI18N(
                lang as Locale,
                formData.get("title")?.toString() ?? ""
            ) as StringI18N,
            description: buildStringI18N(
                lang as Locale,
                formData.get("description")?.toString()
            ),
            institution: formData.get("institution")?.toString() ?? "",
            dateFrom: formData.get("dateFrom")?.toString() ?? "",
            dateTo: formData.get("dateTo")?.toString(),
            tags: (formData.get("tags")?.toString() ?? "").split(","),
            relevantUrl: formData.get("relevantUrl")?.toString() ?? "",
        });
    } else {
        return NextResponse.json(
            { error: "Missing or unsupported locale." },
            { status: 400 }
        );
    }
};

export const PUT = async (req: NextRequest): Promise<NextResponse> => {
    const body: WithStringId<Experience> = await req.json();
    const id = body._id;
    return await PUTGeneric(req, DB.experience, id, {
        type: body.type,
        title: body.title,
        institution: body.institution,
        dateFrom: body.dateFrom,
        dateTo: body.dateTo,
        description: body.description,
        tags: body.tags ?? [],
        relevantUrl: body.relevantUrl ?? "",
    });
};

export const DELETE = async (req: NextRequest): Promise<NextResponse> => {
    return await DELETEGeneric(req, DB.experience);
};
