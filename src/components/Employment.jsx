import React, { useState } from 'react';
import AddButton from './utils';

function CreateEmploymentForm({
  work = {
    jobRole: '', employer: '', dateBegin: '', dateEnd: '', location: '', description: '',
  }, index, ondelete = undefined, onsubmit, onclose,
}) {
  const [inputs, setInput] = useState(work);

  function changeInput(event) {
    switch (event.target.name) {
      case 'jobRole':
        setInput({ ...inputs, jobRole: event.target.value });
        break;
      case 'employer':
        setInput({ ...inputs, employer: event.target.value });
        break;
      case 'dateBegin':
        setInput({ ...inputs, dateBegin: event.target.value });
        break;
      case 'dateEnd':
        setInput({ ...inputs, dateEnd: event.target.value });
        break;
      case 'location':
        setInput({ ...inputs, location: event.target.value });
        break;
      case 'description':
        setInput({ ...inputs, description: event.target.value });
        break;
      default:
        break;
    }
  }

  function preventSubmit(event) {
    onsubmit(event, index);
    onclose();
  }

  return (
    <form action="" id="experience" onSubmit={(event) => preventSubmit(event, index)}>
      <label htmlFor="jobRole">
        jobRole:
        <input type="text" name="jobRole" id="jobRole" placeholder="Web Developer" value={inputs.jobRole} onChange={(event) => changeInput(event)} />
      </label>
      <label htmlFor="employer">
        employer:
        <input type="text" name="employer" id="employer" placeholder="Acme Inc." value={inputs.employer} onChange={(event) => changeInput(event)} />
      </label>
      <label htmlFor="dateBegin">
        Date:
        <input placeholder="From" type="text" name="dateBegin" id="dateBegin" value={inputs.dateBegin} onChange={(event) => changeInput(event)} />
        <input placeholder="To" type="text" name="dateEnd" id="dateEnd" value={inputs.dateEnd} onChange={(event) => changeInput(event)} />
      </label>
      <label htmlFor="location">
        City:
        <input type="text" name="location" id="location" placeholder="San Diego, CA" value={inputs.location} onChange={(event) => changeInput(event)} />
      </label>
      <label htmlFor="description">
        Description:
        <input type="text" name="description" id="description" placeholder="e.g Designed and developed responsive websites ..." value={inputs.description} onChange={(event) => changeInput(event)} />
      </label>
      <div className="buttons">
        { ondelete !== undefined && <button type="button" className="delete" onClick={ondelete}>Delete</button>}
        <button type="button" className="cancel" onClick={onclose}>Cancel</button>
        <button type="submit" className="save">Save</button>
      </div>
    </form>
  );
}

function EmploymentLayer({
  work, index, ondelete, onsubmit,
}) {
  const [status, setStatus] = useState(true);

  function changeStatus() {
    setStatus(!status);
  }

  function preventSubmit(event) {
    onsubmit(event, index);
    changeStatus();
  }

  function closeDeletion() {
    ondelete(index);
    changeStatus();
  }

  return (

    status ? (
      <div className="employment-layer">
        <h3>
          {work.jobRole}
          {' '}
          at
          {' '}
          {work.employer}
          <br />
          {' '}
          <span>
            {work.dateBegin}
            {' '}
            -
            {' '}
            {work.dateEnd}
          </span>
        </h3>
        <svg onClick={changeStatus} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-edit-3">
          <path d="M12 20h9" />
          <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
        </svg>
      </div>
    ) : (<CreateEmploymentForm work={work} index={index} ondelete={closeDeletion} onsubmit={preventSubmit} onclose={changeStatus} />)
  );
}

function EmploymentStack({ experience, setter }) {
  const [openform, setOpenForm] = useState(false);

  const openEmploymentForm = () => {
    setOpenForm(true);
  };

  const closeEmploymentForm = () => {
    setOpenForm(false);
  };

  const saveEmployment = (event, index) => {
    event.preventDefault();
    setter([...experience.slice(0, index), {
      jobRole: event.target.elements.jobRole.value,
      employer: event.target.elements.employer.value,
      dateBegin: event.target.elements.dateBegin.value,
      dateEnd: event.target.elements.dateEnd.value,
      location: event.target.elements.location.value,
      description: event.target.elements.description.value,
    }, ...experience.slice(index + 1)]);
  };

  const deleteEmployment = (index) => {
    setter([...experience.slice(0, index), ...experience.slice(index + 1)]);
  };

  return (

    <>
      <h2>Employment History</h2>

      <div className="stack">
        {experience.map((work, index) => (
          <EmploymentLayer key={index} work={work} index={index} ondelete={deleteEmployment} onsubmit={saveEmployment} />
        ))}
      </div>

      {openform && <CreateEmploymentForm index={experience.length} onsubmit={saveEmployment} onclose={closeEmploymentForm} />}

      <AddButton text="Add Employment" action={openEmploymentForm} />

    </>
  );
}

function ResumeEmployment({ experience }) {
  return (
    <>
      <h1>Employment</h1>
      {experience.map((work, index) => (
        <div className="cv-box" key={index}>
          <div className="cv-box-header">
            <h2>
              {work.jobRole}
            </h2>
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

export { EmploymentStack, ResumeEmployment };
