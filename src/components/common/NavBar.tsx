import { useContext } from 'react';
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
                <Navbar.Brand href="/"><GiDreamCatcher /> dream tracker</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    {!isAuthenticated && (
                        <>
                            <Nav className="me-auto">
                                <Nav.Link href="/register">register</Nav.Link>
                                <Nav.Link href="/login">log in</Nav.Link>
                            </Nav>
                        </>
                    )}
                    {isAuthenticated && (
                        <>
                            <Nav className="me-auto">
                                <Nav.Link href="/mypages">dashboard</Nav.Link>
                                <Nav.Link href="/newdream">new dream</Nav.Link>
                                <Nav.Link href="/archive">archive</Nav.Link>
                                <Nav.Link href="/settings">settings</Nav.Link>
                            </Nav>

                            <Navbar.Text>signed in as <span className='fw-bold'>{username}</span></Navbar.Text>
                        </>
                    )}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}