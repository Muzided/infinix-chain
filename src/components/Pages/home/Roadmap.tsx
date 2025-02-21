"use client";

import Link from "next/link";
import Image from "next/image";
import { IconArrowUpRight } from "@tabler/icons-react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// import required modules
import { Autoplay, FreeMode, Navigation } from "swiper/modules";
import { roadmap } from "@/../../public/data/roadmap";
import FadeLeft from "@/motion/FadeLeft";
// My modules

const Roadmap = () => {
  return (
    <section className="bg-primary-6 relative section-pb  3xl:pt-[200px] xxl:pt-[180px] xl:pt-[160px] lg:pt-[140px] md:pt-[120px] sm:pt-[100px] pt-[60px]  flex items-center justify-center flex-col w-full">
      <div className="container">
        <FadeLeft>
          <h1 className="section-title  text-center w-full gap-mb-60">
            InfinixChain Roadmap: Pioneering the Future of Decentralization
          </h1>
          <p className="my-text-18 text-center text-foundation-blue-40 w-full gap-mb-40">
            A Step-by-Step Journey to Revolutionize Blockchain Technology and
            Empower the Decentralized Ecosystem
          </p>
        </FadeLeft>
        <div className=" relative z-[2]">
          <Swiper
            slidesPerView={3}
            spaceBetween={24}
            loop={true}
            dir="ltr"
            speed={500}
            autoplay={{
              delay: 1000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            breakpoints={{
              0: {
                slidesPerView: 1,
                spaceBetween: 10,
              },
              576: {
                slidesPerView: 2,
                spaceBetween: 14,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 16,
              },
              800: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              992: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
              1200: {
                slidesPerView: 3,
                spaceBetween: 24,
              },
              1400: {
                slidesPerView: 3,
                spaceBetween: 24,
              },
            }}
            navigation={{
              nextEl: ".btn-next-slider",
              prevEl: ".btn-prev-slider",
            }}
            modules={[FreeMode, Autoplay, Navigation]}
            className="mySwiper"
          >
            {roadmap?.map((item, idx) => (
              <SwiperSlide className="h-full" key={idx}>
                <div className="group h-full">
                  <div
                    className="h-full xxl:min-h-[500px] xl:min-h-[464px] lg:min-h-[456px] md:min-h-[392px] sm:min-h-[404px] px-32-py-40px
              md:rounded-xl sm:rounded-lg rounded-md border border-stroct-1 gredient-bg-effect !bg-transparent gredient-bg-X my-transition sm:text-left text-center  flex flex-col justify-between sm:items-end items-center"
                  >
                    <h4 className="my-text-24 gap-mb-20 group-hover:text-primary-4 my-transition">
                      {item?.title}
                    </h4>
                    <div>
                      {item?.details?.map((qtrData, index) => (
                        <div className="p-4" key={index}>
                            <h3 className="w-full text-primary-1 text-center my-text-18 group-hover:text-primary-4 my-transition">{qtrData.title}</h3>
                            <ul>

                          {qtrData?.details?.map((lstItm, index) => (
                              <li
                              key={index}
                              className="my-text-16 gap-mb-22 group-hover:text-primary-4 my-transition"
                              >
                              {lstItm}
                            </li>
                          ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                    
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default Roadmap;
