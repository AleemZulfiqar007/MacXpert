// Sell Your Device / Trade-In Calculator data.
// Base prices in CAD, verified from Mobify Mobiles' trade-in calculator
// on Nov 11, 2026 with no condition boxes ticked. The price does not vary
// by storage / capacity — there is no storage selector, matching Mobify.
// Condition deductions ADD together (they do not compound) and are taken
// off the model's base price. The estimated value never goes below $0.

export const TRADE_IN_BRANDS = ["Apple", "Samsung", "Google"];

export const TRADE_IN_MODELS = {
  Apple: [
    { name: "iPhone 17 Pro Max", price: 1000 },
    { name: "iPhone 17 Pro", price: 900 },
    { name: "iPhone 17", price: 650 },
    { name: "iPhone 17 Air", price: 680 },
    { name: "iPhone 16 Pro Max", price: 700 },
    { name: "iPhone 16 Pro", price: 600 },
    { name: "iPhone 16 Plus", price: 525 },
    { name: "iPhone 16E", price: 365 },
    { name: "iPhone 16", price: 500 },
    { name: "iPhone 15 Pro Max", price: 475 },
    { name: "iPhone 15 Pro", price: 380 },
    { name: "iPhone 15 Plus", price: 310 },
    { name: "iPhone 15", price: 300 },
    { name: "iPhone 14 Pro Max", price: 310 },
    { name: "iPhone 14 Pro", price: 265 },
    { name: "iPhone 14 Plus", price: 225 },
    { name: "iPhone 14", price: 225 },
    { name: "iPhone 13 Pro Max", price: 280 },
    { name: "iPhone 13 Pro", price: 250 },
    { name: "iPhone 13 Mini", price: 150 },
    { name: "iPhone 13", price: 185 },
    { name: "iPhone 12 Pro Max", price: 250 },
    { name: "iPhone 12 Pro", price: 165 },
    { name: "iPhone 12 Mini", price: 100 },
    { name: "iPhone 12", price: 110 },
    { name: "iPhone 11 Pro Max", price: 110 },
    { name: "iPhone 11 Pro", price: 75 },
    { name: "iPhone 11", price: 70 },
    { name: "iPhone SE (3rd Gen)", price: 50 },
    { name: "iPhone SE (2nd Gen)", price: 35 },
    { name: "iPhone XS Max", price: 55 },
    { name: "iPhone XR", price: 50 },
    { name: "iPhone XS", price: 35 },
    { name: "iPhone X", price: 30 },
    { name: "iPhone 8 Plus", price: 20 },
    { name: "iPhone 8", price: 20 },
  ],
  Samsung: [
    { name: "Galaxy S25 Ultra", price: 625 },
    { name: "Galaxy S25 Plus", price: 375 },
    { name: "Galaxy S25 Edge", price: 345 },
    { name: "Galaxy S25 FE", price: 310 },
    { name: "Galaxy S25", price: 350 },
    { name: "Galaxy S24 Ultra", price: 400 },
    { name: "Galaxy S24 Plus", price: 260 },
    { name: "Galaxy S24 FE", price: 210 },
    { name: "Galaxy S24", price: 200 },
    { name: "Galaxy S23 Ultra", price: 275 },
    { name: "Galaxy S23 Plus", price: 200 },
    { name: "Galaxy S23 FE", price: 185 },
    { name: "Galaxy S23", price: 180 },
    { name: "Galaxy S22 Ultra", price: 200 },
    { name: "Galaxy S22 Plus", price: 120 },
    { name: "Galaxy S22", price: 110 },
    { name: "Galaxy S21 Ultra", price: 100 },
    { name: "Galaxy S21 FE", price: 100 },
    { name: "Galaxy S21 Plus", price: 80 },
    { name: "Galaxy S21", price: 80 },
    { name: "Galaxy S20 Ultra", price: 80 },
    { name: "Galaxy S20", price: 70 },
    { name: "Galaxy S10 Plus", price: 50 },
    { name: "Galaxy S10", price: 40 },
    { name: "Galaxy Note 20 Ultra", price: 125 },
  ],
  Google: [
    { name: "Pixel 3", price: 20 },
    { name: "Pixel 4", price: 30 },
    { name: "Pixel 4A", price: 30 },
    { name: "Pixel 4 XL", price: 35 },
    { name: "Pixel 5", price: 50 },
    { name: "Pixel 5A", price: 50 },
    { name: "Pixel 6", price: 60 },
    { name: "Pixel 6A", price: 60 },
    { name: "Pixel 6 Pro", price: 65 },
    { name: "Pixel 7", price: 80 },
    { name: "Pixel 7A", price: 75 },
    { name: "Pixel 7 Pro", price: 110 },
    { name: "Pixel 8", price: 115 },
    { name: "Pixel 8A", price: 90 },
    { name: "Pixel 8 Pro", price: 150 },
    { name: "Pixel 9", price: 265 },
    { name: "Pixel 9A", price: 165 },
    { name: "Pixel 9 Pro", price: 325 },
    { name: "Pixel 9 Pro XL", price: 350 },
    { name: "Pixel 9 Pro Fold", price: 600 },
    { name: "Pixel 10", price: 465 },
    { name: "Pixel 10 Pro", price: 565 },
    { name: "Pixel 10 Pro XL", price: 600 },
    { name: "Pixel 10 Pro Fold", price: 900 },
  ],
};

export const TRADE_IN_CONDITIONS = [
  { id: "screen", label: "CRACKED SCREEN / DISPLAY LINES", deduction: 0.5 },
  { id: "back", label: "CRACKED BACK / HEAVY DENTS", deduction: 0.4 },
  { id: "battery", label: "BATTERY HEALTH < 80%", deduction: 0.2 },
  { id: "liquid", label: "LIQUID DAMAGE / NO POWER", deduction: 0.8 },
];

// Additive deductions: e.g. a $1,000 base with cracked screen (-50%) and
// cracked back (-40%) is $1,000 x (1 - 0.5 - 0.4) = $100.
export function tradeInValue(basePrice, selectedIds) {
  if (!basePrice) return 0;
  const total = TRADE_IN_CONDITIONS
    .filter((c) => selectedIds.includes(c.id))
    .reduce((sum, c) => sum + c.deduction, 0);
  return Math.max(0, Math.round(basePrice * (1 - total)));
}

export function formatCAD(amount) {
  return `$${amount.toLocaleString("en-CA")}`;
}
