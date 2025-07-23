document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();
    document.getElementById('formMessage').textContent = 'Thank you for reaching out! I will get back to you soon.';
    document.getElementById('contactForm').reset();
});

// Testimonials carousel logic
const testimonials = document.querySelectorAll('.testimonial');
const prevBtn = document.querySelector('.carousel-btn.prev');
const nextBtn = document.querySelector('.carousel-btn.next');
let currentTestimonial = 0;

function showTestimonial(index) {
    testimonials.forEach((el, i) => {
        el.classList.toggle('active', i === index);
    });
}
if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => {
        currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
        showTestimonial(currentTestimonial);
    });
    nextBtn.addEventListener('click', () => {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    });
}
// Show the first testimonial by default
showTestimonial(currentTestimonial);

// Animate skill bars on page load
window.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.progress').forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        setTimeout(() => {
            bar.style.width = width;
        }, 300);
    });
});
// Light/Dark mode toggle
const themeBtn = document.getElementById('toggle-theme');
if (themeBtn) {
    themeBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
    });
}

// Typing animation for About section
const typingElement = document.getElementById('typing');
const typingTexts = [
    "I'm Shatabdi Thapa",
    "Web Developer",
    "UI/UX Enthusiast",
    "Problem Solver"
];
let typingIndex = 0;
let charIndex = 0;
let isDeleting = false;
function type() {
    if (!typingElement) return;
    const currentText = typingTexts[typingIndex];
    if (isDeleting) {
        typingElement.textContent = currentText.substring(0, charIndex--);
        if (charIndex < 0) {
            isDeleting = false;
            typingIndex = (typingIndex + 1) % typingTexts.length;
            setTimeout(type, 700);
        } else {
            setTimeout(type, 40);
        }
    } else {
        typingElement.textContent = currentText.substring(0, charIndex++);
        if (charIndex > currentText.length) {
            isDeleting = true;
            setTimeout(type, 1200);
        } else {
            setTimeout(type, 80);
        }
    }
}
type();

// Project modal popup logic
const modal = document.getElementById('project-modal');
const modalTitle = document.getElementById('modal-title');
const modalDescription = document.getElementById('modal-description');
const modalBadges = document.getElementById('modal-badges');
const modalDemo = document.getElementById('modal-demo');
const modalGithub = document.getElementById('modal-github');
const modalImage = document.getElementById('modal-image');
const modalDetails = document.getElementById('modal-details');
const closeModal = document.querySelector('.close-modal');

document.querySelectorAll('.details-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        const card = e.target.closest('.project-card');
        modalTitle.textContent = card.dataset.title;
        modalDescription.textContent = card.dataset.description;
        modalImage.src = card.dataset.image;
        modalBadges.innerHTML = '';
        card.dataset.tech.split(',').forEach(tech => {
            const badge = document.createElement('span');
            badge.className = 'badge';
            badge.textContent = tech.trim();
            modalBadges.appendChild(badge);
        });
        modalDemo.href = card.dataset.demo;
        modalGithub.href = card.dataset.github;
        modalDetails.textContent = card.dataset.details;
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    });
});
if (closeModal) {
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    });
}
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }
});
// Animate project cards on scroll (if not already visible)
function animateProjectCards() {
    document.querySelectorAll('.project-card').forEach(card => {
        const rect = card.getBoundingClientRect();
        if (rect.top < window.innerHeight - 60) {
            card.style.animationPlayState = 'running';
        }
    });
}
window.addEventListener('scroll', animateProjectCards);
window.addEventListener('DOMContentLoaded', animateProjectCards);

// Project filtering logic
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.dataset.filter;
        projectCards.forEach(card => {
            if (filter === 'all' || card.dataset.tags.includes(filter)) {
                card.style.display = '';
                setTimeout(() => { card.style.opacity = 1; }, 10);
            } else {
                card.style.opacity = 0;
                setTimeout(() => { card.style.display = 'none'; }, 200);
            }
        });
    });
});

