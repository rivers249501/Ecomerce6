import React, { useEffect, useState } from "react";
import {  Link } from "react-router-dom";
import { getCategoriesThunk, getProductListThunk, filterCategoriesThunk, filterHeadlineThunk } from "../redux/actions";
import { useDispatch, useSelector} from 'react-redux';
import '../styles/Shop.css'



const Shop = () => {
  
  const dispatch = useDispatch();

  useEffect( () => {
    dispatch(getProductListThunk())
    dispatch(getCategoriesThunk())
    
  },[dispatch])

  const productsList = useSelector(state => state.productsList);
  console.log(productsList)

  const categories = useSelector(state => state.categories)
  console.log(categories)


  const filterCategories = id => dispatch(filterCategoriesThunk(id))
    
  const [ search, setSearch ] = useState("");


  const filterHeadline = e => {
    e.preventDefault();
    dispatch(filterHeadlineThunk(search))

  }


  return (

    <div>
       <strong className="shop-name">The Lord Of king</strong>

      <div className="container-shopcategory">
          {
          categories.map(category =>(
        
            <div className="container-shopcategory" key={category.id}> 
              <button onClick={() => filterCategories(category.id)}>{category.name}</button>
            </div>
            ))
          }
      </div>
      
      <form className="container-shopform" onSubmit={filterHeadline}>
          <input type="text" placeholder="Name and press Enter"  value={search} onChange={ e => setSearch(e.target.value)}/>
      </form>
      <div className='list-product'> 
  {
    productsList.map(product => (
      <div className="card" key={product.id} >
          <img  src={product.images[0].url} alt="" />
        <div className="info-price">
            <p className="product-name">
              <Link to={`/shop/${product.id}`}>
                {product?.name}
              </Link>
                <p>$ {product?.price}</p>
            </p>
        </div>
      </div>
        ))
      }
 </div>
    </div>
  );
};

export default Shop;
