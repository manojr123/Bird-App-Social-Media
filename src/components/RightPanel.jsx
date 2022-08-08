import react from 'react'           


const RightPanel = () => {

return (    <div className="rightPanel">
            { console.log('RightPanel : Rendering ') }

                <div className="search">
                    Search Twitter
                </div>

                <div className="relevant">
                  <div className="relevantTitle">
                    <h1> Relevant people</h1>
                    <p>Next.js @nextjs <button className="white">Follow </button></p>
                    <p>The React framework - created by 
                    <snap>@vercel</snap> </p>
                  </div>
                </div>

                <div className="news">
                  <div className="newsTitle">  
                     <h1 >What's happening </h1>
                     <br/>
                     <p> India national new - <button className="pink">LIVE </button></p>
                     <h3>Presidential Elections 2022:
                        Droupadi Murmu declared</h3>
                        <p>president-elect Trending with
                        <snap>#RamNathKovind</snap></p>

                     <p>Entertainment - Trending</p>
                     <h3>Karan Johar</h3>

                     <p>Entertainment - LIVE</p>
                     <h3>The seventh season of Koffee
                     with Karan is here !</h3>
                     <p>Trending with <snap>Samantha,</snap>
                     <snap>#NagaChaitanya</snap></p>

                    <p> War in Ukraine - LIVE</p>
                     <h3>Latest updates on the war in Ukraine</h3>

                    
                    <snap>Show more</snap>
                  </div>


                </div>
            </div>
        )       

}

export default RightPanel