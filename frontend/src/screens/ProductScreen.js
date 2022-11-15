import { Link, useParams } from 'react-router-dom'
import {Row, Col, Image, ListGroup, Card, Button} from 'react-bootstrap'
import Rating from '../components/Rating'
import axios from 'axios'
import {useState, useEffect} from 'react'

const ProductScreen = () => {
    const {id} = useParams()
    const [product, setProduct] = useState({})
    useEffect(()=>{
        const fetchProduct = async ()=>{
            const {data} = await axios.get(`/api/products/${id}`)
            setProduct(data)
        }
        fetchProduct()
    }, [id])
  return (
    <>
    <Link className="btn btn-light my-3" to='/'>Go Back</Link>
    <Row>
        <Col md={6}>
            <Image src={product.image} alt={product.name} fluid></Image>
        </Col>
        <Col md={3} variant="flush">
            <ListGroup.Item>
                <h3>{product.name}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
                <Rating value={product.rating} text={`${product.numReviews} reviews`}/>
            </ListGroup.Item>
            <ListGroup.Item>
                Price: ${product.price}
            </ListGroup.Item>
            <ListGroup.Item>
                Description: {product.description}
            </ListGroup.Item>
        </Col>
        <Col md={3}>
            <Card>
                <ListGroup.Item>
                    <Row className="py-2 px-2">
                        <Col>Price:</Col>
                        <Col><strong>${product.price}</strong></Col>
                    </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Row className="py-2 px-2">
                        <Col>Status:</Col>
                        <Col>{product.countInStock > 0 ? 'In Stock':'Out of Stock'}</Col>
                    </Row>
                </ListGroup.Item>
                <ListGroup.Item className='mx-auto pb-2'>
                    <Button className="btn-block" type='button' disabled={product.countInStock === 0}>Add To Cart</Button>
                </ListGroup.Item>
            </Card>
        </Col>
    </Row>
    </>
  )
}

export default ProductScreen