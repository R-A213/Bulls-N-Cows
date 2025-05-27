let randomArray=[];
let count=1;

//clicking random will generate a number
$("#random").click(function(){
    randomArray=RandomNumber();
    count=0;
    $("h2").text("START!")
    $(".card .row:not(#header)").empty();
    $(".form-control").val("");

});

//clicking give up will reveal the generated number
$("#GiveUp").click(function(){
    count=0;
    let number=randomArray.join('').split('').map(Number);
    $("h2").text("The number was "+ number)
    if (randomArray.length==0){
        $("h2").text("generater a number first!!")
        return;
    }
    $(".form-control").val("");

});

//clicking enter will check if a number is generated or not and will call UserNumber function
//enter button on screen
$(".enter").click(function(){
   if (randomArray.length === 0){
       $("h2").text("generater a number first!!")
       return;
   }
   UserNumber();
});
//enter button on keyboard
$(".form-control").keypress(function(event) {
    if (event.which === 13) {
        event.preventDefault();
        if (randomArray.length === 0) {
            $("h2").text("Generate a number first!");
            return;
        }
        UserNumber(); 
    }
});

//function that will generate a random number
function RandomNumber() {
    let usedNumbers = [];
    let randomArray = [];
    for (let i = 0; i < 4; i++) {
        let num;
        do {
            num = Math.floor(Math.random() * 10) ;
        } while (usedNumbers.includes(num));
        randomArray.push(num);
        usedNumbers.push(num);
    }
    return randomArray;
};

//function that take the user's number
function UserNumber()
{   count++;
    let userInput= $(".form-control").val();
    if (userInput < 1000 || userInput > 9999) {
        $("h2").text("Enter a 4-digit number!");
        $(".form-control").val("");
        count--;
        return;
    };

    let UserArray = String(userInput).split('').map(Number);
    for(let i=0;i<4;i++){
        for(let j=i+1 ;j<4;j++){
           if(UserArray[i]==UserArray[j]){
            $("h2").text("no duplicated numbers allowed");
            $(".form-control").val("");
            count--;
            return;
            }
        }
    }

    for(let i=0;i<4;i++){
        for(let j=i+1 ;j<4;j++){
          if (!/^\d+$/.test(userInput)) {
           $("h2").text("Only numbers (0-9) are allowed!");
           $(".form-control").val("");
           count--;
           return;
           }
        }
    }
     
    let result=Compare(UserArray, randomArray);
     addRow(count,UserArray,result);
     $(".form-control").val("");
};

//function that will compare the users's answer with the generated number
function Compare(user, random) {
    let cow = 0;
    let bull = 0;
    for(let i=0;i<4;i++){
        if(user[i]==random[i])
            {bull++;}
        else {
            for(let j=0;j<4;j++)
                {
                    if(user[i]==random[j] && i !== j)
                    {cow++;}
                }
            }
    }
    if(bull==3){
        $("h2").text("ALMOST THERE!!")
    }
    if(bull==4){
        $("h2").text("YOU WIN!!")
    }
   let res= cow+ "C "+ bull+"B"
   return res;
};

// function tht will take the user's number and add it to the table
function addRow(tries,guess,result)
{
   let newRow=$("<div>", {class:"row g-0"}).append(
     $("<div>",{class:"col-sm-4 col-md-4 col-lg-4 hide",text:tries}),
     $("<div>",{class:"col-6 col-sm-4 col-md-4 col-lg-4",text:guess.join('')}),
     $("<div>",{class:"col-6 col-sm-4 col-md-4 col-lg-4",text:result}),
   );
   $("#header").after(newRow);
   newRow.hide().fadeIn(200);
}

//for popup
document.addEventListener('DOMContentLoaded', function() {
    if (!localStorage.getItem('popupShown')) {
      const modal = new bootstrap.Modal(document.getElementById('exampleModal'));
      modal.show();
      localStorage.setItem('popupShown', 'true');
      
    }
  });