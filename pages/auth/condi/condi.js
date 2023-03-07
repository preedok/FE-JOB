import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "../../../styles/auth.module.css";
import { LineWave } from "react-loader-spinner";
import { useState, useEffect } from "react";

import AOS from "aos";
import "aos/dist/aos.css";
const Auth = () => {
  const router = useRouter();
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);
  return (
    <main className={styles.main}>
      <section
        className={`align-self-center text-center  col-md-6 ${styles.banner}`}
        data-aos="zoom-in-right"
        data-aos-duration="1000"
      >
        <Image
          className={styles.aa}
          src="/assets/peworld-white.svg"
          alt="peworld logo white"
          width="100"
          height="100"
          onClick={() => router.push("/")}
        />
        <h2 className={`${styles.dd} px-5`}>
          Temukan pekerjaan sebagai developer terbaik dengan cepat
        </h2>
      </section>
      <section
        className={`col-12 col-md-6 justify-content-center ${styles.form}`}
        data-aos="zoom-in-left"
        data-aos-duration="1000"
      >
        <div>
          <button
            style={{
              width: "100%",
              height: "50px",
              backgroundColor: "#5E50A1",
              fontWeight: "600",
            }}
            className="btn btn-white text-white"
            onClick={() => router.push("/auth/login")}
          >
            Masuk sebagai pekerja
          </button>
          <hr className="fw-bold text-black" />
          <button
            style={{ width: "100%", height: "50px", fontWeight: "600" }}
            className="btn btn-outline-warning "
            onClick={() => router.push("/auth/company/login")}
          >
            Masuk sebagai perekrut
          </button>
        </div>
      </section>
    </main>
  );
};

export default Auth;
