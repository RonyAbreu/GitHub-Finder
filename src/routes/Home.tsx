import Search from "../components/Search";
import { useState } from "react";
import { UserProps } from "../types/user";
import apiFetch from "../axios/config";
import UserData from "../components/UserData";
import Loader from "../components/Loader";

import styles from "./Home.module.css";

function Home() {
  const [user, setUser] = useState<UserProps | null>(null);
  const [error, setError] = useState(false);

  const [loading, setLoading] = useState(false);

  async function searchUser(username: string) {
    try {
      setLoading(true);
      const response = await apiFetch.get(`/${username}`);
      const userJson = response.data;
      setLoading(false);

      const { avatar_url, login, location, bio, followers, following } =
        userJson;

      const userData: UserProps = {
        avatar_url,
        login,
        location,
        bio,
        followers,
        following,
      };

      setUser(userData);
    } catch (error) {
      setUser(null);
      setLoading(false);
      setError(true);
    }
  }

  return (
    <div className={styles.home}>
      <h1>Github Finder</h1>

      <Search searchUser={searchUser} />

      {loading && <Loader />}

      {user && <UserData {...user} />}

      {error && <p>Nenhum usuário encontrado</p>}
    </div>
  );
}

export default Home;
