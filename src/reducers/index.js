import { createReducer } from "redux-act";
import { setup, updateVal, addOption } from "../actions";
import data from "../data";

const DEFAULTS = {
  question: "КАКИЕ ЖИВОТНЫЕ У ВАС ЕСТЬ?",
  options: data,
  initVal: 19,
  error: {
    number: "Can not find any options for this number. Try to change that number or use the checkboxes."
  }
};

const findLastId = array => {
  const lastId = array.sort((a, b) => b.id - a.id)[0].id;
  return lastId + 1;
};

const reducer = createReducer(
  {
    [setup]: (state) => ({
      ...state
    }),
    [updateVal]: (state, payload) => ({
      ...state,
      initVal: payload
    }),
    [addOption]: (state, payload) => ({
      ...state,
      options: [
        ...state.options,
        {
          name: payload,
          id: findLastId(state.options)
        }
      ]
    })
  },
  DEFAULTS
);

export default reducer;
