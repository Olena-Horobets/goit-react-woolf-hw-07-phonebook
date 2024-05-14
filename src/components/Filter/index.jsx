import { useDispatch, useSelector } from 'react-redux';

import { setFilter, resetFilter } from 'store/filter/slice';
import { selectFilter } from 'store/filter/selectors';

function Filter() {
  const filter = useSelector(selectFilter);
  const dispatch = useDispatch();

  const onSearch = e => dispatch(setFilter(e.currentTarget.value));

  return (
    <div className="filterWrapper">
      <button
        className="clearBtn"
        type="button"
        onClick={() => dispatch(resetFilter())}
      >
        X
      </button>
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
    </div>
  );
}

export default Filter;
