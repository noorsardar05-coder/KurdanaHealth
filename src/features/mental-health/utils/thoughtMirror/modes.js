/**
 * Mode voice overlays for Kurdana Thought Mirror.
 * Modes reshape how the same challenge logic is delivered.
 */

export const MIRROR_MODES = [
  { id: "gentle", icon: "🪞", label: { en: "Gentle", ku: "نەرم" } },
  { id: "coach", icon: "🧠", label: { en: "Coach", ku: "ڕاهێنەر" } },
  { id: "growth", icon: "🌱", label: { en: "Growth", ku: "گەشە" } },
  { id: "future", icon: "✨", label: { en: "Future You", ku: "تۆی داهاتوو" } },
  { id: "friend", icon: "❤️", label: { en: "Best Friend", ku: "هاوڕێی دڵسۆز" } },
];

/** Soften openings — still challenge, less blunt */
export function applyMode(parts, mode, lang) {
  const m = mode || "coach";
  const isKu = lang === "ku";

  if (m === "gentle") {
    return {
      ...parts,
      reflect: isKu
        ? `بە نەرمی گوێت لێ دەگرم.\n${parts.reflect}`
        : `Let's look at this gently.\n${parts.reflect}`,
      challenge: isKu
        ? `بەبێ توندی، با پرسیارێک بکەین:\n${parts.challenge}`
        : `Without pressure, one honest question:\n${parts.challenge}`,
    };
  }

  if (m === "coach") {
    return {
      ...parts,
      reflect: isKu ? `با کەمێک بوەستین.\n${parts.reflect}` : `Let's pause.\n${parts.reflect}`,
      challenge: isKu ? `با ئەم بیرە بە نەرمی تاقی بکەینەوە.\n${parts.challenge}` : `Let's test that gently.\n${parts.challenge}`,
    };
  }

  if (m === "growth") {
    return {
      ...parts,
      perspective: isKu
        ? `لێرە وانەیەک هەیە:\n${parts.perspective}`
        : `There's a lesson available here:\n${parts.perspective}`,
      action: isKu
        ? `ئەرکی گەشە: ${parts.action}`
        : `Growth mission: ${parts.action}`,
    };
  }

  if (m === "future") {
    return {
      ...parts,
      reflect: isKu
        ? `من تۆی داهاتووم. ئەمە دەبینم:\n${parts.reflect}`
        : `I'm the you who already got through nights like this. I see this:\n${parts.reflect}`,
      replace: isKu
        ? `ئەوەی دەمهەوێت ئەمڕۆ بیبیستم:\n«${parts.replace}»`
        : `What I need you to practice today:\n“${parts.replace}”`,
      action: isKu
        ? `بۆ ئەو تۆیە کە دەبیتەوە: ${parts.action}`
        : `For the you you're becoming: ${parts.action}`,
    };
  }

  if (m === "friend") {
    return {
      ...parts,
      reflect: isKu
        ? `وەک هاوڕێیەک کە ڕاستی و میهرەبانی پێکەوە دەوێت:\n${parts.reflect}`
        : `As someone who loves you enough to be honest:\n${parts.reflect}`,
      challenge: isKu
        ? `لەگەڵ ئەم بیرە ڕازی نیم. دەتپرسیم:\n${parts.challenge}`
        : `I won't agree with this thought. I'm asking:\n${parts.challenge}`,
      replace: isKu
        ? `با پێکەوە بیگۆڕین بۆ:\n«${parts.replace}»`
        : `Let's swap it for:\n“${parts.replace}”`,
    };
  }

  return parts;
}

/** Interactive follow-up variants */
export function variantFocus(parts, variant, lang) {
  const isKu = lang === "ku";
  if (variant === "perspective") {
    return {
      ...parts,
      reflect: isKu ? "گۆشەیەکی تر:" : "Another perspective:",
      challenge: "",
      perspective: parts.perspective,
      replace: parts.replace,
      action: parts.action,
      focus: "perspective",
    };
  }
  if (variant === "challenge") {
    return {
      ...parts,
      reflect: isKu ? "ئەرکێک بۆت:" : "A challenge for you:",
      challenge: parts.challenge,
      perspective: "",
      replace: parts.replace,
      action: parts.action,
      focus: "challenge",
    };
  }
  if (variant === "kinder") {
    return {
      ...parts,
      reflect: isKu
        ? `وەشانی میهرەبانتر لەسەر هەمان ڕاستی:\n${parts.reflect}`
        : `A kinder cut of the same truth:\n${parts.reflect}`,
      challenge: isKu
        ? parts.challenge.replace(/^با /, "بە نەرمی، با ")
        : `Softly: ${parts.challenge}`,
      focus: "kinder",
    };
  }
  if (variant === "logical") {
    return {
      ...parts,
      reflect: isKu ? "پشکنینی ژیرانە:" : "Logic check:",
      challenge: parts.challenge,
      perspective: parts.perspective,
      replace: isKu
        ? `گۆڕینی ورد: «${parts.replace}»`
        : `Precise swap: “${parts.replace}”`,
      action: parts.action,
      focus: "logical",
    };
  }
  // another / default — full structure
  return { ...parts, focus: "full" };
}
