import Badge from "./Badge.jsx";
import DeadlineTag from "./DeadlineTag.jsx";
import { formatDate } from "../utils.js";

export default function NoticeCard({ notice, actions }) {
  const { id, title, description, category, priority, date, deadline, isRead, pinned } = notice;
  return (
    <article className={`card card--${priority.toLowerCase()} ${isRead ? "card--read" : "card--unread"}${pinned ? " card--pinned" : ""}`}>
      <div className="card__top">
        {pinned && <span className="pin-flag">📌 Pinned</span>}
        <Badge priority={priority} />
        <Badge>{category}</Badge>
        {!isRead && <span className="dot" role="img" aria-label="Unread" />}
      </div>
      <h3>
        <button type="button" className="card__title" onClick={() => actions.onOpen(id)}>{title}</button>
      </h3>
      <p>{description}</p>
      <DeadlineTag deadline={deadline} />
      <div className="card__foot">
        <time dateTime={date}>{formatDate(date)}</time>
        <div className="card__actions">
          <button type="button" className="btn btn--sm" onClick={() => actions.onToggleRead(id)}>
            {isRead ? "Mark unread" : "Mark read"}
          </button>
          <button
            type="button"
            className={`icon-btn${pinned ? " icon-btn--on" : ""}`}
            aria-pressed={pinned}
            aria-label={pinned ? "Unpin notice" : "Pin notice to top"}
            title={pinned ? "Unpin" : "Pin to top"}
            onClick={() => actions.onTogglePin(id)}
          >📌</button>
          <button
            type="button"
            className="icon-btn icon-btn--danger"
            aria-label="Delete notice"
            title="Delete"
            onClick={() => actions.onDelete(id)}
          >🗑</button>
        </div>
      </div>
    </article>
  );
}
