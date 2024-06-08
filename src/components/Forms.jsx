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

export { CreateEducationForm, CreateEmploymentForm };
