export const certificateObjectives = [
  "Explain the automation pattern trigger, action, output, using a form submission as the trigger.",
  "Connect Google Forms, Sheets, Slides, Drive, and Gmail into one working workflow.",
  "Install and run a ready-made Apps Script. Stretch: use an AI assistant to write one from a clear prompt and fix errors by pasting them back.",
  "Read and approve a Google permission screen, and explain why a human must approve it.",
  "Test, troubleshoot, and clean up an automation responsibly (test emails, quotas, removing triggers and access).",
];

export const certificateTiming = [
  ["Steps 1 to 4", "Build the form, sheet, template, and folder", "20 min"],
  ["Steps 5 to 7", "Paste the reference script and set the IDs", "15 min"],
  ["Steps 8 to 10", "Trigger, permissions, and first test", "20 min"],
  ["Step 11", "Troubleshooting, the stretch task, and cleanup", "20 min"],
];

export const certificateWords = [
  ["Apps Script", "Google’s free tool for small programs that work inside Sheets, Forms, Slides, Gmail, and Drive. You paste a ready-made one; you do not write code."],
  ["Script", "A list of instructions the computer follows. Here, it makes the certificate and emails it."],
  ["Trigger", "A setting that runs the script by itself when something happens. Here: when someone sends the form."],
  ["Placeholder", "A marker such as {{Name}} on the certificate. The script swaps it for the real name."],
  ["ID", "The long code in a file or folder’s web address. It tells the script exactly which file or folder to use."],
  ["Permission screen", "Google’s page that asks if the script may use your Drive, Slides, Sheets, and Gmail. Only you can say yes."],
];

export const certificateSteps = [
  {
    title: "Create the form",
    text: "Using the trainer’s kit? Make your own copy of each file as the trainer shows, then start at step 4.",
    actions: [
      "Go to `forms.google.com` and create a blank form named `Certificate Request`.",
      "Add a **Short answer** question titled `Full Name` and switch on **Required**.",
      "For the email, do one of these: turn on **Settings** → **Responses** → **Collect email addresses**, or add a **Short answer** question titled `Email Address`.",
    ],
    note: "Type the question titles exactly as shown. The script looks for them by name.",
  },
  {
    title: "Link the form to a Sheet",
    actions: [
      "In the form, open the **Responses** tab.",
      "Click **Link to Sheets** → **Create a new spreadsheet**.",
    ],
    note: "This Sheet collects every form answer. It is your response Sheet.",
  },
  {
    title: "Make the certificate template",
    actions: [
      "Go to `slides.google.com` and design a one-slide certificate. A Canva design exported to Slides is fine too.",
      "Where the name should appear, type `{{Name}}`.",
      "Where the date should appear, type `{{Date}}`.",
      "Where the training title should appear, type `{{Training}}`.",
    ],
    note: "Type each placeholder exactly, with both pairs of curly braces. The script replaces them with the real details.",
  },
  {
    title: "Copy two IDs",
    actions: [
      "In the Slides address bar, copy the template ID: the long code between `/d/` and `/edit`.",
      "In Google Drive, create a folder named `Certificates` and open it.",
      "In the address bar, copy the folder ID: the code after `/folders/`.",
      "Paste both IDs into a note so you have them ready.",
    ],
  },
  {
    title: "Get the script",
    actions: [
      "Copy the trainer’s ready-made script from “The reference script” section below. It is also in the training folder as `06-certificate-script.txt`.",
    ],
    note: "Stretch: paste the prompt from “Stretch: have AI write it” into Gemini, ChatGPT, or Claude, and use the script it gives you instead.",
  },
  {
    title: "Open the script editor",
    actions: [
      "In your response Sheet, click **Extensions** → **Apps Script**.",
      "Delete the sample code in **Code.gs**.",
      "Paste the script.",
    ],
  },
  {
    title: "Put in your IDs",
    actions: [
      "At the top of the script, replace the template ID placeholder with your Slides template ID.",
      "Replace the folder ID placeholder with your folder ID.",
      "Check that the question titles in the script match your form.",
      "Click **Save** (the disk icon).",
    ],
    note: "Optional: in **Project Settings** (the gear icon), set the time zone to `(GMT+08:00) Manila` so dates come out right.",
  },
  {
    title: "Switch on the trigger",
    actions: [
      "In the function list at the top, select `createTrigger`.",
      "Click **Run**.",
    ],
    note: "The trigger makes the script run by itself each time someone sends the form. Another way: click **Triggers** (the alarm clock icon) → **Add Trigger**, choose `onFormSubmit`, event source **From spreadsheet**, event type **On form submit**, then **Save**.",
  },
  {
    title: "Approve permissions",
    actions: [
      "Google asks you to review permissions. Choose your account.",
      "If you see “Google hasn’t verified this app”, click **Advanced** → **Go to (your project name) (unsafe)**.",
      "Read the list: the script asks to manage your Drive files, Slides, and spreadsheets, and to send email as you.",
      "Click **Allow**.",
    ],
    note: "The “not verified” warning is normal for a script you made yourself. Only approve scripts you understand.",
  },
  {
    title: "Test it",
    actions: [
      "Open the form’s preview (the eye icon).",
      "Submit your own name and email.",
      "Check your inbox for the certificate PDF.",
      "Check the **Certificates** folder, and the new **Certificate Status** column in the Sheet.",
    ],
  },
  {
    title: "Fix errors with AI",
    actions: [
      "If nothing arrives, open **Executions** in Apps Script, or read the **Certificate Status** column in the Sheet.",
      "Copy the error message.",
      "Paste it to your AI app with `Here is the error, please fix the script`.",
      "Paste the corrected script, save, and test again.",
    ],
    note: "Stuck? Ask your setup buddy or the trainer. The “When it doesn’t work” table below lists the common errors.",
  },
];

