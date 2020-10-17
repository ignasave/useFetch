export const dataFetchReducer = (state, action) => {
    switch (action.type) {
      case TYPES.FETCH_INIT:
        return {
          ...state,
          isLoading: true,
          isError: false
        };
      case TYPES.FETCH_SUCCESS:
        return {
          ...state,
          isLoading: false,
          isError: false,
          data: action.payload,
        };
      case TYPES.FETCH_FAILURE:
        return {
          ...state,
          isLoading: false,
          isError: true,
        };
      default:
        throw new Error();
    }
  };

export const TYPES = {
    FETCH_INIT : 'FETCH_INIT',
    FETCH_SUCCESS: 'FETCH_SUCCESS',
    FETCH_FAILURE: 'FETCH_FAILURE'
}