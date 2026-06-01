import { useState } from "react";

const formatCurrency = (val) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(val);

const verdicts = [
  { max: 0.5, emoji: "✅", label: "Easy Buy", color: "#00e676", msg: "That's pocket change for you. Go for it!" },
  { max: 2, emoji: "👍", label: "Worth It", color: "#69f0ae", msg: "A reasonable purchase. Think if you'll really use it." },
  { max: 5, emoji: "🤔", label: "Think Twice", color: "#ffd740", msg: "That's a few hours of your life. Is it worth it?" },
  { max: 10, emoji: "⚠️", label: "Caution", color: "#ff9100", msg: "This costs you a good chunk of your day. Sleep on it." },
  { max: 999, emoji: "🚨", label: "Danger Zone", color: "#ff1744", msg: "That's a LOT of your time. Do you really need this?" },
];

const getVerdict = (hours) => verdicts.find((v) => hours <= v.max) || verdicts[verdicts.length - 1];

const alternatives = {
  low: ["Put it in a high-yield savings account", "Add it to your emergency fund", "Buy a great book instead"],
  mid: ["Invest it in index funds", "Use it for a skill-building course", "Save toward a meaningful goal"],
  high: ["Invest in yourself — a course or certification", "Start an emergency fund with it", "Put it toward paying off debt"],
};

export default function ShouldIBuyIt() {
  const [price, setPrice] = useState("");
  const [wage, setWage] = useState("");
  const [itemName, setItemName] = useState("");
  const [result, setResult] = useState(null);

  const calculate = () => {
    const p = parseFloat(price);
    const w = parseFloat(wage);
    if (!p || !w || p <= 0 || w <= 0) return;
    const hours = p / w;
    const verdict = getVerdict(hours);
    const altKey = p < 50 ? "low" : p < 500 ? "mid" : "high";
    setResult({ hours, verdict, altKey, price: p });
  };

  const reset = () => {
    setResult(null);
    setPrice("");
    setWage("");
    setItemName("");
  };

  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0f", fontFamily: "Georgia, serif", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "24px 16px" }}>
      <style>{`
        .card { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 24px; width: 100%; max-width: 460px; }
        .input-field { width: 100%; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.12); border-radius: 12px; padding: 14px 16px; color: #fff; font-size: 16px; outline: none; box-sizing: border-box; }
        .input-field::placeholder { color: rgba(255,255,255,0.25); }
        .input-field:focus { border-color: rgba(255,215,0,0.5); }
        .btn-primary { width: 100%; padding: 16px; border-radius: 14px; border: none; background: linear-gradient(135deg, #f5c518, #e8a000); color: #0a0a0f; font-size: 17px; font-weight: 700; cursor: pointer; }
        .btn-primary:disabled { opacity: 0.35; cursor: not-allowed; }
        .label { font-size: 11px; letter-spacing: 1.5px; text-transform: uppercase; color: rgba(255,255,255,0.35); margin-bottom: 6px; }
        .alt-item { display: flex; align-items: center; gap: 10px; padding: 10px 14px; background: rgba(255,255,255,0.04); border-radius: 10px; font-size: 13px; color: rgba(255,255,255,0.65); border: 1px solid rgba(255,255,255,0.07); margin-bottom: 8px; }
        .reset-btn { width: 100%; background: none; border: 1px solid rgba(255,255,255,0.15); color: rgba(255,255,255,0.5); border-radius: 10px; padding: 10px 20px; cursor: pointer; font-size: 13px; }
      `}</style>

      <div style={{ textAlign: "center", marginBottom: "32px" }}>
        <div style={{ fontSize: "36px" }}>💰</div>
        <h1 style={{ color: "#fff", fontSize: "36px", margin: "8px 0 0" }}>Should I Buy It?</h1>
        <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "13px", margin: "8px 0 0" }}>See any purchase in hours of your life</p >
      </div>

      <div className="card">
        {!result ? (
          <div style={{ padding: "32px" }}>
            <div style={{ marginBottom: "20px" }}>
              <div className="label">What are you buying?</div>
              <input className="input-field" placeholder="e.g. new sneakers, iPhone..." value={itemName} onChange={(e) => setItemName(e.target.value)} />
            </div>
            <div style={{ marginBottom: "20px" }}>
              <div className="label">Price ($)</div>
              <input className="input-field" type="number" placeholder="0.00" value={price} onChange={(e) => setPrice(e.target.value)} />
            </div>
            <div style={{ marginBottom: "28px" }}>
              <div className="label">Your Hourly Wage ($)</div>
              <input className="input-field" type="number" placeholder="0.00" value={wage} onChange={(e) => setWage(e.target.value)} />
            </div>
            <button className="btn-primary" onClick={calculate} disabled={!price || !wage}>Calculate the True Cost →</button>
          </div>
        ) : (
          <div style={{ padding: "32px" }}>
            {itemName && <div style={{ textAlign: "center", marginBottom: "20px", color: "rgba(255,255,255,0.4)", fontSize: "13px" }}>{itemName} · {formatCurrency(result.price)}</div>}
            <div style={{ textAlign: "center", marginBottom: "16px" }}>
              <span style={{ fontSize: "32px" }}>{result.verdict.emoji}</span>
              <div style={{ color: result.verdict.color, fontSize: "14px", marginTop: "8px" }}>{result.verdict.label}</div>
            </div>
            <div style={{ textAlign: "center", marginBottom: "8px" }}>
              <div style={{ fontSize: "52px", color: result.verdict.color, lineHeight: 1 }}>
                {result.hours < 0.1 ? `${Math.round(result.hours * 60)}m` : result.hours < 10 ? `${result.hours.toFixed(1)}h` : `${Math.round(result.hours)}h`}
              </div>
              <div style={{ color: "rgba(255,255,255,0.35)", fontSize: "13px", marginTop: "6px" }}>hours of your life</div>
            </div>
            <div style={{ textAlign: "center", color: "rgba(255,255,255,0.55)", fontSize: "13px", padding: "16px", background: "rgba(255,255,255,0.03)", borderRadius: "12px", margin: "20px 0" }}>{result.verdict.msg}</div>
            <div style={{ marginBottom: "24px" }}>
              <div className="label">instead, you could...</div>
              <div style={{ marginTop: "10px" }}>
                {alternatives[result.altKey].map((alt, i) => <div key={i} className="alt-item"><span style={{ color: "#f5c518" }}>→</span>{alt}</div>)}
              </div>
            </div>
            <button className="reset-btn" onClick={reset}>← Check another purchase</button>
          </div>
        )}
      </div>
    </div>
  );
}
