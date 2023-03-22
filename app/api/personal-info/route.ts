import {
    SocialNetworks,
    SocialNetworksMetadata,
} from "@/helpers/database/PersonalInfoCtor/SocialNetworksCtor";
import { DB } from "@/helpers/firebase";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest): Promise<NextResponse> => {
    const personalInfo = await DB.data.personalInfo.ALL.get();
    return NextResponse.json(personalInfo);
};

export const PUT = async (req: NextRequest): Promise<NextResponse> => {
    const session = await getServerSession(authOptions);
    if (session) {
        // Authorized
        try {
            const formData = await req.formData();
            const dataForUpdate: Partial<Record<keyof SocialNetworks, string>> =
                {};
            Object.keys(SocialNetworksMetadata).forEach((socialNetwork) => {
                const username = formData.get(socialNetwork)?.toString();
                if (username) {
                    dataForUpdate[socialNetwork as keyof SocialNetworks] =
                        username;
                } else {
                    dataForUpdate[socialNetwork as keyof SocialNetworks] = "";
                }
            });

            DB.data.personalInfo.socialNetworks.ALL.set(
                dataForUpdate as Record<keyof SocialNetworks, string>
            );

            return NextResponse.json(dataForUpdate);
        } catch (error) {
            return NextResponse.json({ error });
        }
    } else {
        return NextResponse.json({
            error: "You must be signed in.",
        });
    }
};
