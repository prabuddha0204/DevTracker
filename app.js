// Scroll to top on refresh
window.onbeforeunload = function () {
  window.scrollTo(0, 0);
};

// Show hero on initial load
window.addEventListener("load", () => {
  document.querySelector(".hero")?.classList.add("show");
});

// Optional: Animate any hidden elements with Intersection Observer
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
});

document.querySelectorAll(".hidden").forEach((el) => observer.observe(el));

// Scroll animation logic
const hero = document.querySelector(".hero");
const subcontent = document.querySelector(".subcontent");

window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;
  const windowHeight = window.innerHeight;
  const subTop = subcontent.offsetTop;

  // Hide/show hero based on scroll
  if (scrollY > 100) {
    hero?.classList.add("hidden");
  } else {
    hero?.classList.remove("hidden");
  }

  // Smooth opacity for subcontent
  const distance = scrollY + windowHeight - subTop;
  const fadeStart = 100; // start fading in
  const fadeEnd = 300; // fully visible here

  if (distance > fadeStart) {
    let opacity = (distance - fadeStart) / (fadeEnd - fadeStart);
    opacity = Math.min(Math.max(opacity, 0.2), 1);
    subcontent.style.opacity = opacity;
    subcontent.style.transform = "translateY(0)";
  } else {
    subcontent.style.opacity = 0.2;
    subcontent.style.transform = "translateY(50px)";
  }
});

const addBtn = document.getElementById("addBtn");
const topicInput = document.getElementById("topicInput");
const list = document.querySelector(".neew");
const progressText = document.getElementById("progressText");

// Function to calculate progress
function calculateProgress() {
  const checkboxes = list.querySelectorAll('input[type="checkbox"]');
  const total = checkboxes.length;
  const checked = Array.from(checkboxes).filter((cb) => cb.checked).length;
  const percent = total > 0 ? Math.round((checked / total) * 100) : 0;

  progressText.textContent = `Progress: ${percent}%`;
  document.getElementById("progressFill").style.width = `${percent}%`;
}

// Initial calculation
calculateProgress();

// Recalculate on checkbox change
list.addEventListener("change", (e) => {
  if (e.target.type === "checkbox") {
    calculateProgress();
  }
});

// Add new topic
addBtn.addEventListener("click", () => {
  const newTopic = topicInput.value.trim();
  if (newTopic !== "") {
    const newLi = document.createElement("li");
    newLi.classList.add("nnew");
    newLi.innerHTML = `<input type="checkbox" class="neww"> ${newTopic}`;
    list.appendChild(newLi);
    topicInput.value = "";
    calculateProgress(); // update progress
  }
});

// Optional: allow Enter key to trigger add
topicInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    addBtn.click();
  }
});
