import { NavBar } from '../components/common/NavBar';
import { StyledDiv } from '../components/common/styles/styles';
import { RegisterForm } from '../components/forms/RegisterForm';

export function RegisterView() {

    return (
        <>
            <NavBar />
            <StyledDiv>
                <RegisterForm />
            </StyledDiv>
        </>
    );
}