/* eslint-disable functional/prefer-readonly-type -- state should be writable */
import {useEffect} from 'react';

import {routes} from '@/common/consts/routes';
import {useRouter} from '@/common/hooks/useRouter';
import {createEventHub, isClient} from '@/common/utils/utils';

type State = {
  token: string | null;
  csrfToken: string | null;
};

const eventHub = createEventHub();

const state: State = {
  token: null,
  csrfToken: isClient() ? localStorage.getItem('csrfToken') : null,
};

const events = {
  login: 'login',
  logout: 'logout',
};

export const session = {
  getState: () => state,
  updateToken: (nextToken: string) => {
    if (isClient()) {
      state.token = nextToken;
    }
  },
  login: (token: string, csrfToken: string) => {
    if (isClient()) {
      state.token = token;
      state.csrfToken = csrfToken;

      localStorage.setItem('csrfToken', token);

      eventHub.emit(events.login);
    }
  },
  logout: () => {
    if (isClient()) {
      state.token = null;
      state.csrfToken = null;

      eventHub.emit(events.logout);
    }
  },
};

export const useSession = () => {
  const router = useRouter();

  useEffect(() => {
    const loginHandler = () => router.push(routes.home);
    const logoutHandler = () => router.push(routes.account.login);

    eventHub.on(events.login, loginHandler);
    eventHub.on(events.logout, logoutHandler);

    return () => {
      eventHub.on(events.login, loginHandler);
      eventHub.off(events.logout, logoutHandler);
    };
  }, [router]);
};
