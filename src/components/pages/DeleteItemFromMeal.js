// import React, { Component } from 'react'
import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import messages from "../shared/AutoDismissAlert/messages";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import search from "../../api/search";
import meals from "../../api/meals";

const DeleteItemFromMeal = (props) => {
  const [loading, setLoading] = useState(false);
  const [itemId, setItemId] = useState(null);
  const navigate = useNavigate();

  const onDeleteItemFromMeal = useCallback(
    async (event) => {
      event.preventDefault();
      setLoading(true);
      const deleteResponse = await meals.deleteItemFromMeal(itemId);
      navigate("/meal-summary");
    },
    [itemId]
  );

  useEffect(() => {
    (async () => {
      const params = new URLSearchParams(window.location.search);
      const item_id = params.get("item_id");
      setItemId(item_id);
    })();
  }, []);
  return (
    <div className="row">
      <div className="col-sm-10 col-md-8 mx-auto mt-5">
        <h3>Delete Item from Meal</h3>
        <Form onSubmit={onDeleteItemFromMeal}>
          {loading && <div>Loading...</div>}
          {!loading && (
            <div>
              <div>Are you sure you want delete this item?</div>
              <br />
              <Button variant="danger" type="submit">
                Delete
              </Button>
            </div>
          )}
        </Form>
      </div>
    </div>
  );
};

export default DeleteItemFromMeal;
