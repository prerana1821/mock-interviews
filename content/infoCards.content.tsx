import React, { ReactNode } from "react";

type InfoCardsContent = {
  title: string;
  subTitle: string;
  href: string;
  description: () => ReactNode;
};

export const infoCardsContent: InfoCardsContent[] = [
  {
    title: "Create Profile",
    subTitle: "Step 1: Login",
    href: "/level-zero",
    description: () => (
      <div className='list'>
        <div className='list-item'>
          Login in with GitHub to open slots to take or give mock interview
        </div>
      </div>
    ),
  },
  {
    title: "Schedule Interviews",
    subTitle: "Step 2: Open Slots or Match",
    href: "/level-one",
    description: () => (
      <div className='list'>
        <li className='list-item'>
          If you want to help and take interview open your available slots
          and/or if you wish to give interview match with the open slots.
        </li>
      </div>
    ),
  },
  {
    title: "Give/Take Interview",
    subTitle: "Step 3: Interview Day",
    href: "/roc8",
    description: () => (
      <div className='list'>
        <div className='list-item'>
          Set a reminder for your scheduled interview and take/give mock
          interview. Share your learnings with the community and be fully
          prepared for your real interview.
        </div>
      </div>
    ),
  },
];
