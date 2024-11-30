let words = [];
let currentIndex = 0;
let femaleVoice = null;
let correctCount = 0; // Counter for correct spellings
let incorrectCount = 0; // Counter for incorrect spellings

document.addEventListener("DOMContentLoaded", function() {
    // Load available voices
    speechSynthesis.onvoiceschanged = function() {
        const voices = speechSynthesis.getVoices();
    };
});

document.getElementById("startBtn").addEventListener("click", function() {
    const input = document.getElementById("wordList").value;
    words = input.split(",").map(word => word.trim()).filter(word => word.length > 0);
    
    if (words.length === 0) {
        alert("Please enter at least one word.");
        return;
    }

    document.getElementById("wordList").style.display = "none";
    document.getElementById("startBtn").style.display = "none";
    document.getElementById("gameArea").style.display = "block";
    currentIndex = 0;
    correctCount = 0; // Reset correct counter
    incorrectCount = 0; // Reset incorrect counter
    showWord();
    updateCounters(); // Update the counters display
});

document.getElementById("checkBtn").addEventListener("click", function() {
    const userInput = document.getElementById("userInput").value.trim();
    const correctWord = words[currentIndex];

    if (userInput.toLowerCase() === correctWord.toLowerCase()) {
        document.getElementById("feedback").textContent = "Correct!";
        correctCount++; // Increment the correct count
    } else {
        document.getElementById("feedback").textContent = `Wrong! The correct word is "${correctWord}".`;
        incorrectCount++; // Increment the incorrect count
    }

    updateCounters(); // Update the counters display
    document.getElementById("hearAgainBtn").style.display = "none"; // Hide hear again button after checking
    document.getElementById("nextBtn").style.display = "block"; // Show next button
});

document.getElementById("nextBtn").addEventListener("click", function() {
    currentIndex++;
    if (currentIndex < words.length) {
        showWord();
        document.getElementById("feedback").textContent = "";
        document.getElementById("userInput").value = "";
    } else {
        document.getElementById("feedback").textContent = "You've completed the list!";
        document.getElementById("nextBtn").style.display = "none";
        document.getElementById("hearAgainBtn").style.display = "none"; // Hide hear again button
    }
});

document.getElementById("hearAgainBtn").addEventListener("click", function() {
    const word = words[currentIndex];
    console.log("the word is " + word);
    speakWord(word); // Pronounce the current word again
});

function showWord() {
    const word = words[currentIndex];
    speakWord(word);
    document.getElementById("wordDisplay").textContent = "Listen...";
    document.getElementById("hearAgainBtn").style.display = "block"; // Show hear again button
}

function speakWord(word) {
    const utterance = new SpeechSynthesisUtterance(word);
    speechSynthesis.speak(utterance);
}

// Function to update the counters display
function updateCounters() {
    document.getElementById("counterDisplay").textContent = `Correct Spellings: ${correctCount}`;
    document.getElementById("incorrectCounterDisplay").textContent = `Incorrect Spellings: ${incorrectCount}`;
}
