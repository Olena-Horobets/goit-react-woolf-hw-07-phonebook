function Filter({ searchValue, onSearch }) {
  return (
    <label htmlFor="filter">
      Search contacts by name
      <input
        id="filter"
        className="input"
        name="filter"
        type="text"
        value={searchValue}
        onChange={onSearch}
        autoComplete="off"
      ></input>
    </label>
  );
}

export default Filter;
