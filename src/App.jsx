import { useState, useEffect, useCallback } from "react";

// ─── IMAGES ──────────────────────────────────────────────────────────────────
const IMGS = {
  iphone:    "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=700&q=90&fit=crop",
  samsung:   "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=700&q=90&fit=crop",
  pixel:     "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=700&q=90&fit=crop",
  ipad:      "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=700&q=90&fit=crop",
  galaxytab: "https://images.unsplash.com/photo-1589739900243-4b52cd9b104e?w=700&q=90&fit=crop",
  pixeltab:  "https://images.unsplash.com/photo-1561154464-82e9adf32764?w=700&q=90&fit=crop",
  macbook:   "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=700&q=90&fit=crop",
  thinkpad:  "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=700&q=90&fit=crop",
  spectre:   "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=700&q=90&fit=crop",
  hero:      "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=1600&q=90&fit=crop",
  promoBg:   "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1400&q=80&fit=crop",
};

// ─── DATA ─────────────────────────────────────────────────────────────────────
const NAV_LINKS = ["Home","Phones","Tablets","Laptops","Deals","About"];

const CATS = [
  { id:"phones",      icon:"📱", label:"Phones",      count:9,  accent:"#818cf8", desc:"Flagship to mid-range"   },
  { id:"tablets",     icon:"⬛", label:"Tablets",     count:6,  accent:"#34d399", desc:"Work, play, create"      },
  { id:"laptops",     icon:"💻", label:"Laptops",     count:9,  accent:"#f472b6", desc:"Power meets portability" },
  { id:"accessories", icon:"🎧", label:"Accessories", count:24, accent:"#fb923c", desc:"Cables, cases & more"    },
];

const BADGE_CLR = {
  "Best Seller":"#f59e0b","New":"#818cf8","Editor's Pick":"#f472b6",
  "Top Rated":"#34d399","Value Pick":"#fb923c","Pro Pick":"#60a5fa",
};

const PRODUCTS = {
  phones:[
    { id:1,brand:"Apple",  name:"iPhone 16 Pro Max",  price:1199,old:1399,rating:4.9,reviews:2841,badge:"Best Seller",  img:IMGS.iphone,   accent:"#818cf8",specs:["A18 Pro Chip","48MP Fusion","ProMotion 120Hz"] },
    { id:2,brand:"Samsung",name:"Galaxy S25 Ultra",   price:1299,old:null,rating:4.8,reviews:1923,badge:"New",          img:IMGS.samsung,  accent:"#34d399",specs:["Snapdragon 8 Elite","200MP Camera","S Pen"] },
    { id:3,brand:"Google", name:"Pixel 9 Pro",        price:999, old:1099,rating:4.7,reviews:1102,badge:"Editor's Pick",img:IMGS.pixel,    accent:"#f472b6",specs:["Tensor G4 Chip","50MP Camera","7yr Updates"] },
  ],
  tablets:[
    { id:4,brand:"Apple",  name:"iPad Pro M4",        price:1099,old:1199,rating:4.9,reviews:987, badge:"Top Rated",   img:IMGS.ipad,     accent:"#818cf8",specs:["M4 Chip","Ultra Retina XDR","Apple Pencil Pro"] },
    { id:5,brand:"Samsung",name:"Galaxy Tab S9 Ultra",price:899, old:null,rating:4.7,reviews:654, badge:"New",         img:IMGS.galaxytab,accent:"#34d399",specs:["SD 8 Gen 2","14.6\" AMOLED","S Pen Included"] },
    { id:6,brand:"Google", name:"Pixel Tablet",       price:499, old:599, rating:4.5,reviews:412, badge:"Value Pick",  img:IMGS.pixeltab, accent:"#f472b6",specs:["Tensor G2","11\" LCD","Hub Mode"] },
  ],
  laptops:[
    { id:7,brand:"Apple",  name:"MacBook Pro M4",     price:1999,old:2199,rating:4.9,reviews:3201,badge:"Best Seller", img:IMGS.macbook,  accent:"#818cf8",specs:["M4 Pro Chip","16\" Liquid XDR","22hr Battery"] },
    { id:8,brand:"Lenovo", name:"ThinkPad X1 Carbon", price:1499,old:null,rating:4.8,reviews:1456,badge:"Pro Pick",    img:IMGS.thinkpad, accent:"#34d399",specs:["Core Ultra 7","14\" IPS","MIL-SPEC Build"] },
    { id:9,brand:"HP",     name:"Spectre x360",       price:1299,old:1499,rating:4.7,reviews:876, badge:"Editor's Pick",img:IMGS.spectre, accent:"#f472b6",specs:["Core i7","13.5\" OLED Touch","2-in-1 Design"] },
  ],
};

const TESTIMONIALS = [
  { name:"Sarah K.", role:"Tech Enthusiast",  text:"Fastest delivery I've experienced. My iPhone arrived the next morning, packaged immaculately with a handwritten thank-you card.", stars:5, av:"SK", accent:"#818cf8" },
  { name:"James M.", role:"Software Engineer",text:"Best prices on MacBooks I've found online — saved $200 over the Apple Store. The support team went above and beyond too.",          stars:5, av:"JM", accent:"#34d399" },
  { name:"Priya L.", role:"Digital Creator",  text:"The team walked me through the S25 vs Pixel 9 comparison in detail. No sales pitch — just genuinely useful advice.",             stars:5, av:"PL", accent:"#f472b6" },
];

const FEATURES = [
  { icon:"🚚", title:"Express Delivery", desc:"Free next-day shipping on orders over $500." },
  { icon:"🔒", title:"Secure Payments",  desc:"256-bit SSL. Card, PayPal, Apple Pay, crypto." },
  { icon:"↩️", title:"30-Day Returns",   desc:"Return within 30 days — no questions asked."  },
  { icon:"🛡️", title:"2-Year Warranty", desc:"Extended guarantee on every product we sell."  },
];

