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
import { EllipsisIcon, GlobeIcon, HeartIcon, JapaneseYenIcon, SendIcon, XIcon } from 'lucide-react';
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

import { useChat } from '@ai-sdk/react';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

type Job = typeof mockup[0];


export default function Page() {

  const isMobile = useIsMobile();

  const [jobs, setJobs] = useState<Job[]>(mockup);
  const [likedJobs, setLikedJobs] = useState<Job[]>([]);
  const [tourOpen, setTourOpen] = useState(true);
  const [activeContext, setActiveContext] = useState<any[]>([]);

  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: '/api/chat',
    body: {
      context: `
      User context: ${activeContext.map(c => `${c.context} (${c.method})`).join(', ') || 'No context provided.'}
      User's liked jobs: ${likedJobs.map(job => `${job.title} at ${job.company}`).join(', ') || 'No liked jobs.'}
      `,
    }
  });

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

  const handleAddToContext = (job: Job) => {
    const jobOneLiner = `${job.title} at ${job.company} in ${job.location}`;
    setActiveContext(prev => [...prev, { context: jobOneLiner, method: 'similar' }]);
  };

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
              <li key={idx} className="bg-green-100 p-3 rounded flex justify-between items-center">
                <span>✅ {job.title} at {job.company}</span>
                <Button size={"sm"} onClick={() => handleAddToContext(job)}>
                  Add to Context
                </Button>
              </li>
            ))}
          </ul>
        </TabsContent>
      ))}
    </Tabs>
  )

  const contextMethods = [
    "similar",
    "related",
    "better",
    "more relevant"
  ]

  const ContextMessage = (
    <div className='flex flex-wrap gap-1'>
      {activeContext.map((context, index) => (
        <div key={index} className='py-1 pl-4 pr-1 rounded-full flex items-center w-fit gap-3 bg-gray-100 text-xs'>
          <span className='font-medium'>{context.context}</span>

          <div className='flex items-center'>
            <Select
              value={context.method}
              onValueChange={(value) => {
                const updatedContext = [...activeContext];
                updatedContext[index].method = value;
                setActiveContext(updatedContext);
              }}>
              <SelectTrigger size='sm' className='border-none shadow-none !text-xs'>
                <SelectValue placeholder="Method" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {contextMethods.map((method, index) => (
                    <SelectItem key={index} value={method}>
                      {method}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              size="sm"
              className='!text-xs !px-2 !py-1 rounded-full'
              onClick={() => {
                setActiveContext((contexts) => contexts.filter((_, i) => i !== index));
              }}
            >
              <XIcon className='size-4' />
            </Button>
          </div>
        </div>
      ))}
    </div>
  )

  return (
    <div className='relative'>
      <div className="max-w-6xl mx-auto p-8 space-y-10 z-0">
        <div className='grid lg:grid-cols-2 gap-6'>
          <div className='flex flex-col justify-start items-start'>
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
            <p className='text-gray-600 text-sm mt-2 max-w-4/5'>
              Swipe through opportunities tailored for you. Save your favorites and apply with ease.
            </p>
          </div>
          <div className='w-full space-y-3'>

            <div className="flex flex-col gap-3 w-full py-4 mx-auto stretch max-h-40 overflow-y-auto font-medium">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"
                    }`}
                >
                  <div
                    className={`max-w-xs md:max-w-md whitespace-pre-wrap px-4 py-2 rounded-2xl shadow-sm text-sm ${message.role === "user"
                      ? "bg-blue-500 text-white rounded-br-none"
                      : "bg-gray-100 text-gray-900 rounded-bl-none"
                      }`}
                  >
                    {message.parts.map((part, i) => {
                      if (part.type === "text") {
                        return <div key={`${message.id}-${i}`}>{part.text}</div>;
                      }
                      return null;
                    })}
                  </div>
                </div>
              ))}

            </div>

            {ContextMessage}

            <form className='flex items-center gap-3' onSubmit={handleSubmit}>
              <Input
                className='w-full !text-xl !h-14'
                placeholder='Tell Edventure AI what you are looking for...'
                onChange={handleInputChange}
                value={input}
              />
              <Button className='size-14' type='submit' disabled={!input}>
                <SendIcon className='size-6' />
              </Button>
            </form>

            <Filter onFilterChange={(filter) => {
              setActiveContext(prev => [...prev, { context: filter, method: 'similar' }])
            }} />
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

function Filter({ onFilterChange }: { onFilterChange?: (filter: string) => void }) {
  return (
    <div className='flex flex-wrap gap-3 items-center text-xs font-medium'>
      <div
        onClick={() => onFilterChange?.("Remote Internship")}
        className='flex items-center gap-3 px-4 py-2 bg-green-200 rounded-full w-fit hover:cursor-pointer'>
        <GlobeIcon className='size-4' />
        <span>Remote Internship</span>
      </div>

      <div
        onClick={() => onFilterChange?.("Scholarship Japan")}
        className='flex items-center gap-3 px-4 py-2 bg-green-200 rounded-full w-fit hover:cursor-pointer'>
        <JapaneseYenIcon className='size-4' />
        <span>Scholarship Japan</span>
      </div>

      <div
        className='flex items-center gap-3 px-4 py-2 bg-gray-200 rounded-full w-fit hover:cursor-pointer text-gray-500'>
        <EllipsisIcon className='size-4' />
        <span>More to Come</span>
      </div>
    </div>
  )
}

