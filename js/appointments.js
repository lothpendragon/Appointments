
var getByID = function(id){
    return document.getElementById(id);
};

var subjectField, descriptionField, dateField, timeField, okayButton, cancelButton;
var appointments = [];
var showTable = function(){
    var tableDiv = document.getElementById("table");
    if (appointments.length > 0) {
        appointments.sort();
        var table = "<table border='1'><thead><th>Date</th><th>Time</th><th>Subject</th>" +
            "<th>Completed</th></thead>";
        for (var i = 0, j = appointments.length; i < j; i++) {
            table += appointments[i].tableRow();
        }
        ;
        table += "</table>";
        tableDiv.innerHTML = table;
    } else {
        tableDiv.innerHTML = "<p>No appointments to display.</p>";
    }
};

var checkSchedule = function(){
    var st = "Appointments overdue!\n";
    var s = "";
    if (appointments.length > 0) {
        for (var i = 0, j = appointments.length; i < j; i++) {
            if (appointments[i].isDue() && !appointments[i].completed) {
                s += "Appt: " + appointments[i].subject + "\n";
            }};
        if (s !== "") alert(st + s);
    }};
var intr = setInterval(checkSchedule(), 60000); //set to 60000

var fillTimeList = function(timeList){
    var hours;
    for (hours = 0; hours < 24; hours++){
        var hh = hours.toString();
        if (hh.length < 2){
            hh = "0" + hh;
        }
        timeList.options[timeList.options.length] = new Option(hh+":00");
        timeList.options[timeList.options.length] = new Option(hh+":30");
    }
    selectNearestTime(timeList);
};
var selectNearestTime = function(timeField){
    var t = new Date();
    var n = t.getHours()*2 + Math.floor(t.getMinutes() / 30);
    timeField.options[n].selected = true;
};

window.onload = function() {
    showTable();
    subjectField = getByID("subject");
    descriptionField = getByID("description");
    dateField = getByID("duedate");
    timeField = getByID("duetime");
    okayButton = getByID("okay");
    cancelButton = getByID("cancel");
    showButton = getByID("show");

    dateField.valueAsDate = new Date();
    fillTimeList(timeField);

    var addAppointment = function(subjectField, descriptionField, dateField, timeField){
        var appt = new Appointment(subjectField.value, descriptionField.value, dateField.value, timeField.value);
        appointments.push(appt);
        showTable();
    };

    okayButton.onclick = function(){
        if (subjectField.value.length === 0){
            if (confirm('Subject field empty. Are you sure you wish to continue?')){
                subjectField.value = "[No subject]";
                addAppointment(subjectField, descriptionField, dateField, timeField);
                showTable();
            }
            } else {
            addAppointment(subjectField, descriptionField, dateField, timeField);
            showTable();
        }

    };

    cancelButton.onclick = function(){
        subjectField.value = "";
        descriptionField.value = "";
        dateField.valueAsDate = new Date();
        fillTimeList(timeField);
    }

    showButton.onclick = function(){
        showTable();
    };
};

window.onunload = function(){
    window.clearInterval(intr);
}