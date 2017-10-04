
var Appointment = function(subject, description, date, time){
    this.subject = subject;
    this.description = description;
    this.datetime = new Date(date + " " + time);
    this.completed = false;
};
Appointment.prototype.isDue = function(){
    var now = new Date();
    if (now >= this.datetime){
        return true;
    } else {
        return false;
    }
};
Appointment.prototype.whenDue = function(){
    return this.datetime - new Date();
};
Appointment.prototype.howManyDaysTil = function(){
    return (this.datetime - new Date()) / 86400000; //milliseconds in a day
};
Appointment.prototype.howManyHoursTil = function(){
    return (this.datetime - new Date()) / 3600000; //milliseconds in an hour
};
Appointment.prototype.howManyMinutesTil = function(){
    return (this.datetime - new Date()) / 60000; //milliseconds in an hour
};
Appointment.prototype.getDate = function(){
    return this.datetime.toDateString();
};
Appointment.prototype.getTime = function(){
    return this.datetime.getHours() + ":" + this.datetime.getMinutes();
};
Appointment.prototype.tableRow = function(){
    var s = "<tr><td>" + this.getDate()
        + "</td><td>" + this.getTime()
        + "</td><td>" + this.subject
        //+ "</td><td>" + this.description
        + "</td><td><input type='checkbox' value='" + this.completed + "'/>"
        + "</td></tr>";
    return s;
};
Appointment.prototype.toString = function(){
    var s = this.subject + "\n"
        + this.description + "\n"
        + this.datetime.toDateString() + "\n";
    if (this.completed){
        s += "Completed\n\n";
    } else {
        s += "Not Completed\n\n";
    }
    return s;
};