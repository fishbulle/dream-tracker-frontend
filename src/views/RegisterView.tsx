import { StyledWrapper } from "../styles/styles";
import { RegisterForm } from "../components/forms/RegisterForm";

export function RegisterView() {
    return (
        <>
            <StyledWrapper>
                <h1>register a new user</h1>
                <RegisterForm />
            </StyledWrapper>
        </>
    );
}
