import React from "react";

import Offcanvas from "react-bootstrap/Offcanvas";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setSideBarShow } from "../../system/systemSlice";

export const SideBar = () => {
  const dispatch = useDispatch();
  const { showSideBar } = useSelector((state) => state.system);

  return (
    <Offcanvas
      show={showSideBar}
      onHide={() => dispatch(setSideBarShow(false))}
      className={"bg-dark"}
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Admin Cms</Offcanvas.Title>
      </Offcanvas.Header>
      <hr />
      <Offcanvas.Body>
        <ul className="sidbar-menu">
          <li onClick={() => dispatch(setSideBarShow(false))}>
            <i class="fa-solid fa-gauge"></i>{" "}
            <Link to="/dashboard">Dashboard</Link>{" "}
          </li>
          <li onClick={() => dispatch(setSideBarShow(false))}>
            <i class="fa-solid fa-boxes-stacked"></i>{" "}
            <Link to="/category">Category Mgmt</Link>{" "}
          </li>
          <li onClick={() => dispatch(setSideBarShow(false))}>
            <i class="fa-solid fa-box"></i>{" "}
            <Link to="/products">Products Mgmt</Link>{" "}
          </li>
          <li onClick={() => dispatch(setSideBarShow(false))}>
            <i class="fa-solid fa-van-shuttle"></i>{" "}
            <Link to="/orders">Orders</Link>{" "}
          </li>
          <li onClick={() => dispatch(setSideBarShow(false))}>
            <i class="fa-solid fa-credit-card"></i>{" "}
            <Link to="/payment-options">Payment Options</Link>{" "}
          </li>
          <li onClick={() => dispatch(setSideBarShow(false))}>
            <i class="fa-solid fa-users"></i>{" "}
            <Link to="/customers">Customer Mgmt</Link>{" "}
          </li>
          <li onClick={() => dispatch(setSideBarShow(false))}>
            <i class="fa-solid fa-gear"></i> <Link to="/setting">Setting</Link>{" "}
          </li>
        </ul>
      </Offcanvas.Body>
    </Offcanvas>
  );
};
