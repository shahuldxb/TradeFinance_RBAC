// client/src/utils/apiFetch.ts
export async function apiFetch(input: RequestInfo, init: RequestInit = {}) {
  const headers = new Headers(init.headers || {});
  const userType =
    localStorage.getItem('userType') ??
    localStorage.getItem('UserType') ??
    localStorage.getItem('PrimaryRole') ??
    '';
  headers.set('x-user-id', localStorage.getItem('userID') ?? '');
  headers.set('x-user-name', localStorage.getItem('username') ?? '');
  headers.set('x-user-role', localStorage.getItem('PrimaryRole') ?? '');
  headers.set('x-user-type', userType);
  headers.set('x-session-id', localStorage.getItem('sessionId') ?? '');

  return fetch(input, { ...init, headers });
}
