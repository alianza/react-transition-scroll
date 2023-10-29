import React from "react";
import logo from "./logo.svg";
import styles from "./app.module.scss";
import utilStyles from "./utils.module.scss";
import "./index.css";

import GenericTable from "react-generic-table";
import "react-generic-table/dist/index.css";
import { LiveProvider, LiveEditor, LiveError, LivePreview } from "react-live";
const scope = { GenericTable };

const packageUrl = "https://npmjs.com/package/react-generic-table";

const App = () => {
  return (
    <div className={`${utilStyles.App} App bg-neutral-50 text-neutral-900 dark:bg-neutral-900 dark:text-neutral-50`}>
      <header className={styles.header}>
        <div>
          <img src={logo} alt="logo" />
        </div>

        <div>
          <p className={styles.title}>React Generic Table Example</p>
        </div>

        <div className={styles.linkContainer}>
          <a
            className={`${utilStyles.link} text-neutral-50`}
            href={packageUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            react-generic-table on NPM
          </a>
        </div>
      </header>

      <main className="mx-auto my-16 grid min-h-screen max-w-4xl grid-cols-2 gap-16 p-4">
        <section>
          <h2 className="mb-2 text-3xl">Usage</h2>
          <p className="text-lg">
            Simply feed data and indicate what columns you want to display and in what order! 😄
          </p>
          <ul className="p-2">
            <li className="text-neutral-900 dark:text-neutral-50">⚙️ Configurable</li>
            <li className="text-neutral-900 dark:text-neutral-50">🔀 Out-of-the-box sorting</li>
            <li className="text-neutral-900 dark:text-neutral-50">🔄 Loading states</li>
            <li className="text-neutral-900 dark:text-neutral-50"></li>
          </ul>
          <LiveProvider
            scope={scope}
            code={` 
            <GenericTable
                objArray={[
                  { id: 1, name: "J.W.", age: "25", profession: "Developer" },
                  { id: 2, name: "Lea", age: "22", profession: "Journalist" },
                  { id: 3, name: "Max", age: "34", profession: "Taxi Driver" }
                ]}
                columns={["name", "age", "profession"]}
                newLink="#"
            />
            `}
          >
            <LiveEditor className={utilStyles.codeEditor} />
            <LiveError />
            <LivePreview className={utilStyles.codePreview} />
          </LiveProvider>
        </section>

        <section>
          <LiveProvider
            scope={scope}
            code={`
            <GenericTable
                objArray={[
                  { id: 1, name: "J.W.", age: "25", profession: "Developer" },
                  { id: 2, name: "Lea", age: "22", profession: "Journalist" },
                  { id: 3, name: "Max", age: "34", profession: "Taxi Driver" }
                ]}
                columns={["name", "age", "profession"]}
                newLink="#"
                actions={[
                  { edit: (obj) => <a href="#" onClick={() => alert(JSON.stringify(obj)) }>Edit</a> },
                  { view: (obj) => <a href={'#/' + obj.id}>View</a> },
                  { remove: (obj) => <a href="#">Delete</a> }
                ]}
                entityName="person"
                actionsColumnName="Tasks"
                showCount={true}
            />
            `}
          >
            <LiveEditor className={utilStyles.codeEditor} />
            <LiveError />
            <LivePreview className={utilStyles.codePreview} />
          </LiveProvider>
        </section>
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
