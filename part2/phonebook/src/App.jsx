import { useState } from "react";
import Person from "./components/Person";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";

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
      setNewPhone("");
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
      <Filter filter={filter} handleChange={handleChangeFilter} />
      <h2>add a new</h2>
      <PersonForm addName={addName} newName={newName} newPhone={newPhone} handleChange={handleChange} />
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
