/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCartThunk, deleteitemCartThunk, removeCartThunk, changeQuantityThunk } from '../redux/actions';
import '../styles/Cart.css'


const Cart = () => {

const dispatch = useDispatch();
const cart = useSelector(state => state.cart)

const addCart = (x, y) => {
  console.log(x, y)
   dispatch(changeQuantityThunk(x, y))
}


useEffect(() => {
    dispatch(getCartThunk())  
  },[dispatch])

const deleteProduct = id => {
  dispatch(deleteitemCartThunk(id))
}

const removeCart = () => {
  dispatch(removeCartThunk())
}

const prices = (cart.map( cart => Math.floor(cart.product.price * cart.quantity)))
  const totalPrice = prices.reduce( (anterior, actual)=> anterior + actual, 0 )

  console.log(prices)
  
  return (
      <div className='container-cart'>
        <h1 className="cart-name">Cart</h1>

        <div className='row'>  
            
            <div className='list'>
              {
                cart.map(cart => (
                  <div key={cart.id} className='list-card'>
                    <div className='list-info'>  
                      <img src={cart.product.images[0].url} alt=""  style={{width: "100px"}}/>   
                      <Link className='text'  to={`/shop/${cart.product.name}`}> {cart.product?.name} </Link>                
                      <p className='text'>$ {cart.product.price}</p>
                      <p className='text'>{cart.quantity}</p>
                      <p className='text'>$ {cart.product.price * cart.quantity}</p>
                      <button className='text' onClick={() => deleteProduct(cart.id)}>Borrar</button>
                      <button onClick={() => addCart(cart.id, (cart.quantity+1)) } >+</button>
                      <button onClick={() => addCart(cart.id, (cart.quantity-1)) }>-</button>

                    </div>
                  </div>
                ))
              }
            </div>
        </div>        
        <button className=" vaciar-carrito" onClick={removeCart}>Vaciar carrito</button>
        
        <h2 className="vaciar-carrito2">Total a Pagar: $ {totalPrice}</h2>
      </div>
  )}

export default Cart;
