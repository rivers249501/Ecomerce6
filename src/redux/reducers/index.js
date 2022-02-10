import { actions } from '../actions/index'

const INITIAL_STATE = {

    productsList: [],
    productDetail: {},
    isLoading: false,
    categories: [],
    cart: []

}

const reducer = (state = INITIAL_STATE, action) => {
   switch (action.type) {
       case actions.setProductList:
           return{
               ...state, 
               productsList: action.payload
           }
           case actions.setIsLoading:
               return {
                   ...state,
                   isLoading: action.payload
               }
               case actions.setProductDetail:
                   return{
                       ...state,
                       productDetail: action.payload
                   }
                case actions.setCategories:
                    return{
                        ...state,
                        categories: action.payload
                    }
                    case actions.setCart:
                        return{
                            ...state,
                            cart: action.payload 
                        }
           default:
               return state;
   }
}

export default reducer;