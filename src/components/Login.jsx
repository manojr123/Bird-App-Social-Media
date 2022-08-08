import React from 'react'
import {useState, useContext, useEffect, useRef} from 'react'
import {SocialMediaAppContext} from '../helpers/Contexts'
import UserName from './UserName.jsx'
import Password from './Password.jsx'
import { getLocalStorageData, storeInLocalStorage} from '../helpers/LocalStorageUtility'
import bird from '../images/Bird_FrontPage.jpg'

/**
 * @Login Component :
 *  
 *  
 * 
 */
const Login = () => {
    
   const { appState, setAppState, usersList,setUsersList, currentUserName, setCurrentUserName, currentPasswd, setCurrentPasswd}
   = useContext(SocialMediaAppContext);


    const usernameInput = useRef(null) // Input username reference with useRef

    const passwordInput = useRef(null) // Input password reference with useRef


    const validateLogin = () => {

        console.log('Login : Fn(validateLogin) : entered');
        
        console.log('Login : Fn(validateLogin) : usernameInput',usernameInput.current.value);
        console.log('Login : Fn(validateLogin) : passwordInput',passwordInput.current.value);

        setCurrentUserName(usernameInput.current.value)
        setCurrentPasswd(passwordInput.current.value)

        if (validateLoginUsername() )
        {
            if ( validateLoginPassword() ){
                setAppState('dashboard');
                storeInLocalStorage('loggedin', currentUserName);            

            } else {
                alert('Incorrect Password - Pls enter correct password !')
            }
            
        } else {
            alert('Invalid Login name !')
        }
    }

    const validateLoginUsername = () => {
        let validUser = false;

        console.log('Login : Fn(validateLoginUsername) : entered');

        // Check if user exists
        if (usersList !== null)
        {
            usersList.forEach ( (user)=> {
                if (user.username === usernameInput.current.value ) {
                    validUser = true;
                }
            });
        }    

        console.log('Login : Fn(validateLoginUsername) : validUser', validUser)

        return validUser
    }

    const validateLoginPassword = () => {
        let validPassword = false;

        console.log('Login : Fn(validateLoginPassword) : entered');        

        if (usersList !== null)
        {
            usersList.forEach ( (user, index)=> {

                console.log('Login - isValidPassword - user.userName', user.username);
                console.log('Login - isValidPassword - user.userName', user.password);

                if ( (user.username === usernameInput.current.value ) && (user.password === passwordInput.current.value ) ) {
                    validPassword = true;
                }
            });
        }

        console.log('Login : Fn(validateLoginPassword) : validPassword',validPassword );        

        return validPassword;

        
    }

    useEffect ( () => {


    }, [] );

    return (
    <div className="LoginFullPg">
        { console.log('Login : Rendering ') }

        <div className="LoginImage"> <img src={bird} /> </div>
        <div className ="login">
            <i className="fab fa-twitter" style={{fontSize:"40px", color:"skyblue"}}></i>
            <h1 style={{fontSize:"60px"}}> Happening now! </h1>
            <h1 style={{fontSize:"30px", color : "skyblue"}}> Join Bird today. </h1>

            <h4 style={{color:"orange"}}>   </h4>
            <div >
              <label className="label"> User Name  </label>
              <input ref={usernameInput} type="text" placeholder="Name" />
            </div> <br/>
            <div>
              <label className="label"> Password     </label>
              <input  ref={passwordInput} type="password" />
            </div> <br/>
            <div> 
            <button onClick={()=>validateLogin()} className="LoginButton" > Login </button>
            </div>
            <div><br/><br/>
            <p align-text="right"> New User ? 
            <span className="registerRedir" onClick={()=> setAppState('register')}>
                    Register here!                          
            </span> 
            </p>
            </div>


        </div>   
    </div>    

    )

} //Login component

export default Login