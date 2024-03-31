import { useState, useEffect } from "react";
import Person from "./components/Person";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import personService from "./services/persons";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("a new contact...");
  const [newPhone, setNewPhone] = useState("123456789");
  const [filter, setFilter] = useState("");
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const addName = (event) => {
    event.preventDefault();
    const newPerson = {
      name: newName,
      number: newPhone,
    };

    const found = persons.find((person) => person.name === newPerson.name);
    if (!found) {
      personService.create(newPerson).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        setNewName("");
        setNewPhone("");
        setSuccessMessage(`Added '${newPerson.name}' `);
        setTimeout(() => {
          setSuccessMessage(null);
        }, 5000);
      });
    } else {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const updatedPerson = { ...found, number: newPhone };
        personService
          .update(updatedPerson.id, updatedPerson)
          .then((returnedUpdatedPerson) => {
            setPersons(persons.map((person) => (person.id !== found.id ? person : returnedUpdatedPerson)));
            setNewName("");
            setNewPhone("");
            setSuccessMessage(`Updated '${returnedUpdatedPerson.name}' `);
            setTimeout(() => {
              setSuccessMessage(null);
            }, 5000);
          })
          .catch((error) => {
            console.error("Error updating person:", error);
            // Maneja el error aquí, podrías mostrar un mensaje de error al usuario
          });
      }
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

  const handleDeletePerson = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .deletePerson(person.id)
        .then(() => {
          setPersons(persons.filter((p) => p.id !== person.id));
        })
        .catch((error) => {
          console.error("Error deleting person:", error);
        });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={successMessage} />
      <Filter filter={filter} handleChange={handleChangeFilter} />
      <h2>add a new</h2>
      <PersonForm addName={addName} newName={newName} newPhone={newPhone} handleChange={handleChange} />
      <h2>Numbers</h2>
      <ul>
        {persons
          .filter((person) => person.name.toLowerCase().includes(filter.toLowerCase()))
          .map((person) => (
            <li key={person.id}>
              <Person person={person} />
              <button onClick={() => handleDeletePerson(person)}>delete</button>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default App;
