import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import Input from "../../components/base/input";
import Button from "../../components/base/button";
import styles from "../../styles/auth.module.css";

const Reset = () => {
  const router = useRouter();
  return (
    <main className={styles.main}>
      <section className={`col-md-6 ${styles.banner}`}>
        <Image
          src="/assets/peworld-white.svg"
          alt="peworld logo white"
          width="100"
          height="100"
          onClick={() => router.push("/")}
        />
        <h2>
          Temukan developer berbakat & terbaik di berbagai bidang keahlian
        </h2>
      </section>
      <section className={`col-12 col-md-6 justify-content-start justify-content-md-center ${styles.form}`}>
        <Image
          src="/assets/peworld-purple.svg"
          alt="peworld logo purple"
          width={150}
          height={150}
          className={styles["form-logo"]}
          onClick={() => router.push("/")}
        />
        <h1>Atur ulang kata sandi</h1>
        <h5>Masukkan kata sandi baru untuk akun anda</h5>
        <form className="d-flex flex-column ">
        <Input
            label="Kata sandi"
            id="password"
            name="password"
            type="password"
            placeholder="Masukkan kata sandi"
            classname={`mb-4 ${styles.input}`}
          />
          <Input
            label="Konfirmasi kata sandi"
            id="conformpassword"
            name="conformpassword"
            type="password"
            placeholder="Konfirmasi kata sandi"
            classname={`mb-4 ${styles.input}`}
          />
          <Button
            title="Ubah Kata Sandi"
            type="submit"
            classname={`mb-3 ${styles.button}`}
          />
        </form>
      </section>
    </main>
  );
};

export default Reset;
