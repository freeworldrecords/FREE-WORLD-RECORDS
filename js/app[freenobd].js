/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 **/

const sections = document.querySelectorAll("section[id]"); //creates an array of all section elements in the document
const navList = document.getElementById("navbar__list"); //calls the unordered list nav
const navLi = document.querySelectorAll("li a"); //creates an array of anchor elements nested in document's list items

/**
 * End Global Variables
 * Begin Main Functions
 **/

sections.forEach((element) => { //this function will loop through each section element in the 'sections' array and create the corresponding navigation link and build the nav
    let sectionId = element.getAttribute("id"); //assigns the section id for each section element
    let sectionLink = document.createElement("li"); //creates a list item
    let sectionTitle = element.getAttribute("data-nav"); //assigns the title of each section to the title of the navigation link
    sectionLink.innerHTML = "<a href = #" + sectionId + " class = 'menu__link'>" + sectionTitle + "</a>"; //populates the list item with an anchor tag to each section
    navList.appendChild(sectionLink); //adds each list item to the unorder list 'navbar__list'
    //the following lines create the behavior of each link when clicked
    document.querySelectorAll(".menu__link").forEach((menuLink) => { //listens for the 'menu__link' class to be clicked, then smooth scrolls usins 'scrollIntoView'
        menuLink.addEventListener("click" , (e) => { //scroll to section on link click
            e.preventDefault();
            document.querySelector(menuLink.getAttribute("href")).scrollIntoView({behavior: "smooth"}) //scroll to anchor ID using scrollTO event
        });
    });
});

function navActive() { //this function adds an active style to the navigation link of the section being viewed
    let scrollY = window.pageYOffset; //stores the vertical scroll position of the window
    sections.forEach(current => { //loop to store height, id, and elements top boundary
        activeSectionId = current.getAttribute("id"); // stores the id of the section element in view
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 100;
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) { //adds or removes the class 'active' from the navigation link based on the position of the currect section on the screen
            document.querySelector(".navbar__menu a[href*=" + activeSectionId + "]").classList.add("active");
        } else {
            document.querySelector(".navbar__menu a[href*=" + activeSectionId + "]").classList.remove("active");
        }
    });
}

function activeSection() { //add class 'active' to section when near top of viewport
    for(const section of sections) { //calls the 'sections' array stores the internal elements as 'section' to be looped when called
    const box = section.getBoundingClientRect(); //stores the viewport position of each 'section'
    if(box.top <= 100 && box.bottom >= 100) {
    section.classList.add("your-active-class");
    } else {
    section.classList.remove("your-active-class");
            }
        }
    }

/**
 * End Main Functions
 * Begin Events
 **/

document.addEventListener("scroll" , () => { //set sections as active
    activeSection();
    navActive();
});

const slideContainer = document.querySelector('.slide-container');
const prevSlide = document.querySelector('.prev-slide');
const nextSlide = document.querySelector('.next-slide');

let scrollAmount = 0;

prevSlide.addEventListener('click', () => {
  scrollAmount -= 400; // adjust scroll amount as needed
  slideContainer.scrollTo({
    top: 0,
    left: scrollAmount,
    behavior: 'smooth'
  });
});

nextSlide.addEventListener('click', () => {
  scrollAmount += 400; // adjust scroll amount as needed
  slideContainer.scrollTo({
    top: 0,
    left: scrollAmount,
    behavior: 'smooth'
  });
});

// Get all the read more and read less links on the page
const readMoreLinks = document.querySelectorAll('.read-more');
const readLessLinks = document.querySelectorAll('.read-less');

// Loop through all the read more links and add a click event listener to each one
readMoreLinks.forEach(link => {
  link.addEventListener('click', (event) => {
    // Prevent the default link behavior (i.e. don't follow the link)
    event.preventDefault();
    
    // Get the blog post element that the link is inside
    const post = link.closest('.blog-post');
    
    // Add the "expanded" class to the blog post element
    post.classList.add('expanded');
  });
});

// Loop through all the read less links and add a click event listener to each one
readLessLinks.forEach(link => {
  link.addEventListener('click', (event) => {
    // Prevent the default link behavior (i.e. don't follow the link)
    event.preventDefault();
    
    // Get the blog post element that the link is inside
    const post = link.closest('.blog-post');
    
    // Remove the "expanded" class from the blog post element
    post.classList.remove('expanded');
  });
});

// Get all thumbs up and thumbs down buttons
const thumbsUpButtons = document.querySelectorAll('.thumb-up');
const thumbsDownButtons = document.querySelectorAll('.thumb-down');

// Add event listener to each thumbs up button
thumbsUpButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Get the count element for this button
    const countElement = button.nextElementSibling;
    // Increment the count
    const count = parseInt(countElement.textContent) + 1;
    // Update the count element
    countElement.textContent = count;
  });
});

// Add event listener to each thumbs down button
thumbsDownButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Get the count element for this button
    const countElement = button.nextElementSibling;
    // Decrement the count
    const count = parseInt(countElement.textContent) - 1;
    // Update the count element
    countElement.textContent = count;
  });
});