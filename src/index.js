import React, { useEffect } from 'react'
import styles from './styles.module.css'
import * as PropTypes from 'prop-types'

export const TransitionScroll = ({
  threshold = 0,
  reAnimate = false,
  children,
  callBack = () => {},
  className = ''
}) => {
  const articleRef = React.createRef()

  useEffect(() => {
    const options = { root: null, rootMargin: '0px', threshold }

    const observer = new IntersectionObserver(
      (entries, observer) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.show)
            if (!reAnimate) {
              observer.unobserve(entry.target)
            }
          } else {
            entry.target.classList.remove(styles.show)
          }
          callBack(entry)
        }),
      options
    )

    observer.observe(articleRef.current)
    return () => observer.disconnect()
  }, [articleRef])

  return (
    <div ref={articleRef} className={`${styles.hidden} ${className}`}>
      {children}
    </div>
  )
}

TransitionScroll.propTypes = {
  threshold: PropTypes.number,
  reAnimate: PropTypes.bool,
  children: PropTypes.node.isRequired
}

export default TransitionScroll
