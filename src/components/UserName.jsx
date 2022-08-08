import React from 'react'
import {useState, useContext, useRef} from 'react'
import {SocialMediaAppContext} from '../helpers/Contexts'

const UserName = (props) => {
    
   const { appState, setAppState, usersList,setUsersList,currentUserName, setCurrentUserName, currentPasswd, setCurrentPasswd}
   = useContext(SocialMediaAppContext);

    const { isValidUserName , mode }= props;
    const usernameInput = useRef(null) // Input username reference with useRef

    const validateUserName = (event) => {
        setCurrentUserName(usernameInput.current.value)
        console.log('Username : fn(validateUserName) : usernameInput',usernameInput.current.value)
        isValidUserName(true);
    }

    return (<div>
                <div>
                { console.log('UserName : Rendering ') }

                <label> User Name </label>
                <input ref={usernameInput} type="text" placeholder="Name" />   
                <button onClick={()=>validateUserName()} > Next </button>
                </div>
                {mode === 'login' ?
                    <div><br/><br/>
                        <p align-text="right"> New User ? 
                        <span className="registerRedir" onClick={()=> setAppState('register')}>
                            Register here!                          
                            </span> 
                        </p>
                    </div>
                    :null
                }
            </div>


    )

}

export default UserName













/*
                <input ref={usernameInput} type="text" placeholder="Name" onChange={(event)=>setCurrentUserName(event.target.value) }/>   

*/

