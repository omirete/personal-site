import { Inter } from "next/font/google";
import { NextPage } from "next";

const inter = Inter({ subsets: ["latin"] });

const Home: NextPage = () => {
    return (
        <main>
            <div className="bg-light">light</div>
            <div className="bg-dark">dark</div>
            <div className="bg-primary">primary</div>
            <div className="bg-secondary">secondary</div>
            <div className="bg-info">info</div>
            <div className="bg-success">success</div>
            <div className="bg-warning">warning</div>
            <div className="bg-danger">danger</div>
        </main>
    );
};

export default Home;
