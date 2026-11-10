// All site content lives here — edit services, hours and policies in this one file.
// Business details are from the Google Business listing (MacTech, 1022 St Clair Ave W).
// No fixed prices anywhere: every repair is diagnosed free in store and the exact
// price is confirmed with the customer before any work starts.

export const ISSUES = {
  "iPhone": {
    "Cracked screen":        {time:"45–60 minutes", note:"Model and screen type decide the repair."},
    "Battery replacement":   {time:"30–45 minutes", note:"Includes a free battery-health check."},
    "Charging port / not charging": {time:"1–2 hours", note:"Cleaning is free if lint is the culprit."},
    "Camera not working":    {time:"1–2 hours", note:"Front, rear, or lens-glass only options."},
    "Water damage":          {time:"Same day assessment", note:"Power off, don't charge it, bring it in fast."},
    "Back glass cracked":    {time:"2–3 hours", note:"Laser machine removal — no frame swap needed."},
    "Won't turn on / other": {time:"Same day", note:"Diagnosed free — exact price confirmed before any work."}
  },
  "Samsung / Android": {
    "Cracked screen":        {time:"1–2 hours", note:"OLED screens can take a little longer to source."},
    "Battery replacement":   {time:"45–60 minutes", note:"Most models done while you wait."},
    "Charging port / not charging": {time:"1–3 hours", note:"Includes port cleaning & cable test."},
    "Camera not working":    {time:"1–2 hours", note:"Lens glass can often be replaced on its own."},
    "Water damage":          {time:"Same day assessment", note:"Ultrasonic cleaning + board inspection."},
    "Software / stuck on logo": {time:"Same day", note:"Data-safe methods tried first, always."},
    "Won't turn on / other": {time:"Same day", note:"Diagnosed free — exact price confirmed before any work."}
  },
  "MacBook / iMac": {
    "Cracked screen":        {time:"1–2 days", note:"Retina assemblies; model year decides the repair."},
    "Battery replacement":   {time:"Same day", note:"Includes cycle-count & health report."},
    "Keyboard / trackpad":   {time:"1–2 days", note:"Liquid-damaged top cases quoted after inspection."},
    "Liquid spill":          {time:"2–5 days", note:"Stop using it & unplug — corrosion spreads fast."},
    "Slow / SSD upgrade":    {time:"Same day", note:"SSD + RAM upgrades make 2015–2019 Macs feel new."},
    "Logic board repair":    {time:"2–5 days", note:"Component-level repair — far cheaper than board replacement."},
    "Won't turn on / other": {time:"Same day", note:"Diagnosed free — exact price confirmed before any work."}
  },
  "iPad / Tablet": {
    "Cracked screen / glass": {time:"Same day – 1 day", note:"Digitizer-only repairs cost less when the LCD is fine."},
    "Battery replacement":   {time:"1 day", note:"Swollen battery? Stop using it & bring it in."},
    "Charging port / not charging": {time:"1 day", note:"Common on Lightning iPads — fixable."},
    "Bent frame / won't sit flat": {time:"1–2 days", note:"Frame straightening or housing swap."},
    "Won't turn on / other": {time:"Same day", note:"Diagnosed free — exact price confirmed before any work."}
  },
  "Laptop / PC": {
    "Cracked screen":        {time:"Same day – 1 day", note:"Most Windows laptop panels in stock."},
    "Slow / virus removal":  {time:"Same day", note:"Full cleanup, updates & security check."},
    "SSD / RAM upgrade":     {time:"Same day", note:"The best value upgrade for any 4+ year-old PC."},
    "Won't boot / blue screen": {time:"Same day assessment", note:"We recover your files first, then fix the cause."},
    "Battery / charging":    {time:"Same day – 1 day", note:"Batteries for Dell, HP, Lenovo, ASUS & more."},
    "Custom build / upgrade advice": {time:"While you wait", note:"Bring your parts list — we'll check it free."},
    "Won't turn on / other": {time:"Same day", note:"Diagnosed free — exact price confirmed before any work."}
  },
  "Game Console": {
    "HDMI port (no picture)": {time:"1–2 days", note:"PS5 / Xbox Series — microscope soldering, tested on 4K."},
    "Overheating / loud fan": {time:"Same day", note:"Deep clean + fresh thermal paste / liquid metal check."},
    "Disc drive not reading": {time:"1–2 days", note:"Lens, motor, or full drive replacement."},
    "Controller drift":      {time:"Same day", note:"Per controller — sticks replaced, not just cleaned."},
    "Won't turn on / other": {time:"Same day", note:"Diagnosed free — exact price confirmed before any work."}
  },
  "Smartwatch": {
    "Cracked screen":        {time:"1–2 days", note:"Apple Watch & Galaxy Watch, all sizes."},
    "Battery replacement":   {time:"1 day", note:"Includes re-sealing to restore splash resistance."},
    "Won't turn on / other": {time:"Same day", note:"Diagnosed free — exact price confirmed before any work."}
  },
  "Data Recovery": {
    "Deleted files / formatted": {time:"1–3 days", note:"Stop using the drive — new writes overwrite lost files."},
    "Dead hard drive / SSD": {time:"3–7 days", note:"No data, no fee on standard recoveries."},
    "Phone data recovery":   {time:"2–5 days", note:"Photos & chats from dead or damaged phones."},
    "RAID / NAS failure":    {time:"Quoted after assessment", note:"Business priority service available."},
    "Not sure / other":      {time:"Same day", note:"We'll tell you honestly if recovery is realistic."}
  },
  "In-Home TV": {
    "No picture / blank screen": {time:"In-home visit", note:"We test the panel and power board at your home."},
    "No sound / distorted audio": {time:"In-home visit", note:"Speakers, board and connections checked on site."},
    "Won't connect to apps / Wi-Fi": {time:"Same day", note:"Network, firmware and streaming apps checked."},
    "Won't turn on / other": {time:"Same day assessment", note:"Diagnosed on site — exact price confirmed before any work."}
  }
};

