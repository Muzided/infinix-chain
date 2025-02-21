import FadeDown from "@/motion/FadeDown";
import { ContactForm } from "../";
import ContactInfo from "./ContactInfo";

const ContactSection = () => {
  return (
    <section className="section-py bg-BG-2">
      <div className="container">
        <div className="relative flex justify-center">
          <div className="max-w-[850px] w-full order-2 justify-center">
            <FadeDown>
              <ContactForm />
            </FadeDown>
            {/* <FadeDown>
              <GoogleMap />
            </FadeDown> */}
          </div>
          {/* <div className="xl:col-span-3 lg:col-span-4 col-span-12 w-full lg:order-2 order-1">
            <ContactInfo />
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
