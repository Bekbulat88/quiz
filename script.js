'use strict'
let questionBlock = document.querySelector('.question');
let answerBlock = document.querySelector('.answers_block');
let reply = document.querySelector('.reply');
let retry = document.querySelector('.retry');

class Question {
    text;
    firstOption;
    secondOption;
    thirdOption;
    fourthOption;
    rightAnswer;

    constructor(text, firstOption, secondOption, thirdOption, fourthOption, rightAnswer) {
      this.text = text;
      this.firstOption = firstOption;
      this.secondOption = secondOption;
      this.thirdOption = thirdOption;
      this.fourthOption = fourthOption;
      this.rightAnswer = rightAnswer;
    }
    makeAQuestion () {
      let newQuestion = `<p id="question_text">${this.text}</p>`;
      questionBlock.insertAdjacentHTML("afterbegin",newQuestion);
    }

    makeAnswers () {
      let newTopic = 
      `<div><input type='radio' name='answers' id='first_answer' data-num ='1' class='input'>${this.firstOption}</div>
      <div><input type='radio' name='answers' id='second_answer' data-num ='2' class='input'>${this.secondOption}</div>
      <div><input type='radio' name='answers' id='third_answer' data-num ='3' class='input'>${this.thirdOption}</div>
      <div><input type='radio' name='answers' id='forth_answer' data-num ='4' class='input'>${this.fourthOption}</div>`;
      answerBlock.insertAdjacentHTML("afterbegin", newTopic);
    }

    removeAQuestion () {
        while (questionBlock.firstChild) {
            questionBlock.firstChild.remove()
        }
    }

    removeAnswers () {
        while (answerBlock.firstChild) {
            answerBlock.firstChild.remove()
        }
    }
};

class Result {
    questionCounter;
    correctAnswer;

    constructor (questionCounter, correctAnswer) {
    this.questionCounter = questionCounter;
    this.correctAnswer = correctAnswer;
    }

    showResult () {
        let newTopic = 
        `<div> Поздравляем!!! <br>
        Правильных ответов ${this.correctAnswer} из ${this.questionCounter}</div>`
        answerBlock.insertAdjacentHTML("afterbegin",newTopic);

        reply.classList.add('none');
        retry.classList.remove('none');

        retry.addEventListener('click', func1 )
    }
}

let firstQuestion = new Question('How much is the fish?','10', '20', '30', 'na-na-na-na-na', 4);
let secondQuestion = new Question("What doesn't kill you, makes you...?", 'stronger', 'smarter', 'faster', 'craziest', 1);
let thirdQuestion = new Question('What is the capital of Great Britain', 'Astana', 'London', 'Ottava', 'Esentuki',2);
let fourthQuestion = new Question('2+2*2?','8', '6', '4', '10',2 );

let result = new Result(0,0);

let questionsList = [firstQuestion, secondQuestion, thirdQuestion, fourthQuestion];
firstQuestion.makeAQuestion();
firstQuestion.makeAnswers();

reply.addEventListener('click', startTheQuiz);   


function func1 () {
    // questionBlock.lastChild.remove();
 
    answerBlock.lastChild.remove();
    result.correctAnswer = 0;
    result.questionCounter = 0;
   
    reply.classList.remove('none')
    retry.classList.add('none')
    firstQuestion.makeAQuestion();
    firstQuestion.makeAnswers();
    retry.removeEventListener('click', func1)
    reply.addEventListener('click', startTheQuiz); 
}

function startTheQuiz() {
    // retry.removeEventListener('click',func)
    let inp = document.querySelectorAll('.input');
    for (let elem of inp){
        if (elem.dataset.num == questionsList[result.questionCounter].rightAnswer &&
            elem.checked == true) {
            result.correctAnswer += 1
        }
    }

    questionsList[result.questionCounter].removeAQuestion();
    questionsList[result.questionCounter].removeAnswers();
    result.questionCounter += 1;

    if (result.questionCounter == 4) {
        reply.removeEventListener('click', startTheQuiz)
        result.showResult()
        return
    }

    questionsList[result.questionCounter].makeAQuestion()
    questionsList[result.questionCounter].makeAnswers()
}