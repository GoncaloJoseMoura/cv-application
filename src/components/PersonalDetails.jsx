function changePicture(event, picturesetter) {
  if (event.target.files.length !== 0) {
    picturesetter(URL.createObjectURL(event.target.files[0]));
  }
}

function changeInfo(event, setter, data) {
  switch (event.target.id) {
    case 'firstName':
      setter({ ...data, firstName: event.target.value });
      break;
    case 'lastName':
      setter({ ...data, lastName: event.target.value });
      break;
    case 'email':
      setter({ ...data, email: event.target.value });
      break;
    case 'phone':
      setter({ ...data, phone: event.target.value });
      break;
    case 'address':
      setter({ ...data, address: event.target.value });
      break;
    case 'occupation':
      setter({ ...data, occupation: event.target.value });
      break;
    case 'linkedin':
      setter({ ...data, linkedin: event.target.value });
      break;
    case 'portfolio':
      setter({ ...data, portfolio: event.target.value });
      break;
    case 'about':
      setter({ ...data, about: event.target.value });
      break;
    default:
  }
}

function PersonalDetails({ person, setter, picturesetter }) {
  return (
    <>
      <h2>Personal Details</h2>
      <form action="" id="personalDetails">
        <label htmlFor="firstName">
          First name:
          <input type="text" name="firstName" id="firstName" placeholder="John" value={person.firstName} onChange={(event) => changeInfo(event, setter, person)} />
        </label>
        <label htmlFor="lastName">
          Last name:
          <input type="text" name="lastName" id="lastName" placeholder="Doe" value={person.lastName} onChange={(event) => changeInfo(event, setter, person)} />
        </label>
        <label htmlFor="email">
          Email:
          <input type="email" name="email" id="email" placeholder="john.doe@email.com" value={person.email} onChange={(event) => changeInfo(event, setter, person)} />
        </label>
        <label htmlFor="phone">
          Phone:
          <input type="tel" name="phone" id="phone" placeholder="(555) 555-5555" value={person.phone} onChange={(event) => changeInfo(event, setter, person)} />
        </label>
        <label htmlFor="address">
          Address:
          <input type="text" name="address" id="address" placeholder="Silicon Valley, California" value={person.address} onChange={(event) => changeInfo(event, setter, person)} />
        </label>
        <label htmlFor="occupation">
          Occupation:
          <input type="text" name="occupation" id="occupation" placeholder="Web Developer" value={person.occupation} onChange={(event) => changeInfo(event, setter, person)} />
        </label>
        <label htmlFor="linkedin">
          Linkedin:
          <input type="text" name="linkedin" id="linkedin" placeholder="https://linkedin.com/username" value={person.linkedin} onChange={(event) => changeInfo(event, setter, person)} />
        </label>
        <label htmlFor="portfolio">
          Portfolio:
          <input type="text" name="portfolio" id="portfolio" placeholder="https://github.com/username" value={person.portfolio} onChange={(event) => changeInfo(event, setter, person)} />
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
            onChange={(event) => changeInfo(event, setter, person)}
          />
        </label>
        <label htmlFor="file">
          Profile picture:
          <input type="file" id="file" name="file" accept="image/png, image/jpeg" onChange={(event) => changePicture(event, picturesetter, person)} />
        </label>

      </form>

    </>
  );
}

function ResumePicture({ file }) {
  return (
    <img
      src={file}
      alt=""
      style={{
        height: '140px',
        width: '140px',
        borderRadius: '50%',
        margin: '35px auto',
        objectFit: 'cover',
      }}
    />
  );
}

function ResumeIntro({ person }) {
  return (
    <>
      <h1>
        {person.firstName}
        <span>
          {' '}
          {person.lastName}
        </span>
      </h1>
      <h2>{person.occupation}</h2>
      <p style={{ maxWidth: '336px', overflowWrap: 'break-word', textAlign: 'justify' }}>{person.about}</p>
    </>
  );
}

function ResumeContact({ person }) {
  return (
    <>
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
        {person.linkedin.length != 0 && (
          <li>
            Linkedin
            <br />
            {' '}
            <span>{person.linkedin}</span>
          </li>
        )}
        {person.portfolio.length != 0 && (
          <li>
            Portfolio
            <br />
            {' '}
            <span>{person.portfolio}</span>
          </li>
        )}

      </ul>
    </>
  );
}

export {
  PersonalDetails, ResumePicture, ResumeIntro, ResumeContact,
};
