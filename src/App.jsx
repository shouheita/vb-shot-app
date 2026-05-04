import { useState, useEffect, useRef } from "react";

const DEFAULT_TEAMS = [
  [1,"男子","青柳バレーボールスポーツ少年団"],
  [2,"男子","朝霞ジュニアバレーボールクラブ"],
  [3,"男子","岩槻ジュニアバレーボールスポーツ少年団"],
  [4,"男子","大成ジュニアバレーボールクラブ"],
  [5,"男子","春日部SEABIRDS"],
  [6,"男子","熊谷東ジュニアバレーボールスポーツ少年団"],
  [7,"男子","越谷増林JVC"],
  [8,"男子","ゴールデン・ファイターズ"],
  [9,"男子","さかつるクラブSAKURA"],
  [10,"男子","ジュニア深谷バレーボールクラブ"],
  [11,"男子","Jstar並木"],
  [12,"男子","関沢クラブ"],
  [13,"男子","URALAジュニアバレーボールクラブ"],
  [14,"男子","戸田クラブ"],
  [15,"男子","戸田クラブ NEXT"],
  [16,"男子","NORTH."],
  [17,"男子","藤久保ブレイブ"],
  [18,"男子","マルガリータ"],
  [19,"男子","三郷エンジェルス"],
  [20,"男子","宮原ジュニアバレーボールスポーツ少年団"],
  [21,"男子","VORTEX加須JVC"],
  [22,"男子","VORTEX加須JVCそよ風"],
  [31,"女子","青柳バレーボールスポーツ少年団"],
  [32,"女子","朝霞ジュニアバレーボールクラブ"],
  [33,"女子","岩槻クイッカーズ"],
  [34,"女子","岩槻ジュニアバレーボールスポーツ少年団"],
  [35,"女子","大井クッキーズスポーツ少年団"],
  [36,"女子","大成ジュニアバレーボールクラブ"],
  [37,"女子","岡部秋桜ジュニアバレーボールクラブ"],
  [38,"女子","尾田蒔バレーボールクラブ"],
  [39,"女子","春日部SEABIRDS"],
  [40,"女子","神川JVC"],
  [41,"女子","久喜ペガサスバレーボールスポーツ少年団"],
  [42,"女子","熊谷ジュニアバレーボールクラブ"],
  [43,"女子","熊谷サニーズ"],
  [44,"女子","熊谷むさしバレーボールスポーツ少年団"],
  [45,"女子","鴻巣箕田ウィングス"],
  [46,"女子","鴻巣南JVC"],
  [47,"女子","越谷増林JVC"],
  [48,"女子","埼玉上尾メデックスJr"],
  [49,"女子","さかつるクラブORANGE"],
  [50,"女子","栄和クラブ"],
  [51,"女子","幸手ユナイトJVC"],
  [52,"女子","七本木ジュニアバレーボールクラブ"],
  [53,"女子","Jstar並木"],
  [54,"女子","ジュニア深谷ガールズ"],
  [55,"女子","白岡JVC"],
  [56,"女子","秩父ジュニアバレーボールクラブ"],
  [57,"女子","草加中央ジュニアバレーボールクラブ"],
  [58,"女子","戸田クラブ"],
  [59,"女子","南畑JVC"],
  [60,"女子","新座第四バレーボール"],
  [61,"女子","花園JVC"],
  [62,"女子","藤久保レジーナ"],
  [63,"女子","深西Jrバレー"],
  [64,"女子","ふじみキッドJVC"],
  [65,"女子","マルガリータ"],
  [66,"女子","三郷エンジェルス"],
  [67,"女子","三郷V.Max"],
  [68,"女子","南桜井Amityバレーボールクラブ"],
  [69,"女子","宮原ジュニアバレーボールスポーツ少年団"],
  [70,"女子","宮原ジュニアレインボー"],
  [71,"女子","ラッキーラビット"],
  [72,"女子","嵐山ガッツジュニア"],
  [73,"女子","VORTEX加須JVC"],
  [74,"女子","VORTEX加須みらいJVC"],
  [81,"混合","上尾あずまJVC"],
  [82,"混合","あげおスターズ"],
  [83,"混合","あげおスターズ ミルキーウェイ"],
  [84,"混合","明戸ジュニアバレーボールクラブ"],
  [85,"混合","稲荷クラブJr"],
  [86,"混合","岩槻マイティーズ"],
  [87,"混合","岩槻マイティーズ スマイル"],
  [88,"混合","URALAジュニアバレーボールクラブ"],
  [89,"混合","浦和辻ジュニアバレーボールクラブ"],
  [90,"混合","おがのJVC"],
  [91,"混合","桶川西JVC"],
  [92,"混合","桶川東JVC"],
  [93,"混合","桶川東JVCサフラワー"],
  [94,"混合","春日部JVC"],
  [95,"混合","上落合リカオンズバレーボールスポーツ少年団"],
  [96,"混合","上里ジュニアバレーボールクラブ"],
  [97,"混合","上里東"],
  [98,"混合","上柴EASTジュニアバレーボールクラブ"],
  [99,"混合","北本中丸JVC"],
  [100,"混合","川越山田ジュニアバレーボールクラブ"],
  [101,"混合","川越芳野JVC"],
  [102,"混合","栗橋サンライズ"],
  [103,"混合","江南南"],
  [104,"混合","鴻巣川里ビクトリーズ"],
  [105,"混合","鴻巣北"],
  [106,"混合","鴻巣ジュニアバレーボール"],
  [107,"混合","さいたま新都心ジュニアバレーボールクラブ"],
  [108,"混合","栄和クラブ"],
  [109,"混合","桜山南JVC"],
  [110,"混合","志木ジュニアバレーボール"],
  [111,"混合","Jstar並木"],
  [112,"混合","仙波ジュニアバレーボールクラブ"],
  [113,"混合","関沢流星群"],
  [114,"混合","草加チアーズスポーツ少年団"],
  [115,"混合","玉川JVC"],
  [116,"混合","所沢育星ジュニアバレーボールクラブ"],
  [117,"混合","所沢小手指JVC"],
  [118,"混合","所沢ミラクルエル"],
  [119,"混合","所沢ミラクルスターズ"],
  [120,"混合","所沢柳瀬ジュニアバレーボールクラブ"],
  [121,"混合","戸田ディバインジュニアバレーボール"],
  [122,"混合","戸田南バレーボールスポーツ少年団"],
  [123,"混合","長幡ヴィガース"],
  [124,"混合","名細ジュニアバレーボールクラブ"],
  [125,"混合","滑川エンジェルス"],
  [126,"混合","西公民館ジュニアバレーボール"],
  [127,"混合","BAGUS"],
  [128,"混合","蓮田北バレーボールクラブ"],
  [129,"混合","はすぴよクラブ（蓮田北）"],
  [130,"混合","泰ジュニアバレーボール"],
  [131,"混合","原山バレーボールスポーツ少年団"],
  [132,"混合","飯能ペンギンズバレーボールクラブ"],
  [133,"混合","日高ジュニア"],
  [134,"混合","古谷JVC"],
  [135,"混合","フレンズJVC"],
  [136,"混合","本庄VBC"],
  [137,"混合","三郷V.Max"],
  [138,"混合","宮代東JVC"],
  [139,"混合","毛呂山ジュニアバレーボールクラブ"],
  [140,"混合","ユニティーJVC"],
  [141,"混合","吉川栄ジュニアバレーボールチーム"],
  [142,"混合","与野大戸バレーボールクラブ"],
  [143,"混合","与野大戸ビクトリー"],
  [144,"混合","嵐山ガッツジュニア"],
  [145,"混合","和光JVC"],
];

