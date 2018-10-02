$(document).ready(function () {
    var config = {
        apiKey: "AIzaSyCb7WZ4lK7KM47xgT0DrPORf9i8GJnYA2c",
        authDomain: "train-activity-79115.firebaseapp.com",
        databaseURL: "https://train-activity-79115.firebaseio.com",
        projectId: "train-activity-79115",
        storageBucket: "train-activity-79115.appspot.com",
        messagingSenderId: "383121786702"
    };
    firebase.initializeApp(config);

    var database = firebase.database();
    // var increment = 1
    // Listen for form submission
    $("#train-form").on("submit", function (event) {

        // prevent reload
        event.preventDefault();

        var trainInfo = {
            tName: $("#name").val().trim(),
            tDestination: $("#destination").val().trim(),
            tTime: $("#train-time").val().trim(),
            tFrequency: $("#frequency").val()
        }

        console.log(trainInfo);

        database.ref().push(trainInfo);

        // clear out form fields
        $("#name").val("")
        $("#destination").val("")
        $("#train-time").val("")
        $("#frequency").val("")
    });

    database.ref().on("child_added", function (childSnapshot) {


        console.log(childSnapshot.val());
        
        
        var tName = childSnapshot.val().tName;
        var tDestination = childSnapshot.val().tDestination;
        var tTime = childSnapshot.val().tTime;
        var tFrequency = childSnapshot.val().tFrequency;
        
        // First Time (pushed back 1 year to make sure it comes before current time)
        var firstTimeConverted = moment(tTime, "HH:mm").subtract(1, "years");
        console.log(firstTimeConverted);

        // Current Time
        var currentTime = moment();
        console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

        // Difference between the times
        var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
        console.log("DIFFERENCE IN TIME: " + diffTime);

        // Time apart (remainder)
        var tRemainder = diffTime % tFrequency;
        console.log(tRemainder);

        // Minute Until Train
        var tMinutesTillTrain = tFrequency - tRemainder;
        console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

        // Next Train
        var nextTrain = moment().add(tMinutesTillTrain, "minutes");
        console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
        console.log("remainder: " + tRemainder);

        var trainRow = $("<tr>").append(
            $("<td>").text(tName),
            $("<td>").text(tDestination),
            $("<td>").text(tFrequency),
            $("<td>").text(moment(nextTrain).format("hh:mm")),
            $("<td>").addClass('minutes').text(tMinutesTillTrain)
        );
        
        $("#train-table").append(trainRow);

              
    });


    var myVar = setInterval(myTimer, 1000);

    function myTimer() {
        //still working on updating minutes away, decreasing by a minute until reaching 0 minutes away
        // var tMinute = $(".minutes");

        
        // for (i = 0; i < tMinute.length; i++) { 

        //     console.log(tMinute[i].textContent);
        //     var tTimer =parseInt(tMinute[i].textContent);
        //     tTimer--;

        //     tMinute[i].textContent = tTimer;

        // }
                        
        var d = new Date();
        document.getElementById("timer").innerHTML = d.toLocaleTimeString();
        var timeString = d.toLocaleTimeString()
        var seconds = timeString.split(':')[2]
        if(seconds == 0){
            decrementTime()
        }
    }
    myVar();
});
