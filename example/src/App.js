import React, { useEffect } from "react";
import logo from "./logo.svg";
import styles from "./app.module.scss";
import utilStyles from "./utils.module.scss";
import "./index.css";

import hljs from "highlight.js/lib/core";
import html from "highlight.js/lib/languages/xml";

import GenericTable from "react-generic-table";
import "react-generic-table/dist/index.css";

const packageUrl = "https://npmjs.com/package/react-generic-table";

const App = () => {
  useEffect(() => {
    hljs.registerLanguage("html", html);
    hljs.highlightAll();
  }, []);

  return (
    <div className="App">
      <header className={styles.header}>
        <div>
          <img src={logo} alt="logo" />
        </div>

        <div>
          <p className={styles.title}>React Generic Table Example</p>
        </div>

        <div className={styles.linkContainer}>
          <a
            className={`${utilStyles.link} tw-text-neutral-50`}
            href={packageUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            react-generic-table on NPM
          </a>
        </div>
      </header>

      <main className="tw-min-h-screen tw-text-neutral-900 tw-bg-neutral-50 dark:tw-bg-neutral-900 dark:tw-text-neutral-50">
        <div className="tw-mx-auto tw-max-w-4xl tw-p-4">
          <p>
            Simple feed data and indicate what columns you want to display!
            {/*  Nice explanation with emojis */}
            <span role="img" aria-label="smile">
              😄
            </span>
          </p>
          <ul>
            <li className="tw-text-neutral-900 dark:tw-text-neutral-50">⚙️ Configurable</li>
            <li className="tw-text-neutral-900 dark:tw-text-neutral-50">🔀 Out-of-the-box sorting</li>
            <li className="tw-text-neutral-900 dark:tw-text-neutral-50">🔄 Loading states</li>
            <li className="tw-text-neutral-900 dark:tw-text-neutral-50"></li>
          </ul>
          <pre>
            <code>
              {`
              <GenericTable
                objArray={[
                  { id: 1, name: "J.W.", age: "25", profession: "Developer" },
                  { id: 2, name: "Lea", age: "22", profession: "Journalist" },
                ]}
                columns={["name", "age", "profession"]}
              />
              `}
            </code>
          </pre>
          <div className="tw-mx-auto tw-max-w-4xl tw-p-4">
            <GenericTable
              objArray={[
                { id: 1, name: "J.W.", age: "25", profession: "Developer" },
                { id: 2, name: "Lea", age: "22", profession: "Journalist" },
              ]}
              columns={["name", "age", "profession"]}
              newLink="#"
            />
          </div>
        </div>
      </main>
      <footer className={styles.footer}>
        <span>
          Created by{" "}
          <a href="https://jwvbremen.nl/" target="_blank" rel="noreferrer">
            Jan-Willem van Bremen
          </a>
        </span>
      </footer>
    </div>
  );
};

export default App;
