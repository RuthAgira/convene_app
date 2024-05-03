import React, { useContext, useEffect, useState } from 'react'
import '../styles/publicStyles.css'
import {AuthContext} from '../authLogic'
import {useNavigate} from'react-router-dom'
import { db, getNextId } from '../data/db'

const PublicAuthScreen = () => {

    const navigate = useNavigate();
    const {login, logout, isLoggedIn} = useContext(AuthContext);
    const [optLogin, setOptLogin] = useState(true);
    const [loginDetails, setLoginDetails] = useState({
        email: '',
        password: ''
    })

    const [signUpDetails, setSetSignUpDetails] = useState({
        newUserName: '',
        newUserEmail: '',
        newUserPassword: '',
        user_id: ''
    })

    useEffect(()=>{
        logout();
        setOptLogin(true);
    }, [])


    const handleLogin = (e) => {
        e.preventDefault()
        if(loginDetails.email === '' || loginDetails.password === '') return
        const res = db.userTbl.GET_ALL_USERS()
        const user = res.find(user => user.email === loginDetails.email)
        if(user){
            if(user.password === loginDetails.password){
                console.log('password match')
                login(user)
                navigate('/')
            }
            else{
                console.log('password does not match')
            }
        }
        else{
            console.log('no user found')    
        }

        return ;
    }
    const handleSignUp = (e) => {
        e.preventDefault()
        console.log('signUpDetails', signUpDetails)
        db.userTbl.CREATE_USER({
            name: signUpDetails.newUserName,
            email: signUpDetails.newUserEmail,
            password: signUpDetails.newUserPassword,
            id: getNextId(),
        })

    }
  return (
    <div className='public-auth-screen-container'>
        <h1>WELCOME TO COVENE</h1>
        <div className="auth-field">
            {
             optLogin?(
                <>
                <div className="login-section auth-section">
                    <div className="inputs-container">
                        <div className="email-container field">
                            <label >Email</label>
                            <input  
                            type="text" placeholder="Email" 
                            value={loginDetails.email} 
                            onChange={(e)=>setLoginDetails({...loginDetails, email: e.target.value})} 
                            />
                        </div>
                        <div className="password-container field">
                            <label >Password</label>
                            <input  type="password" 
                            placeholder="Password" 
                            value={loginDetails.password}
                            onChange={(e)=>setLoginDetails({...loginDetails, password: e.target.value})}
                            />
                        </div>
                    </div>
                    <button type="submit" onClick={(e)=>handleLogin(e)}>LOGIN</button>
                </div>
                <div className="create-account">
                    <small>
                        Dont have account?  click<i style={{color: 'blue', cursor: 'pointer', fontSize: 'larger'}} onClick={()=>setOptLogin(false)}> Signup</i> for a new account!
                    </small>
                </div>
                </>
             ) :(
                <>
                <div className="signup-section auth-section">
                    <div className="inputs-container">
                        {/* <div className="user-image-container field">
                            <label htmlFor="">Pick Profile Image</label>
                            <input type="file"  />
                        </div> */}
                        <div className="username-container field">
                            <label >Username</label>
                            <input  type="text" placeholder="Username" value={signUpDetails.newUserName} 
                            onChange={(e)=>setSetSignUpDetails({...signUpDetails, newUserName: e.target.value})} 
                            />
                        </div>
                        <div className="email-container field">
                            <label >Email</label>
                            <input  type="text" placeholder="Email"  value={signUpDetails.newUserEmail}
                            onChange={(e)=>setSetSignUpDetails({...signUpDetails, newUserEmail: e.target.value})}
                            />
                        </div>
                        <div className="password-container field">
                            <label >Password</label>
                            <input  type="password" placeholder="Password" value={signUpDetails.newUserPassword}
                            onChange={(e)=>setSetSignUpDetails({...signUpDetails, newUserPassword: e.target.value})}
                            />
                        </div>
                    </div>
                    <button type="submit" onClick={(e)=>handleSignUp(e)}>SIGNUP</button>
                </div>
                <div className="create-account">
                    <small>
                        You got account?  click<i style={{color: 'blue', cursor: 'pointer', fontSize: 'larger'}} onClick={()=>setOptLogin(true)}> Login</i> and access your account!
                    </small>
                </div>
                </>)
            }
        </div>
    </div>
  )
}

export default PublicAuthScreen