import { notFound } from "next/navigation";
import { hasLocale } from "@/i18n/config";
import { NextPage } from "next";
import LoginButton from "@/components/next-auth/LoginButton";
import Link from "next/link";
import { getDictionary } from "@/app/[lang]/dictionaries";

const Home: NextPage<{ params: Promise<{ lang: string }> }> = async ({ params }) => {
    const lang = (await params).lang;
    if (!hasLocale(lang)) notFound();
    const localeDict = (await getDictionary(lang)).unauthorized;
    return (
        <main
            className="min-vh-100 px-1 px-sm-3 py-5"
            style={{
                backgroundImage:
                    "linear-gradient(to right top,#3b4969,#7a5283,#be5678,#e3704f,#d7a319)",
            }}
        >
            <div className="bg-white bg-opacity-75 m-3 p-2 rounded shadow">
                <div className="mb-2">{localeDict.niceTry}</div>
                <Link
                    href={`/${lang}`}
                    className="btn btn-secondary btn-sm text-white mb-2"
                >
                    🏠 {localeDict.goHome}
                </Link>
                <div>{localeDict.signInBefore}<LoginButton lang={lang} dictionary={(await getDictionary(lang)).loginButton} className="btn-sm" />{localeDict.signInAfter}</div>
            </div>
        </main>
    );
};

export default Home;
