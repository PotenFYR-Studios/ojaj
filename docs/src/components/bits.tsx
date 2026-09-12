import { useState } from "react";

/** Code block with language tag + copy button (SPEC §5.8). */
export function CodeBlock({
  code,
  lang = "yaml",
}: {
  code: string;
  lang?: string;
}) {
  const [ok, setOk] = useState(false);

  const copy = () => {
    const done = () => {
      setOk(true);
      setTimeout(() => setOk(false), 1400);
    };
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(code).then(done, () => fallback(code, done));
    } else {
      fallback(code, done);
    }
  };

  return (
    <div className="doc-content">
      <pre className="codeblock" data-lang={lang}>
        <button type="button" className={`copy-btn${ok ? " ok" : ""}`} onClick={copy}>
          {ok ? "Copied!" : "Copy"}
        </button>
        <code>{code}</code>
      </pre>
    </div>
  );
}

function fallback(text: string, done: () => void) {
  const ta = document.createElement("textarea");
  ta.value = text;
  ta.style.position = "fixed";
  ta.style.opacity = "0";
  document.body.appendChild(ta);
  ta.select();
  try {
    document.execCommand("copy");
    done();
  } finally {
    document.body.removeChild(ta);
  }
}

export interface ConfigRow {
  key: string;
  type: string;
  def: string;
  desc: React.ReactNode;
}

/** Config reference table: Key · Type · Default · Description. */
export function ConfigTable({ rows }: { rows: ConfigRow[] }) {
  return (
    <div className="doc-content">
      <table>
        <thead>
          <tr>
            <th>Key</th>
            <th>Type</th>
            <th>Default</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.key}>
              <td className="config-key">{r.key}</td>
              <td className="config-key">{r.type}</td>
              <td className="config-key">{r.def}</td>
              <td>{r.desc}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
