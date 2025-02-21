import Link from "next/link";
import Image from "next/image";
import faqImage from "@/../../public/images/faqImage.png";
import { IconArrowRight } from "@tabler/icons-react";
import { faqItems } from "@/../../public/data/faqItems";
import { Accordion } from "./";
import FadeLeft from "@/motion/FadeLeft";
import FadeRight from "@/motion/FadeRight";

const FaqSection = () => {
  return (
    <section id="faq" className="bg-BG-2 relative section-py overflow-x-hidden">
      {/* <div className="bg-primary-1 filter blur-[565px] rounded-full 3xl:w-[688px] xxl:w-[538px] xl:w-[300px] lg:w-[240px] md:w-[156px] w-[300px] xxl:h-[565px] xl:h-[300px] lg:h-[240px] md:h-[156px] h-[300px] absolute top-0 left-0 "></div> */}
      <div className="container relative">
        <div className="grid items-center my-grid-gap grid-cols-12 gap-mb-24">
          <div className="text-center md:text-left 3xl:col-span-7 xl:col-span-6 col-span-12">
            <FadeLeft>
              <h1 className="section-title w-full gap-mb-16">FAQ</h1>
              <p className="my-text-16 text-foundation-blue-40 sm:max-w-[636px] w-full gap-mb-40">
                Explore our FAQs for fast, informative answers to frequently
                asked questions and common concerns.
              </p>
              <Accordion faqItems={faqItems} />
            </FadeLeft>
          </div>

          <div className="3xl:col-span-5 xl:col-span-6 col-span-12 mx-auto">
            <FadeRight>
              <Image
                className="xl:max-w-[unset] animate-bounce-slow"
                width={815}
                height={600}
                src={faqImage}
                alt="faq"
              />
            </FadeRight>
          </div>
        </div>
        <p className="my-text-16 xl:text-left text-center">
          Can&apos;t see your question listed above?{" "}
          <Link
            className=" text-primary-1 inline-flex items-center gap-2"
            href="/contact"
          >
            Visit our Help Center{" "}
            <IconArrowRight className="xxl:w-6 xxl:h-6 w-5 h-5" />
          </Link>
        </p>
      </div>
    </section>
  );
};

export default FaqSection;
