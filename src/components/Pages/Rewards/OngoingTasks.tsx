"use client";

import { useState } from "react";
import Modal from "@/components/Global/Modal";
import AuthCard from "@/components/Global/AuthCard";
import Image from "next/image";
import { rewards } from "@/../../public/data/rewards";
import reward from "@/../../public/images/reward.png";
import trophy from "@/../../public/images/trophy.png";
import moneybag from "@/../../public/images/money-bag.png";
import checklist from "@/../../public/images/checklist.png";
import coins from "@/../../public/images/coins.png";
import giftbox from "@/../../public/images/gift-box.png";
import { rewardsData, grandReward } from "@/../../public/data/rewardsData";
import FadeUp from "@/motion/FadeUp";
import FadeDown from "@/motion/FadeDown";
import FadeLeft from "@/motion/FadeLeft";

const OngoingTasks = () => {
  // const ongoingRewards = rewards?.filter((task) => task?.status === "ongoing");
  // Auth Modal
  // const [open, setOpen] = useState(false);
  // const handleModal = (
  //   e: React.MouseEvent<HTMLButtonElement | HTMLDivElement>
  // ) => {
  //   e.preventDefault();
  //   setOpen(!open);
  // };

  return (
    <div className="bg-primary-6 my-rounded-20 p-32px gap-mb-60 mx-auto">
      <h3 className="my-text-32 gap-mb-32">Ongoing Tasks</h3>
      <div>
        {rewardsData?.map((item, idx) => (
          <div
            key={idx}
            className="flex xl:flex-row flex-col justify-between my-grid-gap w-full"
          >
            <div className="grid grid-cols-10 my-grid-gap w-full">
              <div className="flex justify-center items-center lg:col-span-2 col-span-10 relative overflow-hidden my-rounded-20 xl:mt-10 sm:mt-4 mt-10">
                <FadeLeft>
                  {/* <Image
                  width={416}
                  height={240}
                  src={item?.image}
                  className="my-rounded-20 my-transition w-full lg:h-[240px] h-auto hover:scale-110"
                  alt="image"
                  /> */}
                  <div className="flex justify-center items-center bg-primary-1 w-14 h-14 lg:w-20 lg:h-20 rounded-full my-transition hover:scale-110">
                    <h2 className="my-text-32 text-center text-primary-10">
                      {idx + 1}
                    </h2>
                  </div>
                </FadeLeft>
              </div>

              <div className="flex flex-col justify-center lg:col-span-8 col-span-10 xl:mt-10 sm:mt-4 mt-1">
                <FadeUp>
                  <h4 className="text-primary-1 my-text-24 gap-mb-24">
                    {item?.title}
                  </h4>
                </FadeUp>
                <FadeDown>
                  <div className="grid gap-y-[10px]">
                    <div className="flex gap-3 items-center my-text-18 text-foundation-blue-30">
                      <Image src={checklist} width={25} height={20} alt="" />
                      <span>Task: {item.task}</span>
                    </div>
                    <div className="flex gap-3 items-center my-text-18 text-foundation-blue-30">
                      <Image src={moneybag} width={25} height={20} alt="" />
                      <span>
                        Reward Pool: $
                        {Intl.NumberFormat().format(item.rewardPool).toString()}
                      </span>
                    </div>
                    <div className="flex gap-3 items-center my-text-18 text-foundation-blue-30">
                      <Image src={trophy} width={25} height={20} alt="" />
                      <span>Winners: {item.winners} winners</span>
                    </div>
                    <div className="flex gap-3 items-center my-text-18 text-foundation-blue-30">
                      <Image src={reward} width={25} height={20} alt="" />
                      <span>
                        Prize per Winner: $
                        {Intl.NumberFormat()
                          .format(item.prizePerWinner)
                          .toString()}
                      </span>
                    </div>
                    {/* {item?.features?.map((feature, idx) => (
                      <li
                        key={idx}
                        className="my-text-16 text-foundation-blue-30"
                      >
                        {feature}
                      </li>
                    ))} */}
                  </div>
                </FadeDown>
              </div>
            </div>
            {/* <div>
              <button
                onClick={handleModal}
                className="btn btn-primary md:w-auto w-full"
              >
                Login
              </button>
            </div> */}
          </div>
        ))}
      </div>
      {/* <Modal onClick={handleModal} open={open}>
        <AuthCard />
      </Modal> */}
    </div>
  );
};

export default OngoingTasks;
