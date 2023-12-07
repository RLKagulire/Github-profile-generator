import React, { useEffect, useState } from "react";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCode, faStar, faCircle } from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import "../App.css";

function Profile() {
  const [userData, setUserData] = useState();
  const [topRepositories, setToprepositories] = useState();

  function getToprepositories() {
    fetch(userData?.repos_url)
      .then((response) => response.json())
      .then((data) => setToprepositories(data))
      .catch((error) => console.log(error));
  }

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const parsedUserData = JSON.parse(user);
      setUserData(parsedUserData);
    }
    getToprepositories();
  }, [userData]);

  return (
    <div className="min-h-screen bg-blue-700 py-10 font-roboto-slab">
      <div className="container mx-auto flex flex-wrap items-center bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Left Side: Profile Picture and User Info */}
        <div className="w-full md:w-1/2 px-4 py-6 text-center md:border-r md:border-gray-700">
          <img
            src={userData?.avatar_url}
            alt="ProfileImage"
            className="profile-image rounded-full border-4 border-blue-700 mb-4 mx-auto"
          />
          <h1 className="user-data text-3xl font-bold text-gray-800">
            {userData?.name ?? userData?.login}
          </h1>
          <h2 className="company text-xl text-gray-600 mb-4">{userData?.company}</h2>

          <div className="location mb-4">
            <span className="text-sm text-gray-600">
              <h6 className="font-bold">Location:</h6>
              {userData?.location ? userData?.location : "No Location"}
            </span>
            <span className="text-sm text-gray-600 ml-4">
              <h6 className="font-bold">Date Joined:</h6>
              {moment(userData?.created_at).format("DD/MM/YYYY")}
            </span>
          </div>

          <div className="flex justify-around p-2 space-x-4">
            <div className="text-center border border-blue-700 p-2 rounded-lg w-32">
              <span className="repositories text-lg font-semibold text-purple-700">
                {userData?.public_repos}
              </span>
              <span className="text-sm text-gray-600 block">Repositories</span>
            </div>
            <div className="text-center border border-blue-700 p-2 rounded-lg w-32">
              <span className="followers text-lg font-semibold text-purple-700">{userData?.followers}</span>
              <span className="text-sm text-gray-600 block">Followers</span>
            </div>
            <div className="text-center border border-blue-700 p-2 rounded-lg w-32">
              <span className="following text-lg font-semibold text-purple-700">{userData?.following}</span>
              <span className="text-sm text-gray-600 block">Following</span>
            </div>
          </div>

          {/* GitHub Icon */}
          <a
            href={userData?.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-gray-800 mt-4"
          >
            <FontAwesomeIcon icon={faGithub} size="2x" />
          </a>
        </div>

        {/* Right Side: Top Repositories */}
        <div className="w-full md:w-1/2 px-4">
          <div className="profile-container">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Top Repositories</h3>
            {topRepositories?.slice(0, 10).map((repository, index) => (
              <div key={index} className="bg-gradient-to-r from-blue-300 to-blue-500 p-4 rounded-lg shadow mb-4">
                <h4 className="text-md font-semibold text-white mb-2">{repository.name}</h4>
                <p className="text-sm text-gray-200 mb-2">{repository.description}</p>
                <div className="flex items-center">
                  <FontAwesomeIcon icon={faCode} className="text-gray-200 mr-2" />
                  <span className="text-xs text-gray-200">{repository?.language || "No Language"}</span>
                  <FontAwesomeIcon icon={faStar} className="text-yellow-500 ml-auto" />
                  <span className="text-xs text-gray-200">{repository.stargazers_count}</span>
                  <FontAwesomeIcon icon={faCircle} className="text-green-500 ml-2" />
                  <span className="text-xs text-gray-200">{repository.forks}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
