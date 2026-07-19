from pathlib import Path

from PIL import Image, ImageDraw


ROOT = Path(__file__).resolve().parents[1]
ICON_DIR = ROOT / "public" / "pwa" / "icons"


def draw_icon(size: int) -> Image.Image:
    image = Image.new("RGB", (size, size), "#22618a")
    draw = ImageDraw.Draw(image)
    scale = size / 512

    def box(values):
        return tuple(round(value * scale) for value in values)

    draw.rounded_rectangle(box((92, 102, 420, 420)), radius=round(42 * scale), fill="#ffffff")
    draw.rounded_rectangle(box((92, 102, 420, 190)), radius=round(42 * scale), fill="#164968")
    draw.rectangle(box((92, 152, 420, 190)), fill="#164968")
    draw.rounded_rectangle(box((148, 72, 182, 138)), radius=round(12 * scale), fill="#f2c34f")
    draw.rounded_rectangle(box((330, 72, 364, 138)), radius=round(12 * scale), fill="#f2c34f")

    draw.ellipse(box((170, 218, 270, 318)), fill="#f2c34f")
    draw.ellipse(box((248, 254, 344, 340)), fill="#dfeef5")
    draw.ellipse(box((218, 272, 292, 340)), fill="#dfeef5")
    draw.rounded_rectangle(box((214, 302, 354, 352)), radius=round(24 * scale), fill="#dfeef5")

    draw.rounded_rectangle(box((146, 368, 366, 386)), radius=round(9 * scale), fill="#d8e1e6")
    return image


def main() -> None:
    ICON_DIR.mkdir(parents=True, exist_ok=True)
    for size in (192, 512):
        draw_icon(size).save(ICON_DIR / f"icon-{size}.png", optimize=True)


if __name__ == "__main__":
    main()
