import React, { useEffect, useRef, useState } from "react";
import AdminLayout from "../layout/AdminLayout";
import { Alert, Spinner } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import { verifyAdminUser } from "../../helper/axiosHelper";

const EmailVerify = () => {
  // get the verification code and email from the query paramaters
  // call api to verify
  // display success or errror messages

  const isExeRef = useRef(true);

  const [response, setResponse] = useState({});

  const [searchParams] = useSearchParams();

  useEffect(() => {
    const dt = {
      verificationCode: searchParams.get("c"),
      email: searchParams.get("email"),
    };

    verifyUserLink(dt);
    isExeRef.current = false;
  }, [searchParams]);

  //call api here

  const verifyUserLink = async (dt) => {
    //call axios function
    if (!isExeRef.current) {
      return console.log("APi already called");
    }
    const data = await verifyAdminUser(dt);
    setResponse(data);
  };

  return (
    <AdminLayout>
      <div className="verify-page">
        {response.message ? (
          <Alert variant={response.status === "success" ? "success" : "danger"}>
            {response.message}
          </Alert>
        ) : (
          <Spinner variant="primary" animation="border" />
        )}
      </div>
    </AdminLayout>
  );
};

export default EmailVerify;
