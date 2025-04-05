from openai import OpenAI
import os

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def generate_recipe(ingredients):
    ingredient_list = ", ".join([i['item'] for i in ingredients])
    prompt = f"Create a recipe using the following ingredients: {ingredient_list}"

    response = client.chat.completions.create(
        model="gpt-4",
        messages=[{"role": "user", "content": prompt}]
    )

    return response.choices[0].message.content
