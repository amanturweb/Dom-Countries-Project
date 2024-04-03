const totalCountEl = document.getElementById("total-count");
const pageCountEl = document.getElementById("page-count");
const searchEl = document.getElementById("search");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("previous");
const countriesListEl = document.querySelector(".countries");


let countries = [];
let activePage = 1;
let totalPage;
let countriesPerPage = 18;
let totalCountries;

const url = "https://restcountries.com/v3.1/all"

fetch(url)
    .then(res => res.json())
    .then(data => {
        countries = data;
        totalCountries = countries.length;
        totalPage = Math.ceil(totalCountries / countriesPerPage)

        totalCountEl.innerHTML = totalCountries + " countries";
        upddateValues();

        regenerateCountriesView();

    })
    .catch((error) => console.log(error));
function regenerateCountriesView() {
    const startInd = (activePage - 1) * countriesPerPage;
    const endInd = activePage * countriesPerPage;

    const slicedCountries = countries.slice(startInd, endInd);

    displayAllCountries(slicedCountries);
}
function upddateValues() {
    pageCountEl.innerHTML = `Page: ${activePage}/${totalPage}`;
}
function displayAllCountries(countries) {
    countriesListEl.innerHTML = "";

    for (let country of countries) {
        const {
            name: { common },
            flags: { png },
            capital,
            population,
        } = country;

        const singleCountry = `
        <div class="single-country">
        <img src="${png}"" alt="country flag" />
        <div><strong>${common}</strong></div>
        <div><b>Cap:</b>${capital ? capital.join(",") : "none"}</div>
        <div><b>Pop: </b>${population.toLocaleString()}</div>
      </div>
        `;
        countriesListEl.innerHTML += singleCountry;
    }
};

nextBtn.addEventListener('click', () => {
    if (activePage < totalPage) {
        activePage++
        upddateValues()
        regenerateCountriesView()
    }
})

prevBtn.addEventListener('click', () => {
    if (activePage > 1) {
        activePage--
        upddateValues();
        regenerateCountriesView();
    }
})