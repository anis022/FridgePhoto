IDEAL_FRIDGE = {
    'milk': 1,
    'eggs': 12,
    'butter': 1,
    'lettuce': 1,
    'cheese': 1
}

def get_missing_items(detected_items):
    found = {}
    for item in detected_items:
        name = item['item']
        found[name] = found.get(name, 0) + 1

    missing = []
    for item, qty in IDEAL_FRIDGE.items():
        if found.get(item, 0) < qty:
            missing.append({
                'item': item,
                'needed': qty - found.get(item, 0)
            })

    return missing
