import React, { useState } from 'react';
import AddButton from './utils';

function CreateEducationForm({
  studies = {
    school: '', degree: '', dateBeginEducation: '', dateEndEducation: '', locationEducation: '', descriptionEducation: '',
  }, index, ondelete = undefined, onsubmit, onclose,
}) {
  const [inputs, setInput] = useState(studies);

  function changeInput(event) {
    switch (event.target.name) {
      case 'school':
        setInput({ ...inputs, school: event.target.value });
        break;
      case 'degree':
        setInput({ ...inputs, degree: event.target.value });
        break;
      case 'dateBeginEducation':
        setInput({ ...inputs, dateBeginEducation: event.target.value });
        break;
      case 'dateEndEducation':
        setInput({ ...inputs, dateEndEducation: event.target.value });
        break;
      case 'locationEducation':
        setInput({ ...inputs, locationEducation: event.target.value });
        break;
      case 'descriptionEducation':
        setInput({ ...inputs, descriptionEducation: event.target.value });
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
    <form action="" id="education" onSubmit={(event) => preventSubmit(event, index)}>
      <label htmlFor="school">
        School:
        <input type="text" name="school" id="school" placeholder="University of Madeira" value={inputs.school} onChange={(event) => changeInput(event)} />
      </label>
      <label htmlFor="degree">
        Degree:
        <input type="text" name="degree" id="degree" placeholder="Bsc of Mathematics" value={inputs.degree} onChange={(event) => changeInput(event)} />
      </label>
      <label htmlFor="dateBeginEducation">
        Date:
        <input placeholder="From" type="text" name="dateBeginEducation" id="dateBeginEducation" value={inputs.dateBeginEducation} onChange={(event) => changeInput(event)} />
        <input placeholder="To" type="text" name="dateEndEducation" id="dateEndEducation" value={inputs.dateEndEducation} onChange={(event) => changeInput(event)} />
      </label>
      <label htmlFor="locationEducation">
        City:
        <input type="text" name="locationEducation" id="locationEducation" placeholder="Funchal, Madeira" value={inputs.locationEducation} onChange={(event) => changeInput(event)} />
      </label>
      <label htmlFor="descriptionEducation">
        Description:
        <input type="text" name="descriptionEducation" id="descriptionEducation" placeholder="e.g Understand and apply advanced mathematical concepts..." value={inputs.descriptionEducation} onChange={(event) => changeInput(event)} />
      </label>
      <div className="buttons">
        { ondelete !== undefined && <button type="button" className="delete" onClick={ondelete}>Delete</button>}
        <button type="button" className="cancel" onClick={onclose}>Cancel</button>
        <button type="submit" className="save">Save</button>
      </div>
    </form>
  );
}

function EducationLayer({
  studies, index, ondelete, onsubmit,
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
          {studies.degree}
          {' '}
          at
          {' '}
          {studies.school}
          <br />
          {' '}
          <span>
            {studies.dateBeginEducation}
            {' '}
            -
            {' '}
            {studies.dateEndEducation}
          </span>
        </h3>
        <svg onClick={changeStatus} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-edit-3">
          <path d="M12 20h9" />
          <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
        </svg>
      </div>
    ) : (<CreateEducationForm studies={studies} index={index} ondelete={closeDeletion} onsubmit={preventSubmit} onclose={changeStatus} />)
  );
}

function EducationStack({ education, setter }) {
  const [openform, setOpenForm] = useState(false);

  const openEducationForm = () => {
    setOpenForm(true);
  };

  const closeEducationForm = () => {
    setOpenForm(false);
  };

  const saveEducation = (event, index) => {
    event.preventDefault();
    setter([...education.slice(0, index), {
      school: event.target.elements.school.value,
      degree: event.target.elements.degree.value,
      dateBeginEducation: event.target.elements.dateBeginEducation.value,
      dateEndEducation: event.target.elements.dateEndEducation.value,
      locationEducation: event.target.elements.locationEducation.value,
      descriptionEducation: event.target.elements.descriptionEducation.value,
    }, ...education.slice(index + 1)]);
  };

  const deleteEducation = (index) => {
    setter([...education.slice(0, index), ...education.slice(index + 1)]);
  };

  return (

    <>
      <h2>Education</h2>

      <div className="stack">
        {education.map((studies, index) => (
          <EducationLayer key={index} studies={studies} index={index} ondelete={deleteEducation} onsubmit={saveEducation} />
        ))}
      </div>

      {openform && <CreateEducationForm index={education.length} onsubmit={saveEducation} onclose={closeEducationForm} />}

      <AddButton text="Add Education" action={openEducationForm} />

    </>
  );
}

function ResumeEducation({ education }) {
  return (
    <>
      <h1>Education</h1>
      {education.map((studies, index) => (
        <div className="cv-box" key={index}>
          <div className="cv-box-header">
            <h2>{studies.degree}</h2>
            <p className="date-cv">
              {studies.dateBeginEducation}
              {' '}
              -
              {' '}
              {studies.dateEndEducation}
            </p>
            <p className="location-cv">
              {studies.locationEducation}
              {' '}
              -
              {' '}
              {studies.school}
            </p>
          </div>
          <div className="cv-box-description">
            <p>
              {studies.descriptionEducation}
            </p>
          </div>
        </div>
      ))}
    </>
  );
}

export { EducationStack, ResumeEducation };
