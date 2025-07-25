import { getContextFromQdrant } from '@/server-utils/embedding';
import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';


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

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
    const { messages } = await req.json();

    const lastUserMessage = messages.filter((m: any) => m.role === 'user').pop()?.content;

    const context = await getContextFromQdrant(lastUserMessage);

    const systemPrompt = `
    You are a helpful assistant that helps users find jobs, scholarships, competitions, and internships.
    You can also help them with quick apply features. You will take consideration from the user's context and preferences.
    You need to find it from the database and the user's input.
    Use the following context to answer the user's question:

${context}
${mockup.map(item => JSON.stringify(item)).join('\n\n')}
`;

    console.log("System Prompt:", systemPrompt);

    const result = streamText({
        model: openai('gpt-4o'),
        messages: [
            { role: 'system', content: systemPrompt },
            ...messages,
        ],
    });

    return result.toDataStreamResponse();
}