export const certificatePrompt = `You are an expert in Google Apps Script. Write a complete, ready-to-paste Apps Script for a script bound to a Google Sheet that receives Google Form responses.
Requirements:
1. Put settings at the top as constants: TEMPLATE_ID (Google Slides template), FOLDER_ID (Drive folder for certificates), TRAINING_NAME, NAME_QUESTION = 'Full Name', EMAIL_QUESTION = 'Email Address'.
2. A function onFormSubmit(e) for an installable "On form submit" trigger. Read the name and email from e.namedValues using the question titles.
3. Copy the Slides template with DriveApp.getFileById(TEMPLATE_ID).makeCopy(...) into the folder, open the copy with SlidesApp.openById, and replace the placeholders {{Name}}, {{Date}} (today’s date, formatted like "November 25, 2026"), and {{Training}} using replaceAllText. Call saveAndClose() before exporting.
4. Export the copy as a PDF with getAs('application/pdf'), save the PDF in the folder, and email it to the respondent as an attachment with GmailApp.sendEmail and a short, friendly message.
5. Log "Sent" with the PDF link, or "Error:" with the error message, in a "Certificate Status" column in the same response row. Wrap the work in try/catch.
6. Add a createTrigger() function that removes old onFormSubmit triggers and creates one with ScriptApp.newTrigger('onFormSubmit').forSpreadsheet(SpreadsheetApp.getActive()).onFormSubmit().create().
7. Add short comments in plain English, and after the code, list the steps a non-programmer must follow to install and test it.`;

