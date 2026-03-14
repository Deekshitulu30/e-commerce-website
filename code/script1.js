let cart = 0;
function addCart(){
cart++;
document.getElementById("count").innerText = cart;
alert("Product added to cart!");
}
let index = 0

let slides = document.querySelectorAll(".slide")

let titles = [
"JUST LAUNCHED",
"MEGA FASHION SALE",
"NEW ARRIVALS"
]

let subtitles = [
"GET 10% OFF",
"UP TO 70% OFF",
"BEST TRENDING STYLES"
]

function showSlide(i){

slides.forEach(slide => slide.classList.remove("active"))
slides[i].classList.add("active")

document.getElementById("title").innerText = titles[i]
document.getElementById("subtitle").innerText = subtitles[i]

let textBox = document.querySelector(".hero-text")

textBox.classList.remove("left-text","right-text")

if(i == 1){
textBox.classList.add("left-text")   // second slide
}
else{
textBox.classList.add("right-text")  // other slides
}

}

function nextSlide(){
index++
if(index >= slides.length){
index = 0
}
showSlide(index)
}

function prevSlide(){
index--
if(index < 0){
index = slides.length - 1
}
showSlide(index)
}

/* auto slide every 1 second */
setInterval(nextSlide,5000)
function revealText(){

let reveals = document.querySelectorAll(".reveal")

for(let i=0;i<reveals.length;i++){

let windowHeight = window.innerHeight
let elementTop = reveals[i].getBoundingClientRect().top
let visible = 100

if(elementTop < windowHeight - visible){
reveals[i].classList.add("active")
}

}

}

window.addEventListener("scroll",revealText)
function revealObjects(){

let elements = document.querySelectorAll(".reveal")

elements.forEach((el)=>{
let windowHeight = window.innerHeight
let elementTop = el.getBoundingClientRect().top
let visible = 100

if(elementTop < windowHeight - visible){
el.classList.add("active")
}
})

}

window.addEventListener("scroll",revealObjects)
// Theme Toggle Function
function toggleTheme() {
    document.body.classList.toggle('dark-mode');
}
// --- CART & WISHLIST LOGIC --- //
let cartList = [];
let wishlistList = [];

// 1. Panel Toggle Functions
function openCart() {
    document.getElementById('cart-panel').classList.add('open');
    document.getElementById('overlay').classList.add('active');
    renderCart();
}

function openWishlist() {
    document.getElementById('wishlist-panel').classList.add('open');
    document.getElementById('overlay').classList.add('active');
    renderWishlist();
}

function closePanels() {
    document.getElementById('cart-panel').classList.remove('open');
    document.getElementById('wishlist-panel').classList.remove('open');
    document.getElementById('overlay').classList.remove('active');
}

// 2. Add Functions
function addCart(name, price, imageSrc) {
    cartList.push({ name: name, price: price, image: imageSrc });
    
    // Update Badge
    document.getElementById("count").innerText = cartList.length;
    
    // Show visual feedback
    alert(name + " added to your bag!");
    
    // If panel is already open, refresh it
    renderCart(); 
}

function addWishlist(name, price, imageSrc) {
    wishlistList.push({ name: name, price: price, image: imageSrc });
    
    // Update Wishlist Badge
    let wBadge = document.getElementById("wishlist-count");
    wBadge.style.display = "flex";
    wBadge.innerText = wishlistList.length;
    
    alert(name + " saved to wishlist!");
    renderWishlist();
}

// 3. Render/Update UI Functions
function renderCart() {
    let container = document.getElementById('cart-items-container');
    let totalElement = document.getElementById('cart-total');
    
    container.innerHTML = ""; // Clear existing
    let total = 0;

    if (cartList.length === 0) {
        container.innerHTML = "<p style='text-align:center; color:#a9abb3;'>Your bag is empty.</p>";
    } else {
        cartList.forEach((item, index) => {
            total += item.price;
            container.innerHTML += `
                <div class="panel-item">
                    <img src="${item.image}" alt="${item.name}">
                    <div class="panel-item-details">
                        <h4>${item.name}</h4>
                        <p>₹${item.price}</p>
                        <button class="remove-btn" onclick="removeFromCart(${index})">Remove</button>
                    </div>
                </div>
            `;
        });
    }
    totalElement.innerText = total;
}

function renderWishlist() {
    let container = document.getElementById('wishlist-items-container');
    container.innerHTML = ""; 

    if (wishlistList.length === 0) {
        container.innerHTML = "<p style='text-align:center; color:#a9abb3;'>Your wishlist is empty.</p>";
    } else {
        wishlistList.forEach((item, index) => {
            container.innerHTML += `
                <div class="panel-item">
                    <img src="${item.image}" alt="${item.name}">
                    <div class="panel-item-details">
                        <h4>${item.name}</h4>
                        <p>₹${item.price}</p>
                        <button style="padding: 4px 8px; font-size: 10px; margin-top: 5px;" 
                                onclick="addCart('${item.name}', ${item.price}, '${item.image}'); removeFromWishlist(${index})">
                            Move to Bag
                        </button>
                    </div>
                </div>
            `;
        });
    }
}

// 4. Remove Functions
function removeFromCart(index) {
    cartList.splice(index, 1);
    document.getElementById("count").innerText = cartList.length;
    renderCart();
}

function removeFromWishlist(index) {
    wishlistList.splice(index, 1);
    document.getElementById("wishlist-count").innerText = wishlistList.length;
    if(wishlistList.length === 0) document.getElementById("wishlist-count").style.display = "none";
    renderWishlist();
}
// --- FLASH SALE COUNTDOWN LOGIC --- //
// Set countdown time in seconds (e.g., 5 hours, 30 minutes, 0 seconds)
let totalTime = (5 * 3600) + (30 * 60); 

