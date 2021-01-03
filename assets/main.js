var currentTab = 0; // Current tab is set to be the first tab (0)
showTab(currentTab); // Display the current tab
drawDots(document.getElementsByClassName("default").length - 1); //Draw the dots
var picSize = Math.max(600, screen.width *1/2).toString(); //Have the final result picture be seen on the screen

//So if you are allowed to enter, QuestionMarks website will give you today's date so you can't jsut take a screenshot of yesterday's results and use them today
var dt = new Date();
var weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var day = weekday[dt.getDay()];
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var month = months[dt.getMonth()]

document.getElementById("datetime").innerHTML = day + ', ' + dt.getDate() + ' ' + month + ', ' + dt.getFullYear();



function showTab(n) {
    // This function will display the specified tab of the form...
    var x = document.getElementsByClassName("tab");
    x[n].style.display = "block";

    //... and run a function that will display the correct step indicator:
    fixStepIndicator(n)
}


//Future proofing we might want to update the questions asked in the future as we learn more about COVID-19
//so Instead of TAKING THE WEBSITE DOWN FOR A WEEK we can just update the html.
function drawDots(n) {
    function createCircle() {
        let span = document.createElement('span');
        span.className = "step";
        return span;
    }

    for (i = 0; i < n; i++) {
        document.getElementById("circledots").innerHTML += "\n<span class='step'></span>";

    }
}


    

function nextTab(status) {
    // This function will figure out which tab to display
    var tabs = document.getElementsByClassName("tab");

    //Some sub functions
    //Goes to the next tab
    function next() {
        tabs[currentTab].style.display = "none";
        currentTab = currentTab + 1;
        showTab(currentTab);
    }
    //Some questions require more questions, so we expand. For now these have to be at the end. 
    function expand(s) {
        var newTabs = Number(s.replace("EXPAND", ""));
        drawDots(newTabs);
        next();
    }

    //Each answer has a status. They are pretty self-explinatory
    if (status == "UNANSWERED") {
        alert("Please answer the question");
    } else if (status == "NEXT") {
        next();
    } else if (status.startsWith("EXPAND")) {
        expand(status);
    } else if (status == "GOOD") {
        youGood();
    } else if (status == "BAD") {
        youBad();
    }else {
        alert("Drunk Monkey You Done Goofed");
    }

}


function fixStepIndicator(n) {
    // This function removes the "active" class of all steps...
    var x = document.getElementsByClassName("step");
    for (i = 0; i < x.length; i++) {
        x[i].className = x[i].className.replace(" active", "");
        //...adds finished class to previous steps...
        x[i].className = x[i].className.replace(" finish", "");
        if (i < n) {
            x[i].className += " finish";
        }

    }
    //... and adds the "active" class on the current step:
    x[n].className += " active";
}



//Takes a class, and changes the display type
function changeDisplay(changeClass, displayType) {
    var x = document.getElementsByClassName(changeClass);
    for (i = 0; i < x.length; i++) {
        x[i].style.display = displayType;
    }

}


//I know I know don't repeate yourself, but this was a pain in the ass to program, and ctrl-c ctrl-v is sooooo easy. 
//also to not repeate myself, I would have to resort to a if-then statement, and we already have one up there. 
function youGood() {
    //Kill the questionaire, in QuestionMark, if you answered wrong, went back and answered correctly, then it would still send you to the "You are Sick" page
    //So I don't give the user to press back. They can reload if they want to be a little liar.
    document.getElementById("Questions").innerHTML = "";
    //So all the results are hidden by default, so this takes the neutral elements and the good elements and makes them visible
    changeDisplay("neutralResults", "initial");
    
    changeDisplay("goodResults", "block");
    //So we are not uploading 2 pictures, we upload a picture of a blank pixel, then we change the picture to what we wante, called Good.png or Bad.png
    var mainPic = document.getElementById("mainPic");
    mainPic.src = "assets/Good.png";
    //shrink it down to the user's screen size
    mainPic.width = picSize;
    mainPic.height = picSize;
    //Their tab will now say "You Good Brah"
    document.title = "You Good Brah"
}



function youBad() {
    //pretty much You Gud, but You Badd
    document.getElementById("Questions").innerHTML = "";
    changeDisplay("neutralResults", "initial");
    changeDisplay("badResults", "block");

    var mainPic = document.getElementById("mainPic");
    mainPic.src = "assets/Bad.png";

 

    mainPic.width = picSize;
    mainPic.height = picSize;
    document.title = "Get Tested Brah"
    //I can't do anything else. I'm sorry.
    console.log("By the power of every moment of your goodness, may all dangers be averted and all disease be gone. May this be a False Alarm. May your test come back negative.")
}