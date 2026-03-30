import React, { useState, useRef, useEffect } from "react";
import {
  ArrowLeft,
  User as UserIcon,
  MapPin,
  Briefcase,
  GraduationCap,
  Code,
  Target,
  MessageSquare,
  Github,
  Linkedin,
  Globe,
  Sparkles,
  Sun,
  Moon,
  Save,
  Clock,
  Camera,
  Check,
  ChevronDown,
  LogOut,
  AlertCircle,
  X,
  LayoutDashboard,
  Upload,
  Bot,
  ChevronRight,
  Award,
  Plus,
  Trash2,
} from "lucide-react";
import OverlaySidebarNav from "../components/OverlaySidebarNav";
import usePlacesAutocomplete from "../hooks/usePlacesAutocomplete";

// --- Theme Configurations ---
const lightTheme = {
  "--card": "#FFFFFF",
  "--muted": "#EBE6DC",
  "--accent": "#FFD166",
  "--border": "#E4DDD0",
  "--radius": "2.5rem",
  "--input-radius": "1.5rem",
  "--primary": "#F95738",
  "--secondary": "#EE4266",
  "--tertiary": "#424AE7",
  "--background": "#F6F4EE",
  "--foreground": "#1C1917",
  "--primary-foreground": "#FFFFFF",
  "--primary-glow": "rgba(249, 87, 56, 0.15)",
  "--secondary-glow": "rgba(238, 66, 102, 0.15)",
  "--tertiary-glow": "rgba(66, 74, 231, 0.12)",
  "--card-glass": "rgba(255, 255, 255, 0.85)",
  "--header-glass": "rgba(255, 255, 255, 0.4)",
  "--input-glass": "rgba(255, 255, 255, 0.5)",
  "--border-glass": "rgba(255, 255, 255, 0.6)",
  "--card-solid": "#FFFFFF",
  "--color-box1-bg": "#FFFFFF",
  "--color-box1-border": "#E4DDD0",
  "--color-box1-text": "#1C1917",
  "--color-box1-muted": "rgba(28, 25, 23, 0.65)",
  "--color-box1-icon-bg": "rgba(66, 74, 231, 0.1)",
  "--color-box1-icon": "#424AE7",
  "--color-box2-bg": "#EE4266",
  "--color-box2-border": "#EE4266",
  "--color-box2-text": "#FFFFFF",
  "--color-box2-muted": "rgba(255, 255, 255, 0.9)",
  "--color-box2-icon-bg": "rgba(255, 255, 255, 0.25)",
  "--color-box2-icon": "#FFFFFF",
  "--color-box3-bg": "#F95738",
  "--color-box3-border": "#F95738",
  "--color-box3-text": "#FFFFFF",
  "--color-box3-muted": "rgba(255, 255, 255, 0.9)",
  "--color-box3-icon-bg": "rgba(255, 255, 255, 0.25)",
  "--color-box3-icon": "#FFFFFF",
  "--color-box4-bg": "#424AE7",
  "--color-box4-border": "#424AE7",
  "--color-box4-text": "#FFFFFF",
  "--color-box4-muted": "rgba(255, 255, 255, 0.9)",
  "--color-box4-icon-bg": "rgba(255, 255, 255, 0.25)",
  "--color-box4-icon": "#FFFFFF",
};

const darkTheme = {
  "--card": "#1C1917",
  "--muted": "#292524",
  "--accent": "#FFD166",
  "--border": "#36312E",
  "--radius": "2.5rem",
  "--input-radius": "1.5rem",
  "--primary": "#FF6B4A",
  "--secondary": "#FF5277",
  "--tertiary": "#6B72FF",
  "--background": "#0C0A09",
  "--foreground": "#F6F4EE",
  "--primary-foreground": "#FFFFFF",
  "--primary-glow": "rgba(255, 107, 74, 0.12)",
  "--secondary-glow": "rgba(255, 82, 119, 0.12)",
  "--tertiary-glow": "rgba(107, 114, 255, 0.12)",
  "--card-glass": "rgba(28, 25, 23, 0.85)",
  "--header-glass": "rgba(41, 37, 36, 0.5)",
  "--input-glass": "rgba(41, 37, 36, 0.5)",
  "--border-glass": "rgba(255, 255, 255, 0.12)",
  "--card-solid": "#1C1917",
  "--color-box1-bg": "#18181B",
  "--color-box1-border": "#3F3F46",
  "--color-box1-text": "#F6F4EE",
  "--color-box1-muted": "rgba(246, 244, 238, 0.65)",
  "--color-box1-icon-bg": "rgba(107, 114, 255, 0.15)",
  "--color-box1-icon": "#6B72FF",
  "--color-box2-bg": "#18181B",
  "--color-box2-border": "#3F3F46",
  "--color-box2-text": "#F6F4EE",
  "--color-box2-muted": "rgba(246, 244, 238, 0.65)",
  "--color-box2-icon-bg": "rgba(255, 82, 119, 0.15)",
  "--color-box2-icon": "#FF5277",
  "--color-box3-bg": "#18181B",
  "--color-box3-border": "#3F3F46",
  "--color-box3-text": "#F6F4EE",
  "--color-box3-muted": "rgba(246, 244, 238, 0.65)",
  "--color-box3-icon-bg": "rgba(255, 107, 74, 0.15)",
  "--color-box3-icon": "#FF6B4A",
  "--color-box4-bg": "#18181B",
  "--color-box4-border": "#3F3F46",
  "--color-box4-text": "#F6F4EE",
  "--color-box4-muted": "rgba(246, 244, 238, 0.65)",
  "--color-box4-icon-bg": "rgba(255, 209, 102, 0.15)",
  "--color-box4-icon": "#FFD166",
};

const ALL_LOCATIONS = [
  "Bengaluru, India",
  "Bhubaneswar, India",
  "Hyderabad, India",
  "Pune, India",
  "Delhi NCR, India",
  "San Francisco, CA, USA",
  "New York, NY, USA",
  "Austin, TX, USA",
  "Seattle, WA, USA",
  "London, UK",
  "Berlin, Germany",
  "Toronto, Canada",
  "Singapore",
  "Dubai, UAE",
];
const PRESETS = {
  languages: [
    "English",
    "Hindi",
    "Odia",
    "Bengali",
    "Spanish",
    "French",
    "German",
  ],
  roles: [
    "Software Engineer",
    "Frontend Developer",
    "Backend Developer",
    "Data Scientist",
    "ML Engineer",
    "Product Manager",
  ],
  tech: [
    "React",
    "JavaScript",
    "TypeScript",
    "Python",
    "Java",
    "C++",
    "Node.js",
    "SQL",
    "MongoDB",
  ],
  soft: [
    "Leadership",
    "Communication",
    "Agile",
    "Problem Solving",
    "Teamwork",
    "Time Management",
    "Critical Thinking",
  ],
};

