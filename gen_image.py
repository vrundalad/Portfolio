import sys
import urllib.request
import os
try:
    from PIL import Image, ImageDraw, ImageFont, ImageFilter
except ImportError:
    import subprocess
    subprocess.check_call([sys.executable, "-m", "pip", "install", "Pillow"])
    from PIL import Image, ImageDraw, ImageFont, ImageFilter

def create_image():
    print("Opening source image...")
    img = Image.open("case-study-1.png").convert("RGBA")
    width, height = img.size

    print("Creating overlay to obscure old text...")
    # A soft overlay that matches the beige background somewhat, leaving the gradient visible but faded
    overlay = Image.new("RGBA", (width, height), (244, 241, 236, 230))
    img = Image.alpha_composite(img, overlay).convert("RGB")

    print("Drawing text...")
    draw = ImageDraw.Draw(img)
    
    # Try to calculate text size to fit if needed, but 55 should be safe
    try:
        font_large = ImageFont.truetype("C:/Windows/Fonts/arial.ttf", 55)
        font_small = ImageFont.truetype("C:/Windows/Fonts/arial.ttf", 35)
    except Exception as e:
        print("Font error:", e)
        font_large = ImageFont.load_default()
        font_small = ImageFont.load_default()

    text_main = "TASK MANAGEMENT WEB APPLICATION"
    text_sub = "Digital Product Management - Case Study"

    # Use a dark brownish color similar to original text
    text_color = (60, 45, 40)
    
    # Coordinates (approx matching original)
    draw.text((140, height // 2 - 80), text_main, fill=text_color, font=font_large)
    draw.text((140, height // 2 + 50), text_sub, fill=text_color, font=font_small)

    img.save("case-study-2.png")
    print("Saved as case-study-2.png")

if __name__ == "__main__":
    create_image()
