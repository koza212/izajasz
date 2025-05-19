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
    const goodSound = document.getElementById("quizSoundGood");
    const badSound = document.getElementById("quizSoundBad");

    questionDiv.textContent = questionObj.question;
    answersDiv.innerHTML = "";

    questionObj.answers.forEach((answer, idx) => {
      const btn = document.createElement("button");
      btn.textContent = answer;
      btn.onclick = () => {
        const isCorrect = idx === questionObj.correctAnswer;
        modal.classList.remove("active");
        modal.style.display = "none";
        if (isCorrect && goodSound) goodSound.play();
        if (!isCorrect && badSound) badSound.play();
        callback(isCorrect);
      };
      answersDiv.appendChild(btn);
    });

    modal.classList.add("active");
    modal.style.display = "flex";
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

const questions = [
    { question: "Jakie jest największe jezioro w Polsce?", answers: ["Śniardwy", "Mamry", "Łebsko", "Wielimie"], correctAnswer: 0 },
    { question: "Jaki jest najwyższy szczyt w Tatrach?", answers: ["Rysy", "Giewont", "Kasprowy Wierch", "Bielskie"], correctAnswer: 0 },
    { question: "Jak nazywa się stolica Polski?", answers: ["Warszawa", "Kraków", "Gdańsk", "Wrocław"], correctAnswer: 0 },
    { question: "Kto napisał książkę 'Pan Tadeusz'?", answers: ["Adam Mickiewicz", "Juliusz Słowacki", "Henryk Sienkiewicz", "Marek Hłasko"], correctAnswer: 0 },
    { question: "Jaki jest symbol chemiczny wody?", answers: ["H2O", "CO2", "O2", "H2"], correctAnswer: 0 },
    { question: "Kto był pierwszym królem Polski?", answers: ["Mieszko I", "Bolesław Chrobry", "Kazimierz Wielki", "Władysław Jagiełło"], correctAnswer: 0 },
    { question: "W jakim roku wybuchła II wojna światowa?", answers: ["1939", "1914", "1941", "1929"], correctAnswer: 0 },
    { question: "Kiedy Polska przystąpiła do Unii Europejskiej?", answers: ["2004", "1999", "2010", "2000"], correctAnswer: 0 },
    { question: "Kto napisał 'Zbrodnię i karę'?", answers: ["Fiodor Dostojewski", "Leo Tolstoy", "Anton Czechow", "Gustaw Flaubert"], correctAnswer: 0 },
    { question: "W którym kraju znajduje się Wielka Rafa Koralowa?", answers: ["Australia", "USA", "Indie", "Tajlandia"], correctAnswer: 0 },
    { question: "Jak nazywa się najwyższy wodospad na świecie?", answers: ["Salto Ángel", "Niagara", "Victoria", "Iguazu"], correctAnswer: 0 },
    { question: "Jakie zwierzę jest symbolem Australii?", answers: ["Kangur", "Koala", "Wielbłąd", "Koń"], correctAnswer: 0 },
    { question: "Kto wymyślił teorię względności?", answers: ["Albert Einstein", "Isaac Newton", "Nikola Tesla", "Galileo Galilei"], correctAnswer: 0 },
    { question: "Jakie miasto jest stolicą Japonii?", answers: ["Tokio", "Kioto", "Osaka", "Hiroshima"], correctAnswer: 0 },
    { question: "Jakie zwierzę żyje najdłużej?", answers: ["Żółw", "Słoń", "Rekin", "Krwawnik"], correctAnswer: 0 },
    { question: "Kto napisał 'Dumę i uprzedzenie'?", answers: ["Jane Austen", "Charles Dickens", "George Orwell", "Virginia Woolf"], correctAnswer: 0 },
    { question: "Jaki jest najwyższy szczyt w Afryce?", answers: ["Kilimandżaro", "Mount Everest", "Mount Fuji", "Aconcagua"], correctAnswer: 0 },
    { question: "Kto wynalazł telefon?", answers: ["Alexander Graham Bell", "Thomas Edison", "Nikola Tesla", "Guglielmo Marconi"], correctAnswer: 0 },
    { question: "Kiedy miała miejsce bitwa pod Grunwaldem?", answers: ["1410", "1210", "1510", "1310"], correctAnswer: 0 },
    { question: "Jaki ocean jest największy na świecie?", answers: ["Pacyfik", "Atlantycki", "Indyjski", "Arkticki"], correctAnswer: 0 },
    { question: "Kto był pierwszym człowiekiem na Księżycu?", answers: ["Neil Armstrong", "Buzz Aldrin", "Yuri Gagarin", "John Glenn"], correctAnswer: 0 },
    { question: "Który z tych krajów nie należy do Unii Europejskiej?", answers: ["Szwajcaria", "Polska", "Francja", "Hiszpania"], correctAnswer: 0 },
    { question: "Kto jest autorem obrazu 'Mona Lisa'?", answers: ["Leonardo da Vinci", "Vincent van Gogh", "Pablo Picasso", "Claude Monet"], correctAnswer: 0 },
    { question: "Co to jest 'H2O'?", answers: ["Woda", "Wodór", "Tlen", "Hydrogen"], correctAnswer: 0 },
    { question: "Jakie jest największe państwo na świecie?", answers: ["Rosja", "Chiny", "Kanada", "USA"], correctAnswer: 0 },
    { question: "Kiedy zmarł Napoleon Bonaparte?", answers: ["1821", "1815", "1830", "1825"], correctAnswer: 0 },
    { question: "Jaka planeta jest czwartą od Słońca?", answers: ["Mars", "Ziemia", "Wenus", "Jowisz"], correctAnswer: 0 },
    { question: "Jak nazywa się najbliższa gwiazda do Ziemi?", answers: ["Słońce", "Alpha Centauri", "Sirius", "Proxima Centauri"], correctAnswer: 0 },
    { question: "W którym roku miała miejsce pierwsza wojna światowa?", answers: ["1914", "1900", "1920", "1912"], correctAnswer: 0 },
    { question: "Jakie jest największe miasto w Stanach Zjednoczonych?", answers: ["Nowy Jork", "Los Angeles", "Chicago", "Houston"], correctAnswer: 0 },
    { question: "W którym kraju znajduje się Machu Picchu?", answers: ["Peru", "Boliwia", "Chile", "Ekwador"], correctAnswer: 0 },
    { question: "Jaki jest najwyższy szczyt w Polsce?", answers: ["Rysy", "Giewont", "Kasprowy Wierch", "Świnica"], correctAnswer: 0 },
    { question: "Jaki jest oficjalny język w Brazylii?", answers: ["Portugalski", "Hiszpański", "Francuski", "Angielski"], correctAnswer: 0 },
    { question: "Które miasto jest stolicą Egiptu?", answers: ["Kair", "Alexandria", "Luksor", "Giza"], correctAnswer: 0 },
    { question: "Kto był prezydentem USA w czasie II wojny światowej?", answers: ["Franklin D. Roosevelt", "Dwight D. Eisenhower", "Harry S. Truman", "Woodrow Wilson"], correctAnswer: 0 },
    { question: "Który kraj jest największym producentem kawy?", answers: ["Brazylia", "Kolumbia", "Wietnam", "Indonezja"], correctAnswer: 0 },
    { question: "Co jest stolicą Włoch?", answers: ["Rzym", "Florencja", "Mediolan", "Neapol"], correctAnswer: 0 },
    { question: "W którym roku pierwszy raz poleciał samolot?", answers: ["1903", "1898", "1920", "1910"], correctAnswer: 0 },
    { question: "Kto jest autorem 'Władcy Pierścieni'?", answers: ["J.R.R. Tolkien", "C.S. Lewis", "George R.R. Martin", "J.K. Rowling"], correctAnswer: 0 },
    { question: "Która planeta jest nazywana Czerwoną Planetą?", answers: ["Mars", "Jowisz", "Wenus", "Merkury"], correctAnswer: 0 },
    { question: "Jaka jest powierzchnia Afryki?", answers: ["30.37 mln km²", "10 mln km²", "15 mln km²", "22 mln km²"], correctAnswer: 0 },
    { question: "Jakie miasto jest stolicą Hiszpanii?", answers: ["Madryt", "Barcelona", "Walencja", "Sevilla"], correctAnswer: 0 },
    { question: "Jaki jest największy kontynent?", answers: ["Azja", "Afryka", "Ameryka Północna", "Europa"], correctAnswer: 0 },
    { question: "Jaki jest symbol chemiczny złota?", answers: ["Au", "Ag", "Fe", "Cu"], correctAnswer: 0 },
    { question: "Co to jest 'COVID-19'?", answers: ["Choroba wywołana przez wirus SARS-CoV-2", "Zakażenie wirusem HIV", "Choroba wirusowa wywołana przez grypę", "Zatrucie pokarmowe"], correctAnswer: 0 },
    { question: "Jaki jest największy kontynent?", answers: ["Azja", "Afryka", "Ameryka Północna", "Europa"], correctAnswer: 0 },
    { question: "Jaka jest powierzchnia Afryki?", answers: ["30.37 mln km²", "10 mln km²", "15 mln km²", "22 mln km²"], correctAnswer: 0 },
    { question: "Jakie miasto jest stolicą Hiszpanii?", answers: ["Madryt", "Barcelona", "Walencja", "Sevilla"], correctAnswer: 0 },
    { question: "Jaki jest symbol chemiczny złota?", answers: ["Au", "Ag", "Fe", "Cu"], correctAnswer: 0 },
    { question: "Jakie zwierzę jest symbolem Australii?", answers: ["Kangur", "Koala", "Wielbłąd", "Koń"], correctAnswer: 0 },
    { question: "Jaki jest najwyższy wodospad na świecie?", answers: ["Salto Ángel", "Niagara", "Victoria", "Iguazu"], correctAnswer: 0 },
    { question: "W którym kraju znajduje się Machu Picchu?", answers: ["Peru", "Boliwia", "Chile", "Ekwador"], correctAnswer: 0 },
    { question: "Kto wymyślił teorię względności?", answers: ["Albert Einstein", "Isaac Newton", "Nikola Tesla", "Galileo Galilei"], correctAnswer: 0 },
    { question: "W jakim roku miała miejsce bitwa pod Grunwaldem?", answers: ["1410", "1210", "1510", "1310"], correctAnswer: 0 },
    { question: "Kto wynalazł telefon?", answers: ["Alexander Graham Bell", "Thomas Edison", "Nikola Tesla", "Guglielmo Marconi"], correctAnswer: 0 },
    { question: "Jaka planeta jest czwartą od Słońca?", answers: ["Mars", "Ziemia", "Wenus", "Jowisz"], correctAnswer: 0 },
    { question: "Jak nazywa się najwyższy szczyt w Afryce?", answers: ["Kilimandżaro", "Mount Everest", "Mount Fuji", "Aconcagua"], correctAnswer: 0 },
    { question: "Kto był pierwszym człowiekiem na Księżycu?", answers: ["Neil Armstrong", "Buzz Aldrin", "Yuri Gagarin", "John Glenn"], correctAnswer: 0 },
    { question: "Jaka jest oficjalna waluta w Japonii?", answers: ["Jen", "Won", "Yuan", "Baht"], correctAnswer: 0 },
    { question: "Jak nazywa się największa wyspa świata?", answers: ["Grenlandia", "Australia", "Nowa Gwinea", "Borneo"], correctAnswer: 0 },
    { question: "Które z tych państw leży na kontynencie azjatyckim?", answers: ["Indie", "Włochy", "Peru", "Kanada"], correctAnswer: 0 },
    { question: "Kto napisał 'Dumę i uprzedzenie'?", answers: ["Jane Austen", "Charles Dickens", "George Orwell", "Virginia Woolf"], correctAnswer: 0 },
    { question: "Jak nazywa się najdłuższa rzeka w Europie?", answers: ["Wołga", "Amazonka", "Nil", "Rhein"], correctAnswer: 0 },
    { question: "Kto jest autorem 'Władcy Pierścieni'?", answers: ["J.R.R. Tolkien", "C.S. Lewis", "George R.R. Martin", "J.K. Rowling"], correctAnswer: 0 },
    { question: "Jaka planeta jest nazywana Czerwoną Planetą?", answers: ["Mars", "Jowisz", "Wenus", "Merkury"], correctAnswer: 0 },
    { question: "W jakim roku pierwszy raz poleciał samolot?", answers: ["1903", "1898", "1920", "1910"], correctAnswer: 0 },
    { question: "Co jest stolicą Włoch?", answers: ["Rzym", "Florencja", "Mediolan", "Neapol"], correctAnswer: 0 },
    { question: "Kiedy wybuchła rewolucja francuska?", answers: ["1789", "1815", "1799", "1776"], correctAnswer: 0 },
    { question: "W jakim kraju znajduje się Wielka Rafa Koralowa?", answers: ["Australia", "USA", "Indie", "Tajlandia"], correctAnswer: 0 },
    { question: "Jaki ocean jest największy na świecie?", answers: ["Pacyfik", "Atlantycki", "Indyjski", "Arkticki"], correctAnswer: 0 },
    { question: "W którym roku wybuchła I wojna światowa?", answers: ["1914", "1900", "1920", "1912"], correctAnswer: 0 },
    { question: "Jakie miasto jest stolicą Egiptu?", answers: ["Kair", "Alexandria", "Luksor", "Giza"], correctAnswer: 0 },
    { question: "Kto był prezydentem USA w czasie II wojny światowej?", answers: ["Franklin D. Roosevelt", "Dwight D. Eisenhower", "Harry S. Truman", "Woodrow Wilson"], correctAnswer: 0 },
    { question: "Jakie zwierzę żyje najdłużej?", answers: ["Żółw", "Słoń", "Rekin", "Krwawnik"], correctAnswer: 0 },
    { question: "Kto wynalazł elektryczność?", answers: ["Benjamin Franklin", "Nikola Tesla", "Thomas Edison", "Michael Faraday"], correctAnswer: 0 },
    { question: "Jaki jest symbol chemiczny wody?", answers: ["H2O", "CO2", "O2", "H2"], correctAnswer: 0 },
    { question: "Jaki jest najwyższy szczyt w Polsce?", answers: ["Rysy", "Giewont", "Kasprowy Wierch", "Świnica"], correctAnswer: 0 },
    { question: "Jaka jest stolica Niemiec?", answers: ["Berlin", "Monachium", "Frankfurt", "Hamburg"], correctAnswer: 0 },
    { question: "Jaki jest najwyższy szczyt w Europie?", answers: ["Mont Blanc", "Matterhorn", "Elbrus", "Tatra"], correctAnswer: 2 },
    { question: "Co to jest 'H2O'?", answers: ["Woda", "Wodór", "Tlen", "Hydrogen"], correctAnswer: 0 },
    { question: "Kto był ostatnim prezydentem PRL?", answers: ["Wojciech Jaruzelski", "Lech Wałęsa", "Tadeusz Mazowiecki", "Edward Gierek"], correctAnswer: 0 },
    { question: "Kiedy Polska przystąpiła do Unii Europejskiej?", answers: ["2004", "1999", "2010", "2000"], correctAnswer: 0 },
    { question: "Co to jest 'atom'?", answers: ["Podstawowa jednostka materii", "Rodzaj energii", "Błyskawica", "Woda"], correctAnswer: 0 },
    { question: "Jakie miasto jest stolicą Kanady?", answers: ["Ottawa", "Toronto", "Vancouver", "Montreal"], correctAnswer: 0 },
    { question: "Jaki kraj ma największą liczbę ludności na świecie?", answers: ["Chiny", "Indie", "USA", "Indonezja"], correctAnswer: 1 },
    { question: "Jakie miasto jest stolicą Australii?", answers: ["Canberra", "Sydney", "Melbourne", "Brisbane"], correctAnswer: 0 },
    { question: "Co to jest 'czarna dziura'?", answers: ["Obiekt w przestrzeni, którego grawitacja jest tak silna, że nic nie może uciec", "Rodzaj wulkanu", "Nadprzewodnik", "Kometa"], correctAnswer: 0 },
    { question: "Kto jest autorem obrazu 'Mona Lisa'?", answers: ["Leonardo da Vinci", "Vincent van Gogh", "Pablo Picasso", "Claude Monet"], correctAnswer: 0 },
    { question: "Które miasto jest stolicą Portugalii?", answers: ["Lizbona", "Porto", "Coimbra", "Braga"], correctAnswer: 0 },
    { question: "Kto jest autorem 'Zbrodni i kary'?", answers: ["Fiodor Dostojewski", "Leo Tolstoy", "Anton Czechow", "Gustaw Flaubert"], correctAnswer: 0 },
    { question: "Kto wynalazł teorię względności?", answers: ["Albert Einstein", "Isaac Newton", "Nikola Tesla", "Galileo Galilei"], correctAnswer: 0 },
    { question: "Które miasto jest stolicą Japonii?", answers: ["Tokio", "Kioto", "Osaka", "Hiroshima"], correctAnswer: 0 },
    { question: "Jakie jest najstarsze miasto w Polsce?", answers: ["Kalisz", "Kraków", "Gniezno", "Warszawa"], correctAnswer: 0 },
    { question: "Która planeta w Układzie Słonecznym jest najbliższa Słońcu?", answers: ["Merkury", "Wenus", "Ziemia", "Mars"], correctAnswer: 0 }
];