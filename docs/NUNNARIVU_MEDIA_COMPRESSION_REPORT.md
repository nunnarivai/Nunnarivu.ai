# Nunnarivu.ai — Media Compression & Project Size Optimization Report

- **Project Root:** `D:\Nunnarivu.ai`
- **Git Checkpoint Tag:** `checkpoint/pre-media-compression` (HEAD `5fccd1a`)
- **External Recoverable Backup (Outside Project):** `C:\Users\SAFERA\.gemini\antigravity\brain\b6e62106-2396-4a5b-8b8a-5a71442e99f2\scratch\media_backup_orig`
- **File Preservation Guarantee:** **0** filenames changed, **0** folder locations changed, **0** extensions changed, **0** image dimensions altered, **0** video resolutions/frame rates/durations altered, **0** React/CSS/route code changes.
- **Files Evaluated:** `111` (`78` optimized in-place, `33` safely retained original)

---

## A. Original Project Media Size
- **Total Original Media Size:** `139.96 MB` (`146761434` bytes across `111` files)

## B. Final Project Media Size
- **Total Optimized Media Size:** `118.4 MB` (`124150929` bytes across `111` files)
- **Total Production Build (dist/) Size:** `119.07 MB` (dist/assets/: `118.69 MB`)

## C. Compression by Category

| Category | Files | Optimized | Original Size | Optimized Size | Space Saved | Reduction |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| **Videos** | 20 | 7 | 126.17 MB | 106.64 MB | 19.53 MB | 15.48% |
| **Images** | 85 | 71 | 11.24 MB | 9.2 MB | 2.03 MB | 18.11% |
| **Audio** | 6 | 0 | 2.56 MB | 2.56 MB | 0 MB | 0% |
| **TOTAL** | **111** | **78** | **139.96 MB** | **118.4 MB** | **21.56 MB** | **15.41%** |

---

## D. Complete Per-File Results (All 111 Files)

