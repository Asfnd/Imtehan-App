# Sound Files Guide

This directory contains sound effects for the quiz gamification features.

## ✅ FINAL SOUND SELECTION (ACTIVE)

All sounds have been selected and are ready to use!

### 1. correct.mp3
- **Purpose**: Plays when user selects correct answer
- **Duration**: 200-500ms
- **Type**: Pleasant chime, bell, or success sound
- **Recommended sources**:
  - https://mixkit.co/free-sound-effects/success/
  - https://freesound.org/search/?q=correct+answer
  - https://www.zapsplat.com/sound-effect-category/success/

### 2. incorrect.mp3
- **Purpose**: Plays when user selects wrong answer
- **Duration**: 200-400ms
- **Type**: Gentle "oops" or soft error sound (not harsh)
- **Recommended sources**:
  - https://mixkit.co/free-sound-effects/error/
  - https://freesound.org/search/?q=wrong+answer
  - https://www.zapsplat.com/sound-effect-category/error/

### 3. streak-milestone.mp3
- **Purpose**: Plays when user reaches streak milestones (5, 10, etc.)
- **Duration**: 500-1000ms
- **Type**: Celebratory fanfare or achievement sound
- **Recommended sources**:
  - https://mixkit.co/free-sound-effects/win/
  - https://freesound.org/search/?q=achievement
  - https://www.zapsplat.com/sound-effect-category/achievement/

### 4. quiz-complete.mp3
- **Purpose**: Plays when user completes the entire quiz
- **Duration**: 1-2 seconds
- **Type**: Victory or completion fanfare
- **Recommended sources**:
  - https://mixkit.co/free-sound-effects/game/
  - https://freesound.org/search/?q=victory
  - https://www.zapsplat.com/sound-effect-category/victory/

## Quick Setup (Temporary)

For testing purposes, you can use these free sound URLs temporarily:

1. Download sounds from Mixkit (royalty-free):
   - Correct: https://assets.mixkit.co/active_storage/sfx/2018/2018-preview.mp3
   - Incorrect: https://assets.mixkit.co/active_storage/sfx/2955/2955-preview.mp3
   - Streak: https://assets.mixkit.co/active_storage/sfx/1435/1435-preview.mp3
   - Complete: https://assets.mixkit.co/active_storage/sfx/2000/2000-preview.mp3

2. Rename them to match the required filenames above
3. Place them in this directory

## File Format Requirements

- **Format**: MP3 (best browser compatibility)
- **Bitrate**: 128kbps or lower (for fast loading)
- **Sample Rate**: 44.1kHz
- **Channels**: Mono or Stereo
- **File Size**: Keep under 50KB each for optimal performance

## Testing

Once you've added the sound files, the sound manager will automatically preload them when the quiz page loads. You can test by:

1. Starting a quiz
2. Answering questions (correct/incorrect)
3. Building a streak to 5 or 10
4. Completing the quiz

## Troubleshooting

If sounds don't play:
1. Check browser console for loading errors
2. Verify file names match exactly (case-sensitive)
3. Ensure files are in MP3 format
4. Check file permissions
5. Try opening sound files directly in browser to verify they work

## License

Make sure any sound files you use are:
- Royalty-free
- Licensed for commercial use (if applicable)
- Properly attributed if required by the license
