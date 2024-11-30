import React, { useEffect, useRef } from 'react';
import { useGameStore } from '../store/gameStore';

const SEGMENTS = [
  { text: '2x', color: '#FF6B6B', multiplier: 2 },
  { text: '0x', color: '#4ECDC4', multiplier: 0 },
  { text: '3x', color: '#45B7D1', multiplier: 3 },
  { text: '0.5x', color: '#96CEB4', multiplier: 0.5 },
  { text: '5x', color: '#FFEEAD', multiplier: 5 },
  { text: '0x', color: '#D4A5A5', multiplier: 0 },
  { text: '1.5x', color: '#9DE0AD', multiplier: 1.5 },
  { text: '10x', color: '#FF9999', multiplier: 10 },
];

export const Wheel: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { spinning, setSpinning, selectedAmount, setCoins, addToHistory, saveUserData } = useGameStore();
  const rotationRef = useRef(0);
  const animationRef = useRef<number>();

  const drawWheel = (rotation: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 10;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw segments
    SEGMENTS.forEach((segment, i) => {
      const angle = (Math.PI * 2) / SEGMENTS.length;
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(
        centerX,
        centerY,
        radius,
        angle * i + rotation,
        angle * (i + 1) + rotation
      );
      ctx.closePath();
      ctx.fillStyle = segment.color;
      ctx.fill();
      ctx.stroke();

      // Draw text
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(angle * i + angle / 2 + rotation);
      ctx.textAlign = 'right';
      ctx.fillStyle = '#000';
      ctx.font = 'bold 20px Arial';
      ctx.fillText(segment.text, radius - 20, 6);
      ctx.restore();
    });

    // Draw center circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, 20, 0, Math.PI * 2);
    ctx.fillStyle = '#fff';
    ctx.fill();
    ctx.stroke();
  };

  const spin = () => {
    if (spinning) return;

    setSpinning(true);
    const targetRotation = rotationRef.current + Math.PI * 20 + Math.random() * Math.PI * 2;
    const startTime = performance.now();
    const duration = 5000;

    const animate = async (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function for smooth deceleration
      const eased = 1 - Math.pow(1 - progress, 3);
      rotationRef.current = rotationRef.current + (targetRotation - rotationRef.current) * eased;
      
      drawWheel(rotationRef.current);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        setSpinning(false);
        const finalSegment = Math.floor(
          (rotationRef.current % (Math.PI * 2)) / ((Math.PI * 2) / SEGMENTS.length)
        );
        const multiplier = SEGMENTS[finalSegment % SEGMENTS.length].multiplier;
        const winnings = selectedAmount * multiplier;
        
        setCoins((prev) => prev - selectedAmount + winnings);
        addToHistory(selectedAmount, multiplier, winnings);
        await saveUserData();
        
        window.Telegram.WebApp.showPopup({
          title: 'Result',
          message: `You won ${winnings} coins! (${multiplier}x)`,
        });
      }
    };

    animationRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = 300;
    canvas.height = 300;
    drawWheel(0);

    // Load user data when component mounts
    const userId = window.Telegram.WebApp.initDataUnsafe?.user?.id?.toString();
    if (userId) {
      useGameStore.getState().loadUserData(userId);
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div className="relative">
      <canvas
        ref={canvasRef}
        className="max-w-full h-auto"
        onClick={spin}
      />
      {spinning && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-xl font-bold text-white bg-black bg-opacity-50 px-4 py-2 rounded">
            Spinning...
          </div>
        </div>
      )}
    </div>
  );
};