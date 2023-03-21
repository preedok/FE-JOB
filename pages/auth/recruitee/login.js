import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import Input from "../../../components/base/input";
import Button from "../../../components/base/button";
import styles from "../../../styles/auth.module.css";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { loginUsers } from "../../../redux/action/userAction";
import axios from "axios";
import swal from "sweetalert";

import AOS from "aos";
import "aos/dist/aos.css";
const Login = () => {
  const router = useRouter();
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });
  const handleInput = (e) => {
    setLoginForm({
      ...loginForm,
      [e.target.name]: e.target.value,
    });
  };
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);
  const dispacth = useDispatch();
  const handleLogin = (e) => {
    e.preventDefault();
    // dispacth(loginUsers(loginForm, router));
    axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/v1/user/login`, loginForm, {
        withCredentials: true,
      })
      .then((res) => {
        localStorage.setItem("token", res.data.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.data));
        router.push(`/profile/${res.data.data.user_id}`);
        swal({
          title: "Login Success",
          icon: "success",
        });
      })
      .catch(() => {
        swal({
          title: "Failed",
          icon: "warning",
        });
      });
  };

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
          Login dengan akunmu untuk mulai mencari pekerjaan!
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
            <Link href={"/auth/register"}>Daftar di sini</Link>
          </small>
          <small className={`${styles.switch} ${styles.text}`}>
            Tidak sedang mencari pekerjaan?
            <Link href={"/auth/company/login"}>Rekrut di sini</Link>
          </small>
        </form>
      </section>
    </main>
  );
};

export default Login;
