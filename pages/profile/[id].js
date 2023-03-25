import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Footer from "../../components/module/footer";
import Navi from "../../components/module/navi";
import Button from "../../components/base/button";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import styles from "../../styles/profile.module.css";
import swal from "sweetalert";
import { LineWave } from "react-loader-spinner";
import Image from "next/image";

import AOS from "aos";
import "aos/dist/aos.css";
const Profile = (props) => {
  const [view, setView] = useState("porto");
  const router = useRouter();
  const { id } = router.query;
  const [isWorker, setIsWorker] = useState(false);
  const [user, setUser] = useState(props.responeUser[0]);
  const [skills, setSkills] = useState();
  const [portos, setPortos] = useState();
  const [expis, setExpis] = useState();
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);
  useEffect(() => {
    let data;
    if (localStorage.getItem("company")) {
      data = JSON.parse(localStorage.getItem("company"));
    } else if (localStorage.getItem("user")) {
      data = JSON.parse(localStorage.getItem("user"));
    }

    if (data.user_id) {
      setIsWorker(true);
    }
  }, []);

  // Delete function
  const deletePorto = (val) => {
    swal({
      title: "Delete",
      text: `Yakin Delete portfolio?`,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (confirm) => {
      if (confirm) {
        await axios.delete(
          `https://teal-inquisitive-xerus.cyclic.app/v1/user/portfolio/${val}`
        );
        swal({
          title: "Delete",
          text: `Success Delete`,
          icon: "success",
        });
      }
    });
  };

  const deleteExp = (val) => {
    swal({
      title: "Delete",
      text: `Yakin delete experience?`,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (confirm) => {
      if (confirm) {
        await axios.delete(
          `https://teal-inquisitive-xerus.cyclic.app/v1/user/experience/${val}`
        );
        swal({
          title: "Delete",
          text: `Success Delete experience`,
          icon: "success",
        });
      }
    });
  };

  useEffect(() => {
    axios
      .get(`https://teal-inquisitive-xerus.cyclic.app/v1/user/${id}/skill`)
      .then((res) => {
        setSkills(res.data.skills);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [router.isReady]);

  useEffect(() => {
    axios
      .get(`https://teal-inquisitive-xerus.cyclic.app/v1/user/${id}/portfolio`)
      .then((res) => {
        setPortos(res.data.portfolio);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [router.isReady]);

  useEffect(() => {
    axios
      .get(`https://teal-inquisitive-xerus.cyclic.app/v1/user/${id}/experience`)
      .then((res) => {
        console.log(res.data.experiences);
        setExpis(res.data.experiences);
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
      <div className={styles["bg-purple"]} />
      <main className={styles.main}>
        <section
          className={`col-12 col-md-3 ${styles.profile}`}
          data-aos="zoom-in-right"
          data-aos-duration="1000"
        >
          {user?.avatar ? (
            <Image
              src={user.avatar}
              alt="user avatar"
              width={200}
              height={200}
              style={{ objectFit: "cover", border: "4px solid #5e50a1" }}
            />
          ) : (
            <Image
              src={"/assets/banner.png"}
              alt="user avatar"
              width={200}
              height={200}
              style={{
                objectFit: "cover",
                boxShadow: "10px 10px 21px -9px rgba(0, 0, 0, 0.25)",
                webkitBoxShadow: "10px 10px 21px -9px rgba(0, 0, 0, 0.25)",
              }}
            />
          )}
          <h4 style={{ textAlign: "center" }} className="m-0 ">
            {user ? user.fullname : ""}
          </h4>
          <h5 style={{ textAlign: "center", color: "red" }} className="m-0">
            {user?.title ? user.title : "Jobseeker"}
          </h5>
          <div style={{ textAlign: "center" }} className={styles.location}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              fill="currentColor"
              className="bi bi-geo-alt"
              viewBox="0 0 16 16"
            >
              <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z" />
              <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
            </svg>
            <span style={{ textAlign: "center" }} className="ml-2">
              {user?.location ? user.location : "Nowhere"}
            </span>
          </div>
          <p style={{ textAlign: "center" }}>
            {user
              ? user.description
              : `This line supposed to be a short description about the talent, but
            since I can&apos;t cast the lorem100 so I type this instead.`}
          </p>

          <Button
            title={isWorker ? "Update Profile" : "Rekrut"}
            type="button"
            classname={styles["btn-purple"]}
            onclick={() => {
              isWorker
                ? router.push(`/profile/edit/${id}`)
                : router.push(`/hiring/${id}`);
            }}
          />

          {/* skill info */}
          {skills && skills.length > 0 && (
            <>
              <h4>Skill</h4>
              <div className={styles.skillset}>
                {skills
                  ? skills.map((skill) => <span>{skill.skill_name}</span>)
                  : ""}
              </div>
            </>
          )}

          {/* contact info */}
          <h4>Contact</h4>
          <div className={styles.contact}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              fill="currentColor"
              className="bi bi-envelope-at"
              viewBox="0 0 16 16"
            >
              <path d="M2 2a2 2 0 0 0-2 2v8.01A2 2 0 0 0 2 14h5.5a.5.5 0 0 0 0-1H2a1 1 0 0 1-.966-.741l5.64-3.471L8 9.583l7-4.2V8.5a.5.5 0 0 0 1 0V4a2 2 0 0 0-2-2H2Zm3.708 6.208L1 11.105V5.383l4.708 2.825ZM1 4.217V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v.217l-7 4.2-7-4.2Z" />
              <path d="M14.247 14.269c1.01 0 1.587-.857 1.587-2.025v-.21C15.834 10.43 14.64 9 12.52 9h-.035C10.42 9 9 10.36 9 12.432v.214C9 14.82 10.438 16 12.358 16h.044c.594 0 1.018-.074 1.237-.175v-.73c-.245.11-.673.18-1.18.18h-.044c-1.334 0-2.571-.788-2.571-2.655v-.157c0-1.657 1.058-2.724 2.64-2.724h.04c1.535 0 2.484 1.05 2.484 2.326v.118c0 .975-.324 1.39-.639 1.39-.232 0-.41-.148-.41-.42v-2.19h-.906v.569h-.03c-.084-.298-.368-.63-.954-.63-.778 0-1.259.555-1.259 1.4v.528c0 .892.49 1.434 1.26 1.434.471 0 .896-.227 1.014-.643h.043c.118.42.617.648 1.12.648Zm-2.453-1.588v-.227c0-.546.227-.791.573-.791.297 0 .572.192.572.708v.367c0 .573-.253.744-.564.744-.354 0-.581-.215-.581-.8Z" />
            </svg>
            <span className="ml-2">{user ? user.email : ""}</span>
          </div>

          {user?.insta && (
            <div className={styles.contact}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                fill="currentColor"
                className="bi bi-instagram"
                viewBox="0 0 16 16"
              >
                <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z" />
              </svg>
              <span className="ml-2">{user.insta}</span>
            </div>
          )}

          {user?.github && (
            <div className={styles.contact}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                fill="currentColor"
                className="bi bi-github"
                viewBox="0 0 16 16"
              >
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
              </svg>
              <span className="ml-2">{user.github}</span>
            </div>
          )}

          {user?.linkedin && (
            <div className={styles.contact}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                fill="currentColor"
                className="bi bi-linkedin"
                viewBox="0 0 16 16"
              >
                <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z" />
              </svg>
              <span className="ml-2">{user.linkedin}</span>
            </div>
          )}
        </section>

        <section
          className={`col-12 col-md-9 ${styles.infograph}`}
          data-aos="zoom-in-left"
          data-aos-duration="1000"
        >
          <div className={styles["info-card"]} style={{ marginBottom: "30px" }}>
            {view === "porto" ? (
              <>
                <div className="mb-4">
                  <button
                    onClick={() => setView("porto")}
                    style={{ border: "none", background: "none" }}
                    className={`${styles.list} me-5`}
                  >
                    Portofolio
                  </button>
                  <button
                    onClick={() => setView("hire")}
                    style={{ border: "none", background: "none" }}
                    className={`${styles.list} me-4`}
                  >
                    Pengalaman Kerja
                  </button>
                  <hr />
                </div>
              </>
            ) : view === "hire" ? (
              <>
                <div className="mb-4 ">
                  <button
                    onClick={() => setView("porto")}
                    style={{ border: "none", background: "none" }}
                    className={`${styles.list} me-5`}
                  >
                    Portofolio
                  </button>
                  <button
                    onClick={() => setView("hire")}
                    style={{ border: "none", background: "none" }}
                    className={`${styles.list} me-4`}
                  >
                    Pengalaman Kerja
                  </button>
                  <hr />
                </div>
              </>
            ) : (
              ""
            )}

            {view === "porto" ? (
              <div className="d-flex justify-content-between flex-wrap">
                <div className={`col-12 m-0 p-0 ${styles.portfolio}`}>
                  {portos && portos.length > 0
                    ? portos.map((porto) => (
                        <div className="d-flex flex-column text-center col-3 mr-2">
                          {isWorker ? (
                            <Button
                              title={
                                <FontAwesomeIcon
                                  icon={faTrashCan}
                                  height={15}
                                />
                              }
                              type="button"
                              classname={styles["delete-btn"]}
                              onclick={() => deletePorto(porto.app_id)}
                            />
                          ) : (
                            ""
                          )}
                          <Image
                            src={porto.app_image}
                            alt="user avatar"
                            width={200}
                            height={200}
                            style={{
                              boxShadow:
                                "10px 10px 21px -9px rgba(0, 0, 0, 0.25)",
                              webkitBoxShadow:
                                "10px 10px 21px -9px rgba(0, 0, 0, 0.25)",
                            }}
                          />
                          <h6 className="mt-3 mb-3">
                            {porto.app_name} |{" "}
                            {porto.app_type ? "Mobile App" : "Web App"}
                          </h6>
                        </div>
                      ))
                    : "- portofolio data  not found -"}
                </div>
              </div>
            ) : view === "hire" ? (
              <div className={styles.experience}>
                {expis && expis.length > 0
                  ? expis.map((exp) => (
                      <div className="d-flex col-12 align-items-center mb-3">
                        <Image
                          src={exp.company_image}
                          alt="company logo"
                          width={100}
                          height={100}
                          style={{
                            boxShadow:
                              "10px 10px 21px -9px rgba(0, 0, 0, 0.25)",
                            webkitBoxShadow:
                              "10px 10px 21px -9px rgba(0, 0, 0, 0.25)",
                          }}
                        />
                        <div className="d-flex col-10 justify-content-between align-items-center">
                          <div className="d-flex flex-column col-9 justify-content-center">
                            <h5>{exp.position ? exp.position : "Free role"}</h5>
                            <h6>{exp.company_name}</h6>
                            <span>
                              {exp.start_date} - {exp.end_date}
                            </span>
                            <p className="m-0">{exp.description}</p>
                          </div>

                          {isWorker ? (
                            <Button
                              title={
                                <FontAwesomeIcon
                                  icon={faTrashCan}
                                  height={15}
                                />
                              }
                              type="button"
                              classname={styles["alt-delete-btn"]}
                              onclick={() => deleteExp(exp.exp_id)}
                            />
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    ))
                  : "- portofolio data  not found -"}
              </div>
            ) : (
              ""
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

//SSR
export async function getServerSideProps(context) {
  const id = context.params.id;
  let responeUser = [];
  try {
    const { data } = await axios.get(
      `https://teal-inquisitive-xerus.cyclic.app/v1/user/${id}`
    );
    responeUser.push(data.data);
  } catch (err) {
    console.log(err);
  }
  return {
    props: {
      responeUser,
    },
  };
}

export default Profile;
