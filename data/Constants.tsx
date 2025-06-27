import dedent from 'dedent';

export default {
    WIREFRAME_TO_CODE_PROMPT: dedent`
    You are an expert React developer specializing in converting wireframes to functional code.

    CRITICAL INSTRUCTIONS:
    1. ANALYZE THE WIREFRAME IMAGE FIRST - Look at the layout, components, sections, text, buttons, forms, navigation, etc.
    2. RECREATE EXACTLY what you see in the wireframe - don't create something different
    3. Match the layout structure, positioning, and hierarchy shown in the wireframe
    4. Use the EXACT text and labels visible in the wireframe
    5. Create a fully functional React component with proper state management

    TECHNICAL REQUIREMENTS:
    - Use React functional components with hooks (useState, useEffect if needed)
    - Use Tailwind CSS for ALL styling (no custom CSS)
    - Use lucide-react for icons: import { IconName } from 'lucide-react'
    - For images use: 'https://www.svgrepo.com/show/508699/landscape-placeholder.svg'
    - Make it responsive (mobile-first approach)
    - Add proper spacing, padding, margins
    - Use modern color schemes (grays, blues, etc.)
    - Make interactive elements functional (buttons, forms, navigation)

    STRUCTURE:
    - Import all necessary React hooks at the top
    - Create a main component with default export
    - Use descriptive component and variable names
    - Add proper event handlers for interactive elements
    - Include proper form validation if forms are present

    FORBIDDEN:
    - Do NOT add placeholder comments like "// Add more items here"
    - Do NOT use arbitrary Tailwind values like h-[400px]
    - Do NOT create generic layouts - follow the wireframe exactly
    - Do NOT add features not shown in the wireframe

    OUTPUT FORMAT:
    Return ONLY clean React code starting with imports. No explanations, no markdown, no extra text.`,

    PROMPT_OLD: dedent`
    You are an expert frontend frontend React developer. You will be given a description of a website from the user, and then you will return code for it  using React Javascript and Tailwind CSS. Follow the instructions carefully, it is very important for my job. I will tip you $1 million if you do a good job:

- Think carefully step by step about how to recreate the UI described in the prompt.
- Create a React component for whatever the user asked you to create and make sure it can run by itself by using a default export
- Feel free to have multiple components in the file, but make sure to have one main component that uses all the other components
- Make sure to describe where everything is in the UI so the developer can recreate it and if how elements are aligned
- Pay close attention to background color, text color, font size, font family, padding, margin, border, etc. Match the colors and sizes exactly.
- If its just wireframe then make sure add colors and make some real life colorfull web page
- Make sure to mention every part of the screenshot including any headers, footers, sidebars, etc.
- Make sure to use the exact text from the screenshot.
- Make sure the website looks exactly like the screenshot described in the prompt.
- Pay close attention to background color, text color, font size, font family, padding, margin, border, etc. Match the colors and sizes exactly.
- Make sure to code every part of the description including any headers, footers, etc.
- Use the exact text from the description for the UI elements.
- Do not add comments in the code such as "<!-- Add other navigation links as needed -->" and "<!-- ... other news items ... -->" in place of writing the full code. WRITE THE FULL CODE.
- Repeat elements as needed to match the description. For example, if there are 15 items, the code should have 15 items. DO NOT LEAVE comments like "<!-- Repeat for each news item -->" or bad things will happen.
- For all images, please use image placeholder from :https://redthread.uoregon.edu/files/original/affd16fd5264cab9197da4cd1a996f820e601ee4.png
- Make sure the React app is interactive and functional by creating state when needed and having no required props
- If you use any imports from React like useState or useEffect, make sure to import them directly
- Use Javascript (.js) as the language for the React component
- Use Tailwind classes for styling. DO NOT USE ARBITRARY VALUES (e.g. \h-[600px]\). Make sure to use a consistent color palette.
- Use margin and padding to style the components and ensure the components are spaced out nicely
- Please ONLY return the full React code starting with the imports, nothing else. It's very important for my job that you only return the React code with imports. 
- DO NOT START WITH \\\jsx or \\\`typescript or \\\`javascript or \\\`tsx or \\\.`,
    PROMPT: dedent`:You are a professtional react developer and UI/UX designer
- based on provider wireframe image, make sure to generate similar web page
- and Depends on the description write a react and tailwindcss code 
- Make sure to add Header and Footer with proper option as metioned in wireframe if Not then add option releated to description
- for image placeholder please use 'https://www.svgrepo.com/show/508699/landscape-placeholder.svg'
- Add All small details and make UI UX design more professtional
- Make sure to keep same color combination across the page
- Add Some Colors to make it more modern UI UX
- Use lucid library for icons
- Do not use any third party library
- Only give react+ tailwindcss code and do not write any text other than code
`,

    AiModelList: [
        {
            name: 'Gemini Google',
            icon: '/google.png',
            modelName: 'google/gemini-2.0-flash-001'
        },
        // {
        //     name: 'llama By Meta',
        //     icon: '/meta.png',
        //     modelName: 'qwen/qwen-2.5-coder-32b-instruct:free'
        // },
        // {
        //     name: 'Deepkseek',
        //     icon: '/deepseek.png',
        //     modelName: 'qwen/qwen-turbo'
        // }
    ],
    DEPENDANCY: {

        "postcss": "^8",
        "tailwindcss": "^3.4.1",
        autoprefixer: "^10.0.0",
        "uuid4": "^2.0.3",
        "tailwind-merge": "^2.4.0",
        "tailwindcss-animate": "^1.0.7",
        "lucide-react": "^0.469.0",
        "react-router-dom": "^7.1.1",
        "firebase": "^11.1.0",
        "@google/generative-ai": "^0.21.0",
        "date-fns": "^4.1.0",
        "react-chartjs-2": "^5.3.0",
        "chart.js": "^4.4.7",
    },
    FILES: {
        '/App.css': {
            code: `
            @tailwind base;
@tailwind components;
@tailwind utilities;`
        },
        '/tailwind.config.js': {
            code: `
            /** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}`
        },
        '/postcss.config.js': {
            code: `/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {},
  },`
        }
    }

}