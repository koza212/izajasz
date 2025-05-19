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
    { question: "Która planeta jest nazywana Czerwoną Planetą?", answers: ["Mars", "Jowisz", "Wenus", "Merkury"], correctAnswer: 0 },
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
    { question: "Która planeta w Układzie Słonecznym jest najbliższa Słońcu?", answers: ["Merkury", "Wenus", "Ziemia", "Mars"], correctAnswer: 0 },
    { question: "Który z poniższych języków programowania jest najczęściej używany do tworzenia stron internetowych?",answers: ["HTML", "Python", "C++", "JavaScript"],correctAnswer: 0 },
    { question: "Jak nazywa się system kontroli wersji powszechnie używany przez programistów?", answers: ["Git", "Oracle", "Unix", "Bash"], correctAnswer: 0},
    { question: "Które z poniższych rozszerzeń plików wskazuje na skrypt języka Python?", answers: [".py", ".java", ".html", ".exe"], correctAnswer: 0},
    { question: "Która struktura danych ma zasadę „ostatni wszedł, pierwszy wyszedł” (LIFO)?", answers: ["Kolejka", "Stos", "Tablica", "Graf"], correctAnswer: 0},
    { question: "Która metoda zwraca element ze specyficzną wartością?", answers: ["getElementsById()", "getElementsByClass()", "getElementsByName()", "getElementByTagName()"], correctAnswer: 0},
    { question: "Która funkcja w PHP wykonuje zapytanie do bazy danych SQL?", answers: ["query()", "real_escape_string()", "fetch_array()", "connect()"], correctAnswer: 0},
    { question: "Który z poniższych formatów plików najczęściej służy do zapisywania zdjęć cyfrowych?", answers: [".jpg", ".mp3", ".docx", ".exe"], correctAnswer: 0},
    { question: "Jak nazywa się jednostka czułości matrycy lub filmu fotograficznego?", answers: ["ISO", "RGB", "DPI", "JPG"], correctAnswer: 0},
    { question: "Który z poniższych obiektywów najlepiej nadaje się do fotografii portretowej?", answers: ["85mm", "18mm", "35mm", "200mm"], correctAnswer: 0},
    { question: "Jak nazywa się proces cyfrowej obróbki zdjęć w programie Adobe Lightroom polegający na przywracaniu szczegółów w ciemnych i jasnych partiach obrazu?", answers: ["HDR", "Kadrowanie", "Retusz", "Wyostrzanie"], correctAnswer: 0},
    { question: "Co oznacza termin \"przysłona\" w kontekście fotografii?", answers: ["Otwór w obiektywie, przez który przechodzi światło", "Ustawienie czasu naświetlania", "Ustalenie czułości matrycy", "Rodzaj obiektywu używanego do portretów"],correctAnswer: 0},
    { question: "Co to jest \"balans bieli\" w fotografii?", "answers": ["Ustalenie odpowiedniej barwy zdjęcia", "Ustalenie ekspozycji", "Ustalenie głębi ostrości w kadrze", "Ustalenie kontrastu na zdjęciu"],"correctAnswer": 0},
    { question: "Który z poniższych systemów operacyjnych jest najbardziej popularny na komputerach osobistych?", answers: ["Windows", "Linux", "macOS", "Android"],correctAnswer: 0},
    { question: "Co to jest BIOS w komputerze?", answers: ["Podstawowy system wejścia/wyjścia", "Program do edytowania zdjęć", "Procesor komputera", "Typ pamięci RAM"],correctAnswer: 0},
    { question: "Jaki typ pamięci RAM zapewnia najwięcej wydajności w komputerach?", answers: ["DDR5", "DDR2", "DDR3", "DDR4"],correctAnswer: 0},
    { question: "Które z poniższych narzędzi jest używane do monitorowania i analizowania ruchu sieciowego w systemach komputerowych?", answers: ["Wireshark", "Photoshop", "Excel", "Notepad++"],correctAnswer: 0},
    { question: "Za jaką funkcję w komputerze odpowiada procesor?", answers: ["Przetwarzanie danych", "Przechowywanie danych", "Wyświetlanie obrazu", "Zasilanie urządzenia"],correctAnswer: 0},
    { question: "Co oznacza skrót \"RAM\" w kontekście komputera?", answers: ["Random Access Memory", "Read Access Memory", "Run Action Memory", "Real-time Automated Memory"],correctAnswer: 0 },
    { question: "Kim jest automatyk?", answers: ["Osoba zajmująca się projektowaniem i obsługą systemów automatyki", "Osoba zajmująca się tworzeniem programów komputerowych", "Osoba zajmująca się naprawą samochodów", "Osoba zajmująca się malowaniem obrazów"], correctAnswer: 0 },
    { question: "Który z poniższych elementów jest podstawowym czujnikiem wykorzystywanym w systemach automatyki?", answers: ["Termistor", "Mikroskop", "Wkrętak", "Długopis"], correctAnswer: 0 },
    { question: "Jak nazywa się język programowania stosowany w programowaniu sterowników PLC?", answers: ["Ladder Logic", "Java", "Python", "C++"], correctAnswer: 0 },
    { question: "Co to jest SCADA w kontekście automatyki przemysłowej?", answers: ["System kontrolowania i zbierania danych w czasie rzeczywistym", "Program do edytowania obrazów", "Narzędzie do tworzenia stron internetowych", "Typ urządzenia do monitorowania temperatury"], correctAnswer: 0 },
    { question: "Do czego służy sterownik PLC w układach automatyki?", answers: ["Do programowalnego sterowania procesami automatyki", "Do zasilania silników elektrycznych", "Do mechanicznego sterowania siłownikami", "Do chłodzenia układów elektronicznych"], correctAnswer: 0 },
    { question: "Jakie działanie wykonuje czujnik indukcyjny?", answers: ["Wykrywa obiekty metalowe bez kontaktu fizycznego", "Mierzy temperaturę w układzie", "Wykrywa obecność cieczy", "Mierzy ciśnienie powietrza"], correctAnswer: 0 },
    { question: "Które z poniższych urządzeń jest przykładem sprzętu elektronicznego?", answers: ["Telewizor", "Młotek", "Młynek do kawy", "Piła ręczna"], correctAnswer: 0 },
    { question: "Co oznacza skrót „LED” w kontekście technologii oświetleniowej?", answers: ["Light Emitting Diode", "Light Energy Device", "Low Energy Display", "Long Electronic Device"], correctAnswer: 0 },
    { question: "Jak nazywa się podstawowy element elektroniczny, który umożliwia przepływ prądu tylko w jednym kierunku?", answers: ["Diody", "Kondensator", "Rezystor", "Tranzystor"], correctAnswer: 0 },
    { question: "Jak nazywa się proces, w którym komputerowy system symulacyjny jest wykorzystywany do projektowania układów elektronicznych?", answers: ["CAE", "Sprawdzanie jakości", "SMD", "BGA"], correctAnswer: 0 },
    { question: "Który z poniższych elementów magazynuje ładunek elektryczny?", answers: ["Kondensator", "Rezystor", "Cewka", "Dioda"], correctAnswer: 0 },
    { question: "Układ scalony oznaczony symbolem NE555 jest najczęściej używany jako:", answers: ["timer i generator impulsów", "wzmacniacz audio", "licznik cyfrowy", "przetwornik analogowo-cyfrowy"], correctAnswer: 0 },
    { question: "Co to jest robot?", answers: ["Maszyna zdolna do wykonywania określonych zadań automatycznie", "Urządzenie do gotowania", "Komputer osobisty", "Program komputerowy"], correctAnswer: 0 },
    { question: "Jaki typ robota wykorzystywany jest w przemyśle do montażu i manipulacji ciężkimi przedmiotami?", answers: ["Robot przemysłowy", "Robot humanoidalny", "Robot współpracujący", "Robot mobilny"], correctAnswer: 0 },
    { question: "Jak nazywa się język programowania, który jest powszechnie używany w sterowaniu robotami przemysłowymi?", answers: ["ROS", "Python", "C++", "Java"], correctAnswer: 0 },
    { question: "W jakim systemie sterowania robotami wykorzystywane są algorytmy sztucznej inteligencji do podejmowania decyzji na podstawie analizy danych sensorycznych?", answers: ["AI-based control system", "PLC", "PID", "SCADA"], correctAnswer: 0 },
    { question: "Który element w robocie pełni funkcję 'mózgu', czyli podejmuje decyzje i steruje działaniem robota?", answers: ["Sterownik PLC", "Serwomechanizm", "Czujnik odległości", "Silnik krokowy"], correctAnswer: 0 },
    { question: "Który z poniższych typów kinematyki jest najczęściej stosowany w 6-osiowych robotach przemysłowych?", answers: ["Kinematyka antropomorficzna", "Kinematyka kartezjańska", "Kinematyka cylindryczna", "Kinematyka sferyczna"], correctAnswer: 0 },
    { question: "Co oznacza skrót „IP” w kontekście sieci komputerowych?", answers: ["Internet Protocol", "Internal Processor", "Integrated Platform", "Interactive Program"], correctAnswer: 0 },
    { question: "Który z poniższych urządzeń jest wykorzystywany do łączenia komputerów w sieci lokalnej?", answers: ["Przełącznik", "Router", "Modem", "Drukarka"], correctAnswer: 0 },
    { question: "Jak nazywa się standard szyfrowania wykorzystywany do zapewnienia bezpieczeństwa połączeń internetowych?", answers: ["SSL/TLS", "HTTP", "FTP", "DHCP"], correctAnswer: 0 },
    { question: "Który z poniższych protokołów jest standardowo używany do przesyłania stron internetowych?", answers: ["HTTP", "SMTP", "FTP", "DHCP"], correctAnswer: 0 },
    { question: "Co to jest protokół BGP (Border Gateway Protocol)?", answers: ["Protokół routingu wykorzystywany do wymiany informacji między różnymi systemami autonomicznymi", "Protokół wymiany informacji w sieciach lokalnych", "Protokół zarządzania adresami IP w sieci", "Protokół do przesyłania plików przez Internet"], correctAnswer: 0 },
    { question: "Który z protokołów warstwy sieciowej modelu OSI jest odpowiedzialny za trasowanie pakietów w sieciach IP?", answers: ["IP", "ARP", "ICMP", "DNS"], correctAnswer: 0 },
    { question: "Ile zawodów kształci ZSŁ?", answers: ["7", "5", "6", "8"], correctAnswer: 0 },
    { question: "W którym roku zmieniono nazwę szkoły na obecną?", answers: ["1975", "1946", "1963", "1999"], correctAnswer: 0 }
];
