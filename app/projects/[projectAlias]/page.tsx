import Image from "next/image";
import { Inter } from "next/font/google";
import { NextPage } from "next";

const inter = Inter({ subsets: ["latin"] });

{/* @ts-expect-error Async Server Component */}
// Previous line needed as per docs. See "Async Server Component TypeScript
// Error" here: https://beta.nextjs.org/docs/data-fetching/fetching
const Home: NextPage<{}> = async ({ params: { projectAlias } }) => {
    // const data = await getData()
    return (
        <div>
            <p>{projectAlias}</p>
        </div>
    );
};

export default Home;
