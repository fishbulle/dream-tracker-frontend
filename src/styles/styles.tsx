import styled from 'styled-components';
import { color } from './colors';

export const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${color.translucent};
  padding: 50px;
  margin: 3em 10em;
  color: #000000;
  border-radius: 10px;
`;

export const StyledDiv = styled.div`
  background-color: ${color.blackish};
  color: ${color.grey};
  margin: 2em;
  padding-top: 2.5em;
  padding-bottom: 1em;
  border-radius: 25px;
`;

export const StyledInnerDiv = styled.div`
  background-color: ${color.blackish};
  max-width: 80%;
  padding: 1em;
  margin: auto;
`;

export const ButtonDiv = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1.5em;
`;

export const StyledButton = styled.button`
  background-color: ${color.purple};
  color: #ffffff;
  margin: 10px;
  &:hover {
    background-color: ${color.pink};
    box-shadow: 1px 1px 3px black;
  }
`;

export const StyledButtonWarning = styled(StyledButton)`
  background-color: ${color.red};
  &:hover {
    background-color: ${color.orange};
  }
`;

export const StyledIconButton = styled.button`
  background-color: ${color.blackish};
  color: #ffffff;
  margin: 10px;
  box-shadow: none;
  border: none;
  &:hover {
    color: ${color.red};
    box-shadow: none;
  }
`;
