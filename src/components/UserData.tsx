import { Link } from "react-router-dom";
import { UserProps } from "../types/user";
import { MdLocationPin } from "react-icons/md";

import styles from "./UserData.module.css"

function UserData({
  avatar_url,
  login,
  location,
  bio,
  followers,
  following,
}: UserProps) {
  return (
    <div className={styles.user_data}>
      <img src={avatar_url} alt={login} />
      <h2>{login}</h2>

      <p className={styles.location}>
        <MdLocationPin />
        <span>{location}</span>
      </p>

      <div className={styles.bio}>
        <p>{bio}</p>
      </div>

      <div className={styles.stats}>
        <div>
          <p>Seguidores:</p>
          <p className={styles.number}>{followers}</p>
        </div>

        <div>
          <p>Segunido:</p>
          <p className={styles.number}>{following}</p>
        </div>
      </div>

      <Link to={`/repos/${login}`}>Ver melhores projetos</Link>
    </div>
  );
}

export default UserData;
