import { KeyboardEvent, useState } from "react";
import { BsSearch } from "react-icons/bs";

import styles from "./Search.module.css"

interface SearchProps {
  searchUser: (username : string) => void;
}

function Search({ searchUser }: SearchProps) {
  const [username, setUsername] = useState("");

  function handleKeyDown(event : KeyboardEvent){
    if(event.key === "Enter"){
      searchUser(username);
    }
  }

  return (
    <div className={styles.search_user}>
      <h2>Busque por um usuário:</h2>
      <p>Conheça seus melhores repositórios</p>

      <label className={styles.user_input}>
        <input
          type="text"
          placeholder="Digite o nome de um usuário"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          onKeyDown={handleKeyDown}
        />
        <button onClick={() => searchUser(username)}>
          <BsSearch />
        </button>
      </label>
    </div>
  );
}

export default Search;
