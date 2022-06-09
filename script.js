const button = document.getElementById("button");
const audioElement = document.getElementById("audio");


// Disable/Enable Button
function toggleButton() {
    button.disabled = !button.disabled
}

//  Passing Joke to VoiceRSS API
function tellMe(joke) {
    VoiceRSS.speech({
        key: "YOUR_API_KEY_FROM(https://rapidapi.com/voicerss/api/text-to-speech-1/)",
        src: joke,
        hl: "en-us",
        v: "Linda",
        r: 0,
        c: "mp3",
        f: "44khz_16bit_stereo",
        ssml: false,
      });
}


// Get Jokes from Joke API
async function getJokes() {
  try {
    let joke = "";
    const apiUrl = "https://v2.jokeapi.dev/joke/Programming";
    const response = await fetch(apiUrl);
    const data = await response.json();
    if (data.setup) {
      joke = `${data.setup} ... ${data.delivery}`;
    } else {
        joke = data.joke;
    }
    // Text-to-Speech
    tellMe(joke);
    // Disable Button
    toggleButton()
  } catch (error) {
    console.log("Whoops, error thats not a joke", error);
  }
}

// Event Listeners
button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton)
