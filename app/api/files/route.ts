import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import getMissingProperties from "@/helpers/getMissingParams";
import { getFiles, uploadBlob } from "@/helpers/fileStorage";

export const GET = async (req: NextRequest): Promise<NextResponse> => {
    const session = await getServerSession(authOptions);
    if (session) {
        // Authorized
        const files = await getFiles("/", true);
        if (files !== false) {
            return NextResponse.json({ files, msg: "ok" });
        } else {
            return NextResponse.json({
                files: [],
                error: "Could not list uploaded files. Please refresh the site",
            });
        }
    } else {
        return NextResponse.json({
            error: "You must be signed in.",
        });
    }
};

export const POST = async (req: NextRequest): Promise<NextResponse> => {
    const session = await getServerSession(authOptions);
    if (session) {
        // Authorized
        try {
            const params = req.nextUrl.searchParams;
            const type = params.get("type");
            const lang = params.get("lang");

            if (type && lang) {
                if (lang === "-1" || lang.toLowerCase().match(/^[a-z]{2}$/)) {
                    let directory = "/";
                    let filename = "";
                    switch (type) {
                        case "profile-pic":
                            // TODO: Add handling of other image formats.
                            filename = "profile.png";
                            break;
                        case "signature-line":
                            filename = "signature-line.svg";
                            break
                        case "signature":
                            filename = "signature.svg";
                            break
                        case "cv":
                            // TODO: Add handling of other document formats.
                            // TODO: Add handling of other names.
                            if (lang !== "-1") {
                                directory += "cv/";
                                filename = `Federico_Giancarelli_${lang.toUpperCase()}.pdf`;
                            } else {
                                return NextResponse.json({
                                    error: `You must specify a language for the cv.`,
                                });
                            }
                            break;
                        case "voice-note":
                            // TODO: Add handling of other audio formats.
                            if (lang !== "-1") {
                                directory += "voice-notes/";
                                filename = `${lang.toLowerCase()}.m4a`;
                            } else {
                                return NextResponse.json({
                                    error: `You must specify a language for the cv.`,
                                });
                            }
                            break;
                        default:
                            return NextResponse.json({
                                error: `Invalid file type.`,
                            });
                    }
                    const result = await uploadBlob(
                        await req.blob(),
                        directory,
                        filename
                    );
                    return NextResponse.json({ upload_ok: result });
                } else {
                    return NextResponse.json({ error: `Invalid lang.` });
                }
            } else {
                const missingParams = getMissingProperties({
                    type,
                    lang,
                });
                return NextResponse.json({
                    error: `Missing params: ${missingParams.join(", ")}`,
                });
            }
        } catch (error) {
            return NextResponse.json({ error });
        }
    } else {
        return NextResponse.json({
            error: "You must be signed in to upload a file.",
        });
    }
};
