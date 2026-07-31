import { bi } from "../utils/locale.js";

export const FOOD_CATEGORIES = [
  { id: "all", label: bi("All", "هەموو") },
  { id: "grains", label: bi("Grains", "دانەوێڵە") },
  { id: "proteins", label: bi("Proteins", "پرۆتین") },
  { id: "dairy", label: bi("Dairy & alternatives", "شیرەمەنی و جێگرەوە") },
  { id: "fruits", label: bi("Fruits", "میوە") },
  { id: "vegetables", label: bi("Vegetables", "سەوزە") },
  { id: "legumes", label: bi("Legumes", "پاقلەمەنی") },
  { id: "nuts-seeds", label: bi("Nuts & seeds", "گوێز و تۆو") },
  { id: "oils-fats", label: bi("Oils & fats", "ڕۆن و چەوری") },
  { id: "herbs-spices", label: bi("Herbs & spices", "گیا و بەهارات") },
  { id: "beverages", label: bi("Beverages", "خواردنەوە") },
  { id: "prepared", label: bi("Prepared staples", "خواردنی ئامادە") },
  { id: "sweets", label: bi("Sweets", "شیرینی") },
];

/**
 * All nutrition values (caloriesEstimate, protein, carbohydrates, fat, fiber) are
 * approximate, general-reference figures for the stated servingSize. They are
 * provided for educational awareness only. This data does not diagnose, treat,
 * prevent, or cure any disease, and it is not a substitute for advice from a
 * qualified healthcare professional or registered dietitian.
 */
function food(f) {
  return {
    ...f,
    name: bi(f.nameEn, f.nameKu),
    servingSize: bi(f.servingSizeEn || "100 g", f.servingSizeKu || "١٠٠ گرام"),
    suitabilityNotes: bi(f.suitabilityEn || "", f.suitabilityKu || ""),
    preparationMethods: bi(f.prepEn || "", f.prepKu || ""),
  };
}

