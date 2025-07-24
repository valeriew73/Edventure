"use client";

import { Swiper, SwiperSlide } from 'swiper/react';

import { Input } from "@/components/ui/input";

import { EffectCards } from 'swiper/modules';
import { Button } from '@/components/ui/button';
import { HeartIcon, XIcon } from 'lucide-react';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';


const mockup = [
  {
    title: "Software Engineer",
    company: "Garuda Hacks",
    location: "Remote",
    date: "2023-10-01",
    description: "Develop and maintain software applications for various clients.",
    requirements: "Proficiency in programming languages, problem-solving skills, and teamwork.",
    salary: "$70,000 - $90,000 per year",
    benefits: "Health insurance, flexible hours, and professional development opportunities."
  },
  {
    title: "Data Scientist",
    company: "Tech Innovators",
    location: "New York, NY",
    date: "2023-09-15",
    description: "Analyze data to provide insights and support decision-making.",
    requirements: "Experience with data analysis tools, statistical knowledge, and communication skills.",
    salary: "$80,000 - $100,000 per year",
    benefits: "Health insurance, retirement plan, and remote work options."
  },
  {
    title: "Product Manager",
    company: "Future Tech",
    location: "San Francisco, CA",
    date: "2023-08-20",
    description: "Lead product development from concept to launch, ensuring alignment with business goals.",
    requirements: "Strong leadership skills, market research experience, and project management expertise.",
    salary: "$90,000 - $120,000 per year",
    benefits: "Health insurance, stock options, and professional growth opportunities."
  },
  {
    title: "UX/UI Designer",
    company: "Creative Solutions",
    location: "Remote",
    date: "2023-07-10",
    description: "Design user-friendly interfaces and enhance user experience across digital platforms.",
    requirements: "Proficiency in design software, creativity, and understanding of user-centered design principles.",
    salary: "$70,000 - $85,000 per year",
    benefits: "Health insurance, flexible work hours, and creative freedom."
  }
]

export default function Page() {
  return (
    <div className='max-w-6xl mx-auto px-5 space-y-10'>
      <div>
        <Input
          placeholder="Find your next adventure..."
          className="!text-4xl border-none shadow-none focus:outline-none focus:ring-0 py-5"
        />

      </div>

      <div className='flex justify-center'>
        <div>
          <Button variant="ghost" className='bg-red-200 h-full w-30'>
            <XIcon className='size-5' />
          </Button>
        </div>

        <Swiper
          effect={'cards'}
          grabCursor={true}
          modules={[EffectCards]}
        >
          {mockup.map((job, index) => (
            <SwiperSlide key={index}>
              <Card className='w-full h-full'>
                <CardHeader>
                  <CardTitle>Software Engineer</CardTitle>
                  <CardDescription>Garuda Hacks</CardDescription>
                </CardHeader>
              </Card>
            </SwiperSlide>
          ))}
        </Swiper>

        <div>
          <Button variant="ghost" className='bg-green-200 h-full w-30'>
            <HeartIcon className='size-5' />
          </Button>
        </div>
      </div>

    </div>
  );
}
