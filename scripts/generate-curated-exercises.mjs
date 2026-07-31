/**
 * Generates curated exercise library — real exercises only, no variants.
 * Run: node scripts/generate-curated-exercises.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

function ex(id, fields) {
  return {
    id,
    categories: [fields.category],
    goals: fields.goals || ["general_health"],
    goal: fields.goals?.[0] || "general_health",
    avoidLimitations: fields.avoid || [],
    ...fields,
  };
}

const G = (en, ku) => ({
  instructionEn: en,
  instructionKu: ku,
  setupEn: en.split(".")[0] + ".",
  setupKu: ku.split(".")[0] + ".",
  movementEn: en,
  movementKu: ku,
  breathingEn: "Breathe steadily throughout.",
  breathingKu: "هەناسە بەردەوام بکە.",
  mistakesEn: "Rushing form or holding breath.",
  mistakesKu: "خێرایی زۆر یان هەناسە ڕاگرتن.",
  safetyTipEn: "Stop if you feel sharp pain.",
  safetyTipKu: "ئەگەر ئازاری توند هەبوو وەستە.",
});

const allExercises = [
  // CARDIO
  ex("lib-jumping-jacks", { nameEn: "Jumping Jacks", nameKu: "بازدانی جەستە", category: "cardio", difficulty: "beginner", durationSec: 45, equipmentEn: "None", equipmentKu: "هیچ", musclesEn: "Full body", musclesKu: "هەموو جەستە", animationType: "jumping_jack", goals: ["weight_loss", "stamina"], ...G("Jump feet out while arms lift overhead, then return.", "پێ لە دەرەوە بکە و بازوو بەرز بکە، دواتر بگەڕێوە.") }),
  ex("lib-high-knees", { nameEn: "High Knees", nameKu: "بەرزکردنەوەی ئەژنۆ", category: "cardio", difficulty: "beginner", durationSec: 30, equipmentEn: "None", equipmentKu: "هیچ", musclesEn: "Hip flexors", musclesKu: "هێڵکاری ئەژنۆ", animationType: "high_knee", goals: ["weight_loss", "stamina"], ...G("Run in place lifting knees toward hip height.", "لە شوێن بجوڵە و ئەژنۆ بەرز بکە.") }),
  ex("lib-burpees", { nameEn: "Burpees", nameKu: "بێرپی", category: "cardio", difficulty: "advanced", reps: 8, equipmentEn: "None", equipmentKu: "هیچ", musclesEn: "Full body", musclesKu: "هەموو جەستە", animationType: "burpee", goals: ["weight_loss", "stamina"], ...G("Squat, plank, push-up, jump up in one flow.", "سکوات، پلانک، پش ئەپ، بازدان لە یەک زنجیرەدا.") }),
  ex("lib-mountain-climbers", { nameEn: "Mountain Climbers", nameKu: "سەرکێشی شاخ", category: "cardio", difficulty: "intermediate", durationSec: 30, equipmentEn: "None", equipmentKu: "هیچ", musclesEn: "Core, shoulders", musclesKu: "ناوەڕاست، شان", animationType: "mountain_climber", goals: ["weight_loss", "stamina"], ...G("High plank, drive knees to chest alternately.", "پلانکی بەرز، ئەژنۆ بەرەو سینە بکەرەوە.") }),
  ex("lib-skaters", { nameEn: "Skaters", nameKu: "سکەیتەر", category: "cardio", difficulty: "intermediate", durationSec: 30, equipmentEn: "None", equipmentKu: "هیچ", musclesEn: "Glutes, legs", musclesKu: "گلوت، قاچ", animationType: "generic_cardio", goals: ["stamina"], ...G("Leap side to side, landing on one foot.", "باز بکە لایەک بۆ لایەک.") }),
  ex("lib-butt-kicks", { nameEn: "Butt Kicks", nameKu: "لێدانی پاش", category: "cardio", difficulty: "beginner", durationSec: 30, equipmentEn: "None", equipmentKu: "هیچ", musclesEn: "Hamstrings", musclesKu: "پشتەی ڕان", animationType: "generic_cardio", goals: ["stamina"], ...G("Jog in place kicking heels to glutes.", "لە شوێن بجوڵە و پاش پێ بەرز بکە.") }),
  ex("lib-jump-rope", { nameEn: "Jump Rope", nameKu: "بازدانی پەت", category: "cardio", difficulty: "intermediate", durationSec: 45, equipmentEn: "Jump rope", equipmentKu: "پەت", musclesEn: "Calves", musclesKu: "قاچ", animationType: "jumping_jack", goals: ["stamina"], ...G("Small hops as rope passes under feet.", "بازدانی بچووک کاتێک پەت لە ژێر پێ دەچێت.") }),
  ex("lib-fast-feet", { nameEn: "Fast Feet", nameKu: "پێی خێرا", category: "cardio", difficulty: "beginner", durationSec: 20, equipmentEn: "None", equipmentKu: "هیچ", musclesEn: "Calves", musclesKu: "قاچ", animationType: "generic_cardio", goals: ["stamina"], ...G("Quick small steps in athletic stance.", "هەنگاوی بچووکی خێرا لە دۆخی وەرزشی.") }),
  ex("lib-squat-jumps", { nameEn: "Squat Jumps", nameKu: "بازدانی سکوات", category: "cardio", difficulty: "intermediate", reps: 10, equipmentEn: "None", equipmentKu: "هیچ", musclesEn: "Quads, glutes", musclesKu: "پەنجەی پێ، گلوت", animationType: "squat", goals: ["weight_loss"], ...G("Squat then explode into a jump.", "سکوات بکە دواتر باز بکە.") }),
  ex("lib-step-jacks", { nameEn: "Step Jacks", nameKu: "بازدانی هەنگاو", category: "cardio", difficulty: "beginner", durationSec: 40, equipmentEn: "None", equipmentKu: "هیچ", musclesEn: "Full body", musclesKu: "هەموو جەستە", animationType: "jumping_jack", goals: ["general_health"], ...G("Step feet out one at a time, arms overhead.", "پێ یەک بە یەک دەرەوە بکە، بازوو بەرز.") }),

  // CHEST
  ex("lib-push-up", { nameEn: "Standard Push-up", nameKu: "پش ئەپی ئاسایی", category: "chest", difficulty: "intermediate", reps: 10, equipmentEn: "None", equipmentKu: "هیچ", musclesEn: "Chest, triceps", musclesKu: "سینە، سێنەپشک", animationType: "pushup", goals: ["muscle_gain"], ...G("Straight body line, lower chest near floor, press up.", "هێڵی ڕاست، سینە نزیک زەوی، بەرز بکەوە.") }),
  ex("lib-incline-push-up", { nameEn: "Incline Push-up", nameKu: "پش ئەپی سەر بەرز", category: "chest", difficulty: "beginner", reps: 12, equipmentEn: "Chair or bench", equipmentKu: "کورسی", musclesEn: "Chest", musclesKu: "سینە", animationType: "pushup", goals: ["muscle_gain"], ...G("Hands on elevated surface, perform push-up.", "دست لەسەر ڕووی بەرز، پش ئەپ بکە.") }),
  ex("lib-decline-push-up", { nameEn: "Decline Push-up", nameKu: "پش ئەپی سەر نزم", category: "chest", difficulty: "advanced", reps: 8, equipmentEn: "Chair or bench", equipmentKu: "کورسی", musclesEn: "Upper chest", musclesKu: "سینەی سەرەوە", animationType: "pushup", goals: ["muscle_gain"], ...G("Feet elevated, perform push-up with control.", "پێ لەسەر بەرز، پش ئەپ بە کۆنترۆڵ.") }),
  ex("lib-wide-push-up", { nameEn: "Wide Push-up", nameKu: "پش ئەپی فراوان", category: "chest", difficulty: "intermediate", reps: 10, equipmentEn: "None", equipmentKu: "هیچ", musclesEn: "Chest", musclesKu: "سینە", animationType: "pushup", goals: ["muscle_gain"], ...G("Hands wider than shoulders, lower and press.", "دست فراتر لە شان، خوار بکە و بەرز بکەوە.") }),
  ex("lib-diamond-push-up", { nameEn: "Diamond Push-up", nameKu: "پش ئەپی ئەڵماس", category: "chest", difficulty: "advanced", reps: 8, equipmentEn: "None", equipmentKu: "هیچ", musclesEn: "Triceps, chest", musclesKu: "سێنەپشک، سینە", animationType: "pushup", goals: ["muscle_gain"], ...G("Hands form diamond under chest, lower and press.", "دست ئەڵماس لە ژێر سینە، خوار و بەرز.") }),
  ex("lib-chest-press", { nameEn: "Chest Press", nameKu: "پرێسی سینە", category: "chest", difficulty: "intermediate", reps: 12, equipmentEn: "Dumbbells", equipmentKu: "دمبڵ", musclesEn: "Chest", musclesKu: "سینە", animationType: "press", goals: ["muscle_gain"], ...G("Lie back, press weights up over chest.", "پشت بخەوە، کێش بەرز بکە لەسەر سینە.") }),
  ex("lib-dumbbell-fly", { nameEn: "Dumbbell Fly", nameKu: "فڵای دمبڵ", category: "chest", difficulty: "intermediate", reps: 12, equipmentEn: "Dumbbells", equipmentKu: "دمبڵ", musclesEn: "Chest", musclesKu: "سینە", animationType: "press", goals: ["muscle_gain"], ...G("Arms wide, slight bend, bring weights together over chest.", "بازوو فراوان، کەم بکەوە، کێشەکان کۆبکەرەوە.") }),

  // BACK
  ex("lib-pull-up", { nameEn: "Pull-up", nameKu: "پول ئەپ", category: "back", difficulty: "advanced", reps: 6, equipmentEn: "Pull-up bar", equipmentKu: "میلی پول ئەپ", musclesEn: "Lats, back", musclesKu: "پشت، لات", animationType: "row", goals: ["muscle_gain"], ...G("Hang from bar, pull chin above bar.", "لە میل بێڵێنە، مەلەوان بەرز بکە.") }),
  ex("lib-chin-up", { nameEn: "Chin-up", nameKu: "چین ئەپ", category: "back", difficulty: "advanced", reps: 6, equipmentEn: "Pull-up bar", equipmentKu: "میلی پول ئەپ", musclesEn: "Biceps, back", musclesKu: "بایسێپ، پشت", animationType: "row", goals: ["muscle_gain"], ...G("Underhand grip, pull chin above bar.", "دست لە خوارەوە، مەلەوان بەرز بکە.") }),
  ex("lib-bent-over-row", { nameEn: "Bent-over Row", nameKu: "ڕۆی پێچاوە", category: "back", difficulty: "intermediate", reps: 12, equipmentEn: "Dumbbells", equipmentKu: "دمبڵ", musclesEn: "Back, lats", musclesKu: "پشت", animationType: "row", goals: ["muscle_gain"], ...G("Hinge forward, pull weights to ribs.", "پێچەوە، کێش بکە بۆ پەردە.") }),
  ex("lib-dumbbell-row", { nameEn: "Dumbbell Row", nameKu: "ڕۆی دمبڵ", category: "back", difficulty: "beginner", reps: 12, equipmentEn: "Dumbbells", equipmentKu: "دمبڵ", musclesEn: "Back", musclesKu: "پشت", animationType: "row", goals: ["muscle_gain"], ...G("One hand on bench, row weight to hip.", "یەک دەست لەسەر نەبەست، کێش بکە بۆ مەلەوان.") }),
  ex("lib-lat-pulldown", { nameEn: "Lat Pulldown", nameKu: "کێشانی لات", category: "back", difficulty: "intermediate", reps: 12, equipmentEn: "Resistance band", equipmentKu: "باند", musclesEn: "Lats", musclesKu: "لات", animationType: "row", goals: ["muscle_gain"], ...G("Pull band or bar down to upper chest.", "باند یان میل بکێشە خوارەوە بۆ سینە.") }),
  ex("lib-superman", { nameEn: "Superman", nameKu: "سوپەرمان", category: "back", difficulty: "beginner", durationSec: 30, equipmentEn: "Mat", equipmentKu: "مات", musclesEn: "Lower back", musclesKu: "پشتی خوارەوە", animationType: "hinge", goals: ["general_health"], ...G("Lie face down, lift chest and legs off floor.", "سەر بۆ خوارەوە، سینە و قاچ لە زەوی بەرز بکە.") }),
  ex("lib-reverse-fly", { nameEn: "Reverse Fly", nameKu: "فڵای پێچەوانە", category: "back", difficulty: "intermediate", reps: 12, equipmentEn: "Dumbbells", equipmentKu: "دمبڵ", musclesEn: "Rear delts, back", musclesKu: "پشت، شان", animationType: "row", goals: ["muscle_gain"], ...G("Hinge forward, raise arms out to sides.", "پێچەوە، بازوو بەرز بکە لایەکان.") }),

  // LEGS & GLUTES
  ex("lib-bodyweight-squat", { nameEn: "Bodyweight Squat", nameKu: "سکواتی کێشی جەستە", category: "legs", difficulty: "beginner", reps: 15, equipmentEn: "None", equipmentKu: "هیچ", musclesEn: "Quads, glutes", musclesKu: "پەنجەی پێ، گلوت", animationType: "squat", goals: ["muscle_gain"], ...G("Hips back and down, thighs parallel, drive up.", "قۆڵ بکە و خوار بەرەو هاوتەنی ڕان.") }),
  ex("lib-goblet-squat", { nameEn: "Goblet Squat", nameKu: "سکواتی گۆبلێت", category: "legs", difficulty: "beginner", reps: 12, equipmentEn: "Dumbbells", equipmentKu: "دمبڵ", musclesEn: "Quads, glutes", musclesKu: "پەنجەی پێ، گلوت", animationType: "squat", goals: ["muscle_gain"], ...G("Hold weight at chest, squat deep.", "کێش لە سینە بگرە، سکواتی قووڵ.") }),
  ex("lib-reverse-lunge", { nameEn: "Reverse Lunge", nameKu: "لانجی پاشەوە", category: "legs", difficulty: "beginner", reps: 10, equipmentEn: "None", equipmentKu: "هیچ", musclesEn: "Quads, glutes", musclesKu: "پەنجەی پێ، گلوت", animationType: "lunge", goals: ["muscle_gain"], ...G("Step back, lower knee toward floor, return.", "هەنگاو بکە دواوە، ئەژنۆ نزیک زەوی.") }),
  ex("lib-walking-lunge", { nameEn: "Walking Lunge", nameKu: "لانجی ڕۆیشتن", category: "legs", difficulty: "intermediate", reps: 10, equipmentEn: "None", equipmentKu: "هیچ", musclesEn: "Quads, glutes", musclesKu: "پەنجەی پێ، گلوت", animationType: "lunge", goals: ["muscle_gain"], ...G("Step forward into lunge, alternate legs.", "هەنگاو بەرەو پێش، لانج بکە.") }),
  ex("lib-bulgarian-split-squat", { nameEn: "Bulgarian Split Squat", nameKu: "سکواتی بولگاری", category: "legs", difficulty: "intermediate", reps: 10, equipmentEn: "Chair", equipmentKu: "کورسی", musclesEn: "Quads, glutes", musclesKu: "پەنجەی پێ، گلوت", animationType: "lunge", goals: ["muscle_gain"], ...G("Rear foot elevated, lower into single-leg squat.", "پێی دواوە لەسەر بەرز، سکواتی یەک پێ.") }),
  ex("lib-glute-bridge", { nameEn: "Glute Bridge", nameKu: "پردی گلوت", category: "glutes", difficulty: "beginner", reps: 15, equipmentEn: "Mat", equipmentKu: "مات", musclesEn: "Glutes", musclesKu: "گلوت", animationType: "bridge", goals: ["muscle_gain"], ...G("Lie on back, drive hips up squeezing glutes.", "پشت بخەوە، مەلەوان بەرز بکە.") }),
  ex("lib-hip-thrust", { nameEn: "Hip Thrust", nameKu: "هەڵبەستنی مەلەوان", category: "glutes", difficulty: "intermediate", reps: 12, equipmentEn: "Bench", equipmentKu: "نەبەست", musclesEn: "Glutes", musclesKu: "گلوت", animationType: "bridge", goals: ["muscle_gain"], ...G("Upper back on bench, thrust hips up.", "پشتی سەرەوە لەسەر نەبەست، مەلەوان بەرز بکە.") }),
  ex("lib-romanian-deadlift", { nameEn: "Romanian Deadlift", nameKu: "دێدلیفت ڕۆمانی", category: "legs", difficulty: "intermediate", reps: 10, equipmentEn: "Dumbbells", equipmentKu: "دمبڵ", musclesEn: "Hamstrings, glutes", musclesKu: "پشتەی ڕان، گلوت", animationType: "hinge", goals: ["muscle_gain"], ...G("Hinge at hips, lower weights along legs.", "لە مەلەوانەوە پێچەوە، کێش لەگەڵ قاچ.") }),
  ex("lib-calf-raise", { nameEn: "Calf Raise", nameKu: "بەرزکردنەوەی قاچ", category: "legs", difficulty: "beginner", reps: 15, equipmentEn: "None", equipmentKu: "هیچ", musclesEn: "Calves", musclesKu: "قاچ", animationType: "squat", goals: ["muscle_gain"], ...G("Rise onto toes, lower with control.", "بەرز ببە لەسەر پەنجەی پێ، خوار بکە.") }),
  ex("lib-wall-sit", { nameEn: "Wall Sit", nameKu: "دانیشتنی دیوار", category: "legs", difficulty: "beginner", durationSec: 45, equipmentEn: "None", equipmentKu: "هیچ", musclesEn: "Quads", musclesKu: "پەنجەی پێ", animationType: "squat", goals: ["stamina"], ...G("Back against wall, thighs parallel to floor.", "پشت لەسەر دیوار، ڕان هاوتەنی زەوی.") }),

  // CORE
  ex("lib-forearm-plank", { nameEn: "Forearm Plank", nameKu: "پلانکی ئەژنۆ", category: "core", difficulty: "beginner", durationSec: 30, equipmentEn: "Mat", equipmentKu: "مات", musclesEn: "Core", musclesKu: "ناوەڕاست", animationType: "plank", goals: ["muscle_gain"], ...G("Elbows under shoulders, hold straight line.", "ئەژنۆ لەژێر شان، هێڵی ڕاست بگرە.") }),
  ex("lib-side-plank", { nameEn: "Side Plank", nameKu: "پلانکی لات", category: "core", difficulty: "intermediate", durationSec: 25, equipmentEn: "Mat", equipmentKu: "مات", musclesEn: "Obliques", musclesKu: "لاکەکان", animationType: "balance", goals: ["muscle_gain"], ...G("On one forearm, stack feet, lift hips.", "لەسەر یەک ئەژنۆ، پێ لەسەر یەک، مەلەوان بەرز.") }),
  ex("lib-crunch", { nameEn: "Crunch", nameKu: "کرانچ", category: "core", difficulty: "beginner", reps: 15, equipmentEn: "Mat", equipmentKu: "مات", musclesEn: "Abs", musclesKu: "سکۆڵ", animationType: "crunch", goals: ["muscle_gain"], ...G("Lie on back, curl shoulders off floor.", "پشت بخەوە، شان لە زەوی بەرز بکە.") }),
  ex("lib-bicycle-crunch", { nameEn: "Bicycle Crunch", nameKu: "کرانچی پاسکیل", category: "core", difficulty: "intermediate", reps: 20, equipmentEn: "Mat", equipmentKu: "مات", musclesEn: "Abs, obliques", musclesKu: "سکۆڵ، لاک", animationType: "bicycle", goals: ["muscle_gain"], ...G("Alternate elbow to opposite knee.", "ئەژنۆی بەرامبەر بکە بۆ ئەلبوو.") }),
  ex("lib-russian-twist", { nameEn: "Russian Twist", nameKu: "سووڕانی ڕوسی", category: "core", difficulty: "intermediate", reps: 20, equipmentEn: "Mat", equipmentKu: "مات", musclesEn: "Obliques", musclesKu: "لاکەکان", animationType: "rotation", goals: ["muscle_gain"], ...G("Seated lean back, rotate torso side to side.", "دانیشە، پێچەوە، جەستە بسووڕێنە.") }),
  ex("lib-leg-raise", { nameEn: "Leg Raise", nameKu: "بەرزکردنەوەی قاچ", category: "core", difficulty: "intermediate", reps: 12, equipmentEn: "Mat", equipmentKu: "مات", musclesEn: "Lower abs", musclesKu: "سکۆڵی خوارەوە", animationType: "leg_raise", goals: ["muscle_gain"], ...G("Lie flat, raise legs to 90 degrees.", "ڕاخوە، قاچ بەرز بکە بۆ ٩٠ پلە.") }),
  ex("lib-dead-bug", { nameEn: "Dead Bug", nameKu: "مێروولەی مردوو", category: "core", difficulty: "beginner", reps: 12, equipmentEn: "Mat", equipmentKu: "مات", musclesEn: "Core", musclesKu: "ناوەڕاست", animationType: "dead_bug", goals: ["general_health"], ...G("Arms up, extend opposite arm and leg.", "بازوو بەرز، دەست و قاچی بەرامبەر درێژ بکە.") }),
  ex("lib-hollow-hold", { nameEn: "Hollow Hold", nameKu: "ڕاگرتنی بۆش", category: "core", difficulty: "advanced", durationSec: 25, equipmentEn: "Mat", equipmentKu: "مات", musclesEn: "Core", musclesKu: "ناوەڕاست", animationType: "plank", goals: ["muscle_gain"], ...G("Press lower back down, lift shoulders and legs.", "پشتی خوارەوە بخەرە زەوی، شان و قاچ بەرز بکە.") }),
  ex("lib-flutter-kicks", { nameEn: "Flutter Kicks", nameKu: "لێدانی قاچ", category: "core", difficulty: "intermediate", durationSec: 30, equipmentEn: "Mat", equipmentKu: "مات", musclesEn: "Lower abs", musclesKu: "سکۆڵی خوارەوە", animationType: "leg_raise", goals: ["muscle_gain"], ...G("Legs raised, alternate small kicks.", "قاچ بەرز، بە نۆبەت لێبدە.") }),

  // SHOULDERS & ARMS
  ex("lib-shoulder-press", { nameEn: "Shoulder Press", nameKu: "پرێسی شان", category: "shoulders", difficulty: "intermediate", reps: 12, equipmentEn: "Dumbbells", equipmentKu: "دمبڵ", musclesEn: "Shoulders", musclesKu: "شان", animationType: "press", goals: ["muscle_gain"], ...G("Press weights overhead from shoulder height.", "کێش لە ئاستی شان بەرز بکە.") }),
  ex("lib-lateral-raise", { nameEn: "Lateral Raise", nameKu: "بەرزکردنەوەی لات", category: "shoulders", difficulty: "beginner", reps: 12, equipmentEn: "Dumbbells", equipmentKu: "دمبڵ", musclesEn: "Shoulders", musclesKu: "شان", animationType: "generic_strength", goals: ["muscle_gain"], ...G("Raise arms out to sides to shoulder height.", "بازوو بەرز بکە بۆ ئاستی شان.") }),
  ex("lib-front-raise", { nameEn: "Front Raise", nameKu: "بەرزکردنەوەی پێشەوە", category: "shoulders", difficulty: "beginner", reps: 12, equipmentEn: "Dumbbells", equipmentKu: "دمبڵ", musclesEn: "Shoulders", musclesKu: "شان", animationType: "generic_strength", goals: ["muscle_gain"], ...G("Raise weights in front to shoulder height.", "کێش بەرز بکە پێشەوە.") }),
  ex("lib-bicep-curl", { nameEn: "Bicep Curl", nameKu: "کێشانی بایسێپ", category: "arms", difficulty: "beginner", reps: 12, equipmentEn: "Dumbbells", equipmentKu: "دمبڵ", musclesEn: "Biceps", musclesKu: "بایسێپ", animationType: "generic_strength", goals: ["muscle_gain"], ...G("Curl weights toward shoulders, lower slowly.", "کێش بکێشە بەرەو شان، خاو بخەرە خوارەوە.") }),
  ex("lib-hammer-curl", { nameEn: "Hammer Curl", nameKu: "کێشانی چەکوش", category: "arms", difficulty: "beginner", reps: 12, equipmentEn: "Dumbbells", equipmentKu: "دمبڵ", musclesEn: "Biceps, forearms", musclesKu: "بایسێپ", animationType: "generic_strength", goals: ["muscle_gain"], ...G("Neutral grip curl, palms face each other.", "دستی بێلێک، کێش بکێشە.") }),
  ex("lib-tricep-dip", { nameEn: "Tricep Dip", nameKu: "دیپی سێنەپشک", category: "arms", difficulty: "intermediate", reps: 10, equipmentEn: "Chair", equipmentKu: "کورسی", musclesEn: "Triceps", musclesKu: "سێنەپشک", animationType: "pushup", goals: ["muscle_gain"], ...G("Hands on chair behind you, lower and press up.", "دست لەسەر کورسی دواوە، خوار و بەرز.") }),
  ex("lib-tricep-extension", { nameEn: "Tricep Extension", nameKu: "درێژکردنەوەی سێنەپشک", category: "arms", difficulty: "beginner", reps: 12, equipmentEn: "Dumbbells", equipmentKu: "دمبڵ", musclesEn: "Triceps", musclesKu: "سێنەپشک", animationType: "generic_strength", goals: ["muscle_gain"], ...G("Arms overhead, lower weight behind head.", "بازوو بەرز، کێش بخەرە دواوەی سەر.") }),

  // MOBILITY & STRETCHING
  ex("lib-cat-cow", { nameEn: "Cat-Cow", nameKu: "پشیلە-مانگا", category: "mobility", difficulty: "beginner", durationSec: 40, equipmentEn: "Mat", equipmentKu: "مات", musclesEn: "Spine", musclesKu: "پشت", animationType: "stretch", goals: ["flexibility"], ...G("On all fours, arch and round spine alternately.", "لەسەر چوار پێ، پشت بەرز و نزم بکە.") }),
  ex("lib-childs-pose", { nameEn: "Child's Pose", nameKu: "دۆخی منداڵ", category: "stretching", difficulty: "beginner", durationSec: 45, equipmentEn: "Mat", equipmentKu: "مات", musclesEn: "Back, hips", musclesKu: "پشت، مەلەوان", animationType: "stretch", goals: ["flexibility"], ...G("Kneel, sit back on heels, arms forward.", "لەسەر ئەژنۆ، دانیشە لەسەر پاش، بازوو پێشەوە.") }),
  ex("lib-cobra-stretch", { nameEn: "Cobra Stretch", nameKu: "کۆبرا", category: "stretching", difficulty: "beginner", durationSec: 30, equipmentEn: "Mat", equipmentKu: "مات", musclesEn: "Spine, chest", musclesKu: "پشت، سینە", animationType: "stretch", goals: ["flexibility"], ...G("Lie face down, press chest up gently.", "سەر بۆ خوارەوە، سینە بە نەرمی بەرز بکە.") }),
  ex("lib-downward-dog", { nameEn: "Downward Dog", nameKu: "سەگی خوارەوە", category: "mobility", difficulty: "beginner", durationSec: 40, equipmentEn: "Mat", equipmentKu: "مات", musclesEn: "Hamstrings, shoulders", musclesKu: "پشتەی ڕان، شان", animationType: "stretch", goals: ["flexibility"], ...G("Hips up, heels toward floor, straight arms.", "مەلەوان بەرز، پاش پێ بەرەو زەوی.") }),
  ex("lib-hip-flexor-stretch", { nameEn: "Hip Flexor Stretch", nameKu: "کێشانی هێڵکاری مەلەوان", category: "stretching", difficulty: "beginner", durationSec: 30, equipmentEn: "Mat", equipmentKu: "مات", musclesEn: "Hip flexors", musclesKu: "هێڵکاری مەلەوان", animationType: "stretch", goals: ["flexibility"], ...G("Kneel, step one foot forward, lean into stretch.", "لەسەر ئەژنۆ، پێ بەرەو پێش، بکێشە.") }),
  ex("lib-hamstring-stretch", { nameEn: "Hamstring Stretch", nameKu: "کێشانی پشتەی ڕان", category: "stretching", difficulty: "beginner", durationSec: 30, equipmentEn: "Mat", equipmentKu: "مات", musclesEn: "Hamstrings", musclesKu: "پشتەی ڕان", animationType: "stretch", goals: ["flexibility"], ...G("Sit or stand, reach toward toes keeping back flat.", "دانیشە یان وەستە، دەست بگەیەنە پەنجەی پێ.") }),
  ex("lib-shoulder-stretch", { nameEn: "Shoulder Stretch", nameKu: "کێشانی شان", category: "stretching", difficulty: "beginner", durationSec: 30, equipmentEn: "None", equipmentKu: "هیچ", musclesEn: "Shoulders", musclesKu: "شان", animationType: "stretch", goals: ["flexibility"], ...G("Pull one arm across chest, hold gently.", "یەک بازوو بکێشە بە نەرمی.") }),
  ex("lib-thoracic-rotation", { nameEn: "Thoracic Rotation", nameKu: "سووڕانی پشت", category: "mobility", difficulty: "beginner", durationSec: 30, equipmentEn: "Mat", equipmentKu: "مات", musclesEn: "Upper back", musclesKu: "پشتی سەرەوە", animationType: "stretch", goals: ["flexibility"], ...G("On all fours, rotate one arm up to ceiling.", "لەسەر چوار پێ، یەک بازوو بسووڕێنە بۆ سەقف.") }),
];

const CDN_BASE = "https://pub-585d42eb1aa64a67aedf483ec328d3fe.r2.dev";

const PRODUCTION_MEDIA = {
  "lib-jumping-jacks": {
    video: "/exercise-videos/male/jumping-jack.mp4",
    poster: "/exercise-posters/male/jumping-jack.jpg",
  },
  "lib-burpees": {
    video: "/exercise-videos/male/burpee.mp4",
    poster: "/exercise-posters/male/burpee.jpg",
  },
  "lib-push-up": {
    video: "/exercise-videos/male/push-ups.mp4",
    poster: "/exercise-posters/male/push-ups.jpg",
  },
  "lib-chin-up": {
    video: "/exercise-videos/male/chin-ups-narrow-parallel-grip.mp4",
    poster: "/exercise-posters/male/chin-ups-narrow-parallel-grip.jpg",
  },
  "lib-bodyweight-squat": {
    video: "/exercise-videos/male/squat.mp4",
    poster: "/exercise-posters/male/squat.jpg",
  },
  "lib-walking-lunge": {
    video: "/exercise-videos/male/dumbbell-lunge.mp4",
    poster: "/exercise-posters/male/dumbbell-lunge.jpg",
  },
  "lib-glute-bridge": {
    video: "/exercise-videos/male/rear-decline-bridge.mp4",
    poster: "/exercise-posters/male/rear-decline-bridge.jpg",
  },
  "lib-forearm-plank": {
    video: "/exercise-videos/female/front-plank-female.mp4",
    poster: "/exercise-posters/female/front-plank-female.jpg",
  },
  "lib-side-plank": {
    video: "/exercise-videos/male/side-bridge-side-plank.mp4",
    poster: "/exercise-posters/male/side-bridge-side-plank.jpg",
  },
  "lib-bicycle-crunch": {
    video: "/exercise-videos/male/45-degree-bycicle-twisting-crunch.mp4",
    poster: "/exercise-posters/male/45-degree-bycicle-twisting-crunch.jpg",
  },
  "lib-leg-raise": {
    video: "/exercise-videos/male/hanging-straight-leg-raise.mp4",
    poster: "/exercise-posters/male/hanging-straight-leg-raise.jpg",
  },
  "lib-hamstring-stretch": {
    video: "/exercise-videos/male/stretching-front-toe-touch.mp4",
    poster: "/exercise-posters/male/stretching-front-toe-touch.jpg",
  },
};

const DATA_OVERRIDES = {
  "lib-chin-up": {
    nameEn: "Neutral-Grip Chin-up",
    nameKu: "چین ئەپی دەستی هاوتا",
    instructionEn: "Use a narrow parallel grip, pull your chest toward the bar, then lower with control.",
    instructionKu: "بە دەستگرتنی تەریب و نزیک، سینەت بەرەو میل بکێشە و بە کۆنترۆڵ خوار ببەوە.",
    setupEn: "Hang from parallel handles with palms facing each other.",
    setupKu: "لە دەستگرتنی هاوتا هەڵواسە و کەفی دەستەکان ڕووی یەکتر بن.",
    movementEn: "Pull until your chin clears the handles, then lower to full extension.",
    movementKu: "خۆت بەرز بکە تا چەناگە لە دەستگرتنەکان تێپەڕێت، دواتر تەواو خوار ببەوە.",
  },
  "lib-walking-lunge": {
    nameEn: "Dumbbell Lunge",
    nameKu: "لانجی دمبڵ",
    equipmentEn: "Dumbbells",
    equipmentKu: "دمبڵ",
    instructionEn: "Hold dumbbells at your sides, step forward into a lunge, then return and alternate legs.",
    instructionKu: "دمبڵەکان لە لات بگرە، هەنگاوێک بەرەو پێش بنێ و لانج بکە، دواتر بگەڕێوە و پێ بگۆڕە.",
    setupEn: "Stand tall holding one dumbbell in each hand.",
    setupKu: "بە ڕاستی وەستە و لە هەر دەستێکدا دمبڵێک بگرە.",
    movementEn: "Step forward, lower both knees with control, push back, and alternate.",
    movementKu: "هەنگاو بەرەو پێش بنێ، هەردوو ئەژنۆ بە کۆنترۆڵ خوار بکە، بگەڕێوە و پێ بگۆڕە.",
  },
  "lib-glute-bridge": {
    nameEn: "Rear Decline Bridge",
    nameKu: "پردی پاشەوەی بەرز",
    equipmentEn: "Bench",
    equipmentKu: "نەبەست",
    difficulty: "intermediate",
    instructionEn: "Place your heels on a bench and drive your hips upward by squeezing your glutes.",
    instructionKu: "پاش پێکانت لەسەر نەبەست دابنێ و بە توندکردنی گلوت مەلەوان بەرز بکە.",
    setupEn: "Lie on your back with heels supported on a bench and knees bent.",
    setupKu: "لەسەر پشت ڕابکشێ، پاش پێکان لەسەر نەبەست و ئەژنۆکان چەماوە.",
    movementEn: "Press through your heels, lift your hips, pause, and lower slowly.",
    movementKu: "بە پاش پێ پاڵ بنێ، مەلەوان بەرز بکە، کەمێک ڕابگرە و بە هێواشی خوار بکە.",
  },
  "lib-leg-raise": {
    nameEn: "Hanging Straight Leg Raise",
    nameKu: "بەرزکردنەوەی قاچی ڕاست بە هەڵواسران",
    difficulty: "advanced",
    equipmentEn: "Pull-up bar",
    equipmentKu: "میلی پول ئەپ",
    instructionEn: "Hang from a bar and raise straight legs toward hip height without swinging.",
    instructionKu: "لە میلێک هەڵواسە و قاچە ڕاستەکانت بەبێ لوولان بەرەو ئاستی مەلەوان بەرز بکە.",
    setupEn: "Hang from a pull-up bar with arms straight and legs together.",
    setupKu: "لە میلی پول ئەپ هەڵواسە، بازوو ڕاست و قاچەکان پێکەوە.",
    movementEn: "Brace your core, raise straight legs, then lower slowly without swinging.",
    movementKu: "ناوەڕاست توند بکە، قاچە ڕاستەکان بەرز بکە و بە هێواشی خوار بکە.",
  },
  "lib-hamstring-stretch": {
    nameEn: "Standing Toe Touch",
    nameKu: "دەستگەیشتن بە پەنجەی پێ لە وەستان",
    equipmentEn: "None",
    equipmentKu: "هیچ",
    instructionEn: "Stand tall, hinge forward at the hips, and reach toward your toes without bouncing.",
    instructionKu: "بە ڕاستی وەستە، لە مەلەوانەوە بەرەو پێش بچەمێوە و بەبێ هەڵپەڕین دەست بگەیەنە پەنجەی پێ.",
    setupEn: "Stand with feet hip-width apart and knees softly unlocked.",
    setupKu: "پێکان بە پانی مەلەوان دابنێ و ئەژنۆکان کەمێک نەرم بن.",
    movementEn: "Fold forward slowly, reach toward the toes, hold, then rise with control.",
    movementKu: "بە هێواشی بەرەو پێش بچەمێوە، دەست بگەیەنە پەنجەی پێ، ڕابگرە و بە کۆنترۆڵ بەرز ببەوە.",
  },
};

const exercises = allExercises
  .filter((exercise) => PRODUCTION_MEDIA[exercise.id])
  .map((exercise) => {
    const media = PRODUCTION_MEDIA[exercise.id];
    return {
      ...exercise,
      ...(DATA_OVERRIDES[exercise.id] || {}),
      media: {
        type: "video",
        src: `${CDN_BASE}${media.video}`,
        thumbnail: `${CDN_BASE}${media.poster}`,
        source: "production-verified",
      },
    };
  });

// Write JS module
const modulePath = path.join(root, "src/features/fitness/data/curatedExercises.js");
const moduleContent = `/**
 * Curated exercise library — ${exercises.length} real exercises, no synthetic variants.
 * Generated by scripts/generate-curated-exercises.mjs — do not edit by hand.
 */
export const CURATED_EXERCISES = ${JSON.stringify(exercises, null, 2)};
export const EXERCISE_COUNT = ${exercises.length};
`;
fs.writeFileSync(modulePath, moduleContent, "utf8");

console.log(`Generated ${exercises.length} verified production exercises → curatedExercises.js`);
