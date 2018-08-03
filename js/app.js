// create an object in an array for each question, answer, explanation and image
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
    explain: "Both tiles are actually the same shade of gray. Your brain just translates the bottom to a lighter gray due to the percieved shadow. If you place a pen or pencil between the lines that connects them you will see they are both the same exat gray.",
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
    images: "images/music.jpg"
}, {
    text: "The Olympic Games originated in Greece?",
    answer: ["True", "False"],
    correct_answer: 0,
    explain: "The Ancient Games were staged in Olympia, Greece, from 776 BC through 393 AD, it took 1503 years for the Olympics to return. The first modern Olympics were held in Athens, Greece, in 1896.",
    images: "images/greece.jpg"
}, {
    text: "According to NASA - How many stars, approximately, are there in the known universe?",
    answer: ["10 Billion", "A Zillion", "100 Trillion", "500 Quadrillion"],
    correct_answer: 1,
    explain: "We basically have no idea how many stars there are in the universe. NASA can only confidently say that there are zillions of uncountable stars. A Zillion is any uncountable amount.",
    images: "images/space.jpg"
}];

// question number in the array
let questionNum = 0;
// initialize correct counter to 0
let isCorrect = 0;
// initialize incorrect counter to 0
let isWrong = 0;

$(document).ready(function () {
    // on click at the start screen
    $('#startQuiz').on('click', () => {
        // run function display below with a parameter / position of 0
        display(0);
        // show the correct number
        $('.countDiv').show();
    });

    // on click for the submit / enter button of the question
    $('#submit').on('click', () => {
        // run function verifyAnswer below
        verifyAnswer();
    });
});
// position based on current questionNum
function display(position) {

    questionNum = position;

    $('.start').hide();
    $('#instruct').hide();
    $('#outcome').empty();
    $('#exp').empty();
    $('#submit').show();
    // display the current text-question- in the questions array
    $('#theText').text(questions[questionNum].text);
    // update the src of the image
    $('#questionImage').attr('src', questions[questionNum].image);
    // update what question they are on out of total questions
    $('.questionNum').text('Question # ' + (questionNum + 1) + ' out of ' + questions.length);

    for (let i = 0; i <= questions[questionNum].answer.length - 1; i++) {
        //display the questions and radio
        $('#theText').append("<br /> <br/> <input type='radio' name='theAnswer' value='" + i + "'>" + questions[questionNum].answer[i]);
        //alert(questions[0].answer[3]);
    }
}

function verifyAnswer() {
    let userChoice = $("input[type='radio']:checked").val();

    // if the users choice equals the questions array-index-correct answer
    if (userChoice == questions[questionNum].correct_answer) {

        $('#theText').empty();
        $('#submit').hide();

        $('#outcome').append("<br />You're Right!  ").css({
            "font-size": "30px"
        });
        $('#exp').append("<br />" + questions[questionNum].explain + "<br/> <input type='button' name='submit' id='next' value='Next' onclick='display(questionNum + 1);'>");
        //increment isCorrect by 1
        isCorrect++;
        console.log(`Correct = ${isCorrect}`);
        // update the .count to the total correct above
        $('.count').html(isCorrect);



        // if questionNum is equal to the last question and total correct is 5 or greater
        if (questionNum == 7 && isCorrect >= 5) {
            // hide everyhtin in container
            $('.container').hide();
            // display the wining results and screen
            $('.winningDiv').show();
        } else if (questionNum == 7 && isWrong >= 4) {
            // hide everything in container
            $('.container').hide();
            // update the count for incorrect on the losing page
            $('.wrongCount').html(isWrong);
            // display the losing results and screen
            $('.losingDiv').show();
        }

        // if answer is not correct ---
    } else {
        // clear everything in the theText div
        $('#theText').empty();
        // hid ethe submit button
        $('#submit').hide();
        // append incorrect and add styling
        $('#outcome').append("<br /> Incorrect ").css({
            "font-size": "30px"
        });

        // display the explanation if they answer incorrectly and add a submit button which points to the question onclick
        $('#exp').append("<br />" + questions[questionNum].explain + "<br/> <input type='button' name='submit' id='next' value='Next' onclick='display(questionNum + 1);'>");
        // increment isWrong varable by 1
        isWrong++;
        console.log(`Wrong = ${isWrong}`);

        // if questionNum is equal to the last question and total wrong is 5 or greater
        if (questionNum == 7 && isWrong >= 4) {
            // hide everything in container
            $('.container').hide();
            // update the count for incorrect on the losing page
            $('.wrongCount').html(isWrong);
            // display the losing results and screen
            $('.losingDiv').show();
        } else if (questionNum == 7 && isCorrect >= 5) {
            // hide everyhtin in container
            $('.container').hide();
            // display the wining results and screen
            $('.winningDiv').show();
        }
    }
}