| Original Path | Original (Bytes) | Optimized (Bytes) | Saved (Bytes) | Reduction | Compression Method | Quality Validation | Status |
| --- | ---: | ---: | ---: | ---: | --- | --- | --- |
| `assets/videos/Nunnarivu_Full_Film.mp4` | 84668009 | 65475871 | 19192138 | 22.67% | libx264 CRF 23 (slow) + faststart + audio copy | SSIM=0.9917 PSNR=47.867995dB VMAF=95.31844 | Optimized in-place |
| `assets/new-site/enterprise/videos/movie-creation-demo.mp4` | 4423834 | 3907507 | 516327 | 11.67% | libx264 CRF 24 (slow) + faststart + audio copy | SSIM=0.9837 PSNR=44.094205dB VMAF=95.929243 | Optimized in-place |
| `assets/new-site/enterprise/videos/video-generation-demo.mp4` | 1681948 | 1317002 | 364946 | 21.7% | libx264 CRF 25 (slow) + faststart | SSIM=0.992723 PSNR=48.807659dB | Optimized in-place |
| `assets/images/Generative world.jpeg` | 445769 | 295762 | 150007 | 33.65% | JPEG optimal Huffman + metadata strip (q=3) | SSIM=0.986814 PSNR=44.513369dB | Optimized in-place |
| `assets/images/Characters.jpeg` | 365252 | 221856 | 143396 | 39.26% | JPEG optimal Huffman + metadata strip (q=3) | SSIM=0.986355 PSNR=45.273788dB | Optimized in-place |
| `assets/images/Concept.jpeg` | 333084 | 207412 | 125672 | 37.73% | JPEG optimal Huffman + metadata strip (q=3) | SSIM=0.987694 PSNR=46.144181dB | Optimized in-place |
| `assets/new-site/enterprise/media-v2/videos/vid-cosmic-geometry-v2.mp4` | 1949804 | 1826279 | 123525 | 6.34% | libx264 CRF 26 (slow) + faststart | SSIM=0.987381 PSNR=43.892817dB | Optimized in-place |
| `assets/new-site/enterprise/videos/image-generation-demo.mp4` | 1414694 | 1292086 | 122608 | 8.67% | libx264 CRF 24 (slow) + faststart | SSIM=0.992734 PSNR=46.653035dB | Optimized in-place |
| `assets/images/Generative AI Media.jpeg` | 283638 | 162045 | 121593 | 42.87% | JPEG optimal Huffman + metadata strip (q=3) | SSIM=0.989445 PSNR=46.847648dB | Optimized in-place |
| `assets/images/Script.jpeg` | 272042 | 153512 | 118530 | 43.57% | JPEG optimal Huffman + metadata strip (q=3) | SSIM=0.988919 PSNR=47.110557dB | Optimized in-place |
| `assets/images/Flagship Products.jpeg` | 280551 | 163056 | 117495 | 41.88% | JPEG optimal Huffman + metadata strip (q=3) | SSIM=0.991136 PSNR=47.056784dB | Optimized in-place |
| `assets/images/Camera.jpeg` | 258821 | 143804 | 115017 | 44.44% | JPEG optimal Huffman + metadata strip (q=3) | SSIM=0.990329 PSNR=47.218104dB | Optimized in-place |
| `assets/images/AI Business Solutions.jpeg` | 255415 | 149466 | 105949 | 41.48% | JPEG optimal Huffman + metadata strip (q=3) | SSIM=0.991505 PSNR=47.498354dB | Optimized in-place |
| `assets/images/Final frame.jpeg` | 298568 | 197509 | 101059 | 33.85% | JPEG optimal Huffman + metadata strip (q=3) | SSIM=0.987626 PSNR=44.729516dB | Optimized in-place |
| `assets/new-site/enterprise/media-v2/videos/vid-students-coding-v2.mp4` | 1364185 | 1278009 | 86176 | 6.32% | libx264 CRF 26 (slow) + faststart | SSIM=0.988576 PSNR=43.567348dB | Optimized in-place |
| `assets/new-site/enterprise/media-v2/videos/vid-student-prototype-v2.mp4` | 1090548 | 1019495 | 71053 | 6.52% | libx264 CRF 26 (slow) + faststart | SSIM=0.990835 PSNR=45.639572dB | Optimized in-place |
| `assets/new-site/enterprise/media-v2/images/img-cricket-stadium-v2.webp` | 191808 | 156428 | 35380 | 18.45% | libwebp method=6 level=6 q=80 | SSIM=0.9871 PSNR=43.758521dB | Optimized in-place |
| `assets/new-site/enterprise/media-v2/images/img-jewelry-bridal-v2.webp` | 167076 | 134848 | 32228 | 19.29% | libwebp method=6 level=6 q=80 | SSIM=0.991039 PSNR=45.62425dB | Optimized in-place |
| `assets/new-site/enterprise/media-v2/images/img-warrior-turnaround-v2.webp` | 161064 | 131116 | 29948 | 18.59% | libwebp method=6 level=6 q=80 | SSIM=0.987526 PSNR=44.830911dB | Optimized in-place |
| `assets/new-site/enterprise/media-v2/images/img-temple-courtyard-v2.webp` | 264864 | 235652 | 29212 | 11.03% | libwebp method=6 level=6 q=80 | SSIM=0.988251 PSNR=42.716272dB | Optimized in-place |
| `assets/new-site/enterprise/media-v2/images/img-ship-sunset-v2.webp` | 180098 | 151768 | 28330 | 15.73% | libwebp method=6 level=6 q=80 | SSIM=0.986484 PSNR=43.513889dB | Optimized in-place |
| `assets/new-site/enterprise/media-v2/images/img-elder-fiveview-v2.webp` | 109468 | 83098 | 26370 | 24.09% | libwebp method=6 level=6 q=80 | SSIM=0.98715 PSNR=45.261396dB | Optimized in-place |
| `assets/new-site/enterprise/media-v2/images/img-agri-drone-v2.webp` | 208980 | 183032 | 25948 | 12.42% | libwebp method=6 level=6 q=80 | SSIM=0.987751 PSNR=43.684903dB | Optimized in-place |
| `assets/new-site/enterprise/media-v2/images/img-jewelry-emerald-v2.webp` | 217930 | 192144 | 25786 | 11.83% | libwebp method=6 level=6 q=80 | SSIM=0.988584 PSNR=43.016011dB | Optimized in-place |
| `assets/new-site/enterprise/media-v2/images/img-cricket-gear-v2.webp` | 134636 | 109022 | 25614 | 19.02% | libwebp method=6 level=6 q=80 | SSIM=0.988347 PSNR=44.070402dB | Optimized in-place |
| `assets/new-site/enterprise/media-v2/images/img-sk-clock-v2.webp` | 98424 | 72864 | 25560 | 25.97% | libwebp method=6 level=6 q=80 | SSIM=0.986392 PSNR=45.572617dB | Optimized in-place |
| `assets/new-site/enterprise/media-v2/images/img-chennai-room-2026-v2.webp` | 168430 | 143210 | 25220 | 14.97% | libwebp method=6 level=6 q=80 | SSIM=0.986909 PSNR=43.526841dB | Optimized in-place |
| `assets/new-site/enterprise/media-v2/images/img-jersey-compare-v2.webp` | 115440 | 90306 | 25134 | 21.77% | libwebp method=6 level=6 q=80 | SSIM=0.986833 PSNR=44.600929dB | Optimized in-place |
| `assets/new-site/enterprise/media-v2/images/img-temple-twilight-v2.webp` | 185768 | 160640 | 25128 | 13.53% | libwebp method=6 level=6 q=80 | SSIM=0.988938 PSNR=43.05158dB | Optimized in-place |
| `assets/new-site/enterprise/media-v2/images/img-misty-riverlands-v2.webp` | 143998 | 119884 | 24114 | 16.75% | libwebp method=6 level=6 q=80 | SSIM=0.9858 PSNR=44.553999dB | Optimized in-place |
| `assets/new-site/enterprise/media-v2/images/img-changing-room-v2.webp` | 93342 | 70072 | 23270 | 24.93% | libwebp method=6 level=6 q=80 | SSIM=0.987957 PSNR=45.36703dB | Optimized in-place |
| `assets/new-site/enterprise/media-v2/images/img-dusty-campus-v2.webp` | 202210 | 179160 | 23050 | 11.4% | libwebp method=6 level=6 q=80 | SSIM=0.987449 PSNR=43.445883dB | Optimized in-place |
| `assets/new-site/enterprise/media-v2/images/img-kharagpur-station-v2.webp` | 175498 | 152452 | 23046 | 13.13% | libwebp method=6 level=6 q=80 | SSIM=0.988535 PSNR=43.901549dB | Optimized in-place |
| `assets/new-site/enterprise/media-v2/images/img-chennai-room-2011-v2.webp` | 153820 | 130962 | 22858 | 14.86% | libwebp method=6 level=6 q=80 | SSIM=0.989542 PSNR=43.705839dB | Optimized in-place |
| `assets/new-site/enterprise/media-v2/images/img-tiger-fleet-v2.webp` | 158776 | 135926 | 22850 | 14.39% | libwebp method=6 level=6 q=80 | SSIM=0.988368 PSNR=43.995573dB | Optimized in-place |
| `assets/new-site/enterprise/media-v2/images/img-wooden-dummy-v2.webp` | 144024 | 121320 | 22704 | 15.76% | libwebp method=6 level=6 q=80 | SSIM=0.990659 PSNR=45.547806dB | Optimized in-place |
| `assets/new-site/enterprise/media-v2/images/img-molten-foundry-v2.webp` | 126758 | 104148 | 22610 | 17.84% | libwebp method=6 level=6 q=80 | SSIM=0.986794 PSNR=44.500479dB | Optimized in-place |
| `assets/new-site/enterprise/cinema/character-creation.webp` | 93982 | 72804 | 21178 | 22.53% | libwebp method=6 level=6 q=80 | SSIM=0.98871 PSNR=45.281469dB | Optimized in-place |
| `assets/new-site/enterprise/media-v2/images/img-vintage-objects-v2.webp` | 77978 | 56804 | 21174 | 27.15% | libwebp method=6 level=6 q=80 | SSIM=0.991235 PSNR=46.3662dB | Optimized in-place |
| `assets/new-site/enterprise/media-v2/images/img-courtyard-boy-v2.webp` | 117884 | 97590 | 20294 | 17.22% | libwebp method=6 level=6 q=80 | SSIM=0.987581 PSNR=44.32364dB | Optimized in-place |
| `assets/new-site/enterprise/media-v2/images/img-char-sheet-v2.webp` | 138702 | 118602 | 20100 | 14.49% | libwebp method=6 level=6 q=80 | SSIM=0.992244 PSNR=44.731476dB | Optimized in-place |
| `assets/new-site/enterprise/media-v2/images/img-tamil-man-sheet-v2.webp` | 132622 | 113380 | 19242 | 14.51% | libwebp method=6 level=6 q=80 | SSIM=0.989729 PSNR=44.648705dB | Optimized in-place |
| `assets/new-site/enterprise/media-v2/images/img-twilight-study-v2.webp` | 140056 | 121062 | 18994 | 13.56% | libwebp method=6 level=6 q=80 | SSIM=0.988915 PSNR=44.904778dB | Optimized in-place |
| `assets/new-site/enterprise/media-v2/images/poster-sacred-lotus-v2.webp` | 87416 | 68538 | 18878 | 21.6% | libwebp method=6 level=6 q=80 | SSIM=0.985357 PSNR=45.252561dB | Optimized in-place |
| `assets/new-site/enterprise/media-v2/images/img-three-trainees-v2.webp` | 86840 | 69848 | 16992 | 19.57% | libwebp method=6 level=6 q=80 | SSIM=0.990533 PSNR=45.631474dB | Optimized in-place |
| `assets/new-site/enterprise/media-v2/images/img-sk-hallticket-v2.webp` | 77272 | 60470 | 16802 | 21.74% | libwebp method=6 level=6 q=80 | SSIM=0.990692 PSNR=45.969409dB | Optimized in-place |
| `assets/new-site/enterprise/media-v2/images/img-temple-sunrise-v2.webp` | 74268 | 57706 | 16562 | 22.3% | libwebp method=6 level=6 q=80 | SSIM=0.988577 PSNR=46.152739dB | Optimized in-place |
| `assets/new-site/enterprise/media-v2/images/img-tamil-veena-v2.webp` | 143266 | 127560 | 15706 | 10.96% | libwebp method=6 level=6 q=80 | SSIM=0.991235 PSNR=45.121855dB | Optimized in-place |
| `assets/new-site/enterprise/media-v2/images/img-sk-classroom-v2.webp` | 88974 | 73872 | 15102 | 16.97% | libwebp method=6 level=6 q=80 | SSIM=0.992692 PSNR=46.052972dB | Optimized in-place |
| `assets/new-site/enterprise/media-v2/images/img-cricket-living-v2.webp` | 62632 | 49360 | 13272 | 21.19% | libwebp method=6 level=6 q=80 | SSIM=0.993045 PSNR=49.275749dB | Optimized in-place |
| `assets/new-site/enterprise/images/voice-studio.webp` | 65650 | 52538 | 13112 | 19.97% | libwebp method=6 level=6 q=80 | SSIM=0.993509 PSNR=46.9316dB | Optimized in-place |
| `assets/new-site/enterprise/media-v2/images/img-crown-splash-v2.webp` | 66786 | 53982 | 12804 | 19.17% | libwebp method=6 level=6 q=80 | SSIM=0.992745 PSNR=47.27272dB | Optimized in-place |
| `assets/images/og-cover.jpg` | 59750 | 47529 | 12221 | 20.45% | JPEG optimal Huffman + metadata strip (q=3) | SSIM=0.999211 PSNR=50.917853dB | Optimized in-place |
| `assets/new-site/enterprise/media-v2/images/img-jewelry-ring-v2.webp` | 85930 | 74066 | 11864 | 13.81% | libwebp method=6 level=6 q=80 | SSIM=0.99506 PSNR=47.133559dB | Optimized in-place |
| `assets/new-site/enterprise/media-v2/images/img-fashion-coat-02-v2.webp` | 47808 | 36044 | 11764 | 24.61% | libwebp method=6 level=6 q=80 | SSIM=0.995318 PSNR=50.306552dB | Optimized in-place |
| `assets/new-site/enterprise/academy/krishna-arjuna-promo-colour.webp` | 183190 | 171640 | 11550 | 6.3% | libwebp method=6 level=6 q=88 | SSIM=0.996994 PSNR=50.745033dB | Optimized in-place |
| `assets/new-site/enterprise/media-v2/images/img-sk-handoff-v2.webp` | 67372 | 55896 | 11476 | 17.03% | libwebp method=6 level=6 q=80 | SSIM=0.993059 PSNR=46.740391dB | Optimized in-place |
| `assets/new-site/enterprise/media-v2/images/img-sk-teacher-v2.webp` | 79724 | 68282 | 11442 | 14.35% | libwebp method=6 level=6 q=80 | SSIM=0.993498 PSNR=46.590048dB | Optimized in-place |
| `assets/new-site/enterprise/media-v2/images/poster-mentorship-v2.webp` | 77996 | 66640 | 11356 | 14.56% | libwebp method=6 level=6 q=80 | SSIM=0.992964 PSNR=46.357466dB | Optimized in-place |
| `assets/new-site/enterprise/media-v2/images/img-pro-portrait-sheet-v2.webp` | 55070 | 44606 | 10464 | 19% | libwebp method=6 level=6 q=80 | SSIM=0.994235 PSNR=47.015566dB | Optimized in-place |
| `assets/new-site/enterprise/media-v2/images/poster-students-coding-v2.webp` | 65470 | 55374 | 10096 | 15.42% | libwebp method=6 level=6 q=80 | SSIM=0.992419 PSNR=47.070612dB | Optimized in-place |
| `assets/new-site/enterprise/media-v2/images/img-yellow-jersey-sheet-v2.webp` | 55340 | 45422 | 9918 | 17.92% | libwebp method=6 level=6 q=80 | SSIM=0.993563 PSNR=47.032267dB | Optimized in-place |
| `assets/new-site/enterprise/media-v2/images/img-fashion-coat-01-v2.webp` | 39740 | 30002 | 9738 | 24.5% | libwebp method=6 level=6 q=80 | SSIM=0.995377 PSNR=49.760127dB | Optimized in-place |
| `assets/new-site/enterprise/media-v2/images/img-fashion-coat-03-v2.webp` | 69088 | 59642 | 9446 | 13.67% | libwebp method=6 level=6 q=80 | SSIM=0.995907 PSNR=50.197034dB | Optimized in-place |
| `assets/new-site/enterprise/media-v2/images/poster-chola-epic-v2.webp` | 60322 | 50884 | 9438 | 15.65% | libwebp method=6 level=6 q=80 | SSIM=0.990568 PSNR=47.403664dB | Optimized in-place |
| `assets/new-site/enterprise/media-v2/images/img-sk-exam-hero-v2.webp` | 52082 | 42844 | 9238 | 17.74% | libwebp method=6 level=6 q=80 | SSIM=0.994212 PSNR=48.303269dB | Optimized in-place |
| `assets/new-site/enterprise/cinema/ai-advertisements.webp` | 36990 | 27980 | 9010 | 24.36% | libwebp method=6 level=6 q=80 | SSIM=0.995023 PSNR=49.355719dB | Optimized in-place |
| `assets/new-site/enterprise/security/data-privacy.webp` | 47528 | 38976 | 8552 | 17.99% | libwebp method=6 level=6 q=80 | SSIM=0.99592 PSNR=48.423716dB | Optimized in-place |
| `assets/new-site/enterprise/media-v2/images/poster-courtyard-v2.webp` | 49320 | 40906 | 8414 | 17.06% | libwebp method=6 level=6 q=80 | SSIM=0.991389 PSNR=48.070141dB | Optimized in-place |
| `assets/new-site/enterprise/academy/academy-boxes.webp` | 107102 | 99014 | 8088 | 7.55% | libwebp method=6 level=6 q=88 | SSIM=0.997487 PSNR=52.738442dB | Optimized in-place |
| `assets/new-site/enterprise/media-v2/images/poster-cosmic-geometry-v2.webp` | 38832 | 31276 | 7556 | 19.46% | libwebp method=6 level=6 q=80 | SSIM=0.992647 PSNR=47.329676dB | Optimized in-place |
| `assets/new-site/enterprise/media-v2/images/poster-mahabharata-v2.webp` | 46530 | 39422 | 7108 | 15.28% | libwebp method=6 level=6 q=80 | SSIM=0.993906 PSNR=47.897657dB | Optimized in-place |
| `assets/new-site/enterprise/media-v2/images/poster-cricket-crowd-v2.webp` | 40702 | 34146 | 6556 | 16.11% | libwebp method=6 level=6 q=80 | SSIM=0.99323 PSNR=48.708932dB | Optimized in-place |
| `assets/new-site/enterprise/media-v2/images/poster-bizznet-v2.webp` | 21380 | 15380 | 6000 | 28.06% | libwebp method=6 level=6 q=80 | SSIM=0.998498 PSNR=50.796134dB | Optimized in-place |
| `assets/new-site/enterprise/security/enterprise-access.webp` | 35324 | 29956 | 5368 | 15.2% | libwebp method=6 level=6 q=80 | SSIM=0.997921 PSNR=49.863158dB | Optimized in-place |
| `assets/new-site/enterprise/media-v2/images/poster-fashion-motion-v2.webp` | 29268 | 24344 | 4924 | 16.82% | libwebp method=6 level=6 q=80 | SSIM=0.994863 PSNR=49.517309dB | Optimized in-place |
| `assets/new-site/enterprise/media-v2/images/poster-student-factory-v2.webp` | 30702 | 26178 | 4524 | 14.74% | libwebp method=6 level=6 q=80 | SSIM=0.99488 PSNR=49.928159dB | Optimized in-place |
| `assets/images/logo-full.png` | 712434 | 708103 | 4331 | 0.61% | Lossless PNG recompression (level 100 + mixed pred + metadata strip) | 100% pixel-identical (RGBA verified) | Optimized in-place |
| `assets/new-site/enterprise/media-v2/audio/aud-studio-cue-01-v2.mp3` | 50199 | 50199 | 0 | 0% | Retained (97.3 kbps mono MP3 already optimal) | Avoided lossy MP3 re-encoding | Retained original |
| `assets/new-site/enterprise/audio/nunnarivu-voice-commercial.mp3` | 229676 | 229676 | 0 | 0% | Retained (128.6 kbps mono MP3 already optimal) | Avoided lossy MP3 re-encoding | Retained original |
| `assets/new-site/enterprise/academy/academy-banner.webp` | 27628 | 27628 | 0 | 0% | Evaluated WebP optimization | Already optimal within quality threshold | Retained original |
| `assets/new-site/enterprise/media-v2/audio/aud-studio-cue-02-v2.mp3` | 28883 | 28883 | 0 | 0% | Retained (98.3 kbps mono MP3 already optimal) | Avoided lossy MP3 re-encoding | Retained original |
| `favicons/apple-touch-icon.png` | 41961 | 41961 | 0 | 0% | Evaluated lossless PNG | Already optimal | Retained original |
| `assets/new-site/enterprise/audio/nunnarivu-voice-narrator.mp3` | 230060 | 230060 | 0 | 0% | Retained (128.5 kbps mono MP3 already optimal) | Avoided lossy MP3 re-encoding | Retained original |
| `favicons/favicon-32x32.png` | 2121 | 2121 | 0 | 0% | Evaluated lossless PNG | Already optimal | Retained original |
| `favicons/favicon-48x48.png` | 4041 | 4041 | 0 | 0% | Evaluated lossless PNG | Already optimal | Retained original |
| `favicons/favicon.ico` | 15324 | 15324 | 0 | 0% | Skipped (multi-size browser favicon ICO) | Preserved original | Retained original |
| `assets/new-site/enterprise/media-v2/audio/aud-nunnarivu-reel-02-v2.mp3` | 1015998 | 1015998 | 0 | 0% | Retained (96.1 kbps mono MP3 already optimal) | Avoided lossy MP3 re-encoding | Retained original |
| `assets/new-site/enterprise/media-v2/audio/aud-nunnarivu-reel-01-v2.mp3` | 1126339 | 1126339 | 0 | 0% | Retained (96.1 kbps mono MP3 already optimal) | Avoided lossy MP3 re-encoding | Retained original |
| `favicons/favicon-16x16.png` | 772 | 772 | 0 | 0% | Evaluated lossless PNG | Already optimal | Retained original |
| `assets/new-site/enterprise/media-v2/videos/mov-mahabharata-prompt-v2.mp4` | 4973920 | 4973920 | 0 | 0% | Evaluated libx264 slow | Retained original (already efficient / quality threshold) | Retained original |
| `assets/new-site/enterprise/media-v2/videos/vid-bizznet-ad-v2.mp4` | 3270040 | 3270040 | 0 | 0% | Skipped (645.9 kbps H.264 already compact) | Already efficiently encoded | Retained original |
| `assets/new-site/enterprise/media-v2/videos/vid-fashion-continuity-v2.mp4` | 1412064 | 1412064 | 0 | 0% | Evaluated libx264 slow | Retained original (already efficient / quality threshold) | Retained original |
| `assets/new-site/enterprise/media-v2/videos/vid-courtyard-warrior-v2.mp4` | 476520 | 476520 | 0 | 0% | Evaluated libx264 slow | Retained original (already efficient / quality threshold) | Retained original |
| `assets/new-site/enterprise/media-v2/videos/vid-cricket-family-v2.mp4` | 1255662 | 1255662 | 0 | 0% | Evaluated libx264 slow | Retained original (already efficient / quality threshold) | Retained original |
| `assets/new-site/enterprise/media-v2/videos/vid-courtyard-action-v2.mp4` | 1533511 | 1533511 | 0 | 0% | Evaluated libx264 slow | Retained original (already efficient / quality threshold) | Retained original |
| `assets/new-site/enterprise/posters/movie-creation-poster.jpg` | 125421 | 125421 | 0 | 0% | Evaluated JPEG optimization | Already optimal within quality threshold | Retained original |
| `assets/new-site/enterprise/media-v2/videos/vid-student-mentorship-v2.mp4` | 1545985 | 1545985 | 0 | 0% | Evaluated libx264 slow | Retained original (already efficient / quality threshold) | Retained original |
| `assets/new-site/enterprise/media-v2/videos/mov-chola-epic-preview-v2.mp4` | 2389077 | 2389077 | 0 | 0% | Evaluated libx264 slow | Retained original (already efficient / quality threshold) | Retained original |
| `assets/new-site/enterprise/media-v2/videos/vid-sacred-lotus-v2.mp4` | 1558275 | 1558275 | 0 | 0% | Evaluated libx264 slow | Retained original (already efficient / quality threshold) | Retained original |
| `assets/new-site/enterprise/media-v2/videos/mov-sk-exam-clock-v2.mp4` | 397566 | 397566 | 0 | 0% | Skipped (451.7 kbps H.264 already compact) | Already efficiently encoded | Retained original |
| `assets/new-site/enterprise/media-v2/videos/vid-cricket-crowd-v2.mp4` | 1417371 | 1417371 | 0 | 0% | Evaluated libx264 slow | Retained original (already efficient / quality threshold) | Retained original |
| `favicons/android-chrome-512x512.png` | 287006 | 287006 | 0 | 0% | Evaluated lossless PNG | Already optimal | Retained original |
| `assets/new-site/enterprise/posters/video-generation-poster.jpg` | 51204 | 51204 | 0 | 0% | Evaluated JPEG optimization | Already optimal within quality threshold | Retained original |
| `favicons/android-chrome-192x192.png` | 47282 | 47282 | 0 | 0% | Evaluated lossless PNG | Already optimal | Retained original |
| `assets/new-site/enterprise/posters/image-generation-poster.jpg` | 174978 | 174978 | 0 | 0% | Evaluated JPEG optimization | Already optimal within quality threshold | Retained original |
| `assets/new-site/enterprise/media-v2/videos/mov-sk-exam-student-v2.mp4` | 395264 | 395264 | 0 | 0% | Skipped (225.9 kbps H.264 already compact) | Already efficiently encoded | Retained original |
| `assets/new-site/enterprise/media-v2/videos/mov-chola-epic-full-v2.mp4` | 15076767 | 15076767 | 0 | 0% | Evaluated libx264 slow | Retained original (already efficient / quality threshold) | Retained original |
| `assets/images/logo-emblem.png` | 483395 | 483395 | 0 | 0% | Evaluated lossless PNG | Already optimal | Retained original |
| `assets/new-site/enterprise/academy/krishna-option-a-brushstrokes.webp` | 338438 | 338438 | 0 | 0% | Evaluated WebP optimization | Already optimal within quality threshold | Retained original |
| `assets/new-site/enterprise/academy/krishna-option-a-brushstrokes-v3.webp` | 340790 | 340790 | 0 | 0% | Evaluated WebP optimization | Already optimal within quality threshold | Retained original |

