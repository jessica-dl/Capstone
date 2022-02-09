var meta;
var result;

function displayResults(shopName) {
  $.ajax({
    type: "POST",
    url: '../server/get_availability.php',
    timeout: 20000,
    data: {arguments: [room]},
  
    success: function (obj) {
      var data = JSON.parse(obj);
        if (!obj.error) {
          result = JSON.parse(data["response_data"]);
          meta = JSON.parse(data["response_metadata"]);
          createTable();

          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(displayPosition);
          } else {
            x.innerHTML = "Geolocation is not supported by this browser.";
          }
          console.log("Success: " + result);
        }
        else {
          console.log(obj.error);
        }
    },
    error: function(XMLHttpRequest, textStatus, errorThrown) {
      console.log('Error: ' + errorThrown);
    }    
  }).fail(function(jqXHR, textStatus){
    console.log('Fail: ' + textStatus); });
}

function createTable() {
  const tbl = document.querySelector("table");
  let headers = Object.keys(JSON.parse(result["0"]));
  generateTableHead(tbl, headers);
  generateTable(tbl);
}

function generateTableHead(tbl, headers) {
  let thead = tbl.createTHead();
  let row = thead.insertRow();
  for(let key of headers) {
    let th = document.createElement("th");
    let text = document.createTextNode(key);
    th.appendChild(text);
    row.appendChild(th);
  }
}

function generateTable(tbl) {
  for (let i = 0; i < result.length; i++) {
    element = JSON.parse(result[i]);
    metadata = JSON.parse(meta[i]);
    let row = tbl.insertRow();
    for (key in element) {
      let cell = row.insertCell();
      var text;
      if (key === "Name") {
        text = document.createElement("a");
        text.setAttribute("href", "../about-page/about-page.html?id=" + metadata["id"]);

        let linkText = document.createTextNode(element[key]);
        text.appendChild(linkText);
      } 
      else if (key === "Amenities") {
        amens = "\n";
        amenities = JSON.parse(element[key])
        for (amenity in amenities) {
          if (amenities[amenity] === "true") {
            amens += amenity + ", ";
          }
        }
        text = document.createTextNode(amens);
      } 
      else {  
        text = document.createTextNode(element[key]);
      }
      cell.appendChild(text);
    }
  }
}