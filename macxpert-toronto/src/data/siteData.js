// All site content lives here — edit services, hours, and policies in this one file.
// Content matches the hosted preview exactly (same text, same images).
// No fixed prices anywhere: every repair is diagnosed in store, and the exact
// price is confirmed with the customer before any work starts.

export const SHOP = {
  name: "MacXpert Toronto",
  address: "1022 St Clair Ave W, Toronto, ON M6E 1A4",
  phoneDisplay: "+1 (647) 569-6360",
  phoneHref: "tel:+16475696360",
  email: "Info1.macxpert@gmail.com",
  mapsUrl: "https://maps.app.goo.gl/ZVXv3ArpgyCwYCdQ6?g_st=ic",
};
export const GOOGLE_LISTING_URL = "https://maps.app.goo.gl/ZVXv3ArpgyCwYCdQ6?g_st=ic";

// Booking-form device / issue lists — exactly as on the preview site.
// The booking form appends an "Other" option to every issue list; choosing
// it (or the "Other" device) reveals a free-text field in the form.
export const ISSUES = {
  "iPhone": ["Cracked screen", "Back glass cracked", "Battery replacement", "Charging port / not charging", "Camera not working", "Water damage", "Won't turn on"],
  "Samsung / Android": ["Cracked screen", "Battery replacement", "Charging port / not charging", "Camera not working", "Water damage", "Software / stuck on logo", "Won't turn on"],
  "MacBook / iMac": ["Cracked screen", "Battery replacement", "Keyboard / trackpad", "Liquid spill", "Slow / needs an upgrade", "Logic board repair", "Won't turn on"],
  "iPad / Tablet": ["Cracked screen / glass", "Battery replacement", "Charging port / not charging", "Bent frame", "Won't turn on"],
  "Laptop / PC": ["Cracked screen", "Slow / virus removal", "SSD / RAM upgrade", "Won't boot / blue screen", "Battery / charging", "Won't turn on"],
  "Game Console": ["HDMI port (no picture)", "Overheating / loud fan", "Disc drive not reading", "Controller drift", "Won't turn on"],
  "Smartwatch": ["Cracked screen", "Battery replacement", "Won't turn on"],
  "TV": ["No picture / blank screen", "Sound problems", "Won't turn on", "Won't connect / smart app issues", "Lines or spots on screen"],
  "Data Recovery": ["Deleted files / formatted drive", "Dead hard drive / SSD", "Phone data recovery", "RAID / NAS failure", "Not sure what's wrong"],
  "Other": ["Cracked screen", "Battery problem", "Water / liquid damage", "Software problem", "Won't turn on", "Not sure what's wrong"]
};
export const DEVICES = Object.keys(ISSUES);

// Turnaround shown in the booking form's "Your repair" display box —
// timing only, never a price. Keyed by device, with issue-level overrides.
export const TURNAROUNDS = {
  "iPhone": { time: "Most repairs same-day", note: "Screens, batteries and back glass are usually finished the same day you drop in. Your exact timeline is confirmed after the diagnosis." },
  "Samsung / Android": { time: "24–48 hours", note: "Most Samsung and Android repairs are done within one to two days, depending on parts for your model." },
  "MacBook / iMac": { time: "Screen & battery typically 1 day", note: "Board-level and other complex work can take a few days. We confirm your timeline after the diagnosis." },
  "iPad / Tablet": { time: "Same day – 1 day", note: "Most tablet repairs are finished the same day or the next." },
  "Laptop / PC": { time: "24–48 hours", note: "Most laptop and desktop repairs are done within one to two days." },
  "Game Console": { time: "Same day – 2 days", note: "HDMI ports, fans and disc drives are usually turned around within two days." },
  "Smartwatch": { time: "1–2 days", note: "Most smartwatch repairs are finished within one to two days." },
  "TV": { time: "In-home visits available", note: "We come to you. Your visit timing is confirmed when we call to confirm your booking." },
  "Data Recovery": { time: "Software cases 24–48 hours", note: "Complex physical recovery takes longer and is confirmed after the assessment. No data, no fee." },
  "Other": { time: "Confirmed after diagnostics", note: "Once we've seen the device, we confirm your timeline along with your price. Before any work begins." }
};
export const ISSUE_TURNAROUNDS = {
  "Logic board repair": { time: "A few days", note: "Board-level work takes a few days. We confirm your timeline after the diagnosis." },
  "Liquid spill": { time: "Assessed after cleaning & diagnosis", note: "Liquid damage is timed and priced only after ultrasonic cleaning and a full diagnosis." },
  "Water damage": { time: "Assessed after cleaning & diagnosis", note: "Liquid damage is timed and priced only after ultrasonic cleaning and a full diagnosis." },
  "Water / liquid damage": { time: "Assessed after cleaning & diagnosis", note: "Liquid damage is timed and priced only after ultrasonic cleaning and a full diagnosis." }
};

