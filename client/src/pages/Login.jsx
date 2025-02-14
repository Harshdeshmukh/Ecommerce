import React, { useState } from "react";
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import { login } from "../redux/apiCalls";
const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984650/pexels-photo-6984650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  display: flex;
  align-items: center;
  justify-content: center;
  background-size: cover;
`;
const Wrapper = styled.div`
  background-color: white;
  width: 25%;
  padding: 20px;
  
`;
const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin:10px  0px;
  padding: 10px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
  &:disabled{
    color:green;
    cursor: not-allowed;
  }
`;
const Error=styled.span`
  color: red;
`;

const Link = styled.a`
  margin: 5px 0px;
  font-size: 13px;
  text-decoration:underline;
  cursor: pointer;
`;


const Login = () => {
  const [username,setUserName]=useState("");
  const [password,setPassword]=useState("");

  const dispatch = useDispatch();
  const {isFetching,error}=useSelector((state)=>state.user);

  const handleLogin=(e)=>{
    e.preventDefault();
    login(dispatch,{username,password});
  }
  return (
    <Container>
      <Wrapper>
        <Title> SIGN IN</Title>
        <Form>
          <Input placeholder="username" onChange={(e)=>setUserName(e.target.value)}/>
          <Input type="password" placeholder="password" onChange={(e)=>setPassword(e.target.value)}/>
          <Button onClick={handleLogin} disabled={isFetching}>LOGIN</Button>
          {error && <Error>Something went wrong!</Error>}
          <Link>DO NOT YOU REMEMBER THE PASSWORD?</Link>
          <Link>CREATE A NEW ACCOUNT</Link>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;
