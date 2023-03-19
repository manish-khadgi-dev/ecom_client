import axios from "axios";
const apiRoot = process.env.REACT_APP_ROOT_API;
const adminAPI = apiRoot + "/admin";
const catAPI = apiRoot + "/category";

export const axiosProcessor = async ({
  url,
  method,
  objDt,
  isPrivate,
  token,
}) => {
  const headers = isPrivate
    ? {
        Authorization: token || sessionStorage.getItem("accessJWT"),
      }
    : null;
  try {
    const { data } = await axios({
      method,
      url,
      data: objDt,
      headers,
    });
    return data;
  } catch (error) {
    const msg = error?.response?.data?.message;

    if (msg === "jwt expired") {
      // call axios to fetch new accessJWT
      const { status, accessJWT } = await fetchNewAccessJWT();
      //call the axios function

      if (status === "success" && accessJWT) {
        return axiosProcessor({
          url,
          method,
          objDt,
          isPrivate,
          token: accessJWT,
        });
      }
    }

    return {
      status: error,
      message: msg || error.message,
    };
  }
};

// ====== admin users
export const postAdminUser = async (objDt) => {
  const obj = {
    method: "post",
    url: adminAPI,
    objDt,
  };
  return axiosProcessor(obj);
};

export const verifyAdminUser = async (objDt) => {
  const obj = {
    method: "post",
    url: adminAPI + "/verify-email",
    objDt,
  };
  return axiosProcessor(obj);
};

export const fetchAdminLogin = async (objDt) => {
  const obj = {
    method: "post",
    url: adminAPI + "/login",
    objDt,
  };
  return axiosProcessor(obj);
};

export const fetchReqOtp = (objDt) => {
  const obj = {
    method: "post",
    url: adminAPI + "/request-otp",
    objDt,
  };
  return axiosProcessor(obj);
};

export const fetchResetPassword = (objDt) => {
  const obj = {
    method: "patch",
    url: adminAPI + "/reset-password",
    objDt,
  };
  return axiosProcessor(obj);
};

export const fetchAdminProfile = () => {
  const obj = {
    method: "get",
    url: adminAPI,
    isPrivate: true,
  };
  return axiosProcessor(obj);
};

export const fetchNewAccessJWT = async () => {
  const obj = {
    method: "get",
    url: adminAPI + "/new-accessjwt",
    isPrivate: true,
    token: localStorage.getItem("refreshJWT"),
  };
  const { status, accessJWT } = await axiosProcessor(obj);
  accessJWT && sessionStorage.setItem("accessJWT", accessJWT);

  return { status, accessJWT };
};
export const adminLogout = async () => {
  const obj = {
    method: "patch",
    url: adminAPI + "/logout",
    isPrivate: true,
    token: localStorage.getItem("refreshJWT"),
  };
  return axiosProcessor(obj);
};

// ====== category

export const fetchCategories = async () =>
  axiosProcessor({
    method: "get",
    url: catAPI,
    isPrivate: true,
  });

export const postCategory = async (objDt) => {
  const obj = {
    method: "post",
    url: catAPI,
    isPrivate: true,
    objDt,
  };
  return axiosProcessor(obj);
};

export const updateCategory = async (objDt) => {
  const obj = {
    method: "put",
    url: catAPI,
    isPrivate: true,
    objDt,
  };
  return axiosProcessor(obj);
};

export const deleteCategory = async (_id) => {
  const obj = {
    method: "delete",
    isPrivate: true,
    url: catAPI + "/" + _id,
  };
  return axiosProcessor(obj);
};
