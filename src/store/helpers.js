export const handleFetchPending = state => {
  state.isLoading = true;
  state.error = '';
};

export const handleFetcFulfilled = state => {
  state.isLoading = false;
};

export const handleFetcRejected = (state, { error }) => {
  state.isLoading = false;
  state.error = error.message;
};
