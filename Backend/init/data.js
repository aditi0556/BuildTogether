import mongoose from "mongoose";
import Event from "../models/Event.js";
const MONGO_URL="mongodb://127.0.0.1:27017/hackathon";

main()
 .then(()=>{
    console.log("connected");
 })
 .catch((err)=>{
    console.log(err);
 })

async function main(){
    await mongoose.connect(MONGO_URL);
}
const data = [
  {
    topics: [{ name: "Web3" }, { name: "AI Agents" }],
    title: "Agentic Ethereum Hackathon India",
    prizeMoney: 30000,
    startDate: new Date("2025-06-20T09:00:00Z"),
    endDate: new Date("2025-07-04T20:00:00Z"),
    registrationStartDate: new Date("2025-05-14T00:00:00Z"),
    registrationEndDate: new Date("2025-07-01T23:59:59Z"),
    mentors: [
      { name: "Manish Rao", org: "Web3 Solutions" },
      { name: "Megha Verma", org: "AIEthics" },
    ],
    image:
      "https://media.istockphoto.com/id/2166223744/photo/line-of-code-displayed-with-blue-glow-and-blur.webp?a=1&b=1&s=612x612&w=0&k=20&c=QN01dZsGx-Vw5G-X6v5vnniryQQJnBjIUPrvC1HNDAk=",
    desc: "Dive into the future of decentralized intelligence at the Agentic Ethereum Hackathon India. This event brings together the brightest minds in Web3 and AI to build autonomous agents that reshape how we interact with blockchain ecosystems. Participants will explore Ethereum smart contracts, agentic workflows, and decentralized governance models. With expert mentorship and a ₹30,000 prize pool, this hackathon is a launchpad for India’s next generation of Web3 innovators.",
  },
  {
    topics: [{ name: "Education" }, { name: "Magic Tech" }],
    title: "Triwizardathon 1.0",
    prizeMoney: 10000,
    startDate: new Date("2025-07-10T09:00:00Z"),
    endDate: new Date("2025-07-17T20:00:00Z"),
    registrationStartDate: new Date("2025-06-30T00:00:00Z"),
    registrationEndDate: new Date("2025-07-07T23:59:59Z"),
    mentors: [{ name: "Neha Sharma", org: "EduMagic" }],
    image: "https://example.com/images/triwizard.jpg",
    desc: "Inspired by the magical world of Hogwarts, Triwizardathon 1.0 is a national-level hackathon where creativity meets code. Teams will tackle challenges themed around magical education, enchanted interfaces, and spellbound automation. Whether you're building a sorting hat algorithm or a Marauder’s Map clone, this event celebrates tech with a twist. Expect whimsical workshops, themed mentor sessions, and a prize pool that’s as magical as the experience.",
  },
  {
    topics: [{ name: "AgriTech" }, { name: "Blockchain" }],
    title: "AgriTech Hack",
    prizeMoney: 12000,
    startDate: new Date("2025-06-12T09:00:00Z"),
    endDate: new Date("2025-06-14T20:00:00Z"),
    registrationStartDate: new Date("2025-05-23T00:00:00Z"),
    registrationEndDate: new Date("2025-06-10T23:59:59Z"),
    mentors: [{ name: "Ramakant Jha", org: "SmartAgri" }],
    image:
      "https://plus.unsplash.com/premium_photo-1681400690940-8eff232a8f7d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8aGFja2F0aG9ufGVufDB8fDB8fHww",
    desc: "AgriTech Hack is a mission-driven hackathon focused on revolutionizing agriculture through technology. Participants will develop solutions for smart irrigation, crop monitoring, blockchain-based supply chains, and farmer empowerment platforms. With mentorship from industry leaders and a focus on real-world impact, this event is a fertile ground for innovation in India’s most vital sector.",
  },
  {
    topics: [{ name: "Women in Tech" }, { name: "Mapping" }],
    title: "HERE India Hackathon: Women in Tech",
    prizeMoney: 8000,
    startDate: new Date("2025-08-07T09:00:00Z"),
    endDate: new Date("2025-08-21T20:00:00Z"),
    registrationStartDate: new Date("2025-07-31T00:00:00Z"),
    registrationEndDate: new Date("2025-08-15T23:59:59Z"),
    mentors: [
      { name: "Shraddha Mishra", org: "HERE India" },
      { name: "Zubair Ahmad", org: "MapMakers" },
    ],
    image:
      "https://images.unsplash.com/photo-1563461660947-507ef49e9c47?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aGFja2F0aG9ufGVufDB8fDB8fHww",
    desc: "This hackathon celebrates women in technology by tackling real-world mapping and geospatial challenges. Hosted by HERE India, the event empowers female developers, designers, and data scientists to build location-based solutions that drive social change. From disaster response mapping to urban mobility tools, participants will work on projects that matter — supported by mentors who champion diversity and inclusion.",
  },

  // UPCOMING EVENTS (after August 28, 2025)
  {
    topics: [{ name: "AI" }, { name: "Sustainability" }],
    title: "Innoquest 2025",
    prizeMoney: 50000,
    startDate: new Date("2025-09-14T09:00:00Z"),
    endDate: new Date("2025-09-16T20:00:00Z"),
    registrationStartDate: new Date("2025-08-04T00:00:00Z"),
    registrationEndDate: new Date("2025-09-10T23:59:59Z"),
    mentors: [
      { name: "Priya Nair", org: "InnovateX" },
      { name: "Greg Thomas", org: "GreenAI" },
    ],
    image:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aGFja2F0aG9ufGVufDB8fDB8fHww",
    desc: "Innoquest 2025 is a high-impact hackathon at the intersection of AI and sustainability. Participants will build intelligent systems that address climate challenges, optimize energy use, and promote green innovation. With a ₹50,000 prize pool and mentorship from pioneers in eco-tech, this event is a call to action for developers who want to code for a better planet.",
  },
  {
    topics: [{ name: "Cloud" }, { name: "Security" }],
    title: "BlockDAG Hackathon 2025",
    prizeMoney: 6000,
    startDate: new Date("2025-08-28T09:00:00Z"),
    endDate: new Date("2025-09-04T20:00:00Z"),
    registrationStartDate: new Date("2025-09-08T00:00:00Z"),
    registrationEndDate: new Date("2025-10-01T23:59:59Z"),
    mentors: [{ name: "Vikram Saxena", org: "SecureCloud" }],
    image: "https://example.com/images/blockdaghack.jpg",
    desc: "Scale cloud computing securely with next-gen BlockDAG technology.",
  },
  {
    topics: [{ name: "Web Dev" }, { name: "Community" }],
    title: "ENIGMA 4.0: Web Development Hackathon",
    prizeMoney: 15000,
    startDate: new Date("2025-11-05T09:00:00Z"),
    endDate: new Date("2025-11-07T20:00:00Z"),
    registrationStartDate: new Date("2025-09-29T00:00:00Z"),
    registrationEndDate: new Date("2025-11-01T23:59:59Z"),
    mentors: [
      { name: "Rohit Pandey", org: "DevHub" },
      { name: "Ashley Lee", org: "CodeAlliance" },
    ],
    image:
      "https://images.unsplash.com/photo-1615454782617-e69bbd4f2969?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGhhY2thdGhvbnxlbnwwfHwwfHx8MA%3D%3D",
    desc: "ENIGMA 4.0 is a community-driven hackathon focused on modern web development. From real-time apps to responsive UIs, participants will build projects that push the boundaries of frontend and backend integration. With workshops on React, Tailwind, and serverless APIs, plus mentorship from top devs, this event is perfect for those who love crafting elegant, scalable web experiences.",
  },
  {
    topics: [{ name: "Global Development" }, { name: "AI" }],
    title: "Global Hack Week: AI/ML",
    prizeMoney: 42000,
    startDate: new Date("2025-09-20T09:00:00Z"),
    endDate: new Date("2025-09-24T20:00:00Z"),
    registrationStartDate: new Date("2025-08-26T00:00:00Z"),
    registrationEndDate: new Date("2025-09-19T23:59:59Z"),
    mentors: [{ name: "Samantha Green", org: "MLH" }],
    image:
      "https://images.unsplash.com/photo-1737408011230-995d7a7aca1b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGhhY2thdGhvbnxlbnwwfHwwfHx8MA%3D%3D",
    desc: "Join developers from around the world in this global celebration of AI and machine learning. Participants will tackle challenges in NLP, computer vision, and ethical AI, with guidance from mentors at MLH and other global tech leaders. Whether you're training models or building intelligent agents, this hackathon is your gateway to the international AI community.",
  },
  {
    topics: [{ name: "Social Impact" }, { name: "Tech for Good" }],
    title: "ImpactHack",
    prizeMoney: 10000,
    startDate: new Date("2025-10-29T09:00:00Z"),
    endDate: new Date("2025-11-03T20:00:00Z"),
    registrationStartDate: new Date("2025-10-27T00:00:00Z"),
    registrationEndDate: new Date("2025-11-20T23:59:59Z"),
    mentors: [{ name: "Mohammed Rizwan", org: "Tech4Good Inc." }],
    image:
      "https://media.istockphoto.com/id/1146014260/photo/binary-data-stream.webp?a=1&b=1&s=612x612&w=0&k=20&c=QuMPP0MZ4hXPpaUN_RcAZnxxv2Le5PTgxcn8IJhk-F8=",
    desc: "ImpactHack is a social innovation hackathon where technology meets purpose. Participants will build tools for education, healthcare, civic engagement, and more — all aimed at driving positive change. With a focus on accessibility, inclusivity, and real-world deployment, this event empowers developers to become changemakers.",
  },
  {
    topics: [{ name: "Portfolio" }, { name: "Personal Branding" }],
    title: "Hack Your Portfolio",
    prizeMoney: 8000,
    startDate: new Date("2025-08-28T09:00:00Z"),
    endDate: new Date("2025-09-02T20:00:00Z"),
    registrationStartDate: new Date("2025-08-19T00:00:00Z"),
    registrationEndDate: new Date("2025-09-02T23:59:59Z"),
    mentors: [{ name: "Riya Sharma", org: "CareerBoosters" }],
    image:
      "https://media.istockphoto.com/id/1484758991/photo/hackathon-concept-the-meeting-at-the-white-office-table.webp?a=1&b=1&s=612x612&w=0&k=20&c=mmdbXi7aH3wmRXnis41knz6NUYU_krv-Dgk9jslFrNA=",
    desc: "Hack Your Portfolio is a personal branding hackathon designed to help developers showcase their skills, projects, and personality. Participants will build interactive portfolios, resume generators, and career dashboards that stand out. With mentorship from career coaches and UI/UX experts, this event is perfect for anyone looking to level up their professional presence.",
  },
];


async function addData(){
    const res=await Event.insertMany(data);
    console.log(res);
}
addData();