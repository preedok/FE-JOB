/* eslint-disable react-hooks/exhaustive-deps */
import Footer from "../../components/module/footer";
import Navi from "../../components/module/navi";
import Button from "../../components/base/button";
import styles from "../../styles/company.module.css";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import { LineWave } from "react-loader-spinner";

import AOS from "aos";
import "aos/dist/aos.css";
const CompanyProfile = () => {
  const router = useRouter();
  const { id } = router.query;
  const [company, setCompany] = useState();
  const [logo, setLogo] = useState(false);
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);
  useEffect(() => {
    axios
      .get(`https://poised-boot-elk.cyclic.app/v1/company/detail/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        setCompany(res.data.data[0]);
        setLogo(res.data.data[0].logo);
        console.log(res.data.data[0]);
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
        <div
          className={styles["company-card"]}
          data-aos="zoom-in-left"
          data-aos-duration="1000"
        >
          <div className={styles["bg-image"]} />
          <div className={styles["company-info"]}>
            <Image
              src={logo ? logo : "/assets/banner.png"}
              alt="company logo"
              width={200}
              height={200}
              style={{ objectFit: "cover", border: "4px solid #5e50a1" }}
            />
            <h4>{company ? company.name : "-"}</h4>
            <div className={styles.location}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                style={{ color: "#5e50a1", fontWeight: "900" }}
                fill="currentColor"
                className="bi bi-pin-map"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M3.1 11.2a.5.5 0 0 1 .4-.2H6a.5.5 0 0 1 0 1H3.75L1.5 15h13l-2.25-3H10a.5.5 0 0 1 0-1h2.5a.5.5 0 0 1 .4.2l3 4a.5.5 0 0 1-.4.8H.5a.5.5 0 0 1-.4-.8l3-4z"
                />
                <path
                  fill-rule="evenodd"
                  d="M8 1a3 3 0 1 0 0 6 3 3 0 0 0 0-6zM4 4a4 4 0 1 1 4.5 3.969V13.5a.5.5 0 0 1-1 0V7.97A4 4 0 0 1 4 3.999z"
                />
              </svg>
              <span className="ml-2">
                {company
                  ? company.location === null
                    ? "Nowhere"
                    : company.location
                  : "Nowhere"}
              </span>
            </div>
            <div className="container">
              <p className="text-justify">
                {company
                  ? company.description === null
                    ? "Deskripsi perusahaan"
                    : company.description
                  : "Deskripsi perusahaan"}
              </p>
            </div>

            <Button
              title="Edit Profile"
              type="button"
              classname={styles["btn-purple"]}
              onclick={() => router.push(`edit/${id}`)}
            />

            <div className="d-flex col-12 flex-column align-items-center justify-content-start">
              <div className={styles.contact}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  style={{ color: "#5e50a1", fontWeight: "900" }}
                  fill="currentColor"
                  className="bi bi-envelope-check"
                  viewBox="0 0 16 16"
                >
                  <path d="M2 2a2 2 0 0 0-2 2v8.01A2 2 0 0 0 2 14h5.5a.5.5 0 0 0 0-1H2a1 1 0 0 1-.966-.741l5.64-3.471L8 9.583l7-4.2V8.5a.5.5 0 0 0 1 0V4a2 2 0 0 0-2-2H2Zm3.708 6.208L1 11.105V5.383l4.708 2.825ZM1 4.217V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v.217l-7 4.2-7-4.2Z" />
                  <path d="M16 12.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Zm-1.993-1.679a.5.5 0 0 0-.686.172l-1.17 1.95-.547-.547a.5.5 0 0 0-.708.708l.774.773a.75.75 0 0 0 1.174-.144l1.335-2.226a.5.5 0 0 0-.172-.686Z" />
                </svg>
                <span className="ml-2">{company ? company.email : ""}</span>
              </div>

              <div className={styles.contact}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  style={{ color: "#5e50a1", fontWeight: "900" }}
                  fill="currentColor"
                  className="bi bi-phone-vibrate"
                  viewBox="0 0 16 16"
                >
                  <path d="M10 3a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h4zM6 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H6z" />
                  <path d="M8 12a1 1 0 1 0 0-2 1 1 0 0 0 0 2zM1.599 4.058a.5.5 0 0 1 .208.676A6.967 6.967 0 0 0 1 8c0 1.18.292 2.292.807 3.266a.5.5 0 0 1-.884.468A7.968 7.968 0 0 1 0 8c0-1.347.334-2.619.923-3.734a.5.5 0 0 1 .676-.208zm12.802 0a.5.5 0 0 1 .676.208A7.967 7.967 0 0 1 16 8a7.967 7.967 0 0 1-.923 3.734.5.5 0 0 1-.884-.468A6.967 6.967 0 0 0 15 8c0-1.18-.292-2.292-.807-3.266a.5.5 0 0 1 .208-.676zM3.057 5.534a.5.5 0 0 1 .284.648A4.986 4.986 0 0 0 3 8c0 .642.12 1.255.34 1.818a.5.5 0 1 1-.93.364A5.986 5.986 0 0 1 2 8c0-.769.145-1.505.41-2.182a.5.5 0 0 1 .647-.284zm9.886 0a.5.5 0 0 1 .648.284C13.855 6.495 14 7.231 14 8c0 .769-.145 1.505-.41 2.182a.5.5 0 0 1-.93-.364C12.88 9.255 13 8.642 13 8c0-.642-.12-1.255-.34-1.818a.5.5 0 0 1 .283-.648z" />
                </svg>
                <span className="ml-2">{company ? company.phone : ""}</span>
              </div>
              {/* 
              {company ? (
                company.insta === null ? (
                  ""
                ) : (
                  <div className={styles.contact}>
                    <FontAwesomeIcon icon={faInstagram} height={15} />
                    <span className="ml-2">{company.insta}</span>
                  </div>
                )
              ) : (
                ""
              )}

              {company ? (
                company.linkedin === null ? (
                  ""
                ) : (
                  <div className={styles.contact}>
                    <FontAwesomeIcon icon={faLinkedin} height={15} />
                    <span className="ml-2">{company.linkedin}</span>
                  </div>
                )
              ) : (
                ""
              )} */}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

// SSG
export const getStaticProps = async (context) => {
  const { id } = context.params;
  const result = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/v1/company/detail/${id}`
  );

  return {
    props: {
      companyData: result.data.data[0],
    },
  };
};

export const getStaticPaths = async (context) => {
  const data = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/v1/company/list`
  );
  const res = data.data.data;
  const paths = res.map((item) => {
    return {
      params: { id: item.company_id + "" },
    };
  });

  return {
    paths: paths,
    fallback: true,
  };
};

export default CompanyProfile;