export const certificateScript = `/**
 * Automated Certificates - reference script (trainer fallback)
 * Bound to the Google Sheet that receives the Google Form responses.
 * 1) Fill in the SETTINGS below. 2) Run createTrigger() once. 3) Submit the form to test.
 */

// ===== SETTINGS: change these =====
const TEMPLATE_ID = 'PASTE_SLIDES_TEMPLATE_ID_HERE'; // from the Slides URL: /presentation/d/THIS_PART/edit
const FOLDER_ID = 'PASTE_DRIVE_FOLDER_ID_HERE';       // from the folder URL: /folders/THIS_PART
const TRAINING_NAME = 'Applied AI for Automation and Decision Support';
const NAME_QUESTION = 'Full Name';        // must match the form question title exactly
const EMAIL_QUESTION = 'Email Address';   // must match the form question (or collected email) title exactly
const STATUS_HEADER = 'Certificate Status';

// Runs automatically every time someone submits the form (after createTrigger() is run once).
function onFormSubmit(e) {
  const sheet = e.range.getSheet();
  const row = e.range.getRow();
  try {
    const name = getAnswer_(e, NAME_QUESTION);
    const email = getAnswer_(e, EMAIL_QUESTION);
    const dateText = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'MMMM d, yyyy');

    // 1. Copy the Slides template into the certificates folder
    const folder = DriveApp.getFolderById(FOLDER_ID);
    const copy = DriveApp.getFileById(TEMPLATE_ID).makeCopy('Certificate - ' + name, folder);

    // 2. Replace the placeholders in the copy
    const deck = SlidesApp.openById(copy.getId());
    deck.replaceAllText('{{Name}}', name);
    deck.replaceAllText('{{Date}}', dateText);
    deck.replaceAllText('{{Training}}', TRAINING_NAME);
    deck.saveAndClose(); // save changes before exporting

    // 3. Export the copy as a PDF and save it in the folder
    const pdfBlob = DriveApp.getFileById(copy.getId())
      .getAs('application/pdf')
      .setName('Certificate - ' + name + '.pdf');
    const pdfFile = folder.createFile(pdfBlob);

    // 4. Email the PDF to the respondent
    //    (MailApp.sendEmail works the same way and asks for a narrower, send-only permission.)
    GmailApp.sendEmail(
      email,
      'Your Certificate - ' + TRAINING_NAME,
      'Hi ' + name + ',\\n\\n' +
        'Thank you for joining ' + TRAINING_NAME + '. Your certificate is attached.\\n\\n' +
        'This is an automated message.',
      { attachments: [pdfBlob], name: 'Training Team' }
    );

    // 5. Optional: remove the editable Slides copy and keep only the PDF
    copy.setTrashed(true);

    // 6. Log the result in the response sheet
    logStatus_(sheet, row, 'Sent ' + dateText + ' - ' + pdfFile.getUrl());
  } catch (err) {
    logStatus_(sheet, row, 'Error: ' + err.message);
    console.error(err);
  }
}

// Reads one answer from the form submission by its question title.
function getAnswer_(e, question) {
  const values = e.namedValues[question];
  if (!values || !values[0]) {
    throw new Error('No answer found for "' + question + '". Check that the question title matches exactly.');
  }
  return String(values[0]).trim();
}

// Writes a status message in a "Certificate Status" column (created if missing).
function logStatus_(sheet, row, message) {
  const lastCol = sheet.getLastColumn();
  const headers = sheet.getRange(1, 1, 1, lastCol).getValues()[0];
  let col = headers.indexOf(STATUS_HEADER) + 1;
  if (col === 0) {
    col = lastCol + 1;
    sheet.getRange(1, col).setValue(STATUS_HEADER);
  }
  sheet.getRange(row, col).setValue(message);
}

// Run this ONCE from the editor: creates the "On form submit" trigger (removes old copies first).
function createTrigger() {
  ScriptApp.getProjectTriggers()
    .filter(function (t) { return t.getHandlerFunction() === 'onFormSubmit'; })
    .forEach(function (t) { ScriptApp.deleteTrigger(t); });
  ScriptApp.newTrigger('onFormSubmit')
    .forSpreadsheet(SpreadsheetApp.getActive())
    .onFormSubmit()
    .create();
}

// Optional test: re-sends the certificate for the LAST response row, without submitting the form again.
function testLastResponse() {
  const sheet = SpreadsheetApp.getActive().getSheets()[0]; // the form responses tab
  const lastRow = sheet.getLastRow();
  const lastCol = sheet.getLastColumn();
  const headers = sheet.getRange(1, 1, 1, lastCol).getValues()[0];
  const values = sheet.getRange(lastRow, 1, 1, lastCol).getDisplayValues()[0];
  const namedValues = {};
  headers.forEach(function (h, i) { namedValues[h] = [values[i]]; });
  onFormSubmit({ range: sheet.getRange(lastRow, 1, 1, lastCol), namedValues: namedValues, values: values });
}

// Cleanup after the session: removes all triggers of this project.
function deleteTriggers() {
  ScriptApp.getProjectTriggers().forEach(function (t) { ScriptApp.deleteTrigger(t); });
}

// Shows how many more email recipients this account can send to today.
function checkEmailQuota() {
  Logger.log('Remaining email recipients today: ' + MailApp.getRemainingDailyQuota());
}`;

