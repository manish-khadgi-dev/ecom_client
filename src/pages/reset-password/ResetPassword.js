import React, { useState } from "react";
import { Alert } from "react-bootstrap";
import Container from "react-bootstrap/esm/Container";
import { FormOtpRequest } from "../../components/password-forms/FormOtpRequest";
import { FormResetPassword } from "../../components/password-forms/FormResetPassword";
import { fetchReqOtp, fetchResetPassword } from "../../helper/axiosHelper";
import AdminLayout from "../layout/AdminLayout";

const ResetPassword = () => {
  const [showForm, setShowForm] = useState("otp");
  const [response, setResponse] = useState({});
  const [email, setEmail] = useState("");

  const reqOtp = async (email) => {
    setEmail(email);
    const data = await fetchReqOtp({ email });
    setResponse(data);

    data.status === "success" && setShowForm("reset");
  };

  const resetPasswordRequest = async (obj) => {
    //call the axios

    const result = await fetchResetPassword(obj);
    setResponse(result);
  };

  const goBack = () => {
    setShowForm("otp");
  };

  const forms = {
    otp: <FormOtpRequest reqOtp={reqOtp} email={email} />,
    reset: (
      <FormResetPassword
        email={email}
        goBack={goBack}
        resetPasswordRequest={resetPasswordRequest}
      />
    ),
  };
  return (
    <AdminLayout>
      <Container>
        {response.message && (
          <Alert variant={response.status === "success" ? "success" : "danger"}>
            {response.message}
          </Alert>
        )}
        <div className="reset-password mt-5">
          {forms[showForm] || "Seems programmers are sloppy"}
        </div>
      </Container>
    </AdminLayout>
  );
};

export default ResetPassword;
