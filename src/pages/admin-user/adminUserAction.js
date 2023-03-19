import {
  adminLogout,
  fetchAdminLogin,
  fetchAdminProfile,
  fetchNewAccessJWT,
} from "../../helper/axiosHelper";
import { setUser, unSetUser } from "./adminUserSlic";
import { toast } from "react-toastify";

export const loginAdmin = (frmDt) => async (dispatch) => {
  //call axios to check if login is success
  const resultPromise = fetchAdminLogin(frmDt);
  toast.promise(resultPromise, {
    pending: "Please wait ...",
  });
  const { status, message, tokens } = await resultPromise;

  if (tokens?.accessJWT) {
    const { accessJWT, refreshJWT } = tokens;
    sessionStorage.setItem("accessJWT", accessJWT);
    localStorage.setItem("refreshJWT", refreshJWT);

    dispatch(getAdminUserProfile());
  }
  //show react toastify
  toast[status](message);

  // if login successful then we would receive user data which we need to send to state by using dispatch
};

export const getAdminUserProfile = () => async (dispatch) => {
  // axios to get user with session token

  const { status, admin } = await fetchAdminProfile();
  if (status === "success" && admin?._id) {
    dispatch(setUser(admin));
  }
};

export const autoLogin = () => async (dispatch) => {
  const accessJWT = sessionStorage.getItem("accessJWT");
  const refresJWT = localStorage.getItem("refreshJWT");
  //if accessJWT exist

  if (accessJWT) {
    return dispatch(getAdminUserProfile());
  }

  if (refresJWT) {
    const { status, accessJWT } = await fetchNewAccessJWT();
    if (status === "success" && accessJWT) {
      sessionStorage.setItem("accessJWT", accessJWT);
      dispatch(getAdminUserProfile());
    }
  }
};

export const logout = () => (dispatch) => {
  //removing userdata from the state
  dispatch(setUser({}));

  //call axios to call the api to remove refreshJWT
  adminLogout();

  //remove broswer storages
  sessionStorage.removeItem("accessJWT");
  localStorage.removeItem("refreshJWT");
};
