import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { GiDreamCatcher } from 'react-icons/gi';
import '../../App.css';
import { ROUTES } from '../../routes/routes';

interface NavBarProps {
  username: string;
  isAuthenticated: boolean;
}

export const NavBar = (props: NavBarProps) => {
  const { username, isAuthenticated } = props;

  return (
    <Navbar
      bg='navColor'
      variant='dark'
      expand='lg'
      sticky='top'
      className='mb-6'
    >
      <Container>
        <Navbar.Brand as={Link} to={ROUTES.START}>
          <GiDreamCatcher /> dream tracker
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='basṣc-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          {isAuthenticated ? (
            <>
              <Nav className='me-auto'>
                <Nav.Link as={Link} to={ROUTES.DASHBOARD}>
                  dashboard
                </Nav.Link>
                <Nav.Link as={Link} to={ROUTES.NEW_DREAM}>
                  new dream
                </Nav.Link>
                <Nav.Link as={Link} to={ROUTES.ARCHIVE}>
                  archive
                </Nav.Link>
                <Nav.Link as={Link} to='/settings'>
                  settings
                </Nav.Link>
              </Nav>
              <Navbar.Text>
                signed in as
                <span className='fw-bold'>
                  <Link
                    to={ROUTES.DASHBOARD}
                    style={{
                      color: 'inherit',
                      textDecoration: 'inherit',
                    }}
                  >
                    {' ' + username}
                  </Link>
                </span>
              </Navbar.Text>
            </>
          ) : (
            <Nav className='me-auto'>
              <Nav.Link as={Link} to={ROUTES.REGISTER}>
                register
              </Nav.Link>
              <Nav.Link as={Link} to={ROUTES.LOGIN}>
                log in
              </Nav.Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
