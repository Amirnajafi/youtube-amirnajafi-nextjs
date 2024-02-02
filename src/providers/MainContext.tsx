import React, {createContext, useEffect, useMemo} from 'react';

import {
  IContextReturnType,
  IMainContextProps,
  IMainContextState,
} from '@/types/mainContext.type';
import {getUserInfo} from '@/services/user';

export const Context = createContext<IContextReturnType>(
  {} as IContextReturnType
);

const MainContext = (props: IMainContextProps) => {
  const {children} = props;
  const [state, setState] = React.useState<IMainContextState>({
    user: undefined,
  });

  useEffect(() => {
    updateUserInfo();
  }, []);

  const updateUserInfo = () => {
    getUserInfo()
      .then((res) => {
        const user = res.data.data;
        setState((prevState) => ({...prevState, user}));
      })
      .catch((e) => {
        console.error(e);
      });
  };
  const isLoggedIn = useMemo(() => {
    return !!state.user;
  }, [state.user]);

  return (
    <Context.Provider
      value={{
        ...state,
        isLoggedIn,
        updateUserInfo,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default MainContext;
