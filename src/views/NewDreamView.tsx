import { StyledWrapper } from '../styles/styles';
import { NewDreamForm } from '../components/forms/NewDreamForm';

export function NewDream() {
  return (
    <>
      <StyledWrapper>
        <h1>register a new dream</h1>
        <NewDreamForm />
      </StyledWrapper>
    </>
  );
}
