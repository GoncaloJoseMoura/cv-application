import React, { useState } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

import './App.css';

function changeColor(event) {
  document.querySelector(':root').style.setProperty('--resume-color', event.target.style.backgroundColor);
  // console.log(event.target.style.backgroundColor);
}

function handlePrint() {
  html2canvas(document.querySelector('.page')).then((canvas) => {
    const imgData = canvas.toDataURL('image/png'); // Convert canvas to image data
    const pdf = new jsPDF(); // Initialize jsPDF
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight); // Add image to PDF
    pdf.save('converted-document.pdf'); // Save PDF
  });
}

function ResumeLanguages({ languages }) {
  return (
    languages.map((language, index) => <li key={index}>{language}</li>)
  );
}

function ResumeEmployment({ experience }) {
  return (
    experience.map((work, index) => (
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
    )));
}

function ResumeEducation({ education }) {
  return (
    education.map((studies, index) => (
      <div className="cv-box" key={index}>
        <div className="cv-box-header">
          <h2>{studies.degree}</h2>
          <p className="date-cv">
            {studies.dateBegin}
            {' '}
            -
            {' '}
            {studies.dateEnd}
          </p>
          <p className="location-cv">
            {studies.location}
            {' '}
            -
            {' '}
            {studies.school}
          </p>
        </div>
        <div className="cv-box-description">
          <p>
            {studies.description}
          </p>
        </div>
      </div>
    )));
}