---

## E. Skipped / Retained Original Assets & Rationale

Total retained originals: **33** files — every skip was intentional to prevent quality loss, generational re-encoding, or zero-gain churn:

1. **Audio MP3s (`6` files, `2.56 MB`):** All 6 MP3 tracks are already compact mono encodings (`96–128 kbps`, `44.1–48 kHz`). Re-encoding lossy MP3s to lower bitrates would introduce audible speech/music artifacts; lossless metadata copy produced `< 512 B` delta, so originals were preserved intact.
2. **Already Compact `media-v2` H.264 Videos (`13` files):** Previously encoded at efficient web bitrates (`226–1,562 kbps`, 720p H.264). Re-encoding with `libx264 -preset slow` at quality-preserving CRF either increased file size or saved `< 6%` (below our strict efficiency gate), so originals were preserved.
3. **Already Optimal PNGs, Small Favicons & Protected Alpha WebP (`14` files):** `favicons/favicon.ico` (multi-size browser icon), small favicon PNGs, `logo-emblem.png`, and `krishna-option-a-brushstrokes-v3.webp` (strict `SSIM >= 0.992` alpha guard) were already optimal and retained byte-for-byte.

---

## F. Verification & Deployment Cache-Invalidation Strategy

### Quality & Decode Verification
- **Enterprise Hero Video (`assets/videos/Nunnarivu_Full_Film.mp4`):** `80.75 MB → 62.44 MB (-22.67%)` at `libx264 CRF 23 (slow) + faststart + lossless AAC stream copy`, verified **`VMAF = 95.32`, `SSIM = 0.9917`, `PSNR = 47.87 dB`**, identical `1920×1080`, `24 fps`, `127.5s`, `48000 Hz / 2ch` audio, and visually confirmed frame-by-frame at `15s` and `65s` with zero banding, blocking, or colour shift.
- **All Optimized Videos (`7` files):** Every accepted candidate passed `ffprobe` decode validation, exact dimension/fps/duration/audio-channel matching, and `SSIM >= 0.983` / `PSNR >= 43.5 dB` (`VMAF >= 95.3` on films).
- **All Optimized Images (`71` files):** Lossless PNG verified **100% pixel-identical (RGBA)**; all JPEGs and WebPs verified **`SSIM 0.985–0.999`**, **`PSNR 42.7–52.7 dB`**, exact original dimensions, and alpha-channel preservation on transparent WebPs (`krishna-arjuna-promo-colour.webp` `SSIM 0.9970`, `academy-boxes.webp` `SSIM 0.9975`).
- **Website Build & Automated QA:** `npm run build` succeeded cleanly (`11.04s`, `dist/` = `119.07 MB`); the live Playwright suite (`verify_refinements.mjs`) passed **13/13 checks** (Workflow auto-rotation, Cinema Studio Tests 1–6, Academy `Mahabharatham` + v3 brush strokes, Footer UK/Trichy addresses, mobile `390px`/`360px` responsiveness) and `verify_complete_redesign.mjs` verified Hero playback, Showcase video/image/voice/movie loading, all 12 portfolio cards, Case Study playback, Academy 5-track page, `0` console errors, `0` failed network/asset requests, and `0` horizontal overflow across `1920`, `1440`, `1024`, `768`, `430`, `390`, and `360` viewports.

### Deployment & Immutable Cache Invalidation Note (`vercel.json`)
- `vercel.json` currently sends `Cache-Control: public, max-age=31536000, immutable` on `/assets/(.*)` (and `vite.config.js` sends `public, max-age=86400` in local dev).
- Because filenames and paths were preserved identically (per requirement), **returning browsers with already-cached old bytes** will continue serving their local cached copy until cache eviction, while **all new visitors and fresh Vercel edge deployments** immediately receive the smaller optimized bytes.
- **Recommended Deployment Cache Strategy (without renaming files):**
  1. Trigger a fresh Vercel deployment (Vercel automatically purges CDN edge cache per deployment).
  2. Optionally, before future in-place byte updates, consider switching `vercel.json` `/assets/(.*)` header from `immutable` to `public, max-age=3600, stale-while-revalidate=86400` (or using a query-string cache buster if forced immediate client revalidation is required on returning browsers).

---

## G. Final Savings Summary

```text
ORIGINAL MEDIA SIZE:  139.96 MB (146761434 bytes)
OPTIMIZED MEDIA SIZE: 118.4 MB (124150929 bytes)
TOTAL SPACE SAVED:    21.56 MB (22610505 bytes)
TOTAL REDUCTION:      15.41%
```

