import { DependencyList, useCallback, useRef } from 'react'

export default function useIntersectionObserver<T extends HTMLElement>(
    callback: () => void,
    deps: DependencyList,
) {
    const observer = useRef<IntersectionObserver | null>(null)
    // value of useRef is preserved across rerenders

    const ref = useCallback(
        (node: T) => {
            if (deps.every(Boolean)) {
                observer.current?.disconnect()
                observer.current = new IntersectionObserver((entries) => {
                    if (entries[0].isIntersecting) callback()
                })
                if (node) observer.current?.observe(node)
            }
        },
        [deps, callback]
    )
    return ref
}

/**
 * 
 * 
 * export default function useIntersectionObserver(
  target: React.RefObject<HTMLElement>,
  rootMargin = '0px',
  threshold = 0.1
) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      {
        rootMargin,
        threshold
      }
    )

    const current = target.current
    if (current) {
      observer.observe(current)
    }

    return () => {
      if (current) {
        observer.unobserve(current)
      }
    }
  }, [target, rootMargin, threshold])

  return isVisible
}
 * 
 */