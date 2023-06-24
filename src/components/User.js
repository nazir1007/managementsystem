import React, { useState, useEffect } from "react";

const User = () => {
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [listData, setListData] = useState([]);
  const [editClick, setEditClick] = useState(false);
  const [editIndex, setEditIndex] = useState("");

  useEffect(() => {
    const storedData = window.localStorage.getItem("listData");
    if (storedData) {
      setListData(JSON.parse(storedData));
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("listData", JSON.stringify(listData));
  }, [listData]);

  const handleChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!inputs.name || !inputs.email || !inputs.phone) {
      alert("Please fill all fields");
      return;
    }

    if (editClick) {
      const tempListData = [...listData];
      tempListData[editIndex] = inputs;
      setListData(tempListData);
      setEditClick(false);
      setEditIndex("");
    } else {
      setListData([...listData, inputs]);
    }

    setInputs({
      name: "",
      email: "",
      phone: "",
    });
  };

  const deleteUser = (index) => {
    const updatedData = listData.filter((item, i) => i !== index);
    setListData(updatedData);
  };

  const editUser = (index) => {
    const tempData = listData[index];

    setInputs({ name: tempData.name, email: tempData.email, phone: tempData.phone });
    setEditClick(true);
    setEditIndex(index);
  };

  return (
    <div className="container">
      <h1>Management System</h1>
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name</label>
            <input type="text" name="name" value={inputs.name} onChange={handleChange} />
          </div>
          <div>
            <label>Email</label>
            <input type="email" name="email" value={inputs.email} onChange={handleChange} />
          </div>
          <div>
            <label>Phone</label>
            <input type="tel" name="phone" value={inputs.phone} onChange={handleChange} />
          </div>
          <button type="submit">{editClick ? "Update" : "Add"}</button>
        </form>
      </div>
      <ul>
        {listData.map((item, index) => (
          <li key={index}>
            <div className="data-column">
              <div>Name: {item.name}</div>
              <div>Email: {item.email}</div>
              <div>Phone: {item.phone}</div>
            </div>
            <div className="btn-column">
              <button className="btn btn-warning" type="button" onClick={() => editUser(index)}>
                Edit
              </button>
              <button className="btn btn-danger" type="button" onClick={() => deleteUser(index)}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default User;
