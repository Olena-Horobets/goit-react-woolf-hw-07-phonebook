import axios from 'axios';

axios.defaults.baseURL = 'https://61ba061948df2f0017e5a8a2.mockapi.io/contacts';

export const getAllContacts = async () => {
  const { data } = await axios.get('/');
  return data;
};

export const addContact = async body => {
  const { data } = await axios.post('/', body);
  return data;
};

export const deleteContact = async id => {
  await axios.delete(`/${id}`);
  return id;
};
