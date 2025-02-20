import classNames from "classnames/bind";
import { Outlet } from "react-router-dom";

import styles from "./page-root.module.scss";

const css = classNames.bind(styles);

const PageRoot = () => {

  return (
    <div className={css("page-root__container")}>
      <Outlet />
    </div>
  );
};

export default PageRoot;
