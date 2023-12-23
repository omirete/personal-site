import { NextRequest, NextResponse } from "next/server";
import DB from "@/helpers/database/DB";
import { authOptions } from "@/helpers/auth";
import { getServerSession } from "next-auth";
import {
    SocialNetwork,
    SocialNetworksMetadata,
    SupportedSocialNetwork,
} from "@/helpers/database/collections/personalInfo/socialNetwork";

export const GET = async (req: NextRequest): Promise<NextResponse> => {
    const socialNetworks = await DB.personalInfo.socialNetworks
        .find()
        .toArray();
    return NextResponse.json(socialNetworks);
};

export const PUT = async (req: NextRequest): Promise<NextResponse> => {
    const session = await getServerSession(authOptions);
    if (session) {
        // Authorized
        try {
            const formData = await req.formData();
            const dataForUpdate: SocialNetwork[] = [];
            Object.keys(SocialNetworksMetadata).forEach((socialNetwork) => {
                const username = formData.get(socialNetwork)?.toString();
                if (username) {
                    dataForUpdate.push({
                        code: socialNetwork as SupportedSocialNetwork,
                        userId: username,
                    });
                } else {
                    dataForUpdate.push({
                        code: socialNetwork as SupportedSocialNetwork,
                        userId: "",
                    });
                }
            });

            await DB.personalInfo.socialNetworks.deleteMany({
                _id: { $ne: undefined },
            });
            await DB.personalInfo.socialNetworks.insertMany(dataForUpdate);

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
