import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Sequence,
} from "remotion";

// ─── BRAND COLORS ────────────────────────────────────────────────
const RED = "#e94560";
const BG = "#0a0a0a";
const GRID = "#1a1a1a";
const WHITE = "#f0f0f0";
const DIM = "#444444";
const GREEN = "#39ff14";
const YELLOW = "#ffd700";

// ─── PIXEL FONT STYLE ────────────────────────────────────────────
const pixelFont: React.CSSProperties = {
  fontFamily: "'Courier New', Courier, monospace",
  letterSpacing: "0.08em",
};

// ─── HELPERS ─────────────────────────────────────────────────────
const clamp = (v: number, min = 0, max = 1) => Math.min(max, Math.max(min, v));
const fadeIn = (frame: number, start: number, dur = 20) =>
  clamp((frame - start) / dur);
const fadeOut = (frame: number, start: number, dur = 15) =>
  clamp(1 - (frame - start) / dur);

// ─── SCANLINES OVERLAY ───────────────────────────────────────────
const Scanlines: React.FC = () => (
  <AbsoluteFill style={{ pointerEvents: "none", zIndex: 100 }}>
    <svg width="100%" height="100%" style={{ position: "absolute" }}>
      <defs>
        <pattern id="scan" x="0" y="0" width="1" height="4" patternUnits="userSpaceOnUse">
          <rect x="0" y="0" width="1920" height="1" fill="rgba(0,0,0,0.18)" />
        </pattern>
      </defs>
      <rect width="1920" height="1080" fill="url(#scan)" />
    </svg>
  </AbsoluteFill>
);

// ─── PIXEL GRID BACKGROUND ───────────────────────────────────────
const PixelGrid: React.FC<{ opacity?: number }> = ({ opacity = 1 }) => (
  <AbsoluteFill style={{ opacity }}>
    <svg width="1920" height="1080" style={{ position: "absolute" }}>
      <defs>
        <pattern id="grid" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
          <path d="M 32 0 L 0 0 0 32" fill="none" stroke={GRID} strokeWidth="0.8" />
        </pattern>
      </defs>
      <rect width="1920" height="1080" fill={BG} />
      <rect width="1920" height="1080" fill="url(#grid)" />
    </svg>
  </AbsoluteFill>
);

// ─── GLITCH TEXT ─────────────────────────────────────────────────
const GlitchText: React.FC<{
  text: string;
  size: number;
  color?: string;
  glitchFrame: number;
  frame: number;
}> = ({ text, size, color = WHITE, glitchFrame, frame }) => {
  const glitch = (frame - glitchFrame) % 7 < 2 && frame > glitchFrame;
  const offsetX = glitch ? (Math.sin(frame * 37) > 0 ? 4 : -4) : 0;
  const offsetR = glitch ? 3 : 0;

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      {/* red ghost */}
      {glitch && (
        <div style={{
          ...pixelFont,
          fontSize: size,
          color: RED,
          position: "absolute",
          left: offsetR,
          top: 0,
          opacity: 0.7,
          whiteSpace: "nowrap",
        }}>{text}</div>
      )}
      <div style={{
        ...pixelFont,
        fontSize: size,
        color,
        position: "relative",
        left: offsetX,
        whiteSpace: "nowrap",
        textShadow: glitch ? `0 0 12px ${RED}` : "none",
      }}>{text}</div>
    </div>
  );
};

// ─── CURSOR BLINK ────────────────────────────────────────────────
const Cursor: React.FC<{ frame: number; color?: string; size?: number }> = ({
  frame, color = RED, size = 32
}) => {
  const visible = Math.floor(frame / 15) % 2 === 0;
  return (
    <span style={{
      display: "inline-block",
      width: size * 0.6,
      height: size,
      backgroundColor: visible ? color : "transparent",
      verticalAlign: "middle",
      marginLeft: 4,
    }} />
  );
};

// ─── TYPEWRITER TEXT ─────────────────────────────────────────────
const Typewriter: React.FC<{
  text: string;
  frame: number;
  startFrame: number;
  speed?: number;
  style?: React.CSSProperties;
}> = ({ text, frame, startFrame, speed = 3, style }) => {
  const elapsed = Math.max(0, frame - startFrame);
  const chars = Math.floor(elapsed / speed);
  const displayed = text.slice(0, chars);
  const done = chars >= text.length;

  return (
    <span style={{ ...pixelFont, ...style }}>
      {displayed}
      {!done && <Cursor frame={frame} size={(style?.fontSize as number) || 24} />}
    </span>
  );
};

