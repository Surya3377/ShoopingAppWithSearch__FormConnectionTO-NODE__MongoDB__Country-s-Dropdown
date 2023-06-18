import React, { useEffect, useState } from 'react';
import { CircularProgress } from '@mui/material';
import Button from '@mui/material/Button';
import { Carousel } from 'antd';
import axios from 'axios';
import "./Network.module.css";

const Network = ({ addToCart, searchTerm }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = () => {
    setIsLoading(true);
    axios
      .get('https://dummyjson.com/products')
      .then((res) => {
        console.log(res.data);
        setTimeout(() => {
          setData(res.data.products);
          setIsLoading(false);
        }, 1000);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchData('');
  }, []);

  const onChange = (currentSlide) => {
    console.log(currentSlide);
  };

  const filteredData = data.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      {isLoading ? (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '20%',
          }}
        >
          <CircularProgress />
        </div>
      ) : (
        <div style={{ textAlign: 'center' }}>
          {filteredData.map((user, id) => (
            <ul key={id}>
              <h3>Title: {user.title}</h3>
              <h3>Description: {user.description}</h3>
              <h3>Price: {user.price}$</h3>
              <div style={{ position: 'relative' }}>
                <Carousel afterChange={onChange} autoplay arrows dots>
                  {user.images.map((image, index) => (
                    <div key={index}>
                      <img
                        src={image}
                        alt=""
                        height="500px"
                        width="60%"
                        style={{ margin: '0 auto', backgroundColor: 'gray' }}
                      />
                    </div>
                  ))}
                </Carousel>
              </div>
              <Button
                variant="contained"
                sx={{
                  boxShadow: '0px 0px 50px gray',
                  marginTop: '10px',
                  borderRadius: '10px',
                }}
                onClick={() => addToCart(user)}
              >
                Add to Cart
              </Button>
            </ul>
          ))}
        </div>
      )}
    </div>
  );
};

export default Network;
