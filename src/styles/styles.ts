import styled from 'styled-components';

export const StyledWrapper = styled.div`
    display: flex;
    flex-direction: column;
    background-color: rgba(250, 250, 250, 0.8);
    padding: 50px;
    margin: 100px;
    color: #000000;
    border-radius: 10px;
`;

export const ButtonDiv = styled.div`
    display: flex;
    justify-content: center;
    padding-top: 20px;
`;

export const StyledButton = styled.button`
    background-color: #79155B;
    color: #ffffff;
    margin: 10px;
    &:hover {
        background-color: #C23373;
        box-shadow: 2px 2px 5px black;
    }
`;

export const StyledIconButton = styled.button`
    background-color: #0a0a0a;
    color: #ffffff;
    margin: 10px;
    box-shadow: none;
    border: none;
    &:hover {
        color: #F6635C;
        box-shadow: none;
    }
`;