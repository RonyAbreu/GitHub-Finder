import Search from "../components/Search";
import { useState } from "react";
import { UserProps } from "../types/user";
import apiFetch from "../axios/config";
import UserData from "../components/UserData";
import Loader from "../components/Loader";

import styles from "./Home.module.css"

type Error = {
  isError: boolean;
  message: string;
};

function Home() {
  const [user, setUser] = useState<UserProps | null>(null);
  const [error, setError] = useState<Error>({
    isError: false,
    message: "",
  });

  const [loading, setLoading] = useState(false);

  async function searchUser(username: string) {
    setError({isError: false, message:""});
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
      handleError(error.response?.status);
    }
  }

  const errorMessages: Record<number, string> = {
    404: "Usuário não encontrado!",
    500: "Erro interno do servidor, tente novamente mais tarde",
  };

  function handleError(status: number) {
    const message: string = errorMessages[status] || "Erro desconhecido";
    setError({ isError: true, message });
  }

  return (
    <div className={styles.home}>
      <h1>Github Finder</h1>
      
      <Search searchUser={searchUser} />

      {loading && <Loader />}

      {user && <UserData {...user} />}

      {error.isError && <p>{error.message}</p>}
    </div>
  );
}

export default Home;
