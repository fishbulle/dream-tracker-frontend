import { StyledWrapper } from '../styles/styles';
import { messages } from '../utils/messages';

export function LandingPage() {
  return (
    <>
      <StyledWrapper>
        <h1>{messages.ladningPage.heading}</h1>
      </StyledWrapper>
    </>
  );
}
