import { NextRequest, NextResponse } from "next/server";
import { DB } from "@/helpers/firebase";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import getMissingProperties from "@/helpers/getMissingParams";
import { Experience } from "@/helpers/database/ExperienceCtor";

export const GET = async (req: NextRequest): Promise<NextResponse> => {
    const experience = await DB.data.experience.getAll();
    return NextResponse.json(experience);
};

export const POST = async (req: NextRequest): Promise<NextResponse> => {
    const session = await getServerSession(authOptions);
    if (session) {
        // Authorized
        try {
            const formData: FormData = await req.formData();

            const position = formData.get("position")?.toString();
            const company = formData.get("company")?.toString();
            const dateFrom = formData.get("dateFrom")?.toString();
            const dateTo = formData.get("dateTo")?.toString();
            const description = formData.get("description")?.toString();
            const tags = (formData.get("tags")?.toString() ?? "").split(",");
            const companyUrl = formData.get("companyUrl")?.toString() ?? "";

            if (position && company && dateFrom) {
                const experience: Experience = await DB.data.experience.create({
                    position,
                    company,
                    dateFrom,
                    dateTo,
                    description,
                    tags,
                    companyUrl,
                });
                return NextResponse.json({ experience });
            } else {
                const missingProperties = getMissingProperties({
                    position,
                    company,
                    dateFrom,
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

export const PUT = async (req: NextRequest): Promise<NextResponse> => {
    const session = await getServerSession(authOptions);
    if (session) {
        // Authorized
        try {
            const body: Experience = await req.json();

            const id = body.id;
            const position = body.position;
            const company = body.company;
            const dateFrom = body.dateFrom;
            const dateTo = body.dateTo;
            const description = body.description;
            const tags = body.tags ?? [];
            const companyUrl = body.companyUrl ?? "";

            if (id && position && company && dateFrom) {
                const experience: Experience | false =
                    await DB.data.experience.update({
                        id,
                        position,
                        company,
                        dateFrom,
                        dateTo,
                        description,
                        tags,
                        companyUrl,
                    });
                if (experience !== false) {
                    return NextResponse.json({ experience });
                } else {
                    return NextResponse.json(
                        { error: "Could not update experience" },
                        { status: 400 }
                    );
                }
            } else {
                const missingProperties = getMissingProperties({
                    id,
                    position,
                    company,
                    dateFrom,
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
                const success: boolean = await DB.data.experience.remove(id);
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
