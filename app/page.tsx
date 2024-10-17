'use client'; // Marking this as a client component

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';
import HamburgerMenu from './components/HamburgerMenu';
import Navbar from './components/Navbar';
import Loading from './components/Loading';
import { motion } from 'framer-motion'; 
import Link from 'next/link'; 
import CursorEffect from './components/CursorEffect';
import ThreeDBackground from './components/ThreeDBackground'; 

export default function MainPage() {
    const [username, setUsername] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [showContent, setShowContent] = useState<boolean>(false);
    const router = useRouter();

    useEffect(() => {
        const savedUsername = localStorage.getItem('username');
        if (savedUsername) {
            setUsername(savedUsername);
        } else {
            router.push('/'); 
        }
        setLoading(false);
       
        const timeout = setTimeout(() => {
            setShowContent(true);
        }, 300); 

        return () => clearTimeout(timeout);
    }, [router]);

    if (loading) {
        return <Loading />; 
    }

    
    const linkVariants = {
        hidden: { x: 100, opacity: 0 }, 
        visible: (i: number) => ({
            x: 0,
            opacity: 1,
            transition: {
                delay: i * 0.3, 
                duration: 0.5,
            },
        }),
    };

    return (
        <motion.div
            className={styles.container}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }} 
        >
            
             <ThreeDBackground />
            <HamburgerMenu />
            <Navbar />
           
            

            {showContent && ( 
                <>
                    <motion.div
                        className={styles.intro}
                        initial={{ y: -50 }}
                        animate={{ y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <p className={styles.am}>I'm</p>
                        <h1>{username ? ` ${username}!` : 'Pallav'}</h1>
                    </motion.div>

                    <div className={styles.grid}>
                        <motion.p
                            className={styles.Para}
                            initial={{ y: 50 }}
                            animate={{ y: 0 }}
                            transition={{ duration: 0.5 }} 
                            whileHover={{ scale: 1.05, rotateY: 10 }} 
                            whileTap={{ scale: 0.95 }} 
                        >
                            I’m a curious mind exploring ways to bring ideas to life through code.
                            My passion lies in web development and app creation,
                            crafting digital experiences that are functional and visually exciting.
                            I embrace challenges, whether animating a webpage or diving into app development,
                            always learning and improving.
                            Outside of coding, I’m usually jamming to "Aram," brainstorming YouTube ideas,
                            or exploring inspiring tech trends. I love connecting with like-minded people,
                            sharing knowledge, and collaborating on innovative projects.
                            If you’re into coding, music, or just want to chat about cool ideas, let’s connect!
                        </motion.p>

                        <motion.p
                            className={styles.Para2}
                            initial={{ y: 200 }}
                            animate={{ y: 0 }}
                            transition={{ duration: 0.5 }}
                            whileHover={{ scale: 1.05, rotateY: 10 }} 
                            whileTap={{ scale: 0.95 }} 
                        >
                            I’m a developer with experience across a variety of projects,
                            from creating web apps and mobile apps to building bots that automate tasks.
                            I’ve worked on a range of projects that showcase my skills in coding,
                            including complex backend logic and user-friendly interfaces.
                            Whether it's developing a responsive website or coding a mobile app,
                            I’m all about finding efficient solutions to real-world problems.
                            I thrive in environments where I can experiment with new technologies and continuously refine my craft.
                        </motion.p>

                        <motion.p
                            className={styles.Para3}
                            initial={{ y: 300 }}
                            animate={{ y: 0 }}
                            transition={{ duration: 0.5 }}
                            whileHover={{ scale: 1.05, rotateY: 10 }} 
                            whileTap={{ scale: 0.95 }} 
                        >
                           I have a diverse skill set when it comes to programming languages and technologies.
                            I’m proficient in JavaScript, Python, C++, SQL, and I’ve got a good grasp of C as well.
                             When it comes to frameworks, I work with React, Next.js for web development,
                              and Flutter and Kotlin for mobile apps. Whether it’s building bots,
                               crafting interactive web apps, or developing mobile solutions, 
                               I’m always exploring new tools to enhance my work. 
                               I enjoy experimenting with cutting-edge tech like Framer Motion and even diving
                            into 3D elements with Three.js to create visually dynamic and responsive experiences.
                        </motion.p>
                    </div>

                  
                    <div className={styles.socialLinks}>
                        <motion.div
                            className={styles.hori}
                            custom={0} 
                            initial="hidden"
                            animate="visible"
                            variants={linkVariants} 
                            whileHover={{ scale: 1.2, rotateY: 10 }}
                        >
                            <Link href="https://github.com/Deepanshu0211" target="_blank">GitHub</Link>
                        </motion.div>
                        <motion.div
                            className={styles.hori}
                            custom={1} 
                            initial="hidden"
                            animate="visible"
                            variants={linkVariants}
                            whileHover={{ scale: 1.2, rotateY: 10 }}
                        >
                            <Link href="https://www.linkedin.com/in/deepanshu0211" target="_blank">LinkedIn</Link>
                        </motion.div>
                        <motion.div
                            className={styles.hori}
                            custom={2} 
                            initial="hidden"
                            animate="visible"
                            variants={linkVariants} 
                            whileHover={{ scale: 1.2, rotateY: 10 }} 
                        >
                            <Link href="https://www.instagram.com/deepanshu0211" target="_blank">Instagram</Link>
                        </motion.div>
                    </div>
                </>
            )}
        </motion.div>
        
    );
}
