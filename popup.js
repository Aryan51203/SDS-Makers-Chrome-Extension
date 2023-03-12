function callingPage(){

    chrome.storage.local.get("SocialMediaTracker", (dataGot) => {
        let d = dataGot["SocialMediaTracker"];
    
        tableCreator(d);
    })
    
    function tableCreator(dictReceived) {
    
        console.log(dictReceived);
    
        let arrofKeys = Object.keys(dictReceived);
        let lengthDict = arrofKeys.length;
    
        console.log(arrofKeys[1]);
        console.log(lengthDict);
    
        var tablearea = document.getElementById('areaforTable');
        var table = document.createElement('table');
        table.classList.add("pure-table")
        table.classList.add("pure-table-horizontal")
        table.classList.add("addedTable")
    
        for (var i = 0; i < lengthDict; i++) {
    
            if (i == 0) {
                var tr = document.createElement('tr');
    
                var th1 = document.createElement('th');
                var th2 = document.createElement('th');
                var th3 = document.createElement('th');
    
                var text1 = document.createTextNode('Website');
                var text2 = document.createTextNode('Time Limit');
                var text3 = document.createTextNode('Current Usage');
    
                th1.appendChild(text1);
                th2.appendChild(text2);
                th3.appendChild(text3);
    
                tr.appendChild(th1);
                tr.appendChild(th2);
                tr.appendChild(th3);
    
                table.appendChild(tr);
            }
    
            else {
    
                var tr = document.createElement('tr');
    
                var td1 = document.createElement('td');
                var td2 = document.createElement('td');
                var td3 = document.createElement('td');
    
                var text1 = document.createTextNode(arrofKeys[i]);
                var text2 = document.createTextNode(dictReceived[arrofKeys[i]][0]);
                var text3 = document.createTextNode(Math.round((dictReceived[arrofKeys[i]][1])/60));
    
                td1.appendChild(text1);
                td2.appendChild(text2);
                td3.appendChild(text3);
    
                tr.appendChild(td1);
                tr.appendChild(td2);
                tr.appendChild(td3);
    
                table.appendChild(tr);
            }
        }
        tablearea.appendChild(table);
    
    }
}

document.addEventListener("onload", callingPage());

