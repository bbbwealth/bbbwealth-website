import { useState, useRef } from "react";

const Icon = ({ d, size = 16, strokeWidth = 2, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d={d} />
  </svg>
);

const Icons = {
  Clock: (p) => <Icon {...p} d="M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2zM12 6v6l4 2" />,
  Target: (p) => <svg width={p.size||16} height={p.size||16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={p.strokeWidth||2} strokeLinecap="round" strokeLinejoin="round" className={p.className}><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>,
  Wallet: (p) => <Icon {...p} d="M21 12V7H5a2 2 0 0 1 0-4h14v4M21 12a2 2 0 0 1 0 4H5a2 2 0 0 1 0-4h16v4" />,
  TrendingUp: (p) => <Icon {...p} d="M23 6l-9.5 9.5-5-5L1 18M17 6h6v6" />,
  PiggyBank: (p) => <Icon {...p} d="M19 5c-1.5 0-2.8 1.4-3 2-3.5-1.3-5.9-1.5-8 0-2.8-1-5 0-5 3 0 2 1 4 3 4.5V15a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-2.5c1-.5 2-1.5 2-3.5 0-2-1-3-2-4z" />,
  BarChart3: (p) => <svg width={p.size||16} height={p.size||16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={p.strokeWidth||2} strokeLinecap="round" strokeLinejoin="round" className={p.className}><path d="M3 3v18h18"/><path d="M18 17V9M13 17V5M8 17v-3"/></svg>,
  Calculator: (p) => <Icon {...p} d="M4 2h16a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zM8 10h8M8 14h4M8 6h8" />,
  Briefcase: (p) => <Icon {...p} d="M20 7H4a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zM16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />,
  Info: (p) => <svg width={p.size||16} height={p.size||16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={p.strokeWidth||2} strokeLinecap="round" strokeLinejoin="round" className={p.className}><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>,
  Phone: (p) => <Icon {...p} d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.15 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.1 2.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7a2 2 0 0 1 1.72 2.03z" />,
  Globe: (p) => <svg width={p.size||16} height={p.size||16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={p.strokeWidth||2} strokeLinecap="round" strokeLinejoin="round" className={p.className}><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
  MessageCircle: (p) => <Icon {...p} d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />,
  User: (p) => <svg width={p.size||16} height={p.size||16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={p.strokeWidth||2} strokeLinecap="round" strokeLinejoin="round" className={p.className}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  Sparkles: (p) => <Icon {...p} d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5zM19 1l.75 2.25L22 4l-2.25.75L19 7l-.75-2.25L16 4l2.25-.75zM4 17l.75 2.25L7 20l-2.25.75L4 23l-.75-2.25L1 20l2.25-.75z" />,
  ArrowDown: (p) => <Icon {...p} d="M12 5v14M5 12l7 7 7-7" />,
  ArrowRight: (p) => <Icon {...p} d="M5 12h14M12 5l7 7-7 7" />,
  RotateCcw: (p) => <Icon {...p} d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8M3 3v5h5" />,
  AlertTriangle: (p) => <Icon {...p} d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0zM12 9v4M12 17h.01" />,
  CheckCircle2: (p) => <svg width={p.size||16} height={p.size||16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={p.strokeWidth||2} strokeLinecap="round" strokeLinejoin="round" className={p.className}><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>,
  CircleDollarSign: (p) => <svg width={p.size||16} height={p.size||16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={p.strokeWidth||2} strokeLinecap="round" strokeLinejoin="round" className={p.className}><circle cx="12" cy="12" r="10"/><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8M12 6v2m0 8v2"/></svg>,
  Percent: (p) => <svg width={p.size||16} height={p.size||16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={p.strokeWidth||2} strokeLinecap="round" strokeLinejoin="round" className={p.className}><line x1="19" y1="5" x2="5" y2="19"/><circle cx="6.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/></svg>,
};

const fmt = (n) => {
  if (n === undefined || n === null || isNaN(n)) return "0";
  if (Math.abs(n) >= 1e6) return (n / 1e6).toFixed(2) + "M";
  if (Math.abs(n) >= 1e3) return (n / 1e3).toFixed(0) + "K";
  return n.toFixed(0);
};
const fmtRM = (n) => "RM " + (n || 0).toLocaleString("en-MY", { minimumFractionDigits: 0, maximumFractionDigits: 0 });
const fmtFull = (n) => (n || 0).toLocaleString("en-MY", { minimumFractionDigits: 0, maximumFractionDigits: 0 });

function calculate(inputs) {
  const {
    currentAge, retirementAge, monthlySalary, salaryGrowth, currentEpf,
    currentSavings, desiredMonthlyIncome, inflationRate, epfReturnRate,
    investmentReturnRate, withdrawalRate, employmentType,
    employeeEpfRate, employerEpfRate, epfContributionRate
  } = inputs;

  const yearsToRetirement = retirementAge - currentAge;
  if (yearsToRetirement <= 0) return null;

  const inflationMultiplier = Math.pow(1 + inflationRate / 100, yearsToRetirement);
  const futureMonthlyNeed = desiredMonthlyIncome * inflationMultiplier;
  const purchasingPowerLoss = (1 - 1 / inflationMultiplier) * 100;

  const annualNeedAtRetirement = futureMonthlyNeed * 12;
  const totalCorpusNeeded = annualNeedAtRetirement / (withdrawalRate / 100);

  const effectiveEpfRate = employmentType === "employed"
    ? employeeEpfRate + employerEpfRate
    : epfContributionRate;

  const r = epfReturnRate / 100;
  const g = salaryGrowth / 100;
  const n = yearsToRetirement;

  const epfBalanceFV = currentEpf * Math.pow(1 + r, n);
  const annualContribution = monthlySalary * 12 * (effectiveEpfRate / 100);

  let epfContributionsFV;
  if (Math.abs(r - g) < 0.0001) {
    epfContributionsFV = annualContribution * n * Math.pow(1 + r, n - 1);
  } else {
    epfContributionsFV = annualContribution * (Math.pow(1 + r, n) - Math.pow(1 + g, n)) / (r - g);
  }

  const totalEpfAtRetirement = epfBalanceFV + epfContributionsFV;
  const otherSavingsFV = currentSavings * Math.pow(1 + investmentReturnRate / 100, n);
  const totalProjectedAssets = totalEpfAtRetirement + otherSavingsFV;

  const gap = Math.max(0, totalCorpusNeeded - totalProjectedAssets);
  const gapPercentage = (gap / totalCorpusNeeded) * 100;
  const fundedPercentage = Math.min(100, (totalProjectedAssets / totalCorpusNeeded) * 100);

  const monthlyReturnRate = investmentReturnRate / 100 / 12;
  const months = yearsToRetirement * 12;
  const monthlyInvestmentNeeded = gap > 0
    ? gap * monthlyReturnRate / (Math.pow(1 + monthlyReturnRate, months) - 1)
    : 0;

  const timelineData = [];
  for (let age = currentAge; age <= retirementAge; age += Math.max(1, Math.floor(n / 10))) {
    const yr = age - currentAge;
    const epfBal = currentEpf * Math.pow(1 + r, yr);
    let epfContr;
    if (yr === 0) {
      epfContr = 0;
    } else if (Math.abs(r - g) < 0.0001) {
      epfContr = annualContribution * yr * Math.pow(1 + r, yr - 1);
    } else {
      epfContr = annualContribution * (Math.pow(1 + r, yr) - Math.pow(1 + g, yr)) / (r - g);
    }
    const epfTotal = epfBal + epfContr;
    const other = currentSavings * Math.pow(1 + investmentReturnRate / 100, yr);
    const total = epfTotal + other;
    timelineData.push({ age, epfTotal, other, total, target: totalCorpusNeeded });
  }
  if (timelineData[timelineData.length - 1]?.age !== retirementAge) {
    timelineData.push({ age: retirementAge, epfTotal: totalEpfAtRetirement, other: otherSavingsFV, total: totalProjectedAssets, target: totalCorpusNeeded });
  }

  return {
    yearsToRetirement, inflationMultiplier, futureMonthlyNeed, purchasingPowerLoss,
    annualNeedAtRetirement, totalCorpusNeeded, epfBalanceFV, epfContributionsFV,
    totalEpfAtRetirement, otherSavingsFV, totalProjectedAssets, gap, gapPercentage,
    fundedPercentage, monthlyInvestmentNeeded, timelineData,
  };
}

function SmartInput({ label, value, onChange, min, max, step = 1, prefix, suffix, icon: IconComp, disabled, hint, inputRef }) {
  const [editing, setEditing] = useState(false);
  const [raw, setRaw] = useState("");

  const handleFocus = () => {
    setEditing(true);
    setRaw(String(value));
    setTimeout(() => inputRef?.current?.select?.(), 0);
  };

  const commit = (val) => {
    const num = parseFloat(val);
    if (isNaN(num)) { setEditing(false); return; }
    const clamped = Math.min(max, Math.max(min, num));
    const rounded = Math.round(clamped / step) * step;
    onChange(parseFloat(rounded.toFixed(10)));
    setEditing(false);
  };

  const displayVal = disabled ? `${value}% — Fixed` : editing ? raw : prefix ? fmtFull(value) : `${value}`;

  return (
    <div className="flex flex-col gap-1.5">
      <label style={{ fontSize: 11, fontWeight: 700, color: "#334e68", textTransform: "uppercase", letterSpacing: "0.08em" }}>
        {IconComp && <IconComp size={12} className="inline mr-1" />}{label}
      </label>
      <div style={{ position: "relative" }}>
        {prefix && (
          <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", fontSize: 13, fontWeight: 700, color: "#627d98" }}>
            {prefix}
          </span>
        )}
        <input
          ref={inputRef}
          value={displayVal}
          onFocus={handleFocus}
          onChange={e => editing && setRaw(e.target.value)}
          onBlur={e => editing && commit(e.target.value)}
          onKeyDown={e => { if (e.key === "Enter") commit(raw); }}
          disabled={disabled}
          style={{
            width: "100%", height: 44,
            paddingLeft: prefix ? 36 : 12, paddingRight: suffix ? 36 : 12,
            border: `2px solid ${disabled ? "#d9e2ec" : "#bcccdc"}`,
            borderRadius: 10, fontSize: 14, fontWeight: 700,
            color: disabled ? "#829ab1" : "#0a192f",
            background: disabled ? "#f0f4f8" : "#fff",
            outline: "none", boxSizing: "border-box", transition: "border-color 0.15s",
          }}
          onMouseEnter={e => { if (!disabled) e.target.style.borderColor = "#c9a84c"; }}
          onMouseLeave={e => { if (!disabled) e.target.style.borderColor = "#bcccdc"; }}
        />
        {suffix && (
          <span style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", fontSize: 13, fontWeight: 700, color: "#627d98" }}>
            {suffix}
          </span>
        )}
      </div>
      {!disabled && (
        <input
          type="range" min={min} max={max} step={step} value={value}
          onChange={e => onChange(parseFloat(e.target.value))}
          style={{ width: "100%", accentColor: "#c9a84c", height: 4, cursor: "pointer" }}
        />
      )}
      {hint && <p style={{ fontSize: 10, color: "#829ab1", margin: 0 }}>{hint}</p>}
    </div>
  );
}

function TimelineChart({ data }) {
  const [hoverIdx, setHoverIdx] = useState(null);
  if (!data || data.length < 2) return null;

  const W = 560, H = 260, PL = 60, PR = 20, PT = 20, PB = 40;
  const iW = W - PL - PR, iH = H - PT - PB;
  const maxVal = Math.max(...data.map(d => Math.max(d.total, d.target))) * 1.05;
  const xScale = (i) => PL + (i / (data.length - 1)) * iW;
  const yScale = (v) => PT + iH - (v / maxVal) * iH;
  const pathD = (accessor) => data.map((d, i) => {
    const x = xScale(i), y = yScale(accessor(d));
    return i === 0 ? `M${x},${y}` : `L${x},${y}`;
  }).join(" ");
  const areaD = pathD(d => d.total) + ` L${xScale(data.length - 1)},${PT + iH} L${xScale(0)},${PT + iH} Z`;
  const yTicks = 5;
  const hoverData = hoverIdx !== null ? data[hoverIdx] : null;

  return (
    <div style={{ position: "relative", overflowX: "auto" }}>
      <svg width="100%" viewBox={`0 0 ${W} ${H}`} style={{ display: "block", minWidth: 320 }}
        onMouseLeave={() => setHoverIdx(null)}
        onMouseMove={e => {
          const rect = e.currentTarget.getBoundingClientRect();
          const relX = (e.clientX - rect.left) / rect.width * W;
          let best = 0, bestDist = Infinity;
          data.forEach((d, i) => { const dist = Math.abs(xScale(i) - relX); if (dist < bestDist) { bestDist = dist; best = i; } });
          setHoverIdx(best);
        }}>
        {Array.from({ length: yTicks + 1 }, (_, i) => {
          const v = (maxVal / yTicks) * i;
          const y = yScale(v);
          return (
            <g key={i}>
              <line x1={PL} x2={PL + iW} y1={y} y2={y} stroke="#d9e2ec" strokeWidth={0.5} strokeDasharray="3,3" />
              <text x={PL - 6} y={y + 4} textAnchor="end" fontSize={9} fill="#829ab1">{fmt(v)}</text>
            </g>
          );
        })}
        <path d={areaD} fill="rgba(10,25,47,0.06)" />
        <path d={pathD(d => d.target)} fill="none" stroke="#c9a84c" strokeWidth={1.5} strokeDasharray="6,3" />
        <path d={pathD(d => d.epfTotal)} fill="none" stroke="#9fb3c8" strokeWidth={1.5} strokeDasharray="3,3" />
        <path d={pathD(d => d.total)} fill="none" stroke="#0a192f" strokeWidth={2.5} />
        {hoverIdx !== null && (
          <>
            <line x1={xScale(hoverIdx)} x2={xScale(hoverIdx)} y1={PT} y2={PT + iH} stroke="#c9a84c" strokeWidth={1} strokeDasharray="3,3" />
            <circle cx={xScale(hoverIdx)} cy={yScale(data[hoverIdx].total)} r={4} fill="#0a192f" stroke="#fff" strokeWidth={2} />
            <circle cx={xScale(hoverIdx)} cy={yScale(data[hoverIdx].target)} r={4} fill="#c9a84c" stroke="#fff" strokeWidth={2} />
            <circle cx={xScale(hoverIdx)} cy={yScale(data[hoverIdx].epfTotal)} r={3} fill="#9fb3c8" stroke="#fff" strokeWidth={1.5} />
          </>
        )}
        {data.map((d, i) => (
          <text key={i} x={xScale(i)} y={H - 6} textAnchor="middle" fontSize={10} fill="#627d98">{d.age}</text>
        ))}
        <text x={PL + iW / 2} y={H} textAnchor="middle" fontSize={10} fill="#486581">Age</text>
        <text x={10} y={PT + iH / 2} textAnchor="middle" fontSize={10} fill="#486581" transform={`rotate(-90, 10, ${PT + iH / 2})`}>Wealth (RM)</text>
      </svg>
      {hoverData && (
        <div style={{
          position: "absolute", top: 20, right: 20,
          background: "#0a192f", color: "#fff", borderRadius: 10, padding: "10px 14px",
          fontSize: 11, lineHeight: 1.7, pointerEvents: "none", minWidth: 160,
          boxShadow: "0 4px 20px rgba(0,0,0,0.3)"
        }}>
          <div style={{ fontWeight: 700, color: "#c9a84c", marginBottom: 4 }}>Age {hoverData.age}</div>
          <div>Target: <b style={{ color: "#c9a84c" }}>{fmtRM(hoverData.target)}</b></div>
          <div>Assets: <b style={{ color: "#fff" }}>{fmtRM(hoverData.total)}</b></div>
          <div>EPF: <b style={{ color: "#9fb3c8" }}>{fmtRM(hoverData.epfTotal)}</b></div>
          <div>Other: <b style={{ color: "#627d98" }}>{fmtRM(hoverData.other)}</b></div>
        </div>
      )}
      <div style={{ display: "flex", gap: 20, justifyContent: "center", marginTop: 12, flexWrap: "wrap" }}>
        {[
          { color: "#0a192f", label: "Total Projected", dash: false },
          { color: "#c9a84c", label: "Target Corpus", dash: true },
          { color: "#9fb3c8", label: "EPF Only", dash: true },
        ].map(({ color, label, dash }) => (
          <div key={label} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, color: "#486581" }}>
            <svg width={24} height={10}><line x1={0} y1={5} x2={24} y2={5} stroke={color} strokeWidth={2} strokeDasharray={dash ? "4,2" : "none"} /></svg>
            {label}
          </div>
        ))}
      </div>
    </div>
  );
}

function GapChart({ result }) {
  const { totalEpfAtRetirement, otherSavingsFV, gap, totalCorpusNeeded } = result;
  const epfPct = Math.round((totalEpfAtRetirement / totalCorpusNeeded) * 100);
  const othPct = Math.round((otherSavingsFV / totalCorpusNeeded) * 100);
  const gapPct = Math.max(0, 100 - epfPct - othPct);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div>
        <div style={{ display: "flex", height: 36, borderRadius: 8, overflow: "hidden", gap: 2 }}>
          <div style={{ width: `${epfPct}%`, background: "#334e68", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: 10, color: "#fff", fontWeight: 700, whiteSpace: "nowrap" }}>{epfPct}% EPF</span>
          </div>
          <div style={{ width: `${othPct}%`, background: "#627d98", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: 10, color: "#fff", fontWeight: 700, whiteSpace: "nowrap" }}>{othPct}% Other</span>
          </div>
          {gapPct > 0 && (
            <div style={{ flex: 1, background: "#ef4444", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: 10, color: "#fff", fontWeight: 700, whiteSpace: "nowrap" }}>{gapPct}% GAP</span>
            </div>
          )}
        </div>
        <div style={{ display: "flex", gap: 16, marginTop: 8, flexWrap: "wrap" }}>
          {[
            { color: "#334e68", label: "EPF Projected" },
            { color: "#627d98", label: "Other Assets" },
            { color: "#ef4444", label: "Gap" },
          ].map(({ color, label }) => (
            <div key={label} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, color: "#486581" }}>
              <div style={{ width: 10, height: 10, borderRadius: 2, background: color }} />
              {label}
            </div>
          ))}
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10 }}>
        {[
          { label: "Target Corpus", value: fmtRM(totalCorpusNeeded), color: "#c9a84c" },
          { label: "EPF Projected", value: fmtRM(totalEpfAtRetirement), color: "#334e68" },
          { label: "Other Assets", value: fmtRM(otherSavingsFV), color: "#627d98" },
          { label: "Gap", value: fmtRM(gap), color: "#ef4444" },
        ].map(({ label, value, color }) => (
          <div key={label} style={{ background: "#f0f4f8", borderRadius: 10, padding: "10px 12px", borderTop: `3px solid ${color}` }}>
            <div style={{ fontSize: 10, color: "#627d98", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>{label}</div>
            <div style={{ fontSize: 13, fontWeight: 800, color: "#0a192f", marginTop: 2 }}>{value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SectionHeader({ icon: IconComp, title, subtitle }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
      <div style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg, #c9a84c, #d4b86a)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <IconComp size={16} style={{ color: "#fff" }} className="" />
      </div>
      <div>
        <div style={{ fontWeight: 800, color: "#0a192f", fontSize: 15 }}>{title}</div>
        <div style={{ fontSize: 11, color: "#829ab1" }}>{subtitle}</div>
      </div>
    </div>
  );
}

function Card({ children, style }) {
  return (
    <div style={{ background: "#fff", borderRadius: 16, padding: 24, boxShadow: "0 8px 30px rgba(10,25,47,0.1)", border: "1px solid #eef2f7", ...style }}>
      {children}
    </div>
  );
}

const DEFAULTS = {
  currentAge: 30, retirementAge: 55, monthlySalary: 7000, salaryGrowth: 5,
  currentEpf: 100000, currentSavings: 150000, desiredMonthlyIncome: 6000,
  inflationRate: 4, epfReturnRate: 5.3, epfContributionRate: 23,
  investmentReturnRate: 8, withdrawalRate: 4, employmentType: "employed",
  employeeEpfRate: 11, employerEpfRate: 12,
};

export default function RetirementCalculator() {
  const [inputs, setInputs] = useState(DEFAULTS);
  const [result, setResult] = useState(null);
  const [showResults, setShowResults] = useState(false);

  const retirementAgeRef = useRef(null);
  const salaryGrowthRef = useRef(null);
  const resultsRef = useRef(null);

  const set = (key) => (val) => {
    setInputs(prev => {
      const next = { ...prev, [key]: val };
      if (key === "monthlySalary" && prev.employmentType === "employed") {
        next.employerEpfRate = val < 5000 ? 13 : 12;
      }
      return next;
    });
  };

  const handleCalculate = () => {
    const r = calculate(inputs);
    setResult(r);
    setShowResults(true);
    setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
  };

  const handleReset = () => {
    setInputs(DEFAULTS);
    setResult(null);
    setShowResults(false);
  };

  const totalEpfRate = inputs.employmentType === "employed"
    ? inputs.employeeEpfRate + inputs.employerEpfRate
    : inputs.epfContributionRate;

  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif", background: "#f8fafc", minHeight: "100vh" }}>
      <style>{`
        @keyframes calcFadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes calcBounce { 0%,100% { transform: translateY(0); } 50% { transform: translateY(6px); } }
        .calc-fade-in { animation: calcFadeIn 0.5s ease forwards; }
        .calc-bounce-arrow { animation: calcBounce 1.5s infinite; }
        .calc input[type=range] { -webkit-appearance: none; appearance: none; background: #d9e2ec; border-radius: 4px; height: 4px; }
        .calc input[type=range]::-webkit-slider-thumb { -webkit-appearance: none; width: 16px; height: 16px; border-radius: 50%; background: #c9a84c; cursor: pointer; border: 2px solid #fff; box-shadow: 0 2px 6px rgba(0,0,0,0.2); }
        .calc select { -webkit-appearance: none; appearance: none; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24'%3E%3Cpath d='M6 9l6 6 6-6' fill='none' stroke='%23627d98' stroke-width='2'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 12px center; }
      `}</style>

      <div className="calc" style={{ maxWidth: 900, margin: "0 auto", padding: "32px 16px 60px" }}>
        <div style={{ textAlign: "center", padding: "0 0 32px" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#fdf9ed", border: "1px solid #f3e0a3", borderRadius: 20, padding: "6px 16px", marginBottom: 16 }}>
            <span style={{ fontSize: 11, fontWeight: 800, color: "#8f7030", textTransform: "uppercase", letterSpacing: "0.1em" }}>Plan Smarter, Retire Better</span>
          </div>
          <h1 style={{ fontSize: "clamp(26px, 5vw, 44px)", fontWeight: 900, color: "#0a192f", lineHeight: 1.15, margin: "0 0 12px" }}>
            How Much Do You Need<br />to Retire?
          </h1>
          <p style={{ fontSize: 15, color: "#486581", maxWidth: 500, margin: "0 auto", lineHeight: 1.7 }}>
            Break free from the{" "}
            <strong style={{ color: "#c9a84c" }}>"Retirement Illusion"</strong>
            {" "}- stop guessing (<em>Agak-Agak</em>) and start planning with real numbers.
          </p>
        </div>

        <div style={{ borderRadius: 20, overflow: "hidden", boxShadow: "0 16px 48px rgba(10,25,47,0.14)", border: "1px solid #d9e2ec" }}>
          <div style={{ background: "linear-gradient(135deg, #0a192f, #112240, #0a192f)", padding: "20px 28px", display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: "rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Icons.Wallet size={16} style={{ color: "#c9a84c" }} />
            </div>
            <div style={{ fontWeight: 800, color: "#fff", fontSize: 16 }}>Your Financial Profile</div>
          </div>

          <div style={{ background: "#fff", padding: "28px 28px" }}>
            <SectionHeader icon={Icons.User} title="Personal Information" subtitle="Tell us about yourself" />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "20px 24px", marginBottom: 32 }}>
              <SmartInput label="Current Age" value={inputs.currentAge} onChange={set("currentAge")} min={18} max={70} step={1} suffix="yrs" icon={Icons.Clock} />
              <SmartInput label="Retirement Age" value={inputs.retirementAge} onChange={set("retirementAge")} min={45} max={80} step={1} suffix="yrs" icon={Icons.Target} inputRef={retirementAgeRef} />
              <SmartInput label="Monthly Salary RM" value={inputs.monthlySalary} onChange={set("monthlySalary")} min={1000} max={50000} step={100} prefix="RM" icon={Icons.Wallet} />
              <SmartInput label="Salary Growth / Year %" value={inputs.salaryGrowth} onChange={set("salaryGrowth")} min={0} max={20} step={0.5} suffix="%" icon={Icons.TrendingUp} inputRef={salaryGrowthRef} />
              <SmartInput label="Current EPF Balance RM" value={inputs.currentEpf} onChange={set("currentEpf")} min={0} max={2000000} step={1000} prefix="RM" icon={Icons.PiggyBank} />
              <SmartInput label="Other Savings / Investments RM" value={inputs.currentSavings} onChange={set("currentSavings")} min={0} max={2000000} step={1000} prefix="RM" icon={Icons.BarChart3} />
            </div>

            <hr style={{ border: "none", borderTop: "1px solid #eef2f7", marginBottom: 28 }} />

            <SectionHeader icon={Icons.Briefcase} title="Employment & EPF Setup" subtitle="Configure your EPF contribution structure" />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "20px 24px", marginBottom: 20 }}>
              <div>
                <label style={{ fontSize: 11, fontWeight: 700, color: "#334e68", textTransform: "uppercase", letterSpacing: "0.08em", display: "block", marginBottom: 6 }}>
                  <Icons.Briefcase size={12} className="inline mr-1" /> Employment Type
                </label>
                <select
                  value={inputs.employmentType}
                  onChange={e => {
                    const t = e.target.value;
                    setInputs(prev => ({
                      ...prev,
                      employmentType: t,
                      employerEpfRate: t === "employed" ? (prev.monthlySalary < 5000 ? 13 : 12) : prev.employerEpfRate
                    }));
                  }}
                  style={{
                    width: "100%", height: 44, padding: "0 36px 0 12px", border: "2px solid #bcccdc",
                    borderRadius: 10, fontSize: 13, fontWeight: 700, color: "#0a192f", background: "#fff", cursor: "pointer"
                  }}>
                  <option value="employed">Employed (Employee + Employer)</option>
                  <option value="freelancer">Freelancer / Self-Employed</option>
                </select>
              </div>

              {inputs.employmentType === "employed" ? (
                <>
                  <SmartInput label="Employee EPF Rate" value={inputs.employeeEpfRate} onChange={() => {}} min={11} max={11} step={1} suffix="%" icon={Icons.Percent} disabled />
                  <SmartInput
                    label="Employer EPF Rate"
                    value={inputs.employerEpfRate}
                    onChange={set("employerEpfRate")}
                    min={12} max={13} step={1} suffix="%" icon={Icons.Briefcase}
                    hint={inputs.monthlySalary < 5000 ? "13% applies (salary < RM 5,000)" : "12% applies (salary ≥ RM 5,000). Adjust if needed."}
                  />
                </>
              ) : (
                <SmartInput label="Voluntary EPF Contribution %" value={inputs.epfContributionRate} onChange={set("epfContributionRate")} min={0} max={100} step={1} suffix="%" icon={Icons.Percent} />
              )}
            </div>

            <div style={{ background: "linear-gradient(135deg, #0a192f, #1a365d)", borderRadius: 12, padding: "14px 20px", display: "flex", alignItems: "center", gap: 12, marginBottom: 32, flexWrap: "wrap" }}>
              <Icons.PiggyBank size={16} style={{ color: "#c9a84c" }} />
              <span style={{ fontSize: 13, color: "#9fb3c8" }}>Total EPF Contribution Rate:</span>
              {inputs.employmentType === "employed" ? (
                <span style={{ fontWeight: 800, color: "#fff", fontSize: 15 }}>
                  <span style={{ color: "#c9a84c" }}>{inputs.employeeEpfRate}%</span>
                  <span style={{ color: "#627d98" }}> + </span>
                  <span style={{ color: "#c9a84c" }}>{inputs.employerEpfRate}%</span>
                  <span style={{ color: "#627d98" }}> = </span>
                  <span style={{ color: "#c9a84c" }}>{totalEpfRate}%</span>
                </span>
              ) : (
                <span style={{ fontWeight: 800, color: "#c9a84c", fontSize: 15 }}>{inputs.epfContributionRate}% (Voluntary)</span>
              )}
            </div>

            <hr style={{ border: "none", borderTop: "1px solid #eef2f7", marginBottom: 28 }} />

            <SectionHeader icon={Icons.Percent} title="Assumptions & Goals" subtitle="Fine-tune your retirement projections" />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "20px 24px", marginBottom: 32 }}>
              <SmartInput label="Desired Monthly Retirement Income RM" value={inputs.desiredMonthlyIncome} onChange={set("desiredMonthlyIncome")} min={1000} max={50000} step={500} prefix="RM" icon={Icons.Target} />
              <SmartInput label="Inflation Rate %" value={inputs.inflationRate} onChange={set("inflationRate")} min={0} max={10} step={0.1} suffix="%" icon={Icons.TrendingUp} />
              <SmartInput label="EPF Annual Return %" value={inputs.epfReturnRate} onChange={set("epfReturnRate")} min={0} max={10} step={0.1} suffix="%" icon={Icons.PiggyBank} />
              <SmartInput label="Investment Return Rate %" value={inputs.investmentReturnRate} onChange={set("investmentReturnRate")} min={0} max={15} step={0.5} suffix="%" icon={Icons.BarChart3} />
              <SmartInput label="Withdrawal Rate (4% Rule) %" value={inputs.withdrawalRate} onChange={set("withdrawalRate")} min={2} max={6} step={0.5} suffix="%" icon={Icons.Calculator} />
            </div>

            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <button
                onClick={handleCalculate}
                style={{
                  flex: "1 1 220px", height: 52, borderRadius: 12, border: "none", cursor: "pointer",
                  background: "linear-gradient(135deg, #c9a84c, #d4b86a)", color: "#fff", fontWeight: 800,
                  fontSize: 15, display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                  boxShadow: "0 4px 20px rgba(201,168,76,0.35)", transition: "transform 0.1s, box-shadow 0.1s"
                }}>
                <Icons.Calculator size={18} /> Calculate My Retirement Gap
              </button>
              <button
                onClick={handleReset}
                style={{
                  height: 52, padding: "0 24px", borderRadius: 12, border: "2px solid #bcccdc", cursor: "pointer",
                  background: "#fff", color: "#486581", fontWeight: 700, fontSize: 14,
                  display: "flex", alignItems: "center", gap: 8, transition: "border-color 0.15s"
                }}>
                <Icons.RotateCcw size={16} /> Reset
              </button>
            </div>
          </div>
        </div>

        {showResults && result && (
          <div ref={resultsRef} className="calc-fade-in" style={{ marginTop: 40, display: "flex", flexDirection: "column", gap: 24 }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#fdf9ed", border: "1px solid #f3e0a3", borderRadius: 20, padding: "8px 20px" }}>
                <span className="calc-bounce-arrow" style={{ display: "inline-block" }}><Icons.ArrowDown size={14} style={{ color: "#c9a84c" }} /></span>
                <span style={{ fontSize: 12, color: "#8f7030", fontWeight: 700 }}>Scroll to see your full retirement analysis</span>
              </div>
            </div>

            <div style={{ background: "linear-gradient(135deg, #0a192f, #112240, #0a192f)", borderRadius: 20, padding: "28px 28px", boxShadow: "0 16px 48px rgba(10,25,47,0.25)" }}>
              <div style={{ textAlign: "center", marginBottom: 20 }}>
                <div style={{ fontSize: 11, color: "#c9a84c", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.15em" }}>Your Retirement Snapshot</div>
                <div style={{ fontSize: 13, color: "#627d98", marginTop: 4 }}>
                  Age {inputs.currentAge} → {inputs.retirementAge} · {result.yearsToRetirement} years to prepare
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
                {[
                  { label: "Retirement Magic Number", value: fmtRM(result.totalCorpusNeeded), sub: "Total Corpus Needed", color: "#c9a84c" },
                  { label: "Projected Assets", value: fmtRM(result.totalProjectedAssets), sub: "EPF + Other Savings", color: "#fff" },
                  { label: "Retirement Gap", value: fmtRM(result.gap), sub: result.gap > 0 ? "Shortfall to close" : "Fully funded!", color: result.gap > 0 ? "#f87171" : "#4ade80" },
                ].map(({ label, value, sub, color }) => (
                  <div key={label} style={{ background: "rgba(255,255,255,0.06)", borderRadius: 14, padding: "18px 14px", textAlign: "center", border: "1px solid rgba(255,255,255,0.08)" }}>
                    <div style={{ fontSize: 10, color: "#829ab1", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>{label}</div>
                    <div style={{ fontSize: "clamp(16px, 3vw, 26px)", fontWeight: 900, color }}>{value}</div>
                    <div style={{ fontSize: 10, color: "#627d98", marginTop: 4 }}>{sub}</div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 20 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "#829ab1", marginBottom: 6 }}>
                  <span>Funded: {result.fundedPercentage.toFixed(1)}%</span>
                  <span>Target: 100%</span>
                </div>
                <div style={{ height: 10, background: "rgba(255,255,255,0.1)", borderRadius: 10, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${Math.min(100, result.fundedPercentage)}%`, background: "linear-gradient(90deg, #c9a84c, #d4b86a)", borderRadius: 10, transition: "width 0.8s ease" }} />
                </div>
              </div>
            </div>

            <Card>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
                <Icons.BarChart3 size={18} style={{ color: "#c9a84c" }} />
                <div style={{ fontWeight: 800, color: "#0a192f", fontSize: 15 }}>Wealth Projection Timeline</div>
              </div>
              <TimelineChart data={result.timelineData} />
            </Card>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 20 }}>
              <Card style={{ borderTop: "4px solid #ef4444" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                  <div style={{ width: 28, height: 28, borderRadius: "50%", background: "#fee2e2", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 900, color: "#ef4444" }}>01</div>
                  <div style={{ fontWeight: 800, color: "#0a192f", fontSize: 14 }}>Inflation — The Hidden Cost</div>
                </div>
                <div style={{ background: "#fff5f5", borderRadius: 10, padding: "14px 16px", marginBottom: 14 }}>
                  <div style={{ fontSize: 11, color: "#ef4444", fontWeight: 700, marginBottom: 4 }}>RM {fmtFull(inputs.desiredMonthlyIncome)} today will feel like...</div>
                  <div style={{ fontSize: 24, fontWeight: 900, color: "#0a192f" }}>{fmtRM(result.futureMonthlyNeed)}<span style={{ fontSize: 12, fontWeight: 600, color: "#829ab1" }}>/mo</span></div>
                </div>
                <div style={{ display: "flex", gap: 12 }}>
                  <div style={{ flex: 1, background: "#f0f4f8", borderRadius: 8, padding: "10px 12px" }}>
                    <div style={{ fontSize: 10, color: "#829ab1", fontWeight: 700 }}>Multiplier</div>
                    <div style={{ fontWeight: 800, color: "#0a192f" }}>{result.inflationMultiplier.toFixed(2)}x</div>
                  </div>
                  <div style={{ flex: 1, background: "#f0f4f8", borderRadius: 8, padding: "10px 12px" }}>
                    <div style={{ fontSize: 10, color: "#829ab1", fontWeight: 700 }}>Power Lost</div>
                    <div style={{ fontWeight: 800, color: "#ef4444" }}>{result.purchasingPowerLoss.toFixed(1)}%</div>
                  </div>
                </div>
                <p style={{ fontSize: 11, color: "#829ab1", fontStyle: "italic", marginTop: 12, marginBottom: 0 }}>
                  "Retirement planning must account for 'future prices', not today's"
                </p>
              </Card>

              <Card style={{ borderTop: "4px solid #c9a84c" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                  <div style={{ width: 28, height: 28, borderRadius: "50%", background: "#fdf9ed", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 900, color: "#c9a84c" }}>02</div>
                  <div style={{ fontWeight: 800, color: "#0a192f", fontSize: 14 }}>Your 'Retirement Magic Number'</div>
                </div>
                <div style={{ background: "#fdf9ed", borderRadius: 10, padding: "14px 16px", marginBottom: 14 }}>
                  <div style={{ fontSize: 11, color: "#8f7030", fontWeight: 700, marginBottom: 4 }}>Corpus Target</div>
                  <div style={{ fontSize: 24, fontWeight: 900, color: "#0a192f" }}>{fmtRM(result.totalCorpusNeeded)}</div>
                </div>
                <div style={{ display: "flex", gap: 12 }}>
                  <div style={{ flex: 1, background: "#f0f4f8", borderRadius: 8, padding: "10px 12px" }}>
                    <div style={{ fontSize: 10, color: "#829ab1", fontWeight: 700 }}>Annual</div>
                    <div style={{ fontWeight: 800, color: "#0a192f", fontSize: 12 }}>{fmtRM(result.annualNeedAtRetirement)}</div>
                  </div>
                  <div style={{ flex: 1, background: "#f0f4f8", borderRadius: 8, padding: "10px 12px" }}>
                    <div style={{ fontSize: 10, color: "#829ab1", fontWeight: 700 }}>Monthly</div>
                    <div style={{ fontWeight: 800, color: "#0a192f", fontSize: 12 }}>{fmtRM(result.futureMonthlyNeed)}</div>
                  </div>
                </div>
                <p style={{ fontSize: 11, color: "#829ab1", fontStyle: "italic", marginTop: 12, marginBottom: 0 }}>
                  "Corpus = Annual Expenses ÷ {inputs.withdrawalRate}%"
                </p>
              </Card>

              <Card style={{ borderTop: "4px solid #334e68" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                  <div style={{ width: 28, height: 28, borderRadius: "50%", background: "#f0f4f8", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 900, color: "#334e68" }}>03</div>
                  <div style={{ fontWeight: 800, color: "#0a192f", fontSize: 14 }}>EPF Dynamic Growth</div>
                </div>
                <div style={{ background: "#f0f4f8", borderRadius: 10, padding: "14px 16px", marginBottom: 14 }}>
                  <div style={{ fontSize: 11, color: "#486581", fontWeight: 700, marginBottom: 4 }}>Projected EPF</div>
                  <div style={{ fontSize: 24, fontWeight: 900, color: "#0a192f" }}>{fmtRM(result.totalEpfAtRetirement)}</div>
                </div>
                <div style={{ display: "flex", gap: 12 }}>
                  <div style={{ flex: 1, background: "#fff", border: "1px solid #eef2f7", borderRadius: 8, padding: "10px 12px" }}>
                    <div style={{ fontSize: 10, color: "#829ab1", fontWeight: 700 }}>Current EPF Growth</div>
                    <div style={{ fontWeight: 800, color: "#0a192f", fontSize: 12 }}>{fmtRM(result.epfBalanceFV)}</div>
                  </div>
                  <div style={{ flex: 1, background: "#fff", border: "1px solid #eef2f7", borderRadius: 8, padding: "10px 12px" }}>
                    <div style={{ fontSize: 10, color: "#829ab1", fontWeight: 700 }}>Contributions</div>
                    <div style={{ fontWeight: 800, color: "#0a192f", fontSize: 12 }}>{fmtRM(result.epfContributionsFV)}</div>
                  </div>
                </div>
                <p style={{ fontSize: 11, color: "#829ab1", fontStyle: "italic", marginTop: 12, marginBottom: 0 }}>
                  "EPF alone is far from enough — we need extra growth engines"
                </p>
              </Card>
            </div>

            <Card style={{ borderLeft: `4px solid ${result.gap > 0 ? "#ef4444" : "#4ade80"}` }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
                <Icons.AlertTriangle size={20} style={{ color: result.gap > 0 ? "#ef4444" : "#4ade80" }} />
                <div style={{ fontWeight: 800, color: "#0a192f", fontSize: 16 }}>The Hard Truth — The Gap</div>
              </div>
              <GapChart result={result} />
              {result.gap > 0 ? (
                <div style={{ marginTop: 20, background: "#fff5f5", border: "1px solid #fecaca", borderRadius: 12, padding: "16px 20px" }}>
                  <div style={{ fontSize: 12, color: "#ef4444", fontWeight: 700, marginBottom: 4 }}>Monthly Extra Investment Needed to Close the Gap</div>
                  <div style={{ fontSize: 28, fontWeight: 900, color: "#0a192f" }}>{fmtRM(result.monthlyInvestmentNeeded)}<span style={{ fontSize: 13, fontWeight: 600, color: "#829ab1" }}>/mo</span></div>
                  <div style={{ fontSize: 12, color: "#829ab1", marginTop: 4 }}>Gap: {result.gapPercentage.toFixed(1)}% of total corpus needed</div>
                </div>
              ) : (
                <div style={{ marginTop: 20, background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 12, padding: "16px 20px", display: "flex", alignItems: "center", gap: 12 }}>
                  <Icons.CheckCircle2 size={24} style={{ color: "#4ade80" }} />
                  <div>
                    <div style={{ fontWeight: 800, color: "#166534" }}>You're on track!</div>
                    <div style={{ fontSize: 12, color: "#4ade80" }}>Your projected assets exceed the target corpus.</div>
                  </div>
                </div>
              )}
            </Card>

            <Card>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
                <Icons.Sparkles size={20} style={{ color: "#c9a84c" }} />
                <div style={{ fontWeight: 800, color: "#0a192f", fontSize: 16 }}>3 Strategies to Shrink the Gap</div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 20 }}>
                {[
                  { icon: Icons.TrendingUp, title: "Boost Income", desc: "Upgrade your skills for promotions and raises, or build side income streams to accelerate your EPF contributions.", btn: "Adjust Salary Growth", onClick: () => { salaryGrowthRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }); setTimeout(() => salaryGrowthRef.current?.focus(), 400); } },
                  { icon: Icons.CircleDollarSign, title: "Disciplined Investing", desc: "Build a diversified global portfolio (70% Equities + 30% Fixed Income) to earn higher returns than EPF alone.", info: "The gap signals it's time to invest beyond EPF. Review your Investment Return Rate in the assumptions above." },
                  { icon: Icons.Clock, title: "Delay Retirement", desc: "Working a few more years gives your EPF and investments extra time to compound, reducing the gap significantly.", btn: "Adjust Retirement Age", onClick: () => { retirementAgeRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }); setTimeout(() => retirementAgeRef.current?.focus(), 400); } }
                ].map(({ icon: Ic, title, desc, btn, onClick, info }) => (
                  <div key={title} style={{ background: "linear-gradient(135deg, #0a192f, #112240)", borderRadius: 16, padding: "20px 18px" }}>
                    <div style={{ width: 40, height: 40, borderRadius: "50%", border: "2px solid #c9a84c", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14 }}>
                      <Ic size={18} style={{ color: "#c9a84c" }} />
                    </div>
                    <div style={{ fontWeight: 800, color: "#fff", fontSize: 14, marginBottom: 8 }}>{title}</div>
                    <p style={{ fontSize: 12, color: "#829ab1", lineHeight: 1.6, marginBottom: 16 }}>{desc}</p>
                    {btn && (
                      <button onClick={onClick} style={{ width: "100%", padding: "10px 0", borderRadius: 8, border: "1px solid #c9a84c", background: "transparent", color: "#c9a84c", fontWeight: 700, fontSize: 12, cursor: "pointer" }}>
                        {btn}
                      </button>
                    )}
                    {info && (
                      <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: 8, padding: "10px 12px", fontSize: 11, color: "#9fb3c8", lineHeight: 1.5 }}>
                        <Icons.Info size={12} className="inline mr-1" style={{ color: "#c9a84c" }} />{info}
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 20, borderTop: "2px solid #c9a84c", paddingTop: 16, textAlign: "center" }}>
                <p style={{ fontSize: 12, color: "#829ab1", fontStyle: "italic", margin: 0 }}>
                  "Understanding the data empowers better decisions — don't let the numbers intimidate you"
                </p>
              </div>
            </Card>

            <Card style={{ background: "linear-gradient(135deg, #fdf9ed, #fff)", borderTop: "4px solid #c9a84c" }}>
              <div style={{ fontWeight: 800, color: "#0a192f", fontSize: 16, marginBottom: 20 }}>Your Action Plan</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: 16 }}>
                {[
                  { n: "01", title: "Deep Review", desc: "Assess your current financial position, EPF, savings, debts, and protection gaps." },
                  { n: "02", title: "Asset Allocation", desc: "Diversify into equities, bonds, and alternative assets for growth beyond EPF." },
                  { n: "03", title: "Auto-Pilot", desc: "Set up automatic transfers to your investment account every payday — consistency wins." },
                  { n: "04", title: "Regular Review", desc: "Revisit this calculator annually. Life changes, and your plan should too." },
                ].map(({ n, title, desc }) => (
                  <div key={n} style={{ background: "#fff", borderRadius: 14, padding: "18px 16px", boxShadow: "0 4px 12px rgba(10,25,47,0.06)" }}>
                    <div style={{ width: 32, height: 32, borderRadius: 10, background: "#0a192f", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 900, color: "#c9a84c", marginBottom: 12 }}>{n}</div>
                    <div style={{ fontWeight: 800, color: "#0a192f", fontSize: 13, marginBottom: 6 }}>{title}</div>
                    <p style={{ fontSize: 11, color: "#829ab1", lineHeight: 1.6, margin: 0 }}>{desc}</p>
                  </div>
                ))}
              </div>
            </Card>

            <div style={{ textAlign: "center", padding: "8px 20px" }}>
              <p style={{ fontSize: 14, color: "#627d98", fontStyle: "italic", maxWidth: 500, margin: "0 auto", lineHeight: 1.7 }}>
                "Retirement planning is not a privilege of the wealthy, but a necessity to avoid future hardship."
              </p>
            </div>
          </div>
        )}

        <div style={{ marginTop: 48, background: "linear-gradient(135deg, #0a192f, #112240)", borderRadius: 20, padding: "28px 28px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 24, alignItems: "center" }}>
            <div>
              <div style={{ fontSize: 11, color: "#627d98", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 4 }}>Your Financial Advisor</div>
              <div style={{ fontSize: 20, fontWeight: 900, color: "#fff" }}>Anson Tan</div>
              <div style={{ fontSize: 12, color: "#9fb3c8" }}>BBB Advisory Sdn Bhd</div>
            </div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <a href="https://wa.me/601156281541" target="_blank" rel="noreferrer" style={{ display: "flex", alignItems: "center", gap: 8, background: "#22c55e", color: "#fff", padding: "10px 18px", borderRadius: 10, textDecoration: "none", fontWeight: 700, fontSize: 13 }}>
                <Icons.MessageCircle size={16} /> WhatsApp
              </a>
              <a href="tel:+601156281541" style={{ display: "flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.08)", color: "#9fb3c8", padding: "10px 18px", borderRadius: 10, textDecoration: "none", fontWeight: 700, fontSize: 13 }}>
                <Icons.Phone size={16} /> 011-5628 1541
              </a>
            </div>
          </div>
        </div>

        <div style={{ marginTop: 16, textAlign: "center", padding: "16px 0" }}>
          <div style={{ fontSize: 12, color: "#829ab1", fontWeight: 600 }}>BBB Advisory Sdn Bhd — Professional Financial Planning & Investment Advisory Services</div>
          <div style={{ fontSize: 10, color: "#9fb3c8", marginTop: 6, maxWidth: 600, margin: "6px auto 0", lineHeight: 1.6 }}>
            This calculator is for illustrative purposes only. It does not constitute financial advice. Past returns do not guarantee future results. Please consult a licensed financial advisor before making any investment decisions.
          </div>
        </div>
      </div>
    </div>
  );
}
