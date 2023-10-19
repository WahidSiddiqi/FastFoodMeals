// import React, { Component } from 'react'
import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import messages from "../shared/AutoDismissAlert/messages";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import search from "../../api/search";
import meals from "../../api/meals";

const EditItemInMealPage = (props) => {
  const [loading, setLoading] = useState(true);
  const [item, setItem] = useState(null);
  const [qty, setQty] = useState(null);
  const [itemId, setItemId] = useState(null);
  const navigate = useNavigate();

  const onEditItemInMeal = useCallback(
    async (event) => {
      event.preventDefault();
      const editResponse = await meals.editItemInMeal(itemId, qty);
      navigate("/meal-summary");
    },
    [itemId, qty]
  );

  useEffect(() => {
    (async () => {
      const params = new URLSearchParams(window.location.search);
      const item_id = params.get("item_id");
      setItemId(item_id);
      const itemResponse = await search.getItemByObjectId(item_id);
      setItem(itemResponse.data);
      setQty(itemResponse.data.qty);
      setLoading(false);
    })();
  }, []);
  console.log({ item });
  return (
    <div className="row">
      <div className="col-sm-10 col-md-8 mx-auto mt-5">
        <h3>Edit Item in Meal</h3>
        <Form onSubmit={onEditItemInMeal}>
          {loading && <div>Loading</div>}
          {!loading && (
            <>
              <div>
                <span className="add-item-label">Brand:</span>
                <span className="add-item-unit">
                  {item?.nix_meta_data?.brand_name}
                </span>
              </div>
              <div>
                <span className="add-item-label">Name:</span>
                <span className="add-item-unit">
                  {item?.nix_meta_data?.food_name}
                </span>
              </div>
              <div>
                <span className="add-item-label">Calories:</span>
                <span className="add-item-unit">
                  {item?.nix_meta_data?.nf_calories}
                </span>
              </div>
              <div>
                <span className="add-item-label">Total Carbs:</span>
                <span className="add-item-unit">
                  {item?.nix_meta_data?.nf_total_carbohydrate} grams
                </span>
              </div>
              <div>
                <span className="add-item-label">Total Protein:</span>
                <span className="add-item-unit">
                  {item?.nix_meta_data?.nf_protein} grams
                </span>
              </div>
              <div>
                <span className="add-item-label">Total Fat:</span>
                <span className="add-item-unit">
                  {item?.nix_meta_data?.nf_total_fat} grams
                </span>
              </div>
            </>
          )}
          <Form.Group controlId="oldPassword">
            <Form.Label>Quantity</Form.Label>
            <Form.Control
              required
              name="qty"
              value={qty}
              type="number"
              placeholder="qty"
              onChange={(e) => {
                console.log({ value: e.target.value });
                if (Number(e.target.value) < 1) {
                  return;
                }
                setQty(Number(e.target.value));
              }}
            />
          </Form.Group>
          <hr />
          <Button variant="primary" type="submit">
            Edit Item
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default EditItemInMealPage;
