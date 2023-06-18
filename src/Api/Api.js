import axios from "axios";
import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router";

const Api = () => {
  const [data, setData] = useState([
    { firstName: "Terryhnkhg", maidenName: "Smitham", lastName: "Medhurst" },
  ]);
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const navigate = useNavigate();
  const [formData, setFormData] = useState([]);

  const apiData = () => {
    axios.get(`https://dummyjson.com/users`).then((getResponse) => {
      console.log(getResponse.data.users);
      const existingData = getResponse.data.users;
      setData(existingData);
    });
  };

  useEffect(() => {
    apiData("");
  }, []);

  const changeHandler = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    axios.post(`https://dummyjson.com/users/add`, formData).then((postData) => {
      const newData = postData.data;
      console.log(postData.data);
      setData([...data, newData]);
      setFormData({ firstName: "", maidenName: "", lastName: "" });
    });
  };

  const removeItem = (index) => {
    const newData = [...data];
    newData.splice(index, 1);
    setData(newData);
  };

  const clearData = () => {
    setData([]);
  };

  return (
    <div>
      <div>
        <form>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={changeHandler}
            placeholder="FirstName"
          />{" "}
          <br />
          <input
            type="text"
            name="maidenName"
            value={formData.maidenName}
            onChange={changeHandler}
            placeholder="maidenName"
          />{" "}
          <br />
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={changeHandler}
            placeholder="lastName"
          />{" "}
          <br />
          <button type="submit" onClick={submitHandler}>
            SignUp
          </button> <br/>
          <button onClick={clearData}>Clear Data</button>
          {/* <button onClick={loginHandler}>Login</button> */}
        </form>
        <div>
          {data.map((users, id) => {
            return (
              <div key={id}>
                <div>First Name: {users.firstName}</div>
                <div>Maiden Name: {users.maidenName}</div>
                <div>Last Name: {users.lastName}</div>
                <button onClick={() => removeItem(id)}>Remove</button>&nbsp;
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Api;

// import axios from "axios";
// import React, { useEffect, useState } from "react";

// const Api = () => {
//   const [data, setData] = useState([]);
//   const [formData, setFormData] = useState({
//     firstName: "",
//     maidenName: "",
//     lastName: "",
//   });

//   const dataFetch = () => {
//     axios
//       .get("https://dummyjson.com/users")
//       .then((getRes) => {
//         const existingData = getRes.data.users;
//         setData(existingData);
//       })
//       .catch((err) => {
//         console.error(err);
//       });
//   };

//   useEffect(() => {
//     dataFetch();
//   }, []);

//   const handleSubmit = (event) => {
//     event.preventDefault();

//     axios
//       .post(`https://dummyjson.com/users/add`, formData)
//       .then((postData) => {
//         const newData = postData.data;
//         setData([...data, newData]);
//         setFormData({ firstName: "", maidenName: "", lastName: "" });
//       })
//       .catch((err) => {
//         console.error(err);
//       });
//   };

//   const handleChange = (event) => {
//     setFormData({ ...formData, [event.target.name]: event.target.value });
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <label>
//           First Name:
//           <input
//             type="text"
//             name="firstName"
//             value={formData.firstName}
//             onChange={handleChange}
//           />
//         </label>
//         <br />
//         <label>
//           Maiden Name:
//           <input
//             type="text"
//             name="maidenName"
//             value={formData.maidenName}
//             onChange={handleChange}
//           />
//         </label>
//         <br />
//         <label>
//           Last Name:
//           <input
//             type="text"
//             name="lastName"
//             value={formData.lastName}
//             onChange={handleChange}
//           />
//         </label>
//         <br />
//         <button type="submit">Add User</button>
//       </form>
//       <div>
//         {Array.isArray(data) &&
//           data.map((user, id) => (
//             <div key={id}>
//               <div>First Name: {user.firstName}</div>
//               <div>Maiden Name: {user.maidenName}</div>
//               <div>Last Name: {user.lastName}</div>
//             </div>
//           ))}
//       </div>
//     </div>
//   );
// };

// export default Api;

// const loginHandler = (event) => {
//   event.preventDefault();
//   axios.post("https://dummyjson.com/login", formData)
//     .then(() => setIsLoggedIn(true))
//     .catch(() => setIsLoggedIn(false));
//     const user = data.find(
//       (user) => user.firstName === formData.firstName && user.maidenName === formData.maidenName && user.lastName  === formData.lastName
//     );
//     if(user) {
//       navigate("/")
//     }else{
//       console.log("detais are wrong")
//     }
// };
