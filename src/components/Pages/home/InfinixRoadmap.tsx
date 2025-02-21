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
import { infinixRoadmap } from "@/../../public/data/infinixRoadmap";
import FadeLeft from "@/motion/FadeLeft";
// My modules

const InfinixRoadmap = () => {
  return (
    <section id="roadmap" className="bg-BG-2 relative section-pb 3xl:pt-[200px] xxl:pt-[180px] xl:pt-[160px] lg:pt-[140px] md:pt-[120px] sm:pt-[100px] pt-[60px]  flex items-center justify-center flex-col w-full">
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
            loop={false}
            dir="ltr"
            speed={1000}
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
                slidesPerView: 4,
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
            {infinixRoadmap?.map((item, idx) => (
              <SwiperSlide className="h-full" key={idx}>
                <div className="group h-full">
                  <div
                    className={`min-h-[230px] xxl:min-h-[350px] xl:min-h-[340px] lg:min-h-[342px] md:min-h-[342px] sm:min-h-[380px] px-32-py-40px
              md:rounded-xl sm:rounded-lg rounded-md border border-stroct-1 gredient-bg-effect !bg-transparent gredient-bg-X my-transition sm:text-left text-center flex flex-col ${ item.yearSlide ? 'justify-center' : 'justify-start gap-5' } sm:items-end items-start`}
                  >
                    <h4 className={`mx-auto my-text-24 text-center gap-mb-10 group-hover:text-primary-4 my-transition text-primary-1  ${item.yearSlide ? 'section-title' : ''}`}>
                      {item?.title}
                    </h4>
                    {item.yearSlide ? (
                      ""
                    ) : (
                      <div>
                        <ul className="list-disc">
                          {item?.details?.map((qtrData, index) => (
                            <li
                              key={index}
                              className="text-left my-text-16 gap-mb-22 group-hover:text-primary-4 my-transition"
                            >
                              {qtrData}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
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

export default InfinixRoadmap;
