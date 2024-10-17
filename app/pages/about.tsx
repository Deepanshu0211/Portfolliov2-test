'use client'; 

import { motion } from 'framer-motion';
import styles from './about.module.css';

import Navbar from '../components/Navbar';
import CursorEffect from '../components/CursorEffect';

export default function AboutPage() {
  return (
    <motion.div
      className={styles.container}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      
      <Navbar />
      <CursorEffect />
      
      <motion.div
        className={styles.content}
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1>About Me</h1>
        <p>
          Hey! I'm Deepanshu, a passionate developer who loves building things with code. 
          I specialize in creating web apps, mobile apps, and bots to solve real-world problems. 
          Over the years, I’ve been involved in a wide range of projects that have helped me grow and 
          improve my skills. My primary focus is on web development, but I’m always curious to learn 
          and experiment with new technologies.
        </p>
        <p>
          Outside of work, I enjoy jamming to my favorite tunes, especially "Aram," brainstorming ideas 
          for my next YouTube video, or exploring the latest trends in tech. I’m always up for a challenge 
          and love connecting with people who share my interests.
        </p>
        <p>
          Let’s create something amazing together!
        </p>
      </motion.div>
    </motion.div>
  );
}
