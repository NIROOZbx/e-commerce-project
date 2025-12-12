import { useReducer } from "react";
import { Spinner } from "./ui/spinner";
import { cn } from "@/lib/utils";

function reducer(state, action) {
  switch (action.type) {
    case 'GET_NAME':
      return { ...state, name: action.payload };
    case 'GET_NUMBER':
      return { ...state, number: action.payload };
    case 'GET_PINCODE':
      return { ...state, pincode: action.payload };
    case 'GET_STATE':
      return { ...state, State: action.payload };
    case 'GET_ADDRESS':
      return { ...state, address: action.payload };
    case 'GET_CITY':
      return { ...state, city: action.payload };
    case 'GET_COUNTRY':
      return { ...state, country: action.payload };
    case 'RESET':
      return initialValue;
    default:
      return state;
  }
}

const initialValue = {
  name: "",
  number: "",
  pincode: "",
  State: "",
  address: "",
  city: "",
  country: ""
};

export default function AddAddressModal({ show, onClose, onSubmit, title, formLoading }) {
  const [value, dispatch] = useReducer(reducer, initialValue);

  if (!show) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-4 sm:px-6"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-xl shadow-lg w-full max-w-md sm:max-w-lg mx-auto"
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit(value); 
            dispatch({ type: "RESET" });
          }}
          className="p-6 sm:p-8"
        >
          <p className="text-center font-bold text-xl mb-6">{title}</p>

          <div className="flex flex-col gap-4 sm:gap-6 details-shipping">
            <input
              value={value.name}
              onChange={(e) => dispatch({ type: "GET_NAME", payload: e.target.value })}
              type="text"
              className="p-3 rounded-lg focus:ring-2 outline-none w-full"
              placeholder="Enter your name"
              required
            />

            <input
              value={value.number}
              onChange={(e) => dispatch({ type: "GET_NUMBER", payload: e.target.value })}
              type="tel"
              pattern="[0-9]{10}"
              maxLength="10"
              className="p-3 rounded-lg focus:ring-2 outline-none w-full"
              placeholder="Enter your number"
              required
            />

            {/* Pincode & State */}
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                value={value.pincode}
                onChange={(e) => dispatch({ type: "GET_PINCODE", payload: e.target.value })}
                type="text"
                maxLength="6"
                className="p-3 rounded-lg outline-none flex-1 w-full"
                placeholder="Pincode"
                required
              />
              <input
                value={value.State}
                onChange={(e) => dispatch({ type: "GET_STATE", payload: e.target.value })}
                type="text"
                className="p-3 rounded-lg outline-none flex-1 w-full"
                placeholder="State"
                required
              />
            </div>

            <input
              value={value.address}
              onChange={(e) => dispatch({ type: "GET_ADDRESS", payload: e.target.value })}
              type="text"
              className="p-3 rounded-lg outline-none w-full"
              placeholder="Enter your address"
              required
            />

            <input
              value={value.city}
              onChange={(e) => dispatch({ type: "GET_CITY", payload: e.target.value })}
              type="text"
              className="p-3 rounded-lg outline-none w-full"
              placeholder="Enter your city"
              required
            />

            <input
              value={value.country}
              onChange={(e) => dispatch({ type: "GET_COUNTRY", payload: e.target.value })}
              type="text"
              className="p-3 rounded-lg outline-none w-full"
              placeholder="Enter your country"
              required
            />

            <button
              type="submit"
              className="bg-black text-white font-bold rounded-lg py-3 w-full flex justify-center items-center gap-2"
            >
              {formLoading ? (
                <>
                  Submitting ...
                  <Spinner className="animate-spin" />
                </>
              ) : (
                "Submit"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
