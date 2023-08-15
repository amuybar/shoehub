Shoe Store Web Application
==========================

A modern, responsive web application for a shoe store built with React, Next.js, and Sanity CMS. The application includes sections for Men, Women, Kids, a collection, and a cart. It also integrates with Google API for additional functionalities and uses Sonner for toast notifications.

Table of Contents
-----------------

*   [Features](#features)
    
*   [Technologies Used](#technologies-used)
    
*   [APIs](#apis)
    
*   [Installation](#installation)
    
*   [Usage](#usage)
    
*   [Folder Structure](#folder-structure)
    
*   [Contributing](#contributing)
    
*   [License](#license)
    

Features
--------

*   Display different categories of shoes: Men, Women, Kids.
    
*   Detailed view for each shoe with category-based navigation.
    
*   Shopping cart with item count, item removal, and quantity update.
    
*   Responsive design for optimal viewing on various devices.
    
*   Dynamic fetching of shoe data from Sanity CMS.
    
*   Toast notifications using Sonner for user feedback.
    
*   Navigation with real-time data rendering.
    

Technologies Used
-----------------

*   **React**
    
*   **Next.js**
    
*   **Sanity CMS**
    
*   **Google API**
    
*   **Sonner** (for toast notifications)
    
*   **CSS Modules** (for styling)
    
*   **TypeScript**
    

APIs
----

### Sanity CMS

Used for managing and fetching shoe data.

### Google API

Used for additional functionalities such as location services, analytics, etc.

### Sonner

Used for toast notifications to provide feedback to users.

Installation
------------

1.  **Clone the repository**
    

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   bashCopy codegit clone https://github.com/your-username/shoe-store.git  cd shoe-store   `

1.  **Install dependencies**
    

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   bashCopy codenpm install   `

1.  **Set up environment variables**
    

Create a .env.local file in the root directory and add your environment variables.

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   envCopy codeNEXT_PUBLIC_SANITY_PROJECT_ID=your-sanity-project-id  NEXT_PUBLIC_GOOGLE_API_KEY=your-google-api-key   `

1.  **Run the development server**
    

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   bashCopy codenpm run dev   `

Open http://localhost:3000 to view the application in the browser.

Usage
-----

### Viewing Categories

*   Navigate through different categories using the navbar.
    
*   Click on "View More" to see more shoes in each category.
    

### Shopping Cart

*   Add items to the cart.
    
*   Update quantities or remove items from the cart.
    
*   View the total price of items in the cart.
    
*   Proceed to checkout (functionality to be implemented).
    

### Notifications

*   Receive toast notifications for actions like adding/removing items from the cart.
    

Folder Structure
----------------

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   luaCopy code/shoe-store  |-- /components  |   |-- /nav  |   |-- /Home  |   |-- /Men  |   |-- /Women  |   |-- /Kids  |   |-- /Collection  |   |-- /Cart  |   |-- /LoadingSpinner  |   |-- /Hero  |   |-- /ViewMore  |-- /lib  |   |-- /urlFor.ts  |-- /pages  |   |-- /api  |   |-- /index.tsx  |   |-- /_app.tsx  |-- /public  |   |-- /assets  |-- /styles  |   |-- /globals.css  |   |-- /Navbar.module.css  |   |-- /Home.module.css  |   |-- /Men.module.css  |   |-- /Women.module.css  |   |-- /Kids.module.css  |   |-- /Collection.module.css  |   |-- /Cart.module.css  |   |-- /LoadingSpinner.module.css  |   |-- /Hero.module.css  |   |-- /ViewMore.module.css  |-- /utils  |   |-- /cartUtils.ts  |-- README.md  |-- package.json  |-- tsconfig.json  |-- next.config.js   `

Contributing
------------

Contributions are welcome! Please open an issue or submit a pull request for any improvements or new features.

License
-------

This project is licensed under the MIT License. See the LICENSE file for more details.# shoehub
Initial project setup