// ─── SPLASH SCREEN ───────────────────────────────────────────────────────────
function SplashScreen({ onEnter }) {
  const [exiting, setExiting] = useState(false);

  const handleEnter = () => {
    setExiting(true);
    setTimeout(onEnter, 700);
  };

  return (
    <div style={{
      position:"fixed", inset:0, zIndex:9999,
      background:"#07070f",
      display:"flex", alignItems:"center", justifyContent:"center",
      padding:24,
      animation: exiting ? "splashExit .7s cubic-bezier(.4,0,.2,1) forwards" : "splashEnter .6s ease forwards",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700;800&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@500;700&display=swap');
        @keyframes splashEnter { from{opacity:0} to{opacity:1} }
        @keyframes splashExit  { from{opacity:1;transform:scale(1)} to{opacity:0;transform:scale(1.04)} }
        @keyframes logoIn  { from{opacity:0;transform:translateY(-20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes cardIn  { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
        @keyframes blink   { 0%,100%{opacity:1} 50%{opacity:.25} }
        @keyframes scanline{ 0%{transform:translateY(-100%)} 100%{transform:translateY(100vh)} }
        @keyframes orbSpin { 0%{transform:rotate(0deg)} 100%{transform:rotate(360deg)} }
        .splash-enter-btn {
          background: linear-gradient(135deg,#818cf8,#a78bfa);
          color:#fff; border:none; border-radius:14px;
          padding:15px 40px; font-weight:800; font-size:15px;
          font-family:'Space Grotesk',sans-serif;
          cursor:pointer; letter-spacing:.04em;
          transition:all .25s; width:100%; max-width:320px;
          box-shadow: 0 8px 32px #818cf840;
        }
        .splash-enter-btn:hover { opacity:.88; transform:translateY(-2px); box-shadow:0 14px 40px #818cf855; }
        .splash-enter-btn:active { transform:translateY(0); }
        .tag-chip {
          display:inline-flex; align-items:center; gap:6px;
          background:#ffffff07; border:1px solid #ffffff10;
          border-radius:8px; padding:5px 11px;
          font-family:'JetBrains Mono',monospace; font-size:11px; color:#6060a0;
        }
      `}</style>

      {/* Background grid */}
      <div style={{ position:"absolute", inset:0, backgroundImage:"linear-gradient(#ffffff03 1px,transparent 1px),linear-gradient(90deg,#ffffff03 1px,transparent 1px)", backgroundSize:"60px 60px", pointerEvents:"none" }} />

      {/* Animated scanline */}
      <div style={{ position:"absolute", inset:0, overflow:"hidden", pointerEvents:"none" }}>
        <div style={{ position:"absolute", left:0, right:0, height:2, background:"linear-gradient(90deg,transparent,#818cf815,transparent)", animation:"scanline 5s linear infinite" }} />
      </div>

      {/* Ambient orbs */}
      <div style={{ position:"absolute", width:500, height:500, borderRadius:"50%", background:"radial-gradient(circle,#818cf810,transparent)", top:"10%", right:"5%", pointerEvents:"none", animation:"orbSpin 30s linear infinite" }} />
      <div style={{ position:"absolute", width:360, height:360, borderRadius:"50%", background:"radial-gradient(circle,#f472b808,transparent)", bottom:"10%", left:"5%", pointerEvents:"none", animation:"orbSpin 22s linear infinite reverse" }} />

      {/* Card */}
      <div style={{
        position:"relative", zIndex:1,
        background:"#0c0c1c", border:"1px solid #1e1e38",
        borderRadius:28, padding:"48px 40px",
        maxWidth:500, width:"100%",
        boxShadow:"0 40px 80px rgba(0,0,0,.7), 0 0 0 1px #818cf815",
        animation:"cardIn .6s .2s cubic-bezier(.34,1.28,.64,1) both",
        textAlign:"center",
      }}>

        {/* Logo */}
        <div style={{ animation:"logoIn .5s .1s ease both", marginBottom:28 }}>
          <div style={{ width:60, height:60, borderRadius:18, background:"linear-gradient(135deg,#818cf8,#a78bfa)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:28, margin:"0 auto 16px", boxShadow:"0 8px 28px #818cf850" }}>⚡</div>
          <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:800, fontSize:22, letterSpacing:"-.5px" }}>
            <span style={{ color:"#e4e4f8" }}>Wizzy </span>
            <span style={{ background:"linear-gradient(90deg,#818cf8,#f472b6)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>Collections</span>
          </div>
        </div>

        {/* Demo badge */}
        <div style={{ display:"inline-flex", alignItems:"center", gap:7, background:"#f59e0b15", border:"1px solid #f59e0b40", borderRadius:50, padding:"6px 16px", marginBottom:28 }}>
          <span style={{ width:7, height:7, background:"#f59e0b", borderRadius:"50%", display:"inline-block", animation:"blink 1.6s infinite" }} />
          <span style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:11, fontWeight:700, color:"#f59e0b", textTransform:"uppercase", letterSpacing:".08em" }}>Portfolio Demo</span>
        </div>

        {/* Heading */}
        <h1 style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:26, fontWeight:800, color:"#e4e4f8", letterSpacing:"-1px", lineHeight:1.2, marginBottom:16 }}>
          This is a demo website
        </h1>

        {/* Body copy */}
        <p style={{ color:"#6060a0", fontSize:14, lineHeight:1.85, marginBottom:12 }}>
          Wizzy Collections is a <strong style={{ color:"#a0a0c8", fontWeight:600 }}>front-end portfolio project</strong> built to demonstrate real-world React.js, responsive design, and UI/UX skills.
        </p>
        <p style={{ color:"#6060a0", fontSize:14, lineHeight:1.85, marginBottom:32 }}>
          Some features — including checkout, payments, and account creation — are <strong style={{ color:"#a0a0c8", fontWeight:600 }}>not functional</strong> and exist for visual purposes only.
        </p>

        {/* Tech stack chips */}
        <div style={{ display:"flex", flexWrap:"wrap", gap:8, justifyContent:"center", marginBottom:36 }}>
          {["React.js","Responsive CSS","Component Design","UI/UX","No Backend"].map(t => (
            <span key={t} className="tag-chip">{t}</span>
          ))}
        </div>

        {/* CTA */}
        <button className="splash-enter-btn" onClick={handleEnter}>
          Enter the Demo →
        </button>

        {/* Footer note */}
        <p style={{ color:"#2e2e4a", fontSize:11, marginTop:20, lineHeight:1.7 }}>
          Built by <span style={{ color:"#818cf8" }}>Duffy</span> · For CV & Portfolio use only
        </p>
      </div>
    </div>
  );
}

// ─── BREAKPOINT HOOK ─────────────────────────────────────────────────────────
function useBreakpoint() {
  const getSize = () => {
    const w = window.innerWidth;
    if (w < 480)  return "xs";   // phone portrait
    if (w < 768)  return "sm";   // phone landscape / small tablet
    if (w < 1024) return "md";   // tablet
    return "lg";                  // desktop
  };
  const [bp, setBp] = useState(getSize);
  useEffect(() => {
    const fn = () => setBp(getSize());
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);
  const isMobile = bp === "xs" || bp === "sm";
  const isTablet = bp === "md";
  const isDesktop = bp === "lg";
  return { bp, isMobile, isTablet, isDesktop };
}

// ─── HELPERS ─────────────────────────────────────────────────────────────────
const Stars = ({ n, sz = 13 }) => (
  <span style={{ color:"#f59e0b", fontSize:sz, letterSpacing:1 }}>
    {"★".repeat(n)}{"☆".repeat(5-n)}
  </span>
);

const Pill = ({ children, color="#818cf8" }) => (
  <span style={{ display:"inline-flex", alignItems:"center", gap:6, background:`${color}14`, border:`1px solid ${color}30`, borderRadius:50, padding:"5px 14px", fontSize:11, color, fontWeight:700, letterSpacing:".05em", textTransform:"uppercase" }}>
    {children}
  </span>
);

// ─── PRODUCT CARD ─────────────────────────────────────────────────────────────
function Card({ p, onAdd, onWish, wished, added, isMobile }) {
  const [hov, setHov] = useState(false);
  const [imgOk, setImgOk] = useState(true);
  const active = hov && !isMobile; // disable hover effects on touch

  return (
    <article
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background:"#0c0c1c",
        border:`1px solid ${active ? p.accent+"50" : "#18182e"}`,
        borderRadius:22,
        overflow:"hidden",
        transition:"all .35s cubic-bezier(.4,0,.2,1)",
        transform: active ? "translateY(-6px)" : "none",
        boxShadow: active ? `0 28px 56px rgba(0,0,0,.6),0 0 0 1px ${p.accent}28` : "0 4px 20px rgba(0,0,0,.4)",
        display:"flex", flexDirection:"column",
      }}
    >
      {/* IMAGE */}
      <div style={{ position:"relative", height: isMobile ? 200 : 240, overflow:"hidden", background:"#080816", flexShrink:0 }}>
        {imgOk
          ? <img src={p.img} alt={p.name} onError={() => setImgOk(false)}
              style={{ width:"100%", height:"100%", objectFit:"cover",
                transition:"transform .5s cubic-bezier(.4,0,.2,1), filter .5s",
                transform: active ? "scale(1.07)" : "scale(1)",
                filter: active ? "brightness(1.05) saturate(1.1)" : "brightness(.82) saturate(.9)" }}
            />
          : <div style={{ width:"100%", height:"100%", display:"flex", alignItems:"center", justifyContent:"center", fontSize:72, background:`radial-gradient(circle,${p.accent}15,#080816)` }}>📦</div>
        }
        <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top,#0c0c1c 0%,transparent 55%)" }} />

        <span style={{ position:"absolute", top:14, left:14, background:BADGE_CLR[p.badge]||p.accent, color:"#000", fontSize:10, fontWeight:800, padding:"4px 11px", borderRadius:50, fontFamily:"'Space Grotesk',sans-serif", letterSpacing:".05em" }}>
          {p.badge}
        </span>

        <button onClick={e => { e.stopPropagation(); onWish(p.id); }} style={{
          position:"absolute", top:12, right:12,
          background: wished ? "#ff205528" : "rgba(0,0,0,.45)",
          backdropFilter:"blur(8px)", border:`1px solid ${wished ? "#ff2055" : "rgba(255,255,255,.12)"}`,
          borderRadius:11, width:38, height:38, cursor:"pointer", fontSize:17,
          display:"flex", alignItems:"center", justifyContent:"center", transition:"all .2s",
        }}>{wished ? "❤️" : "🤍"}</button>

        {p.old && (
          <span style={{ position:"absolute", bottom:14, right:14, background:"rgba(255,32,85,.15)", border:"1px solid rgba(255,32,85,.4)", backdropFilter:"blur(8px)", color:"#ff7070", fontSize:11, fontWeight:700, padding:"4px 10px", borderRadius:9 }}>
            Save ${p.old - p.price}
          </span>
        )}
      </div>

      {/* BODY */}
      <div style={{ padding: isMobile ? "16px 18px 18px" : "20px 22px 22px", flex:1, display:"flex", flexDirection:"column" }}>
        <div style={{ color:p.accent, fontSize:10, fontWeight:800, letterSpacing:".14em", textTransform:"uppercase", marginBottom:5, fontFamily:"'Space Grotesk',sans-serif" }}>{p.brand}</div>
        <h3 style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:700, fontSize: isMobile ? 15 : 17, color:"#e4e4f8", lineHeight:1.3, marginBottom:12 }}>{p.name}</h3>

        <div style={{ display:"flex", flexWrap:"wrap", gap:5, marginBottom:12 }}>
          {p.specs.map(s => (
            <span key={s} style={{ background:"#ffffff07", border:"1px solid #ffffff0f", borderRadius:6, padding:"3px 8px", fontSize:10, color:"#6868a0", fontFamily:"'JetBrains Mono',monospace" }}>{s}</span>
          ))}
        </div>

        <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:16 }}>
          <Stars n={Math.floor(p.rating)} />
          <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:11, color:"#6868a0" }}>
            {p.rating} <span style={{ color:"#36364e" }}>· {p.reviews.toLocaleString()}</span>
          </span>
        </div>

        <div style={{ marginTop:"auto" }}>
          <div style={{ display:"flex", alignItems:"flex-end", gap:9, marginBottom:14 }}>
            <span style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize: isMobile ? 24 : 28, fontWeight:800, color:"#e4e4f8", lineHeight:1 }}>${p.price.toLocaleString()}</span>
            {p.old && <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:13, color:"#36364e", textDecoration:"line-through", paddingBottom:2 }}>${p.old.toLocaleString()}</span>}
          </div>

          <button onClick={() => onAdd(p)} style={{
            width:"100%", background: added ? "linear-gradient(135deg,#34d399,#059669)" : `linear-gradient(135deg,${p.accent},${p.accent}bb)`,
            color: added ? "#fff" : "#07070f", border:"none", borderRadius:13,
            padding:"13px 0", fontWeight:800, fontSize:13,
            fontFamily:"'Space Grotesk',sans-serif", cursor:"pointer", letterSpacing:".04em",
            transition:"all .28s", boxShadow: added ? "none" : `0 6px 24px ${p.accent}44`,
          }}>
            {added ? "✓  Added to Cart" : "Add to Cart"}
          </button>
        </div>
      </div>
    </article>
  );
}

