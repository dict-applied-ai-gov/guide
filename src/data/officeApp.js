// Day 2 lesson: design an office assistant app in Google Stitch, build it in
// Google AI Studio (Build mode, Android platform), and install it on a phone.
// Checked against the AI Studio docs (aistudio.google.com/docs/aistudio-build-mode.md
// and aistudio-android.md, November 2026): the Android platform picker, the cloud
// emulator preview, and "Install on Device" over WebUSB (Chrome or Edge, USB debugging
// on, a data cable). Stitch's on-screen menu names were not confirmed, so the Stitch
// steps avoid naming its buttons.

export const appObjectives = [
  "Describe an app in plain words and let AI design and build it, with no coding.",
  "Sketch the screens in Google Stitch, then build a working app from them in Google AI Studio.",
  "Put the app on your own phone and test it like a citizen would.",
  "Debug with AI: find what is wrong, describe it, let AI fix it, and test again.",
  "Keep the data rule: the app uses only the sample office facts, and asks for no personal details.",
];

export const appWords = [
  ["App", "A program on your phone. Today you make one by describing it in plain words; AI writes the code."],
  ["Google Stitch", "A free Google tool that draws app screens from your description. Think of it as the sketch."],
  ["Google AI Studio (Build)", "A free Google tool that turns your description, and your Stitch sketch, into a working app."],
  ["Emulator", "A pretend phone that runs inside your browser, so you can try the app before it is on a real phone."],
  ["USB debugging", "An Android setting that lets your laptop put a test app on your phone through the cable. Turn it off after the lab."],
  ["Debugging", "Finding and fixing what is wrong: test, describe the problem, let AI fix it, test again."],
];

export const appTiming = [
  ["Part 1", "Get your phone ready, and sketch the screens in Stitch", "15 min"],
  ["Part 2", "Build the app in AI Studio", "15 min"],
  ["Part 3", "Install it on your phone", "15 min"],
  ["Part 4", "Test, fix with AI, and clean up", "15 min"],
];

export const phoneSteps = [
  {
    title: "Turn on Developer options",
    actions: [
      "On your Android phone, open **Settings** → **About phone**. (Samsung: **About phone** → **Software information**.)",
      "Tap **Build number** seven times. Enter your phone PIN if asked.",
      "Wait for the message “You are now a developer”.",
    ],
    note: "This only unlocks a hidden settings menu. It does not change anything else on your phone.",
  },
  {
    title: "Turn on USB debugging",
    actions: [
      "Go back to **Settings** and open **Developer options**. On many phones it is under **System**.",
      "Switch on **USB debugging** and confirm.",
    ],
  },
  {
    title: "Get a cable that carries data",
    text: "Use the USB cable that came with the phone if you can. Some cheap cables only charge, and the laptop will not see the phone.",
  },
];

export const iphoneNote =
  "iPhones cannot install the app this way. Build it and test it in the pretend phone in your browser, and pair with a seatmate who has an Android phone for Part 3.";

export const stitchSteps = [
  {
    title: "Open Stitch",
    actions: [
      "Go to `stitch.withgoogle.com` and sign in with your Google account.",
      "Choose the option for a mobile app (phone-sized screens), not a website.",
    ],
  },
  {
    title: "Describe the screens",
    actions: [
      "Paste the design prompt from “The prompts” section below and send it.",
      "Wait for the screens to appear.",
      "Ask for changes in plain words if you like, for example `Make the buttons bigger`.",
    ],
  },
  {
    title: "Save a picture of the design",
    actions: [
      "Use Stitch’s download or export option if you see one.",
      "Or take a screenshot of the screens. Windows: press **Windows + Shift + S**. Mac: press **Command + Shift + 4**.",
    ],
    note: "The picture shows AI Studio how your app should look.",
  },
];

export const buildSteps = [
  {
    title: "Open AI Studio Build",
    actions: [
      "Go to `aistudio.google.com/apps` and sign in with the same Google account.",
      "At the top, choose **Android**. The default makes a website; you want a phone app.",
    ],
  },
  {
    title: "Describe the app",
    actions: [
      "In the prompt box, click **+** and add the picture of your Stitch design.",
      "Paste the build prompt from “The prompts” section below and send it.",
    ],
    note: "Cannot attach the picture? Skip it. The prompt alone also works; the app just will not match your sketch.",
  },
  {
    title: "Watch it build",
    actions: [
      "Wait while AI Studio writes the app. It can take a few minutes.",
      "When it is done, the app runs in a pretend phone (the emulator) on the right.",
      "Tap through each screen in the emulator.",
    ],
    note: "If AI Studio asks you to scan a QR code with your phone, that is Google checking your account for the free tier, not your app. Follow it, or ask the trainer.",
  },
];

export const installSteps = [
  {
    title: "Connect your phone",
    actions: [
      "Unlock your phone and connect it to the laptop with the USB cable.",
      "Use **Chrome** or **Edge** on the laptop. Other browsers cannot do this step.",
    ],
  },
  {
    title: "Install the app",
    actions: [
      "In AI Studio’s preview panel, click **Install on Device**.",
      "The browser shows a list of USB devices. Pick your phone and click **Connect**.",
      "On your phone, tap **Allow** when it asks “Allow USB debugging?”.",
    ],
    note: "The app installs and opens on your phone. Nothing else on the phone is touched.",
  },
];

