$(".cars").click(function () {
  localStorage.setItem("name", this.name);
});

$("#titleOfCard").text(localStorage.getItem("name"));
$("#setImg").attr("src", `img/${localStorage.getItem("name")}.png`);

$("#dropDownMenu").change(function () {
  $("#searchBtn").removeAttr("disabled");
});

// get drop down values from database

$.ajax({
  url: "/fetch-model",
  type: "POST",
  data: `${localStorage.getItem("name")}`,
  dataType: "json",
  success: function (res) {
    res[Object.keys(res)].forEach((element) => {
      $("#dropDownMenu").append(
        '<option value="' +
        element[Object.keys(element)] +
        '">' +
        element[Object.keys(element)] +
        "</option>"
      );
    });
  },
});

$("#searchBtn").click(function () {
  $.ajax({
    url: "/getInfo",
    type: "POST",
    data: `${dropDownMenu.value}`,
    dataType: "json",
    success: function (res) {
      let contentArr = res[Object.keys(res)][0];

      let co2Comment;
      let smogComment;
      if (
        parseInt(contentArr["CO2"]) >= 1 &&
        parseInt(contentArr["CO2"]) <= 3
      ) {
        co2Comment = "Poor";
      } else if (
        parseInt(contentArr["CO2"]) >= 4 &&
        parseInt(contentArr["CO2"]) <= 6
      ) {
        co2Comment = "Medium";
      } else {
        co2Comment = "Good";
      }
      if (
        parseInt(contentArr["Smog"]) >= 1 &&
        parseInt(contentArr["Smog"]) <= 3
      ) {
        smogComment = "Poor";
      } else if (
        parseInt(contentArr["Smog"]) >= 4 &&
        parseInt(contentArr["Smog"]) <= 6
      ) {
        smogComment = "Medium";
      } else {
        smogComment = "Good";
      }
      document.getElementById("addContent").style.display = "block";
      document.getElementById("addContent").innerHTML = `
         
          <strong> Model Name </strong> : ${contentArr["Model"]}<br>
          <strong> Vehicle Class</strong>: ${contentArr["Vehicle Class"]}<br>  <strong> Transmission</strong>: ${contentArr["Transmission"]}<br>
          <strong> Fuel Type</strong>:${contentArr["Fuel"]}<br> <strong> Average Fuel Consumption</strong>: ${contentArr["MyUnknownColumn_[0]"]}<br> 
          <strong> CO2 Emission</strong>: ${contentArr["CO2 Emissions"]}<br>  <strong>  CO2 Rating</strong>: ${contentArr["CO2"]}  (${co2Comment})<br>  <strong> Smog Rating</strong>: ${contentArr["Smog"]}  (${smogComment})<br>`;
    },
  });

  console.log(bestOption[localStorage.getItem("name")]);
  document.getElementById("displayBest").style.display = "block";
  document.getElementById("displayBest").innerHTML =
    "<b>Explore the best Options:</b> <br>";

  bestOption[localStorage.getItem("name")].forEach((element) => {
    document.getElementById("displayBest").innerHTML += element;
    document.getElementById("displayBest").innerHTML += "<br>";
  });
});
var ans = document.getElementsByClassName("question");
console.log(ans);
var i;
for (i = 0; i < ans.length; i++) {
  ans[i].addEventListener("click", function (e) {
    e.preventDefault();
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.display === "block") {
      panel.style.display = "none";
    } else {
      panel.style.display = "block";
    }
  });
}
let bestOption = {
  Acura: ["TLX SH-AWD", "TLX SH-AWD A-SPEC", "RDX SH-AWD"],
  "Alfa Romeo": ["Guilia", "Guilia AWD", "Stelvio"],
  "Aston Martin": ["Vantage V8", "DB11 V8", "DBX V8"],
  Audi: [
    "A3 Sedan 40 TSFI quattro",
    "Q3 40 TSFI quattro",
    "TT Coupe 45 TSFI quattro",
  ],

  Bentley: ["Continental GT", "Continental GT Convertible", "Bentayga"],
  Bmw: ["330i xDrive Sedan", "430i xDrive Cabriolet", "430i xDrive Coupe"],
  Bugatti: ["Chiron", "Chiron Pur Sport", "Chiron Super Sport"],
  Buick: ["Encore", "Encore GX", "Encore GX"],
  Cadillac: ["CT4", "CT5", "XT4"],
  Chevrolet: ["Malibu", "Trailblazer", "Trailblazer"],
  Chrysler: ["300", "Grand Caravan", "Pacifica"],
  Dodge: ["Durango AWD", "Charger", "Challanger"],
  Ford: ["Escape Hybrid", "Escape Hybrid AWD", "Maverick Hybrid"],
  Genesis: ["G80 AWD", "GV70 AWD", "GV80 AWD"],
  GMC: ["Terrain", "Acadia", "Acadia AWD"],
  Honda: ["Accord Hybrid", "Accord Hybrid Sport/Touring", "Civic Sedan"],
  Hyundai: ["IONIQ Blue", "Elantra Hybrid Blue", "IONIQ"],
  Infiniti: ["QX50 AWD", "QX55 AWD", "QX60 AWD"],
  Jaguar: ["E-PACE P250", "E-PACE P300"],
  Jeep: ["Grand Cherokee 4X4", "Grand Cherokee L 4X4", "Grand Cherokee WK 4X4"],
  Kia: ["Niro", "Niro Touring", "Niro FE"],
  Lamborghini: ["Urus", "Huracan evo Coupe AWD", "Huracan evo Spyder AWD"],
  "Land Rover": [
    "Discovery P360",
    "Range Rover Sport P36",
    "Range Rover Sport HST P400",
  ],
  Lexus: ["ES 300h", "NX 350h AWD", "UX 250h AWD"],
  Lincoln: ["Nautilus AWD", "Nautilus AWD", "Navigator 4X4"],
  Maserati: ["MC20", "Ghibli GT", "Ghibli Modena"],

  Mazda: ["Mazda3 4-Door", "Mazda3 4-Door (SIL)", "Mazda3 5-Door"],
  "Mercedes-Benz": [
    "C 300 4MATIC Sedan",
    "C 300 4MATIC Coupe",
    "C 300 4MATIC Cabriolet",
  ],

  Mini: ["Cooper 3 Door", "Cooper 5 Door", "Cooper Convertible"],
  Mitsubishi: ["Outlander 4WD", "Mirage"],
  Nissan: ["Versa", "Sentra", "Sentra SR"],
  Porsche: ["718 Boxster GTS 4.0", "718 Cayman GTS 4.0 ", "Macan"],
  Ram: ["ProMaster City", "1500 eTorque", "1500 eTorque"],
  Subaru: ["Crosstrek AWD", "Legacy AWD", "Crosstrek AWD"],
  Toyota: ["Prius", "Corolla Hybrid", "Prius AWD"],
  Volkswagen: ["Jetta", "Taos"],
  Volvo: ["S90 B6 AWD", "V90 CC B6 AWD", "V60 T6 AWD"],
};