const RAW_FOODS = [
  {
    "id": "rice-white",
    "nameEn": "White rice",
    "nameKu": "برنجی سپی",
    "category": "grains",
    "servingSizeEn": "100 g",
    "servingSizeKu": "١٠٠ گرام",
    "caloriesEstimate": 130,
    "protein": 2.4,
    "carbohydrates": 28,
    "fat": 0.3,
    "fiber": 0.4,
    "vitamins": [
      "Vitamin B1",
      "Vitamin B3"
    ],
    "minerals": [
      "Manganese",
      "Selenium"
    ],
    "allergens": [],
    "suitabilityEn": "White rice is a source of complex carbohydrates and B vitamins. It generally fits vegan, gluten-free eating patterns. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "برنجی سپی سەرچاوەیەکی کاربۆهایدراتی تێکەڵ و ڤیتامینەکانی Bـە. بەگشتی گونجاوە بۆ خواردنی ڤیگان، بەبێ گلوتن. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Boiled or steamed; the base for pilaf, soups, and stuffed vegetables.",
    "prepKu": "دەکوڵێنرێ یان بە هەڵم لێدرێ؛ بنەمای پلاڤ، شۆربا و خواردنی پڕکراوە.",
    "relatedRecipeIds": []
  },
  {
    "id": "rice-brown",
    "nameEn": "Brown rice",
    "nameKu": "برنجی قاوەیی",
    "category": "grains",
    "servingSizeEn": "100 g",
    "servingSizeKu": "١٠٠ گرام",
    "caloriesEstimate": 123,
    "protein": 2.7,
    "carbohydrates": 26,
    "fat": 1,
    "fiber": 1.8,
    "vitamins": [
      "Vitamin B1",
      "Vitamin B6"
    ],
    "minerals": [
      "Magnesium",
      "Manganese"
    ],
    "allergens": [],
    "suitabilityEn": "Brown rice is a source of dietary fiber and magnesium. It generally fits vegan, gluten-free eating patterns. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "برنجی قاوەیی سەرچاوەیەکی فایبەری خۆراکی و ماگنیزیۆمـە. بەگشتی گونجاوە بۆ خواردنی ڤیگان، بەبێ گلوتن. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Boiled or steamed; takes longer to cook than white rice.",
    "prepKu": "دەکوڵێنرێ یان بە هەڵم لێدرێ؛ کاتی کوڵاندنی زیاترە لە برنجی سپی.",
    "relatedRecipeIds": []
  },
  {
    "id": "kurdish-rice-pilaf",
    "nameEn": "Kurdish rice (biryani-style pilaf)",
    "nameKu": "برنجی کوردی (پلاوی بریانی)",
    "category": "grains",
    "servingSizeEn": "100 g",
    "servingSizeKu": "١٠٠ گرام",
    "caloriesEstimate": 175,
    "protein": 3.5,
    "carbohydrates": 30,
    "fat": 4.5,
    "fiber": 0.8,
    "vitamins": [
      "Vitamin B1"
    ],
    "minerals": [
      "Manganese"
    ],
    "allergens": [],
    "suitabilityEn": "Kurdish rice (biryani-style pilaf) is a source of complex carbohydrates and B vitamins. It generally fits omnivore eating patterns. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "برنجی کوردی (پلاوی بریانی) سەرچاوەیەکی کاربۆهایدراتی تێکەڵ و ڤیتامینەکانی Bـە. بەگشتی گونجاوە بۆ خواردنی زۆربەی خواردنەکان. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Rice sautéed then steamed with oil or ghee, often layered with meat, nuts, and raisins.",
    "prepKu": "برنج بە ڕۆن یان دوون سواتێ دەکرێت پاشان بە هەڵم لێدرێت، زۆرجار لەگەڵ گۆشت، گوێز و کشمیش چین دەکرێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "bulgur-savar",
    "nameEn": "Bulgur (savar)",
    "nameKu": "ساوار (بلغور)",
    "category": "grains",
    "servingSizeEn": "100 g",
    "servingSizeKu": "١٠٠ گرام",
    "caloriesEstimate": 151,
    "protein": 5.5,
    "carbohydrates": 34,
    "fat": 0.4,
    "fiber": 8.2,
    "vitamins": [
      "Vitamin B3",
      "Vitamin B6"
    ],
    "minerals": [
      "Manganese",
      "Magnesium"
    ],
    "allergens": [
      "gluten"
    ],
    "suitabilityEn": "Bulgur (savar) is a source of dietary fiber and complex carbohydrates. It generally fits vegetarian eating patterns. It contains gluten, so avoid it if you have a related allergy. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "ساوار (بلغور) سەرچاوەیەکی فایبەری خۆراکی و کاربۆهایدراتی تێکەڵـە. بەگشتی گونجاوە بۆ خواردنی گیاخۆری. پێکهاتەی گلوتن تێدایە، بۆیە ئەگەر ئالەرجیت هەیە خۆت لێ بپارێزە. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Soaked or boiled; used in pilafs, tabbouleh, and kubba fillings.",
    "prepKu": "دەخرێتە ناو ئاو یان دەکوڵێنرێت؛ لە پلاڤ، تەبولە و ناوی کوبەدا بەکاردێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "wheat-flour",
    "nameEn": "Wheat flour",
    "nameKu": "ئاردی گەنم",
    "category": "grains",
    "servingSizeEn": "100 g",
    "servingSizeKu": "١٠٠ گرام",
    "caloriesEstimate": 364,
    "protein": 10,
    "carbohydrates": 76,
    "fat": 1,
    "fiber": 2.7,
    "vitamins": [
      "Vitamin B1",
      "Folate"
    ],
    "minerals": [
      "Iron",
      "Manganese"
    ],
    "allergens": [
      "gluten"
    ],
    "suitabilityEn": "Wheat flour is a source of complex carbohydrates and iron. It generally fits vegetarian eating patterns. It contains gluten, so avoid it if you have a related allergy. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "ئاردی گەنم سەرچاوەیەکی کاربۆهایدراتی تێکەڵ و ئاسنـە. بەگشتی گونجاوە بۆ خواردنی گیاخۆری. پێکهاتەی گلوتن تێدایە، بۆیە ئەگەر ئالەرجیت هەیە خۆت لێ بپارێزە. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Milled from wheat; baked into breads, or used to thicken sauces.",
    "prepKu": "لە گەنم دەهاڕدرێت؛ بۆ نانپشتنەوە یان چڕکردنەوەی سۆس بەکاردێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "whole-wheat-bread",
    "nameEn": "Whole wheat bread",
    "nameKu": "نانی گەنمی تەواو",
    "category": "grains",
    "servingSizeEn": "100 g",
    "servingSizeKu": "١٠٠ گرام",
    "caloriesEstimate": 247,
    "protein": 13,
    "carbohydrates": 41,
    "fat": 3.4,
    "fiber": 6,
    "vitamins": [
      "Vitamin B1",
      "Vitamin B3"
    ],
    "minerals": [
      "Manganese",
      "Selenium"
    ],
    "allergens": [
      "gluten"
    ],
    "suitabilityEn": "Whole wheat bread is a source of dietary fiber and complex carbohydrates. It generally fits vegetarian eating patterns. It contains gluten, so avoid it if you have a related allergy. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "نانی گەنمی تەواو سەرچاوەیەکی فایبەری خۆراکی و کاربۆهایدراتی تێکەڵـە. بەگشتی گونجاوە بۆ خواردنی گیاخۆری. پێکهاتەی گلوتن تێدایە، بۆیە ئەگەر ئالەرجیت هەیە خۆت لێ بپارێزە. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Baked; eaten sliced with cheese, eggs, or spreads.",
    "prepKu": "لە فرن دەپژرێت؛ بە پارچە لەگەڵ پەنیر، هێلکە یان مواد لکاو دەخورێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "white-bread",
    "nameEn": "White bread",
    "nameKu": "نانی سپی",
    "category": "grains",
    "servingSizeEn": "100 g",
    "servingSizeKu": "١٠٠ گرام",
    "caloriesEstimate": 265,
    "protein": 9,
    "carbohydrates": 49,
    "fat": 3.2,
    "fiber": 2.4,
    "vitamins": [
      "Vitamin B1"
    ],
    "minerals": [
      "Iron"
    ],
    "allergens": [
      "gluten"
    ],
    "suitabilityEn": "White bread is a source of complex carbohydrates. It generally fits vegetarian eating patterns. It contains gluten, so avoid it if you have a related allergy. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "نانی سپی سەرچاوەیەکی کاربۆهایدراتی تێکەڵـە. بەگشتی گونجاوە بۆ خواردنی گیاخۆری. پێکهاتەی گلوتن تێدایە، بۆیە ئەگەر ئالەرجیت هەیە خۆت لێ بپارێزە. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Baked from refined flour; common with breakfast dishes.",
    "prepKu": "لە ئاردی خاڤ لە فرن دەپژرێت؛ لەگەڵ خواردنی بەیانیان باوترین.",
    "relatedRecipeIds": []
  },
  {
    "id": "oats",
    "nameEn": "Oats",
    "nameKu": "یوڵاف",
    "category": "grains",
    "servingSizeEn": "100 g",
    "servingSizeKu": "١٠٠ گرام",
    "caloriesEstimate": 389,
    "protein": 17,
    "carbohydrates": 66,
    "fat": 7,
    "fiber": 10.6,
    "vitamins": [
      "Vitamin B1",
      "Folate"
    ],
    "minerals": [
      "Manganese",
      "Magnesium"
    ],
    "allergens": [],
    "suitabilityEn": "Oats is a source of dietary fiber and protein. It generally fits vegan eating patterns. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "یوڵاف سەرچاوەیەکی فایبەری خۆراکی و پرۆتینـە. بەگشتی گونجاوە بۆ خواردنی ڤیگان. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Cooked with milk or water into porridge; also used in baking.",
    "prepKu": "لەگەڵ شیر یان ئاو دەکوڵێنرێت بۆ پەتەی بەیانیان؛ لە نانپژینیشدا بەکاردێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "barley",
    "nameEn": "Barley",
    "nameKu": "جۆ",
    "category": "grains",
    "servingSizeEn": "100 g",
    "servingSizeKu": "١٠٠ گرام",
    "caloriesEstimate": 123,
    "protein": 2.3,
    "carbohydrates": 28,
    "fat": 0.4,
    "fiber": 3.8,
    "vitamins": [
      "Vitamin B3"
    ],
    "minerals": [
      "Selenium",
      "Manganese"
    ],
    "allergens": [
      "gluten"
    ],
    "suitabilityEn": "Barley is a source of dietary fiber and complex carbohydrates. It generally fits vegetarian eating patterns. It contains gluten, so avoid it if you have a related allergy. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "جۆ سەرچاوەیەکی فایبەری خۆراکی و کاربۆهایدراتی تێکەڵـە. بەگشتی گونجاوە بۆ خواردنی گیاخۆری. پێکهاتەی گلوتن تێدایە، بۆیە ئەگەر ئالەرجیت هەیە خۆت لێ بپارێزە. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Boiled and added to soups and stews.",
    "prepKu": "دەکوڵێنرێت و دەخرێتە ناو شۆربا و خواردنی کوڵاو.",
    "relatedRecipeIds": []
  },
  {
    "id": "corn-maize",
    "nameEn": "Corn (maize)",
    "nameKu": "زەڕی گەنم",
    "category": "grains",
    "servingSizeEn": "100 g",
    "servingSizeKu": "١٠٠ گرام",
    "caloriesEstimate": 96,
    "protein": 3.4,
    "carbohydrates": 21,
    "fat": 1.5,
    "fiber": 2.4,
    "vitamins": [
      "Vitamin C",
      "Vitamin B1"
    ],
    "minerals": [
      "Magnesium"
    ],
    "allergens": [],
    "suitabilityEn": "Corn (maize) is a source of complex carbohydrates and vitamin C. It generally fits vegan, gluten-free eating patterns. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "زەڕی گەنم سەرچاوەیەکی کاربۆهایدراتی تێکەڵ و ڤیتامین Cـە. بەگشتی گونجاوە بۆ خواردنی ڤیگان، بەبێ گلوتن. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Boiled, grilled, or steamed on the cob.",
    "prepKu": "دەکوڵێنرێت، لەسەر ئاگر دەبرژێنرێت یان بە هەڵم لێدرێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "cornmeal",
    "nameEn": "Cornmeal",
    "nameKu": "ئاردی زەڕی گەنم",
    "category": "grains",
    "servingSizeEn": "100 g",
    "servingSizeKu": "١٠٠ گرام",
    "caloriesEstimate": 361,
    "protein": 8.1,
    "carbohydrates": 76,
    "fat": 3.6,
    "fiber": 7.3,
    "vitamins": [
      "Vitamin B1"
    ],
    "minerals": [
      "Iron"
    ],
    "allergens": [],
    "suitabilityEn": "Cornmeal is a source of complex carbohydrates. It generally fits vegan, gluten-free eating patterns. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "ئاردی زەڕی گەنم سەرچاوەیەکی کاربۆهایدراتی تێکەڵـە. بەگشتی گونجاوە بۆ خواردنی ڤیگان، بەبێ گلوتن. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Cooked into porridge or baked into flatbreads.",
    "prepKu": "دەکوڵێنرێت بۆ پەتە یان لە نانی تەنک دەپژرێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "quinoa",
    "nameEn": "Quinoa",
    "nameKu": "کینوا",
    "category": "grains",
    "servingSizeEn": "100 g",
    "servingSizeKu": "١٠٠ گرام",
    "caloriesEstimate": 120,
    "protein": 4.4,
    "carbohydrates": 21,
    "fat": 1.9,
    "fiber": 2.8,
    "vitamins": [
      "Folate",
      "Vitamin B6"
    ],
    "minerals": [
      "Iron",
      "Magnesium"
    ],
    "allergens": [],
    "suitabilityEn": "Quinoa is a source of protein and iron. It generally fits vegan, gluten-free eating patterns. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "کینوا سەرچاوەیەکی پرۆتین و ئاسنـە. بەگشتی گونجاوە بۆ خواردنی ڤیگان، بەبێ گلوتن. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Rinsed and boiled like rice; used in salads and side dishes.",
    "prepKu": "دەشۆردرێت و وەک برنج دەکوڵێنرێت؛ لە سالاد و خواردنی لاوەکیدا بەکاردێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "pasta",
    "nameEn": "Pasta",
    "nameKu": "پاستا",
    "category": "grains",
    "servingSizeEn": "100 g",
    "servingSizeKu": "١٠٠ گرام",
    "caloriesEstimate": 158,
    "protein": 5.8,
    "carbohydrates": 31,
    "fat": 0.9,
    "fiber": 1.8,
    "vitamins": [
      "Vitamin B1"
    ],
    "minerals": [
      "Selenium"
    ],
    "allergens": [
      "gluten"
    ],
    "suitabilityEn": "Pasta is a source of complex carbohydrates. It generally fits vegetarian eating patterns. It contains gluten, so avoid it if you have a related allergy. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "پاستا سەرچاوەیەکی کاربۆهایدراتی تێکەڵـە. بەگشتی گونجاوە بۆ خواردنی گیاخۆری. پێکهاتەی گلوتن تێدایە، بۆیە ئەگەر ئالەرجیت هەیە خۆت لێ بپارێزە. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Boiled in water and served with sauces or vegetables.",
    "prepKu": "لە ئاو دەکوڵێنرێت و لەگەڵ سۆس یان سەوزە خۆراک دەکرێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "noodles",
    "nameEn": "Noodles",
    "nameKu": "نودل",
    "category": "grains",
    "servingSizeEn": "100 g",
    "servingSizeKu": "١٠٠ گرام",
    "caloriesEstimate": 138,
    "protein": 4.5,
    "carbohydrates": 25,
    "fat": 2.1,
    "fiber": 1.2,
    "vitamins": [
      "Vitamin B1"
    ],
    "minerals": [
      "Manganese"
    ],
    "allergens": [
      "gluten"
    ],
    "suitabilityEn": "Noodles is a source of complex carbohydrates. It generally fits vegetarian eating patterns. It contains gluten, so avoid it if you have a related allergy. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "نودل سەرچاوەیەکی کاربۆهایدراتی تێکەڵـە. بەگشتی گونجاوە بۆ خواردنی گیاخۆری. پێکهاتەی گلوتن تێدایە، بۆیە ئەگەر ئالەرجیت هەیە خۆت لێ بپارێزە. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Boiled and stir-fried or added to soups.",
    "prepKu": "دەکوڵێنرێت و بە سواتین یان لە شۆربا خۆراک دەکرێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "couscous",
    "nameEn": "Couscous",
    "nameKu": "کسکس",
    "category": "grains",
    "servingSizeEn": "100 g",
    "servingSizeKu": "١٠٠ گرام",
    "caloriesEstimate": 112,
    "protein": 3.8,
    "carbohydrates": 23,
    "fat": 0.2,
    "fiber": 1.4,
    "vitamins": [
      "Vitamin B3"
    ],
    "minerals": [
      "Selenium"
    ],
    "allergens": [
      "gluten"
    ],
    "suitabilityEn": "Couscous is a source of complex carbohydrates. It generally fits vegetarian eating patterns. It contains gluten, so avoid it if you have a related allergy. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "کسکس سەرچاوەیەکی کاربۆهایدراتی تێکەڵـە. بەگشتی گونجاوە بۆ خواردنی گیاخۆری. پێکهاتەی گلوتن تێدایە، بۆیە ئەگەر ئالەرجیت هەیە خۆت لێ بپارێزە. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Steamed and fluffed; served with vegetables or stews.",
    "prepKu": "بە هەڵم لێدرێت و هەڵدەوەرێنرێت؛ لەگەڵ سەوزە یان خواردنی کوڵاو خۆراک دەکرێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "rye-bread",
    "nameEn": "Rye bread",
    "nameKu": "نانی چاودار",
    "category": "grains",
    "servingSizeEn": "100 g",
    "servingSizeKu": "١٠٠ گرام",
    "caloriesEstimate": 259,
    "protein": 8.5,
    "carbohydrates": 48,
    "fat": 3.3,
    "fiber": 5.8,
    "vitamins": [
      "Vitamin B3"
    ],
    "minerals": [
      "Manganese",
      "Selenium"
    ],
    "allergens": [
      "gluten"
    ],
    "suitabilityEn": "Rye bread is a source of dietary fiber and complex carbohydrates. It generally fits vegetarian eating patterns. It contains gluten, so avoid it if you have a related allergy. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "نانی چاودار سەرچاوەیەکی فایبەری خۆراکی و کاربۆهایدراتی تێکەڵـە. بەگشتی گونجاوە بۆ خواردنی گیاخۆری. پێکهاتەی گلوتن تێدایە، بۆیە ئەگەر ئالەرجیت هەیە خۆت لێ بپارێزە. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Baked and sliced; often eaten with cheese or cold cuts.",
    "prepKu": "لە فرن دەپژرێت و پارچە دەکرێت؛ زۆرجار لەگەڵ پەنیر خۆراک دەکرێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "semolina",
    "nameEn": "Semolina",
    "nameKu": "سمید",
    "category": "grains",
    "servingSizeEn": "100 g",
    "servingSizeKu": "١٠٠ گرام",
    "caloriesEstimate": 360,
    "protein": 12.7,
    "carbohydrates": 73,
    "fat": 1,
    "fiber": 3.9,
    "vitamins": [
      "Vitamin B1",
      "Folate"
    ],
    "minerals": [
      "Iron"
    ],
    "allergens": [
      "gluten"
    ],
    "suitabilityEn": "Semolina is a source of protein and complex carbohydrates. It generally fits vegetarian eating patterns. It contains gluten, so avoid it if you have a related allergy. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "سمید سەرچاوەیەکی پرۆتین و کاربۆهایدراتی تێکەڵـە. بەگشتی گونجاوە بۆ خواردنی گیاخۆری. پێکهاتەی گلوتن تێدایە، بۆیە ئەگەر ئالەرجیت هەیە خۆت لێ بپارێزە. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Cooked into porridge or used in sweets like halva.",
    "prepKu": "دەکوڵێنرێت بۆ پەتە یان لە شیرینی وەک حەلاوە بەکاردێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "cracked-wheat",
    "nameEn": "Cracked wheat",
    "nameKu": "گەنمی وردکراو",
    "category": "grains",
    "servingSizeEn": "100 g",
    "servingSizeKu": "١٠٠ گرام",
    "caloriesEstimate": 342,
    "protein": 12.3,
    "carbohydrates": 76,
    "fat": 1.5,
    "fiber": 12.5,
    "vitamins": [
      "Vitamin B3"
    ],
    "minerals": [
      "Magnesium",
      "Iron"
    ],
    "allergens": [
      "gluten"
    ],
    "suitabilityEn": "Cracked wheat is a source of dietary fiber and protein. It generally fits vegetarian eating patterns. It contains gluten, so avoid it if you have a related allergy. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "گەنمی وردکراو سەرچاوەیەکی فایبەری خۆراکی و پرۆتینـە. بەگشتی گونجاوە بۆ خواردنی گیاخۆری. پێکهاتەی گلوتن تێدایە، بۆیە ئەگەر ئالەرجیت هەیە خۆت لێ بپارێزە. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Soaked or boiled; used in salads and stuffings.",
    "prepKu": "دەخرێتە ناو ئاو یان دەکوڵێنرێت؛ لە سالاد و پڕکردنەوەدا بەکاردێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "popcorn",
    "nameEn": "Popcorn (plain, air-popped)",
    "nameKu": "پۆپکۆرن (سادە)",
    "category": "grains",
    "servingSizeEn": "100 g",
    "servingSizeKu": "١٠٠ گرام",
    "caloriesEstimate": 387,
    "protein": 12.9,
    "carbohydrates": 78,
    "fat": 4.5,
    "fiber": 14.5,
    "vitamins": [
      "Vitamin B3"
    ],
    "minerals": [
      "Manganese"
    ],
    "allergens": [],
    "suitabilityEn": "Popcorn (plain, air-popped) is a source of dietary fiber. It generally fits vegan, gluten-free eating patterns. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "پۆپکۆرن (سادە) سەرچاوەیەکی فایبەری خۆراکیـە. بەگشتی گونجاوە بۆ خواردنی ڤیگان، بەبێ گلوتن. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Air-popped or dry-heated kernels; best eaten plain or lightly salted.",
    "prepKu": "لە هەوا یان بە گەرمی وشک دەتەقێنرێت؛ باشترە سادە یان کەمێک بە خوێ خۆراک بکرێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "breakfast-cereal",
    "nameEn": "Breakfast cereal (fortified)",
    "nameKu": "خواردنی بەیانی (سیریال بەهێزکراو)",
    "category": "grains",
    "servingSizeEn": "100 g",
    "servingSizeKu": "١٠٠ گرام",
    "caloriesEstimate": 378,
    "protein": 8,
    "carbohydrates": 82,
    "fat": 2,
    "fiber": 6,
    "vitamins": [
      "Vitamin D",
      "Vitamin B12"
    ],
    "minerals": [
      "Iron"
    ],
    "allergens": [
      "gluten"
    ],
    "suitabilityEn": "Breakfast cereal (fortified) is a source of B vitamins and iron. It generally fits vegetarian eating patterns. It contains gluten, so avoid it if you have a related allergy. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "خواردنی بەیانی (سیریال بەهێزکراو) سەرچاوەیەکی ڤیتامینەکانی B و ئاسنـە. بەگشتی گونجاوە بۆ خواردنی گیاخۆری. پێکهاتەی گلوتن تێدایە، بۆیە ئەگەر ئالەرجیت هەیە خۆت لێ بپارێزە. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Served cold with milk or yogurt.",
    "prepKu": "بە شیر یان مۆست ساز دەکرێت و خۆراک دەکرێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "naan-flatbread",
    "nameEn": "Naan / flatbread",
    "nameKu": "نانی تەنک (نان)",
    "category": "grains",
    "servingSizeEn": "100 g",
    "servingSizeKu": "١٠٠ گرام",
    "caloriesEstimate": 310,
    "protein": 9,
    "carbohydrates": 50,
    "fat": 8,
    "fiber": 2.2,
    "vitamins": [
      "Vitamin B1"
    ],
    "minerals": [
      "Calcium"
    ],
    "allergens": [
      "gluten",
      "dairy"
    ],
    "suitabilityEn": "Naan / flatbread is a source of complex carbohydrates. It generally fits vegetarian eating patterns. It contains gluten, dairy, so avoid it if you have a related allergy. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "نانی تەنک (نان) سەرچاوەیەکی کاربۆهایدراتی تێکەڵـە. بەگشتی گونجاوە بۆ خواردنی گیاخۆری. پێکهاتەی گلوتن، شیرەمەنی تێدایە، بۆیە ئەگەر ئالەرجیت هەیە خۆت لێ بپارێزە. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Baked in a hot oven or on a griddle; used to scoop other dishes.",
    "prepKu": "لە فرنی گەرم یان سینی گەرم دەپژرێت؛ بۆ هەڵگرتنی خواردنی تر بەکاردێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "pita-bread",
    "nameEn": "Pita bread",
    "nameKu": "نانی پیتا",
    "category": "grains",
    "servingSizeEn": "100 g",
    "servingSizeKu": "١٠٠ گرام",
    "caloriesEstimate": 275,
    "protein": 9.1,
    "carbohydrates": 55,
    "fat": 1.2,
    "fiber": 2.2,
    "vitamins": [
      "Vitamin B1"
    ],
    "minerals": [
      "Manganese"
    ],
    "allergens": [
      "gluten"
    ],
    "suitabilityEn": "Pita bread is a source of complex carbohydrates. It generally fits vegetarian eating patterns. It contains gluten, so avoid it if you have a related allergy. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "نانی پیتا سەرچاوەیەکی کاربۆهایدراتی تێکەڵـە. بەگشتی گونجاوە بۆ خواردنی گیاخۆری. پێکهاتەی گلوتن تێدایە، بۆیە ئەگەر ئالەرجیت هەیە خۆت لێ بپارێزە. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Baked into pockets; used for wraps or dipped into hummus.",
    "prepKu": "دەپژرێت و بۆشایی تیایدا دروست دەبێت؛ بۆ پێچانەوە یان هەڵمژینی حومس بەکاردێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "samoon-bread",
    "nameEn": "Samoon bread",
    "nameKu": "نانی سەمون",
    "category": "grains",
    "servingSizeEn": "100 g",
    "servingSizeKu": "١٠٠ گرام",
    "caloriesEstimate": 290,
    "protein": 9.5,
    "carbohydrates": 56,
    "fat": 2.5,
    "fiber": 2,
    "vitamins": [
      "Vitamin B1"
    ],
    "minerals": [
      "Iron"
    ],
    "allergens": [
      "gluten"
    ],
    "suitabilityEn": "Samoon bread is a source of complex carbohydrates. It generally fits vegetarian eating patterns. It contains gluten, so avoid it if you have a related allergy. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "نانی سەمون سەرچاوەیەکی کاربۆهایدراتی تێکەڵـە. بەگشتی گونجاوە بۆ خواردنی گیاخۆری. پێکهاتەی گلوتن تێدایە، بۆیە ئەگەر ئالەرجیت هەیە خۆت لێ بپارێزە. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Baked in a diamond shape in a hot oven; a daily staple bread.",
    "prepKu": "بە شێوەی چوارگۆشەیی لە فرنی گەرم دەپژرێت؛ نانێکی ڕۆژانەیە.",
    "relatedRecipeIds": []
  },
  {
    "id": "freekeh",
    "nameEn": "Freekeh",
    "nameKu": "فریکە",
    "category": "grains",
    "servingSizeEn": "100 g",
    "servingSizeKu": "١٠٠ گرام",
    "caloriesEstimate": 150,
    "protein": 6,
    "carbohydrates": 30,
    "fat": 1.3,
    "fiber": 4.3,
    "vitamins": [
      "Vitamin B3"
    ],
    "minerals": [
      "Iron",
      "Magnesium"
    ],
    "allergens": [
      "gluten"
    ],
    "suitabilityEn": "Freekeh is a source of dietary fiber and protein. It generally fits vegetarian eating patterns. It contains gluten, so avoid it if you have a related allergy. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "فریکە سەرچاوەیەکی فایبەری خۆراکی و پرۆتینـە. بەگشتی گونجاوە بۆ خواردنی گیاخۆری. پێکهاتەی گلوتن تێدایە، بۆیە ئەگەر ئالەرجیت هەیە خۆت لێ بپارێزە. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Roasted green wheat, boiled like rice; used in pilafs and salads.",
    "prepKu": "گەنمی سەوزی برژاوە، وەک برنج دەکوڵێنرێت؛ لە پلاڤ و سالاددا بەکاردێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "millet",
    "nameEn": "Millet",
    "nameKu": "گاڵۆ (میلێت)",
    "category": "grains",
    "servingSizeEn": "100 g",
    "servingSizeKu": "١٠٠ گرام",
    "caloriesEstimate": 119,
    "protein": 3.5,
    "carbohydrates": 23,
    "fat": 1,
    "fiber": 1.3,
    "vitamins": [
      "Vitamin B3"
    ],
    "minerals": [
      "Magnesium",
      "Manganese"
    ],
    "allergens": [],
    "suitabilityEn": "Millet is a source of complex carbohydrates and magnesium. It generally fits vegan, gluten-free eating patterns. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "گاڵۆ (میلێت) سەرچاوەیەکی کاربۆهایدراتی تێکەڵ و ماگنیزیۆمـە. بەگشتی گونجاوە بۆ خواردنی ڤیگان، بەبێ گلوتن. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Boiled like rice or used in porridge.",
    "prepKu": "وەک برنج دەکوڵێنرێت یان بۆ پەتە بەکاردێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "chicken-breast",
    "nameEn": "Chicken breast",
    "nameKu": "سنگی مریشک",
    "category": "proteins",
    "servingSizeEn": "100 g",
    "servingSizeKu": "١٠٠ گرام",
    "caloriesEstimate": 165,
    "protein": 31,
    "carbohydrates": 0,
    "fat": 3.6,
    "fiber": 0,
    "vitamins": [
      "Vitamin B3",
      "Vitamin B6"
    ],
    "minerals": [
      "Selenium",
      "Phosphorus"
    ],
    "allergens": [],
    "suitabilityEn": "Chicken breast is a source of protein. It generally fits omnivore eating patterns. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "سنگی مریشک سەرچاوەیەکی پرۆتینـە. بەگشتی گونجاوە بۆ خواردنی زۆربەی خواردنەکان. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Grilled, baked, or boiled; a lean base for many dishes.",
    "prepKu": "لەسەر ئاگر، لە فرن یان بە کوڵاندن ئامادە دەکرێت؛ بنەمایەکی کەم چەوریە بۆ زۆر خواردن.",
    "relatedRecipeIds": []
  },
  {
    "id": "chicken-thigh",
    "nameEn": "Chicken thigh",
    "nameKu": "ڕانی مریشک",
    "category": "proteins",
    "servingSizeEn": "100 g",
    "servingSizeKu": "١٠٠ گرام",
    "caloriesEstimate": 209,
    "protein": 26,
    "carbohydrates": 0,
    "fat": 11,
    "fiber": 0,
    "vitamins": [
      "Vitamin B3"
    ],
    "minerals": [
      "Zinc"
    ],
    "allergens": [],
    "suitabilityEn": "Chicken thigh is a source of protein and zinc. It generally fits omnivore eating patterns. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "ڕانی مریشک سەرچاوەیەکی پرۆتین و زینکـە. بەگشتی گونجاوە بۆ خواردنی زۆربەی خواردنەکان. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Grilled, roasted, or stewed with vegetables.",
    "prepKu": "لەسەر ئاگر، لە فرن یان لەگەڵ سەوزە دەکوڵێنرێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "chicken-liver",
    "nameEn": "Chicken liver",
    "nameKu": "جگەری مریشک",
    "category": "proteins",
    "servingSizeEn": "100 g",
    "servingSizeKu": "١٠٠ گرام",
    "caloriesEstimate": 167,
    "protein": 24.5,
    "carbohydrates": 0.9,
    "fat": 6.5,
    "fiber": 0,
    "vitamins": [
      "Vitamin A",
      "Vitamin B12"
    ],
    "minerals": [
      "Iron"
    ],
    "allergens": [],
    "suitabilityEn": "Chicken liver is a source of protein and iron. It generally fits omnivore eating patterns. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "جگەری مریشک سەرچاوەیەکی پرۆتین و ئاسنـە. بەگشتی گونجاوە بۆ خواردنی زۆربەی خواردنەکان. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Pan-fried or grilled with onions and spices.",
    "prepKu": "لەگەڵ پیاز و بەهارات لە تاوە سرووتاوی دەکرێت یان لەسەر ئاگر.",
    "relatedRecipeIds": []
  },
  {
    "id": "beef-lean",
    "nameEn": "Lean beef",
    "nameKu": "گۆشتی گا (کەم چەوری)",
    "category": "proteins",
    "servingSizeEn": "100 g",
    "servingSizeKu": "١٠٠ گرام",
    "caloriesEstimate": 182,
    "protein": 26,
    "carbohydrates": 0,
    "fat": 8,
    "fiber": 0,
    "vitamins": [
      "Vitamin B12"
    ],
    "minerals": [
      "Iron",
      "Zinc"
    ],
    "allergens": [],
    "suitabilityEn": "Lean beef is a source of protein and iron. It generally fits omnivore eating patterns. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "گۆشتی گا (کەم چەوری) سەرچاوەیەکی پرۆتین و ئاسنـە. بەگشتی گونجاوە بۆ خواردنی زۆربەی خواردنەکان. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Grilled, roasted, or stewed.",
    "prepKu": "لەسەر ئاگر، لە فرن یان بە کوڵاندن ئامادە دەکرێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "beef-mince",
    "nameEn": "Beef mince",
    "nameKu": "گۆشتی هاڕاوی گا",
    "category": "proteins",
    "servingSizeEn": "100 g",
    "servingSizeKu": "١٠٠ گرام",
    "caloriesEstimate": 250,
    "protein": 26,
    "carbohydrates": 0,
    "fat": 17,
    "fiber": 0,
    "vitamins": [
      "Vitamin B12"
    ],
    "minerals": [
      "Zinc"
    ],
    "allergens": [],
    "suitabilityEn": "Beef mince is a source of protein and zinc. It generally fits omnivore eating patterns. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "گۆشتی هاڕاوی گا سەرچاوەیەکی پرۆتین و زینکـە. بەگشتی گونجاوە بۆ خواردنی زۆربەی خواردنەکان. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Used in kofta, kebab, and stuffed vegetables.",
    "prepKu": "لە کوفتە، کەباب و خواردنی پڕکراو بەکاردێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "lamb-meat",
    "nameEn": "Lamb meat",
    "nameKu": "گۆشتی بەرخ",
    "category": "proteins",
    "servingSizeEn": "100 g",
    "servingSizeKu": "١٠٠ گرام",
    "caloriesEstimate": 294,
    "protein": 25,
    "carbohydrates": 0,
    "fat": 21,
    "fiber": 0,
    "vitamins": [
      "Vitamin B12"
    ],
    "minerals": [
      "Zinc",
      "Selenium"
    ],
    "allergens": [],
    "suitabilityEn": "Lamb meat is a source of protein and zinc. It generally fits omnivore eating patterns. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "گۆشتی بەرخ سەرچاوەیەکی پرۆتین و زینکـە. بەگشتی گونجاوە بۆ خواردنی زۆربەی خواردنەکان. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Grilled, roasted, or slow-cooked in stews and rice dishes.",
    "prepKu": "لەسەر ئاگر، لە فرن یان بەهێواشی لەگەڵ برنج و خواردنی کوڵاو ئامادە دەکرێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "lamb-liver",
    "nameEn": "Lamb liver",
    "nameKu": "جگەری بەرخ",
    "category": "proteins",
    "servingSizeEn": "100 g",
    "servingSizeKu": "١٠٠ گرام",
    "caloriesEstimate": 139,
    "protein": 21,
    "carbohydrates": 2.5,
    "fat": 4.6,
    "fiber": 0,
    "vitamins": [
      "Vitamin A",
      "Vitamin B12"
    ],
    "minerals": [
      "Iron"
    ],
    "allergens": [],
    "suitabilityEn": "Lamb liver is a source of protein and iron. It generally fits omnivore eating patterns. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "جگەری بەرخ سەرچاوەیەکی پرۆتین و ئاسنـە. بەگشتی گونجاوە بۆ خواردنی زۆربەی خواردنەکان. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Quickly grilled or pan-fried with spices.",
    "prepKu": "بەخێرایی لەسەر ئاگر یان لە تاوە لەگەڵ بەهارات ئامادە دەکرێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "goat-meat",
    "nameEn": "Goat meat",
    "nameKu": "گۆشتی بزن",
    "category": "proteins",
    "servingSizeEn": "100 g",
    "servingSizeKu": "١٠٠ گرام",
    "caloriesEstimate": 143,
    "protein": 27,
    "carbohydrates": 0,
    "fat": 3,
    "fiber": 0,
    "vitamins": [
      "Vitamin B12"
    ],
    "minerals": [
      "Iron"
    ],
    "allergens": [],
    "suitabilityEn": "Goat meat is a source of protein and iron. It generally fits omnivore eating patterns. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "گۆشتی بزن سەرچاوەیەکی پرۆتین و ئاسنـە. بەگشتی گونجاوە بۆ خواردنی زۆربەی خواردنەکان. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Slow-cooked in stews or grilled.",
    "prepKu": "بەهێواشی لە خواردنی کوڵاو یان لەسەر ئاگر ئامادە دەکرێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "turkey-breast",
    "nameEn": "Turkey breast",
    "nameKu": "سنگی کۆکۆ",
    "category": "proteins",
    "servingSizeEn": "100 g",
    "servingSizeKu": "١٠٠ گرام",
    "caloriesEstimate": 135,
    "protein": 30,
    "carbohydrates": 0,
    "fat": 1,
    "fiber": 0,
    "vitamins": [
      "Vitamin B6"
    ],
    "minerals": [
      "Selenium"
    ],
    "allergens": [],
    "suitabilityEn": "Turkey breast is a source of protein. It generally fits omnivore eating patterns. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "سنگی کۆکۆ سەرچاوەیەکی پرۆتینـە. بەگشتی گونجاوە بۆ خواردنی زۆربەی خواردنەکان. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Roasted or grilled; a lean poultry option.",
    "prepKu": "لە فرن یان لەسەر ئاگر ئامادە دەکرێت؛ گۆشتێکی کەم چەوری باڵندەیە.",
    "relatedRecipeIds": []
  },
  {
    "id": "duck-meat",
    "nameEn": "Duck meat",
    "nameKu": "بۆتەڵ (گۆشتی وروویشک)",
    "category": "proteins",
    "servingSizeEn": "100 g",
    "servingSizeKu": "١٠٠ گرام",
    "caloriesEstimate": 337,
    "protein": 19,
    "carbohydrates": 0,
    "fat": 28,
    "fiber": 0,
    "vitamins": [
      "Vitamin B3"
    ],
    "minerals": [
      "Iron"
    ],
    "allergens": [],
    "suitabilityEn": "Duck meat is a source of protein and iron. It generally fits omnivore eating patterns. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "بۆتەڵ (گۆشتی وروویشک) سەرچاوەیەکی پرۆتین و ئاسنـە. بەگشتی گونجاوە بۆ خواردنی زۆربەی خواردنەکان. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Roasted, often with the skin rendered crisp.",
    "prepKu": "لە فرن ئامادە دەکرێت، زۆرجار پۆست بە شێوەیەکی قاتی برژێنراو.",
    "relatedRecipeIds": []
  },
  {
    "id": "white-fish",
    "nameEn": "White fish (e.g., tilapia)",
    "nameKu": "ماسی سپی",
    "category": "proteins",
    "servingSizeEn": "100 g",
    "servingSizeKu": "١٠٠ گرام",
    "caloriesEstimate": 96,
    "protein": 20.5,
    "carbohydrates": 0,
    "fat": 1.7,
    "fiber": 0,
    "vitamins": [
      "Vitamin B12",
      "Vitamin D"
    ],
    "minerals": [
      "Selenium"
    ],
    "allergens": [
      "fish"
    ],
    "suitabilityEn": "White fish (e.g., tilapia) is a source of protein and selenium. It generally fits pescatarian eating patterns. It contains fish, so avoid it if you have a related allergy. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "ماسی سپی سەرچاوەیەکی پرۆتین و سیلینیۆمـە. بەگشتی گونجاوە بۆ خواردنی خواردنی ماسی-گیاخۆری. پێکهاتەی ماسی تێدایە، بۆیە ئەگەر ئالەرجیت هەیە خۆت لێ بپارێزە. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Grilled, baked, or fried.",
    "prepKu": "لەسەر ئاگر، لە فرن یان سرووتاوی دەکرێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "salmon",
    "nameEn": "Salmon",
    "nameKu": "ماسی سالمۆن",
    "category": "proteins",
    "servingSizeEn": "100 g",
    "servingSizeKu": "١٠٠ گرام",
    "caloriesEstimate": 208,
    "protein": 20,
    "carbohydrates": 0,
    "fat": 13,
    "fiber": 0,
    "vitamins": [
      "Vitamin D",
      "Vitamin B12"
    ],
    "minerals": [
      "Selenium"
    ],
    "allergens": [
      "fish"
    ],
    "suitabilityEn": "Salmon is a source of protein and omega-3 fatty acids. It generally fits pescatarian eating patterns. It contains fish, so avoid it if you have a related allergy. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "ماسی سالمۆن سەرچاوەیەکی پرۆتین و ئاسیدی چەوری omega-3ـە. بەگشتی گونجاوە بۆ خواردنی خواردنی ماسی-گیاخۆری. پێکهاتەی ماسی تێدایە، بۆیە ئەگەر ئالەرجیت هەیە خۆت لێ بپارێزە. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Grilled, baked, or pan-seared.",
    "prepKu": "لەسەر ئاگر، لە فرن یان لە تاوە سرووتاوی دەکرێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "tuna",
    "nameEn": "Tuna",
    "nameKu": "ماسی تۆن",
    "category": "proteins",
    "servingSizeEn": "100 g",
    "servingSizeKu": "١٠٠ گرام",
    "caloriesEstimate": 132,
    "protein": 28,
    "carbohydrates": 0,
    "fat": 1,
    "fiber": 0,
    "vitamins": [
      "Vitamin D",
      "Vitamin B12"
    ],
    "minerals": [
      "Selenium"
    ],
    "allergens": [
      "fish"
    ],
    "suitabilityEn": "Tuna is a source of protein and selenium. It generally fits pescatarian eating patterns. It contains fish, so avoid it if you have a related allergy. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "ماسی تۆن سەرچاوەیەکی پرۆتین و سیلینیۆمـە. بەگشتی گونجاوە بۆ خواردنی خواردنی ماسی-گیاخۆری. پێکهاتەی ماسی تێدایە، بۆیە ئەگەر ئالەرجیت هەیە خۆت لێ بپارێزە. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Grilled fresh or used canned in salads.",
    "prepKu": "تازە لەسەر ئاگر ئامادە دەکرێت یان کۆنسێرڤکراو لە سالاد بەکاردێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "sardines",
    "nameEn": "Sardines",
    "nameKu": "ماسی ساردین",
    "category": "proteins",
    "servingSizeEn": "100 g",
    "servingSizeKu": "١٠٠ گرام",
    "caloriesEstimate": 208,
    "protein": 25,
    "carbohydrates": 0,
    "fat": 11,
    "fiber": 0,
    "vitamins": [
      "Vitamin D",
      "Vitamin B12"
    ],
    "minerals": [
      "Calcium"
    ],
    "allergens": [
      "fish"
    ],
    "suitabilityEn": "Sardines is a source of protein and omega-3 fatty acids. It generally fits pescatarian eating patterns. It contains fish, so avoid it if you have a related allergy. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "ماسی ساردین سەرچاوەیەکی پرۆتین و ئاسیدی چەوری omega-3ـە. بەگشتی گونجاوە بۆ خواردنی خواردنی ماسی-گیاخۆری. پێکهاتەی ماسی تێدایە، بۆیە ئەگەر ئالەرجیت هەیە خۆت لێ بپارێزە. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Grilled or eaten canned.",
    "prepKu": "لەسەر ئاگر ئامادە دەکرێت یان کۆنسێرڤکراو دەخورێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "mackerel",
    "nameEn": "Mackerel",
    "nameKu": "ماسی مکریل",
    "category": "proteins",
    "servingSizeEn": "100 g",
    "servingSizeKu": "١٠٠ گرام",
    "caloriesEstimate": 205,
    "protein": 19,
    "carbohydrates": 0,
    "fat": 14,
    "fiber": 0,
    "vitamins": [
      "Vitamin D",
      "Vitamin B12"
    ],
    "minerals": [
      "Selenium"
    ],
    "allergens": [
      "fish"
    ],
    "suitabilityEn": "Mackerel is a source of protein and omega-3 fatty acids. It generally fits pescatarian eating patterns. It contains fish, so avoid it if you have a related allergy. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "ماسی مکریل سەرچاوەیەکی پرۆتین و ئاسیدی چەوری omega-3ـە. بەگشتی گونجاوە بۆ خواردنی خواردنی ماسی-گیاخۆری. پێکهاتەی ماسی تێدایە، بۆیە ئەگەر ئالەرجیت هەیە خۆت لێ بپارێزە. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Grilled or baked.",
    "prepKu": "لەسەر ئاگر یان لە فرن ئامادە دەکرێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "shrimp",
    "nameEn": "Shrimp",
    "nameKu": "شریمپ",
    "category": "proteins",
    "servingSizeEn": "100 g",
    "servingSizeKu": "١٠٠ گرام",
    "caloriesEstimate": 99,
    "protein": 24,
    "carbohydrates": 0.2,
    "fat": 0.3,
    "fiber": 0,
    "vitamins": [
      "Vitamin B12"
    ],
    "minerals": [
      "Selenium"
    ],
    "allergens": [
      "shellfish"
    ],
    "suitabilityEn": "Shrimp is a source of protein and selenium. It generally fits pescatarian eating patterns. It contains shellfish, so avoid it if you have a related allergy. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "شریمپ سەرچاوەیەکی پرۆتین و سیلینیۆمـە. بەگشتی گونجاوە بۆ خواردنی خواردنی ماسی-گیاخۆری. پێکهاتەی کەوترۆکەی دەریایی تێدایە، بۆیە ئەگەر ئالەرجیت هەیە خۆت لێ بپارێزە. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Grilled, sautéed, or added to soups.",
    "prepKu": "لەسەر ئاگر، سواتین یان لە شۆربا بەکاردێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "crab",
    "nameEn": "Crab",
    "nameKu": "کرابی دەریایی",
    "category": "proteins",
    "servingSizeEn": "100 g",
    "servingSizeKu": "١٠٠ گرام",
    "caloriesEstimate": 97,
    "protein": 19,
    "carbohydrates": 0,
    "fat": 1.5,
    "fiber": 0,
    "vitamins": [
      "Vitamin B12"
    ],
    "minerals": [
      "Zinc",
      "Selenium"
    ],
    "allergens": [
      "shellfish"
    ],
    "suitabilityEn": "Crab is a source of protein and zinc. It generally fits pescatarian eating patterns. It contains shellfish, so avoid it if you have a related allergy. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "کرابی دەریایی سەرچاوەیەکی پرۆتین و زینکـە. بەگشتی گونجاوە بۆ خواردنی خواردنی ماسی-گیاخۆری. پێکهاتەی کەوترۆکەی دەریایی تێدایە، بۆیە ئەگەر ئالەرجیت هەیە خۆت لێ بپارێزە. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Steamed or boiled, served with lemon.",
    "prepKu": "بە هەڵم لێدرێت یان دەکوڵێنرێت، لەگەڵ لیمۆ خۆراک دەکرێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "chicken-egg",
    "nameEn": "Chicken egg",
    "nameKu": "هێلکەی مریشک",
    "category": "proteins",
    "servingSizeEn": "100 g",
    "servingSizeKu": "١٠٠ گرام",
    "caloriesEstimate": 155,
    "protein": 13,
    "carbohydrates": 1.1,
    "fat": 11,
    "fiber": 0,
    "vitamins": [
      "Vitamin A",
      "Vitamin D",
      "Vitamin B12"
    ],
    "minerals": [
      "Selenium"
    ],
    "allergens": [
      "eggs"
    ],
    "suitabilityEn": "Chicken egg is a source of protein and vitamin D. It generally fits vegetarian eating patterns. It contains eggs, so avoid it if you have a related allergy. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "هێلکەی مریشک سەرچاوەیەکی پرۆتین و ڤیتامین Dـە. بەگشتی گونجاوە بۆ خواردنی گیاخۆری. پێکهاتەی هێلکە تێدایە، بۆیە ئەگەر ئالەرجیت هەیە خۆت لێ بپارێزە. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Boiled, fried, scrambled, or baked into dishes.",
    "prepKu": "دەکوڵێنرێت، سرووتاوی دەکرێت، دەهاڕدرێت یان لە خواردندا لە فرن بەکاردێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "egg-white",
    "nameEn": "Egg white",
    "nameKu": "سپیی هێلکە",
    "category": "proteins",
    "servingSizeEn": "100 g",
    "servingSizeKu": "١٠٠ گرام",
    "caloriesEstimate": 52,
    "protein": 11,
    "carbohydrates": 0.7,
    "fat": 0.2,
    "fiber": 0,
    "vitamins": [
      "Vitamin B2"
    ],
    "minerals": [
      "Potassium"
    ],
    "allergens": [
      "eggs"
    ],
    "suitabilityEn": "Egg white is a source of protein. It generally fits vegetarian eating patterns. It contains eggs, so avoid it if you have a related allergy. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "سپیی هێلکە سەرچاوەیەکی پرۆتینـە. بەگشتی گونجاوە بۆ خواردنی گیاخۆری. پێکهاتەی هێلکە تێدایە، بۆیە ئەگەر ئالەرجیت هەیە خۆت لێ بپارێزە. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Boiled or whisked; a low-fat protein option.",
    "prepKu": "دەکوڵێنرێت یان دەهاڕدرێت؛ سەرچاوەیەکی پرۆتینی کەم چەوریە.",
    "relatedRecipeIds": []
  },
  {
    "id": "quail-egg",
    "nameEn": "Quail egg",
    "nameKu": "هێلکەی کوێل",
    "category": "proteins",
    "servingSizeEn": "100 g",
    "servingSizeKu": "١٠٠ گرام",
    "caloriesEstimate": 158,
    "protein": 13,
    "carbohydrates": 0.4,
    "fat": 11,
    "fiber": 0,
    "vitamins": [
      "Vitamin A",
      "Vitamin B12"
    ],
    "minerals": [
      "Iron"
    ],
    "allergens": [
      "eggs"
    ],
    "suitabilityEn": "Quail egg is a source of protein and iron. It generally fits vegetarian eating patterns. It contains eggs, so avoid it if you have a related allergy. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "هێلکەی کوێل سەرچاوەیەکی پرۆتین و ئاسنـە. بەگشتی گونجاوە بۆ خواردنی گیاخۆری. پێکهاتەی هێلکە تێدایە، بۆیە ئەگەر ئالەرجیت هەیە خۆت لێ بپارێزە. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Boiled and served as a snack or garnish.",
    "prepKu": "دەکوڵێنرێت و وەک خواردنی سووک یان ڕازاوەکردن خۆراک دەکرێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "tofu",
    "nameEn": "Tofu",
    "nameKu": "تۆفو",
    "category": "proteins",
    "servingSizeEn": "100 g",
    "servingSizeKu": "١٠٠ گرام",
    "caloriesEstimate": 76,
    "protein": 8,
    "carbohydrates": 1.9,
    "fat": 4.8,
    "fiber": 0.3,
    "vitamins": [
      "Vitamin B1"
    ],
    "minerals": [
      "Calcium",
      "Iron"
    ],
    "allergens": [
      "soy"
    ],
    "suitabilityEn": "Tofu is a source of protein and calcium. It generally fits vegan, gluten-free eating patterns. It contains soy, so avoid it if you have a related allergy. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "تۆفو سەرچاوەیەکی پرۆتین و کالسیۆمـە. بەگشتی گونجاوە بۆ خواردنی ڤیگان، بەبێ گلوتن. پێکهاتەی سۆیا تێدایە، بۆیە ئەگەر ئالەرجیت هەیە خۆت لێ بپارێزە. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Pan-fried, grilled, or added to stir-fries and soups.",
    "prepKu": "لە تاوە، لەسەر ئاگر یان لە سواتین و شۆربادا بەکاردێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "tempeh",
    "nameEn": "Tempeh",
    "nameKu": "تمپێ",
    "category": "proteins",
    "servingSizeEn": "100 g",
    "servingSizeKu": "١٠٠ گرام",
    "caloriesEstimate": 192,
    "protein": 20,
    "carbohydrates": 7.6,
    "fat": 11,
    "fiber": 9,
    "vitamins": [
      "Vitamin B2"
    ],
    "minerals": [
      "Manganese"
    ],
    "allergens": [
      "soy"
    ],
    "suitabilityEn": "Tempeh is a source of protein and dietary fiber. It generally fits vegan eating patterns. It contains soy, so avoid it if you have a related allergy. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "تمپێ سەرچاوەیەکی پرۆتین و فایبەری خۆراکیـە. بەگشتی گونجاوە بۆ خواردنی ڤیگان. پێکهاتەی سۆیا تێدایە، بۆیە ئەگەر ئالەرجیت هەیە خۆت لێ بپارێزە. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Sliced and pan-fried or grilled.",
    "prepKu": "پارچە دەکرێت و لە تاوە یان لەسەر ئاگر سرووتاوی دەکرێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "seitan",
    "nameEn": "Seitan",
    "nameKu": "سیتان",
    "category": "proteins",
    "servingSizeEn": "100 g",
    "servingSizeKu": "١٠٠ گرام",
    "caloriesEstimate": 370,
    "protein": 75,
    "carbohydrates": 14,
    "fat": 1.9,
    "fiber": 0.6,
    "vitamins": [
      "Vitamin B2"
    ],
    "minerals": [
      "Selenium"
    ],
    "allergens": [
      "gluten"
    ],
    "suitabilityEn": "Seitan is a source of protein. It generally fits vegan eating patterns. It contains gluten, so avoid it if you have a related allergy. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "سیتان سەرچاوەیەکی پرۆتینـە. بەگشتی گونجاوە بۆ خواردنی ڤیگان. پێکهاتەی گلوتن تێدایە، بۆیە ئەگەر ئالەرجیت هەیە خۆت لێ بپارێزە. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Sliced and grilled or stir-fried as a meat alternative.",
    "prepKu": "پارچە دەکرێت و وەک جێگرەوەی گۆشت لەسەر ئاگر یان سواتین ئامادە دەکرێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "veggie-burger",
    "nameEn": "Veggie burger",
    "nameKu": "بەرگەری ڕووەکی",
    "category": "proteins",
    "servingSizeEn": "100 g",
    "servingSizeKu": "١٠٠ گرام",
    "caloriesEstimate": 155,
    "protein": 14,
    "carbohydrates": 12,
    "fat": 6,
    "fiber": 5,
    "vitamins": [
      "Vitamin B6"
    ],
    "minerals": [
      "Iron"
    ],
    "allergens": [
      "soy"
    ],
    "suitabilityEn": "Veggie burger is a source of protein and dietary fiber. It generally fits vegan eating patterns. It contains soy, so avoid it if you have a related allergy. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "بەرگەری ڕووەکی سەرچاوەیەکی پرۆتین و فایبەری خۆراکیـە. بەگشتی گونجاوە بۆ خواردنی ڤیگان. پێکهاتەی سۆیا تێدایە، بۆیە ئەگەر ئالەرجیت هەیە خۆت لێ بپارێزە. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Pan-fried or grilled patties.",
    "prepKu": "پارچەکانی لە تاوە یان لەسەر ئاگر سرووتاوی دەکرێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "canned-tuna",
    "nameEn": "Canned tuna",
    "nameKu": "کۆنسێرڤی ماسی تۆن",
    "category": "proteins",
    "servingSizeEn": "100 g",
    "servingSizeKu": "١٠٠ گرام",
    "caloriesEstimate": 116,
    "protein": 26,
    "carbohydrates": 0,
    "fat": 0.8,
    "fiber": 0,
    "vitamins": [
      "Vitamin D",
      "Vitamin B12"
    ],
    "minerals": [
      "Selenium"
    ],
    "allergens": [
      "fish"
    ],
    "suitabilityEn": "Canned tuna is a source of protein and selenium. It generally fits pescatarian eating patterns. It contains fish, so avoid it if you have a related allergy. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "کۆنسێرڤی ماسی تۆن سەرچاوەیەکی پرۆتین و سیلینیۆمـە. بەگشتی گونجاوە بۆ خواردنی خواردنی ماسی-گیاخۆری. پێکهاتەی ماسی تێدایە، بۆیە ئەگەر ئالەرجیت هەیە خۆت لێ بپارێزە. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Ready to eat; drained and added to salads or sandwiches.",
    "prepKu": "ئامادەیە بۆ خواردن؛ ئاوەکەی دەکرێتەوە و لە سالاد یان ساندویچ بەکاردێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "beef-jerky",
    "nameEn": "Beef jerky",
    "nameKu": "گۆشتی وشکی گا",
    "category": "proteins",
    "servingSizeEn": "100 g",
    "servingSizeKu": "١٠٠ گرام",
    "caloriesEstimate": 410,
    "protein": 33,
    "carbohydrates": 11,
    "fat": 26,
    "fiber": 0.5,
    "vitamins": [
      "Vitamin B12"
    ],
    "minerals": [
      "Iron",
      "Zinc"
    ],
    "allergens": [],
    "suitabilityEn": "Beef jerky is a source of protein and iron. It generally fits omnivore eating patterns. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "گۆشتی وشکی گا سەرچاوەیەکی پرۆتین و ئاسنـە. بەگشتی گونجاوە بۆ خواردنی زۆربەی خواردنەکان. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Dried, salted meat eaten as a snack.",
    "prepKu": "گۆشتێکی وشکاوی خوێدارە کە وەک خواردنی سووک دەخورێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "beef-liver",
    "nameEn": "Beef liver",
    "nameKu": "جگەری گا",
    "category": "proteins",
    "servingSizeEn": "100 g",
    "servingSizeKu": "١٠٠ گرام",
    "caloriesEstimate": 135,
    "protein": 20,
    "carbohydrates": 3.9,
    "fat": 3.6,
    "fiber": 0,
    "vitamins": [
      "Vitamin A",
      "Vitamin B12"
    ],
    "minerals": [
      "Iron"
    ],
    "allergens": [],
    "suitabilityEn": "Beef liver is a source of protein and iron. It generally fits omnivore eating patterns. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "جگەری گا سەرچاوەیەکی پرۆتین و ئاسنـە. بەگشتی گونجاوە بۆ خواردنی زۆربەی خواردنەکان. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Pan-fried with onions.",
    "prepKu": "لەگەڵ پیاز لە تاوە سرووتاوی دەکرێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "soy-protein-tvp",
    "nameEn": "Soy protein (TVP)",
    "nameKu": "پرۆتینی سۆیا",
    "category": "proteins",
    "servingSizeEn": "100 g",
    "servingSizeKu": "١٠٠ گرام",
    "caloriesEstimate": 330,
    "protein": 52,
    "carbohydrates": 33,
    "fat": 1,
    "fiber": 18,
    "vitamins": [
      "Vitamin B2"
    ],
    "minerals": [
      "Iron"
    ],
    "allergens": [
      "soy"
    ],
    "suitabilityEn": "Soy protein (TVP) is a source of protein and dietary fiber. It generally fits vegan eating patterns. It contains soy, so avoid it if you have a related allergy. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "پرۆتینی سۆیا سەرچاوەیەکی پرۆتین و فایبەری خۆراکیـە. بەگشتی گونجاوە بۆ خواردنی ڤیگان. پێکهاتەی سۆیا تێدایە، بۆیە ئەگەر ئالەرجیت هەیە خۆت لێ بپارێزە. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Rehydrated in water or broth, then used like ground meat.",
    "prepKu": "لە ئاو یان ئاوی گۆشت هەڵدەخرێت، پاشان وەک گۆشتی هاڕاو بەکاردێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "whey-protein-powder",
    "nameEn": "Whey protein powder",
    "nameKu": "پوودری پرۆتینی وەی",
    "category": "proteins",
    "servingSizeEn": "100 g",
    "servingSizeKu": "١٠٠ گرام",
    "caloriesEstimate": 400,
    "protein": 80,
    "carbohydrates": 8,
    "fat": 5,
    "fiber": 0,
    "vitamins": [
      "Vitamin B2"
    ],
    "minerals": [
      "Calcium"
    ],
    "allergens": [
      "dairy"
    ],
    "suitabilityEn": "Whey protein powder is a source of protein and calcium. It generally fits vegetarian eating patterns. It contains dairy, so avoid it if you have a related allergy. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "پوودری پرۆتینی وەی سەرچاوەیەکی پرۆتین و کالسیۆمـە. بەگشتی گونجاوە بۆ خواردنی گیاخۆری. پێکهاتەی شیرەمەنی تێدایە، بۆیە ئەگەر ئالەرجیت هەیە خۆت لێ بپارێزە. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Mixed with water or milk into a drink.",
    "prepKu": "لەگەڵ ئاو یان شیر تێکەڵ دەکرێت بۆ خواردنەوە.",
    "relatedRecipeIds": []
  },
  {
    "id": "anchovy",
    "nameEn": "Anchovy",
    "nameKu": "ماسی ئەنشۆفی",
    "category": "proteins",
    "servingSizeEn": "100 g",
    "servingSizeKu": "١٠٠ گرام",
    "caloriesEstimate": 131,
    "protein": 20,
    "carbohydrates": 0,
    "fat": 4.8,
    "fiber": 0,
    "vitamins": [
      "Vitamin D",
      "Vitamin B12"
    ],
    "minerals": [
      "Calcium",
      "Selenium"
    ],
    "allergens": [
      "fish"
    ],
    "suitabilityEn": "Anchovy is a source of protein and calcium. It generally fits pescatarian eating patterns. It contains fish, so avoid it if you have a related allergy. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "ماسی ئەنشۆفی سەرچاوەیەکی پرۆتین و کالسیۆمـە. بەگشتی گونجاوە بۆ خواردنی خواردنی ماسی-گیاخۆری. پێکهاتەی ماسی تێدایە، بۆیە ئەگەر ئالەرجیت هەیە خۆت لێ بپارێزە. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Cured, grilled, or added to sauces.",
    "prepKu": "تووژاوی، لەسەر ئاگر یان لە سۆسدا بەکاردێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "milk-cow",
    "nameEn": "Cow's milk",
    "nameKu": "شیری مانگا",
    "category": "dairy",
    "servingSizeEn": "1 cup (240 ml)",
    "servingSizeKu": "١ کوپ (٢٤٠ میلیلیتر)",
    "caloriesEstimate": 61,
    "protein": 3.2,
    "carbohydrates": 4.8,
    "fat": 3.3,
    "fiber": 0,
    "vitamins": [
      "Vitamin D",
      "Vitamin B12"
    ],
    "minerals": [
      "Calcium"
    ],
    "allergens": [
      "dairy"
    ],
    "suitabilityEn": "Cow's milk is a source of calcium and protein. It generally fits vegetarian eating patterns. It contains dairy, so avoid it if you have a related allergy. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "شیری مانگا سەرچاوەیەکی کالسیۆم و پرۆتینـە. بەگشتی گونجاوە بۆ خواردنی گیاخۆری. پێکهاتەی شیرەمەنی تێدایە، بۆیە ئەگەر ئالەرجیت هەیە خۆت لێ بپارێزە. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Drunk plain, warmed, or used in cooking and baking.",
    "prepKu": "بە سادەیی، گەرمکراو یان لە چێشتلێنان و نانپژیندا بەکاردێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "plain-yogurt",
    "nameEn": "Plain yogurt",
    "nameKu": "مۆست",
    "category": "dairy",
    "servingSizeEn": "100 g",
    "servingSizeKu": "١٠٠ گرام",
    "caloriesEstimate": 59,
    "protein": 10,
    "carbohydrates": 3.6,
    "fat": 0.4,
    "fiber": 0,
    "vitamins": [
      "Vitamin B12"
    ],
    "minerals": [
      "Calcium"
    ],
    "allergens": [
      "dairy"
    ],
    "suitabilityEn": "Plain yogurt is a source of protein and probiotic cultures. It generally fits vegetarian eating patterns. It contains dairy, so avoid it if you have a related allergy. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "مۆست سەرچاوەیەکی پرۆتین و کولتووری پرۆبایۆتیکـە. بەگشتی گونجاوە بۆ خواردنی گیاخۆری. پێکهاتەی شیرەمەنی تێدایە، بۆیە ئەگەر ئالەرجیت هەیە خۆت لێ بپارێزە. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Eaten plain, with fruit, or used in sauces and marinades.",
    "prepKu": "بە سادەیی، لەگەڵ میوە یان لە سۆس و ترشاوەدا بەکاردێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "ayran-yogurt-drink",
    "nameEn": "Ayran (yogurt drink)",
    "nameKu": "دۆو (ئایران)",
    "category": "dairy",
    "servingSizeEn": "1 cup (240 ml)",
    "servingSizeKu": "١ کوپ (٢٤٠ میلیلیتر)",
    "caloriesEstimate": 40,
    "protein": 2,
    "carbohydrates": 3,
    "fat": 1.5,
    "fiber": 0,
    "vitamins": [
      "Vitamin B12"
    ],
    "minerals": [
      "Calcium"
    ],
    "allergens": [
      "dairy"
    ],
    "suitabilityEn": "Ayran (yogurt drink) is a source of probiotic cultures and calcium. It generally fits vegetarian eating patterns. It contains dairy, so avoid it if you have a related allergy. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "دۆو (ئایران) سەرچاوەیەکی کولتووری پرۆبایۆتیک و کالسیۆمـە. بەگشتی گونجاوە بۆ خواردنی گیاخۆری. پێکهاتەی شیرەمەنی تێدایە، بۆیە ئەگەر ئالەرجیت هەیە خۆت لێ بپارێزە. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Yogurt whisked with water and a pinch of salt, served chilled.",
    "prepKu": "مۆست لەگەڵ ئاو و کەمێک خوێ دەهاڕدرێت و ساردکراو خۆراک دەکرێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "white-cheese",
    "nameEn": "White cheese (Kurdish-style)",
    "nameKu": "پەنیری سپی",
    "category": "dairy",
    "servingSizeEn": "100 g",
    "servingSizeKu": "١٠٠ گرام",
    "caloriesEstimate": 264,
    "protein": 18,
    "carbohydrates": 2,
    "fat": 21,
    "fiber": 0,
    "vitamins": [
      "Vitamin A",
      "Vitamin B12"
    ],
    "minerals": [
      "Calcium"
    ],
    "allergens": [
      "dairy"
    ],
    "suitabilityEn": "White cheese (Kurdish-style) is a source of protein and calcium. It generally fits vegetarian eating patterns. It contains dairy, so avoid it if you have a related allergy. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "پەنیری سپی سەرچاوەیەکی پرۆتین و کالسیۆمـە. بەگشتی گونجاوە بۆ خواردنی گیاخۆری. پێکهاتەی شیرەمەنی تێدایە، بۆیە ئەگەر ئالەرجیت هەیە خۆت لێ بپارێزە. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Sliced for breakfast, or used in pastries and salads.",
    "prepKu": "بۆ خواردنی بەیانی پارچە دەکرێت، یان لە بۆرەک و سالاددا بەکاردێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "feta-cheese",
    "nameEn": "Feta cheese",
    "nameKu": "پەنیری فیتا",
    "category": "dairy",
    "servingSizeEn": "100 g",
    "servingSizeKu": "١٠٠ گرام",
    "caloriesEstimate": 264,
    "protein": 14,
    "carbohydrates": 4,
    "fat": 21,
    "fiber": 0,
    "vitamins": [
      "Vitamin B12"
    ],
    "minerals": [
      "Calcium"
    ],
    "allergens": [
      "dairy"
    ],
    "suitabilityEn": "Feta cheese is a source of calcium and protein. It generally fits vegetarian eating patterns. It contains dairy, so avoid it if you have a related allergy. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "پەنیری فیتا سەرچاوەیەکی کالسیۆم و پرۆتینـە. بەگشتی گونجاوە بۆ خواردنی گیاخۆری. پێکهاتەی شیرەمەنی تێدایە، بۆیە ئەگەر ئالەرجیت هەیە خۆت لێ بپارێزە. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Crumbled over salads or eaten with bread.",
    "prepKu": "وردکراو لەسەر سالاد یان لەگەڵ نان دەخورێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "cheddar-cheese",
    "nameEn": "Cheddar cheese",
    "nameKu": "پەنیری چیدەر",
    "category": "dairy",
    "servingSizeEn": "100 g",
    "servingSizeKu": "١٠٠ گرام",
    "caloriesEstimate": 403,
    "protein": 25,
    "carbohydrates": 1.3,
    "fat": 33,
    "fiber": 0,
    "vitamins": [
      "Vitamin A",
      "Vitamin B12"
    ],
    "minerals": [
      "Calcium"
    ],
    "allergens": [
      "dairy"
    ],
    "suitabilityEn": "Cheddar cheese is a source of calcium and protein. It generally fits vegetarian eating patterns. It contains dairy, so avoid it if you have a related allergy. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "پەنیری چیدەر سەرچاوەیەکی کالسیۆم و پرۆتینـە. بەگشتی گونجاوە بۆ خواردنی گیاخۆری. پێکهاتەی شیرەمەنی تێدایە، بۆیە ئەگەر ئالەرجیت هەیە خۆت لێ بپارێزە. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Sliced for sandwiches or melted into dishes.",
    "prepKu": "بۆ ساندویچ پارچە دەکرێت یان لە خواردنی تر دەتوێنرێتەوە.",
    "relatedRecipeIds": []
  },
  {
    "id": "cottage-cheese",
    "nameEn": "Cottage cheese",
    "nameKu": "پەنیری کۆتیج",
    "category": "dairy",
    "servingSizeEn": "100 g",
    "servingSizeKu": "١٠٠ گرام",
    "caloriesEstimate": 98,
    "protein": 11,
    "carbohydrates": 3.4,
    "fat": 4.3,
    "fiber": 0,
    "vitamins": [
      "Vitamin B12"
    ],
    "minerals": [
      "Calcium"
    ],
    "allergens": [
      "dairy"
    ],
    "suitabilityEn": "Cottage cheese is a source of protein and calcium. It generally fits vegetarian eating patterns. It contains dairy, so avoid it if you have a related allergy. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "پەنیری کۆتیج سەرچاوەیەکی پرۆتین و کالسیۆمـە. بەگشتی گونجاوە بۆ خواردنی گیاخۆری. پێکهاتەی شیرەمەنی تێدایە، بۆیە ئەگەر ئالەرجیت هەیە خۆت لێ بپارێزە. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Eaten plain or mixed with fruit and vegetables.",
    "prepKu": "بە سادەیی دەخورێت یان لەگەڵ میوە و سەوزە تێکەڵ دەکرێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "cream-cheese",
    "nameEn": "Cream cheese",
    "nameKu": "پەنیری کریم",
    "category": "dairy",
    "servingSizeEn": "100 g",
    "servingSizeKu": "١٠٠ گرام",
    "caloriesEstimate": 342,
    "protein": 6,
    "carbohydrates": 4,
    "fat": 34,
    "fiber": 0,
    "vitamins": [
      "Vitamin A"
    ],
    "minerals": [
      "Calcium"
    ],
    "allergens": [
      "dairy"
    ],
    "suitabilityEn": "Cream cheese is a source of calcium. It generally fits vegetarian eating patterns. It contains dairy, so avoid it if you have a related allergy. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "پەنیری کریم سەرچاوەیەکی کالسیۆمـە. بەگشتی گونجاوە بۆ خواردنی گیاخۆری. پێکهاتەی شیرەمەنی تێدایە، بۆیە ئەگەر ئالەرجیت هەیە خۆت لێ بپارێزە. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Spread on bread or used in dips and desserts.",
    "prepKu": "لەسەر نان دەخرێت یان لە خۆراکی هەڵمژین و شیرینیدا بەکاردێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "labneh",
    "nameEn": "Labneh",
    "nameKu": "لەبنە",
    "category": "dairy",
    "servingSizeEn": "100 g",
    "servingSizeKu": "١٠٠ گرام",
    "caloriesEstimate": 150,
    "protein": 8,
    "carbohydrates": 4,
    "fat": 11,
    "fiber": 0,
    "vitamins": [
      "Vitamin B12"
    ],
    "minerals": [
      "Calcium"
    ],
    "allergens": [
      "dairy"
    ],
    "suitabilityEn": "Labneh is a source of probiotic cultures and calcium. It generally fits vegetarian eating patterns. It contains dairy, so avoid it if you have a related allergy. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "لەبنە سەرچاوەیەکی کولتووری پرۆبایۆتیک و کالسیۆمـە. بەگشتی گونجاوە بۆ خواردنی گیاخۆری. پێکهاتەی شیرەمەنی تێدایە، بۆیە ئەگەر ئالەرجیت هەیە خۆت لێ بپارێزە. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Strained yogurt spread with olive oil for breakfast.",
    "prepKu": "مۆستێکی ئاوکراوەیە کە لەگەڵ ڕۆنی زەیتوون بۆ بەیانیان خۆراک دەکرێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "butter",
    "nameEn": "Butter",
    "nameKu": "کەرە",
    "category": "dairy",
    "servingSizeEn": "1 tbsp (14 g)",
    "servingSizeKu": "١ کەوچک (١٤ گرام)",
    "caloriesEstimate": 717,
    "protein": 0.9,
    "carbohydrates": 0.1,
    "fat": 81,
    "fiber": 0,
    "vitamins": [
      "Vitamin A",
      "Vitamin D"
    ],
    "minerals": [],
    "allergens": [
      "dairy"
    ],
    "suitabilityEn": "Butter is a source of concentrated energy (calories). It generally fits vegetarian eating patterns. It contains dairy, so avoid it if you have a related allergy. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "کەرە سەرچاوەیەکی وزەی چڕ (کالۆری)ـە. بەگشتی گونجاوە بۆ خواردنی گیاخۆری. پێکهاتەی شیرەمەنی تێدایە، بۆیە ئەگەر ئالەرجیت هەیە خۆت لێ بپارێزە. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Spread on bread or used for cooking and baking, best in moderation.",
    "prepKu": "لەسەر نان دەخرێت یان بۆ چێشتلێنان بەکاردێت، باشترە بەئەندازە بەکاربهێنرێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "ghee",
    "nameEn": "Ghee (clarified butter)",
    "nameKu": "ڕۆنی زەرد (دوون)",
    "category": "dairy",
    "servingSizeEn": "1 tbsp (14 g)",
    "servingSizeKu": "١ کەوچک (١٤ گرام)",
    "caloriesEstimate": 900,
    "protein": 0,
    "carbohydrates": 0,
    "fat": 100,
    "fiber": 0,
    "vitamins": [
      "Vitamin A"
    ],
    "minerals": [],
    "allergens": [
      "dairy"
    ],
    "suitabilityEn": "Ghee (clarified butter) is a source of concentrated energy (calories). It generally fits vegetarian eating patterns. It contains dairy, so avoid it if you have a related allergy. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "ڕۆنی زەرد (دوون) سەرچاوەیەکی وزەی چڕ (کالۆری)ـە. بەگشتی گونجاوە بۆ خواردنی گیاخۆری. پێکهاتەی شیرەمەنی تێدایە، بۆیە ئەگەر ئالەرجیت هەیە خۆت لێ بپارێزە. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Used for frying and flavoring rice and pastries, best in moderation.",
    "prepKu": "بۆ سرووتاوکردن و تامدانی برنج و بۆرەک بەکاردێت، باشترە بەئەندازە بەکاربهێنرێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "kaymak-clotted-cream",
    "nameEn": "Kaymak (clotted cream)",
    "nameKu": "قەیماق",
    "category": "dairy",
    "servingSizeEn": "2 tbsp (30 g)",
    "servingSizeKu": "٢ کەوچک (٣٠ گرام)",
    "caloriesEstimate": 586,
    "protein": 3,
    "carbohydrates": 2,
    "fat": 62,
    "fiber": 0,
    "vitamins": [
      "Vitamin A"
    ],
    "minerals": [
      "Calcium"
    ],
    "allergens": [
      "dairy"
    ],
    "suitabilityEn": "Kaymak (clotted cream) is a source of concentrated energy (calories). It generally fits vegetarian eating patterns. It contains dairy, so avoid it if you have a related allergy. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "قەیماق سەرچاوەیەکی وزەی چڕ (کالۆری)ـە. بەگشتی گونجاوە بۆ خواردنی گیاخۆری. پێکهاتەی شیرەمەنی تێدایە، بۆیە ئەگەر ئالەرجیت هەیە خۆت لێ بپارێزە. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Served with honey and bread for breakfast.",
    "prepKu": "لەگەڵ هەنگوین و نان بۆ خواردنی بەیانیان خۆراک دەکرێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "milk-powder",
    "nameEn": "Milk powder",
    "nameKu": "شیری تۆزاوی",
    "category": "dairy",
    "servingSizeEn": "100 g",
    "servingSizeKu": "١٠٠ گرام",
    "caloriesEstimate": 496,
    "protein": 26,
    "carbohydrates": 38,
    "fat": 26,
    "fiber": 0,
    "vitamins": [
      "Vitamin D",
      "Vitamin B12"
    ],
    "minerals": [
      "Calcium"
    ],
    "allergens": [
      "dairy"
    ],
    "suitabilityEn": "Milk powder is a source of calcium and protein. It generally fits vegetarian eating patterns. It contains dairy, so avoid it if you have a related allergy. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "شیری تۆزاوی سەرچاوەیەکی کالسیۆم و پرۆتینـە. بەگشتی گونجاوە بۆ خواردنی گیاخۆری. پێکهاتەی شیرەمەنی تێدایە، بۆیە ئەگەر ئالەرجیت هەیە خۆت لێ بپارێزە. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Reconstituted with water or used in baking.",
    "prepKu": "لەگەڵ ئاو تێکەڵ دەکرێت یان لە نانپژیندا بەکاردێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "soy-milk",
    "nameEn": "Soy milk",
    "nameKu": "شیری سۆیا",
    "category": "dairy",
    "servingSizeEn": "1 cup (240 ml)",
    "servingSizeKu": "١ کوپ (٢٤٠ میلیلیتر)",
    "caloriesEstimate": 33,
    "protein": 3.3,
    "carbohydrates": 1.8,
    "fat": 1.8,
    "fiber": 0.6,
    "vitamins": [
      "Vitamin B12",
      "Vitamin D"
    ],
    "minerals": [
      "Calcium"
    ],
    "allergens": [
      "soy"
    ],
    "suitabilityEn": "Soy milk is a source of protein and calcium. It generally fits vegan eating patterns. It contains soy, so avoid it if you have a related allergy. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "شیری سۆیا سەرچاوەیەکی پرۆتین و کالسیۆمـە. بەگشتی گونجاوە بۆ خواردنی ڤیگان. پێکهاتەی سۆیا تێدایە، بۆیە ئەگەر ئالەرجیت هەیە خۆت لێ بپارێزە. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Drunk plain or used as a dairy alternative in recipes.",
    "prepKu": "بە سادەیی خۆراک دەکرێت یان وەک جێگرەوەی شیرەمەنی لە چێشتلێناندا بەکاردێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "almond-milk",
    "nameEn": "Almond milk",
    "nameKu": "شیری بادەم",
    "category": "dairy",
    "servingSizeEn": "1 cup (240 ml)",
    "servingSizeKu": "١ کوپ (٢٤٠ میلیلیتر)",
    "caloriesEstimate": 17,
    "protein": 0.6,
    "carbohydrates": 0.6,
    "fat": 1.2,
    "fiber": 0.3,
    "vitamins": [
      "Vitamin E",
      "Vitamin D"
    ],
    "minerals": [
      "Calcium"
    ],
    "allergens": [
      "tree nuts"
    ],
    "suitabilityEn": "Almond milk is a source of vitamin E and calcium. It generally fits vegan eating patterns. It contains tree nuts, so avoid it if you have a related allergy. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "شیری بادەم سەرچاوەیەکی ڤیتامین E و کالسیۆمـە. بەگشتی گونجاوە بۆ خواردنی ڤیگان. پێکهاتەی گوێزی دار تێدایە، بۆیە ئەگەر ئالەرجیت هەیە خۆت لێ بپارێزە. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Drunk plain or used in smoothies and cereal.",
    "prepKu": "بە سادەیی خۆراک دەکرێت یان لە سمووثی و سیریالدا بەکاردێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "apple",
    "nameEn": "Apple",
    "nameKu": "سێو",
    "category": "fruits",
    "servingSizeEn": "1 medium (180 g)",
    "servingSizeKu": "١ ناوەند (١٨٠ گرام)",
    "caloriesEstimate": 52,
    "protein": 0.3,
    "carbohydrates": 14,
    "fat": 0.2,
    "fiber": 2.4,
    "vitamins": [
      "Vitamin C"
    ],
    "minerals": [
      "Potassium"
    ],
    "allergens": [],
    "suitabilityEn": "Apple is a source of dietary fiber and vitamin C. It generally fits vegan, gluten-free eating patterns. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "سێو سەرچاوەیەکی فایبەری خۆراکی و ڤیتامین Cـە. بەگشتی گونجاوە بۆ خواردنی ڤیگان، بەبێ گلوتن. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Eaten raw, sliced into salads, or baked.",
    "prepKu": "چێو دەخورێت، بۆ سالاد پارچە دەکرێت یان لە فرن ئامادە دەکرێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "banana",
    "nameEn": "Banana",
    "nameKu": "مۆز",
    "category": "fruits",
    "servingSizeEn": "1 medium (120 g)",
    "servingSizeKu": "١ ناوەند (١٢٠ گرام)",
    "caloriesEstimate": 89,
    "protein": 1.1,
    "carbohydrates": 23,
    "fat": 0.3,
    "fiber": 2.6,
    "vitamins": [
      "Vitamin C",
      "Vitamin B6"
    ],
    "minerals": [
      "Potassium"
    ],
    "allergens": [],
    "suitabilityEn": "Banana is a source of potassium and B vitamins. It generally fits vegan, gluten-free eating patterns. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "مۆز سەرچاوەیەکی پۆتاسیۆم و ڤیتامینەکانی Bـە. بەگشتی گونجاوە بۆ خواردنی ڤیگان، بەبێ گلوتن. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Eaten raw or blended into smoothies.",
    "prepKu": "چێو دەخورێت یان لە سمووثیدا دەهاڕدرێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "orange",
    "nameEn": "Orange",
    "nameKu": "پرتەقاڵ",
    "category": "fruits",
    "servingSizeEn": "100 g",
    "servingSizeKu": "١٠٠ گرام",
    "caloriesEstimate": 47,
    "protein": 0.9,
    "carbohydrates": 12,
    "fat": 0.1,
    "fiber": 2.4,
    "vitamins": [
      "Vitamin C"
    ],
    "minerals": [
      "Potassium"
    ],
    "allergens": [],
    "suitabilityEn": "Orange is a source of vitamin C and dietary fiber. It generally fits vegan, gluten-free eating patterns. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "پرتەقاڵ سەرچاوەیەکی ڤیتامین C و فایبەری خۆراکیـە. بەگشتی گونجاوە بۆ خواردنی ڤیگان، بەبێ گلوتن. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Eaten fresh or juiced.",
    "prepKu": "چێو دەخورێت یان ئاوی لێ دەگیرێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "mandarin",
    "nameEn": "Mandarin",
    "nameKu": "نارنگی",
    "category": "fruits",
    "servingSizeEn": "100 g",
    "servingSizeKu": "١٠٠ گرام",
    "caloriesEstimate": 53,
    "protein": 0.8,
    "carbohydrates": 13,
    "fat": 0.3,
    "fiber": 1.8,
    "vitamins": [
      "Vitamin C",
      "Vitamin A"
    ],
    "minerals": [
      "Potassium"
    ],
    "allergens": [],
    "suitabilityEn": "Mandarin is a source of vitamin C. It generally fits vegan, gluten-free eating patterns. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "نارنگی سەرچاوەیەکی ڤیتامین Cـە. بەگشتی گونجاوە بۆ خواردنی ڤیگان، بەبێ گلوتن. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Peeled and eaten fresh.",
    "prepKu": "توێکل دەکرێت و چێو دەخورێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "grapefruit",
    "nameEn": "Grapefruit",
    "nameKu": "گرێپفروت",
    "category": "fruits",
    "servingSizeEn": "100 g",
    "servingSizeKu": "١٠٠ گرام",
    "caloriesEstimate": 42,
    "protein": 0.8,
    "carbohydrates": 11,
    "fat": 0.1,
    "fiber": 1.6,
    "vitamins": [
      "Vitamin C",
      "Vitamin A"
    ],
    "minerals": [
      "Potassium"
    ],
    "allergens": [],
    "suitabilityEn": "Grapefruit is a source of vitamin C and antioxidants. It generally fits vegan, gluten-free eating patterns. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "گرێپفروت سەرچاوەیەکی ڤیتامین C و دژە ئۆکسیدانتـە. بەگشتی گونجاوە بۆ خواردنی ڤیگان، بەبێ گلوتن. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Eaten fresh, often halved and spooned.",
    "prepKu": "چێو دەخورێت، زۆرجار دووبەش دەکرێت و بە کەوچک دەخورێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "lemon",
    "nameEn": "Lemon",
    "nameKu": "لیمۆ",
    "category": "fruits",
    "servingSizeEn": "1 fruit (60 g)",
    "servingSizeKu": "١ دانە (٦٠ گرام)",
    "caloriesEstimate": 29,
    "protein": 1.1,
    "carbohydrates": 9,
    "fat": 0.3,
    "fiber": 2.8,
    "vitamins": [
      "Vitamin C"
    ],
    "minerals": [
      "Potassium"
    ],
    "allergens": [],
    "suitabilityEn": "Lemon is a source of vitamin C. It generally fits vegan, gluten-free eating patterns. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "لیمۆ سەرچاوەیەکی ڤیتامین Cـە. بەگشتی گونجاوە بۆ خواردنی ڤیگان، بەبێ گلوتن. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Juiced over salads, fish, and cooked dishes.",
    "prepKu": "ئاوی لێ دەگیرێت و لەسەر سالاد، ماسی و خواردن دەکرێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "lime",
    "nameEn": "Lime",
    "nameKu": "لایم",
    "category": "fruits",
    "servingSizeEn": "1 fruit (67 g)",
    "servingSizeKu": "١ دانە (٦٧ گرام)",
    "caloriesEstimate": 30,
    "protein": 0.7,
    "carbohydrates": 11,
    "fat": 0.2,
    "fiber": 2.8,
    "vitamins": [
      "Vitamin C"
    ],
    "minerals": [
      "Potassium"
    ],
    "allergens": [],
    "suitabilityEn": "Lime is a source of vitamin C. It generally fits vegan, gluten-free eating patterns. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "لایم سەرچاوەیەکی ڤیتامین Cـە. بەگشتی گونجاوە بۆ خواردنی ڤیگان، بەبێ گلوتن. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Juiced into drinks and dressings.",
    "prepKu": "ئاوی لێ دەگیرێت و لە خواردنەوە و سۆسدا بەکاردێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "grapes",
    "nameEn": "Grapes",
    "nameKu": "ترێ",
    "category": "fruits",
    "servingSizeEn": "100 g",
    "servingSizeKu": "١٠٠ گرام",
    "caloriesEstimate": 69,
    "protein": 0.7,
    "carbohydrates": 18,
    "fat": 0.2,
    "fiber": 0.9,
    "vitamins": [
      "Vitamin C",
      "Vitamin K"
    ],
    "minerals": [
      "Potassium"
    ],
    "allergens": [],
    "suitabilityEn": "Grapes is a source of antioxidants and vitamin C. It generally fits vegan, gluten-free eating patterns. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "ترێ سەرچاوەیەکی دژە ئۆکسیدانت و ڤیتامین Cـە. بەگشتی گونجاوە بۆ خواردنی ڤیگان، بەبێ گلوتن. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Eaten fresh, dried into raisins, or frozen as a snack.",
    "prepKu": "چێو دەخورێت، وشک دەکرێت بۆ کشمیش یان بەستراو وەک خواردنی سووک.",
    "relatedRecipeIds": []
  },
  {
    "id": "watermelon",
    "nameEn": "Watermelon",
    "nameKu": "شووتی",
    "category": "fruits",
    "servingSizeEn": "100 g",
    "servingSizeKu": "١٠٠ گرام",
    "caloriesEstimate": 30,
    "protein": 0.6,
    "carbohydrates": 8,
    "fat": 0.2,
    "fiber": 0.4,
    "vitamins": [
      "Vitamin C",
      "Vitamin A"
    ],
    "minerals": [
      "Potassium"
    ],
    "allergens": [],
    "suitabilityEn": "Watermelon is a source of water content and vitamin C. It generally fits vegan, gluten-free eating patterns. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "شووتی سەرچاوەیەکی پێکهاتەی ئاو و ڤیتامین Cـە. بەگشتی گونجاوە بۆ خواردنی ڤیگان، بەبێ گلوتن. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Eaten fresh and chilled, sliced into wedges.",
    "prepKu": "ساردکراو چێو دەخورێت، بە پارچە دابەش دەکرێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "cantaloupe-melon",
    "nameEn": "Cantaloupe melon",
    "nameKu": "شەمامە",
    "category": "fruits",
    "servingSizeEn": "100 g",
    "servingSizeKu": "١٠٠ گرام",
    "caloriesEstimate": 34,
    "protein": 0.8,
    "carbohydrates": 8,
    "fat": 0.2,
    "fiber": 0.9,
    "vitamins": [
      "Vitamin A",
      "Vitamin C"
    ],
    "minerals": [
      "Potassium"
    ],
    "allergens": [],
    "suitabilityEn": "Cantaloupe melon is a source of vitamin A and vitamin C. It generally fits vegan, gluten-free eating patterns. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "شەمامە سەرچاوەیەکی ڤیتامین A و ڤیتامین Cـە. بەگشتی گونجاوە بۆ خواردنی ڤیگان، بەبێ گلوتن. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Eaten fresh and chilled.",
    "prepKu": "ساردکراو چێو دەخورێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "pomegranate",
    "nameEn": "Pomegranate",
    "nameKu": "هەنار",
    "category": "fruits",
    "servingSizeEn": "100 g",
    "servingSizeKu": "١٠٠ گرام",
    "caloriesEstimate": 83,
    "protein": 1.7,
    "carbohydrates": 19,
    "fat": 1.2,
    "fiber": 4,
    "vitamins": [
      "Vitamin C",
      "Vitamin K"
    ],
    "minerals": [
      "Potassium"
    ],
    "allergens": [],
    "suitabilityEn": "Pomegranate is a source of antioxidants and dietary fiber. It generally fits vegan, gluten-free eating patterns. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "هەنار سەرچاوەیەکی دژە ئۆکسیدانت و فایبەری خۆراکیـە. بەگشتی گونجاوە بۆ خواردنی ڤیگان، بەبێ گلوتن. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Seeds eaten fresh or the juice used in sauces.",
    "prepKu": "تۆوەکانی چێو دەخورێن یان ئاوەکەی لە سۆسدا بەکاردێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "dates",
    "nameEn": "Dates",
    "nameKu": "خورما",
    "category": "fruits",
    "servingSizeEn": "3 dates (30 g)",
    "servingSizeKu": "٣ دانە (٣٠ گرام)",
    "caloriesEstimate": 277,
    "protein": 1.8,
    "carbohydrates": 75,
    "fat": 0.2,
    "fiber": 6.7,
    "vitamins": [
      "Vitamin B6"
    ],
    "minerals": [
      "Potassium",
      "Magnesium"
    ],
    "allergens": [],
    "suitabilityEn": "Dates is a source of dietary fiber and potassium. It generally fits vegan, gluten-free eating patterns. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "خورما سەرچاوەیەکی فایبەری خۆراکی و پۆتاسیۆمـە. بەگشتی گونجاوە بۆ خواردنی ڤیگان، بەبێ گلوتن. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Eaten as a snack, stuffed with nuts, or used to sweeten dishes.",
    "prepKu": "وەک خواردنی سووک دەخورێت، بە گوێز پڕ دەکرێت یان بۆ شیرینکردنی خواردن بەکاردێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "figs",
    "nameEn": "Figs",
    "nameKu": "هەنجیر",
    "category": "fruits",
    "servingSizeEn": "100 g",
    "servingSizeKu": "١٠٠ گرام",
    "caloriesEstimate": 74,
    "protein": 0.8,
    "carbohydrates": 19,
    "fat": 0.3,
    "fiber": 2.9,
    "vitamins": [
      "Vitamin K",
      "Vitamin B6"
    ],
    "minerals": [
      "Potassium",
      "Calcium"
    ],
    "allergens": [],
    "suitabilityEn": "Figs is a source of dietary fiber and calcium. It generally fits vegan, gluten-free eating patterns. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "هەنجیر سەرچاوەیەکی فایبەری خۆراکی و کالسیۆمـە. بەگشتی گونجاوە بۆ خواردنی ڤیگان، بەبێ گلوتن. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Eaten fresh or dried as a snack.",
    "prepKu": "چێو دەخورێت یان وشکاوی وەک خواردنی سووک دەخورێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "apricot",
    "nameEn": "Apricot",
    "nameKu": "قەیسی",
    "category": "fruits",
    "servingSizeEn": "100 g",
    "servingSizeKu": "١٠٠ گرام",
    "caloriesEstimate": 48,
    "protein": 1.4,
    "carbohydrates": 11,
    "fat": 0.4,
    "fiber": 2,
    "vitamins": [
      "Vitamin A",
      "Vitamin C"
    ],
    "minerals": [
      "Potassium"
    ],
    "allergens": [],
    "suitabilityEn": "Apricot is a source of vitamin A and dietary fiber. It generally fits vegan, gluten-free eating patterns. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "قەیسی سەرچاوەیەکی ڤیتامین A و فایبەری خۆراکیـە. بەگشتی گونجاوە بۆ خواردنی ڤیگان، بەبێ گلوتن. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Eaten fresh, dried, or cooked into jams.",
    "prepKu": "چێو، وشکاوی یان کوڵاوی بۆ مۆم بەکاردێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "peach",
    "nameEn": "Peach",
    "nameKu": "شەفتاڵو",
    "category": "fruits",
    "servingSizeEn": "100 g",
    "servingSizeKu": "١٠٠ گرام",
    "caloriesEstimate": 39,
    "protein": 0.9,
    "carbohydrates": 10,
    "fat": 0.3,
    "fiber": 1.5,
    "vitamins": [
      "Vitamin C",
      "Vitamin A"
    ],
    "minerals": [
      "Potassium"
    ],
    "allergens": [],
    "suitabilityEn": "Peach is a source of vitamin C. It generally fits vegan, gluten-free eating patterns. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "شەفتاڵو سەرچاوەیەکی ڤیتامین Cـە. بەگشتی گونجاوە بۆ خواردنی ڤیگان، بەبێ گلوتن. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Eaten fresh or grilled.",
    "prepKu": "چێو دەخورێت یان لەسەر ئاگر دەبرژێنرێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "plum",
    "nameEn": "Plum",
    "nameKu": "ئەڵووچە",
    "category": "fruits",
    "servingSizeEn": "100 g",
    "servingSizeKu": "١٠٠ گرام",
    "caloriesEstimate": 46,
    "protein": 0.7,
    "carbohydrates": 11,
    "fat": 0.3,
    "fiber": 1.4,
    "vitamins": [
      "Vitamin C",
      "Vitamin K"
    ],
    "minerals": [
      "Potassium"
    ],
    "allergens": [],
    "suitabilityEn": "Plum is a source of vitamin C and antioxidants. It generally fits vegan, gluten-free eating patterns. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "ئەڵووچە سەرچاوەیەکی ڤیتامین C و دژە ئۆکسیدانتـە. بەگشتی گونجاوە بۆ خواردنی ڤیگان، بەبێ گلوتن. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Eaten fresh or stewed.",
    "prepKu": "چێو دەخورێت یان کوڵاو دەکرێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "cherry",
    "nameEn": "Cherry",
    "nameKu": "گێلاس",
    "category": "fruits",
    "servingSizeEn": "100 g",
    "servingSizeKu": "١٠٠ گرام",
    "caloriesEstimate": 63,
    "protein": 1.1,
    "carbohydrates": 16,
    "fat": 0.2,
    "fiber": 2.1,
    "vitamins": [
      "Vitamin C"
    ],
    "minerals": [
      "Potassium"
    ],
    "allergens": [],
    "suitabilityEn": "Cherry is a source of antioxidants and vitamin C. It generally fits vegan, gluten-free eating patterns. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "گێلاس سەرچاوەیەکی دژە ئۆکسیدانت و ڤیتامین Cـە. بەگشتی گونجاوە بۆ خواردنی ڤیگان، بەبێ گلوتن. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Eaten fresh as a snack.",
    "prepKu": "وەک خواردنی سووک چێو دەخورێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "strawberry",
    "nameEn": "Strawberry",
    "nameKu": "تووی فرەنگی",
    "category": "fruits",
    "servingSizeEn": "100 g",
    "servingSizeKu": "١٠٠ گرام",
    "caloriesEstimate": 32,
    "protein": 0.7,
    "carbohydrates": 7.7,
    "fat": 0.3,
    "fiber": 2,
    "vitamins": [
      "Vitamin C"
    ],
    "minerals": [
      "Manganese"
    ],
    "allergens": [],
    "suitabilityEn": "Strawberry is a source of vitamin C and dietary fiber. It generally fits vegan, gluten-free eating patterns. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "تووی فرەنگی سەرچاوەیەکی ڤیتامین C و فایبەری خۆراکیـە. بەگشتی گونجاوە بۆ خواردنی ڤیگان، بەبێ گلوتن. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Eaten fresh, in salads, or blended into smoothies.",
    "prepKu": "چێو دەخورێت، لە سالاد یان سمووثیدا بەکاردێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "blueberry",
    "nameEn": "Blueberry",
    "nameKu": "بلوبێری",
    "category": "fruits",
    "servingSizeEn": "100 g",
    "servingSizeKu": "١٠٠ گرام",
    "caloriesEstimate": 57,
    "protein": 0.7,
    "carbohydrates": 14,
    "fat": 0.3,
    "fiber": 2.4,
    "vitamins": [
      "Vitamin C",
      "Vitamin K"
    ],
    "minerals": [
      "Manganese"
    ],
    "allergens": [],
    "suitabilityEn": "Blueberry is a source of antioxidants and dietary fiber. It generally fits vegan, gluten-free eating patterns. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "بلوبێری سەرچاوەیەکی دژە ئۆکسیدانت و فایبەری خۆراکیـە. بەگشتی گونجاوە بۆ خواردنی ڤیگان، بەبێ گلوتن. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Eaten fresh or added to yogurt and oats.",
    "prepKu": "چێو دەخورێت یان لەگەڵ مۆست و یوڵاف بەکاردێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "raspberry",
    "nameEn": "Raspberry",
    "nameKu": "ڕاسبێری",
    "category": "fruits",
    "servingSizeEn": "100 g",
    "servingSizeKu": "١٠٠ گرام",
    "caloriesEstimate": 52,
    "protein": 1.2,
    "carbohydrates": 12,
    "fat": 0.7,
    "fiber": 6.5,
    "vitamins": [
      "Vitamin C"
    ],
    "minerals": [
      "Manganese"
    ],
    "allergens": [],
    "suitabilityEn": "Raspberry is a source of dietary fiber and vitamin C. It generally fits vegan, gluten-free eating patterns. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "ڕاسبێری سەرچاوەیەکی فایبەری خۆراکی و ڤیتامین Cـە. بەگشتی گونجاوە بۆ خواردنی ڤیگان، بەبێ گلوتن. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Eaten fresh or in desserts.",
    "prepKu": "چێو دەخورێت یان لە شیرینیدا بەکاردێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "blackberry",
    "nameEn": "Blackberry",
    "nameKu": "بلاک بێری",
    "category": "fruits",
    "servingSizeEn": "100 g",
    "servingSizeKu": "١٠٠ گرام",
    "caloriesEstimate": 43,
    "protein": 1.4,
    "carbohydrates": 10,
    "fat": 0.5,
    "fiber": 5.3,
    "vitamins": [
      "Vitamin C",
      "Vitamin K"
    ],
    "minerals": [
      "Manganese"
    ],
    "allergens": [],
    "suitabilityEn": "Blackberry is a source of dietary fiber and antioxidants. It generally fits vegan, gluten-free eating patterns. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "بلاک بێری سەرچاوەیەکی فایبەری خۆراکی و دژە ئۆکسیدانتـە. بەگشتی گونجاوە بۆ خواردنی ڤیگان، بەبێ گلوتن. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Eaten fresh or in desserts.",
    "prepKu": "چێو دەخورێت یان لە شیرینیدا بەکاردێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "mulberry",
    "nameEn": "Mulberry",
    "nameKu": "تو",
    "category": "fruits",
    "servingSizeEn": "100 g",
    "servingSizeKu": "١٠٠ گرام",
    "caloriesEstimate": 43,
    "protein": 1.4,
    "carbohydrates": 10,
    "fat": 0.4,
    "fiber": 1.7,
    "vitamins": [
      "Vitamin C",
      "Vitamin K"
    ],
    "minerals": [
      "Iron"
    ],
    "allergens": [],
    "suitabilityEn": "Mulberry is a source of vitamin C and iron. It generally fits vegan, gluten-free eating patterns. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "تو سەرچاوەیەکی ڤیتامین C و ئاسنـە. بەگشتی گونجاوە بۆ خواردنی ڤیگان، بەبێ گلوتن. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Eaten fresh or dried as a snack.",
    "prepKu": "چێو یان وشکاوی وەک خواردنی سووک دەخورێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "pear",
    "nameEn": "Pear",
    "nameKu": "هەرمێ",
    "category": "fruits",
    "servingSizeEn": "100 g",
    "servingSizeKu": "١٠٠ گرام",
    "caloriesEstimate": 57,
    "protein": 0.4,
    "carbohydrates": 15,
    "fat": 0.1,
    "fiber": 3.1,
    "vitamins": [
      "Vitamin C",
      "Vitamin K"
    ],
    "minerals": [
      "Potassium"
    ],
    "allergens": [],
    "suitabilityEn": "Pear is a source of dietary fiber. It generally fits vegan, gluten-free eating patterns. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "هەرمێ سەرچاوەیەکی فایبەری خۆراکیـە. بەگشتی گونجاوە بۆ خواردنی ڤیگان، بەبێ گلوتن. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Eaten fresh or poached in desserts.",
    "prepKu": "چێو دەخورێت یان لە شیرینیدا کوڵاو دەکرێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "quince",
    "nameEn": "Quince",
    "nameKu": "بەهی",
    "category": "fruits",
    "servingSizeEn": "100 g",
    "servingSizeKu": "١٠٠ گرام",
    "caloriesEstimate": 57,
    "protein": 0.4,
    "carbohydrates": 15,
    "fat": 0.1,
    "fiber": 1.9,
    "vitamins": [
      "Vitamin C"
    ],
    "minerals": [
      "Potassium"
    ],
    "allergens": [],
    "suitabilityEn": "Quince is a source of vitamin C and dietary fiber. It generally fits vegan, gluten-free eating patterns. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "بەهی سەرچاوەیەکی ڤیتامین C و فایبەری خۆراکیـە. بەگشتی گونجاوە بۆ خواردنی ڤیگان، بەبێ گلوتن. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Usually cooked into stews, jams, or desserts.",
    "prepKu": "زۆرجار لە خواردنی کوڵاو، مۆم یان شیرینیدا دەکوڵێنرێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "mango",
    "nameEn": "Mango",
    "nameKu": "مانگۆ",
    "category": "fruits",
    "servingSizeEn": "100 g",
    "servingSizeKu": "١٠٠ گرام",
    "caloriesEstimate": 60,
    "protein": 0.8,
    "carbohydrates": 15,
    "fat": 0.4,
    "fiber": 1.6,
    "vitamins": [
      "Vitamin C",
      "Vitamin A"
    ],
    "minerals": [
      "Potassium"
    ],
    "allergens": [],
    "suitabilityEn": "Mango is a source of vitamin A and vitamin C. It generally fits vegan, gluten-free eating patterns. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "مانگۆ سەرچاوەیەکی ڤیتامین A و ڤیتامین Cـە. بەگشتی گونجاوە بۆ خواردنی ڤیگان، بەبێ گلوتن. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Eaten fresh or blended into juices.",
    "prepKu": "چێو دەخورێت یان لە خواردنەوەدا دەهاڕدرێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "pineapple",
    "nameEn": "Pineapple",
    "nameKu": "ئەناناس",
    "category": "fruits",
    "servingSizeEn": "100 g",
    "servingSizeKu": "١٠٠ گرام",
    "caloriesEstimate": 50,
    "protein": 0.5,
    "carbohydrates": 13,
    "fat": 0.1,
    "fiber": 1.4,
    "vitamins": [
      "Vitamin C"
    ],
    "minerals": [
      "Manganese"
    ],
    "allergens": [],
    "suitabilityEn": "Pineapple is a source of vitamin C. It generally fits vegan, gluten-free eating patterns. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "ئەناناس سەرچاوەیەکی ڤیتامین Cـە. بەگشتی گونجاوە بۆ خواردنی ڤیگان، بەبێ گلوتن. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Eaten fresh, grilled, or juiced.",
    "prepKu": "چێو، لەسەر ئاگر برژاو یان بە ئاوی خۆراک دەکرێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "kiwi",
    "nameEn": "Kiwi",
    "nameKu": "کیوی",
    "category": "fruits",
    "servingSizeEn": "100 g",
    "servingSizeKu": "١٠٠ گرام",
    "caloriesEstimate": 61,
    "protein": 1.1,
    "carbohydrates": 15,
    "fat": 0.5,
    "fiber": 3,
    "vitamins": [
      "Vitamin C",
      "Vitamin K"
    ],
    "minerals": [
      "Potassium"
    ],
    "allergens": [],
    "suitabilityEn": "Kiwi is a source of vitamin C and dietary fiber. It generally fits vegan, gluten-free eating patterns. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "کیوی سەرچاوەیەکی ڤیتامین C و فایبەری خۆراکیـە. بەگشتی گونجاوە بۆ خواردنی ڤیگان، بەبێ گلوتن. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Peeled and eaten fresh.",
    "prepKu": "توێکل دەکرێت و چێو دەخورێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "papaya",
    "nameEn": "Papaya",
    "nameKu": "پاپایا",
    "category": "fruits",
    "servingSizeEn": "100 g",
    "servingSizeKu": "١٠٠ گرام",
    "caloriesEstimate": 43,
    "protein": 0.5,
    "carbohydrates": 11,
    "fat": 0.3,
    "fiber": 1.7,
    "vitamins": [
      "Vitamin C",
      "Vitamin A"
    ],
    "minerals": [
      "Potassium"
    ],
    "allergens": [],
    "suitabilityEn": "Papaya is a source of vitamin C and vitamin A. It generally fits vegan, gluten-free eating patterns. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "پاپایا سەرچاوەیەکی ڤیتامین C و ڤیتامین Aـە. بەگشتی گونجاوە بۆ خواردنی ڤیگان، بەبێ گلوتن. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Eaten fresh, often with a squeeze of lime.",
    "prepKu": "چێو دەخورێت، زۆرجار لەگەڵ کەمێک لایم.",
    "relatedRecipeIds": []
  },
  {
    "id": "avocado",
    "nameEn": "Avocado",
    "nameKu": "ئەڤۆکادۆ",
    "category": "fruits",
    "servingSizeEn": "100 g",
    "servingSizeKu": "١٠٠ گرام",
    "caloriesEstimate": 160,
    "protein": 2,
    "carbohydrates": 9,
    "fat": 15,
    "fiber": 6.7,
    "vitamins": [
      "Vitamin K",
      "Vitamin E"
    ],
    "minerals": [
      "Potassium"
    ],
    "allergens": [],
    "suitabilityEn": "Avocado is a source of unsaturated fats and dietary fiber. It generally fits vegan, gluten-free eating patterns. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "ئەڤۆکادۆ سەرچاوەیەکی چەوری ناڕاژاو و فایبەری خۆراکیـە. بەگشتی گونجاوە بۆ خواردنی ڤیگان، بەبێ گلوتن. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Sliced or mashed for spreads, salads, and sandwiches.",
    "prepKu": "پارچە یان کوتراو دەکرێت بۆ لکاندنەوە، سالاد و ساندویچ.",
    "relatedRecipeIds": []
  },
  {
    "id": "guava",
    "nameEn": "Guava",
    "nameKu": "گویاڤا",
    "category": "fruits",
    "servingSizeEn": "100 g",
    "servingSizeKu": "١٠٠ گرام",
    "caloriesEstimate": 68,
    "protein": 2.6,
    "carbohydrates": 14,
    "fat": 1,
    "fiber": 5.4,
    "vitamins": [
      "Vitamin C"
    ],
    "minerals": [
      "Potassium"
    ],
    "allergens": [],
    "suitabilityEn": "Guava is a source of vitamin C and dietary fiber. It generally fits vegan, gluten-free eating patterns. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "گویاڤا سەرچاوەیەکی ڤیتامین C و فایبەری خۆراکیـە. بەگشتی گونجاوە بۆ خواردنی ڤیگان، بەبێ گلوتن. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Eaten fresh, skin included.",
    "prepKu": "چێو دەخورێت، لەگەڵ توێکلی.",
    "relatedRecipeIds": []
  },
  {
    "id": "persimmon",
    "nameEn": "Persimmon",
    "nameKu": "خورماڵوو",
    "category": "fruits",
    "servingSizeEn": "100 g",
    "servingSizeKu": "١٠٠ گرام",
    "caloriesEstimate": 70,
    "protein": 0.6,
    "carbohydrates": 18,
    "fat": 0.2,
    "fiber": 3.6,
    "vitamins": [
      "Vitamin A",
      "Vitamin C"
    ],
    "minerals": [
      "Potassium"
    ],
    "allergens": [],
    "suitabilityEn": "Persimmon is a source of vitamin A and dietary fiber. It generally fits vegan, gluten-free eating patterns. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "خورماڵوو سەرچاوەیەکی ڤیتامین A و فایبەری خۆراکیـە. بەگشتی گونجاوە بۆ خواردنی ڤیگان، بەبێ گلوتن. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Eaten fresh when fully ripe.",
    "prepKu": "کاتێک بە تەواوی گەییا چێو دەخورێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "dried-apricot",
    "nameEn": "Dried apricot",
    "nameKu": "قەیسیی وشک",
    "category": "fruits",
    "servingSizeEn": "30 g",
    "servingSizeKu": "٣٠ گرام",
    "caloriesEstimate": 241,
    "protein": 3.4,
    "carbohydrates": 63,
    "fat": 0.5,
    "fiber": 7.3,
    "vitamins": [
      "Vitamin A"
    ],
    "minerals": [
      "Potassium",
      "Iron"
    ],
    "allergens": [],
    "suitabilityEn": "Dried apricot is a source of iron and dietary fiber. It generally fits vegan, gluten-free eating patterns. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "قەیسیی وشک سەرچاوەیەکی ئاسن و فایبەری خۆراکیـە. بەگشتی گونجاوە بۆ خواردنی ڤیگان، بەبێ گلوتن. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Eaten as a snack or added to rice dishes and desserts.",
    "prepKu": "وەک خواردنی سووک دەخورێت یان لە خواردنی برنج و شیرینیدا بەکاردێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "dried-figs",
    "nameEn": "Dried figs",
    "nameKu": "هەنجیری وشک",
    "category": "fruits",
    "servingSizeEn": "30 g",
    "servingSizeKu": "٣٠ گرام",
    "caloriesEstimate": 249,
    "protein": 3.3,
    "carbohydrates": 64,
    "fat": 0.9,
    "fiber": 9.8,
    "vitamins": [
      "Vitamin K"
    ],
    "minerals": [
      "Calcium",
      "Potassium"
    ],
    "allergens": [],
    "suitabilityEn": "Dried figs is a source of dietary fiber and calcium. It generally fits vegan, gluten-free eating patterns. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "هەنجیری وشک سەرچاوەیەکی فایبەری خۆراکی و کالسیۆمـە. بەگشتی گونجاوە بۆ خواردنی ڤیگان، بەبێ گلوتن. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Eaten as a snack or stuffed with nuts.",
    "prepKu": "وەک خواردنی سووک دەخورێت یان بە گوێز پڕ دەکرێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "raisins",
    "nameEn": "Raisins",
    "nameKu": "کشمیش",
    "category": "fruits",
    "servingSizeEn": "30 g",
    "servingSizeKu": "٣٠ گرام",
    "caloriesEstimate": 299,
    "protein": 3.1,
    "carbohydrates": 79,
    "fat": 0.5,
    "fiber": 3.7,
    "vitamins": [
      "Vitamin B6"
    ],
    "minerals": [
      "Potassium",
      "Iron"
    ],
    "allergens": [],
    "suitabilityEn": "Raisins is a source of iron and natural sugars. It generally fits vegan, gluten-free eating patterns. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "کشمیش سەرچاوەیەکی ئاسن و شەکری سروشتیـە. بەگشتی گونجاوە بۆ خواردنی ڤیگان، بەبێ گلوتن. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Added to rice pilafs, baked goods, and trail mixes.",
    "prepKu": "لە پلاڤی برنج، شتومەکی نانپژین و تێکەڵی خواردنی سووکدا بەکاردێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "coconut",
    "nameEn": "Coconut",
    "nameKu": "ناڕگیل",
    "category": "fruits",
    "servingSizeEn": "100 g",
    "servingSizeKu": "١٠٠ گرام",
    "caloriesEstimate": 354,
    "protein": 3.3,
    "carbohydrates": 15,
    "fat": 33,
    "fiber": 9,
    "vitamins": [
      "Vitamin B1"
    ],
    "minerals": [
      "Manganese"
    ],
    "allergens": [],
    "suitabilityEn": "Coconut is a source of unsaturated fats and dietary fiber. It generally fits vegan, gluten-free eating patterns. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "ناڕگیل سەرچاوەیەکی چەوری ناڕاژاو و فایبەری خۆراکیـە. بەگشتی گونجاوە بۆ خواردنی ڤیگان، بەبێ گلوتن. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Eaten fresh, shredded for baking, or used for coconut milk.",
    "prepKu": "چێو دەخورێت، بۆ نانپژین وردکراو دەکرێت یان شیری لێ دەگیرێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "tomato",
    "nameEn": "Tomato",
    "nameKu": "تەماتە",
    "category": "vegetables",
    "servingSizeEn": "100 g",
    "servingSizeKu": "١٠٠ گرام",
    "caloriesEstimate": 18,
    "protein": 0.9,
    "carbohydrates": 3.9,
    "fat": 0.2,
    "fiber": 1.2,
    "vitamins": [
      "Vitamin C",
      "Vitamin K"
    ],
    "minerals": [
      "Potassium"
    ],
    "allergens": [],
    "suitabilityEn": "Tomato is a source of vitamin C and antioxidants. It generally fits vegan, gluten-free eating patterns. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "تەماتە سەرچاوەیەکی ڤیتامین C و دژە ئۆکسیدانتـە. بەگشتی گونجاوە بۆ خواردنی ڤیگان، بەبێ گلوتن. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Eaten raw in salads or cooked into sauces and stews.",
    "prepKu": "چێو لە سالاددا دەخورێت یان لە سۆس و خواردنی کوڵاودا دەکوڵێنرێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "cucumber",
    "nameEn": "Cucumber",
    "nameKu": "خەیار",
    "category": "vegetables",
    "servingSizeEn": "100 g",
    "servingSizeKu": "١٠٠ گرام",
    "caloriesEstimate": 15,
    "protein": 0.7,
    "carbohydrates": 3.6,
    "fat": 0.1,
    "fiber": 0.5,
    "vitamins": [
      "Vitamin K"
    ],
    "minerals": [
      "Potassium"
    ],
    "allergens": [],
    "suitabilityEn": "Cucumber is a source of water content and potassium. It generally fits vegan, gluten-free eating patterns. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "خەیار سەرچاوەیەکی پێکهاتەی ئاو و پۆتاسیۆمـە. بەگشتی گونجاوە بۆ خواردنی ڤیگان، بەبێ گلوتن. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Eaten raw, sliced into salads, or pickled.",
    "prepKu": "چێو دەخورێت، بۆ سالاد پارچە دەکرێت یان تورشی دەکرێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "potato",
    "nameEn": "Potato",
    "nameKu": "پەتاتە",
    "category": "vegetables",
    "servingSizeEn": "100 g",
    "servingSizeKu": "١٠٠ گرام",
    "caloriesEstimate": 77,
    "protein": 2,
    "carbohydrates": 17,
    "fat": 0.1,
    "fiber": 2.2,
    "vitamins": [
      "Vitamin C",
      "Vitamin B6"
    ],
    "minerals": [
      "Potassium"
    ],
    "allergens": [],
    "suitabilityEn": "Potato is a source of complex carbohydrates and potassium. It generally fits vegan, gluten-free eating patterns. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "پەتاتە سەرچاوەیەکی کاربۆهایدراتی تێکەڵ و پۆتاسیۆمـە. بەگشتی گونجاوە بۆ خواردنی ڤیگان، بەبێ گلوتن. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Boiled, baked, mashed, or fried.",
    "prepKu": "دەکوڵێنرێت، لە فرن ئامادە دەکرێت، دەکوترێت یان سرووتاوی دەکرێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "sweet-potato",
    "nameEn": "Sweet potato",
    "nameKu": "پەتاتەی شیرین",
    "category": "vegetables",
    "servingSizeEn": "100 g",
    "servingSizeKu": "١٠٠ گرام",
    "caloriesEstimate": 86,
    "protein": 1.6,
    "carbohydrates": 20,
    "fat": 0.1,
    "fiber": 3,
    "vitamins": [
      "Vitamin A",
      "Vitamin C"
    ],
    "minerals": [
      "Potassium"
    ],
    "allergens": [],
    "suitabilityEn": "Sweet potato is a source of vitamin A and dietary fiber. It generally fits vegan, gluten-free eating patterns. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "پەتاتەی شیرین سەرچاوەیەکی ڤیتامین A و فایبەری خۆراکیـە. بەگشتی گونجاوە بۆ خواردنی ڤیگان، بەبێ گلوتن. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Baked, boiled, or roasted.",
    "prepKu": "لە فرن، بە کوڵاندن یان برژاندن ئامادە دەکرێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "onion",
    "nameEn": "Onion",
    "nameKu": "پیاز",
    "category": "vegetables",
    "servingSizeEn": "100 g",
    "servingSizeKu": "١٠٠ گرام",
    "caloriesEstimate": 40,
    "protein": 1.1,
    "carbohydrates": 9.3,
    "fat": 0.1,
    "fiber": 1.7,
    "vitamins": [
      "Vitamin C",
      "Vitamin B6"
    ],
    "minerals": [
      "Potassium"
    ],
    "allergens": [],
    "suitabilityEn": "Onion is a source of antioxidants and vitamin C. It generally fits vegan, gluten-free eating patterns. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "پیاز سەرچاوەیەکی دژە ئۆکسیدانت و ڤیتامین Cـە. بەگشتی گونجاوە بۆ خواردنی ڤیگان، بەبێ گلوتن. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Used raw, sautéed, or caramelized as a base for many dishes.",
    "prepKu": "چێو، سواتین یان سووتاوی بۆ زۆر خواردن وەک بنەما بەکاردێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "garlic",
    "nameEn": "Garlic",
    "nameKu": "سیر",
    "category": "vegetables",
    "servingSizeEn": "10 g",
    "servingSizeKu": "١٠ گرام",
    "caloriesEstimate": 149,
    "protein": 6.4,
    "carbohydrates": 33,
    "fat": 0.5,
    "fiber": 2.1,
    "vitamins": [
      "Vitamin C",
      "Vitamin B6"
    ],
    "minerals": [
      "Manganese"
    ],
    "allergens": [],
    "suitabilityEn": "Garlic is a source of antioxidants and vitamin C. It generally fits vegan, gluten-free eating patterns. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "سیر سەرچاوەیەکی دژە ئۆکسیدانت و ڤیتامین Cـە. بەگشتی گونجاوە بۆ خواردنی ڤیگان، بەبێ گلوتن. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Minced raw or sautéed as a flavor base.",
    "prepKu": "چێو وردکراو یان سواتین وەک بنەمای تام بەکاردێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "green-pepper",
    "nameEn": "Green bell pepper",
    "nameKu": "بیبەری سەوز",
    "category": "vegetables",
    "servingSizeEn": "100 g",
    "servingSizeKu": "١٠٠ گرام",
    "caloriesEstimate": 20,
    "protein": 0.9,
    "carbohydrates": 4.6,
    "fat": 0.2,
    "fiber": 1.7,
    "vitamins": [
      "Vitamin C"
    ],
    "minerals": [
      "Potassium"
    ],
    "allergens": [],
    "suitabilityEn": "Green bell pepper is a source of vitamin C. It generally fits vegan, gluten-free eating patterns. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "بیبەری سەوز سەرچاوەیەکی ڤیتامین Cـە. بەگشتی گونجاوە بۆ خواردنی ڤیگان، بەبێ گلوتن. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Eaten raw, grilled, or stuffed.",
    "prepKu": "چێو دەخورێت، لەسەر ئاگر یان پڕکراو ئامادە دەکرێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "red-bell-pepper",
    "nameEn": "Red bell pepper",
    "nameKu": "بیبەری سور",
    "category": "vegetables",
    "servingSizeEn": "100 g",
    "servingSizeKu": "١٠٠ گرام",
    "caloriesEstimate": 31,
    "protein": 1,
    "carbohydrates": 6,
    "fat": 0.3,
    "fiber": 2.1,
    "vitamins": [
      "Vitamin C",
      "Vitamin A"
    ],
    "minerals": [
      "Potassium"
    ],
    "allergens": [],
    "suitabilityEn": "Red bell pepper is a source of vitamin C and vitamin A. It generally fits vegan, gluten-free eating patterns. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "بیبەری سور سەرچاوەیەکی ڤیتامین C و ڤیتامین Aـە. بەگشتی گونجاوە بۆ خواردنی ڤیگان، بەبێ گلوتن. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Eaten raw, roasted, or stuffed.",
    "prepKu": "چێو دەخورێت، برژاو یان پڕکراو ئامادە دەکرێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "eggplant",
    "nameEn": "Eggplant (aubergine)",
    "nameKu": "بادنجان",
    "category": "vegetables",
    "servingSizeEn": "100 g",
    "servingSizeKu": "١٠٠ گرام",
    "caloriesEstimate": 25,
    "protein": 1,
    "carbohydrates": 6,
    "fat": 0.2,
    "fiber": 3,
    "vitamins": [
      "Vitamin K",
      "Vitamin B6"
    ],
    "minerals": [
      "Potassium"
    ],
    "allergens": [],
    "suitabilityEn": "Eggplant (aubergine) is a source of dietary fiber and antioxidants. It generally fits vegan, gluten-free eating patterns. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "بادنجان سەرچاوەیەکی فایبەری خۆراکی و دژە ئۆکسیدانتـە. بەگشتی گونجاوە بۆ خواردنی ڤیگان، بەبێ گلوتن. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Grilled, fried, baked, or stuffed as dolma.",
    "prepKu": "لەسەر ئاگر، سرووتاوی، لە فرن یان وەک دۆلمە پڕکراو ئامادە دەکرێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "zucchini",
    "nameEn": "Zucchini (courgette)",
    "nameKu": "کۆرکێت",
    "category": "vegetables",
    "servingSizeEn": "100 g",
    "servingSizeKu": "١٠٠ گرام",
    "caloriesEstimate": 17,
    "protein": 1.2,
    "carbohydrates": 3.1,
    "fat": 0.3,
    "fiber": 1,
    "vitamins": [
      "Vitamin C",
      "Vitamin A"
    ],
    "minerals": [
      "Potassium"
    ],
    "allergens": [],
    "suitabilityEn": "Zucchini (courgette) is a source of vitamin C. It generally fits vegan, gluten-free eating patterns. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "کۆرکێت سەرچاوەیەکی ڤیتامین Cـە. بەگشتی گونجاوە بۆ خواردنی ڤیگان، بەبێ گلوتن. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Grilled, stuffed, or added to stews.",
    "prepKu": "لەسەر ئاگر، پڕکراو یان لە خواردنی کوڵاودا بەکاردێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "carrot",
    "nameEn": "Carrot",
    "nameKu": "گەزەر",
    "category": "vegetables",
    "servingSizeEn": "100 g",
    "servingSizeKu": "١٠٠ گرام",
    "caloriesEstimate": 41,
    "protein": 0.9,
    "carbohydrates": 10,
    "fat": 0.2,
    "fiber": 2.8,
    "vitamins": [
      "Vitamin A",
      "Vitamin K"
    ],
    "minerals": [
      "Potassium"
    ],
    "allergens": [],
    "suitabilityEn": "Carrot is a source of vitamin A and dietary fiber. It generally fits vegan, gluten-free eating patterns. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "گەزەر سەرچاوەیەکی ڤیتامین A و فایبەری خۆراکیـە. بەگشتی گونجاوە بۆ خواردنی ڤیگان، بەبێ گلوتن. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Eaten raw, boiled, or roasted.",
    "prepKu": "چێو دەخورێت، دەکوڵێنرێت یان لە فرن دەبرژێنرێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "cabbage",
    "nameEn": "Cabbage",
    "nameKu": "کەلەرم",
    "category": "vegetables",
    "servingSizeEn": "100 g",
    "servingSizeKu": "١٠٠ گرام",
    "caloriesEstimate": 25,
    "protein": 1.3,
    "carbohydrates": 6,
    "fat": 0.1,
    "fiber": 2.5,
    "vitamins": [
      "Vitamin C",
      "Vitamin K"
    ],
    "minerals": [
      "Potassium"
    ],
    "allergens": [],
    "suitabilityEn": "Cabbage is a source of vitamin C and dietary fiber. It generally fits vegan, gluten-free eating patterns. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "کەلەرم سەرچاوەیەکی ڤیتامین C و فایبەری خۆراکیـە. بەگشتی گونجاوە بۆ خواردنی ڤیگان، بەبێ گلوتن. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Eaten raw in salads, stuffed, or cooked into stews.",
    "prepKu": "چێو لە سالاددا دەخورێت، پڕکراو یان لە خواردنی کوڵاودا دەکوڵێنرێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "cauliflower",
    "nameEn": "Cauliflower",
    "nameKu": "گوڵ کەلەم",
    "category": "vegetables",
    "servingSizeEn": "100 g",
    "servingSizeKu": "١٠٠ گرام",
    "caloriesEstimate": 25,
    "protein": 1.9,
    "carbohydrates": 5,
    "fat": 0.3,
    "fiber": 2,
    "vitamins": [
      "Vitamin C",
      "Vitamin K"
    ],
    "minerals": [
      "Potassium"
    ],
    "allergens": [],
    "suitabilityEn": "Cauliflower is a source of vitamin C and dietary fiber. It generally fits vegan, gluten-free eating patterns. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "گوڵ کەلەم سەرچاوەیەکی ڤیتامین C و فایبەری خۆراکیـە. بەگشتی گونجاوە بۆ خواردنی ڤیگان، بەبێ گلوتن. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Boiled, roasted, or fried.",
    "prepKu": "دەکوڵێنرێت، لە فرن یان سرووتاوی دەکرێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "broccoli",
    "nameEn": "Broccoli",
    "nameKu": "بروکلی",
    "category": "vegetables",
    "servingSizeEn": "100 g",
    "servingSizeKu": "١٠٠ گرام",
    "caloriesEstimate": 34,
    "protein": 2.8,
    "carbohydrates": 7,
    "fat": 0.4,
    "fiber": 2.6,
    "vitamins": [
      "Vitamin C",
      "Vitamin K"
    ],
    "minerals": [
      "Potassium"
    ],
    "allergens": [],
    "suitabilityEn": "Broccoli is a source of vitamin C and dietary fiber. It generally fits vegan, gluten-free eating patterns. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "بروکلی سەرچاوەیەکی ڤیتامین C و فایبەری خۆراکیـە. بەگشتی گونجاوە بۆ خواردنی ڤیگان، بەبێ گلوتن. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Steamed, boiled, or stir-fried.",
    "prepKu": "بە هەڵم لێدرێت، دەکوڵێنرێت یان سواتین دەکرێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "spinach",
    "nameEn": "Spinach",
    "nameKu": "ئیسپاناخ",
    "category": "vegetables",
    "servingSizeEn": "100 g",
    "servingSizeKu": "١٠٠ گرام",
    "caloriesEstimate": 23,
    "protein": 2.9,
    "carbohydrates": 3.6,
    "fat": 0.4,
    "fiber": 2.2,
    "vitamins": [
      "Vitamin A",
      "Vitamin K"
    ],
    "minerals": [
      "Iron"
    ],
    "allergens": [],
    "suitabilityEn": "Spinach is a source of iron and vitamin A. It generally fits vegan, gluten-free eating patterns. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "ئیسپاناخ سەرچاوەیەکی ئاسن و ڤیتامین Aـە. بەگشتی گونجاوە بۆ خواردنی ڤیگان، بەبێ گلوتن. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Sautéed, added to soups, or used raw in salads.",
    "prepKu": "سواتین دەکرێت، لە شۆربا یان چێو لە سالاددا بەکاردێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "lettuce",
    "nameEn": "Lettuce",
    "nameKu": "خس",
    "category": "vegetables",
    "servingSizeEn": "100 g",
    "servingSizeKu": "١٠٠ گرام",
    "caloriesEstimate": 15,
    "protein": 1.4,
    "carbohydrates": 2.9,
    "fat": 0.2,
    "fiber": 1.3,
    "vitamins": [
      "Vitamin A",
      "Vitamin K"
    ],
    "minerals": [
      "Potassium"
    ],
    "allergens": [],
    "suitabilityEn": "Lettuce is a source of vitamin A and water content. It generally fits vegan, gluten-free eating patterns. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "خس سەرچاوەیەکی ڤیتامین A و پێکهاتەی ئاوـە. بەگشتی گونجاوە بۆ خواردنی ڤیگان، بەبێ گلوتن. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Eaten raw in salads and wraps.",
    "prepKu": "چێو لە سالاد و پێچانەوەدا دەخورێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "okra",
    "nameEn": "Okra",
    "nameKu": "بامیە",
    "category": "vegetables",
    "servingSizeEn": "100 g",
    "servingSizeKu": "١٠٠ گرام",
    "caloriesEstimate": 33,
    "protein": 1.9,
    "carbohydrates": 7,
    "fat": 0.2,
    "fiber": 3.2,
    "vitamins": [
      "Vitamin C",
      "Vitamin K"
    ],
    "minerals": [
      "Magnesium"
    ],
    "allergens": [],
    "suitabilityEn": "Okra is a source of dietary fiber and vitamin C. It generally fits vegan, gluten-free eating patterns. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "بامیە سەرچاوەیەکی فایبەری خۆراکی و ڤیتامین Cـە. بەگشتی گونجاوە بۆ خواردنی ڤیگان، بەبێ گلوتن. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Stewed with tomatoes or fried.",
    "prepKu": "لەگەڵ تەماتە دەکوڵێنرێت یان سرووتاوی دەکرێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "green-beans",
    "nameEn": "Green beans",
    "nameKu": "فاسولیای سەوز",
    "category": "vegetables",
    "servingSizeEn": "100 g",
    "servingSizeKu": "١٠٠ گرام",
    "caloriesEstimate": 31,
    "protein": 1.8,
    "carbohydrates": 7,
    "fat": 0.2,
    "fiber": 2.7,
    "vitamins": [
      "Vitamin C",
      "Vitamin K"
    ],
    "minerals": [
      "Potassium"
    ],
    "allergens": [],
    "suitabilityEn": "Green beans is a source of dietary fiber and vitamin C. It generally fits vegan, gluten-free eating patterns. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "فاسولیای سەوز سەرچاوەیەکی فایبەری خۆراکی و ڤیتامین Cـە. بەگشتی گونجاوە بۆ خواردنی ڤیگان، بەبێ گلوتن. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Boiled, stewed with tomatoes, or stir-fried.",
    "prepKu": "دەکوڵێنرێت، لەگەڵ تەماتە یان سواتین ئامادە دەکرێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "peas",
    "nameEn": "Green peas",
    "nameKu": "نۆکی سەوز",
    "category": "vegetables",
    "servingSizeEn": "100 g",
    "servingSizeKu": "١٠٠ گرام",
    "caloriesEstimate": 81,
    "protein": 5.4,
    "carbohydrates": 14,
    "fat": 0.4,
    "fiber": 5.1,
    "vitamins": [
      "Vitamin C",
      "Vitamin K"
    ],
    "minerals": [
      "Iron"
    ],
    "allergens": [],
    "suitabilityEn": "Green peas is a source of protein and dietary fiber. It generally fits vegan, gluten-free eating patterns. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "نۆکی سەوز سەرچاوەیەکی پرۆتین و فایبەری خۆراکیـە. بەگشتی گونجاوە بۆ خواردنی ڤیگان، بەبێ گلوتن. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Boiled or added to rice and stews.",
    "prepKu": "دەکوڵێنرێت یان لەگەڵ برنج و خواردنی کوڵاودا بەکاردێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "radish",
    "nameEn": "Radish",
    "nameKu": "ڕادیش",
    "category": "vegetables",
    "servingSizeEn": "100 g",
    "servingSizeKu": "١٠٠ گرام",
    "caloriesEstimate": 16,
    "protein": 0.7,
    "carbohydrates": 3.4,
    "fat": 0.1,
    "fiber": 1.6,
    "vitamins": [
      "Vitamin C"
    ],
    "minerals": [
      "Potassium"
    ],
    "allergens": [],
    "suitabilityEn": "Radish is a source of vitamin C. It generally fits vegan, gluten-free eating patterns. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "ڕادیش سەرچاوەیەکی ڤیتامین Cـە. بەگشتی گونجاوە بۆ خواردنی ڤیگان، بەبێ گلوتن. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Eaten raw in salads.",
    "prepKu": "چێو لە سالاددا دەخورێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "beet",
    "nameEn": "Beet (beetroot)",
    "nameKu": "چوکندر",
    "category": "vegetables",
    "servingSizeEn": "100 g",
    "servingSizeKu": "١٠٠ گرام",
    "caloriesEstimate": 43,
    "protein": 1.6,
    "carbohydrates": 10,
    "fat": 0.2,
    "fiber": 2.8,
    "vitamins": [
      "Vitamin C",
      "Folate"
    ],
    "minerals": [
      "Potassium"
    ],
    "allergens": [],
    "suitabilityEn": "Beet (beetroot) is a source of folate and dietary fiber. It generally fits vegan, gluten-free eating patterns. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "چوکندر سەرچاوەیەکی فۆلەیت و فایبەری خۆراکیـە. بەگشتی گونجاوە بۆ خواردنی ڤیگان، بەبێ گلوتن. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Boiled or roasted, sliced into salads.",
    "prepKu": "دەکوڵێنرێت یان لە فرن دەبرژێنرێت، بۆ سالاد پارچە دەکرێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "turnip",
    "nameEn": "Turnip",
    "nameKu": "شەڵغەم",
    "category": "vegetables",
    "servingSizeEn": "100 g",
    "servingSizeKu": "١٠٠ گرام",
    "caloriesEstimate": 28,
    "protein": 0.9,
    "carbohydrates": 6.4,
    "fat": 0.1,
    "fiber": 1.8,
    "vitamins": [
      "Vitamin C"
    ],
    "minerals": [
      "Potassium"
    ],
    "allergens": [],
    "suitabilityEn": "Turnip is a source of vitamin C and dietary fiber. It generally fits vegan, gluten-free eating patterns. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "شەڵغەم سەرچاوەیەکی ڤیتامین C و فایبەری خۆراکیـە. بەگشتی گونجاوە بۆ خواردنی ڤیگان، بەبێ گلوتن. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Boiled, stewed, or pickled.",
    "prepKu": "دەکوڵێنرێت، لە خواردنی کوڵاودا یان تورشی دەکرێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "pumpkin",
    "nameEn": "Pumpkin",
    "nameKu": "کەدو",
    "category": "vegetables",
    "servingSizeEn": "100 g",
    "servingSizeKu": "١٠٠ گرام",
    "caloriesEstimate": 26,
    "protein": 1,
    "carbohydrates": 6.5,
    "fat": 0.1,
    "fiber": 0.5,
    "vitamins": [
      "Vitamin A"
    ],
    "minerals": [
      "Potassium"
    ],
    "allergens": [],
    "suitabilityEn": "Pumpkin is a source of vitamin A. It generally fits vegan, gluten-free eating patterns. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "کەدو سەرچاوەیەکی ڤیتامین Aـە. بەگشتی گونجاوە بۆ خواردنی ڤیگان، بەبێ گلوتن. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Boiled, roasted, or used in soups and desserts.",
    "prepKu": "دەکوڵێنرێت، لە فرن دەبرژێنرێت یان لە شۆربا و شیرینیدا بەکاردێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "squash",
    "nameEn": "Squash",
    "nameKu": "سکواش",
    "category": "vegetables",
    "servingSizeEn": "100 g",
    "servingSizeKu": "١٠٠ گرام",
    "caloriesEstimate": 16,
    "protein": 1.2,
    "carbohydrates": 3.4,
    "fat": 0.2,
    "fiber": 1.1,
    "vitamins": [
      "Vitamin A",
      "Vitamin C"
    ],
    "minerals": [
      "Potassium"
    ],
    "allergens": [],
    "suitabilityEn": "Squash is a source of vitamin A. It generally fits vegan, gluten-free eating patterns. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "سکواش سەرچاوەیەکی ڤیتامین Aـە. بەگشتی گونجاوە بۆ خواردنی ڤیگان، بەبێ گلوتن. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Boiled, roasted, or stuffed.",
    "prepKu": "دەکوڵێنرێت، لە فرن دەبرژێنرێت یان پڕکراو ئامادە دەکرێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "mushroom",
    "nameEn": "Mushroom",
    "nameKu": "قارچ",
    "category": "vegetables",
    "servingSizeEn": "100 g",
    "servingSizeKu": "١٠٠ گرام",
    "caloriesEstimate": 22,
    "protein": 3.1,
    "carbohydrates": 3.3,
    "fat": 0.3,
    "fiber": 1,
    "vitamins": [
      "Vitamin B3",
      "Vitamin D"
    ],
    "minerals": [
      "Selenium"
    ],
    "allergens": [],
    "suitabilityEn": "Mushroom is a source of B vitamins and selenium. It generally fits vegan, gluten-free eating patterns. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "قارچ سەرچاوەیەکی ڤیتامینەکانی B و سیلینیۆمـە. بەگشتی گونجاوە بۆ خواردنی ڤیگان، بەبێ گلوتن. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Sautéed, grilled, or added to soups and stews.",
    "prepKu": "سواتین، لەسەر ئاگر یان لە شۆربا و خواردنی کوڵاودا بەکاردێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "celery",
    "nameEn": "Celery",
    "nameKu": "کرەفس",
    "category": "vegetables",
    "servingSizeEn": "100 g",
    "servingSizeKu": "١٠٠ گرام",
    "caloriesEstimate": 16,
    "protein": 0.7,
    "carbohydrates": 3,
    "fat": 0.2,
    "fiber": 1.6,
    "vitamins": [
      "Vitamin K"
    ],
    "minerals": [
      "Potassium"
    ],
    "allergens": [],
    "suitabilityEn": "Celery is a source of water content and dietary fiber. It generally fits vegan, gluten-free eating patterns. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "کرەفس سەرچاوەیەکی پێکهاتەی ئاو و فایبەری خۆراکیـە. بەگشتی گونجاوە بۆ خواردنی ڤیگان، بەبێ گلوتن. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Eaten raw as a snack or added to soups.",
    "prepKu": "چێو وەک خواردنی سووک دەخورێت یان لە شۆربادا بەکاردێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "leek",
    "nameEn": "Leek",
    "nameKu": "لیک",
    "category": "vegetables",
    "servingSizeEn": "100 g",
    "servingSizeKu": "١٠٠ گرام",
    "caloriesEstimate": 61,
    "protein": 1.5,
    "carbohydrates": 14,
    "fat": 0.3,
    "fiber": 1.8,
    "vitamins": [
      "Vitamin A",
      "Vitamin K"
    ],
    "minerals": [
      "Manganese"
    ],
    "allergens": [],
    "suitabilityEn": "Leek is a source of vitamin A and dietary fiber. It generally fits vegan, gluten-free eating patterns. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "لیک سەرچاوەیەکی ڤیتامین A و فایبەری خۆراکیـە. بەگشتی گونجاوە بۆ خواردنی ڤیگان، بەبێ گلوتن. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Sautéed or added to soups and stews.",
    "prepKu": "سواتین دەکرێت یان لە شۆربا و خواردنی کوڵاودا بەکاردێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "artichoke",
    "nameEn": "Artichoke",
    "nameKu": "ئارتیشۆک",
    "category": "vegetables",
    "servingSizeEn": "100 g",
    "servingSizeKu": "١٠٠ گرام",
    "caloriesEstimate": 47,
    "protein": 3.3,
    "carbohydrates": 11,
    "fat": 0.2,
    "fiber": 5.4,
    "vitamins": [
      "Vitamin C",
      "Vitamin K"
    ],
    "minerals": [
      "Magnesium"
    ],
    "allergens": [],
    "suitabilityEn": "Artichoke is a source of dietary fiber and antioxidants. It generally fits vegan, gluten-free eating patterns. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "ئارتیشۆک سەرچاوەیەکی فایبەری خۆراکی و دژە ئۆکسیدانتـە. بەگشتی گونجاوە بۆ خواردنی ڤیگان، بەبێ گلوتن. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Boiled or steamed, leaves pulled and dipped.",
    "prepKu": "دەکوڵێنرێت یان بە هەڵم لێدرێت، گەڵاکانی دەردەکرێن و هەڵدەمژرێن.",
    "relatedRecipeIds": []
  },
  {
    "id": "asparagus",
    "nameEn": "Asparagus",
    "nameKu": "ئەسپاراگوس",
    "category": "vegetables",
    "servingSizeEn": "100 g",
    "servingSizeKu": "١٠٠ گرام",
    "caloriesEstimate": 20,
    "protein": 2.2,
    "carbohydrates": 3.9,
    "fat": 0.1,
    "fiber": 2.1,
    "vitamins": [
      "Vitamin K",
      "Folate"
    ],
    "minerals": [
      "Potassium"
    ],
    "allergens": [],
    "suitabilityEn": "Asparagus is a source of folate and dietary fiber. It generally fits vegan, gluten-free eating patterns. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "ئەسپاراگوس سەرچاوەیەکی فۆلەیت و فایبەری خۆراکیـە. بەگشتی گونجاوە بۆ خواردنی ڤیگان، بەبێ گلوتن. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Grilled, steamed, or roasted.",
    "prepKu": "لەسەر ئاگر، بە هەڵم لێدرێت یان لە فرن دەبرژێنرێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "brussels-sprouts",
    "nameEn": "Brussels sprouts",
    "nameKu": "گوڵ کەلەمی برۆکسڵ",
    "category": "vegetables",
    "servingSizeEn": "100 g",
    "servingSizeKu": "١٠٠ گرام",
    "caloriesEstimate": 43,
    "protein": 3.4,
    "carbohydrates": 9,
    "fat": 0.3,
    "fiber": 3.8,
    "vitamins": [
      "Vitamin C",
      "Vitamin K"
    ],
    "minerals": [
      "Potassium"
    ],
    "allergens": [],
    "suitabilityEn": "Brussels sprouts is a source of vitamin C and dietary fiber. It generally fits vegan, gluten-free eating patterns. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "گوڵ کەلەمی برۆکسڵ سەرچاوەیەکی ڤیتامین C و فایبەری خۆراکیـە. بەگشتی گونجاوە بۆ خواردنی ڤیگان، بەبێ گلوتن. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Roasted or steamed.",
    "prepKu": "لە فرن دەبرژێنرێت یان بە هەڵم لێدرێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "kale",
    "nameEn": "Kale",
    "nameKu": "کەیل",
    "category": "vegetables",
    "servingSizeEn": "100 g",
    "servingSizeKu": "١٠٠ گرام",
    "caloriesEstimate": 49,
    "protein": 4.3,
    "carbohydrates": 9,
    "fat": 0.9,
    "fiber": 3.6,
    "vitamins": [
      "Vitamin A",
      "Vitamin K"
    ],
    "minerals": [
      "Calcium"
    ],
    "allergens": [],
    "suitabilityEn": "Kale is a source of vitamin A and calcium. It generally fits vegan, gluten-free eating patterns. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "کەیل سەرچاوەیەکی ڤیتامین A و کالسیۆمـە. بەگشتی گونجاوە بۆ خواردنی ڤیگان، بەبێ گلوتن. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Sautéed, added to soups, or eaten raw in salads.",
    "prepKu": "سواتین دەکرێت، لە شۆربا یان چێو لە سالاددا بەکاردێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "arugula",
    "nameEn": "Arugula (rocket)",
    "nameKu": "جرجیر",
    "category": "vegetables",
    "servingSizeEn": "100 g",
    "servingSizeKu": "١٠٠ گرام",
    "caloriesEstimate": 25,
    "protein": 2.6,
    "carbohydrates": 3.7,
    "fat": 0.7,
    "fiber": 1.6,
    "vitamins": [
      "Vitamin K",
      "Vitamin A"
    ],
    "minerals": [
      "Calcium"
    ],
    "allergens": [],
    "suitabilityEn": "Arugula (rocket) is a source of vitamin A and calcium. It generally fits vegan, gluten-free eating patterns. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "جرجیر سەرچاوەیەکی ڤیتامین A و کالسیۆمـە. بەگشتی گونجاوە بۆ خواردنی ڤیگان، بەبێ گلوتن. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Eaten raw in salads.",
    "prepKu": "چێو لە سالاددا دەخورێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "purslane",
    "nameEn": "Purslane",
    "nameKu": "بەقلە",
    "category": "vegetables",
    "servingSizeEn": "100 g",
    "servingSizeKu": "١٠٠ گرام",
    "caloriesEstimate": 16,
    "protein": 1.3,
    "carbohydrates": 3.4,
    "fat": 0.1,
    "fiber": 0.9,
    "vitamins": [
      "Vitamin A",
      "Vitamin C"
    ],
    "minerals": [
      "Potassium"
    ],
    "allergens": [],
    "suitabilityEn": "Purslane is a source of omega-3 fatty acids and vitamin A. It generally fits vegan, gluten-free eating patterns. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "بەقلە سەرچاوەیەکی ئاسیدی چەوری omega-3 و ڤیتامین Aـە. بەگشتی گونجاوە بۆ خواردنی ڤیگان، بەبێ گلوتن. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Eaten raw in salads or added to yogurt dishes.",
    "prepKu": "چێو لە سالاددا دەخورێت یان لەگەڵ خواردنی مۆست بەکاردێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "fennel",
    "nameEn": "Fennel",
    "nameKu": "شمار",
    "category": "vegetables",
    "servingSizeEn": "100 g",
    "servingSizeKu": "١٠٠ گرام",
    "caloriesEstimate": 31,
    "protein": 1.2,
    "carbohydrates": 7,
    "fat": 0.2,
    "fiber": 3.1,
    "vitamins": [
      "Vitamin C"
    ],
    "minerals": [
      "Potassium"
    ],
    "allergens": [],
    "suitabilityEn": "Fennel is a source of vitamin C and dietary fiber. It generally fits vegan, gluten-free eating patterns. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "شمار سەرچاوەیەکی ڤیتامین C و فایبەری خۆراکیـە. بەگشتی گونجاوە بۆ خواردنی ڤیگان، بەبێ گلوتن. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Eaten raw, roasted, or braised.",
    "prepKu": "چێو دەخورێت، لە فرن دەبرژێنرێت یان بەهێواشی دەکوڵێنرێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "hot-pepper-jalapeno",
    "nameEn": "Hot pepper (jalapeño)",
    "nameKu": "بیبەری تیژ",
    "category": "vegetables",
    "servingSizeEn": "30 g",
    "servingSizeKu": "٣٠ گرام",
    "caloriesEstimate": 29,
    "protein": 0.9,
    "carbohydrates": 6.5,
    "fat": 0.4,
    "fiber": 2.8,
    "vitamins": [
      "Vitamin C",
      "Vitamin A"
    ],
    "minerals": [
      "Potassium"
    ],
    "allergens": [],
    "suitabilityEn": "Hot pepper (jalapeño) is a source of vitamin C and antioxidants. It generally fits vegan, gluten-free eating patterns. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "بیبەری تیژ سەرچاوەیەکی ڤیتامین C و دژە ئۆکسیدانتـە. بەگشتی گونجاوە بۆ خواردنی ڤیگان، بەبێ گلوتن. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Used fresh, pickled, or dried as a spice.",
    "prepKu": "چێو، تورشی یان وشکاوی وەک بەهارات بەکاردێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "olives",
    "nameEn": "Olives",
    "nameKu": "زەیتون",
    "category": "vegetables",
    "servingSizeEn": "30 g",
    "servingSizeKu": "٣٠ گرام",
    "caloriesEstimate": 115,
    "protein": 0.8,
    "carbohydrates": 6,
    "fat": 11,
    "fiber": 3.2,
    "vitamins": [
      "Vitamin E"
    ],
    "minerals": [
      "Iron"
    ],
    "allergens": [],
    "suitabilityEn": "Olives is a source of unsaturated fats and vitamin E. It generally fits vegan, gluten-free eating patterns. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "زەیتون سەرچاوەیەکی چەوری ناڕاژاو و ڤیتامین Eـە. بەگشتی گونجاوە بۆ خواردنی ڤیگان، بەبێ گلوتن. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Cured and eaten with bread or added to salads.",
    "prepKu": "تووژاوی و لەگەڵ نان دەخورێت یان لە سالاددا بەکاردێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "capers",
    "nameEn": "Capers",
    "nameKu": "کەبەر",
    "category": "vegetables",
    "servingSizeEn": "10 g",
    "servingSizeKu": "١٠ گرام",
    "caloriesEstimate": 23,
    "protein": 2.4,
    "carbohydrates": 5,
    "fat": 0.9,
    "fiber": 3.2,
    "vitamins": [
      "Vitamin K"
    ],
    "minerals": [
      "Iron"
    ],
    "allergens": [],
    "suitabilityEn": "Capers is a source of dietary fiber and iron. It generally fits vegan, gluten-free eating patterns. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "کەبەر سەرچاوەیەکی فایبەری خۆراکی و ئاسنـە. بەگشتی گونجاوە بۆ خواردنی ڤیگان، بەبێ گلوتن. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Brined and used as a garnish for salads and sauces.",
    "prepKu": "لە شۆر دەخرێت و وەک ڕازاوەکردنی سالاد و سۆس بەکاردێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "pickled-vegetables-turshi",
    "nameEn": "Pickled vegetables (turshi)",
    "nameKu": "تورشی",
    "category": "vegetables",
    "servingSizeEn": "30 g",
    "servingSizeKu": "٣٠ گرام",
    "caloriesEstimate": 20,
    "protein": 0.8,
    "carbohydrates": 4,
    "fat": 0.2,
    "fiber": 1.5,
    "vitamins": [
      "Vitamin C"
    ],
    "minerals": [],
    "allergens": [],
    "suitabilityEn": "Pickled vegetables (turshi) is a source of vitamin C and sodium (best in moderation). It generally fits vegan, gluten-free eating patterns. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "تورشی سەرچاوەیەکی ڤیتامین C و سۆدیۆم (باشترە بەئەندازە بەکاربهێنرێت)ـە. بەگشتی گونجاوە بۆ خواردنی ڤیگان، بەبێ گلوتن. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Vegetables fermented or brined in vinegar, served as a side.",
    "prepKu": "سەوزە لە سرکە یان شۆر تیژاو دەکرێت و وەک لاوەکی خۆراک دەکرێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "grape-leaves",
    "nameEn": "Grape leaves",
    "nameKu": "گەڵای مێو",
    "category": "vegetables",
    "servingSizeEn": "100 g",
    "servingSizeKu": "١٠٠ گرام",
    "caloriesEstimate": 93,
    "protein": 5.6,
    "carbohydrates": 17,
    "fat": 0.7,
    "fiber": 10,
    "vitamins": [
      "Vitamin A",
      "Vitamin K"
    ],
    "minerals": [
      "Iron"
    ],
    "allergens": [],
    "suitabilityEn": "Grape leaves is a source of dietary fiber and iron. It generally fits vegan, gluten-free eating patterns. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "گەڵای مێو سەرچاوەیەکی فایبەری خۆراکی و ئاسنـە. بەگشتی گونجاوە بۆ خواردنی ڤیگان، بەبێ گلوتن. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Blanched and rolled into dolma with rice or meat.",
    "prepKu": "بە ئاوی گەرم دەشلێنرێت و لەگەڵ برنج یان گۆشت دەپێچرێتەوە بۆ دۆلمە.",
    "relatedRecipeIds": []
  },
  {
    "id": "swiss-chard",
    "nameEn": "Swiss chard",
    "nameKu": "سلق",
    "category": "vegetables",
    "servingSizeEn": "100 g",
    "servingSizeKu": "١٠٠ گرام",
    "caloriesEstimate": 19,
    "protein": 1.8,
    "carbohydrates": 3.7,
    "fat": 0.2,
    "fiber": 1.6,
    "vitamins": [
      "Vitamin A",
      "Vitamin K"
    ],
    "minerals": [
      "Magnesium"
    ],
    "allergens": [],
    "suitabilityEn": "Swiss chard is a source of vitamin A and magnesium. It generally fits vegan, gluten-free eating patterns. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "سلق سەرچاوەیەکی ڤیتامین A و ماگنیزیۆمـە. بەگشتی گونجاوە بۆ خواردنی ڤیگان، بەبێ گلوتن. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Sautéed or added to soups and stews.",
    "prepKu": "سواتین دەکرێت یان لە شۆربا و خواردنی کوڵاودا بەکاردێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "lentils-brown",
    "nameEn": "Brown lentils",
    "nameKu": "نیسکی قاوەیی",
    "category": "legumes",
    "servingSizeEn": "100 g",
    "servingSizeKu": "١٠٠ گرام",
    "caloriesEstimate": 116,
    "protein": 9,
    "carbohydrates": 20,
    "fat": 0.4,
    "fiber": 8,
    "vitamins": [
      "Folate",
      "Vitamin B1"
    ],
    "minerals": [
      "Iron"
    ],
    "allergens": [],
    "suitabilityEn": "Brown lentils is a source of protein and iron. It generally fits vegan, gluten-free eating patterns. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "نیسکی قاوەیی سەرچاوەیەکی پرۆتین و ئاسنـە. بەگشتی گونجاوە بۆ خواردنی ڤیگان، بەبێ گلوتن. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Boiled into soups or added to rice dishes.",
    "prepKu": "دەکوڵێنرێت بۆ شۆربا یان لەگەڵ خواردنی برنج بەکاردێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "lentils-red",
    "nameEn": "Red lentils",
    "nameKu": "نیسکی سور",
    "category": "legumes",
    "servingSizeEn": "100 g",
    "servingSizeKu": "١٠٠ گرام",
    "caloriesEstimate": 116,
    "protein": 9,
    "carbohydrates": 20,
    "fat": 0.4,
    "fiber": 8,
    "vitamins": [
      "Folate"
    ],
    "minerals": [
      "Iron"
    ],
    "allergens": [],
    "suitabilityEn": "Red lentils is a source of protein and dietary fiber. It generally fits vegan, gluten-free eating patterns. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "نیسکی سور سەرچاوەیەکی پرۆتین و فایبەری خۆراکیـە. بەگشتی گونجاوە بۆ خواردنی ڤیگان، بەبێ گلوتن. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Boiled quickly into soups; softens faster than brown lentils.",
    "prepKu": "بەخێرایی دەکوڵێنرێت بۆ شۆربا؛ لە نیسکی قاوەیی زووتر نەرم دەبێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "chickpeas",
    "nameEn": "Chickpeas",
    "nameKu": "نۆک",
    "category": "legumes",
    "servingSizeEn": "100 g",
    "servingSizeKu": "١٠٠ گرام",
    "caloriesEstimate": 164,
    "protein": 9,
    "carbohydrates": 27,
    "fat": 2.6,
    "fiber": 8,
    "vitamins": [
      "Folate",
      "Vitamin B6"
    ],
    "minerals": [
      "Iron",
      "Manganese"
    ],
    "allergens": [],
    "suitabilityEn": "Chickpeas is a source of protein and dietary fiber. It generally fits vegan, gluten-free eating patterns. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "نۆک سەرچاوەیەکی پرۆتین و فایبەری خۆراکیـە. بەگشتی گونجاوە بۆ خواردنی ڤیگان، بەبێ گلوتن. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Boiled and used in hummus, stews, and salads.",
    "prepKu": "دەکوڵێنرێت و لە حومس، خواردنی کوڵاو و سالاددا بەکاردێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "kidney-beans",
    "nameEn": "Kidney beans",
    "nameKu": "فاسولیای سور",
    "category": "legumes",
    "servingSizeEn": "100 g",
    "servingSizeKu": "١٠٠ گرام",
    "caloriesEstimate": 127,
    "protein": 9,
    "carbohydrates": 23,
    "fat": 0.5,
    "fiber": 6.4,
    "vitamins": [
      "Folate"
    ],
    "minerals": [
      "Iron"
    ],
    "allergens": [],
    "suitabilityEn": "Kidney beans is a source of protein and dietary fiber. It generally fits vegan, gluten-free eating patterns. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "فاسولیای سور سەرچاوەیەکی پرۆتین و فایبەری خۆراکیـە. بەگشتی گونجاوە بۆ خواردنی ڤیگان، بەبێ گلوتن. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Soaked, boiled, and added to stews.",
    "prepKu": "دەخرێتە ناو ئاو، دەکوڵێنرێت و لە خواردنی کوڵاودا بەکاردێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "black-beans",
    "nameEn": "Black beans",
    "nameKu": "فاسولیای ڕەش",
    "category": "legumes",
    "servingSizeEn": "100 g",
    "servingSizeKu": "١٠٠ گرام",
    "caloriesEstimate": 132,
    "protein": 8.9,
    "carbohydrates": 24,
    "fat": 0.5,
    "fiber": 8.7,
    "vitamins": [
      "Folate"
    ],
    "minerals": [
      "Iron",
      "Magnesium"
    ],
    "allergens": [],
    "suitabilityEn": "Black beans is a source of dietary fiber and protein. It generally fits vegan, gluten-free eating patterns. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "فاسولیای ڕەش سەرچاوەیەکی فایبەری خۆراکی و پرۆتینـە. بەگشتی گونجاوە بۆ خواردنی ڤیگان، بەبێ گلوتن. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Boiled and used in soups, stews, and salads.",
    "prepKu": "دەکوڵێنرێت و لە شۆربا، خواردنی کوڵاو و سالاددا بەکاردێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "white-beans-cannellini",
    "nameEn": "White beans (cannellini)",
    "nameKu": "فاسولیای سپی",
    "category": "legumes",
    "servingSizeEn": "100 g",
    "servingSizeKu": "١٠٠ گرام",
    "caloriesEstimate": 139,
    "protein": 9.7,
    "carbohydrates": 25,
    "fat": 0.4,
    "fiber": 6.3,
    "vitamins": [
      "Folate"
    ],
    "minerals": [
      "Iron"
    ],
    "allergens": [],
    "suitabilityEn": "White beans (cannellini) is a source of protein and dietary fiber. It generally fits vegan, gluten-free eating patterns. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "فاسولیای سپی سەرچاوەیەکی پرۆتین و فایبەری خۆراکیـە. بەگشتی گونجاوە بۆ خواردنی ڤیگان، بەبێ گلوتن. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Boiled and simmered in tomato-based stews.",
    "prepKu": "دەکوڵێنرێت و لە خواردنی کوڵاوی بنەما تەماتەدا بەکاردێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "fava-beans",
    "nameEn": "Fava beans",
    "nameKu": "باقلا",
    "category": "legumes",
    "servingSizeEn": "100 g",
    "servingSizeKu": "١٠٠ گرام",
    "caloriesEstimate": 110,
    "protein": 7.6,
    "carbohydrates": 18,
    "fat": 0.4,
    "fiber": 5.4,
    "vitamins": [
      "Folate"
    ],
    "minerals": [
      "Iron",
      "Manganese"
    ],
    "allergens": [],
    "suitabilityEn": "Fava beans is a source of protein and dietary fiber. It generally fits vegan, gluten-free eating patterns. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "باقلا سەرچاوەیەکی پرۆتین و فایبەری خۆراکیـە. بەگشتی گونجاوە بۆ خواردنی ڤیگان، بەبێ گلوتن. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Boiled, mashed, or used in falafel and stews.",
    "prepKu": "دەکوڵێنرێت، دەکوترێت یان لە فەلافل و خواردنی کوڵاودا بەکاردێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "mung-beans",
    "nameEn": "Mung beans",
    "nameKu": "ماشی سەوز",
    "category": "legumes",
    "servingSizeEn": "100 g",
    "servingSizeKu": "١٠٠ گرام",
    "caloriesEstimate": 105,
    "protein": 7,
    "carbohydrates": 19,
    "fat": 0.4,
    "fiber": 7.6,
    "vitamins": [
      "Folate"
    ],
    "minerals": [
      "Iron",
      "Magnesium"
    ],
    "allergens": [],
    "suitabilityEn": "Mung beans is a source of protein and dietary fiber. It generally fits vegan, gluten-free eating patterns. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "ماشی سەوز سەرچاوەیەکی پرۆتین و فایبەری خۆراکیـە. بەگشتی گونجاوە بۆ خواردنی ڤیگان، بەبێ گلوتن. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Boiled into soups or sprouted for salads.",
    "prepKu": "دەکوڵێنرێت بۆ شۆربا یان تۆویی دەکرێت بۆ سالاد.",
    "relatedRecipeIds": []
  },
  {
    "id": "split-peas",
    "nameEn": "Split peas",
    "nameKu": "نۆکی شکاو",
    "category": "legumes",
    "servingSizeEn": "100 g",
    "servingSizeKu": "١٠٠ گرام",
    "caloriesEstimate": 118,
    "protein": 8.3,
    "carbohydrates": 21,
    "fat": 0.4,
    "fiber": 8.3,
    "vitamins": [
      "Folate"
    ],
    "minerals": [
      "Iron"
    ],
    "allergens": [],
    "suitabilityEn": "Split peas is a source of protein and dietary fiber. It generally fits vegan, gluten-free eating patterns. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "نۆکی شکاو سەرچاوەیەکی پرۆتین و فایبەری خۆراکیـە. بەگشتی گونجاوە بۆ خواردنی ڤیگان، بەبێ گلوتن. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Boiled into soups and purées.",
    "prepKu": "دەکوڵێنرێت بۆ شۆربا و کوتراوی نەرم.",
    "relatedRecipeIds": []
  },
  {
    "id": "black-eyed-peas",
    "nameEn": "Black-eyed peas",
    "nameKu": "لوبیای چاوڕەش",
    "category": "legumes",
    "servingSizeEn": "100 g",
    "servingSizeKu": "١٠٠ گرام",
    "caloriesEstimate": 116,
    "protein": 7.7,
    "carbohydrates": 21,
    "fat": 0.5,
    "fiber": 6.5,
    "vitamins": [
      "Folate"
    ],
    "minerals": [
      "Iron",
      "Magnesium"
    ],
    "allergens": [],
    "suitabilityEn": "Black-eyed peas is a source of protein and dietary fiber. It generally fits vegan, gluten-free eating patterns. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "لوبیای چاوڕەش سەرچاوەیەکی پرۆتین و فایبەری خۆراکیـە. بەگشتی گونجاوە بۆ خواردنی ڤیگان، بەبێ گلوتن. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Boiled and added to stews and salads.",
    "prepKu": "دەکوڵێنرێت و لە خواردنی کوڵاو و سالاددا بەکاردێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "soybeans",
    "nameEn": "Soybeans",
    "nameKu": "سۆیا",
    "category": "legumes",
    "servingSizeEn": "100 g",
    "servingSizeKu": "١٠٠ گرام",
    "caloriesEstimate": 173,
    "protein": 16.6,
    "carbohydrates": 9.9,
    "fat": 9,
    "fiber": 6,
    "vitamins": [
      "Folate",
      "Vitamin K"
    ],
    "minerals": [
      "Iron",
      "Manganese"
    ],
    "allergens": [
      "soy"
    ],
    "suitabilityEn": "Soybeans is a source of protein and unsaturated fats. It generally fits vegan, gluten-free eating patterns. It contains soy, so avoid it if you have a related allergy. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "سۆیا سەرچاوەیەکی پرۆتین و چەوری ناڕاژاوـە. بەگشتی گونجاوە بۆ خواردنی ڤیگان، بەبێ گلوتن. پێکهاتەی سۆیا تێدایە، بۆیە ئەگەر ئالەرجیت هەیە خۆت لێ بپارێزە. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Boiled, roasted, or processed into tofu and milk.",
    "prepKu": "دەکوڵێنرێت، دەبرژێنرێت یان بۆ تۆفو و شیر پرۆسێس دەکرێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "edamame",
    "nameEn": "Edamame",
    "nameKu": "ئێدامامی",
    "category": "legumes",
    "servingSizeEn": "100 g",
    "servingSizeKu": "١٠٠ گرام",
    "caloriesEstimate": 121,
    "protein": 12,
    "carbohydrates": 9.9,
    "fat": 5,
    "fiber": 5.2,
    "vitamins": [
      "Vitamin K",
      "Folate"
    ],
    "minerals": [
      "Iron"
    ],
    "allergens": [
      "soy"
    ],
    "suitabilityEn": "Edamame is a source of protein and dietary fiber. It generally fits vegan, gluten-free eating patterns. It contains soy, so avoid it if you have a related allergy. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "ئێدامامی سەرچاوەیەکی پرۆتین و فایبەری خۆراکیـە. بەگشتی گونجاوە بۆ خواردنی ڤیگان، بەبێ گلوتن. پێکهاتەی سۆیا تێدایە، بۆیە ئەگەر ئالەرجیت هەیە خۆت لێ بپارێزە. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Steamed and lightly salted, eaten from the pod.",
    "prepKu": "بە هەڵم لێدرێت و کەمێک خوێ لێدرێت، لە توپکەکەیدا دەخورێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "pinto-beans",
    "nameEn": "Pinto beans",
    "nameKu": "فاسولیای پینتۆ",
    "category": "legumes",
    "servingSizeEn": "100 g",
    "servingSizeKu": "١٠٠ گرام",
    "caloriesEstimate": 143,
    "protein": 9,
    "carbohydrates": 26,
    "fat": 0.7,
    "fiber": 9,
    "vitamins": [
      "Folate"
    ],
    "minerals": [
      "Iron",
      "Magnesium"
    ],
    "allergens": [],
    "suitabilityEn": "Pinto beans is a source of dietary fiber and protein. It generally fits vegan, gluten-free eating patterns. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "فاسولیای پینتۆ سەرچاوەیەکی فایبەری خۆراکی و پرۆتینـە. بەگشتی گونجاوە بۆ خواردنی ڤیگان، بەبێ گلوتن. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Boiled and mashed or added to stews.",
    "prepKu": "دەکوڵێنرێت و دەکوترێت یان لە خواردنی کوڵاودا بەکاردێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "lima-beans",
    "nameEn": "Lima beans",
    "nameKu": "فاسولیای لیما",
    "category": "legumes",
    "servingSizeEn": "100 g",
    "servingSizeKu": "١٠٠ گرام",
    "caloriesEstimate": 115,
    "protein": 7.8,
    "carbohydrates": 21,
    "fat": 0.4,
    "fiber": 7,
    "vitamins": [
      "Folate"
    ],
    "minerals": [
      "Iron",
      "Potassium"
    ],
    "allergens": [],
    "suitabilityEn": "Lima beans is a source of protein and dietary fiber. It generally fits vegan, gluten-free eating patterns. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "فاسولیای لیما سەرچاوەیەکی پرۆتین و فایبەری خۆراکیـە. بەگشتی گونجاوە بۆ خواردنی ڤیگان، بەبێ گلوتن. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Boiled and added to soups and stews.",
    "prepKu": "دەکوڵێنرێت و لە شۆربا و خواردنی کوڵاودا بەکاردێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "lentils-green",
    "nameEn": "Green lentils",
    "nameKu": "نیسکی سەوز",
    "category": "legumes",
    "servingSizeEn": "100 g",
    "servingSizeKu": "١٠٠ گرام",
    "caloriesEstimate": 116,
    "protein": 9,
    "carbohydrates": 20,
    "fat": 0.4,
    "fiber": 8,
    "vitamins": [
      "Folate"
    ],
    "minerals": [
      "Iron",
      "Magnesium"
    ],
    "allergens": [],
    "suitabilityEn": "Green lentils is a source of protein and iron. It generally fits vegan, gluten-free eating patterns. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "نیسکی سەوز سەرچاوەیەکی پرۆتین و ئاسنـە. بەگشتی گونجاوە بۆ خواردنی ڤیگان، بەبێ گلوتن. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Boiled and holds its shape well in salads.",
    "prepKu": "دەکوڵێنرێت و شێوەی خۆی باش ڕادەگرێت لە سالاددا.",
    "relatedRecipeIds": []
  },
  {
    "id": "walnut",
    "nameEn": "Walnut",
    "nameKu": "گوێز",
    "category": "nuts-seeds",
    "servingSizeEn": "30 g",
    "servingSizeKu": "٣٠ گرام",
    "caloriesEstimate": 654,
    "protein": 15,
    "carbohydrates": 14,
    "fat": 65,
    "fiber": 6.7,
    "vitamins": [
      "Vitamin E",
      "Vitamin B6"
    ],
    "minerals": [
      "Magnesium"
    ],
    "allergens": [
      "tree nuts"
    ],
    "suitabilityEn": "Walnut is a source of omega-3 fatty acids and unsaturated fats. It generally fits vegan, gluten-free eating patterns. It contains tree nuts, so avoid it if you have a related allergy. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "گوێز سەرچاوەیەکی ئاسیدی چەوری omega-3 و چەوری ناڕاژاوـە. بەگشتی گونجاوە بۆ خواردنی ڤیگان، بەبێ گلوتن. پێکهاتەی گوێزی دار تێدایە، بۆیە ئەگەر ئالەرجیت هەیە خۆت لێ بپارێزە. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Eaten raw as a snack or added to rice, salads, and desserts.",
    "prepKu": "چێو وەک خواردنی سووک دەخورێت یان لە برنج، سالاد و شیرینیدا بەکاردێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "almond",
    "nameEn": "Almond",
    "nameKu": "بادەم",
    "category": "nuts-seeds",
    "servingSizeEn": "30 g",
    "servingSizeKu": "٣٠ گرام",
    "caloriesEstimate": 579,
    "protein": 21,
    "carbohydrates": 22,
    "fat": 50,
    "fiber": 12.5,
    "vitamins": [
      "Vitamin E"
    ],
    "minerals": [
      "Magnesium",
      "Calcium"
    ],
    "allergens": [
      "tree nuts"
    ],
    "suitabilityEn": "Almond is a source of vitamin E and unsaturated fats. It generally fits vegan, gluten-free eating patterns. It contains tree nuts, so avoid it if you have a related allergy. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "بادەم سەرچاوەیەکی ڤیتامین E و چەوری ناڕاژاوـە. بەگشتی گونجاوە بۆ خواردنی ڤیگان، بەبێ گلوتن. پێکهاتەی گوێزی دار تێدایە، بۆیە ئەگەر ئالەرجیت هەیە خۆت لێ بپارێزە. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Eaten raw, roasted, or sliced over dishes.",
    "prepKu": "چێو یان برژاوی دەخورێت، یان بەسەر خواردنەکاندا پارچە دەکرێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "pistachio",
    "nameEn": "Pistachio",
    "nameKu": "فستق",
    "category": "nuts-seeds",
    "servingSizeEn": "30 g",
    "servingSizeKu": "٣٠ گرام",
    "caloriesEstimate": 560,
    "protein": 20,
    "carbohydrates": 28,
    "fat": 45,
    "fiber": 10,
    "vitamins": [
      "Vitamin B6"
    ],
    "minerals": [
      "Potassium"
    ],
    "allergens": [
      "tree nuts"
    ],
    "suitabilityEn": "Pistachio is a source of protein and unsaturated fats. It generally fits vegan, gluten-free eating patterns. It contains tree nuts, so avoid it if you have a related allergy. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "فستق سەرچاوەیەکی پرۆتین و چەوری ناڕاژاوـە. بەگشتی گونجاوە بۆ خواردنی ڤیگان، بەبێ گلوتن. پێکهاتەی گوێزی دار تێدایە، بۆیە ئەگەر ئالەرجیت هەیە خۆت لێ بپارێزە. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Eaten as a snack or crushed over desserts.",
    "prepKu": "وەک خواردنی سووک دەخورێت یان کوتراو بەسەر شیرینیدا دەخرێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "cashew",
    "nameEn": "Cashew",
    "nameKu": "کاجو",
    "category": "nuts-seeds",
    "servingSizeEn": "30 g",
    "servingSizeKu": "٣٠ گرام",
    "caloriesEstimate": 553,
    "protein": 18,
    "carbohydrates": 30,
    "fat": 44,
    "fiber": 3.3,
    "vitamins": [
      "Vitamin K"
    ],
    "minerals": [
      "Magnesium",
      "Zinc"
    ],
    "allergens": [
      "tree nuts"
    ],
    "suitabilityEn": "Cashew is a source of unsaturated fats and magnesium. It generally fits vegan, gluten-free eating patterns. It contains tree nuts, so avoid it if you have a related allergy. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "کاجو سەرچاوەیەکی چەوری ناڕاژاو و ماگنیزیۆمـە. بەگشتی گونجاوە بۆ خواردنی ڤیگان، بەبێ گلوتن. پێکهاتەی گوێزی دار تێدایە، بۆیە ئەگەر ئالەرجیت هەیە خۆت لێ بپارێزە. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Eaten raw, roasted, or added to stir-fries.",
    "prepKu": "چێو، برژاو یان لە سواتیندا بەکاردێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "hazelnut",
    "nameEn": "Hazelnut",
    "nameKu": "فیندق",
    "category": "nuts-seeds",
    "servingSizeEn": "30 g",
    "servingSizeKu": "٣٠ گرام",
    "caloriesEstimate": 628,
    "protein": 15,
    "carbohydrates": 17,
    "fat": 61,
    "fiber": 9.7,
    "vitamins": [
      "Vitamin E"
    ],
    "minerals": [
      "Manganese"
    ],
    "allergens": [
      "tree nuts"
    ],
    "suitabilityEn": "Hazelnut is a source of vitamin E and unsaturated fats. It generally fits vegan, gluten-free eating patterns. It contains tree nuts, so avoid it if you have a related allergy. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "فیندق سەرچاوەیەکی ڤیتامین E و چەوری ناڕاژاوـە. بەگشتی گونجاوە بۆ خواردنی ڤیگان، بەبێ گلوتن. پێکهاتەی گوێزی دار تێدایە، بۆیە ئەگەر ئالەرجیت هەیە خۆت لێ بپارێزە. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Eaten raw, roasted, or ground into spreads.",
    "prepKu": "چێو، برژاو یان هاڕدراو بۆ مواد لکاو بەکاردێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "peanut",
    "nameEn": "Peanut",
    "nameKu": "بادەمی زەمینی",
    "category": "nuts-seeds",
    "servingSizeEn": "30 g",
    "servingSizeKu": "٣٠ گرام",
    "caloriesEstimate": 567,
    "protein": 26,
    "carbohydrates": 16,
    "fat": 49,
    "fiber": 8.5,
    "vitamins": [
      "Vitamin E",
      "Vitamin B3"
    ],
    "minerals": [
      "Magnesium"
    ],
    "allergens": [
      "peanuts"
    ],
    "suitabilityEn": "Peanut is a source of protein and unsaturated fats. It generally fits vegan, gluten-free eating patterns. It contains peanuts, so avoid it if you have a related allergy. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "بادەمی زەمینی سەرچاوەیەکی پرۆتین و چەوری ناڕاژاوـە. بەگشتی گونجاوە بۆ خواردنی ڤیگان، بەبێ گلوتن. پێکهاتەی بادەمی زەمینی تێدایە، بۆیە ئەگەر ئالەرجیت هەیە خۆت لێ بپارێزە. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Eaten roasted as a snack or ground into peanut butter.",
    "prepKu": "برژاو وەک خواردنی سووک دەخورێت یان هاڕدراو بۆ کرێمی بادem بەکاردێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "pine-nuts",
    "nameEn": "Pine nuts",
    "nameKu": "دەنکی سنەوبەر",
    "category": "nuts-seeds",
    "servingSizeEn": "20 g",
    "servingSizeKu": "٢٠ گرام",
    "caloriesEstimate": 673,
    "protein": 14,
    "carbohydrates": 13,
    "fat": 68,
    "fiber": 3.7,
    "vitamins": [
      "Vitamin E",
      "Vitamin K"
    ],
    "minerals": [
      "Manganese"
    ],
    "allergens": [
      "tree nuts"
    ],
    "suitabilityEn": "Pine nuts is a source of unsaturated fats and vitamin E. It generally fits vegan, gluten-free eating patterns. It contains tree nuts, so avoid it if you have a related allergy. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "دەنکی سنەوبەر سەرچاوەیەکی چەوری ناڕاژاو و ڤیتامین Eـە. بەگشتی گونجاوە بۆ خواردنی ڤیگان، بەبێ گلوتن. پێکهاتەی گوێزی دار تێدایە، بۆیە ئەگەر ئالەرجیت هەیە خۆت لێ بپارێزە. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Toasted and sprinkled over rice and desserts.",
    "prepKu": "برژاو دەکرێت و بەسەر برنج و شیرینیدا پرژاو دەکرێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "pumpkin-seeds",
    "nameEn": "Pumpkin seeds",
    "nameKu": "تۆوی کەدو",
    "category": "nuts-seeds",
    "servingSizeEn": "30 g",
    "servingSizeKu": "٣٠ گرام",
    "caloriesEstimate": 559,
    "protein": 30,
    "carbohydrates": 11,
    "fat": 49,
    "fiber": 6,
    "vitamins": [
      "Vitamin E",
      "Vitamin K"
    ],
    "minerals": [
      "Zinc",
      "Magnesium"
    ],
    "allergens": [],
    "suitabilityEn": "Pumpkin seeds is a source of protein and zinc. It generally fits vegan, gluten-free eating patterns. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "تۆوی کەدو سەرچاوەیەکی پرۆتین و زینکـە. بەگشتی گونجاوە بۆ خواردنی ڤیگان، بەبێ گلوتن. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Roasted and eaten as a snack.",
    "prepKu": "برژاو دەکرێت و وەک خواردنی سووک دەخورێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "sunflower-seeds",
    "nameEn": "Sunflower seeds",
    "nameKu": "تۆوی گوڵەبەروژ",
    "category": "nuts-seeds",
    "servingSizeEn": "30 g",
    "servingSizeKu": "٣٠ گرام",
    "caloriesEstimate": 584,
    "protein": 21,
    "carbohydrates": 20,
    "fat": 51,
    "fiber": 8.6,
    "vitamins": [
      "Vitamin E",
      "Vitamin B1"
    ],
    "minerals": [
      "Magnesium",
      "Selenium"
    ],
    "allergens": [],
    "suitabilityEn": "Sunflower seeds is a source of vitamin E and protein. It generally fits vegan, gluten-free eating patterns. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "تۆوی گوڵەبەروژ سەرچاوەیەکی ڤیتامین E و پرۆتینـە. بەگشتی گونجاوە بۆ خواردنی ڤیگان، بەبێ گلوتن. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Roasted and eaten as a snack.",
    "prepKu": "برژاو دەکرێت و وەک خواردنی سووک دەخورێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "sesame-seeds",
    "nameEn": "Sesame seeds",
    "nameKu": "تۆوی کونجی",
    "category": "nuts-seeds",
    "servingSizeEn": "15 g",
    "servingSizeKu": "١٥ گرام",
    "caloriesEstimate": 573,
    "protein": 18,
    "carbohydrates": 23,
    "fat": 50,
    "fiber": 12,
    "vitamins": [
      "Vitamin B1"
    ],
    "minerals": [
      "Calcium",
      "Iron"
    ],
    "allergens": [
      "sesame"
    ],
    "suitabilityEn": "Sesame seeds is a source of calcium and iron. It generally fits vegan, gluten-free eating patterns. It contains sesame, so avoid it if you have a related allergy. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "تۆوی کونجی سەرچاوەیەکی کالسیۆم و ئاسنـە. بەگشتی گونجاوە بۆ خواردنی ڤیگان، بەبێ گلوتن. پێکهاتەی کونجی تێدایە، بۆیە ئەگەر ئالەرجیت هەیە خۆت لێ بپارێزە. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Sprinkled on bread, or ground into tahini and halva.",
    "prepKu": "بەسەر نان پرژاو دەکرێت یان هاڕدراو بۆ تەحین و حەلاوە بەکاردێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "chia-seeds",
    "nameEn": "Chia seeds",
    "nameKu": "تۆوی چیا",
    "category": "nuts-seeds",
    "servingSizeEn": "15 g",
    "servingSizeKu": "١٥ گرام",
    "caloriesEstimate": 486,
    "protein": 17,
    "carbohydrates": 42,
    "fat": 31,
    "fiber": 34,
    "vitamins": [
      "Vitamin B3"
    ],
    "minerals": [
      "Calcium",
      "Magnesium"
    ],
    "allergens": [],
    "suitabilityEn": "Chia seeds is a source of dietary fiber and omega-3 fatty acids. It generally fits vegan, gluten-free eating patterns. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "تۆوی چیا سەرچاوەیەکی فایبەری خۆراکی و ئاسیدی چەوری omega-3ـە. بەگشتی گونجاوە بۆ خواردنی ڤیگان، بەبێ گلوتن. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Soaked in liquid to form a gel for puddings, or sprinkled on yogurt.",
    "prepKu": "لە شل هەڵدەخرێت بۆ دروستکردنی ژێلێک بۆ پودینگ، یان بەسەر مۆستدا پرژاو دەکرێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "flax-seeds",
    "nameEn": "Flax seeds",
    "nameKu": "تۆوی کەتان",
    "category": "nuts-seeds",
    "servingSizeEn": "15 g",
    "servingSizeKu": "١٥ گرام",
    "caloriesEstimate": 534,
    "protein": 18,
    "carbohydrates": 29,
    "fat": 42,
    "fiber": 27,
    "vitamins": [
      "Vitamin B1"
    ],
    "minerals": [
      "Magnesium"
    ],
    "allergens": [],
    "suitabilityEn": "Flax seeds is a source of dietary fiber and omega-3 fatty acids. It generally fits vegan, gluten-free eating patterns. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "تۆوی کەتان سەرچاوەیەکی فایبەری خۆراکی و ئاسیدی چەوری omega-3ـە. بەگشتی گونجاوە بۆ خواردنی ڤیگان، بەبێ گلوتن. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Ground and sprinkled on oats, smoothies, or baked goods.",
    "prepKu": "هاڕدراو بەسەر یوڵاف، سمووثی یان شتومەکی نانپژیندا پرژاو دەکرێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "brazil-nuts",
    "nameEn": "Brazil nuts",
    "nameKu": "گوێزی بەرازیل",
    "category": "nuts-seeds",
    "servingSizeEn": "20 g",
    "servingSizeKu": "٢٠ گرام",
    "caloriesEstimate": 659,
    "protein": 14,
    "carbohydrates": 12,
    "fat": 67,
    "fiber": 7.5,
    "vitamins": [
      "Vitamin E"
    ],
    "minerals": [
      "Selenium"
    ],
    "allergens": [
      "tree nuts"
    ],
    "suitabilityEn": "Brazil nuts is a source of selenium and unsaturated fats. It generally fits vegan, gluten-free eating patterns. It contains tree nuts, so avoid it if you have a related allergy. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "گوێزی بەرازیل سەرچاوەیەکی سیلینیۆم و چەوری ناڕاژاوـە. بەگشتی گونجاوە بۆ خواردنی ڤیگان، بەبێ گلوتن. پێکهاتەی گوێزی دار تێدایە، بۆیە ئەگەر ئالەرجیت هەیە خۆت لێ بپارێزە. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Eaten raw as a snack, in small amounts due to high selenium content.",
    "prepKu": "چێو وەک خواردنی سووک دەخورێت، بەکەمی چونکە سیلینیۆمی زۆری تێدایە.",
    "relatedRecipeIds": []
  },
  {
    "id": "macadamia-nuts",
    "nameEn": "Macadamia nuts",
    "nameKu": "گوێزی مکادامیا",
    "category": "nuts-seeds",
    "servingSizeEn": "30 g",
    "servingSizeKu": "٣٠ گرام",
    "caloriesEstimate": 718,
    "protein": 7.9,
    "carbohydrates": 14,
    "fat": 76,
    "fiber": 8.6,
    "vitamins": [
      "Vitamin B1"
    ],
    "minerals": [
      "Manganese"
    ],
    "allergens": [
      "tree nuts"
    ],
    "suitabilityEn": "Macadamia nuts is a source of unsaturated fats. It generally fits vegan, gluten-free eating patterns. It contains tree nuts, so avoid it if you have a related allergy. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "گوێزی مکادامیا سەرچاوەیەکی چەوری ناڕاژاوـە. بەگشتی گونجاوە بۆ خواردنی ڤیگان، بەبێ گلوتن. پێکهاتەی گوێزی دار تێدایە، بۆیە ئەگەر ئالەرجیت هەیە خۆت لێ بپارێزە. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Eaten raw or roasted as a snack.",
    "prepKu": "چێو یان برژاو وەک خواردنی سووک دەخورێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "pecan",
    "nameEn": "Pecan",
    "nameKu": "گوێزی پیکان",
    "category": "nuts-seeds",
    "servingSizeEn": "30 g",
    "servingSizeKu": "٣٠ گرام",
    "caloriesEstimate": 691,
    "protein": 9.2,
    "carbohydrates": 14,
    "fat": 72,
    "fiber": 9.6,
    "vitamins": [
      "Vitamin E",
      "Vitamin B1"
    ],
    "minerals": [
      "Manganese",
      "Zinc"
    ],
    "allergens": [
      "tree nuts"
    ],
    "suitabilityEn": "Pecan is a source of unsaturated fats and vitamin E. It generally fits vegan, gluten-free eating patterns. It contains tree nuts, so avoid it if you have a related allergy. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "گوێزی پیکان سەرچاوەیەکی چەوری ناڕاژاو و ڤیتامین Eـە. بەگشتی گونجاوە بۆ خواردنی ڤیگان، بەبێ گلوتن. پێکهاتەی گوێزی دار تێدایە، بۆیە ئەگەر ئالەرجیت هەیە خۆت لێ بپارێزە. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Eaten raw or added to baked goods and desserts.",
    "prepKu": "چێو دەخورێت یان لە شتومەکی نانپژین و شیرینیدا بەکاردێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "olive-oil",
    "nameEn": "Olive oil",
    "nameKu": "ڕۆنی زەیتوون",
    "category": "oils-fats",
    "servingSizeEn": "1 tbsp (14 g)",
    "servingSizeKu": "١ کەوچک (١٤ گرام)",
    "caloriesEstimate": 884,
    "protein": 0,
    "carbohydrates": 0,
    "fat": 100,
    "fiber": 0,
    "vitamins": [
      "Vitamin E",
      "Vitamin K"
    ],
    "minerals": [],
    "allergens": [],
    "suitabilityEn": "Olive oil is a source of unsaturated fats and vitamin E. It generally fits vegan, gluten-free eating patterns. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "ڕۆنی زەیتوون سەرچاوەیەکی چەوری ناڕاژاو و ڤیتامین Eـە. بەگشتی گونجاوە بۆ خواردنی ڤیگان، بەبێ گلوتن. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Used for cooking, drizzling on salads, and dipping bread.",
    "prepKu": "بۆ چێشتلێنان، پرژاندن بەسەر سالاد و هەڵمژینی نان بەکاردێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "sunflower-oil",
    "nameEn": "Sunflower oil",
    "nameKu": "ڕۆنی گوڵەبەروژ",
    "category": "oils-fats",
    "servingSizeEn": "1 tbsp (14 g)",
    "servingSizeKu": "١ کەوچک (١٤ گرام)",
    "caloriesEstimate": 884,
    "protein": 0,
    "carbohydrates": 0,
    "fat": 100,
    "fiber": 0,
    "vitamins": [
      "Vitamin E"
    ],
    "minerals": [],
    "allergens": [],
    "suitabilityEn": "Sunflower oil is a source of vitamin E and unsaturated fats. It generally fits vegan, gluten-free eating patterns. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "ڕۆنی گوڵەبەروژ سەرچاوەیەکی ڤیتامین E و چەوری ناڕاژاوـە. بەگشتی گونجاوە بۆ خواردنی ڤیگان، بەبێ گلوتن. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Used for frying and general cooking.",
    "prepKu": "بۆ سرووتاوکردن و چێشتلێنانی گشتی بەکاردێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "corn-oil",
    "nameEn": "Corn oil",
    "nameKu": "ڕۆنی زەڕی گەنم",
    "category": "oils-fats",
    "servingSizeEn": "1 tbsp (14 g)",
    "servingSizeKu": "١ کەوچک (١٤ گرام)",
    "caloriesEstimate": 884,
    "protein": 0,
    "carbohydrates": 0,
    "fat": 100,
    "fiber": 0,
    "vitamins": [
      "Vitamin E"
    ],
    "minerals": [],
    "allergens": [],
    "suitabilityEn": "Corn oil is a source of unsaturated fats. It generally fits vegan, gluten-free eating patterns. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "ڕۆنی زەڕی گەنم سەرچاوەیەکی چەوری ناڕاژاوـە. بەگشتی گونجاوە بۆ خواردنی ڤیگان، بەبێ گلوتن. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Used for frying and baking.",
    "prepKu": "بۆ سرووتاوکردن و نانپژین بەکاردێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "vegetable-oil",
    "nameEn": "Vegetable oil (blend)",
    "nameKu": "ڕۆنی ڕووەکی",
    "category": "oils-fats",
    "servingSizeEn": "1 tbsp (14 g)",
    "servingSizeKu": "١ کەوچک (١٤ گرام)",
    "caloriesEstimate": 884,
    "protein": 0,
    "carbohydrates": 0,
    "fat": 100,
    "fiber": 0,
    "vitamins": [
      "Vitamin E"
    ],
    "minerals": [],
    "allergens": [],
    "suitabilityEn": "Vegetable oil (blend) is a source of concentrated energy (calories). It generally fits vegan, gluten-free eating patterns. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "ڕۆنی ڕووەکی سەرچاوەیەکی وزەی چڕ (کالۆری)ـە. بەگشتی گونجاوە بۆ خواردنی ڤیگان، بەبێ گلوتن. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "General-purpose oil for everyday cooking.",
    "prepKu": "ڕۆنێکی گشتیە بۆ چێشتلێنانی ڕۆژانە.",
    "relatedRecipeIds": []
  },
  {
    "id": "tahini",
    "nameEn": "Tahini (sesame paste)",
    "nameKu": "تەحین",
    "category": "oils-fats",
    "servingSizeEn": "2 tbsp (30 g)",
    "servingSizeKu": "٢ کەوچک (٣٠ گرام)",
    "caloriesEstimate": 595,
    "protein": 17,
    "carbohydrates": 21,
    "fat": 54,
    "fiber": 9.3,
    "vitamins": [
      "Vitamin B1"
    ],
    "minerals": [
      "Calcium",
      "Iron"
    ],
    "allergens": [
      "sesame"
    ],
    "suitabilityEn": "Tahini (sesame paste) is a source of calcium and unsaturated fats. It generally fits vegan, gluten-free eating patterns. It contains sesame, so avoid it if you have a related allergy. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "تەحین سەرچاوەیەکی کالسیۆم و چەوری ناڕاژاوـە. بەگشتی گونجاوە بۆ خواردنی ڤیگان، بەبێ گلوتن. پێکهاتەی کونجی تێدایە، بۆیە ئەگەر ئالەرجیت هەیە خۆت لێ بپارێزە. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Blended into hummus and halva, or drizzled over dishes.",
    "prepKu": "لە حومس و حەلاوەدا دەهاڕدرێت، یان بەسەر خواردندا دەپرژرێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "sesame-oil",
    "nameEn": "Sesame oil",
    "nameKu": "ڕۆنی کونجی",
    "category": "oils-fats",
    "servingSizeEn": "1 tbsp (14 g)",
    "servingSizeKu": "١ کەوچک (١٤ گرام)",
    "caloriesEstimate": 884,
    "protein": 0,
    "carbohydrates": 0,
    "fat": 100,
    "fiber": 0,
    "vitamins": [
      "Vitamin E",
      "Vitamin K"
    ],
    "minerals": [],
    "allergens": [
      "sesame"
    ],
    "suitabilityEn": "Sesame oil is a source of unsaturated fats and vitamin E. It generally fits vegan, gluten-free eating patterns. It contains sesame, so avoid it if you have a related allergy. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "ڕۆنی کونجی سەرچاوەیەکی چەوری ناڕاژاو و ڤیتامین Eـە. بەگشتی گونجاوە بۆ خواردنی ڤیگان، بەبێ گلوتن. پێکهاتەی کونجی تێدایە، بۆیە ئەگەر ئالەرجیت هەیە خۆت لێ بپارێزە. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Used sparingly to flavor cooked dishes.",
    "prepKu": "بەکەمی بۆ تامدانی خواردنی کوڵاو بەکاردێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "coconut-oil",
    "nameEn": "Coconut oil",
    "nameKu": "ڕۆنی ناڕگیل",
    "category": "oils-fats",
    "servingSizeEn": "1 tbsp (14 g)",
    "servingSizeKu": "١ کەوچک (١٤ گرام)",
    "caloriesEstimate": 862,
    "protein": 0,
    "carbohydrates": 0,
    "fat": 100,
    "fiber": 0,
    "vitamins": [
      "Vitamin E"
    ],
    "minerals": [],
    "allergens": [],
    "suitabilityEn": "Coconut oil is a source of concentrated energy (calories). It generally fits vegan, gluten-free eating patterns. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "ڕۆنی ناڕگیل سەرچاوەیەکی وزەی چڕ (کالۆری)ـە. بەگشتی گونجاوە بۆ خواردنی ڤیگان، بەبێ گلوتن. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Used for baking and some frying, best in moderation.",
    "prepKu": "بۆ نانپژین و هەندێک سرووتاوکردن بەکاردێت، باشترە بەئەندازە بەکاربهێنرێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "margarine",
    "nameEn": "Margarine",
    "nameKu": "مارگرین",
    "category": "oils-fats",
    "servingSizeEn": "1 tbsp (14 g)",
    "servingSizeKu": "١ کەوچک (١٤ گرام)",
    "caloriesEstimate": 717,
    "protein": 0.2,
    "carbohydrates": 0.9,
    "fat": 81,
    "fiber": 0,
    "vitamins": [
      "Vitamin E",
      "Vitamin A"
    ],
    "minerals": [],
    "allergens": [],
    "suitabilityEn": "Margarine is a source of concentrated energy (calories). It generally fits vegan, gluten-free eating patterns. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "مارگرین سەرچاوەیەکی وزەی چڕ (کالۆری)ـە. بەگشتی گونجاوە بۆ خواردنی ڤیگان، بەبێ گلوتن. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Spread on bread or used in baking, best in moderation.",
    "prepKu": "لەسەر نان دەخرێت یان لە نانپژیندا بەکاردێت، باشترە بەئەندازە بەکاربهێنرێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "sheep-tail-fat",
    "nameEn": "Sheep tail fat (dhun)",
    "nameKu": "دوونی مەڕ",
    "category": "oils-fats",
    "servingSizeEn": "1 tbsp (14 g)",
    "servingSizeKu": "١ کەوچک (١٤ گرام)",
    "caloriesEstimate": 845,
    "protein": 0.5,
    "carbohydrates": 0,
    "fat": 90,
    "fiber": 0,
    "vitamins": [],
    "minerals": [],
    "allergens": [],
    "suitabilityEn": "Sheep tail fat (dhun) is a source of concentrated energy (calories). It generally fits omnivore eating patterns. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "دوونی مەڕ سەرچاوەیەکی وزەی چڕ (کالۆری)ـە. بەگشتی گونجاوە بۆ خواردنی زۆربەی خواردنەکان. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Traditionally rendered and used sparingly to flavor rice and meat dishes.",
    "prepKu": "بەشێوەی نەریتی دەتوێنرێتەوە و بەکەمی بۆ تامدانی برنج و خواردنی گۆشت بەکاردێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "avocado-oil",
    "nameEn": "Avocado oil",
    "nameKu": "ڕۆنی ئەڤۆکادۆ",
    "category": "oils-fats",
    "servingSizeEn": "1 tbsp (14 g)",
    "servingSizeKu": "١ کەوچک (١٤ گرام)",
    "caloriesEstimate": 884,
    "protein": 0,
    "carbohydrates": 0,
    "fat": 100,
    "fiber": 0,
    "vitamins": [
      "Vitamin E"
    ],
    "minerals": [],
    "allergens": [],
    "suitabilityEn": "Avocado oil is a source of unsaturated fats and vitamin E. It generally fits vegan, gluten-free eating patterns. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "ڕۆنی ئەڤۆکادۆ سەرچاوەیەکی چەوری ناڕاژاو و ڤیتامین Eـە. بەگشتی گونجاوە بۆ خواردنی ڤیگان، بەبێ گلوتن. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Used for drizzling on salads or light cooking.",
    "prepKu": "بۆ پرژاندن بەسەر سالاد یان چێشتلێنانی سووک بەکاردێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "parsley",
    "nameEn": "Parsley",
    "nameKu": "جەعدە",
    "category": "herbs-spices",
    "servingSizeEn": "10 g fresh",
    "servingSizeKu": "١٠ گرام تازە",
    "caloriesEstimate": 36,
    "protein": 3,
    "carbohydrates": 6.3,
    "fat": 0.8,
    "fiber": 3.3,
    "vitamins": [
      "Vitamin K",
      "Vitamin C"
    ],
    "minerals": [],
    "allergens": [],
    "suitabilityEn": "Parsley is a source of vitamin K and vitamin C. It generally fits vegan, gluten-free eating patterns. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "جەعدە سەرچاوەیەکی ڤیتامین K و ڤیتامین Cـە. بەگشتی گونجاوە بۆ خواردنی ڤیگان، بەبێ گلوتن. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Chopped fresh into salads like tabbouleh, or used as a garnish.",
    "prepKu": "تازە پرتکراو لە سالادی وەک تەبولەدا بەکاردێت، یان بۆ ڕازاندنەوە بەکاردێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "mint",
    "nameEn": "Mint",
    "nameKu": "پونگ",
    "category": "herbs-spices",
    "servingSizeEn": "10 g fresh",
    "servingSizeKu": "١٠ گرام تازە",
    "caloriesEstimate": 70,
    "protein": 3.8,
    "carbohydrates": 15,
    "fat": 0.9,
    "fiber": 8,
    "vitamins": [
      "Vitamin A",
      "Vitamin C"
    ],
    "minerals": [],
    "allergens": [],
    "suitabilityEn": "Mint is a source of vitamin A and vitamin C. It generally fits vegan, gluten-free eating patterns. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "پونگ سەرچاوەیەکی ڤیتامین A و ڤیتامین Cـە. بەگشتی گونجاوە بۆ خواردنی ڤیگان، بەبێ گلوتن. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Used fresh in salads, drinks, and yogurt dishes, or dried in tea.",
    "prepKu": "تازە لە سالاد، خواردنەوە و خواردنی مۆستدا بەکاردێت، یان وشکاوی لە چایدا.",
    "relatedRecipeIds": []
  },
  {
    "id": "dill",
    "nameEn": "Dill",
    "nameKu": "شبت",
    "category": "herbs-spices",
    "servingSizeEn": "10 g fresh",
    "servingSizeKu": "١٠ گرام تازە",
    "caloriesEstimate": 43,
    "protein": 3.5,
    "carbohydrates": 7,
    "fat": 1.1,
    "fiber": 2.1,
    "vitamins": [
      "Vitamin C",
      "Vitamin A"
    ],
    "minerals": [],
    "allergens": [],
    "suitabilityEn": "Dill is a source of vitamin C and vitamin A. It generally fits vegan, gluten-free eating patterns. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "شبت سەرچاوەیەکی ڤیتامین C و ڤیتامین Aـە. بەگشتی گونجاوە بۆ خواردنی ڤیگان، بەبێ گلوتن. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Chopped fresh into rice dishes, salads, and yogurt sauces.",
    "prepKu": "تازە پرتکراو لە خواردنی برنج، سالاد و سۆسی مۆستدا بەکاردێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "cilantro",
    "nameEn": "Cilantro (coriander leaves)",
    "nameKu": "کەزبەرە",
    "category": "herbs-spices",
    "servingSizeEn": "10 g fresh",
    "servingSizeKu": "١٠ گرام تازە",
    "caloriesEstimate": 23,
    "protein": 2.1,
    "carbohydrates": 3.7,
    "fat": 0.5,
    "fiber": 2.8,
    "vitamins": [
      "Vitamin K",
      "Vitamin C"
    ],
    "minerals": [],
    "allergens": [],
    "suitabilityEn": "Cilantro (coriander leaves) is a source of vitamin K and vitamin C. It generally fits vegan, gluten-free eating patterns. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "کەزبەرە سەرچاوەیەکی ڤیتامین K و ڤیتامین Cـە. بەگشتی گونجاوە بۆ خواردنی ڤیگان، بەبێ گلوتن. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Chopped fresh into salads, soups, and marinades.",
    "prepKu": "تازە پرتکراو لە سالاد، شۆربا و ترشاودا بەکاردێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "basil",
    "nameEn": "Basil",
    "nameKu": "ڕیحان",
    "category": "herbs-spices",
    "servingSizeEn": "10 g fresh",
    "servingSizeKu": "١٠ گرام تازە",
    "caloriesEstimate": 23,
    "protein": 3.2,
    "carbohydrates": 2.7,
    "fat": 0.6,
    "fiber": 1.6,
    "vitamins": [
      "Vitamin K",
      "Vitamin A"
    ],
    "minerals": [],
    "allergens": [],
    "suitabilityEn": "Basil is a source of vitamin K and vitamin A. It generally fits vegan, gluten-free eating patterns. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "ڕیحان سەرچاوەیەکی ڤیتامین K و ڤیتامین Aـە. بەگشتی گونجاوە بۆ خواردنی ڤیگان، بەبێ گلوتن. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Used fresh in salads and sauces, or dried in cooked dishes.",
    "prepKu": "تازە لە سالاد و سۆسدا بەکاردێت، یان وشکاوی لە خواردنی کوڵاودا.",
    "relatedRecipeIds": []
  },
  {
    "id": "thyme",
    "nameEn": "Thyme (dried)",
    "nameKu": "کاکوتی",
    "category": "herbs-spices",
    "servingSizeEn": "5 g dried",
    "servingSizeKu": "٥ گرام وشک",
    "caloriesEstimate": 276,
    "protein": 9.1,
    "carbohydrates": 64,
    "fat": 7.4,
    "fiber": 37,
    "vitamins": [
      "Vitamin C",
      "Vitamin A"
    ],
    "minerals": [
      "Iron",
      "Manganese"
    ],
    "allergens": [],
    "suitabilityEn": "Thyme (dried) is a source of iron and antioxidants. It generally fits vegan, gluten-free eating patterns. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "کاکوتی سەرچاوەیەکی ئاسن و دژە ئۆکسیدانتـە. بەگشتی گونجاوە بۆ خواردنی ڤیگان، بەبێ گلوتن. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Sprinkled dried over bread with oil, or added to stews.",
    "prepKu": "وشکاوی لەگەڵ ڕۆن بەسەر نان پرژاو دەکرێت، یان لە خواردنی کوڵاودا بەکاردێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "oregano",
    "nameEn": "Oregano (dried)",
    "nameKu": "ئۆریگانۆ",
    "category": "herbs-spices",
    "servingSizeEn": "5 g dried",
    "servingSizeKu": "٥ گرام وشک",
    "caloriesEstimate": 265,
    "protein": 9,
    "carbohydrates": 69,
    "fat": 4.3,
    "fiber": 43,
    "vitamins": [
      "Vitamin K"
    ],
    "minerals": [
      "Iron",
      "Manganese"
    ],
    "allergens": [],
    "suitabilityEn": "Oregano (dried) is a source of iron and antioxidants. It generally fits vegan, gluten-free eating patterns. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "ئۆریگانۆ سەرچاوەیەکی ئاسن و دژە ئۆکسیدانتـە. بەگشتی گونجاوە بۆ خواردنی ڤیگان، بەبێ گلوتن. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Sprinkled over cooked dishes and salads.",
    "prepKu": "بەسەر خواردنی کوڵاو و سالاددا پرژاو دەکرێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "bay-leaf",
    "nameEn": "Bay leaf",
    "nameKu": "گەڵای دەفنە",
    "category": "herbs-spices",
    "servingSizeEn": "1 leaf (0.5 g)",
    "servingSizeKu": "١ گەڵا (٠.٥ گرام)",
    "caloriesEstimate": 313,
    "protein": 7.6,
    "carbohydrates": 75,
    "fat": 8.4,
    "fiber": 26,
    "vitamins": [
      "Vitamin A",
      "Vitamin C"
    ],
    "minerals": [
      "Manganese"
    ],
    "allergens": [],
    "suitabilityEn": "Bay leaf is a source of antioxidants. It generally fits vegan, gluten-free eating patterns. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "گەڵای دەفنە سەرچاوەیەکی دژە ئۆکسیدانتـە. بەگشتی گونجاوە بۆ خواردنی ڤیگان، بەبێ گلوتن. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Added whole to soups and stews, then removed before serving.",
    "prepKu": "بە تەواوی لە شۆربا و خواردنی کوڵاودا دەخرێت، پاشان پێش خۆراککردن دەردەکرێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "cumin",
    "nameEn": "Cumin (ground)",
    "nameKu": "زیرە",
    "category": "herbs-spices",
    "servingSizeEn": "5 g",
    "servingSizeKu": "٥ گرام",
    "caloriesEstimate": 375,
    "protein": 18,
    "carbohydrates": 44,
    "fat": 22,
    "fiber": 11,
    "vitamins": [
      "Vitamin C"
    ],
    "minerals": [
      "Iron"
    ],
    "allergens": [],
    "suitabilityEn": "Cumin (ground) is a source of iron. It generally fits vegan, gluten-free eating patterns. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "زیرە سەرچاوەیەکی ئاسنـە. بەگشتی گونجاوە بۆ خواردنی ڤیگان، بەبێ گلوتن. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "A common seasoning in rice, meat, and legume dishes.",
    "prepKu": "بەهارتێکی باوە لە خواردنی برنج، گۆشت و پاقلەمەنیدا.",
    "relatedRecipeIds": []
  },
  {
    "id": "coriander-seed",
    "nameEn": "Coriander seed (ground)",
    "nameKu": "تۆوی کەزبەرە",
    "category": "herbs-spices",
    "servingSizeEn": "5 g",
    "servingSizeKu": "٥ گرام",
    "caloriesEstimate": 298,
    "protein": 12,
    "carbohydrates": 55,
    "fat": 17,
    "fiber": 42,
    "vitamins": [],
    "minerals": [
      "Manganese",
      "Iron"
    ],
    "allergens": [],
    "suitabilityEn": "Coriander seed (ground) is a source of iron and dietary fiber. It generally fits vegan, gluten-free eating patterns. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "تۆوی کەزبەرە سەرچاوەیەکی ئاسن و فایبەری خۆراکیـە. بەگشتی گونجاوە بۆ خواردنی ڤیگان، بەبێ گلوتن. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Used ground in spice blends for meat and vegetable dishes.",
    "prepKu": "هاڕدراو لە تێکەڵەی بەهارات بۆ گۆشت و سەوزە بەکاردێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "turmeric",
    "nameEn": "Turmeric (ground)",
    "nameKu": "زەردەچۆبە",
    "category": "herbs-spices",
    "servingSizeEn": "5 g",
    "servingSizeKu": "٥ گرام",
    "caloriesEstimate": 312,
    "protein": 9.7,
    "carbohydrates": 67,
    "fat": 3.3,
    "fiber": 23,
    "vitamins": [
      "Vitamin C"
    ],
    "minerals": [
      "Iron",
      "Manganese"
    ],
    "allergens": [],
    "suitabilityEn": "Turmeric (ground) is a source of antioxidants and iron. It generally fits vegan, gluten-free eating patterns. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "زەردەچۆبە سەرچاوەیەکی دژە ئۆکسیدانت و ئاسنـە. بەگشتی گونجاوە بۆ خواردنی ڤیگان، بەبێ گلوتن. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Adds color and flavor to rice, stews, and curries.",
    "prepKu": "ڕەنگ و تام دەدات بە برنج، خواردنی کوڵاو و کاری.",
    "relatedRecipeIds": []
  },
  {
    "id": "black-pepper",
    "nameEn": "Black pepper (ground)",
    "nameKu": "بیبەری ڕەش",
    "category": "herbs-spices",
    "servingSizeEn": "2 g",
    "servingSizeKu": "٢ گرام",
    "caloriesEstimate": 251,
    "protein": 10,
    "carbohydrates": 64,
    "fat": 3.3,
    "fiber": 25,
    "vitamins": [
      "Vitamin K"
    ],
    "minerals": [
      "Manganese"
    ],
    "allergens": [],
    "suitabilityEn": "Black pepper (ground) is a source of antioxidants. It generally fits vegan, gluten-free eating patterns. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "بیبەری ڕەش سەرچاوەیەکی دژە ئۆکسیدانتـە. بەگشتی گونجاوە بۆ خواردنی ڤیگان، بەبێ گلوتن. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Ground fresh over most savory dishes.",
    "prepKu": "تازە هاڕدراو بەسەر زۆربەی خواردنی خواردا پرژاو دەکرێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "red-pepper-flakes",
    "nameEn": "Red pepper flakes",
    "nameKu": "بیبەری وردکراوی سور",
    "category": "herbs-spices",
    "servingSizeEn": "2 g",
    "servingSizeKu": "٢ گرام",
    "caloriesEstimate": 282,
    "protein": 12,
    "carbohydrates": 50,
    "fat": 15,
    "fiber": 35,
    "vitamins": [
      "Vitamin A",
      "Vitamin C"
    ],
    "minerals": [],
    "allergens": [],
    "suitabilityEn": "Red pepper flakes is a source of vitamin A and antioxidants. It generally fits vegan, gluten-free eating patterns. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "بیبەری وردکراوی سور سەرچاوەیەکی ڤیتامین A و دژە ئۆکسیدانتـە. بەگشتی گونجاوە بۆ خواردنی ڤیگان، بەبێ گلوتن. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Sprinkled over grilled meats and stews for heat.",
    "prepKu": "بەسەر گۆشتی برژاو و خواردنی کوڵاودا پرژاو دەکرێت بۆ تیژی.",
    "relatedRecipeIds": []
  },
  {
    "id": "paprika",
    "nameEn": "Paprika",
    "nameKu": "پاپریکا",
    "category": "herbs-spices",
    "servingSizeEn": "5 g",
    "servingSizeKu": "٥ گرام",
    "caloriesEstimate": 282,
    "protein": 14,
    "carbohydrates": 54,
    "fat": 13,
    "fiber": 35,
    "vitamins": [
      "Vitamin A",
      "Vitamin E"
    ],
    "minerals": [
      "Iron"
    ],
    "allergens": [],
    "suitabilityEn": "Paprika is a source of vitamin A and iron. It generally fits vegan, gluten-free eating patterns. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "پاپریکا سەرچاوەیەکی ڤیتامین A و ئاسنـە. بەگشتی گونجاوە بۆ خواردنی ڤیگان، بەبێ گلوتن. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Adds color and mild flavor to rice, meats, and stews.",
    "prepKu": "ڕەنگ و تامێکی سووک دەدات بە برنج، گۆشت و خواردنی کوڵاو.",
    "relatedRecipeIds": []
  },
  {
    "id": "cinnamon",
    "nameEn": "Cinnamon (ground)",
    "nameKu": "دارچین",
    "category": "herbs-spices",
    "servingSizeEn": "5 g",
    "servingSizeKu": "٥ گرام",
    "caloriesEstimate": 247,
    "protein": 4,
    "carbohydrates": 81,
    "fat": 1.2,
    "fiber": 53,
    "vitamins": [
      "Vitamin K"
    ],
    "minerals": [
      "Calcium",
      "Manganese"
    ],
    "allergens": [],
    "suitabilityEn": "Cinnamon (ground) is a source of dietary fiber and antioxidants. It generally fits vegan, gluten-free eating patterns. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "دارچین سەرچاوەیەکی فایبەری خۆراکی و دژە ئۆکسیدانتـە. بەگشتی گونجاوە بۆ خواردنی ڤیگان، بەبێ گلوتن. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Used in rice dishes, desserts, and hot drinks.",
    "prepKu": "لە خواردنی برنج، شیرینی و خواردنەوەی گەرمدا بەکاردێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "cardamom",
    "nameEn": "Cardamom (ground)",
    "nameKu": "هەل",
    "category": "herbs-spices",
    "servingSizeEn": "5 g",
    "servingSizeKu": "٥ گرام",
    "caloriesEstimate": 311,
    "protein": 11,
    "carbohydrates": 68,
    "fat": 6.7,
    "fiber": 28,
    "vitamins": [],
    "minerals": [
      "Manganese"
    ],
    "allergens": [],
    "suitabilityEn": "Cardamom (ground) is a source of antioxidants. It generally fits vegan, gluten-free eating patterns. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "هەل سەرچاوەیەکی دژە ئۆکسیدانتـە. بەگشتی گونجاوە بۆ خواردنی ڤیگان، بەبێ گلوتن. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Used to flavor coffee, tea, rice, and desserts.",
    "prepKu": "بۆ تامدانی قاوە، چای، برنج و شیرینی بەکاردێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "cloves",
    "nameEn": "Cloves (ground)",
    "nameKu": "قرنفل",
    "category": "herbs-spices",
    "servingSizeEn": "2 g",
    "servingSizeKu": "٢ گرام",
    "caloriesEstimate": 274,
    "protein": 6,
    "carbohydrates": 65,
    "fat": 13,
    "fiber": 34,
    "vitamins": [
      "Vitamin C"
    ],
    "minerals": [
      "Manganese"
    ],
    "allergens": [],
    "suitabilityEn": "Cloves (ground) is a source of antioxidants. It generally fits vegan, gluten-free eating patterns. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "قرنفل سەرچاوەیەکی دژە ئۆکسیدانتـە. بەگشتی گونجاوە بۆ خواردنی ڤیگان، بەبێ گلوتن. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Used whole or ground to flavor rice and stews.",
    "prepKu": "بە تەواوی یان هاڕدراو بۆ تامدانی برنج و خواردنی کوڵاو بەکاردێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "nutmeg",
    "nameEn": "Nutmeg (ground)",
    "nameKu": "جەوزی هیندی",
    "category": "herbs-spices",
    "servingSizeEn": "2 g",
    "servingSizeKu": "٢ گرام",
    "caloriesEstimate": 525,
    "protein": 5.8,
    "carbohydrates": 49,
    "fat": 36,
    "fiber": 21,
    "vitamins": [],
    "minerals": [
      "Manganese"
    ],
    "allergens": [],
    "suitabilityEn": "Nutmeg (ground) is a source of antioxidants. It generally fits vegan, gluten-free eating patterns. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "جەوزی هیندی سەرچاوەیەکی دژە ئۆکسیدانتـە. بەگشتی گونجاوە بۆ خواردنی ڤیگان، بەبێ گلوتن. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "A pinch used in meat dishes, baked goods, and drinks.",
    "prepKu": "کەمێکی لە خواردنی گۆشت، شتومەکی نانپژین و خواردنەوەدا بەکاردێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "sumac",
    "nameEn": "Sumac",
    "nameKu": "سماق",
    "category": "herbs-spices",
    "servingSizeEn": "5 g",
    "servingSizeKu": "٥ گرام",
    "caloriesEstimate": 300,
    "protein": 5,
    "carbohydrates": 65,
    "fat": 5,
    "fiber": 30,
    "vitamins": [
      "Vitamin C"
    ],
    "minerals": [],
    "allergens": [],
    "suitabilityEn": "Sumac is a source of vitamin C and antioxidants. It generally fits vegan, gluten-free eating patterns. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "سماق سەرچاوەیەکی ڤیتامین C و دژە ئۆکسیدانتـە. بەگشتی گونجاوە بۆ خواردنی ڤیگان، بەبێ گلوتن. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Sprinkled over salads, meats, and rice for a tangy flavor.",
    "prepKu": "بەسەر سالاد، گۆشت و برنجدا پرژاو دەکرێت بۆ تامێکی تووڕشک.",
    "relatedRecipeIds": []
  },
  {
    "id": "saffron",
    "nameEn": "Saffron",
    "nameKu": "زەعفەران",
    "category": "herbs-spices",
    "servingSizeEn": "1 g",
    "servingSizeKu": "١ گرام",
    "caloriesEstimate": 310,
    "protein": 11,
    "carbohydrates": 65,
    "fat": 5.9,
    "fiber": 3.9,
    "vitamins": [
      "Vitamin C"
    ],
    "minerals": [
      "Manganese"
    ],
    "allergens": [],
    "suitabilityEn": "Saffron is a source of antioxidants. It generally fits vegan, gluten-free eating patterns. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "زەعفەران سەرچاوەیەکی دژە ئۆکسیدانتـە. بەگشتی گونجاوە بۆ خواردنی ڤیگان، بەبێ گلوتن. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Steeped in warm water and added to rice for color and aroma.",
    "prepKu": "لە ئاوی گەرمدا دەخرێتە خۆی و بۆ ڕەنگ و بۆنی برنج بەکاردێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "ginger",
    "nameEn": "Ginger (fresh)",
    "nameKu": "زەنجەفیل",
    "category": "herbs-spices",
    "servingSizeEn": "10 g",
    "servingSizeKu": "١٠ گرام",
    "caloriesEstimate": 80,
    "protein": 1.8,
    "carbohydrates": 18,
    "fat": 0.8,
    "fiber": 2,
    "vitamins": [
      "Vitamin C",
      "Vitamin B6"
    ],
    "minerals": [
      "Magnesium"
    ],
    "allergens": [],
    "suitabilityEn": "Ginger (fresh) is a source of vitamin C and antioxidants. It generally fits vegan, gluten-free eating patterns. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "زەنجەفیل سەرچاوەیەکی ڤیتامین C و دژە ئۆکسیدانتـە. بەگشتی گونجاوە بۆ خواردنی ڤیگان، بەبێ گلوتن. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Grated fresh into teas, marinades, and stir-fries.",
    "prepKu": "تازە دەکوترێت بۆ چای، ترشاو و سواتین.",
    "relatedRecipeIds": []
  },
  {
    "id": "dried-mint",
    "nameEn": "Dried mint",
    "nameKu": "پونگی وشک",
    "category": "herbs-spices",
    "servingSizeEn": "2 g",
    "servingSizeKu": "٢ گرام",
    "caloriesEstimate": 285,
    "protein": 20,
    "carbohydrates": 52,
    "fat": 6,
    "fiber": 32,
    "vitamins": [
      "Vitamin A"
    ],
    "minerals": [
      "Iron"
    ],
    "allergens": [],
    "suitabilityEn": "Dried mint is a source of vitamin A and iron. It generally fits vegan, gluten-free eating patterns. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "پونگی وشک سەرچاوەیەکی ڤیتامین A و ئاسنـە. بەگشتی گونجاوە بۆ خواردنی ڤیگان، بەبێ گلوتن. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Crumbled over yogurt dishes, soups, or brewed as tea.",
    "prepKu": "بەسەر خواردنی مۆست و شۆربادا پرژاو دەکرێت، یان وەک چای دەکوڵێنرێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "zaatar-blend",
    "nameEn": "Za'atar blend",
    "nameKu": "زەعتەر",
    "category": "herbs-spices",
    "servingSizeEn": "5 g",
    "servingSizeKu": "٥ گرام",
    "caloriesEstimate": 280,
    "protein": 8,
    "carbohydrates": 40,
    "fat": 12,
    "fiber": 15,
    "vitamins": [
      "Vitamin A"
    ],
    "minerals": [
      "Calcium",
      "Iron"
    ],
    "allergens": [
      "sesame"
    ],
    "suitabilityEn": "Za'atar blend is a source of calcium and antioxidants. It generally fits vegetarian eating patterns. It contains sesame, so avoid it if you have a related allergy. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "زەعتەر سەرچاوەیەکی کالسیۆم و دژە ئۆکسیدانتـە. بەگشتی گونجاوە بۆ خواردنی گیاخۆری. پێکهاتەی کونجی تێدایە، بۆیە ئەگەر ئالەرجیت هەیە خۆت لێ بپارێزە. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Mixed with olive oil and spread on bread.",
    "prepKu": "لەگەڵ ڕۆنی زەیتوون تێکەڵ دەکرێت و لەسەر نان دەخرێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "salt",
    "nameEn": "Salt",
    "nameKu": "خوێ",
    "category": "herbs-spices",
    "servingSizeEn": "2 g",
    "servingSizeKu": "٢ گرام",
    "caloriesEstimate": 0,
    "protein": 0,
    "carbohydrates": 0,
    "fat": 0,
    "fiber": 0,
    "vitamins": [],
    "minerals": [],
    "allergens": [],
    "suitabilityEn": "Salt is a source of sodium (best in moderation). It generally fits vegan, gluten-free eating patterns. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "خوێ سەرچاوەیەکی سۆدیۆم (باشترە بەئەندازە بەکاربهێنرێت)ـە. بەگشتی گونجاوە بۆ خواردنی ڤیگان، بەبێ گلوتن. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Used to season dishes; best used in moderation.",
    "prepKu": "بۆ تامدانی خواردن بەکاردێت؛ باشترە بەئەندازە بەکاربهێنرێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "allspice",
    "nameEn": "Allspice",
    "nameKu": "بیبەری هەمەبۆن",
    "category": "herbs-spices",
    "servingSizeEn": "5 g",
    "servingSizeKu": "٥ گرام",
    "caloriesEstimate": 263,
    "protein": 6,
    "carbohydrates": 72,
    "fat": 8.7,
    "fiber": 21,
    "vitamins": [
      "Vitamin C"
    ],
    "minerals": [
      "Manganese"
    ],
    "allergens": [],
    "suitabilityEn": "Allspice is a source of antioxidants. It generally fits vegan, gluten-free eating patterns. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "بیبەری هەمەبۆن سەرچاوەیەکی دژە ئۆکسیدانتـە. بەگشتی گونجاوە بۆ خواردنی ڤیگان، بەبێ گلوتن. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Used in rice, stews, and mixed spice blends.",
    "prepKu": "لە برنج، خواردنی کوڵاو و تێکەڵەی بەهاراتدا بەکاردێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "water",
    "nameEn": "Water",
    "nameKu": "ئاو",
    "category": "beverages",
    "servingSizeEn": "1 cup (240 ml)",
    "servingSizeKu": "١ کوپ (٢٤٠ میلیلیتر)",
    "caloriesEstimate": 0,
    "protein": 0,
    "carbohydrates": 0,
    "fat": 0,
    "fiber": 0,
    "vitamins": [],
    "minerals": [],
    "allergens": [],
    "suitabilityEn": "Water is a source of water content. It generally fits vegan, gluten-free eating patterns. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "ئاو سەرچاوەیەکی پێکهاتەی ئاوـە. بەگشتی گونجاوە بۆ خواردنی ڤیگان، بەبێ گلوتن. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "The best everyday drink for staying hydrated.",
    "prepKu": "باشترین خواردنەوەی ڕۆژانەیە بۆ شلی جەستە.",
    "relatedRecipeIds": []
  },
  {
    "id": "black-tea",
    "nameEn": "Black tea",
    "nameKu": "چایی ڕەش",
    "category": "beverages",
    "servingSizeEn": "1 cup (240 ml)",
    "servingSizeKu": "١ کوپ (٢٤٠ میلیلیتر)",
    "caloriesEstimate": 2,
    "protein": 0,
    "carbohydrates": 0.5,
    "fat": 0,
    "fiber": 0,
    "vitamins": [],
    "minerals": [
      "Manganese"
    ],
    "allergens": [],
    "suitabilityEn": "Black tea is a source of antioxidants. It generally fits vegan, gluten-free eating patterns. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "چایی ڕەش سەرچاوەیەکی دژە ئۆکسیدانتـە. بەگشتی گونجاوە بۆ خواردنی ڤیگان، بەبێ گلوتن. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Steeped hot and often served with sugar.",
    "prepKu": "گەرم دەکوڵێنرێت و زۆرجار لەگەڵ شەکر خۆراک دەکرێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "green-tea",
    "nameEn": "Green tea",
    "nameKu": "چایی سەوز",
    "category": "beverages",
    "servingSizeEn": "1 cup (240 ml)",
    "servingSizeKu": "١ کوپ (٢٤٠ میلیلیتر)",
    "caloriesEstimate": 2,
    "protein": 0.5,
    "carbohydrates": 0,
    "fat": 0,
    "fiber": 0,
    "vitamins": [],
    "minerals": [
      "Manganese"
    ],
    "allergens": [],
    "suitabilityEn": "Green tea is a source of antioxidants. It generally fits vegan, gluten-free eating patterns. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "چایی سەوز سەرچاوەیەکی دژە ئۆکسیدانتـە. بەگشتی گونجاوە بۆ خواردنی ڤیگان، بەبێ گلوتن. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Steeped in hot (not boiling) water.",
    "prepKu": "لە ئاوی گەرم (نەک کوڵاو) دادەکوترێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "turkish-coffee",
    "nameEn": "Turkish coffee",
    "nameKu": "قاوەی تورکی",
    "category": "beverages",
    "servingSizeEn": "1 small cup (100 ml)",
    "servingSizeKu": "١ کوپی بچووک (١٠٠ میلیلیتر)",
    "caloriesEstimate": 2,
    "protein": 0.1,
    "carbohydrates": 0,
    "fat": 0,
    "fiber": 0,
    "vitamins": [],
    "minerals": [
      "Potassium"
    ],
    "allergens": [],
    "suitabilityEn": "Turkish coffee is a source of antioxidants. It generally fits vegan, gluten-free eating patterns. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "قاوەی تورکی سەرچاوەیەکی دژە ئۆکسیدانتـە. بەگشتی گونجاوە بۆ خواردنی ڤیگان، بەبێ گلوتن. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Finely ground coffee simmered slowly, served unfiltered.",
    "prepKu": "قاوەی وردهاڕاو بەهێواشی دەکوڵێنرێت و بێ فلتەر خۆراک دەکرێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "arabic-coffee",
    "nameEn": "Arabic coffee",
    "nameKu": "قاوەی عەرەبی",
    "category": "beverages",
    "servingSizeEn": "1 small cup (60 ml)",
    "servingSizeKu": "١ کوپی بچووک (٦٠ میلیلیتر)",
    "caloriesEstimate": 2,
    "protein": 0.1,
    "carbohydrates": 0,
    "fat": 0,
    "fiber": 0,
    "vitamins": [],
    "minerals": [
      "Potassium"
    ],
    "allergens": [],
    "suitabilityEn": "Arabic coffee is a source of antioxidants. It generally fits vegan, gluten-free eating patterns. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "قاوەی عەرەبی سەرچاوەیەکی دژە ئۆکسیدانتـە. بەگشتی گونجاوە بۆ خواردنی ڤیگان، بەبێ گلوتن. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Lightly roasted coffee often flavored with cardamom.",
    "prepKu": "قاوەی سووک برژاو زۆرجار لەگەڵ هەل تام دەدرێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "orange-juice",
    "nameEn": "Orange juice",
    "nameKu": "ئاوی پرتەقاڵ",
    "category": "beverages",
    "servingSizeEn": "1 cup (240 ml)",
    "servingSizeKu": "١ کوپ (٢٤٠ میلیلیتر)",
    "caloriesEstimate": 112,
    "protein": 1.7,
    "carbohydrates": 26,
    "fat": 0.5,
    "fiber": 0.5,
    "vitamins": [
      "Vitamin C"
    ],
    "minerals": [
      "Potassium"
    ],
    "allergens": [],
    "suitabilityEn": "Orange juice is a source of vitamin C and natural sugars. It generally fits vegan, gluten-free eating patterns. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "ئاوی پرتەقاڵ سەرچاوەیەکی ڤیتامین C و شەکری سروشتیـە. بەگشتی گونجاوە بۆ خواردنی ڤیگان، بەبێ گلوتن. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Freshly squeezed or store-bought, best enjoyed in moderation.",
    "prepKu": "تازە گیرا یان کڕدراو، باشترە بەئەندازە خۆراک بکرێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "apple-juice",
    "nameEn": "Apple juice",
    "nameKu": "ئاوی سێو",
    "category": "beverages",
    "servingSizeEn": "1 cup (240 ml)",
    "servingSizeKu": "١ کوپ (٢٤٠ میلیلیتر)",
    "caloriesEstimate": 114,
    "protein": 0.2,
    "carbohydrates": 28,
    "fat": 0.3,
    "fiber": 0.5,
    "vitamins": [
      "Vitamin C"
    ],
    "minerals": [
      "Potassium"
    ],
    "allergens": [],
    "suitabilityEn": "Apple juice is a source of natural sugars and vitamin C. It generally fits vegan, gluten-free eating patterns. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "ئاوی سێو سەرچاوەیەکی شەکری سروشتی و ڤیتامین Cـە. بەگشتی گونجاوە بۆ خواردنی ڤیگان، بەبێ گلوتن. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Pressed from apples, best enjoyed in moderation.",
    "prepKu": "لە سێو دەگیرێت، باشترە بەئەندازە خۆراک بکرێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "pomegranate-juice",
    "nameEn": "Pomegranate juice",
    "nameKu": "ئاوی هەنار",
    "category": "beverages",
    "servingSizeEn": "1 cup (240 ml)",
    "servingSizeKu": "١ کوپ (٢٤٠ میلیلیتر)",
    "caloriesEstimate": 134,
    "protein": 0.5,
    "carbohydrates": 32,
    "fat": 0.3,
    "fiber": 0.2,
    "vitamins": [
      "Vitamin C"
    ],
    "minerals": [
      "Potassium"
    ],
    "allergens": [],
    "suitabilityEn": "Pomegranate juice is a source of antioxidants and natural sugars. It generally fits vegan, gluten-free eating patterns. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "ئاوی هەنار سەرچاوەیەکی دژە ئۆکسیدانت و شەکری سروشتیـە. بەگشتی گونجاوە بۆ خواردنی ڤیگان، بەبێ گلوتن. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Pressed fresh or store-bought, best enjoyed in moderation.",
    "prepKu": "تازە گیراو یان کڕدراو، باشترە بەئەندازە خۆراک بکرێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "lemonade",
    "nameEn": "Lemonade",
    "nameKu": "لیمۆنادە",
    "category": "beverages",
    "servingSizeEn": "1 cup (240 ml)",
    "servingSizeKu": "١ کوپ (٢٤٠ میلیلیتر)",
    "caloriesEstimate": 99,
    "protein": 0.1,
    "carbohydrates": 26,
    "fat": 0,
    "fiber": 0.1,
    "vitamins": [
      "Vitamin C"
    ],
    "minerals": [],
    "allergens": [],
    "suitabilityEn": "Lemonade is a source of vitamin C and natural sugars. It generally fits vegan, gluten-free eating patterns. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "لیمۆنادە سەرچاوەیەکی ڤیتامین C و شەکری سروشتیـە. بەگشتی گونجاوە بۆ خواردنی ڤیگان، بەبێ گلوتن. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Lemon juice mixed with water and a little sugar, served chilled.",
    "prepKu": "ئاوی لیمۆ لەگەڵ ئاو و کەمێک شەکر تێکەڵ دەکرێت و ساردکراو خۆراک دەکرێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "rose-water-sharbat",
    "nameEn": "Rose water sharbat",
    "nameKu": "شەربەتی گوڵاو",
    "category": "beverages",
    "servingSizeEn": "1 cup (240 ml)",
    "servingSizeKu": "١ کوپ (٢٤٠ میلیلیتر)",
    "caloriesEstimate": 90,
    "protein": 0,
    "carbohydrates": 23,
    "fat": 0,
    "fiber": 0,
    "vitamins": [],
    "minerals": [],
    "allergens": [],
    "suitabilityEn": "Rose water sharbat is a source of natural sugars. It generally fits vegan, gluten-free eating patterns. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "شەربەتی گوڵاو سەرچاوەیەکی شەکری سروشتیـە. بەگشتی گونجاوە بۆ خواردنی ڤیگان، بەبێ گلوتن. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Rose water diluted with cold water and a little sugar.",
    "prepKu": "گوڵاو لەگەڵ ئاوی سارد و کەمێک شەکر تێکەڵ دەکرێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "tamarind-drink",
    "nameEn": "Tamarind drink",
    "nameKu": "شەربەتی تەمرهندی",
    "category": "beverages",
    "servingSizeEn": "1 cup (240 ml)",
    "servingSizeKu": "١ کوپ (٢٤٠ میلیلیتر)",
    "caloriesEstimate": 85,
    "protein": 0.3,
    "carbohydrates": 22,
    "fat": 0.1,
    "fiber": 0.7,
    "vitamins": [
      "Vitamin C"
    ],
    "minerals": [
      "Potassium"
    ],
    "allergens": [],
    "suitabilityEn": "Tamarind drink is a source of vitamin C and natural sugars. It generally fits vegan, gluten-free eating patterns. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "شەربەتی تەمرهندی سەرچاوەیەکی ڤیتامین C و شەکری سروشتیـە. بەگشتی گونجاوە بۆ خواردنی ڤیگان، بەبێ گلوتن. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Tamarind pulp soaked, strained, and sweetened.",
    "prepKu": "گوشتی تەمرهندی هەڵدەخرێت، پاڵاو دەکرێت و شیرین دەکرێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "licorice-drink",
    "nameEn": "Licorice drink",
    "nameKu": "شەربەتی سووس",
    "category": "beverages",
    "servingSizeEn": "1 cup (240 ml)",
    "servingSizeKu": "١ کوپ (٢٤٠ میلیلیتر)",
    "caloriesEstimate": 60,
    "protein": 0.2,
    "carbohydrates": 15,
    "fat": 0,
    "fiber": 0.2,
    "vitamins": [],
    "minerals": [
      "Potassium"
    ],
    "allergens": [],
    "suitabilityEn": "Licorice drink is a source of natural sugars. It generally fits vegan, gluten-free eating patterns. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "شەربەتی سووس سەرچاوەیەکی شەکری سروشتیـە. بەگشتی گونجاوە بۆ خواردنی ڤیگان، بەبێ گلوتن. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Licorice root steeped and served chilled, best in moderation.",
    "prepKu": "ڕەگی سووس دادەکوترێت و ساردکراو خۆراک دەکرێت، باشترە بەئەندازە.",
    "relatedRecipeIds": []
  },
  {
    "id": "chamomile-tea",
    "nameEn": "Chamomile tea",
    "nameKu": "چایی بابونە",
    "category": "beverages",
    "servingSizeEn": "1 cup (240 ml)",
    "servingSizeKu": "١ کوپ (٢٤٠ میلیلیتر)",
    "caloriesEstimate": 1,
    "protein": 0,
    "carbohydrates": 0.2,
    "fat": 0,
    "fiber": 0,
    "vitamins": [],
    "minerals": [],
    "allergens": [],
    "suitabilityEn": "Chamomile tea is a source of antioxidants. It generally fits vegan, gluten-free eating patterns. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "چایی بابونە سەرچاوەیەکی دژە ئۆکسیدانتـە. بەگشتی گونجاوە بۆ خواردنی ڤیگان، بەبێ گلوتن. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Dried flowers steeped in hot water.",
    "prepKu": "گوڵی وشکاوی لە ئاوی گەرمدا دادەکوترێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "sage-tea",
    "nameEn": "Sage tea",
    "nameKu": "چایی مریمیه",
    "category": "beverages",
    "servingSizeEn": "1 cup (240 ml)",
    "servingSizeKu": "١ کوپ (٢٤٠ میلیلیتر)",
    "caloriesEstimate": 1,
    "protein": 0,
    "carbohydrates": 0.2,
    "fat": 0,
    "fiber": 0,
    "vitamins": [],
    "minerals": [],
    "allergens": [],
    "suitabilityEn": "Sage tea is a source of antioxidants. It generally fits vegan, gluten-free eating patterns. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "چایی مریمیه سەرچاوەیەکی دژە ئۆکسیدانتـە. بەگشتی گونجاوە بۆ خواردنی ڤیگان، بەبێ گلوتن. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Dried leaves steeped in hot water.",
    "prepKu": "گەڵای وشکاوی لە ئاوی گەرمدا دادەکوترێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "sparkling-water",
    "nameEn": "Sparkling water",
    "nameKu": "ئاوی گازدار",
    "category": "beverages",
    "servingSizeEn": "1 cup (240 ml)",
    "servingSizeKu": "١ کوپ (٢٤٠ میلیلیتر)",
    "caloriesEstimate": 0,
    "protein": 0,
    "carbohydrates": 0,
    "fat": 0,
    "fiber": 0,
    "vitamins": [],
    "minerals": [],
    "allergens": [],
    "suitabilityEn": "Sparkling water is a source of water content. It generally fits vegan, gluten-free eating patterns. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "ئاوی گازدار سەرچاوەیەکی پێکهاتەی ئاوـە. بەگشتی گونجاوە بۆ خواردنی ڤیگان، بەبێ گلوتن. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Carbonated water served plain or with a slice of citrus.",
    "prepKu": "ئاوی گازدار بە سادەیی یان لەگەڵ پارچەیەک لیمۆ خۆراک دەکرێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "hummus",
    "nameEn": "Hummus",
    "nameKu": "حومس",
    "category": "prepared",
    "servingSizeEn": "100 g",
    "servingSizeKu": "١٠٠ گرام",
    "caloriesEstimate": 166,
    "protein": 7.9,
    "carbohydrates": 14,
    "fat": 9.6,
    "fiber": 6,
    "vitamins": [
      "Folate"
    ],
    "minerals": [
      "Iron"
    ],
    "allergens": [
      "sesame"
    ],
    "suitabilityEn": "Hummus is a source of protein and dietary fiber. It generally fits vegan eating patterns. It contains sesame, so avoid it if you have a related allergy. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "حومس سەرچاوەیەکی پرۆتین و فایبەری خۆراکیـە. بەگشتی گونجاوە بۆ خواردنی ڤیگان. پێکهاتەی کونجی تێدایە، بۆیە ئەگەر ئالەرجیت هەیە خۆت لێ بپارێزە. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Chickpeas blended with tahini, lemon, and garlic.",
    "prepKu": "نۆک لەگەڵ تەحین، لیمۆ و سیر دەهاڕدرێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "falafel",
    "nameEn": "Falafel",
    "nameKu": "فلافل",
    "category": "prepared",
    "servingSizeEn": "100 g",
    "servingSizeKu": "١٠٠ گرام",
    "caloriesEstimate": 333,
    "protein": 13,
    "carbohydrates": 31,
    "fat": 18,
    "fiber": 10,
    "vitamins": [
      "Folate"
    ],
    "minerals": [
      "Iron"
    ],
    "allergens": [],
    "suitabilityEn": "Falafel is a source of protein and dietary fiber. It generally fits vegan eating patterns. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "فلافل سەرچاوەیەکی پرۆتین و فایبەری خۆراکیـە. بەگشتی گونجاوە بۆ خواردنی ڤیگان. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Spiced chickpea or fava bean patties, deep-fried.",
    "prepKu": "پارچەی نۆک یان باقلای بەهاراتدار، بە زۆر ڕۆن سرووتاوی دەکرێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "tabbouleh",
    "nameEn": "Tabbouleh",
    "nameKu": "تەبولە",
    "category": "prepared",
    "servingSizeEn": "100 g",
    "servingSizeKu": "١٠٠ گرام",
    "caloriesEstimate": 130,
    "protein": 3,
    "carbohydrates": 17,
    "fat": 6,
    "fiber": 4,
    "vitamins": [
      "Vitamin C",
      "Vitamin K"
    ],
    "minerals": [],
    "allergens": [
      "gluten"
    ],
    "suitabilityEn": "Tabbouleh is a source of vitamin C and dietary fiber. It generally fits vegan eating patterns. It contains gluten, so avoid it if you have a related allergy. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "تەبولە سەرچاوەیەکی ڤیتامین C و فایبەری خۆراکیـە. بەگشتی گونجاوە بۆ خواردنی ڤیگان. پێکهاتەی گلوتن تێدایە، بۆیە ئەگەر ئالەرجیت هەیە خۆت لێ بپارێزە. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "A salad of parsley, bulgur, tomato, and lemon.",
    "prepKu": "سالادێکی جەعدە، ساوار، تەماتە و لیمۆیە.",
    "relatedRecipeIds": []
  },
  {
    "id": "dolma-grape-leaves",
    "nameEn": "Dolma (stuffed grape leaves)",
    "nameKu": "دۆلمەی گەڵای مێو",
    "category": "prepared",
    "servingSizeEn": "100 g",
    "servingSizeKu": "١٠٠ گرام",
    "caloriesEstimate": 170,
    "protein": 3.5,
    "carbohydrates": 20,
    "fat": 8,
    "fiber": 3,
    "vitamins": [
      "Vitamin A",
      "Vitamin K"
    ],
    "minerals": [
      "Iron"
    ],
    "allergens": [],
    "suitabilityEn": "Dolma (stuffed grape leaves) is a source of dietary fiber and vitamin A. It generally fits vegetarian eating patterns. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "دۆلمەی گەڵای مێو سەرچاوەیەکی فایبەری خۆراکی و ڤیتامین Aـە. بەگشتی گونجاوە بۆ خواردنی گیاخۆری. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Grape leaves rolled around rice and herbs, simmered slowly.",
    "prepKu": "گەڵای مێو بەسەر برنج و گیادا دەپێچرێتەوە و بەهێواشی دەکوڵێنرێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "kubba",
    "nameEn": "Kubba",
    "nameKu": "کوبە",
    "category": "prepared",
    "servingSizeEn": "100 g",
    "servingSizeKu": "١٠٠ گرام",
    "caloriesEstimate": 220,
    "protein": 10,
    "carbohydrates": 22,
    "fat": 10,
    "fiber": 2,
    "vitamins": [
      "Vitamin B3"
    ],
    "minerals": [
      "Iron"
    ],
    "allergens": [
      "gluten"
    ],
    "suitabilityEn": "Kubba is a source of protein and complex carbohydrates. It generally fits omnivore eating patterns. It contains gluten, so avoid it if you have a related allergy. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "کوبە سەرچاوەیەکی پرۆتین و کاربۆهایدراتی تێکەڵـە. بەگشتی گونجاوە بۆ خواردنی زۆربەی خواردنەکان. پێکهاتەی گلوتن تێدایە، بۆیە ئەگەر ئالەرجیت هەیە خۆت لێ بپارێزە. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "A bulgur or rice shell filled with spiced meat, then boiled or fried.",
    "prepKu": "توێکلی ساوار یان برنج بە گۆشتی بەهاراتدار پڕ دەکرێت، پاشان دەکوڵێنرێت یان سرووتاوی دەکرێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "kebab-grilled-meat",
    "nameEn": "Kebab (grilled meat skewers)",
    "nameKu": "کەباب",
    "category": "prepared",
    "servingSizeEn": "100 g",
    "servingSizeKu": "١٠٠ گرام",
    "caloriesEstimate": 250,
    "protein": 26,
    "carbohydrates": 2,
    "fat": 16,
    "fiber": 0.3,
    "vitamins": [
      "Vitamin B12"
    ],
    "minerals": [
      "Iron"
    ],
    "allergens": [],
    "suitabilityEn": "Kebab (grilled meat skewers) is a source of protein and iron. It generally fits omnivore eating patterns. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "کەباب سەرچاوەیەکی پرۆتین و ئاسنـە. بەگشتی گونجاوە بۆ خواردنی زۆربەی خواردنەکان. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Seasoned minced or cubed meat grilled on skewers.",
    "prepKu": "گۆشتی هاڕاو یان پارچەکراوی بەهاراتدار لەسەر شیش دەبرژێنرێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "shawarma",
    "nameEn": "Shawarma",
    "nameKu": "شاورما",
    "category": "prepared",
    "servingSizeEn": "100 g",
    "servingSizeKu": "١٠٠ گرام",
    "caloriesEstimate": 320,
    "protein": 22,
    "carbohydrates": 25,
    "fat": 15,
    "fiber": 2,
    "vitamins": [
      "Vitamin B12"
    ],
    "minerals": [
      "Iron"
    ],
    "allergens": [
      "gluten"
    ],
    "suitabilityEn": "Shawarma is a source of protein and complex carbohydrates. It generally fits omnivore eating patterns. It contains gluten, so avoid it if you have a related allergy. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "شاورما سەرچاوەیەکی پرۆتین و کاربۆهایدراتی تێکەڵـە. بەگشتی گونجاوە بۆ خواردنی زۆربەی خواردنەکان. پێکهاتەی گلوتن تێدایە، بۆیە ئەگەر ئالەرجیت هەیە خۆت لێ بپارێزە. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Layered marinated meat roasted on a vertical spit, served wrapped.",
    "prepKu": "گۆشتی ترشاو چین بەسەر یەکدا دەبرژێنرێت لەسەر شیشی ڕاست، پێچراو خۆراک دەکرێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "kurdish-biryani",
    "nameEn": "Kurdish biryani",
    "nameKu": "بریانی کوردی",
    "category": "prepared",
    "servingSizeEn": "100 g",
    "servingSizeKu": "١٠٠ گرام",
    "caloriesEstimate": 310,
    "protein": 14,
    "carbohydrates": 38,
    "fat": 11,
    "fiber": 1.5,
    "vitamins": [
      "Vitamin B3"
    ],
    "minerals": [
      "Iron"
    ],
    "allergens": [],
    "suitabilityEn": "Kurdish biryani is a source of protein and complex carbohydrates. It generally fits omnivore eating patterns. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "بریانی کوردی سەرچاوەیەکی پرۆتین و کاربۆهایدراتی تێکەڵـە. بەگشتی گونجاوە بۆ خواردنی زۆربەی خواردنەکان. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Rice layered with meat, nuts, and raisins, then steamed.",
    "prepKu": "برنج لەگەڵ گۆشت، گوێز و کشمیش چین دەکرێت، پاشان بە هەڵم لێدرێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "lentil-soup",
    "nameEn": "Lentil soup",
    "nameKu": "شۆربای نیسک",
    "category": "prepared",
    "servingSizeEn": "100 g",
    "servingSizeKu": "١٠٠ گرام",
    "caloriesEstimate": 140,
    "protein": 9,
    "carbohydrates": 22,
    "fat": 2,
    "fiber": 6,
    "vitamins": [
      "Folate"
    ],
    "minerals": [
      "Iron"
    ],
    "allergens": [],
    "suitabilityEn": "Lentil soup is a source of protein and dietary fiber. It generally fits vegan eating patterns. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "شۆربای نیسک سەرچاوەیەکی پرۆتین و فایبەری خۆراکیـە. بەگشتی گونجاوە بۆ خواردنی ڤیگان. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Lentils simmered with onion, garlic, and cumin.",
    "prepKu": "نیسک لەگەڵ پیاز، سیر و زیرە دەکوڵێنرێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "yogurt-barley-soup",
    "nameEn": "Yogurt-barley soup (mastawa)",
    "nameKu": "شۆربای مۆست و جۆ",
    "category": "prepared",
    "servingSizeEn": "100 g",
    "servingSizeKu": "١٠٠ گرام",
    "caloriesEstimate": 120,
    "protein": 6,
    "carbohydrates": 15,
    "fat": 4,
    "fiber": 2,
    "vitamins": [
      "Vitamin B12"
    ],
    "minerals": [
      "Calcium"
    ],
    "allergens": [
      "dairy",
      "gluten"
    ],
    "suitabilityEn": "Yogurt-barley soup (mastawa) is a source of calcium and probiotic cultures. It generally fits vegetarian eating patterns. It contains dairy, gluten, so avoid it if you have a related allergy. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "شۆربای مۆست و جۆ سەرچاوەیەکی کالسیۆم و کولتووری پرۆبایۆتیکـە. بەگشتی گونجاوە بۆ خواردنی گیاخۆری. پێکهاتەی شیرەمەنی، گلوتن تێدایە، بۆیە ئەگەر ئالەرجیت هەیە خۆت لێ بپارێزە. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Yogurt and barley or rice simmered gently with mint.",
    "prepKu": "مۆست لەگەڵ جۆ یان برنج بەهێواشی لەگەڵ پونگ دەکوڵێنرێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "kofta",
    "nameEn": "Kofta",
    "nameKu": "کوفتە",
    "category": "prepared",
    "servingSizeEn": "100 g",
    "servingSizeKu": "١٠٠ گرام",
    "caloriesEstimate": 230,
    "protein": 20,
    "carbohydrates": 4,
    "fat": 15,
    "fiber": 0.5,
    "vitamins": [
      "Vitamin B12"
    ],
    "minerals": [
      "Iron"
    ],
    "allergens": [],
    "suitabilityEn": "Kofta is a source of protein and iron. It generally fits omnivore eating patterns. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "کوفتە سەرچاوەیەکی پرۆتین و ئاسنـە. بەگشتی گونجاوە بۆ خواردنی زۆربەی خواردنەکان. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Seasoned ground meat shaped and grilled or simmered in sauce.",
    "prepKu": "گۆشتی هاڕاوی بەهاراتدار شێوە دەکرێت و لەسەر ئاگر یان لە سۆسدا دەکوڵێنرێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "shish-tawook",
    "nameEn": "Shish tawook",
    "nameKu": "شیش تاووک",
    "category": "prepared",
    "servingSizeEn": "100 g",
    "servingSizeKu": "١٠٠ گرام",
    "caloriesEstimate": 180,
    "protein": 25,
    "carbohydrates": 2,
    "fat": 8,
    "fiber": 0.2,
    "vitamins": [
      "Vitamin B3"
    ],
    "minerals": [
      "Selenium"
    ],
    "allergens": [
      "dairy"
    ],
    "suitabilityEn": "Shish tawook is a source of protein. It generally fits omnivore eating patterns. It contains dairy, so avoid it if you have a related allergy. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "شیش تاووک سەرچاوەیەکی پرۆتینـە. بەگشتی گونجاوە بۆ خواردنی زۆربەی خواردنەکان. پێکهاتەی شیرەمەنی تێدایە، بۆیە ئەگەر ئالەرجیت هەیە خۆت لێ بپارێزە. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Chicken marinated in yogurt and spices, then grilled on skewers.",
    "prepKu": "مریشک لە مۆست و بەهارات ترشاو دەکرێت، پاشان لەسەر شیش دەبرژێنرێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "fattoush-salad",
    "nameEn": "Fattoush salad",
    "nameKu": "سالادی فەتووش",
    "category": "prepared",
    "servingSizeEn": "100 g",
    "servingSizeKu": "١٠٠ گرام",
    "caloriesEstimate": 140,
    "protein": 3,
    "carbohydrates": 16,
    "fat": 8,
    "fiber": 4,
    "vitamins": [
      "Vitamin C",
      "Vitamin A"
    ],
    "minerals": [],
    "allergens": [
      "gluten"
    ],
    "suitabilityEn": "Fattoush salad is a source of vitamin C and dietary fiber. It generally fits vegan eating patterns. It contains gluten, so avoid it if you have a related allergy. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "سالادی فەتووش سەرچاوەیەکی ڤیتامین C و فایبەری خۆراکیـە. بەگشتی گونجاوە بۆ خواردنی ڤیگان. پێکهاتەی گلوتن تێدایە، بۆیە ئەگەر ئالەرجیت هەیە خۆت لێ بپارێزە. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Mixed vegetables with toasted or fried pieces of pita bread.",
    "prepKu": "سەوزەی تێکەڵ لەگەڵ پارچەی برژاوی نانی پیتا.",
    "relatedRecipeIds": []
  },
  {
    "id": "baba-ganoush",
    "nameEn": "Baba ganoush",
    "nameKu": "بابا غنوج",
    "category": "prepared",
    "servingSizeEn": "100 g",
    "servingSizeKu": "١٠٠ گرام",
    "caloriesEstimate": 130,
    "protein": 3,
    "carbohydrates": 9,
    "fat": 10,
    "fiber": 4,
    "vitamins": [],
    "minerals": [
      "Iron"
    ],
    "allergens": [
      "sesame"
    ],
    "suitabilityEn": "Baba ganoush is a source of dietary fiber and unsaturated fats. It generally fits vegan eating patterns. It contains sesame, so avoid it if you have a related allergy. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "بابا غنوج سەرچاوەیەکی فایبەری خۆراکی و چەوری ناڕاژاوـە. بەگشتی گونجاوە بۆ خواردنی ڤیگان. پێکهاتەی کونجی تێدایە، بۆیە ئەگەر ئالەرجیت هەیە خۆت لێ بپارێزە. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Roasted eggplant mashed with tahini, lemon, and garlic.",
    "prepKu": "بادنجانی برژاو لەگەڵ تەحین، لیمۆ و سیر دەکوترێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "stuffed-eggplant-dolma",
    "nameEn": "Stuffed eggplant (dolma)",
    "nameKu": "دۆلمەی بادنجان",
    "category": "prepared",
    "servingSizeEn": "100 g",
    "servingSizeKu": "١٠٠ گرام",
    "caloriesEstimate": 210,
    "protein": 8,
    "carbohydrates": 24,
    "fat": 10,
    "fiber": 5,
    "vitamins": [
      "Vitamin A",
      "Vitamin C"
    ],
    "minerals": [
      "Iron"
    ],
    "allergens": [],
    "suitabilityEn": "Stuffed eggplant (dolma) is a source of dietary fiber and vitamin A. It generally fits vegetarian eating patterns. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "دۆلمەی بادنجان سەرچاوەیەکی فایبەری خۆراکی و ڤیتامین Aـە. بەگشتی گونجاوە بۆ خواردنی گیاخۆری. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Eggplant hollowed and filled with rice, herbs, and sometimes meat.",
    "prepKu": "بادنجان بۆشایی دەکرێت و بە برنج، گیا و هەندێک جار گۆشت پڕ دەکرێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "chicken-soup",
    "nameEn": "Chicken soup",
    "nameKu": "شۆربای مریشک",
    "category": "prepared",
    "servingSizeEn": "100 g",
    "servingSizeKu": "١٠٠ گرام",
    "caloriesEstimate": 110,
    "protein": 10,
    "carbohydrates": 8,
    "fat": 4,
    "fiber": 1,
    "vitamins": [
      "Vitamin B3"
    ],
    "minerals": [
      "Potassium"
    ],
    "allergens": [],
    "suitabilityEn": "Chicken soup is a source of protein. It generally fits omnivore eating patterns. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "شۆربای مریشک سەرچاوەیەکی پرۆتینـە. بەگشتی گونجاوە بۆ خواردنی زۆربەی خواردنەکان. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Chicken simmered with vegetables and light seasoning.",
    "prepKu": "مریشک لەگەڵ سەوزە و بەهاراتی سووک دەکوڵێنرێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "vegetable-soup",
    "nameEn": "Vegetable soup",
    "nameKu": "شۆربای سەوزە",
    "category": "prepared",
    "servingSizeEn": "100 g",
    "servingSizeKu": "١٠٠ گرام",
    "caloriesEstimate": 80,
    "protein": 3,
    "carbohydrates": 12,
    "fat": 2,
    "fiber": 3,
    "vitamins": [
      "Vitamin A",
      "Vitamin C"
    ],
    "minerals": [
      "Potassium"
    ],
    "allergens": [],
    "suitabilityEn": "Vegetable soup is a source of vitamin A and dietary fiber. It generally fits vegan eating patterns. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "شۆربای سەوزە سەرچاوەیەکی ڤیتامین A و فایبەری خۆراکیـە. بەگشتی گونجاوە بۆ خواردنی ڤیگان. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "A mix of seasonal vegetables simmered together.",
    "prepKu": "تێکەڵێک لە سەوزەی وەرزی پێکەوە دەکوڵێنرێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "bulgur-pilaf",
    "nameEn": "Bulgur pilaf",
    "nameKu": "پلاوی ساوار",
    "category": "prepared",
    "servingSizeEn": "100 g",
    "servingSizeKu": "١٠٠ گرام",
    "caloriesEstimate": 190,
    "protein": 5,
    "carbohydrates": 36,
    "fat": 3.5,
    "fiber": 6,
    "vitamins": [
      "Vitamin B3"
    ],
    "minerals": [
      "Manganese"
    ],
    "allergens": [
      "gluten"
    ],
    "suitabilityEn": "Bulgur pilaf is a source of dietary fiber and complex carbohydrates. It generally fits vegan eating patterns. It contains gluten, so avoid it if you have a related allergy. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "پلاوی ساوار سەرچاوەیەکی فایبەری خۆراکی و کاربۆهایدراتی تێکەڵـە. بەگشتی گونجاوە بۆ خواردنی ڤیگان. پێکهاتەی گلوتن تێدایە، بۆیە ئەگەر ئالەرجیت هەیە خۆت لێ بپارێزە. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Bulgur sautéed with onion and tomato, then simmered.",
    "prepKu": "ساوار لەگەڵ پیاز و تەماتە دەسواتێنرێت، پاشان دەکوڵێنرێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "rice-pilaf-with-nuts",
    "nameEn": "Rice pilaf with nuts",
    "nameKu": "پلاوی برنج و گوێز",
    "category": "prepared",
    "servingSizeEn": "100 g",
    "servingSizeKu": "١٠٠ گرام",
    "caloriesEstimate": 260,
    "protein": 6,
    "carbohydrates": 40,
    "fat": 9,
    "fiber": 2,
    "vitamins": [
      "Vitamin E"
    ],
    "minerals": [
      "Manganese"
    ],
    "allergens": [
      "tree nuts"
    ],
    "suitabilityEn": "Rice pilaf with nuts is a source of complex carbohydrates and unsaturated fats. It generally fits vegetarian eating patterns. It contains tree nuts, so avoid it if you have a related allergy. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "پلاوی برنج و گوێز سەرچاوەیەکی کاربۆهایدراتی تێکەڵ و چەوری ناڕاژاوـە. بەگشتی گونجاوە بۆ خواردنی گیاخۆری. پێکهاتەی گوێزی دار تێدایە، بۆیە ئەگەر ئالەرجیت هەیە خۆت لێ بپارێزە. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Rice sautéed in butter or oil, topped with toasted nuts.",
    "prepKu": "برنج بە کەرە یان ڕۆن دەسواتێنرێت، بەسەرەوە گوێزی برژاو.",
    "relatedRecipeIds": []
  },
  {
    "id": "samosa",
    "nameEn": "Samosa",
    "nameKu": "سەمبووسە",
    "category": "prepared",
    "servingSizeEn": "100 g",
    "servingSizeKu": "١٠٠ گرام",
    "caloriesEstimate": 260,
    "protein": 6,
    "carbohydrates": 28,
    "fat": 14,
    "fiber": 3,
    "vitamins": [],
    "minerals": [
      "Iron"
    ],
    "allergens": [
      "gluten"
    ],
    "suitabilityEn": "Samosa is a source of complex carbohydrates. It generally fits vegetarian eating patterns. It contains gluten, so avoid it if you have a related allergy. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "سەمبووسە سەرچاوەیەکی کاربۆهایدراتی تێکەڵـە. بەگشتی گونجاوە بۆ خواردنی گیاخۆری. پێکهاتەی گلوتن تێدایە، بۆیە ئەگەر ئالەرجیت هەیە خۆت لێ بپارێزە. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "A pastry filled with spiced vegetables or meat, then fried or baked.",
    "prepKu": "هەویرێکی پڕکراو بە سەوزە یان گۆشتی بەهاراتدار، سرووتاوی یان لە فرن ئامادە دەکرێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "manti-dumplings",
    "nameEn": "Manti (dumplings)",
    "nameKu": "مانتی",
    "category": "prepared",
    "servingSizeEn": "100 g",
    "servingSizeKu": "١٠٠ گرام",
    "caloriesEstimate": 280,
    "protein": 14,
    "carbohydrates": 32,
    "fat": 10,
    "fiber": 2,
    "vitamins": [
      "Vitamin B12"
    ],
    "minerals": [
      "Iron"
    ],
    "allergens": [
      "gluten",
      "dairy"
    ],
    "suitabilityEn": "Manti (dumplings) is a source of protein and complex carbohydrates. It generally fits omnivore eating patterns. It contains gluten, dairy, so avoid it if you have a related allergy. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "مانتی سەرچاوەیەکی پرۆتین و کاربۆهایدراتی تێکەڵـە. بەگشتی گونجاوە بۆ خواردنی زۆربەی خواردنەکان. پێکهاتەی گلوتن، شیرەمەنی تێدایە، بۆیە ئەگەر ئالەرجیت هەیە خۆت لێ بپارێزە. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Small dough parcels filled with meat, boiled or steamed, served with yogurt.",
    "prepKu": "پارچە هەویری بچووک بە گۆشت پڕ دەکرێت، دەکوڵێنرێت یان بە هەڵم لێدرێت و لەگەڵ مۆست خۆراک دەکرێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "kubba-hamdih",
    "nameEn": "Kubba hamdih",
    "nameKu": "کوبەی حەمزی",
    "category": "prepared",
    "servingSizeEn": "100 g",
    "servingSizeKu": "١٠٠ گرام",
    "caloriesEstimate": 240,
    "protein": 9,
    "carbohydrates": 26,
    "fat": 11,
    "fiber": 2,
    "vitamins": [
      "Vitamin B3"
    ],
    "minerals": [
      "Iron"
    ],
    "allergens": [
      "gluten"
    ],
    "suitabilityEn": "Kubba hamdih is a source of protein and iron. It generally fits omnivore eating patterns. It contains gluten, so avoid it if you have a related allergy. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "کوبەی حەمزی سەرچاوەیەکی پرۆتین و ئاسنـە. بەگشتی گونجاوە بۆ خواردنی زۆربەی خواردنەکان. پێکهاتەی گلوتن تێدایە، بۆیە ئەگەر ئالەرجیت هەیە خۆت لێ بپارێزە. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "A rice-shelled dumpling simmered in a sour tomato broth.",
    "prepKu": "توێکلی برنج لە ئاوی تەماتەی تووڕشکدا دەکوڵێنرێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "lahmacun",
    "nameEn": "Lahmacun",
    "nameKu": "لەحمەجون",
    "category": "prepared",
    "servingSizeEn": "100 g",
    "servingSizeKu": "١٠٠ گرام",
    "caloriesEstimate": 250,
    "protein": 12,
    "carbohydrates": 30,
    "fat": 9,
    "fiber": 2,
    "vitamins": [
      "Vitamin B3"
    ],
    "minerals": [
      "Iron"
    ],
    "allergens": [
      "gluten"
    ],
    "suitabilityEn": "Lahmacun is a source of protein and complex carbohydrates. It generally fits omnivore eating patterns. It contains gluten, so avoid it if you have a related allergy. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "لەحمەجون سەرچاوەیەکی پرۆتین و کاربۆهایدراتی تێکەڵـە. بەگشتی گونجاوە بۆ خواردنی زۆربەی خواردنەکان. پێکهاتەی گلوتن تێدایە، بۆیە ئەگەر ئالەرجیت هەیە خۆت لێ بپارێزە. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "A thin flatbread topped with spiced minced meat and baked.",
    "prepKu": "نانێکی تەنک بە گۆشتی هاڕاوی بەهاراتدار دادپۆشرێت و لە فرن دەپژرێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "margherita-pizza",
    "nameEn": "Margherita pizza",
    "nameKu": "پیتزای مارگریتا",
    "category": "prepared",
    "servingSizeEn": "100 g",
    "servingSizeKu": "١٠٠ گرام",
    "caloriesEstimate": 266,
    "protein": 11,
    "carbohydrates": 33,
    "fat": 10,
    "fiber": 2.3,
    "vitamins": [
      "Vitamin A"
    ],
    "minerals": [
      "Calcium"
    ],
    "allergens": [
      "gluten",
      "dairy"
    ],
    "suitabilityEn": "Margherita pizza is a source of calcium and complex carbohydrates. It generally fits vegetarian eating patterns. It contains gluten, dairy, so avoid it if you have a related allergy. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "پیتزای مارگریتا سەرچاوەیەکی کالسیۆم و کاربۆهایدراتی تێکەڵـە. بەگشتی گونجاوە بۆ خواردنی گیاخۆری. پێکهاتەی گلوتن، شیرەمەنی تێدایە، بۆیە ئەگەر ئالەرجیت هەیە خۆت لێ بپارێزە. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Flatbread dough topped with tomato sauce, cheese, and basil, then baked.",
    "prepKu": "هەویری تەنک بە سۆسی تەماتە، پەنیر و ڕیحان دادپۆشرێت و لە فرن دەپژرێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "club-sandwich",
    "nameEn": "Club sandwich",
    "nameKu": "ساندویچی کلاب",
    "category": "prepared",
    "servingSizeEn": "100 g",
    "servingSizeKu": "١٠٠ گرام",
    "caloriesEstimate": 290,
    "protein": 18,
    "carbohydrates": 28,
    "fat": 12,
    "fiber": 2,
    "vitamins": [
      "Vitamin B12"
    ],
    "minerals": [
      "Iron"
    ],
    "allergens": [
      "gluten",
      "dairy"
    ],
    "suitabilityEn": "Club sandwich is a source of protein and complex carbohydrates. It generally fits omnivore eating patterns. It contains gluten, dairy, so avoid it if you have a related allergy. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "ساندویچی کلاب سەرچاوەیەکی پرۆتین و کاربۆهایدراتی تێکەڵـە. بەگشتی گونجاوە بۆ خواردنی زۆربەی خواردنەکان. پێکهاتەی گلوتن، شیرەمەنی تێدایە، بۆیە ئەگەر ئالەرجیت هەیە خۆت لێ بپارێزە. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Layered bread with meat, cheese, and vegetables.",
    "prepKu": "نانی چینکراو لەگەڵ گۆشت، پەنیر و سەوزە.",
    "relatedRecipeIds": []
  },
  {
    "id": "baklava",
    "nameEn": "Baklava",
    "nameKu": "بەقلاوا",
    "category": "sweets",
    "servingSizeEn": "1 piece (50 g)",
    "servingSizeKu": "١ پارچە (٥٠ گرام)",
    "caloriesEstimate": 430,
    "protein": 6,
    "carbohydrates": 44,
    "fat": 26,
    "fiber": 2.4,
    "vitamins": [
      "Vitamin E"
    ],
    "minerals": [],
    "allergens": [
      "gluten",
      "tree nuts",
      "dairy"
    ],
    "suitabilityEn": "Baklava is a source of natural sugars and unsaturated fats. It generally fits vegetarian eating patterns. It contains gluten, tree nuts, dairy, so avoid it if you have a related allergy. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "بەقلاوا سەرچاوەیەکی شەکری سروشتی و چەوری ناڕاژاوـە. بەگشتی گونجاوە بۆ خواردنی گیاخۆری. پێکهاتەی گلوتن، گوێزی دار، شیرەمەنی تێدایە، بۆیە ئەگەر ئالەرجیت هەیە خۆت لێ بپارێزە. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Layers of thin pastry filled with nuts and soaked in syrup, best as an occasional treat.",
    "prepKu": "چین چینی هەویری تەنک بە گوێز پڕکراو و لە شیرین شلاندا، باشترە کەم-کەم خۆراک بکرێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "kunafa",
    "nameEn": "Kunafa",
    "nameKu": "کنافە",
    "category": "sweets",
    "servingSizeEn": "1 piece (50 g)",
    "servingSizeKu": "١ پارچە (٥٠ گرام)",
    "caloriesEstimate": 420,
    "protein": 8,
    "carbohydrates": 56,
    "fat": 18,
    "fiber": 1.6,
    "vitamins": [
      "Vitamin A"
    ],
    "minerals": [
      "Calcium"
    ],
    "allergens": [
      "gluten",
      "dairy"
    ],
    "suitabilityEn": "Kunafa is a source of natural sugars and calcium. It generally fits vegetarian eating patterns. It contains gluten, dairy, so avoid it if you have a related allergy. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "کنافە سەرچاوەیەکی شەکری سروشتی و کالسیۆمـە. بەگشتی گونجاوە بۆ خواردنی گیاخۆری. پێکهاتەی گلوتن، شیرەمەنی تێدایە، بۆیە ئەگەر ئالەرجیت هەیە خۆت لێ بپارێزە. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Shredded pastry layered with cheese or cream and soaked in syrup.",
    "prepKu": "هەویری وردکراو لەگەڵ پەنیر یان کریم چین دەکرێت و لە شیرین شلاندا.",
    "relatedRecipeIds": []
  },
  {
    "id": "halva-tahini",
    "nameEn": "Halva (tahini-based)",
    "nameKu": "حەلاوەی تەحین",
    "category": "sweets",
    "servingSizeEn": "50 g",
    "servingSizeKu": "٥٠ گرام",
    "caloriesEstimate": 520,
    "protein": 12,
    "carbohydrates": 48,
    "fat": 34,
    "fiber": 4,
    "vitamins": [
      "Vitamin E"
    ],
    "minerals": [
      "Calcium",
      "Iron"
    ],
    "allergens": [
      "sesame"
    ],
    "suitabilityEn": "Halva (tahini-based) is a source of unsaturated fats and calcium. It generally fits vegetarian eating patterns. It contains sesame, so avoid it if you have a related allergy. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "حەلاوەی تەحین سەرچاوەیەکی چەوری ناڕاژاو و کالسیۆمـە. بەگشتی گونجاوە بۆ خواردنی گیاخۆری. پێکهاتەی کونجی تێدایە، بۆیە ئەگەر ئالەرجیت هەیە خۆت لێ بپارێزە. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Sesame paste blended with sugar syrup and set.",
    "prepKu": "تەحین لەگەڵ شیرینی شکردار دەهاڕدرێت و ڕەق دەبێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "date-cookies-maamoul",
    "nameEn": "Date cookies (maamoul)",
    "nameKu": "کلێچەی خورما",
    "category": "sweets",
    "servingSizeEn": "1 piece (40 g)",
    "servingSizeKu": "١ پارچە (٤٠ گرام)",
    "caloriesEstimate": 450,
    "protein": 6,
    "carbohydrates": 60,
    "fat": 20,
    "fiber": 3.8,
    "vitamins": [
      "Vitamin B6"
    ],
    "minerals": [
      "Potassium"
    ],
    "allergens": [
      "gluten",
      "dairy"
    ],
    "suitabilityEn": "Date cookies (maamoul) is a source of natural sugars and dietary fiber. It generally fits vegetarian eating patterns. It contains gluten, dairy, so avoid it if you have a related allergy. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "کلێچەی خورما سەرچاوەیەکی شەکری سروشتی و فایبەری خۆراکیـە. بەگشتی گونجاوە بۆ خواردنی گیاخۆری. پێکهاتەی گلوتن، شیرەمەنی تێدایە، بۆیە ئەگەر ئالەرجیت هەیە خۆت لێ بپارێزە. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Semolina dough filled with a date paste, then baked.",
    "prepKu": "هەویری سمید بە کوتراوی خورما پڕ دەکرێت، پاشان لە فرن دەپژرێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "rice-pudding",
    "nameEn": "Rice pudding",
    "nameKu": "شیربرنج",
    "category": "sweets",
    "servingSizeEn": "150 g",
    "servingSizeKu": "١٥٠ گرام",
    "caloriesEstimate": 150,
    "protein": 4,
    "carbohydrates": 26,
    "fat": 3,
    "fiber": 0.5,
    "vitamins": [
      "Vitamin D"
    ],
    "minerals": [
      "Calcium"
    ],
    "allergens": [
      "dairy"
    ],
    "suitabilityEn": "Rice pudding is a source of calcium and natural sugars. It generally fits vegetarian eating patterns. It contains dairy, so avoid it if you have a related allergy. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "شیربرنج سەرچاوەیەکی کالسیۆم و شەکری سروشتیـە. بەگشتی گونجاوە بۆ خواردنی گیاخۆری. پێکهاتەی شیرەمەنی تێدایە، بۆیە ئەگەر ئالەرجیت هەیە خۆت لێ بپارێزە. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Rice slow-cooked in milk and sugar until creamy.",
    "prepKu": "برنج بەهێواشی لەگەڵ شیر و شەکر دەکوڵێنرێت تا کرێمی دەبێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "qatlama-sweet-bread",
    "nameEn": "Qatlama (sweet bread)",
    "nameKu": "قتلمە",
    "category": "sweets",
    "servingSizeEn": "1 piece (60 g)",
    "servingSizeKu": "١ پارچە (٦٠ گرام)",
    "caloriesEstimate": 380,
    "protein": 7,
    "carbohydrates": 50,
    "fat": 16,
    "fiber": 1.8,
    "vitamins": [],
    "minerals": [],
    "allergens": [
      "gluten",
      "dairy"
    ],
    "suitabilityEn": "Qatlama (sweet bread) is a source of complex carbohydrates and natural sugars. It generally fits vegetarian eating patterns. It contains gluten, dairy, so avoid it if you have a related allergy. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "قتلمە سەرچاوەیەکی کاربۆهایدراتی تێکەڵ و شەکری سروشتیـە. بەگشتی گونجاوە بۆ خواردنی گیاخۆری. پێکهاتەی گلوتن، شیرەمەنی تێدایە، بۆیە ئەگەر ئالەرجیت هەیە خۆت لێ بپارێزە. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Layered sweet dough baked or fried until golden.",
    "prepKu": "هەویری شیرینی چینکراو لە فرن یان سرووتاوی دەکرێت تا زەرد دەبێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "zulbia",
    "nameEn": "Zulbia",
    "nameKu": "زۆڵبیا",
    "category": "sweets",
    "servingSizeEn": "40 g",
    "servingSizeKu": "٤٠ گرام",
    "caloriesEstimate": 400,
    "protein": 3,
    "carbohydrates": 62,
    "fat": 16,
    "fiber": 0.5,
    "vitamins": [],
    "minerals": [],
    "allergens": [
      "gluten"
    ],
    "suitabilityEn": "Zulbia is a source of natural sugars. It generally fits vegetarian eating patterns. It contains gluten, so avoid it if you have a related allergy. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "زۆڵبیا سەرچاوەیەکی شەکری سروشتیـە. بەگشتی گونجاوە بۆ خواردنی گیاخۆری. پێکهاتەی گلوتن تێدایە، بۆیە ئەگەر ئالەرجیت هەیە خۆت لێ بپارێزە. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Batter piped into hot oil, fried, then soaked in syrup.",
    "prepKu": "هەویرێکی شل بە ڕۆنی گەرمدا دەڕژێنرێت، سرووتاوی دەکرێت، پاشان لە شیرین شلاندا دادەخرێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "honey",
    "nameEn": "Honey",
    "nameKu": "هەنگوین",
    "category": "sweets",
    "servingSizeEn": "1 tbsp (21 g)",
    "servingSizeKu": "١ کەوچک (٢١ گرام)",
    "caloriesEstimate": 304,
    "protein": 0.3,
    "carbohydrates": 82,
    "fat": 0,
    "fiber": 0.2,
    "vitamins": [],
    "minerals": [
      "Potassium"
    ],
    "allergens": [],
    "suitabilityEn": "Honey is a source of natural sugars and antioxidants. It generally fits vegetarian eating patterns. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "هەنگوین سەرچاوەیەکی شەکری سروشتی و دژە ئۆکسیدانتـە. بەگشتی گونجاوە بۆ خواردنی گیاخۆری. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Drizzled over bread, yogurt, or desserts, best in moderation.",
    "prepKu": "بەسەر نان، مۆست یان شیرینیدا دەپرژرێت، باشترە بەئەندازە بەکاربهێنرێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "date-molasses-dibs",
    "nameEn": "Date molasses (dibs)",
    "nameKu": "دۆشابی خورما",
    "category": "sweets",
    "servingSizeEn": "1 tbsp (21 g)",
    "servingSizeKu": "١ کەوچک (٢١ گرام)",
    "caloriesEstimate": 300,
    "protein": 1,
    "carbohydrates": 76,
    "fat": 0.2,
    "fiber": 2.4,
    "vitamins": [],
    "minerals": [
      "Iron",
      "Potassium"
    ],
    "allergens": [],
    "suitabilityEn": "Date molasses (dibs) is a source of natural sugars and iron. It generally fits vegan, gluten-free eating patterns. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "دۆشابی خورما سەرچاوەیەکی شەکری سروشتی و ئاسنـە. بەگشتی گونجاوە بۆ خواردنی ڤیگان، بەبێ گلوتن. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Boiled-down date syrup drizzled over bread or tahini.",
    "prepKu": "شیرینی خورمای کوڵاوکراو بەسەر نان یان تەحیندا دەپرژرێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "dark-chocolate",
    "nameEn": "Dark chocolate",
    "nameKu": "چاکۆلێتی تاریک",
    "category": "sweets",
    "servingSizeEn": "30 g",
    "servingSizeKu": "٣٠ گرام",
    "caloriesEstimate": 546,
    "protein": 4.9,
    "carbohydrates": 61,
    "fat": 31,
    "fiber": 7,
    "vitamins": [],
    "minerals": [
      "Iron",
      "Magnesium"
    ],
    "allergens": [
      "dairy",
      "soy"
    ],
    "suitabilityEn": "Dark chocolate is a source of antioxidants and magnesium. It generally fits vegetarian eating patterns. It contains dairy, soy, so avoid it if you have a related allergy. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "چاکۆلێتی تاریک سەرچاوەیەکی دژە ئۆکسیدانت و ماگنیزیۆمـە. بەگشتی گونجاوە بۆ خواردنی گیاخۆری. پێکهاتەی شیرەمەنی، سۆیا تێدایە، بۆیە ئەگەر ئالەرجیت هەیە خۆت لێ بپارێزە. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Eaten as a treat in small squares, best in moderation.",
    "prepKu": "بە پارچە بچووک وەک خواردنی سووک دەخورێت، باشترە بەئەندازە بەکاربهێنرێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "milk-chocolate",
    "nameEn": "Milk chocolate",
    "nameKu": "چاکۆلێتی شیر",
    "category": "sweets",
    "servingSizeEn": "30 g",
    "servingSizeKu": "٣٠ گرام",
    "caloriesEstimate": 535,
    "protein": 7.7,
    "carbohydrates": 59,
    "fat": 30,
    "fiber": 3,
    "vitamins": [
      "Vitamin A"
    ],
    "minerals": [
      "Calcium"
    ],
    "allergens": [
      "dairy",
      "soy"
    ],
    "suitabilityEn": "Milk chocolate is a source of calcium and natural sugars. It generally fits vegetarian eating patterns. It contains dairy, soy, so avoid it if you have a related allergy. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "چاکۆلێتی شیر سەرچاوەیەکی کالسیۆم و شەکری سروشتیـە. بەگشتی گونجاوە بۆ خواردنی گیاخۆری. پێکهاتەی شیرەمەنی، سۆیا تێدایە، بۆیە ئەگەر ئالەرجیت هەیە خۆت لێ بپارێزە. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Eaten as a treat, best in moderation.",
    "prepKu": "وەک خواردنی سووک دەخورێت، باشترە بەئەندازە بەکاربهێنرێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "ice-cream",
    "nameEn": "Ice cream",
    "nameKu": "ئایسکریم",
    "category": "sweets",
    "servingSizeEn": "100 g",
    "servingSizeKu": "١٠٠ گرام",
    "caloriesEstimate": 207,
    "protein": 3.5,
    "carbohydrates": 24,
    "fat": 11,
    "fiber": 0.7,
    "vitamins": [
      "Vitamin A"
    ],
    "minerals": [
      "Calcium"
    ],
    "allergens": [
      "dairy",
      "eggs"
    ],
    "suitabilityEn": "Ice cream is a source of calcium and natural sugars. It generally fits vegetarian eating patterns. It contains dairy, eggs, so avoid it if you have a related allergy. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "ئایسکریم سەرچاوەیەکی کالسیۆم و شەکری سروشتیـە. بەگشتی گونجاوە بۆ خواردنی گیاخۆری. پێکهاتەی شیرەمەنی، هێلکە تێدایە، بۆیە ئەگەر ئالەرجیت هەیە خۆت لێ بپارێزە. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "A frozen dairy dessert, best enjoyed occasionally.",
    "prepKu": "شیرینییەکی بەستراوی شیرەمەنیە، باشترە کەم-کەم خۆراک بکرێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "dried-fruit-mix",
    "nameEn": "Dried fruit mix",
    "nameKu": "تێکەڵی میوەی وشک",
    "category": "sweets",
    "servingSizeEn": "40 g",
    "servingSizeKu": "٤٠ گرام",
    "caloriesEstimate": 120,
    "protein": 1.5,
    "carbohydrates": 30,
    "fat": 0.5,
    "fiber": 3.5,
    "vitamins": [],
    "minerals": [
      "Potassium",
      "Iron"
    ],
    "allergens": [],
    "suitabilityEn": "Dried fruit mix is a source of dietary fiber and iron. It generally fits vegan, gluten-free eating patterns. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "تێکەڵی میوەی وشک سەرچاوەیەکی فایبەری خۆراکی و ئاسنـە. بەگشتی گونجاوە بۆ خواردنی ڤیگان، بەبێ گلوتن. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "A mix of dried fruits eaten as a snack.",
    "prepKu": "تێکەڵێکی میوەی وشک کە وەک خواردنی سووک دەخورێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "sesame-brittle",
    "nameEn": "Sesame brittle bar",
    "nameKu": "سیمسیمیە",
    "category": "sweets",
    "servingSizeEn": "30 g",
    "servingSizeKu": "٣٠ گرام",
    "caloriesEstimate": 480,
    "protein": 10,
    "carbohydrates": 48,
    "fat": 30,
    "fiber": 6,
    "vitamins": [
      "Vitamin E"
    ],
    "minerals": [
      "Calcium",
      "Iron"
    ],
    "allergens": [
      "sesame"
    ],
    "suitabilityEn": "Sesame brittle bar is a source of calcium and unsaturated fats. It generally fits vegetarian eating patterns. It contains sesame, so avoid it if you have a related allergy. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "سیمسیمیە سەرچاوەیەکی کالسیۆم و چەوری ناڕاژاوـە. بەگشتی گونجاوە بۆ خواردنی گیاخۆری. پێکهاتەی کونجی تێدایە، بۆیە ئەگەر ئالەرجیت هەیە خۆت لێ بپارێزە. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "Toasted sesame seeds set in caramelized sugar.",
    "prepKu": "تۆوی کونجی برژاو لە شەکری سووتاودا ڕەق دەبێت.",
    "relatedRecipeIds": []
  },
  {
    "id": "turkish-delight",
    "nameEn": "Turkish delight",
    "nameKu": "لوقومی تورکی",
    "category": "sweets",
    "servingSizeEn": "30 g",
    "servingSizeKu": "٣٠ گرام",
    "caloriesEstimate": 366,
    "protein": 0.6,
    "carbohydrates": 90,
    "fat": 0.2,
    "fiber": 0.9,
    "vitamins": [],
    "minerals": [],
    "allergens": [
      "tree nuts"
    ],
    "suitabilityEn": "Turkish delight is a source of natural sugars. It generally fits vegetarian eating patterns. It contains tree nuts, so avoid it if you have a related allergy. This is general nutrition education, not medical advice, and no food listed here is claimed to cure or treat any disease.",
    "suitabilityKu": "لوقومی تورکی سەرچاوەیەکی شەکری سروشتیـە. بەگشتی گونجاوە بۆ خواردنی گیاخۆری. پێکهاتەی گوێزی دار تێدایە، بۆیە ئەگەر ئالەرجیت هەیە خۆت لێ بپارێزە. ئەمە تەنها زانیاری فێربووندنی گشتیە دەربارەی خۆراک، جێگری ڕاوێژی پزیشکی نییە، و هیچ خواردنێک لێرە باس نەکراوە کە نەخۆشی چاک بکاتەوە یان چارەسەری بکات.",
    "prepEn": "A soft gel-like sweet, often dusted with powdered sugar.",
    "prepKu": "شیرینییەکی نەرمی ژێلیشکاوە، زۆرجار بە تۆزی شەکر دادپۆشرێت.",
    "relatedRecipeIds": []
  }
];

export const NUTRITION_FOODS = RAW_FOODS.map(food);

export function getFoodById(id) {
  return NUTRITION_FOODS.find((item) => item.id === id) || null;
}

export function getFoodsByCategory(catId) {
  if (!catId || catId === "all") return NUTRITION_FOODS;
  return NUTRITION_FOODS.filter((item) => item.category === catId);
}

export function searchFoods(query) {
  const q = String(query || "").trim().toLowerCase();
  if (!q) return NUTRITION_FOODS;
  return NUTRITION_FOODS.filter((item) => {
    const haystack = [
      item.nameEn,
      item.nameKu,
      item.category,
      ...(item.vitamins || []),
      ...(item.minerals || []),
      ...(item.allergens || []),
    ]
      .join(" ")
      .toLowerCase();
    return haystack.includes(q);
  });
}
