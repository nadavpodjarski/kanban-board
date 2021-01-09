import { combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { appReducer, IAPPState, uiReducer, IUIState } from "./reducer";

export interface IState {
  app: IAPPState;
  ui: IUIState;
}

const rootReducer = combineReducers({
  app: appReducer,
  ui: uiReducer,
});

export const store = createStore(rootReducer, composeWithDevTools());
