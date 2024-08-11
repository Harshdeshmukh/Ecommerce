import React, { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { login } from "../../redux/apiCalls";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const user=useSelector((state)=>state.user.currentUser.isAdmin);
  const history=useHistory();
  const dispatch = useDispatch();

  useEffect(()=>{
    if(user){
      history.push("/");
    }
  },[history,user])

  const handleLogin =async (e) => {
    e.preventDefault();
    await login(dispatch, { username, password });
    if(user){
      history.push("/");
    }
  };
  return (
    <div style={{ 
        height: "100vh",
        display:"flex",
        flexDirection:"column",
        alignItems:"center",
        justifyContent:"center", 
        }}>
      <input
      style={{ 
          padding:10,
          marginBottom:20,
      }}
        type="text"
        placeholder="usename"
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
      style={{ 
        padding:10,
        marginBottom:20,
    }}
        type="password"
        placeholder="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button style={{
          padding:10,
          width: 100,
          backgroundColor:"teal",
          cursor:"pointer",
      }} onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
