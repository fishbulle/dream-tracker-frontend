import styled from 'styled-components';

export const StyledDiv = styled.div`
    background-color: rgba(250, 250, 250, 0.8);
    padding: 20px;
    margin: 100px;
    color: #000000;
    border-radius: 10px;
`;

export const ButtonDiv = styled.div`
    display: flex;
    justify-content: center;
    padding: 30px;
`;

export const StyledButton = styled.button`
    background-color: #742898;
    color: #ffffff;
    margin: 10px;
    box-shadow: none;
    &:focus {
        outline-color: none !important;
        box-shadow: none !important;
    }
    &:hover {
        color: #000000;
    }
`;

