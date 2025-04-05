from ultralytics import YOLO
import torch
from PIL import Image
import numpy as np

import os
from datetime import datetime

# Get directory of current script (detector.py)
script_dir = os.path.dirname(os.path.abspath(__file__))

# Construct model paths relative to detector.py
modelx_path = os.path.join(script_dir, 'yolo11x.pt')
modelbest_path = os.path.join(script_dir, 'yolo11best.pt')

# Load models
modelx = YOLO(modelx_path)
modelbest = YOLO(modelbest_path)

def detect_items(image, save_crops=False):
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

    detections = results[0].boxes.data.cpu().numpy()

    crops = []
    items = []

    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")

    idx = 0
    for det in detections:
        x1, y1, x2, y2, conf, cls = det
        cropped = image.crop((x1, y1, x2, y2))
        crops.append(cropped)

        if save_crops:
            # Create crops directory if it doesn't exist
            os.makedirs('crops', exist_ok=True)
            # Save with timestamp and index for uniqueness
            filename = f'crops/crop_{timestamp}_{idx}.jpg'
            cropped.save(filename)

        items.append({
            'label': model.names[int(cls)],
            'confidence': float(conf)
        })

        idx += 1

    return items, crops


if __name__ == '__main__':
    value = input("> ")
    image = Image.open(f'tests/test{value}.png')
    items, crops = detect_items(image)
    print(items)