# Finance Insight

Finance Insight is a personal finance dashboard built with **TypeScript** and **Vite**. The goal of the project is not just to
record expenses, but to provide meaningful insights into spending habits through summaries, filtering, and data analysis.

This project is being built incrementally to strengthen my understanding of TypeScript, DOM manipulation, state management, 
and frontend application architecture before moving on to frameworks such as React.

## Features

### Current Features

* Add new expenses
* Delete expenses
* Form validation
* Dashboard summary
* Category breakdown
* Filter expenses by category
* Dynamic UI updates without page reloads

### Planned Features

* Save expenses using Local Storage
* Monthly spending summaries
* Budget tracking
* Search expenses
* Date range filtering
* Charts and visualizations
* Responsive design
* Backend integration with ASP.NET Core Web API
* User authentication

## Technologies

* TypeScript
* Vite
* HTML5
* CSS3
* JavaScript DOM API
* Git & GitHub

## Project Structure

```text
src/
├── models/
│   ├── Category.ts
│   └── Expense.ts
├── ui/
│   ├── categoryBreakdown.ts
│   ├── dashboard.ts
│   ├── expenseForm.ts
│   └── expenseList.ts
├── main.ts
└── style.css
```

## Getting Started

### Clone the repository

```bash
git clone https://github.com/NompumeleloMbhense/FinanceInsight.git
```

### Navigate to the project

```bash
cd FinanceInsight
```

### Install dependencies

```bash
npm install
```

### Start the development server

```bash
npm run dev
```

Open the local URL displayed in the terminal to view the application.

## Learning Goals

This project focuses on developing practical frontend development skills, including:

* Component-based architecture
* State management
* TypeScript interfaces and types
* Event handling
* DOM manipulation
* Array methods (`map`, `filter`, `findIndex`, `Object.entries`)
* Data aggregation and transformation
* Clean, maintainable code

## Project Roadmap

* [x] Project setup with Vite
* [x] Expense model
* [x] Add Expense form
* [x] Expense validation
* [x] Expense List
* [x] Delete expenses
* [x] Dashboard summary
* [x] Category breakdown
* [x] Category filtering
* [ ] Local Storage
* [ ] Monthly summaries
* [ ] Budget management
* [ ] Charts
* [ ] ASP.NET Core API integration
* [ ] Authentication

## License

This project is open for learning and portfolio purposes.
