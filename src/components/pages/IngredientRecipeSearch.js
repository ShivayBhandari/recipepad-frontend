import React from "react";
import { useRef, useState } from "react";
//import { useNavigate } from "react-router-dom";
import { CgSpinner } from "react-icons/cg";
import FryingPan from "../FryingPan";

import Recipe from "../Recipe";

const IngredientRecipeSearch = () => {
  const [ingredientSearchQuery, setIngredientSearchQuery] = useState("");
  const [ingredientRecipes, setIngredientRecipes] = useState([]);
  const [ingredientIsLoading, setIngredientIsLoading] = useState(false);
  const [ingredientErrorMsg, setIngredientErrorMsg] = useState("");
  const [ingredientEmptyArray, setIngredientEmptyArray] = useState("");
  const [ingredientStable, setIngredientStable] = useState(
    "Nothing to show, please search something!"
  );

  //const navigator = useNavigate();

  const ingredientInputField = useRef();

  const ingredientSearchHandler = (e) => {
    e.preventDefault();

    ingredientInputField.current.blur();

    //navigator("/");

    setIngredientIsLoading(true);
    setIngredientRecipes([]);
    setIngredientErrorMsg("");
    setIngredientEmptyArray("");
    setIngredientStable("");

    setTimeout(() => {
      var url = `http://127.0.0.1:9000/recipesWithIngredients?ingredients=${ingredientSearchQuery}`;
      fetch(url)
        .then((res) => {
          if (!res.ok) throw new Error("Something went wrong!");
          return res.json();
        })
        .then((data) => {
          if (data.length === 0) setIngredientEmptyArray("No recipe found!");
          setIngredientRecipes(data);
          setIngredientIsLoading(false);
        })
        .catch((err) => setIngredientErrorMsg(err.message));
    }, 500);

    setIngredientSearchQuery("");
  };

  return (
    <div className="container mx-auto py-8 flex flex-wrap gap-10 justify-center">
      {!ingredientIsLoading &&
      !ingredientErrorMsg &&
      !ingredientEmptyArray &&
      ingredientRecipes.length === 0 ? (
        <div className="text-2xl lg:text-4xl text-center font-semibold text-rose-300 leading-normal">
          <p>{ingredientStable}</p>
          <FryingPan />
        </div>
      ) : null}

      <form onSubmit={ingredientSearchHandler}>
        <input
          ref={ingredientInputField}
          value={ingredientSearchQuery}
          onChange={(e) => setIngredientSearchQuery(e.target.value)}
          type="search"
          required
          placeholder="Search recipe..."
          className="bg-white/75 p-3 px-8 lg:w-96 rounded-full outline-none shadow-lg shadow-rose-100 focus:shadow-rose-200 duration-300"
        />
      </form>

      {ingredientIsLoading && (
        <p className="text-2xl">
          {ingredientErrorMsg ? (
            ingredientErrorMsg
          ) : (
            <CgSpinner className="animate-spin" />
          )}
        </p>
      )}

      {ingredientRecipes.length === 0 && (
        <p className="text-2xl">{ingredientEmptyArray}</p>
      )}

      {ingredientRecipes.length > 0 &&
        ingredientRecipes.map((recipe) => (
          <Recipe key={recipe.id} recipe={recipe} />
        ))}
    </div>
  );
};

export default IngredientRecipeSearch;
