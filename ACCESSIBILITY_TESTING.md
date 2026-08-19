# VoiceOver testing checklist — Thrive Mind

The automated audit (axe-core, contrast math, computed accessible-name checks — see the [Accessibility section of the README](README.md#-accessibility)) catches a large, well-defined class of issues, but it isn't a substitute for hearing how a page actually reads with a real screen reader. This checklist walks through a manual VoiceOver pass.

**Setup:** `Cmd+F5` to toggle VoiceOver on/off. `VO` = `Control+Option` (the VoiceOver modifier).
Basic nav: `VO+Right/Left Arrow` moves between elements. `VO+Space` activates. `Tab` moves between form controls/links normally.

Test against the live site: https://cs571-s26.github.io/Thrive-Mind/

## 1. Home (`/`)
- `VO+Right` through the page top to bottom. Listen for: does the crisis banner get read *before* the hero content (it should — it's early in the DOM)?
- Reach the 4 "what do you need right now" cards. Each should announce its full label ("I'm feeling overwhelmed", etc.) as one clean phrase — not the emoji, not silence.

## 2. Mood Quiz (`/mood` → click "Check My Mood")
- Answer a question. Does VoiceOver announce the progress bar's percentage as it advances? (Listen for "Mood quiz progress is X percent, progressbar.")
- Finish the quiz. On the results screen, reach the "Your check-in" category bars. Does each row read sensibly (category name, then percentage)?
- Reach the 3 recommendation cards. Each should read as one phrase: type ("Reset"/"Reconnect"/etc.), title, description — not fragmented.

## 3. Issues (`/issues`)
- `VO+Right` onto a card. It should announce "[Issue name] — read more, button, collapsed" — not the entire paragraph of tips.
- Activate it (`VO+Space`). Does VoiceOver announce the state change to "expanded"?

## 4. Self-Care Planner (`/planner`)
- Reach a checkbox. It should announce the task label ("Drank water," checked/unchecked) — not just "checkbox."
- Reach the progress bar pill. Should announce "Self-care planner progress is X percent."

## 5. My Wellness (`/wellness`) — visit after completing a mood check-in and checking a planner box
- Confirm the stat tiles read in a sensible order and the action-row links announce their full label, not just an emoji.

## 6. Resources (`/resources`)
- Reach the UW–Madison Support table rows. Each should read "[Need]: [Resource] — [description]" as one phrase, not silently or as a bare URL.

## What "good" sounds like
Nothing should announce as bare "button" or "link" with no name. Nothing should read out an entire paragraph just to identify what element you're on. Headings (`VO+Cmd+H` to jump between them) should step down one level at a time with no skips.

If anything sounds wrong, note which page + element — that's enough to turn into a fix.
