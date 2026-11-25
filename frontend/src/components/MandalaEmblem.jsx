export default function MandalaEmblem() {
  const petals = Array.from({ length: 12 }, (_, i) => i * 30);

  return (
    <svg
      className="mandala-orbit"
      viewBox="0 0 320 320"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="160" cy="160" r="150" stroke="currentColor" strokeWidth="0.9" strokeDasharray="4 6" />
      <circle cx="160" cy="160" r="122" stroke="currentColor" strokeWidth="1" />
      <circle cx="160" cy="160" r="88" stroke="currentColor" strokeWidth="0.8" strokeDasharray="2 4" />
      <circle cx="160" cy="160" r="52" stroke="currentColor" strokeWidth="1" />
      {petals.map((angle) => (
        <g key={angle} transform={`rotate(${angle} 160 160)`}>
          <path
            d="M160 18 C176 48, 176 76, 160 106 C144 76, 144 48, 160 18 Z"
            stroke="currentColor"
            strokeWidth="0.85"
          />
          <circle cx="160" cy="36" r="2.2" fill="currentColor" />
        </g>
      ))}
    </svg>
  );
}
