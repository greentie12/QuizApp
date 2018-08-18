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

$(function () {

    $('.startQuiz').on('click', () => {

        display(0);
    });

    $('.submit').on('click', () => {

        verifyAnswer();
    });
});


function display(position) {

    if ((questionNum === (questions.length - 1)) && isCorrect >= 5) {
        // hide everyhtin in container
        $('.questionSection').hide();
        // display the wining results and screen
        $('.winningDiv').show();
    } else if ((questionNum === (questions.length - 1)) && isWrong >= 4) {
        // hide everything in container
        $('.questionSection').hide();
        // update the count for incorrect on the losing page
        $('.wrongCount').html(isWrong);
        // display the losing results and screen
        $('.losingDiv').show();
    }

    if ((questionNum === (questions.length - 1)) && isWrong >= 4) {
        // hide everything in container
        $('.questionSection').hide();
        // update the count for incorrect on the losing page
        $('.wrongCount').html(isWrong);
        // display the losing results and screen
        $('.losingDiv').show();
    } else if ((questionNum === (questions.length - 1)) && isCorrect >= 5) {
        // hide everyhtin in container
        $('.questionSection').hide();
        // display the wining results and screen
        $('.winningDiv').show();
    }

    questionNum = position;

    $('.start').hide();

    $('.explain').empty();

    $('.submit').show();

    $('.theText').show();

    $('.choices').show();

    $('.theText').text(questions[questionNum].text);

    $('#questionImage').attr('src', questions[questionNum].image);

    $('.questionNum').text(`Question # ${questionNum + 1} out of ${questions.length}`);

    for (let i = 0; i <= questions[questionNum].answer.length - 1; i++) {

        $('.choices').append("<ul><li><input type='radio' name='theAnswer' value='" + i + "'>" + questions[questionNum].answer[i] + "</li></ul>");
    }
}

function verifyAnswer() {
    let userChoice = $("input[type='radio']:checked").val();

    // if the users choice equals the questions array-index-correct answer

    if (userChoice === undefined) {

    } else if (userChoice == questions[questionNum].correct_answer) {

        console.log(questionNum);



        $('.theText').hide();
        $('.submit').hide();
        $('.choices').empty();


        $('.explain').append("<h2>You're Right!</h2>");
        $('.explain').append(questions[questionNum].explain + "<input type='button' name='submit' id='next' value='Next' onclick='display(questionNum + 1);'>");
        //increment isCorrect by 1
        isCorrect++;
        //        console.log(`Correct = ${isCorrect}`);
        // update the .count to the total correct above
        $('.count').html(isCorrect);
        //        console.log(questionNum);
        $('.countDiv').show();



        // if questionNum is equal to the last question and total correct is 5 or greater
        if ((questionNum === (questions.length - 1)) && ((userChoice == questions[questionNum].correct_answer))) {
            $('.explain').empty();
            $('.explain').append("<h2>You're Right!</h2>");
            $('.explain').append(questions[questionNum].explain + "<input type='button' name='submit' id='next' value='Next' onclick='display(questionNum + 1);'>");

        }

        // if answer is not correct ---
    } else {
        // clear everything in the theText div
        console.log(questionNum);

        $('.theText').empty();
        // hid ethe submit button
        $('.submit').hide();

        $('.choices').empty();
        // append incorrect and add styling
        $('.explain').append("<h2>Incorrect</h2>");

        // display the explanation if they answer incorrectly and add a submit button which points to the question onclick
        $('.explain').append(questions[questionNum].explain + "<br/> <input type='button' name='submit' id='next' value='Next' onclick='display(questionNum + 1);'>");
        // increment isWrong varable by 1
        isWrong++;
        //        console.log(`Wrong = ${isWrong}`);
        //        console.log(questionNum);

        // if questionNum is equal to the last question and total wrong is 5 or greater
        if ((questionNum === (questions.length - 1))) {
            // hide everything in container
            $('.explain').empty();
            $('.explain').append("<h2>Incorrect</h2>");

            // display the explanation if they answer incorrectly and add a submit button which points to the question onclick
            $('.explain').append(questions[questionNum].explain + "<br/> <input type='button' name='submit' id='next' value='Next' onclick='display(questionNum + 1);'>");

        }
    }
}
