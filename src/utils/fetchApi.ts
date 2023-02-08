// eslint-disable-next-line max-len
const BASE_URL = 'https://comments-spa.netlify.app/.netlify/functions/server/messages';
// const TEST_URL = 'http://localhost:9000/.netlify/functions/server/messages';

// export function getComments<T>(url: string): Promise<T> {
//   return fetch(TEST_URL + url)
//     .then(response => {
//       if (!response.ok) {
//         throw new Error();
//       }

//       return response.json();
//     });
// }
type RequestMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE';

function request<T>(
  url: string,
  method: RequestMethod = 'GET',
  data: any = null,
): Promise<T> {
  const options: RequestInit = { method };

  if (data) {
    options.body = new URLSearchParams(data).toString();
    options.headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
    };
  }

  return fetch(BASE_URL + url, options)
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
