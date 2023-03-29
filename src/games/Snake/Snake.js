import styles from './Snake.module.css';

import { useEffect, useRef } from 'react';
import { runSnake } from './snakeApp';

export const Snake = () => {

    const canvasRef = useRef(null);
    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        runSnake(canvas, context);
    });

    return (

        <div className={styles.container}>
            <div className={styles.wrapper}>
                <canvas width='800' height='800' className={styles.canvas} ref={canvasRef} />
            </div>
            <button>Exit</button>
        </div>
    );
};