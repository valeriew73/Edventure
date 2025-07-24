// "use client";

// import { Swiper, SwiperSlide } from 'swiper/react';

// import { Input } from "@/components/ui/input";

// import { EffectCards } from 'swiper/modules';
// import { Button } from '@/components/ui/button';
// import { HeartIcon, XIcon } from 'lucide-react';
// import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';


// export default function Page() {
//   return (
//     <div className='max-w-6xl mx-auto px-5 space-y-10'>
//       <div>
//         <Input
//           placeholder="Find your next adventure..."
//           className="!text-4xl border-none shadow-none focus:outline-none focus:ring-0 py-5"
//         />

//       </div>

//       <div className='flex justify-center'>
//         <div>
//           <Button variant="ghost" className='bg-red-200 h-full w-30'>
//             <XIcon className='size-5' />
//           </Button>
//         </div>

//         <Swiper
//           effect={'cards'}
//           grabCursor={true}
//           modules={[EffectCards]}
//         >
//           {mockup.map((job, idx) => (
//             <SwiperSlide key={idx}>
//               <Card className='w-full h-full'>
//                 <CardHeader>
//                   <CardTitle>{job.title}</CardTitle>
//                   <CardDescription>{job.company}</CardDescription>
//                 </CardHeader>
//                 {/* …other fields… */}
//               </Card>
//             </SwiperSlide>
//           ))}
//         </Swiper>

//         <div>
//           <Button variant="ghost" className='bg-green-200 h-full w-30'>
//             <HeartIcon className='size-5' />
//           </Button>
//         </div>
//       </div>

//     </div>
//   );
// }

'use client';

import { motion, useAnimation } from 'framer-motion';
import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { mockup } from './mockup'; // Adjust the import path as necessary

type Job = typeof mockup[0];

export default function Page() {
  const [jobs, setJobs] = useState<Job[]>(mockup);
  const [likedJobs, setLikedJobs] = useState<Job[]>([]);

  const handleSwipe = (direction: 'left' | 'right', job: Job) => {
    if (direction === 'right') {
      setLikedJobs(prev => [...prev, job]);
    }
    setJobs(prev => prev.filter(j => j !== job));
  };

  return (
    <div className="max-w-4xl mx-auto p-8 space-y-10">
      <h1 className="text-3xl font-bold text-center">Find Your Next Job</h1>

      <div className="relative w-full h-[500px]">
        {jobs.map((job, index) => (
          <DraggableJobCard
            key={job.title}
            job={job}
            index={index}
            onSwipe={handleSwipe}
          />
        ))}
      </div>

      {likedJobs.length > 0 && (
        <div className="mt-10">
          <h2 className="text-xl font-bold mb-2">Liked Jobs:</h2>
          <ul className="space-y-1">
            {likedJobs.map((job, idx) => (
              <li key={idx} className="bg-green-100 p-3 rounded">
                ✅ {job.title} at {job.company}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function DraggableJobCard({
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
      className="absolute w-full h-full cursor-grab"
      style={{ zIndex: 100 - index }}
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
