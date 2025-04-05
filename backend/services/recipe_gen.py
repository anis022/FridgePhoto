# services/recipe_gen.py
import os
from google import genai
from dotenv import load_dotenv

load_dotenv()
client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

def generate_recipe(ingredients):
    ingredient_list = ", ".join([i['item'] for i in ingredients])
    prompt = f"Create a healthy, simple recipe using the following ingredients: {ingredient_list}."

    response = client.models.generate_content(
    model="gemini-2.0-flash",
    contents=prompt,
)
    return response.text

# model = genai.GenerativeModel("models/gemini-1.5-pro-latest")

# def generate_recipe(ingredients):
#     ingredient_list = ", ".join([i['item'] for i in ingredients])
#     prompt = f"Create a healthy, simple recipe using the following ingredients: {ingredient_list}."

#     response = model.generate_content(prompt)
#     return response.text


if __name__ == "__main__":
    # Example usage
    ingredients = [
        {'item': 'milk', 'confidence': 0.95},
        {'item': 'eggs', 'confidence': 0.90},
        {'item': 'cheese', 'confidence': 0.85}
    ]
    recipe = generate_recipe(ingredients)
    print(recipe)
    