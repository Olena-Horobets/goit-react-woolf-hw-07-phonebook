import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import Filter from './Filter';
import Form from './Form';
import ContactsList from './ContactsList';

import { getAllContactsAction } from 'store/contacts/slice';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllContactsAction());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container">
      <Form />
      <Filter />
      <ContactsList />
    </div>
  );
}

export { App };
