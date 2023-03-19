import React, { useRef, useState } from "react";
import { Button, Form, Spinner, Alert } from "react-bootstrap";
import { toast } from "react-toastify";

import { CustomInpute } from "../customInpute/CustomInpute";

export const FormResetPassword = ({ email, goBack, resetPasswordRequest }) => {
  const [error, setError] = useState("");
  const [form, setForm] = useState({});

  const handleOnChage = (e) => {
    const { name, value } = e.target;

    setError("");
    // let str = "";
    if (name === "password") {
      value.length < 6 && setError("Password must be 6 character long.");
      !/[0-9]/.test(value) && setError("At least one number is required");
      !/[a-z]/.test(value) && setError("At least one lower case is required");
      !/[A-Z]/.test(value) && setError("At least one uppder case is required");
    }

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    const { confirmPassword, ...rest } = form;

    rest.email = email;
    if (confirmPassword !== rest.password) {
      return toast.error("Password do not match!");
    }

    resetPasswordRequest(rest);
  };

  const inputs = [
    {
      label: "OTP",
      name: "otp",
      type: "number",
      placeholder: "987678 ",
      required: true,
    },

    {
      label: "Password",
      name: "password",
      type: "password",
      placeholder: "xxxxx ",
      required: true,
    },
    {
      label: "Confirm Password",
      name: "confirmPassword",
      type: "password",
      placeholder: "xxxxx ",
      required: true,
    },
  ];

  return (
    <div className="border py-5 rounded shadow-lg p-3 ">
      <Button variant="secondary" onClick={goBack}>
        {" "}
        &lt; Back{" "}
      </Button>
      <div className="text-center  ">
        <h3>Reset New Password </h3>
        <hr />
        <div className="mb-5">
          If {email} is in our system, you will receive an OTP
        </div>
      </div>
      <Form onSubmit={handleOnSubmit}>
        {inputs.map((item, i) => (
          <CustomInpute key={i} {...item} onChange={handleOnChage} />
        ))}

        <Form.Text>
          Your password must contain atleast 6 characters with number, upper
          case and lower case
        </Form.Text>
        {error && (
          <ul className="text-danger fw-bolder fs-4 my-4">
            <li>{error}</li>
          </ul>
        )}

        <div className="d-grid">
          <Button variant="success" type="submit">
            Submit
          </Button>
        </div>
      </Form>
    </div>
  );
};
