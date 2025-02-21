import React from 'react'
import Image from "next/image";
import { coreFeatures } from "@/../../public/data/coreFeatures";
import coreFeaturesImage from "@/../../public/images/coreFeaturesImage.png";

// import { BuyCryptoCard } from "@/components/Global";
import FadeUp from "@/motion/FadeUp";
import FadeDown from "@/motion/FadeDown";
// import FadeLeft from "@/motion/FadeLeft";
import FadeRight from "@/motion/FadeRight";

const CoreFeatures = () => {
  return (
    <section className="bg-BG-2 relative">
      <div className="container section-py">
        
      <FadeUp>
              <h2 className="section-title gap-mb-60 text-center mx-auto">
                Core Features of InfinixChain Ecosystem
              </h2>
            </FadeUp>
        <div className="grid items-center lg:grid-cols-2 grid-cols-1 my-grid-gap lg:gap-y-14 md:gap-y-12 sm:gap-y-10 gap-y-9">
          <div>
            
            <FadeDown>
              <div className="grid xl:gap-y-[60px] lg:gap-y-14 md:gap-y-12 sm:gap-y-10 gap-y-9">
                {coreFeatures?.map((item, idx) => (
                  <div key={idx} className="flex-centerY my-grid-gap">
                    <Image
                      className="xl:w-[100px] xl:h-[100px] lg:w-[90px]  md:w-[80px]  lg:h-[90px] md:h-[80px] sm:w-[70px] sm:h-[70px] w-[60px] h-[60px]"
                      width={100}
                      height={100}
                      src={item?.image}
                      alt={item?.title}
                    />
                    <div>
                      <h4 className="my-text-24 gap-mb-20">{item?.title}</h4>
                      <p className="my-text-16">{item?.details}</p>
                    </div>
                  </div>
                ))}
              </div>
            </FadeDown>
          </div>
          <div className="h-full flex-center relative flex items-center justify-center flex-col w-full">
            <div className="bg-primary-1 filter blur-[867.5px] rounded-full min-w-full min-h-full absolute"></div>
            <div className="relative z-[2] w-full h-full flex items-center">
            <FadeRight>
              <Image
                className="xl:max-w-[unset] animate-bounce-slow"
                width={815}
                height={600}
                src={coreFeaturesImage}
                alt="faq"
              />
            </FadeRight>
            </div>
          </div>
        </div>
      </div>
    </section>




  )
}

export default CoreFeatures