// ─── HAMBURGER ICON ──────────────────────────────────────────────────────────
const Hamburger = ({ open, onClick }) => (
  <button onClick={onClick} aria-label="Toggle menu" style={{ background:"#ffffff09", border:"1px solid #18182e", borderRadius:11, width:42, height:42, cursor:"pointer", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:5, padding:10, flexShrink:0 }}>
    {[0,1,2].map(i => (
      <span key={i} style={{
        display:"block", width: i===1 && open ? 0 : 22, height:2, background:"#e4e4f8", borderRadius:2,
        transition:"all .3s",
        transform: open ? (i===0 ? "rotate(45deg) translate(5px,5px)" : i===2 ? "rotate(-45deg) translate(5px,-5px)" : "none") : "none",
        opacity: i===1 && open ? 0 : 1,
      }} />
    ))}
  </button>
);

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
function SiteApp() {
  const { isMobile, isTablet, isDesktop } = useBreakpoint();
  const isSmallScreen = isMobile || isTablet;

  const [tab,        setTab]        = useState("phones");
  const [cart,       setCart]       = useState([]);
  const [wish,       setWish]       = useState([]);
  const [drawerOpen, setDO]         = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [search,     setSearch]     = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [added,      setAdded]      = useState({});
  const [toast,      setToast]      = useState(null);
  const [scrolled,   setScrolled]   = useState(false);
  const [wordIdx,    setWordIdx]    = useState(0);

  const heroWords = ["Phones.", "Tablets.", "Laptops.", "Tomorrow."];

  useEffect(() => {
    const t = setInterval(() => setWordIdx(i => (i+1) % heroWords.length), 2600);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // Lock body scroll when drawers open
  useEffect(() => {
    document.body.style.overflow = (drawerOpen || mobileMenu) ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [drawerOpen, mobileMenu]);

  const flash = msg => { setToast(msg); setTimeout(() => setToast(null), 2600); };

  const addToCart = p => {
    setCart(prev => {
      const ex = prev.find(x => x.id === p.id);
      return ex ? prev.map(x => x.id===p.id ? {...x,qty:x.qty+1} : x) : [...prev, {...p,qty:1}];
    });
    setAdded(a => ({...a,[p.id]:true}));
    setTimeout(() => setAdded(a => { const n={...a}; delete n[p.id]; return n; }), 1600);
    flash(`${p.name} added to cart`);
  };

  const toggleWish = id => {
    const p = Object.values(PRODUCTS).flat().find(x => x.id===id);
    setWish(prev => prev.includes(id) ? prev.filter(x=>x!==id) : [...prev,id]);
    if (!wish.includes(id)) flash(`${p?.name} saved ❤️`);
  };

  const removeFromCart = id => setCart(p => p.filter(x=>x.id!==id));
  const changeQty = (id,delta) => setCart(p => p.map(x => x.id===id ? {...x,qty:Math.max(1,x.qty+delta)} : x));

  const cartCount = cart.reduce((s,p)=>s+p.qty,0);
  const cartTotal = cart.reduce((s,p)=>s+p.price*p.qty,0);
  const allP      = Object.values(PRODUCTS).flat();
  const shown     = search.trim()
    ? allP.filter(p=>[p.name,p.brand].join(" ").toLowerCase().includes(search.toLowerCase()))
    : PRODUCTS[tab];

  // Responsive helpers
  const px  = isMobile ? 20 : isTablet ? 32 : 40;   // horizontal padding
  const maxW = 1320;
  const sectionPy = isMobile ? 64 : 96;

  return (
    <div style={{ fontFamily:"'Inter',sans-serif", background:"#07070f", minHeight:"100vh", color:"#e4e4f8", overflowX:"hidden" }}>

      {/* ══ GLOBAL STYLES ══════════════════════════════════════════════════════ */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700;800&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@500;700&display=swap');
        *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
        ::-webkit-scrollbar { width:4px; }
        ::-webkit-scrollbar-thumb { background:#18182e; border-radius:4px; }
        html { scroll-behavior:smooth; }
        input, button { font-family:inherit; }

        .nlink { background:none; border:none; color:#6060a0; font-size:15px; font-weight:500; padding:12px 16px; border-radius:10px; cursor:pointer; transition:all .2s; display:block; width:100%; text-align:left; }
        .nlink:hover, .nlink.active { color:#e4e4f8; background:#ffffff09; }

        .tab { background:transparent; border:1px solid #18182e; color:#6060a0; padding:9px 20px; border-radius:50px; cursor:pointer; font-size:13px; font-weight:600; font-family:'Space Grotesk',sans-serif; transition:all .25s; white-space:nowrap; }
        .tab:hover { border-color:#818cf8; color:#818cf8; }
        .tab.on { background:#818cf8; border-color:#818cf8; color:#07070f; }

        .sbox { background:#ffffff09; border:1px solid #18182e; border-radius:12px; padding:11px 16px 11px 42px; color:#e4e4f8; font-size:14px; font-family:'Inter',sans-serif; outline:none; width:100%; transition:all .25s; }
        .sbox:focus { border-color:#818cf855; background:#ffffff0e; box-shadow:0 0 0 3px #818cf813; }
        .sbox::placeholder { color:#36364e; }

        .cbtn { background:#ffffff09; border:1px solid #18182e; border-radius:12px; padding:9px 14px; color:#e4e4f8; cursor:pointer; font-size:18px; position:relative; transition:all .2s; line-height:1; }
        .cbtn:hover { background:#ffffff12; border-color:#818cf840; }

        .qbtn { background:#18182e; border:none; color:#e4e4f8; width:34px; height:34px; border-radius:9px; cursor:pointer; font-size:16px; transition:background .2s; display:flex; align-items:center; justify-content:center; }
        .qbtn:hover { background:#818cf8; color:#07070f; }

        .pbtn { background:linear-gradient(135deg,#818cf8,#a78bfa); color:#fff; border:none; border-radius:13px; padding:14px 32px; font-weight:800; font-size:14px; font-family:'Space Grotesk',sans-serif; cursor:pointer; transition:all .22s; letter-spacing:.03em; }
        .pbtn:hover { opacity:.88; transform:translateY(-1px); box-shadow:0 8px 28px #818cf840; }
        .pbtn:active { transform:translateY(0); opacity:1; }

        .gbtn { background:transparent; color:#e4e4f8; border:1px solid #18182e; border-radius:13px; padding:14px 32px; font-size:14px; cursor:pointer; font-family:'Space Grotesk',sans-serif; font-weight:600; transition:all .22s; }
        .gbtn:hover { border-color:#818cf840; background:#ffffff08; }

        .flink { color:#36364e; text-decoration:none; font-size:13px; display:block; margin-bottom:12px; transition:color .2s; }
        .flink:hover { color:#818cf8; }

        .soc { width:40px; height:40px; border-radius:11px; background:#ffffff07; border:1px solid #18182e; display:inline-flex; align-items:center; justify-content:center; cursor:pointer; transition:all .22s; font-size:14px; text-decoration:none; color:#6060a0; }
        .soc:hover { border-color:#818cf8; color:#818cf8; background:#818cf812; }

        @keyframes fadeUp   { from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)} }
        @keyframes fadeIn   { from{opacity:0}to{opacity:1} }
        @keyframes wordCyc  { 0%{opacity:0;transform:translateY(14px)}12%{opacity:1;transform:translateY(0)}85%{opacity:1;transform:translateY(0)}100%{opacity:0;transform:translateY(-14px)} }
        @keyframes toastPop { from{opacity:0;transform:translateX(20px) scale(.96)}to{opacity:1;transform:translateX(0) scale(1)} }
        @keyframes pulse    { 0%,100%{opacity:1}50%{opacity:.3} }
        @keyframes orb1     { 0%,100%{transform:translate(0,0)}50%{transform:translate(50px,-35px)} }
        @keyframes orb2     { 0%,100%{transform:translate(0,0)}50%{transform:translate(-38px,28px)} }
        @keyframes slideDown{ from{opacity:0;transform:translateY(-12px)}to{opacity:1;transform:translateY(0)} }

        .aFadeUp   { animation:fadeUp   .45s ease forwards; }
        .aFadeIn   { animation:fadeIn   .3s  ease forwards; }
        .aWordCyc  { animation:wordCyc  2.6s ease infinite; }
        .aToast    { animation:toastPop .3s  cubic-bezier(.34,1.56,.64,1) forwards; }
        .aSlideDown{ animation:slideDown .3s ease forwards; }
      `}</style>

      {/* ══ TOAST ══════════════════════════════════════════════════════════════ */}
      {toast && (
        <div className="aToast" style={{
          position:"fixed", bottom: isMobile ? 80 : 28, right: isMobile ? 16 : 28,
          left: isMobile ? 16 : "auto", zIndex:1000,
          background:"#111128", border:"1px solid #818cf840",
          borderRadius:14, padding:"13px 20px", fontSize:13, fontWeight:600, color:"#e4e4f8",
          boxShadow:"0 16px 48px rgba(0,0,0,.65)",
          display:"flex", alignItems:"center", gap:12,
          backdropFilter:"blur(12px)",
        }}>
          <span style={{ width:24,height:24,borderRadius:7,background:"#34d39920",border:"1px solid #34d39950",display:"flex",alignItems:"center",justifyContent:"center",color:"#34d399",fontSize:12,flexShrink:0 }}>✓</span>
          {toast}
        </div>
      )}

      {/* ══ NAVBAR ═════════════════════════════════════════════════════════════ */}
      <header style={{
        position:"fixed", top:0, left:0, right:0, zIndex:300,
        background: scrolled || mobileMenu ? "rgba(7,7,15,0.96)" : "transparent",
        backdropFilter: scrolled || mobileMenu ? "blur(28px)" : "none",
        borderBottom: scrolled || mobileMenu ? "1px solid rgba(255,255,255,.06)" : "1px solid transparent",
        transition:"background .35s, border-color .35s",
        padding:`0 ${px}px`,
      }}>
        <div style={{ maxWidth:maxW, margin:"0 auto", display:"flex", alignItems:"center", justifyContent:"space-between", height:64 }}>

          {/* Logo */}
          <a href="#" style={{ display:"flex", alignItems:"center", gap:10, textDecoration:"none", flexShrink:0 }}>
            <div style={{ width:36,height:36,borderRadius:11,background:"linear-gradient(135deg,#818cf8,#a78bfa)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,boxShadow:"0 4px 16px #818cf840" }}>⚡</div>
            <span style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:800, fontSize: isMobile ? 16 : 18, letterSpacing:"-.6px" }}>
              <span style={{ color:"#e4e4f8" }}>Wizzy </span>
              <span style={{ background:"linear-gradient(90deg,#818cf8,#f472b6)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>Collections</span>
            </span>
          </a>

          {/* Desktop nav */}
          {isDesktop && (
            <nav style={{ display:"flex", gap:2 }}>
              {NAV_LINKS.map((l,i) => (
                <button key={l} className={`nlink${i===0?" active":""}`} style={{ padding:"7px 14px", fontSize:13.5, width:"auto" }}>{l}</button>
              ))}
            </nav>
          )}

          {/* Right controls */}
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>

            {/* Desktop search */}
            {isDesktop && (
              <div style={{ position:"relative" }}>
                <span style={{ position:"absolute", left:12, top:"50%", transform:"translateY(-50%)", color:"#36364e", fontSize:13, pointerEvents:"none" }}>🔍</span>
                <input className="sbox" placeholder="Search gadgets…" value={search} onChange={e=>setSearch(e.target.value)} style={{ width:220 }} />
              </div>
            )}

            {/* Mobile search toggle */}
            {isSmallScreen && (
              <button className="cbtn" onClick={() => setSearchOpen(o=>!o)} aria-label="Search" style={{ fontSize:16 }}>🔍</button>
            )}

            {/* Cart */}
            <button className="cbtn" onClick={() => setDO(true)} aria-label="Cart">
              🛒
              {cartCount > 0 && (
                <span style={{ position:"absolute",top:-7,right:-7,background:"linear-gradient(135deg,#818cf8,#f472b6)",color:"#fff",borderRadius:"50%",width:20,height:20,fontSize:10,fontWeight:800,display:"flex",alignItems:"center",justifyContent:"center" }}>{cartCount}</span>
              )}
            </button>

            {/* Hamburger (mobile/tablet) */}
            {isSmallScreen && <Hamburger open={mobileMenu} onClick={() => setMobileMenu(o=>!o)} />}
          </div>
        </div>

        {/* Mobile search bar */}
        {isSmallScreen && searchOpen && (
          <div className="aSlideDown" style={{ padding:`10px ${px}px 14px`, borderTop:"1px solid #18182e" }}>
            <div style={{ position:"relative" }}>
              <span style={{ position:"absolute", left:14, top:"50%", transform:"translateY(-50%)", color:"#36364e", fontSize:14, pointerEvents:"none" }}>🔍</span>
              <input className="sbox" placeholder="Search gadgets…" value={search} onChange={e=>setSearch(e.target.value)} autoFocus style={{ paddingLeft:44 }} />
            </div>
          </div>
        )}

        {/* Mobile menu */}
        {isSmallScreen && mobileMenu && (
          <div className="aSlideDown" style={{ borderTop:"1px solid #18182e", padding:`8px ${px}px 20px` }}>
            {NAV_LINKS.map(l => (
              <button key={l} className="nlink" onClick={() => setMobileMenu(false)}>{l}</button>
            ))}
            <div style={{ marginTop:16, paddingTop:16, borderTop:"1px solid #18182e", display:"flex", gap:8 }}>
              {[["𝕏","Twitter"],["in","LinkedIn"],["▶","YouTube"],["📸","Instagram"]].map(([ic,label]) => (
                <a key={label} href="#" className="soc" aria-label={label}>{ic}</a>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* ══ CART DRAWER ════════════════════════════════════════════════════════ */}
      {drawerOpen && (
        <div style={{ position:"fixed",inset:0,zIndex:500 }} className="aFadeIn">
          <div onClick={() => setDO(false)} style={{ position:"absolute",inset:0,background:"rgba(0,0,0,.82)",backdropFilter:"blur(8px)" }} />
          <div className="aFadeUp" style={{
            position:"absolute", right:0, top:0, bottom:0,
            width: isMobile ? "100%" : isTablet ? 420 : 440,
            background:"#0a0a1a", borderLeft: isMobile ? "none" : "1px solid #18182e",
            display:"flex", flexDirection:"column",
          }}>
            <div style={{ padding:"20px 24px", borderBottom:"1px solid #18182e", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
              <div>
                <h2 style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:19, fontWeight:800 }}>Your Cart</h2>
                <p style={{ color:"#36364e", fontSize:12, marginTop:3 }}>{cartCount} {cartCount===1?"item":"items"}</p>
              </div>
              <button onClick={() => setDO(false)} style={{ background:"#ffffff09",border:"1px solid #18182e",color:"#6060a0",borderRadius:10,width:38,height:38,cursor:"pointer",fontSize:16,display:"flex",alignItems:"center",justifyContent:"center" }}>✕</button>
            </div>

            {cart.length === 0 ? (
              <div style={{ flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",color:"#36364e",gap:18,padding:40 }}>
                <div style={{ width:80,height:80,borderRadius:22,background:"#18182e",display:"flex",alignItems:"center",justifyContent:"center",fontSize:36 }}>🛒</div>
                <div style={{ textAlign:"center" }}>
                  <p style={{ fontSize:16,fontWeight:600,color:"#6060a0",marginBottom:6 }}>Cart is empty</p>
                  <p style={{ fontSize:13,color:"#36364e",lineHeight:1.6 }}>Add something from the store.</p>
                </div>
                <button onClick={() => setDO(false)} className="pbtn">Continue Shopping</button>
              </div>
            ) : (
              <>
                <div style={{ flex:1,overflowY:"auto",padding:"8px 24px" }}>
                  {cart.map(item => (
                    <div key={item.id} style={{ display:"flex",gap:14,alignItems:"center",padding:"16px 0",borderBottom:"1px solid #18182e" }}>
                      <div style={{ width:56,height:56,borderRadius:13,overflow:"hidden",background:"#18182e",flexShrink:0 }}>
                        <img src={item.img} alt={item.name} style={{ width:"100%",height:"100%",objectFit:"cover" }} onError={e=>e.target.style.display="none"} />
                      </div>
                      <div style={{ flex:1,minWidth:0 }}>
                        <div style={{ fontSize:13,fontWeight:600,color:"#d0d0ee",lineHeight:1.3,marginBottom:4,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap" }}>{item.name}</div>
                        <div style={{ fontFamily:"'Space Grotesk',sans-serif",color:item.accent,fontSize:14,fontWeight:700 }}>${item.price.toLocaleString()}</div>
                      </div>
                      <div style={{ display:"flex",flexDirection:"column",alignItems:"flex-end",gap:8 }}>
                        <button onClick={() => removeFromCart(item.id)} style={{ background:"none",border:"none",color:"#36364e",cursor:"pointer",fontSize:13,padding:"2px 6px" }}>✕</button>
                        <div style={{ display:"flex",alignItems:"center",gap:6 }}>
                          <button className="qbtn" onClick={() => changeQty(item.id,-1)} style={{ width:30,height:30 }}>−</button>
                          <span style={{ fontFamily:"'JetBrains Mono',monospace",minWidth:24,textAlign:"center",fontSize:13 }}>{item.qty}</span>
                          <button className="qbtn" onClick={() => changeQty(item.id,+1)} style={{ width:30,height:30 }}>+</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{ padding:"20px 24px", borderTop:"1px solid #18182e" }}>
                  <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6 }}>
                    <span style={{ color:"#6060a0",fontSize:14 }}>Subtotal</span>
                    <span style={{ fontFamily:"'Space Grotesk',sans-serif",fontSize:26,fontWeight:800 }}>${cartTotal.toLocaleString()}</span>
                  </div>
                  <p style={{ color:"#36364e",fontSize:11,marginBottom:18 }}>Shipping & taxes calculated at checkout</p>
                  <button className="pbtn" style={{ width:"100%",padding:"16px",fontSize:15 }}>Proceed to Checkout →</button>
                  <button onClick={() => setDO(false)} className="gbtn" style={{ width:"100%",padding:"13px",fontSize:13,marginTop:10 }}>Continue Shopping</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* ══ HERO ═══════════════════════════════════════════════════════════════ */}
      <section style={{ position:"relative", minHeight: isMobile ? "100svh" : "100vh", display:"flex", alignItems:"center", overflow:"hidden", paddingTop:64 }}>
        <div style={{ position:"absolute",inset:0 }}>
          <img src={IMGS.hero} alt="" style={{ width:"100%",height:"100%",objectFit:"cover",objectPosition:"center 35%",opacity:.22 }} />
          <div style={{ position:"absolute",inset:0,background:"radial-gradient(ellipse at 30% 50%,#0e0e2a 0%,#07070f 70%)" }} />
          <div style={{ position:"absolute",inset:0,background:"linear-gradient(to bottom,transparent 60%,#07070f 100%)" }} />
        </div>

        {/* Orbs — hidden on mobile to save paint */}
        {!isMobile && <>
          <div style={{ position:"absolute",width:700,height:700,borderRadius:"50%",background:"radial-gradient(circle,#818cf812,transparent)",top:-200,right:-150,animation:"orb1 16s ease-in-out infinite",pointerEvents:"none" }} />
          <div style={{ position:"absolute",width:480,height:480,borderRadius:"50%",background:"radial-gradient(circle,#f472b60d,transparent)",bottom:-100,left:-80,animation:"orb2 20s ease-in-out infinite",pointerEvents:"none" }} />
        </>}

        <div style={{ position:"absolute",inset:0,backgroundImage:"linear-gradient(#ffffff025 1px,transparent 1px),linear-gradient(90deg,#ffffff025 1px,transparent 1px)",backgroundSize:"72px 72px",pointerEvents:"none" }} />

        <div style={{ maxWidth:maxW,margin:"0 auto",padding:`80px ${px}px 60px`,position:"relative",zIndex:1,width:"100%" }}>
          <div style={{ maxWidth: isMobile ? "100%" : isTablet ? 600 : 760 }}>

            <div className="aFadeUp" style={{ marginBottom:28 }}>
              <Pill color="#818cf8">
                <span style={{ width:7,height:7,background:"#818cf8",borderRadius:"50%",display:"inline-block",animation:"pulse 2s infinite" }} />
                Free express delivery on orders over $500
              </Pill>
            </div>

            <h1 className="aFadeUp" style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:`clamp(38px,${isMobile?"11vw":"6.5vw"},86px)`, fontWeight:800, lineHeight:1.06, marginBottom:24, letterSpacing:"-2.5px", color:"#e4e4f8" }}>
              The best<br />
              <span style={{ display:"inline-block",height:"1.1em",overflow:"hidden",verticalAlign:"bottom" }}>
                <span key={wordIdx} className="aWordCyc" style={{ display:"block",background:"linear-gradient(135deg,#818cf8 30%,#f472b6 100%)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent" }}>
                  {heroWords[wordIdx]}
                </span>
              </span>
              <br />All in one place.
            </h1>

            <p className="aFadeUp" style={{ color:"#6060a0",fontSize: isMobile ? 16 : 18,lineHeight:1.8,maxWidth:540,marginBottom: isMobile ? 36 : 46 }}>
              Premium gadgets, curated for people who care about quality. Guaranteed authentic, shipped fast.
            </p>

            <div className="aFadeUp" style={{ display:"flex",gap:12,flexWrap:"wrap",marginBottom: isMobile ? 48 : 72 }}>
              <button className="pbtn" style={{ padding: isMobile ? "14px 28px":"16px 40px",fontSize: isMobile ? 14:15, flex: isMobile ? 1 : "none" }}>Shop Now →</button>
              <button className="gbtn" style={{ padding: isMobile ? "14px 28px":"16px 40px",fontSize: isMobile ? 14:15, flex: isMobile ? 1 : "none" }}>View Deals</button>
            </div>

            {/* Stats — 2-col on mobile, 4-col on desktop */}
            <div className="aFadeUp" style={{
              display:"grid",
              gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4,1fr)",
              gap: isMobile ? "24px 0" : 0,
              borderTop:"1px solid #18182e", paddingTop:36,
            }}>
              {[["10K+","Products"],["4.9 / 5","Avg Rating"],["98%","Satisfaction"],["2-day","Delivery"]].map(([v,l],i,a) => (
                <div key={l} style={{
                  paddingRight: !isMobile ? 28 : 0,
                  borderRight: !isMobile && i < a.length-1 ? "1px solid #18182e" : "none",
                  paddingLeft: !isMobile && i > 0 ? 28 : 0,
                  borderBottom: isMobile && i < 2 ? "1px solid #18182e" : "none",
                  paddingBottom: isMobile && i < 2 ? 24 : 0,
                }}>
                  <div style={{ fontFamily:"'Space Grotesk',sans-serif",fontSize: isMobile ? 22 : 26,fontWeight:800,color:"#e4e4f8",letterSpacing:"-1px" }}>{v}</div>
                  <div style={{ color:"#36364e",fontSize:12,marginTop:4,fontWeight:500 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ TRUST BAR ══════════════════════════════════════════════════════════ */}
      <section style={{ borderTop:"1px solid #18182e",borderBottom:"1px solid #18182e",background:"#08081a" }}>
        <div style={{ maxWidth:maxW,margin:"0 auto",padding:`0 ${px}px` }}>
          <div style={{
            display:"grid",
            gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4,1fr)",
          }}>
            {FEATURES.map((f,i) => (
              <div key={f.title} style={{
                padding: isMobile ? "22px 16px" : "28px 24px",
                borderRight: isMobile ? (i%2===0?"1px solid #18182e":"none") : (i<3?"1px solid #18182e":"none"),
                borderBottom: isMobile && i < 2 ? "1px solid #18182e" : "none",
                display:"flex", alignItems:"flex-start", gap:12,
              }}>
                <span style={{ fontSize: isMobile ? 20 : 22,flexShrink:0,marginTop:2 }}>{f.icon}</span>
                <div>
                  <div style={{ fontFamily:"'Space Grotesk',sans-serif",fontWeight:700,fontSize: isMobile ? 13:14,color:"#d0d0ee",marginBottom:4 }}>{f.title}</div>
                  <div style={{ color:"#36364e",fontSize:12,lineHeight:1.65 }}>{f.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CATEGORIES ═════════════════════════════════════════════════════════ */}
      <section style={{ maxWidth:maxW,margin:"0 auto",padding:`${sectionPy}px ${px}px 0` }}>
        <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginBottom:28 }}>
          <div>
            <Pill color="#818cf8">Categories</Pill>
            <h2 style={{ fontFamily:"'Space Grotesk',sans-serif",fontSize: isMobile ? 24 : 32,fontWeight:800,color:"#e4e4f8",letterSpacing:"-1px",marginTop:12 }}>
              What are you looking for?
            </h2>
          </div>
          {!isMobile && <a href="#" style={{ color:"#818cf8",fontSize:13,fontWeight:700,textDecoration:"none" }}>Browse all →</a>}
        </div>

        <div style={{
          display:"grid",
          gridTemplateColumns: isMobile ? "1fr 1fr" : isTablet ? "repeat(2,1fr)" : "repeat(4,1fr)",
          gap:14,
          paddingBottom: sectionPy,
        }}>
          {CATS.map(c => (
            <div key={c.label}
              onClick={() => { if(c.id!=="accessories"){setTab(c.id);setSearch("");window.scrollTo({top:800,behavior:"smooth"});}}}
              style={{ background:"#0c0c1c",border:"1px solid #18182e",borderRadius:20,padding: isMobile ? "20px 16px" : "24px 20px",cursor:"pointer",transition:"all .3s cubic-bezier(.4,0,.2,1)",display:"flex",flexDirection:"column",gap:12,position:"relative",overflow:"hidden" }}
              onMouseEnter={e=>{e.currentTarget.style.borderColor=c.accent+"50";e.currentTarget.style.background="#0f0f20";e.currentTarget.style.transform="translateY(-4px)";}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor="#18182e";e.currentTarget.style.background="#0c0c1c";e.currentTarget.style.transform="none";}}>
              <div style={{ position:"absolute",top:-30,right:-30,width:100,height:100,borderRadius:"50%",background:`radial-gradient(circle,${c.accent}10,transparent)`,pointerEvents:"none" }} />
              <div style={{ width:46,height:46,borderRadius:13,background:`${c.accent}14`,border:`1px solid ${c.accent}28`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22 }}>{c.icon}</div>
              <div>
                <div style={{ fontFamily:"'Space Grotesk',sans-serif",fontWeight:700,fontSize: isMobile ? 14:16,color:"#d4d4f0",marginBottom:3 }}>{c.label}</div>
                {!isMobile && <div style={{ color:"#36364e",fontSize:12,marginBottom:5 }}>{c.desc}</div>}
                <div style={{ color:"#36364e",fontSize:11,fontFamily:"'JetBrains Mono',monospace" }}>{c.count} models</div>
              </div>
              <div style={{ color:c.accent,fontSize:12,fontWeight:700,marginTop:"auto" }}>Explore →</div>
            </div>
          ))}
        </div>
      </section>

      {/* ══ PRODUCTS ═══════════════════════════════════════════════════════════ */}
      <section style={{ maxWidth:maxW,margin:"0 auto",padding:`0 ${px}px ${sectionPy}px` }}>
        <div style={{ display:"flex",justifyContent:"space-between",alignItems: isMobile ? "flex-start" : "flex-end",flexDirection: isMobile ? "column":"row",gap:16,marginBottom:36 }}>
          <div>
            <Pill color={search?"#fb923c":"#818cf8"}>{search?"Search results":"Curated selection"}</Pill>
            <h2 style={{ fontFamily:"'Space Grotesk',sans-serif",fontSize: isMobile ? 24:32,fontWeight:800,color:"#e4e4f8",letterSpacing:"-1px",marginTop:12 }}>
              {search ? `Results for "${search}"` : tab.charAt(0).toUpperCase()+tab.slice(1)}
            </h2>
          </div>
          {!search && (
            <div style={{ display:"flex",gap:8,overflowX:"auto",paddingBottom: isMobile ? 4:0,width: isMobile ? "100%":"auto" }}>
              {Object.keys(PRODUCTS).map(t => (
                <button key={t} className={`tab${tab===t?" on":""}`} onClick={() => setTab(t)}>
                  {t.charAt(0).toUpperCase()+t.slice(1)}
                </button>
              ))}
            </div>
          )}
        </div>

        {shown.length > 0 ? (
          <div style={{
            display:"grid",
            gridTemplateColumns: isMobile ? "1fr" : isTablet ? "repeat(2,1fr)" : "repeat(3,1fr)",
            gap: isMobile ? 16 : 22,
          }}>
            {shown.map(p => (
              <Card key={p.id} p={p}
                onAdd={addToCart}
                onWish={toggleWish}
                wished={wish.includes(p.id)}
                added={!!added[p.id]}
                isMobile={isMobile}
              />
            ))}
          </div>
        ) : (
          <div style={{ textAlign:"center",padding:"80px 0",color:"#36364e" }}>
            <div style={{ fontSize:52,marginBottom:18 }}>🔍</div>
            <h3 style={{ fontFamily:"'Space Grotesk',sans-serif",fontSize:18,color:"#6060a0",marginBottom:8 }}>No results found</h3>
            <p style={{ fontSize:14,maxWidth:300,margin:"0 auto",lineHeight:1.7 }}>Try a different search term or browse by category.</p>
          </div>
        )}
      </section>

      {/* ══ PROMO BANNER ═══════════════════════════════════════════════════════ */}
      <section style={{ maxWidth:maxW,margin:"0 auto",padding:`0 ${px}px ${sectionPy}px` }}>
        <div style={{ position:"relative",borderRadius: isMobile ? 20:28,overflow:"hidden" }}>
          <img src={IMGS.promoBg} alt="" style={{ position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover",opacity:.15 }} />
          <div style={{ position:"absolute",inset:0,background:"linear-gradient(135deg,#0c0c24 0%,#141428 100%)" }} />
          <div style={{ position:"absolute",right:-80,top:-80,width:340,height:340,borderRadius:"50%",background:"radial-gradient(circle,#818cf820,transparent)",pointerEvents:"none" }} />

          <div style={{ position:"relative",zIndex:1,padding: isMobile ? "36px 28px" : "60px 60px",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:28 }}>
            <div>
              <Pill color="#ff7070">⏰ Ends June 30, 2026</Pill>
              <h2 style={{ fontFamily:"'Space Grotesk',sans-serif",fontSize: isMobile ? 28 : 40,fontWeight:800,color:"#e4e4f8",letterSpacing:"-1.5px",lineHeight:1.15,margin:"18px 0 12px" }}>
                Up to 30% off<br />selected laptops.
              </h2>
              <p style={{ color:"#6060a0",fontSize: isMobile ? 14:15,maxWidth:420,lineHeight:1.75 }}>
                Mix and match across Apple, Lenovo, and HP. No code needed.
              </p>
            </div>
            <div style={{ display:"flex",flexDirection:"column",gap:10,width: isMobile ? "100%":"auto" }}>
              <button className="pbtn" style={{ padding:"16px 40px",fontSize:15,width: isMobile ? "100%":"auto" }}>Claim Offer →</button>
              <span style={{ color:"#36364e",fontSize:12,textAlign:"center" }}>No account required</span>
            </div>
          </div>
        </div>
      </section>

      {/* ══ TESTIMONIALS ═══════════════════════════════════════════════════════ */}
      <section style={{ maxWidth:maxW,margin:"0 auto",padding:`0 ${px}px ${sectionPy}px` }}>
        <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginBottom:36,flexWrap:"wrap",gap:12 }}>
          <div>
            <Pill color="#34d399">Testimonials</Pill>
            <h2 style={{ fontFamily:"'Space Grotesk',sans-serif",fontSize: isMobile ? 24:32,fontWeight:800,color:"#e4e4f8",letterSpacing:"-1px",marginTop:12 }}>
              Trusted by thousands
            </h2>
          </div>
          <div style={{ display:"flex",gap:4,alignItems:"center" }}>
            {"★★★★★".split("").map((s,i)=><span key={i} style={{ color:"#f59e0b",fontSize:18 }}>{s}</span>)}
            <span style={{ color:"#36364e",fontSize:13,marginLeft:8 }}>4.9 avg</span>
          </div>
        </div>

        <div style={{
          display:"grid",
          gridTemplateColumns: isMobile ? "1fr" : isTablet ? "repeat(2,1fr)" : "repeat(3,1fr)",
          gap: isMobile ? 14 : 18,
        }}>
          {TESTIMONIALS.map(t => (
            <div key={t.name} style={{ background:"#0a0a1a",border:"1px solid #18182e",borderRadius:22,padding: isMobile ? "22px 20px" : "28px 26px",display:"flex",flexDirection:"column" }}>
              <Stars n={t.stars} sz={15} />
              <p style={{ color:"#9898b8",fontSize:14,lineHeight:1.85,margin:"16px 0 24px",flex:1 }}>"{t.text}"</p>
              <div style={{ display:"flex",alignItems:"center",gap:13,paddingTop:18,borderTop:"1px solid #18182e" }}>
                <div style={{ width:44,height:44,borderRadius:13,background:`${t.accent}18`,border:`1px solid ${t.accent}35`,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Space Grotesk',sans-serif",fontWeight:800,fontSize:13,color:t.accent,flexShrink:0 }}>
                  {t.av}
                </div>
                <div>
                  <div style={{ fontFamily:"'Space Grotesk',sans-serif",fontWeight:700,fontSize:14,color:"#d0d0ee" }}>{t.name}</div>
                  <div style={{ color:"#36364e",fontSize:12,marginTop:3 }}>{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══ FOOTER ═════════════════════════════════════════════════════════════ */}
      <footer style={{ borderTop:"1px solid #18182e",background:"#04040e" }}>
        <div style={{
          maxWidth:maxW, margin:"0 auto", padding:`${isMobile?56:72}px ${px}px ${isMobile?48:56}px`,
          display:"grid",
          gridTemplateColumns: isMobile ? "1fr" : isTablet ? "1fr 1fr" : "2.2fr 1fr 1fr 1fr",
          gap: isMobile ? 40 : isTablet ? 40 : 52,
        }}>
          {/* Brand */}
          <div>
            <div style={{ display:"flex",alignItems:"center",gap:10,marginBottom:18 }}>
              <div style={{ width:34,height:34,borderRadius:10,background:"linear-gradient(135deg,#818cf8,#a78bfa)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:17 }}>⚡</div>
              <span style={{ fontFamily:"'Space Grotesk',sans-serif",fontWeight:800,fontSize:17,letterSpacing:"-.5px",background:"linear-gradient(90deg,#818cf8,#f472b6)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent" }}>Wizzy Collections</span>
            </div>
            <p style={{ color:"#36364e",fontSize:13,lineHeight:1.9,marginBottom:24,maxWidth:270 }}>
              Premium gadgets, guaranteed authenticity. Your trusted tech destination since 2020.
            </p>
            <div style={{ display:"flex",gap:8,marginBottom:28 }}>
              {[["𝕏","Twitter"],["in","LinkedIn"],["▶","YouTube"],["📸","Instagram"]].map(([ic,label])=>(
                <a key={label} href="#" className="soc" aria-label={label}>{ic}</a>
              ))}
            </div>
            <div style={{ color:"#36364e",fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:".1em",marginBottom:10 }}>Stay in the loop</div>
            <div style={{ display:"flex",gap:8 }}>
              <input placeholder="your@email.com"
                style={{ background:"#ffffff07",border:"1px solid #18182e",borderRadius:11,padding:"11px 14px",color:"#e4e4f8",fontSize:13,fontFamily:"'Inter',sans-serif",outline:"none",flex:1,minWidth:0 }}
                onFocus={e=>e.target.style.borderColor="#818cf855"}
                onBlur={e=>e.target.style.borderColor="#18182e"}
              />
              <button className="pbtn" style={{ padding:"11px 18px",fontSize:13,borderRadius:11,flexShrink:0 }}>Join</button>
            </div>
            <p style={{ color:"#2a2a40",fontSize:11,marginTop:10,lineHeight:1.6 }}>No spam. Unsubscribe any time.</p>
          </div>

          {/* On tablet, merge 3 link cols into 1 side */}
          {isTablet ? (
            <div style={{ display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:20 }}>
              {[
                { h:"Shop",    ls:["Phones","Tablets","Laptops","Accessories","New Arrivals","Deals"] },
                { h:"Company", ls:["About Us","Careers","Press Kit","Blog","Partners","Contact"] },
                { h:"Support", ls:["Help Center","Track Order","Returns","Warranty","Privacy","Terms"] },
              ].map(col=>(
                <div key={col.h}>
                  <h4 style={{ fontFamily:"'Space Grotesk',sans-serif",fontSize:11,color:"#6060a0",marginBottom:20,fontWeight:700,textTransform:"uppercase",letterSpacing:".12em" }}>{col.h}</h4>
                  {col.ls.map(l=><a key={l} href="#" className="flink">{l}</a>)}
                </div>
              ))}
            </div>
          ) : isMobile ? (
            /* On mobile, accordion-style 2-col grid */
            <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:32 }}>
              {[
                { h:"Shop",    ls:["Phones","Tablets","Laptops","New Arrivals"] },
                { h:"Support", ls:["Help Center","Returns","Privacy","Terms"] },
              ].map(col=>(
                <div key={col.h}>
                  <h4 style={{ fontFamily:"'Space Grotesk',sans-serif",fontSize:11,color:"#6060a0",marginBottom:16,fontWeight:700,textTransform:"uppercase",letterSpacing:".12em" }}>{col.h}</h4>
                  {col.ls.map(l=><a key={l} href="#" className="flink">{l}</a>)}
                </div>
              ))}
            </div>
          ) : (
            /* Desktop — 3 separate columns */
            [
              { h:"Shop",    ls:["Phones","Tablets","Laptops","Accessories","New Arrivals","Deals"] },
              { h:"Company", ls:["About Us","Careers","Press Kit","Blog","Partners","Contact"] },
              { h:"Support", ls:["Help Center","Track Order","Returns","Warranty","Privacy","Terms"] },
            ].map(col=>(
              <div key={col.h}>
                <h4 style={{ fontFamily:"'Space Grotesk',sans-serif",fontSize:11,color:"#6060a0",marginBottom:22,fontWeight:700,textTransform:"uppercase",letterSpacing:".12em" }}>{col.h}</h4>
                {col.ls.map(l=><a key={l} href="#" className="flink">{l}</a>)}
              </div>
            ))
          )}
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop:"1px solid #18182e",padding:`18px ${px}px`,maxWidth:maxW,margin:"0 auto",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:14 }}>
          <span style={{ color:"#1e1e36",fontSize:12 }}>© 2026 Wizzy Collections Ltd. All rights reserved.</span>
          <div style={{ display:"flex",gap:7,flexWrap:"wrap" }}>
            {["Visa","Mastercard","PayPal","Apple Pay","Google Pay"].map(m=>(
              <span key={m} style={{ color:"#2a2a40",fontSize:11,background:"#ffffff04",border:"1px solid #18182e",borderRadius:7,padding:"4px 10px",fontFamily:"'JetBrains Mono',monospace" }}>{m}</span>
            ))}
          </div>
        </div>
      </footer>

      {/* ══ MOBILE BOTTOM NAV ══════════════════════════════════════════════════ */}
      {isMobile && (
        <nav style={{ position:"fixed",bottom:0,left:0,right:0,zIndex:200,background:"rgba(7,7,15,0.96)",backdropFilter:"blur(24px)",borderTop:"1px solid #18182e",display:"flex",alignItems:"stretch",height:60 }}>
          {[
            { icon:"🏠", label:"Home"    },
            { icon:"📱", label:"Phones"  },
            { icon:"💻", label:"Laptops" },
            { icon:"🛒", label:"Cart", action:()=>setDO(true), badge:cartCount },
            { icon:"☰",  label:"Menu",   action:()=>setMobileMenu(o=>!o) },
          ].map(item => (
            <button key={item.label} onClick={item.action||undefined}
              style={{ flex:1,background:"none",border:"none",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:3,cursor:"pointer",color:"#6060a0",position:"relative",padding:"8px 4px" }}>
              <span style={{ fontSize:20 }}>{item.icon}</span>
              <span style={{ fontSize:9,fontWeight:600,fontFamily:"'Space Grotesk',sans-serif",letterSpacing:".04em" }}>{item.label}</span>
              {item.badge > 0 && (
                <span style={{ position:"absolute",top:6,right:"50%",transform:"translateX(8px)",background:"linear-gradient(135deg,#818cf8,#f472b6)",color:"#fff",borderRadius:"50%",width:17,height:17,fontSize:9,fontWeight:800,display:"flex",alignItems:"center",justifyContent:"center" }}>{item.badge}</span>
              )}
            </button>
          ))}
        </nav>
      )}

    </div>
  );
}

// ─── ROOT WRAPPER ─────────────────────────────────────────────────────────────
export default function WizzyCollections() {
  const [splashDone, setSplashDone] = useState(false);
  return splashDone
    ? <SiteApp />
    : <SplashScreen onEnter={() => setSplashDone(true)} />;
}