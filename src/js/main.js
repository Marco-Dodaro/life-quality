//import "../css/styles.css";

const apiUrlRoot = "https://api.teleport.org/api/urban_areas/";

document.addEventListener('DOMContentLoaded', () => {

  document.getElementById("input").addEventListener("keyup", function(e) {
    if (e.keyCode === 13) {
      document.getElementById("submit").click();
      event.currentTarget.value = "";
    }
  });

  try {
    document.getElementById("submit").onclick = function() {
      let cityValue = document.querySelector("#input").value;
      let city = cityValue.toLowerCase();

      if (city.indexOf(' ') > 0) {
        city = city.replace(/\s+/g, '-');
      } else {}

      let apiUrl = apiUrlRoot + "slug:" + city + "/scores/";

      fetch(apiUrl)
        .then((data) => data.json())
        .then((city) => generateHtml(city))

      const generateHtml = (data) => {

        const searchBarDiv = document.querySelector("#errorMessageBox");
        const resultsDiv = document.querySelector(".displayResults");
        const categoriesDiv = document.querySelector(".displayCategories");
        const dataDiv = document.querySelector(".displayData");

        if (data.summary == undefined) {
          dataDiv.innerHTML = ``;
          categoriesDiv.innerHTML = ``;
          resultsDiv.classList.remove("displayResultsStyles", "flexCenter");
          searchBarDiv.innerHTML = `Invalid city name or city not found`;
          throw 'City not found';
        } else {

          searchBarDiv.innerHTML = ``;

        //  console.log (data);
          let categories = data.categories;
          resultsDiv.classList.add("displayResultsStyles", "flexCenter", "directionColumn");

              const categoriesSection = `<div id="catgoriesSection" class="flexCenter directionColumn"><b>Categories:</b></div><br/>`;
              categoriesDiv.innerHTML = categoriesSection;
              resultsDiv.style = "align-items: unset"

              for (let i = 0; i < categories.length; i++) {
                let div = document.createElement("div");
                div.innerHTML = "- " + categories[i].name + ": " + categories[i].score_out_of_10.toFixed(1) + `<br/>` ;
                categoriesDiv.appendChild(div);
              }

          const html = `
            <br/>
            <div class="flexCenter directionColumn"><b>Summary:</b></div></br>
            <div class="flexCenter directionColumn">${data.summary}</div></br>
            <div class="flexCenter directionColumn"><b>Teleport city score:</b></div>
            <div class="flexCenter directionColumn">${data.teleport_city_score.toFixed(0)}</div>
          `;
          dataDiv.innerHTML = html;
        }
      }
    }
  } catch (e) {
    console.error('Error: ' + e);
  }


});
