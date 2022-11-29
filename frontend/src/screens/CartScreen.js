import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message'
import {Link, useParams, useSearchParams} from 'react-router-dom'
import {Row, Col, ListGroup, Image, Form, button, Card} from 'react-bootstrap'
import { addToCart } from '../actions/cartActions'

const CartScreen = () => {
    const {id} = useParams()
    const [searchParams, setSearchParams] = useSearchParams();
    const qty = searchParams.get('qty')

    const dispatch = useDispatch()

    useEffect(()=>{
        if(id){
            dispatch(addToCart(id, qty))
        }
    }, [dispatch, id, qty])

    const {cartItems} = useSelector((state)=> state.cartItems)
  return (
    <Row>
        <Col md={8}>
            <h1>Shopping Cart</h1>
            {cartItems.length === 0 ? <Message>Your Cart is Empty <Link to='/'>Go Back</Link></Message> : (
                <ListGroup variatn='flush'></ListGroup>
            )}
        </Col>
        <Col md={2}></Col>
        <Col md={2}></Col>
    </Row>
  )
}

export default CartScreen