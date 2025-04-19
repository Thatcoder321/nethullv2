document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("project-modal");
    const modalContent = document.getElementById("expanded-content");
    const closeButton = document.querySelector(".close-button");
    const nerdStuffChangelog = `
🔄 Version History for nethull.com

📌 Version 2.0 – April 19, 2025
• Full visual redesign (layout, fonts, animations)
• Floating chatbot with GPT-4o
• Mobile responsive redesign
• Photos page with image expansion
• All modals rewritten with smooth transitions
• Internal chatbot context system
• Nerd Stuff redesigned into proper changelog layout

📌 Version 1.2 – April 15, 2025
• Chatbot memory (remembers last 5 messages)
• Typing indicator added
• Dark mode now default
• Polished Inter font applied site-wide
• About page restructured
• Resume & contact card added
• New tab: Nerd Stuff

📌 Version 1.1 – April 14, 2025
• Full public launch
• Built with HTML, CSS, JavaScript
• GPT chatbot with daily request limits
• Page structure: Home, Projects, About, Blog
• Deployed to Netlify at nethull.com

📌 Version 1.0 – April 13, 2025
• Initial launch with static content
• Same navigation layout as now
• No chatbot or interactive features yet
`;
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
        details: "This was a chatbot built fully in python and pygame with many AI models to choose from. I used the OpenAI API for the models, and you can also change between themes!"
      },
      phone: {
        title: "Python Phone",
        description: "A phone you can interact with, all in python",
        details: "I made a phone in python and pygame that you can interact with. You can set timers, talk to AI, get notifications, change wallpaper, and see 7-day weather forecasts."
      }
    };
  
    const viewButtons = document.querySelectorAll(".view-project-btn");
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
        document.body.classList.add("modal-open");
      });
    });
  
    if (closeButton) {
      closeButton.addEventListener("click", () => {
        modal.classList.remove("show");
        modalContent.innerHTML = "";
        document.body.classList.remove("modal-open");
        
      });
    }
  
    if (modal) {
      modal.addEventListener("click", (e) => {
        if (e.target === modal) {
          modal.classList.remove("show");
          modalContent.innerHTML = "";
        }
      });
    }
  
    const photoThumbs = document.querySelectorAll(".photo-thumb");
    const photoModal = document.getElementById("photo-modal");
    const photoModalImg = document.getElementById("modal-img");
  
    photoThumbs.forEach((thumb) => {
        thumb.addEventListener("click", () => {
          photoModalImg.src = thumb.getAttribute("src");
          photoModal.classList.remove("hidden");
          document.body.classList.add("modal-open"); // ✅ Lock scroll
        });
      });
      
      if (photoModal) {
        photoModal.addEventListener("click", (e) => {
          const clickedInside = document.querySelector(".modal-content").contains(e.target);
          if (!clickedInside) {
            photoModal.classList.add("hidden");
            photoModalImg.src = "";
            document.body.classList.remove("modal-open"); // ✅ Unlock scroll
          }
        });
      }
  
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        if (photoModal) photoModal.classList.add("hidden");
        if (modal) modal.classList.remove("show");
      }
    });
  
    const bubble = document.getElementById("chatbot-bubble");
    const chatbotContainer = document.getElementById("chatbot-container");
    const chatForm = document.getElementById("chat-form");
    const chatInput = document.getElementById("chat-input");
    const chatMessages = document.getElementById("chat-messages");
    if (bubble && chatbotContainer) {
        bubble.addEventListener("click", () => {
          chatbotContainer.classList.toggle("hidden");
        });
      }
  
      if (chatForm) {
        chatForm.addEventListener("submit", async function (e) {
          e.preventDefault();
          const msg = chatInput.value.trim();
          if (!msg) return;
      
          const rawContext = document.querySelector('meta[name="chat-context"]')?.content || document.title;
      
          const fullContext = rawContext.includes("version history")
            ? `${rawContext}\n\nHere is the full changelog:\n${nerdStuffChangelog}`
            : rawContext;
  
        chatMessages.innerHTML += `<div><strong>You:</strong> ${msg}</div>`;
        chatInput.value = "";
  
        try {
            
            const res = await fetch("/api/chatgpt", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: msg, context: fullContext })
              });
  
          const data = await res.json();
          if (data.reply) {
            chatMessages.innerHTML += `<div><strong>Nethul:</strong> ${data.reply}</div>`;
          } else {
            chatMessages.innerHTML += `<div><strong>Nethul:</strong> Sorry, something went wrong.</div>`;
          }
        } catch (err) {
          console.error("Chat error:", err);
          chatMessages.innerHTML += `<div><strong>Nethul:</strong> Error contacting GPT.</div>`;
        }
  
        chatMessages.scrollTop = chatMessages.scrollHeight;
      });
    }
  });
  