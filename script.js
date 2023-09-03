window.addEventListener("scroll", function() {
    var scrolledHeight = window.pageYOffset;
    var header = document.querySelector(".parallax");
    header.style.backgroundPosition = "0 " + (scrolledHeight * 0.3) + "px";
  });


function toggleNav() {
    var navLinks = document.getElementById("nav-links");
    if (navLinks.style.display == "flex") {
        navLinks.style.display = "none";
    } else {
        navLinks.style.display = "flex";
    }
}


const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const category = btn.getAttribute('data-category');
        
        portfolioItems.forEach(item => {
            if (category === 'all' || item.classList.contains(category)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// // Check if the screen size is smaller than 768px
// if (window.matchMedia('(max-width: 768px)').matches) {
//     // Get the portfolio item description element
//     const portfolioItemDescription = document.querySelector('.portfolio-item-description');
  
//     // Check if the element exists
//     if (portfolioItemDescription) {
//       // Remove the element
//       portfolioItemDescription.remove();
//     }
//   }
  
const navbar = document.querySelector('.navbar');
let prevScrollpos = window.pageYOffset;

window.onscroll = function() {
  const currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    navbar.classList.remove("hidden");
  } else {
    navbar.classList.add("hidden");
  }
  prevScrollpos = currentScrollPos;
}

Prism.highlightAll();

window.addEventListener('scroll', function() {
    if (window.scrollY > 500) { // change 500 to the desired scroll position
        document.querySelectorAll('.image-item').forEach(function(item, index) {
            item.style.animationDelay = (index * 0.1) + 's';
            item.classList.add('animated');
        });
    }
});

// Function to preload GIF animations
function preloadGIFs() {
    var gifs = document.querySelectorAll("img[id^='gif_']");

    for (var i = 0; i < gifs.length; i++) {
        var gif = gifs[i];
        var src = gif.getAttribute("src");
        var img = new Image();
        img.src = src;
    }
    }

// Trigger the preloadGIFs function when the page finishes loading
window.onload = preloadGIFs;
