// 🦁 Lion Buddy Animation
const lion = document.getElementById("lion-buddy");
let blinkInterval;

function blinkLion() {
  lion.style.opacity = "0.5";
  setTimeout(() => {
    lion.style.opacity = "1";
  }, 200);
}

function yawnLion() {
  lion.style.transform = "scale(1.1)";
  setTimeout(() => {
    lion.style.transform = "scale(1)";
  }, 300);
}

if (lion) {
  lion.addEventListener("click", () => {
    yawnLion();
    blinkLion();
  });
  blinkInterval = setInterval(blinkLion, 5000);
}

// 🎵 Music System
const musicFiles = [
  "assets/theme_dark.mp3",
  "assets/theme_calm.mp3",
  "assets/theme_sad.mp3"
];

let currentTrack = new Audio(musicFiles[0]);
let hasInteracted = false;

function playMusic(index) {
  currentTrack.pause();
  currentTrack = new Audio(musicFiles[index]);
  currentTrack.loop = true;
  currentTrack.play();
}

document.addEventListener("click", () => {
  if (!hasInteracted) {
    playMusic(0);
    hasInteracted = true;
  }
});

document.addEventListener("scroll", () => {
  const text = document.querySelector(".chapter-text");
  if (!text) return;

  const calmTrigger = text.innerText.indexOf("It is time");
  const sadTrigger = text.innerText.indexOf("he left for the hospital");

  const scrollY = window.scrollY;

  if (scrollY > calmTrigger && scrollY < sadTrigger) {
    playMusic(1);
  } else if (scrollY > sadTrigger) {
    playMusic(2);
  }
});

// 🎵 Rune Button
const musicBtn = document.getElementById("playMusic");
if (musicBtn) {
  musicBtn.addEventListener("click", () => {
    playMusic(0);
  });
}

// 💬 Comment System with Firebase
const commentInput = document.getElementById("comment-input");
const commentList = document.getElementById("comments-list");
const submitBtn = document.getElementById("submit-comment");

const db = firebase.database();
const commentsRef = db.ref("comments");

// Function to render a comment
function addCommentToDOM(text) {
  const li = document.createElement("li");
  li.textContent = text;
  commentList.appendChild(li);
}

// Load existing comments in real-time
commentsRef.on("child_added", (snapshot) => {
  addCommentToDOM(snapshot.val().text);
});

// Submit new comment
if (submitBtn) {
  submitBtn.addEventListener("click", () => {
    const text = commentInput.value.trim();
    if (!text) return;

    // Push to Firebase
    commentsRef.push({ text: text });

    // Clear input
    commentInput.value = "";
  });
}
