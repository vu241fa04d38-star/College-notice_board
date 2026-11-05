# College Notice Priority Board

React + Vite notice board with category, priority, date, deadline and read/unread status, plus filters for important notices.

## Run it
```bash
npm install
npm run dev      # open the URL shown (usually http://localhost:5173)
npm run build    # production build in /dist
```

## Features
- Cards with category, priority, date, deadline and read/unread status
- Filters: category, priority, status, "Important only", search, sort
- Add notice form with validation (title, description, details, category, priority, deadline, pin)
- Notice details dialog; opening a notice marks it as read
- Deadline tags: due in N days, due today, overdue (red)
- Pin to top and delete (with confirmation); pinned notices always sort first
- Light and dark theme; responsive from phones to desktops
- Everything is saved in the browser (`localStorage`); "Reset sample data" restores the demo notices

## Structure
```
src/
  App.jsx                 state: notices, filters, theme, open dialogs
  utils.js                filter, sort, deadline and storage helpers
  data/notices.js         sample notices, categories, priorities
  components/
    StatsBar.jsx          total / unread / urgent counts
    FilterBar.jsx         search, sort, important toggle, chip rows
    FilterChip.jsx        reusable toggle button
    NoticeList.jsx        renders cards or the empty state
    NoticeCard.jsx        one notice: read toggle, pin, delete, deadline
    NoticeModal.jsx       full details dialog for one notice
    AddNoticeForm.jsx     controlled form to post a new notice
    Modal.jsx             reusable dialog shell (Esc, overlay click, focus)
    DeadlineTag.jsx       "Due in 3 days" / "Overdue" tag
    Badge.jsx             reusable category / priority pill
    EmptyState.jsx        shown when no notice matches
```

## React concepts covered
- State: `useState` for notices, filters, theme and dialogs; `useMemo` for the filtered list
- Props: `NoticeCard`, `Badge`, `FilterChip`, `Modal`, `FilterBar`
- Filtering: combined category, priority, status, important-only and search filters
- Conditional rendering: unread dot, pinned flag, deadline tag, dialogs, empty state
- Reusable components: `Badge`, `FilterChip`, `Modal`, `NoticeCard`
- Controlled form inputs and lifting state up (`AddNoticeForm` to `App`)
