import { IState } from "./redux/store";

declare module "react-redux" {
  interface DefaultRootState extends IState {}
}