// Project search logic
const searchInput = document.getElementById('project-search');
searchInput.addEventListener('input', function() {
    const query = searchInput.value.toLowerCase();
    projectCards.forEach(card => {
        const title = card.dataset.title.toLowerCase();
        const desc = card.dataset.description.toLowerCase();
        if (title.includes(query) || desc.includes(query)) {
            card.style.display = '';
            setTimeout(() => { card.style.opacity = 1; }, 10);
        } else {
            card.style.opacity = 0;
            setTimeout(() => { card.style.display = 'none'; }, 200);
        }
        // Highlight matching tags
        card.querySelectorAll('.badge').forEach(badge => {
            if (badge.textContent.toLowerCase().includes(query) && query.length > 0) {
                badge.classList.add('highlight');
            } else {
                badge.classList.remove('highlight');
            }
        });
    });
});
// Featured toggle logic
const featuredToggle = document.getElementById('featured-toggle');
let showFeatured = false;
featuredToggle.addEventListener('click', function() {
    showFeatured = !showFeatured;
    featuredToggle.classList.toggle('active', showFeatured);
    projectCards.forEach(card => {
        if (!showFeatured || card.classList.contains('featured')) {
            card.style.display = '';
            setTimeout(() => { card.style.opacity = 1; }, 10);
        } else {
            card.style.opacity = 0;
            setTimeout(() => { card.style.display = 'none'; }, 200);
        }
    });
});

