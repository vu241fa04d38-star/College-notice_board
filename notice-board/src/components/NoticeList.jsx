import NoticeCard from "./NoticeCard.jsx";
import EmptyState from "./EmptyState.jsx";

export default function NoticeList({ notices, actions, onClear }) {
  if (notices.length === 0) return <EmptyState onClear={onClear} />;
  return (
    <div className="grid">
      {notices.map((n) => (
        <NoticeCard key={n.id} notice={n} actions={actions} />
      ))}
    </div>
  );
}
