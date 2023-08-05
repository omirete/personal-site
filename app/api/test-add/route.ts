import DB from "@/helpers/database/DB";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest): Promise<NextResponse> => {
    const experience = await DB.experience.insertOne({
        title: { de: "Titel", en: "Title", es: "Título" },
        institution: "",
        dateFrom: "",
        type: "work",
        tags: ["abc", "de", "fghijk"],
    });
    return NextResponse.json(experience);
};
