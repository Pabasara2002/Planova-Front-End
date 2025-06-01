document.addEventListener("DOMContentLoaded", () => {
  console.log("Planoya frontend loaded.");

  const form = document.querySelector("form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Form submitted!");
    });
  }
});
