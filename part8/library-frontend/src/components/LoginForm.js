import { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../queries/queries";

export const LoginForm = ({setToken, show}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [login, result] = useMutation(LOGIN)

  useEffect(()=> {
    if(result.data){
      const token = result.data.login.value;
      setToken(token)
      localStorage.setItem('user-token', token)
    }
  }, [result.data])

  if (!show) {
    return null
  } 

  const submit = async (event) => {
    event.preventDefault();
    login({variables: {username, password}})
  }
  return (
    <form onSubmit={submit}>
      <div>username
        <input 
          value={username} 
          onChange={({target}) => setUsername(target.value)}
        />
      </div>
      <div>password
        <input 
          type="password"
          value={password}
          onChange={({target}) => setPassword(target.value)}
        />
      </div>
      <button type="submit">Login</button>
    </form>
  )
}