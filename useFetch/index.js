import { useState, useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';
import { dataFetchReducer, TYPES } from './reducer';

const axiosDataExtractionStrategy = async response => response.data

const useFetch = (
  initialRequest, 
  initialData = null, 
  dataExtractionStrategy = axiosDataExtractionStrategy) => {
  const [request, setRequest] = useState(initialRequest);
  const [state, dispatch] = useReducer(dataFetchReducer, {
    isLoading: true,
    isError: false,
    data: initialData
  });

  useEffect(() => {
    if (request) {
      let didCancel = false;
      const fetchData = async () => {
        dispatch({ type: TYPES.FETCH_INIT });
        try {
          const result = await request;
          const data = await dataExtractionStrategy(result);
          if (!didCancel)
            dispatch({ type: TYPES.FETCH_SUCCESS, payload: data });
        } catch (error) {
          if (!didCancel) dispatch({ type: TYPES.FETCH_FAILURE });
        }
      };
      fetchData();
      return () => {
        didCancel = true;
      };
    }
  }, [request, dataExtractionStrategy]);

  const setData = data => {
    dispatch({ type: TYPES.FETCH_SUCCESS, payload: data });
  }

  return [state, setRequest, setData]
};

useFetch.propTypes = {
  initialRequest: PropTypes.object
}

export default useFetch;