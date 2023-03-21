/* eslint-disable react-hooks/exhaustive-deps */
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faImage } from "@fortawesome/free-solid-svg-icons";
import Footer from "../../../components/module/footer";
import Navi from "../../../components/module/navi";
import Button from "../../../components/base/button";
import styles from "../../../styles/profileEdit.module.css";
import Input from "../../../components/base/input";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import swal from "sweetalert";
import { LineWave } from "react-loader-spinner";

import AOS from "aos";
import "aos/dist/aos.css";
const ProfileEdit = () => {
  const router = useRouter();
  const { id } = router.query;
  const [user, setUser] = useState();
  const [companies, setCompanies] = useState();
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);
  // Update User
  const [update, setUpdate] = useState();
  const [avatar, setAvatar] = useState();
  const [avatarPreview, setAvatarPreview] = useState();

  const handleInput = (e) => {
    setUpdate({
      ...update,
      [e.target.name]: e.target.value,
    });
  };

  const handleAvatar = (e) => {
    setAvatar(e.target.files[0]);
    setAvatarPreview([URL.createObjectURL(e.target.files[0])]);
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    let formData = new FormData();
    if (update.fullname) {
      formData.append("fullname", update.fullname);
    }
    if (update.title) {
      formData.append("title", update.title);
    }
    if (update.location) {
      formData.append("location", update.location);
    }
    if (update.description) {
      formData.append("description", update.description);
    }
    if (update.insta) {
      formData.append("insta", update.insta);
    }
    if (update.github) {
      formData.append("github", update.github);
    }
    if (update.linkedin) {
      formData.append("linkedin", update.linkedin);
    }
    if (avatar) {
      formData.append("avatar", avatar);
    }

    axios
      .put(`https://long-poncho-goat.cyclic.app/v1/user/update/${id}`, formData)
      .then(() => {
        swal({
          title: "Success Update!",
          icon: "success",
        });
        setUpdate();
        router.back();
      })
      .catch((err) => {
        console.log(err);
        swal({
          title: "Failed",
          icon: "warning",
        });
      });
  };

  // Insert Skill
  const [newSkill, setNewSkill] = useState({
    id,
    name: "",
  });

  const handleSkill = (e) => {
    e.preventDefault();

    if (newSkill.name) {
      axios
        .post(`https://long-poncho-goat.cyclic.app/v1/user/skill`, newSkill)
        .then(() => {
          swal({
            title: "Success Add Skill!",
            icon: "success",
          });
          setNewSkill({
            ...newSkill,
            name: "",
          });
        })
        .catch((err) => {
          console.log(err);
          swal({
            title: "Failed",
            icon: "warning",
          });
        });
    } else {
      alert("harap masukkan data");
    }
  };

  // Insert Experience
  const [formData, setFormData] = useState({
    id,
    position: "",
    company_name: "",
    start_date: "",
    end_date: "",
    description: "",
    image: null,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleImageChange = (event) => {
    setFormData((prevState) => ({
      ...prevState,
      image: event.target.files[0],
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formDataWithImage = new FormData();
    formDataWithImage.append("id", id);
    formDataWithImage.append("position", formData.position);
    formDataWithImage.append("company_name", formData.company_name);
    formDataWithImage.append("start_date", formData.start_date);
    formDataWithImage.append("end_date", formData.end_date);
    formDataWithImage.append("description", formData.description);
    formDataWithImage.append("image", formData.image);
    try {
      const response = await axios.post(
        `https://long-poncho-goat.cyclic.app/v1/user/experience`,
        formDataWithImage
      );
      swal({
        title: "Success Add",
        icon: "success",
      });
      console.log(response.data);
    } catch (error) {
      swal({
        title: "Failed",
        icon: "warning",
      });
      console.error(error);
    }
  };

  // Insert Portfolio
  const [newPorto, setNewPorto] = useState();
  const [portoImg, setPortoImg] = useState();
  const handlePortoImg = (e) => {
    setPortoImg(e.target.files[0]);
  };

  const handlePorto = (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("id", id);
    formData.append("name", newPorto.name);
    formData.append("link", newPorto.link);
    formData.append("type", newPorto.type);
    formData.append("image", portoImg);
    axios
      .post(`https://long-poncho-goat.cyclic.app/v1/user/portfolio`, formData)
      .then(() => {
        swal({
          title: "Success Add",
          icon: "success",
        });
      })
      .catch((err) => {
        console.log("ini error");
        console.log(err);
        console.log("ini error");
        swal({
          title: "Failed",
          icon: "warning",
        });
      });
  };

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
      .get(`https://long-poncho-goat.cyclic.app/v1/company/list`)
      .then((res) => {
        console.log(res.data.data);
        setCompanies(res.data.data);
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
          className={`col-12 col-md-3 ${styles["profile-card"]}`}
          data-aos="zoom-in-right"
          data-aos-duration="1000"
        >
          <div className={`col-12 ${styles.profile}`}>
            {user?.avatar ? (
              <Image
                src={avatarPreview ? avatarPreview : user.avatar}
                alt="user avatar"
                width={200}
                height={200}
                style={{ border: "4px solid #5e50a1" }}
              />
            ) : (
              <Image
                src={"/assets/banner.png"}
                alt="user avatar"
                width={200}
                height={200}
                style={{ border: "4px solid #5e50a1" }}
              />
            )}

            <label htmlFor="userUpdate" className={styles["btn-edit"]}>
              <FontAwesomeIcon icon={faPen} height={13} />
              <span className="ml-2">Sunting</span>
            </label>

            <input id="userUpdate" type="file" onChange={handleAvatar} hidden />

            <h4 style={{ textAlign: "center" }} className="m-0">
              {user ? user.fullname : "Nama"}
            </h4>
            <h5
              style={{ textAlign: "center" }}
              className="m-0 mt-3 text-danger"
            >
              {user?.title ? user.title : "Pekerjaan"}
            </h5>
            <div
              style={{ textAlign: "center", marginTop: "16px" }}
              className={styles.location}
            >
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
              <div className={`col-12 ${styles["btn-group-top"]}`}>
                <Button
                  title="Simpan"
                  type="button"
                  onclick={handleUpdate}
                  classname={styles["btn-purple"]}
                />
                <Button
                  title="Batal"
                  type="button"
                  onclick={() => router.back()}
                  classname={styles["btn-white"]}
                />
              </div>
            </div>
          </div>
        </section>

        <section
          className={`col-12 col-md-9 ${styles.editor}`}
          data-aos="zoom-in-left"
          data-aos-duration="1000"
        >
          <div className={styles["edit-card"]} style={{ marginBottom: "30px" }}>
            <h4>Data Diri</h4>
            <div className={styles.hl} />
            <form>
              <Input
                label="Nama Lengkap"
                id="fullname"
                name="fullname"
                type="text"
                placeholder={
                  user?.fullname ? user.fullname : "Masukkan nama lengkap"
                }
                onchange={handleInput}
                classname={`mb-4 ${styles.input}`}
              />
              <Input
                label="Bidang"
                id="title"
                name="title"
                type="text"
                placeholder={
                  user?.title ? user.title : "Masukkan bidang pekerjaan"
                }
                onchange={handleInput}
                classname={`mb-4 ${styles.input}`}
              />
              <Input
                label="Domisili"
                id="location"
                name="location"
                type="text"
                placeholder={
                  user?.location
                    ? user.location
                    : "Masukkan domisili tempat tinggal"
                }
                onchange={handleInput}
                classname={`mb-4 ${styles.input}`}
              />
              <Input
                label="Deskripsi Diri"
                id="description"
                name="description"
                type="text"
                placeholder={
                  user?.description
                    ? user.description
                    : "Masukkan deskripsi diri"
                }
                onchange={handleInput}
                classname={`mb-4 ${styles.input}`}
              />
              <Input
                label="Instagram"
                id="insta"
                name="insta"
                type="text"
                placeholder={
                  user?.insta ? user.insta : "Masukkan akun Instagram"
                }
                onchange={handleInput}
                classname={`mb-4 ${styles.input}`}
              />
              <Input
                label="Github"
                id="github"
                name="github"
                type="text"
                placeholder={
                  user?.github ? user.github : "Masukkan akun Github"
                }
                onchange={handleInput}
                classname={`mb-4 ${styles.input}`}
              />
              <Input
                label="Linkedin"
                id="linkedin"
                name="linkedin"
                type="text"
                placeholder={
                  user?.linkedin ? user.linkedin : "Masukkan akun Linkedin"
                }
                onchange={handleInput}
                classname={styles.input}
              />
            </form>

            <div className="mt-5">
              <h4>Skill</h4>
              <div className={styles.hl} />
              <form>
                <Input
                  name="skill"
                  type="text"
                  value={newSkill.name}
                  placeholder="Javascript"
                  onchange={(e) =>
                    setNewSkill({ ...newSkill, name: e.target.value })
                  }
                  classname={styles.input}
                />
                <Button
                  title="Simpan"
                  type="button"
                  onclick={handleSkill}
                  classname={styles["btn-yellow"]}
                />
              </form>
            </div>
          </div>

          <div className={styles["edit-card"]}>
            <div className="mb-5">
              <h4>Pengalaman Kerja</h4>
              <div className={styles.hl} />
              <form onSubmit={handleSubmit}>
                <input
                  placeholder="Posisi"
                  type="text"
                  name="position"
                  value={formData.position}
                  onChange={handleInputChange}
                  style={{
                    width: "100%",
                    height: "50px",
                    borderRadius: "6px",
                    border: "2px solid #e7e7e7",
                    marginBottom: "20px",
                  }}
                  classname={`mb-4 ${styles.exps}`}
                />
                <input
                  placeholder="Nama Perusahaan"
                  type="text"
                  name="company_name"
                  value={formData.company_name}
                  onChange={handleInputChange}
                  style={{
                    width: "100%",
                    height: "50px",
                    borderRadius: "6px",
                    border: "2px solid #e7e7e7",
                    marginBottom: "20px",
                  }}
                  classname={`mb-4 ${styles.exps}`}
                />
                <div className="d-flex col-12 p-0">
                  <input
                    placeholder="Tanggal Masuk"
                    type="text"
                    name="start_date"
                    value={formData.start_date}
                    onChange={handleInputChange}
                    style={{
                      width: "100%",
                      height: "50px",
                      borderRadius: "6px",
                      border: "2px solid #e7e7e7",
                      marginBottom: "20px",
                    }}
                    classname={`mb-4 ${styles.exps}`}
                  />
                  <input
                    placeholder="Tanggal Keluar"
                    name="end_date"
                    value={formData.end_date}
                    onChange={handleInputChange}
                    style={{
                      width: "100%",
                      height: "50px",
                      borderRadius: "6px",
                      border: "2px solid #e7e7e7",
                      marginBottom: "20px",
                    }}
                    classname={`mb-4 ${styles.exps}`}
                  />
                </div>
                <textarea
                  style={{
                    width: "100%",
                    height: "200px",
                    borderRadius: "10px",
                  }}
                  placeholder="Deskripsi Pekerjaan"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  classname={`mb-4 ${styles.exps}`}
                />
                <label htmlFor="company-image" hidden>
                  <FontAwesomeIcon
                    icon={faImage}
                    style={{ height: "100px", width: "100px" }}
                  />
                </label>
                <div className=" p-0 mt-3">
                  <input
                    name="image"
                    type="file"
                    onChange={handleImageChange}
                    classname={`mb-4 ${styles.exps}`}
                  />
                </div>

                <div className={styles.hl} />

                <Button
                  title="Tambah Pengalaman"
                  type="submit"
                  classname={styles["btn-yellow-alt"]}
                />
              </form>
            </div>

            <h4>Portofolio</h4>
            <div className={styles.hl} />
            <form>
              <Input
                label="Nama Aplikasi"
                id="app-name"
                name="app-name"
                type="text"
                placeholder="Masukkan nama aplikasi"
                onchange={(e) =>
                  setNewPorto({
                    ...newPorto,
                    name: e.target.value,
                  })
                }
                classname={`mb-4 ${styles.input}`}
              />
              <Input
                label="Link Aplikasi"
                id="app-link"
                name="app-link"
                type="text"
                placeholder="Masukkan link aplikasi"
                onchange={(e) =>
                  setNewPorto({
                    ...newPorto,
                    link: e.target.value,
                  })
                }
                classname={`mb-4 ${styles.input}`}
              />
              <label htmlFor="company" className={styles["field-label"]}>
                Jenis Aplikasi
              </label>
              <select
                id="apptype"
                name="apptype"
                aria-label="apptype select"
                onChange={(e) =>
                  setNewPorto({
                    ...newPorto,
                    type: e.target.value,
                  })
                }
                className={`mb-4 ${styles.select}`}
              >
                <option selected>Select type</option>
                <option value={true}>Mobile App</option>
                <option value={false}>Web App</option>
              </select>

              <label
                className={`mb-4 ${styles["file-input"]}`}
                htmlFor="app-image"
              >
                <FontAwesomeIcon
                  icon={faImage}
                  style={{ height: "100px", width: "100px" }}
                />
              </label>
              <input
                id="app-image"
                type="file"
                onChange={handlePortoImg}
                hidden
              />
              <div className={styles.hl} />

              <Button
                title="Tambah Portofolio"
                type="button"
                onclick={handlePorto}
                classname={styles["btn-yellow-alt"]}
              />
            </form>
          </div>
        </section>

        <section className={`col-12 ${styles["btn-group-btm"]}`}>
          <Button
            title="Simpan"
            type="button"
            classname={styles["btn-purple"]}
          />
          <Button title="Batal" type="button" classname={styles["btn-white"]} />
        </section>
      </main>
      <Footer />
    </>
  );
};

export default ProfileEdit;
