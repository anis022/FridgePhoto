from ultralytics import YOLO
import torch
from PIL import Image
import numpy as np

model = YOLO('yolov8n.pt')  # or yolov5s.pt depending on version

def detect_items(image):
    results = model(image)
    detections = results[0].boxes.data.cpu().numpy()

    crops = []
    items = []

    for det in detections:
        x1, y1, x2, y2, conf, cls = det
        cropped = image.crop((x1, y1, x2, y2))
        crops.append(cropped)
        items.append({
            'label': model.names[int(cls)],
            'confidence': float(conf)
        })

    return items, crops
