import React from "react";
import { useTheme } from "../../context/Theme/Theme";

export const InfoCards = ({ content }): JSX.Element => {
  const { theme } = useTheme();
  return (
    <section className='section ow' style={theme}>
      <div className='container'>
        <div className='header-m text-center' style={theme}>
          How it works?
        </div>
        <hr />

        <div className='trio mb-1'>
          {content.map((level, index) => (
            <div key={index}>
              <div
                className='card fw shadow'
                style={{ ...theme, boxShadow: theme.primaryBoxShadow }}
              >
                <div className='sub-header'>{level.subTitle}</div>
                <div className='header-s'>{level.title}</div>
                <div className='text' style={theme}>
                  {level.description()}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
