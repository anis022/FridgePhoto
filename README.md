# MariHacks


# FridgePhoto

FridgePhoto is a smart, AI-powered personal fridge assistant designed to simplify meal planning, reduce food waste, and bring creativity back to your kitchen. With our application, you don't have to wonder what to cook or worry about the freshness of your ingredients ever again!

---

## Table of Contents

- [Inspiration](#inspiration)
- [What It Does](#what-it-does)
- [How We Built It](#how-we-built-it)
- [Challenges We Faced](#challenges-we-faced)
- [Accomplishments and Key Learnings](#accomplishments-and-key-learnings)
- [What's Next for FridgePhoto](#whats-next-for-fridgephoto)
- [Getting Started](#getting-started)
- [Contributing](#contributing)
- [License](#license)

---

## Inspiration

Every day, countless people face the challenge of deciding what to cook—not due to a lack of ingredients, but because:
- They either don't feel like making an extra trip for missing items.
- They struggle to come up with creative recipes.
- They are unsure which ingredients in the fridge are still fresh.

We created FridgePhoto to solve this everyday problem by making meal planning smarter, more convenient, and less wasteful.

---

## What It Does

- **User Accounts:** Create or log in to your account easily.
- **Image Upload:** Snap or upload a photo of your fridge.
- **AI-Powered Ingredient Detection:** Our AI scans your photo to detect available ingredients and assigns each a freshness score—because no one wants dubious produce.
- **Recipe Suggestions:** Based on the scanned ingredients, the app generates recipe ideas, acting like a personal chef in your pocket.

---

## How We Built It

- **Frontend:** 
  - Built with React and TypeScript for a clean, responsive user interface.
  - Leveraged HTML and CSS for structuring and styling the application.
  
- **Backend:** 
  - Developed using Python with the Flask framework to handle API logic and image processing.
  
- **Artificial Intelligence:** 
  - Fine-tuned our own AI model to accurately detect and recognize ingredients from user-uploaded fridge photos.
  - Integrated with the Gemini API to dynamically generate recipe suggestions.
  
- **Containerization & Data Management:**
  - Utilized Docker to seamlessly connect the frontend and backend components.
  - MongoDB is used for user authentication and data storage, ensuring a robust and scalable solution.

---

## Challenges We Faced

- **AI Integration:**  
  Our initial foray into AI was challenging. Tuning the AI model to accurately recognize everyday ingredients—even learning from odd mistakes like confusing a rotten banana with a bird—required persistence and innovation.
  
- **Database Setup & System Integration:**  
  Setting up MongoDB for robust authentication and data flow between the frontend and backend was no trivial task. Overcoming these hurdles significantly honed our troubleshooting and debugging skills.

---

## Accomplishments and Key Learnings

- **Technical Growth:**  
  We deepened our understanding of AI by fine-tuning models for real-world applications. Integrating these models into a full-stack project expanded our technical horizons.
  
- **Full-Stack Development:**  
  Our journey enhanced our skills in both frontend (React, TypeScript) and backend (Flask, MongoDB) development.
  
- **Project Collaboration:**  
  Using GitHub for collaboration taught us the ropes of version control and resolving merge conflicts—critical skills for any modern development team.
  
- **Real-World Impact:**  
  Ultimately, we built a fully functional website addressing a common problem. FridgePhoto is not only a project we're proud of—it's something we would use in our own homes.

---

## What's Next for FridgePhoto

- **Enhanced AI Accuracy:**  
  Continue training our AI to identify a broader range of ingredients with even greater precision.
  
- **Personalized User Dashboards:**  
  Develop dashboards to provide personalized stats such as reduced food waste, the number of meals cooked, and frequently used ingredients.
  
- **Smart Fridge Integration:**  
  Envisioning a future where a built-in fridge camera keeps the app continuously updated on your inventory, eliminating last-minute grocery runs and guesswork.

---

## Getting Started

To get a local copy up and running, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/fridgephoto.git
   cd fridgephoto
