'use client';

import { motion, useAnimation } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { mockup } from './mockup'; // Adjust the import path as necessary
import RotatingText from '@/components/rotating-text';
import DraggableCard from '@/components/draggable-card';
import { Input } from '@/components/ui/input';
import { useAtom } from 'jotai';
import { authUserAtom } from '../store';
import { EllipsisIcon, GlobeIcon, HeartIcon, JapaneseYenIcon } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { useIsMobile } from '@/components/use-is-mobile';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

import arrowRightImage from "@/public/arrow-right-2.png"
import SwipeTour from '@/components/swipe-toure';


type Job = typeof mockup[0];


export default function Page() {
  const [jobs, setJobs] = useState<Job[]>(mockup);
  const [likedJobs, setLikedJobs] = useState<Job[]>([]);
  const [tourOpen, setTourOpen] = useState(true);

  const isMobile = useIsMobile();

  const [user] = useAtom(authUserAtom);

  const handleSwipe = (direction: 'left' | 'right', job: Job) => {
    if (direction === 'right') {
      setLikedJobs(prev => [...prev, job]);
    }
    setJobs(prev => prev.filter(j => j !== job));
    setTourOpen(false); // Close the tour after first swipe
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setTourOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);


  useEffect(() => {
    if (user?.tutorialCompleted) {
      setTourOpen(false);
    }
  }, [user]);

  const tabItems = [
    {
      value: 'competition',
      label: 'Competition',
    },
    {
      value: 'internship',
      label: 'Internship',
    },
    {
      value: 'scholarship',
      label: 'Scholarship',
    }
  ]

  const SavedTab = (
    <Tabs defaultValue="competition" className="">
      <div className='flex justify-between items-center'>
        <h2 className="text-lg font-semibold">Saved</h2>
        <TabsList>
          {tabItems.map((item) => (
            <TabsTrigger key={item.value} value={item.value}>
              {item.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>
      {tabItems.map((item) => (
        <TabsContent key={item.value} value={item.value}>
          <ul className="space-y-1">
            {likedJobs.map((job, idx) => (
              <li key={idx} className="bg-green-100 p-3 rounded">
                ✅ {job.title} at {job.company}
              </li>
            ))}
          </ul>
        </TabsContent>
      ))}
    </Tabs>
  )

  return (
    <div className='relative'>
      <div className="max-w-6xl mx-auto p-8 space-y-10 z-0">
        <div className='flex items-start justify-between gap-5 flex-wrap'>
          <h1 className="text-2xl font-bold text-center flex items-center gap-3">
            <span>Find&nbsp;your</span>
            <RotatingText
              texts={['Job', 'Scholarship', 'Competition', 'Award', 'Internship', 'Fellowship', 'Grant', 'Conference', 'Hackathon', 'Workshop', 'Bootcamp', 'Seminar', 'Webinar', 'Course', 'Certification', 'Training', 'Event', 'Summit', 'Meetup', 'Symposium']}
              mainClassName="px-2 sm:px-2 md:px-3 bg-cyan-300 text-black overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg"
              staggerFrom={"last"}
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-120%" }}
              staggerDuration={0.025}
              splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
              transition={{ type: "spring", damping: 30, stiffness: 400 }}
              rotationInterval={2000}
            />
          </h1>
          <div className='w-full lg:w-2/3 space-y-3'>
            <Input className='w-full !text-xl h-10' placeholder='Tell Edventure AI what you are looking for...' />
            <Filter />
          </div>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 gap-6 md:[direction:rtl]'>

          {!isMobile ? (
            <div className="">
              {SavedTab}
            </div>
          ) : (
            <Drawer>
              <div className='flex justify-end gap-5 items-center'>
                <div>
                  <Image
                    src={arrowRightImage}
                    alt="Arrow Right"
                    width={150}
                    height={30}
                    className="inline-block mr-2"
                  />
                </div>
                <DrawerTrigger asChild>
                  <Button className='flex items-center gap-2'>
                    <HeartIcon className='size-5' />
                    <span>Saved Items</span>
                  </Button>
                </DrawerTrigger>
              </div>
              <DrawerContent>
                <div className="p-4">
                  {SavedTab}
                </div>
                <DrawerFooter>
                  <p className='text-sm text-center'>Try our quick apply feature assisted by AI.</p>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          )}

          <div className="relative h-[500px] flex items-center justify-center">
            {jobs.map((job, index) => (
              <DraggableCard
                key={job.title}
                job={job}
                index={index}
                onSwipe={handleSwipe}
              />
            ))}
          </div>



        </div>
      </div>

      <div className='z-[1000]' style={{ zIndex: 100 }}>
        {tourOpen && <SwipeTour />}
      </div>
    </div>
  );
}

function Filter() {
  return (
    <div className='flex flex-wrap gap-3 items-center text-xs font-medium'>
      <div className='flex items-center gap-3 px-4 py-2 bg-green-200 rounded-full w-fit hover:cursor-pointer'>
        <GlobeIcon className='size-4' />
        <span>Remote Internship</span>
      </div>

      <div className='flex items-center gap-3 px-4 py-2 bg-green-200 rounded-full w-fit hover:cursor-pointer'>
        <JapaneseYenIcon className='size-4' />
        <span>Scholarship Japan</span>
      </div>

      <div className='flex items-center gap-3 px-4 py-2 bg-gray-200 rounded-full w-fit hover:cursor-pointer'>
        <EllipsisIcon className='size-4' />
        <span>More to Come</span>
      </div>
    </div>
  )
}

