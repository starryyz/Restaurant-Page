const attachedHeader = document.querySelector('.attachedHeader-section');
const scrollTrigger = 280; 

window.addEventListener('scroll', () => {
  if (window.scrollY > scrollTrigger) {
    attachedHeader.style.display = 'block';
  } else {
    attachedHeader.style.display = 'none';
  }
});


const cloud = document.querySelector(".text-wrapper");
let hasAnimated = false;

window.addEventListener("scroll", () => {
  if (!hasAnimated && window.scrollY > 300) {
    cloud.classList.add("animate__animated", "animate__bounceIn");
    hasAnimated = true;
  }
});
