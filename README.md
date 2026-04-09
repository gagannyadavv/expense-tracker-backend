# 🚀 Expense Tracker Backend

Backend API for managing expenses, categories, budgets, and analytics.

---

## 🌐 Base URL

```bash
http://localhost:3000/api
```

---

## 🔗 API Endpoints

### 🔐 Auth

* POST `/auth/register`
* POST `/auth/login`

---

### 📂 Category

* POST `/category` → Add category
* GET `/category` → Get all categories
* DELETE `/category/:id` → Delete category

---

### 💸 Expense

* POST `/expense` → Add expense
* GET `/expense` → Get all expenses
* DELETE `/expense/:id` → Delete expense

---

### 💰 Budget

* POST `/budget` → Add/update budget
* GET `/budget` → Get budgets

---

### 📊 Analytics

* GET `/analytics/total-expenses`
* GET `/analytics/category-wise`
* GET `/analytics/weekly`
* GET `/analytics/monthly`

---

## ⚙️ Setup

```bash
npm install
npm run dev
```

---

## 🔒 Notes

* All routes are protected (JWT required)
* Budget prevents overspending
* Analytics built using MongoDB aggregation

---

## 👨‍💻 Author

Gagan
