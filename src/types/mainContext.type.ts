export interface IContextReturnType {
  user: any;
  isLoggedIn: boolean;
  updateUserInfo: () => void;
}

export interface IMainContextProps {
  children: React.ReactNode;
}

export interface IMainContextState {
  user: any | undefined;
}
