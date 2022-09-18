import React, { useEffect, useState } from 'react'
import styles from './styles.module.css'
import * as PropTypes from 'prop-types'

export const TransitionScroll = ({
  threshold = 0,
  reAnimate = false,
  children,
  callBack = () => {},
  baseStyle = {},
  hiddenStyle = {
    opacity: 1,
    translate: '0 12px',
    filter: 'blur(4px)'
  },
  showStyle = {
    opacity: 1,
    translate: '0 0',
    filter: 'none'
  },
  className = ''
}) => {
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
  }, [articleRef])

  return (
    <div ref={articleRef} style={style} className={styles.baseStyle}>
      {children}
    </div>
  )
}

TransitionScroll.propTypes = {
  threshold: PropTypes.number,
  reAnimate: PropTypes.bool,
  children: PropTypes.node.isRequired,
  callBack: PropTypes.func,
  baseStyle: PropTypes.object,
  hiddenStyle: PropTypes.object,
  showStyle: PropTypes.object,
  className: PropTypes.string
}

export default TransitionScroll
