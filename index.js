const displayContainer = document.querySelector("#container");
const body = document.body;

async function countryInfo() {
  const response = await axios.get(
    `https://restcountries.com/v3.1/all?fields=name,flags,region,population,capital,languages,currencies,timezones,map`
  );

  // const countries = response.data

  console.log(response.data);

  // countryInfo()

  let countryElement = "";
  for (let country of response.data) {
    countryElement += `
    <div class="displayCard">
    <h1>Country:${country.name.common}</h1>
    <h3>Capital:${country.capital} </h3>
    <h3>Region:${country.region} </h3>
    <h3>Population:${country.population} </h3>
    <img src="${country.flags.png}" alt="${
      country.name
    }" style="width="100px"; height="200px" > 

<div class="detailedInfo">
        
        <h3>Capital: ${country.capital}</h3>
        <h3>Languages: ${Object.values(country.languages).join(', ')}</h3>
        <h3>Currency: ${Object.values(country.currencies).map(curr => `${curr.name} (${curr.symbol})`).join(", ")}</h3>
        <h3>Timezone: ${country.timezones}</h3>
        <h3>Google Maps:<a href="https://www.google.com/maps/place/${country.name.common}" target="_blank">View Map</a>
</h3>
</h3>
        
    </div>




    </div> `;
  }
  displayContainer.innerHTML = countryElement;
}
countryInfo();

// Search Functionality

const searchButton = document.querySelector("#inputBtn");
if (searchButton) {
  searchButton.addEventListener("input", function (event) {
    const searchTerm = event.target.value.toLowerCase();
    const displayCards = document.querySelectorAll(".displayCard");

    displayCards.forEach((card) => {
      const countryName = card.querySelector("h1").textContent.toLowerCase();
      card.style.display = countryName.includes(searchTerm) ? "block" : "none";
    });
  });
}


// Adding Dark Mode

const toggleBtn = document.querySelector("#darkModeToggle");
if(toggleBtn) {
toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");  

  toggleBtn.textContent = document.body.classList.contains("dark-mode") ? "Light Mode" : "Dark Mode";
});
}
