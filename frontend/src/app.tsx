import { Button } from "@/components/ui/button";

import classNames from "classnames";
import styles from "./app.module.scss";
import { useEffect, useState } from "react";

const css = classNames.bind(styles);

const App = () => {

  const [testData, setTestData] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/test")
      .then((res) => res.json())
      .then((data) => setTestData(data.test));
  }, []);

  return (
    <>
      <div>
        {testData}
        <Button className={css("main-button")} variant="secondary">
          Button
        </Button>
      </div>
    </>
  );
};

export default App;
