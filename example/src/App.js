import React from "react";
import logo from "./logo.svg";
import cat from "./cat.jpg";
import styles from "./app.module.scss";

import GenericTable from "react-generic-table";
import "react-generic-table/dist/index.css";
import "react-generic-table/dist/main.css";

const packageUrl = 'https://npmjs.com/package/react-generic-table';

const App = () => {
  return (
    <div className="App">
      <header className={styles.header}>
        <div>
          <img src={logo} alt="logo" />
        </div>

        <div>
          <p className={styles.title}>React Scroll Animation Example</p>
        </div>

        <div className={styles.linkContainer}>
          <a className={styles.link} href={packageUrl}
             target="_blank"
             rel="noopener noreferrer">
            react-generic-table on NPM
          </a>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.container}>
          <GenericTable
            objArray={[{id: 1, name: 'J.W.', age: '25', profession: 'Developer'}, {id: 2, name: 'Lea', age: '22', profession: 'Journalist'}]}
            columns={['name', 'age', 'profession']}
          />
        </div>
      </main>
      <footer className={styles.footer}>
        <span>Created by <a href="https://jwvbremen.nl/" target="_blank" rel="noreferrer">Jan-Willem van Bremen</a></span>
      </footer>
    </div>);
};

export default App;
