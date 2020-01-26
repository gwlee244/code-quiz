var start = document.querySelector("#start");
var time;
var upper = document.querySelector(".content");  //
var result = document.querySelector(".result");   //
var question = document.querySelector(".question");
var answerContainer= document.querySelector(".answer-container");
var ul = document.querySelector("#ans-cont");
var qText = document.querySelector("#questionText");
var timer = document.querySelector("#timer");
var score = document.querySelector("#final-score");
var finishedQuiz = document.querySelector(".finished");
var questionIndex = document.querySelector(".question-main");
var questionBox = document.querySelector(".questionBox");
var high = document.querySelector("#high");
var clear = document.querySelector("#clear");
var questionCount = 0;
var correctCount = 0;
var incorrectCount = 0;
var totalscore = 0;
var makeForm;
var submitBtn;
var secondsLeft = 60;
var initialBox;
var object;
var label;
var counterVar = 1;
var makeDiv;
var submitDiv;

function atStart() {
    if (start) {
        start.addEventListener("click", beginTimer);
    }
    if (ul) {
        ul.addEventListener("click", clickAnswer);
    }
}
atStart();

function beginTimer() {
    time = setInterval(function() {
    timer.innerHTML=secondsLeft;
    secondsLeft--;

    if(secondsLeft <= -1) {
        clearInterval(time);
        alert("Time's Up! Click refresh to try again.");
        }
        
    },1000);
    
    answerQ();
}

function answerQ(){
    upper.innerHTML=""; 
    result.innerHTML=""; 

    if (questionCount<questions.length && counterVar!=0){
        ul.innerHTML="";
        var ques= questions[questionCount].title;
        qText.textContent=ques;
        
        for(var i=0; i < questions[questionCount].choices.length; i++){
            var li= document.createElement("li");
            li.setAttribute("id",i)
            li.setAttribute("style","background-color: grey;color: white;width:150px;margin-bottom:10px;padding:5px;border-radius:5px;height:50px;")
            li.textContent=questions[questionCount].choices[i]; 
            ul.appendChild(li);
        }
    }
    else{
        
        clearInterval(time);
        questionIndex.innerHTML="";
        makeDiv= document.createElement("div");
        makeDiv.setAttribute("id","new-div");

        finishedQuiz.appendChild(makeDiv);
        
        var paraOne=document.createElement("h2");
        paraOne.textContent="All done!";
        makeDiv.appendChild(paraOne);

        var newPara= document.createElement("h4");
        newPara.textContent= "Your final score is:  ";
        makeDiv.appendChild(newPara);

        var spanTag= document.createElement("span");
        spanTag.setAttribute("id", "score-span");
        spanTag.textContent= totalscore; //correctCount
        newPara.appendChild(spanTag);

        makeForm = document.createElement("form");
        makeForm.setAttribute("style","margin-right:30px;margin-top:30px;margin-bottom:30px;")
        finishedQuiz.appendChild(makeForm);
        label= document.createElement("label");
        
        label.textContent="Enter initials: "
        makeForm.appendChild(label);
        var initialBox = document.createElement("input");
        initialBox.setAttribute("type","text");
        initialBox.setAttribute("id", "one");
        makeForm.appendChild(initialBox);

        submitDiv= document.createElement("span");
        finishedQuiz.appendChild(submitDiv);
        submitBtn= document.createElement("button");
        submitBtn.setAttribute("id","submit");

        submitBtn.setAttribute("onclick",'viewHighscores()');
        submitBtn.textContent= "Submit";
        submitBtn.setAttribute("style","background-color:blue; width:100px; height: 30px; color:white;font-size:15px;")
        submitDiv.appendChild(submitBtn);
    }
}

function clickAnswer(){
    if (event.target.matches("li")===true){
        var index= event.target.getAttribute("id");
    
        if (questions[questionCount].choices[index]===questions[questionCount].answer){
            result.textContent="Correct!";  
            correctCount++;
           // console.log(totalscore);
        }
        else{       
            result.textContent="Incorrect";  
            incorrectCount++;
            clearInterval(time);
            var val = timer.innerHTML;
            var newSec = val - 10;

            time=setInterval(function(){
                timer.innerHTML=newSec;
                newSec--;

                if(newSec<0){
                    clearInterval(time);
                    counterVar=0;
                    createDiv.innerHTML="";
                    makeForm.innerHTML="";
                    submitDiv.innerHTML="";
                    answerQ();
                }
            },1000);  
        }
        totalscore = (5 * correctCount) - (incorrectCount*2);
        //console.log(totalscore);
    }
    questionCount++;
    setTimeout(answerQ, 1000);
}

function viewHighscores(){
    var getLabel = document.querySelector("#one").value;
    var getScore = document.querySelector("#score-span").textContent;

    object = {"initial":getLabel,"score":getScore};
    
    var data = JSON.parse(localStorage.getItem('player'));
    if (data) {
        data.push(object);
    } else {
        data = [];
        data.push(object);
    }
    localStorage.setItem('player', JSON.stringify(data));
    location.assign("highscores.html");
}


