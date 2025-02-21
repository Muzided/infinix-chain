import React from "react";
import FadeLeft from "@/motion/FadeLeft";
import Staking from "./Staking";
import FadeRight from "@/motion/FadeRight";
import FadeUp from "@/motion/FadeUp";
import TokenDistributionChart from "@/components/Global/TokenDistributionChart";
import { tokenUtilities } from "@/../../public/data/tokenUtilities";
import Image from "next/image";

const InfinixChainToken = () => {
  return (
    <section id="tokenomics" className="section-py bg-BG-2">
      <div className="container">
        <FadeUp>
          <h2 className="text-center section-title gap-mb-60">
            InfinixChain Token <span className="text-primary-1">FNX</span>
          </h2>
          <p className="my-text-18 text-center text-foundation-blue-40 w-full gap-mb-40">
            The InfinixChain Token (FNX) is the native cryptocurrency powering
            the InfinixChain ecosystem. It plays a central role in transactions,
            governance, staking, and rewarding participants.
          </p>
        </FadeUp>
        <div className="grid xl:grid-cols-2 grid-cols-1 my-grid-gap items-center">
          <FadeLeft>
            
            <div className="lg:p-8 md:p-7 sm:p-5 p-4 bg-BG border border-stroct-1 md:rounded-xl sm:rounded-lg rounded-md h-full">
              <div className="flex justify-between xl:mb-[52px] lg:mb-12 md:mb-11 sm:mb-10 mb-8">
                <div>
                  <h2 className="my-text-24 sm:mb-3 mb-2.5"><span className="text-primary-1">FNX</span> Token Utilities</h2>
                  {/* <p className="my-text-16">Calculate my earnings</p> */}
                </div>
              </div>
              <div className="grid xl:gap-y-[40px] lg:gap-y-12 md:gap-y-10 sm:gap-y-10 gap-y-9">
                {tokenUtilities?.map((item, idx) => (
                  <div key={idx} className="flex-centerY my-grid-gap">
                    <Image
                      className="xl:w-[80px] xl:h-[80px] lg:w-[90px]  md:w-[80px]  lg:h-[90px] md:h-[80px] sm:w-[70px] sm:h-[70px] w-[60px] h-[60px]"
                      width={80}
                      height={80}
                      src={item?.image}
                      alt={item?.title}
                    />
                    <div>
                      <h4 className="my-text-24 gap-mb-16">{item?.title}</h4>
                      <p className="my-text-16">{item?.details}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeLeft>
          <FadeRight>
            <div className="">
            
              <TokenDistributionChart />
            </div>
          </FadeRight>
        </div>
      </div>
    </section>
  );
};

export default InfinixChainToken;
