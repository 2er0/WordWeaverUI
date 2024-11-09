import { GameProvider } from '@/components/providers/GameProvider';
import { Game } from '@/components/Game';

export default function HomePage() {
  return (
    <GameProvider>
      <Game />
    </GameProvider>
  );
}