export const DEVICES = Object.keys(ISSUES);

export const SERVICES = [
  {device:"iPhone", page:"iphone", img:"/images/iphone.jpg", alt:"Cracked iPhone screen held in hand before repair", title:"iPhone Repair", text:"Cracked screen, shattered back glass, or a failing battery — most iPhone repairs are done while you wait at our St Clair Ave W shop.", time:"45–60 min"},
  {device:"MacBook / iMac", page:"macbook", img:"/images/macbook.jpg", alt:"Hands lifting a MacBook logic board during a board-level repair", title:"MacBook & iMac Repair", text:"Cracked Retina screens, liquid spills, failing logic boards and tired batteries — fixed at component level instead of costly full replacements.", time:"Same day – 5 days"},
  {device:"iPad / Tablet", img:"/images/ipad.jpg", alt:"Tablet with a cracked screen ready for glass replacement", title:"iPad & Tablet Repair", text:"Broken glass, unresponsive touch, swollen batteries and charging faults on iPads and Android tablets for work, school and kids.", time:"Same day – 1 day"},
  {device:"Samsung / Android", page:"samsung", img:"/images/android.jpg", alt:"Technician inspecting a disassembled Android phone under a magnifier", title:"Android Repair", text:"Galaxy, Pixel and more — screen, battery, camera and charging repairs with parts matched to your exact model.", time:"1–2 hours"},
  {device:"Laptop / PC", page:"laptop", img:"/images/laptop.jpg", alt:"Technician workspace with hard drives and data recovery equipment", title:"Laptop & Desktop PC", text:"Blue screens, dead drives, virus cleanups and SSD upgrades that make an older Windows machine feel new again.", time:"Same day"},
  {device:"Game Console", img:"/images/console.jpg", alt:"Technician opening a game console to repair its cooling system", title:"Game Console Repair", text:"PS5, Xbox and Switch — HDMI ports, overheating, disc drives and Joy-Con drift, tested properly before pickup.", time:"Same day – 2 days"},
  {device:"Smartwatch", img:"/images/smartwatch.jpg", alt:"Technician repairing small devices at a workbench", title:"Smartwatch Repair", text:"Cracked Apple Watch or Galaxy Watch glass and worn-out batteries, re-sealed so your watch stays splash-resistant.", time:"1–2 days"},
  {device:"Data Recovery", page:"data-recovery", img:"/images/data-recovery.jpg", alt:"Hard drives on a bench during a data recovery assessment", title:"Data Recovery", text:"Family photos, business files and school work recovered from dead drives, SSDs and phones. No data, no fee on standard jobs.", time:"1–7 days"},
  {device:"In-Home TV", img:"/images/hero.jpg", alt:"Technician repairing electronics at a clean workbench", title:"In-Home TV Repair", text:"Blank screens, distorted audio, or a TV that won't connect to your streaming apps — repaired at your home across Toronto.", time:"In-home visit"}
];

