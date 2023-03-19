function deleteSite(DN) {
    chrome.storage.local.get("SocialMediaTracker", (dataGot) => {
        let d = dataGot["SocialMediaTracker"];

        let newDict = {};

        for (var key in d) {
            if (key != DN) {
                newDict[key] = d[key];
            }
        }

        chrome.storage.local.set({ "SocialMediaTracker": newDict });

        tableCreator(newDict);

    })
}


function tableCreator(dictReceived) {
    

    let arrofKeys = Object.keys(dictReceived);
    let lengthDict = arrofKeys.length;


    var tablearea = document.getElementById('areaforTable');
    tablearea.innerHTML="";
    var table = document.createElement('table');
    table.classList.add("pure-table")

    table.classList.add("pure-table-horizontal")
    table.classList.add("addedTable")

    for (let i = 0; i < lengthDict; i++) {

        if (i == 0) {
            var tr = document.createElement('tr');

            var th1 = document.createElement('th');
            var th2 = document.createElement('th');
            var th3 = document.createElement('th');
            var th4 = document.createElement('th');

            var text1 = document.createTextNode('Website');
            var text2 = document.createTextNode('Time Limit');
            var text3 = document.createTextNode('Current Usage');
            var text4 = document.createTextNode('Action');

            th1.appendChild(text1);
            th2.appendChild(text2);
            th3.appendChild(text3);
            th4.appendChild(text4);

            tr.appendChild(th1);
            tr.appendChild(th2);
            tr.appendChild(th3);
            tr.appendChild(th4);

            table.appendChild(tr);
        }

        else {

            var tr = document.createElement('tr');

            var td1 = document.createElement('td');
            var td2 = document.createElement('td');
            var td3 = document.createElement('td');
            var td4 = document.createElement('td');

            var text1 = document.createTextNode(arrofKeys[i]);
            var text2 = document.createTextNode(dictReceived[arrofKeys[i]][0]);
            var text3 = document.createTextNode(Math.round((dictReceived[arrofKeys[i]][1]) / 60));

            var btn = document.createElement('button');
            btn.innerHTML = "Delete"
            btn.classList.add(`Button${i}`);
            btn.addEventListener("click", () => {

                deleteSite(arrofKeys[i]);
            });

            td1.appendChild(text1);
            td2.appendChild(text2);
            td3.appendChild(text3);
            td4.appendChild(btn);


            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.appendChild(td3);
            tr.appendChild(td4);

            table.appendChild(tr);
        }
    }
    tablearea.appendChild(table);
}

function callingPage() {

    chrome.storage.local.get("SocialMediaTracker", (dataGot) => {
        let d = dataGot["SocialMediaTracker"];

        tableCreator(d);
    })
}

document.addEventListener("onload", callingPage());

