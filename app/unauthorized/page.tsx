import { NextPage } from "next";
import Link from "next/link";

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
