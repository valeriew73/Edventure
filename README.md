# About The Project
<img title="Edventure" alt="Edventure Logo" src="https://res.cloudinary.com/dtjjgiitl/image/upload/q_auto:good,f_auto,fl_progressive/v1753417801/ikafoq6winsk4ox0gk6h.jpg">
We developed Edventure, an AI-powered opportunity matching platform, with the aim to bridge the gap between access and potential. Edventure utilises CV analysis and interest matching to curate personalized recommendations of opportunities such as scholarships, competitions, internships and volunteer programs. We collect and structure data of hundreds of programs, both international and national, to be consulted by our intelligent filtering system. The user’s information scanned from their CV and preferences entered into their textbox are securely stored via Firebase and QDrant, allowing continuous learning and real time recommendation refinement.

## Features
- AI powered CV scanning 
- Automated personalisation and intelligent filtering for interest matching
- Big data platform which collects and structures data from hundreds of programs, both national and international 
- Continuous recommendation refinement - user progress and preferences stored securely via Firebase and QDrant 
> Premium only features ($29.99/6 month):
> - Access to international-level opportunities
> - Unlimited access to AI prompt text box
> - Unlimited swipes per day to explore as many opportunities as needed
> - Save unlimited opportunities

## Tech Stack
- **Frontend Development & UI**: [Next.js](https://nextjs.org/), [Tailwind CSS](https://tailwindcss.com), [Shadcn UI](https://ui.shadcn.com) 
- **Backend & Database**: [Firebase](https://firebase.google.com), [Node.js](https://nodejs.org/en)  
- **AI & Data Engineering**: [OpenAI](https://openai.com), [QDrant](https://qdrant.tech), [Playwright](https://playwright.dev)  
- **Design**: [Figma](https://www.figma.com)

## How to manually deploy [Edventure](https://edventure.theyoung.id/)
1. Clone the [repo](https://github.com/valeriew73/Edventure)
2. Open terminal or VSCode and go to the Edventure directory
3. Run `npm install`
4. Install playwright browser by running `npx playwright install --with-deps chromium `
5. Copy .env.example into .env and replace all the values inside with your own values
6. To run development: run `npm run dev` 
7. To run production: run `npm run build` followed with `npm run start`
8. Now you can access the WebApp through [browser](http://localhost:3000)
9. You will be required to login before accessing the app
10. Now you need to insert your personal data/CV to giving the AI more context about you
11. After finishing and being redirected to the home page, you can now `swipe the card`. Left to `discard` and right to `save` 
12. Now you can use the app freely

> **How to re-crawl data:**  
> Make request into `http://3000/api/spider/revalidate` with `POST`. It Will crawl source automatically and insert into Qdrant

## Credits
- Code refinement: [OpenAI](https://openai.com)   
- Domain and hosting: [TheYoung](https://theyoung.id)

## Contributors
**Valerie Valentine Wilson** - Project Management, Founder, Pitch Deck and Video  
**Khalisa Zahra Maulana** - Market Research, Strategy, Pitch Deck and Video Editor  
**Rezandra Rizky Irianto** - UI Design, Quality Assurance  
**Mochamad Satria Riza Permana** - Full Stack, Big Data Engineer, Web developer  
