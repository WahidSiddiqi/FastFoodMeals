import apiUrl from "../apiConfig";
import axios from "axios";

const search = (query) => {
  let authorization = "";

  try {
    const cachedUserString = window.localStorage.getItem("user");
    const cachedUserObject = JSON.parse(cachedUserString);
    const token = cachedUserObject?.token;
    authorization = `Token token=${token}`;
  } catch (e) {
    console.error(e);
  }
  console.log({ authorization });
  return axios({
    url: `${apiUrl}/search?query=${query}`,
    method: "GET",
    headers: {
      Authorization: authorization,
    },
  });
};

const getItem = (item_id) => {
  let authorization = "";

  try {
    const cachedUserString = window.localStorage.getItem("user");
    const cachedUserObject = JSON.parse(cachedUserString);
    const token = cachedUserObject?.token;
    authorization = `Token token=${token}`;
  } catch (e) {
    console.error(e);
  }
  console.log({ authorization });
  return axios({
    url: `${apiUrl}/item?nix_item_id=${item_id}`,
    method: "GET",
    headers: {
      Authorization: authorization,
    },
  });
};

const getItemByObjectId = (item_object_id) => {
  let authorization = "";

  try {
    const cachedUserString = window.localStorage.getItem("user");
    const cachedUserObject = JSON.parse(cachedUserString);
    const token = cachedUserObject?.token;
    authorization = `Token token=${token}`;
  } catch (e) {
    console.error(e);
  }
  console.log({ authorization });
  return axios({
    url: `${apiUrl}/item_by_object_id?item_object_id=${item_object_id}`,
    method: "GET",
    headers: {
      Authorization: authorization,
    },
  });
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  search,
  getItem,
  getItemByObjectId,
};
