import React from "react";
import { useTheme } from "../../context/Theme/Theme";

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
  const { theme } = useTheme();

  return (
    <div style={theme}>
      <ul className='SidenavContainer'>
        <li className='SidenavHeading'> Important Links </li>
        {sidenavLinks.map((link) => {
          return (
            <li className='SidenavLink' key={link.name}>
              <a href={link.href} target='_blank'>
                {" "}
                {link.name}{" "}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
