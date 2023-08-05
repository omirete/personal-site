import DB from "@/helpers/database/DB";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest): Promise<NextResponse> => {
    const personalInfo = {
        basicInfo: await DB.personalInfo.basicInfo.get(),
        contactInfo: await DB.personalInfo.contactInfo.get(),
        socialNetworks: await DB.personalInfo.socialNetworks.find().toArray(),
    };
    return NextResponse.json(personalInfo);
};
