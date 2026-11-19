#!/bin/bash
set -u
mkdir -p anim/v anim/folhas /tmp/q
for f in /tmp/v/*.mp4; do
  n=$(basename "$f" .mp4)
  dur=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$f")
  echo "$n $(ffprobe -v error -select_streams v:0 -show_entries stream=width,height -of csv=p=0 "$f") $dur" >> anim/info.txt
  ffmpeg -v error -y -i "$f" -an -vf "scale=480:-2:flags=lanczos,fps=24" -c:v libx264 -preset slow -crf 30 -pix_fmt yuv420p -movflags +faststart "anim/v/$n.mp4"
  # 3 quadros (25/50/75%) lado a lado com o número
  for p in 25 50 75; do
    t=$(python3 -c "print(float('$dur')*$p/100)")
    ffmpeg -v error -y -ss "$t" -i "$f" -frames:v 1 -vf "scale=240:-2" "/tmp/q/${n}_$p.png"
  done
  ffmpeg -v error -y -i /tmp/q/${n}_25.png -i /tmp/q/${n}_50.png -i /tmp/q/${n}_75.png -filter_complex "[0][1][2]hstack=3,drawtext=text='$n':x=6:y=6:fontsize=28:fontcolor=yellow:box=1:boxcolor=black@0.7" "/tmp/q/linha_$n.png"
done
# folhas com 6 linhas cada
ls /tmp/q/linha_*.png | sort -t_ -k2 -n > /tmp/linhas.txt
split -l 6 /tmp/linhas.txt /tmp/grupo_
i=0
for g in /tmp/grupo_*; do
  i=$((i+1)); args=(); k=0
  while read l; do args+=(-i "$l"); k=$((k+1)); done < "$g"
  if [ $k -gt 1 ]; then ffmpeg -v error -y "${args[@]}" -filter_complex "vstack=$k" -q:v 4 "anim/folhas/folha_$(printf %02d $i).jpg"
  else ffmpeg -v error -y "${args[@]}" -q:v 4 "anim/folhas/folha_$(printf %02d $i).jpg"; fi
done
du -sh anim/v; ls anim/v | wc -l
