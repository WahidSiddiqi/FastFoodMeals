// import React, { Component } from 'react'
import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import messages from "../shared/AutoDismissAlert/messages";

import { Link } from "react-router-dom";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import meals from "../../api/meals";

const linkStyle = {
  color: "black",
  textDecoration: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
  padding: "0 10px",
};

const AddItemToMealPage = (props) => {
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      setLoading(true);
      const summaryResponse = await meals.getSummary();
      console.log({ summaryResponse });
      setSummary(summaryResponse.data);
      setLoading(false);
    })();
  }, []);
  console.log({ summary });
  return (
    <div className="row">
      <div className="col-sm-10 col-md-8 mx-auto mt-5">
        <h3>Meal Summary</h3>
        {loading && <div>Loading</div>}
        {!loading && (
          <>
            <div className="calories-text">
              {summary?.total_calories} Calories
            </div>
            <div>Total Fat: {summary?.total_fats}g</div>
            <div>Total Carbs: {summary?.total_carbs}g</div>
            <div>Total Protein: {summary?.total_protein}g</div>

            <hr />
            <div>
              <h5>Meal Items</h5>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Brand</th>
                    <th>Item</th>
                    <th>Qty</th>
                    <th>Calories</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {summary?.items?.map((item) => {
                    return (
                      <tr>
                        <td className="items-table-cell">
                          {item?.nix_meta_data?.brand_name}
                        </td>
                        <td>{item?.nix_meta_data?.food_name}</td>
                        <td>{item?.qty}</td>
                        <td>{item?.nix_meta_data?.nf_calories}</td>
                        <td>
                          <div className="actions-buttons-container">
                            <Button variant="danger" type="submit">
                              <Link
                                to={`/delete-item-from-meal?item_id=${item._id}`}
                                style={linkStyle}
                              >
                                Delete
                              </Link>
                            </Button>

                            <Button variant="secondary" type="submit">
                              <Link
                                to={`/edit-item-in-meal?item_id=${item._id}`}
                                style={linkStyle}
                              >
                                Edit
                              </Link>
                            </Button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
              <br />
              <Button variant="primary" type="submit">
                <Link to={`/`} style={linkStyle}>
                  Search for Items
                </Link>
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AddItemToMealPage;