// Homepage services grid — 12 SEPARATE cards, exactly as on the preview.
// `route` is the service page the card links to (8 cards have one);
// `device` is the booking-form device the card preselects.
export const SERVICES = [
  { route: "iphone", device: "iPhone", img: "/images/iphone.jpg", alt: "Cracked iPhone screen held in hand before repair", title: "iPhone Repair", text: "Is a cracked screen, shattered back glass, or a failing battery slowing you down? At our St Clair Ave W store, we specialize in professional iPhone repair, including screens, back glass, batteries, and more.", time: "Most repairs same-day" },
  { route: "macbook", device: "MacBook / iMac", img: "/images/macbook.jpg", alt: "Hands lifting a MacBook logic board during a board-level repair", title: "MacBook Repair", text: "Cracked screen, dead battery, sticky keyboard, or a MacBook that won't turn on. We repair MacBook Air and Pro, Intel, and Apple Silicon, down to the component level.", time: "Screen & battery: typically 1 day" },
  { route: "imac", device: "MacBook / iMac", img: "/images/imac.jpg", alt: "Apple iMac all-in-one desktop computer on a desk", title: "iMac Repair", text: "Screen replacement, hardware upgrades, and software repair for Apple's all-in-one desktop — all diagnosed in store before any work begins.", time: "Same day or a few days" },
  { route: "motherboard", device: "MacBook / iMac", img: "/images/motherboard.jpg", alt: "Close-up of a computer motherboard circuit board with chips and slots", title: "Motherboard-Level Repair", text: "Dead board? We diagnose and repair only the faulty chip or component. Microsoldering, thermal imaging, and short-circuit repair are used instead of a full board replacement.", time: "A few days" },
  { route: "liquid-damage", device: "iPhone", img: "/images/liquid-damage.jpg", alt: "Tipped-over glass spilling water across a laptop keyboard", title: "Liquid Damage Repair", text: "Spilled water, coffee, or worse? Liquid damage is assessed case by case with ultrasonic cleaning and a full corrosion check for MacBook, iPhone, and Android.", time: "Quoted after cleaning & diagnosis" },
  // { device: "iPad / Tablet", img: "/images/ipad.jpg", alt: "Tablet with a cracked screen ready for glass replacement", title: "iPad & Tablet Repair", text: "Broken display, battery swelling, or charging issues — we bring your tablet back to smooth, seamless performance for work, school, or play.", time: "Same day – 1 day" },
  { route: "laptop", device: "Laptop / PC", img: "/images/laptop-repair.jpg", alt: "Open laptop computer on a desk", title: "Laptop & Desktop Repair", text: "A broken laptop screen, a sudden blue screen error, or a desktop that refuses to power on can halt your whole day. We diagnose the real cause and fix it properly.", time: "24–48 hours" },
  { route: "samsung", device: "Samsung / Android", img: "/images/samsung.jpg", alt: "Samsung Galaxy smartphone held in a hand showing its home screen", title: "Samsung / Android Repair", text: "A shattered screen, an unresponsive touchscreen, or a battery that dies halfway through the day shouldn't leave you disconnected. Samsung, Pixel, Motorola, OnePlus, and more are repaired with parts matched to your model.", time: "24–48 hours" },
  // { device: "Smartwatch", img: "/images/hero.jpg", alt: "Technician repairing small devices at a workbench", title: "Smartwatch Repair", text: "Whether your smartwatch has a cracked screen, faulty sensors, or battery problems, our experts bring it back to perfect sync and function.", time: "1–2 days" },
  { route: "data-recovery", device: "Data Recovery", img: "/images/data-recovery.jpg", alt: "Hard drives on a bench during a data recovery assessment", title: "Data Recovery", text: "Losing access to critical files, business documents, or irreplaceable family memories is stressful, but it doesn't have to be permanent. We recover HDD, SSD, RAID, and phone data. No data, no fee.", time: "Software cases 24–48 hours" },
  // { device: "TV", img: "/images/tv.webp", alt: "Technician repairing the internal electronics of a wall-mounted TV during an in-home visit", title: "In-Home TV Repair", text: "A sudden blank screen, distorted audio, or a television that refuses to connect to your streaming apps can disrupt your whole evening. Book an in-home visit, and we'll fix it where it sits.", time: "In-home visits available" },
  { device: "Game Console", img: "/images/playstation.jpg", alt: "Black PlayStation DualSense controller on a white background", title: "Game Console Repair", text: "PS5, Xbox, and Switch — HDMI ports, overheating, disc drives, and controller drift, all tested properly before pickup.", time: "Same day or 2 days" }
];

