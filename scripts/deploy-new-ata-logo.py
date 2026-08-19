import os
import cv2
import numpy as np
from PIL import Image

input_path = r"C:\Users\hp\.gemini\antigravity-ide\brain\420551f3-63b3-4a21-abf0-bbdd65f3cfb1\.user_uploaded\media_1787138816787.jpg"

print("Starting high-definition logo generation and deployment...")

img_bgr = cv2.imread(input_path)
h, w = img_bgr.shape[:2]
img_rgb = cv2.cvtColor(img_bgr, cv2.COLOR_BGR2RGB)
img_hsv = cv2.cvtColor(img_bgr, cv2.COLOR_BGR2HSV)
img_lab = cv2.cvtColor(img_bgr, cv2.COLOR_BGR2LAB)

R = img_rgb[:, :, 0].astype(np.float32)
G = img_rgb[:, :, 1].astype(np.float32)
B = img_rgb[:, :, 2].astype(np.float32)
H = img_hsv[:, :, 0].astype(np.float32)
S = img_hsv[:, :, 1].astype(np.float32)
V = img_hsv[:, :, 2].astype(np.float32)
L = img_lab[:, :, 0].astype(np.float32)

# GrabCut GMM seed mask
gc_mask = np.full((h, w), cv2.GC_PR_BGD, dtype=np.uint8)

is_definite_bg = (
    (L < 42) |
    ((V < 46) & (S < 38)) |
    ((R < 48) & (G < 54) & (B < 48))
)
gc_mask[is_definite_bg] = cv2.GC_BGD
gc_mask[0:30, :] = cv2.GC_BGD
gc_mask[h-30:h, :] = cv2.GC_BGD
gc_mask[:, 0:30] = cv2.GC_BGD
gc_mask[:, w-30:w] = cv2.GC_BGD

is_fg_gold = (H >= 12) & (H <= 38) & (S >= 60) & (V >= 70) & (R >= 130) & (R - B >= 45)
is_fg_green = (H >= 38) & (H <= 85) & (S >= 70) & (V >= 70) & (G >= 95) & (G - R >= 25) & (G - B >= 25)
is_fg_base = (H >= 35) & (H <= 90) & (S >= 60) & (V >= 65) & (G >= 85) & (G - R >= 18)
is_fg_spec = (L >= 160) & (S >= 35)

is_definite_fg = is_fg_gold | is_fg_green | is_fg_base | is_fg_spec
gc_mask[is_definite_fg] = cv2.GC_FGD

is_pr_gold = (H >= 8) & (H <= 45) & (S >= 35) & (L >= 55) & (R >= 90) & (R - B >= 20)
is_pr_green = (H >= 34) & (H <= 95) & (S >= 45) & (L >= 55) & (G >= 70) & (G - R >= 12)
is_pr_fg = (is_pr_gold | is_pr_green) & (~is_definite_bg) & (~is_definite_fg)
gc_mask[is_pr_fg] = cv2.GC_PR_FGD

bgdModel = np.zeros((1, 65), np.float64)
fgdModel = np.zeros((1, 65), np.float64)
cv2.grabCut(img_bgr, gc_mask, None, bgdModel, fgdModel, 10, cv2.GC_INIT_WITH_MASK)

raw_fg = np.where((gc_mask == cv2.GC_FGD) | (gc_mask == cv2.GC_PR_FGD), 255, 0).astype(np.uint8)

num_labels, labels, stats, centroids = cv2.connectedComponentsWithStats(raw_fg)
clean = np.zeros_like(raw_fg)
for i in range(1, num_labels):
    if stats[i, cv2.CC_STAT_AREA] > 100:
        clean[labels == i] = 255

contours, hierarchy = cv2.findContours(clean, cv2.RETR_CCOMP, cv2.CHAIN_APPROX_SIMPLE)
filled = np.zeros_like(clean)
for idx, c in enumerate(contours):
    if hierarchy[0][idx][3] != -1:
        if cv2.contourArea(c) < 800:
            cv2.drawContours(filled, [c], -1, 255, -1)
clean = cv2.bitwise_or(clean, filled)

smooth_alpha = cv2.GaussianBlur(clean.astype(np.float32) / 255.0, (3, 3), 0)

bg_color = np.array([24.0, 23.0, 31.0], dtype=np.float32)
defringed_rgb = np.zeros_like(img_rgb)
for c in range(3):
    chan = (img_rgb[:, :, c].astype(np.float32) - (1.0 - smooth_alpha) * bg_color[c]) / np.maximum(smooth_alpha, 0.001)
    defringed_rgb[:, :, c] = np.clip(chan, 0, 255).astype(np.uint8)

rgba = np.zeros((h, w, 4), dtype=np.uint8)
rgba[:, :, 0:3] = defringed_rgb
rgba[:, :, 3] = (smooth_alpha * 255).astype(np.uint8)

# Crop
alpha_mask = rgba[:, :, 3] > 25
y_indices, x_indices = np.where(alpha_mask)
min_x, max_x = x_indices.min(), x_indices.max()
min_y, max_y = y_indices.min(), y_indices.max()

cropped = rgba[min_y:max_y+1, min_x:max_x+1]
crop_h, crop_w = cropped.shape[:2]

target_size = 1024
margin = int(target_size * 0.06)
max_dim = target_size - 2 * margin

scale = min(max_dim / crop_w, max_dim / crop_h)
new_w = int(crop_w * scale)
new_h = int(crop_h * scale)

cropped_pil = Image.fromarray(cropped)
resized_pil = cropped_pil.resize((new_w, new_h), Image.Resampling.LANCZOS)

final_canvas = Image.new("RGBA", (target_size, target_size), (0, 0, 0, 0))
paste_x = (target_size - new_w) // 2
paste_y = (target_size - new_h) // 2
final_canvas.paste(resized_pil, (paste_x, paste_y), resized_pil)

