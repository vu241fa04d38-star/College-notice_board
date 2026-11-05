import { useState } from "react";
import Modal from "./Modal.jsx";
import { CATEGORIES, PRIORITIES } from "../data/notices.js";

const EMPTY = { title: "", description: "", details: "", category: "General", priority: "Medium", deadline: "", pinned: false };

export default function AddNoticeForm({ onAdd, onClose }) {
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const set = (key) => (e) =>
    setForm((f) => ({ ...f, [key]: e.target.type === "checkbox" ? e.target.checked : e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    const next = {};
    if (form.title.trim().length < 3) next.title = "Enter a title of at least 3 characters.";
    if (!form.description.trim()) next.description = "Add a short description.";
    setErrors(next);
    if (Object.keys(next).length) return;
    onAdd({ ...form, title: form.title.trim(), description: form.description.trim(), details: form.details.trim() });
    onClose();
  };

  return (
    <Modal title="Add a notice" onClose={onClose}>
      <form className="form" onSubmit={submit} noValidate>
        <label>
          Title
          <input value={form.title} onChange={set("title")} placeholder="e.g. Lab exam schedule" aria-invalid={!!errors.title} />
          {errors.title && <span className="error">{errors.title}</span>}
        </label>
        <label>
          Short description
          <input value={form.description} onChange={set("description")} placeholder="One line students see on the card" aria-invalid={!!errors.description} />
          {errors.description && <span className="error">{errors.description}</span>}
        </label>
        <label>
          Full details (optional)
          <textarea rows="3" value={form.details} onChange={set("details")} placeholder="Shown when a student opens the notice" />
        </label>
        <div className="form__two">
          <label>
            Category
            <select value={form.category} onChange={set("category")}>
              {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
            </select>
          </label>
          <label>
            Priority
            <select value={form.priority} onChange={set("priority")}>
              {PRIORITIES.map((p) => <option key={p}>{p}</option>)}
            </select>
          </label>
        </div>
        <label>
          Deadline (optional)
          <input type="date" value={form.deadline} onChange={set("deadline")} />
        </label>
        <label className="check">
          <input type="checkbox" checked={form.pinned} onChange={set("pinned")} /> Pin to the top of the board
        </label>
        <div className="modal__actions">
          <button type="button" className="btn" onClick={onClose}>Cancel</button>
          <button type="submit" className="btn btn--primary">Post notice</button>
        </div>
      </form>
    </Modal>
  );
}