export const FAQS = [
  { q: "What devices do you repair?", a: "A wide range of gadgets: iPhones, iMacs, MacBooks, iPads, Android phones, laptops, desktops, smartwatches, gaming consoles, printers, smart TVs and more. We specialize in Apple devices and also repair Samsung, Dell, HP, Lenovo, Sony, Microsoft, Xiaomi, Oppo, Vivo, LG and many other brands." },
  { q: "How much will my repair cost?", a: "We don't use pre-set price lists. Bring your device in (or mail it / book a visit) and we'll diagnose it at the store, then tell you exactly how much the repair will cost. Work only starts once you approve the price. If you decide not to repair, you pay nothing." },
  { q: "How long does a typical repair take?", a: "Most basic repairs, like screen or battery replacements, are completed within a few hours. Complex issues such as motherboard or liquid damage may take 2–5 working days depending on part availability. We'll confirm your timeline after the diagnosis." },
  { q: "Do you only take walk-ins, or also mail-in and in-home repairs?", a: "All three. Walk into our St Clair Ave W store any time during opening hours, mail your device in from anywhere in Canada, or book an in-home visit. Ideal for TVs and desktop setups. Choose your option when you book." },
  { q: "Is my data safe during a repair?", a: "We take your data privacy very seriously and never access personal files, photos or messages. As a safety measure, we always recommend backing up your data before submitting your device for repair. We can help you make a backup in store." },
  { q: "What warranty do I get?", a: "All repairs come with a 3-month warranty covering parts and workmanship. The warranty does not cover liquid or water damage, LCD cracks, or pressure damage. See our warranty policy for full details.", linkText: "warranty policy", linkHref: "#warranty" },
  { q: "What if I change my mind or the goods are defective?", a: "We operate a no-refund policy. Defective goods are exchanged — see our refund & exchange policy. And remember: if you don't approve the in-store quote, there's no repair and no charge.", linkText: "refund & exchange policy", linkHref: "#refunds" }
];

// Opening hours from the Google Business listing.
export const HOURS = [
  { day: 1, label: "Monday", time: "10:00 AM – 6:30 PM" },
  { day: 2, label: "Tuesday", time: "10:00 AM – 6:30 PM" },
  { day: 3, label: "Wednesday", time: "10:00 AM – 8:00 PM" },
  { day: 4, label: "Thursday", time: "9:30 AM – 7:00 PM" },
  { day: 5, label: "Friday", time: "9:30 AM – 7:30 PM" },
  { day: 6, label: "Saturday", time: "10:00 AM – 7:00 PM" },
  { day: 0, label: "Sunday", time: "10:00 AM – 6:00 PM" }
];

