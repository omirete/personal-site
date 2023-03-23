import FormBasicInfo from "@/components/pages/admin/FormBasicInfo";
import FormContactInfo from "@/components/pages/admin/FormContactInfo";
import FormSocialNetworks from "@/components/pages/admin/FormSocialNetworks";
import { PersonalInfo } from "@/helpers/database/PersonalInfoCtor";
import { DB } from "@/helpers/firebase";
import { NextPage } from "next";

const getPersonalInfo = async (): Promise<PersonalInfo | null> => {
    return await DB.data.personalInfo.ALL.get();
};

{/* @ts-expect-error Async Server Component */}
// Previous line needed as per docs. See "Async Server Component TypeScript
// Error" here: https://beta.nextjs.org/docs/data-fetching/fetching
const Home: NextPage<{}> = async () => {
    const personalInfo = await getPersonalInfo();
    return (
        <div>
            <FormBasicInfo basicInfo={personalInfo?.basicInfo} />
            <FormContactInfo contactInfo={personalInfo?.contactInfo} />
            <FormSocialNetworks socialNetworks={personalInfo?.socialNetworks} />
        </div>
    );
};

export default Home;
