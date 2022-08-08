import react from 'react'            
            
/**
 * @LeftPanel Component :
 *  Render the LeftPanel with all the navigation options
 *  Provide for logout operation
 * 
 */
const LeftPanel = (props) => {

    const {currentUserName,logoutFn} = props;

return (
            
            <div className="leftPanel" id="left">
            { console.log('LeftPanel : Rendering ') }

              <div id="menu">
                <i className="fab fa-twitter" style={{fontSize:"40px", color:"white"}}> </i> 
                <div className="icons">
                    <i class="fa-solid fa-house-user"></i>
                    <span className="leftText">   Home </span>
                </div>
                <div className="icons">
                    <i class="fa-solid fa-hashtag"></i>
                    <span className="leftText"> Explore </span>
                </div>
                <div className="icons">
                    <i class="fa-solid fa-bell"></i>
                    <span className="leftText"> Notifications </span>
                </div>
                <div className="icons">
                    <i class="fa-solid fa-message"></i>
                    <span className="leftText"> Messages </span>
                </div>
                <div className="icons">
                    <i class="fa-solid fa-bookmark"></i>
                    <span className="leftText"> Bookmarks </span>
                </div>
                <div className="icons">
                    <i class="fa-solid fa-user"></i>
                    <span className="leftText"> Profile </span>
                </div>
                <div className="icons">
                    <i class="fa-solid fa-circle-ellipsis"></i>
                    <span className="leftText">... More </span>
                </div>
                <button className="tweetLeft"> Tweet </button>
              </div>
              <div className="logout">
                <p > <span>@{currentUserName} </span></p>
                <button onClick={logoutFn}> Logout </button>
              </div>
            </div>


    )   

}

export default LeftPanel