const COMPLEX_FIELDS = {
  projects: {
    title: "Project",
    fields: [
      { key: "name", placeholder: "Project Name", type: "text", width: "full" },
      {
        key: "url",
        placeholder: "Project URL (optional)",
        type: "url",
        width: "full",
      },
      {
        key: "startDate",
        placeholder: "Start Date (e.g. Jan 2023)",
        type: "text",
        width: "half",
      },
      {
        key: "endDate",
        placeholder: "End Date (e.g. Present)",
        type: "text",
        width: "half",
      },
      {
        key: "description",
        placeholder: "Brief Description",
        type: "textarea",
        width: "full",
      },
      {
        key: "highlights",
        placeholder: "Add a highlight & press Enter...",
        type: "tags",
        width: "full",
      },
    ],
  },
  work: {
    title: "Experience",
    fields: [
      { key: "name", placeholder: "Company Name", type: "text", width: "half" },
      {
        key: "position",
        placeholder: "Job Title / Position",
        type: "text",
        width: "half",
      },
      {
        key: "url",
        placeholder: "Company URL (optional)",
        type: "url",
        width: "full",
      },
      {
        key: "startDate",
        placeholder: "Start Date (e.g. Jan 2023)",
        type: "text",
        width: "half",
      },
      {
        key: "endDate",
        placeholder: "End Date (e.g. Present)",
        type: "text",
        width: "half",
      },
      {
        key: "summary",
        placeholder: "Role Summary",
        type: "textarea",
        width: "full",
      },
      {
        key: "highlights",
        placeholder: "Add an achievement & press Enter...",
        type: "tags",
        width: "full",
      },
    ],
  },
  certificates: {
    title: "Certificate",
    fields: [
      {
        key: "name",
        placeholder: "Certificate / Award Name",
        type: "text",
        width: "full",
      },
      {
        key: "issuer",
        placeholder: "Issuing Organization",
        type: "text",
        width: "half",
      },
      { key: "date", placeholder: "Date Issued", type: "text", width: "half" },
      {
        key: "url",
        placeholder: "Credential URL (optional)",
        type: "url",
        width: "full",
      },
    ],
  },
};

// --- Vertical Selector ---
function VerticalSelector({ value, onChange, options, boxId = 1 }) {
  const isStd = boxId === 1;
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "0.625rem",
        width: "100%",
      }}
    >
      {options.map((opt) => {
        const isActive = opt === value;
        const activeBg = isStd ? "var(--primary)" : "#FFFFFF";
        const activeText = isStd
          ? "var(--primary-foreground)"
          : `var(--color-box${boxId}-bg)`;
        const idleBg = isStd ? "var(--card)" : "rgba(255, 255, 255, 0.12)";
        const idleText = isStd
          ? "var(--foreground)"
          : `var(--color-box${boxId}-text)`;

        return (
          <button
            key={opt}
            type="button"
            onClick={() => onChange(opt)}
            style={{
              width: "100%",
              padding: "0.875rem 1.25rem",
              borderRadius: "1.15rem",
              background: isActive ? activeBg : idleBg,
              color: isActive ? activeText : idleText,
              border:
                isStd && !isActive
                  ? "1px solid var(--border)"
                  : "1px solid transparent",
              fontFamily: "'Plus Jakarta Sans',sans-serif",
              fontSize: "0.9rem",
              fontWeight: 700,
              cursor: "pointer",
              outline: "none",
              transition: "all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              boxShadow: isActive ? "0 4px 12px rgba(0,0,0,0.1)" : "none",
              textAlign: "left",
            }}
          >
            <span>{opt}</span>
            {isActive && <Check size={16} strokeWidth={3} />}
          </button>
        );
      })}
    </div>
  );
}

