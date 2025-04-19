document.addEventListener("DOMContentLoaded", () => {
    const viewButtons = document.querySelectorAll(".view-project-btn");
    const modal = document.getElementById("project-modal");
    const modalContent = document.getElementById("expanded-content");
    const closeButton = document.querySelector(".close-button");
if (closeButton) {
  closeButton.addEventListener("click", () => {
    modal.classList.remove("show");
    modalContent.innerHTML = "";
  });
}
  
    // === Close modal with close button (only if it exists)
    if (closeButton) {
      closeButton.addEventListener("click", () => {
        modal.classList.remove("show");
        modalContent.innerHTML = "";
      });
    }
  
    // === Photo Lightbox Logic ===
    const photoThumbs = document.querySelectorAll(".photo-thumb");
    const photoModal = document.getElementById("photo-modal");
    const photoModalImg = document.getElementById("modal-img");
  
    if (photoModal) {
      photoModal.addEventListener("click", (e) => {
        if (e.target === photoModal) {
          photoModal.classList.add("hidden");
        }
      });
    }
  
    photoThumbs.forEach((thumb) => {
      thumb.addEventListener("click", () => {
        photoModalImg.src = thumb.src;
        photoModal.classList.remove("hidden");
      });
    });
  
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        if (photoModal) {
          photoModal.classList.add("hidden");
        }
        if (modal) {
          modal.classList.remove("show");
          modalContent.innerHTML = "";
        }
      }
    });
  
    const blogData = {
      post1: {
        title: "The Journey to nethull.com",
        intro: "How I made my personal site!(With a lot of struggles and wins).",
        content: `
          <p>I started with basically no experience in deploying full on websites. At first I just wanted a simple static website with everything about me, but I went beyond that and found out how far you could go(well, actually, I have not reached the end of the tunnel yet, if there is one).</p>
          <p>I learned how to build with HTML, CSS, and Javascript, messed up a ton of layouts, accidentally broke the dark mode, but eventually made it all work! And after I got the basics, the rest just clicked into place!</p>
          <p>Version 1.0 was cool. But version 2.0? It's rebuilt from the ground up, I went and changed how everything looked, and added even more interactivity, making it way easier to explore and way more attractive.</p>
        `
      },
      post2: {
        title: "How I learned Python",
        intro: "How I learned the coding language Python (in middle school!)",
        content: `
          <p>It all started when I got python as my first elective in 6th grade.</p>
          <p>I got introduced to Python, well I saw my brother do it and all of that, but when I got to use it firsthand, I loved it from the first day...</p>
          <p>... I made a phone, all in python, you could talk to AI, set an alarm, get notifications, and more! I also made a chatbot directly in python, powered by the OpenAI API...</p>
        `
      }
    };
  
    Object.entries(blogData).forEach(([id, { content }]) => {
      const words = content.replace(/<[^>]+>/g, '').split(/\s+/).length;
      const readTime = Math.ceil(words / 200);
      const readTimeElement = document.getElementById(`${id}-read-time`);
      if (readTimeElement) {
        readTimeElement.textContent = `🕒 ${readTime} min read`;
      }
    });
  
    const projectData = {
      chatbot: {
        title: "Chatbot in Python",
        description: "A GPT-powered chatbot with theme switching and memory.",
        details: "This was a chatbot built fully in Python and Pygame with many AI models you could choose, and you could switch themes and more!",
      },
      phone: {
        title: "Python Phone",
        description: "A phone you can interact with, all in python",
        details: "I made a phone in python and pygame that you can interact with, you can set timers, talk to AIs, get notifications, change the wallpaper, see the weather for the current day and next 7 days in the weather app, and more, everything is in separate apps that you can click on to open"
      }
    };
  
    viewButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const card = btn.closest(".project-card");
        const projectId = card.getAttribute("data-id");
  
        if (projectData[projectId]) {
          const { title, description, details } = projectData[projectId];
          modalContent.innerHTML = `
            <h2>${title}</h2>
            <p><strong>${description}</strong></p>
            <p>${details}</p>
          `;
        } else if (blogData[projectId]) {
          const { title, intro, content: blogContent } = blogData[projectId];
  
          modalContent.innerHTML = `
            <h2>${title}</h2>
            <p class="blog-intro"><strong>${intro}</strong></p>
            <p class="read-time" style="color: gray; margin-top: -0.5rem; margin-bottom: 1.5rem;"></p>
            ${blogContent}
          `;
  
          const words = blogContent.replace(/<[^>]+>/g, '').split(/\s+/).length;
          const readTime = Math.ceil(words / 200);
          modalContent.querySelector(".read-time").textContent = `🕒 ${readTime} min read`;
        }
  
        modal.classList.add("show");
      });
    });
  
    // Clicking outside modal-content closes it
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.classList.remove("show");
        modalContent.innerHTML = "";
      }
    });
  });
  
  // Global function used by photo modal's close button
  function closeModal() {
    document.getElementById("photo-modal").classList.add("hidden");
  }