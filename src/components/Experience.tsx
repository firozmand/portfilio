"use client";

import { useState, useEffect } from "react";

const jobsData = [
  {
    id: 0,
    company: "Tech Solutions Inc.",
    title: "Front-End Developer",
    range: "May 2022 - Present",
    url: "https://www.google.com", // A sample link
    duties: [
      "Developed and maintained user-facing features using modern front-end technologies like React and Next.js.",
      "Collaborated with designers and back-end developers to create seamless and responsive web applications.",
      "Optimized components for maximum performance across a vast array of web-capable devices and browsers.",
      "Wrote clean, maintainable, and well-documented code.",
    ],
  },
  {
    id: 1,
    company: "Creative Minds LLC",
    title: "Junior Front-End Developer",
    range: "Jan 2021 - Apr 2022",
    url: "https://www.google.com", // A sample link
    duties: [
      "Assisted in the development of websites and web applications from concept to deployment.",
      "Translated UI/UX design wireframes to actual code that will produce visual elements of the application.",
      "Learned and applied new technologies and best practices in web development.",
    ],
  },
];

const Experience = () => {
  // ۲. یک state برای نگه داشتن شماره تب فعال تعریف می‌کنیم. مقدار اولیه 0 یعنی اولین شغل به صورت پیش‌فرض انتخاب شده.
  const [activeTab, setActiveTab] = useState(0);

  // ۳. اطلاعات شغل فعال رو بر اساس state انتخاب می‌کنیم
  const activeJob = jobsData[activeTab];

  return (
    <section id="experience" className="py-24">
      <h2 className="text-2xl font-bold text-lightest-slate mb-8">
        <span className="text-green font-mono mr-2">02.</span>
        Where I’ve Worked
      </h2>

      <div className="md:flex">
        {/* لیست تب‌ها (شرکت‌ها) */}
        <div className="flex overflow-x-auto md:flex-col md:mr-8 mb-8 md:mb-0">
          {jobsData.map((job, index) => (
            <button
              key={job.id}
              onClick={() => setActiveTab(index)}
              className={`px-4 py-3 w-full text-left whitespace-nowrap hover:bg-light-navy hover:text-green focus:outline-none transition-all duration-300 ${
                activeTab === index
                  ? "text-green border-b-2 md:border-b-0 md:border-l-2 border-green bg-light-navy"
                  : "text-slate border-b-2 md:border-b-0 md:border-l-2 border-lightest-navy"
              }`}
            >
              {job.company}
            </button>
          ))}
        </div>

        {/* محتوای تب فعال */}
        <div className="min-h-[300px]">
          <h3 className="text-xl font-bold text-lightest-slate">
            {activeJob.title}{" "}
            <a
              href={activeJob.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-green"
            >
              @ {activeJob.company}
            </a>
          </h3>
          <p className="text-sm mt-1 mb-6 font-mono">{activeJob.range}</p>
          <ul className="space-y-3">
            {activeJob.duties.map((duty, i) => (
              <li
                key={i}
                className="relative ps-5 before:content-['▹'] before:absolute before:start-0 before:text-green"
              >
                {duty}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Experience;
