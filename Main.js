function AddToList() {

    let urlInput = document.getElementById('urlEntered').value;
    let rangeInput = Number(document.getElementById('DropdownEntered').value);

    document.getElementById("urlEntered").value =""; 
    document.getElementById('DropdownEntered').value = "0";

    let domain = new URL(urlInput);

    let domainName=domain.hostname;

    webArr = [rangeInput,0]
    chrome.storage.local.get("SocialMediaTracker",(dg)=>{
        console.log(dg)
        if(dg["SocialMediaTracker"]){

            dict = dg["SocialMediaTracker"];
            dict[domainName]=webArr;
            chrome.storage.local.set({"SocialMediaTracker":dict});
            window.alert("Added Successfully");
            console.log("success");
        }
        else{
            dict={}
            dict[domainName]=webArr;
            chrome.storage.local.set({"SocialMediaTracker":dict});
            window.alert("Added Successfully");
            console.log("success");
        }

    })
}

document.getElementById("ADDButton").addEventListener('click',AddToList);