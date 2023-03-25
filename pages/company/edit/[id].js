/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationPin,
  faPen,
  faImage,
} from "@fortawesome/free-solid-svg-icons";
import Footer from "../../../components/module/footer";
import Navi from "../../../components/module/navi";
import Button from "../../../components/base/button";
import styles from "../../../styles/companyEdit.module.css";
import Input from "../../../components/base/input";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import { LineWave } from "react-loader-spinner";

import AOS from "aos";
import "aos/dist/aos.css";
const CompanyEdit = () => {
  const router = useRouter();
  const { id } = router.query;
  const [company, setCompany] = useState();
  const [updateForm, setUpdateForm] = useState();
  const [logo, setLogo] = useState();
  const [preview, setPreview] = useState();

  const handleInput = (e) => {
    setUpdateForm({
      ...updateForm,
      [e.target.name]: e.target.value,
    });
  };
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  const handleFile = (e) => {
    setLogo(e.target.files[0]);
    setPreview([URL.createObjectURL(e.target.files[0])]);
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    let formData = new FormData();
    if (updateForm.name) {
      formData.append("name", updateForm.name);
    }
    if (updateForm.area) {
      formData.append("area", updateForm.area);
    }
    if (updateForm.location) {
      formData.append("location", updateForm.location);
    }
    if (updateForm.description) {
      formData.append("description", updateForm.description);
    }
    if (updateForm.insta) {
      formData.append("insta", updateForm.insta);
    }
    if (updateForm.linkedin) {
      formData.append("linkedin", updateForm.linkedin);
    }
    if (logo) {
      formData.append("logo", logo);
    }

    axios
      .put(
        `https://teal-inquisitive-xerus.cyclic.app/v1/company/update/${id}`,
        formData
      )
      .then((res) => {
        alert("update berhasil");
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getCompany();
  }, [router.isReady]);

  const getCompany = async () => {
    const result = await axios.get(
      `https://teal-inquisitive-xerus.cyclic.app/v1/company/detail/${id}`
    );
    setCompany(result.data.data[0]);
    if (result.data.data[0].logo) {
      setPreview(result.data.data[0].logo);
    }
  };

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
      <div className={styles["bg-purple"]} />
      <main className={styles.main}>
        <section
          className={`col-12 col-md-3 ${styles["profile-card"]}`}
          data-aos="zoom-in-right"
          data-aos-duration="1000"
        >
          <div className={`col-12 ${styles.profile}`}>
            <img
              src={preview ? preview : "/assets/banner.png"}
              alt="user avatar"
              width={200}
              height={200}
              style={{ objectFit: "cover", border: "4px solid #5e50a1" }}
            />

            <Button
              title={
                <label htmlFor="logo">
                  <FontAwesomeIcon icon={faPen} height={13} />
                  <span className="ml-2">Upload</span>
                </label>
              }
              type="button"
              classname={styles["btn-edit"]}
            />
            <input
              type="file"
              id="logo"
              name="logo"
              onChange={handleFile}
              hidden
            />

            <h4 className="m-0">{company ? company.name : ""}</h4>
            <h6 className="m-0">
              {company ? (company.area === null ? "Any" : company.area) : "Any"}
            </h6>
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
            <div className={`col-12 ${styles["btn-group-top"]}`}>
              <Button
                title="Simpan"
                type="button"
                classname={styles["btn-purple"]}
                onclick={handleUpdate}
              />
              <Button
                title="Batal"
                type="button"
                classname={styles["btn-white"]}
                onclick={() => router.push(`/company/${id}`)}
              />
            </div>
          </div>
        </section>

        <section
          className={`col-12 col-md-9 ${styles.editor}`}
          data-aos="zoom-in-left"
          data-aos-duration="1000"
        >
          <div className={styles["edit-card"]}>
            <h4>Data Perusahaan</h4>
            <div className={styles.hl} />
            <form>
              <Input
                label="Nama Perusahaan"
                id="name"
                name="name"
                type="text"
                placeholder={company ? company.name : ""}
                classname={`mb-4 ${styles.input}`}
                onchange={handleInput}
              />
              <Input
                label="Bidang"
                id="area"
                name="area"
                type="text"
                placeholder={
                  company
                    ? company.area === null
                      ? "Masukkan bidang perusahaan"
                      : company.area
                    : "Masukkan bidang perusahaan"
                }
                classname={`mb-4 ${styles.input}`}
                onchange={handleInput}
              />
              <Input
                label="Domisili"
                id="location"
                name="location"
                type="text"
                placeholder={
                  company
                    ? company.location === null
                      ? "Masukan domisili perusahaan"
                      : company.location
                    : "Masukan domisili perusahaan"
                }
                onchange={handleInput}
                classname={`mb-4 ${styles.input}`}
              />

              <Input
                label="Deskripsi Perusahaan"
                id="description"
                name="description"
                type="text"
                placeholder={
                  company
                    ? company.description === null
                      ? "Masukkan deskripsi perusahaan"
                      : company.description
                    : "Masukkan deskripsi perusahaan"
                }
                classname={`mb-4 ${styles.input}`}
                onchange={handleInput}
              />

              <Input
                label="Instagram"
                id="insta"
                name="insta"
                type="text"
                placeholder={
                  company
                    ? company.insta === null
                      ? "Masukkan akun Instagram"
                      : company.insta
                    : "Masukkan akun Instagram"
                }
                classname={`mb-4 ${styles.input}`}
                onchange={handleInput}
              />

              <Input
                label="Linkedin"
                id="linkedin"
                name="linkedin"
                type="text"
                placeholder={
                  company
                    ? company.linkedin === null
                      ? "Masukkan akun LinkedIn"
                      : company.linkedin
                    : "Masukkan akun LinkedIn"
                }
                classname={styles.input}
                onchange={handleInput}
              />
            </form>
          </div>
        </section>

        <section className={`col-12 ${styles["btn-group-btm"]}`}>
          <Button
            title="Simpan"
            type="button"
            classname={styles["btn-purple"]}
            onclick={handleUpdate}
          />
          <Button
            title="Batal"
            type="button"
            classname={styles["btn-white"]}
            onclick={() => router.push(`/company/${id}`)}
          />
        </section>
      </main>
      <Footer />
    </>
  );
};

export default CompanyEdit;
