import { getBeautyProducts } from './beautyProducts.js'
import { searchBlob } from '../utils/locale.js'

function profileTokens(profile) {
  if (!profile) return []
  return [
    profile.skinType,
    ...(Array.isArray(profile.concerns) ? profile.concerns : []),
    profile.undertone,
    ...(Array.isArray(profile.texture) ? profile.texture : []),
    ...(Array.isArray(profile.makeupStyle) ? profile.makeupStyle : []),
  ].filter(Boolean)
}

function productScore(product, tokens) {
  if (!tokens.length) return 1
  let score = 0
  const concerns = searchBlob(product.concerns)
  const hay = [
    product.skinTypes,
    concerns,
    product.tags,
    product.category,
    searchBlob(product.forWhom),
    searchBlob(product.benefits),
    product.collections,
  ]
    .flat()
    .join(' ')
    .toLowerCase()

  tokens.forEach((token) => {
    const t = String(token).toLowerCase()
    if (hay.includes(t)) score += 3
    if ((product.skinTypes || []).some((s) => s.toLowerCase().includes(t))) score += 2
    if (concerns.toLowerCase().includes(t)) score += 2
  })
  return score
}

export function getPersonalizedProducts(profile, limit = 8) {
  const products = getBeautyProducts()
  const tokens = profileTokens(profile)
  return [...products]
    .map((p) => ({ ...p, _score: productScore(p, tokens) }))
    .sort((a, b) => b._score - a._score)
    .slice(0, limit)
    .map(({ _score, ...rest }) => rest)
}

/** Alias used by BeautyExperience */
export function getPersonalizedRecommendations(profile, limit = 8) {
  return getPersonalizedProducts(profile, limit)
}

export function getCategoryHighlights(profile) {
  const picks = getPersonalizedProducts(profile, 24)
  const order = [
    'cleansers',
    'serums',
    'moisturizers',
    'sunscreens',
    'lip-care',
    'makeup',
    'haircare',
    'korean-beauty',
    'french-pharmacy',
  ]
  return order
    .map((category) => {
      const items = picks.filter(
        (p) =>
          p.category === category ||
          (p.tags || []).includes(category) ||
          (category === 'korean-beauty' && (p.tags || []).includes('korean-beauty')) ||
          (category === 'french-pharmacy' && (p.tags || []).includes('french-pharmacy')),
      )
      return { category, items: items.slice(0, 4) }
    })
    .filter((row) => row.items.length)
}

export function getRoutineStepProducts(profile, stepKind, limit = 3) {
  const map = {
    cleanser: 'cleansers',
    toner: 'serums',
    serum: 'serums',
    moisturizer: 'moisturizers',
    spf: 'sunscreens',
    lip: 'lip-care',
    eye: 'serums',
    treatment: 'serums',
  }
  const cat = map[stepKind] || 'skincare'
  return getPersonalizedProducts(profile, 40)
    .filter((p) => p.category === cat || (p.tags || []).includes(cat))
    .slice(0, limit)
}

/** Named educational picks for morning/evening routine UI */
export function getRoutineProducts(profile) {
  const pick = (kind) => {
    const list = getRoutineStepProducts(profile, kind, 1)
    const name = list[0]?.name
    if (!name) return 'Gentle educational pick'
    return typeof name === 'string' ? name : name.en || 'Gentle educational pick'
  }
  return {
    cleanser: pick('cleanser'),
    toner: pick('serum'),
    serum: pick('serum'),
    moisturizer: pick('moisturizer'),
    sunscreen: pick('spf'),
  }
}

