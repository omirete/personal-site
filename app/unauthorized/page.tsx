import { Inter } from "next/font/google";
import { NextPage } from "next";
import LoginButton from "@/components/next-auth/LoginButton";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

const Home: NextPage = () => {
    return (
        <main>
            <div>
                <p>Yeah, right. Nice try. 🤣</p>
            </div>
            <Link href="/" className="btn btn-primary">🏠 Home</Link>
        </main>
    );
};

export default Home;
