import React from "react";

const NavLinks = [
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

export const SideNav = () => {
  return (
    <div>
      <ul className="SidenavContainer">
        <li className="SidenavHeading"> Important Links </li>
        {NavLinks.map((link) => {
          return (
            <li className="SidenavLink" key={link.name}>
              <a href={link.href} target="_blank">
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
