import Image from "next/image";
import styles from "./testicard.module.css";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";

const Testicard = ({ avatar, name, job, testi }) => {
  // const router = useRouter();
  // const [user, setUser] = useState();
  // const router = useRouter();
  // const [user, setUser] = useState();

  // useEffect(() => {
  //   axios
  //     .get(`${process.env.NEXT_PUBLIC_API_URL}/v1/user/all`)
  //     .then((res) => {
  //       setUser(res.data.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // });
  return (
    <div className={styles.card}>
      <Image
        style={{ border: "4px solid #ffc013" }}
        src={avatar}
        alt="user avatar"
        width={100}
        height={100}
      />
      <h4 style={{ color: "white" }}>{name}</h4>
      <h6 style={{ color: "white" }}>{job}</h6>
      <p style={{ color: "white" }}>{testi}</p>
    </div>
  );
};

export default Testicard;