function EducationStack({
  studies = {
    school: '', degree: '', dateBegin: '', dateEnd: '', location: '', description: '',
  }, index, ondelete, onsubmit,
}) {
  const [status, setStatus] = useState(true);
  const [inputs, setInput] = useState(studies);

  function changeStatus() {
    setStatus(!status);
  }

  function changeInput(event) {
    switch (event.target.name) {
      case 'school':
        setInput({ ...inputs, school: event.target.value });
        break;
      case 'degree':
        setInput({ ...inputs, degree: event.target.value });
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
    event.preventDefault();
    onsubmit(event, index);
    changeStatus();
  }

  function closeDeletion() {
    ondelete(index);
    changeStatus();
  }

  return (
    status ? (
      <div className="employment-layer" key={index}>
        <h3>
          {studies.degree}
          {' '}
          at
          {' '}
          {studies.school}
          <br />
          {' '}
          <span>
            {studies.dateBegin}
            {' '}
            -
            {' '}
            {studies.dateEnd}
          </span>
        </h3>
        <svg onClick={changeStatus} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-edit-3">
          <path d="M12 20h9" />
          <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
        </svg>
      </div>
    ) : (
      <form action="" id="education" onSubmit={(event) => preventSubmit(event, index)}>
        <label htmlFor="school">
          School:
          <input type="text" name="school" id="school" placeholder="University of Madeira" value={inputs.school} onChange={(event) => changeInput(event)} />
        </label>
        <label htmlFor="degree">
          Degree:
          <input type="text" name="degree" id="degree" placeholder="Bsc of Mathematics" value={inputs.degree} onChange={(event) => changeInput(event)} />
        </label>
        <label htmlFor="date">
          Date:
          <input placeholder="From" type="text" name="dateBegin" id="dateBegin" value={inputs.dateBegin} onChange={(event) => changeInput(event)} />
          <input placeholder="To" type="text" name="dateEnd" id="dateEnd" value={inputs.dateEnd} onChange={(event) => changeInput(event)} />
        </label>
        <label htmlFor="location">
          City:
          <input type="text" name="location" id="location" placeholder="Funchal, Madeira" value={inputs.location} onChange={(event) => changeInput(event)} />
        </label>
        <label htmlFor="description">
          Description:
          <input type="text" name="description" id="description" placeholder="e.g Understand and apply advanced mathematical concepts..." value={inputs.description} onChange={(event) => changeInput(event)} />
        </label>
        <div className="buttons">
          <button type="button" className="delete" onClick={closeDeletion}>Delete</button>
          <button type="button" className="cancel" onClick={changeStatus}>Cancel</button>
          <button type="submit" className="save">Save</button>
        </div>
      </form>
    ));
}

function CreateEducationForm({ index, closeform, onsubmit }) {
  function preventSubmit(event) {
    event.preventDefault();
    onsubmit(event, index);
    closeform();
  }

  return (
    <form action="" id="education" onSubmit={(event) => preventSubmit(event, index)}>
      <label htmlFor="school">
        School:
        <input type="text" name="school" id="school" placeholder="University of Madeira" />
      </label>
      <label htmlFor="degree">
        Degree:
        <input type="text" name="degree" id="degree" placeholder="Bsc of Mathematics" />
      </label>
      <label htmlFor="date">
        Date:
        <input placeholder="From" type="text" name="dateBegin" id="dateBegin" />
        <input placeholder="To" type="text" name="dateEnd" id="dateEnd" />
      </label>
      <label htmlFor="location">
        City:
        <input type="text" name="location" id="location" placeholder="Funchal, Madeira" />
      </label>
      <label htmlFor="description">
        Description:
        <textarea rows={4} type="text" name="description" id="description" placeholder="e.g Understand and apply advanced mathematical concepts..." />
      </label>
      <div className="buttons">
        <button type="button" className="cancel" onClick={closeform}>Cancel</button>
        <button type="submit" className="save">Save</button>
      </div>
    </form>
  );
}

function CreateEmploymentForm({ index, closeform, onsubmit }) {
  function preventSubmit(event) {
    event.preventDefault();
    onsubmit(event, index);
    closeform();
  }

  return (
    <form action="" id="employmentHistory" onSubmit={(event) => preventSubmit(event, index)}>

      <label htmlFor="jobRole">
        Job role:
        <input type="text" name="jobRole" id="jobRole" placeholder="Data Scientist" />
      </label>
      <label htmlFor="employer">
        Employer:
        <input type="text" name="employer" id="employer" placeholder="Company" />
      </label>
      <label htmlFor="date">
        Date:
        <input placeholder="From" name="dateBegin" type="text" id="dateBegin" />
        <input placeholder="To" name="dateEnd" type="text" id="dateEnd" />
      </label>
      <label htmlFor="location">
        Location:
        <input type="text" name="location" id="location" placeholder="Lisbon, Portugal" />
      </label>
      <label htmlFor="description">
        Description:
        <textarea rows={4} type="text" name="description" id="description" placeholder="Played a key role in building online fraud detectors for clients in the S&P 500..." />
      </label>
      <div className="buttons">
        <button type="button" className="cancel" onClick={closeform}>Cancel</button>
        <button type="submit" className="save">Save</button>
      </div>
    </form>
  );
}

function EmploymentStack({
  work = {
    jobRole: '', employer: '', dateBegin: '', dateEnd: '', location: '', description: '',
  }, index, ondelete, onsubmit,
}) {
  const [status, setStatus] = useState(true);
  const [inputs, setInput] = useState(work);

  function changeStatus() {
    setStatus(!status);
  }

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
    event.preventDefault();
    onsubmit(event, index);
    changeStatus();
  }

  function closeDeletion() {
    ondelete(index);
    changeStatus();
  }

  return (
    status ? (
      <div className="employment-layer" key={index}>
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
    ) : (
      <form action="" id="employmentHistory" onSubmit={(event) => preventSubmit(event)}>

        <label htmlFor="jobRole">
          Job role:
          <input type="text" name="jobRole" id="jobRole" placeholder="Data Scientist" value={inputs.jobRole} onChange={(event) => changeInput(event)} />
        </label>
        <label htmlFor="employer">
          Employer:
          <input type="text" name="employer" id="employer" placeholder="Company" value={inputs.employer} onChange={(event) => changeInput(event)} />
        </label>
        <label htmlFor="date">
          Date:
          <input placeholder="From" name="dateBegin" type="text" id="date" value={inputs.dateBegin} onChange={(event) => changeInput(event)} />
          <input placeholder="To" name="dateEnd" type="text" value={inputs.dateEnd} onChange={(event) => changeInput(event)} />
        </label>
        <label htmlFor="location">
          Location:
          <input type="text" name="location" id="location" placeholder="Lisbon, Portugal" value={inputs.location} onChange={(event) => changeInput(event)} />
        </label>
        <label htmlFor="description">
          Description:
          <input type="text" name="description" id="description" placeholder="Played a key role in building online fraud detectors for clients in the S&P 500..." value={inputs.description} onChange={(event) => changeInput(event)} />
        </label>
        <div className="buttons">
          <button type="button" className="delete" onClick={closeDeletion}>Delete</button>
          <button type="button" className="cancel" onClick={changeStatus}>Cancel</button>
          <button type="submit" className="save">Save</button>
        </div>
      </form>

    ));
}

