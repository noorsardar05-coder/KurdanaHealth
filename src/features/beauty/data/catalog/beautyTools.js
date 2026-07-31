import { defineProduct } from "./defineProduct.js";

const toolProduct = ({
  id, brand, nameEn, nameKu = nameEn, purposeEn, purposeKu, formatEn, formatKu,
  originEn, originKu, tags = [], collections = ["editors-picks", "best-sellers"],
}) => defineProduct({
  id,
  brand,
  nameEn,
  nameKu,
  category: "beauty-tools",
  tags: ["beauty-tools", ...tags],
  collections,
  descriptionEn: `${nameEn} is a ${formatEn.toLowerCase()} for ${purposeEn.toLowerCase()}.`,
  descriptionKu: `${nameKu} ئامرازێکی ${formatKu} ـە بۆ ${purposeKu}.`,
  forWhomEn: `People building a beauty routine for ${purposeEn.toLowerCase()}.`,
  forWhomKu: `بۆ کەسانێک کە ڕوتینی جوانکاری بۆ ${purposeKu} دروست دەکەن.`,
  ingredients: [],
  benefitsEn: [purposeEn, "Reusable beauty accessory"],
  benefitsKu: [purposeKu, "ئامرازێکی دووبارە بەکارهێنراوی جوانکاری"],
  howToUseEn: `Use gently for ${purposeEn.toLowerCase()} and clean after use.`,
  howToUseKu: `بە نەرمی بۆ ${purposeKu} بەکاریبهێنە و دوای بەکارهێنان پاکی بکەوە.`,
  concernsEn: ["beauty tool education"],
  concernsKu: ["فێرکاری ئامرازی جوانکاری"],
  textureEn: formatEn,
  textureKu: formatKu,
  originEn,
  originKu,
  avoidEn: "Do not share without cleaning. Stop use if it causes discomfort.",
  avoidKu: "بێ پاککردنەوە هاوبەشی مەکە؛ ئەگەر ناڕەحەتی درووست کرد، وازی لێ بهێنە.",
});

export const BEAUTY_TOOLS_PRODUCTS = [
  toolProduct({ id: "tool-jade", brand: "Educational", nameEn: "Jade Roller", nameKu: "ڕۆڵەری جەید", purposeEn: "facial massage", purposeKu: "ماساژی ڕوو", formatEn: "Facial massage roller", formatKu: "ڕۆڵەری ماساژی ڕوو", originEn: "China", originKu: "چین", tags: ["facial-massage"], collections: ["editors-picks", "clean-girl"] }),
  toolProduct({ id: "tool-gua", brand: "Educational", nameEn: "Gua Sha Facial Tool", nameKu: "ئامرازی ڕووەی گوا شا", purposeEn: "facial massage", purposeKu: "ماساژی ڕوو", formatEn: "Facial massage stone", formatKu: "بەردی ماساژی ڕوو", originEn: "China", originKu: "چین", tags: ["facial-massage"], collections: ["editors-picks", "clean-girl"] }),
  toolProduct({ id: "tool-sponge", brand: "Beautyblender", nameEn: "Original Makeup Sponge", nameKu: "سفنجی میکئاپی ئۆریجیناڵ", purposeEn: "complexion makeup application", purposeKu: "جێبەجێکردنی میکئاپی ڕوو", formatEn: "Makeup sponge", formatKu: "سفنجی میکئاپ", originEn: "USA", originKu: "ئەمریکا", tags: ["makeup"], collections: ["best-sellers", "editors-picks"] }),
  toolProduct({ id: "tool-brush", brand: "Real Techniques", nameEn: "Everyday Essentials Makeup Brush Set", nameKu: "ئێڤری‌دەی ئیسێنشەڵز کۆمەڵە فڕچەی میکئاپ", purposeEn: "makeup application", purposeKu: "جێبەجێکردنی میکئاپ", formatEn: "Makeup brush set", formatKu: "کۆمەڵە فڕچەی میکئاپ", originEn: "United Kingdom", originKu: "بەریتانیا", tags: ["makeup", "brushes"], collections: ["under-20", "best-sellers"] }),
  toolProduct({ id: "tool-derma", brand: "Educational", nameEn: "Dermaroller", nameKu: "دێرماڕۆڵەر", purposeEn: "at-home microneedling education", purposeKu: "فێرکاری مایکرۆنیدلینگی ماڵەوە", formatEn: "Microneedling roller", formatKu: "ڕۆڵەری مایکرۆنیدلینگ", originEn: "Educational", originKu: "فێرکاری", tags: ["microneedling"], collections: ["editors-picks"] }),
  toolProduct({ id: "tool-eyelash", brand: "Shiseido", nameEn: "Eyelash Curler", nameKu: "کرلەری مژگان", purposeEn: "curling eyelashes", purposeKu: "لوولکردنی مژگان", formatEn: "Eyelash curler", formatKu: "کرلەری مژگان", originEn: "Japan", originKu: "یابان", tags: ["eye-makeup"], collections: ["best-sellers", "editors-picks"] }),
  toolProduct({ id: "tool-ice", brand: "Educational", nameEn: "Facial Ice Roller", nameKu: "ڕۆڵەری ساردی ڕوو", purposeEn: "cooling facial massage", purposeKu: "ماساژی ساردی ڕوو", formatEn: "Cooling facial roller", formatKu: "ڕۆڵەری ساردی ڕوو", originEn: "Educational", originKu: "فێرکاری", tags: ["facial-massage"], collections: ["tiktok-viral", "clean-girl"] }),
  toolProduct({ id: "beautyblender-power-pocket-puff", brand: "Beautyblender", nameEn: "Power Pocket Puff", nameKu: "پاۋەر پاکێت پەف", purposeEn: "setting powder application", purposeKu: "جێبەجێکردنی پاودەری جێگیرکەر", formatEn: "Powder puff", formatKu: "پەفی پاودەر", originEn: "USA", originKu: "ئەمریکا", tags: ["makeup"] }),
  toolProduct({ id: "tweezerman-slant-tweezer", brand: "Tweezerman", nameEn: "Slant Tweezer", nameKu: "سلانت تویزەر", purposeEn: "precise brow grooming", purposeKu: "ڕێکخستنی وردی برۆ", formatEn: "Slanted tweezer", formatKu: "تویزەری لار", originEn: "USA", originKu: "ئەمریکا", tags: ["brows"] }),
  toolProduct({ id: "real-techniques-miracle-complexion-sponge", brand: "Real Techniques", nameEn: "Miracle Complexion Sponge", nameKu: "میراکل کەمپلێکشن سفنج", purposeEn: "complexion makeup application", purposeKu: "جێبەجێکردنی میکئاپی ڕوو", formatEn: "Makeup sponge", formatKu: "سفنجی میکئاپ", originEn: "United Kingdom", originKu: "بەریتانیا", tags: ["makeup"] }),
];
