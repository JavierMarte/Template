import { createContext, useReducer, useContext } from "react";

const initialState = {
  linkSuccess: false,
  isItemAccess: true,
  isPaymentInitiation: false,
  linkToken: "", // Don't set to null or error message will show up briefly when site loads
  accessToken: null,
  itemId: null,
  isError: false,
  backend: true,
  products: ["transactions"],
  linkTokenError: {
    error_type: "",
    error_code: "",
    error_message: "",
  },
};

const QuickContext = createContext({
  ...initialState,
  setLinkSuccess: () => {},
  setItemAccess: () => {},
  setPaymentInitiation: () => {},
  setLinkToken: () => {},
  setAccessToken: () => {},
  setItemId: () => {},
  setError: () => {},
  setBackend: () => {},
  setProducts: () => {},
  setLinkTokenError: () => {},
});

export const useQuickContext = () => useContext(QuickContext);

export const QuickstartProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case "SET_LINK_SUCCESS":
        return { ...state, linkSuccess: action.payload };
      case "SET_ITEM_ACCESS":
        return { ...state, isItemAccess: action.payload };
      case "SET_PAYMENT_INITIATION":
        return { ...state, isPaymentInitiation: action.payload };
      case "SET_LINK_TOKEN":
        return { ...state, linkToken: action.payload };
      case "SET_ACCESS_TOKEN":
        return { ...state, accessToken: action.payload };
      case "SET_ITEM_ID":
        return { ...state, itemId: action.payload };
      case "SET_ERROR":
        return { ...state, isError: action.payload };
      case "SET_BACKEND":
        return { ...state, backend: action.payload };
      case "SET_PRODUCTS":
        return { ...state, products: action.payload };
      case "SET_LINK_TOKEN_ERROR":
        return { ...state, linkTokenError: action.payload };
      default:
        return state;
    }
  }, initialState);

  const setLinkSuccess = (linkSuccess) => {
    dispatch({ type: "SET_LINK_SUCCESS", payload: linkSuccess });
  };

  const setItemAccess = (itemAccess) => {
    dispatch({ type: "SET_ITEM_ACCESS", payload: itemAccess });
  };

  const setPaymentInitiation = (paymentInitiation) => {
    dispatch({ type: "SET_PAYMENT_INITIATION", payload: paymentInitiation });
  };

  const setLinkToken = (linkToken) => {
    dispatch({ type: "SET_LINK_TOKEN", payload: linkToken });
  };

  const setAccessToken = (accessToken) => {
    dispatch({ type: "SET_ACCESS_TOKEN", payload: accessToken });
  };

  const setItemId = (itemId) => {
    dispatch({ type: "SET_ITEM_ID", payload: itemId });
  };

  const setError = (error) => {
    dispatch({ type: "SET_ERROR", payload: error });
  };

  const setBackend = (backend) => {
    dispatch({ type: "SET_BACKEND", payload: backend });
  };

  const setProducts = (products) => {
    dispatch({ type: "SET_PRODUCTS", payload: products });
  };

  const setLinkTokenError = (linkTokenError) => {
    dispatch({ type: "SET_LINK_TOKEN_ERROR", payload: linkTokenError });
  };

  return (
    <QuickContext.Provider
      value={{
        ...state,
        dispatch,
        setLinkSuccess,
        setItemAccess,
        setPaymentInitiation,
        setLinkToken,
        setAccessToken,
        setItemId,
        setError,
        setBackend,
        setProducts,
        setLinkTokenError,
      }}
    >
      {children}
    </QuickContext.Provider>
  );
};

export default QuickContext;