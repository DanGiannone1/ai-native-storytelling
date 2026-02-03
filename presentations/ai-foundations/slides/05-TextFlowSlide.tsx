import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { Background, Icon } from '@catalog';

interface TextFlowSlideProps {
  active: boolean;
}

export const TextFlowSlide = ({ active }: TextFlowSlideProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');

  const fullInputText = "Write a short poem about the ocean";
  const fullOutputText = "Waves fold into moonlit lines, a quiet rhythm without end...";

  useEffect(() => {
    if (!active || !containerRef.current || hasAnimated.current) return;
    hasAnimated.current = true;

    const container = containerRef.current;
    const title = container.querySelector('.slide-title');
    const inputZone = container.querySelector('.input-zone');
    const transformZone = container.querySelector('.transform-zone');
    const outputZone = container.querySelector('.output-zone');
    const footer = container.querySelector('.slide-footer');

    gsap.fromTo(title,
      { opacity: 0, y: -30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
    );

    gsap.fromTo(inputZone,
      { opacity: 0, x: -30 },
      { opacity: 1, x: 0, duration: 0.6, delay: 0.3, ease: "power2.out" }
    );

    gsap.fromTo(transformZone,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.8, delay: 0.5, ease: "back.out(1.7)" }
    );

    gsap.fromTo(outputZone,
      { opacity: 0, x: 30 },
      { opacity: 1, x: 0, duration: 0.6, delay: 0.7, ease: "power2.out" }
    );

    // Type input text character by character
    let inputIndex = 0;
    const inputInterval = setInterval(() => {
      if (inputIndex <= fullInputText.length) {
        setInputText(fullInputText.slice(0, inputIndex));
        inputIndex++;
      } else {
        clearInterval(inputInterval);
      }
    }, 50);

    // Type output text word by word after input finishes
    setTimeout(() => {
      const words = fullOutputText.split(' ');
      let wordIndex = 0;
      const outputInterval = setInterval(() => {
        if (wordIndex <= words.length) {
          setOutputText(words.slice(0, wordIndex).join(' '));
          wordIndex++;
        } else {
          clearInterval(outputInterval);
        }
      }, 150);
    }, fullInputText.length * 50 + 500);

    gsap.fromTo(footer,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, delay: 3.5, ease: "power2.out" }
    );
  }, [active]);

  useEffect(() => {
    if (!active) {
      hasAnimated.current = false;
      setInputText('');
      setOutputText('');
    }
  }, [active]);

  return (
    <div className={`slide ${active ? 'active' : ''}`}>
      <div ref={containerRef} className="relative flex flex-col items-center justify-center h-screen">
        <Background variant="grid" />

        <h2 className="slide-title z-10 text-white mb-12">
          The Language Model <span className="text-violet-400">at its Core</span>
        </h2>

        {/* Main Flow Visualization */}
        <div className="z-10 relative w-[950px] h-[280px] flex items-center justify-between">
          {/* SVG for flowing particles through transformation zone */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            <defs>
              <linearGradient id="flowGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#22d3ee" stopOpacity="0" />
                <stop offset="30%" stopColor="#22d3ee" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#a78bfa" stopOpacity="1" />
                <stop offset="70%" stopColor="#34d399" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#34d399" stopOpacity="0" />
              </linearGradient>
              <filter id="flowBlur">
                <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>

            {/* Flowing particles through transformation zone */}
            {[0, 1, 2, 3, 4].map((i) => (
              <circle key={i} r="4" fill="url(#flowGrad1)" filter="url(#flowBlur)">
                <animateMotion
                  dur="2.5s"
                  repeatCount="indefinite"
                  path="M 260 140 C 350 140 400 100 475 140 C 550 180 600 140 690 140"
                  begin={`${i * 0.5}s`}
                />
                <animate attributeName="opacity" values="0;1;1;1;0" dur="2.5s" repeatCount="indefinite" begin={`${i * 0.5}s`} />
              </circle>
            ))}
          </svg>

          {/* Input Zone - Typing text */}
          <div className="input-zone w-64 text-right pr-4">
            <div className="flex items-center justify-end gap-2 mb-3">
              <Icon name="MessageSquare" size={16} strokeWidth={1.5} className="text-cyan-400" />
              <span className="text-cyan-400 text-sm font-medium">Prompt</span>
            </div>
            <p className="text-cyan-300 text-lg font-light leading-relaxed">
              {inputText}<span className="animate-pulse text-cyan-400">|</span>
            </p>
          </div>

          {/* Transformation Zone - Glowing blur */}
          <div className="transform-zone relative w-48 h-48 flex items-center justify-center">
            {/* Outer glow */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500/20 via-violet-500/30 to-emerald-500/20 blur-[60px]" />
            {/* Spinning particle ring */}
            <div className="absolute inset-4 rounded-full border border-violet-500/30 animate-spin-slow" style={{ borderStyle: 'dashed' }} />
            <div className="absolute inset-8 rounded-full border border-cyan-500/20 animate-spin-slower" style={{ borderStyle: 'dotted' }} />
            {/* Core glow */}
            <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-violet-500/40 to-cyan-500/40 blur-sm flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm" />
            </div>
          </div>

          {/* Output Zone - Materializing text */}
          <div className="output-zone w-64 text-left pl-4">
            <div className="flex items-center gap-2 mb-3">
              <Icon name="Sparkles" size={16} strokeWidth={1.5} className="text-emerald-400" />
              <span className="text-emerald-400 text-sm font-medium">Response</span>
            </div>
            <p className="text-emerald-300 text-lg font-light leading-relaxed">
              {outputText}
            </p>
          </div>
        </div>

        <p className="slide-footer z-10 text-white/40 mt-10">
          Prompt in, <span className="text-white/70">response out</span>
        </p>
      </div>
    </div>
  );
};
