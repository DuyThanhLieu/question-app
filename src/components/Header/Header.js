import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useSelector } from 'react-redux';//tac dung lay data tu redux ra 
import { NavLink, useNavigate } from 'react-router-dom';

const Header = () => {
    const account = useSelector(state => state.user.account)
    const isAuthenticated = useSelector(state => state.user.isAuthenticated)
    const navigate = useNavigate();
    const handleLogin = () => {
        navigate('/login')// dieu huong trang bang navigate
    }
    const handleRegister = () => {
        navigate('/register')// dieu huong trang
    }
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                {/* <Navbar.Brand href="#home">Thanh Reactjs</Navbar.Brand> */}
                <NavLink to='/' className='navbar-brand'>Thanh Reactjs</NavLink>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavLink to='/' className='nav-link'>Home</NavLink>
                        <NavLink to='/users' className='nav-link'>Users</NavLink>
                        <NavLink to='/admins' className='nav-link'>Admin</NavLink>
                    </Nav>
                    <Nav>
                        {isAuthenticated === false ?// dang nhap thanh cong se hien thi ten account bang redux 
                            <>
                                <button className='btn-login' onClick={() => handleLogin()}>Log in</button>
                                <button className='btn-signup' onClick={() => handleRegister()}>Sign up</button>
                            </> :
                            <NavDropdown title="Settings" id="basic-nav-dropdown">
                                {/* <NavDropdown.Item >Login</NavDropdown.Item> */}
                                <NavDropdown.Item >
                                    Log out
                                </NavDropdown.Item>
                                <NavDropdown.Item >Profile</NavDropdown.Item>
                            </NavDropdown>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar >
    );
}

export default Header;