// Reviews are NOT hardcoded. The rating, review count and latest reviews are
// fetched live from the Google Places API via the /api/reviews serverless
// function (see api/reviews.js and src/lib/googleReviews.js). This URL is
// only the fallback link to the shop's Google listing, used when the live
// endpoint is unavailable (e.g. the API key is not configured yet).
export const GOOGLE_LISTING_URL = "https://maps.app.goo.gl/ZVXv3ArpgyCwYCdQ6?g_st=ic";

export const FAQS = [
  { q: "How much will my repair cost?", a: "We don't set prices in advance. Every device is diagnosed free in store, and we tell you the exact cost before any work starts. You approve the price first — there are no surprises, and no charge if you decide not to repair." },
  { q: "How long does a typical repair take?", a: "Most phone screens and batteries are done within a few hours. Motherboard and liquid-damage repairs take 2–5 working days depending on parts. We'll give you a firm timeline after free diagnostics." },
  { q: "Do I need an appointment, or can I walk in?", a: "Walk-ins are always welcome. Booking online reserves your day and lets us pre-order any uncommon part, so your repair starts the moment you arrive. There are no fixed time slots — we confirm the details with you by text." },
  { q: "Do you offer walk-in, mail-in and in-home repairs?", a: "Yes, all three. Walk into our St Clair Ave W shop, mail your device in from anywhere in Canada, or book an in-home visit for TV and computer repairs." },
  { q: "Is my data safe during a repair?", a: "Yes. We never access personal files, photos, or messages. For screen and battery work your data isn't touched at all. We still recommend a backup before any repair, and we can help you make one in store, free." },
  { q: "What warranty do I get?", a: "Every repair includes a 3-month warranty on parts and workmanship. If the same issue comes back in that window, we fix it free. The warranty does not cover liquid or water damage, LCD cracks, or pressure damage." },
  { q: "What if my device can't be fixed?", a: "Then you pay nothing — diagnostics are free and there's no repair, no fee. We'll explain your options, including data recovery, with zero pressure." },
  { q: "What is your refund policy?", a: "We don't offer refunds. If a part or product we supplied is defective, we exchange it for a working one — see our Refund & Exchange Policy below." },
  { q: "Do you use genuine parts?", a: "Yes. We use genuine or OEM-grade parts, matched to your exact model and tested before your device leaves the shop." },
];

// Opening hours from the Google Business listing.
export const HOURS = [
  { day: 1, label: "Monday", time: "10:00 AM – 6:30 PM" },
  { day: 2, label: "Tuesday", time: "10:00 AM – 6:30 PM" },
  { day: 3, label: "Wednesday", time: "10:00 AM – 8:00 PM" },
  { day: 4, label: "Thursday", time: "9:30 AM – 7:00 PM" },
  { day: 5, label: "Friday", time: "9:30 AM – 7:30 PM" },
  { day: 6, label: "Saturday", time: "10:00 AM – 7:00 PM" },
  { day: 0, label: "Sunday", time: "10:00 AM – 6:00 PM" },
];

// Real business details from the Google Business listing.
// Shop email provided by ALU on 2026-11-09: Info1.macxpert@gmail.com.
// Booking request emails still go to aleemzulfiqar7@gmail.com (FormSubmit).
export const SHOP = {
  name: "MacXpert Toronto",
  address: "1022 St Clair Ave W, Toronto, ON M6E 1A4",
  phoneDisplay: "+1 (647) 569-6360",
  phoneHref: "tel:+16475696360",
  email: "Info1.macxpert@gmail.com",
  directionsUrl: "https://www.google.com/maps/search/?api=1&query=1022+St+Clair+Ave+W+Toronto+ON",
  mapsUrl: "https://maps.app.goo.gl/ZVXv3ArpgyCwYCdQ6?g_st=ic",
};

export const POLICIES = [
  {
    id: "privacy",
    title: "Privacy Policy",
    body: [
      "We collect only what you give us in the booking form — your name, phone number, email address, and details about your device and the problem — so we can confirm your booking and contact you about your repair.",
      "We use that information only to arrange and carry out your repair. We do not sell it or share it with anyone else, except the email service that delivers your booking request to us.",
      "We do not store your booking details on this website. If you would like us to delete the details you sent, call or visit the shop and we will remove them from our inbox.",
      "Questions about your information? Call +1 (647) 569-6360 or visit us at 1022 St Clair Ave W, Toronto."
    ]
  },
  {
    id: "refund",
    title: "Refund & Exchange Policy",
    body: [
      "No refunds. If a part or product we supplied is defective, we will exchange it for a working one.",
      "To request an exchange, bring the device and your booking reference or receipt to the shop within the 3-month warranty period. We will test it and exchange the defective part.",
      "Repairs are confirmed and priced with you before work starts, so you always approve the cost first."
    ]
  },
  {
    id: "warranty",
    title: "Warranty",
    body: [
      "Every repair is covered for 3 months on parts and workmanship, from the day you pick up your device.",
      "If the same problem comes back within 3 months, we will fix it free.",
      "The warranty does not cover liquid or water damage, LCD cracks, or pressure damage. It also does not cover damage caused after the repair, such as drops or further liquid exposure.",
      "Bring your booking reference or receipt when claiming warranty service."
    ]
  }
];

