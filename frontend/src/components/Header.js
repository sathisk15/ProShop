import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../actions/userActions';
import { useEffect, useState } from 'react';

const Header = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userLogin);
  const { cartItems } = useSelector((state) => state.cart);
  const [numberOfItemsInTheCart, setNumberOfItemsInTheCart] = useState(0);
  const logoutHandler = () => {
    dispatch(logout());
  };

  useEffect(() => {
    const totalItems = cartItems.reduce(
      (accumulator, item) => accumulator + Number(item.qty),
      0
    );
    setNumberOfItemsInTheCart(totalItems);
  }, [cartItems]);
  return (
    <header>
      <Navbar bg="black" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>EliteVoltTech</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className="nav-bar">
            <Nav className="ml-auto">
              <LinkContainer to="/cart">
                <Nav.Link className="position-relative me-4">
                  Cart{' '}
                  {numberOfItemsInTheCart > 0 && (
                    <span class="badge position-absolute top-0 start-100 translate-middle bg-black border border-light rounded-circle">
                      {numberOfItemsInTheCart}
                    </span>
                  )}
                  <i className="fas fa-shopping-cart"></i>
                </Nav.Link>
              </LinkContainer>
              {userInfo ? (
                <NavDropdown title={userInfo.name} id="username">
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <i className="fas fa-user"></i> Sign In
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
