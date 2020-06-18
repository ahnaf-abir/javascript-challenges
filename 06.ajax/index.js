const endpoint =
  'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

const cities = [];
const all = fetch(endpoint)
            .then(blob => blob.json())
            .then(data => cities.push(...data));

console.log(cities);

function findMatches(wordsGiven, cities) {
    return cities.filter(place => {
        const reg = new RegExp(wordsGiven, 'gi')

        return place.city.match(reg);
    })
}
function display() {
    const array = findMatches(this.value, cities);
    console.log(this.value);
    const html = array.map(place => {
        return `
            <li>
                <span class="name">${place.city}</span>
                <span class="population">${place.population}</span>
            </li>
        `;
    }).join('');

    suggestions.innerHTML = html;

}

const selectInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');

selectInput.addEventListener('change', display);
selectInput.addEventListener('keyup', display);