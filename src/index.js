import { icaoListJSON } from "./icao";

const $ = require("jQuery");
let icaoList = icaoListJSON;

function populateTable() {
  // Get the table ready
  let tableBody = document.querySelector("#icaoTable > tbody");
  icaoList.forEach(icao => {
    let row = document.createElement("tr");

    // For each of the fields, add a <td> to the row
    const keys = Object.keys(icao);
    keys.forEach(key => {
      let td = document.createElement("td");
      td.appendChild(document.createTextNode(icao[key]));
      row.appendChild(td);
    });

    tableBody.appendChild(row);
  });
}

// Search Table Logic Below:
$("#searchBar").keyup(
  debounce(function() {
    // Get the text input from the search bar input tag
    const stringValue = $(this).val();

    // Regardless of what is inputted, let's start fresh with a new list since we are removing and adding
    icaoList = icaoListJSON;
    icaoList = icaoList.filter(function(item) {
      return includesStr(Object.values(item), stringValue);
    });

    // Remove the previous rows, and paint the new ones with the new array list.
    $("#icaoTable > tbody > tr").remove();
    populateTable();
  }, 200)
);

// Helper function that looks through the array of objects for a text value match
function includesStr(values, str) {
  return values
    .map(function(value) {
      return String(value).toLocaleLowerCase();
    })
    .find(function(value) {
      return value.includes(str);
    });
}

// Helper function that prevents search input from being spammed.
function debounce(func, wait, immediate) {
  var timeout;
  return function() {
    var context = this,
      args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

// Initialize the table with table.
populateTable();
