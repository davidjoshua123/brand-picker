import { useState, useRef, useEffect } from "react";
import originalLogo from "./assets/agencyLogo.png"; // drop the file in src/assets
// instead of importing, embed the actual logo data URI below.
// convert the attached PNG (afteryou-logo.png) to base64 (e.g. https://base64.guru)
// and paste the string after the comma in the DATA_URI constant.
// example: const DATA_URI = "data:image/png;base64,iVBORw0...";
const DATA_URI = ""; // ← paste base64 here


const GFONTS = [
  "https://fonts.googleapis.com/css2?",
  "family=Playfair+Display:ital,wght@0,400;0,700;1,400",
  "&family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400",
  "&family=Cinzel:wght@400;700",
  "&family=EB+Garamond:ital,wght@0,400;0,600;1,400",
  "&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400",
  "&family=Dancing+Script:wght@600;700",
  "&family=Great+Vibes:wght@400",
  "&family=Abril+Fatface:wght@400",
  "&family=Spectral:ital,wght@0,400;0,600;1,400",
  "&family=Bodoni+Moda:ital,wght@0,400;0,700;1,400",
  "&family=Cardo:ital,wght@0,400;1,400",
  "&family=Didact+Gothic:wght@400",
  "&family=Italiana:wght@400",
  "&family=Montserrat:wght@300;400;600;700",
  "&family=Lato:wght@300;400;700",
  "&family=Raleway:wght@300;400;600",
  "&family=Josefin+Sans:wght@300;400;600",
  "&family=Poppins:wght@300;400;600",
  "&family=Nunito:wght@300;400;700",
  "&family=Oswald:wght@400;600",
  "&family=Inter:wght@300;400;600",
  "&family=DM+Sans:wght@300;400;600",
  "&family=Source+Sans+3:wght@300;400;600",
  "&family=Work+Sans:wght@300;400;600",
  "&family=Karla:wght@300;400;700",
  "&family=Outfit:wght@300;400;600",
  "&family=Jost:wght@300;400;600",
  "&family=IBM+Plex+Sans:wght@300;400;600",
  "&display=swap"
].join("");

const G = "#2D5016";
const GM = "#3D6B2A";
const CR = "#F5F0E8";

const PALETTES = {
  feminine: [
    { id:"f1",  name:"Rose Garden",      primary:"#C17D85", bg:"#FDE8EC", accent:"#F4A5AE", text:"#5A2D33" },
    { id:"f2",  name:"Lavender Dream",   primary:"#7B6B9E", bg:"#EDE7F6", accent:"#B8A9C9", text:"#3D2F5C" },
    { id:"f3",  name:"Blush & Gold",     primary:"#C9956C", bg:"#FDF6EC", accent:"#E8B4B8", text:"#6B3D1E" },
    { id:"f4",  name:"Soft Coral",       primary:"#D4635A", bg:"#FFF0EC", accent:"#FF8C7A", text:"#5C2820" },
    { id:"f5",  name:"Dusty Rose",       primary:"#8B6565", bg:"#F9F0F0", accent:"#C4A0A0", text:"#3D2020" },
    { id:"f6",  name:"Mauve & Cream",    primary:"#8C6678", bg:"#F7F0F4", accent:"#C3A6B1", text:"#3D2030" },
    { id:"f7",  name:"Peach Blossom",    primary:"#CC7A5A", bg:"#FFF5F0", accent:"#FFBFA0", text:"#6B3020" },
    { id:"f8",  name:"Lilac Mist",       primary:"#9B72C0", bg:"#F5F0FB", accent:"#D4B8E0", text:"#3D1A6B" },
    { id:"f9",  name:"Berry & Nude",     primary:"#9B4D6E", bg:"#F8EFF4", accent:"#D4A5B8", text:"#4D1830" },
    { id:"f10", name:"Champagne Rose",   primary:"#B89080", bg:"#FDF8F5", accent:"#E8D5C4", text:"#4D2A1A" },
  ],
  masculine: [
    { id:"m1",  name:"Navy & White",     primary:"#1B3A6B", bg:"#F0F4FF", accent:"#4A6FA5", text:"#0A1A3D" },
    { id:"m2",  name:"Forest & Tan",     primary:"#2D5016", bg:"#F5F0E8", accent:"#7A9B5C", text:"#142208" },
    { id:"m3",  name:"Slate & Steel",    primary:"#2C3E50", bg:"#ECF0F1", accent:"#5D7A8A", text:"#0D1B25" },
    { id:"m4",  name:"Charcoal & Gold",  primary:"#333333", bg:"#F5F5F0", accent:"#B8962E", text:"#111111" },
    { id:"m5",  name:"Deep Teal",        primary:"#1A5276", bg:"#EAF2FF", accent:"#2E86C1", text:"#082030" },
    { id:"m6",  name:"Burgundy & Grey",  primary:"#7B1F3A", bg:"#F5F5F5", accent:"#9E7070", text:"#3D0A18" },
    { id:"m7",  name:"Midnight Blue",    primary:"#0A2342", bg:"#F0F4F8", accent:"#2C5282", text:"#040E1C" },
    { id:"m8",  name:"Olive & Cream",    primary:"#4A5240", bg:"#F5F4EF", accent:"#8B9B6B", text:"#1E2218" },
    { id:"m9",  name:"Dark Espresso",    primary:"#3C2415", bg:"#F9F5F0", accent:"#8B6345", text:"#1A0D08" },
    { id:"m10", name:"Gunmetal",         primary:"#2C2C2C", bg:"#F8F8F8", accent:"#7A7A7A", text:"#0A0A0A" },
  ],
  premium: [
    { id:"p1",  name:"Black & Gold",       primary:"#0A0A0A", bg:"#F5F0E0", accent:"#C9A84C", text:"#0A0A0A" },
    { id:"p2",  name:"Deep Emerald",       primary:"#1A3A2A", bg:"#F0F7F4", accent:"#2D7A5F", text:"#0A1F14" },
    { id:"p3",  name:"Royal Plum",         primary:"#3C1A5E", bg:"#F5F0FA", accent:"#8B4DBF", text:"#1A0830" },
    { id:"p4",  name:"Platinum & Ivory",   primary:"#707070", bg:"#FAFAF8", accent:"#C8C8BE", text:"#2A2A2A" },
    { id:"p5",  name:"Midnight Rose Gold", primary:"#1A1A2E", bg:"#FFF0EC", accent:"#C9847A", text:"#0A0A18" },
    { id:"p6",  name:"Sapphire & Cream",   primary:"#0F3460", bg:"#FDF8F5", accent:"#4A90D9", text:"#060F28" },
    { id:"p7",  name:"Onyx & Champagne",   primary:"#1C1C1E", bg:"#F8F4E8", accent:"#D4B896", text:"#0A0A0C" },
    { id:"p8",  name:"Crimson & Black",    primary:"#8B0000", bg:"#FFF8F8", accent:"#1A1A1A", text:"#3D0000" },
    { id:"p9",  name:"Bronze & Ivory",     primary:"#6B4F1A", bg:"#FFFFF0", accent:"#C4A45A", text:"#3A2808" },
    { id:"p10", name:"Cosmic Indigo",      primary:"#1B1464", bg:"#F0F0FF", accent:"#6A5ACD", text:"#0A0830" },
  ],
  minimalist: [
    { id:"n1",  name:"Pure White",         primary:"#1A1A1A", bg:"#FFFFFF", accent:"#CCCCCC", text:"#111111" },
    { id:"n2",  name:"Warm Off-White",     primary:"#2A2A2A", bg:"#FAFAF7", accent:"#B0ADA6", text:"#1A1A1A" },
    { id:"n3",  name:"Pale Sand",          primary:"#5C5347", bg:"#F7F4EE", accent:"#C4BAA8", text:"#3A3228" },
    { id:"n4",  name:"Stone & Linen",      primary:"#6B6560", bg:"#F5F2EC", accent:"#B8B0A4", text:"#2C2824" },
    { id:"n5",  name:"Ash & Snow",         primary:"#4A4A4A", bg:"#F8F8F8", accent:"#AEAEAE", text:"#222222" },
    { id:"n6",  name:"Bone & Ink",         primary:"#1C1C1C", bg:"#F4F1EB", accent:"#9A9488", text:"#0E0E0E" },
    { id:"n7",  name:"Fog & Slate",        primary:"#5A6472", bg:"#F0F2F4", accent:"#9AAAB8", text:"#1E2830" },
    { id:"n8",  name:"Cream & Charcoal",   primary:"#3A3A3A", bg:"#FBF9F5", accent:"#C0B8A8", text:"#1A1A1A" },
    { id:"n9",  name:"Birch White",        primary:"#7A7060", bg:"#FEFCF8", accent:"#C8C0B0", text:"#3A3020" },
    { id:"n10", name:"Minimal Sage",       primary:"#4A5E4A", bg:"#F4F7F4", accent:"#9CB09C", text:"#1E2E1E" },
  ],
  classic: [
    { id:"c1",  name:"Colonial Blue",      primary:"#1E3A5F", bg:"#EEF3F9", accent:"#8FAECB", text:"#0C1E35" },
    { id:"c2",  name:"Antique Gold",       primary:"#7A5C28", bg:"#FDF8EE", accent:"#C9A84C", text:"#3A2808" },
    { id:"c3",  name:"Heritage Green",     primary:"#2D4A2A", bg:"#F0F5EE", accent:"#7A9B6A", text:"#102010" },
    { id:"c4",  name:"Library Brown",      primary:"#4E3420", bg:"#F8F2EA", accent:"#9C7A54", text:"#241808" },
    { id:"c5",  name:"Classic Burgundy",   primary:"#6B1E2E", bg:"#FAF2F4", accent:"#B07080", text:"#3A0818" },
    { id:"c6",  name:"Ivory & Walnut",     primary:"#4A3520", bg:"#FBF8F2", accent:"#A08060", text:"#241808" },
    { id:"c7",  name:"Wedgwood",           primary:"#3A5A7A", bg:"#EEF4F9", accent:"#7AAAC8", text:"#14283A" },
    { id:"c8",  name:"Vintage Sage",       primary:"#4A5E40", bg:"#F2F5EE", accent:"#8CA880", text:"#1E2E18" },
    { id:"c9",  name:"Sepia & Cream",      primary:"#6B5040", bg:"#FBF6F0", accent:"#B09080", text:"#301E14" },
    { id:"c10", name:"Deep Mahogany",      primary:"#5A2818", bg:"#FAF4F0", accent:"#A07060", text:"#2A1008" },
  ],
};

