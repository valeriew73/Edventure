'use client';

import { motion, useAnimation } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { mockup } from '@/app/(explore)/mockup';

type Job = typeof mockup[0];

export default function DraggableCard({
    job,
    index,
    onSwipe
}: {
    job: Job;
    index: number;
    onSwipe: (direction: 'left' | 'right', job: Job) => void;
}) {
    const controls = useAnimation();

    return (
        <motion.div
            drag="x"
            className="absolute w-full max-w-md h-full cursor-grab"
            style={{ zIndex: 50 - index }}
            initial={{ scale: 1 }}
            animate={controls}
            whileDrag={{ scale: 1.02 }}
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={(_, info) => {
                if (info.offset.x > 150) {
                    // Swiped right
                    controls.start({ x: 1000, opacity: 0 }).then(() => {
                        onSwipe('right', job);
                    });
                } else if (info.offset.x < -150) {
                    // Swiped left
                    controls.start({ x: -1000, opacity: 0 }).then(() => {
                        onSwipe('left', job);
                    });
                } else {
                    // Snap back
                    controls.start({ x: 0 });
                }
            }}
        >
            <Card className="w-full h-full shadow-lg">
                <CardHeader>
                    <CardTitle>{job.title}</CardTitle>
                    <CardDescription>{job.company} — {job.location}</CardDescription>
                    <p className="text-sm mt-3">{job.description}</p>
                    <p className="text-xs text-muted-foreground mt-2">
                        💼 {job.requirements}
                    </p>
                </CardHeader>
            </Card>
        </motion.div>
    );
}
