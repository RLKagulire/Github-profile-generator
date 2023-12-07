import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

function InputForm() {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  function handleInputForm(e) {
    e.preventDefault();
    setLoading(true);

    fetch(`https://api.github.com/users/${username}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        localStorage.setItem("user", JSON.stringify(data));
        navigate("/user");
      })
      .catch((error) => {
        console.log(error);
        // Handle error here
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-700">
      <div className="flex-grow flex-shrink-0 w-full max-w-screen-md p-6 bg-white rounded-lg shadow-lg">
        <div className="p-6">
          <h2 className="text-4xl font-bold text-gray-800 mb-6 text-center">
            <FaSearch className="inline-block mr-2 text-blue-500" />
            Search For Any GitHub Profile Here
          </h2>
          <form className="text-lg text-gray-700">
            <div className="flex items-center mb-4">
              <input
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                className="flex-1 px-4 py-2 rounded-l-md bg-gray-200 text-gray-800 focus:outline-none focus:ring focus:border-blue-300"
                type="text"
                placeholder="Enter GitHub Username"
              />
              <button
                onClick={handleInputForm}
                className={`px-6 py-2 rounded-r-md bg-blue-500 text-white focus:outline-none ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={loading || !username}
              >
                {loading ? "Searching..." : "Search"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default InputForm;