function PersonalDetails({ person, onChange, changepicture }) {
  return (
    <>
      <h2>Personal Details</h2>
      <form action="" id="personalDetails">
        <label htmlFor="firstName">
          First name:
          <input type="text" name="firstName" id="firstName" placeholder="John" value={person.firstName} onChange={onChange} />
        </label>
        <label htmlFor="lastName">
          Last name:
          <input type="text" name="lastName" id="lastName" placeholder="Doe" value={person.lastName} onChange={onChange} />
        </label>
        <label htmlFor="email">
          Email:
          <input type="email" name="email" id="email" placeholder="john.doe@email.com" value={person.email} onChange={onChange} />
        </label>
        <label htmlFor="phone">
          Phone:
          <input type="tel" name="phone" id="phone" placeholder="(555) 555-5555" value={person.phone} onChange={onChange} />
        </label>
        <label htmlFor="address">
          Address:
          <input type="text" name="address" id="address" placeholder="Silicon Valley, California" value={person.address} onChange={onChange} />
        </label>
        <label htmlFor="occupation">
          Occupation:
          <input type="text" name="occupation" id="occupation" placeholder="Web Developer" value={person.occupation} onChange={onChange} />
        </label>
        <label htmlFor="linkedin">
          Linkedin:
          <input type="text" name="linkedin" id="linkedin" placeholder="https://linkedin.com/username" value={person.linkedin} onChange={onChange} />
        </label>
        <label htmlFor="portfolio">
          Portfolio:
          <input type="text" name="portfolio" id="portfolio" placeholder="https://github.com/username" value={person.portfolio} onChange={onChange} />
        </label>
        <label htmlFor="about">
          About:
          <textarea
            rows={4}
            type="text"
            name="about"
            id="about"
            placeholder="e.g Proven ability to design, develop, and implement web applications using a variety of programming languages and frameworks ..."
            value={person.about}
            onChange={onChange}
          />
        </label>
        <label htmlFor="file">
          Profile picture:
          <input type="file" id="file" name="file" accept="image/png, image/jpeg" onChange={(event) => changepicture(event)} />
        </label>

      </form>

    </>
  );
}

