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

function preloadGIFs() {
    var gifImages = [
        document.getElementById("gif_eeg_hp"),
        document.getElementById("gif_hp"),
        document.getElementById("gif_eeg_lp"),
        document.getElementById("gif_lp")
    ];

    var loadedGIFs = 0;

    function imageLoaded() {
        loadedGIFs++;
        if (loadedGIFs === gifImages.length) {
            // All GIFs have been loaded
            // Display the GIFs or start the synchronized animation here
            console.log("All GIFs have been loaded!");
      } 
    }

    for (var i = 0; i < gifImages.length; i++) {
        var image = new Image();
        image.onload = imageLoaded;
        image.src = gifImages[i].src;
    }
}

window.onload = preloadGIFs;
  