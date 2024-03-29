const PersonForm = ({ addName, newName, newPhone, handleChange }) => {
  return (
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
  );
};

export default PersonForm;
