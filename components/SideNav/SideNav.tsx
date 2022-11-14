import React from "react";
import Link from "next/link";
import sideNavStyles from "./Sidenav.module.css";

type SideNavLinks = {
  name: string;
  href: string;
};

const sidenavLinks: SideNavLinks[] = [
  {
    name: "Interview Preparation",
    href: "https://neog.camp/qualifier/camp-interview-tips",
  },
  {
    name: "Interview Practice Questions",
    href: "https://neog.camp/qualifier/camp-interview-practice",
  },
  //   { name: "Interview D-Day preparation", href: "/interviewDayPrep" },
];

export const SideNav = (): JSX.Element => {
  return (
    <div>
      <ul className={sideNavStyles.SidenavContainer}>
        <li className={sideNavStyles.SidenavHeading}> Important Links </li>
        {sidenavLinks.map((link) => {
          return (
            <Link href={link.href} key={link.name}>
              <a target="_blank" className={sideNavStyles.SidenavLink}>
                {link.name}
              </a>
            </Link>
          );
        })}
      </ul>
    </div>
  );
};
