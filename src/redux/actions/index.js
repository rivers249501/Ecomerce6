import axios from "axios";
import { getConfig } from "../../util";


 export const actions = {

    setProductList: "SET_PRODUCTS_LIST",
    setIsLoading: "SET_IS_LOADING",
    setProductDetail: "SET_PRODUCT_DETAIL",
    setCategories: "SET_CATEGORIES",
    setCart: "SET_CART"
}

export const setProductList = product => ({
    type: actions.setProductList,
    payload: product
})

export const setProductDetail = productDetail =>({
    type: actions.setProductDetail,
    payload: productDetail
})

export const setIsLoading = isLoading => ({
    type: actions.setIsLoading,
    payload: isLoading
});

export const setCategories = Categories => ({
    type: actions.setCategories,
    payload: Categories
});

export const setCart = cart => ({
    type: actions.setCart,
    payload: cart
});

export const getProductListThunk = () => {
    
    return dispatch => {
        dispatch(setIsLoading(true));
        axios.get('https://ecommerce-exercise-backend.herokuapp.com/products/', getConfig())
        .then(res => dispatch( setProductList(res.data) ))
        .catch(error => console.log(error.reponse))
        .finally(() => dispatch(setIsLoading(false)));
    }  

}

export const getProductDetailThunk = id => {
    return dispatch => {
        dispatch(setIsLoading(true))
        axios.get(`https://ecommerce-exercise-backend.herokuapp.com/products/${id}/`, getConfig())
        .then(res => dispatch( setProductDetail(res.data) ))
        .catch(error => console.log(error.reponse))
        .finally(() => dispatch(setIsLoading(false)));
    }
}

export const getCategoriesThunk = () => {
    return dispatch => {
        dispatch(setIsLoading(true))
        axios.get(`https://ecommerce-exercise-backend.herokuapp.com/categories/`, getConfig())
        .then(res => dispatch( setCategories(res.data) ))
        .catch(error => console.log(error.reponse))
        .finally(() => dispatch(setIsLoading(false)));
    }
}

export const filterCategoriesThunk = id => {
    return dispatch => {
        dispatch(setIsLoading(true))
        axios.get(`https://ecommerce-exercise-backend.herokuapp.com/products/?category=${id}`, getConfig())
        .then(res => dispatch(setProductList(res.data)))
        .catch(error => console.log(error.response))
        .finally(() => dispatch(setIsLoading(false)));
    }
}

export const filterHeadlineThunk = headline => {
    return dispatch => {
        dispatch(setIsLoading(true));
        axios.get(`https://ecommerce-exercise-backend.herokuapp.com/products/?name__icontains=${headline}`, getConfig())
        .then(res => dispatch(setProductList(res.data)))
        .catch(error => console.log(error.response))
        .finally(() => dispatch(setIsLoading(false)));
    }
}

export const getCartThunk = () => {
    
    return dispatch => {
        dispatch(setIsLoading(true));
        axios.get(`https://ecommerce-exercise-backend.herokuapp.com/cart/`, getConfig())
        .then(res => dispatch( setCart(res.data) ))
        .catch(error => console.log(error.reponse))
        .finally(() => dispatch(setIsLoading(false)));
    }  

}



export const addCartThunk = countCart => {
    return dispatch => {
        dispatch(setIsLoading(true));
        axios.post(`https://ecommerce-exercise-backend.herokuapp.com/products/add_to_cart/`, countCart, getConfig())
        .then(() => {

            dispatch( getCartThunk());
            alert("se agrego el producto al carrito :D")
        })

        .catch(error => {
            console.log(error)
            alert("hubo un error");
        })
        .finally(() => dispatch(setIsLoading(false)));
    }  

}

export const deleteitemCartThunk = id => {
    return dispatch => {
        dispatch(setIsLoading(true));
        axios.delete(`https://ecommerce-exercise-backend.herokuapp.com/cart/${id}/remove_item/`, getConfig())
        .then(() => {
            dispatch( getCartThunk());
            alert("se elimino el producto del carrito :D")
        })

        .catch(error => {
            console.log(error)
            alert("hubo un error");
        })
        .finally(() => dispatch(setIsLoading(false)));
    }  

}

export const removeCartThunk = () => {
    return dispatch =>{
    axios.delete(`https://ecommerce-exercise-backend.herokuapp.com/cart/empty_cart/`, getConfig())
    .then(() => {
  
      dispatch( getCartThunk());
      alert("se vacio el producto del carrito :D")
  })
  .catch(error => {
      console.log(error)
      alert("hubo un error");
  })
  .finally(() => dispatch(setIsLoading(false)));
  }  
}

export const changeQuantityThunk = (id, quantity) => {
    return dispatch => {
        dispatch(setIsLoading(true))
        axios.put(`https://ecommerce-exercise-backend.herokuapp.com/cart/${id}/change_quantity/`, {quantity}, getConfig())
            .then(() => {
                dispatch(getCartThunk());
                alert(`Se modificó la cantidad de productos del item ${id} del carrito`)
                })
            .catch(error => {
                console.log(error)
                alert("Hubo un error")})
            .finally(() => dispatch(setIsLoading(false)))
    }
    }

