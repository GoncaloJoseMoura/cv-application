import React, { useState } from "react";

import html2canvas from "html2canvas";
import jsPDF from "jspdf";

import {
  PersonalDetails,
  ResumePicture,
  ResumeIntro,
  ResumeContact,
} from "./components/PersonalDetails";
import { EducationStack, ResumeEducation } from "./components/Education";
import { EmploymentStack, ResumeEmployment } from "./components/Employment";
import { LanguagesStack, ResumeLanguages } from "./components/Language";
import { SkillsStack, ResumeSkills } from "./components/Skill";

import "./App.css";

function changeColor(event) {
  document
    .querySelector(":root")
    .style.setProperty("--resume-color", event.target.style.backgroundColor);
}

function handlePrint() {
  html2canvas(document.querySelector(".page")).then((canvas) => {
    const imgData = canvas.toDataURL("image/png"); // Convert canvas to image data
    const pdf = new jsPDF(); // Initialize jsPDF
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight); // Add image to PDF
    pdf.save("converted-document.pdf"); // Save PDF
  });
}

function App() {
  const [person, setPerson] = useState({
    firstName: "Jonathan",
    lastName: "Doe",
    email: "jonathan.doe@email.com",
    phone: "(555) 555-5555",
    address: "San Francisco, California",
    occupation: "Web Developer",
    linkedin: "https://linkedin.com/username",
    portfolio: "https://github.com/username",
    about:
      "Highly motivated and results-oriented Web Developer with 4 years of experience in building user-friendly and responsive web applications. Proven ability to design, develop, and implement web applications using a variety of programming languages and frameworks. Passionate about creating innovative and performant web experiences.",
  });
  const [selectedFile, setSelectedFile] = useState("/profile.jpg");

  const [experience, setExperience] = useState([
    {
      jobRole: "Web Developer",
      employer: "Acme Inc.",
      dateBegin: "10/2021",
      dateEnd: "Present",
      location: "San Diego, CA",
      description:
        "Designed and developed responsive websites and web applications using HTML, CSS, JavaScript, and React.js. Implemented backend functionality using Python and Django. Collaborated with designers and project managers to ensure on-time delivery of projects.",
    },
    {
      jobRole: "Junior Web Developer",
      employer: "Startup Inc.",
      dateBegin: "10/2020",
      dateEnd: "10/2021",
      location: "San Francisco, CA",
      description:
        "Developed and maintained web applications using HTML, CSS, and JavaScript. Troubleshooted and resolved bugs to ensure smooth website operation.",
    },
  ]);

  const [languages, setLanguages] = useState([
    "Portuguese",
    "Spanish",
    "Italian",
  ]);

  const [education, setEducation] = useState([
    {
      school: "University of California",
      degree: "Bsc. Computer Science",
      dateBeginEducation: "09/2018",
      dateEndEducation: "07/2021",
      locationEducation: "Berkeley, California",
      descriptionEducation:
        "Successfully completed a capstone project involving the design and development of a complex web application, demonstrating the ability to apply theoretical knowledge to real-world scenarios.",
    },
  ]);

  const [colors, setColors] = useState(false);

  const [skill, setSkills] = useState([
    { category: "Programming Languages", tools: "HTML, CSS, Javascript" },
    {
      category: "Cloud services",
      tools: "Amazon Web Services, Google Cloud Platform",
    },
    { category: "Web Technologies", tools: "React, Angular, Vue.js" },
    { category: "Databases", tools: "MySQL, PostgreSQL, MongoDB" },
  ]);

  console.log(skill);

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)" }}>
      <div
        className="editor"
        style={{
          backgroundColor: "white",
          width: "50vw",
          overflowY: "scroll",
          scrollbarWidth: "thin",
        }}
      >
        <h1>Resume builder</h1>

        <PersonalDetails
          person={person}
          setter={setPerson}
          picturesetter={setSelectedFile}
        />

        <EmploymentStack experience={experience} setter={setExperience} />

        <SkillsStack skill={skill} setter={setSkills} />

        <EducationStack education={education} setter={setEducation} />

        <LanguagesStack languages={languages} setter={setLanguages} />
      </div>

      <div
        className="resume"
        style={{
          backgroundColor: "grey",
          width: "50vw",
          height: "100vh",
          position: "fixed",
          right: "0",
        }}
      >
        <div id="download">
          <div className="colors">
            <button
              type="button"
              className="c-selector"
              aria-label="save"
              onClick={() => setColors(!colors)}
            />
            {colors && (
              <>
                <button
                  type="button"
                  className="color"
                  aria-label="save"
                  style={{ backgroundColor: "#323b4c" }}
                  onClick={changeColor}
                />
                <button
                  type="button"
                  className="color"
                  aria-label="save"
                  style={{ backgroundColor: "#4c3232" }}
                  onClick={changeColor}
                />
                <button
                  type="button"
                  className="color"
                  aria-label="save"
                  style={{ backgroundColor: "#324c35" }}
                  onClick={changeColor}
                />
                <button
                  type="button"
                  className="color"
                  aria-label="save"
                  style={{ backgroundColor: "#324c4c" }}
                  onClick={changeColor}
                />
                <button
                  type="button"
                  className="color"
                  aria-label="save"
                  style={{ backgroundColor: "#4c3249" }}
                  onClick={changeColor}
                />
              </>
            )}
          </div>
          <button
            className="download_pdf"
            type="button"
            aria-label="Save"
            onClick={handlePrint}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#ffffff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-download"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
          </button>
        </div>

        <div className="page" id="download-pdf">
          <div className="side">
            <ResumePicture file={selectedFile} />
            <div>
              <ResumeContact person={person} />
              {languages.length !== 0 && (
                <ResumeLanguages languages={languages} />
              )}
            </div>
          </div>

          <div className="main">
            <ResumeIntro person={person} />

            <div
              className="cv"
              style={{ overflowWrap: "break-word", maxWidth: "336px" }}
            >
              <ResumeEmployment experience={experience} />
              {skill.length !== 0 && <ResumeSkills skill={skill} />}
            </div>

            <div
              className="cv"
              style={{ overflowWrap: "break-word", maxWidth: "336px" }}
            >
              <ResumeEducation education={education} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
