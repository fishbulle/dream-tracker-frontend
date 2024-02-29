import { Container } from 'react-bootstrap';
import purplesky from '../../assets/purplesky.jpg';

interface IProps {
  children: React.ReactNode;
}

export function Background({ children }: IProps) {
  return (
    <Container
      style={{
        backgroundImage: `url(${purplesky})`,
        backgroundSize: 'cover',
      }}
      className='min-vw-100 min-vh-100 m-0 p-4'
    >
      {children}
    </Container>
  );
}
