import Modal from "./Modal.jsx";
import Badge from "./Badge.jsx";
import DeadlineTag from "./DeadlineTag.jsx";
import { formatDate } from "../utils.js";

export default function NoticeModal({ notice, actions, onClose }) {
  const { id, title, description, details, category, priority, date, deadline, isRead, pinned } = notice;
  return (
    <Modal title={title} onClose={onClose}>
      <div className="card__top">
        <Badge priority={priority} />
        <Badge>{category}</Badge>
        {pinned && <span className="pin-flag">📌 Pinned</span>}
      </div>
      <p className="modal__text">{details || description}</p>
      <dl className="meta">
        <div><dt>Posted</dt><dd>{formatDate(date)}</dd></div>
        {deadline && <div><dt>Deadline</dt><dd>{formatDate(deadline)}</dd></div>}
        <div><dt>Status</dt><dd>{isRead ? "Read" : "Unread"}</dd></div>
      </dl>
      <DeadlineTag deadline={deadline} />
      <div className="modal__actions">
        <button type="button" className="btn" onClick={() => actions.onToggleRead(id)}>
          {isRead ? "Mark as unread" : "Mark as read"}
        </button>
        <button type="button" className="btn" onClick={() => actions.onTogglePin(id)}>
          {pinned ? "Unpin" : "Pin to top"}
        </button>
        <button type="button" className="btn btn--danger" onClick={() => actions.onDelete(id)}>Delete</button>
      </div>
    </Modal>
  );
}
