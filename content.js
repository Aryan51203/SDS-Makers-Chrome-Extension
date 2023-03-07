function AddToList() {

    let urlInput = document.getElementById('urlEntered').value;
    let rangeInput = Number(document.getElementById('rangeEntered').value);

    let domain = new URL(urlInput);

    domain=domain.hostname;

    webArr = [rangeInput,0]

    webArrStr = JSON.stringify(webArr);
    localStorage.setItem(domain, webArrStr);
}

function onLoadingWebPage() {
    let currentDomainName = window.location.hostname;
    console.log(currentDomainName);

    let webArrFetchedStr = localStorage[currentDomainName];

    if (webArrFetchedStr) {

        webArr = JSON.parse(webArrFetchedStr);

        let totalTime = webArr[1];

        let limitSpecified = webArr[0];

        limitSpecified = limitSpecified*60;

        const startingTime = new Date().getTime();

        setInterval(() => {
            let end = new Date().getTime();

            totalTime += (end - startingTime) / 1000;

            webArr[1] = totalTime;

            localStorage.setItem(currentDomainName, JSON.stringify(webArr));
            
            if(totalTime >= limitSpecified){
                console.log('limit exceeded. Please close');
                window.alert('limit exceeded. Please close');
            }

        },1000)


        // document.addEventListener("DOMContentLoaded", () => {
        //     const startingTime = new Date().getTime();
        //     console.log(startingTime);
        //     window.addEventListener("beforeunload", () => {
        //         const end = new Date().getTime();
        //         const totalTime = (end - startingTime) / 1000
        //         localStorage.setItem("TimeSpent",totalTime);
        //     });
        // });
    }
}

document.addEventListener("onload", onLoadingWebPage());
