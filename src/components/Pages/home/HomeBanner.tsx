'use client';
import Image from "next/image";
import Link from "next/link";
import { IconSquareChevronRightFilled } from "@tabler/icons-react";
import homeBanner from "@/../../public/images/homeBanner.png";
import homeBannerShape from "@/../../public/images/homeBannerShape2.png";
import homeBannerAnimateImg1 from "@/../../public/images/homeBannerAnimateImg1.png";
import PreSaleCard from "@/components/Global/PreSaleCard";
import FadeRight from "@/motion/FadeRight";


const HomeBanner = () => {
  const openPdfInNewTab = () => {
      const pdfUrl = '/whitepaper/whitepaper.pdf'; 
    window.open(pdfUrl, '_blank', 'noopener,noreferrer');
  };
  return (
    <section id="hero"
      className={`xl:pt-[9rem] lg:pt-[8rem] md:pt-18 pt-28 bg-BG-2 overflow-hidden`}
    >
      <div className="relative 3xl:pb-44 xxl:pb-40 xl:pb-36 lg:pb-32 md:pb-28 sm:pb-16 pb-14">
        <div className="bg-black filter blur-[212px] rounded-full xxl:w-[358px] xl:w-[300px] lg:w-[240px] md:w-[156px] w-[300px] xxl:h-[358px] xl:h-[300px] lg:h-[240px] md:h-[156px] h-[300px] absolute left-[4%] top-0"></div>
        <div className="bg-primary-1 filter blur-[212px] rounded-full xxl:w-[358px] xl:w-[300px] lg:w-[240px] md:w-[156px]  xxl:h-[358px] xl:h-[300px] lg:h-[240px] md:h-[156px] absolute right-[10%] top-[10%]"></div>
        {/* <Image
          className="absolute xxl:-top-[40%] xl:-top-[36%] lg:-top-[32%] md-top-[28%] animate-spin-slow overflow-hidden md:block hidden"
          width={1920}
          height={1280}
          src={homeBannerShape}
          alt=""
        /> */}
        <div className="w-full container relative">
          <div className="flex w-full xl:flex-row lg:flex-row md:flex-col sm:flex-col flex-col justify-between items-center gap-20">
            <div className="w-full xl:w-[60%] lg:w-[50%] md:w-full sm:w-full flex-center flex-col md:mb-[55px] gap-mb-40">
              <div className="gap-mb-16 py-2 sm:px-5 px-4 backdrop-blur-lg bg-[rgba(255,255,255,0.10)] max-w-[500px] rounded-full">
                <h5 className="lg:text-xl md:text-lg text-base  text-center text-white">
                  Trust and Security in Web3 <br className="sm:hidden block" />
                  Crypto Exchange
                </h5>
              </div>
              <h1
                className="banner-title text-center xl:max-w-[1074px] w-full
              gradient-text-primary lg:pb-6 md:pb-5 sm:pb-4 pb-3.5"
              >
                InfinixChain <br/> Empowering the Future with Our Own Layer 2 Blockchain
              </h1>
              <p className="my-text-16  text-center gap-mb-40 max-w-[636px]">
              InfinixChain is an innovative Layer 2 blockchain built to revolutionize the decentralized
              ecosystem by addressing scalability, transaction speed, and cost challenges.
              </p>
              <div className="flex-centerY my-grid-gap sm:flex-row flex-col">
                <button
                  className="btn btn-primary font-semibold lg:px-8 md:px-7 sm:px-6 px-5 py-3 btn-primary rounded-lg text-primary-4 inline-flex items-center gap-2"
                  onClick={openPdfInNewTab}
                >
                  Whitepape
                  <IconSquareChevronRightFilled className="md:w-8 md:h-8 sm:w-7 sm:h-7 w-5 h-5 rounded-full" />
                </button>
                <Link
                  className="my-text-16 font-semibold lg:px-8 md:px-7 sm:px-6 px-5 py-3 btn-outline my-transition inline-flex rounded-lg items-center gap-2 group"
                  href="/staking-pools"
                >
                  Explore
                  <IconSquareChevronRightFilled className="md:w-8 md:h-8 sm:w-7 sm:h-7 w-5 h-5 rounded-full text-primary-1 group-hover:text-white my-transition" />
                </Link>
              </div>
            </div>
            <div className="w-[95%] xl:w-[38%] lg:w-[50%] md:w-full sm:w-full flex justify-center items-center">
              <PreSaleCard
                valueUsdt={0.175}
                nextStageValue={0.200}
                usdRaised={37890944}
                tokenSold={4807231680}
                totalUsd={41000000}
                totalToken={10000000000}
              />
            </div>
          </div>

          {/* <div className="w-full relative">
            <Image
              width={228}
              height={228}
              src={homeBannerAnimateImg1}
              className="lg:block hidden xxl:w-[228px] xl:w-[180px] lg:w-[160px] xxl:h-[228px] xl:h-[180px] lg:h-[160px] absolute xxl:-right-[8%] xl:-right-[7%] lg:-right-[5%] -right-[4%] xxl:-top-[8%] xl:-top-[7%lg] lg:-top-[5%] -top-[4%] animate-bounce-slow my-transition"
              alt="animateImg1"
            />
            <Image
              width={1296}
              height={900}
              src={homeBanner}
              className="rounded-3xl"
              alt="hero-banner"
            />
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default HomeBanner;
