export interface IContextReturnType {
  user: any;
}

export interface IMainContextProps {
  children: React.ReactNode;
}

export interface IMainContextState {
  user: IUser | undefined;
}
