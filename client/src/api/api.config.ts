export const BASE_API_URL = process.env.REACT_APP_API_URI;
export const REDIRECT_URI = BASE_API_URL + "/links/s/";

if (!BASE_API_URL) {
  throw new Error(
    `Не указан URL для api, проверьте файл .env, есть ли там REACT_APP_API_URI`
  );
}
