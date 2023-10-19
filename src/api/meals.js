import apiUrl from "../apiConfig";
import axios from "axios";

const addItemToMeal = (item_id) => {
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
    url: `${apiUrl}/add_item_to_meal?item_id=${item_id}`,
    data: {
      item_id,
    },
    method: "POST",
    headers: {
      Authorization: authorization,
    },
  });
};

const getSummary = () => {
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
    url: `${apiUrl}/meal_summary`,
    method: "GET",
    headers: {
      Authorization: authorization,
    },
  });
};

const deleteItemFromMeal = (item_id) => {
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
    url: `${apiUrl}/delete_item_from_meal?item_id=${item_id}`,
    method: "DELETE",
    headers: {
      Authorization: authorization,
    },
  });
};

const editItemInMeal = (item_id, qty) => {
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
    url: `${apiUrl}/edit_item_in_meal`,
    method: "PUT",
    data: {
      item_id,
      qty,
    },
    headers: {
      Authorization: authorization,
    },
  });
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  addItemToMeal,
  getSummary,
  deleteItemFromMeal,
  editItemInMeal,
};