const HEADING_FONTS = [
  { id:"h1",  name:"Playfair Display",   family:"'Playfair Display', serif",   vibe:"Elegant & Timeless"     },
  { id:"h2",  name:"Cormorant Garamond", family:"'Cormorant Garamond', serif", vibe:"Refined & Luxurious"    },
  { id:"h3",  name:"Cinzel",             family:"'Cinzel', serif",             vibe:"Prestige & Grandeur"    },
  { id:"h4",  name:"EB Garamond",        family:"'EB Garamond', serif",        vibe:"Classic & Trustworthy"  },
  { id:"h5",  name:"Libre Baskerville",  family:"'Libre Baskerville', serif",  vibe:"Professional & Strong"  },
  { id:"h6",  name:"Bodoni Moda",        family:"'Bodoni Moda', serif",        vibe:"Fashion-Forward"        },
  { id:"h7",  name:"Spectral",           family:"'Spectral', serif",           vibe:"Editorial & Sharp"      },
  { id:"h8",  name:"Cardo",              family:"'Cardo', serif",              vibe:"Scholarly & Calm"       },
  { id:"h9",  name:"Italiana",           family:"'Italiana', serif",           vibe:"Soft Italian Elegance"  },
  { id:"h10", name:"Abril Fatface",      family:"'Abril Fatface', serif",      vibe:"Bold & Impactful"       },
  { id:"h11", name:"Dancing Script",     family:"'Dancing Script', cursive",   vibe:"Warm & Personal"        },
  { id:"h12", name:"Great Vibes",        family:"'Great Vibes', cursive",      vibe:"Flowing & Romantic"     },
  { id:"h13", name:"Didact Gothic",      family:"'Didact Gothic', sans-serif", vibe:"Clean Minimalist"       },
];

const BODY_FONTS = [
  { id:"b1",  name:"Montserrat",       family:"'Montserrat', sans-serif",       vibe:"Clean & Modern"          },
  { id:"b2",  name:"Lato",             family:"'Lato', sans-serif",             vibe:"Friendly & Approachable" },
  { id:"b3",  name:"Raleway",          family:"'Raleway', sans-serif",          vibe:"Sleek & Contemporary"    },
  { id:"b4",  name:"Josefin Sans",     family:"'Josefin Sans', sans-serif",     vibe:"Geometric & Bold"        },
  { id:"b5",  name:"Poppins",          family:"'Poppins', sans-serif",          vibe:"Rounded & Youthful"      },
  { id:"b6",  name:"Nunito",           family:"'Nunito', sans-serif",           vibe:"Soft & Welcoming"        },
  { id:"b7",  name:"Oswald",           family:"'Oswald', sans-serif",           vibe:"Bold & Authoritative"    },
  { id:"b8",  name:"Inter",            family:"'Inter', sans-serif",            vibe:"Tech & Neutral"          },
  { id:"b9",  name:"DM Sans",          family:"'DM Sans', sans-serif",          vibe:"Editorial & Minimal"     },
  { id:"b10", name:"Source Sans 3",    family:"'Source Sans 3', sans-serif",    vibe:"Versatile & Readable"    },
  { id:"b11", name:"Work Sans",        family:"'Work Sans', sans-serif",        vibe:"Professional & Clear"    },
  { id:"b12", name:"Karla",            family:"'Karla', sans-serif",            vibe:"Casual & Precise"        },
  { id:"b13", name:"Outfit",           family:"'Outfit', sans-serif",           vibe:"Modern & Distinct"       },
  { id:"b14", name:"Jost",             family:"'Jost', sans-serif",             vibe:"Geometric & Sharp"       },
  { id:"b15", name:"IBM Plex Sans",    family:"'IBM Plex Sans', sans-serif",    vibe:"Technical & Trusted"     },
  { id:"b16", name:"Didact Gothic",    family:"'Didact Gothic', sans-serif",    vibe:"Minimalist & Plain"      },
  { id:"b17", name:"Josefin Sans",     family:"'Josefin Sans', sans-serif",     vibe:"Structured & Light"      },
];

