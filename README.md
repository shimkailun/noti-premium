# Noti-premium

Catch failed and unallocated insurance premiums every week and send WhatsApp reminders on **day 3** and **day 7**.

## Privacy
Everything runs inside your own browser. Policy exports you load into the app are **never uploaded** to GitHub or any server. The reminder log is kept in your browser's local storage on your own device.

## Install as an app (Chrome on Mac)
1. Open the app link in Google Chrome.
2. Click the **Install** icon at the right of the address bar (or ⋮ menu → Cast, save and share → Install page as app).
3. Noti-premium now opens in its own window from the Dock or Launchpad and works offline.

## Weekly use
1. Export **View All Policies** from ePartner (Application → Policy Enquiry) to Excel/CSV.
2. Drop the file into Noti-premium.
3. Confirm the columns and failed-payment statuses (first time only).
4. Click **WhatsApp R1 / R2**, check the message, send it in WhatsApp, then confirm it was sent.
5. Check the ⚠️ Data issues list. Those customers were not messaged.

| Days since premium due | Action |
|---|---|
| Not due / 0–2 | Watch only |
| 3–6 | Reminder 1 |
| 7+ | Reminder 2 |
| Both sent, still unpaid | Call the customer |

Messages are never sent automatically. You review and press Send yourself in WhatsApp.

Excel reading by [SheetJS](https://sheetjs.com) (Apache 2.0).
