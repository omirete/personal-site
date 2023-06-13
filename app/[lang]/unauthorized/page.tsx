import { i18n, Locale } from "@/i18n/config";
import { NextPage } from "next";
import Link from "next/link";
import { dict } from "./dictionary";

const Home: NextPage<{ params: { lang: Locale } }> = ({ params: { lang } }) => {
    const localeDict = dict[lang ?? i18n.defaultLocale];
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
                    href="/"
                    className="btn btn-secondary btn-sm text-white mb-2"
                >
                    🏠 {localeDict.goHome}
                </Link>
                <div>{localeDict.orSignIn}</div>
            </div>
        </main>
    );
};

export default Home;
