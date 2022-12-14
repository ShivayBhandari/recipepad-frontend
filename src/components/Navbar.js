import { NavLink } from "react-router-dom";

// import logo from "./RecipePadLogo.png";

const Navbar = ({ saveCount }) => {
  const navActive = ({ isActive }) => {
    return {
      color: isActive ? "#f43f5e" : null,
    };
  };

  return (
    <nav className="flex justify-between items-center container mx-auto py-8 flex-col lg:flex-row gap-5 lg:gap-0">
      <h2 className="text-2xl font-bold lowercase italic">
        Recipe<span className="text-rose-500">Pad</span>
      </h2>
      {/* <form onSubmit={searchHandler}>
        <input
          ref={inputField}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          type="search"
          required
          placeholder="Search recipe..."
          className="bg-white/75 p-3 px-8 lg:w-96 rounded-full outline-none shadow-lg shadow-rose-100 focus:shadow-rose-200 duration-300"
        />
      </form> */}
      <ul className="flex gap-5">
        <li>
          <NavLink
            end
            to="/"
            className="text-gray-400 hover:text-gray-600 duration-300"
            style={navActive}
          >
            Recipe Search
          </NavLink>
        </li>
        <li>
          <NavLink
            end
            to="ingredient-search"
            className="text-gray-400 hover:text-gray-600 duration-300"
            style={navActive}
          >
            Ingredient Search
          </NavLink>
        </li>
        {/* <li>
          <NavLink
            end
            to="login"
            className="text-gray-400 hover:text-gray-600 duration-300"
            style={navActive}
          >
            Login
          </NavLink>
        </li> */}
        <li>
          <NavLink
            to="favourites"
            className="text-gray-400 hover:text-gray-600 duration-300"
            style={navActive}
          >
            Favourites{" "}
            <span className="font-bold text-sky-400">({saveCount})</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
