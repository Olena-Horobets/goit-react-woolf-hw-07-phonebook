import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Filter from './Filter';
import Form from './Form';
import ContactsList from './ContactsList';

import { getAllContactsAction } from 'store/contacts/slice';
import { Loader } from './Loader';
import { selectIsLoading } from 'store/contacts/selectors';

function App() {
  const isLoading = useSelector(selectIsLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllContactsAction());
  }, [dispatch]);

  return (
    <div className="container">
      {isLoading && <Loader />}
      <Form />
      <Filter />
      <ContactsList />
    </div>
  );
}

export { App };
