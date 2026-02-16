export interface Project {
  id: number;
  title: string;
  description: string;
  gradient: string;
  mainImage: string;
  image2?: string;
  image3?: string;
  techStack: string[];
  accentColor: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "Healthcare ERP System",
    description:
      "An integrated clinic management system designed to streamline and unify operational workflows across multiple roles. This system enhances efficiency, ensures seamless patient handling, and centralizes data management to optimize daily clinical operations.",
    gradient: "linear-gradient(to right bottom, #ffffff, #fbfcff, #f3fbff, #e9faff, #dff9fd, #ccf1f2, #bae9e5, #aae1d6, #89d0c0, #67bfaa, #42ae93, #009d7b)",
    mainImage: "/images/yayiha.png",
    image2: "/images/yayiha2.png",
    image3: "/images/yayiha3.png",
    techStack: ["/icons/vue.png", "/icons/tailwind.png", "/icons/flask.png", "/icons/python.png", "/icons/postgresql.png", "/icons/pinia.png", "/icons/socket-io.png", "/icons/Bigtable.png"],
    accentColor: "#10b981",
  },
  {
    id: 2,
    title: "Self Service System",
    description:
      'A comprehensive self-service clinic system that puts patients in control of their own care journey. This system enhances patient engagement, simplifies registration and appointment processes, and provides centralized access to personal health data for a more efficient clinical experience."',
    gradient: "linear-gradient(to right bottom, #ffffff, #fbfcff, #f3fbff, #e9faff, #dff9fd, #ccf1f2, #bae9e5, #aae1d6, #89d0c0, #67bfaa, #42ae93, #009d7b)",
    mainImage: "/images/yayihas1.png",
    image2: "/images/yayihas2.png",
    image3: "/images/yayihas3.png",
    techStack: ["/icons/vue.png", "/icons/tailwind.png", "/icons/flask.png", "/icons/python.png", "/icons/postgresql.png", "/icons/pinia.png", "/icons/socket-io.png", "/icons/Bigtable.png"],
    accentColor: "#10b981",
  },
  {
    id: 3,
    title: "Customer Presentation System",
    description:
      "A comprehensive showcase platform designed for seamless client onboarding and product demonstrations. It centralizes all core functionalities into an explorable environment, allowing users to experience the system's efficiency and intuitive design firsthand.",
    gradient: "linear-gradient(to right bottom, #ffffff, #ffdbfd, #ffaed4, #ff8583, #ff7700)",
    mainImage: "/images/demo1.png",
    image2: "/images/demo2.png",
    image3: "/images/demo3.png",
    techStack: ["/icons/vue.png", "/icons/tailwind.png", "/icons/flask.png", "/icons/python.png", "/icons/postgresql.png", "/icons/pinia.png", "/icons/sse.png"],
    accentColor: "#ffffff",
  },
  {
    id: 4,
    title: "SaaS ERP",
    description:
      "A comprehensive SaaS ERP ecosystem designed to serve as an integrated business platform, seamlessly unifying core operations from POS and Inventory to Accounting and Sales Management. By establishing a single source of truth, this system empowers businesses to scale, centralizing data and streamlining complex workflows into one intuitive interface.",
    gradient: "linear-gradient(to right bottom, #ffffff, #f7f8ff, #ecf3ff, #ddeeff, #cbeaff, #b9e3fd, #a6ddfb, #91d6f8, #7acaf3, #63beee, #48b1ea, #24a5e5)",
    mainImage: "/images/ting1.png",
    image2: "/images/ting2.png",
    image3: "/images/ting3.png",
    techStack: ["/icons/vue.png", "/icons/tailwind.png", "/icons/flask.png", "/icons/python.png", "/icons/postgresql.png", "/icons/pinia.png", "/icons/BigQuery.png", "/icons/sse.png"],
    accentColor: "#ffffff",
  },
];
