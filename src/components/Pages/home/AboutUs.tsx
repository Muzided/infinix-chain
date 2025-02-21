// "use client";
// import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
// import { Tab } from "@headlessui/react";
import Link from "next/link";
// import { useState } from "react";
// import MarketStakingTab from "./MarketStakingTab";
// import MarketSwapTab from "./MarketSwapTab";
// import MarketIDOTab from "./MarketIDOTab";
// import MarketCryptoTab from "./MarketCryptoTab";
import FadeLeft from "@/motion/FadeLeft";
import FadeRight from "@/motion/FadeRight";
import Image from "next/image";
import aboutUsImage from "@/../../public/images/aboutUsImage.png";
import warlet from "@/../../public/images/warlet.png";
import product1 from "@/../public/images/product1.png"; 
import product2 from "@/../public/images/product2.png"; 
import product3 from "@/../public/images/product3.png";
import product4 from "@/../public/images/product4.png";


const AboutUs = () => {
//   const [selectedIndex, setSelectedIndex] = useState(0);
  const tabs = ["Staking", "IDO", "Swap", "Buy Crypto"];
  return (
    <section id="about" className="bg-BG-2 section-py">
      <div className="container">
      <div className="container relative">
        <div className="grid items-center my-grid-gap grid-cols-12 gap-mb-16">
          <div className="text-center md:text-left 3xl:col-span-7 xl:col-span-6 col-span-12">
            <FadeLeft>
              <h1 className="section-title w-full gap-mb-16">About Us</h1>
              <h3 className="my-text-24 text-primary-1">Innovative Blockchain for the Decentralized World</h3>
              <br/>
              <p className="my-text-16 text-foundation-blue-40 sm:max-w-[636px] w-full gap-mb-40">
              InfinixChain is a cutting-edge Layer 2 blockchain that addresses scalability, transaction speed, and cost challenges. Built on the Proof of Stake (PoS) consensus mechanism, we offer an energy-efficient, high-performance blockchain that’s developer-friendly and ready for the decentralized future.

              </p>
              <div className="grid grid-cols-2 gap-4 sm:gap-x-16 justify-between mt-14">
                <Link
                        href="/staking-pools"
                        className="btn btn-outline sm:py-3 py-2.5 md:px-4 sm:px-3 px-2.5 flex-centerY sm:gap-3 gap-2 font-semibold sm:text-xl"
                        aria-label="subscribe"
                      >
                        <Image 
                        src={product2}
                        alt=""
                        width={40}
                        height={40}
                        className="md:text-base sm:text-sm text-xs" />
                        Staking 
                </Link>
                <Link
                        href="/ido"
                        className="btn btn-outline sm:py-3 py-2.5 lg:px-5 md:px-4 sm:px-3 px-2.5 flex-centerY sm:gap-3 gap-2 font-semibold sm:text-xl"
                        aria-label="subscribe"
                      > 
                        <Image 
                        src={product3}
                        alt=""
                        width={40}
                        height={40}
                        className="md:text-base sm:text-sm text-xs" />
                        Launchpad
                </Link>
                <Link
                        href="/crypto-buy"
                        className="btn btn-outline sm:py-3 py-2.5 lg:px-5 md:px-4 sm:px-3 px-2.5 flex-centerY sm:gap-3 gap-2 font-semibold sm:text-xl"
                        aria-label="subscribe"
                      > 
                        <Image 
                        src={product4}
                        alt=""
                        width={40}
                        height={40}
                        className="md:text-base sm:text-sm text-xs" />
                        Exchange
                </Link>
                <Link
                        href="/explorer"
                        className="btn btn-outline sm:py-3 py-2.5 lg:px-5 md:px-4 sm:px-3 px-2.5 flex-centerY sm:gap-3 gap-2 font-semibold sm:text-xl"
                        aria-label="subscribe"
                      > 
                        <Image 
                        src={product1}
                        alt=""
                        width={40}
                        height={40}
                        className="md:text-base sm:text-sm text-xs" />
                        Explorer
                </Link>
              </div>
            </FadeLeft>
          </div>

          <div className="3xl:col-span-5 xl:col-span-6 col-span-12 mx-auto">
            <FadeRight>
              <Image
                className="xl:max-w-[650px] animate-bounce-slow"
                width={815}
                height={600}
                src={aboutUsImage}
                alt="faq"
              />
            </FadeRight>
          </div>
        </div>
      </div>
      </div>
    </section>
  );
};

export default AboutUs;
