/* eslint-disable react-hooks/exhaustive-deps */
import Navi from "../../components/module/navi";
import Footer from "../../components/module/footer";
import Input from "../../components/base/input";
import Button from "../../components/base/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationPin } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import styles from "../../styles/hiring.module.css";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import { LineWave } from "react-loader-spinner";

import AOS from "aos";
import "aos/dist/aos.css";
const Hiring = () => {
  const router = useRouter();
  const { id } = router.query;

  const [user, setUser] = useState();
  const [skills, setSkills] = useState();

  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);
  useEffect(() => {
    axios
      .get(`https://long-poncho-goat.cyclic.app/v1/user/${id}`)
      .then((res) => {
        setUser(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [router.isReady]);

  useEffect(() => {
    axios
      .get(`https://poised-boot-elk.cyclic.app/v1/user/${id}/skill`)
      .then((res) => {
        setSkills(res.data.skills);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [router.isReady]);

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);
  if (loading) {
    return (
      <div
        style={{
          paddingLeft: "50px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backgroundColor: "#5e50a1",
        }}
      >
        <LineWave
          height="145"
          width="200"
          color="white"
          ariaLabel="line-wave"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
          firstLineColor=""
          middleLineColor=""
          lastLineColor=""
        />
      </div>
    );
  }
  return (
    <>
      <Navi />
      <main className={styles.main}>
        <section
          className={`col-12 col-md-3 ${styles.profile}`}
          data-aos="zoom-in-right"
          data-aos-duration="1000"
        >
          <Image
            src={user ? user.avatar : "/assets/banner.png"}
            alt="user avatar"
            width={200}
            height={200}
          />
          <h4 className="m-0 text-center">{user ? user.fullname : ""}</h4>
          <h6 className="m-0 text-center">{user ? user.title : ""}</h6>
          <div className={`${styles.location} text-center`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              fill="currentColor"
              className="bi bi-geo-alt "
              viewBox="0 0 16 16"
            >
              <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z" />
              <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
            </svg>
            <span className="ml-2 text-center">
              {user ? user.location : "Lokasi anda"}
            </span>
          </div>
          <p>{user ? user.description : "tidak ada deskripsi"}</p>

          {/* skill info */}
          <h4 className="text-center">Skill</h4>
          <div className={styles.skillset}>
            {skills
              ? skills.map((item) => (
                  // eslint-disable-next-line react/jsx-key
                  <span>{item.skill_name}</span>
                ))
              : ""}
          </div>
        </section>

        <section
          className={`col-12 col-md-9 ${styles["hiring-detail"]}`}
          data-aos="zoom-in-left"
          data-aos-duration="1000"
        >
          <form
            className={styles["hiring-form"]}
            style={{ marginBottom: "30px" }}
          >
            <h4 className="mb-4">Hubungi {user ? user.fullname : ""}</h4>

            <Input
              label="Jenis Tawaran"
              id="offer-type"
              name="offer-type"
              type="text"
              placeholder="Masukkan jenis tawaran"
              classname={`mb-4 ${styles.input}`}
            />

            <Input
              label="Nama Perekrut"
              id="cp-name"
              name="cp-name"
              type="text"
              placeholder="Masukkan nama lengkap"
              classname={`mb-4 ${styles.input}`}
            />

            <Input
              label="Email Perekrut"
              id="cp-email"
              name="cp-email"
              type="text"
              placeholder="Masukkan email"
              classname={`mb-4 ${styles.input}`}
            />

            <Input
              label="No. Handphone Perekrut"
              id="cp-phone"
              name="cp-phone"
              type="text"
              placeholder="Masukkan nomor handphone"
              classname={`mb-4 ${styles.input}`}
            />

            <Input
              label="Deskripsi Singkat"
              id="description"
              name="description"
              type="text"
              placeholder="Masukkan deskripsi singkat tentang tawaran"
              classname={`mb-4 ${styles.input}`}
            />

            <Button
              title="Kirim Tawaran"
              type="submit"
              classname={styles["btn-yellow"]}
            />
          </form>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Hiring;
