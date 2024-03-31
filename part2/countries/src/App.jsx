import { useState, useEffect } from "react";
import countryService from "./services/countries";

function App() {
  const [countrySearch, setCountrySearch] = useState("");
  const [countries, setCountries] = useState([]);
  const [countryInfo, setCountryInfo] = useState(null);

  useEffect(() => {
    countryService.getAll().then((initialCountries) => {
      setCountries(initialCountries);
    });
  }, []);

  const handleCountrySearchChange = (event) => {
    setCountrySearch(event.target.value);

    const searchTerm = event.target.value.toLowerCase();
    if (searchTerm !== "") {
      const filteredCountries = countries.filter((country) => country.name.common.toLowerCase().includes(searchTerm));
      setCountryInfo(filteredCountries);
    } else {
      setCountryInfo(null); // Limpiar información de paises si la búsqueda está vacía
    }
  };

  return (
    <div>
      <h1>Countries data</h1>
      <p>
        find countries
        <input type="text" value={countrySearch} onChange={handleCountrySearchChange} />
      </p>
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
    </div>
  );
}

export default App;
