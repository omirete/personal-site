import { Inter } from "next/font/google";
import Link from "next/link";
import { NextPage } from "next/types";
import FormCreateProject from "@/components/projects";
import { DB } from "@/helpers/firebase";

const inter = Inter({ subsets: ["latin"] });

{/* @ts-expect-error Async Server Component */}
// Previous line needed as per docs. See "Async Server Component TypeScript
// Error" here: https://beta.nextjs.org/docs/data-fetching/fetching
const Home: NextPage<{}> = async () => {
    const projects = await DB.data.projects.getAll();
    return (
        <div>
            <h2>Select a project:</h2>
            <ul>
                {projects.map((p, i) => (
                    <li key={i}>
                        <Link href={`/projects/${p.alias}`}>{p.name}</Link>
                    </li>
                ))}
            </ul>
            <FormCreateProject />
        </div>
    );
};

export default Home;