// Store policies — exactly as on the preview. `intro` is the lead paragraph
// (with `introBold` segments rendered in bold), `bullets` are "Label: text".
export const POLICIES = [
  {
    id: "privacy", title: "Privacy Policy", icon: "shield",
    intro: "MacXpert Toronto respects your privacy. This policy explains what we collect and why.", introBold: [],
    bullets: [
      ["What we collect:", "your name, phone number and email when you book a repair, plus details about your device and its fault."],
      ["How we use it:", "only to manage your booking, carry out your repair, and contact you about its status. We never sell your information."],
      ["Your device data:", "our technicians do not access, copy or share your personal files, photos or messages during a repair."],
      ["Sharing:", "we share information only with service providers needed to complete your repair (for example, mail carriers for mail-in repairs), or when required by law."],
      ["Your rights:", "contact us at Info1.macxpert@gmail.com to see, correct or delete the personal information we hold about you."]
    ]
  },
  {
    id: "refunds", title: "Refund & Exchange Policy", icon: "refund",
    intro: "No refunds. All sales at MacXpert Toronto are final. We do not offer refunds on products or completed repairs.", introBold: ["No refunds."],
    bullets: [
      ["Defective goods:", "if an item you bought from us is defective, we will exchange it for the same or an equivalent item."],
      ["Proof of purchase:", "please bring your receipt and the item in its original condition for any exchange."],
      ["Repairs:", "issues with a completed repair are handled under our 3-month warranty on parts and workmanship rather than by refund."],
      ["Change of mind:", "Every price is approved by you before work begins, change-of-mind returns are not accepted."]
    ]
  },
  {
    id: "warranty", title: "Warranty Policy", icon: "medal",
    intro: "Every repair at MacXpert Toronto is covered by a 3-month warranty on parts and workmanship. If the same fault returns within 3 months, we will put it right.", introBold: ["3-month warranty on parts and workmanship"],
    bullets: [
      ["Covered:", "defects in the parts we installed and in our workmanship, for the specific repair carried out."],
      ["Not covered:", "liquid or water damage."],
      ["Not covered:", "LCD cracks or any cracked glass/display after repair."],
      ["Not covered:", "pressure damage, accidental or physical damage, and faults unrelated to the original repair."],
      ["To claim:", "bring your device and receipt to the store within the warranty period and we'll assess it."]
    ]
  }
];

