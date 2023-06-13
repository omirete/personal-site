import { NextRequest, NextResponse } from "next/server";
import { DB } from "@/helpers/firebase";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import getMissingProperties from "@/helpers/getMissingParams";
import { Highlight } from "@/helpers/database/HighlightsCtor";
import { i18n, Locale } from "@/i18n/config";
import StringI18N from "@/i18n/types/StringI18N";

export const GET = async (req: NextRequest): Promise<NextResponse> => {
    const highlights = await DB.data.highlights.getAll();
    return NextResponse.json(highlights);
};

export const POST = async (req: NextRequest): Promise<NextResponse> => {
    const session = await getServerSession(authOptions);
    if (session) {
        // Authorized
        const lang = req.nextUrl.searchParams.get("locale");
        if (lang && i18n.locales.includes(lang as any)) {
            try {
                const formData: FormData = await req.formData();

                const title = {} as StringI18N;
                title[lang as Locale] = formData.get("title")?.toString();
                const description = {} as StringI18N;
                description[lang as Locale] = formData
                    .get("description")
                    ?.toString();

                if (title) {
                    const highlight: Highlight =
                        await DB.data.highlights.create({
                            title,
                            description,
                        });
                    return NextResponse.json({ highlight });
                } else {
                    const missingProperties = getMissingProperties({
                        title,
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
            const body: Highlight = await req.json();

            const id = body.id;
            const title = body.title;
            const description = body.description;

            if (id && title) {
                const highlight: Highlight | false =
                    await DB.data.highlights.update({
                        id,
                        description,
                        title,
                    });
                if (highlight !== false) {
                    return NextResponse.json({ highlight });
                } else {
                    return NextResponse.json(
                        { error: "Could not update highlight." },
                        { status: 400 }
                    );
                }
            } else {
                const missingProperties = getMissingProperties({
                    id,
                    title,
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
                const success: boolean = await DB.data.highlights.remove(id);
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
