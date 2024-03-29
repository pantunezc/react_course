import { useState } from "react";
import Person from "./components/Person";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas", id: 1 }]);
  const [newName, setNewName] = useState("a new number...");

  const addName = (event) => {
    event.preventDefault();
    const newPerson = {
      name: newName,
      id: persons.length + 1,
    };

    const found = persons.find((person) => person.name === newPerson.name);
    if (!found) {
      setPersons([...persons, newPerson]);
      setNewName("");
    } else {
      alert(`${newPerson.name} is already added to phonebook`);
    }
  };

  const handleChange = (event) => {
    setNewName(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map((person) => (
          <Person key={person.id} person={person} />
        ))}
      </ul>
    </div>
  );
};

export default App;
