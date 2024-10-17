// components/ThreeDBackground.tsx

'use client';

import * as THREE from 'three';
import { useEffect, useRef } from 'react';

const ThreeDBackground = () => {
    const mountRef = useRef<HTMLDivElement | null>(null);
    const targetPosition = useRef(new THREE.Vector3(0, 0, 0)); 

    useEffect(() => {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true });
        
        renderer.setSize(window.innerWidth, window.innerHeight);
        if (mountRef.current) {
            mountRef.current.appendChild(renderer.domElement);
        }

        
        const blackHoleGeometry = new THREE.CylinderGeometry(0.5, 0.5, 1, 32);
        const blackHoleMaterial = new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.8 });
        const blackHole = new THREE.Mesh(blackHoleGeometry, blackHoleMaterial);
        blackHole.rotation.x = Math.PI / 2; 
        scene.add(blackHole);

       
        const starsGeometry = new THREE.BufferGeometry();
        const starCount = 1000;
        const positions = new Float32Array(starCount * 3);

        for (let i = 0; i < starCount; i++) {
            const radius = Math.random() * 50 + 5; 
            const angle = Math.random() * Math.PI * 2;
            positions[i * 3] = radius * Math.cos(angle); // x
            positions[i * 3 + 1] = radius * Math.sin(angle); // y
            positions[i * 3 + 2] = (Math.random() - 0.5) * 10; // z
        }

        starsGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        const starsMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.05, transparent: true, opacity: 0.5 });
        const stars = new THREE.Points(starsGeometry, starsMaterial);
        scene.add(stars);

        camera.position.z = 5;

        const lerp = (start: number, end: number, t: number) => start * (1 - t) + end * t; 

        const onMouseMove = (event: MouseEvent) => {
            const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
            const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;

           
            targetPosition.current.x = mouseX * 10;
            targetPosition.current.y = mouseY * 10;
        };

        const animateGlow = () => {
            blackHole.material.emissiveIntensity = 0.6 + 0.3 * Math.sin(Date.now() * 0.002); 
        };

        const animate = () => {
            requestAnimationFrame(animate);

           
            stars.position.x = lerp(stars.position.x, targetPosition.current.x, 0.05);
            stars.position.y = lerp(stars.position.y, targetPosition.current.y, 0.05);

            animateGlow(); 
            renderer.render(scene, camera);
        };

        window.addEventListener('mousemove', onMouseMove);
        animate();

        return () => {
            if (mountRef.current) {
                mountRef.current.removeChild(renderer.domElement);
            }
            window.removeEventListener('mousemove', onMouseMove);
        };
    }, []);

    return <div ref={mountRef} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }} />;
};

export default ThreeDBackground;
