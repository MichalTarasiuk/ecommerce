/* eslint-disable functional/prefer-readonly-type -- state should be writable */
import {useCallback, useEffect} from 'react';

import {routes} from '@/common/consts/routes';
import {useRouter} from '@/common/hooks/useRouter';
import {createEventHub, isClient} from '@/common/utils/utils';

type State = {
  token: string | null;
  csrfToken: string | null;
};

const eventHub = createEventHub();

const events = {
  login: 'login',
  logout: 'logout',
};

const state: State = {
  token: null,
  csrfToken: isClient() ? localStorage.getItem('csrfToken') : null,
};

export const authorization = {
  getState: () => state,
  updateToken: (nextToken: string) => {
    state.token = nextToken;
  },
  login: (token: string, csrfToken: string) => {
    state.token = token;
    state.csrfToken = csrfToken;

    if (isClient()) {
      localStorage.setItem('csrfToken', token);
    }

    eventHub.emit(events.login);
  },
  logout: () => {
    state.token = null;
    state.csrfToken = null;

    eventHub.emit('logout');
  },
};

export const useAuthorization = () => {
  const router = useRouter();

  const loginHandler = useCallback(() => router.push(routes.home), [router]);

  const logoutHandler = useCallback(
    () => router.push(routes.account.login),
    [router],
  );

  useEffect(() => {
    eventHub.on(events.login, loginHandler);
    eventHub.on(events.logout, logoutHandler);

    return () => {
      eventHub.on(events.login, loginHandler);
      eventHub.off(events.logout, logoutHandler);
    };
  }, [loginHandler, logoutHandler]);
};
