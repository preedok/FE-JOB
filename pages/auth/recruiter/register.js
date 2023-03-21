import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import axios from "axios";
import swal from "sweetalert";
import Input from "../../../components/base/input";
import Button from "../../../components/base/button";
import styles from "../../../styles/auth.module.css";
import { LineWave } from "react-loader-spinner";

import AOS from "aos";
import "aos/dist/aos.css";
const CompanyRegister = () => {
  const router = useRouter();
  const [registerForm, setRegisterForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  const [confirmPassword, setConfirmPassword] = useState("");
  const handleInput = (e) => {
    setRegisterForm({
      ...registerForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = (e) => {
    e.preventDefault();

    if (registerForm.password !== confirmPassword) {
      return console.log("password tidak sama");
    }

    axios
      .post(
        `https://poised-boot-elk.cyclic.app/v1/company/register`,
        registerForm
      )
      .then(() => {
        router.push("/auth/company/login");
        swal({
          title: "Register Success",
          icon: "success",
        });
      })
      .catch((err) => {
        console.log(err);
        swal({
          title: "Failed",
          text: `Please make sure your data is correct!`,
          icon: "warning",
        });
      });
  };

  return (
    <main className={styles.main}>
      <section
        className={`align-self-center text-center col-md-6 ${styles.banner}`}
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
          Temukan developer berbakat & terbaik di berbagai bidang keahlian
        </h2>
      </section>
      <section
        className={`col-12 col-md-6 pt-1 ${styles.form}`}
        data-aos="zoom-in-left"
        data-aos-duration="1000"
      >
        <Image
          src="/assets/peworld-purple.svg"
          alt="peworld logo purple"
          width={150}
          height={150}
          className={styles["form-logo"]}
          onClick={() => router.push("/")}
        />
        <h1 className={styles.text}>Halo, Pewpeople</h1>
        <h5 className={styles.text}>
          Buat akun baru untuk mulai mencari talent!
        </h5>
        <form className="d-flex flex-column" onSubmit={handleRegister}>
          <Input
            label="Perusahaan"
            id="name"
            name="name"
            type="text"
            onchange={handleInput}
            placeholder="Masukkan nama perusahaan"
            classname={`mb-4 ${styles.input} ${styles.text}`}
          />
          <Input
            label="Email"
            id="email"
            name="email"
            type="email"
            onchange={handleInput}
            placeholder="Masukkan alamat email"
            classname={`mb-4 ${styles.input} ${styles.text}`}
          />
          <Input
            label="Nomor handphone"
            id="phone"
            name="phone"
            type="tel"
            onchange={handleInput}
            placeholder="Masukkan nomor handphone"
            classname={`mb-4 ${styles.input} ${styles.text}`}
          />
          <Input
            label="Kata sandi"
            id="password"
            name="password"
            type="password"
            onchange={handleInput}
            placeholder="Masukkan kata sandi"
            classname={`mb-4 ${styles.input} ${styles.text}`}
          />
          <Input
            label="Konfirmasi kata sandi"
            id="confirmpassword"
            name="confirmpassword"
            type="password"
            onchange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Konfirmasi kata sandi"
            classname={`mb-4 ${styles.input} ${styles.text}`}
          />
          <Button
            title="Daftar"
            type="submit"
            classname={`mb-3 ${styles.button}`}
          />
          <small className={` mb-3 ${styles.switch} ${styles.text}`}>
            Anda sudah punya akun?
            <Link href={"/auth/company/login"}>Masuk di sini</Link>
          </small>
        </form>
      </section>
    </main>
  );
};

export default CompanyRegister;
