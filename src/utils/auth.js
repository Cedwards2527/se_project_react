const BASE_URL = "http://localhost:3001";

export const register = (name, avatar, email, password) => {
    return fetch (`${BASE_URL}/auth/local/register`, {
    method:"POST",
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        
    },
    body: JSON.stringify({name, avatar, email, password}),
 }).then((res) => {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
 });
};

export const authorize = (email, password) => {
    return fetch (`${BASE_URL}/auth/local/login`, {
    method:"POST",
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
    body: JSON.stringify({email, password}),
 }).then((res) => {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
 });
};

export const checkToken = (token) => {
    return fetch (`${BASE_URL}/users/me`,{
method: "Get",
 headers: {
     "Content-Type": "application/json",
     authorization: `Bearer ${token}`,
     },
    }).then((res) =>(res.ok ? res.json() : Promise.reject(`Error: ${res.status}`)));
};