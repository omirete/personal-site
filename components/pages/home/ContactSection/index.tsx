import SocialRow from "@/components/social/SocialRow";
import FullHeightSection from "@/components/ui/FullHeightSection";
import { PersonalInfo } from "@/helpers/database/PersonalInfoCtor";
import Image from "next/image";
import ButtonLaunchContactForm from "./ButtonLaunchContactForm";

const ContactSection: React.FC<{ personalInfo: PersonalInfo }> = ({
    personalInfo,
}) => {
    return (
        <FullHeightSection id="contact" className="py-4 px-3 px-sm-5">
            <div className="mt-5">
                <div className="row flex-wrap">
                    <div className="col-12 col-sm-6">
                        <h3 className="mb-3">Contact</h3>
                        <p>
                            If you are interested in collaborating, have some
                            fancy freelancing request, or just want to have a
                            chat about life, you may reach out in any of the
                            networks listed below.
                        </p>
                        <div className="mb-3">
                            Also, if you are a form person, you may use{" "}
                            {/* <ButtonConfetti className="btn btn-dark btn-sm">
                            </ButtonConfetti>{" "} */}
                            <ButtonLaunchContactForm className="btn btn-dark btn-sm d-inline">
                                ✨ the form ✨
                            </ButtonLaunchContactForm>{" "}
                            as well. 🥳
                        </div>
                        <p className="m-0">Federico Giancarelli</p>
                        <p className="">
                            <code>hello@federicogiancarelli.com</code>
                        </p>
                        <SocialRow
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
                                    src={`${process.env.NEXT_PUBLIC_FILES_BASE_FETCH_URL}/contact.png`}
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
                                    My home town:{" "}
                                    <a
                                        href="https://goo.gl/maps/ZaG6gcrgzQpjb2qf9"
                                        className="link-primary"
                                    >
                                        Santa Fe, Argentina
                                    </a>
                                    . 📌
                                </figcaption>
                            </figure>
                        </div>
                    </div>
                </div>

                {/* <p>
                        You may reach out in any of these networks, or you can
                        also use the form to leave me a message.
                    </p> */}
            </div>
        </FullHeightSection>
    );
};

export default ContactSection;
