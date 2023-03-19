import React, { useRef } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { postNewCategory } from "../../pages/category/categoryAction";

export const AddNewCat = () => {
  const dispatch = useDispatch();
  const catRef = useRef("");

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const cat = catRef.current.value;
    dispatch(postNewCategory({ name: cat }));
  };

  return (
    <div className="border rounded p-3 shadow-lg">
      <Form onSubmit={handleOnSubmit}>
        <h4>Add new category</h4>
        <hr />
        <Row className="mt-5 mb-3 ">
          <Col md="8">
            <input
              ref={catRef}
              name="name"
              placeholder="Electronic Items "
              required
              className="form-control"
            />
          </Col>
          <Col md="4">
            <div className="d-grid ">
              <Button variant="primary" type="submit">
                Add Category
              </Button>
            </div>
          </Col>
        </Row>
      </Form>
    </div>
  );
};
