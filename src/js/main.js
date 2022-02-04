import "../css/styles.css";

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
        const dataDiv = document.querySelector(".displayResults");

        if (data.categories == undefined) {
          dataDiv.innerHTML = ``;
          dataDiv.classList.remove("displayResultsStyles", "flexCenter");
          searchBarDiv.innerHTML = `Invalid city name`;
          throw 'City name not found';
        } else {
          searchBarDiv.innerHTML = ``;
          //console.log (data);
          let categories = JSON.stringify(data.categories, null, 2);

          const html = `
            <div class="flexCenter directionColumn textLeft">Categories:</div>
            <pre class="directionColumn textLeft">${categories}</pre></br>
            <div class="flexCenter directionColumn textLeft">Summary:</div>
            <div class="flexCenter directionColumn textLeft">${data.summary}</div></br>
            <div class="flexCenter directionColumn textLeft">Teleport city score:</div>
            <div class="flexCenter directionColumn textLeft">${data.teleport_city_score}</div>
          `;
          dataDiv.classList.add("displayResultsStyles", "flexCenter", "directionColumn");
          dataDiv.innerHTML = html;
        }
      }
    }
  } catch (e) {
    console.error('Error: ' + e);
  }


});
