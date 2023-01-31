export const BASE_URL = `https://host.io/api/web/`;

export const fetchData = async (url) => {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`error`);
    const data = await res.json();
    return data;
  } catch (error) {
    throw new Error(error);
  }
};

export const fetchDomain = async (domain) => {
  return await fetchData(`${BASE_URL}${domain}?token=${process.env.REACT_APP_API_KEY}`);
};