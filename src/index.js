import React, { useEffect, useState } from 'react'
import styles from './styles.module.css'
import PropTypes from "prop-types";


let TransitionScrollTypes = TransitionScroll.propTypes = {
  threshold: PropTypes.number,
  reAnimate: PropTypes.bool,
  children: PropTypes.node.isRequired,
  callBack: PropTypes.func,
  baseStyle: PropTypes.object,
  hiddenStyle: PropTypes.object,
  showStyle: PropTypes.object,
  className: PropTypes.string
}

TransitionScroll.defaultProps = {
  threshold: 0,
  reAnimate: false,
  callBack: () => {},
  baseStyle: {},
  hiddenStyle: {
    opacity: .5,
    translate: '0 12px',
    filter: 'blur(4px)'
  },
  showStyle: {
    opacity: 1,
    translate: '0 0',
    filter: 'none'
  },
  className: ''
}

/**
 *
 * Use this component to wrap your content with, and it will apply the hiddenStyle
 * when the element is not intersecting with the page. When the element comes into
 * view, the showStyle will be applied and the element will animate between the two.
 * You can configure all styles using the appropriate props. And some default styles
 * are provided for you to use. You can also alter the percentage of the element
 * that needs to be in view before the animation is triggered, and whether the element
 * will animate again once it is scrolled out of view and back in. A callback can be set
 * to be called when the element is in view. This could be used to lazy load images too!
 *
 * @type {React.FC<InferProps<TransitionScrollTypes>>}
 * @returns {JSX.Element} - The element to animate, and it's children
 *
 * Author: Jan-Willem van Bremen
 * Website: https://jwvbremen.nl/
 * Language: javascript
 *
 */


export function TransitionScroll({
  threshold = 0,
  reAnimate = false,
  children,
  callBack = () => {},
  baseStyle = {},
  hiddenStyle = {
    opacity: .5,
    translate: '0 12px',
    filter: 'blur(4px)'
  },
  showStyle = {
    opacity: 1,
    translate: '0 0',
    filter: 'none'
  },
  className = ''
}) {
  const articleRef = React.createRef()
  const [style, setStyle] = useState(Object.assign({}, baseStyle, hiddenStyle))
  const [didCallBack, setDidCallBack] = useState(false)

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: threshold / 100
    }

    let observer;

    if ('IntersectionObserver' in window) {
      observer = new IntersectionObserver(
        (entries, observer) =>
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setStyle(Object.assign({}, baseStyle, showStyle))
              if (!reAnimate) {
                observer.unobserve(entry.target)
              }
              if (!didCallBack) {
                callBack(entry)
                setDidCallBack(true)
              }
            } else {
              setStyle(Object.assign({}, baseStyle, hiddenStyle))
              setDidCallBack(false)
            }
          }),
        options
      )

      observer.observe(articleRef.current)
    }  else {
      setStyle(Object.assign({}, baseStyle, showStyle))
    }

    return () => observer?.disconnect()
  }, [])

  return (
    <div ref={articleRef} style={style} className={`${styles.baseStyle} ${className}`}>
      {children}
    </div>
  )
}

export default TransitionScroll
