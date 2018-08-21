//Create an object with an array containing question, choices, correct answer#, explanation and image
let questions = [{
    text: "Who is the original author of the Game of Thrones book series?",
    answer: ["Stephen King", "J.R. Tolkien", "L. Ron Hubbard", "George R.R. Martin"],
    correct_answer: 3,
    explain: "George R. R. Martin is the author of the widely popular book series Game of Thrones which is also a telvision phenomenon.",
    image: "images/GOT.jpg"
}, {
    text: "Which tile is darker gray?",
    answer: ["Top", "Bottom", "Both the same gray"],
    correct_answer: 2,
    explain: "Both tiles are actually the same shade of gray. Your brain just translates the bottom to a lighter gray due to the percieved shadow. If you place a pen or pencil between the lines that connects them you will see they are both the same shade of gray.",
    image: "images/gray-shade.jpg"
}, {
    text: "How many years did it take to build the Leaning Tower of Pisa?",
    answer: ["5 Years", "19 Years", "199 Years", "34 Years"],
    correct_answer: 2,
    explain: "It took 199 years to build the Leaning Tower of Pisa, beginning in August 1173. The construction was stopped twice, the first time for 100 years, the second time in 1284. Both times it was due to wars.",
    image: "images/pisa.jpg"
}, {
    text: "What produces the most oxygen on Earth?",
    answer: ["Algae & Marine Plants", "All the Forests combined", "Mammals"],
    correct_answer: 0,
    explain: "Algae and other marine plants produce an estimated 70 percent of Earth's oxygen through the photosynthesis process that takes place in oceans.",
    image: "images/monster.jpg"
}, {
    text: "How many possible moves are there in chess?",
    answer: ["1,900", "Over a Trillion", "1,250,425"],
    correct_answer: 1,
    explain: "There are over 288 billion different possible positions after four moves each. The number of distinct 40-move games is far greater than the number of electrons in the observable universe.",
    image: "images/chess.jpg"
}, {
    text: "Who is the best selling music artists of all-time?",
    answer: ["Elvis Presley", "Michael Jackson", "Pink Floyd", "The Beatles"],
    correct_answer: 3,
    explain: "The Beatles have sold 269 million certified units, according to Soundscan, making them the best selling artists of all-time.",
    image: "images/music.jpg"
}, {
    text: "The Olympic Games originated in Greece?",
    answer: ["True", "False"],
    correct_answer: 0,
    explain: "The Ancient Games were staged in Olympia, Greece, from 776 BC through 393 AD, it took 1503 years for the Olympics to return. The first modern Olympics were held in Athens, Greece, in 1896.",
    image: "images/greece.jpg"
}, {
    text: "According to NASA - How many stars, approximately, are there in the known universe?",
    answer: ["10 Billion", "A Zillion", "100 Trillion", "500 Quadrillion"],
    correct_answer: 1,
    explain: "We basically have no idea how many stars there are in the universe. NASA can only confidently say that there are zillions of uncountable stars. A Zillion is any uncountable amount.",
    image: "images/mars.jpg"
}];

// question number in the array
let questionNum = 0;
// initialize correct counter to 0
let isCorrect = 0;
// initialize incorrect counter to 0
let isWrong = 0;

