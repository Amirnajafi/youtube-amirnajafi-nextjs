import React, {createContext, useEffect, useMemo} from 'react';

import {
  IContextReturnType,
  IMainContextProps,
  IMainContextState,
} from '@/types/mainContext.type';
import {getUserInfo} from '@/services/user';
import {logout} from '@/services/auth';
import {useRouter} from 'next/router';

export const Context = createContext<IContextReturnType>(
  {} as IContextReturnType
);

const MainContext = (props: IMainContextProps) => {
  const router = useRouter();
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

  const handleLogout = () => {
    logout().then(() => {
      router.push('/');
      setState((prevState) => ({...prevState, user: undefined}));
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
        handleLogout,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default MainContext;
