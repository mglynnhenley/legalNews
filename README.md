# Legal Blog 

Welcome to the **Legal Blog** project! This repository contains a simple blog platform that features a search algorithm, favorites functionality, email validation, and more. The project is built using Next.js, React, and TypeScript.

## Features

### 1. Search Algorithm
- **Prefix Search Trie**: Implemented in `utils/search.tsx`, this algorithm allows for efficient searching by reducing the search time complexity to be proportional to the length of the search term.
- **Trade-offs**: While the creation of the search trie has a higher initial time complexity, this only occurs during the initial page render, making it a reasonable trade-off. The current implementation supports searching for prefixes of words. Future improvements could extend this to support multiple words.

### 2. Critical Loading Times
- **Fetch Caching**: The fetch method used in `utils/dataService.tsx` automatically caches fetched data, reducing the need to refetch and thereby decreasing waiting times for the user.
- [More information on fetch caching](https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating).

### 3. Keep Favorites After Reloading
- **React Context**: Implemented to ensure that favorite posts persist across page reloads. The context is placed in the layout folder to wrap the entire application.

### 4. Email Validation
- **Regular Expressions**: Used to validate email addresses, improving user experience by ensuring that only valid email structures are submitted to the database.

### 5. Tests
- **Planned Tests**: Although tests were not implemented due to time constraints, the following tests were planned:
  - **Favorites Filtering**: Ensure favorite items appear correctly when filtered on the post list screen.
  - **Search Validation**: Confirm that search results only contain posts with valid prefixes.
  - **Email Input Validation**: Verify that the correct error message appears for invalid email formats.
  - **No Posts Found**: Ensure the appropriate message is displayed when no posts match the search criteria.
  
- **Testing Framework**: Jest was intended to be used for these tests, leveraging experience from a previous internship using React and TypeScript.

### 6. Other Extensions
- **Text Formatting**: Future improvements could focus on better formatting of the article text, such as dividing content into paragraphs where appropriate.
- **SCSS Structure**: Enhancing the structure of SCSS files by increasing the number of shared variables across different files.

## Getting Started

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/nextjs-blog-application.git
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

### Running the Application

1. **Start the development server**:
   ```bash
   npm run dev
   ```
   - This will start the application in development mode, accessible at `http://localhost:3000`.

2. **Build and start the production server**:
   ```bash
   npm run build
   npm start
   ```

## License

This project is licensed under the MIT License.
