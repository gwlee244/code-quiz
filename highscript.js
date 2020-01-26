
let clearScore = document.querySelector("#clearScoreBtn");
let storageArray = [];

storageArray= JSON.parse(localStorage.getItem("player"));

if(storageArray != null){
    storageArray.sort(function(a,b){
        return parseFloat(b.score) - parseFloat(a.score);
    });

    for (var i = 0; i < storageArray.length; i++){
        var name ="";
        var item = document.createElement("p");
        name = storageArray[i].initial+ " - "+ storageArray[i].score;
        item.textContent = name;
        high.appendChild(item);
        
    }
}

clearScore.addEventListener("click", function() {
    high.innerHTML = "";
    localStorage.clear();
});


