import {
  Target, BookOpen, Palette, Mic, Lock, Monitor, Brain, Zap,
  Layers, Folder, FolderOpen, Building2, FileText, Ruler, Inbox,
  Search, Wrench, Heart, Rocket, Key, Lightbulb, BarChart3,
  AlertTriangle, Sparkles, Dices, PenLine, ClipboardList, HelpCircle,
  Image, Clapperboard, MessageCircleQuestion, Microscope,
  Star, Anchor, Eye, BookMarked, Compass, Cpu, Globe, Link,
  type LucideIcon,
} from "lucide-react";

/** Maps common emoji strings to their lucide-react icon equivalent. */
const emojiToIcon: Record<string, LucideIcon> = {
  // Course content emojis
  "\u{1F3AF}": Target,       // 🎯
  "\u{1F4D6}": BookOpen,     // 📖
  "\u{1F3A3}": Anchor,       // 🎣
  "\u{1F52C}": Microscope,   // 🔬
  "\u{1F3A8}": Palette,      // 🎨
  "\u{1F399}\uFE0F": Mic,    // 🎙️
  "\u{1F512}": Lock,         // 🔒
  "\u{1F4BB}": Monitor,      // 💻
  "\u{1F9E0}": Brain,        // 🧠
  "\u26A1": Zap,             // ⚡
  "\u{1F9F1}": Layers,       // 🧱
  "\u{1F4C2}": Folder,       // 📂
  "\u{1F5C2}\uFE0F": FolderOpen, // 🗂️
  "\u{1F3E2}": Building2,    // 🏢
  "\u{1F4C4}": FileText,     // 📄
  "\u{1F4D0}": Ruler,        // 📐
  "\u{1F4E5}": Inbox,        // 📥
  "\u{1F50D}": Search,       // 🔍
  "\u{1F527}": Wrench,       // 🔧
  "\u2764\uFE0F": Heart,     // ❤️
  "\u{1F680}": Rocket,       // 🚀
  "\u{1F511}": Key,          // 🔑
  "\u{1F4A1}": Lightbulb,    // 💡
  "\u{1F4CA}": BarChart3,    // 📊
  "\u26A0\uFE0F": AlertTriangle, // ⚠️
  "\u2728": Sparkles,        // ✨
  "\u{1F3B2}": Dices,        // 🎲
  "\u{1F4DD}": PenLine,      // 📝
  "\u{1F4CB}": ClipboardList,// 📋
  "\u2753": HelpCircle,      // ❓
  "\u{1F5BC}\uFE0F": Image,  // 🖼️
  "\u{1F3AC}": Clapperboard, // 🎬
  "\u{1F914}": MessageCircleQuestion, // 🤔
  "\u{1F4DA}": BookOpen,     // 📚
  "\u2B50": Star,            // ⭐
  "\u{1F441}\uFE0F": Eye,    // 👁️
  "\u{1F4D1}": BookMarked,   // 📑
  "\u{1F9ED}": Compass,      // 🧭
  "\u{1F4E6}": Inbox,        // 📦
  "\u{1F310}": Globe,        // 🌐
  "\u{1F517}": Link,         // 🔗
  "\u{1F4A0}": Cpu,          // 💠
};

/**
 * Returns the lucide-react icon component for an emoji string.
 * Falls back to Star if no mapping exists.
 */
export function getIconForEmoji(emoji: string): LucideIcon {
  return emojiToIcon[emoji] ?? emojiToIcon[emoji.replace(/\uFE0F/g, "")] ?? Star;
}
