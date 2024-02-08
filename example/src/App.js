import React from "react";
import logo from "./logo.svg";
import cat from "./cat.jpg";
import styles from "./app.module.scss";
import { CodeBlock } from "./components/codeBlock";

import TransitionScroll from "react-transition-scroll";
import "react-transition-scroll/dist/index.css";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const packageUrl = "https://npmjs.com/package/react-transition-scroll";

const Msg = ({ title, text }) => {
  return (
    <>
      <h4 style={{ margin: "0px" }}>{title}</h4>
      <p style={{ margin: "0px" }}>{text}</p>
    </>
  );
};

const toaster = (myProps, toastProps) => toast(<Msg {...myProps} />, { ...toastProps });
toaster.success = (myProps, toastProps) => toast.success(<Msg {...myProps} />, { ...toastProps });

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
          <a className={styles.link} href={packageUrl} target="_blank" rel="noopener noreferrer">
            react-transition-scroll on NPM
          </a>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.container}>
          <TransitionScroll reAnimate>
            <h1>Introduction</h1>
          </TransitionScroll>

          <TransitionScroll reAnimate>
            <p>
              <span className={styles.label}>react-transition-scroll</span>is a lightweight library to easily and
              beautifully implement scroll animations/transition in react. It is built on top of the modern
              IntersectionObserver API. Simply install it by running <code>npm install react-transition-scroll</code> or{" "}
              <code>yarn add react-transition-scroll</code> and import it in your project.
            </p>
          </TransitionScroll>

          <TransitionScroll reAnimate>
            <p>
              Check out the readme on NPM.js for more detailed{" "}
              <a href={packageUrl} target="_blank" rel="noreferrer">
                install instructions
              </a>
              !
            </p>
          </TransitionScroll>

          <TransitionScroll reAnimate hiddenStyle={{ opacity: 0 }} showStyle={{ opacity: 1 }}>
            <img src={cat} alt="cat" />
            <CodeBlock>
              {`<TransitionScroll reAnimate hiddenStyle={{opacity: 0}} showStyle={{opacity: 1}}>
              <img src={cat} alt="cat" />
            </TransitionScroll>`}
            </CodeBlock>
          </TransitionScroll>

          <TransitionScroll baseStyle={{ marginBlock: "4em" }} reAnimate>
            <CodeBlock>
              {`<TransitionScroll reAnimate>`}
              <h1>Reanimate every time</h1>
              {`</TransitionScroll>`}
            </CodeBlock>
          </TransitionScroll>

          <TransitionScroll baseStyle={{ marginBlock: "4em" }} reAnimate threshold={100}>
            <CodeBlock className={styles.codeRight}>
              {`<TransitionScroll threshold={100}>`}
              <h1>100% of the element has to be in view to trigger the animation</h1>
              {`</TransitionScroll>`}
            </CodeBlock>
          </TransitionScroll>

          <TransitionScroll
            baseStyle={{
              marginBlock: "8em",
              backgroundColor: "red",
              padding: "1em",
              color: "white",
              transitionDuration: "5000ms",
            }}
            reAnimate
          >
            <CodeBlock className={styles.codeRight}>
              {`<TransitionScroll baseStyle={{
                    marginBlock: '8em', 
                    backgroundColor: 'red', 
                    padding: '1em', 
                    color: 'white', 
                    transitionDuration: '5000ms'
                }}>`}
              <h1>Alter baseStyles to modify things like transition duration and margins</h1>
              {`</TransitionScroll>`}
            </CodeBlock>
          </TransitionScroll>

          <TransitionScroll
            reAnimate
            baseStyle={{ marginBlock: "4em" }}
            hiddenStyle={{ opacity: 0.2, translate: "84px 0" }}
          >
            <CodeBlock className={styles.codeRight}>
              {`<TransitionScroll hiddenStyle={{ opacity: .2, translate: '84px 0' }}>`}
              <h1>Different hidden style</h1>
              {`</TransitionScroll>`}
            </CodeBlock>
          </TransitionScroll>

          <TransitionScroll
            baseStyle={{ marginBlock: "4em" }}
            reAnimate
            showStyle={{ backgroundColor: "blue", color: "white", padding: "1em" }}
          >
            <CodeBlock className={styles.codeRight}>
              {`<TransitionScroll showStyle={{ backgroundColor: 'blue', color: 'white', padding: '1em' }}>`}
              <h1>Different show style</h1>
              {`</TransitionScroll>`}
            </CodeBlock>
          </TransitionScroll>

          <TransitionScroll
            baseStyle={{ transitionDuration: "5000ms", marginBlock: "4em" }}
            callBackBefore={(entry) =>
              toaster.success({
                title: "CallBackBefore",
                text: `exposes intersection object entry entry.isIntersecting = ${entry.isIntersecting}`,
              })
            }
          >
            <CodeBlock className={styles.codeRight}>
              {`<TransitionScroll baseStyle={{ transitionDuration: "5000ms" }} callBackBefore={(entry) => toast('CallBack exposes intersection object entry entry.isIntersecting = $\{entry.isIntersecting}')}>`}
              <h1>CallBack at animation start!</h1>
              <p>Useful for tracking user interaction</p>
              {`</TransitionScroll>`}
            </CodeBlock>
          </TransitionScroll>

          <TransitionScroll
            baseStyle={{ transitionDuration: "5000ms", marginBlock: "4em" }}
            callBackAfter={(entry) =>
              toaster.success({
                title: "CallBackAfter",
                text: `exposes intersection object entry entry.isIntersecting = ${entry.isIntersecting}`,
              })
            }
          >
            <CodeBlock className={styles.codeRight}>
              {`<TransitionScroll baseStyle={{ transitionDuration: "5000ms" }} callBackAfter={(entry) => toast('CallBack exposes intersection object entry entry.isIntersecting = $\{entry.isIntersecting}')}>`}
              <h1>CallBack at animation end!</h1>
              <p>Useful for hooking into animation end</p>
              {`</TransitionScroll>`}
            </CodeBlock>
          </TransitionScroll>

          <TransitionScroll reAnimate>
            <h1>Api</h1>
          </TransitionScroll>

          <TransitionScroll reAnimate>
            <p>The component exposes a number of props to modify behavior and styling.</p>
          </TransitionScroll>

          <TransitionScroll baseStyle={{ marginBlock: "4em" }} reAnimate>
            <h2>Props</h2>
            <ul className={styles.propsList}>
              <li>
                <b>threshold:</b> (Number) Percentage of element that has to be in view to trigger transition
              </li>
              <li>
                <b>reAnimate:</b> (Boolean) Whether to reanimate if element enters viewport again
              </li>
              <li>
                <b>baseStyle:</b> (Style Object) Base styles to apply to transition element
              </li>
              <li>
                <b>hiddenStyle:</b> (Style Object) Styles to apply to transition element when hidden
                <br />
                Default styles:
                <CodeBlock>
                  {`{
  opacity: 1,
  translate: '0 12px',
  filter: 'blur(4px)'
}`}
                </CodeBlock>
              </li>
              <li>
                <b>showStyle:</b> (Style Object) Styles to apply to transition element when shown
                <br />
                Default styles:
                <CodeBlock>
                  {`{
  opacity: 1,
  translate: '0 0',
  filter: 'none'
}`}
                </CodeBlock>
              </li>
              <li>
                <b>className:</b> (String) Classname to apply to the transition element
              </li>
              <li>
                <b>callBackBefore:</b> (Function) Callback to call when element enters viewport (exposes intersection
                object)
              </li>
              <li>
                <b>callBackAfter:</b> (Function) Callback to call when element leaves viewport (exposes intersection
                object)
              </li>
              <li>
                <b>as:</b> (String) The wrapper element to render the transition element as
              </li>
            </ul>
          </TransitionScroll>
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
      <ToastContainer position="bottom-center" />
    </div>
  );
};

export default App;