// Animate contact cards on scroll
function animateContactCards() {
    document.querySelectorAll('.contact-card').forEach(card => {
        const rect = card.getBoundingClientRect();
        if (rect.top < window.innerHeight - 60) {
            card.style.animationPlayState = 'running';
        }
    });
}
window.addEventListener('scroll', animateContactCards);
window.addEventListener('DOMContentLoaded', animateContactCards);
// Copy email to clipboard
const copyBtn = document.querySelector('.copy-btn');
if (copyBtn) {
    copyBtn.addEventListener('click', () => {
        const email = document.getElementById('contact-email').textContent;
        navigator.clipboard.writeText(email).then(() => {
            copyBtn.textContent = 'Copied!';
            setTimeout(() => { copyBtn.textContent = 'Copy'; }, 1200);
        });
    });
}
// Floating label for textarea
const textareas = document.querySelectorAll('.contact-form textarea');
textareas.forEach(textarea => {
    textarea.addEventListener('input', function() {
        if (this.value.length > 0) {
            this.classList.add('filled');
        } else {
            this.classList.remove('filled');
        }
    });
});
// Real-time validation
const contactForm = document.getElementById('contactForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');
const errorName = document.getElementById('error-name');
const errorEmail = document.getElementById('error-email');
const errorMessage = document.getElementById('error-message');
function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
function validateForm() {
    let valid = true;
    if (nameInput.value.trim().length < 2) {
        errorName.textContent = 'Please enter your name.';
        valid = false;
    } else {
        errorName.textContent = '';
    }
    if (!validateEmail(emailInput.value)) {
        errorEmail.textContent = 'Please enter a valid email.';
        valid = false;
    } else {
        errorEmail.textContent = '';
    }
    if (messageInput.value.trim().length < 5) {
        errorMessage.textContent = 'Message must be at least 5 characters.';
        valid = false;
    } else {
        errorMessage.textContent = '';
    }
    return valid;
}
[nameInput, emailInput, messageInput].forEach(input => {
    input.addEventListener('input', validateForm);
});
// Success animation on submit
contactForm.addEventListener('submit', function(event) {
    event.preventDefault();
    if (validateForm()) {
        document.getElementById('formMessage').textContent = '';
        document.getElementById('formSuccessAnimation').style.display = 'flex';
        setTimeout(() => {
            document.getElementById('formSuccessAnimation').style.display = 'none';
            contactForm.reset();
        }, 1800);
    } else {
        document.getElementById('formMessage').textContent = 'Please fix the errors above.';
    }
});
// Animated bubbles background for contact section
function createBubbles() {
    const bg = document.getElementById('contact-bg-anim');
    if (!bg) return;
    bg.innerHTML = '';
    const numBubbles = 18;
    for (let i = 0; i < numBubbles; i++) {
        const bubble = document.createElement('div');
        bubble.className = 'bubble';
        const size = Math.random() * 48 + 32;
        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;
        bubble.style.left = `${Math.random() * 100}%`;
        bubble.style.animationDuration = `${10 + Math.random() * 8}s`;
        bubble.style.animationDelay = `${Math.random() * 8}s`;
        bg.appendChild(bubble);
    }
}
window.addEventListener('DOMContentLoaded', createBubbles);
window.addEventListener('resize', createBubbles);
// Chatbot widget logic
const chatbotToggle = document.getElementById('chatbot-toggle');
const chatbotWindow = document.getElementById('chatbot-window');
const chatbotClose = document.getElementById('chatbot-close');
// Chatbot memory and file upload
let userName = '';
const chatbotForm = document.getElementById('chatbot-form');
const chatbotInput = document.getElementById('chatbot-input');
const chatbotMessages = document.getElementById('chatbot-messages');
// Add file input to chatbot form
if (chatbotForm && !document.getElementById('chatbot-file')) {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.id = 'chatbot-file';
    fileInput.style.display = 'none';
    chatbotForm.appendChild(fileInput);
    const fileBtn = document.createElement('button');
    fileBtn.type = 'button';
    fileBtn.id = 'chatbot-file-btn';
    fileBtn.title = 'Send file';
    fileBtn.innerHTML = '📎';
    fileBtn.style.marginLeft = '6px';
    fileBtn.style.fontSize = '1.3em';
    fileBtn.style.background = '#fff';
    fileBtn.style.border = 'none';
    fileBtn.style.borderRadius = '50%';
    fileBtn.style.width = '38px';
    fileBtn.style.height = '38px';
    fileBtn.style.cursor = 'pointer';
    chatbotForm.appendChild(fileBtn);
    fileBtn.addEventListener('click', () => fileInput.click());
    fileInput.addEventListener('change', function() {
        if (fileInput.files.length > 0) {
            const file = fileInput.files[0];
            const userMsg = document.createElement('div');
            userMsg.className = 'chatbot-msg user';
            userMsg.textContent = `Sent file: ${file.name}`;
            chatbotMessages.appendChild(userMsg);
            setTimeout(() => {
                const botMsg = document.createElement('div');
                botMsg.className = 'chatbot-msg bot';
                botMsg.innerHTML = `<img src="https://api.dicebear.com/7.x/bottts/svg?seed=AI" alt="Chatbot Avatar" class="chatbot-avatar-inline" />Thanks for sending the file, ${userName || 'friend'}!`;
                chatbotMessages.appendChild(botMsg);
                scrollChatToBottom();
            }, 700);
            scrollChatToBottom();
        }
    });
}
function scrollChatToBottom() {
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}
if (chatbotToggle && chatbotWindow) {
    chatbotToggle.addEventListener('click', () => {
        chatbotWindow.style.display = chatbotWindow.style.display === 'none' ? 'flex' : 'none';
        scrollChatToBottom();
    });
}
if (chatbotClose) {
    chatbotClose.addEventListener('click', () => {
        chatbotWindow.style.display = 'none';
    });
}
// Voice input for chatbot
const voiceBtn = document.getElementById('chatbot-voice');
let recognition;
if (window.SpeechRecognition || window.webkitSpeechRecognition) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    let listening = false;
    voiceBtn.addEventListener('click', () => {
        if (!listening) {
            recognition.start();
            voiceBtn.classList.add('active');
        } else {
            recognition.stop();
            voiceBtn.classList.remove('active');
        }
        listening = !listening;
    });
    recognition.onresult = function(event) {
        const transcript = event.results[0][0].transcript;
        chatbotInput.value = transcript;
        voiceBtn.classList.remove('active');
        listening = false;
        chatbotInput.focus();
    };
    recognition.onerror = function() {
        voiceBtn.classList.remove('active');
        listening = false;
    };
    recognition.onend = function() {
        voiceBtn.classList.remove('active');
        listening = false;
    };
} else {
    voiceBtn.style.display = 'none';
}
// Patch chatbot message rendering to support memory
if (chatbotForm) {
    chatbotForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const msg = chatbotInput.value.trim();
        if (!msg) return;
        const userMsg = document.createElement('div');
        userMsg.className = 'chatbot-msg user';
        userMsg.textContent = msg;
        chatbotMessages.appendChild(userMsg);
        chatbotInput.value = '';
        scrollChatToBottom();
        setTimeout(() => {
            const botMsg = document.createElement('div');
            botMsg.className = 'chatbot-msg bot';
            botMsg.innerHTML = getBotReply(msg);
            chatbotMessages.appendChild(botMsg);
            scrollChatToBottom();
        }, 700);
    });
}
// Persistent chat history
function saveChatHistory() {
    localStorage.setItem('chatbotHistory', chatbotMessages.innerHTML);
    localStorage.setItem('chatbotUserName', userName);
    localStorage.setItem('chatbotLang', chatbotLang);
}
function loadChatHistory() {
    const history = localStorage.getItem('chatbotHistory');
    if (history) chatbotMessages.innerHTML = history;
    const savedName = localStorage.getItem('chatbotUserName');
    if (savedName) userName = savedName;
    const savedLang = localStorage.getItem('chatbotLang');
    if (savedLang) chatbotLang = savedLang;
}
window.addEventListener('DOMContentLoaded', loadChatHistory);
// Save on every message
const observer = new MutationObserver(saveChatHistory);
observer.observe(chatbotMessages, { childList: true, subtree: true });
// Multi-language support (English/Hindi)
let chatbotLang = 'en';
if (!document.getElementById('chatbot-lang-toggle')) {
    const langBtn = document.createElement('button');
    langBtn.id = 'chatbot-lang-toggle';
    langBtn.type = 'button';
    langBtn.title = 'Switch language';
    langBtn.style.marginLeft = '6px';
    langBtn.style.background = '#fff';
    langBtn.style.border = 'none';
    langBtn.style.borderRadius = '50%';
    langBtn.style.width = '38px';
    langBtn.style.height = '38px';
    langBtn.style.cursor = 'pointer';
    langBtn.style.fontSize = '1.1em';
    langBtn.textContent = '🌐';
    chatbotForm.appendChild(langBtn);
    langBtn.addEventListener('click', () => {
        chatbotLang = chatbotLang === 'en' ? 'hi' : 'en';
        langBtn.textContent = chatbotLang === 'en' ? '🌐' : '🇮🇳';
        saveChatHistory();
        const botMsg = document.createElement('div');
        botMsg.className = 'chatbot-msg bot';
        botMsg.innerHTML = chatbotLang === 'en'
            ? `<img src="https://api.dicebear.com/7.x/bottts/svg?seed=AI" alt="Chatbot Avatar" class="chatbot-avatar-inline" />Language switched to English.`
            : `<img src="https://api.dicebear.com/7.x/bottts/svg?seed=AI" alt="Chatbot Avatar" class="chatbot-avatar-inline" />भाषा हिंदी में बदल गई है।`;
        chatbotMessages.appendChild(botMsg);
        scrollChatToBottom();
    });
}
// Fun facts for AI simulation
const funFacts = [
    'Did you know? The first website was published in 1991 by Tim Berners-Lee.',
    'Fun fact: JavaScript was created in just 10 days!',
    'The first email was sent in 1971 by Ray Tomlinson.',
    'HTML stands for HyperText Markup Language.',
    'CSS was first proposed by Håkon Wium Lie in 1994.'
];
const funFactsHi = [
    'क्या आप जानते हैं? पहली वेबसाइट 1991 में प्रकाशित हुई थी।',
    'रोचक तथ्य: जावास्क्रिप्ट केवल 10 दिनों में बनाई गई थी!',
    'पहला ईमेल 1971 में भेजा गया था।',
    'HTML का मतलब है HyperText Markup Language।',
    'CSS को पहली बार 1994 में प्रस्तावित किया गया था।'
];
function getBotReply(msg) {
    const lower = msg.toLowerCase();
    let reply = '';
    // Name memory
    if (chatbotLang === 'hi') {
        if (lower.startsWith('मेरा नाम') || lower.startsWith('मैं ')) {
            userName = msg.replace(/^(मेरा नाम|मैं)\s+/i, '').split(' ')[0];
            reply = `आपसे मिलकर खुशी हुई, ${userName}! मैं आपकी कैसे मदद कर सकता हूँ?`;
        } else if (userName && (lower.includes('नमस्ते') || lower.includes('हाय'))) {
            reply = `नमस्ते, ${userName}! 👋 मैं आपकी कैसे मदद कर सकता हूँ?`;
        } else if (lower.includes('ईमेल')) reply = 'आप मुझे your@email.com पर ईमेल कर सकते हैं।';
        else if (lower.includes('फोन') || lower.includes('कॉल')) reply = 'मेरा फोन नंबर है +1 234 567 8901.';
        else if (lower.includes('स्थान') || lower.includes('पता')) reply = 'मैं सैन फ्रांसिस्को, CA में स्थित हूँ।';
        else if (lower.includes('प्रोजेक्ट')) reply = 'मेरे प्रोजेक्ट्स ऊपर देखें! अधिक जानकारी के लिए "More Details" पर क्लिक करें।';
        else if (lower.includes('अलविदा')) reply = `अलविदा${userName ? ', ' + userName : ''}! आपका दिन शुभ हो!`;
        else reply = userName ? `मैं आपकी मदद के लिए यहाँ हूँ, ${userName}!` : funFactsHi[Math.floor(Math.random() * funFactsHi.length)];
    } else {
        if (lower.startsWith('my name is ') || lower.startsWith("i am ")) {
            userName = msg.replace(/^(my name is|i am)\s+/i, '').split(' ')[0];
            reply = `Nice to meet you, ${userName}! How can I help you?`;
        } else if (userName && (lower.includes('hello') || lower.includes('hi'))) {
            reply = `Hello, ${userName}! 👋 How can I assist you?`;
        } else if (lower.includes('email')) reply = 'You can email me at your@email.com.';
        else if (lower.includes('phone') || lower.includes('call')) reply = 'My phone number is +1 234 567 8901.';
        else if (lower.includes('location') || lower.includes('address')) reply = 'I am based in San Francisco, CA.';
        else if (lower.includes('project')) reply = 'Check out my projects above! Click "More Details" for info.';
        else if (lower.includes('bye')) reply = `Goodbye${userName ? ', ' + userName : ''}! Have a great day!`;
        else reply = userName ? `I'm here to help, ${userName}!` : funFacts[Math.floor(Math.random() * funFacts.length)];
    }
    return `<img src=\"https://api.dicebear.com/7.x/bottts/svg?seed=AI\" alt=\"Chatbot Avatar\" class=\"chatbot-avatar-inline\" />${reply}`;
}
// Back to top button logic
const backToTopBtn = document.getElementById('back-to-top');
if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    function toggleBackToTop() {
        if (window.scrollY > 200) {
            backToTopBtn.style.opacity = '1';
            backToTopBtn.style.pointerEvents = 'auto';
        } else {
            backToTopBtn.style.opacity = '0';
            backToTopBtn.style.pointerEvents = 'none';
        }
    }
    backToTopBtn.style.transition = 'opacity 0.3s';
    backToTopBtn.style.opacity = '0';
    backToTopBtn.style.pointerEvents = 'none';
    window.addEventListener('scroll', toggleBackToTop);
    window.addEventListener('DOMContentLoaded', toggleBackToTop);
}
// Newsletter signup logic
const newsletterForm = document.getElementById('newsletter-form');
const newsletterEmail = document.getElementById('newsletter-email');
const newsletterMsg = document.getElementById('newsletter-message');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = newsletterEmail.value.trim();
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            newsletterMsg.textContent = 'Please enter a valid email.';
            newsletterMsg.style.color = '#e44d26';
            return;
        }
        newsletterMsg.textContent = 'Thank you for subscribing!';
        newsletterMsg.style.color = '#61dafb';
        newsletterForm.reset();
        setTimeout(() => { newsletterMsg.textContent = ''; }, 2500);
    });
}
// Dynamic copyright year
const footerYear = document.getElementById('footer-year');
if (footerYear) {
    footerYear.textContent = new Date().getFullYear();
} 