function App() {
  const [person, setPerson] = useState({
    firstName: 'Jonathan', lastName: 'Doe', email: 'jonathan.doe@email.com', phone: '(555) 555-5555', address: 'San Francisco, California', occupation: 'Web Developer', linkedin: 'https://linkedin.com/username', portfolio: 'https://github.com/username', about: 'Highly motivated and results-oriented Web Developer with 4 years of experience in building user-friendly and responsive web applications. Proven ability to design, develop, and implement web applications using a variety of programming languages and frameworks. Passionate about creating innovative and performant web experiences.',
  });
  const [selectedFile, setSelectedFile] = useState('/profile.jpg');

  const [experience, setExperience] = useState([{
    jobRole: 'Web Developer', employer: 'Acme Inc.', dateBegin: '10/2021', dateEnd: 'Present', location: 'San Diego, CA', description: 'Designed and developed responsive websites and web applications using HTML, CSS, JavaScript, and React.js. Implemented backend functionality using Python and Django. Collaborated with designers and project managers to ensure on-time delivery of projects.',
  },
  {
    jobRole: 'Junior Web Developer', employer: 'Startup Inc.', dateBegin: '10/2020', dateEnd: '10/2021', location: 'San Francisco, CA', description: 'Developed and maintained web applications using HTML, CSS, and JavaScript. Troubleshooted and resolved bugs to ensure smooth website operation.',
  }]);

  const [languages, setLanguages] = useState(['Portuguese', 'Spanish', 'Italian']);
  const [employmentForm, setEmploymentForm] = useState(false);
  const [educationForm, setEducationForm] = useState(false);

  const [education, setEducation] = useState([
    {
      school: 'University of California', degree: 'Bsc. Computer Science', dateBegin: '09/2018', dateEnd: '07/2021', location: 'Berkeley, California', description: 'Successfully completed a capstone project involving the design and development of a complex web application, demonstrating the ability to apply theoretical knowledge to real-world scenarios.',
    },
  ]);

  const [colors, setColors] = useState(false);

  const [skill, setSkills] = useState([{ category: 'Programming Languages', tools: 'HTML, CSS, Javascript' }, { category: 'Cloud services', tools: 'Amazon Web Services, Google Cloud Platform' }, { category: 'Web Technologies', tools: 'React, Angular, Vue.js' }, { category: 'Databases', tools: 'MySQL, PostgreSQL, MongoDB' }]);

  const changePicture = (event) => {
    console.log(event.target.files);
    if (event.target.files.length !== 0) {
      setSelectedFile(URL.createObjectURL(event.target.files[0]));
    }
  };

  const saveEducation = (event, index) => {
    event.preventDefault();
    console.log(event.target.elements);
    setEducation([...education.slice(0, index), {
      school: event.target.elements.school.value,
      degree: event.target.elements.degree.value,
      dateBegin: event.target.elements.dateBegin.value,
      dateEnd: event.target.elements.dateEnd.value,
      location: event.target.elements.location.value,
      description: event.target.elements.description.value,
    }, ...education.slice(index + 1)]);
  };

  const deleteEducation = (index) => {
    setEducation([...education.slice(0, index), ...education.slice(index + 1)]);
  };

  const closeEducationForm = () => {
    setEducationForm(false);
  };

  const openEducationForm = () => {
    setEducationForm(true);
  };

  const changeInfo = (e) => {
    switch (e.target.id) {
      case 'firstName':
        setPerson({ ...person, firstName: e.target.value });
        break;
      case 'lastName':
        setPerson({ ...person, lastName: e.target.value });
        break;
      case 'email':
        setPerson({ ...person, email: e.target.value });
        break;
      case 'phone':
        setPerson({ ...person, phone: e.target.value });
        break;
      case 'address':
        setPerson({ ...person, address: e.target.value });
        break;
      case 'occupation':
        setPerson({ ...person, occupation: e.target.value });
        break;
      case 'linkedin':
        setPerson({ ...person, linkedin: e.target.value });
        break;
      case 'portfolio':
        setPerson({ ...person, portfolio: e.target.value });
        break;
      case 'about':
        setPerson({ ...person, about: e.target.value });
        break;
      default:
    }
  };

  const deleteExperience = (index) => {
    setExperience([...experience.slice(0, index), ...experience.slice(index + 1)]);
  };

  const addLanguages = (event) => {
    event.preventDefault();
    setLanguages([...languages, event.target.language.value]);
  };

  const deleteLanguage = (event) => {
    const index = languages.indexOf(event.target.textContent);
    setLanguages([...languages.slice(0, index), ...languages.slice(index + 1)]);
  };

  const saveEmployment = (event, index) => {
    event.preventDefault();
    setExperience([...experience.slice(0, index), {
      jobRole: event.target.elements.jobRole.value,
      employer: event.target.elements.employer.value,
      dateBegin: event.target.elements.dateBegin.value,
      dateEnd: event.target.elements.dateEnd.value,
      location: event.target.elements.location.value,
      description: event.target.elements.description.value,
    }, ...experience.slice(index + 1)]);
  };

  const closeEmploymentForm = () => {
    setEmploymentForm(false);
  };

  const openEmploymentForm = () => {
    setEmploymentForm(true);
  };

  const changeSkills = (event, index) => {
    if (event.target.name == 'category') {
      setSkills([...skill.slice(0, index), { ...skill[index], category: event.target.value }, ...skill.slice(index + 1)]);
    } else if (event.target.name == 'tools') {
      setSkills([...skill.slice(0, index), { ...skill[index], tools: event.target.value }, ...skill.slice(index + 1)]);
    }
  };

  const deleteSkills = (index) => {
    setSkills([...skill.slice(0, index), ...skill.slice(index + 1)]);
  };

  const addSkill = () => {
    setSkills([...skill, { category: '', tools: '' }]);
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)' }}>
      <div
        className="editor"
        style={{
          backgroundColor: 'white', width: '50vw', overflowY: 'scroll', scrollbarWidth: 'thin',
        }}
      >
        <h1>Resume builder</h1>

        <PersonalDetails person={person} onChange={changeInfo} changepicture={changePicture} />

        <h2>Employment History</h2>

        <div className="stack">

          {experience.map((work, index) => (
            <EmploymentStack
              key={index}
              work={work}
              index={index}
              ondelete={deleteExperience}
              onsubmit={saveEmployment}
            />
          ))}

        </div>

        {employmentForm && (
        <CreateEmploymentForm
          index={experience.length}
          closeform={closeEmploymentForm}
          onsubmit={saveEmployment}
        />
        )}

        <div className="add" onClick={openEmploymentForm}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-plus">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          <p>Add Employment</p>
        </div>

        <h2>Skills</h2>

        <div className="stack">
          <form action="" id="skills">
            <ul>
              <li style={{ color: '#abc4ff' }}>
                Categories:
                <span>Skills:</span>
              </li>
              {skill.map((value, i) => (
                <li key={i}>
                  <input type="text" name="category" id="category" placeholder="e.g Programming Languages" value={value.category} onChange={(event) => changeSkills(event, i)} />
                  <input type="text" name="tools" id="tools" placeholder="e.g Python, SQL, Bash, HTML, CSS, Javascript" value={value.tools} onChange={(event) => changeSkills(event, i)} />
                  <svg onClick={() => deleteSkills(i)} className="remove-skill" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="15" y1="9" x2="9" y2="15" />
                    <line x1="9" y1="9" x2="15" y2="15" />
                  </svg>
                </li>
              ))}
              {/* <li>
                <input type="text" name="category" id="category" placeholder="e.g Programming Languages" />
                <input type="text" name="skill" id="skill" placeholder="e.g Python, SQL, Bash, HTML, CSS, Javascript" />
                <svg className="remove-skill" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="15" y1="9" x2="9" y2="15" />
                  <line x1="9" y1="9" x2="15" y2="15" />
                </svg>
              </li>
              <li>
                <input type="text" name="category" id="category" placeholder="e.g Programming Languages" />
                <input type="text" name="skill" id="skill" placeholder="e.g Python, SQL, Bash, HTML, CSS, Javascript" />
                <svg className="remove-skill" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="15" y1="9" x2="9" y2="15" />
                  <line x1="9" y1="9" x2="15" y2="15" />
                </svg>
              </li>
              <li>
                <input type="text" name="category" id="category" placeholder="e.g Programming Languages" />
                <input type="text" name="skill" id="skill" placeholder="e.g Python, SQL, Bash, HTML, CSS, Javascript" />
                <svg className="remove-skill" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="15" y1="9" x2="9" y2="15" />
                  <line x1="9" y1="9" x2="15" y2="15" />
                </svg>
              </li> */}
            </ul>
          </form>
        </div>

        <div className="add" onClick={addSkill}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-plus">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          <p>Add Skill</p>
        </div>

        {/* <form action="" id="skills">
          <input type="text" name="skill" id="skill" placeholder="e.g Python..." maxLength="20ch" />
          <button
            type="button"
            aria-label="Save"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-corner-down-left">
              <polyline points="9 10 4 15 9 20" />
              <path d="M20 4v7a4 4 0 0 1-4 4H4" />
            </svg>
          </button>
        </form> */}
        {/*
        <div id="skillPool">
          <button type="button">
            Python
          </button>
          <button type="button">
            Javascript
          </button>
          <button type="button">
            Html
          </button>
          <button type="button">
            Css
          </button>
        </div> */}

        <h2>Education</h2>

        <div className="stack">

          {education.map((studies, index) => <EducationStack key={index} studies={studies} index={index} ondelete={deleteEducation} onsubmit={saveEducation} />)}

        </div>

        {educationForm && <CreateEducationForm index={education.length} closeform={closeEducationForm} onsubmit={saveEducation} />}

        <div className="add" onClick={openEducationForm}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-plus">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          <p>Add Education</p>
        </div>

        <h2>Languages</h2>
        <form action="" id="languages" onSubmit={(event) => addLanguages(event)}>
          <input type="text" name="language" id="language" placeholder="e.g Portuguese..." maxLength="20ch" />
          <button
            type="button"
            aria-label="Save"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-corner-down-left">
              <polyline points="9 10 4 15 9 20" />
              <path d="M20 4v7a4 4 0 0 1-4 4H4" />
            </svg>
          </button>
        </form>

        <div id="languagePool">
          {languages.map((language) => <button onClick={(event) => deleteLanguage(event)} type="button" key={language}>{language}</button>)}
        </div>

      </div>

      <div
        className="resume"
        style={{
          backgroundColor: 'grey', width: '50vw', height: '100vh', position: 'fixed', right: '0',
        }}
      >
        <div id="download">
          <div className="colors">
            <button type="button" className="color c-selector" aria-label="save" onClick={() => setColors(!colors)} />
            {colors
            && (
            <>
              <button type="button" className="color" aria-label="save" style={{ backgroundColor: '#323b4c' }} onClick={changeColor} />
              <button type="button" className="color" aria-label="save" style={{ backgroundColor: '#4c3232' }} onClick={changeColor} />
              <button type="button" className="color" aria-label="save" style={{ backgroundColor: '#324c35' }} onClick={changeColor} />
              <button type="button" className="color" aria-label="save" style={{ backgroundColor: '#324c4c' }} onClick={changeColor} />
              <button type="button" className="color" aria-label="save" style={{ backgroundColor: '#4c3249' }} onClick={changeColor} />
            </>
            )}
          </div>
          <button className="download_pdf" type="button" aria-label="Save" onClick={handlePrint}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-download">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
          </button>
        </div>

        <div className="page" id="download-pdf">
          <div className="side">
            <img
              src={selectedFile}
              alt=""
              style={{
                height: '140px',
                width: '140px',
                borderRadius: '50%',
                margin: '35px auto',
                objectFit: 'cover',
              }}
            />
            <div>
              <h2>Contact</h2>
              <ul>
                <li>
                  Address
                  <br />
                  {' '}
                  <span>{person.address}</span>
                </li>
                <li>
                  Phone
                  <br />
                  {' '}
                  <span>{person.phone}</span>
                </li>
                <li>
                  Email
                  <br />
                  {' '}
                  <span>{person.email}</span>
                </li>
                <li>
                  Linkedin
                  <br />
                  {' '}
                  <span>{person.linkedin}</span>
                </li>
                <li>
                  Portfolio
                  <br />
                  {' '}
                  <span>{person.portfolio}</span>
                </li>
              </ul>
              <h2>Languages</h2>
              <ul>
                <ResumeLanguages languages={languages} />
              </ul>
            </div>
          </div>

          <div className="main">
            <h1>
              {person.firstName}
              <span>
                {' '}
                {person.lastName}
              </span>
            </h1>
            <h2>{person.occupation}</h2>
            <p style={{ maxWidth: '336px', overflowWrap: 'break-word', textAlign: 'justify' }}>{person.about}</p>

            <div className="cv" style={{ overflowWrap: 'break-word', maxWidth: '336px' }}>
              <h1>Employment History</h1>
              <ResumeEmployment experience={experience} />

              <div>
                <div className="cv-box">
                  <div className="cv-box-header">
                    <h2>Skills</h2>
                  </div>
                  <div className="cv-box-skills">
                    <ul>
                      {skill.map((value, index) => (
                        <li key={index}>
                          {value.category}
                          <span>{value.tools}</span>
                        </li>
                      ))}
                      {/* <li>
                        Programming Languages
                        <span>Python, SQL, Bash, HTML, CSS, Javascript</span>
                      </li>
                      <li>
                        Cloud services
                        <span>AWS (Amazon Web Services), Snowflake</span>
                      </li>
                      <li>
                        Data Visualisation
                        <span>Matplotlib, Seaborn</span>
                      </li>
                      <li>
                        Natural Language Processing
                        <span>NLTK, spaCy, HugginFace</span>
                      </li> */}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="cv" style={{ overflowWrap: 'break-word', maxWidth: '336px' }}>
              <h1>Education</h1>
              <ResumeEducation education={education} />
            </div>

          </div>
        </div>

      </div>
    </div>

  );
}

export default App;
