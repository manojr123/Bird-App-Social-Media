import React, {useState, useEffect} from 'react'
import logo from './logo.svg'
import './App.css'
import Login from './components/Login.jsx'
import Register from './components/Register.jsx'
import Dashboard from './components/Dashboard.jsx'
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import {SocialMediaAppContext} from './helpers/Contexts';
import { getLocalStorageData, storeInLocalStorage} from './helpers/LocalStorageUtility'

/**
 * @author Manoj Raghavan
 * @version 0.0.1
 * XX-XX-2022 - Creation
 * 
 * Bird App Social Media :
 *   A working social media app like twitter based on React, JavaScript and localStorage.
 * 
 * This includes the following features:  
 *    1. Login
 *    2. Registration
 *    3. Creating a post
 *    4. Editing a post
 *    5. Updating a post
 *    6. Deleting a post
 *    7. A feed with random posts from all registered users
 * 
 */



/**
* The main Component : @App 
* Define all the state variables, useEffect, Contexts, Routes and render the App
* App States :  ['login', 'register', 'dashboard' ]
* @param {} 
* @return Render the App
*/
function App() {
    const [appState, setAppState ] = useState('login') // Current app state
    const [usersList, setUsersList] = useState(()=>getLocalStorageData('allUsers')); // List of valid users
    const [currentUserName, setCurrentUserName ] = useState(''); // Current active user
    const [currentPasswd, setCurrentPasswd] = useState(''); // Current active passwd
    const navigate = useNavigate();
    
    // Navigate based on app state
    useEffect ( () => {
       console.log('App :Fn(useEffect) : entered ',usersList);

            if ( appState === 'dashboard') {        
                navigate("/dashboard");
                setAppState("dashboard");
            } else if ( appState === 'register') {        
                navigate("/register");
                setAppState("register");
            } else if ( appState === 'login') {
                navigate("/login");
                setAppState("login");
            }

    }
    ,[appState]);

	return (
		<div className="App">;
        { console.log('App : Rendering ') }

        {/* Context Provider providing the state values to child components */}
        <SocialMediaAppContext.Provider value=
           {{ appState, setAppState, usersList,setUsersList, currentUserName, 
              setCurrentUserName, currentPasswd, setCurrentPasswd}}
        >

          {/* Setup the Routes */}          
          <Routes>
            <Route path="/" exact element={ <Login /> } > </Route>
            <Route path="/login" exact element={ <Login /> } > </Route>
            <Route path="/register" exact element={ <Register /> } > </Route>
            <Route path="/dashboard" exact element={ <Dashboard /> } > </Route>
          </Routes>

        </SocialMediaAppContext.Provider>

		</div>
	)
}

export default App