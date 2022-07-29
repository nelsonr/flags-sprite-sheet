const rootEl = document.querySelector('main');
let countries = [];
let searchQuery = '';

function renderPage(countriesHTML, count) {
    const mainHTML = `
        <h1>Country Flags</h1>

        <h3>Count: ${count}</h3>
        
        <section>
            <div class="range-slider">
                <label>Size:</label>
                <input type="range" min="32" max="96" step="8" value="64" />
                <legend>64px</legend>
            </div>

            <label for="">Filter: <input type="text" placeholder="Search by country name..."></label>
        </section>

        <div class="grid">${countriesHTML}</div>
    `;

    rootEl.innerHTML = mainHTML;
}

function renderCountries(countries) {
    let html = '';

    for (const country of countries) {
        html += `
            <div class="grid-item">
                <div class="flag flag-${country.code}"></div>
                <legend>${country.name}</legend>
            </div>
        `;
    }

    return html;
}

function setImageSize(size = 32) {
    const input = document.querySelector('input');
    const legend = input.nextElementSibling;
    const flags = document.querySelectorAll('.flag');

    flags.forEach((flag) => flag.style.setProperty('--size', size));
    legend.textContent = size + 'px';
    input.value = size;
}

function setupRangeSlider() {
    const input = document.querySelector('input');
    input.addEventListener('input', () => setImageSize(input.value));
}

function setupSearch() {
    const input = document.querySelector('input[type="text"]');

    input.value = searchQuery;

    input.addEventListener('input', () => { 
        searchQuery = input.value;
        render();
    });

    input.focus();
}

function search(countries, query) {
    const trimmedQuery = query.trim();

    if (trimmedQuery.length === 0) { 
        return countries; 
    }
    
    const queryRegExp = new RegExp(trimmedQuery, 'i');
    
    return countries.filter((country) => {
        return country.name.match(queryRegExp);
    });
}

function render() {
    const filteredCountries = search(countries, searchQuery)
    const countriesHTML = renderCountries(filteredCountries);

    renderPage(countriesHTML, filteredCountries.length);
    setImageSize(64);
    setupRangeSlider();
    setupSearch();
}

function main() {
    fetch('../assets/flags.json')
        .then((resp) => resp.json())
        .then((countriesData) => {
            // countries = countriesData.filter((c) => c.code.length > 0);
            countries = countriesData;
            render();
        });
}

main();
