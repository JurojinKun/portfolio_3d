import "../css/Projects.css";

import React, { useCallback, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow } from "swiper/modules";
import 'swiper/css';
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";

import { fontTitleBold } from "../utils/fonts";

const ProProjects = () => {
    const slides = [
        {
            bgImg: "https://i.postimg.cc/Z0ktfskN/peter-broomfield-m3m-ln-R90u-M-unsplash.jpg",
            title: "First project"

        },
        {
            bgImg: "https://i.postimg.cc/MTTSXjbn/brandon-atchison-e-BJWhlq-WR54-unsplash.jpg",
            title: "Second project"
        },
        {
            bgImg: "https://i.postimg.cc/8cfgmQYD/campbell-3-ZUs-NJhi-Ik-unsplash.jpg",
            title: "Third project"
        },
        {
            bgImg: "https://i.postimg.cc/8Ck5BcmS/evgeny-tchebotarev-aiwu-Lj-LPFn-U-unsplash.jpg",
            title: "Fourth project"
        },
    ];

    const sliderRef = useRef(null);

    const handlePrev = useCallback(() => {
        if (!sliderRef.current) return;
        sliderRef.current.swiper.slidePrev();
    }, []);

    const handleNext = useCallback(() => {
        if (!sliderRef.current) return;
        sliderRef.current.swiper.slideNext();
    }, []);

    return (
        <div style={{
            display: "flex",
            backgroundClip: "padding-box",
            border: "1px solid rgba(2, 2, 13, 1)",
            minHeight: "550px",
            width: "100vw"
        }}>
            <Swiper
                ref={sliderRef}
                style={{
                    zIndex: 0
                }}
                effect={"coverflow"}
                grabCursor={false}
                centeredSlides={true}
                slidesPerView={"auto"}
                coverflowEffect={{
                    rotate: 50,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: true,
                }}
                modules={[EffectCoverflow]}
                initialSlide={1}
            >
                {slides.map((slide, index) => (
                    <SwiperSlide
                        key={index}
                        style={{
                            backgroundImage: `url(${slide.bgImg})`,
                            // alignSelf: "center",
                        }}
                        onClick={() => {
                            console.log("test");
                        }}
                    >
                        <div style={{
                            display: "flex",
                            height: "100%",
                            width: "100%",
                            backgroundColor: "rgba(0, 0, 0, 0.2)",
                            alignItems: "start",
                            color: "white",
                            fontSize: "25px",
                            fontWeight: "bold"
                        }}>
                            <h2 style={{
                                marginLeft: "10px",
                                marginTop: "10px"
                            }}>
                                {slide.title}
                            </h2>
                        </div>
                    </SwiperSlide>
                ))}
                <div className="swiper-button-prev" onClick={handlePrev}></div>
                <div className="swiper-button-next" onClick={handleNext}></div>
            </Swiper>
        </div>
    );
}

const PrivateProjects = () => {
    const slides = [
        {
            bgImg: "https://i.postimg.cc/66F8J9tr/hakon-sataoen-qyfco1nf-Mtg-unsplash.jpg",
            title: "First project"
        },
        {
            bgImg: "https://i.postimg.cc/ydbzRYvv/joey-banks-YApi-Wyp0lqo-unsplash.jpg",
            title: "Second project"
        },
        {
            bgImg: "https://i.postimg.cc/NGKKzyqG/joshua-koblin-eq-W1-MPin-EV4-unsplash.jpg",
            title: "Third project"
        },
        {
            bgImg: "https://i.postimg.cc/JhK81QJw/marcus-p-o-UBjd22g-F6w-unsplash.jpg",
            title: "Fourth project"
        },
    ];

    return (
        <div style={{
            display: "flex",
            backgroundClip: "padding-box",
            border: "1px solid rgba(2, 2, 13, 1)",
            minHeight: "650px",
            width: "100vw"
        }}>
            <Swiper
                style={{
                    zIndex: 0
                }}
                effect={"coverflow"}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={"auto"}
                coverflowEffect={{
                    rotate: 50,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: true,
                }}
                modules={[EffectCoverflow]}
            >
                {slides.map((slide, index) => (
                    <SwiperSlide
                        key={index}
                        style={{
                            backgroundImage: `url(${slide.bgImg})`,
                            // alignSelf: "center",
                        }}
                        onClick={() => {
                            console.log("test");
                        }}
                    >
                        <div style={{
                            display: "flex",
                            height: "100%",
                            width: "100%",
                            backgroundColor: "rgba(0, 0, 0, 0.2)",
                            alignItems: "start",
                            color: "white",
                            fontSize: "25px",
                            fontWeight: "bold"
                        }}>
                            <h2 style={{
                                marginLeft: "10px",
                                marginTop: "10px",
                                fontFamily: "Montserrat, sans-serif",
                                fontWeight: "700"
                            }}>
                                {slide.title}
                            </h2>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}

const Projects = () => {
    const { t } = useTranslation();

    return (
        <div style={{
            display: "flex",
            backgroundClip: "padding-box",
            border: "1px solid rgba(2, 2, 13, 1)",
            flexDirection: "column"
        }}>
            <h1 className="projects-title" style={fontTitleBold("50px", "white")}>{t("projects.title_pro")}</h1>
            <ProProjects />
            <h1 className="projects-title" style={fontTitleBold("50px", "white")}>{t("projects.title_private")}</h1>
            <PrivateProjects />
        </div>
    );
}

export default Projects;