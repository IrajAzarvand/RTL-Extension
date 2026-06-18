class PersianTextFixer {
  constructor() {
    this.PERSIAN_THRESHOLD = 0.15;
    this.MIN_TEXT_LENGTH = 5;
  }

  isPersianText(text) {
    if (!text) return false;

    const cleanText = text.trim();

    if (cleanText.length < this.MIN_TEXT_LENGTH) {
      return false;
    }

    const persianChars =
      (
        cleanText.match(
          /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/g
        ) || []
      ).length;

    const totalChars = cleanText.length;

    if (totalChars === 0) {
      return false;
    }

    return (persianChars / totalChars) >= this.PERSIAN_THRESHOLD;
  }

  processElement(element) {
    const text = element.innerText || element.textContent;

    if (!text) return;

    if (this.isPersianText(text)) {
      element.classList.add("persian-text-container");
    } else {
      element.classList.remove("persian-text-container");
    }
  }

  findChatElements() {
    const selectors = [
      'div[data-message-author-role="assistant"]',
      'div[class*="message-content"]',
      'div[class*="markdown"]',
      'div[class*="prose"]',
      'article',
      'div[class*="response"]',
      'div[class*="answer"]'
    ];

    return document.querySelectorAll(selectors.join(", "));
  }

  processAllElements() {
    const elements = this.findChatElements();

    elements.forEach((element) => {
      this.processElement(element);
    });
  }

  setupObserver() {
    const observer = new MutationObserver(() => {
      clearTimeout(this.timer);

      this.timer = setTimeout(() => {
        this.processAllElements();
      }, 300);
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true
    });
  }

  init() {
    console.log("🚀 Persian AI Text Fixer Loaded");

    this.processAllElements();

    setTimeout(() => this.processAllElements(), 1000);
    setTimeout(() => this.processAllElements(), 3000);
    setTimeout(() => this.processAllElements(), 5000);

    this.setupObserver();
  }
}

const fixer = new PersianTextFixer();

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    fixer.init();
  });
} else {
  fixer.init();
}