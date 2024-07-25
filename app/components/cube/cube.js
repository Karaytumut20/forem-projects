import React from 'react';
import styles from './cube.module.css';

const steps = [
    { title: 'Sign up', description: 'Easily set up and use Forem2go in a few mouse clicks.', color: 'rgba(255, 166, 242, 0.8)' },
    { title: 'Configure domain', description: 'Easily set up and use Forem2go in a few mouse clicks.', color: 'rgba(255, 127, 127, 0.8)' },
    { title: 'Set up the site', description: 'Easily set up and use Forem2go in a few mouse clicks.', color: 'rgba(141, 255, 115, 0.8)' },
    { title: 'Enjoy!', description: 'Easily set up and use Forem2go in a few mouse clicks.', color: 'rgba(250, 255, 108, 0.8)' },
];

const Cube = () => {
    return (
        <div className={styles.cardsContainer}>
            {steps.map((step, index) => (
                <div key={index} className={styles.card}>
                    <div className={styles.cube}>
                        <div className={`${styles.face} ${styles.front}`} style={{ backgroundColor: step.color }}>
                            Front
                        </div>
                        <div className={`${styles.face} ${styles.top}`} style={{ backgroundColor: step.color }}>
                            Top
                        </div>
                        <div className={`${styles.face} ${styles.left}`} style={{ backgroundColor: step.color }}>
                            Side
                        </div>
                    </div>
                    <h3 className={styles.title}>{step.title}</h3>
                    <p className={styles.description}>{step.description}</p>
                </div>
            ))}
        </div>
    );
};

export default Cube;
