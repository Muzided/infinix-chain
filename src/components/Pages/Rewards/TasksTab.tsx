import Image from "next/image";
import { rewards } from "@/../../public/data/rewards";
import { grandReward } from "@/../../public/data/rewardsData";
import OngoingTasks from "./OngoingTasks";
import FadeUp from "@/motion/FadeUp";
import FadeDown from "@/motion/FadeDown";
import reward from "@/../../public/images/reward.png";
import trophy from "@/../../public/images/trophy.png";
import moneybag from "@/../../public/images/money-bag.png";
import checklist from "@/../../public/images/checklist.png";
import check from "@/../../public/images/check.png";
import giftbox from "@/../../public/images/gift-box.png";
import cursor from "@/../../public/images/cursor.png";

const TasksTab = () => {
  const upcomingRewards = rewards?.filter(
    (task) => task?.status === "upcoming"
  );
  const previousRewards = rewards?.filter((task) => task?.status === "ended");

  return (
    <div>
      <OngoingTasks />
      <div className="bg-gradient-to-r from-primary-0 to-primary-1 border border-stroct-1 my-rounded-20 p-32px gap-mb-60">
        <h3 className="my-text-32 gap-mb-32">Grand Reward</h3>
        <div className="grid my-grid-gap">
          <div className="flex xl:flex-row flex-col justify-between my-grid-gap w-full">
            <div className="grid grid-cols-10 my-grid-gap w-full">
              <div className="flex justify-center items-center lg:col-span-2 col-span-10 relative overflow-hidden my-rounded-20 xl:mt-6 sm:mt-4 mt-1 p-4">
                <Image
                  width={250}
                  height={50}
                  src={grandReward.image}
                  className="my-rounded-20 my-transition hover:scale-110 w-20 md:w-40"
                  alt="image"
                />
              </div>

              <div className="lg:col-span-6 col-span-10 xl:mt-6 sm:mt-4 mt-1">
                <FadeUp>
                  <h4 className="my-text-32 gap-mb-24">{grandReward.title}</h4>
                </FadeUp>
                <FadeDown>
                  <div className="grid gap-y-[6px]">
                    <div className="flex gap-3 items-center my-text-18 text-black font-semibold">
                      <Image src={checklist} width={25} height={20} alt="" />
                      Eligibility: {grandReward.eligibility}
                    </div>
                    <div className="flex gap-3 items-center my-text-18 text-black font-semibold">
                      <Image src={giftbox} width={25} height={20} alt="" />
                      {grandReward.detail}
                    </div>
                    <div className="flex gap-3 items-center my-text-18 text-black font-semibold">
                      <Image src={moneybag} width={25} height={20} alt="" />
                      Total Reward Pool: $
                      {Intl.NumberFormat()
                        .format(grandReward.rewardPool)
                        .toString()}
                    </div>
                    <div className="flex gap-3 items-center my-text-18 text-black font-semibold">
                      <Image src={trophy} width={25} height={20} alt="" />
                      Task Winners: {grandReward.winners}
                    </div>
                    <div className="flex gap-3 items-center my-text-18 text-black font-semibold">
                      <Image src={reward} width={25} height={20} alt="" />
                      Grand Prize: $
                      {Intl.NumberFormat()
                        .format(grandReward.grandPrize)
                        .toString()}{" "}
                      (1 winner)
                    </div>
                  </div>
                </FadeDown>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-BG-FFF-8 border border-stroct-1 my-rounded-20 p-32px gap-mb-60">
        <FadeUp>
          <h3 className="my-text-32 gap-mb-32">How to Join?</h3>
          <div className=" flex flex-col gap-4">
            <div className="flex gap-3 items-center my-text-18 text-foundation-blue-30">
              <Image src={check} width={25} height={20} alt="" />
              <span>Complete all tasks listed above.</span>
            </div>
            <div className="flex gap-3 items-center my-text-18 text-foundation-blue-30">
              <Image src={check} width={25} height={20} alt="" />
              <span>
                Submit your ERC20 Wallet Address via the form on our website.
              </span>
            </div>
            <div className="flex gap-3 items-center my-text-18 text-foundation-blue-30">
              <Image src={check} width={25} height={20} alt="" />
              <span>
                Stay tuned for the winner announcements – 50 task winners and 1
                grand prize winner!
              </span>
            </div>
          </div>
        </FadeUp>
        <FadeDown>
          <div className="flex flex-col items-center gap-4 mt-8">
            <div className="flex gap-3 items-center my-text-20 ">
              
              <Image src={cursor} width={25} height={20} alt="" />
              Participate now at <span className="text-primary-1">InfinixChain.com</span>
            </div>
            <div className="flex gap-3 items-center my-text-24 text-primary-1">
              <span>
              Good luck, and let’s make history together!
              </span>
            </div>
          </div>
        </FadeDown>
      </div>
    </div>
  );
};

export default TasksTab;