# Base directories
base_dir = r"c:\Users\hp\Desktop\Antigravity (1)"
ata_dir = os.path.join(base_dir, "Antigravity", "Projeler", "ata-takvimi")
karneyn_dir = os.path.join(base_dir, "Antigravity", "Projeler", "karneyn-web")
projeler_logo_dir = os.path.join(base_dir, "projeler-logo")

# 1. Save 1024, 512, 192 in ata-takvimi public
icon_512 = final_canvas.resize((512, 512), Image.Resampling.LANCZOS)
icon_192 = final_canvas.resize((192, 192), Image.Resampling.LANCZOS)

final_canvas.save(os.path.join(ata_dir, "public", "icon-1024.png"), "PNG")
icon_512.save(os.path.join(ata_dir, "public", "icon-512.png"), "PNG")
icon_192.save(os.path.join(ata_dir, "public", "icon-192.png"), "PNG")
print("Saved ata-takvimi public icons (1024, 512, 192)")

# 2. Save in projeler-logo
icon_512.save(os.path.join(projeler_logo_dir, "ata-takvimi-icon-512x512.png"), "PNG")
print("Saved projeler-logo/ata-takvimi-icon-512x512.png")

# 3. Save in karneyn-web public
icon_512.save(os.path.join(karneyn_dir, "public", "ciftci-takvimi-icon.png"), "PNG")
icon_192.save(os.path.join(karneyn_dir, "public", "ata-takvimi-icon.png"), "PNG")
print("Saved karneyn-web public icons (ciftci-takvimi-icon.png, ata-takvimi-icon.png)")

# 4. Update iOS AppIcon (1024x1024 AppIcon-512@2x.png on dark emerald #071a10 or transparent)
# App Store requires opaque (no alpha) for AppIcon-512@2x.png or background flattening
ios_icon_dir = os.path.join(ata_dir, "ios", "App", "App", "Assets.xcassets", "AppIcon.appiconset")
if os.path.exists(ios_icon_dir):
    ios_canvas = Image.new("RGB", (1024, 1024), (7, 26, 16)) # #071a10
    ios_logo = final_canvas.resize((850, 850), Image.Resampling.LANCZOS)
    ios_canvas.paste(ios_logo, (87, 87), ios_logo)
    ios_canvas.save(os.path.join(ios_icon_dir, "AppIcon-512@2x.png"), "PNG")
    print("Saved iOS AppIcon-512@2x.png (flattened RGB for App Store compliance)")

# 5. Generate Android Launcher & Splash Screens
res_dir = os.path.join(ata_dir, "android", "app", "src", "main", "res")
if os.path.exists(res_dir):
    mipmaps = [
        ('mipmap-mdpi', 48, 108),
        ('mipmap-hdpi', 72, 162),
        ('mipmap-xhdpi', 96, 216),
        ('mipmap-xxhdpi', 144, 324),
        ('mipmap-xxxhdpi', 192, 432),
    ]

    for m_dir, icon_sz, fg_sz in mipmaps:
        target_dir = os.path.join(res_dir, m_dir)
        os.makedirs(target_dir, exist_ok=True)

        # 1. ic_launcher.png (Kare launcher - transparent)
        ic_std = final_canvas.resize((icon_sz, icon_sz), Image.Resampling.LANCZOS)
        ic_std.save(os.path.join(target_dir, "ic_launcher.png"), "PNG")

        # 2. ic_launcher_round.png
        ic_round = final_canvas.resize((icon_sz, icon_sz), Image.Resampling.LANCZOS)
        ic_round.save(os.path.join(target_dir, "ic_launcher_round.png"), "PNG")

        # 3. ic_launcher_foreground.png (Adaptive icon with safe padding)
        fg_canvas = Image.new("RGBA", (fg_sz, fg_sz), (0, 0, 0, 0))
        inner_sz = int(fg_sz * 0.72)
        fg_logo = final_canvas.resize((inner_sz, inner_sz), Image.Resampling.LANCZOS)
        offset = (fg_sz - inner_sz) // 2
        fg_canvas.paste(fg_logo, (offset, offset), fg_logo)
        fg_canvas.save(os.path.join(target_dir, "ic_launcher_foreground.png"), "PNG")

    # Android Splash Screens
    splashes = [
        ('drawable', 480, 800),
        ('drawable-port-mdpi', 320, 480),
        ('drawable-port-hdpi', 480, 800),
        ('drawable-port-xhdpi', 720, 1280),
        ('drawable-port-xxhdpi', 960, 1600),
        ('drawable-port-xxxhdpi', 1280, 1920),
        ('drawable-land-mdpi', 480, 320),
        ('drawable-land-hdpi', 800, 480),
        ('drawable-land-xhdpi', 1280, 720),
        ('drawable-land-xxhdpi', 1600, 960),
        ('drawable-land-xxxhdpi', 1920, 1280),
    ]

    for s_dir, sw, sh in splashes:
        s_folder = os.path.join(res_dir, s_dir)
        os.makedirs(s_folder, exist_ok=True)
        splash_canvas = Image.new("RGBA", (sw, sh), (7, 26, 16, 255))
        logo_sz = min(int(min(sw, sh) * 0.45), 340)
        s_logo = final_canvas.resize((logo_sz, logo_sz), Image.Resampling.LANCZOS)
        sx = (sw - logo_sz) // 2
        sy = (sh - logo_sz) // 2
        splash_canvas.paste(s_logo, (sx, sy), s_logo)
        splash_canvas.save(os.path.join(s_folder, "splash.png"), "PNG")

    print("Generated all Android launcher mipmaps and splash screens")

print("All logo files successfully generated and distributed across projects!")
