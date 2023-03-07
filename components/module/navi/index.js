/* eslint-disable react-hooks/exhaustive-deps */
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import swal from "sweetalert";
import Button from "../../base/button";
import styles from "./navi.module.css";

const Navi = () => {
  const router = useRouter();
  const [isLogout, setIsLogout] = useState(false);
  const [localData, setLocalData] = useState();
  const [isToken, setIsToken] = useState(false);
  const [isRecruiter, setIsRecruiter] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      const position = window.pageYOffset;
      setScrollPosition(position);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    let data;
    if (localStorage.getItem("token")) {
      if (localStorage.getItem("company")) {
        data = JSON.parse(localStorage.getItem("company"));
      } else if (localStorage.getItem("token")) {
        data = JSON.parse(localStorage.getItem("user"));
      }

      setLocalData(data);
      if (data.company_id || data.user_id) {
        setIsToken(true);
      }

      if (data.company_id) {
        setIsRecruiter(true);
      }
    }
  }, []);

  const handleLogout = () => {
    swal({
      title: "Logout",
      text: `Yakin Mau Logout?`,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (confirm) => {
      if (confirm) {
        localStorage.clear();
        setIsLogout(true);
      }
    });
  };

  useEffect(() => {
    if (isLogout) {
      swal({
        title: "Logout Success",
        icon: "success",
      });
      router.push("/auth/login");
    }
  }, [isLogout]);

  return (
    <nav
      className={` mb-5 navbar navbar-expand-md  ${styles.navi} ${
        scrollPosition > 0 ? styles.scrolled : ""
      }`}
    >
      <Image
        src={"/assets/peworld-black.svg"}
        className={styles.cc}
        alt="Peworld logo purple"
        width={150}
        height={70}
        onclick={() => router.push("/home")}
      />

      <button
        className={`navbar-toggler ${styles.toggler}`}
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#toggleMenu"
        aria-controls="toggleMenu"
        aria-expanded="false"
        aria-label="Toogle navigation"
      >
        <span className="navbar-toggler-icon">
          <Image
            src={"/assets/hamburger.svg"}
            alt="hamburger icon"
            width={30}
            height={30}
          />
        </span>
      </button>

      {isToken ? (
        <div className="collapse navbar-collapse" id="toggleMenu">
          <ul className="container p-0 navbar-nav text-center d-flex justify-content-end">
            <div className="d-flex flex-md-row flex-column justify-content-center">
              {isRecruiter && (
                <li>
                  <Button
                    title={
                      <>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="25"
                          height="25"
                          fill="currentColor"
                          className="bi bi-house-gear"
                          viewBox="0 0 16 16"
                        >
                          <path d="M7.293 1.5a1 1 0 0 1 1.414 0L11 3.793V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v3.293l2.354 2.353a.5.5 0 0 1-.708.708L8 2.207l-5 5V13.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 1 0 1h-4A1.5 1.5 0 0 1 2 13.5V8.207l-.646.647a.5.5 0 1 1-.708-.708L7.293 1.5Z" />
                          <path d="M11.886 9.46c.18-.613 1.048-.613 1.229 0l.043.148a.64.64 0 0 0 .921.382l.136-.074c.561-.306 1.175.308.87.869l-.075.136a.64.64 0 0 0 .382.92l.149.045c.612.18.612 1.048 0 1.229l-.15.043a.64.64 0 0 0-.38.921l.074.136c.305.561-.309 1.175-.87.87l-.136-.075a.64.64 0 0 0-.92.382l-.045.149c-.18.612-1.048.612-1.229 0l-.043-.15a.64.64 0 0 0-.921-.38l-.136.074c-.561.305-1.175-.309-.87-.87l.075-.136a.64.64 0 0 0-.382-.92l-.148-.044c-.613-.181-.613-1.049 0-1.23l.148-.043a.64.64 0 0 0 .382-.921l-.074-.136c-.306-.561.308-1.175.869-.87l.136.075a.64.64 0 0 0 .92-.382l.045-.148ZM14 12.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0Z" />
                        </svg>
                        <span className={`m-0 ml-2 ${styles["nav-text"]}`}>
                          Home
                        </span>
                      </>
                    }
                    type="button"
                    classname={`mb-3 m-md-0 ${styles["btn-white"]}`}
                    onclick={() => router.push("/home")}
                  />
                </li>
              )}
              <li>
                <Button
                  title={
                    <>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="22"
                        height="25"
                        fill="currentColor"
                        className="bi bi-bell"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z" />
                      </svg>
                      <span className={`m-0 ml-2 ${styles["nav-text"]}`}>
                        Notification
                      </span>
                    </>
                  }
                  type="button"
                  classname={`mb-3 m-md-0 ${styles["btn-white"]}`}
                />
              </li>
              <li>
                <Button
                  title={
                    <>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="25"
                        height="25"
                        fill="currentColor"
                        className="bi bi-person-gear"
                        viewBox="0 0 16 16"
                      >
                        <path d="M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm.256 7a4.474 4.474 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10c.26 0 .507.009.74.025.226-.341.496-.65.804-.918C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4s1 1 1 1h5.256Zm3.63-4.54c.18-.613 1.048-.613 1.229 0l.043.148a.64.64 0 0 0 .921.382l.136-.074c.561-.306 1.175.308.87.869l-.075.136a.64.64 0 0 0 .382.92l.149.045c.612.18.612 1.048 0 1.229l-.15.043a.64.64 0 0 0-.38.921l.074.136c.305.561-.309 1.175-.87.87l-.136-.075a.64.64 0 0 0-.92.382l-.045.149c-.18.612-1.048.612-1.229 0l-.043-.15a.64.64 0 0 0-.921-.38l-.136.074c-.561.305-1.175-.309-.87-.87l.075-.136a.64.64 0 0 0-.382-.92l-.148-.045c-.613-.18-.613-1.048 0-1.229l.148-.043a.64.64 0 0 0 .382-.921l-.074-.136c-.306-.561.308-1.175.869-.87l.136.075a.64.64 0 0 0 .92-.382l.045-.148ZM14 12.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0Z" />
                      </svg>
                      <span className={`m-0 ml-2 ${styles["nav-text"]}`}>
                        Profile
                      </span>
                    </>
                  }
                  type="button"
                  classname={`mb-3 m-md-0 ${styles["btn-white"]}`}
                  onclick={() =>
                    router.push(
                      isRecruiter
                        ? `/company/${localData.company_id}`
                        : `/profile/${localData.user_id}`
                    )
                  }
                />
              </li>

              <li>
                <Button
                  title={
                    <>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="25"
                        height="25"
                        fill="currentColor"
                        className="bi bi-envelope-plus"
                        viewBox="0 0 16 16"
                      >
                        <path d="M2 2a2 2 0 0 0-2 2v8.01A2 2 0 0 0 2 14h5.5a.5.5 0 0 0 0-1H2a1 1 0 0 1-.966-.741l5.64-3.471L8 9.583l7-4.2V8.5a.5.5 0 0 0 1 0V4a2 2 0 0 0-2-2H2Zm3.708 6.208L1 11.105V5.383l4.708 2.825ZM1 4.217V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v.217l-7 4.2-7-4.2Z" />
                        <path d="M16 12.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Zm-3.5-2a.5.5 0 0 0-.5.5v1h-1a.5.5 0 0 0 0 1h1v1a.5.5 0 0 0 1 0v-1h1a.5.5 0 0 0 0-1h-1v-1a.5.5 0 0 0-.5-.5Z" />
                      </svg>
                      <span className={`m-0 ml-2 ${styles["nav-text"]}`}>
                        Mail
                      </span>
                    </>
                  }
                  type="button"
                  classname={`mb-3 m-md-0 ${styles["btn-white"]}`}
                />
              </li>

              <li>
                <Button
                  title={
                    <>
                      <span className="me-4">Log Out</span>
                    </>
                  }
                  type="button"
                  classname={styles["btn-purple"]}
                  onclick={handleLogout}
                />
              </li>
            </div>
          </ul>
        </div>
      ) : (
        <div className="collapse navbar-collapse" id="toggleMenu">
          <ul className="container p-0 navbar-nav text-center d-flex justify-content-end">
            <div className="d-flex flex-row justify-content-center">
              <li>
                <Button
                  title="Masuk"
                  type="button"
                  classname={`mb-3 m-md-0 ${styles["btn-white-alt"]}`}
                  onclick={() => router.push("/auth/condi/condi")}
                />
              </li>

              <li>
                <Button
                  title="Daftar"
                  type="button"
                  classname={styles["btn-purple-alt"]}
                  onclick={() => router.push("/auth/condi/condi")}
                />
              </li>
            </div>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navi;
