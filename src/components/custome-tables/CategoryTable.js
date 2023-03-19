import React, { useEffect, useState } from "react";
import { Button, Form, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCategoryAction,
  getCategories,
  updateCategoryAction,
} from "../../pages/category/categoryAction";

export const CategoryTable = () => {
  const dispatch = useDispatch();
  const [displayCats, setDisplayCats] = useState([]);

  const [selectedCat, setSelectedCat] = useState({});

  const { cats } = useSelector((state) => state.category);

  useEffect(() => {
    !displayCats.length && dispatch(getCategories());

    setDisplayCats(cats);
  }, [cats, dispatch, displayCats.length]);

  const handleOnSave = () => {
    if (window.confirm("Are you sure you want to update this category")) {
      const { _id, name, status } = selectedCat;
      dispatch(updateCategoryAction({ _id, name, status }));
      setSelectedCat({});
    }
  };

  const handleOnDelete = (_id) => {
    if (window.confirm("Are you sure you want to delete this category")) {
      dispatch(deleteCategoryAction(_id));
    }
  };

  const handleOnChange = (e) => {
    let { checked, name, value } = e.target;

    if (name === "status") {
      value = checked ? "active" : "inactive";
    }

    setSelectedCat({
      ...selectedCat,
      [name]: value,
    });

    //update state
    const temp = displayCats.map((item) => {
      let itm = item;
      if (item._id === selectedCat._id) {
        itm = { ...item, status: checked ? "active" : "inactive" };
      }
      return itm;
    });

    setDisplayCats(temp);
  };

  return (
    <div className="shadow-lg p-3">
      <div className="d-flex justify-content-between mt-5">
        <div>{cats.length} items found!</div>
        <div>
          <Form.Control placeholder="search by name" />
        </div>
      </div>
      <hr />

      <div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Status</th>
              <th> Name</th>
              <th>Slug</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {displayCats?.map((item, i) => (
              <tr key={item._id}>
                <td>{i + 1}</td>
                <td>
                  <Form.Check
                    type="switch"
                    name="status"
                    id="custom-switch"
                    disabled={selectedCat._id === item._id ? false : true}
                    onChange={handleOnChange}
                    checked={
                      selectedCat._id === item._id
                        ? selectedCat.status === "active"
                        : item.status === "active"
                    }
                  />
                </td>
                <td>
                  {selectedCat._id === item?._id ? (
                    <Form.Control
                      onChange={handleOnChange}
                      name="name"
                      value={selectedCat.name}
                    />
                  ) : (
                    item?.name
                  )}
                </td>
                <td>
                  {selectedCat._id === item?._id ? (
                    <Form.Control
                      name="name"
                      defaultValue={item.slug}
                      disabled
                    />
                  ) : (
                    item?.slug
                  )}
                </td>

                {selectedCat._id === item?._id ? (
                  <td>
                    <Button variant="success" onClick={handleOnSave}>
                      Save
                    </Button>{" "}
                    <Button onClick={() => setSelectedCat({})} variant="info">
                      Cancel
                    </Button>
                  </td>
                ) : (
                  <td>
                    <Button
                      variant="warning"
                      onClick={() => setSelectedCat(item)}
                    >
                      Edit
                    </Button>{" "}
                    <Button
                      variant="danger"
                      onClick={() => handleOnDelete(item._id)}
                    >
                      Delete
                    </Button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};
