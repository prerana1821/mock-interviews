import React from "react";

export const InfoCards = ({ content }): JSX.Element => {
  return (
    <section className='section ow'>
      <div className='container'>
        <div className='header-m text-center'>How it works?</div>
        <hr />

        <div className='trio mb-1'>
          {content.map((level, index) => (
            <div key={index}>
              <div className='card fw shadow' key={index}>
                <div className='sub-header'>{level.subTitle}</div>
                <div className='header-s'>{level.title}</div>
                <div className='text'>{level.description()}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
