import { Send } from '@material-ui/icons';
import React from 'react'
import styled from 'styled-components'


const Container=styled.div`
    height: 60vh;
    background-color: #fcf5f5;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;
const Title = styled.h1`
    font-size: 70px;
    margin-bottom: 20px;
`;
const Desc=styled.div`
    font-size: 24px;
    font-weight: 300;
    margin-bottom: 20px;
`;
const InputContainer = styled.div`
    width: 50%;
    height: 40px;
    background-color: white;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid lightgray;
`;
const Input=styled.input`
    border: none;
    flex: 8;
    padding-left: 20px;
    margin-right: 5px;
`;
const Button = styled.button`
    flex: 1;
    border: none;
    background-color: teal;
    color: white;
    cursor: pointer;
`;
const Newsletter = () => {
    return (
        <Container>
            <Title>Newsletter</Title>
            <Desc> Get Timely Updates from your favourite products</Desc>
            <InputContainer>
                <Input placeholder="your email"/>
                <Button>
                    <Send/>
                </Button>
            </InputContainer>
        </Container>
    )
}

export default Newsletter
