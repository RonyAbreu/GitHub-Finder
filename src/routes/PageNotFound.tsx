import { Link } from "react-router-dom"
import pageNotFoundImg from "../assets/page-not-found.svg"
import styles from "./PageNotFound.module.css"

function PageNotFound() {
  return (
    <div className={styles.not_found}>
      <h1>Página não encontrada!</h1>
      <img src={pageNotFoundImg} alt="page-not-found" width="400" height="400"/>
      <Link to="/">Voltar à página inicial</Link>
    </div>
  )
}

export default PageNotFound