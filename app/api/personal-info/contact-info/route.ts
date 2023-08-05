import { NextRequest, NextResponse } from "next/server";
import DB from "@/helpers/database/DB";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { ContactInfo } from "@/helpers/database/collections/personalInfo/contactInfo";

export const GET = async (req: NextRequest): Promise<NextResponse> => {
    const contactInfo = await DB.personalInfo.contactInfo.get();
    return NextResponse.json(contactInfo);
};

export const PUT = async (req: NextRequest): Promise<NextResponse> => {
    const session = await getServerSession(authOptions);
    if (session) {
        // Authorized
        try {
            const formData = await req.formData();

            const email = formData.get("email")?.toString();
            const phone = formData.get("phone")?.toString();

            if (!email) {
                throw new Error("You need to specify at least your email.");
            } else {
                const dataForUpdate: ContactInfo = {
                    email,
                    phone,
                };
                const result = await DB.personalInfo.contactInfo.set(
                    dataForUpdate
                );
                return NextResponse.json(result);
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
