import React, { useState } from "react";
import AdminLayout from "../layout/AdminLayout";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { CustomInpute } from "../../components/customInpute/CustomInpute";
import { postAdminUser } from "../../helper/axiosHelper";
import { Alert, Spinner } from "react-bootstrap";

const Registration = () => {
  const [form, setForm] = useState({});
  const [resp, setResp] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState("");

  const handleOnChage = (e) => {
    const { name, value } = e.target;

    setErr("");
    // let str = "";
    if (name === "password") {
      value.length < 6 && setErr("Password must be 6 character long.");
      !/[0-9]/.test(value) && setErr("At least one number is required");
      !/[a-z]/.test(value) && setErr("At least one lower case is required");
      !/[A-Z]/.test(value) && setErr("At least one uppder case is required");
    }

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    const { confirmPassword, ...rest } = form;
    if (confirmPassword !== rest.password) {
      return alert("Password do not match!");
    }
    setIsLoading(true);

    const result = await postAdminUser(rest);
    setResp(result);
    setIsLoading(false);
  };

  const inputs = [
    {
      label: "Frist Name",
      name: "fName",
      type: "text",
      placeholder: "Sam ",
      required: true,
    },
    {
      label: "Last Name",
      name: "lName",
      type: "text",
      placeholder: "smith ",
      required: true,
    },

    {
      label: "Phone",
      name: "phone",
      type: "number",
      placeholder: "04xxxxx ",
    },
    {
      label: "Address",
      name: "address",
      type: "text",
      placeholder: "04xxxxx ",
    },
    {
      label: "Email",
      name: "email",
      type: "type",
      placeholder: "smith ",
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
    <AdminLayout>
      <div className="reg-page">
        <Form
          onSubmit={handleOnSubmit}
          className="border mt-5 p-3 rounded shadow-lg pt-5"
        >
          <h3 className="mb-3 text-center">New Admin Registration!</h3>
          <hr className="mb-5" />

          {isLoading && (
            <div className="text-center">
              <Spinner variant="primary" animation="border" />
            </div>
          )}

          {resp.message && (
            <Alert variant={resp.status === "success" ? "success" : "danger"}>
              {resp.message}
            </Alert>
          )}

          {inputs.map((item) => (
            <CustomInpute key={item.name} {...item} onChange={handleOnChage} />
          ))}

          <Form.Text>
            Your password musht have at least 6 characters long, Upper case,
            lower case and number
          </Form.Text>
          {err && <div className="text-danger mb-4">{err}</div>}
          <div className="d-grid">
            <Button variant="primary" type="submit" disabled={err}>
              Submit
            </Button>
          </div>
        </Form>
      </div>
    </AdminLayout>
  );
};

export default Registration;
