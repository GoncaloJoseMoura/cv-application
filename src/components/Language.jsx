function addLanguages(event, setter, data) {
  event.preventDefault();
  setter([...data, event.target.language.value]);
}

function deleteLanguage(event, setter, data) {
  const index = data.indexOf(event.target.textContent);
  setter([...data.slice(0, index), ...data.slice(index + 1)]);
}

function LanguagesStack({
  languages, setter,
}) {
  return (
    <>
      <h2>Languages</h2>
      <form action="" id="languages" onSubmit={(event) => addLanguages(event, setter, languages)}>
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
        {languages.map((language) => <button onClick={(event) => deleteLanguage(event, setter, languages)} type="button" key={language}>{language}</button>)}
      </div>
    </>
  );
}

function ResumeLanguages({ languages }) {
  return (
    <>
      <h2>Languages</h2>
      <ul>
        {languages.map((language, index) => <li key={index}>{language}</li>)}
      </ul>
    </>
  );
}

export { LanguagesStack, ResumeLanguages };
