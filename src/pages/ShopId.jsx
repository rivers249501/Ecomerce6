import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { addCartThunk, filterCategoriesThunk, getProductDetailThunk } from '../redux/actions';
import '../styles/ShopId.css'

const ShopId = () => {

  const { id } = useParams();
  const dispatch = useDispatch();
  const product = useSelector(state => state.productDetail);
  const productsList = useSelector(state => state.productsList);
  console.log(productsList)
  const {images} = useSelector(state => state.productDetail)
  console.log(images)
  const [cart, setCart] = useState(0)

  useEffect(() => {
    dispatch(getProductDetailThunk(id))
  },[dispatch, id]);

  useEffect(() => {
    if(product.category){
      dispatch(filterCategoriesThunk(product.category?.id))
    }
  },[dispatch, product]);
console.log(product)

const addCart = () => {
  const countCart = {
    product: id,
    quantity: cart
    
  }
  dispatch(addCartThunk((countCart)))
}

  return (

    <div className='container-shopid'>
    <aside className='container-principal'>
      <div className='images'>
        { 
          images && <img src={images[0].url} alt='' />
        }
      </div>
      <div className='info'>
        <h1>{product.name}</h1>
        <h5>{product?.description}</h5>
        <h5>{product.category?.name} </h5>

        <h4 className="cartName">Cart</h4>
        <div style={{display: "flex"}}>
            <button onClick={() => setCart(cart - 1)}> - </button>
              <div> {cart} </div>
            <button onClick={() => setCart(cart + 1)}> + </button>
          </div>
        <button onClick={() => addCart(product.id)}>Agregar al carrito</button>
      </div>

      
    </aside>
    
    <aside className='aside-rigth'>
     <h3>Productos relacionados</h3> 
     <div className='products-relation'>
        <ul> 
          {
            productsList.map(products =>
              <div className='card-products'>
                <img src={products.images[0]?.url} alt='' style={{width: "100px"}}/>
                <li key={products.id}>
                  <Link to={`/shop/${products.id}`}>
                    {products?.name}
                  </Link>                              
                </li>              
                <p>{products.price}</p>
              </div> 
              )
          }
        </ul>
      </div>         
    </aside>
  </div>
)};

export default ShopId;
