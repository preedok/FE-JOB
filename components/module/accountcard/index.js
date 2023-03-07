import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationPin } from "@fortawesome/free-solid-svg-icons";
import styles from "./accountcard.module.css";
import Button from "../../base/button";

const AccountCard = ({ avatar, name, job, location, action }) => {
  return (
    <div className={styles.card}>
      <div className={styles["card-info"]}>
        <Image
          src={avatar ? avatar : "/assets/banner.png"}
          alt="user avatar"
          width={100}
          height={100}
          style={{ objectFit: "cover" }}
        />
        <div className={styles["account-info"]}>
          <h4>{name}</h4>
          <p>{job}</p>
          <div>
            <FontAwesomeIcon icon={faLocationPin} height={13} />
            <span className="ml-2">{location}</span>
          </div>
          <div className={styles.skillset}>
            <span>Javascript</span>
            <span>Golang</span>
            <span>PHP</span>
          </div>
        </div>
      </div>
      <Button
        title="Lihat Profile"
        type="button"
        classname={styles.button}
        onclick={action}
      />
    </div>
  );
};

export default AccountCard;
