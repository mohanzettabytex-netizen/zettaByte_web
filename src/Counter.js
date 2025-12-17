import { motion, useMotionValue, animate, useMotionValueEvent } from "framer-motion";
import { useEffect, useState } from "react";

export default function Counter({ value, startAnimation }) {
    const end = parseInt(value.replace("+", ""), 10);

    const count = useMotionValue(0);   // motion value
    const [display, setDisplay] = useState(0); // state for showing the number

    // Listen to motion value updates and update display state
    useMotionValueEvent(count, "change", (latest) => {
        setDisplay(Math.floor(latest));
    });

    useEffect(() => {
        if (startAnimation) {
            const controls = animate(count, end, {
                duration: 2,
                ease: "easeOut"
            });

            return () => controls.stop();
        }
    }, [startAnimation]);

    return (
        <motion.span>
            {display}+
        </motion.span>
    );
}
