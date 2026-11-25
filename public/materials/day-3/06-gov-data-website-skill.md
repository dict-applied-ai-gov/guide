---
name: gov-data-website
description: Design and review rules for small public-data websites and office apps built for Philippine government offices. Use when building, redesigning, or reviewing a page that shows statistics, charts, or tables (PSA, data.gov.ph, or office data), or any citizen-facing app, so it looks designed by a careful person rather than generated.
---

# Government data website: design rules

You are building or reviewing a small website for a Philippine government office. The readers are citizens and a busy head of office. They need one clear answer they can trust. Every rule below serves that.

Work in this order: **content, then charts, then look, then access.** Before you finish, run the review at the end and fix what fails.

## 1. Content: say something true and specific

- **The headline is a finding with a number,** written as a plain sentence. Good: "Regular-milled rice in Bacolod cost PHP 56.23 a kilo in October 2026, up from PHP 44.51 a year earlier." Bad: "Unlocking Insights into Rice Prices", "Data-Driven Dashboard", "Empowering Communities".
- **Never invent, estimate, or round away a number.** Every number on the page must come from the data the page loads. If a number is missing, say "no data for this month" instead of filling it in.
- **Every number has its unit, place, and date:** "PHP 56.23 per kilo, City of Bacolod, October 2026". Not "56.23".
- **Peso amounts** as PHP 1,234.50 or ₱1,234.50. **Dates** as October 2026 or 26 November 2026, never 2026-10 on the page. **Percentages** with one decimal at most, and say percent of what.
- **Use the reader's words.** Write "share of people below the poverty line", not "poverty incidence among population (%)", and explain a technical term once where it first appears.
- **Separate what the data shows from what it might mean.** Do not claim a cause ("because of the typhoon") unless the data shows it. Put any interpretation under its own label, such as "What this could mean".
- **Say what the data cannot tell you.** Mention rounding, survey error (a coefficient of variation above 20 means use with caution), missing months, or areas that changed region.
- **Show the source on the page:** the agency (for example Philippine Statistics Authority), the table name, a link, and the date the data was retrieved.
- **No filler.** No lorem ipsum, made-up testimonials, fake user counts, "AI-powered" badges, or sections that repeat the headline in other words. Cut any sentence that would fit on any other website.

## 2. Charts: one question, one honest chart

- **Pick the chart from the question:** change over time is a line chart; comparing places or groups is a horizontal bar chart, sorted from largest to smallest; a single important number is just the number, large.
- **Bar charts start at zero.** Line charts may start elsewhere, but say so if the change looks bigger than it is.
- **Label both axes with units,** and give the chart a title that states what it shows ("Regular-milled rice, PHP per kilo, January 2023 to October 2026").
- **Few colors.** One strong color for the main area, grey for the comparison, at most four lines at once. Use the filter to show others. Colors that must be told apart must also differ in lightness.
- **Label lines directly** at their end instead of a legend, where it fits.
- **Never:** 3D charts, pie charts with more than three slices, two y-axes on one chart, gradients inside bars, or animations that delay the numbers.
- **Mark the point that matters,** for example the highest month or the latest value, with a short note on the chart.
- **Show the table behind the chart** below it, so anyone can check the numbers.

## 3. Look: calm, plain, consistent

- **Neutral background** (white or a very light grey), dark text (near black), and one accent color used for the main data and links. A government blue or green is fine.
- **No decoration that carries no meaning:** no gradient blobs or mesh backgrounds, glassmorphism, glowing borders, neon shadows, floating shapes, sparkle icons, emoji as icons, or a stock icon on every card.
- **One typeface** (a clear sans-serif such as Inter, Source Sans 3, or the system font), two or three sizes, and bold for emphasis. No all-caps paragraphs.
- **Left-aligned text** in a column no wider than about 70 characters. Center only very short items.
- **Cards only when they group things.** Do not wrap every paragraph in a rounded, shadowed card. Keep the same spacing between sections throughout.
- **Numbers line up:** right-align numbers in tables and use tabular figures.
- **No animated counters,** auto-playing carousels, or parallax.
- **The office name and purpose are clear at the top,** but there is no fake logo, seal, or agency branding the office has not approved.

## 4. Access: everyone can use it, on a phone

- Works at 360 pixels wide with no sideways scrolling. Charts resize; tables scroll inside their own box.
- Body text at least 16 pixels. Text contrast at least 4.5 to 1 against its background.
- Every chart has a text summary or an accessible label that says what it shows.
- Buttons and filters work with a keyboard and show a visible focus outline. Tap targets are at least 44 pixels.
- Loading and error states are written in plain words, with a way to try again.
- English by default; if you add Filipino or Hiligaynon, translate the whole page, not only the headline.

## 5. Privacy and trust

- Use only public or synthetic data. Never show names, ID numbers, addresses, or records of real people.
- Do not ask visitors for personal details unless the task truly needs them, and say why.
- Add a short line: "Prepared with AI assistance and checked by [office or role]." A person stays accountable for what the page says.

## Review before you finish

Go through this list. Report each item as pass or fail with a one-line reason, then fix every fail.

1. The headline is a specific finding with a number.
2. Every number comes from the loaded data and has a unit, place, and date.
3. The chart type fits the question; bars start at zero; axes are labeled.
4. No more than four colors in a chart; nothing decorative without meaning.
5. Source, link, and retrieved date are visible.
6. Limits of the data are stated in plain words.
7. Works at 360 pixels wide; text is readable; contrast passes.
8. Error and empty states exist and are written plainly.
9. No personal data, invented numbers, or filler sections.
10. A person is named, by role, as accountable for the page.
