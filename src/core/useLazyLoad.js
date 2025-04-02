import { useState, useEffect, useRef } from "react";

const useLazyLoad = (itemCount, renderComponent) => {
  const [visibleIndices, setVisibleIndices] = useState([]);
  const componentRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.dataset.index, 10);
            if (!visibleIndices.includes(index)) {
              setTimeout(() => {
                setVisibleIndices((prev) => [...prev, index]);
              }, 2000)
            }
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: "0px",
        threshold: 0.1,
      }
    );

    componentRefs.current.forEach((ref) => {
      if (ref) {
        observer.observe(ref);
      }
    });

    return () => observer.disconnect();
  }, [visibleIndices]);

  const lazyLoadItems = Array.from({ length: itemCount }).map((_, index) => ({
    index,
    ref: (el) => (componentRefs.current[index] = el),
    isVisible: visibleIndices.includes(index),
  }));

  const renderedItems = lazyLoadItems.map((item) => {
    return {
      ...item,
      renderedComponent: renderComponent({
        index: item.index,
        isVisible: item.isVisible,
      }),
    };
  });

  return renderedItems;
};

export default useLazyLoad;