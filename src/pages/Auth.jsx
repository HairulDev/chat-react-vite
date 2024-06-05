import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchUsers, signin } from "../store/actions/user";

const Auth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.userReducer);

  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    if (!users.length) dispatch(fetchUsers());
  }, [users, dispatch]);

  const handleRadioChange = (event) => {
    const userId = event.target.value;
    const user = users?.find((user) => user.id === parseInt(userId));
    setSelectedUser(user);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (selectedUser) {
      dispatch(signin(selectedUser));
      navigate("/");
    }
  };
  console.log("users===>>", users);

  return (
    <div className="flex justify-center items-center min-h-screen bg-slate-700">
      <div className="w-full max-w-xs p-8 bg-slate-800  shadow-md rounded">
        <div className="text-center mb-4">
          <div className="inline-block p-2 bg-gray-200 rounded-full">
            <svg
              className="w-6 h-6 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 11c0 .552-.224 1.077-.586 1.464A2.09 2.09 0 0110 13.5h-.01a2.09 2.09 0 01-1.404-.536C8.224 12.577 8 12.052 8 11.5c0-.552.224-1.077.586-1.464A2.09 2.09 0 0110 9.5h.01c.37 0 .728.1 1.404.536C11.776 10.423 12 10.948 12 11.5zm0 0a9.978 9.978 0 01-4.489 7.678A9.973 9.973 0 013.5 18a9.978 9.978 0 017.678-4.489m1.667-3.778A2.091 2.091 0 0013.01 9.5H13a2.09 2.09 0 00-1.404.536A2.091 2.091 0 0011 11.5c0 .552.224 1.077.586 1.464A2.09 2.09 0 0013 13.5h.01c.37 0 .728-.1 1.404-.536A2.09 2.09 0 0016 11.5c0-.552-.224-1.077-.586-1.464A2.09 2.09 0 0013 9.5h-.01a2.091 2.091 0 00-1.404.536A2.091 2.091 0 0011 11.5zM3.95 8.44a9.978 9.978 0 0110.56-.123A9.978 9.978 0 0118 6a9.978 9.978 0 014.25 1.317A9.978 9.978 0 0120.5 6a9.978 9.978 0 01-4.037 4.036A9.978 9.978 0 0113 13.5a9.978 9.978 0 01-6.437-1.376 9.978 9.978 0 01-2.313-3.684zM18 13.5A2.09 2.09 0 0116.404 12.464A2.09 2.09 0 0115 11.5h-.01a2.09 2.09 0 01-1.404-.536A2.09 2.09 0 0113 9.5h-.01c-.37 0-.728.1-1.404.536A2.09 2.09 0 0110 11.5c0 .552-.224 1.077-.586 1.464A2.09 2.09 0 008 13.5h-.01c-.37 0-.728-.1-1.404-.536A2.09 2.09 0 015 11.5h-.01c-.37 0-.728.1-1.404.536A2.09 2.09 0 013 13.5c0 .552-.224 1.077-.586 1.464A2.09 2.09 0 011 15.5h-.01c-.37 0-.728.1-1.404.536A2.09 2.09 0 011 18.5c0 .552.224 1.077.586 1.464A2.09 2.09 0 013 20.5h-.01c.37 0 .728-.1 1.404-.536A2.09 2.09 0 015 18.5h.01c.37 0 .728-.1 1.404-.536A2.09 2.09 0 017 18.5h.01c.37 0 .728-.1 1.404-.536A2.09 2.09 0 0110 18.5h.01c.37 0 .728-.1 1.404-.536A2.09 2.09 0 0113 18.5h.01c.37 0 .728-.1 1.404-.536A2.09 2.09 0 0115 18.5h.01c.37 0 .728-.1 1.404-.536A2.09 2.09 0 0118 18.5c0 .552.224 1.077.586 1.464A2.09 2.09 0 0120.5 20h.01c.37 0 .728-.1 1.404-.536A2.09 2.09 0 0124 18.5c0-.552-.224-1.077-.586-1.464A2.09 2.09 0 0120.5 15.5h-.01c-.37 0-.728-.1-1.404-.536A2.09 2.09 0 0118 13.5h.01c-.37 0-.728.1-1.404.536A2.09 2.09 0 0113 15.5h.01c-.37 0-.728-.1-1.404-.536A2.09 2.09 0 0110 13.5h.01c-.37 0-.728.1-1.404.536A2.09 2.09 0 017 15.5h.01c-.37 0-.728-.1-1.404-.536A2.09 2.09 0 013 13.5h.01c.37 0 .728.1 1.404.536A2.09 2.09 0 015 15.5h.01c.37 0 .728.1 1.404.536A2.09 2.09 0 018 15.5h.01c.37 0 .728-.1 1.404-.536A2.09 2.09 0 0111 13.5h.01c.37 0 .728.1 1.404.536A2.09 2.09 0 0113 13.5h.01c.37 0 .728.1 1.404.536A2.09 2.09 0 0115 13.5h.01c.37 0 .728.1 1.404.536A2.09 2.09 0 0118 13.5zM13 11.5h.01c.37 0 .728.1 1.404.536A2.09 2.09 0 0115 11.5h.01c-.37 0-.728-.1-1.404-.536A2.09 2.09 0 0113 11.5h.01c.37 0 .728.1 1.404.536A2.09 2.09 0 0115 11.5h.01c.37 0 .728-.1 1.404-.536A2.09 2.09 0 0113 11.5h-.01zm0 0c.37 0 .728-.1 1.404-.536A2.09 2.09 0 0115 11.5h.01c-.37 0-.728-.1-1.404-.536A2.09 2.09 0 0113 11.5h-.01zM18 11.5c0 .215-.39.052-1.065-.414A2.09 2.09 0 0115 11.5h-.01c-.37 0-.728-.1-1.404-.536A2.09 2.09 0 0113 11.5h.01c.37 0 .728.1 1.404.536A2.09 2.09 0 0118 11.5zM12 3a9 9 0 100 18 9 9 0 000-18z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-semibold mt-2 text-gray-400">
            Choose User
          </h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            {users.length > 0
              ? users.map((user) => (
                  <div key={user.id} className="flex items-center">
                    <img
                      src={`./images/${user.image}`}
                      alt={user.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <div className="ml-4">
                      <label className="flex items-center space-x-2 text-gray-400">
                        <input
                          type="radio"
                          name="user"
                          value={user.id}
                          checked={selectedUser && selectedUser.id === user.id}
                          onChange={handleRadioChange}
                          className="text-blue-500 focus:ring-blue-400"
                        />
                        <span>{user.name}</span>
                      </label>
                    </div>
                  </div>
                ))
              : "User not found"}
          </div>
          <button
            type="submit"
            className="mt-6 w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Auth;
