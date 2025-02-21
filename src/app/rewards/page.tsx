import { Banner, FaqSection } from "@/components/Global";
import { RewardsSection } from "@/components/Pages";
import { headerProps } from "@/config/types";
import FadeDown from "@/motion/FadeDown";
import FadeUp from "@/motion/FadeUp";

const Rewards = () => {
  const headerData: headerProps = {
    title: "InfinixChain $1,000,000 Giveaway!",
    description:
      "We’re thrilled to announce our $1,000,000 Giveaway, where 50 lucky winners will win $10,000 each, and one lucky participant will take home the grand prize of $500,000!",
  };

  return (
    <main className=" bg-BG-2">
      <section className="w-full max-h-[541px] bg-BG-2">
        <div className="">
          <div className="container flex flex-col justify-center items-center xl:pt-52 lg:pt-42 md:pt-34 sm:pt-30 pt-32">
            <FadeUp>
              <h2 className="banner-title text-center gradient-text-primary lg:pb-6 md:pb-5 sm:pb-4 pb-3.5">
                {headerData?.title}
              </h2>
            </FadeUp>
            <FadeDown>
              <p className="my-text-20 text-center text-foundation-blue-20 w-full mt-8">
                {headerData?.description}
              </p>
            </FadeDown>
          </div>
        </div>
      </section>
      <RewardsSection />
      <FaqSection />
    </main>
  );
};

export default Rewards;