const SHOT_LIST_KEY = "vb_shot_list_v1";
const TEAMS_KEY = "vb_teams_v1";

const DIV_COLOR = { 男子: "#3b82f6", 女子: "#f43f5e", 混合: "#10b981" };
const DIV_BG   = { 男子: "#eff6ff", 女子: "#fff1f2", 混合: "#f0fdf4" };

function loadFromStorage(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    return parsed ?? fallback;
  } catch {
    return fallback;
  }
}

const toKatakana = (str) =>
  str.replace(/[ぁ-ゖ]/g, ch => String.fromCharCode(ch.charCodeAt(0) + 0x60));

function parseUrlData() {
  try {
    const params = new URLSearchParams(window.location.search);
    const teamsRaw = params.get("teams");
    const shotRaw = params.get("shot");

    let teams = null;
    if (teamsRaw) {
      const parsed = teamsRaw.split("|").map(t => {
        const idx1 = t.indexOf(",");
        const idx2 = t.indexOf(",", idx1 + 1);
        const num = parseInt(t.slice(0, idx1));
        const div = t.slice(idx1 + 1, idx2);
        const name = t.slice(idx2 + 1);
        if (!num || !div || !name) return null;
        return [num, div, name];
      }).filter(Boolean);
      if (parsed.length > 0) teams = parsed;
    }

    let shotNums = null;
    if (shotRaw) {
      const nums = shotRaw.split(",").map(Number).filter(n => n > 0);
      if (nums.length > 0) shotNums = nums;
    }

    if (!teams && !shotNums) return null;
    return { teams, shotNums };
  } catch { return null; }
}

