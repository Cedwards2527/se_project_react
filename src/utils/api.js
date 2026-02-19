const BASE_URL = "http://localhost:3001";

const headers = {
  "Content-Type": "application/json",
};

const handleServerResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
};

export const getItems = () =>
  fetch(`${BASE_URL}/items`, { headers }).then(handleServerResponse);

export const addItem = ({ name, imageUrl, weather }, token) => {
  return fetch(`${BASE_URL}/items`, {
    method: "POST",
    headers:{
     "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name,
      imageUrl,
      weather,
  
    }),
  }).then(handleServerResponse);
};

export const deleteItems = (itemID, token) => {
  return fetch(`${BASE_URL}/items/${itemID}`, {
    method: "DELETE",
    headers:{
       "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    }
  }).then(handleServerResponse);
};
