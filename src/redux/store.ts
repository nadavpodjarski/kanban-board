import { combineReducers, createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { dndReducer, IDNDReducer } from "./reducer";
import thunk from "redux-thunk";

export interface IState {
  dnd: IDNDReducer;
}

const rootReducer = combineReducers({
  dnd: dndReducer,
});

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
