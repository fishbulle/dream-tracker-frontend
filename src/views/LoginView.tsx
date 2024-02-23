import { NavBar } from '../components/common/NavBar';
import { StyledDiv } from '../components/common/styles/styles';
import { LogInForm } from '../components/forms/LogInForm';

export function LoginView() {

    return (
        <>
            <NavBar />
            <StyledDiv>
                <LogInForm />
            </StyledDiv>
        </>
    );
}