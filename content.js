class PersianTextFixer {
  constructor() {
    this.PERSIAN_THRESHOLD = 0.15;
    this.MIN_TEXT_LENGTH = 5;
  }

  isPersianText(text) {
    if (!text) return false;

    const clean = text.trim();

    if (clean.length < this.MIN_TEXT_LENGTH) {
      return false;
    }

    const persianChars =
      (
        clean.match(
          /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/g
        ) || []
      ).length;

    return (persianChars / clean.length) >= this.PERSIAN_THRESHOLD;
  }

  processElement(element) {
    const text = element.innerText || element.textContent;

    if (!text) return;

    if (!this.isPersianText(text)) {
      element.classList.remove("persian-text-container");
      return;
    }

    if (
      element.classList.contains("qwen-markdown-code-body")
    ) {
      return;
    }

    element.classList.add("persian-text-container");
  }

  fixInlineCodeDirection() {
    const selectors = [
      "code",
      ".qwen-markdown-codespan",
      "pre code"
    ];

    document
      .querySelectorAll(selectors.join(","))
      .forEach(el => {
        el.setAttribute("dir", "ltr");
      });
  }

  findChatElements() {
    const selectors = [
      "article",
      "div[data-message-author-role]",
      "div[class*='markdown']",
      "div[class*='prose']",
      "div[class*='message']",
      "div[class*='response']",
      "div[class*='answer']",
      ".qwen-markdown",
      ".custom-qwen-markdown",
      ".qwen-markdown-paragraph"
    ];

    return document.querySelectorAll(
      selectors.join(", ")
    );
  }

  processAllElements() {
    const elements = this.findChatElements();

    elements.forEach(element => {
      this.processElement(element);
    });

    this.fixInlineCodeDirection();
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
    console.log("🚀 Persian AI Text Fixer Started");

    this.processAllElements();

    setTimeout(() => this.processAllElements(), 1000);
    setTimeout(() => this.processAllElements(), 3000);
    setTimeout(() => this.processAllElements(), 5000);

    this.setupObserver();
  }
}

const fixer = new PersianTextFixer();

if (document.readyState === "loading") {
  document.addEventListener(
    "DOMContentLoaded",
    () => fixer.init()
  );
} else {
  fixer.init();
}