function updateTimer() {
    let hours = Math.floor(totalTime / 3600);
    let minutes = Math.floor((totalTime % 3600) / 60);
    let seconds = totalTime % 60;

    // Format numbers to always show two digits (e.g., "09" instead of "9")
    document.getElementById("hours").innerText = hours < 10 ? "0" + hours : hours;
    document.getElementById("minutes").innerText = minutes < 10 ? "0" + minutes : minutes;
    document.getElementById("seconds").innerText = seconds < 10 ? "0" + seconds : seconds;

    if (totalTime > 0) {
        totalTime--;
    } else {
        // Optional: Reset timer when it hits 0 for demo purposes
        totalTime = (5 * 3600) + (30 * 60); 
    }
}

// Run the timer every second
setInterval(updateTimer, 1000);
updateTimer(); // Call immediately to avoid 1-second delay on load
// --- SCROLL EXPAND EFFECT --- //
window.addEventListener('scroll', () => {
    const section = document.getElementById('expand-section');
    
    // Get the exact position of the box relative to the viewport
    const sectionPos = section.getBoundingClientRect().top;
    const screenHeight = window.innerHeight;

    // If the top of the box reaches the middle of the screen (0.65 of the height)
    if (sectionPos < screenHeight * 0.65) {
        section.classList.add('expanded'); // Boom! Full screen
    } else {
        section.classList.remove('expanded'); // Shrink back down
    }
});
// --- CLEO-STYLE SCROLL ANIMATION --- //
window.addEventListener('scroll', () => {
    const track = document.getElementById('scroll-track');
    if (!track) return;

    // Get the exact dimensions and position of the scroll track
    const rect = track.getBoundingClientRect();
    
    // Calculate how far we've scrolled past the top of the track
    let scrollY = -rect.top;
    
    // Calculate the maximum distance we can scroll inside this track
    let maxScroll = rect.height - window.innerHeight;
    
    // Calculate progress as a percentage from 0 to 1
    let progress = scrollY / maxScroll;
    
    // Ensure progress doesn't go below 0 or above 1
    progress = Math.max(0, Math.min(1, progress));

    // Select the elements to animate
    const text = document.querySelector('.scroll-text');
    const phone = document.getElementById('app-mockup');
    const bg = document.querySelector('.scroll-bg');

    // 1. Animate the Text (Fades out and moves up in the first 30% of scroll)
    let textOpacity = 1 - (progress * 3); // Fades quickly
    text.style.opacity = Math.max(0, textOpacity);
    text.style.transform = `translateY(-${progress * 200}px)`;

    // 2. Animate the Background (Unblurs and brightens up)
    let blurAmount = 15 - (progress * 15); // Goes from 15px to 0px
    let brightness = 0.4 + (progress * 0.6); // Goes from 0.4 to 1.0
    let scale = 1.1 - (progress * 0.1); // Goes from 1.1 to 1.0
    
    bg.style.filter = `blur(${blurAmount}px) brightness(${brightness})`;
    bg.style.transform = `scale(${scale})`;

    // 3. Animate the Phone/App (Slides up from the bottom)
    // Starts at -100vh (bottom of screen), ends at center (around 10vh from bottom)
    let phoneY = -100 + (progress * 110); 
    
    // We use bottom instead of translateY so it sits nicely on the screen
    phone.style.bottom = `${Math.min(10, phoneY)}vh`; 
});
// --- ATYPICA SCROLL EXPANSION LOGIC --- //
window.addEventListener('scroll', () => {
    const track = document.getElementById('cinematic-scroll-track');
    if (!track) return;

    // Get track dimensions
    const rect = track.getBoundingClientRect();
    
    // Calculate progress (0 to 1)
    let scrollY = -rect.top;
    let maxScroll = rect.height - window.innerHeight;
    let progress = scrollY / maxScroll;
    progress = Math.max(0, Math.min(1, progress));

    const card = document.getElementById('cinematic-scroll-card');
    const teaser = document.querySelector('.cinematic-teaser');
    const content = document.querySelector('.cinematic-content');
    const bg = document.querySelector('.cinematic-bg');

    // 1. Calculate the expanding dimensions
    // Start at 600x400 (or slightly smaller on mobile), end at 100% window size
    let startWidth = window.innerWidth < 768 ? window.innerWidth * 0.9 : 600;
    let startHeight = window.innerWidth < 768 ? 300 : 400;
    
    let currentWidth = startWidth + ((window.innerWidth - startWidth) * progress);
    let currentHeight = startHeight + ((window.innerHeight - startHeight) * progress);
    let currentRadius = 24 - (24 * progress); // Goes from 24px corners to 0px (sharp)

    // Apply the expanding dimensions directly to the card
    card.style.width = `${currentWidth}px`;
    card.style.height = `${currentHeight}px`;
    card.style.borderRadius = `${currentRadius}px`;

    // 2. Fade out the "Teaser" text during the first 40% of the scroll
    let teaserOp = 1 - (progress * 2.5);
    teaser.style.opacity = Math.max(0, teaserOp);

    // 3. Fade in the "Content" during the last 40% of the scroll
    let contentOp = (progress - 0.6) * 2.5;
    content.style.opacity = Math.max(0, contentOp);
    
    // Prevent clicking the button when the content is invisible
    content.style.visibility = progress > 0.5 ? 'visible' : 'hidden';

    // 4. Subtly dim the background image as it expands
    bg.style.opacity = 0.8 - (progress * 0.3);
});