import { headerProps } from "@/config/types";
import FadeDown from "@/motion/FadeDown";
import FadeUp from "@/motion/FadeUp";

const Banner = ({ headerData }: { headerData: headerProps }) => {
  return (
    <section className="w-full max-h-[541px] bg-BG">
      <div className="section-pb">
        <div className="container flex flex-col justify-center items-center xl:pt-52 lg:pt-42 md:pt-34 sm:pt-30 pt-32">
          <FadeUp>
            <h2 className="banner-title text-center gradient-text-primary lg:pb-6 md:pb-5 sm:pb-4 pb-3.5">
              {headerData?.title}
            </h2>
          </FadeUp>
          <FadeDown>
            <p className="my-text-20 text-center text-foundation-blue-20 w-full">
              {headerData?.description}
            </p>
          </FadeDown>
        </div>
      </div>
    </section>
  );
};

export default Banner;
