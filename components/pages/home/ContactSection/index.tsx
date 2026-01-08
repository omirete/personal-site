import SocialRow from "@/components/social/SocialRow";
import FullHeightSection from "@/components/ui/FullHeightSection";
import { PersonalInfo } from "@/helpers/database/collections/personalInfo";
import { i18n } from "@/i18n/config";
import FCi18n from "@/i18n/types/FCi18n";
import Image from "next/image";
import { dict } from "./dictionary";

const ContactSection: FCi18n<{ personalInfo: PersonalInfo }> = ({
    lang,
    personalInfo,
}) => {
    const localeDict = dict[lang] ?? dict[i18n.defaultLocale];
    return (
        <FullHeightSection id="contact" className="py-4 px-3 px-sm-5">
            <div className="mt-5">
                <div className="row flex-wrap">
                    <div className="col-12 col-sm-6">
                        <h3 className="mb-3">{localeDict.contact}</h3>
                        <p>{localeDict.youMayReachOut}</p>
                        <div className="mb-3">
                            {localeDict.orYouMaySendMeAMessageWithTheForm}
                        </div>
                        <p className="m-0">Federico Giancarelli</p>
                        <p className="">
                            <code>hello@federicogiancarelli.com</code>
                        </p>
                        <SocialRow
                            lang={lang}
                            personalInfo={personalInfo}
                            styleIcons={{ width: "2em", height: "2em" }}
                            className="mb-3"
                            classNameIcons="me-2 text-secondary opacity-75 opacity-100-hover"
                        />
                    </div>
                    <div className="col-12 col-sm-6">
                        <div className="d-flex justify-content-center position-relative">
                            <figure className="figure">
                                <Image
                                    src="https://yzanjmhvji29nsve.public.blob.vercel-storage.com/contact.webp"
                                    alt="Alternate profile picture."
                                    className="figure-img img-fluid rounded shadow"
                                    width={500}
                                    height={500}
                                    style={{
                                        objectFit: "cover",
                                        maxHeight: "450px",
                                        width: "auto",
                                    }}
                                />
                                <figcaption className="figure-caption">
                                    {localeDict.myHomeTown}:{" "}
                                    <a
                                        href="https://goo.gl/maps/f7jhRtt5FBUJ5W1Q6"
                                        className="link-primary"
                                        target="_blank"
                                        rel="noreferrer noopener"
                                    >
                                        Santa Fe, Argentina
                                    </a>
                                    . 📌
                                </figcaption>
                            </figure>
                        </div>
                    </div>
                </div>
            </div>
        </FullHeightSection>
    );
};

export default ContactSection;
