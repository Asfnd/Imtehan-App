# 🔊 Sound Files Directory

## Required Sound Files:

Place the following MP3 files in this directory:

1. **correct.mp3** - Plays when user selects correct answer
   - Suggested: Cheerful bell or chime sound
   - Duration: 0.5-1 second
   - Example: "ding", "success", "correct"

2. **incorrect.mp3** - Plays when user selects wrong answer
   - Suggested: Gentle buzz or soft error sound
   - Duration: 0.5-1 second
   - Example: "buzz", "wrong", "error"

3. **streak-milestone.mp3** - Plays when user reaches streak milestone (every 5 correct)
   - Suggested: Celebratory fanfare or achievement sound
   - Duration: 1-2 seconds
   - Example: "fanfare", "achievement", "level-up"

4. **quiz-complete.mp3** - Plays when quiz is finished
   - Suggested: Victory or completion sound
   - Duration: 1-2 seconds
   - Example: "victory", "complete", "applause"

---

## Where to Get Free Sounds:

### 1. Freesound.org
- https://freesound.org/
- Search for: "correct", "wrong", "achievement", "victory"
- Filter by: Creative Commons 0 (Public Domain)

### 2. Zapsplat.com
- https://www.zapsplat.com/
- Free with attribution
- High quality game sounds

### 3. Mixkit.co
- https://mixkit.co/free-sound-effects/
- Free for commercial use
- No attribution required

### 4. Pixabay
- https://pixabay.com/sound-effects/
- Free for commercial use
- Good selection of UI sounds

---

## Quick Setup (Placeholder Sounds):

If you don't have sounds yet, you can:

1. **Option A:** Use silent placeholder files
   - Create empty 1-second MP3 files
   - App will work without sounds

2. **Option B:** Download from Freesound
   ```bash
   # Example searches:
   - "ui correct"
   - "ui wrong"
   - "achievement unlock"
   - "quiz complete"
   ```

3. **Option C:** Generate with AI
   - Use ElevenLabs Sound Effects
   - Use Soundraw.io
   - Use Mubert

---

## File Specifications:

- **Format:** MP3
- **Sample Rate:** 44.1kHz
- **Bitrate:** 128kbps (good quality, small size)
- **File Size:** < 50KB per file
- **Duration:** 0.5-2 seconds
- **Volume:** Normalized to -3dB

---

## Testing Sounds:

After adding sound files:

1. Go to any quiz page
2. Enable sound (speaker icon in header)
3. Answer questions to test:
   - Correct answer → correct.mp3
   - Wrong answer → incorrect.mp3
   - 5 correct in a row → streak-milestone.mp3
   - Finish quiz → quiz-complete.mp3

---

## Troubleshooting:

### Sounds Not Playing?
1. Check file names match exactly (case-sensitive)
2. Ensure files are in `public/sounds/` directory
3. Check browser console for errors
4. Verify sound toggle is enabled
5. Check file format is MP3

### Sounds Too Loud/Quiet?
- Adjust volume in `lib/sounds/soundManager.ts`
- Default volume is 0.7 (70%)
- Or normalize audio files to consistent volume

---

## Current Status:

- [ ] correct.mp3
- [ ] incorrect.mp3
- [ ] streak-milestone.mp3
- [ ] quiz-complete.mp3

**Add these files to enable sound effects!** 🔊
