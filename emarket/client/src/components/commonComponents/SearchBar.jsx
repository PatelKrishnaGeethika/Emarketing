import { useState, useEffect } from "react";
import "../../styles/searchbar.css";
import useAxiosInstance from "../../utils/useAxios";
import { useNavigate } from "react-router-dom";

/**
 * This component is the search bar which takes and changes the API url as per the search and filter
 * @param {url} param0
 * @param {changeUrl} param1
 *
 */
const SearchBar = ({ url, changeUrl }) => {
  const [searchText, setSearchText] = useState("");
  const [isOpen, setisOpen] = useState(false);
  const [related_items, setrelated_items] = useState([]);
  const [order, setOrder] = useState(true);
  const [filter, setFilter] = useState(null);
  const navigate = useNavigate();
  const api = useAxiosInstance();

  useEffect(() => {
    if (filter !== null) {
      const new_url = url + `&prefix=` + searchText + "&sort=" + filter;
      changeUrl(new_url);
      setrelated_items([]);
    }
  }, [filter]);

  const handleInputChange = async (event) => {
    const new_text = event.target.value;
    setSearchText(new_text);
    try {
      const new_url = url + `&search=` + new_text;
      const response = await api.get(new_url);
      // console.log(response.data);
      setrelated_items(response.data);
    } catch (e) {
      console.log(e);
    }
    if (new_text.length === 0) {
      setrelated_items([]);
    }
  };

  const handleSearch = async () => {
    const new_url = url + "&prefix=" + searchText + "&sort=" + filter;
    changeUrl(new_url);
    setrelated_items([]);
  };
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };
  const handleChoice = (event) => {
    const choice = event.target.value;
    if (choice === "cost") {
      setFilter(order ? "cost-asc" : "cost-desc");
      // handleSearch();
    } else {
      setFilter("dop");
      // handleSearch();
    }
    //products/?prefix=searchTest&sort=cost-asc cost-desc dop
  };
  return (
    <div className="searchbar">
      <div className="search">
        <input
          type="text"
          placeholder="Search"
          value={searchText}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
        />
        <i
          className="fa fa-search search-icon"
          aria-hidden="true"
          onClick={handleSearch}
        ></i>
        <div className="results">
          {related_items.map((item, index) => {
            return (
              <p
                key={index}
                className="related-item"
                onClick={() => {
                  navigate("/product/" + item.id);
                }}
              >
                {item.name}
              </p>
            );
          })}
        </div>
      </div>
      <div className="filter">
        <div className="filter-icon" onClick={() => setisOpen(!isOpen)}>
          <i className="fa fa-filter fa-2x"></i>
          <i className="fa fa-angle-down"></i>
        </div>
        {isOpen && (
          <div className="filter-options">
            <label>
              <input
                type="radio"
                name="option"
                value="cost"
                onClick={handleChoice}
              />
              Cost{" "}
              <i
                className={order ? "fa fa-arrow-up" : "fa fa-arrow-down"}
                onClick={() => setOrder(!order)}
              ></i>
            </label>
            <label>
              <input
                type="radio"
                name="option"
                value="date"
                onChange={handleChoice}
              />
              Date of Purchase
            </label>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
