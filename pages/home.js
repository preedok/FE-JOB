import Navi from "../components/module/navi";
import Footer from "../components/module/footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import styles from "../styles/home.module.css";
import Button from "../components/base/button";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import { LineWave } from "react-loader-spinner";

import AOS from "aos";
import "aos/dist/aos.css";
const Home = () => {
  const router = useRouter();
  const [user, setUser] = useState();
  const [search, setSearch] = useState();
  const [pagination, setPagination] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("user_id");
  const [sortOrder, setsortOrder] = useState("asc");

  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  const filterUser = (key, page) => {
    axios
      .get(
        `https://teal-inquisitive-xerus.cyclic.app/v1/company/user/list?search=${
          search ? search : ""
        }&sortBy=${sortBy}&sortOrder=${sortOrder}&page=${page ? page : 1}`
      )
      .then((res) => {
        setUser(res.data.data);
        setPagination(res.data.pagination);
      });
  };

  const handleSearch = async (e) => {
    if (e.key === "Enter") {
      setCurrentPage(1);
      filterUser(search, currentPage);
    }
  };

  const handlePage = (page) => {
    setCurrentPage(page);
    filterUser(search, page);
  };

  const handleSort = () => {
    if (sortBy == "user_id") {
      setSortBy("fullname");
    } else {
      setSortBy("user_id");
    }
    filterUser(sortOrder, sortOrder, 3, currentPage);
  };

  const handleAsc = () => {
    if (sortOrder == "asc") {
      setsortOrder("desc");
    } else {
      setsortOrder("asc");
    }
    filterUser(sortOrder, sortOrder, 3, currentPage);
  };

  useEffect(() => {
    filterUser();
  }, [search]);

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
      <div className={styles.ma}>Top Jobs</div>
      <main className={styles.main}>
        <section
          className={styles.content}
          data-aos="zoom-in-left"
          data-aos-duration="1000"
        >
          <div
            style={{ border: "3px solid #5e50a1" }}
            className={styles.searchbar}
          >
            <input
              name="search"
              type="text"
              style={{ borderBottom: "3px solid #5e50a1" }}
              placeholder="Cari berdasarkan keahlian"
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleSearch}
              className={`mb-4 ${styles["search-input"]}`}
            />
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              height={25}
              className={styles["search-icon"]}
            />
            <div className={styles.vl} />
            {/* <select
              style={{ border: "none" }}
              className="form-select"
              aria-label="Default select example"
              onClick={handleSort}
            >
              <option selected disabled>
                Sorting
              </option>
              <option value="1">Sort {sortBy}</option>
              <option value="1">Sort {sortOrder}</option>
            </select> */}
            <div className="dropdown border-start">
              <button
                className="btn  dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  fill="currentColor"
                  class="bi bi-funnel"
                  viewBox="0 0 16 16"
                  style={{ color: "#9ea0a5" }}
                >
                  <path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5v-2zm1 .5v1.308l4.372 4.858A.5.5 0 0 1 7 8.5v5.306l2-.666V8.5a.5.5 0 0 1 .128-.334L13.5 3.308V2h-11z" />
                </svg>
              </button>
              <ul className="dropdown-menu">
                <li>
                  <a className="dropdown-item" onClick={handleSort}>
                    Sort by {sortBy}
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" onClick={handleAsc}>
                    Sort by {sortOrder}
                  </a>
                </li>
              </ul>
            </div>
            <Button
              title="Cari"
              type="button"
              classname={styles["search-btn"]}
            />
          </div>

          {user
            ? user.map((item) => (
                <div className={styles.card}>
                  <div className={styles["card-info"]}>
                    <Image
                      src={item.avatar ? item.avatar : "/assets/banner.png"}
                      alt="user avatar"
                      width={150}
                      height={150}
                      style={{
                        objectFit: "cover",
                        border: "4px solid #5e50a1",
                      }}
                    />
                    <div className={styles["account-info"]}>
                      <h3 style={{ fontWeight: "600" }}>{item.fullname}</h3>
                      <h6 style={{ color: "red" }}>{item.title}</h6>
                      <div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="25"
                          height="25"
                          fill="currentColor"
                          style={{ color: "#5e50a1", fontWeight: "900" }}
                          className="bi bi-pin-map "
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
                        <h6 className="ml-2 text-dark">{item.location}</h6>
                      </div>
                      <div className={styles.skillset}>
                        {/* <span>Javascript</span> */}
                        <span>Golang</span>
                        <span>PHP</span>
                        {/* <span>{item.skill_name}</span> */}
                      </div>
                    </div>
                  </div>
                  <Button
                    title="Lihat Profile"
                    type="button"
                    classname={styles.button}
                    onclick={() => router.push(`/profile/${item.user_id}`)}
                  />
                </div>
              ))
            : "--data none--"}

          <div className="container justify-content-center d-flex mt-2 mb-3">
            {/* <nav aria-label="Page navigation example">
              <ul
                className="pagination"
                style={{ border: "2px solid #5e50a1" }}
              >
                <li className="page-item">
                  <a className="page-link" href="#" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                  </a>
                </li>
                <li className="page-item ">
                  <a
                    style={{ backgroundColor: "#5e50a1" }}
                    className="page-link text-white"
                    href="#"
                  >
                    1
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                  </a>
                </li>
              </ul>
            </nav> */}
            <div className={`${styles["page-container"]}`}>
              {pagination &&
                new Array(pagination.totalPage).fill().map((item, index) => (
                  <button
                    className={styles["page-btn"]}
                    onClick={() => handlePage(index + 1)}
                    key={index}
                  >
                    {index + 1}
                  </button>
                ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Home;
