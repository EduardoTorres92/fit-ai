import json, subprocess, os
L = json.load(open("lista.json")); os.makedirs("out", exist_ok=True); os.makedirs("/tmp/g", exist_ok=True)
UA = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 Chrome/124 Safari/537.36"
log = []
for linha in open("tools/escolhidos.txt"):
    if not linha.strip(): continue
    chave, idx = linha.split(); x = L[int(idx)]; nome = chave.replace(":", "__")
    g = f"/tmp/g/{nome}.gif"
    subprocess.run(["curl", "-sS", "-L", "-A", UA, "-o", g, f"https://drive.usercontent.google.com/download?id={x['id']}&export=download&confirm=t"])
    r = subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", g, "-an", "-movflags", "+faststart", "-pix_fmt", "yuv420p",
        "-vf", "scale='min(480,iw)':-2:flags=lanczos,pad=ceil(iw/2)*2:ceil(ih/2)*2:color=white", "-c:v", "libx264", "-preset", "slow", "-crf", "28", f"out/{nome}.mp4"], capture_output=True, text=True)
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", f"out/{nome}.mp4", "-vf", "thumbnail,scale=360:-2", "-frames:v", "1", "-q:v", "4", f"out/{nome}.jpg"])
    tam = os.path.getsize(f"out/{nome}.mp4") if os.path.exists(f"out/{nome}.mp4") else 0
    log.append(f"{chave} {idx} {x['nome']} gif={os.path.getsize(g)} mp4={tam} {r.stderr[:150]}")
open("out/converter.log", "w").write("\n".join(log) + "\n"); print("\n".join(log))
