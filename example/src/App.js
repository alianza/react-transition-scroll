import React from "react";
import logo from "./logo.svg";

import { TransitionScroll } from "react-transition-scroll";
import 'react-transition-scroll/dist/index.css';

const App = () => {
  return (
    <div className="App">
      <header className="bg-blue-500 text-white font-bold flex p-2 justify-between items-center">
        <div className="grow basis-0">
          <img src={logo} className="w-12" alt="logo" />
        </div>
        <div className="grow basis-0">
          <p className="text-center text-xl">React Scroll Animation Example</p>
        </div>
        <div className="grow basis-0 flex justify-end">
          <a className="text-end hover:underline" href="https://npmjs.com/package/react-transition-scroll"
             target="_blank"
             rel="noopener noreferrer">
            react-transition-scroll
          </a>
        </div>
      </header>
      <main className="min-h-screen bg-blue-200">
        <TransitionScroll reAnimate>
          <h1>Title</h1>
        </TransitionScroll>
      </main>
    </div>);
};

export default App;
