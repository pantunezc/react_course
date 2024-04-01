// Country.js
import React, { useState } from "react";

const Country = ({ countryInfo }) => {
  const [selectedCountryIndex, setSelectedCountryIndex] = useState(null);

  const handleShowCountryDetails = (index) => {
    setSelectedCountryIndex(index);
  };

  return (
    <>
      {countryInfo && countryInfo.length > 10 ? (
        <p>Too many matches, please specify your search.</p>
      ) : countryInfo && countryInfo.length > 2 ? (
        <ul>
          {countryInfo.map((country, index) => (
            <li key={country.name.common}>
              {country.name.common}
              <button onClick={() => handleShowCountryDetails(index)}>Show</button>
            </li>
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

      {selectedCountryIndex !== null && countryInfo && countryInfo.length > 1 ? (
        <div>
          <h2>{countryInfo[selectedCountryIndex].name.common}</h2>
          <p>Capital: {countryInfo[selectedCountryIndex].capital}</p>
          <p>Area: {countryInfo[selectedCountryIndex].area}</p>
          <ul>
            {Object.keys(countryInfo[selectedCountryIndex].languages).map((languageCode) => {
              const languageName = countryInfo[selectedCountryIndex].languages[languageCode];
              return <li key={languageCode}>{languageName}</li>;
            })}
          </ul>
          <img src={countryInfo[selectedCountryIndex].flags.png} alt={countryInfo[selectedCountryIndex].flags.alt} />
        </div>
      ) : null}
    </>
  );
};

export default Country;
