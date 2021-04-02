import { useReducer, useCallback } from "react";

const initialState = {
  loading: false,
  error: null,
  data: null,
  extra: null,
  identifier: null,
};

const httpReducer = (currentHttpState, action) => {
  switch (action.type) {
    case "SEND":
      return {
        loading: true,
        error: null,
        data: null,
        extra: null,
        identifier: action.identifier,
      };
    case "RESPONSE":
      return {
        ...currentHttpState,
        loading: false,
        data: action.responseData,
        extra: action.extra,
      };
    case "ERROR":
      return { loading: false, error: action.errorMessage };
    case "CLEAR":
      return initialState;
    default:
      throw new Error("shouldnt reach here");
  }
};

const useHttp = () => {
  const [httpState, dispatchHttp] = useReducer(httpReducer, initialState);

  const clear = useCallback(() => dispatchHttp({ type: "CLEAR" }), []);

  const sendRequest = useCallback(
    (url, method, body, reqExtra, reqIdentifier) => {
      dispatchHttp({ type: "SEND", identifier: reqIdentifier });
      fetch(url, {
        method: method,
        body: body,
        headers: {
          "Context-Type": "application/json",
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((responseData) => {
          dispatchHttp({
            type: "RESPONSE",
            responseData: responseData,
            extra: reqExtra,
          });
        })
        .catch((error) => {
          //setError("Something Went Wrong!");
          //setIsLoading(false);
          dispatchHttp({
            type: "ERROR",
            errorMessage: "SOMETHING WENT WRONG !",
          });
        });
    },
    []
  );
  //can return anything i want
  return {
    isLoading: httpState.loading,
    data: httpState.data,
    error: httpState.error,
    sendRequest: sendRequest,
    reqExtra: httpState.extra,
    reqIdentifier: httpState.identifier,
    clear: clear,
  };
};

export default useHttp;