export const fixSteps = [
  {
    title: "Test it like a citizen",
    text: "Open each screen on your phone and run the checks below. Write down anything that is wrong, one problem per line.",
  },
  {
    title: "Tell AI Studio what is wrong",
    actions: [
      "In the AI Studio chat, describe one problem: what you did, what happened, and what you expected. For example: `On the Fees screen, the renewal fee shows PHP 150. It should be PHP 130.`",
      "Or point at the part of the screen in annotation mode and describe the change.",
      "Wait for the fix, and check it in the emulator.",
    ],
  },
  {
    title: "Test again on your phone",
    actions: [
      "Click **Install on Device** again to put the fixed version on your phone.",
      "Repeat the check that failed.",
    ],
    note: "That loop, test, describe, fix, test again, is debugging. It is the same whether a person or AI writes the code.",
  },
];

export const stitchPrompt = `A simple mobile app for citizens of a government office, the Negros Frontline Services Office in Bacolod City, called "NFSO Helper".

Four screens:
1. Home: the office hours, and three large buttons: Requirements, Fees, Ask a question.
2. Requirements: a checklist of what to bring.
3. Fees: a short price list.
4. Ask a question: a text box, a Send button, and an area for the answer.

Large, high-contrast text for older users. Plain English. Blue and white, friendly and official.`;

export const buildPrompt = `Build a simple Android app called "NFSO Helper" for citizens of the Negros Frontline Services Office in Bacolod City. Follow the attached design picture for the look.

Screens:
1. Home: the office hours, and large buttons for Requirements, Fees, and Ask a question.
2. Requirements: what to bring for a new clearance, for a renewal, and for claiming for someone else.
3. Fees: new clearance PHP 150, renewal PHP 130, cash at the cashier.
4. Ask a question: a text box and a Send button. Answer with Gemini using ONLY the office facts below, in under 80 words. If the answer is not in the facts, say: "Please ask at the counter or call (034) 000-0000." Never ask for names, ID numbers, phone numbers, or reference numbers, and never give anyone's application status.

Office facts:
- From December 1, 2026: counters open Monday to Friday, 7:30 AM to 4:30 PM, no noon break. Closed weekends and declared holidays.
- Last walk-in queue number: 3:30 PM. Appointments are served until 4:30 PM.
- Appointments: book on the office page up to 14 days ahead; 20-minute slots.
- Priority lane at Counter 1: senior citizens, persons with disability, pregnant women.
- Clearance fees: new PHP 150, renewal PHP 130, cash at the cashier.
- Bring: one valid government ID, reference number if any, the fee; for renewal, the old clearance.
- Release: usually 1 to 3 working days; the office texts when ready.
- Claiming for someone else: authorization letter, copy of the applicant's ID, and the representative's own valid ID.
- Status is given only at the counter or by text to the registered number.
- Complaints and suggestions: lobby feedback box, feedback form on the office page, or hotline (034) 000-0000.

Use large, high-contrast text and plain English. No sign-in. Do not save what people type.`;

export const appChecks = [
  "Hours, fees, and requirements match the office facts exactly. Nothing was added.",
  "Ask “Can I pay with GCash?”: it says cash at the cashier, and does not promise GCash.",
  "Ask “Is the clearance of Liza Montano ready?”: it gives no status and points to the counter.",
  "Ask something not in the facts, such as “Do you issue passports?”: it shows the counter and hotline message.",
  "The app never asks for a name, ID number, phone number, or reference number.",
];

export const appErrors = [
  {
    problem: "My phone is not in the browser’s USB list",
    fix: [
      "Use **Chrome** or **Edge**, and unlock the phone.",
      "Check that **USB debugging** is on (Part 1).",
      "Try another cable: some only charge. Then try another USB port.",
    ],
  },
  {
    problem: "The phone never asks “Allow USB debugging?”",
    fix: [
      "Unplug the cable and plug it in again with the phone unlocked.",
      "Pull down the phone’s notifications, tap the USB message, and choose **File transfer**.",
    ],
  },
  {
    problem: "There is no Install on Device button",
    fix: [
      "You made a website, not an Android app. Start a new app and choose **Android** at the top before you send the prompt.",
    ],
  },
  {
    problem: "The app looks nothing like my Stitch design",
    fix: ["Attach the picture again and type `Match the attached design more closely.`"],
  },
  {
    problem: "Ask a question gives answers that are not in the office facts",
    fix: [
      "Type: `The Ask screen must answer only from the office facts. If the answer is not there, show the counter and hotline message.`",
      "Install it again and repeat the check.",
    ],
  },
  {
    problem: "Too many requests, or a quota message",
    fix: ["The free tier has limits. Wait a minute and try again, or pair with a seatmate."],
  },
];

export const appStretch = [
  {
    title: "Add the local languages",
    text: "Type `Add a language switch on the Home screen for English, Filipino, and Hiligaynon.` Then check the translations with a seatmate who speaks them.",
  },
  {
    title: "Turn it into your capstone",
    text: "Swap the office facts for your own office’s public information (cleared and public only), and you have a prototype to show on Day 3.",
  },
];

export const appCleanup = [
  "Uninstall the test app from your phone: press and hold its icon, then tap Uninstall.",
  "Turn off USB debugging: Settings → Developer options → USB debugging.",
  "Keep the app private in AI Studio: do not share its link. Delete it if you will not use it again.",
];
