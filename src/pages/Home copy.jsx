import React, { useState, useEffect } from "react";
import { getAll, getDataAccess } from "../store/actions/user";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import DataDisplay from "../components/molecules/DataDisplay";

const Home = () => {
  const dispatch = useDispatch();
  const initialState = {
    searchTerm: "",
  };
  const [form, setForm] = useState(initialState);
  const { dataAccess, dataAccessAll } = useSelector(
    (state) => state.userReducer
  );
  const [stateDataAccess, setStateDataAccess] = useState();
  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    dispatch(getAll());
  }, []);

  useEffect(() => {
    dispatch(getDataAccess({ searchTerm: "", limit, offset }));
  }, []);

  useEffect(() => {
    setStateDataAccess({ ...stateDataAccess, data: dataAccess });
  }, [dataAccess]);

  const handleSearch = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setOffset(0);
  };

  const submitSearch = (e) => {
    e.preventDefault();
    dispatch(
      getDataAccess({ searchTerm: form.searchTerm, limit, offset })
    ).then((res) => {
      setStateDataAccess({ ...stateDataAccess, data: res });
    });
  };

  const handleNextPage = () => {
    setOffset((prev) => prev + limit);
  };

  const handlePreviousPage = () => {
    setOffset((prev) => (prev - limit >= 0 ? prev - limit : 0));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Data Tree</h1>
      <div style={{ display: "flex", marginBottom: "10px" }}>
        <input
          type="text"
          placeholder="Search..."
          name="searchTerm"
          onChange={handleSearch}
          className="border p-2"
          style={{ marginRight: "8px", width: "400px" }}
        />
        <button
          onClick={submitSearch}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Search
        </button>
      </div>
      <table className="min-w-full bg-white border mr-4">
        <thead>
          <tr>
            <th className="py-2 px-4 border">Code</th>
            <th className="py-2 px-4 border">Description</th>
            <th className="py-2 px-4 border">Level</th>
          </tr>
        </thead>
        <tbody>
          {stateDataAccess?.data?.map((item) => (
            <TreeRow key={item.Id} node={item} level={0} />
          ))}
        </tbody>
      </table>
      <div className="mt-4 flex justify-between">
        <button
          onClick={handlePreviousPage}
          className="bg-blue-500 text-white px-4 py-2 rounded"
          disabled={offset === 0}
        >
          Previous
        </button>
        <button
          onClick={handleNextPage}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Next
        </button>
      </div>
      <div className="flex justify-center">
        <DataDisplay data={dataAccessAll} />
      </div>
    </div>
  );
};

const TreeRow = ({ node, level }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded((prev) => !prev);
  };

  return (
    <>
      <tr className={`level-${level}`}>
        <td
          className={`py-2 px-4 border ${
            node.children.length > 0 ? "cursor-pointer" : ""
          }`}
          onClick={toggleExpand}
          style={{ paddingLeft: `${level * 20}px` }}
        >
          {node.children.length > 0 && (
            <span className="mr-2 text-blue-500">{expanded ? "-" : "+"}</span>
          )}
          {node.Code}
        </td>
        <td className="py-2 px-4 border">{node.Description}</td>
        <td className="py-2 px-4 border">{node.Level}</td>
      </tr>
      {expanded &&
        node.children.map((child) => (
          <TreeRow key={child.Id} node={child} level={level + 1} />
        ))}
    </>
  );
};

export default Home;
