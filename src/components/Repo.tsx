import { BsCodeSlash } from "react-icons/bs";
import { RepositoryProps } from "../types/repository";
import { AiOutlineFork, AiOutlineStar } from "react-icons/ai";
import {
  RiGitRepositoryCommitsLine,
  RiGitRepositoryLine,
} from "react-icons/ri";
import { useState } from "react";

import styles from "./Repo.module.css";

function Repo({
  name,
  html_url,
  language,
  clone_url,
  stargazers_count,
  forks_count,
}: RepositoryProps) {
  const [copiedMessage, setCopiedMessage] = useState(false);

  const handleCloneClick = () => {
    navigator.clipboard
      .writeText(clone_url)
      .then(() => {
        setCopiedMessage(true);
        setTimeout(() => {
          setCopiedMessage(false);
        }, 2000);
      })
      .catch((error) => {
        console.error("Erro ao copiar o URL:", error);
      });
  };

  return (
    <div className={styles.repo}>
      <h3>{name}</h3>

      <p className={styles.language}>
        <BsCodeSlash />
        {language}
      </p>

      <div className={styles.stats}>
        <div>
          <AiOutlineStar />
          <span>{stargazers_count}</span>
        </div>

        <div>
          <AiOutlineFork />
          <span>{forks_count}</span>
        </div>
      </div>

      <div className={styles.container_btn}>
        <a href={html_url} target="_blank" className={styles.repo_btn}>
          <span>Ver código</span>
          <RiGitRepositoryLine />
        </a>
        <button className={styles.repo_btn} onClick={handleCloneClick}>
          <span>Clonar Projeto</span>
          <RiGitRepositoryCommitsLine />
        </button>
      </div>

      {copiedMessage && (
        <div className={styles.copied_message}>URL Copiado!</div>
      )}
    </div>
  );
}

export default Repo;
