import DB from "@/helpers/database/DB";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest): Promise<NextResponse> => {
    const experience = await DB.experience.find().toArray();
    return NextResponse.json(experience);
};