// --- Custom Dropdown ---
function SelectInput({
  value,
  onChange,
  options,
  boxId = 1,
  onOpenStateChange,
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const fn = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, []);

  useEffect(() => {
    if (onOpenStateChange) onOpenStateChange(open);
  }, [open, onOpenStateChange]);

  const isStd = boxId === 1;
  const triggerBg = isStd ? "var(--card)" : "rgba(255, 255, 255, 0.15)";
  const triggerBorder = isStd ? "var(--border)" : "rgba(255, 255, 255, 0.3)";
  const textColor = `var(--color-box${boxId}-text)`;
  const mutedColor = `var(--color-box${boxId}-muted)`;

  return (
    <div
      ref={ref}
      style={{
        position: "relative",
        width: "100%",
        userSelect: "none",
        zIndex: open ? 999 : "auto",
      }}
    >
      <button
        type="button"
        onClick={() => setOpen(!open)}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "1rem 1.5rem",
          borderRadius: "var(--input-radius)",
          background: triggerBg,
          border: `1px solid ${triggerBorder}`,
          color: textColor,
          fontFamily: "'Plus Jakarta Sans',sans-serif",
          fontSize: "1rem",
          fontWeight: 600,
          cursor: "pointer",
          outline: "none",
          boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
          transition: "all 0.2s",
        }}
      >
        <span>{value}</span>
        <ChevronDown
          size={20}
          style={{
            color: mutedColor,
            flexShrink: 0,
            transition: "transform 350ms cubic-bezier(0.34,1.56,0.64,1)",
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
          }}
        />
      </button>

      <div
        style={{
          position: "absolute",
          top: "calc(100% + 10px)",
          left: 0,
          right: 0,
          zIndex: 1000,
          borderRadius: "1.25rem",
          background: isStd ? "var(--card)" : `var(--color-box${boxId}-bg)`,
          filter: isStd ? "none" : "brightness(0.85)",
          border: `1px solid ${triggerBorder}`,
          boxShadow: "0 20px 48px rgba(0,0,0,0.2)",
          overflow: "hidden",
          opacity: open ? 1 : 0,
          transform: open
            ? "translateY(0) scale(1)"
            : "translateY(-8px) scale(0.97)",
          transformOrigin: "top center",
          pointerEvents: open ? "auto" : "none",
          transition:
            "opacity 0.22s ease, transform 0.28s cubic-bezier(0.34,1.56,0.64,1)",
        }}
      >
        {options.map((opt, i) => {
          const isActive = opt === value;
          const currentItemBg = isActive
            ? isStd
              ? "var(--muted)"
              : "rgba(255,255,255,0.2)"
            : "transparent";
          return (
            <button
              key={opt}
              type="button"
              onClick={() => {
                onChange(opt);
                setOpen(false);
              }}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0.875rem 1.5rem",
                background: currentItemBg,
                border: "none",
                borderBottom:
                  i < options.length - 1
                    ? `1px solid ${isStd ? "var(--border)" : "rgba(255,255,255,0.1)"}`
                    : "none",
                color: isActive
                  ? isStd
                    ? "var(--primary)"
                    : "#FFFFFF"
                  : textColor,
                fontFamily: "'Plus Jakarta Sans',sans-serif",
                fontSize: "0.9375rem",
                fontWeight: isActive ? 700 : 500,
                cursor: "pointer",
                outline: "none",
                transition: "background 0.15s",
              }}
              onMouseEnter={(e) => {
                if (!isActive)
                  e.currentTarget.style.background = isStd
                    ? "var(--muted)"
                    : "rgba(255,255,255,0.15)";
              }}
              onMouseLeave={(e) => {
                if (!isActive) e.currentTarget.style.background = "transparent";
              }}
            >
              <span>{opt}</span>
              {isActive && (
                <Check size={15} style={{ opacity: 0.8, flexShrink: 0 }} />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// --- Jelly Segmented Control ---
function SegmentedControl({ options, value, onChange, boxId = 1 }) {
  const activeIndex = Math.max(0, options.indexOf(value));
  const n = options.length;
  const isStd = boxId === 1;

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        padding: 6,
        borderRadius: 9999,
        background: isStd ? "var(--card)" : "rgba(255, 255, 255, 0.15)",
        border: `1px solid ${isStd ? "var(--border)" : "rgba(255, 255, 255, 0.25)"}`,
        boxShadow: "inset 0 1px 4px rgba(0,0,0,0.06)",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          display: "flex",
          borderRadius: 9999,
          overflow: "hidden",
        }}
      >
        <div
          aria-hidden
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            width: `calc(100% / ${n})`,
            borderRadius: 9999,
            background: isStd ? "var(--primary)" : "#FFFFFF",
            boxShadow: "0 3px 10px rgba(0,0,0,0.15)",
            transform: `translateX(calc(${activeIndex} * 100%))`,
            transition: "transform 600ms cubic-bezier(0.34,1.56,0.64,1)",
            willChange: "transform",
            pointerEvents: "none",
          }}
        />
        {options.map((opt) => {
          const isActive = opt === value;
          let color;
          if (isStd)
            color = isActive
              ? "var(--primary-foreground)"
              : "var(--foreground)";
          else
            color = isActive
              ? `var(--color-box${boxId}-bg)`
              : `var(--color-box${boxId}-muted)`;
          return (
            <button
              key={opt}
              type="button"
              onClick={() => onChange(opt)}
              style={{
                position: "relative",
                zIndex: 10,
                flex: 1,
                padding: "0.625rem 0",
                background: "none",
                border: "none",
                borderRadius: 9999,
                color,
                fontFamily: "'Plus Jakarta Sans',sans-serif",
                fontSize: "0.875rem",
                fontWeight: 700,
                cursor: "pointer",
                outline: "none",
                transition: "color 300ms ease",
              }}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// --- Tags Input ---
function TagsInput({
  field,
  values,
  presets,
  placeholder,
  boxId = 1,
  onChange,
}) {
  const isStd = boxId === 1;
  const handleKey = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const val = e.target.value.trim().replace(/,$/, "");
      if (val && !values.includes(val)) {
        onChange([...values, val]);
        e.target.value = "";
      }
    }
  };
  const toggle = (item) => {
    if (values.includes(item)) onChange(values.filter((v) => v !== item));
    else onChange([...values, item]);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        width: "100%",
      }}
    >
      {presets && presets.length > 0 && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
          {presets.map((item) => {
          const active = values.includes(item);
          return (
            <button
              key={item}
              type="button"
              onClick={() => toggle(item)}
              style={{
                padding: "0.5rem 1rem",
                borderRadius: 9999,
                fontFamily: "'Plus Jakarta Sans',sans-serif",
                fontSize: "0.75rem",
                fontWeight: 700,
                cursor: "pointer",
                outline: "none",
                border:
                  isStd && !active
                    ? "1px solid var(--border)"
                    : "1px solid transparent",
                background: active
                  ? isStd
                    ? "var(--primary)"
                    : "#FFFFFF"
                  : isStd
                    ? "var(--card)"
                    : "rgba(255, 255, 255, 0.15)",
                color: active
                  ? isStd
                    ? "var(--primary-foreground)"
                    : `var(--color-box${boxId}-bg)`
                  : isStd
                    ? "var(--foreground)"
                    : `var(--color-box${boxId}-muted)`,
                boxShadow: active ? "0 2px 8px rgba(0,0,0,0.12)" : "none",
                transition: "all 300ms ease",
              }}
            >
              {item}
            </button>
          );
          })}
        </div>
      )}

      <input
        type="text"
        onKeyDown={handleKey}
        placeholder={placeholder}
        style={{
          width: "100%",
          padding: "1rem 1.5rem",
          borderRadius: "var(--input-radius)",
          background: isStd ? "var(--card)" : "rgba(255, 255, 255, 0.22)",
          border: `1px solid ${isStd ? "var(--border)" : "rgba(255, 255, 255, 0.4)"}`,
          color: `var(--color-box${boxId}-text)`,
          fontFamily: "'Plus Jakarta Sans',sans-serif",
          fontSize: "1rem",
          fontWeight: 600,
          outline: "none",
          boxShadow: "0 2px 6px rgba(0,0,0,0.04)",
        }}
        className={!isStd ? "high-contrast-placeholder" : ""}
      />

      {values.filter((v) => !presets || !presets.includes(v)).length > 0 && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
          {values
            .filter((v) => !presets || !presets.includes(v))
            .map((tag) => (
              <div
                key={tag}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "0.5rem 1rem",
                  borderRadius: 9999,
                  background: isStd ? "var(--foreground)" : "#FFFFFF",
                  color: isStd
                    ? "var(--background)"
                    : `var(--color-box${boxId}-bg)`,
                  fontSize: "0.75rem",
                  fontWeight: 700,
                }}
              >
                <span>{tag}</span>
                <button
                  type="button"
                  onClick={() => toggle(tag)}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontWeight: 900,
                    fontSize: "1rem",
                    color: "inherit",
                    opacity: 0.6,
                    lineHeight: 1,
                    padding: 0,
                  }}
                >
                  ×
                </button>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

function ComplexEditor({
  type,
  profile,
  onChange,
  setHasChanges,
  boxId = 1,
  icon: IconComponent,
}) {
  const [editingItem, setEditingItem] = useState(null);
  const schema = COMPLEX_FIELDS[type];
  const items = profile[type] || [];
  const isStd = boxId === 1;

  const handleSave = () => {
    onChange([...items, editingItem]);
    setHasChanges(true);
    setEditingItem(null);
  };

  const handleRemove = (idx) => {
    onChange(items.filter((_, i) => i !== idx));
    setHasChanges(true);
  };

  const cardBg = isStd ? "var(--card)" : "rgba(255, 255, 255, 0.12)";
  const cardBorder = isStd ? "var(--border)" : "rgba(255, 255, 255, 0.25)";
  const textColor = `var(--color-box${boxId}-text)`;
  const mutedColor = `var(--color-box${boxId}-muted)`;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: "1.2rem",
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: `var(--color-box${boxId}-icon-bg)`,
            color: `var(--color-box${boxId}-icon)`,
            transform: "rotate(-3deg)",
          }}
        >
          <IconComponent size={24} style={{ transform: "rotate(3deg)" }} />
        </div>
        <h3
          style={{
            fontSize: "1.5rem",
            fontWeight: 900,
            letterSpacing: "-.03em",
            color: textColor,
          }}
        >
          {schema.title}s
        </h3>
      </div>

      {!editingItem ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
            gap: "1rem",
          }}
        >
          {items.map((item, idx) => (
            <div
              key={idx}
              className="group"
              style={{
                position: "relative",
                padding: "1.5rem",
                borderRadius: "1.5rem",
                background: cardBg,
                border: `1px solid ${cardBorder}`,
                color: textColor,
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              }}
            >
              <button
                onClick={() => handleRemove(idx)}
                className="opacity-0 group-hover:opacity-100 transition-opacity"
                style={{
                  position: "absolute",
                  top: "1rem",
                  right: "1rem",
                  background: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: "50%",
                  width: 30,
                  height: 30,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#ef4444",
                  cursor: "pointer",
                }}
              >
                <Trash2 size={16} />
              </button>
              <h4 style={{ fontSize: "1.1rem", fontWeight: 800, paddingRight: "2rem" }}>
                {item.name}
              </h4>
              {(item.position || item.issuer) && (
                <p style={{ fontSize: "0.875rem", fontWeight: 700 }}>
                  {item.position || item.issuer}
                </p>
              )}
              {(item.startDate || item.date) && (
                <p style={{ fontSize: "0.75rem", color: mutedColor }}>
                  {item.startDate || item.date} {item.endDate ? `- ${item.endDate}` : ""}
                </p>
              )}
              {(item.description || item.summary) && (
                <p style={{ fontSize: "0.875rem", color: mutedColor }}>
                  {item.description || item.summary}
                </p>
              )}
            </div>
          ))}

          <button
            onClick={() => {
              const newItem = {};
              schema.fields.forEach(
                (f) => (newItem[f.key] = f.type === "tags" ? [] : ""),
              );
              setEditingItem(newItem);
            }}
            style={{
              padding: "1.5rem",
              borderRadius: "1.5rem",
              border: `2px dashed ${cardBorder}`,
              background: "transparent",
              color: mutedColor,
              minHeight: "160px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.75rem",
              cursor: "pointer",
            }}
          >
            <Plus size={24} />
            <span style={{ fontWeight: 700 }}>Add New {schema.title}</span>
          </button>
        </div>
      ) : (
        <div
          style={{
            padding: "2rem",
            borderRadius: "2rem",
            background: isStd ? "var(--card-solid)" : "rgba(0,0,0,0.15)",
            border: `1px solid ${cardBorder}`,
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          <h3 style={{ fontSize: "1.25rem", fontWeight: 800, color: textColor }}>
            New {schema.title}
          </h3>
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(min(100%, 240px), 1fr))",
              gap: "1rem",
            }}
          >
            {schema.fields.map((field) => {
              if (field.type === "textarea") {
                return (
                  <textarea
                    key={field.key}
                    rows={3}
                    placeholder={field.placeholder}
                    value={editingItem[field.key]}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, [field.key]: e.target.value })
                    }
                    style={{ ...inpStyle(isStd, textColor), gridColumn: "1 / -1", resize: "none" }}
                  />
                );
              }
              if (field.type === "tags") {
                return (
                  <div key={field.key} style={{ gridColumn: "1 / -1" }}>
                    <input
                      type="text"
                      placeholder={field.placeholder}
                      style={inpStyle(isStd, textColor)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === ",") {
                          e.preventDefault();
                          const val = e.target.value.trim().replace(/,$/, "");
                          if (val) {
                            setEditingItem((prev) => ({
                              ...prev,
                              [field.key]: [...(prev[field.key] || []), val],
                            }));
                          }
                          e.target.value = "";
                        }
                      }}
                    />
                  </div>
                );
              }
              return (
                <input
                  key={field.key}
                  type={field.type}
                  placeholder={field.placeholder}
                  value={editingItem[field.key]}
                  onChange={(e) =>
                    setEditingItem({ ...editingItem, [field.key]: e.target.value })
                  }
                  style={{ ...inpStyle(isStd, textColor), gridColumn: field.width === "half" ? "span 1" : "1 / -1" }}
                />
              );
            })}
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem" }}>
            <button
              onClick={() => setEditingItem(null)}
              style={{ padding: "0.75rem 1.25rem", borderRadius: 9999, border: `1px solid ${cardBorder}`, background: cardBg, color: textColor, cursor: "pointer" }}
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={!editingItem.name}
              style={{ padding: "0.75rem 1.5rem", borderRadius: 9999, border: "none", background: isStd ? "var(--primary)" : "#FFFFFF", color: isStd ? "var(--primary-foreground)" : `var(--color-box${boxId}-bg)`, fontWeight: 700, cursor: "pointer", opacity: editingItem.name ? 1 : 0.5 }}
            >
              Save {schema.title}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function inpStyle(isStd, textColor) {
  return {
    width: "100%",
    padding: "1rem 1.25rem",
    borderRadius: "var(--input-radius)",
    background: isStd ? "var(--card)" : "rgba(255, 255, 255, 0.15)",
    border: `1px solid ${isStd ? "var(--border)" : "rgba(255, 255, 255, 0.3)"}`,
    color: textColor,
    fontFamily: "'Plus Jakarta Sans',sans-serif",
    fontSize: "0.9375rem",
    outline: "none",
    boxSizing: "border-box",
  };
}

