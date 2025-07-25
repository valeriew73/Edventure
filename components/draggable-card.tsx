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
        // <motion.div
        //     drag="x"
        //     className="absolute w-full max-w-md h-full cursor-grab"
        //     style={{ zIndex: 50 - index }}
        //     initial={{ scale: 1 }}
        //     animate={controls}
        //     whileDrag={{ scale: 1.02 }}
        //     dragConstraints={{ left: 0, right: 0 }}
        //     onDragEnd={(_, info) => {
        //         if (info.offset.x > 150) {
        //             // Swiped right
        //             controls.start({ x: 1000, opacity: 0 }).then(() => {
        //                 onSwipe('right', job);
        //             });
        //         } else if (info.offset.x < -150) {
        //             // Swiped left
        //             controls.start({ x: -1000, opacity: 0 }).then(() => {
        //                 onSwipe('left', job);
        //             });
        //         } else {
        //             // Snap back
        //             controls.start({ x: 0 });
        //         }
        //     }}
        // >
        //     <Card className="w-full h-full shadow-lg">
        //         <CardHeader>
        //             <CardTitle>{job.title}</CardTitle>
        //             <CardDescription>{job.company} — {job.location}</CardDescription>
        //             <p className="text-sm mt-3">{job.description}</p>
        //             <p className="text-xs text-muted-foreground mt-2">
        //                 💼 {job.requirements}
        //             </p>

        //             <p className="text-xs text-muted-foreground mt-2">
        //                 💰 {job.salary}
        //             </p>

        //             <p className="text-xs text-muted-foreground mt-2">
        //                 📅 {new Date(job.date).toLocaleDateString()}
        //             </p>

        //             <p className="text-xs text-muted-foreground mt-2">
        //                 🏢 {job.benefits}
        //             </p>
        //         </CardHeader>
        //     </Card>
        // </motion.div>
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
                    controls.start({ x: 1000, opacity: 0 }).then(() => onSwipe('right', job));
                } else if (info.offset.x < -150) {
                    controls.start({ x: -1000, opacity: 0 }).then(() => onSwipe('left', job));
                } else {
                    controls.start({ x: 0 });
                }
            }}
        >
            <Card className="w-full h-full shadow-xl rounded-2xl border border-gray-100 bg-white">
                <CardHeader className="space-y-4">
                    <div className="flex items-start justify-between">
                        <div>
                            <CardTitle className="text-xl font-semibold text-gray-800">{job.title}</CardTitle>
                            <CardDescription className="text-sm text-gray-600">
                                {job.company} — <span className="text-gray-700">{job.location}</span>
                            </CardDescription>
                        </div>
                        <div className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-full font-medium">
                            Full-time
                        </div>
                    </div>

                    <p className="text-sm text-gray-700">{job.description}</p>

                    <ul className="space-y-2 text-sm text-gray-600 mt-4">
                        <li className="flex items-center gap-2">
                            💼 <span>{job.requirements}</span>
                        </li>
                        <li className="flex items-center gap-2">
                            💰 <span>{job.salary}</span>
                        </li>
                        <li className="flex items-center gap-2">
                            📅 <span>{new Date(job.date).toLocaleDateString()}</span>
                        </li>
                        <li className="flex items-center gap-2">
                            🏢 <span>{job.benefits}</span>
                        </li>
                    </ul>
                </CardHeader>
            </Card>
        </motion.div>

    );
}