// ─── PIXEL BADGE ─────────────────────────────────────────────────
const PixelBadge: React.FC<{
  label: string;
  color?: string;
  opacity?: number;
}> = ({ label, color = RED, opacity = 1 }) => (
  <div style={{
    display: "inline-block",
    border: `2px solid ${color}`,
    padding: "6px 18px",
    color,
    ...pixelFont,
    fontSize: 22,
    opacity,
    boxShadow: `0 0 12px ${color}40`,
    letterSpacing: "0.15em",
  }}>
    {label}
  </div>
);

// ═══════════════════════════════════════════════════════
//  SCENE 1 — INTRO TITLE (0–90f)
// ═══════════════════════════════════════════════════════
const SceneIntro: React.FC<{ frame: number }> = ({ frame }) => {
  const { fps } = useVideoConfig();

  const lineScale = spring({ frame, fps, config: { damping: 18, stiffness: 90 } });
  const digiOpacity = fadeIn(frame, 15, 25);
  const bucketOpacity = fadeIn(frame, 30, 25);
  const listOpacity = fadeIn(frame, 45, 25);
  const taglineOpacity = fadeIn(frame, 65, 20);
  const subtitleOpacity = fadeIn(frame, 75, 15);

  // exit fade
  const exitOpacity = frame > 78 ? fadeOut(frame, 78, 12) : 1;

  return (
    <AbsoluteFill style={{ opacity: exitOpacity, justifyContent: "center", alignItems: "center" }}>
      {/* Red accent line */}
      <div style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%) scaleX(" + lineScale + ")",
        width: 900,
        height: 2,
        backgroundColor: RED,
        boxShadow: `0 0 24px ${RED}`,
      }} />

      <div style={{ textAlign: "center", position: "relative" }}>
        {/* DIGI */}
        <div style={{ opacity: digiOpacity, transform: `translateY(${interpolate(digiOpacity, [0, 1], [-30, 0])}px)` }}>
          <GlitchText text="DIGI" size={160} color={WHITE} glitchFrame={20} frame={frame} />
        </div>

        {/* BUCKET */}
        <div style={{ opacity: bucketOpacity, transform: `translateY(${interpolate(bucketOpacity, [0, 1], [-20, 0])}px)`, marginTop: -20 }}>
          <GlitchText text="BUCKET" size={160} color={RED} glitchFrame={35} frame={frame} />
        </div>

        {/* LIST */}
        <div style={{ opacity: listOpacity, transform: `translateY(${interpolate(listOpacity, [0, 1], [-20, 0])}px)`, marginTop: -20 }}>
          <GlitchText text="LIST" size={160} color={WHITE} glitchFrame={50} frame={frame} />
        </div>

        {/* Tagline */}
        <div style={{
          opacity: taglineOpacity,
          marginTop: 24,
          ...pixelFont,
          fontSize: 28,
          color: DIM,
          letterSpacing: "0.3em",
        }}>
          YOUR WORLD. YOUR WISHLIST. PIXEL STYLE.
        </div>

        {/* Cursor blink */}
        <div style={{ opacity: subtitleOpacity, marginTop: 16 }}>
          <Cursor frame={frame} color={RED} size={28} />
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ═══════════════════════════════════════════════════════
//  SCENE 2 — ADD PLACE (90–195f)
// ═══════════════════════════════════════════════════════
const SceneAddPlace: React.FC<{ frame: number }> = ({ frame }) => {
  const localFrame = frame; // already offset by Sequence
  const { fps } = useVideoConfig();

  const panelScale = spring({ frame: localFrame, fps, config: { damping: 22, stiffness: 100 } });
  const labelOpacity = fadeIn(localFrame, 15, 20);
  const exitOpacity = localFrame > 90 ? fadeOut(localFrame, 90, 12) : 1;

  const fields = [
    { label: "PLACE NAME", value: "Kyoto, Japan", delay: 20 },
    { label: "COUNTRY", value: "Japan 🗾", delay: 40 },
    { label: "STATUS", value: "[ DREAMING ]", delay: 55 },
    { label: "NOTES", value: "Cherry blossom season...", delay: 68 },
  ];

  return (
    <AbsoluteFill style={{ opacity: exitOpacity, justifyContent: "center", alignItems: "center" }}>
      {/* Section label top left */}
      <div style={{
        position: "absolute", top: 60, left: 80,
        opacity: labelOpacity,
        ...pixelFont, fontSize: 20, color: DIM, letterSpacing: "0.3em",
      }}>
        // ADD NEW PLACE
      </div>

      <div style={{
        transform: `scale(${panelScale})`,
        width: 720,
        border: `2px solid ${RED}`,
        padding: "48px 56px",
        backgroundColor: "#0f0f0f",
        boxShadow: `0 0 60px ${RED}20, inset 0 0 40px #00000060`,
        position: "relative",
      }}>
        {/* Corner pixels */}
        {[
          { top: -4, left: -4 }, { top: -4, right: -4 },
          { bottom: -4, left: -4 }, { bottom: -4, right: -4 },
        ].map((pos, i) => (
          <div key={i} style={{
            position: "absolute", width: 8, height: 8,
            backgroundColor: RED, ...pos,
          }} />
        ))}

        <div style={{ ...pixelFont, fontSize: 13, color: RED, letterSpacing: "0.3em", marginBottom: 32 }}>
          ADD NEW PLACE ✕
        </div>

        {fields.map(({ label, value, delay }) => (
          <div key={label} style={{ marginBottom: 24 }}>
            <div style={{ ...pixelFont, fontSize: 13, color: DIM, letterSpacing: "0.2em", marginBottom: 8 }}>
              {label} *
            </div>
            <div style={{
              borderBottom: `1px solid ${DIM}`,
              paddingBottom: 8,
              minHeight: 32,
            }}>
              <Typewriter
                text={value}
                frame={localFrame}
                startFrame={delay}
                speed={2}
                style={{ fontSize: 26, color: WHITE }}
              />
            </div>
          </div>
        ))}

        <div style={{ marginTop: 40, display: "flex", gap: 16 }}>
          <div style={{ opacity: fadeIn(localFrame, 82, 10), ...pixelFont, fontSize: 18, color: DIM, border: `1px solid ${DIM}`, padding: "10px 28px", cursor: "pointer" }}>
            CANCEL
          </div>
          <div style={{
            opacity: fadeIn(localFrame, 85, 10),
            ...pixelFont, fontSize: 18, color: BG,
            backgroundColor: RED, padding: "10px 36px",
            boxShadow: `0 0 20px ${RED}60`,
          }}>
            SAVE PLACE ▶
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ═══════════════════════════════════════════════════════
//  SCENE 3 — STATUS FLIP (195–300f)
// ═══════════════════════════════════════════════════════
const SceneStatusFlip: React.FC<{ frame: number }> = ({ frame }) => {
  const localFrame = frame;
  const { fps } = useVideoConfig();

  const exitOpacity = localFrame > 90 ? fadeOut(localFrame, 90, 12) : 1;
  const labelOpacity = fadeIn(localFrame, 5, 15);

  const dreamingOpacity = localFrame < 40 ? fadeIn(localFrame, 5, 20) : fadeOut(localFrame, 40, 15);
  const arrowOpacity = fadeIn(localFrame, 38, 12);
  const visitedOpacity = fadeIn(localFrame, 52, 20);

  const pinScale1 = spring({ frame: localFrame - 10, fps, config: { damping: 15, stiffness: 120 } });
  const pinScale2 = spring({ frame: localFrame - 55, fps, config: { damping: 15, stiffness: 120 } });

  const places = [
    { name: "KYOTO, JAPAN", country: "🗾 Japan", status: localFrame < 45 ? "DREAMING" : "VISITED" },
    { name: "SANTORINI, GREECE", country: "🇬🇷 Greece", status: "DREAMING" },
    { name: "MACHU PICCHU, PERU", country: "🇵🇪 Peru", status: "DREAMING" },
  ];

  return (
    <AbsoluteFill style={{ opacity: exitOpacity, justifyContent: "center", alignItems: "center" }}>
      <div style={{ position: "absolute", top: 60, left: 80, opacity: labelOpacity, ...pixelFont, fontSize: 20, color: DIM, letterSpacing: "0.3em" }}>
        // TRACK YOUR STATUS
      </div>

      {/* Cards */}
      <div style={{ display: "flex", flexDirection: "column", gap: 24, width: 900 }}>
        {places.map((place, i) => {
          const cardOpacity = fadeIn(localFrame, i * 10, 18);
          const isFirst = i === 0;
          const statusColor = place.status === "VISITED" ? GREEN : RED;

          return (
            <div key={place.name} style={{
              opacity: cardOpacity,
              transform: `scale(${isFirst ? (i === 0 ? pinScale1 : 1) : 1})`,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              border: `1px solid ${isFirst ? statusColor : DIM}`,
              padding: "20px 32px",
              backgroundColor: "#0f0f0f",
              boxShadow: isFirst ? `0 0 24px ${statusColor}30` : "none",
            }}>
              <div>
                <div style={{ ...pixelFont, fontSize: 26, color: WHITE }}>{place.name}</div>
                <div style={{ ...pixelFont, fontSize: 16, color: DIM, marginTop: 6 }}>{place.country}</div>
              </div>
              <div style={{
                ...pixelFont, fontSize: 18,
                color: statusColor,
                border: `1px solid ${statusColor}`,
                padding: "8px 20px",
                boxShadow: `0 0 10px ${statusColor}40`,
              }}>
                {place.status}
              </div>
            </div>
          );
        })}
      </div>

      {/* Status transition callout */}
      {localFrame > 35 && localFrame < 75 && (
        <div style={{
          position: "absolute",
          bottom: 80,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          alignItems: "center",
          gap: 32,
          opacity: Math.min(dreamingOpacity + visitedOpacity, 1),
        }}>
          <div style={{ ...pixelFont, fontSize: 32, color: RED, opacity: dreamingOpacity }}>[ DREAMING ]</div>
          <div style={{ ...pixelFont, fontSize: 28, color: DIM, opacity: arrowOpacity }}>──────▶</div>
          <div style={{ ...pixelFont, fontSize: 32, color: GREEN, opacity: visitedOpacity }}>[ VISITED ] ✓</div>
        </div>
      )}
    </AbsoluteFill>
  );
};

// ═══════════════════════════════════════════════════════
//  SCENE 4 — FEATURES (300–405f)
// ═══════════════════════════════════════════════════════
const SceneFeatures: React.FC<{ frame: number }> = ({ frame }) => {
  const localFrame = frame;
  const { fps } = useVideoConfig();
  const exitOpacity = localFrame > 90 ? fadeOut(localFrame, 90, 12) : 1;

  const features = [
    { icon: "📍", title: "PIN PLACES WORLDWIDE", desc: "Add name, country, notes & photos", delay: 10 },
    { icon: "🔄", title: "DREAM → VISITED", desc: "Toggle status as you explore the world", delay: 30 },
    { icon: "📸", title: "PHOTO MEMORIES", desc: "Upload images via URL or file upload", delay: 50 },
    { icon: "📲", title: "PWA — INSTALL IT", desc: "Works offline. Add to home screen.", delay: 70 },
  ];

  return (
    <AbsoluteFill style={{ opacity: exitOpacity, justifyContent: "center", alignItems: "center" }}>
      <div style={{ position: "absolute", top: 60, left: 80, opacity: fadeIn(localFrame, 5, 15), ...pixelFont, fontSize: 20, color: DIM, letterSpacing: "0.3em" }}>
        // FEATURES
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28, width: 1100 }}>
        {features.map(({ icon, title, desc, delay }) => {
          const cardScale = spring({ frame: localFrame - delay, fps, config: { damping: 18, stiffness: 100 } });
          const textOpacity = fadeIn(localFrame, delay + 12, 15);

          return (
            <div key={title} style={{
              transform: `scale(${cardScale})`,
              border: `1px solid ${DIM}`,
              padding: "32px 36px",
              backgroundColor: "#0f0f0f",
              position: "relative",
              overflow: "hidden",
            }}>
              {/* Red left accent */}
              <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 3, backgroundColor: RED, boxShadow: `0 0 12px ${RED}` }} />

              <div style={{ fontSize: 40, marginBottom: 16 }}>{icon}</div>
              <div style={{ ...pixelFont, fontSize: 22, color: WHITE, marginBottom: 10 }}>{title}</div>
              <div style={{ opacity: textOpacity, ...pixelFont, fontSize: 16, color: DIM, lineHeight: 1.7 }}>{desc}</div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// ═══════════════════════════════════════════════════════
//  SCENE 5 — CTA (405–510f)
// ═══════════════════════════════════════════════════════
const SceneCTA: React.FC<{ frame: number }> = ({ frame }) => {
  const localFrame = frame;
  const { fps } = useVideoConfig();

  const bgPulse = Math.sin(localFrame * 0.08) * 0.5 + 0.5;

  const headingScale = spring({ frame: localFrame, fps, config: { damping: 18, stiffness: 80 } });
  const tagOpacity = fadeIn(localFrame, 20, 20);
  const priceOpacity = fadeIn(localFrame, 38, 20);
  const urlOpacity = fadeIn(localFrame, 55, 20);
  const badgeOpacity = fadeIn(localFrame, 68, 18);

  const glitch = localFrame > 5 && localFrame % 11 < 2;

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      {/* Pulsing red glow bg */}
      <div style={{
        position: "absolute", inset: 0,
        background: `radial-gradient(ellipse at center, ${RED}${Math.round(bgPulse * 18).toString(16).padStart(2, "0")} 0%, transparent 70%)`,
      }} />

      <div style={{ textAlign: "center", position: "relative" }}>
        {/* Main heading */}
        <div style={{ transform: `scale(${headingScale})` }}>
          <GlitchText text="START YOUR" size={72} color={DIM} glitchFrame={4} frame={localFrame} />
          <div style={{ marginTop: -10 }}>
            <GlitchText text="BUCKET LIST." size={110} color={WHITE} glitchFrame={8} frame={localFrame} />
          </div>
          <div style={{ marginTop: -10 }}>
            <GlitchText text="TODAY." size={110} color={RED} glitchFrame={12} frame={localFrame} />
          </div>
        </div>

        {/* Pay what you want */}
        <div style={{
          opacity: priceOpacity,
          marginTop: 36,
          ...pixelFont, fontSize: 26, color: YELLOW,
          letterSpacing: "0.2em",
        }}>
          ★ PAY WHAT YOU WANT ★
        </div>

        {/* URL */}
        <div style={{
          opacity: urlOpacity,
          marginTop: 24,
          ...pixelFont, fontSize: 22, color: RED,
          letterSpacing: "0.08em",
          textDecoration: "underline",
          textShadow: `0 0 16px ${RED}`,
        }}>
          farman24.gumroad.com/l/xwdkgl
        </div>

        {/* Badges */}
        <div style={{
          opacity: badgeOpacity,
          marginTop: 40,
          display: "flex", justifyContent: "center", gap: 20, flexWrap: "wrap",
        }}>
          <PixelBadge label="PWA" />
          <PixelBadge label="OFFLINE READY" color={GREEN} />
          <PixelBadge label="PIXEL ART" color={YELLOW} />
          <PixelBadge label="FREE TO START" color={WHITE} />
        </div>

        {/* Tagline bottom */}
        <div style={{
          opacity: tagOpacity,
          marginTop: 32,
          ...pixelFont, fontSize: 18, color: DIM,
          letterSpacing: "0.25em",
        }}>
          BUILT BY FARMAN J · AI GENERALIST
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ═══════════════════════════════════════════════════════
//  ROOT VIDEO
// ═══════════════════════════════════════════════════════
export const DigiBucketListVideo: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: BG }}>
      <PixelGrid />
      <Scanlines />

      {/* Scene 1: Intro 0–89 */}
      <Sequence from={0} durationInFrames={90}>
        <SceneIntro frame={frame} />
      </Sequence>

      {/* Scene 2: Add Place 90–194 */}
      <Sequence from={90} durationInFrames={105}>
        <SceneAddPlace frame={frame - 90} />
      </Sequence>

      {/* Scene 3: Status Flip 195–299 */}
      <Sequence from={195} durationInFrames={105}>
        <SceneStatusFlip frame={frame - 195} />
      </Sequence>

      {/* Scene 4: Features 300–404 */}
      <Sequence from={300} durationInFrames={105}>
        <SceneFeatures frame={frame - 300} />
      </Sequence>

      {/* Scene 5: CTA 405–510 */}
      <Sequence from={405} durationInFrames={105}>
        <SceneCTA frame={frame - 405} />
      </Sequence>

      {/* Persistent bottom bar */}
      <div style={{
        position: "absolute",
        bottom: 0, left: 0, right: 0,
        height: 3,
        background: `linear-gradient(to right, transparent, ${RED}, transparent)`,
        opacity: 0.6,
      }} />
    </AbsoluteFill>
  );
};
