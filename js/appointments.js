
var getByID = function(id){
    return document.getElementById(id);
};

var subjectField, descriptionField, dateField, timeField, okayButton, cancelButton;
var appointments = [];
var showTable = function(){
    var tableDiv = document.getElementById("table");
    var table = "<table border='1'><thead><th>Date</th><th>Time</th><th>Subject</th>" +
            "<th>Completed</th></thead>";
    for (var i = 0, j = appointments.length; i<j; i++){
        table += appointments[i].tableRow();
    };
    table += "</table>";
    tableDiv.innerHTML = table;
};
setInterval( function(){
    var s = "";
    if (appointments.length > 0) {
        for (var i = 0, j = appointments.length; i < j; i++) {
            if (appointments[i].isDue() && !appointments[i].completed) {
                s += "\nAppt: " + appointments[i].subject + "\n";
            }};
        if (s != "") alert(s);
    }}, 60000); //set to 60000

window.onload = function() {
    showTable();
    subjectField = getByID("subject");
    descriptionField = getByID("description");
    dateField = getByID("duedate");
    timeField = getByID("duetime");
    okayButton = getByID("okay");
    cancelButton = getByID("cancel");

    var showButton = getByID("show");
    showButton.onclick = function(){
        showTable();
    };
};

