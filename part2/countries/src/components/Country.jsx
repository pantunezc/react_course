const Country = ({ countryInfo }) => {
  return (
    <>
      {countryInfo && countryInfo.length > 10 ? (
        <p>Too many matches, please specify your search.</p>
      ) : countryInfo && countryInfo.length > 2 ? (
        <ul>
          {countryInfo.map((country) => (
            <li key={country.name.common}>{country.name.common}</li>
          ))}
        </ul>
      ) : countryInfo && countryInfo.length === 1 ? (
        <div>
          <h2>{countryInfo[0].name.common}</h2>
          <p>Capital: {countryInfo[0].capital}</p>
          <p>Area: {countryInfo[0].area}</p>
          <ul>
            {Object.keys(countryInfo[0].languages).map((languageCode) => {
              const languageName = countryInfo[0].languages[languageCode];
              return <li key={languageCode}>{languageName}</li>;
            })}
          </ul>
          <img src={countryInfo[0].flags.png} alt={countryInfo[0].flags.alt} />
        </div>
      ) : null}
    </>
  );
};

export default Country;
