'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { usePathname } from 'next/navigation';

const lettersAndSymbols = 'abcdefghijklmnopqrstuvwxyz!@#$%^&*-_+=;:<>,';

interface AnimatedTextProps {
  text: string;
}

export function RandomizedTextEffect({ text }: AnimatedTextProps) {
  const [animatedText, setAnimatedText] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const pathname = usePathname();

  const getRandomChar = useCallback(() =>
    lettersAndSymbols[Math.floor(Math.random() * lettersAndSymbols.length)],
    []
  );

  const animateText = useCallback(async () => {
    if (isAnimating || hasAnimated) return;
    
    setIsAnimating(true);
    const duration = 50;
    const revealDuration = 80;
    const initialRandomDuration = 300;

    const generateRandomText = () =>
      text.split('').map(() => getRandomChar()).join('');

    setAnimatedText(generateRandomText());

    const endTime = Date.now() + initialRandomDuration;
    while (Date.now() < endTime) {
      await new Promise((resolve) => setTimeout(resolve, duration));
      setAnimatedText(generateRandomText());
    }

    for (let i = 0; i < text.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, revealDuration));
      setAnimatedText((prevText) =>
        text.slice(0, i + 1) +
        prevText.slice(i + 1).split('').map(() => getRandomChar()).join('')
      );
    }
    
    setIsAnimating(false);
    setHasAnimated(true);
  }, [text, getRandomChar, isAnimating, hasAnimated]);

  useEffect(() => {
    // Reset animation state when pathname changes (page navigation)
    setHasAnimated(false);
    setAnimatedText('');
  }, [pathname]);

  useEffect(() => {
    // Only animate if we haven't animated yet for this page
    if (!hasAnimated && !isAnimating) {
      const timer = setTimeout(() => {
        animateText();
      }, 500); // Small delay for page load

      return () => clearTimeout(timer);
    }
  }, [animateText, hasAnimated, isAnimating]);

  return <span className='relative inline-block'>{animatedText}</span>;
}