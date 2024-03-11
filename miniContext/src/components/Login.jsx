import React, { useContext, useState } from 'react'
import UserContext from '../UserContext/UserContext';

export function Login(props) {
    

    const [username,setUserName] = useState('');
    const [password,setPassword] = useState('');

    const {setUser} = useContext(UserContext)

    const handleSubmit = (e) =>{
        e.preventDefault()
        setUser({username,password})
    }
    return (
        <div style={{ color: 'white' }}> 
           <h2> Login </h2>
           <input type='text' 
           value = {username}
           onChange={(e) => setUserName(e.target.value)}
           placeholder='username'/>
           <input type='text' placeholder='password'/>
            <button onClick={handleSubmit}> Submit </button>
        </div>
    )
}
