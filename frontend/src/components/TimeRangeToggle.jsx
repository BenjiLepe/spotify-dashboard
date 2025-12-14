export default function TimeRangeToggle({ value, onChange }) {
const options = [
{ label: "4 Weeks", value: "short_term" },
{ label: "6 Months", value: "medium_term" },
{ label: "All Time", value: "long_term" },
];

return (
<div className="time-tabs">
{options.map(opt => (
<div
    key={opt.value}
    className={`tab ${value === opt.value ? "active" : ""}`}
    onClick={() => onChange(opt.value)}
>
    {opt.label}
</div>
))}
</div>
);
}