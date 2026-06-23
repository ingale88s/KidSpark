# KidSpark — STEM Learning Website

Interactive STEM site for kids 7-10. Pure HTML/CSS/JS, no build tools, no frameworks.
Open `index.html` directly in a browser — no server needed.

## File Map

```
index.html        Landing page: subject cards, fun facts ticker, progress bars
math.html         Number Ninja Quiz, Bubble Pop Counter, Fill the Pattern
science.html      Volcano Lab, Plant Doctor, Day & Night
chemistry.html    Color Mixer, States of Matter (canvas), Acid/Base sorter
physics.html      Gravity Drop, Magnet Explorer, Lever Balance
logic.html        Memory Match, Pattern Puzzle, Maze Runner
style.css         All shared styles (CSS vars, animations, components)
app.js            Shared utilities: addStars(), confetti(), beep(), loadProgress()
```

## Architecture

**Shared (app.js):**
- `addStars(n, subject)` — adds stars, updates localStorage, refreshes header counter
- `confetti()` — launches confetti burst
- `beep(type)` — Web Audio API tones: `'correct'`, `'wrong'`, `'pop'`, `'win'`
- `celebrate(emoji, title, msg)` — popup overlay + confetti
- `loadProgress()` — reads localStorage and animates progress bars on home page
- `showResult(id, ok, msg)` — fills a `.result-box` element

**Storage:** Single localStorage key `'kidspark'` → `{ stars, math, science, chemistry, physics, logic }`. Subject values are 0-100 (percentage for progress bars).

**Star display:** Every page has `<span id="totalStars">` in the header, auto-updated by `refreshStarDisplay()` on load.

## CSS Variables & Colors

```css
--math: #FF6B6B      --science: #00B4D8    --chemistry: #A78BFA
--physics: #F59E0B   --logic: #34D399
--r: 20px (border-radius)    --r-sm: 12px
--shadow / --shadow-lg
```

Fonts: `'Fredoka One'` (headings), `'Nunito'` (body) — loaded from Google Fonts in style.css.

## Key Component Patterns

**Activity card:**
```html
<div class="activity-card">
  <div class="act-header {subject}-hdr">
    <span class="act-num">N</span> Title
  </div>
  <div class="act-body">
    <p class="act-desc">Instructions</p>
    <!-- experiment content -->
    <div id="myResult" class="result-box"></div>
    <div class="info-box"><h4>Title</h4><p>Fact text</p></div>
  </div>
</div>
```

**Buttons:** `.btn .btn-{subject}` or `.btn .btn-sm .btn-success / .btn-danger / .btn-primary`

**Result box:** starts hidden; call `showResult('id', true/false, 'msg')` or set className directly:
```js
el.className = 'result-box show ok';   // green
el.className = 'result-box show err';  // red
el.innerHTML = '<span class="r-emoji">✅</span><span class="r-txt">Message</span>';
```

**Styled slider:** `<input type="range" class="slider" ...>`

**Subject hero (top of each page):**
```html
<section class="subject-hero">
  <span class="big-icon">🔢</span>
  <h2>Page Title</h2>
  <p>Subtitle</p>
</section>
```

## Adding a New Subject Page

1. Copy the header/nav-back/footer boilerplate from any existing page.
2. Change `.act-header` class to `{newsubject}-hdr` and add CSS in style.css.
3. Add a new card to `index.html`'s `.subject-grid`.
4. Add progress bar row in `index.html` and the corresponding `getData()` key.

## Experiments Quick Reference

| File | Experiment | Key elements |
|------|-----------|-------------|
| math | Number Ninja Quiz | `#quizGame`, `startQuiz()`, `genQuestion()` |
| math | Bubble Pop | `#bubbleField`, `startBubbles()`, `.bubble` elements |
| math | Pattern Fill | `patterns[]` array, `renderPattern()` |
| math | Multiplication Magic | `mulProblems[]`, `startMul()`, dot-grid render |
| math | Greater or Less? | `startGL()`, `answerGL(sym)`, `glA`/`glB` globals |
| math | Quick Dots | `qdCounts[]`, `startQD()`, countdown → 1.5s flash |
| math | Missing Number | `mnProblems[]`, `renderMN()`, `checkMN()` |
| science | Volcano | SVG `#lavaGroup`, `volcanoStep(n)`, `createParticles()` |
| science | Plant Doctor | `#waterSlider`, `#sunSlider`, `updatePlant()` |
| science | Day & Night | `#earthCircle` CSS rotation, `checkDN()` |
| chemistry | Color Mixer | `active{}` object, `updateColor()`, `colorStates{}` |
| chemistry | Matter | `<canvas id="matterCanvas">`, `requestAnimationFrame` loop |
| chemistry | Acid/Base | `correctAnswers{}`, `selectSub()`, `placeInZone()` |
| physics | Gravity Drop | `.falling-obj`, CSS transition `--fall-dur`, `dropObject()` |
| physics | Magnets | `#magWrap --mgap` CSS var, `flipMagnet()` |
| physics | Lever | `lwL`/`lwR` counters, `updateLever()` |
| logic | Memory Match | `memCards[]`, `matchedSet`, `flipCard(i)` |
| logic | Pattern Puzzle | `patterns[]` array, `renderPattern()`, `pickPat()` |
| logic | Maze | `mazes[][][]` (1=wall,0=path,2=start,3=end), `movePlayer(dir)` |
| logic | Odd One Out | `oooSets[]`, `renderOOO()`, `pickOOO(btn,idx)` |
| logic | True or False | `tfStatements[]`, `startTF()`, `answerTF(bool)` |
| logic | Sorting Challenge | `sortRounds[]`, `renderSort()`, `clickSort(val)` |
| logic | Brain Teasers | `btTeasers[]`, `startBT()`, `answerBT(idx)` |
