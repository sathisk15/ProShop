import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getUserDetails, updateUserProfile } from '../actions/userActions';
// import { LinkContainer } from 'react-router-bootstrap';
import {
  listMyOrders,
  listAllOrders,
  payOrder,
  deliverOrder,
} from '../actions/orderActions';
import OrdersTable from '../components/OrdersTable';
import { use } from 'react';

const ProfileScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [message, setMessage] = useState(null);

  // const [searchParams, setSearchParams] = useSearchParams();

  //   const redirect = searchParams.get('redirect')
  //     ? searchParams.get('redirect')
  //     : '/';

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  const myOrdersList = useSelector((state) => state.myOrdersList);
  const {
    loading: loadingMyOrders,
    error: errorMyOrders,
    orders: myOrders,
  } = myOrdersList;

  const allOrdersList = useSelector((state) => state.allOrdersList);
  const {
    loading: loadingAllOrders,
    error: errorAllOrders,
    orders: allOrders,
  } = allOrdersList;

  const orderPay = useSelector((state) => state.orderPay);
  const {
    loading: loadingOrderPayment,
    error: orderPayError,
    success: orderPayStatus,
  } = orderPay;

  const orderDeliver = useSelector((state) => state.orderDeliver);
  const {
    loading: loadingOrderDeliver,
    error: orderDeliverError,
    success: orderDeliverStatus,
  } = orderDeliver;

  const dispatchOrdersList = () =>
    dispatch(userInfo?.isAdmin ? listAllOrders() : listMyOrders());

  const navigate = useNavigate();
  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    } else {
      if (!user.name) {
        dispatch(getUserDetails('profile'));
        dispatchOrdersList();
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [navigate, dispatch, userInfo, user]);

  useEffect(() => {
    (orderPayStatus || orderDeliverStatus) && dispatchOrdersList();
  }, [orderPay, orderDeliver]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Password do not match');
    } else {
      dispatch(updateUserProfile({ id: user._id, name, email, password }));
    }
  };

  const markAsPaid = (orderId) => {
    const date = Date.now().toString();
    const paymentResult = {
      id: date,
      status: 'success',
      update_time: date,
      email_address: userInfo.email,
    };
    dispatch(payOrder(orderId, paymentResult));
  };

  const markAsDelivered = (orderId) => {
    dispatch(deliverOrder(orderId));
  };

  return (
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>
        {error && <Message variant="danger">{error}</Message>}
        {message && <Message variant="danger">{message}</Message>}
        {success && <Message variant="success">Profile Updated</Message>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name">
            <Form.Label>Name </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="confirm password" className="mb-4">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Button type="submit" variant="primary">
            Update
          </Button>
        </Form>
      </Col>
      <Col md={9}>
        {userInfo?.isAdmin ? <h2>All Orders</h2> : <h2>My Orders</h2>}
        {loadingMyOrders || loadingAllOrders || loadingOrderPayment ? (
          <Loader />
        ) : errorMyOrders || errorAllOrders || orderPayError ? (
          <Message variant="danger">
            {errorMyOrders || errorAllOrders || orderPayError}
          </Message>
        ) : (
          <OrdersTable
            orders={userInfo?.isAdmin ? allOrders : myOrders}
            isAdmin={userInfo?.isAdmin}
            markAsPaid={markAsPaid}
            markAsDelivered={markAsDelivered}
          />
        )}
      </Col>
    </Row>
  );
};

export default ProfileScreen;