// Mobile-specific adjustments
function handleMobileLayout() {
  if (window.innerWidth < 768) {
    // Adjust testimonial carousel for mobile
    const testimonials = document.querySelectorAll('.testimonial');
    testimonials.forEach(testimonial => {
      testimonial.style.flexDirection = 'column';
      testimonial.style.textAlign = 'center';
    });

    // Ensure all buttons have proper touch targets
    document.querySelectorAll('.btn').forEach(btn => {
      btn.style.minHeight = '44px';
      btn.style.minWidth = '44px';
    });
  }
}

// Run on load and resize
window.addEventListener('DOMContentLoaded', handleMobileLayout);
window.addEventListener('resize', handleMobileLayout);

// Prevent zoom on form inputs
document.addEventListener('DOMContentLoaded', function() {
  if (window.innerWidth < 768) {
    document.querySelectorAll('input, select, textarea').forEach(el => {
      el.style.fontSize = '16px';
    });
  }
});

// Function to check and fix any overflowing elements
function fixOverflow() {
  if (window.innerWidth < 768) {
    // Find all elements that might cause overflow
    document.querySelectorAll('*').forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.right > window.innerWidth) {
        // Apply fixes to overflowing elements
        el.style.maxWidth = '100%';
        el.style.overflow = 'hidden';
        
        // Special cases
        if (el.classList.contains('project-card')) {
          el.style.width = 'calc(100% - 16px)';
        }
        
        if (el.classList.contains('testimonial-carousel')) {
          el.style.padding = '16px';
        }
      }
    });
  }
}

// Run on load and resize
window.addEventListener('DOMContentLoaded', fixOverflow);
window.addEventListener('resize', fixOverflow);

// Prevent zoom on form inputs (which can cause horizontal scroll)
document.addEventListener('DOMContentLoaded', function() {
  if (window.innerWidth < 768) {
    document.querySelectorAll('input, select, textarea').forEach(el => {
      el.style.fontSize = '16px';
    });
  }
});