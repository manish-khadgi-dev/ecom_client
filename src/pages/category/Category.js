import React from "react";
import Dashobardlayout from "../layout/Dashobardlayout";
import { AddNewCat } from "../../components/category-forms/AddNewCat";
import { CategoryTable } from "../../components/custome-tables/CategoryTable";

const Category = () => {
  return (
    <Dashobardlayout>
      <h3 className="mt-3">Category Mgmt.</h3>
      <hr />

      {/* form */}
      <AddNewCat />

      {/* table */}
      <CategoryTable />
    </Dashobardlayout>
  );
};

export default Category;
