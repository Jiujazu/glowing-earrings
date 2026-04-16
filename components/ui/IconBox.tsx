import type { LucideIcon } from "lucide-react";

interface IconBoxProps {
  icon: LucideIcon;
  color?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizes = {
  sm: { box: "w-7 h-7", icon: "w-3.5 h-3.5", border: "border-2", stroke: 3 },
  md: { box: "w-9 h-9", icon: "w-5 h-5", border: "border-[3px]", stroke: 3 },
  lg: { box: "w-14 h-14", icon: "w-7 h-7", border: "border-4", stroke: 3 },
};

export default function IconBox({ icon: Icon, color = "#E91E8C", size = "md", className = "" }: IconBoxProps) {
  const s = sizes[size];
  return (
    <span
      className={`inline-flex items-center justify-center ${s.box} ${s.border} border-black text-white flex-shrink-0 ${className}`}
      style={{ backgroundColor: color }}
    >
      <Icon className={s.icon} strokeWidth={s.stroke} />
    </span>
  );
}
