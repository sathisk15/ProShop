import React from 'react'
import products from '../../../backend/data/products'
import {Row, Col} from 'react-bootstrap'
import Product from '../components/Product'
const HomeScreen = () => {
  return (
    <>
        <h1>Lattest Products</h1>
        <Row>
            {products.map((product, idx)=>(
                <Col key={idx} sm={12} md={6} lg={4} xl={3}>
                    <Product product={product} />
                </Col>
            ))}
        </Row>
    </>
  )
}

export default HomeScreen