
# ShoeHub

## Project Overview

ShoeHub is a modern and responsive e-commerce platform for shoes, built with Next.js, React, and various APIs. The project integrates Sanity CMS for content management, Google API for various services, and Sonner for notifications.

## Features

- **Product Listing**: Browse through a wide collection of men's, women's, and kids' shoes.
- **Detailed Product Views**: View detailed information about each shoe, including price, description, and availability.
- **Shopping Cart**: Add items to the cart and manage quantities.
- **Filtering**: Filter shoes based on category, gender, price, and stock.
- **Responsive Design**: Ensures a seamless experience on both desktop and mobile devices.

## Installation

1. **Clone the repository**

   \`\`\`bash
   git clone https://github.com/amuybar/shoehub.git
   cd shoehub
   \`\`\`

2. **Install dependencies**

   \`\`\`bash
   npm install
   \`\`\`

3. **Set up environment variables**

   Create a `.env.local` file in the root directory and add your environment variables.

   \`\`\`env
   NEXT_PUBLIC_SANITY_PROJECT_ID=your-sanity-project-id
   NEXT_PUBLIC_GOOGLE_API_KEY=your-google-api-key
   \`\`\`

4. **Run the development server**

   \`\`\`bash
   npm run dev
   \`\`\`

   Open [http://localhost:3000](http://localhost:3000) to view the application in the browser.

## Usage

### Viewing Categories

- Navigate through different categories using the navbar.
- Click on "View More" to see more shoes in each category.

### Shopping Cart

- Add items to the cart.
- Update quantities or remove items from the cart.
- View the total price of items in the cart.
- Proceed to checkout (functionality to be implemented).

### Notifications

- Receive toast notifications for actions like adding/removing items from the cart.

## Folder Structure

\`\`\`bash
/shoe-store
|-- /components
|   |-- /nav
|   |-- /Home
|   |-- /Men
|   |-- /Women
|   |-- /Kids
|   |-- /Collection
|   |-- /Cart
|   |-- /LoadingSpinner
|   |-- /Hero
|   |-- /ViewMore
|-- /lib
|   |-- /urlFor.ts
|-- /pages
|   |-- /api
|   |-- /index.tsx
|   |-- /_app.tsx
|-- /public
|   |-- /assets
|-- /styles
|   |-- /globals.css
|   |-- /Navbar.module.css
|   |-- /Home.module.css
|   |-- /Men.module.css
|   |-- /Women.module.css
|   |-- /Kids.module.css
|   |-- /Collection.module.css
|   |-- /Cart.module.css
|   |-- /LoadingSpinner.module.css
|   |-- /Hero.module.css
|   |-- /ViewMore.module.css
|-- /utils
|   |-- /cartUtils.ts
|-- README.md
|-- package.json
|-- tsconfig.json
|-- next.config.js
\`\`\`

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or new features.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.