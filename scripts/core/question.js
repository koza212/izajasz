function prepareQuestions(questions) {
    return questions.map(q => {
      const shuffledAnswers = [...q.answers];
      shuffleArray(shuffledAnswers);
      const correctIndex = shuffledAnswers.indexOf(q.answers[q.correctAnswer]);
  
      return {
        question: q.question,
        answers: shuffledAnswers,
        correctAnswer: correctIndex
      };
    });
}

function showQuizModal(questionObj, callback) {
    const modal = document.getElementById("quizModal");
    const questionDiv = document.getElementById("quizQuestion");
    const answersDiv = document.getElementById("quizAnswers");
  
    questionDiv.textContent = questionObj.question;
    answersDiv.innerHTML = "";
  
    questionObj.answers.forEach((answer, idx) => {
      const btn = document.createElement("button");
      btn.textContent = answer;
      btn.onclick = () => {
        const isCorrect = idx === questionObj.correctAnswer;
        modal.style.display = "none";
        callback(isCorrect);
      };
      answersDiv.appendChild(btn);
    });
  
    modal.style.display = "block";
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

