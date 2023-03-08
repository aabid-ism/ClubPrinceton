import React, { useState } from "react";
import Bubble from "../bubble/Bubble";
import axios from "axios";

const url = "http://localhost:5050/clubs";

function SearchBar(props) {
  const [searchTerm, setSearchTerm] = useState("");
  var [results, setResults] = useState([]);

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchClick = () => {
    axios
      .get(`${url}?q=${searchTerm}`)
      .then((response) => {
        const data = response.data;
        setResults(data);
      })
      .catch((error) => {
        console.log("Error occurred: ", error);
      });
  };

  results=[{name: "test"}, {name: "test2"}, {name: "test3"}];

  return (
    <div>
      <Bubble width={props.width} height={props.height} color={props.color} className="items-center justify-center flex-grow">
        <div className="mx-auto p-6 bg-white rounded-lg shadow-lg margin-10p">
          <div className="flex flex-col">
            <input
              type="text"
              className="form-control w-full border border-gray-300 rounded-lg py-2 px-4 mb-4 float-left"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearchTermChange}
            />
          </div>
          <div className="mt-4 bg-gray-200 rounded-lg p-4">
            {results.map((result) => (
              <p className="text-gray-700 mb-2 border-b border-gray-300">
                {result.name}
              </p>
            ))}
          </div>
        </div>
      </Bubble>
    </div>
  );
}

export default SearchBar;
