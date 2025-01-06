const container = document.getElementsByClassName("container")[0];
const define = document.getElementById("result");
const fetchButton = document.getElementById("fetchword"); // Renamed variable
const inputWord = document.getElementById("word");

// Function to fetch word definition from the Dictionary API
function fetchWordDefinition(word) {
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;

    return new Promise((resolve, reject) => {
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Error: ${response.status} ${response.statusText}`);
                }
                return response.json();
            })
            .then(data => {
                resolve(data);
            })
            .catch(error => {
                reject(error);
            });
    });
}

// Event listener for the button
fetchButton.addEventListener("click", () => { // Updated variable name
    const word = inputWord.value.trim();
    if (word) {
        fetchWordDefinition(word)
            .then(data => {
                // Clear previous results
                define.innerHTML = '';

                // Display the word and its definitions
                const wordElement = document.createElement('div');
                wordElement.className = 'word';
                wordElement.textContent = `Word: ${data[0].word}`;
                define.appendChild(wordElement);

                const definitions = data[0].meanings[0].definitions;
                // Display up to 5 definitions
                definitions.slice(0, 5).forEach((definition, index) => {
                    const definitionElement = document.createElement('div');
                    definitionElement.className = 'definition';
                    definitionElement.textContent = `${index + 1}. ${definition.definition}`;
                    define.appendChild(definitionElement);
                });
            })
            .catch(error => {
                define.innerHTML = `<div style="color: red;">Error fetching word definition: ${error.message}</div>`;
            });
    } else {
        define.innerHTML = '<div style="color: red;">Please enter a word.</div>';
    }
});
