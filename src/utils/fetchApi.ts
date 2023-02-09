// eslint-disable-next-line max-len
// const BASE_URL = 'https://comments-spa.netlify.app/.netlify/functions/server';
const TEST_URL = 'http://localhost:9000/.netlify/functions/server';

type RequestMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE';

function request<T>(
  url: string,
  method: RequestMethod = 'GET',
  data: any = null,
): Promise<T> {
  const options: RequestInit = { method };

  if (data) {
    options.body = JSON.stringify(data);
    options.headers = {
      'Content-Type': 'application/json; charset=UTF-8',
      'Access-Control-Allow-Origin': '*',
    };
  }

  return fetch(TEST_URL + url, options)
    .then(response => {
      if (!response.ok) {
        throw new Error();
      }

      const dataReceived = response.json();

      const comments = dataReceived.then((res) => res.results);

      return comments;
    });
}

export const client = {
  get: <T>(url: string) => request<T>(url),
  post: <T>(url: string, data: any) => request<T>(url, 'POST', data),
  // patch: <T>(url: string, data: any) => request<T>(url, 'PATCH', data),
  // delete: (url: string) => request(url, 'DELETE'),
};
