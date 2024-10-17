import { useEffect, useRef } from 'react';
import styles from './CursorEffect.module.css';

const CursorEffect = () => {
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const delay = 5; 
  const swiftness = 0.1; 

  let mouseX = 0;
  let mouseY = 0;
  let posX = 0;
  let posY = 0;

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
    };

    const moveCursor = () => {
      const distX = mouseX - posX;
      const distY = mouseY - posY;

      posX += distX * swiftness;
      posY += distY * swiftness;

      if (cursorRef.current) {
        cursorRef.current.style.left = `${posX}px`;
        cursorRef.current.style.top = `${posY}px`;
        cursorRef.current.style.transform = "translate(-50%, -50%)";
      }

      requestAnimationFrame(moveCursor); 
    };

    const itemHoverEnter = (event: Event) => {
      if (cursorRef.current) {
        cursorRef.current.style.width = "200px";  
        cursorRef.current.style.height = "200px"; 
        cursorRef.current.style.opacity = "0.5";  
        cursorRef.current.style.zIndex = "1";     
        cursorRef.current.style.filter = "invert(1)"; 
      }
    };

    const itemHoverLeave = (event: Event) => {
      if (cursorRef.current) {
        cursorRef.current.style.width = "100px"; 
        cursorRef.current.style.height = "100px";
        cursorRef.current.style.opacity = "1";     
        cursorRef.current.style.filter = "invert(0)"; 
      }
    };

   
    window.addEventListener('mousemove', handleMouseMove);
    window.setTimeout(moveCursor, delay);

 
    const items = document.querySelectorAll("a, .Para, .intro, .word-container");
    items.forEach(item => {
      item.addEventListener("mouseenter", itemHoverEnter);
      item.addEventListener("mouseleave", itemHoverLeave);
    });

    return () => {
     
      window.removeEventListener('mousemove', handleMouseMove);
      items.forEach(item => {
        item.removeEventListener("mouseenter", itemHoverEnter);
        item.removeEventListener("mouseleave", itemHoverLeave);
      });
    };
  }, []);

  return <div className={styles.cursor} ref={cursorRef} />;
};

export default CursorEffect;
