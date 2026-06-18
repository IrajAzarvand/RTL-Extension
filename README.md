# Persian AI Text Fixer

یک افزونه کروم برای رفع مشکل راست‌به‌چپ (RTL) در سایت‌های چت هوش مصنوعی. این افزونه متن‌های فارسی را تشخیص داده و به صورت خودکار چیدمان، جهت متن و ویژگی‌های RTL را روی آن‌ها اعمال می‌کند.

## نصب و راه‌اندازی

1. کلون یا دانلود این مخزن
2. کروم را باز کنید و به مسیر `chrome://extensions/` بروید
3. گزینه **Developer mode** (حالت توسعه‌دهنده) را فعال کنید
4. دکمه **Load unpacked** را بزنید
5. پوشه پروژه را انتخاب کنید

افزونه به مرحله نهایی اضافه شده و به صورت خودکار روی سایت‌های AI فعال خواهد بود.

## نحوه کار

افزونه با استفاده از اسکریپت محتوا (Content Script) به صفحه وب متصل می‌شود:

- المان‌های متنی صفحه را شناسایی می‌کند
- با استفاده از آستانه‌ای مشخص، متن‌های فارسی را تشخیص می‌دهد
- کلاس `persian-text-container` را به المان‌های فارسی اضافه می‌کند
- استایل‌های CSS شامل `direction: rtl`، `text-align: right` و ویژگی‌های مرتبط اعمال می‌شود
- کدها و محتوای لینوکسی (LTR) جهت خود را حفظ می‌کنند
- تغییرات صفحه با `MutationObserver` دنبال می‌شود تا محتوای جدید هم اصلاح شود

## قابلیت‌ها

- تشخیص خودکار متن فارسی با آستانه ۱۵٪ کاراکترهای فارسی
- سازگاری با ساختارهای مختلف پیام‌رسان‌های هوش مصنوعی
- حفظ جهت کد و محتوای لینوکسی (LTR)
- پشتیبانی از لیست‌ها، جدول‌ها، لینک‌ها و تگ‌های متن‌بندی
- به‌روزرسانی خودکار با تغییرات پویای صفحه (SPA)

## ساختار پروژه

```
RTL-Extension/
├── manifest.json    # تنظیمات افزونه کروم (Manifest V3)
├── content.js       # متن اصلی جاوااسکریپت برای تشخیص و اعمال استایل‌ها
└── styles.css       # استایل‌های CSS برای راست‌به‌چپ کردن متن فارسی
```

## پیش‌necessities

این افزونه برای کروم و مرورگرهای مبتنی بر کروم (مثل Edge و Brave) طراحی شده است و از Manifest V3 پشتیبانی می‌کند.

---

# Persian AI Text Fixer (English)

A Chrome extension for fixing RTL (Right-to-Left) text on AI chat websites. It automatically detects Persian/Farsi text and applies RTL layout, direction, and styling.

## Installation

1. Clone or download this repository
2. Open Chrome and go to `chrome://extensions/`
3. Enable **Developer mode**
4. Click **Load unpacked**
5. Select the project folder

## How It Works

The extension injects a content script that:

- Scans page elements for text content
- Detects Persian text using a character threshold (15%)
- Applies `persian-text-container` class to Persian elements
- Applies CSS styles (`direction: rtl`, `text-align: right`, etc.)
- Preserves LTR direction for code blocks
- Uses `MutationObserver` to handle dynamically loaded content (SPAs)

## License

MIT License
