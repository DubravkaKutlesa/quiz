const quizData = {
    title:      "Allgemeinwissen-Quiz"
  };

const questions = [
    {
        question:   "In welchem ​​Jahr sank die Titanic?",
        answer: [
                    "1912",
                    "1925",
                    "1949",
                    "1971",
                ],
        correctAnswer:  0,
    },
    {
        question:   "Welches Metall wurde 1825 von Hans Christian Oersted entdeckt?",
        answer: [
                    "Kupfer",    
                    "Eisen",     
                    "Aluminium",  
                    "Lithium",     
                ],
        correctAnswer: 2
    },
    {
        question:   "In welchem Land ist das Kolosseum?",
        answer: [
                    "England",      
                    "Griechenland",
                    "Spanien",      
                    "Italien",      
                ],
        correctAnswer:  3
    },
    {
        question:   "Was ist die Hauptstadt von Portugal?",
        answer: [
                    "Brüssel",      
                    "Athen",        
                    "Lissabon",    
                    "Bern",         
                ],
        correctAnswer:  2
    },
    {
        question:   "In welchem Jahr endete der Erste Weltkrieg?",
        answer: [
                    "1915", 
                    "1918", 
                    "1923", 
                    "1925", 
                ],
        correctAnswer:  1
    }
    ];
    module.exports = { questions, quizData}