// ---------------------------------------------------------------------------
// Separate service pages (hash routes: #/service/<slug>).
// Content is from the shop's service pages on themactech.ca. No prices
// anywhere — the price is confirmed after free in-store diagnostics.
// Every repair includes a 3-month warranty on parts and workmanship
// (excludes liquid/water damage, LCD cracks and pressure damage), and
// walk-in, mail-in and in-home options are offered.
// `device` is the booking-form device preselected by "Book this repair".
// ---------------------------------------------------------------------------
export const SERVICE_PAGES = [
  {
    slug: "macbook",
    title: "MacBook Repair",
    device: "MacBook / iMac",
    img: "/images/macbook.jpg",
    alt: "Hands lifting a MacBook logic board during a board-level repair",
    time: "Screen & battery typically one day",
    intro: "MacBook Air and MacBook Pro repairs for Intel and Apple Silicon models — from cracked screens to tired batteries and liquid-damaged keyboards. Every MacBook is diagnosed free in store, and the exact price is confirmed with you before any work starts.",
    points: [
      "Screen replacement with calibrated OEM displays",
      "Battery replacement with a cycle-count and health report",
      "Keyboard and trackpad repair and replacement",
      "Fan and cooling fixes for overheating and loud fans",
      "RAM and SSD upgrades to make an older Mac feel new again",
      "Free diagnostics and a firm quote before any work"
    ],
    details: [
      "Screen and battery repairs are typically done in one day. Board-level and liquid-damage work takes longer — we will give you a firm timeline after the free diagnosis.",
      "Walk in to our St Clair Ave W shop, mail your MacBook in from anywhere in Canada, or ask about an in-home visit."
    ]
  },
  {
    slug: "imac",
    title: "iMac Repair",
    device: "MacBook / iMac",
    img: "/images/macbook.jpg",
    alt: "iMac on a repair bench during a screen replacement",
    time: "Quoted after free diagnostics",
    intro: "iMac screen replacement, hardware upgrades and software repair, diagnosed free in store. We confirm the exact price with you before any work starts — no pre-determined charges.",
    points: [
      "iMac screen replacement",
      "Hardware upgrades — SSD and RAM to speed up a slow iMac",
      "Software repair for crashes, failed updates and startup problems",
      "Free diagnostics and a firm quote before any work"
    ],
    details: [
      "An SSD upgrade is the single best fix for a slow spinning-drive iMac — we clone your data across so everything is exactly where you left it.",
      "Walk in, or ask about an in-home visit if your iMac is hard to move."
    ]
  },
  {
    slug: "iphone",
    title: "iPhone Repair",
    device: "iPhone",
    img: "/images/iphone.jpg",
    alt: "Cracked iPhone screen held in hand before repair",
    time: "Most repairs same-day",
    intro: "Cracked, shattered or unresponsive iPhone screens, worn batteries and charging faults — most iPhone repairs are done the same day at our St Clair Ave W shop. Diagnostics are free, and the exact price is confirmed before we start.",
    points: [
      "Cracked, shattered or unresponsive screens — OLED and LCD options",
      "Battery replacement with a free battery-health check",
      "Back glass replacement using laser technology — no frame swap needed",
      "Charging port repair for phones that won't charge reliably",
      "Water damage diagnosis with ultrasonic cleaning",
      "Most repairs completed same-day"
    ],
    details: [
      "Spilled liquid on your iPhone? Power it off, don't charge it, and bring it in as fast as you can — corrosion spreads quickly.",
      "Walk in, mail your iPhone in from anywhere in Canada, or book ahead and we will have the part ready."
    ]
  },
  {
    slug: "samsung",
    title: "Samsung & Android Repair",
    device: "Samsung / Android",
    img: "/images/android.jpg",
    alt: "Technician inspecting a disassembled Android phone under a magnifier",
    time: "24–48 hours",
    intro: "Screen, battery, charging port, camera and software repair for Samsung, Google Pixel, Motorola, OnePlus and other Android phones. Diagnostics are free, and the exact price is confirmed before any work starts.",
    points: [
      "Screen replacement for cracked or unresponsive displays",
      "Battery replacement for fast-draining phones",
      "Charging port repair and cleaning",
      "Software repair — crashes, boot loops and update failures",
      "Camera repair, including lens glass",
      "Data recovery from phones that won't turn on"
    ],
    details: [
      "Most Android repairs are done in 24–48 hours depending on parts for your exact model.",
      "Walk in, or mail your phone in from anywhere in Canada."
    ]
  },
  {
    slug: "laptop",
    title: "Laptop & Desktop Repair",
    device: "Laptop / PC",
    img: "/images/laptop.jpg",
    alt: "Technician workspace with hard drives and computer repair equipment",
    time: "24–48 hours",
    intro: "Laptop and desktop repair for all major brands, Windows and Mac — screens, batteries, keyboards, power faults and slow machines. Diagnostics are free, and the exact price is confirmed before any work starts.",
    points: [
      "Laptop screen, battery, keyboard and trackpad replacement",
      "Desktop repair — won't power on, overheating and crashes",
      "Power supplies, motherboards, RAM and hard drives tested and replaced",
      "Virus removal and software repair",
      "RAM, SSD and operating system upgrades"
    ],
    details: [
      "Most laptop and desktop repairs are done in 24–48 hours. An SSD and RAM upgrade is the best-value fix for a slow 4+ year-old machine.",
      "Walk in, mail your laptop in, or book an in-home visit for desktop and computer repairs."
    ]
  },
  {
    slug: "motherboard",
    title: "Motherboard-Level Repair",
    device: "MacBook / iMac",
    img: "/images/macbook.jpg",
    alt: "Microsoldering work on a logic board under a microscope",
    time: "A few days",
    intro: "Component-level logic board repair: instead of replacing the full board, we find and repair only the faulty chip or component. That keeps your data on your own board and usually costs far less than a board replacement.",
    points: [
      "Component-level logic board diagnosis and repair",
      "Repair only the faulty chip or component — no full board replacement",
      "Chip replacement and short-circuit repair",
      "Microsoldering under a microscope",
      "Thermal imaging to find failing components",
      "ESD-protected workbench for every board job"
    ],
    details: [
      "Motherboard-level repairs typically take a few days — board faults have to be traced properly, not guessed at.",
      "Diagnostics are free, and the exact price is confirmed with you before any component work starts."
    ]
  },
  {
    slug: "liquid-damage",
    title: "Liquid Damage Repair",
    device: "MacBook / iMac",
    img: "/images/iphone.jpg",
    alt: "Phone opened for ultrasonic cleaning after liquid damage",
    time: "Assessed case by case",
    intro: "Spilled water, coffee or anything else on your device? Liquid damage is assessed case by case. Power the device off, don't charge it, and bring it in as fast as you can — corrosion spreads quickly.",
    points: [
      "Full ultrasonic cleaning of the board and components",
      "Corrosion check across the whole board, not just the wet spot",
      "Water-damaged keyboard repair and replacement",
      "Covers MacBook, iPhone and Android devices"
    ],
    details: [
      "There is no fixed price for liquid damage: the price is quoted only after cleaning and diagnosis, once we can see exactly what the liquid reached.",
      "Please note the 3-month warranty does not cover liquid or water damage."
    ]
  },
  {
    slug: "data-recovery",
    title: "Data Recovery",
    device: "Data Recovery",
    img: "/images/data-recovery.jpg",
    alt: "Hard drives on a bench during a data recovery assessment",
    time: "Standard software cases 24–48 hours",
    intro: "Family photos, business files and school work recovered from dead drives, SSDs, phones and memory cards. No data, no fee — and your data is kept confidential at every step.",
    points: [
      "HDD and SSD / NVMe recovery",
      "RAID array recovery",
      "USB drive and memory card recovery",
      "Phone and tablet recovery, including phones that won't turn on",
      "Accidental deletion and formatting recovery",
      "No data, no fee — and your data stays confidential"
    ],
    details: [
      "Standard software cases are typically done in 24–48 hours; physically damaged drives take longer and are quoted after assessment.",
      "Deleted something? Stop using the drive right away — new writes overwrite lost files."
    ]
  }
];

export const servicePageBySlug = (slug) => SERVICE_PAGES.find((p) => p.slug === slug);
