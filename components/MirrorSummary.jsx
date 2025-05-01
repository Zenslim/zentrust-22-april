
// MirrorSummary.jsx — Display AI poetic response

export default function MirrorSummary({ summary }) {
  return (
    <div className="max-w-xl text-center text-lg sm:text-xl text-purple-300 italic px-4 py-2 animate-fade-in">
      {summary}
    </div>
  );
}
