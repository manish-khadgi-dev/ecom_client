import { configureStore } from "@reduxjs/toolkit";

import adminReducer from "./pages/admin-user/adminUserSlic";
import systemReducer from "./system/systemSlice";
import catReducer from "./pages/category/categorySlice";
const store = configureStore({
  reducer: {
    adminInfo: adminReducer,
    system: systemReducer,
    category: catReducer,
  },
});

export default store;
