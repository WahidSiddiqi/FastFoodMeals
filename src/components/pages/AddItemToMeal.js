// import React, { Component } from 'react'
import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import messages from "../shared/AutoDismissAlert/messages";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import search from "../../api/search";
import meals from "../../api/meals";

const AddItemToMealPage = (props) => {
  const [loading, setLoading] = useState(true);
  const [item, setItem] = useState(null);
  const [itemId, setItemId] = useState(null);
  const navigate = useNavigate();

  const onAddItemToMeal = useCallback(
    async (event) => {
      event.preventDefault();
      const addResponse = await meals.addItemToMeal(itemId);
      navigate("/meal-summary");
    },
    [itemId]
  );

  useEffect(() => {
    (async () => {
      const params = new URLSearchParams(window.location.search);
      const item_id = params.get("item_id");
      setItemId(item_id);
      const itemResponse = await search.getItem(item_id);
      setItem(itemResponse.data.results?.foods?.[0]);
      setLoading(false);
    })();
  }, []);
  console.log({ item });
  return (
    <div className="row">
      <div className="col-sm-10 col-md-8 mx-auto mt-5">
        <h3>Add Item to Meal</h3>
        <Form onSubmit={onAddItemToMeal}>
          {loading && <div>Loading</div>}
          {!loading && (
            <>
              <div>
                <span className="add-item-label">Brand:</span>
                <span className="add-item-unit">{item?.brand_name}</span>
              </div>
              <div>
                <span className="add-item-label">Name:</span>
                <span className="add-item-unit">{item?.food_name}</span>
              </div>
              <div>
                <span className="add-item-label">Calories:</span>
                <span className="add-item-unit">{item?.nf_calories}</span>
              </div>
              <div>
                <span className="add-item-label">Total Carbs:</span>
                <span className="add-item-unit">
                  {item?.nf_total_carbohydrate} grams
                </span>
              </div>
              <div>
                <span className="add-item-label">Total Protein:</span>
                <span className="add-item-unit">{item?.nf_protein} grams</span>
              </div>
              <div>
                <span className="add-item-label">Total Fat:</span>
                <span className="add-item-unit">
                  {item?.nf_total_fat} grams
                </span>
              </div>
            </>
          )}
          <hr />
          <Button variant="primary" type="submit">
            Add Item
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default AddItemToMealPage;