export const certificateErrors = [
  {
    problem: "Authorization is required, or You do not have permission",
    fix: [
      "Run `createTrigger` again and finish the permission screen.",
      "Check you are signed in to the right Google account. Several accounts in one browser often cause this, so use one Chrome profile per account.",
    ],
  },
  {
    problem: "No item with the given ID could be found, or Unexpected error while getting the method",
    fix: [
      "One of the IDs is wrong.",
      "Check that the template ID came from the Slides file and the folder ID from the folder.",
      "Check there are no extra characters such as `/edit` at the end.",
    ],
  },
  {
    problem: "The certificate shows {{Name}} unchanged",
    fix: [
      "The placeholder on the slide must match exactly, including capital letters and both pairs of curly braces.",
      "Delete it and retype it in one go, so Slides does not split it into pieces.",
    ],
  },
  {
    problem: "The form works but nothing happens",
    fix: [
      "The trigger is not switched on.",
      "Open **Triggers** (the alarm clock icon) and check for an `onFormSubmit` trigger with **On form submit**. If it is missing, run `createTrigger`.",
    ],
  },
  {
    problem: "Cannot read properties of undefined",
    fix: [
      "You clicked Run on `onFormSubmit` in the editor. That is normal: it only works when the form is sent.",
      "Submit the form instead, or run `testLastResponse`.",
    ],
  },
  {
    problem: "No answer found for “Full Name”",
    fix: [
      "The question titles in the form must match `NAME_QUESTION` and `EMAIL_QUESTION` at the top of the script exactly.",
    ],
  },
];

export const certificateGoodToKnow = [
  "Test with your own email only. Never use real client or participant lists.",
  "Email limits: scripts can email about 100 recipients per day from a personal Gmail account, and about 1,500 from a Google Workspace account, per Google’s Apps Script quota page. Quotas can change; run checkEmailQuota to see what’s left.",
  "Names and emails are personal data under RA 10173. Use them only with permission and for the stated purpose. A real office rollout needs clearance from the head of office and data protection officer.",
];

export const certificateCleanup = [
  "Run deleteTriggers, or delete the trigger on the Triggers page.",
  "Delete test certificates and form responses you don’t need.",
  "Remove the script’s access at myaccount.google.com → Security → Third-party apps & services.",
  "Disconnect any agent or clasp connections made for the lab.",
];

export const agentTrack = {
  instruction:
    "Create a Google Form with Full Name and Email Address, a linked response Sheet, a Slides certificate template with {{Name}}, {{Date}}, {{Training}}, and a Certificates folder. Then add the certificate script to the Sheet and tell me which steps I must do myself.",
  agentCan: [
    "Write the script.",
    "Create the Sheet, Slides template, and folder through Drive connectors.",
    "Create the form, for example by writing a small one-time setup script using FormApp, since many connectors don’t cover Google Forms.",
    "Push the code to an Apps Script project with clasp.",
  ],
  youMust: [
    "Sign in and connect your Google account to the agent or to clasp (OAuth sign-in in the browser).",
    "For clasp: turn on the Google Apps Script API in the Apps Script user settings (script.google.com → Settings).",
    "Open the script, run createTrigger once, and approve the permission screen, including Google hasn’t verified this app → Advanced → Go to project.",
    "Test by submitting the form with your own email, and check the PDF and the status column.",
  ],
};
