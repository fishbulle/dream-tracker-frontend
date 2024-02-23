import { Container } from 'react-bootstrap';
import sky from '../../assets/nightsky.jpg';

interface IProps {
    children: React.ReactNode
}

export function Background({ children }: IProps) {

    return (
        <Container style={{ backgroundImage: `url(${sky})`, backgroundSize: 'cover' }} className='min-vw-100 min-vh-100 p-0'>
            {children}
        </Container>
    );
}