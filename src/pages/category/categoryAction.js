import {
  deleteCategory,
  fetchCategories,
  postCategory,
  updateCategory,
} from "../../helper/axiosHelper";
import { toast } from "react-toastify";

import { setCats } from "./categorySlice";

export const getCategories = () => async (dispatch) => {
  const { status, cats } = await fetchCategories();

  status === "success" && dispatch(setCats(cats));
};

export const postNewCategory = (data) => async (dispatch) => {
  const { status, message } = await postCategory(data);

  toast[status](message);

  status === "success" && dispatch(getCategories());
};

export const updateCategoryAction = (data) => async (dispatch) => {
  const { status, message } = await updateCategory(data);

  toast[status](message);

  status === "success" && dispatch(getCategories());
};

export const deleteCategoryAction = (_id) => async (dispatch) => {
  const { status, message } = await deleteCategory(_id);

  toast[status](message);

  status === "success" && dispatch(getCategories());
};
