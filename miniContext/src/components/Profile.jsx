import React, {useContext} from 'react'
import UserContext from '../UserContext/UserContext'



export function Profile() {
    
    const {user} = useContext(UserContext)

    if(!user) return <div style={{ color: 'white' }}> please login </div>

    return <div style={{ color: 'white' }}> Welcome {user.username}</div>
  
}
