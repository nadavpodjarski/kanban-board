import { combineReducers, createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { dndReducer, IDNDReducer, uiReducer, IUIState } from "./reducer";
import thunk from "redux-thunk";

export interface IState {
  dnd: IDNDReducer;
  ui: IUIState;
}

const rootReducer = combineReducers({
  dnd: dndReducer,
  ui: uiReducer,
});

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
