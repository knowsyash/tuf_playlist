"use client";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export function Spotlight({
  className = "",
  fill = "white",
}: {
  className?: string;
  fill?: string;
}) {
  return (
    <svg
      className={`animate-spotlight pointer-events-none absolute z-[1] h-[169%] w-[138%] lg:w-[84%] opacity-0 ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 3787 2842"
      fill="none"
    >
      <g filter="url(#filter)">
        <ellipse cx="1924.71" cy="273.501" rx="1924.71" ry="273.501" transform="matrix(-0.822377 -0.568943 -0.568943 0.822377 3631.88 2291.09)" fill={fill} fillOpacity="0.21" />
      </g>
      <defs>
        <filter id="filter" x="0.860352" y="0.838989" width="3785.16" height="2840.26" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="151" result="effect1_foregroundBlur_1065_8" />
        </filter>
      </defs>
    </svg>
  );
}

export function BackgroundBeams() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <svg className="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="beam1" cx="50%" cy="0%" r="60%">
            <stop offset="0%" stopColor="rgba(120,80,255,0.08)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
          <radialGradient id="beam2" cx="80%" cy="30%" r="40%">
            <stop offset="0%" stopColor="rgba(56,189,248,0.06)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#beam1)" />
        <rect width="100%" height="100%" fill="url(#beam2)" />
      </svg>
      {/* Grid lines */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
    </div>
  );
}

export function AnimatedNumber({ value }: { value: number }) {
  return (
    <motion.span
      key={value}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {value}
    </motion.span>
  );
}

export function GlowCard({
  children,
  className = "",
  color = "#7c3aed",
}: {
  children: React.ReactNode;
  className?: string;
  color?: string;
}) {
  return (
    <div
      className={`relative rounded-2xl border border-white/10 bg-black/40 backdrop-blur-sm p-5 group transition-all duration-300 hover:border-white/20 ${className}`}
      style={{ boxShadow: `0 0 0 0 ${color}00` }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = `0 0 30px 0 ${color}18`;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = `0 0 0 0 ${color}00`;
      }}
    >
      {children}
    </div>
  );
}
