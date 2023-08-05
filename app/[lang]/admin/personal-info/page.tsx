import FormBasicInfo from "@/components/pages/admin/FormBasicInfo";
import FormContactInfo from "@/components/pages/admin/FormContactInfo";
import FormSocialNetworks from "@/components/pages/admin/FormSocialNetworks";
import DB from "@/helpers/database/DB";
import { PersonalInfo } from "@/helpers/database/collections/personalInfo";
import parseIdsAsStringIds from "@/helpers/database/parseIdsAsStringIds";
import { Locale } from "@/i18n/config";
import { NextPage } from "next";

const getPersonalInfo = async (): Promise<PersonalInfo | null> => {
    return {
        basicInfo: (await DB.personalInfo.basicInfo.get()) || { name: "" },
        contactInfo: (await DB.personalInfo.contactInfo.get()) || { email: "" },
        socialNetworks: parseIdsAsStringIds(
            await DB.personalInfo.socialNetworks.find().toArray()
        ),
    };
};

{/* @ts-expect-error Async Server Component */}
// Previous line needed as per docs. See "Async Server Component TypeScript
// Error" here: https://beta.nextjs.org/docs/data-fetching/fetching
const Home: NextPage<{ params: { lang: Locale } }> = async ({
    params: { lang },
}) => {
    const personalInfo = await getPersonalInfo();
    return (
        <div>
            <FormBasicInfo lang={lang} basicInfo={personalInfo?.basicInfo} />
            <FormContactInfo contactInfo={personalInfo?.contactInfo} />
            <FormSocialNetworks socialNetworks={personalInfo?.socialNetworks} />
        </div>
    );
};

export default Home;
