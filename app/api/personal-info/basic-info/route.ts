import { BasicInfo } from "@/helpers/database/PersonalInfoCtor/BasicInfoCtor";
import { DB } from "@/helpers/firebase";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest): Promise<NextResponse> => {
    const basicInfo = await DB.data.personalInfo.basicInfo.ALL.get();
    return NextResponse.json(basicInfo);
};

export const PUT = async (req: NextRequest): Promise<NextResponse> => {
    const session = await getServerSession(authOptions);
    if (session) {
        // Authorized
        try {
            const body: BasicInfo = await req.json();

            const name = body.name;
            const lastName = body.lastName;
            const dateOfBirth = body.dateOfBirth;
            const title = body.title;
            const subtitle = body.subtitle;
            const description = body.description;

            if (!name) {
                throw new Error("You need to specify at least your name.");
            } else {
                const dataForUpdate: BasicInfo = {
                    name,
                    lastName,
                    dateOfBirth,
                    title,
                    subtitle,
                    description,
                };
                DB.data.personalInfo.basicInfo.ALL.set(dataForUpdate);
                return NextResponse.json(dataForUpdate);
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
