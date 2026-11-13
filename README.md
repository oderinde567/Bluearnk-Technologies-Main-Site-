# Bluearnk Technologies E-commerce Starter

A functional full-stack starter website for computer sales, repairs, maintenance and IT support.

## Stack
- Frontend: HTML, CSS and vanilla JavaScript
- Backend: Node.js + Express REST API
- Data: JSON files (easy to run locally; switch to MongoDB/PostgreSQL for production)

## Run locally
1. Install Node.js (LTS): https://nodejs.org/
2. Open this folder in VS Code.
3. In the terminal run:
   ```bash
   npm install
   npm start
   ```
4. Visit http://localhost:3000

## Included functionality
- Product listing/search/category filters (API-backed)
- Add to cart, quantity controls, cart persistence (localStorage)
- Checkout handoff to WhatsApp (order confirmation is handled manually)
- Service booking form saved by backend to `data/service-bookings.json`
- Product vlog/tech tips modal
- Responsive mobile layout
- API health endpoint: `/api/health`

## API
- `GET /api/products`
- `GET /api/products?q=latitude&category=Laptops`
- `GET /api/products/:id`
- `POST /api/orders` (JSON: customer, items, total)
- `POST /api/service-bookings` (JSON: name, phone, service, device, details)

## Customize products
Edit `data/products.json`. If that file is empty on first run, server seeds example products automatically. Replace demo images/prices/specifications with your real inventory.

## Before production
- Replace demo inventory/images and confirm all prices.
- Add admin authentication and an admin dashboard for products/orders/bookings.
- Use a real database, payment gateway (Paystack/Flutterwave), email/WhatsApp notifications, validation/rate limiting, HTTPS and backups.
- The current checkout intentionally uses WhatsApp and does not collect card details or process online payments.
"# Bluearnk-Technologies-Main-Site-" 