const VIBES = [
  { id:"v1", emoji:"😊", name:"Friendly & Warm",          desc:"The neighbor everyone trusts. Casual, approachable, zero pressure.",                  tags:["Conversational","Relatable","Community"] },
  { id:"v2", emoji:"💼", name:"Professional & Polished",  desc:"Buttoned-up, sharp, reliable. Clients know you mean business.",                       tags:["Expert","Formal","Data-driven"] },
  { id:"v3", emoji:"👑", name:"Luxury & Premium",         desc:"You move in high-end markets. Everything you put out looks like a magazine.",          tags:["Exclusive","Elevated","Aspirational"] },
  { id:"v4", emoji:"🏡", name:"Local Expert",             desc:"You own your neighborhood. Hyper-local, trusted, the go-to in your zip code.",         tags:["Community","Insider","Market-savvy"] },
  { id:"v5", emoji:"✨", name:"Motivational & Inspiring", desc:"You lift people up. Buyers and sellers trust you because you believe in their dreams.", tags:["Uplifting","Empowering","Story-driven"] },
  { id:"v6", emoji:"🤝", name:"Relationship-First",       desc:"Every client is a long-term relationship. You play the long game.",                    tags:["Personal","Loyal","Referral-based"] },
];

const STEPS = ["Colors","Fonts","Your Vibe","Your Info","Preview"];

const HOUSE_IMG = "data:image/webp;base64,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";

const LOGO_URL = DATA_URI || originalLogo;

const Logo = () => (
  <img
            src={LOGO_URL}
            alt="The AfterYou Agency"
            style={{
              height: 80,
              objectFit: "contain",
              borderRadius: 0,
              background: "none",
              padding: 0,
            }}
          />
);

const MockupBanner = () => (
  <div style={{background:"#FFF8E8",border:"1.5px solid #E8C96A",borderRadius:10,padding:"10px 16px",marginBottom:22,display:"flex",alignItems:"flex-start",gap:10}}>
    <span style={{fontSize:"1.1rem",marginTop:1}}>⚠️</span>
    <div>
      <div style={{fontFamily:"'Montserrat',sans-serif",fontSize:"0.72rem",fontWeight:700,color:"#7A5500",marginBottom:2}}>This is a Mock-Up Preview</div>
      <div style={{fontFamily:"'Montserrat',sans-serif",fontSize:"0.68rem",color:"#9A6800",lineHeight:1.6}}>
        Colors, fonts, and layouts shown here are visual approximations. Once you submit your brand profile, your AfterYou team will send you <strong>final personalized samples</strong> — properly edited and production-ready by our design team.
      </div>
    </div>
  </div>
);

