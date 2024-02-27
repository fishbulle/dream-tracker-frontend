import { useContext } from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { GiDreamCatcher } from 'react-icons/gi';
import { AuthContext } from '../../context/AuthContext';
import '../../App.css';

export function NavBar() {
    const { username, isAuthenticated } = useContext(AuthContext);

    return (
        <Navbar bg="navColor" variant="dark" expand="lg" sticky="top">
            <Container>
                <Navbar.Brand as={Link} to='/'><GiDreamCatcher /> dream tracker</Navbar.Brand>
                <Navbar.Toggle aria-controls="basṣc-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    {isAuthenticated ? 
                        <>
                            <Nav className="me-auto">
                                <Nav.Link as={Link} to='/dashboard'>dashboard</Nav.Link>
                                <Nav.Link as={Link} to='/newdream'>new dream</Nav.Link>
                                <Nav.Link as={Link} to='/archive'>archive</Nav.Link>
                                <Nav.Link as={Link} to='/settings'>settings</Nav.Link>
                            </Nav>
                            <Navbar.Text>
                                signed in as 
                                <span className='fw-bold'>
                                    <Link 
                                    to='/dashboard' 
                                    style={{color: 'inherit', textDecoration: 'inherit'}}>
                                        {' ' + username}
                                    </Link>
                                 </span>
                             </Navbar.Text>
                        </>
                        :
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to='/register'>register</Nav.Link>
                            <Nav.Link as={Link} to='/login'>log in</Nav.Link>
                        </Nav>                       
                    }
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}