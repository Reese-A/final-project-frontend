import React from 'react';

import './FoodCard.css';

const FoodCard = props => {
  return (
    <div class="food_card">
      <div class="food_card_image">
        <img src="https://picsum.photos/600/300/?random" />
      </div>
      <div class="food_card_info">
        <div class="food_card_row_name">
          <span class="food_card_info_name">
            {props.name || 'Chicken Sandwich'}
          </span>
          <div class="food_card_info_calories_container">
            <span class="food_card_info_calories">{props.calories} </span>
            <span class="food_card_info_calories_text">cal</span>
          </div>
        </div>
        <div class="food_card_row_serving">
          <span class="food_card_info_serving_size">
            1 {props.serving_size || 'sandwich'}
          </span>
          <span class="food_card_info_seperator"> &#x25CF; </span>
          <span class="food_card_info_serving_grams">
            {props.serving_grams}
          </span>
          <span class="food_card_info_serving_grams_text"> grams</span>
        </div>
        <div class="food_card_row_nutrients">
          <div className="vert_seperator" />

          <div className="food_card_info_protein_container nutrient_container">
            <div class="food_card_info_protein nutrient_value_container">
              <span class="food_card_info_protein_value nutrient_value">
                {props.protein}
              </span>
              <span class="food_card_info_protein_units nutrient_units">
                {' '}
                g
              </span>
            </div>
            <span class="food_card_info_protein_text nutrient_text">
              protein
            </span>
          </div>
          <div className="vert_seperator" />
          <div className="food_card_info_fat_container nutrient_container">
            <div class="food_card_info_fat nutrient_value_container">
              <span class="food_card_info_fat_value nutrient_value">
                {props.fat}
              </span>
              <span class="food_card_info_fat_units nutrient_units"> g</span>
            </div>
            <span class="food_card_info_fat_text nutrient_text">fat</span>
          </div>
          <div className="vert_seperator" />
          <div className="food_card_info_carbs_container nutrient_container">
            <div class="food_card_info_carbs nutrient_value_container">
              <span class="food_card_info_carbs_value nutrient_value">
                {props.carb}
              </span>
              <span class="food_card_info_carbs_units nutrient_units"> g</span>
            </div>
            <span class="food_card_info_carbs_text nutrient_text">carbs</span>
          </div>
          <div className="vert_seperator" />
        </div>
        <span class="food_card_per_serving">per serving</span>
      </div>
    </div>
  );
};

export default FoodCard;
