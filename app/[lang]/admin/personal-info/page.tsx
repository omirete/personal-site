import { notFound } from "next/navigation";
import FormBasicInfo from "@/components/pages/admin/FormBasicInfo";
import FormContactInfo from "@/components/pages/admin/FormContactInfo";
import FormSocialNetworks from "@/components/pages/admin/FormSocialNetworks";
import DB from "@/helpers/database/DB";
import readUncachedData from "@/helpers/database/readUncachedData";
import { PersonalInfo } from "@/helpers/database/collections/personalInfo";
import parseIdsAsStringIds from "@/helpers/database/parseIdsAsStringIds";
import { hasLocale } from "@/i18n/config";
import { NextPage } from "next";

const getPersonalInfo = async (): Promise<PersonalInfo | null> => {
    return {
        basicInfo: (await DB.personalInfo.basicInfo.get()) || { name: "" },
        contactInfo: (await DB.personalInfo.contactInfo.get()) || { email: "" },
        socialNetworks: parseIdsAsStringIds(
            await DB.personalInfo.socialNetworks.find().toArray(),
        ),
    };
};

const Home: NextPage<{ params: Promise<{ lang: string }> }> = async ({
    params,
}) => {
    const lang = (await params).lang;
    if (!hasLocale(lang)) notFound();
    const personalInfo = await readUncachedData(getPersonalInfo);
    return (
        <div>
            <FormBasicInfo lang={lang} basicInfo={personalInfo?.basicInfo} />
            <FormContactInfo contactInfo={personalInfo?.contactInfo} />
            <FormSocialNetworks socialNetworks={personalInfo?.socialNetworks} />
        </div>
    );
};

export default Home;
