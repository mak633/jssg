import { useEffect } from 'react';
import { useCookies } from 'react-cookie';

import { dummyUsers, dummyUsersRecord } from '@shared/lib/dummy-data';

export function MockUsers() {
  const [cookies, setCookies] = useCookies();

  useEffect(() => {
    if (!cookies[dummyUsersRecord]) {
      setCookies(dummyUsersRecord, dummyUsers);
    }
  }, [cookies, setCookies]);

  return null;
}
