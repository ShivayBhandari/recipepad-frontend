import Recipe from "./Recipe";
import { CgSpinner } from "react-icons/cg";
import FryingPan from "./FryingPan";

const Home = ({
  recipes,
  isLoading,
  errorMsg,
  emptyArray,
  stable,
  searchQuery,
  setSearchQuery,
  searchHandler,
  inputField,
}) => {
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
          required
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

export default Home;
