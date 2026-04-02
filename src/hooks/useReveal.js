import { useEffect, useRef } from 'react'

export function useReveal() {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
        }
      },
      { threshold: 0.1 }
    )

    // observe all .reveal elements inside the ref
    const reveals = el.querySelectorAll('.reveal')
    reveals.forEach(r => observer.observe(r))

    // also observe the element itself if it has .reveal
    if (el.classList.contains('reveal')) observer.observe(el)

    return () => observer.disconnect()
  }, [])

  return ref
}
