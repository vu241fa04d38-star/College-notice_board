import { useEffect, useMemo, useState } from "react";
import StatsBar from "./components/StatsBar.jsx";
import FilterBar from "./components/FilterBar.jsx";
import NoticeList from "./components/NoticeList.jsx";
import NoticeModal from "./components/NoticeModal.jsx";
import AddNoticeForm from "./components/AddNoticeForm.jsx";
import { makeSeedNotices } from "./data/notices.js";
import { filterNotices, sortNotices, readStorage, writeStorage, todayISO } from "./utils.js";

const DEFAULT_FILTERS = {
  category: "All", priority: "All", status: "All", importantOnly: false, query: "", sortBy: "priority",
};

export default function App() {
  // State: all notices (saved in the browser), filters, theme, and which dialog is open.
  const [notices, setNotices] = useState(() => readStorage("nb-notices-v2", null) ?? makeSeedNotices());
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [dark, setDark] = useState(() =>
    readStorage("nb-dark", window.matchMedia?.("(prefers-color-scheme: dark)").matches ?? false)
  );
  const [selectedId, setSelectedId] = useState(null);
  const [adding, setAdding] = useState(false);

  useEffect(() => writeStorage("nb-notices-v2", notices), [notices]);
  useEffect(() => {
    document.documentElement.dataset.theme = dark ? "dark" : "light";
    writeStorage("nb-dark", dark);
  }, [dark]);

  const patch = (id, change) => setNotices((ns) => ns.map((n) => (n.id === id ? { ...n, ...change } : n)));

  const actions = {
    onOpen: (id) => { patch(id, { isRead: true }); setSelectedId(id); },
    onToggleRead: (id) => setNotices((ns) => ns.map((n) => (n.id === id ? { ...n, isRead: !n.isRead } : n))),
    onTogglePin: (id) => setNotices((ns) => ns.map((n) => (n.id === id ? { ...n, pinned: !n.pinned } : n))),
    onDelete: (id) => {
      if (window.confirm("Delete this notice? This cannot be undone.")) {
        setNotices((ns) => ns.filter((n) => n.id !== id));
      }
    },
  };

  const addNotice = (fields) =>
    setNotices((ns) => [{ ...fields, id: Date.now(), date: todayISO(), isRead: false }, ...ns]);
  const markAllRead = () => setNotices((ns) => ns.map((n) => ({ ...n, isRead: true })));
  const clearFilters = () => setFilters(DEFAULT_FILTERS);
  const resetSamples = () => {
    if (window.confirm("Replace all notices with the original sample data?")) setNotices(makeSeedNotices());
  };

  const visible = useMemo(() => sortNotices(filterNotices(notices, filters), filters.sortBy), [notices, filters]);
  const selected = notices.find((n) => n.id === selectedId);
  const unread = notices.filter((n) => !n.isRead).length;
  const urgent = notices.filter((n) => n.priority === "High" && !n.isRead).length;

  return (
    <main className="wrap">
      <header className="hero">
        <div>
          <h1>📌 Vignan's Notice Priority Board</h1>
          <p>Never miss what matters. Important notices come first.</p>
        </div>
        <div className="hero__actions">
          <button type="button" className="btn btn--light" onClick={() => setAdding(true)}>＋ Add notice</button>
          <button type="button" className="btn btn--glass" onClick={() => setDark(!dark)}>
            {dark ? "☀️ Light mode" : "🌙 Dark mode"}
          </button>
        </div>
      </header>

      <StatsBar total={notices.length} unread={unread} urgent={urgent} />
      <FilterBar filters={filters} setFilters={setFilters} onClear={clearFilters} onMarkAll={markAllRead} />
      <NoticeList notices={visible} actions={actions} onClear={clearFilters} />

      <footer className="footer">
        <button type="button" className="link-btn" onClick={resetSamples}>Reset sample data</button>
      </footer>

      {selected && <NoticeModal notice={selected} actions={actions} onClose={() => setSelectedId(null)} />}
      {adding && <AddNoticeForm onAdd={addNotice} onClose={() => setAdding(false)} />}
    </main>
  );
}
