import FormHighlights from "@/components/admin/FormHighlights";
import HighlightsList from "@/components/admin/HighlightsList";
import { DB } from "@/helpers/firebase";
import { NextPage } from "next";

{/* @ts-expect-error Async Server Component */}
// Previous line needed as per docs. See "Async Server Component TypeScript
// Error" here: https://beta.nextjs.org/docs/data-fetching/fetching
const Home: NextPage<{}> = async () => {
    const highlights = await DB.data.highlights.getAll();
    
    return (
        <div>
            <h3>Highlights</h3>
            <FormHighlights />
            <HighlightsList highlights={highlights} />
        </div>
    );
};

export default Home;
