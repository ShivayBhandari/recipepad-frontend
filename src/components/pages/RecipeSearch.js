import React from "react";
import { useRef, useState } from "react";
//import { useNavigate } from "react-router-dom";
import { CgSpinner } from "react-icons/cg";
import FryingPan from "../FryingPan";

import Recipe from "../Recipe";

const RecipeSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [emptyArray, setEmptyArray] = useState("");
  const [stable, setStable] = useState(
    "Nothing to show, please search something!"
  );

  //const navigator = useNavigate();

  const inputField = useRef();

  const searchHandler = (e) => {
    e.preventDefault();

    inputField.current.blur();

    //navigator("/");

    setIsLoading(true);
    setRecipes([]);
    setErrorMsg("");
    setEmptyArray("");
    setStable("");

    setTimeout(() => {
      var url;
      if (searchQuery === "") {
        url = "http://127.0.0.1:9000/recipesWithSearch";
        fetch(url)
          .then((res) => {
            if (!res.ok) throw new Error("Something went wrong!");
            return res.json();
          })
          .then((data) => {
            if (data.recipes.length === 0) setEmptyArray("No recipe found!");
            setRecipes(data.recipes);
            setIsLoading(false);
          })
          .catch((err) => setErrorMsg(err.message));
      } else {
        url = `http://127.0.0.1:9000/recipesWithSearch?query=${searchQuery}`;

        fetch(url)
          .then((res) => {
            if (!res.ok) throw new Error("Something went wrong!");
            return res.json();
          })
          .then((data) => {
            if (data.results.length === 0) setEmptyArray("No recipe found!");
            setRecipes(data.results);
            setIsLoading(false);
          })
          .catch((err) => setErrorMsg(err.message));
      }
    }, 500);

    setSearchQuery("");
  };

  return (
    <div className="container mx-auto py-8 flex flex-wrap gap-10 justify-center">
      {!isLoading && !errorMsg && !emptyArray && recipes.length === 0 ? (
        <div className="text-2xl lg:text-4xl text-center font-semibold text-rose-300 leading-normal">
          <p>{stable}</p>
          <FryingPan />
        </div>
      ) : null}

      <form onSubmit={searchHandler}>
        <input
          ref={inputField}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          type="search"
          //required
          placeholder="Search recipe..."
          className="bg-white/75 p-3 px-8 lg:w-96 rounded-full outline-none shadow-lg shadow-rose-100 focus:shadow-rose-200 duration-300"
        />
      </form>

      {isLoading && (
        <p className="text-2xl">
          {errorMsg ? errorMsg : <CgSpinner className="animate-spin" />}
        </p>
      )}

      {recipes.length === 0 && <p className="text-2xl">{emptyArray}</p>}

      {recipes.length > 0 &&
        recipes.map((recipe) => <Recipe key={recipe.id} recipe={recipe} />)}
    </div>
  );
};

export default RecipeSearch;
