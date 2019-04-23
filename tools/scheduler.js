window.subjects = {
    "Maths" : 60,
    "English" : 60,
    "Science" : 90,
    "History" : 60,
    "German" : 60,
    "Electronics" : 60,
    "Computer Science" : 30,
    "Reading" : 30,
    "Programming" : 60,
}

function getSubjects(){   
    // clearTable();
    try {
        $('#clear-button').click();
    } catch(err) {
        console.log(err);
    }

    let time = document.getElementById("num-of-hours").value;
    if (time.length > 0 && !(isNaN(time)) && Number(time) <= 24) {
        document.getElementById("num-of-hours").value = "";

        let keys = Object.keys(window.subjects);
        let values = Object.values(window.subjects);
        window.choices = [];
        time = Number(time) * 60;
        // let time = 120

        while (time > 0) {
            let rand = Math.floor(Math.random() * keys.length);
            if (time >= values[rand]) {

                window.choices.push([keys[rand], values[rand]]);
                console.log(window.choices);

                time -= values[rand];
                console.log(time);
                // keys.splice(rand, 1);
                // values.splice(rand, 1);
                console.log(keys);
            }
        }

        let subjectTableBody = document.getElementById("subject-table-body");
        let htmlElement = "";

        for (let i = 0; i < window.choices.length; i++){
            console.log("Choices : " + window.choices[i]);
            htmlElement = "<tr>";
            htmlElement += "<td>" + window.choices[i][0] + "</td>";
            htmlElement += "<td>" + window.choices[i][1] + "</td>";
            htmlElement += "</tr>";
            subjectTableBody.innerHTML += htmlElement;
        }

        // document.getElementById("misc-buttons").style.display = "block";
        document.getElementById("clear-button").disabled = false;
        document.getElementById("export-button").disabled = false;

    }
}


function clearTable(){
    let subjectTableBody = document.getElementById("subject-table-body");
    subjectTableBody.innerHTML = '';
    // document.getElementById("misc-buttons").style.display = "none";

    document.getElementById("clear-button").disabled = true;
    document.getElementById("export-button").disabled = true;
}

function exportTable(){
    console.log("export");
    var blob = new Blob([window.choices.join("\n")], {type:"text/plain;charset=utf-8"});
    saveAs(blob, "schedule.txt");
}