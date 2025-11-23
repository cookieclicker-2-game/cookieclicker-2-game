// assets/js/games-data.js
// DỮ LIỆU GAME – Mỗi lần thêm game mới bạn chỉ cần thêm 1 object vào GAMES.

const GAMES = [
  {
    id: "cookie-clicker-2",
    title: "Cookie Clicker 2",
    slug: "cookie-clicker-2", // URL trang game: /cookie-clicker-2/
    thumbnail: "/assets/thumbs/cookie-clicker-2.png",
    embedUrl: "/embed/cookie-clicker-2/index.html",
    categories: ["clicker", "idle"],
    isHot: true,
    createdAt: "2025-11-01"
  }
  // 🔼 Sau này thêm game mới bên dưới object này
];

function getGameBySlug(slug) {
  return GAMES.find((g) => g.slug === slug) || null;
}

function getHotGames(limit = 8) {
  return [...GAMES]
    .filter((g) => g.isHot)
    .sort((a, b) => (b.createdAt || "").localeCompare(a.createdAt || ""))
    .slice(0, limit);
}

function getGamesByCategory(cat, page = 1, perPage = 20) {
  const list = [...GAMES]
    .filter((g) => g.categories.includes(cat))
    .sort((a, b) => (b.createdAt || "").localeCompare(a.createdAt || ""));

  const total = list.length;
  const totalPages = Math.max(1, Math.ceil(total / perPage));
  const currentPage = Math.min(Math.max(page, 1), totalPages);

  const start = (currentPage - 1) * perPage;
  const end = start + perPage;

  return {
    items: list.slice(start, end),
    total,
    totalPages,
    currentPage
  };
}

function getClickerGames(limit = 12) {
  return getGamesByCategory("clicker", 1, limit).items;
}

function getNewGames(limit = 12) {
  return [...GAMES]
    .sort((a, b) => (b.createdAt || "").localeCompare(a.createdAt || ""))
    .slice(0, limit);
}

function searchGamesByTitle(keyword, limit = 10) {
  if (!keyword) return [];
  const q = keyword.toLowerCase().trim();
  return GAMES.filter((g) => g.title.toLowerCase().includes(q)).slice(
    0,
    limit
  );
}

