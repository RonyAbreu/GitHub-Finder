import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { RepositoryProps } from "../types/repository";
import apiFetch from "../axios/config";
import Loader from "../components/Loader";
import Repo from "../components/Repo";

import styles from "./Repository.module.css";

function Repository() {
  const { username } = useParams();

  const [repos, setRepo] = useState<RepositoryProps[] | [] | null>(null);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getRepos() {
      try {
        setLoading(true);
        const response = await apiFetch.get(`/${username}/repos`);
        const reposJson = response.data;
        setLoading(false);

        let orderedRepos: Array<RepositoryProps> = reposJson.sort(
          (a: RepositoryProps, b: RepositoryProps) =>
            b.stargazers_count - a.stargazers_count
        );

        orderedRepos = orderedRepos.slice(0,7);

        setRepo(orderedRepos);
      } catch (error) {
        setRepo(null);
        setLoading(false);
      }
    }

    getRepos();
  }, []);

  if (!repos && loading) return <Loader />;

  return (
    <div className={styles.repo}>
      <h1>Github Finder</h1>
      <Link to="/" className={styles.back_btn}>
        Voltar
      </Link>

      <h2>Exibindo os repositórios de: {username}</h2>

      {repos && repos.length > 0 && (
        <div className={styles.repos_container}>
          {repos.map((repo: RepositoryProps) => (
            <Repo key={repo.name} {...repo} />
          ))}
        </div>
      )}

      {repos && repos.length === 0 && <p>Não há repositórios</p>}
    </div>
  );
}

export default Repository;
