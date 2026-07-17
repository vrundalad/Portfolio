from PIL import Image, ImageDraw, ImageFont

def create_image():
    print("Opening source image...")
    img = Image.open("case-study-1.png").convert("RGB")
    width, height = img.size

    # Downscale to a tiny size and upscale to create a smooth abstract gradient
    # This completely erases the original text while keeping the nice colors!
    img = img.resize((32, 32), Image.Resampling.LANCZOS)
    img = img.resize((width, height), Image.Resampling.LANCZOS)

    print("Drawing text...")
    draw = ImageDraw.Draw(img)
    
    try:
        # Use a larger font, and split into two lines so it doesn't get cut off
        font_large = ImageFont.truetype("C:/Windows/Fonts/arial.ttf", 75)
    except Exception as e:
        print("Font error:", e)
        font_large = ImageFont.load_default()

    # Split into two lines, and NO subtext as requested
    text_main = "TASK MANAGEMENT\nWEB APPLICATION"
    text_color = (60, 45, 40)
    
    # Draw the text
    draw.text((140, height // 2 - 100), text_main, fill=text_color, font=font_large)

    img.save("case-study-2.png")
    print("Saved as case-study-2.png")

if __name__ == "__main__":
    create_image()
