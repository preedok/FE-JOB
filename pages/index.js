import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay } from "swiper";
import "swiper/css";
import Button from "../components/base/button";
import Card from "../components/module/testicard";
import styles from "../styles/landing.module.css";
import Navi from "../components/module/navi";
import Footer from "../components/module/footer";
import React, { useState, useEffect } from "react";

// aos
import AOS from "aos";
import "aos/dist/aos.css";

const Landing = () => {
  SwiperCore.use([Autoplay]);
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);
  if (loading) {
    return (
      <div
        className="d-flex"
        style={{
          backgroundColor: "#5e50a1",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Image
          src={"/assets/peworld-white.svg"}
          alt="Logo"
          width={400}
          height={400}
        />
      </div>
    );
  }
  return (
    <>
      <div>
        <Navi />
        <main className={styles.main}>
          <section
            className={`col-12 d-flex mb-5 ${styles["banner-top"]} ${styles.infograph}`}
          >
            <div
              className="col-12 col-md-6"
              data-aos="zoom-in-right"
              data-aos-duration="1000"
            >
              <h2>Talenta terbaik negeri untuk perubahan revolusi 4.0</h2>
              <p>
                Bergabung sekarang untuk menjadi bagian dari perubahan revolusi
                4.0
              </p>
              <Button
                title="Mulai Sekarang"
                type="button"
                classname={`mb-3 ${styles["btn-purple"]}`}
              />
            </div>
            <div
              className="col-6"
              data-aos="zoom-in-left"
              data-aos-duration="1000"
            >
              <Image
                src={"/assets/banner-top.png"}
                alt="banner top"
                width={500}
                height={500}
                className={styles.banner}
              />
            </div>
          </section>

          <section
            className={`col-12 d-flex mb-5 ${styles["banner-mid"]} ${styles.infograph}`}
          >
            <div
              className="col-6"
              data-aos="zoom-in-right"
              data-aos-duration="1000"
            >
              <Image
                src={"/assets/banner-mid.png"}
                alt="banner top"
                width={500}
                height={500}
                className={styles.banner}
              />
            </div>
            <div
              className="col-12 col-md-6 m-0 ml-md-5"
              data-aos="zoom-in-left"
              data-aos-duration="1000"
            >
              <h2>Kenapa mencari talent di Peworld?</h2>
              <div className="d-flex flex-row">
                <Image
                  src={"/assets/check.svg"}
                  alt="check icon"
                  width={20}
                  height={20}
                  className={styles["check-purple"]}
                />
                <p>Kemampuan teknikal yang baik</p>
              </div>
              <div className="d-flex flex-row">
                <Image
                  src={"/assets/check.svg"}
                  alt="check icon"
                  width={20}
                  height={20}
                  className={styles["check-purple"]}
                />
                <p>Pembawaan yang positif</p>
              </div>
              <div className="d-flex flex-row">
                <Image
                  src={"/assets/check.svg"}
                  alt="check icon"
                  width={20}
                  height={20}
                  className={styles["check-purple"]}
                />
                <p>Terbiasa dengan deadline dan tugas mendadak</p>
              </div>
              <div className="d-flex flex-row">
                <Image
                  src={"/assets/check.svg"}
                  alt="check icon"
                  width={20}
                  height={20}
                  className={styles["check-purple"]}
                />
                <p>Pandai pencitraan</p>
              </div>
            </div>
          </section>

          <section
            className={`col-12 d-flex mb-5 ${styles["banner-btm"]} ${styles.infograph}`}
          >
            <div
              className="col-12 col-md-6"
              data-aos="zoom-in-right"
              data-aos-duration="1000"
            >
              <h2>Skill talent</h2>
              <h6>Kumpulan skillset yang dimiliki talent di Peworld</h6>
              <div className="d-flex flex-row flex-md-row ">
                <div className="mr-4 mr-md-5">
                  <div className="d-flex flex-row">
                    <Image
                      src={"/assets/check.svg"}
                      alt="check icon"
                      width={20}
                      height={20}
                      className={styles["check-yellow"]}
                    />
                    <p>Java</p>
                  </div>
                  <div className="d-flex flex-row">
                    <Image
                      src={"/assets/check.svg"}
                      alt="check icon"
                      width={20}
                      height={20}
                      className={styles["check-yellow"]}
                    />
                    <p>Kotlin</p>
                  </div>
                  <div className="d-flex flex-row">
                    <Image
                      src={"/assets/check.svg"}
                      alt="check icon"
                      width={20}
                      height={20}
                      className={styles["check-yellow"]}
                    />
                    <p>PHP</p>
                  </div>
                  <div className="d-flex flex-row">
                    <Image
                      src={"/assets/check.svg"}
                      alt="check icon"
                      width={20}
                      height={20}
                      className={styles["check-yellow"]}
                    />
                    <p>Javascript</p>
                  </div>
                </div>

                <div className="ml-5">
                  <div className="d-flex flex-row">
                    <Image
                      src={"/assets/check.svg"}
                      alt="check icon"
                      width={20}
                      height={20}
                      className={styles["check-yellow"]}
                    />
                    <p>Golang</p>
                  </div>
                  <div className="d-flex flex-row">
                    <Image
                      src={"/assets/check.svg"}
                      alt="check icon"
                      width={20}
                      height={20}
                      className={styles["check-yellow"]}
                    />
                    <p>C++</p>
                  </div>
                  <div className="d-flex flex-row">
                    <Image
                      src={"/assets/check.svg"}
                      alt="check icon"
                      width={20}
                      height={20}
                      className={styles["check-yellow"]}
                    />
                    <p>Ruby</p>
                  </div>
                  <div className="d-flex flex-row">
                    <Image
                      src={"/assets/check.svg"}
                      alt="check icon"
                      width={20}
                      height={20}
                      className={styles["check-yellow"]}
                    />
                    <p>10+ bahasa lainnya</p>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="col-6"
              data-aos="zoom-in-left"
              data-aos-duration="1000"
            >
              <Image
                src={"/assets/banner-bottom.png"}
                alt="banner top"
                width={500}
                height={500}
                className={styles.banner}
              />
            </div>
          </section>

          <section
            className={`col-12 d-flex flex-column align-items-center p-0 py-3 my-5 ${styles.testimony}`}
            data-aos="zoom-in-left"
            data-aos-duration="1000"
          >
            <h2>Pendapat mereka tentang Peworld</h2>
            <Swiper
              className="col-9"
              slidesPerView={3}
              loop={true}
              autoplay={{ delay: 3000 }}
            >
              <SwiperSlide className="col-12 col-md-4 d-flex">
                <Card
                  avatar={"/assets/banner.png"}
                  name="Iqbal Apredo"
                  job="Fullstack Developer"
                />
              </SwiperSlide>
              <SwiperSlide className="col-12 col-md-4 d-flex">
                <Card
                  avatar={"/assets/banner.png"}
                  name="Rezaldo Armadani"
                  job="Backend developer"
                />
              </SwiperSlide>
              <SwiperSlide className="col-12 col-md-4 d-flex">
                <Card
                  avatar={"/assets/banner.png"}
                  name="Hosea Leonardo"
                  job="Frontend Developer"
                />
              </SwiperSlide>
              <SwiperSlide className="col-12 col-md-4 d-flex">
                <Card
                  avatar={"/assets/banner.png"}
                  name="Sania Riski Agustin"
                  job="Frontend Developer"
                />
              </SwiperSlide>
            </Swiper>
          </section>

          <section
            className={`col-12 d-flex justify-content-center align-items-center p-0 mb-5 m-0 ${styles.card}`}
            data-aos="zoom-in-right"
            data-aos-duration="1000"
          >
            <div className="d-flex flex-column flex-md-row justify-content-center justify-content-md-between align-items-center">
              <h3>
                Lorem Ipsum <br /> dolor sit amet
              </h3>
              <Button
                title="Mulai Sekarang"
                type="button"
                classname={styles["btn-white"]}
              />
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Landing;
