# CodeLeap Posts Manager

A fully functional CRUD application developed as a technical challenge for CodeLeap. This project allows users to sign in, create, edit, delete, and view posts in a dynamic feed featuring infinite scrolling.

## 🛠️ Tech Stack

This project was built using web development standards:

* **React 18** with **TypeScript**: Ensuring robust type safety and component-based UI.
* **TanStack Router**: For type-safe routing and seamless navigation.
* **Zustand**: A lightweight state management solution for global user session control.
* **Radix UI**: High-quality primitives for accessible Modals (Dialog) and Confirmation Alerts (AlertDialog).
* **Tailwind CSS**: Utility-first CSS for a responsive and "pixel-perfect" design.
* **Intersection Observer API**: Native implementation for a high-performance Infinite Scroll.

## ✨ Key Features

* **Authentication Flow**: A dedicated signup screen where the username is persisted globally via Zustand.
* **Full CRUD Implementation**:
    * **Create**: Add new posts with immediate feed updates and loading states.
    * **Read**: Real-time post listing fetched from a REST API.
    * **Update**: Edit titles and content through an accessible Modal interface.
    * **Delete**: Secure deletion with a confirmation dialog to prevent accidental data loss.
* **Infinite Scrolling**: Automatic loading of subsequent pages as the user scrolls, providing a smooth UX.
* **UI Feedback**: Integrated Spinners (Radix Themes) and disabled button states to guide the user during asynchronous actions.
* **Clean Code Architecture**: Logic separation using a **Service Layer** for API calls and custom hooks for observers.

## 🚀 Getting Started

Follow these steps to run the project locally:

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/LarissaOlimpio/codeleap-posts-manager.git](https://github.com/your-username/codeleap-network.git)
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```

4.  **Open in your browser:**
    Navigate to `http://localhost:5173`

## 🏗️ Project Structure

```text
src/
 ├── components/     # UI Components (Buttons, Modals) and Business Logic
 ├── routes/         # Route definitions and page views (TanStack Router)
 ├── services/       # API Layer (postService.ts) for centralized fetch logic
 ├── store/          # State management (Zustand)
 ├── types/          # TypeScript Interfaces and API response definitions
 └── utils/          # Utility functions for date formatting 

 ```
Developed with ❤️ by Larissa Olimpio
