import { useReducer } from 'react';
import { initialState, searchReducer } from '../Reducer/SearchReducer';
import { address } from '../API/AddressAPI';

const useSearchFetch = () => {
  const [state, dispatch] = useReducer(searchReducer, initialState);

  const getAddress = async (keyword) => {
    dispatch({ type: 'LOADING' });
    try {
      const addressData = await address.getAddress(keyword);
      if (addressData.status === 200) {
        dispatch({
          type: 'ADDRESS',
          searchAddress: addressData.data.results.juso,
        });
      } else {
        dispatch({
          type: 'ERROR',
          error: {
            state: true,
            message: addressData.statusText,
          },
        });
      }
    } catch (error) {
      dispatch({
        type: 'ERROR',
        error: {
          state: true,
          message: error.message,
        },
      });
    }
  };

  const changeInput = (keyword) => {
    dispatch({
      type: 'INPUT',
      inputState: keyword,
    });
  };

  return [state, getAddress, changeInput];
};

export default useSearchFetch;
