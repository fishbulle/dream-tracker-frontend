import { StyledWrapper } from "../styles/styles";
import { LogInForm } from "../components/forms/LogInForm";

export function LoginView() {
    return (
        <>
            <StyledWrapper>
                <h1>log in</h1>
                <LogInForm />
            </StyledWrapper>
        </>
    );
}
