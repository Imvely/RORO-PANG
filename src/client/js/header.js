const imgLogo = document.getElementById("imgLogo");
const fontLogo = document.getElementById("fontLogo");

imgLogo.addEventListener("mouseover", function () {
  fontLogo.style.display = "block";
});

imgLogo.addEventListener("mouseout", function () {
  fontLogo.style.display = "none";
});
