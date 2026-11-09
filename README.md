**NjoyKitchen** is basically a react native app that is designed for a chef to manage the restaurant's menu. It allows all users to add, view, edit and delete the dishes they want. a full real time statistics ( Dashboard) shows information on how many dishes are ordered.

** How the App Works (User Flow)**
When the app opens, the user is greeted with a clean, blue-themed interface. If the menu is empty, a message prompts them to add their first dish.
The user taps the "+ Add New Item" button at the bottom. This opens a form where they enter the dish name, description, price, and select a course (Starter, Main, or Dessert). Input validation ensures no blank fields or negative prices are submitted.
Once items are added, they appear as white cards. Each card has an Edit button (to update the price/details) and a Delete button (which triggers a confirmation popup to prevent accidental deletion).

 At the top of the menu, users can type in the search bar to find a dish by name, or tap the filter chips to only show specific courses (e.g., only Desserts).
 At the bottom navigation bar, the user can switch to the Statistics screen. This shows the Total Dishes, Average Price, and how many items exist in each course.

To meet the requirements for part 3 i had to add new files which are:
**App.tsx:** Acts as the main navigator. It wraps the app in a MenuProvider and handles switching between the Menu, Add/Edit form, and Statistics screens without needing an external navigation library.
**MenuItem.ts**: Contains the TypeScript "blueprint" (Interface) for a Menu Item
**MenuContext.tsx**: The "brain" of the app. It uses React Context to store the menu array in state, allowing all screens to share and update the same data instantly 



**Changes Made **
Meaningful Feedback: Standard Android alerts pop up when an item is added, updated, or deleted.

Validation: Error messages appear in red directly under the text fields if the user tries to submit wrong data.

Empty States: Instead of a blank screen, the app displays helpful text when the menu is empty or when a search yields no results.

Immediate Updates: Because of the React Context, editing a price instantly updates the menu list and the statistics screen at the same time.
