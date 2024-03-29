import { useState } from "react";
import Person from "./components/Person";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", phone: "040-123456", id: 1 },
    { name: "Ada Lovelace", phone: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", phone: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", phone: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("a new contact...");
  const [newPhone, setNewPhone] = useState("123456789");
  const [filter, setFilter] = useState("");

  const addName = (event) => {
    event.preventDefault();
    const newPerson = {
      name: newName,
      phone: newPhone,
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
    const { name, value } = event.target;
    if (name === "newName") {
      setNewName(value);
    } else if (name === "newPhone") {
      setNewPhone(value);
    }
  };

  const handleChangeFilter = (event) => {
    const { value } = event.target;
    setFilter(value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <p>
        filtre shown with <input value={filter} onChange={handleChangeFilter} />
      </p>
      <h2>add a new</h2>
      <form onSubmit={addName}>
        <div>
          <p>
            name: <input value={newName} onChange={handleChange} name="newName" />
          </p>
          <p>
            number: <input value={newPhone} onChange={handleChange} name="newPhone" />
          </p>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons
          .filter((person) => person.name.toLowerCase().includes(filter.toLowerCase()))
          .map((person) => (
            <Person key={person.id} person={person} />
          ))}
      </ul>
    </div>
  );
};

export default App;
