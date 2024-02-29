import styled from 'styled-components';

export const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: rgba(250, 250, 250, 0.8);
  padding: 50px;
  margin: 3em 10em;
  color: #000000;
  border-radius: 10px;
`;

export const StyledDiv = styled.div`
  background-color: #1f1e1e;
  color: #c1bfbf;
  margin: 2em;
  padding-top: 2.5em;
  padding-bottom: 1em;
  border-radius: 25px;
`;

export const StyledInnerDiv = styled.div`
  background-color: #1f1e1e;
  max-width: 80%;
  padding: 1em;
  margin: auto;
`;

export const ButtonDiv = styled.div`
  display: flex;
  justify-content: center;
`;

export const StyledButton = styled.button`
  background-color: #79155b;
  color: #ffffff;
  margin: 10px;
  &:hover {
    background-color: #c23373;
    box-shadow: 2px 2px 5px black;
  }
`;

export const StyledIconButton = styled.button`
  background-color: #1f1e1e;
  color: #ffffff;
  margin: 10px;
  box-shadow: none;
  border: none;
  &:hover {
    color: #f6635c;
    box-shadow: none;
  }
`;
