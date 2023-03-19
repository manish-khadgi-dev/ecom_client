import React, { useRef } from "react";
import { Button, Form } from "react-bootstrap";

export const FormOtpRequest = ({ reqOtp, email }) => {
  const emailRef = useRef("");

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    reqOtp(emailRef.current.value);
  };
  return (
    <div className="border py-5 rounded shadow-lg p-3 ">
      <div className="text-center  ">
        <h3>Request OTP</h3>
        <hr />
        <div className="mb-5">
          Use your email to request OTP to reset your password.{" "}
        </div>
      </div>

      <Form onSubmit={handleOnSubmit}>
        <div className="mb-3 ">
          <label class="form-label">Email</label>
          <input
            defaultValue={email}
            ref={emailRef}
            name="email"
            placeholder="smith "
            required
            type="type"
            class="form-control"
          />
        </div>
        <div className="d-grid">
          <Button variant="primary" type="submit">
            Request OTP
          </Button>
        </div>
      </Form>
    </div>
  );
};
