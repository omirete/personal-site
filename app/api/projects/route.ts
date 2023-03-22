import { NextRequest, NextResponse } from "next/server";

import { DB } from "@/helpers/firebase";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import getMissingProperties from "@/helpers/getMissingParams";
import { Project } from "@/helpers/database/ProjectsCtor";


export const GET = async (req: NextRequest): Promise<NextResponse> => {
    const projects = await DB.data.projects.getAll();
    return NextResponse.json(projects);
};

export const POST = async (req: NextRequest): Promise<NextResponse> => {
    const session = await getServerSession(authOptions);
    if (session) {
        // Authorized
        try {
            const body: Partial<Project> = await req.json();

            const alias = body.alias;
            const name = body.name;
            const description = body.description;
            const tags = body.tags;

            if (alias && name && description) {
                const project: Project = await DB.data.projects.create({
                    alias: alias,
                    name: name,
                    description: description,
                    tags: tags ?? [],
                });
                return NextResponse.json({ project });
            } else {
                const missingProperties = getMissingProperties({
                    alias,
                    name,
                    description,
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
            error: "You must be signed in to.",
        });
    }
};
