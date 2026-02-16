export interface Experience {
  id: number;
  name: string;
  company: string;
  desc: string;
  icon: string;
}

export const experience: Experience[] = [
  {
    id: 1,
    name: "Fullstack Programmer",
    company: "PT. Horus Technology",
    desc: "Developed and maintained ERP systems using Vue.js, Python and PostgreSQL.",
    icon: "pi pi-briefcase",
  },
  {
    id: 2,
    name: "Web development Mentee",
    company: "Infinite Learning",
    desc: "Hands-on experience in UI/UX and Fullstack implementation.",
    icon: "pi pi-graduation-cap",
  },
  {
    id: 3,
    name: "Practicum Lab Assistant",
    company: "Amikom University",
    desc: "Assisted students during algorithm and programming sessions.",
    icon: "pi pi-briefcase",
  },
  {
    id: 4,
    name: "GPA : 3.82/4.00",
    company: "Amikom University",
    desc: "Academic Excellence.",
    icon: "pi pi-graduation-cap",
  },
];
