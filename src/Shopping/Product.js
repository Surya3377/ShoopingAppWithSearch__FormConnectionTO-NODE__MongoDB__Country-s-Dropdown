import axios from 'axios';
import React, { useState, useEffect } from 'react';

const Product = () => {
  const [data, setData] = useState([]);
  const [searchItem, setSearchItem] = useState('');

  
    const fetchData = async () => {
      try {
        const response = await axios.get('https://dummyjson.com/products');
        setData(response.data.products);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    
    useEffect(() => {
    fetchData("");
  }, []);

  const searchHandler = (e) => {
    setSearchItem(e.target.value);
  };

  const filteredData = data.filter((product) =>
    product.id.toString().toLowerCase().includes(searchItem.toLowerCase())
  );

  return (
    <div>
      <div className='header'>
        <div className='header_left'>
          <h1>Shopping Zone</h1>
        </div>
        <div className='header_middle'>
          <input
            type='text'
            value={searchItem}
            onChange={searchHandler}
            placeholder='Search...'
          />
        </div>
        <div className='header_right'>
          <h1>Cart</h1>
        </div>
      </div>
      <div className='shop_products'>
        {filteredData.map((product, id) => (
          <div key={id}>
            <h3>{product.id}</h3>
            <h3>{product.title}</h3>
            <h3>{product.description}</h3>
            <h3>{product.price}</h3>
            {product.images.map((image, imgId) => (
              <div key={imgId}>
                <img src={image} alt='product image' />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Product;














// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const Product = () => {
//   const [data, setData] = useState([]);
//   const [searchTerm,setSearchTerm] = useState("")

//   useEffect(() => {
//     axios.get('https://dummyjson.com/products').then((res) => {
//       console.log(res.data.products);
//       setData(res.data.products);
//     });
//   }, []);

//   const filterData = data.filter((item) =>
//     item.title?.toLowerCase().includes(searchTerm?.toLowerCase())
//   );

//   const searchHandler = (e) => {
//     setSearchTerm(e.target.value)
//   }
//   return (
//     <div>
//         <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
//         <div>
//             <h1>Shopping Zone</h1>
//         </div>
//         <div>
//         <input type='text' value={searchTerm} onChange={searchHandler} placeholder='Search...' />
//         </div>
//         <h1>Cart</h1>
//         </div>
//       <div>
//         {filterData.map((product) => {
//           return <div key={product.id}>{product.title}</div>;
//         })}
//       </div>
//     </div>
//   );
// };

// export default Product;
