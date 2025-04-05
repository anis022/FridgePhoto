from ultralytics import YOLO

# Load the largest pretrained model (YOLOv8x)
model = YOLO("../yolo11x.pt")


# Train with your dataset
results = model.train(
    data="data.yaml",  # Path to your data.yaml
    epochs=100,        # Adjust based on dataset size (100-200 for 2300 images)
    imgsz=640,         # Image size (keep at 640 for best results)
    batch=4,          # Reduce to 8 if GPU runs out of memory
    device=0,          # Use GPU (0 for first GPU)
    amp=True,          # Mixed precision training (saves VRAM)
    project="fridge-detection",
    name="yolo11x_finetuned"
)