export default function BrandPicker() {
  const [step, setStep]         = useState(0);
  const [palId, setPalId]       = useState(null);
  const [hfId, setHfId]         = useState(null);
  const [bfId, setBfId]         = useState(null);
  const [vibeId, setVibeId]     = useState(null);
  const [name, setName]         = useState("");
  const [agTitle, setAgTitle]   = useState("");
  const [city, setCity]         = useState("");
  const [quote, setQuote]       = useState("");
  const [headshot, setHeadshot] = useState(null);
  const [companyName, setCompanyName] = useState("");
  const [companyLogo, setCompanyLogo] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [savedPayload, setSavedPayload] = useState(null);
  const [showRaw, setShowRaw]   = useState(false);
  const [copied, setCopied]     = useState(false);
  const fileRef = useRef();
  const companyLogoRef = useRef();
  // developer-only flag; requires ?raw=true in URL
  const isDev = process.env.NODE_ENV === "development";
  const query = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
  const allowRawPanel = isDev && query?.get('raw') === 'true';
  // always hide panel once submitted
  useEffect(() => {
    if (submitted) setShowRaw(false);
  }, [submitted]);

  const allPals = [
    ...PALETTES.feminine, ...PALETTES.masculine,
    ...PALETTES.premium,  ...PALETTES.minimalist, ...PALETTES.classic
  ];
  const pal = palId  ? allPals.find(p=>p.id===palId) : null;
  const hf  = hfId   ? HEADING_FONTS.find(f=>f.id===hfId) : null;
  const bf  = bfId   ? BODY_FONTS.find(f=>f.id===bfId) : null;
  const vb  = vibeId ? VIBES.find(v=>v.id===vibeId) : null;

  const canNext = () => {
    if (step===0) return !!palId;
    if (step===1) return !!hfId && !!bfId;
    if (step===2) return !!vibeId;
    if (step===3) return name.trim().length > 0;
    return true;
  };

  const handleFile = e => {
    const f = e.target.files[0]; if (!f) return;
    const r = new FileReader();
    r.onload = ev => setHeadshot(ev.target.result);
    r.readAsDataURL(f);
  };

  const handleCompanyLogo = e => {
    const f = e.target.files[0]; if (!f) return;
    const r = new FileReader();
    r.onload = ev => setCompanyLogo(ev.target.result);
    r.readAsDataURL(f);
  };

  if (submitted) return (
    <>
      <link rel="stylesheet" href={GFONTS}/>
      <div style={{minHeight:"100vh",background:CR,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"40px 24px",fontFamily:"'Montserrat',sans-serif"}}>
        <div style={{display:"flex",flexDirection:"column",alignItems:"center",marginBottom:28}}>
          <img
            src={LOGO_URL}
            alt="The AfterYou Agency"
            style={{
              height: 80,
              objectFit: "contain",
            }}
          />
        </div>
        <div style={{background:"#fff",border:`2px solid ${G}`,borderRadius:18,padding:"32px 28px",maxWidth:480,width:"100%",textAlign:"center",boxShadow:"0 12px 40px rgba(45,80,22,.12)"}}>
          <div style={{fontSize:"2.2rem",marginBottom:14}}>{"✅"}</div>
          <div style={{fontFamily:"'Playfair Display',serif",fontSize:"1.4rem",color:G,fontWeight:700,marginBottom:6,lineHeight:1.3}}>
            Personalized and consistent branding is now submitted.
          </div>
          <div style={{width:40,height:2,background:GM,margin:"0 auto 18px",borderRadius:2}}/>
          <div style={{fontSize:"0.83rem",color:"#555",lineHeight:1.85,marginBottom:20}}>
            <strong style={{color:G}}>The AfterYou Agency</strong> has received your personalized brand. We will send you final personalized post samples — it will be <strong>3 copies</strong>, and please choose which one works best for you.
          </div>
          <div style={{background:CR,borderRadius:10,padding:"14px 18px",fontSize:"0.79rem",color:"#666",lineHeight:1.75,marginBottom:22,border:`1px solid #DDD6C4`}}>
            {"📬"} For the meantime, we suggest you read our <strong style={{color:G}}>partnership manual</strong> that will be sent to your email — to enjoy all the partnership perks we have to offer.
          </div>
          <div style={{fontSize:"0.7rem",color:"#aaa",letterSpacing:1}}>Within <strong style={{color:G}}>1–2 business days</strong> {"· Check your inbox 🌿"}</div>
        </div>

        {/* Raw data panel removed from submitted screen to prevent accidental exposure. */}
        {/* Use ?raw=true earlier in the flow (dev only) if you need to view the JSON. */}
        <button onClick={()=>setSubmitted(false)} style={{marginTop:22,background:"transparent",border:`2px solid #CCC`,borderRadius:8,padding:"10px 24px",fontSize:"0.72rem",fontWeight:700,letterSpacing:1.5,textTransform:"uppercase",cursor:"pointer",color:"#999",fontFamily:"'Montserrat',sans-serif"}}>
          {"← Start Over"}
        </button>
      </div>
    </>
  );

  return (
    <>
      <link rel="stylesheet" href={GFONTS}/>
      <style>{`
        *{box-sizing:border-box;margin:0;padding:0}
        .wrap{min-height:100vh;background:${CR};font-family:'Montserrat',sans-serif}
        .hdr{background:${G};padding:14px 26px;display:flex;align-items:center;justify-content:space-between;position:sticky;top:0;z-index:100;overflow:visible;min-height:64px}
        .steps{display:flex;align-items:center;gap:4px}
        .sd{width:24px;height:24px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:0.57rem;font-weight:700;transition:all .25s;flex-shrink:0}
        .sd.active{background:${CR};color:${G}}
        .sd.done{background:${GM};color:#fff}
        .sd.idle{background:rgba(255,255,255,.15);color:rgba(255,255,255,.4)}
        .sl{width:13px;height:2px;background:rgba(255,255,255,.2);flex-shrink:0}
        .sl.done{background:${CR}}
        .body{max-width:920px;margin:0 auto;padding:32px 20px 100px}
        .stag{font-size:0.6rem;letter-spacing:3px;text-transform:uppercase;color:${GM};margin-bottom:6px;font-weight:700}
        .sh{font-family:'Playfair Display',serif;font-size:1.75rem;color:${G};margin-bottom:4px}
        .ssub{font-size:0.79rem;color:#888;margin-bottom:24px;line-height:1.65}
        .slabel{font-size:0.6rem;letter-spacing:3px;text-transform:uppercase;color:${GM};font-weight:700;margin:20px 0 10px;padding-bottom:6px;border-bottom:1.5px solid #DDD6C4}
        .pg{display:grid;grid-template-columns:repeat(5,1fr);gap:9px}
        @media(max-width:580px){.pg{grid-template-columns:repeat(2,1fr)}}
        .pc{border-radius:9px;overflow:hidden;cursor:pointer;border:3px solid transparent;transition:all .2s;box-shadow:0 2px 7px rgba(0,0,0,.07)}
        .pc:hover{transform:translateY(-2px);box-shadow:0 6px 16px rgba(0,0,0,.12)}
        .pc.sel{border-color:${G};box-shadow:0 0 0 3px rgba(45,80,22,.18)}
        .swg{display:flex;height:48px}
        .sw{flex:1}
        .pn{font-size:0.6rem;font-weight:600;padding:5px 6px;background:#fff;color:#444;text-align:center;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
        .fcols{display:grid;grid-template-columns:1fr 1fr;gap:18px}
        @media(max-width:580px){.fcols{grid-template-columns:1fr}}
        .fclabel{font-size:0.6rem;letter-spacing:3px;text-transform:uppercase;color:${G};font-weight:700;margin-bottom:9px;display:flex;align-items:center;gap:7px;flex-wrap:wrap}
        .fbadge{background:#EFF0EA;color:${G};padding:2px 7px;border-radius:9px;font-size:0.55rem;font-weight:700}
        .fgrid{display:flex;flex-direction:column;gap:6px;max-height:420px;overflow-y:auto;padding-right:4px}
        .fgrid::-webkit-scrollbar{width:3px}
        .fgrid::-webkit-scrollbar-thumb{background:#C8C0A8;border-radius:4px}
        .fc{border:2px solid #DDD6C4;border-radius:9px;padding:11px 14px;cursor:pointer;transition:all .2s;background:#fff;display:flex;justify-content:space-between;align-items:center;gap:8px;flex-shrink:0}
        .fc:hover{border-color:${GM};background:#F8F5EE}
        .fc.sel{border-color:${G};background:#EFF0EA;box-shadow:0 0 0 2px rgba(45,80,22,.14)}
        .fvibe{font-size:0.57rem;letter-spacing:2px;text-transform:uppercase;color:#bbb;margin-bottom:3px}
        .fprev{font-size:1.08rem;color:#1C1C1E;line-height:1.2}
        .ftag{font-size:0.6rem;color:#aaa;white-space:nowrap;flex-shrink:0}
        .pair-box{background:#F0EDE4;border:1.5px dashed #C8C0A8;border-radius:11px;padding:14px 17px;margin-bottom:20px}
        .pair-lbl{font-size:0.57rem;letter-spacing:2px;text-transform:uppercase;color:${GM};margin-bottom:8px;font-weight:700}
        .pair-inner{background:#fff;border:1.5px solid #E0D8C8;border-radius:8px;padding:12px 15px}
        .vg{display:grid;grid-template-columns:1fr 1fr;gap:10px}
        @media(max-width:520px){.vg{grid-template-columns:1fr}}
        .vc{border:2px solid #DDD6C4;border-radius:12px;padding:16px 14px;cursor:pointer;transition:all .2s;background:#fff}
        .vc:hover{border-color:${GM};background:#F8F5EE;transform:translateY(-1px)}
        .vc.sel{border-color:${G};background:#EFF0EA;box-shadow:0 0 0 3px rgba(45,80,22,.13)}
        .vemoji{font-size:1.4rem;margin-bottom:6px}
        .vname{font-family:'Playfair Display',serif;font-size:.93rem;color:${G};margin-bottom:4px}
        .vdesc{font-size:0.71rem;color:#666;line-height:1.5;margin-bottom:8px}
        .vtags{display:flex;flex-wrap:wrap;gap:4px}
        .vtag{font-size:0.57rem;padding:2px 8px;border-radius:20px;background:${CR};color:${GM};font-weight:600;letter-spacing:.8px;border:1px solid #C8C0A8}
        .iform{display:flex;flex-direction:column;gap:14px;max-width:500px}
        .ilbl{display:block;font-size:0.6rem;letter-spacing:2px;text-transform:uppercase;color:#999;margin-bottom:5px;font-weight:700}
        .inp{width:100%;border:2px solid #DDD6C4;border-radius:9px;padding:10px 13px;font-size:.88rem;font-family:'Montserrat',sans-serif;outline:none;color:#1C1C1E;background:#fff;transition:border .2s}
        .inp:focus{border-color:${G}}
        textarea.inp{resize:vertical;min-height:75px;line-height:1.5}
        .upbox{border:2px dashed #C8C0A8;border-radius:11px;padding:20px;text-align:center;cursor:pointer;transition:all .2s;background:#FDFAF5}
        .upbox:hover{border-color:${G}}
        .hsimg{width:78px;height:78px;border-radius:50%;object-fit:cover;border:3px solid ${G};display:block;margin:0 auto 6px}
        .hsrm{font-size:.68rem;color:${GM};cursor:pointer;text-decoration:underline;text-align:center}
        .nav{display:flex;justify-content:space-between;align-items:center;margin-top:36px}
        .btn{padding:11px 26px;border-radius:9px;font-size:.77rem;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;cursor:pointer;transition:all .2s;border:none;font-family:'Montserrat',sans-serif}
        .back{background:transparent;border:2px solid #CCC8BE;color:#999}
        .back:hover{border-color:#888;color:#444}
        .nxt{background:${G};color:${CR}}
        .nxt:disabled{background:#CCC;color:#aaa;cursor:not-allowed}
        .nxt:not(:disabled):hover{background:${GM}}
        .prev-grid{display:flex;flex-wrap:wrap;gap:22px}
        /* brand card */
        .bcard{border-radius:16px;overflow:hidden;width:310px;box-shadow:0 10px 36px rgba(0,0,0,.14)}
        .bt{padding:24px 22px 17px}
        .bhs{width:62px;height:62px;border-radius:50%;object-fit:cover;border:3px solid;margin-bottom:10px}
        .bhsph{width:62px;height:62px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:1.5rem;border:3px solid;margin-bottom:10px}
        .bname{font-size:1.1rem;font-weight:700;line-height:1.2;margin-bottom:2px}
        .btitle{font-size:.65rem;letter-spacing:2px;text-transform:uppercase;opacity:.72;margin-bottom:1px}
        .bcity{font-size:.68rem;opacity:.55}
        .bb{padding:15px 22px 22px}
        .bq{font-size:.88rem;line-height:1.6;margin-bottom:12px;font-style:italic}
        .bcta{display:inline-block;padding:8px 17px;border-radius:7px;font-size:.62rem;font-weight:700;letter-spacing:2px;text-transform:uppercase}
        /* house post */
        .hpost{border-radius:16px;overflow:hidden;width:310px;box-shadow:0 10px 36px rgba(0,0,0,.13)}
        .hpost-img{position:relative;height:185px;overflow:hidden}
        .hpost-img img{width:100%;height:100%;object-fit:cover;display:block}
        .hpost-overlay{position:absolute;inset:0;display:flex;flex-direction:column;justify-content:flex-end;padding:14px}
        .hpost-tag{display:inline-block;padding:4px 10px;border-radius:20px;font-size:.6rem;font-weight:700;letter-spacing:2px;text-transform:uppercase;margin-bottom:6px;width:fit-content}
        .hpost-title{font-size:1.1rem;font-weight:700;line-height:1.25;text-shadow:0 1px 4px rgba(0,0,0,.3)}
        .hpost-price{font-size:.8rem;margin-top:3px;opacity:.92;font-weight:600}
        .hpost-body{padding:14px 18px}
        .hpost-details{display:grid;grid-template-columns:1fr 1fr;gap:7px;margin-bottom:12px}
        .hpost-detail{display:flex;align-items:center;gap:5px;font-size:.7rem}
        .hpost-detail-icon{font-size:.85rem}
        .hpost-caption{font-size:.73rem;line-height:1.55;margin-bottom:10px}
        .hpost-footer{display:flex;align-items:center;justify-content:space-between;padding-top:10px;border-top:1px solid}
        .hpost-agent{display:flex;align-items:center;gap:8px}
        .hpost-av{width:30px;height:30px;border-radius:50%;object-fit:cover}
        .hpost-avph{width:30px;height:30px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:.78rem}
        .hpost-aname{font-size:.68rem;font-weight:700;line-height:1.2}
        .hpost-arole{font-size:.6rem;opacity:.6}
        .hpost-dm{font-size:.6rem;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;padding:5px 11px;border-radius:6px}
        /* summary */
        .sum{background:#fff;border-radius:13px;padding:19px;border:2px solid #DDD6C4;width:310px}
        .srow{display:flex;justify-content:space-between;align-items:center;padding:7px 0;border-bottom:1px solid #F0EDE4}
        .srow:last-child{border:none}
        .slb{font-size:.58rem;letter-spacing:2px;text-transform:uppercase;color:#bbb;font-weight:700;flex-shrink:0}
        .svl{font-size:.78rem;color:#1C1C1E;font-weight:600;text-align:right;max-width:185px;word-break:break-word}
        .swm{width:14px;height:14px;border-radius:3px;border:1px solid rgba(0,0,0,.08);flex-shrink:0}
        .subtn{background:${G};color:${CR};padding:13px 32px;border-radius:10px;font-size:.78rem;font-weight:800;letter-spacing:2px;border:none;cursor:pointer;margin-top:18px;font-family:'Montserrat',sans-serif;transition:all .2s;box-shadow:0 4px 15px rgba(45,80,22,.27);display:block;width:100%}
        .subtn:hover{background:${GM};transform:translateY(-1px);box-shadow:0 8px 24px rgba(45,80,22,.36)}
        .dh{font-family:'Playfair Display',serif;font-size:1.5rem;color:${G};margin-bottom:4px}
        .ds{font-size:.79rem;color:#888;margin-bottom:22px}
        .fn{font-size:.66rem;color:#aaa;margin-top:8px;line-height:1.5}
        .canva-note{font-size:.66rem;color:${GM};background:#EFF0EA;border-radius:7px;padding:7px 11px;margin-top:8px;line-height:1.5}
      `}</style>

      <div className="wrap">
        {/* HEADER */}
        <div className="hdr">
          <Logo/>
          <div className="steps">
            {STEPS.map((s,i)=>(
              <div key={s} style={{display:"flex",alignItems:"center",gap:4}}>
                <div className={`sd ${i===step?"active":i<step?"done":"idle"}`}>{i<step?"✓":i+1}</div>
                {i<STEPS.length-1&&<div className={`sl ${i<step?"done":""}`}/>}
              </div>
            ))}
          </div>
        </div>

        <div className="body">

          {/* ── STEP 0: COLORS ── */}
          {step===0&&<>
            <div style={{display:"flex",flexDirection:"column",alignItems:"center",textAlign:"center",padding:"28px 0 24px",borderBottom:`1.5px solid #DDD6C4`,marginBottom:28}}>
              <svg width="58" height="58" viewBox="0 0 38 38" fill="none" style={{marginBottom:12}}>
                <circle cx="19" cy="19" r="16.5" stroke={GM} strokeWidth="2.2" fill="none"/>
                <path d="M19 27C15 23 11 19 11 15C11 11.5 14.5 9 19 9C23.5 9 27 11.5 27 15C27 19 23 23 19 27Z" fill={GM} fillOpacity="0.13"/>
                <path d="M19 9L19 23" stroke={G} strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M14 16Q16.5 12 19 10" stroke={G} strokeWidth="1.4" fill="none" strokeLinecap="round"/>
                <path d="M24 16Q21.5 12 19 10" stroke={G} strokeWidth="1.4" fill="none" strokeLinecap="round"/>
                <path d="M15.5 14L12.5 12.5" stroke={GM} strokeWidth="1.2" strokeLinecap="round"/>
                <path d="M22.5 14L25.5 12.5" stroke={GM} strokeWidth="1.2" strokeLinecap="round"/>
                <path d="M27 7L31 4M31 4L28 4M31 4L31 7" stroke={G} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <div style={{fontFamily:"'Cinzel',serif",fontSize:"0.55rem",color:G,letterSpacing:"3px",marginBottom:3}}>THE</div>
              <div style={{fontFamily:"'Playfair Display',serif",fontSize:"1.65rem",color:G,fontWeight:700,lineHeight:1.1}}>AfterYou</div>
              <div style={{fontFamily:"'Montserrat',sans-serif",fontSize:"0.48rem",color:GM,letterSpacing:"4px",textTransform:"uppercase",marginBottom:14}}>Agency</div>
              <div style={{fontFamily:"'Playfair Display',serif",fontSize:"1.1rem",color:G,marginBottom:6}}>Welcome to Your Brand Setup</div>
              <div style={{fontFamily:"'Montserrat',sans-serif",fontSize:"0.76rem",color:"#888",maxWidth:480,lineHeight:1.7}}>
                This is your Day 1 brand profile. What you choose here shapes every post we create for you — colors, fonts, personality, and more. Take your time.
              </div>
            </div>
            <div className="stag">Step 1 of 5</div>
            <div className="sh">Pick Your Color Palette</div>
            <div className="ssub">
              Choose the palette that feels most like your brand. Your AfterYou team will build your final posts using the exact color codes from your selection.
            </div>
            {[
              {key:"feminine",   label:"Feminine Palettes"},
              {key:"masculine",  label:"Masculine Palettes"},
              {key:"premium",    label:"Premium / Luxury Palettes"},
              {key:"minimalist", label:"Minimalist Palettes"},
              {key:"classic",    label:"Classic / Traditional Palettes"},
            ].map(({key,label})=>(
              <div key={key}>
                <div className="slabel">{label}</div>
                <div className="pg">
                  {PALETTES[key].map(p=>(
                    <div key={p.id} className={`pc ${palId===p.id?"sel":""}`} onClick={()=>setPalId(p.id)}>
                      <div className="swg">
                        <div className="sw" style={{background:p.primary}}/>
                        <div className="sw" style={{background:p.accent}}/>
                        <div className="sw" style={{background:p.bg}}/>
                      </div>
                      <div className="pn">{p.name}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </>}

          {/* ── STEP 1: FONTS ── */}
          {step===1&&<>
            <div className="stag">Step 2 of 5</div>
            <div className="sh">Choose Your Font Pairing</div>
            <div className="ssub">Pick one heading font for your name and titles, and one body font for captions. Together they set your voice across every post.</div>
            {hf&&bf&&(
              <div className="pair-box">
                <div className="pair-lbl">✦ Live Pairing Preview</div>
                <div className="pair-inner">
                  <div style={{fontFamily:hf.family,fontSize:"1.2rem",color:"#1C1C1E",marginBottom:4}}>{name||"Sarah Monroe"}</div>
                  <div style={{fontFamily:bf.family,fontSize:"0.76rem",color:"#555",marginBottom:3}}>{agTitle||"Realtor · Luxury Specialist"} · {city||"Miami, FL"}</div>
                  <div style={{fontFamily:bf.family,fontSize:"0.7rem",color:"#999",fontStyle:"italic"}}>{quote?`"${quote.slice(0,55)}${quote.length>55?"…":""}"`:`"Helping families find home since 2015."`}</div>
                </div>
              </div>
            )}
            <div className="fcols">
              <div>
                <div className="fclabel">Heading Font <span className="fbadge">Names & Titles</span></div>
                <div className="fgrid">
                  {HEADING_FONTS.map(f=>(
                    <div key={f.id} className={`fc ${hfId===f.id?"sel":""}`} onClick={()=>setHfId(f.id)}>
                      <div style={{minWidth:0}}>
                        <div className="fvibe">{f.vibe}</div>
                        <div className="fprev" style={{fontFamily:f.family}}>AfterYou</div>
                      </div>
                      <div className="ftag">{f.name}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <div className="fclabel">Body Font <span className="fbadge">Captions & Text</span></div>
                <div className="fgrid">
                  {BODY_FONTS.map(f=>(
                    <div key={f.id} className={`fc ${bfId===f.id?"sel":""}`} onClick={()=>setBfId(f.id)}>
                      <div style={{minWidth:0}}>
                        <div className="fvibe">{f.vibe}</div>
                        <div className="fprev" style={{fontFamily:f.family}}>Your story, told well.</div>
                      </div>
                      <div className="ftag">{f.name}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>}

          {/* ── STEP 2: VIBE ── */}
          {step===2&&<>
            <div className="stag">Step 3 of 5</div>
            <div className="sh">What's Your Brand Personality?</div>
            <div className="ssub">This shapes the tone of every caption we write for you. Pick the one that sounds most like you.</div>
            <div className="vg">
              {VIBES.map(v=>(
                <div key={v.id} className={`vc ${vibeId===v.id?"sel":""}`} onClick={()=>setVibeId(v.id)}>
                  <div className="vemoji">{v.emoji}</div>
                  <div className="vname">{v.name}</div>
                  <div className="vdesc">{v.desc}</div>
                  <div className="vtags">{v.tags.map(t=><span key={t} className="vtag">{t}</span>)}</div>
                </div>
              ))}
            </div>
          </>}

          {/* ── STEP 3: INFO ── */}
          {step===3&&<>
            <div className="stag">Step 4 of 5</div>
            <div className="sh">Tell Us About You</div>
            <div className="ssub">Your details appear on every post we create for you. The more you fill in, the more personal your posts get.</div>
            <div className="iform">
              <div>
                <label className="ilbl">Full Name *</label>
                <input className="inp" placeholder="e.g. Sarah Monroe" value={name} onChange={e=>setName(e.target.value)}/>
              </div>
              <div>
                <label className="ilbl">Your Title</label>
                <input className="inp" placeholder="e.g. Realtor · Luxury Specialist" value={agTitle} onChange={e=>setAgTitle(e.target.value)}/>
              </div>
              <div>
                <label className="ilbl">City / Market</label>
                <input className="inp" placeholder="e.g. Miami, FL" value={city} onChange={e=>setCity(e.target.value)}/>
              </div>
              <div>
                <label className="ilbl">Brand Quote <span style={{color:"#ccc",fontWeight:400,textTransform:"none",letterSpacing:0,fontSize:".7rem"}}>(optional)</span></label>
                <textarea className="inp" placeholder={`e.g. "I don't just sell homes — I help people start their next chapter."`} value={quote} onChange={e=>setQuote(e.target.value)}/>
                <div style={{fontSize:".65rem",color:"#aaa",marginTop:4,lineHeight:1.5}}>Used on your brand card and optionally in post captions.</div>
              </div>
              <div>
                <label className="ilbl">Headshot <span style={{color:"#ccc",fontWeight:400,textTransform:"none",letterSpacing:0,fontSize:".7rem"}}>(optional)</span></label>
                {headshot?<>
                  <img src={headshot} className="hsimg" alt="headshot"/>
                  <div className="hsrm" onClick={()=>setHeadshot(null)}>Remove photo</div>
                </>:(
                  <div className="upbox" onClick={()=>fileRef.current.click()}>
                    <div style={{fontSize:"1.7rem",marginBottom:5}}>📸</div>
                    <div style={{fontSize:".79rem",color:"#555",marginBottom:3}}>Upload your headshot</div>
                    <div style={{fontSize:".68rem",color:"#aaa"}}>JPG or PNG · Square crop recommended</div>
                  </div>
                )}
                <input ref={fileRef} type="file" accept="image/*" style={{display:"none"}} onChange={handleFile}/>
              </div>
              <div style={{borderTop:`1.5px solid #DDD6C4`,paddingTop:14,marginTop:4}}>
                <label className="ilbl">Company / Group Affiliation <span style={{color:"#ccc",fontWeight:400,textTransform:"none",letterSpacing:0,fontSize:".7rem"}}>(optional)</span></label>
                <input className="inp" placeholder="e.g. Keller Williams, RE/MAX, Century 21…" value={companyName} onChange={e=>setCompanyName(e.target.value)} style={{marginBottom:12}}/>
                <label className="ilbl">Company Logo <span style={{color:"#ccc",fontWeight:400,textTransform:"none",letterSpacing:0,fontSize:".7rem"}}>(optional)</span></label>
                {companyLogo?<>
                  <div style={{display:"flex",alignItems:"center",gap:12,background:"#F8F5EE",borderRadius:10,padding:"10px 14px",border:`1.5px solid ${G}`}}>
                    <img src={companyLogo} style={{width:52,height:52,objectFit:"contain",borderRadius:8,background:"#fff",padding:4,border:"1px solid #DDD6C4"}} alt="company logo"/>
                    <div>
                      <div style={{fontSize:".78rem",fontWeight:700,color:G,marginBottom:2}}>{companyName||"Company Logo"}</div>
                      <div className="hsrm" style={{textAlign:"left"}} onClick={()=>setCompanyLogo(null)}>Remove logo</div>
                    </div>
                  </div>
                </>:(
                  <div className="upbox" onClick={()=>companyLogoRef.current.click()}>
                    <div style={{fontSize:"1.7rem",marginBottom:5}}>🏢</div>
                    <div style={{fontSize:".79rem",color:"#555",marginBottom:3}}>Upload your company / brokerage logo</div>
                    <div style={{fontSize:".68rem",color:"#aaa"}}>PNG with transparent background recommended</div>
                  </div>
                )}
                <input ref={companyLogoRef} type="file" accept="image/*" style={{display:"none"}} onChange={handleCompanyLogo}/>
              </div>
            </div>
          </>}

          {/* ── STEP 4: PREVIEW ── */}
          {step===4&&pal&&hf&&bf&&<>
            <div className="dh">Here's Your Brand Mock-Up 🎉</div>
            <div className="ds">Your palette, fonts, and vibe — pulled together into a preview. Real final samples coming from our team.</div>

            <MockupBanner/>

            <div className="prev-grid">

              {/* Brand Card */}
              <div>
                <div className="slabel" style={{margin:"0 0 11px"}}>Brand Card</div>
                <div className="bcard" style={{background:pal.bg}}>
                  <div className="bt" style={{background:pal.primary,display:"flex",flexDirection:"row",alignItems:"flex-start",justifyContent:"space-between",gap:10,padding:"20px 20px 16px"}}>
                    {/* Left: info + company logo */}
                    <div style={{flex:1,minWidth:0}}>
                      {/* Company logo */}
                      <div style={{marginBottom:10}}>
                        {companyLogo
                          ?<img src={companyLogo} style={{width:46,height:46,objectFit:"contain",borderRadius:8,background:"rgba(255,255,255,0.15)",padding:4,border:`1.5px solid ${pal.accent}55`}} alt="company"/>
                          :<div style={{width:46,height:46,borderRadius:8,background:"rgba(255,255,255,0.12)",border:`1.5px dashed rgba(255,255,255,0.3)`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"0.6rem",color:"rgba(255,255,255,0.4)",textAlign:"center",lineHeight:1.3,padding:4}}>Company Logo</div>
                        }
                      </div>
                      <div className="bname" style={{fontFamily:hf.family,color:pal.bg}}>{name||"Your Name"}</div>
                      <div className="btitle" style={{fontFamily:bf.family,color:pal.bg}}>{agTitle||"Real Estate Agent"}</div>
                      <div className="bcity" style={{fontFamily:bf.family,color:pal.bg}}>{city||"Your City, State"}</div>
                    </div>
                    {/* Right: headshot */}
                    <div style={{flexShrink:0}}>
                      {headshot
                        ?<img src={headshot} style={{width:120,height:120,borderRadius:14,objectFit:"cover",border:`3px solid ${pal.accent}`,display:"block"}} alt="hs"/>
                        :<div style={{width:120,height:120,borderRadius:14,background:pal.accent,border:`3px solid ${pal.bg}44`,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:hf.family,fontSize:"2.8rem",color:pal.primary}}>
                          {name?name[0].toUpperCase():"?"}
                         </div>
                      }
                    </div>
                  </div>
                  <div style={{height:2,background:pal.accent,opacity:.28,margin:"0 20px"}}/>
                  <div className="bb">
                    <div className="bq" style={{fontFamily:hf.family,color:pal.text}}>
                      {quote?`"${quote}"`:`"Your next home starts with the right guide. Let's find it together."`}
                    </div>
                    <div className="bcta" style={{background:pal.primary,color:pal.bg,fontFamily:bf.family}}>Book a Call</div>
                  </div>
                </div>
              </div>

              {/* House Listing Post */}
              <div>
                <div className="slabel" style={{margin:"0 0 11px"}}>Listing Post Preview</div>
                <div className="hpost" style={{background:pal.bg}}>
                  <div className="hpost-img">
                    <img src={HOUSE_IMG} alt="House listing"/>
                    <div className="hpost-overlay" style={{background:`linear-gradient(to top, ${pal.primary}EE 30%, transparent 100%)`}}>
                      <div className="hpost-tag" style={{background:pal.accent,color:pal.bg,fontFamily:bf.family}}>For Lease</div>
                      <div className="hpost-title" style={{fontFamily:hf.family,color:"#fff"}}>
                        {city?`Charming 3BR in ${city}`:"Charming 3BR Family Home"}
                      </div>
                      <div className="hpost-price" style={{fontFamily:bf.family,color:"#fff"}}>$3,200 / month</div>
                    </div>
                  </div>
                  <div className="hpost-body">
                    <div className="hpost-details">
                      {[
                        {icon:"🛏️", label:"3 Bedrooms"},
                        {icon:"🚿", label:"2 Bathrooms"},
                        {icon:"📐", label:"1,840 sq ft"},
                        {icon:"🚗", label:"2-Car Garage"},
                      ].map(d=>(
                        <div key={d.label} className="hpost-detail" style={{color:pal.text,fontFamily:bf.family}}>
                          <span className="hpost-detail-icon">{d.icon}</span>{d.label}
                        </div>
                      ))}
                    </div>
                    <div className="hpost-caption" style={{fontFamily:bf.family,color:pal.text}}>
                      {vb?.id==="v1"&&"A home this good doesn't stay available long. Spacious layout, great neighborhood. DM me to schedule a tour!"}
                      {vb?.id==="v2"&&"New to market. 3BR/2BA · 1,840 sqft · Available immediately. Contact me for a showing."}
                      {vb?.id==="v3"&&"Refined. Spacious. Ready for you. This is the home you've been waiting for."}
                      {vb?.id==="v4"&&`Proud to list this gem in ${city||"our neighborhood"}. I know these streets — and this one's a keeper.`}
                      {vb?.id==="v5"&&"Your chapter begins here. This home is ready for the family that's been waiting for the right moment. This is it."}
                      {vb?.id==="v6"&&"My clients trust me to find them the right home, not just any home. This one checks every box."}
                      {!vibeId&&"A spacious, well-maintained home in a prime location. 3 beds, 2 baths, available now. Reach out to schedule a private tour."}
                    </div>
                    <div className="hpost-footer" style={{borderTopColor:pal.accent+"44"}}>
                      <div className="hpost-agent">
                        {headshot
                          ?<img src={headshot} className="hpost-av" alt="agent"/>
                          :<div className="hpost-avph" style={{background:pal.primary,color:pal.bg,fontFamily:hf.family}}>
                            {name?name[0].toUpperCase():"?"}
                           </div>
                        }
                        <div>
                          <div className="hpost-aname" style={{fontFamily:hf.family,color:pal.text}}>{name||"Your Name"}</div>
                          <div className="hpost-arole" style={{fontFamily:bf.family,color:pal.text}}>{agTitle||"Real Estate Agent"}</div>
                        </div>
                      </div>
                      <div className="hpost-dm" style={{background:pal.primary,color:pal.bg,fontFamily:bf.family}}>DM Me</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Summary + Submit */}
              <div>
                <div className="slabel" style={{margin:"0 0 11px"}}>Brand Summary</div>
                <div className="sum">
                  {[
                    {l:"Palette",      v:(
                      <div style={{display:"flex",alignItems:"center",gap:6}}>
                        <div style={{display:"flex",gap:3}}>
                          {[pal.primary,pal.accent,pal.bg].map((c,i)=><div key={i} className="swm" style={{background:c}}/>)}
                        </div>
                        {pal.name}
                      </div>
                    )},
                    {l:"Heading Font", v:<span style={{fontFamily:hf.family}}>{hf.name}</span>},
                    {l:"Body Font",    v:<span style={{fontFamily:bf.family}}>{bf.name}</span>},
                    {l:"Brand Vibe",   v:vb?`${vb.emoji} ${vb.name}`:"—"},
                    {l:"Name",         v:name||"—"},
                    {l:"Title",        v:agTitle||"—"},
                    {l:"Market",       v:city||"—"},
                    {l:"Quote",        v:quote?`"${quote.slice(0,34)}${quote.length>34?"…":""}"`:"—"},
                    {l:"Headshot",     v:headshot?"✓ Uploaded":"Not uploaded"},
                    {l:"Company",      v:companyName||"—"},
                    {l:"Company Logo", v:companyLogo?"✓ Uploaded":"Not uploaded"},
                  ].map(({l,v})=>(
                    <div key={l} className="srow">
                      <div className="slb">{l}</div>
                      <div className="svl">{v}</div>
                    </div>
                  ))}
                </div>
                <button className="subtn" onClick={async ()=>{
                  const payload = {
                    submittedAt: new Date().toISOString(),
                    palette: pal ? { id:pal.id, name:pal.name, primary:pal.primary, accent:pal.accent, bg:pal.bg } : null,
                    headingFont: hf ? { id:hf.id, name:hf.name, family:hf.family } : null,
                    bodyFont: bf ? { id:bf.id, name:bf.name, family:bf.family } : null,
                    brandVibe: vb ? { id:vb.id, name:vb.name } : null,
                    name, agentTitle:agTitle, city, quote,
                    companyName,
                    hasHeadshot: !!headshot,
                    hasCompanyLogo: !!companyLogo,
                    headshotData: headshot || null,
                    companyLogoData: companyLogo || null,
                  };
                  try {
                    const key = `submission:${Date.now()}`;
                    await window.storage.set(key, JSON.stringify(payload));
                    await window.storage.set('latest_submission', JSON.stringify(payload));
                  } catch(e){ console.warn('Storage save failed', e); }
                  setSavedPayload(payload);
                  setSubmitted(true);
                }}>
                  Submit My Brand Profile →
                </button>
                <div className="fn">
                  ⚠️ This is a visual mock-up only. After submitting, your AfterYou team will create your actual branded posts and send you final personalized samples within 1–2 business days.
                </div>
                <div className="canva-note">
                  🎨 All palettes and fonts shown here will be used by your AfterYou design team to create your final posts.
                </div>
              </div>

            </div>
          </>}

          {/* NAV */}
          <div className="nav">
            {step>0
              ?<button className="btn back" onClick={()=>setStep(step-1)}>← Back</button>
              :<div/>
            }
            {step<4&&(
              <button className="btn nxt" disabled={!canNext()} onClick={()=>setStep(step+1)}>
                {step===3?"See My Preview →":"Continue →"}
              </button>
            )}
          </div>

        </div>
      </div>
    </>
  );
}