// ---------------------------------------------------------------------------
// Separate service pages (hash routes: #/service/<slug>) — content exactly
// as on the preview. No prices anywhere — the price is confirmed after
// in-store diagnostics. Every repair includes a 3-month warranty on parts
// and workmanship (excludes liquid/water damage, LCD cracks and pressure
// damage), and walk-in, mail-in and in-home options are offered.
// `device` / `issue` / `note` preselect the booking form.
// ---------------------------------------------------------------------------
export const SERVICE_PAGES = [
  {
    slug: "macbook", title: "MacBook Repair", device: "MacBook / iMac", issue: null, note: null,
    img: "/images/macbook.jpg", alt: "Technician repairing a MacBook logic board on the bench",
    intro: "You don't need a brand-new computer when your MacBook fails. At our St Clair Ave W store we repair MacBooks down to component level — screens, batteries, keyboards and boards — starting with diagnostics and a confirmed quote before any work begins.",
    covers: "Covers MacBook Air and MacBook Pro — Intel and Apple Silicon models.",
    turnaround: "Screen and battery typically one day",
    repairs: [
      ["Screen replacement", "Cracked or faulty displays replaced with calibrated OEM displays, matched for colour and brightness."],
      ["Battery replacement", "Worn, swollen or fast-draining batteries replaced so your MacBook holds a charge the way it should."],
      ["Keyboard repair & replacement", "Sticky, unresponsive or damaged keys repaired, or the full keyboard replaced."],
      ["Trackpad repair", "Trackpads that click poorly, drift or stop responding — repaired or replaced."],
      ["Fan & cooling fixes", "Loud fans, overheating and thermal shutdowns fixed with fan and cooling-system repairs."],
      ["System diagnostics", "Full system diagnostics and quote — you approve the price before we start."],
      ["RAM & SSD upgrades", "Memory and storage upgrades that make an older MacBook feel fast again."]
    ],
    extra: { title: "Need board-level work?", text: "If the fault is on the logic board itself, see our motherboard-level repair page — we repair the faulty component instead of replacing the whole board.", linkText: "motherboard-level repair page", linkHref: "#/service/motherboard" }
  },
  {
    slug: "imac", title: "iMac Repair", device: "MacBook / iMac", issue: null, note: null,
    img: "/images/imac.jpg", alt: "Apple iMac all-in-one desktop computer on a desk",
    intro: "A cracked iMac screen, a painfully slow drive or an iMac that won't boot doesn't mean replacing the whole machine. We diagnose every iMac in store, confirm the price with you, and then repair or upgrade it properly.",
    covers: "Covers iMac and iMac Pro models — Intel and Apple Silicon.",
    turnaround: "Confirmed after diagnostics",
    repairs: [
      ["Screen replacement", "Cracked, flickering or failing iMac displays replaced and calibrated."],
      ["Hardware upgrades", "RAM and storage upgrades — including SSD upgrades that transform a slow, spinning-drive iMac."],
      ["Software repair", "macOS faults, boot problems and software errors diagnosed and repaired."],
      ["Diagnostics", "Every iMac starts with diagnostics and a confirmed quote — no work begins without your approval."]
    ],
    extra: { title: "Too big to bring in?", text: "iMacs are ideal for our in-home visit option — choose it when you book and a technician comes to you." }
  },
  {
    slug: "iphone", title: "iPhone Repair", device: "iPhone", issue: null, note: null,
    img: "/images/iphone.jpg", alt: "Cracked iPhone screen held in hand before repair",
    intro: "Cracked screen, dying battery or a back glass in pieces? Most iPhone repairs at MacXpert Toronto are done the same day, with parts calibrated for touch and colour — and walk-ins are always welcome at our St Clair Ave W store.",
    covers: "Covers iPhone models with OLED and LCD displays.",
    turnaround: "Most repairs same-day",
    repairs: [
      ["Screen repair", "Cracked, shattered or unresponsive screens replaced — OLED and LCD, calibrated for touch and colour."],
      ["Battery replacement", "Batteries that drain fast, swell or shut down early, replaced with tested, long-lasting parts."],
      ["Back glass repair", "Cracked back glass repaired using laser technology for a clean, precise finish."],
      ["Charging port repair", "Loose cables, intermittent charging or a port that has stopped working altogether."],
      ["Water damage diagnosis", "Water damage diagnosis with ultrasonic cleaning to give your iPhone its best chance of recovery."]
    ],
    extra: { title: "Walk-ins welcome", text: "Most iPhone repairs are same-day — walk in any time during opening hours, or book ahead and we'll be ready for you." }
  },
  {
    slug: "samsung", title: "Samsung / Android Repair", device: "Samsung / Android", issue: null, note: null,
    img: "/images/samsung.jpg", alt: "Samsung Galaxy smartphone held in a hand showing its home screen",
    intro: "A shattered screen, a battery that dies by lunch or a phone stuck on its logo shouldn't leave you disconnected. We repair Samsung and Android phones with parts matched to your exact model, confirmed after in-store diagnostics.",
    covers: "Brands: Samsung, Google Pixel, Motorola, OnePlus and others.",
    turnaround: "24–48 hours",
    repairs: [
      ["Screen repair", "Cracked or unresponsive screens replaced with parts matched to your model."],
      ["Battery replacement", "Fast-draining or swollen batteries replaced and tested before pickup."],
      ["Charging port repair", "Intermittent charging, loose cables and dead ports repaired."],
      ["Software repair", "Crashes, boot loops and update failures diagnosed and fixed."],
      ["Camera repair", "Blurry, black or failing front and rear cameras repaired or replaced."],
      ["Data recovery", "Data recovery from phones that won't turn on — assessed honestly before any charge."]
    ],
    extra: null
  },
  {
    slug: "laptop", title: "Laptop & Desktop Repair", device: "Laptop / PC", issue: null, note: null,
    img: "/images/laptop-repair.jpg", alt: "Open laptop computer on a desk",
    intro: "A broken laptop screen, a sudden blue screen or a desktop that refuses to power on can halt your whole day. We find the real cause with diagnostics, confirm the exact price with you, and fix it properly — laptops and desktops alike.",
    covers: "All major brands — Windows and Mac.",
    turnaround: "24–48 hours",
    repairs: [
      ["Laptop screen replacement", "Cracked, dim or flickering laptop displays replaced with matched panels."],
      ["Battery replacement", "Laptop batteries that no longer hold a charge, replaced and tested."],
      ["Keyboard & trackpad repair", "Dead keys, spilled-on keyboards and faulty trackpads repaired or replaced."],
      ["Desktop repair", "Desktops that won't power on, overheat or crash — power supplies, motherboards, RAM and hard drives diagnosed and repaired."],
      ["Virus removal & software repair", "Viruses, malware and software faults removed and repaired, with your files kept intact wherever possible."],
      ["RAM, SSD & OS upgrades", "Memory, storage and operating-system upgrades that extend the life of your machine."]
    ],
    extra: { title: "Desktop too heavy to carry?", text: "Book an in-home visit and we'll diagnose your desktop or TV setup where it sits." }
  },
  {
    slug: "motherboard", title: "Motherboard-Level Repair", device: "MacBook / iMac", issue: "Logic board repair", note: null,
    img: "/images/motherboard.jpg", alt: "Close-up of a computer motherboard circuit board with chips and slots",
    intro: "When a board fails, most shops quote a full board replacement. We work at component level: we diagnose the board, find the faulty chip or component, and repair only that — on MacBook logic boards and other motherboards alike.",
    covers: "Logic board and motherboard repair for laptops, MacBooks and desktops.",
    turnaround: "A few days for logic board and complex work",
    repairs: [
      ["Component-level diagnosis", "We trace the fault to the specific chip or component instead of condemning the whole board."],
      ["Chip replacement", "Faulty chips removed and replaced using professional microsoldering tools."],
      ["Short-circuit repair", "Short circuits located with thermal imaging and repaired at component level."],
      ["A protected bench", "Microsoldering tools, thermal imaging and ESD protection on every board-level job."]
    ],
    extra: { title: "Dead device? Start with diagnostics", text: "Board-level faults start with in-store diagnostics. We confirm the exact price with you before any board work begins — no approval, no repair, no charge." }
  },
  {
    slug: "liquid-damage", title: "Liquid Damage Repair", device: "iPhone", issue: "Water damage", note: "Liquid damage repair — please assess my device.",
    img: "/images/liquid-damage.jpg", alt: "Tipped-over glass spilling water across a laptop keyboard",
    intro: "Spilled water, coffee or something worse? Switch the device off, don't charge it, and get it to us quickly. Liquid damage is assessed case by case — every device is different, so we clean and diagnose first, then quote.",
    covers: "Covers MacBook, iPhone and Android devices.",
    turnaround: "Assessed case by case after cleaning & diagnosis",
    repairs: [
      ["Case-by-case assessment", "Every liquid-damaged device is assessed individually — no assumptions and no guesswork quotes."],
      ["Ultrasonic cleaning", "Ultrasonic cleaning removes residue from boards and connectors before damage spreads."],
      ["Corrosion check", "A full corrosion check across the board, connectors and components to find hidden damage."],
      ["Keyboard repair", "Keyboard repair and replacement for water-damaged laptop and MacBook keyboards."]
    ],
    extra: { title: "Price quoted only after cleaning & diagnosis", text: "With liquid damage there is no honest way to quote up front. Your price is quoted only after ultrasonic cleaning and diagnosis — and work starts only if you approve it." }
  },
  {
    slug: "data-recovery", title: "Data Recovery", device: "Data Recovery", issue: null, note: null,
    img: "/images/data-recovery.jpg", alt: "Hard drives on a bench during a data recovery assessment",
    intro: "Losing access to business documents, photos or irreplaceable family memories is stressful — but it doesn't have to be permanent. We assess your drive or device, explain honestly what can be recovered, and you only pay if the data comes back.",
    covers: "Hard drives, SSDs, RAID arrays, phones, tablets, USB drives and memory cards.",
    turnaround: "Standard software cases 24–48 hours; complex physical cases take longer",
    repairs: [
      ["Hard drive (HDD) recovery", "Recovery from clicking, dead or unreadable mechanical hard drives."],
      ["SSD & NVMe recovery", "Recovery from failed solid-state and NVMe drives."],
      ["RAID recovery", "Recovery from failed RAID and NAS arrays."],
      ["USB & memory card recovery", "Recovery from USB drives, SD and other memory cards."],
      ["Phone & tablet recovery", "Data recovery from phones and tablets, including devices that won't turn on."],
      ["Deletion & formatting recovery", "Accidental deletion and formatting recovery — stop using the device and bring it in, it improves the chances."]
    ],
    extra: { title: "No data, no fee", text: "You only pay if your data is recovered. Your data is kept confidential throughout — we never access or share your files beyond the recovery itself." }
  }
];

// Dropdown / footer order for the service pages, as on the preview.
export const SERVICE_ORDER = ["macbook", "imac", "iphone", "samsung", "laptop", "motherboard", "liquid-damage", "data-recovery"];
export const servicePageBySlug = (slug) => SERVICE_PAGES.find((p) => p.slug === slug);
export const orderedServicePages = () => SERVICE_ORDER.map((s) => servicePageBySlug(s)).filter(Boolean);
