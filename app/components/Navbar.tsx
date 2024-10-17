import React from 'react';
import styles from './navbar.module.scss'; 
import Link from 'next/link'; 
import { motion } from 'framer-motion';

const Navbar: React.FC = () => {
  return (
    <motion.div 
      className={styles.wrapper}
      initial={{ x: -200, opacity: 0 }} 
      animate={{ x: 0, opacity: 1 }} 
      transition={{ duration: 1 }} 
    >
      <nav className={styles.nav__wrapper} id="navbar-example">
        <ul className={styles.nav}>
          {['Home', 'About', 'Projects', 'Contact'].map((item, index) => (
            <motion.li 
              role="presentation" 
              key={item} 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.5 }} 
            >
              <Link href={`/${item.toLowerCase()}`}>
                <span className={styles.nav__counter}>{item}</span>
              </Link>
            </motion.li>
          ))}
        </ul>
      </nav>
    </motion.div>
  );
};

export default Navbar;
