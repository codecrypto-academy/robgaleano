import classNames from "classnames/bind";

import viteLogo from "/vite.svg";
import Pokemon from "@/page/pokemon/pokemon";

import styles from "./page-content.module.scss";

const css = classNames.bind(styles);

const PageContent = () => {
  return (
    <div className={css("main-container")}>
      <div className={css("logo-container")}>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className={css("logo")} alt="Vite logo" />
        </a>
      </div>
      <Pokemon />
    </div>
  );
};

export default PageContent;
