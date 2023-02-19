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

const state: State = {
  token: null,
  csrfToken: isClient() ? localStorage.getItem('csrfToken') : null,
};

export const authorizationHandler = {
  getState: () => state,
  updateToken: (nextToken: string) => {
    state.token = nextToken;
  },
  logout: () => {
    state.token = null;
    state.csrfToken = null;

    eventHub.emit('logout');
  },
};

export const useAuthorization = () => {
  const router = useRouter();

  const logoutHandler = useCallback(
    () => router.push(routes.account.login),
    [router],
  );

  useEffect(() => {
    eventHub.on('logout', logoutHandler);

    return () => {
      eventHub.off('logout', logoutHandler);
    };
  }, [logoutHandler]);
};
