from ultralytics import YOLO
import torch
from PIL import Image
import numpy as np

import os
from datetime import datetime


model = YOLO('yolov8x.pt')  # or yolov5s.pt depending on version

def detect_items(image, save_crops=False):
    results = model(image)
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
    items, crops = detect_items(image, True)
    print(items)