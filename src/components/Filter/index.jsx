import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from 'store/filter/slice';

function Filter() {
  const filter = useSelector(state => state.filter);
  const dispatch = useDispatch();

  const onSearch = e => dispatch(setFilter(e.currentTarget.value));

  return (
    <label htmlFor="filter">
      Search contacts by name
      <input
        id="filter"
        className="input"
        name="filter"
        type="text"
        value={filter}
        onChange={onSearch}
        autoComplete="off"
      ></input>
    </label>
  );
}

export default Filter;
