import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import Input from "../../../components/base/input";
import Button from "../../../components/base/button";
import styles from "../../../styles/auth.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import swal from "sweetalert";
import { useDispatch } from "react-redux";
import { loginRecruiter } from "../../../redux/action/userAction";
import { LineWave } from "react-loader-spinner";

import AOS from "aos";
import "aos/dist/aos.css";
const CompanyLogin = () => {
  const router = useRouter();
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);
  const handleInput = (e) => {
    setLoginForm({
      ...loginForm,
      [e.target.name]: e.target.value,
    });
  };

  const dispacth = useDispatch();
  const handleLogin = (e) => {
    e.preventDefault();
    // dispacth(loginRecruiter(loginForm, router));
    axios
      .post(`https://long-poncho-goat.cyclic.app/v1/company/login`, loginForm, {
        withCredentials: true,
      })
      .then((res) => {
        localStorage.setItem("token", res.data.data.token);
        localStorage.setItem("company", JSON.stringify(res.data.data));
        router.push("/home");
        swal({
          title: "Login Success",
          icon: "success",
        });
      })
      .catch(() => {
        swal({
          title: "Failed",
          text: `Email or password incorrect!`,
          icon: "warning",
        });
      });
  };

  return (
    <main className={styles.main}>
      <section
        className={` align-self-center text-center col-md-6 ${styles.banner}`}
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
        className={`col-12 col-md-6 ${styles.form}`}
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
          Login dengan akunmu untuk mulai merekrut talent!
        </h5>
        <form onSubmit={handleLogin} className="d-flex flex-column ">
          <Input
            label="Email"
            id="email"
            name="email"
            type="email"
            placeholder="Masukkan alamat email"
            classname={`mb-4 ${styles.input} ${styles.text}`}
            onchange={handleInput}
          />
          <Input
            label="Kata sandi"
            id="password"
            name="password"
            type="password"
            placeholder="Masukkan kata sandi"
            classname={`mb-4 ${styles.input} ${styles.text}`}
            onchange={handleInput}
          />
          <Link
            href={"/auth/forgot"}
            className={`mb-3 ${styles.forgot} ${styles.text}`}
          >
            Lupa kata sandi?
          </Link>
          <Button
            title="Masuk"
            type="submit"
            classname={`mb-3 ${styles.button}`}
          />
          <small className={` mb-2 ${styles.switch} ${styles.text}`}>
            Anda belum punya akun?
            <Link href={"/auth/company/register"}>Daftar di sini</Link>
          </small>
          <small className={`${styles.switch} ${styles.text}`}>
            Sedang mencari pekerjaan baru?
            <Link href={"/auth/login"}>Cari pekerjaan di sini</Link>
          </small>
        </form>
      </section>
    </main>
  );
};

export default CompanyLogin;
