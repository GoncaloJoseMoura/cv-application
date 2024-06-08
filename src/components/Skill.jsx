import AddButton from './utils';

function changeSkills(event, index, data, setter) {
  if (event.target.name == 'category') {
    setter([...data.slice(0, index), { ...data[index], category: event.target.value }, ...data.slice(index + 1)]);
  } else if (event.target.name == 'tools') {
    setter([...data.slice(0, index), { ...data[index], tools: event.target.value }, ...data.slice(index + 1)]);
  }
}

function deleteSkills(index, setter, data) {
  setter([...data.slice(0, index), ...data.slice(index + 1)]);
}

function addSkill(setter, data) {
  setter([...data, { category: '', tools: '' }]);
}

function SkillsStack({ skill, setter }) {
  return (
    <>
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
                <input type="text" name="category" id="category" placeholder="e.g Programming Languages" value={value.category} onChange={(event) => changeSkills(event, i, skill, setter)} />
                <input type="text" name="tools" id="tools" placeholder="e.g Python, SQL, Bash, HTML, CSS, Javascript" value={value.tools} onChange={(event) => changeSkills(event, i, skill, setter)} />
                <svg onClick={() => deleteSkills(i, setter, skill)} className="remove-skill" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="15" y1="9" x2="9" y2="15" />
                  <line x1="9" y1="9" x2="15" y2="15" />
                </svg>
              </li>
            ))}
          </ul>
        </form>
      </div>

      <AddButton text="Add Skill" action={() => addSkill(setter, skill)} />
    </>

  );
}

function ResumeSkills({ skill }) {
  return (
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
        </ul>
      </div>
    </div>
  );
}

export { SkillsStack, ResumeSkills };
