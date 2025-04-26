import TextareaAutosize from 'react-textarea-autosize';
import { format } from 'date-fns';

export default function ReflectionEntry({
  entry,
  editingId,
  editNote,
  setEditNote,
  setEditingId,
  handleEditSave,
  handleDelete
}) {
  if (!entry || typeof entry !== 'object') {
    return (
      <div className="bg-zinc-800 p-3 rounded-lg shadow text-red-400">
        ⚠️ Invalid reflection entry.
      </div>
    );
  }

  const note = typeof entry.note === 'string' ? entry.note : '🫧 Empty reflection';

  let formattedDate = '⏳ Timeless';
  try {
    if (entry.timestamp) {
      let dateObj;
      if (typeof entry.timestamp.toDate === 'function') {
        dateObj = entry.timestamp.toDate();
      } else if (entry.timestamp.seconds) {
        dateObj = new Date(entry.timestamp.seconds * 1000);
      }
      if (dateObj) {
        formattedDate = format(dateObj, 'MMM d, yyyy • h:mm a');
      }
    }
  } catch (error) {
    console.error('Invalid timestamp:', error);
  }

  return (
    <div className="bg-zinc-800 p-3 rounded-lg shadow space-y-2">
      <div className="text-sm text-gray-400">🗓 {formattedDate}</div>

      {editingId === entry.id ? (
        <>
          <TextareaAutosize
            minRows={2}
            className="w-full p-2 rounded bg-white text-black resize-none"
            value={editNote}
            onChange={(e) => setEditNote(e.target.value)}
          />
          <div className="flex gap-2 mt-2">
            <button
              onClick={() => handleEditSave(entry.id)}
              className="bg-green-600 px-2 py-1 rounded text-white"
            >
              Save
            </button>
            <button
              onClick={() => setEditingId(null)}
              className="bg-gray-600 px-2 py-1 rounded text-white"
            >
              Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="whitespace-pre-line text-blue-100 text-base">{note}</div>
          <div className="flex gap-2 mt-2 text-sm">
            <button
              onClick={() => {
                setEditingId(entry.id);
                setEditNote(note);
              }}
              className="text-blue-400"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(entry.id)}
              className="text-red-400"
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
}
