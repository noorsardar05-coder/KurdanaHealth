import { useMemo, useState } from "react";
import {
  BEAUTY_CATEGORIES,
  BEAUTY_COLLECTIONS,
  matchesLibraryFilter,
} from "../data/beautyProducts.js";
import { L } from "../utils/locale.js";
import BeautyProductGrid from "./BeautyProductGrid.jsx";

export default function BeautyShop({
  t,
  lang = "en",
  products,
  favorites,
  onProductClick,
  onToggleFavorite,
  showFavoritesOnly,
  onToggleFavoritesView,
}) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [collection, setCollection] = useState("all");
  const [sort, setSort] = useState("name");

  const filtered = useMemo(() => {
    let list = [...products];
    if (showFavoritesOnly) list = list.filter((p) => (favorites ?? []).includes(p.id));
    if (category !== "all") list = list.filter((p) => matchesLibraryFilter(p, category));
    if (collection !== "all") {
      list = list.filter((p) => (p.collections || []).includes(collection));
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((p) => {
        const hay =
          p.searchText ||
          [p.name, p.brand, p.categoryLabel, (p.ingredients || []).join(" ")].join(" ").toLowerCase();
        return hay.includes(q);
      });
    }
    if (sort === "brand") {
      list.sort((a, b) => a.brand.localeCompare(b.brand) || String(a.name).localeCompare(String(b.name)));
    } else {
      list.sort((a, b) => String(a.name).localeCompare(String(b.name)));
    }
    return list;
  }, [products, category, collection, search, sort, showFavoritesOnly, favorites]);

  const sectioned = useMemo(() => {
    if (category !== "all" || collection !== "all" || showFavoritesOnly || search.trim()) {
      return null;
    }
    const collectionSections = BEAUTY_COLLECTIONS.map((col) => ({
      id: col.id,
      label: L(col.label, lang),
      kind: "collection",
      items: products.filter((p) => (p.collections || []).includes(col.id)).slice(0, 8),
    })).filter((s) => s.items.length);

    const categorySections = BEAUTY_CATEGORIES.map((cat) => ({
      id: cat.id,
      label: L(cat.label, lang),
      kind: "category",
      items: products.filter((p) => matchesLibraryFilter(p, cat.id)).slice(0, 8),
    })).filter((s) => s.items.length);

    // Prefer editorial collections first, then category shelves
    return [...collectionSections.slice(0, 8), ...categorySections.slice(0, 6)];
  }, [products, category, collection, showFavoritesOnly, search, lang]);

  return (
    <section id="beauty-shop" className="bt-section bt-library">
      <p className="bt-section-label">{t("libraryEyebrow")}</p>
      <h2 className="bt-section-title">{t("shopTitle")}</h2>
      <p className="bt-section-sub">{t("shopSub")}</p>
      <p className="bt-library-count">
        {t("libraryCount").replace("{n}", String(products.length))}
      </p>

      <p className="bt-chip-heading">{t("collections")}</p>
      <div className="bt-library-chips" role="tablist" aria-label={t("collections")}>
        <button
          type="button"
          className={`bt-chip ${collection === "all" ? "is-active" : ""}`}
          onClick={() => setCollection("all")}
        >
          {t("allCollections")}
        </button>
        {BEAUTY_COLLECTIONS.map((c) => (
          <button
            key={c.id}
            type="button"
            className={`bt-chip ${collection === c.id ? "is-active" : ""}`}
            onClick={() => {
              setCollection(c.id);
              setCategory("all");
            }}
          >
            {L(c.label, lang)}
          </button>
        ))}
      </div>

      <p className="bt-chip-heading">{t("filter")}</p>
      <div className="bt-library-chips" role="tablist" aria-label={t("filter")}>
        <button
          type="button"
          className={`bt-chip ${category === "all" ? "is-active" : ""}`}
          onClick={() => setCategory("all")}
        >
          {t("allCategories")}
        </button>
        {BEAUTY_CATEGORIES.map((c) => (
          <button
            key={c.id}
            type="button"
            className={`bt-chip ${category === c.id ? "is-active" : ""}`}
            onClick={() => setCategory(c.id)}
          >
            {L(c.label, lang)}
          </button>
        ))}
      </div>

      <div className="bt-shop-toolbar bt-library-toolbar">
        <input
          type="search"
          className="bt-input"
          placeholder={t("search")}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          aria-label={t("search")}
        />
        <select
          className="bt-select"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          aria-label={t("sort")}
        >
          <option value="name">{t("sortName")}</option>
          <option value="brand">{t("sortBrand")}</option>
        </select>
        <button type="button" className="bt-ghost-btn" onClick={onToggleFavoritesView}>
          {showFavoritesOnly ? t("showAll") : t("favorites")} ({favorites.length})
        </button>
      </div>

      {sectioned ? (
        <div className="bt-library-sections">
          {sectioned.map((sec) => (
            <div key={`${sec.kind}-${sec.id}`} className="bt-library-section">
              <div className="bt-library-section__head">
                <h3 className="bt-subsection-title">{sec.label}</h3>
                <button
                  type="button"
                  className="bt-text-link"
                  onClick={() => {
                    if (sec.kind === "collection") {
                      setCollection(sec.id);
                      setCategory("all");
                    } else {
                      setCategory(sec.id);
                      setCollection("all");
                    }
                  }}
                >
                  {t("viewSection")}
                </button>
              </div>
              <BeautyProductGrid
                products={sec.items}
                t={t}
                onProductClick={onProductClick}
                favorites={favorites}
                onToggleFavorite={onToggleFavorite}
              />
            </div>
          ))}
        </div>
      ) : (
        <BeautyProductGrid
          products={filtered}
          t={t}
          onProductClick={onProductClick}
          favorites={favorites}
          onToggleFavorite={onToggleFavorite}
          emptyMessage={showFavoritesOnly ? t("emptyFavorites") : t("noProducts")}
        />
      )}
    </section>
  );
}
