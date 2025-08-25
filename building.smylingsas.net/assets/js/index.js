  document.addEventListener("DOMContentLoaded", function () {
    const images = document.querySelectorAll("img.lazy-image");
    images.forEach(img => {
      if (img.complete) {
        img.style.filter = "none";
      } else {
        img.addEventListener("load", () => {
          img.style.filter = "none";
        });
      }
    });
  });
