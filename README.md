# FocusTick

**FocusTick** is a simple, efficient web-timer app designed to help you maintain focus and manage time better — whether you’re studying, working on a project, or just want to limit distractions.

---

## 🎯 Features

- Set a countdown timer and monitor remaining time.  
- Minimal, distraction-free UI so you stay on task.  
- No login or account required — just open and use immediately.  
- Lightweight: built with plain HTML, CSS & JavaScript.  
- Easy to customise or extend (themes, sounds, intervals) if needed.

---

## 🧩 Project structure

/FocusTick
│ Brugty DEMO.ttf ← custom font file
│ alarm-clock.png ← icon/image used in UI
│ index.html ← main web page
│ styles.css ← CSS styling
│ script.js ← JavaScript logic


---

## 🚀 Getting started

1. Clone this repository:  
   ```bash
   git clone https://github.com/dark-ous/FocusTick.git
Navigate into the folder:

cd FocusTick
Open index.html in your browser (double-click or serve with a local web server).

Start the timer and focus!

🛠 How it works (internals)
 - The UI allows you to set a time (e.g., minutes and seconds) and start the countdown.

script.js handles:

 - Countdown logic (reducing time every second)

 - Updating the UI display as time elapses

 - Triggering an alert/image/sound when time is up (if configured)

 - styles.css ensures a clean, modern look with minimal distractions.

 - Resources like alarm-clock.png and the custom font (Brugty DEMO.ttf) provide aesthetic touches.

🎨 Customisation
Want to make it your own? You can:

- Change the colour scheme in styles.css.

- Swap the font (Brugty DEMO.ttf) for another.

- Add sound notifications when the timer ends.

- Add “pause”, “reset”, or interval (“Pomodoro”) capability.


✅ Why use FocusTick?

- It’s ultra-simple — no clunky frameworks or bloat.

- Runs entirely client-side — no backend required.

- Perfect for quick adoption: open and use immediately.

- A good starting point if you want to extend into something more (Pomodoro mode, analytics, dark mode, etc).

