import { NextPage } from "next";
import { redirect } from 'next/navigation';

{/* @ts-expect-error Async Server Component */}
// Previous line needed as per docs. See "Async Server Component TypeScript
// Error" here: https://beta.nextjs.org/docs/data-fetching/fetching
const Home: NextPage<{}> = async () => {
    redirect('admin/files');
    // return (
    //     <div>
    //         😎
    //     </div>
    // );
};

export default Home;