export default function App() {
  const [query, setQuery] = useState("");
  const [numMode, setNumMode] = useState(false);
  const [teams, setTeams] = useState(() => loadFromStorage(TEAMS_KEY, null) ?? DEFAULT_TEAMS);
  const [shotList, setShotList] = useState(() => loadFromStorage(SHOT_LIST_KEY, []));
  const [restoreInput, setRestoreInput] = useState("");
  const [restoreMsg, setRestoreMsg] = useState("");
  const [tab, setTab] = useState("search");
  const [importText, setImportText] = useState("");
  const [importMsg, setImportMsg] = useState("");
  const [copyMsg, setCopyMsg] = useState("");
  const [setupDone, setSetupDone] = useState(() => loadFromStorage(TEAMS_KEY, null) !== null);
  const [setupText, setSetupText] = useState("");
  const [setupMsg, setSetupMsg] = useState("");
  const [urlImportData, setUrlImportData] = useState(() => parseUrlData());
  const inputRef = useRef(null);

  useEffect(() => {
    try { localStorage.setItem(SHOT_LIST_KEY, JSON.stringify(shotList)); } catch {}
  }, [shotList]);

  const backupCode = shotList.length > 0
    ? shotList.map(([num, div]) => `${num}${div[0]}`).join(",")
    : "";

  const handleRestore = () => {
    try {
      const parts = restoreInput.trim().split(",");
      const divMap = { "男": "男子", "女": "女子", "混": "混合" };
      const restored = parts.map(p => {
        const divChar = p.slice(-1);
        const num = parseInt(p.slice(0, -1));
        const div = divMap[divChar];
        return teams.find(t => t[0] === num && t[1] === div);
      }).filter(Boolean);
      if (restored.length === 0) { setRestoreMsg("❌ 復元失敗"); return; }
      setShotList(restored);
      setRestoreMsg(`✅ ${restored.length}件復元`);
      setRestoreInput("");
    } catch { setRestoreMsg("❌ 形式エラー"); }
  };

  const buildCsvText = () =>
    shotList.map(([num, div, name]) => `${num},${div},${name}`).join("\n");

  const buildTeamsParam = (teamsData) =>
    teamsData.map(([num, div, name]) => `${num},${div},${name}`).join("|");

  const buildShotParam = (shotData) =>
    shotData.map(([num]) => num).join(",");

  const updateUrl = (teamsData, shotData) => {
    const tp = buildTeamsParam(teamsData);
    const sp = buildShotParam(shotData);
    let url = "?teams=" + tp;
    if (sp) url += "&shot=" + sp;
    window.history.replaceState({}, "", url);
  };

  const updateUrlWithTeams = (teamsData) => updateUrl(teamsData, shotList);

  const SPREADSHEET_URL = "https://docs.google.com/spreadsheets/d/1t-TWpobCnjfIahvyz_5afFopbjEdjsZu/edit";

  const handleGasCopy = async () => {
    if (shotList.length === 0) return;
    const dataLines = buildCsvText();
    const gas = `function fillReport() {
  const data = \`${dataLines}\`;

  const sheet = SpreadsheetApp.getActiveSpreadsheet()
    .getSheetByName('撮影報告書');
  const rows = [17,23,29,35,41,47,53,59,65,71,77,83,89,95,101];

  data.trim().split('\\n').forEach((line, i) => {
    const idx1 = line.indexOf(',');
    const idx2 = line.indexOf(',', idx1 + 1);
    const div = line.slice(idx1 + 1, idx2);
    const name = line.slice(idx2 + 1);
    if (!div || !name) return;

    const slot = i + 1;
    if (slot <= 15) {
      const row = rows[slot - 1];
      sheet.getRange('I' + row).setValue(name);
      sheet.getRange('AA' + row).setValue(div);
    } else if (slot <= 30) {
      const row = rows[slot - 16];
      sheet.getRange('AK' + row).setValue(name);
      sheet.getRange('BC' + row).setValue(div);
    }
  });

  SpreadsheetApp.getUi().alert('入力完了！');
}`;
    try {
      await navigator.clipboard.writeText(gas);
      setCopyMsg("✅ コピーしました");
    } catch {
      setCopyMsg("❌ コピー失敗");
    }
    setTimeout(() => setCopyMsg(""), 3000);
  };

  const handleSendToClaude = async () => {
    if (shotList.length === 0) return;
    const csv = buildCsvText();
    const prompt = `以下の撮影済みチームリストを、集合写真欄のGoogleスプレッドシートに入力するGoogle Apps Scriptを作成してください。

【データ形式】通し番号,男女区分,チーム名

【入力先セル】
左側スロット（通し番号1〜15）：チーム名→I列、男女区分→AA列
右側スロット（通し番号16〜）：チーム名→AK列、男女区分→BC列
開始行：17行目、以降6行おき（17, 23, 29, 35, 41, 47, 53, 59, 65, 71, 77, 83, 89, 95, 101）

【撮影済みチームデータ】
${csv}

スクリプトエディタに貼り付けてすぐ実行できる形式で出力してください。`;

    try {
      await navigator.clipboard.writeText(prompt);
      setCopyMsg("✅ コピーしました");
    } catch {
      setCopyMsg("❌ コピー失敗");
    }
    setTimeout(() => setCopyMsg(""), 3000);
  };

  const handleCopyPcUrl = async () => {
    if (shotList.length === 0) return;
    const shotParam = shotList.map(([num]) => num).join(",");
    const url = window.location.origin + window.location.pathname + "?shot=" + shotParam;
    try {
      await navigator.clipboard.writeText(url);
      setCopyMsg("✅ URLをコピーしました");
    } catch {
      setCopyMsg("❌ コピー失敗");
    }
    setTimeout(() => setCopyMsg(""), 3000);
  };

  const handleCopy = async () => {
    if (shotList.length === 0) return;
    const rows = shotList.map(([num, div, name]) =>
      `${num}\t${div}\t${name}`
    );
    const text = ["通し番号\t男女区分\tチーム名", ...rows].join("\n");
    try {
      await navigator.clipboard.writeText(text);
      setCopyMsg("✅ コピーしました");
    } catch {
      setCopyMsg("❌ コピー失敗");
    }
    setTimeout(() => setCopyMsg(""), 2000);
  };

  const handleImport = () => {
    try {
      const parsed = JSON.parse(importText.trim());
      if (!Array.isArray(parsed) || parsed.length === 0) throw new Error();
      const validated = parsed.filter(item =>
        Array.isArray(item) &&
        item.length === 3 &&
        typeof item[0] === "number" &&
        typeof item[1] === "string" &&
        typeof item[2] === "string"
      );
      if (validated.length === 0) throw new Error();
      setTeams(validated);
      localStorage.setItem(TEAMS_KEY, JSON.stringify(validated));
      setShotList([]);
      updateUrlWithTeams(validated);
      setImportMsg(`✅ ${validated.length}チームを読み込みました（撮影済みリストをリセットしました）`);
      setImportText("");
    } catch {
      setImportMsg("❌ JSONの形式が正しくありません\n例: [[1,\"男子\",\"チーム名\"], ...]");
    }
  };

  const handleResetTeams = () => {
    if (!window.confirm("デフォルトのチームデータに戻しますか？\n撮影済みリストもリセットされます。")) return;
    setTeams(DEFAULT_TEAMS);
    setShotList([]);
    localStorage.removeItem(TEAMS_KEY);
    setImportMsg("✅ デフォルトデータに戻しました");
  };

  const isCustomTeams = loadFromStorage(TEAMS_KEY, null) !== null;

  const handleSetupImport = () => {
    try {
      const parsed = JSON.parse(setupText.trim());
      if (!Array.isArray(parsed) || parsed.length === 0) throw new Error();
      const validated = parsed.filter(item =>
        Array.isArray(item) && item.length === 3 &&
        typeof item[0] === "number" && typeof item[1] === "string" && typeof item[2] === "string"
      );
      if (validated.length === 0) throw new Error();
      setTeams(validated);
      localStorage.setItem(TEAMS_KEY, JSON.stringify(validated));
      updateUrlWithTeams(validated);
      setSetupDone(true);
    } catch {
      setSetupMsg("❌ JSONの形式が正しくありません\n例: [[1,\"男子\",\"チーム名\"], ...]");
    }
  };

  const handleSetupDefault = () => {
    setSetupDone(true);
  };

  const shotIds = new Set(shotList.map(s => `${s[0]}-${s[1]}`));

  const filtered = query.trim() === "" ? [] : teams.filter(([num, div, name]) => {
    const q = toKatakana(query.trim());
    return String(num).startsWith(query.trim()) || toKatakana(name).includes(q);
  }).slice(0, 8);

  const addTeam = (team) => {
    const key = `${team[0]}-${team[1]}`;
    if (shotIds.has(key)) return;
    setShotList(prev => [...prev, team]);
    setQuery("");
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  const removeTeam = (key) => {
    setShotList(prev => prev.filter(t => `${t[0]}-${t[1]}` !== key));
  };

  const TABS = [
    ["search", "🔍 検索"],
    ["list", "📋 撮影済み"],
    ["report", "📄 報告書"],
    ["import", "📥 インポート"],
  ];

  if (urlImportData) {
    const { teams: importTeams, shotNums } = urlImportData;
    const teamsToShow = importTeams ?? teams;
    const divCount = teamsToShow.reduce((acc, [, div]) => {
      acc[div] = (acc[div] || 0) + 1;
      return acc;
    }, {});
    const shotTeams = shotNums
      ? shotNums.map(num => teamsToShow.find(t => t[0] === num)).filter(Boolean)
      : [];

    return (
      <div style={{
        fontFamily: "'Hiragino Sans', 'Noto Sans JP', sans-serif",
        background: "#0f172a", minHeight: "100vh", color: "#f8fafc",
        maxWidth: 480, margin: "0 auto",
        display: "flex", flexDirection: "column", justifyContent: "center",
        padding: "32px 24px",
      }}>
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>📋</div>
          <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 6 }}>データを引き継ぐ</div>
          <div style={{ fontSize: 13, color: "#64748b" }}>URLから状態を復元します</div>
        </div>

        {importTeams && (
          <div style={{ background: "#1e293b", borderRadius: 14, padding: "16px 18px", marginBottom: 12 }}>
            <div style={{ fontSize: 12, color: "#94a3b8", marginBottom: 8, fontWeight: 600 }}>チームデータ</div>
            <div style={{ fontSize: 24, fontWeight: 800, color: "#f8fafc", marginBottom: 8 }}>
              {importTeams.length} チーム
            </div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {Object.entries(divCount).map(([div, count]) => (
                <div key={div} style={{
                  background: DIV_BG[div] ?? "#f1f5f9",
                  color: DIV_COLOR[div] ?? "#334155",
                  borderRadius: 8, padding: "4px 12px",
                  fontSize: 12, fontWeight: 700,
                }}>
                  {div} {count}チーム
                </div>
              ))}
            </div>
          </div>
        )}

        {shotTeams.length > 0 && (
          <div style={{ background: "#1e293b", borderRadius: 14, padding: "16px 18px", marginBottom: 12 }}>
            <div style={{ fontSize: 12, color: "#94a3b8", marginBottom: 8, fontWeight: 600 }}>撮影済み</div>
            <div style={{ fontSize: 24, fontWeight: 800, color: "#10b981", marginBottom: 10 }}>
              {shotTeams.length} チーム
            </div>
            <div style={{ maxHeight: 160, overflowY: "auto" }}>
              {shotTeams.map(([num, div, name], i) => (
                <div key={`${num}-${div}`} style={{
                  display: "flex", alignItems: "center", gap: 8,
                  padding: "6px 0", borderBottom: "1px solid #0f172a",
                }}>
                  <div style={{ fontSize: 11, color: "#475569", minWidth: 18, textAlign: "right" }}>{i + 1}</div>
                  <div style={{
                    minWidth: 30, height: 30, borderRadius: 6,
                    background: DIV_BG[div] ?? "#f1f5f9",
                    display: "flex", flexDirection: "column",
                    alignItems: "center", justifyContent: "center",
                  }}>
                    <div style={{ fontSize: 10, fontWeight: 800, color: DIV_COLOR[div] ?? "#334155", lineHeight: 1 }}>{num}</div>
                    <div style={{ fontSize: 7, color: DIV_COLOR[div] ?? "#334155", fontWeight: 600 }}>{div}</div>
                  </div>
                  <div style={{ fontSize: 12, color: "#cbd5e1" }}>{name}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        <button
          onClick={() => {
            if (importTeams) {
              setTeams(importTeams);
              localStorage.setItem(TEAMS_KEY, JSON.stringify(importTeams));
            }
            setShotList(shotTeams);
            setSetupDone(true);
            setUrlImportData(null);
            window.history.replaceState({}, "", window.location.pathname);
            if (shotTeams.length > 0) setTab("report");
          }}
          style={{
            width: "100%", padding: "16px", borderRadius: 12, border: "none",
            background: "linear-gradient(135deg, #3b82f6, #6366f1)",
            color: "#fff", fontSize: 16, fontWeight: 700,
            cursor: "pointer", fontFamily: "inherit", marginBottom: 12,
          }}
        >
          引き継いで開始
        </button>
        <button
          onClick={() => {
            setUrlImportData(null);
            window.history.replaceState({}, "", window.location.pathname);
          }}
          style={{
            width: "100%", padding: "14px", borderRadius: 12,
            border: "2px solid #334155", background: "transparent",
            color: "#64748b", fontSize: 14, fontWeight: 600,
            cursor: "pointer", fontFamily: "inherit",
          }}
        >
          キャンセル
        </button>
      </div>
    );
  }

  if (!setupDone) {
    return (
      <div style={{
        fontFamily: "'Hiragino Sans', 'Noto Sans JP', sans-serif",
        background: "#0f172a",
        minHeight: "100vh",
        color: "#f8fafc",
        maxWidth: 480,
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "32px 24px",
      }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>📷</div>
          <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 6 }}>撮影管理アプリ</div>
          <div style={{ fontSize: 13, color: "#64748b" }}>初回セットアップ</div>
        </div>

        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 12, color: "#94a3b8", marginBottom: 8, fontWeight: 600 }}>
            チームデータをインポート（任意）
          </div>
          <div style={{ fontSize: 11, color: "#475569", marginBottom: 10, lineHeight: 1.6 }}>
            JSONを貼り付けてチームデータを読み込めます。<br />
            フォーマット: <span style={{ color: "#94a3b8", fontFamily: "monospace" }}>[[1,"男子","チーム名"], ...]</span>
          </div>
          <textarea
            value={setupText}
            onChange={e => setSetupText(e.target.value)}
            placeholder={'[[1,"男子","チームA"], [2,"女子","チームB"], ...]'}
            rows={6}
            style={{
              width: "100%", padding: "12px 14px", borderRadius: 12,
              border: "2px solid #334155", background: "#1e293b",
              color: "#f8fafc", fontSize: 13, fontFamily: "monospace",
              outline: "none", boxSizing: "border-box", resize: "vertical", lineHeight: 1.5,
            }}
            onFocus={e => e.target.style.borderColor = "#3b82f6"}
            onBlur={e => e.target.style.borderColor = "#334155"}
          />
          {setupMsg && (
            <div style={{
              marginTop: 8, fontSize: 12, color: "#f87171",
              background: "#1e293b", borderRadius: 10, padding: "10px 14px",
              whiteSpace: "pre-wrap", lineHeight: 1.6,
            }}>
              {setupMsg}
            </div>
          )}
        </div>

        <button
          onClick={handleSetupImport}
          disabled={!setupText.trim()}
          style={{
            width: "100%", padding: "14px", borderRadius: 12, border: "none",
            background: setupText.trim() ? "#3b82f6" : "#1e293b",
            color: setupText.trim() ? "#fff" : "#475569",
            fontSize: 15, fontWeight: 700,
            cursor: setupText.trim() ? "pointer" : "default",
            fontFamily: "inherit", marginBottom: 12,
          }}
        >
          読み込んで開始
        </button>

        <button
          onClick={handleSetupDefault}
          style={{
            width: "100%", padding: "14px", borderRadius: 12,
            border: "2px solid #334155", background: "transparent",
            color: "#64748b", fontSize: 14, fontWeight: 600,
            cursor: "pointer", fontFamily: "inherit",
          }}
        >
          デフォルトデータで開始
        </button>
        <div style={{ fontSize: 11, color: "#334155", textAlign: "center", marginTop: 8 }}>
          埋め込みの145チームのデータを使用します
        </div>
      </div>
    );
  }

  return (
    <div style={{
      fontFamily: "'Hiragino Sans', 'Noto Sans JP', sans-serif",
      background: "#0f172a",
      minHeight: "100vh",
      color: "#f8fafc",
      maxWidth: 480,
      margin: "0 auto",
      display: "flex",
      flexDirection: "column",
    }}>
      {/* Header */}
      <div style={{
        padding: "16px 20px 0",
        background: "#0f172a",
        position: "sticky",
        top: 0,
        zIndex: 10,
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <div>
            <div style={{ fontSize: 11, color: "#64748b", letterSpacing: "0.1em", textTransform: "uppercase" }}>第46回全日本大会 埼玉県大会</div>
            <div style={{ fontSize: 18, fontWeight: 700, color: "#f8fafc" }}>撮影管理</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
            <div style={{
              background: "#1e293b",
              borderRadius: 20,
              padding: "4px 14px",
              fontSize: 13,
              color: "#94a3b8",
            }}>
              <span style={{ color: "#f8fafc", fontWeight: 700 }}>{shotList.length}</span> / {teams.length}
            </div>
            {isCustomTeams && (
              <div style={{ fontSize: 10, color: "#10b981", fontWeight: 600 }}>カスタムデータ使用中</div>
            )}
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 4, marginBottom: 12, overflowX: "auto" }}>
          {TABS.map(([key, label]) => (
            <button key={key} onClick={() => setTab(key)} style={{
              flex: "0 0 auto",
              padding: "8px 12px",
              borderRadius: 10,
              border: "none",
              fontFamily: "inherit",
              fontSize: 12,
              fontWeight: 600,
              cursor: "pointer",
              background: tab === key ? "#3b82f6" : "#1e293b",
              color: tab === key ? "#fff" : "#64748b",
              transition: "all 0.15s",
              whiteSpace: "nowrap",
            }}>
              {label}{key === "list" && shotList.length > 0 ? ` (${shotList.length})` : ""}
            </button>
          ))}
        </div>

        {/* Search input */}
        {tab === "search" && (
          <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
            <div style={{ position: "relative", flex: 1 }}>
              <input
                ref={inputRef}
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder={numMode ? "番号で検索..." : "チーム名で検索..."}
                inputMode={numMode ? "numeric" : "text"}
                style={{
                  width: "100%",
                  padding: "12px 40px 12px 16px",
                  borderRadius: 12,
                  border: "2px solid #334155",
                  background: "#1e293b",
                  color: "#f8fafc",
                  fontSize: 16,
                  fontFamily: "inherit",
                  outline: "none",
                  boxSizing: "border-box",
                }}
                onFocus={e => e.target.style.borderColor = "#3b82f6"}
                onBlur={e => e.target.style.borderColor = "#334155"}
              />
              {query && (
                <button onClick={() => setQuery("")} style={{
                  position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)",
                  background: "none", border: "none", color: "#64748b", fontSize: 18, cursor: "pointer", padding: 4,
                }}>✕</button>
              )}
            </div>
            <button
              onClick={() => { setNumMode(m => !m); setQuery(""); setTimeout(() => inputRef.current?.focus(), 50); }}
              style={{
                padding: "0 14px",
                borderRadius: 12,
                border: "2px solid #334155",
                background: numMode ? "#1e293b" : "#3b82f6",
                color: numMode ? "#64748b" : "#fff",
                fontSize: 13,
                fontWeight: 700,
                cursor: "pointer",
                fontFamily: "inherit",
                whiteSpace: "nowrap",
              }}
            >
              {numMode ? "あ" : "123"}
            </button>
          </div>
        )}
      </div>

      {/* Body */}
      <div style={{ flex: 1, padding: "0 20px 20px", overflowY: "auto" }}>

        {/* 検索タブ */}
        {tab === "search" && (
          <>
            {query.trim() === "" && (
              <div style={{ textAlign: "center", padding: "60px 0", color: "#334155" }}>
                <div style={{ fontSize: 40, marginBottom: 12 }}>📷</div>
                <div style={{ fontSize: 14 }}>番号を入力してチームを検索</div>
              </div>
            )}
            {query.trim() !== "" && filtered.length === 0 && (
              <div style={{ textAlign: "center", padding: "40px 0", color: "#475569", fontSize: 14 }}>
                該当なし
              </div>
            )}
            <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 4 }}>
              {filtered.map(([num, div, name]) => {
                const key = `${num}-${div}`;
                const done = shotIds.has(key);
                return (
                  <button
                    key={key}
                    onClick={() => addTeam([num, div, name])}
                    disabled={done}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      padding: "14px 16px",
                      borderRadius: 14,
                      border: done ? "2px solid #1e293b" : "2px solid #334155",
                      background: done ? "#0f172a" : "#1e293b",
                      cursor: done ? "default" : "pointer",
                      textAlign: "left",
                      opacity: done ? 0.4 : 1,
                      transition: "all 0.15s",
                    }}
                  >
                    <div style={{
                      minWidth: 44,
                      height: 44,
                      borderRadius: 10,
                      background: DIV_BG[div] ?? "#f1f5f9",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                    }}>
                      <div style={{ fontSize: 15, fontWeight: 800, color: DIV_COLOR[div] ?? "#334155", lineHeight: 1 }}>{num}</div>
                      <div style={{ fontSize: 9, color: DIV_COLOR[div] ?? "#334155", fontWeight: 600, marginTop: 2 }}>{div}</div>
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 14, fontWeight: 600, color: done ? "#475569" : "#f1f5f9" }}>{name}</div>
                    </div>
                    {done && <div style={{ fontSize: 18 }}>✅</div>}
                    {!done && <div style={{ fontSize: 20, color: "#3b82f6" }}>＋</div>}
                  </button>
                );
              })}
            </div>
          </>
        )}

        {/* 撮影済みタブ */}
        {tab === "list" && (
          <>
            {shotList.length === 0 ? (
              <div style={{ textAlign: "center", padding: "60px 0", color: "#334155" }}>
                <div style={{ fontSize: 40, marginBottom: 12 }}>📋</div>
                <div style={{ fontSize: 14 }}>まだ撮影済みチームがありません</div>
              </div>
            ) : (
              <>
                <div style={{ fontSize: 12, color: "#475569", marginBottom: 12, marginTop: 4 }}>
                  撮影順 — タップで取り消し
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  {shotList.map(([num, div, name], idx) => (
                    <button
                      key={`${num}-${div}`}
                      onClick={() => removeTeam(`${num}-${div}`)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        padding: "12px 14px",
                        borderRadius: 12,
                        border: "none",
                        background: "#1e293b",
                        cursor: "pointer",
                        textAlign: "left",
                      }}
                    >
                      <div style={{
                        minWidth: 24,
                        fontSize: 12,
                        color: "#475569",
                        fontWeight: 700,
                        textAlign: "right",
                      }}>{idx + 1}</div>
                      <div style={{
                        minWidth: 38,
                        height: 38,
                        borderRadius: 8,
                        background: DIV_BG[div] ?? "#f1f5f9",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                      }}>
                        <div style={{ fontSize: 13, fontWeight: 800, color: DIV_COLOR[div] ?? "#334155", lineHeight: 1 }}>{num}</div>
                        <div style={{ fontSize: 8, color: DIV_COLOR[div] ?? "#334155", fontWeight: 600, marginTop: 1 }}>{div}</div>
                      </div>
                      <div style={{ flex: 1, fontSize: 13, fontWeight: 600, color: "#cbd5e1" }}>{name}</div>
                      <div style={{ fontSize: 16, color: "#ef4444", opacity: 0.6 }}>✕</div>
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => { if (window.confirm("リストを全部クリアしますか？")) setShotList([]); }}
                  style={{
                    width: "100%",
                    marginTop: 20,
                    padding: "12px",
                    borderRadius: 12,
                    border: "2px solid #334155",
                    background: "transparent",
                    color: "#ef4444",
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: "pointer",
                    fontFamily: "inherit",
                  }}
                >
                  リストをクリア
                </button>
              </>
            )}
          </>
        )}

        {/* 報告書タブ */}
        {tab === "report" && (
          <div style={{ paddingTop: 8 }}>
            {shotList.length === 0 ? (
              <div style={{ textAlign: "center", padding: "60px 0", color: "#334155" }}>
                <div style={{ fontSize: 40, marginBottom: 12 }}>📄</div>
                <div style={{ fontSize: 14 }}>撮影済みチームがありません</div>
              </div>
            ) : (
              <>
                <div style={{ fontSize: 12, color: "#475569", marginBottom: 16, marginTop: 4, lineHeight: 1.7 }}>
                  GASスクリプトをコピーして、PCのスプレッドシートのスクリプトエディタに貼り付けて実行してください。
                </div>
                <button
                  onClick={handleGasCopy}
                  style={{
                    width: "100%", padding: "18px", borderRadius: 14,
                    border: "none",
                    background: "linear-gradient(135deg, #10b981, #3b82f6)",
                    color: "#fff",
                    fontSize: 16, fontWeight: 700,
                    cursor: "pointer",
                    fontFamily: "inherit", marginBottom: 8,
                  }}
                >
                  📊 GASをコピー
                </button>
                <button
                  onClick={handleSendToClaude}
                  style={{
                    width: "100%", padding: "14px", borderRadius: 14,
                    border: "none",
                    background: "linear-gradient(135deg, #f97316, #ec4899)",
                    color: "#fff",
                    fontSize: 14, fontWeight: 700,
                    cursor: "pointer",
                    fontFamily: "inherit", marginBottom: 4,
                  }}
                >
                  ⭐️ Claudeに送るプロンプトをコピー
                </button>
                <div style={{ fontSize: 11, color: "#475569", textAlign: "center", marginBottom: 8 }}>
                  Claudeのチャットに貼り付けて使用
                </div>
              </>
            )}
            {copyMsg && (
              <div style={{ marginTop: 8, fontSize: 13, textAlign: "center", color: "#94a3b8" }}>
                {copyMsg}
              </div>
            )}
          </div>
        )}

        {/* インポートタブ */}
        {tab === "import" && (
          <div style={{ paddingTop: 8 }}>
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 12, color: "#94a3b8", marginBottom: 4, fontWeight: 600 }}>
                📥 チームデータのインポート
              </div>
              <div style={{ fontSize: 11, color: "#475569", marginBottom: 12, lineHeight: 1.6 }}>
                JSONを貼り付けてチームデータを読み込みます。<br />
                フォーマット: <span style={{ color: "#94a3b8", fontFamily: "monospace" }}>[[1,"男子","チーム名"], ...]</span>
              </div>

              <textarea
                value={importText}
                onChange={e => setImportText(e.target.value)}
                placeholder={'[[1,"男子","チームA"], [2,"女子","チームB"], ...]'}
                rows={8}
                style={{
                  width: "100%", padding: "12px 14px", borderRadius: 12,
                  border: "2px solid #334155", background: "#1e293b",
                  color: "#f8fafc", fontSize: 13, fontFamily: "monospace",
                  outline: "none", boxSizing: "border-box", marginBottom: 8,
                  resize: "vertical", lineHeight: 1.5,
                }}
                onFocus={e => e.target.style.borderColor = "#3b82f6"}
                onBlur={e => e.target.style.borderColor = "#334155"}
              />

              <button
                onClick={handleImport}
                disabled={!importText.trim()}
                style={{
                  width: "100%", padding: "13px", borderRadius: 12,
                  border: "none",
                  background: importText.trim() ? "#3b82f6" : "#1e293b",
                  color: importText.trim() ? "#fff" : "#475569",
                  fontSize: 14, fontWeight: 700,
                  cursor: importText.trim() ? "pointer" : "default",
                  fontFamily: "inherit", marginBottom: 8,
                }}
              >
                読み込む
              </button>

              {importMsg && (
                <div style={{
                  marginBottom: 12, fontSize: 12, color: "#94a3b8",
                  background: "#1e293b", borderRadius: 10, padding: "10px 14px",
                  whiteSpace: "pre-wrap", lineHeight: 1.6,
                }}>
                  {importMsg}
                </div>
              )}

              <div style={{ fontSize: 11, color: "#475569", marginTop: 8, marginBottom: 16 }}>
                現在のデータ: <span style={{ color: "#10b981", fontWeight: 600 }}>{teams.length}チーム</span>
              </div>

              {isCustomTeams && (
                <div style={{ borderTop: "1px solid #1e293b", paddingTop: 16 }}>
                  <div style={{ fontSize: 12, color: "#94a3b8", marginBottom: 8, fontWeight: 600 }}>
                    🔗 データ入りURLをコピー
                  </div>
                  <div style={{ fontSize: 11, color: "#475569", marginBottom: 8, lineHeight: 1.6 }}>
                    このURLを開くと現在のチームデータが自動でインポートされます
                  </div>
                  <button
                    onClick={async () => {
                      const url = window.location.href;
                      try {
                        await navigator.clipboard.writeText(url);
                        setImportMsg("✅ URLをコピーしました");
                      } catch {
                        setImportMsg("❌ コピー失敗");
                      }
                      setTimeout(() => setImportMsg(""), 2000);
                    }}
                    style={{
                      width: "100%", padding: "12px", borderRadius: 12,
                      border: "2px solid #334155", background: "transparent",
                      color: "#f8fafc", fontSize: 13, fontWeight: 600,
                      cursor: "pointer", fontFamily: "inherit",
                    }}
                  >
                    🔗 URLをコピー
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
