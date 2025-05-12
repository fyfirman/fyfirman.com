import React from "react";
import { Timeline } from "~/components/ui/timeline";
import useResponsive from "~/hooks/useResponsive";

const WorkExperienceTimeline = () => {
  const { isMobile } = useResponsive();

  const workExperienceData = [
    {
      title: "May 2024",
      content: (
        <div className="bg-white dark:bg-[#141414] p-6 mb-8">
          <h3 className="text-xl font-bold text-text-headings mb-1">Engineering Manager</h3>
          <h4 className="text-text-secondary my-0">PLABS.ID</h4>
          <p className="text-text-body my-2">
            Leading an engineering team of 23 software engineers to successfully deliver projects for clients across
            multiple regions, including Japan, Vietnam, and Indonesia. Managing the team while playing an active role in
            the pre-dealing process, making strategic decisions such as designing system architectures, estimating
            timelines, and optimizing resource allocation.
          </p>
          <div className="text-sm text-text-secondary">
            <span className="mr-2 inline-block bg-gray-100 dark:bg-gray-800 px-2 py-1 mb-1">Leadership</span>
            <span className="mr-2 inline-block bg-gray-100 dark:bg-gray-800 px-2 py-1 mb-1">Project Management</span>
            <span className="mr-2 inline-block bg-gray-100 dark:bg-gray-800 px-2 py-1 mb-1">System Analyst</span>
            <span className="mr-2 inline-block bg-gray-100 dark:bg-gray-800 px-2 py-1 mb-1">Golang</span>
            <span className="mr-2 inline-block bg-gray-100 dark:bg-gray-800 px-2 py-1 mb-1">React</span>
            <span className="mr-2 inline-block bg-gray-100 dark:bg-gray-800 px-2 py-1 mb-1">Google Cloud Platform</span>
          </div>
        </div>
      ),
    },
    {
      title: "May 2022",
      content: (
        <div className="bg-white dark:bg-[#141414] p-6 mb-8">
          <h3 className="text-xl font-bold text-text-headings mb-1">Software Engineer</h3>
          <h4 className="text-text-secondary my-0">Autobahn Security</h4>
          <p className="text-text-body my-2">
            Working on a cyber security platform that supports vulnerability management initiatives by consolidating,
            prioritizing, and remediating issues efficiently and transparently. Developing frontend with React & backend
            with NestJS and reviewing peers code to ensure adherence to coding standards & best practices.
          </p>
          <div className="mt-4">
            <p className="font-medium text-text-headings mb-1">Key Accomplishments:</p>
            <ul className="list-disc pl-5 text-text-body mb-2">
              <li>Built backend application capable of processing over 1 million+ data concurrently</li>
              <li>Led TypeScript migration to gain better maintainability and reducing number of bugs</li>
              <li>Became a key person for maintain & optimize Webpack configuration for micro-frontends</li>
              <li>
                Enhanced frontend observability by integrating APM (Application Performance Monitoring) and Semantic
                Versioning
              </li>
              <li>Invented feature flags to effectively manage feature releases based on trunk development</li>
              <li>Built design system for reusable components</li>
            </ul>
          </div>
          <div className="text-sm text-text-secondary">
            <span className="mr-2 inline-block bg-gray-100 dark:bg-gray-800 px-2 py-1 mb-1">React</span>
            <span className="mr-2 inline-block bg-gray-100 dark:bg-gray-800 px-2 py-1 mb-1">TypeScript</span>
            <span className="mr-2 inline-block bg-gray-100 dark:bg-gray-800 px-2 py-1 mb-1">Micro-frontends</span>
            <span className="mr-2 inline-block bg-gray-100 dark:bg-gray-800 px-2 py-1 mb-1">NestJS</span>
            <span className="mr-2 inline-block bg-gray-100 dark:bg-gray-800 px-2 py-1 mb-1">NodeJS</span>
            <span className="mr-2 inline-block bg-gray-100 dark:bg-gray-800 px-2 py-1 mb-1">PostgreSQL</span>
            <span className="mr-2 inline-block bg-gray-100 dark:bg-gray-800 px-2 py-1 mb-1">CI/CD</span>
            <span className="mr-2 inline-block bg-gray-100 dark:bg-gray-800 px-2 py-1 mb-1">NATS</span>
            <span className="mr-2 inline-block bg-gray-100 dark:bg-gray-800 px-2 py-1 mb-1">AWS</span>
          </div>
        </div>
      ),
    },
    {
      title: "Jun 2021",
      content: (
        <div className="bg-white dark:bg-[#141414] p-6 mb-8">
          <h3 className="text-xl font-bold text-text-headings mb-1">Jr. Front End Engineer</h3>
          <h4 className="text-text-secondary my-0">Lemonilo</h4>
          <p className="text-text-body my-2">
            Joined Lemonilo Squad to develop 'Curbat Sehat' & NCT gamification feature with React and React Native.
            Optimized SEO, used trunk based development, and improved React performance. Implemented SVG format to
            reduce app size and developed with TypeScript.
          </p>
          <div className="text-sm text-text-secondary">
            <span className="mr-2 inline-block bg-gray-100 dark:bg-gray-800 px-2 py-1 mb-1">React</span>
            <span className="mr-2 inline-block bg-gray-100 dark:bg-gray-800 px-2 py-1 mb-1">React Native</span>
            <span className="mr-2 inline-block bg-gray-100 dark:bg-gray-800 px-2 py-1 mb-1">NextJS</span>
            <span className="mr-2 inline-block bg-gray-100 dark:bg-gray-800 px-2 py-1 mb-1">TypeScript</span>
          </div>
        </div>
      ),
    },
    {
      title: "Apr 2021",
      content: (
        <div className="bg-white dark:bg-[#141414] p-6 mb-8">
          <h3 className="text-xl font-bold text-text-headings mb-1">Software Engineer - Freelance</h3>
          <h4 className="text-text-secondary my-0">Velocity League - velocity-league.com</h4>
          <p className="text-text-body my-2">
            Built a matchmaking platform for gamers to win prizes. Contributed as pioneer engineer designing the system
            from scratch. Created "Acceleration" design system with reusable components for efficient development,
            implementing monorepo architecture so apps can share code with each other.
          </p>
          <div className="text-sm text-text-secondary">
            <span className="mr-2 inline-block bg-gray-100 dark:bg-gray-800 px-2 py-1 mb-1">React</span>
            <span className="mr-2 inline-block bg-gray-100 dark:bg-gray-800 px-2 py-1 mb-1">TypeScript</span>
            <span className="mr-2 inline-block bg-gray-100 dark:bg-gray-800 px-2 py-1 mb-1">Socket</span>
          </div>
        </div>
      ),
    },
    {
      title: "Aug 2020",
      content: (
        <div className="bg-white dark:bg-[#141414] p-6 mb-8">
          <h3 className="text-xl font-bold text-text-headings mb-1">Full Stack Developer - Freelance</h3>
          <h4 className="text-text-secondary my-0">Curhat ASI</h4>
          <p className="text-text-body my-2">
            Created consultation apps about exclusive breast feeding with Client App and Conselor App, plus a dashboard
            website to monitor user activity. Built a chatting system with one or more conselors, article management
            system, conselor app (mobile) with React Native and back office website with React.js with Redux state
            management and REST API integration.
          </p>
          <div className="text-sm text-text-secondary">
            <span className="mr-2 inline-block bg-gray-100 dark:bg-gray-800 px-2 py-1 mb-1">React</span>
            <span className="mr-2 inline-block bg-gray-100 dark:bg-gray-800 px-2 py-1 mb-1">Redux</span>
            <span className="mr-2 inline-block bg-gray-100 dark:bg-gray-800 px-2 py-1 mb-1">TypeScript</span>
            <span className="mr-2 inline-block bg-gray-100 dark:bg-gray-800 px-2 py-1 mb-1">Socket</span>
          </div>
        </div>
      ),
    },
  ];

  if (isMobile) {
    return null;
  }

  return (
    <div id="work-experience" className="mt-20">
      <div className="max-w-7xl mx-auto pb-8">
        <h2 className="text-lg md:text-4xl mb-4 text-black dark:text-white max-w-4xl">My Journey</h2>
        <p className="text-neutral-700 dark:text-neutral-300 text-sm md:text-base max-w-sm">
          A timeline of my professional development and key milestones in my career path.
        </p>
      </div>
      <Timeline data={workExperienceData} />
    </div>
  );
};

export default React.memo(WorkExperienceTimeline);