// --- App ---
export default function Profile({
  onBackToDashboard,
  onLogout,
  onOpenResumeAnalysis,
  onOpenMockInterview,
  onOpenLanding,
  isDarkMode: controlledIsDarkMode,
  onToggleTheme,
}) {
  const [internalDarkMode, setInternalDarkMode] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const isDarkMode =
    typeof controlledIsDarkMode === "boolean"
      ? controlledIsDarkMode
      : internalDarkMode;
  const theme = isDarkMode ? darkTheme : lightTheme;
  const toggleTheme = () => {
    if (onToggleTheme) {
      onToggleTheme();
      return;
    }
    setInternalDarkMode((prev) => !prev);
  };

  const [profile, setProfile] = useState({
    avatar: null,
    name: "Alex Developer",
    location: "Bengaluru, India",
    relocate: "Yes",
    workPreference: "Hybrid",
    visaSponsorship: "No",
    expectedSalary: "12,00,000",
    noticePeriod: "1 Month",
    yearsOfExperience: 3,
    educationLevel: "B.Tech / B.E.",
    languages: ["English", "Hindi"],
    targetRoles: ["Frontend Developer", "Software Engineer"],
    techSkills: ["React", "JavaScript", "TypeScript"],
    softSkills: ["Communication", "Agile"],
    techDomain: "Web Development",
    companySize: "Startup",
    github: "https://github.com/alexdev",
    linkedin: "https://linkedin.com/in/alexdev",
    portfolio: "https://alexdev.tech",
    improvementArea:
      "Working on mastering System Design and backend architecture using Node.js.",
    work: [
      {
        name: "Tech Corp",
        position: "Frontend Developer",
        url: "https://techcorp.com",
        startDate: "Jan 2022",
        endDate: "Present",
        summary:
          "Developed performant user interfaces using React and Tailwind.",
        highlights: [
          "Improved load time by 40%",
          "Led a team of 3 junior developers",
        ],
      },
    ],
    projects: [],
    certificates: [],
  });

  const [hasChanges, setHasChanges] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [locQuery, setLocQuery] = useState("");
  const [showLocSug, setShowLocSug] = useState(false);
  const [openBoxId, setOpenBoxId] = useState(null);
  const locRef = useRef(null);

  const set = (field, val) => {
    setProfile((p) => ({ ...p, [field]: val }));
    setHasChanges(true);
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setHasChanges(false);
    }, 900);
  };

  const handleAvatarUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const r = new FileReader();
    r.onloadend = () => set("avatar", r.result);
    r.readAsDataURL(file);
  };

  const handleLogout = () => {
    setIsLogoutModalOpen(true);
  };

  const confirmLogout = () => {
    setIsLogoutModalOpen(false);
    console.log("User logged out");
    if (onLogout) onLogout();
  };

  useEffect(() => {
    const fn = (e) => {
      if (locRef.current && !locRef.current.contains(e.target))
        setShowLocSug(false);
    };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, []);

  const filteredLocs = usePlacesAutocomplete(locQuery, ALL_LOCATIONS);

  const boxStyles = (n) => ({
    backgroundColor: `var(--color-box${n}-bg)`,
    border: `1px solid var(--color-box${n}-border)`,
    borderRadius: "var(--radius)",
    boxShadow: "0 8px 30px rgba(0,0,0,0.04)",
    transition: "box-shadow 0.2s ease, transform 0.2s ease",
    position: "relative",
    zIndex: openBoxId === n || (n === 1 && showLocSug) ? 999 : 1,
    overflow: "visible",
  });

  const badge = (n, neg = false) => ({
    width: 48,
    height: 48,
    borderRadius: "1.2rem",
    flexShrink: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: `var(--color-box${n}-icon-bg)`,
    color: `var(--color-box${n}-icon)`,
    transform: neg ? "rotate(-3deg)" : "rotate(3deg)",
  });

  const monoLabel = (n) => ({
    display: "block",
    marginBottom: "0.75rem",
    marginLeft: "1rem",
    fontSize: "0.6875rem",
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "0.12em",
    fontFamily: "'Fira Code',monospace",
    color: `var(--color-box${n}-muted)`,
  });

  const inp1 = {
    width: "100%",
    padding: "1rem 1.5rem",
    borderRadius: "var(--input-radius)",
    background: "var(--card)",
    border: "1px solid var(--border)",
    color: "var(--foreground)",
    fontFamily: "'Plus Jakarta Sans',sans-serif",
    fontSize: "1rem",
    fontWeight: 500,
    outline: "none",
    boxShadow: "0 2px 6px rgba(0,0,0,0.04)",
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&family=Fira+Code:wght@400;500;700&display=swap');
        ::-webkit-scrollbar { display:none; }
        
        input::placeholder, textarea::placeholder { opacity:0.4; color: inherit; }
        .high-contrast-placeholder::placeholder { opacity: 0.8 !important; }

        input[type=range] { -webkit-appearance:none; appearance:none; height:12px; border-radius:9999px; cursor:pointer; outline:none; border:1px solid transparent; }
        .thumb-light::-webkit-slider-thumb {
          -webkit-appearance:none; width:28px; height:28px; border-radius:50%;
          background:#FFFFFF; border:4px solid var(--color-box3-bg);
          box-shadow:0 4px 10px rgba(0,0,0,0.2); cursor:pointer; transition:transform .1s;
        }
        .thumb-dark::-webkit-slider-thumb {
          -webkit-appearance:none; width:28px; height:28px; border-radius:50%;
          background:var(--color-box3-icon); border:4px solid var(--color-box3-bg);
          box-shadow:0 4px 12px rgba(0,0,0,0.3); cursor:pointer; transition:transform .1s;
        }
        input[type=range]::-webkit-slider-thumb:active { transform:scale(1.12); }

        @keyframes fadeInUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes scaleIn { from{opacity:0;transform:scale(0.9)} to{opacity:1;transform:scale(1)} }
        .fu  { animation:fadeInUp .6s cubic-bezier(.34,1.56,.64,1) both; }
        .d1  { animation-delay:75ms; }
        .d2  { animation-delay:150ms; }
        .d3  { animation-delay:225ms; }

        @keyframes spin { to{transform:rotate(360deg)} }
        .spin { animation:spin 1s linear infinite; display:inline-block; }

        .bento:hover { box-shadow: 0 16px 48px rgba(0,0,0,0.1) !important; }

        .av-wrap:hover .av-ring  { transform: rotate(6deg) scale(1.05) !important; }
        .av-wrap:hover .av-over  { opacity: 1 !important; }

        .back-btn { background:none; border:none; cursor:pointer; display:flex; align-items:center; gap:8px;
          font-family:'Fira Code',monospace; font-size:11px; font-weight:700; letter-spacing:.14em;
          text-transform:uppercase; color:var(--foreground); opacity:.5; transition:all .2s; }
        .back-btn:hover { opacity:1; transform:translateX(-3px); }

        .save-btn { display:flex; align-items:center; gap:.5rem; padding:1rem 2rem;
          border-radius:1.5rem; font-family:'Plus Jakarta Sans',sans-serif;
          font-weight:700; font-size:.9375rem; cursor:pointer; transition:all .3s; border:none; }
        .save-btn:hover { filter:brightness(0.94); }
        .save-btn:active { transform:scale(.97); }
        
        /* Destructive Hover for Logout Mode */
        .logout-hover:hover { 
          background: #ef4444 !important; 
          color: white !important; 
          border-color: #ef4444 !important; 
          box-shadow: 0 8px 24px rgba(239, 68, 68, 0.25) !important;
        }

        .loc-item { width:100%; padding:.875rem 1.5rem; text-align:left; background:none; border:none;
          border-bottom:1px solid var(--border); color:var(--foreground);
          font-family:'Plus Jakarta Sans',sans-serif; font-size:.9rem; font-weight:600; cursor:pointer; transition:all .15s; }
        .loc-item:last-child { border-bottom:none; }
        .loc-item:hover { background:var(--muted); color:var(--primary); }

        .float-toast { transition: all 500ms cubic-bezier(.34,1.56,.64,1); }
        .save-now:hover { transform:scale(1.05) !important; }
        .save-now:active { transform:scale(.97) !important; }

        @media (max-width:900px) {
          .col4  { grid-column: span 12 !important; }
          .col8  { grid-column: span 12 !important; }
          .col12 { grid-column: span 12 !important; }
          .col7  { grid-column: span 12 !important; }
          .col5  { grid-column: span 12 !important; }
        }
      `}</style>

      <div
        style={theme}
        className="relative w-full min-h-screen bg-[var(--background)] font-['Plus_Jakarta_Sans',sans-serif] text-[var(--foreground)] selection:bg-[var(--primary)] selection:text-[var(--primary-foreground)] transition-colors duration-500 overflow-x-hidden"
      >
        <OverlaySidebarNav
          isOpen={isNavOpen}
          setIsOpen={setIsNavOpen}
          activeItem="profile"
          isDarkMode={isDarkMode}
          onToggleTheme={toggleTheme}
          onOpenLanding={onOpenLanding}
          onOpenDashboard={onBackToDashboard}
          onOpenResumeAnalysis={onOpenResumeAnalysis}
          onOpenMockInterview={onOpenMockInterview}
          onOpenProfile={undefined}
          closeOnLogoClick
          backdropZClass="z-[8000]"
          navZClass="z-[9000]"
        />

        {/* Ambient glows */}
        <div
          style={{
            position: "fixed",
            top: "-20%",
            left: "-10%",
            width: "60%",
            height: "60%",
            background:
              "radial-gradient(circle at center,var(--primary-glow) 0%,transparent 60%)",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />
        <div
          style={{
            position: "fixed",
            top: "0%",
            right: "-10%",
            width: "50%",
            height: "70%",
            background:
              "radial-gradient(circle at center,var(--tertiary-glow) 0%,transparent 60%)",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />
        <div
          style={{
            position: "fixed",
            bottom: "-20%",
            left: "10%",
            width: "60%",
            height: "60%",
            background:
              "radial-gradient(circle at center,var(--secondary-glow) 0%,transparent 60%)",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />

        <div
          style={{
            position: "relative",
            zIndex: 1,
            maxWidth: 1200,
            margin: "0 auto",
            padding: "2rem 1.5rem 8rem",
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
          }}
        >
          {/* Header */}
          <div
            className="fu"
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "flex-end",
              justifyContent: "space-between",
              gap: "1rem",
              borderBottom: "1px solid var(--border)",
              paddingBottom: "1.5rem",
            }}
          >
            <div>
              <button
                type="button"
                onClick={() => {
                  if (onBackToDashboard) onBackToDashboard();
                }}
                className="back-btn"
                style={{ marginBottom: "1rem" }}
              >
                <ArrowLeft size={16} /> Back to Dashboard
              </button>
              <h1
                style={{
                  fontSize: "clamp(2rem,5vw,3rem)",
                  fontWeight: 900,
                  letterSpacing: "-0.04em",
                  color: "var(--foreground)",
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  lineHeight: 1,
                }}
              >
                <div
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: "1.2rem",
                    background: "var(--primary)",
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transform: "rotate(3deg)",
                    boxShadow: "0 8px 20px rgba(0,0,0,.15)",
                    flexShrink: 0,
                    transition: "transform .3s",
                    cursor: "default",
                  }}
                >
                  <UserIcon size={28} strokeWidth={2.5} />
                </div>
                Your Profile
              </h1>
            </div>
            <div
              style={{ display: "flex", alignItems: "center", gap: ".75rem" }}
            >
              <button
                className={`save-btn ${!hasChanges && !isSaving ? "logout-hover" : ""}`}
                onClick={hasChanges || isSaving ? handleSave : handleLogout}
                style={{
                  background:
                    hasChanges || isSaving
                      ? "var(--foreground)"
                      : "var(--card)",
                  color:
                    hasChanges || isSaving
                      ? "var(--background)"
                      : "var(--foreground)",
                  border:
                    hasChanges || isSaving ? "none" : "1px solid var(--border)",
                  boxShadow:
                    hasChanges || isSaving
                      ? "0 8px 24px rgba(0,0,0,.12)"
                      : "0 2px 8px rgba(0,0,0,.06)",
                }}
              >
                {isSaving ? (
                  <Clock size={20} className="spin" />
                ) : hasChanges ? (
                  <Save size={20} />
                ) : (
                  <LogOut size={20} />
                )}
                {isSaving ? "Saving…" : hasChanges ? "Save Changes" : "Logout"}
              </button>
            </div>
          </div>

          {/* Grid */}
          <div
            className="fu d1"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(12,1fr)",
              gap: "1.5rem",
            }}
          >
            {/* BOX 1 — Identity */}
            <div
              className="bento col4"
              style={{
                ...boxStyles(1),
                gridColumn: "span 4",
                padding: "2rem",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "1.25rem",
                  left: "1.5rem",
                  display: "flex",
                  gap: "0.5rem",
                  zIndex: 10,
                }}
              >
                <div
                  style={{
                    width: "10px",
                    height: "10px",
                    borderRadius: "50%",
                    background: "#FF5F56",
                    boxShadow: "inset 0 1px 2px rgba(0,0,0,0.1)",
                  }}
                ></div>
                <div
                  style={{
                    width: "10px",
                    height: "10px",
                    borderRadius: "50%",
                    background: "#FFBD2E",
                    boxShadow: "inset 0 1px 2px rgba(0,0,0,0.1)",
                  }}
                ></div>
                <div
                  style={{
                    width: "10px",
                    height: "10px",
                    borderRadius: "50%",
                    background: "#27C93F",
                    boxShadow: "inset 0 1px 2px rgba(0,0,0,0.1)",
                  }}
                ></div>
              </div>

              <label
                htmlFor="avatarUpload"
                className="av-wrap"
                style={{
                  display: "block",
                  marginBottom: "1.5rem",
                  cursor: "pointer",
                  marginTop: "1rem",
                }}
              >
                <div
                  className="av-ring"
                  style={{
                    width: 160,
                    height: 160,
                    borderRadius: "50%",
                    background:
                      "linear-gradient(135deg,var(--secondary),var(--primary))",
                    padding: 6,
                    boxShadow: "0 12px 32px rgba(249,87,56,.25)",
                    transform: "rotate(3deg)",
                    transition: "transform 500ms cubic-bezier(.34,1.56,.64,1)",
                  }}
                >
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: "50%",
                      background: "var(--card)",
                      overflow: "hidden",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      position: "relative",
                    }}
                  >
                    {profile.avatar ? (
                      <img
                        src={profile.avatar}
                        alt="Avatar"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      <span
                        style={{
                          fontSize: 64,
                          fontWeight: 900,
                          color: "var(--foreground)",
                          opacity: 0.12,
                        }}
                      >
                        A
                      </span>
                    )}
                    <div
                      className="av-over"
                      style={{
                        position: "absolute",
                        inset: 0,
                        borderRadius: "50%",
                        background: "rgba(0,0,0,.55)",
                        backdropFilter: "blur(4px)",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        opacity: 0,
                        transition: "opacity .2s",
                      }}
                    >
                      <Camera size={24} color="#fff" />
                    </div>
                  </div>
                </div>
              </label>
              <input
                type="file"
                id="avatarUpload"
                accept="image/*"
                onChange={handleAvatarUpload}
                style={{ display: "none" }}
              />

              <h2
                style={{
                  fontSize: "1.75rem",
                  fontWeight: 900,
                  letterSpacing: "-.03em",
                  color: "var(--color-box1-text)",
                  marginBottom: 4,
                }}
              >
                {profile.name}
              </h2>
              <p
                style={{
                  fontFamily: "'Fira Code',monospace",
                  fontSize: ".6875rem",
                  fontWeight: 700,
                  letterSpacing: ".16em",
                  textTransform: "uppercase",
                  color: "var(--primary)",
                  marginBottom: "1.5rem",
                }}
              >
                {profile.techDomain}
              </p>

              <div
                style={{
                  width: "100%",
                  borderTop: "1px solid var(--border)",
                  paddingTop: "2rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1.25rem",
                  textAlign: "left",
                }}
              >
                <div>
                  <label style={monoLabel(1)}>Full Name</label>
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => set("name", e.target.value)}
                    style={inp1}
                  />
                </div>
                <div ref={locRef}>
                  <label style={monoLabel(1)}>Primary Location</label>
                  <div style={{ position: "relative" }}>
                    <MapPin
                      size={20}
                      style={{
                        position: "absolute",
                        left: 20,
                        top: "50%",
                        transform: "translateY(-50%)",
                        color: "var(--color-box1-muted)",
                        pointerEvents: "none",
                      }}
                    />
                    <input
                      type="text"
                      value={locQuery || profile.location}
                      onChange={(e) => {
                        setLocQuery(e.target.value);
                        set("location", "");
                        setShowLocSug(true);
                      }}
                      onFocus={() => setShowLocSug(true)}
                      onBlur={() => setTimeout(() => setShowLocSug(false), 200)}
                      placeholder="e.g., Bhubaneswar, India"
                      style={{ ...inp1, paddingLeft: "3.5rem" }}
                    />
                    {showLocSug && locQuery.length > 0 && (
                      <div
                        style={{
                          position: "absolute",
                          top: "calc(100% + 10px)",
                          left: 0,
                          right: 0,
                          zIndex: 1000,
                          background: "var(--card)",
                          border: "1px solid var(--border)",
                          borderRadius: "1.25rem",
                          boxShadow: "0 20px 48px rgba(0,0,0,.15)",
                          overflow: "hidden",
                          maxHeight: 240,
                          overflowY: "auto",
                        }}
                      >
                        {filteredLocs.length ? (
                          filteredLocs.map((loc) => (
                            <button
                              key={loc}
                              className="loc-item"
                              type="button"
                              onClick={() => {
                                set("location", loc);
                                setLocQuery("");
                                setShowLocSug(false);
                              }}
                            >
                              {loc}
                            </button>
                          ))
                        ) : (
                          <button
                            className="loc-item"
                            type="button"
                            onClick={() => {
                              set("location", locQuery);
                              setLocQuery("");
                              setShowLocSug(false);
                            }}
                            style={{ fontStyle: "italic", opacity: 0.6 }}
                          >
                            Use "{locQuery}"
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* BOX 1b — Overview */}
            <div
              className="bento col8"
              style={{
                ...boxStyles(1),
                gridColumn: "span 8",
                padding: "2.5rem",
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "1.5rem",
              }}
            >
              <div
                style={{
                  gridColumn: "span 2",
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  marginBottom: ".5rem",
                }}
              >
                <div style={badge(1)}>
                  <Target size={24} style={{ transform: "rotate(-3deg)" }} />
                </div>
                <h3
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: 900,
                    letterSpacing: "-.03em",
                    color: "var(--color-box1-text)",
                  }}
                >
                  Professional Overview
                </h3>
              </div>
              <div style={{ gridColumn: "span 2" }}>
                <label style={monoLabel(1)}>
                  Area of Improvement / Current Focus
                </label>
                <textarea
                  value={profile.improvementArea}
                  onChange={(e) => set("improvementArea", e.target.value)}
                  rows={3}
                  style={{
                    ...inp1,
                    borderRadius: "1.5rem",
                    resize: "none",
                    lineHeight: 1.6,
                  }}
                />
              </div>
              <div style={{ gridColumn: "span 2" }}>
                <label style={monoLabel(1)}>Social & Portfolios</label>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: ".75rem",
                  }}
                >
                  {[
                    {
                      icon: <Github size={20} />,
                      field: "github",
                      ph: "GitHub URL",
                    },
                    {
                      icon: <Linkedin size={20} style={{ color: "#0A66C2" }} />,
                      field: "linkedin",
                      ph: "LinkedIn URL",
                    },
                  ].map(({ icon, field, ph }) => (
                    <div key={field} style={{ position: "relative" }}>
                      <span
                        style={{
                          position: "absolute",
                          left: 20,
                          top: "50%",
                          transform: "translateY(-50%)",
                          color: "var(--color-box1-muted)",
                          pointerEvents: "none",
                        }}
                      >
                        {icon}
                      </span>
                      <input
                        type="url"
                        value={profile[field]}
                        onChange={(e) => set(field, e.target.value)}
                        placeholder={ph}
                        style={{
                          ...inp1,
                          paddingLeft: "3.5rem",
                          fontFamily: "'Fira Code',monospace",
                          fontSize: ".8125rem",
                        }}
                      />
                    </div>
                  ))}
                  <div style={{ position: "relative", gridColumn: "span 2" }}>
                    <Globe
                      size={20}
                      style={{
                        position: "absolute",
                        left: 20,
                        top: "50%",
                        transform: "translateY(-50%)",
                        color: "var(--secondary)",
                        pointerEvents: "none",
                      }}
                    />
                    <input
                      type="url"
                      value={profile.portfolio}
                      onChange={(e) => set("portfolio", e.target.value)}
                      placeholder="Personal Website / Portfolio"
                      style={{
                        ...inp1,
                        paddingLeft: "3.5rem",
                        fontFamily: "'Fira Code',monospace",
                        fontSize: ".8125rem",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* BOX 4 — Job Preferences */}
            <div
              className="bento col12 fu d2"
              style={{
                ...boxStyles(4),
                gridColumn: "span 12",
                padding: "2.5rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  marginBottom: "2.5rem",
                }}
              >
                <div style={badge(4, true)}>
                  <Briefcase size={24} style={{ transform: "rotate(3deg)" }} />
                </div>
                <h3
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: 900,
                    letterSpacing: "-.03em",
                    color: "var(--color-box4-text)",
                  }}
                >
                  Job Preferences
                </h3>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1.2fr 1fr 1fr",
                  gap: "3rem",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "2.25rem",
                  }}
                >
                  <div>
                    <label style={monoLabel(4)}>Expected Salary (Base)</label>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        borderRadius: "var(--input-radius)",
                        background: "rgba(255,255,255,0.22)",
                        border: "1px solid rgba(255,255,255,0.4)",
                        overflow: "hidden",
                      }}
                    >
                      <span
                        style={{
                          padding: "0 8px 0 20px",
                          fontSize: "1.25rem",
                          fontWeight: 800,
                          color: "var(--color-box4-text)",
                        }}
                      >
                        ₹
                      </span>
                      <input
                        type="text"
                        value={profile.expectedSalary}
                        onChange={(e) => set("expectedSalary", e.target.value)}
                        placeholder="8,00,000"
                        className="high-contrast-placeholder"
                        style={{
                          flex: 1,
                          padding: "1rem 1rem 1rem 0",
                          background: "transparent",
                          border: "none",
                          color: "var(--color-box4-text)",
                          fontFamily: "'Plus Jakarta Sans',sans-serif",
                          fontSize: "1rem",
                          fontWeight: 600,
                          outline: "none",
                        }}
                      />
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "1.5rem",
                    }}
                  >
                    <div>
                      <label style={monoLabel(4)}>Willing to Relocate?</label>
                      <SegmentedControl
                        options={["Yes", "No"]}
                        value={profile.relocate}
                        onChange={(v) => set("relocate", v)}
                        boxId={4}
                      />
                    </div>
                    <div>
                      <label style={monoLabel(4)}>Visa Sponsorship?</label>
                      <SegmentedControl
                        options={["Yes", "No"]}
                        value={profile.visaSponsorship}
                        onChange={(v) => set("visaSponsorship", v)}
                        boxId={4}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label style={monoLabel(4)}>Notice Period</label>
                  <VerticalSelector
                    options={[
                      "Immediate",
                      "15 Days",
                      "1 Month",
                      "2 Months",
                      "3 Months",
                    ]}
                    value={profile.noticePeriod}
                    onChange={(v) => set("noticePeriod", v)}
                    boxId={4}
                  />
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "2.25rem",
                  }}
                >
                  <div>
                    <label style={monoLabel(4)}>Work Preference</label>
                    <VerticalSelector
                      options={["Remote", "Hybrid", "On-Site"]}
                      value={profile.workPreference}
                      onChange={(v) => set("workPreference", v)}
                      boxId={4}
                    />
                  </div>
                  <div>
                    <label style={monoLabel(4)}>Company Size</label>
                    <VerticalSelector
                      options={["Startup", "Mid-size", "Enterprise", "Any"]}
                      value={profile.companySize}
                      onChange={(v) => set("companySize", v)}
                      boxId={4}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* BOX 3 — Detailed Work Experience */}
            <div
              className="bento col12 fu d2"
              style={{
                ...boxStyles(3),
                gridColumn: "span 12",
                padding: "2.5rem",
              }}
            >
              <ComplexEditor
                boxId={3}
                type="work"
                profile={profile}
                onChange={(v) => set("work", v)}
                setHasChanges={setHasChanges}
                icon={Briefcase}
              />
            </div>

            {/* BOX 1 — Projects */}
            <div
              className="bento col12 fu d3"
              style={{
                ...boxStyles(1),
                gridColumn: "span 12",
                padding: "2.5rem",
              }}
            >
              <ComplexEditor
                boxId={1}
                type="projects"
                profile={profile}
                onChange={(v) => set("projects", v)}
                setHasChanges={setHasChanges}
                icon={Code}
              />
            </div>

            {/* BOX 2 — Skills */}
            <div
              className="bento col7 fu d3"
              style={{
                ...boxStyles(2),
                gridColumn: "span 7",
                padding: "2.5rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  marginBottom: "2rem",
                }}
              >
                <div style={badge(2)}>
                  <Code size={24} style={{ transform: "rotate(-3deg)" }} />
                </div>
                <h3
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: 900,
                    letterSpacing: "-.03em",
                    color: "var(--color-box2-text)",
                  }}
                >
                  Skills & Focus
                </h3>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "2.5rem",
                }}
              >
                {[
                  {
                    label: "Target Roles",
                    field: "targetRoles",
                    presets: PRESETS.roles,
                    ph: "Add specific roles…",
                  },
                  {
                    label: "Technical Skills",
                    field: "techSkills",
                    presets: PRESETS.tech,
                    ph: "Add tools & frameworks…",
                  },
                  {
                    label: "Soft Skills",
                    field: "softSkills",
                    presets: PRESETS.soft,
                    ph: "Add soft skills…",
                  },
                ].map(({ label, field, presets, ph }) => (
                  <div key={field}>
                    <label style={monoLabel(2)}>{label}</label>
                    <TagsInput
                      boxId={2}
                      field={field}
                      values={profile[field]}
                      presets={presets}
                      placeholder={ph}
                      onChange={(v) => set(field, v)}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* BOX 1 — Experience Overview */}
            <div
              className="bento col5 fu d3"
              style={{
                ...boxStyles(1),
                gridColumn: "span 5",
                padding: "2.5rem",
                display: "flex",
                flexDirection: "column",
                gap: "2.5rem",
              }}
            >
              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                    marginBottom: "2rem",
                  }}
                >
                  <div style={badge(1)}>
                    <Clock size={24} style={{ transform: "rotate(-3deg)" }} />
                  </div>
                  <h3
                    style={{
                      fontSize: "1.25rem",
                      fontWeight: 900,
                      letterSpacing: "-.03em",
                      color: "var(--color-box1-text)",
                    }}
                  >
                    Experience Overview
                  </h3>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "2rem",
                    padding: "0 1rem",
                  }}
                >
                  <div
                    style={{
                      fontSize: "4.5rem",
                      fontWeight: 900,
                      letterSpacing: "-.04em",
                      color: "var(--color-box1-text)",
                      lineHeight: 1,
                      display: "flex",
                      alignItems: "baseline",
                      gap: 8,
                    }}
                  >
                    {profile.yearsOfExperience}
                    {profile.yearsOfExperience === 15 ? "+" : ""}
                    <span
                      style={{
                        fontSize: "1rem",
                        fontWeight: 700,
                        letterSpacing: ".14em",
                        color: "var(--color-box1-muted)",
                        fontFamily: "'Fira Code',monospace",
                      }}
                    >
                      YRS
                    </span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={15}
                    value={profile.yearsOfExperience}
                    onChange={(e) =>
                      set("yearsOfExperience", parseInt(e.target.value))
                    }
                    className={isDarkMode ? "thumb-dark" : "thumb-light"}
                    style={{
                      width: "100%",
                      background: `linear-gradient(to right,var(--primary) ${(profile.yearsOfExperience / 15) * 100}%,var(--muted) ${(profile.yearsOfExperience / 15) * 100}%)`,
                    }}
                  />
                </div>
              </div>

              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                    marginBottom: "1.5rem",
                  }}
                >
                  <div style={badge(1, true)}>
                    <GraduationCap
                      size={24}
                      style={{ transform: "rotate(3deg)" }}
                    />
                  </div>
                  <h3
                    style={{
                      fontSize: "1.25rem",
                      fontWeight: 900,
                      letterSpacing: "-.03em",
                      color: "var(--color-box1-text)",
                    }}
                  >
                    Education
                  </h3>
                </div>
                <SelectInput
                  options={[
                    "High School",
                    "Diploma",
                    "B.Tech / B.E.",
                    "B.Sc / B.A.",
                    "M.Tech / M.E.",
                    "M.Sc / M.A.",
                    "Ph.D.",
                  ]}
                  value={profile.educationLevel}
                  onChange={(v) => set("educationLevel", v)}
                  boxId={3}
                  onOpenStateChange={(s) => setOpenBoxId(s ? 1 : null)}
                />
              </div>

              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                    marginBottom: "1.5rem",
                  }}
                >
                  <div style={badge(1)}>
                    <MessageSquare
                      size={24}
                      style={{ transform: "rotate(-3deg)" }}
                    />
                  </div>
                  <h3
                    style={{
                      fontSize: "1.25rem",
                      fontWeight: 900,
                      letterSpacing: "-.03em",
                      color: "var(--color-box1-text)",
                    }}
                  >
                    Languages
                  </h3>
                </div>
                <TagsInput
                  boxId={1}
                  field="languages"
                  values={profile.languages}
                  presets={PRESETS.languages}
                  placeholder="Add a language…"
                  onChange={(v) => set("languages", v)}
                />
              </div>
            </div>

            {/* BOX 2 — Certificates */}
            <div
              className="bento col12 fu d3"
              style={{
                ...boxStyles(2),
                gridColumn: "span 12",
                padding: "2.5rem",
              }}
            >
              <ComplexEditor
                boxId={2}
                type="certificates"
                profile={profile}
                onChange={(v) => set("certificates", v)}
                setHasChanges={setHasChanges}
                icon={Award}
              />
            </div>
          </div>
        </div>

        {/* --- LOGOUT CONFIRMATION MODAL --- */}
        {isLogoutModalOpen && (
          <div
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 10000,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "1.5rem",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "rgba(0,0,0,0.4)",
                backdropFilter: "blur(12px)",
              }}
              onClick={() => setIsLogoutModalOpen(false)}
            />

            <div
              className="fu"
              style={{
                position: "relative",
                width: "100%",
                maxWidth: 440,
                background: "var(--card)",
                border: "1px solid var(--border)",
                borderRadius: "2.5rem",
                overflow: "hidden",
                boxShadow: "0 40px 100px rgba(0,0,0,0.25)",
                animation: "scaleIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
              }}
            >
              <div
                style={{
                  height: 56,
                  borderBottom: "1px solid var(--border)",
                  background: "var(--background)",
                  opacity: 0.5,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "0 1.5rem",
                }}
              >
                <div style={{ display: "flex", gap: 6 }}>
                  <div
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: "50%",
                      background: "#FF5F56",
                    }}
                  />
                  <div
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: "50%",
                      background: "#FFBD2E",
                    }}
                  />
                  <div
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: "50%",
                      background: "#27C93F",
                    }}
                  />
                </div>
                <button
                  onClick={() => setIsLogoutModalOpen(false)}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "var(--foreground)",
                  }}
                >
                  <X size={18} />
                </button>
              </div>

              <div
                style={{
                  padding: "2.5rem",
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "1.5rem",
                }}
              >
                <div
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: "1.5rem",
                    background: "rgba(239, 68, 68, 0.1)",
                    color: "#ef4444",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <AlertCircle size={32} strokeWidth={2.5} />
                </div>

                <div>
                  <h3
                    style={{
                      fontSize: "1.5rem",
                      fontWeight: 900,
                      letterSpacing: "-0.03em",
                      marginBottom: "0.5rem",
                    }}
                  >
                    Confirm Sign Out
                  </h3>
                  <p
                    style={{
                      fontSize: "0.9375rem",
                      fontWeight: 600,
                      color: "var(--foreground)",
                      opacity: 0.6,
                      lineHeight: 1.5,
                    }}
                  >
                    Are you sure you want to end your session? Any unsaved
                    progress will be lost.
                  </p>
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                    gap: "0.75rem",
                    marginTop: "0.5rem",
                  }}
                >
                  <button
                    onClick={confirmLogout}
                    style={{
                      width: "100%",
                      padding: "1.125rem",
                      borderRadius: "9999px",
                      background: "#ef4444",
                      color: "white",
                      border: "none",
                      fontSize: "0.9375rem",
                      fontWeight: 800,
                      cursor: "pointer",
                      transition: "transform 0.2s",
                      boxShadow: "0 4px 12px rgba(239, 68, 68, 0.2)",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.transform = "scale(1.02)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.transform = "scale(1)")
                    }
                  >
                    Yes, Logout
                  </button>
                  <button
                    onClick={() => setIsLogoutModalOpen(false)}
                    style={{
                      width: "100%",
                      padding: "1.125rem",
                      borderRadius: "9999px",
                      background: "var(--muted)",
                      color: "var(--foreground)",
                      border: "none",
                      fontSize: "0.9375rem",
                      fontWeight: 800,
                      cursor: "pointer",
                      transition: "opacity 0.2s",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.opacity = "0.8")
                    }
                    onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Save Toast */}
        <div
          className="float-toast"
          style={{
            position: "fixed",
            bottom: 32,
            left: "50%",
            transform: `translateX(-50%) translateY(${hasChanges && !isSaving ? 0 : 80}px)`,
            opacity: hasChanges && !isSaving ? 1 : 0,
            pointerEvents: hasChanges && !isSaving ? "auto" : "none",
            zIndex: 300,
            display: "flex",
            alignItems: "center",
            gap: "1.25rem",
            background: "var(--foreground)",
            borderRadius: 9999,
            padding: ".625rem 2rem .625rem .625rem",
            boxShadow: "0 20px 48px rgba(0,0,0,.28)",
            border: "1px solid rgba(255,255,255,.08)",
          }}
        >
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: "50%",
              background: "rgba(255,255,255,.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <Sparkles size={20} color="var(--accent)" />
          </div>
          <span
            style={{
              color: "var(--background)",
              fontWeight: 800,
              fontSize: ".9375rem",
              whiteSpace: "nowrap",
            }}
          >
            Unsaved Changes
          </span>
          <button
            className="save-now"
            onClick={handleSave}
            style={{
              marginLeft: ".75rem",
              background: "var(--primary)",
              color: "#fff",
              border: "none",
              borderRadius: 9999,
              padding: ".75rem 1.75rem",
              fontFamily: "'Plus Jakarta Sans',sans-serif",
              fontWeight: 800,
              fontSize: ".9375rem",
              cursor: "pointer",
              boxShadow: "0 4px 16px rgba(249,87,56,.35)",
              whiteSpace: "nowrap",
              transition: "transform .2s",
            }}
          >
            Save Now
          </button>
        </div>
      </div>
    </>
  );
}
