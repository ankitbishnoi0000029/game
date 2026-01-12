import { NextRequest, NextResponse } from 'next/server';
import { getCurrentGameRound } from '@/lib/dbWrk';

export async function GET(request: NextRequest) {
  try {
    // Get current game period logic (same as in server.js)
    const now = new Date();
    const nowUTC = new Date(now.getTime() + (now.getTimezoneOffset() * 60000));

    const GAME_START_HOUR = 3;
    const GAME_START_MINUTE = 30;
    const GAME_DURATION_MINUTES = 12 * 60;
    const ROUND_DURATION_SECONDS = 15 * 60;

    const currentHour = nowUTC.getHours();
    const currentMinute = nowUTC.getMinutes();
    const currentTimeMinutes = currentHour * 60 + currentMinute;
    const gameStartMinutes = GAME_START_HOUR * 60 + GAME_START_MINUTE;
    const gameEndMinutes = gameStartMinutes + GAME_DURATION_MINUTES;

    let gamePeriod;
    if (currentTimeMinutes >= gameStartMinutes && currentTimeMinutes < gameEndMinutes) {
      const elapsedMinutes = currentTimeMinutes - gameStartMinutes;
      const currentRound = Math.floor(elapsedMinutes / (ROUND_DURATION_SECONDS / 60)) + 1;
      const roundStartMinutes = gameStartMinutes + (currentRound - 1) * (ROUND_DURATION_SECONDS / 60);
      const roundElapsedSeconds = (currentTimeMinutes - roundStartMinutes) * 60;

      gamePeriod = {
        isActive: true,
        timeUntilEnd: gameEndMinutes - currentTimeMinutes,
        currentRound: currentRound,
        roundTimeLeft: ROUND_DURATION_SECONDS - roundElapsedSeconds,
      };
    } else {
      let nextGameDate = new Date(nowUTC);
      if (currentTimeMinutes < gameStartMinutes) {
        nextGameDate.setHours(GAME_START_HOUR, GAME_START_MINUTE, 0, 0);
      } else {
        nextGameDate.setDate(nextGameDate.getDate() + 1);
        nextGameDate.setHours(GAME_START_HOUR, GAME_START_MINUTE, 0, 0);
      }

      const timeUntilStartMs = nextGameDate.getTime() - nowUTC.getTime();
      const timeUntilStartSeconds = Math.floor(timeUntilStartMs / 1000);

      gamePeriod = {
        isActive: false,
        timeUntilStart: timeUntilStartSeconds,
        currentRound: null,
        roundTimeLeft: 0,
        nextGameStart: nextGameDate
      };
    }

    // Get current round data
    const currentRoundData = await getCurrentGameRound();

    return NextResponse.json({
      ...gamePeriod,
      currentRoundData,
      timestamp: Date.now()
    });
  } catch (error) {
    console.error('Game state error:', error);
    return NextResponse.json({ error: 'Failed to get game state' }, { status: 500 });
  }
}
