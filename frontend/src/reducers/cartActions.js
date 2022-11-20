import axios from 'axios'
import {CARD_ADD_ITEM} from '../constans.cartConstants'


export const addToCart = (qty, id) => async (dispatch, getState) => {
    const {data} = await axios.get(`/api/producs/${id}`)
    dispatch({
        type: CART_ADD_ITEM,
        payload: {
            product: data._id,
            name: data.name,
            image: data.image,
            price: data.price,
            countInStock: data.countInStock,
            qty
        }
    })
    localStorage.seItem('cartItems', JSON.stringify(getState().cart.cartItems))
}