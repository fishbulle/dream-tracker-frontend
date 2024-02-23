import { NavBar } from '../components/common/NavBar';
import { StyledDiv } from '../components/common/styles/styles';
import { NewDreamForm } from '../components/forms/NewDreamForm';

export function NewDream() {

    return (
        <>
            <NavBar />
            <StyledDiv>
                <NewDreamForm />
            </StyledDiv>
        </>
    );
}