# services/recipe_gen.py
import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

model = genai.GenerativeModel("models/gemini-1.5-pro-latest")

def generate_recipe(ingredients):
    ingredient_list = ", ".join([i['item'] for i in ingredients])
    prompt = f"Create a healthy, simple recipe using the following ingredients: {ingredient_list}."

    response = model.generate_content(prompt)
    return response.text
