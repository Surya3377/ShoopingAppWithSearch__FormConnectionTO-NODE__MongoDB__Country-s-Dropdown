



import React, { useEffect, useState } from "react";
import axios from "axios";
import classes from "./NodeApi.module.css";

const NodeApi = () => {
  const [data, setData] = useState({});
  const [payloadData, setPayloadData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    gender: "",
    dateofbirth: "",
  });

  const apiDataDetails = () => {
    axios
      .post("http://localhost:3000/RegisterPage", payloadData)
      .then((res) => {
        console.log(res.data);
        setData(res.data);
        setPayloadData({
          firstName: "",
          lastName: "",
          age: "",
          gender: "",
          dateofbirth: "",
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/getaddbrands");
        setData(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (event) => {
    setPayloadData({ ...payloadData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    apiDataDetails();
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>First Name</label>&nbsp;&nbsp;
        <input
          type="text"
          name="firstName"
          onChange={handleInputChange}
          placeholder="First Name"
          value={payloadData.firstName}
        />
        <br />
        <label>Last Name</label>&nbsp;&nbsp;
        <input
          type="text"
          name="lastName"
          onChange={handleInputChange}
          placeholder="Last Name"
          value={payloadData.lastName}
        />
        <br />
        <label>Age</label>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <input
          type="number"
          name="age"
          onChange={handleInputChange}
          placeholder="Age"
          value={payloadData.age}
        />
        <br />
        <label>Gender</label>
        <input
          type="radio"
          name="gender"
          value="Male"
          onChange={handleInputChange}
        />
        Male
        <input
          type="radio"
          name="gender"
          value="Female"
          onChange={handleInputChange}
        />
        Female
        <br />
        <label>Date of Birth</label>
        <input
          type="date"
          name="dateofbirth"
          placeholder="Date of Birth"
          value={payloadData.dateofbirth}
          onChange={handleInputChange}
        />
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default NodeApi;
