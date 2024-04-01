import { useState, useEffect } from "react";
import countryService from "./services/countries";
import Country from "./components/Country";

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
      <Country countryInfo={countryInfo} />
    </div>
  );
}

export default App;
