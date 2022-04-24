import { IBody } from './const';

export function getPathString(originPath: string) {
  const firstChar = originPath.slice(0, 1).toUpperCase();
  const restString = originPath.slice(1);

  return (firstChar + restString).replace('-', ' ');
}

export function htmlToText(html: string) {
  const div = document.createElement('div');
  div.innerHTML = html;

  return div.innerText;
}

export function getPageNumber(start: number, end: number) {
  const result = [];

  for (let i = start; i <= end; i++) {
    result.push(i);
  }

  return result;
}

export const fetchApi = async (method: string, url: string, body?: IBody) => {
  const result = await (
    await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      ...(body && method === 'POST' && { body: JSON.stringify(body) }),
    })
  ).json();

  return result;
};
