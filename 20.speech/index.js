window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.interimResults = true;
recognition.lang = 'en-AU';

let para = document.createElement('p');
const words = document.querySelector('.words');
words.appendChild(para);

recognition.addEventListener('result', e => {
    const transcript = Array.from(e.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('');



    if (e.results[0].isFinal) {
        para = document.createElement('p');
        words.appendChild(para);
    }
});

recognition.addEventListener('end', recognition.start);

recognition.start();
