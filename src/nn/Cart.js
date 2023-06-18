import React from 'react';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link } from 'react-router-dom';

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));

const Cart = ({ cartItems }) => {
  const totalCount = cartItems.length;

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '20px',
        marginRight: '150px',
        border: '2px solid white',
        backgroundColor: '#2874f0',
        borderRadius: '10px',
        boxShadow: '0px 0px 50px black',
        padding: '0px 10px',
        cursor: 'pointer',
        color: 'snow',
        textDecoration: 'none',
      }}
    >
      <h3> Your Cart</h3>
      <Link to="/cart">
        <IconButton aria-label="cart">
          <StyledBadge badgeContent={totalCount} sx={{ color: 'white' }}>
            <ShoppingCartIcon />
          </StyledBadge>
        </IconButton>
      </Link>
    </div>
  );
};

export default Cart;