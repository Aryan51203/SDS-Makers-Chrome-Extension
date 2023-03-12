function timerReset() {
    chrome.storage.local.get("SocialMediaTracker", (dG) => {

        let today = new Date().toLocaleDateString() // Getting today's date

        dDictGot = dG["SocialMediaTracker"]
        dDateGot = dDictGot["date"];

        if (dDateGot != today) {
            dDictGot["date"] = "";

            for (var key in dDictGot) {
                dDictGot[key][1] = 0;
            }
            chrome.storage.local.set({ "SocialMediaTracker": dDictGot });

        }
    });
}

function fetchingDict(cDN) {

    chrome.storage.local.get("SocialMediaTracker", (dataGot) => {
        let d = dataGot["SocialMediaTracker"];
        console.log(d);
        usingFetchedDict(d);
    })


    function usingFetchedDict(dictGot) {
        let webDictFetched = dictGot;
        let webArrFetched = webDictFetched[cDN];

        if (webArrFetched) {

            let limitSpecified = webArrFetched[0]; // in minutes
            let totalTime = webArrFetched[1]; // total time today

            limitSpecified = limitSpecified * 60; // Converting minutes to seconds

            let todayDate = new Date().toLocaleDateString() // Setting today's date
            webDictFetched["date"] = todayDate;

            intervalID = setInterval(() => {

                totalTime += 1;

                webArrFetched[1] = totalTime;

                webDictFetched[cDN] = webArrFetched;

                chrome.storage.local.set({ "SocialMediaTracker": webDictFetched });

                if (totalTime >= limitSpecified) {
                    console.log('limit exceeded. Please close');
                    


                    document.querySelector("html").innerHTML = `<head>
                    <meta charset="UTF-8">
                    <meta http-equiv="X-UA-Compatible" content="IE=edge">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Access Denied</title>
                
                    <!-- Linking Google Fonts -->
                    <link rel="preconnect" href="https://fonts.googleapis.com">
                    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
                    <link href="https://fonts.googleapis.com/css2?family=Lato:wght@300&display=swap" rel="stylesheet">
                    <style>
                        body{
                            margin: 0;
                            padding: 0;
                            
                            background-image: linear-gradient(to right,#272727, #545454,#272727);
                            background-size: 100%;
                        }
                        
                        .topbar{
                            background-color: rgb(34, 104, 232);
                            height: 10px;
                            width: 100%;
                            height: 60px;
                        }
                        
                        .top-Container{
                            text-align: center;
                        }
                        
                        .gridBoxing{
                            margin: 40px;
                            border: 2px solid black;
                            padding: 20px;;
                            width: 50%;
                        
                            font-size: 25px;
                            font-family: 'Lato', sans-serif;
                            
                            background-color: rgb(33, 116, 224);
                            background-image: linear-gradient(to right, rgb(0, 70, 216),rgb(60, 135, 234),rgb(0, 70, 216));
                        
                        }
                        
                        #TLEline{
                            font-size: 40px;
                            font-family: 'Lato', sans-serif;
                            color: white;
                        }
                        
                        #span1{
                            font-size: 20px;
                            font-family: 'Lato', sans-serif;
                            color: #82ff00;;
                        }
                        
                        a{
                            text-decoration: none;
                            color: white;
                            
                        }
                        #divNavrBar {
                            font-size: 20px;
                            padding: 12px;
                            color: rgb(95, 255, 47);
                            
                        }
                    </style>
                </head>
                
                <body>
                    <nav class="topbar">
                
                        <div id="divNavrBar">
                            
                                
                                Social Media Tracker
                            
                        </div>
                
                    </nav>
                
                    <div class="top-Container">
                
                        <p id="TLEline">
                            You have exceeded the time limit set for this site!
                        </p>
                
                        <div>
                
                            <span id="span1">Timer will reset at 12 am. <br> In the meantime you can spend your time productively at these sites:</span>
                
                            <center>
                
                                <div class="gridBoxing">
                                    <a href="https://www.lumosity.com/en/">Lumosity - Train your brain</a>
                                </div>
                
                                <div class="gridBoxing">
                                    <a href="https://www.calm.com/">Calm - Improve your focus by meditation</a>
                                </div>
                
                                <div class="gridBoxing">
                                    <a href="https://www.geeksforgeeks.org/">Geeksforgeeks - Learn new languages or brush up your old
                                        skills</a>
                                </div>
                
                                <div class="gridBoxing">
                                    <a href="https://www.asianefficiency.com/">Asian Efficiency - Learn how to spend your time
                                        productively by these blogs</a>
                                </div>
                
                                <div class="gridBoxing">
                                    <a href="https://youtu.be/Hu4Yvq-g7_Y">See this TEDxTalks video to focus</a>
                                </div>
                
                            </center>
                        </div>
                
                    </div>
                </body>
                </html>`;
                    
                    clearInterval(intervalID);
                }

            }, 1000); // executes after every 1 second

        }
    }
}


function onLoadingWebPage() {
    let currentDomainName = window.location.hostname;
    console.log(currentDomainName);
    timerReset();
    fetchingDict(currentDomainName);

}



document.addEventListener("onload", onLoadingWebPage());
