document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("musicModal");
  const playMusicBtn = document.getElementById("playMusic");
  const noMusicBtn = document.getElementById("noMusic");
  const backgroundMusic = document.getElementById("backgroundMusic");
  const modalContainer = document.getElementById("musicModalContainer");

  function disableScrolling() {
    document.body.style.overflow = "hidden";
  }

  function enableScrolling() {
    document.body.style.overflow = "";
  }

  function openModal() {
    modal.style.display = "flex";
    modalContainer.classList.remove("fade-out"); // Ensure it's not fading out
    setTimeout(() => {
      modal.classList.add("fade-in"); // Add the fade-in class after the modal appears
    }, 10); // Small delay to ensure class is added after the modal is visible
  }

  function closeModal() {
    modalContainer.classList.add("fade-out"); // Trigger the fade-out animation
    // Wait for the fade-out animation to finish before hiding the modal
    modal.addEventListener("animationend", () => {
      modal.style.display = "none";
    });
  }

  disableScrolling();
  openModal();

  playMusicBtn.addEventListener("click", () => {
    backgroundMusic.play();
    closeModal();
    enableScrolling();
  });

  noMusicBtn.addEventListener("click", () => {
    closeModal();
    enableScrolling();
  });
});