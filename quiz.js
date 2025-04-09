
const questions = [
    {
        question:"Vilken sorteringsalgoritm fungerar genom att upprepade gånger byta plats på angränsande element om de är i fel ordning?",
        answers: [
            {text: "Selection Sort", correct: false},
            {text: "Bubble Sort", correct: true},
            {text: "Merge Sort", correct: false},
            {text: " Quick Sort", correct: false},

        ]
    },
    {
        question:"Vad är den genomsnittliga tidskomplexiteten för Bubble Sort?",
        answers: [
            {text: "O(n)", correct: false},
            {text: "O(n log n)", correct: false},
            {text: "O(n²)", correct: true},
            {text: "O(log n)", correct: false},

        ]
    },
    {
        question:"Vilken algoritm hittar det minsta elementet i osorterad del och byter det med första osorterade elementet?",
        answers: [
            {text: "Insertion Sort", correct: false},
            {text: "Merge Sort", correct: false},
            {text: "Selection Sort", correct: true},
            {text: "Bubble Sort", correct: false},

        ]
    },

    {
        question:"Vilken algoritm fungerar bäst för nästan sorterade listor?",
        answers: [
            {text: "Selection Sort", correct: false},
            {text: "Insertion Sort", correct: true},
            {text: "Merge Sort", correct: false},
            {text: "Quick Sort", correct: false},

        ]
    },

    {
        question:"I vilken sorteringsalgoritm delas arrayen upp rekursivt i halvor?",
        answers: [
            {text: "Selection Sort", correct: false},
            {text: "Bubble Sort", correct: false},
            {text: "Merge Sort", correct: true},
            {text: "Insertion Sort", correct: false},

        ]
    },
    {
        question:"Vilken är den värsta tidskomplexiteten för Merge Sort?",
        answers: [
            {text:"O(n log n)", correct: true},
            {text:"O(n²)", correct: false},
            {text:"O(n)", correct: false},
            {text:"O(log n)", correct: false},
        ]

    },
    {
        question:`Vad är "pivot" i Quick Sort? `,
      
        answers: [
            {text:"Det minsta elementet", correct: false},
            {text:"Ett slumpmässigt valt element som jämförelser görs mot", correct: true},
            {text:"Det största elementet", correct: false},
            {text:"Det första elementet i listan", correct: false},
        ]

    },
    {
        question:"Vilken sorteringsalgoritm är stabil?",
        answers: [
            {text:"Selection Sort", correct: false},
            {text:"Bubble Sort", correct: false},
            {text:"Merge Sort", correct: true},
            {text:"Quick Sort", correct: false},
        ]

    },

    {
        question:"Vad är den bästa tidskomplexiteten för Insertion Sort?",
   
        answers: [
            {text:"O(n²)", correct: false},
            {text:"O(n log n)", correct: false},
            {text:"O(n)", correct:true },
            {text:"O(log n)", correct: false},
        ]

    },
    {
        question:`Vilken algoritm använder "divide and conquer"-principen?`,
       
        answers: [
            {text:"Bubble Sort", correct: false},
            {text:"Insertion Sort", correct: false},
            {text:"Quick Sort", correct: true },
            {text:"Selection Sort", correct: false},
        ]

    },
    {
        question: "Vilken sorteringsalgoritm kräver alltid O(n²) jämförelser i värsta fall?",
        answers: [
            {text:" Merge Sort", correct: false},
            {text:"Quick Sort", correct: false},
            {text:"Selection Sort", correct:true },
            {text:"Insertion Sort", correct: false},
        ]

    },
    {
        question: "Vad är en nackdel med Quick Sort jämfört med Merge Sort?",
        answers: [
            {text:"Quick Sort kräver mer minne", correct: false},
            {text:"Merge Sort är långsammare", correct: false},
            {text:"Quick Sort kan ha O(n²) i värsta fall", correct:true },
            {text:"Merge Sort fungerar bara på små listor", correct: false},
        ]

    },
    

];

const codeElement = document.getElementById("code-snippet"); // Kodblock deklareras

const questionElement = document.getElementById("question"); //frågan deklareras
const answerButtons = document.getElementById("answer-btn");//svarsalternativ deklareras
const nextBtn = document.getElementById("next-btn"); //next button deklareras

//skapa fråge-index
let currentQuestionIndex = 0; //startas från 0
let score = 0;

//funktion för starta quizzet
function startQuiz (){
    currentQuestionIndex = 0;
    score = 0;
    nextBtn.innerHTML = "Next";
    showQuestion(); //när ovan principer är OK, då kallas denna funktionen
}


function showQuestion(){
    //ta bort tidigare frågor o svar
    resetState();

    let currentQuestion = questions[currentQuestionIndex];// Hämtar den aktuella frågan
    let questionNumber = currentQuestionIndex + 1; //uppdatera frågans nr
    questionElement.innerHTML = questionNumber + ". "+ currentQuestion.question;

    // Om frågan innehåller en kodsnutt
    if (currentQuestion.code) { // Om det finns kod i frågan
        codeElement.style.display = "block"; // Visa kodblocket
        codeElement.innerText = currentQuestion.code; // Lägg in kod
    } else {
        codeElement.style.display = "none"; // Dölj kodblocket om det saknas kod
    }

     //visa svaren
     currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);

        //vid rätt svar
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        //eventlisten to select answer
        button.addEventListener("click", selectAnswer);
    });
}

function  resetState(){
    nextBtn.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}
//välja svar
function selectAnswer(x){
    const selectedBtn = x.target; //valda svarsalternativ
    const isCorrect = selectedBtn.dataset.correct === "true";//kontroll= om svaret är korrekt
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }
    else{
        selectedBtn.classList.add("incorrect");
    }

    //efter rätt svar vad som sker...
   Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextBtn.style.display = "block";//vida "next" button!

}


//score function
function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextBtn.innerHTML = "Play Again!";
    nextBtn.style.display = "block";
    codeElement.style.display = "none"; // Dölj kodblocket om det saknas kod
}

//visa nästa fråga eller invoke showscore funtion
function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

//...gå till nästa=klicka på nästa button
nextBtn.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

//invoke start quiz!
startQuiz();