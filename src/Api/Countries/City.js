// import axios from "axios";
// import React, { useEffect, useState } from "react";

// const Countries = () => {
//   const [data, setData] = useState([]);
//   const [getCountry, setCountry] = useState("");
//   const [getState, setState] = useState([]);
//   const [selectedState,setSelectedState] = useState("");
//   const [cities,setCities] = useState([]);

//   const countriesData = () => {
//     axios
//       .get(
//         `https://pkgstore.datahub.io/core/world-cities/world-cities_json/data/5b3dd46ad10990bca47b04b4739a02ba/world-cities_json.json`
//       )
//       .then((res) => {
//         console.log(res.data);
//         setData(res.data);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };

//   useEffect(() => {
//     countriesData();
//   }, []);

//   const country = [...new Set(data.map((item) => item.country))];

//   country.sort();

//   const handleCountry = (e) => {
//     let states = data.filter((state) => state.country === e.target.value);
//     states = [...new Set(states.map((item) => item.subcountry))];
//     states.sort();
//     setState(states);
//     setCountry(e.target.value);
//     setSelectedState("");
//     setCities([]);
//   };

//   const handleState = (e) => {
//       setSelectedState(e.target.value);
//       let cities = data.filter(city => city.subcountry === e.target.value)
//       cities.sort((a, b) => a.name.localeCompare(b.name));
//       setCities(cities)
//   }

//   return (
//     <div>
//       <div>
//         <h3>Country : </h3>
//         <select value={getCountry} onChange={(e) => handleCountry(e)}>
//           <option value="">Select Country</option>
//           {country.map((items, id) => {
//             return (
//               <option key={id} value={items}>
//                 {items}
//               </option>
//             );
//           })}
//         </select>
//       </div>
//       <div>
//         <h3>State : </h3>
//         <select value={selectedState} onChange={(e) => handleState(e)}>
//             <option value="">Select State</option>
//           {getState.map((items, id) => {
//             return (
//               <option key={id} value={items}>
//                 {items}
//               </option>
//             );
//           })}
//         </select>
//       </div>
//       <div>
//         <h3>City : </h3>
//         <select>
//             <option value="">Select City</option>
//           {cities.map((items, id) => {
//             return (
//               <option key={id} value={items.name}>
//                 {items.name}
//               </option>
//             );
//           })}
//         </select>
//       </div>
//     </div>
//   );
// };

// export default Countries;

import axios from "axios";
import React, { useEffect, useState } from "react";

const Countries = () => {
  const [data, setData] = useState([]);
  const [rows, setRows] = useState([{ country: "", state: "", city: "" }]);

  const countriesData = () => {
    axios
      .get(
        `https://pkgstore.datahub.io/core/world-cities/world-cities_json/data/5b3dd46ad10990bca47b04b4739a02ba/world-cities_json.json`
      )
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    countriesData();
  }, []);

  const country = [...new Set(data.map((item) => item.country))];

  country.sort();

  const handleCountry = (e, index) => {
    let states = data.filter((state) => state.country === e.target.value);
    states = [...new Set(states.map((item) => item.subcountry))];
    states.sort();
    const newRows = [...rows];
    newRows[index] = {
      ...newRows[index],
      country: e.target.value,
      state: "",
      city: "",
    };
    setRows(newRows);
  };

  const handleState = (e, index) => {
    const newRows = [...rows];
    newRows[index] = { ...newRows[index], state: e.target.value, city: "" };
    setRows(newRows);

    let cities = data.filter((city) => city.subcountry === e.target.value);

    cities.sort((a, b) => a.name.localeCompare(b.name));

    const row = rows[index];
    const otherRows = rows.filter((r, i) => i !== index);

    const citiesForOtherRows = otherRows.map((r) =>
      data.filter((city) => city.subcountry === r.state)
    );

    const selectedCities = [...cities, ...citiesForOtherRows.flat()].filter(
      (c) => c.name !== row.city
    );

    const allCities = [...new Set(selectedCities.map((c) => c.name))];
    newRows[index] = { ...newRows[index], city: allCities[0] };
    setRows(newRows);
  };

  const handleCity = (e, index) => {
    const newRows = [...rows];
    newRows[index] = { ...newRows[index], city: e.target.value };
    setRows(newRows);
  };

  const addRow = () => {
    const lastRow = rows[rows.length - 1];
    if (!lastRow.country || !lastRow.state || !lastRow.city) {
      return;
    }
    setRows([...rows, { country: "", state: "", city: "" }]);
  };

  const removeRow = (index) => {
    const newRows = rows.filter((r, i) => i !== index);
    setRows(newRows);
  };

  return (
    <div>
      {rows.map((row, index) => (
        <div key={index}>
          <div>
            <h3>Country : </h3>
            <select
              value={row.country}
              onChange={(e) => handleCountry(e, index)}
            >
              <option value="">Select Country</option>
              {country.map((items, id) => {
                return (
                  <option key={id} value={items}>
                    {items}
                  </option>
                );
              })}
            </select>
          </div>

          <>
            <div>
              <h3>State : </h3>
              <select value={row.state} onChange={(e) => handleState(e, index)}>
                <option value="">Select State</option>
                {data
                  .filter((state) => state.country === row.country)
                  .map((items, id) => {
                    return (
                      <option key={id} value={items.subcountry}>
                        {items.subcountry}
                      </option>
                    );
                  })}
              </select>
            </div>

            <>
              <div>
                <h3>City : </h3>
                <select value={row.city} onChange={(e) => handleCity(e, index)}>
                  <option value="">Select City</option>
                  {data
                    .filter((city) => city.subcountry === row.state)
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map((items, id) => {
                      return (
                        <option key={id} value={items.name}>
                          {items.name}
                        </option>
                      );
                    })}
                </select>
              </div>
              {rows.length - 1 === index && (
                <div>
                  <button
                    onClick={addRow}
                    disabled={
                      row.city && row.state && row.country ? false : true
                    }
                  >
                    Add
                  </button>
                </div>
              )}
              {rows.length > 1 && (
                <div>
                  <button onClick={() => removeRow(index)}>Delete</button>
                </div>
              )}
            </>
          </>
        </div>
      ))}
    </div>
  );
};

export default Countries;