function display(position) {
    //THE FOLLOWING if / else STATEMENTS CHECK FOR THE WINNING OR LOSING RESULTS
    // if the question number is equal to the amount of questions in the questions array
    // and user has answered 5 or more correct --- run the following
    if ((questionNum === (questions.length - 1)) && isCorrect >= 5) {
        // hide the questionSection
        $('.questionSection').hide();
        // display the wining results and screen
        $('.winningDiv').show();

        for (let i = 0; i <= questions.length - 1; i++) {
            // iterate over the aray to display the questions and answers
            // which append to the finalExplain section on the final page
            $('.finalExplain').append("<br><ul><li>" + (i + 1) + '. ' + questions[i].text + " " + questions[i].explain + "</li></ul>");
        };
        // if the question number is equal to the amount of questions in the questions array
        // and user has answered 4 or more incorrect --- run the following
    } else if ((questionNum === (questions.length - 1)) && isWrong >= 4) {

        $('.questionSection').hide();
        // update the count for incorrect on the losing page
        $('.wrongCount').html(isWrong);
        // display the losing results and screen
        $('.losingDiv').show();

        for (let i = 0; i <= questions.length - 1; i++) {
            $('.finalExplain').append("<br><ul><li>" + (i + 1) + '. ' + questions[i].text + " " + questions[i].explain + "</li></ul>");
        }
    }

    questionNum = position;

    $('.start').hide();
    $('.titleName').hide();
    $('.explain').empty();
    $('.userAlert').hide();
    $('.submit').hide().fadeIn(500);
    $('.theText').hide();
    $('.choices').hide().fadeIn(500);

    $('.theText').text(questions[questionNum].text).css("fontSize", 25).hide().fadeIn(500);

    $('#questionImage').attr('src', questions[questionNum].image).hide().fadeIn(500);

    $('.questionNum').text(`Question # ${questionNum + 1} out of ${questions.length}`);
    $('.choices').empty();

    for (let i = 0; i <= questions[questionNum].answer.length - 1; i++) {

        $('.choices').append("<li><input type='radio' name='theAnswer' value='" + i + "'>" + questions[questionNum].answer[i] + "</li>");
    }
}

function verifyAnswer() {
    let userChoice = $("input[type='radio']:checked").val();

    // if user does not click a radio button
    if (userChoice === undefined) {
        $('.userAlert').hide().empty();
        $('.userAlert').append("<p class='alertP'>Please choose an answer above</p>").fadeIn(500);
        //        displayError('Please choose a valid response below.');
        // if the users choice equals the questions array-index-correct answer
    } else if (userChoice == questions[questionNum].correct_answer) {

        $('.userAlert').hide();
        $('.theText').hide();
        $('.submit').hide();
        $('.choices').empty();
        $('.explain').hide();

        $('.explain').append("<h2>You're Right!</h2>").fadeIn(600);
        $('.explain').append(questions[questionNum].explain + "<input type='button' name='submit' id='next' value='Next'>");
        // increment isCorrect by 1
        isCorrect++;
        // update the .count to the total correct above
        $('.count').html(isCorrect);
        $('.countDiv').show();

        // on click of #next button run the nextQuestion() function
        $('#next').on('click', () => {
            nextQuestion();
        });

        // if answer is not correct ---
    } else {

        $('.userAlert').hide();
        $('.theText').empty();
        // hide the submit button
        $('.submit').hide();

        $('.choices').empty();
        $('.explain').hide();
        $('.explain').append("<h2>Incorrect</h2>").fadeIn(600);
        $('.explain').append(questions[questionNum].explain + "<input type='button' name='submit' id='next' value='Next'>");

        // increment isWrong varable by 1
        isWrong++;

        $('#next').on('click', () => {
            nextQuestion();
        });
    }
}

function nextQuestion() {
    display(questionNum + 1);
}

$(function () {

    //    $("#messageBox").hide();

    //on click of the startQuiz button run the function display(0)
    $('.startQuiz').on('click', () => {
        display(0);
    });

    // on click of the .submit in the quiz run the verifyanswer() function
    $('.submit').on('click', () => {
        verifyAnswer();
    });

    // on click on the final page resetQuiz button reinitialize the variables
    // and run the function display()
    $('.resetQuiz').on('click', () => {
        $('.winningDiv').hide();
        $('.losingDiv').hide();
        questionNum = 0;
        // initialize correct counter to 0
        isCorrect = 0;
        // initialize incorrect counter to 0
        isWrong = 0;
        display(questionNum);
        // rewrite the count to the new isCorrect #
        $('.count').html(isCorrect);
        // show the questionSection
        $('.questionSection').show();
        //clears the finalExplain on the final page to allow to re-write to it
        $('.finalExplain').empty();

    });
});
