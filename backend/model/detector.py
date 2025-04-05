from ultralytics import YOLO
import torch
from PIL import Image
import numpy as np

import os
from datetime import datetime


import cv2
from transformers import CLIPProcessor, CLIPModel

# Initialize CLIP components once (outside function)
clip_model = CLIPModel.from_pretrained("openai/clip-vit-base-patch32")
clip_processor = CLIPProcessor.from_pretrained("openai/clip-vit-base-patch32")

# Get directory of current script (detector.py)
script_dir = os.path.dirname(os.path.abspath(__file__))

# Construct model paths relative to detector.py
modelx_path = os.path.join(script_dir, 'yolo11x.pt')
modelbest_path = os.path.join(script_dir, 'yolo11best.pt')

# Load models
modelx = YOLO(modelx_path)
modelbest = YOLO(modelbest_path)

def detect_items(image, save_crops=False, save_annotated=True):
    image_np = np.array(image)

    resultsx = modelx(image, conf=0.5)
    resultsbest = modelbest(image, conf=0.5)

    countx = len(resultsx[0].boxes)
    countbest = len(resultsbest[0].boxes)

    if countx > countbest:
        results = resultsx
        model = modelx
    else:
        results = resultsbest
        model = modelbest

    annotated_np = results[0].plot()  # Returns BGR numpy array
    annotated_img = Image.fromarray(cv2.cvtColor(annotated_np, cv2.COLOR_BGR2RGB))

    # Save annotated image if requested
    if save_annotated:
        os.makedirs('annotated', exist_ok=True)
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        annotated_img.save(f'annotated/annotated_{timestamp}.jpg')

    detections = results[0].boxes.data.cpu().numpy()

    crops = []
    items = []

    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")

    idx = 0
    for det in detections:
        x1, y1, x2, y2, conf, cls = det
        cropped = image.crop((x1, y1, x2, y2))
        crops.append(cropped)

        # CLIP freshness analysis
        freshness = analyze_freshness(cropped, model.names[int(cls)])

        if save_crops:
            # Create crops directory if it doesn't exist
            os.makedirs('crops', exist_ok=True)
            # Save with timestamp and index for uniqueness
            filename = f'crops/crop_{timestamp}_{idx}.jpg'
            cropped.save(filename)

        items.append({
            'label': model.names[int(cls)],
            'confidence': float(conf),
            'freshness': freshness
        })

        idx += 1

    return items, crops, annotated_img

def analyze_freshness(crop, label):
    """Analyze crop freshness using CLIP"""
    prompts = [
        f"fresh {label}",
        f"correct {label}",
        f"rotten {label}",
        f"slightly old {label}",
        f"old {label}",
    ]
    
    inputs = clip_processor(
        text=prompts,
        images=crop,
        return_tensors="pt",
        padding=True
    )
    
    outputs = clip_model(**inputs)
    probs = outputs.logits_per_image.softmax(dim=1).tolist()[0]

    freshness_tag = None
    highest_prob = 0
    for i, (prompt, prob) in enumerate(zip(prompts, probs)):
        if prob > highest_prob:
            highest_prob = prob
            freshness_tag = prompt
    
    return {
        'predictions': dict(zip(prompts, probs)),
        'freshness_score': freshness_tag  # Probability of being "fresh"
    }


if __name__ == '__main__':
    value = input("> ")
    image = Image.open(f'tests/test{value}.png')
    
    items, crops, annotated_img = detect_items(
        image,
        save_crops=True,
        save_annotated=True
    )

    # Display results
    annotated_img.show()
    print(f"Found {len(items)} items:")
    print(items)