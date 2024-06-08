function ResumeEmployment({ experience }) {
  return (
    <>
      <h1>Employment History</h1>
      {experience.map((work, index) => (
        <div className="cv-box" key={index}>
          <div className="cv-box-header">
            <h2>{work.jobRole}</h2>
            <p className="date-cv">
              {work.dateBegin}
              {' '}
              -
              {' '}
              {work.dateEnd}
            </p>
            <p className="location-cv">
              {work.location}
              {' '}
              -
              {' '}
              {work.employer}
            </p>
          </div>
          <div className="cv-box-description">
            <p>
              {work.description}
            </p>
          </div>
        </div>
      ))}
    </>
  );
}

export {
  ResumeEmployment,
};
