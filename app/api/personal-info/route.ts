import {
    SocialNetworks,
    SocialNetworksMetadata,
} from "@/helpers/database/PersonalInfoCtor/SocialNetworksCtor";
import { DB } from "@/helpers/firebase";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest): Promise<NextResponse> => {
    const personalInfo = await DB.data.personalInfo.ALL.get();
    return NextResponse.json(personalInfo);
};
