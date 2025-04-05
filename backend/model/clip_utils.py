from transformers import CLIPProcessor, CLIPModel
import torch

model = CLIPModel.from_pretrained("openai/clip-vit-base-patch32")
processor = CLIPProcessor.from_pretrained("openai/clip-vit-base-patch32")

labels = [
    "milk", "eggs", "cheese", "lettuce", "tomato", "juice", 
    "butter", "apple", "yogurt", "carrot", "spinach", "meat"
]

def enrich_with_clip(crops):
    enriched = []

    for img in crops:
        inputs = processor(text=labels, images=img, return_tensors="pt", padding=True)
        outputs = model(**inputs)
        logits_per_image = outputs.logits_per_image
        probs = logits_per_image.softmax(dim=1).detach().numpy()[0]

        best_idx = probs.argmax()
        enriched.append({
            'item': labels[best_idx],
            'confidence': float(probs[best_idx])
        })

    return enriched
