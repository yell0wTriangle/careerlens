import React, { useState, useEffect, useRef } from "react";
import {
  ArrowRight,
  ArrowLeft,
  Check,
  Github,
  Linkedin,
  Globe,
  MapPin,
  Briefcase,
  GraduationCap,
  Code,
  Target,
  Cpu,
  MessageSquare,
  Building,
  Banknote,
  Plane,
  Bot,
  Upload,
  Play,
  LayoutDashboard,
  User,
  Sparkles,
  Sun,
  Moon,
  ChevronRight,
  ChevronLeft,
  Award,
  Plus,
  Trash2,
  X,
} from "lucide-react";
import OverlaySidebarNav from "../components/OverlaySidebarNav";

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

  "--card-glass": "rgba(255, 255, 255, 0.85)",
  "--header-glass": "rgba(255, 255, 255, 0.4)",
  "--input-glass": "rgba(255, 255, 255, 0.5)",
  "--border-glass": "rgba(255, 255, 255, 0.6)",
  "--card-solid": "#FFFFFF",

  "--primary-glow": "rgba(249, 87, 56, 0.15)",
  "--secondary-glow": "rgba(238, 66, 102, 0.15)",
  "--tertiary-glow": "rgba(66, 74, 231, 0.12)",

  "--color-box1-bg": "#FFFFFF",
  "--color-box1-border": "#E4DDD0",
  "--color-box2-bg": "#EE4266",
  "--color-box2-border": "#EE4266",
  "--color-box3-bg": "#424AE7",
  "--color-box3-border": "#424AE7",
  "--color-box4-bg": "#F95738",
  "--color-box4-border": "#F95738",
  "--color-box4-muted": "rgba(255, 255, 255, 0.7)",
  "--color-box4-deco1": "rgba(0, 0, 0, 0.1)",
  "--color-box4-deco2": "rgba(0, 0, 0, 0.2)",
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

  "--card-glass": "rgba(28, 25, 23, 0.85)",
  "--header-glass": "rgba(41, 37, 36, 0.5)",
  "--input-glass": "rgba(41, 37, 36, 0.5)",
  "--border-glass": "rgba(255, 255, 255, 0.12)",
  "--card-solid": "#1C1917",

  "--primary-glow": "rgba(255, 107, 74, 0.12)",
  "--secondary-glow": "rgba(255, 82, 119, 0.12)",
  "--tertiary-glow": "rgba(107, 114, 255, 0.12)",

  "--color-box1-bg": "#18181B",
  "--color-box1-border": "#3F3F46",
  "--color-box2-bg": "#18181B",
  "--color-box2-border": "#3F3F46",
  "--color-box3-bg": "#18181B",
  "--color-box3-border": "#3F3F46",
  "--color-box4-bg": "#18181B",
  "--color-box4-border": "#3F3F46",
  "--color-box4-muted": "rgba(255, 255, 255, 0.4)",
  "--color-box4-deco1": "rgba(255, 255, 255, 0.05)",
  "--color-box4-deco2": "rgba(255, 255, 255, 0.1)",
};

// --- Schema Definitions for Complex Array Items ---
const COMPLEX_FIELDS = {
  "complex-projects": {
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
  "complex-work": {
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
  "complex-certs": {
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

// ==========================================
// 1. ONBOARDING COMPONENT
// ==========================================
const Onboarding = ({ onComplete, isDarkMode, toggleTheme }) => {
  const [step, setStep] = useState(0);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    location: "",
    relocate: "No",
    relocationDestinations: [],
    workPreference: "Hybrid",
    visaSponsorship: "No",
    expectedSalary: "",
    noticePeriod: "",
    yearsOfExperience: 0,
    educationLevel: "",
    languages: [],
    github: "",
    portfolio: "",
    linkedin: "",
    targetRoles: [],
    techSkills: [],
    softSkills: [],
    techDomain: "",
    improvementArea: "",
    companySize: "Any",
    work: [],
    projects: [],
    certificates: [],
  });

  const [locationQuery, setLocationQuery] = useState("");
  const [showLocationSuggestions, setShowLocationSuggestions] = useState(false);
  const [destinationQuery, setDestinationQuery] = useState("");
  const [showDestinationSuggestions, setShowDestinationSuggestions] =
    useState(false);

  const allLocations = [
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
    "USA (Any)",
    "Europe (Any)",
    "UK (Any)",
    "Canada (Any)",
    "Australia",
    "Middle East",
    "Anywhere",
  ];

  const locationSuggestions = allLocations.filter((loc) =>
    loc.toLowerCase().includes(locationQuery.toLowerCase()),
  );
  const destinationSuggestions = allLocations.filter((loc) =>
    loc.toLowerCase().includes(destinationQuery.toLowerCase()),
  );

  const handleChange = (field, value) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  const handleAddTag = (field, e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const val = e.target.value.trim().replace(/,$/, "");
      if (val && !formData[field].includes(val)) {
        setFormData((prev) => ({ ...prev, [field]: [...prev[field], val] }));
        e.target.value = "";
      }
    }
  };

  const handleRemoveTag = (field, tagToRemove) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].filter((t) => t !== tagToRemove),
    }));
  };

  const toggleArrayItem = (field, item) => {
    setFormData((prev) => {
      const exists = prev[field].includes(item);
      if (exists)
        return { ...prev, [field]: prev[field].filter((i) => i !== item) };
      return { ...prev, [field]: [...prev[field], item] };
    });
  };

  const allSteps = [
    {
      id: "location",
      title: "Where are you based?",
      icon: <MapPin />,
      type: "location",
      required: true,
      placeholder: "e.g., Bhubaneswar, India",
    },
    {
      id: "relocate",
      title: "Willing to relocate?",
      icon: <Globe />,
      type: "segmented",
      options: ["Yes", "No"],
      required: true,
    },
    {
      id: "workPreference",
      title: "Work Preference",
      icon: <Briefcase />,
      type: "segmented",
      options: ["Remote", "Hybrid", "On-Site"],
      required: true,
    },
    {
      id: "visaSponsorship",
      title: "Require Visa Sponsorship?",
      icon: <Globe />,
      type: "segmented",
      options: ["Yes", "No"],
      required: true,
    },
    {
      id: "expectedSalary",
      title: "Expected Salary (Min Base)",
      icon: <Banknote />,
      type: "currency",
      required: true,
      placeholder: "e.g., 8,00,000",
    },
    {
      id: "noticePeriod",
      title: "Availability / Notice",
      icon: <Check />,
      type: "gridSelect",
      options: [
        "Immediate",
        "15 Days",
        "1 Month",
        "2 Months",
        "3 Months",
        "Currently a Student",
      ],
      required: true,
    },
    {
      id: "yearsOfExperience",
      title: "Years of Experience",
      icon: <Briefcase />,
      type: "slider",
      min: 0,
      max: 10,
      required: true,
    },
    {
      id: "educationLevel",
      title: "Highest Education Level",
      icon: <GraduationCap />,
      type: "gridSelect",
      options: [
        "High School",
        "Diploma",
        "B.Tech / B.E.",
        "B.Sc / B.A.",
        "M.Tech / M.E.",
        "M.Sc / M.A.",
        "Ph.D.",
      ],
      required: true,
    },
    {
      id: "work",
      title: "Work Experience",
      icon: <Briefcase />,
      type: "complex",
      subtype: "complex-work",
      required: false,
    },
    {
      id: "projects",
      title: "Featured Projects",
      icon: <Code />,
      type: "complex",
      subtype: "complex-projects",
      required: false,
    },
    {
      id: "certificates",
      title: "Certificates & Awards",
      icon: <Award />,
      type: "complex",
      subtype: "complex-certs",
      required: false,
    },
    {
      id: "languages",
      title: "Languages Spoken",
      icon: <MessageSquare />,
      type: "tagsWithPresets",
      presets: [
        "English",
        "Hindi",
        "Odia",
        "Bengali",
        "Spanish",
        "French",
        "German",
      ],
      required: true,
      placeholder: "Type & hit Enter",
    },
    {
      id: "targetRoles",
      title: "Target Job Roles",
      icon: <Target />,
      type: "tagsWithPresets",
      presets: [
        "Software Engineer",
        "Frontend Developer",
        "Backend Developer",
        "Data Scientist",
        "Machine Learning Eng",
        "Product Manager",
      ],
      required: true,
      placeholder: "Type & hit Enter",
    },
    {
      id: "techSkills",
      title: "Core Technical Skills",
      icon: <Code />,
      type: "tagsWithPresets",
      presets: [
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
      required: true,
      placeholder: "Type & hit Enter",
    },
    {
      id: "softSkills",
      title: "Soft Skills",
      icon: <Check />,
      type: "tagsWithPresets",
      presets: [
        "Leadership",
        "Communication",
        "Agile",
        "Problem Solving",
        "Teamwork",
        "Time Management",
        "Critical Thinking",
      ],
      required: true,
      placeholder: "Type custom & hit Enter",
    },
    {
      id: "techDomain",
      title: "Primary Tech Domain",
      icon: <Cpu />,
      type: "gridSelect",
      options: [
        "Artificial Intelligence",
        "Web Development",
        "Mobile App Dev",
        "Data Science",
        "Cybersecurity",
        "Cloud Computing",
        "Embedded Systems",
      ],
      required: true,
    },
    {
      id: "github",
      title: "GitHub Profile",
      icon: <Github />,
      type: "text",
      required: false,
      placeholder: "https://github.com/yourusername",
    },
    {
      id: "linkedin",
      title: "LinkedIn Profile",
      icon: <Linkedin />,
      type: "text",
      required: false,
      placeholder: "https://linkedin.com/in/yourusername",
    },
    {
      id: "portfolio",
      title: "Portfolio / Website",
      icon: <Globe />,
      type: "text",
      required: false,
      placeholder: "https://yourwebsite.com",
    },
    {
      id: "improvementArea",
      title: "Area of Improvement",
      icon: <Target />,
      type: "textarea",
      required: false,
      placeholder:
        "Optional: What technical or soft skills are you working to improve right now?",
    },
    {
      id: "companySize",
      title: "Preferred Company Size",
      icon: <Building />,
      type: "segmented",
      options: ["Startup", "Mid-size", "Enterprise", "Any"],
      required: false,
    },
  ];

  const activeSteps = [...allSteps];
  if (formData.relocate === "Yes") {
    activeSteps.splice(2, 0, {
      id: "relocationDestinations",
      title: "Where do you want to move?",
      icon: <Plane />,
      type: "destinations",
      required: true,
    });
  }

  const currentConfig = activeSteps[step];
  const currentValue = formData[currentConfig.id];

  const isStepValid = () => {
    if (editingItem) return false;
    if (!currentConfig.required) return true;
    if (Array.isArray(currentValue)) return currentValue.length > 0;
    if (typeof currentValue === "number") return true;
    return currentValue !== "" && currentValue !== null;
  };

  const isOptionalAndEmpty =
    !currentConfig.required &&
    ((Array.isArray(currentValue) && currentValue.length === 0) ||
      (!Array.isArray(currentValue) && currentValue === ""));
  const buttonActionText = isOptionalAndEmpty ? "SKIP" : "NEXT";

  const handleNext = () => {
    if (isStepValid() && step < activeSteps.length - 1) {
      setStep(step + 1);
      setShowLocationSuggestions(false);
      setShowDestinationSuggestions(false);
      setEditingItem(null);
    }
  };

  const handlePrev = () => {
    if (step > 0) {
      setStep(step - 1);
      setShowLocationSuggestions(false);
      setShowDestinationSuggestions(false);
      setEditingItem(null);
    }
  };

  const inputBaseClass =
    "w-full px-6 py-4 bg-[var(--input-glass)] border border-[var(--border)] rounded-[var(--input-radius)] text-lg font-medium text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/50 focus:bg-[var(--card-solid)] transition-all placeholder:text-[var(--foreground)]/40 shadow-sm";

  const renderInput = () => {
    switch (currentConfig.type) {
      case "complex": {
        const schema = COMPLEX_FIELDS[currentConfig.subtype];
        const isEditing = editingItem !== null;

        const handleAddHighlight = (e, key) => {
          if (e.key === "Enter" || e.key === ",") {
            e.preventDefault();
            const val = e.target.value.trim().replace(/,$/, "");
            if (val) {
              setEditingItem((prev) => ({
                ...prev,
                [key]: [...(prev[key] || []), val],
              }));
              e.target.value = "";
            }
          }
        };

        return (
          <div className="w-full max-w-3xl flex flex-col gap-4">
            {!isEditing ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentValue.map((item, idx) => (
                  <div
                    key={idx}
                    className="relative p-5 bg-[var(--input-glass)] border border-[var(--border)] rounded-[var(--input-radius)] flex flex-col gap-2 text-left group shadow-sm hover:shadow-md transition-all"
                  >
                    <button
                      onClick={() => {
                        setFormData((prev) => ({
                          ...prev,
                          [currentConfig.id]: prev[currentConfig.id].filter(
                            (_, i) => i !== idx,
                          ),
                        }));
                      }}
                      className="absolute top-4 right-4 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 size={18} />
                    </button>
                    <h4 className="font-bold text-[var(--foreground)] text-lg pr-6">
                      {item.name}
                    </h4>
                    {(item.position || item.issuer) && (
                      <p className="font-semibold text-[var(--primary)] text-sm">
                        {item.position || item.issuer}
                      </p>
                    )}
                    {(item.startDate || item.date) && (
                      <p className="text-xs text-[var(--foreground)]/60 font-['Fira_Code',monospace] uppercase tracking-wider">
                        {item.startDate || item.date}{" "}
                        {item.endDate ? `- ${item.endDate}` : ""}
                      </p>
                    )}
                    {(item.description || item.summary) && (
                      <p className="text-sm text-[var(--foreground)]/80 line-clamp-2 mt-1">
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
                  className="p-5 flex flex-col items-center justify-center gap-3 border-2 border-dashed border-[var(--border)] rounded-[var(--input-radius)] hover:border-[var(--primary)] hover:bg-[var(--primary)]/5 text-[var(--foreground)]/60 hover:text-[var(--primary)] transition-all min-h-[160px]"
                >
                  <div className="w-12 h-12 rounded-full bg-[var(--input-glass)] flex items-center justify-center shadow-sm">
                    <Plus size={24} />
                  </div>
                  <span className="font-bold">Add {schema.title}</span>
                </button>
              </div>
            ) : (
              <div className="p-6 md:p-8 bg-[var(--card-solid)] border border-[var(--border)] rounded-[var(--radius)] flex flex-col gap-5 text-left animate-fade-in-up shadow-xl">
                <h3 className="text-xl font-extrabold mb-2">
                  New {schema.title}
                </h3>
                <div className="flex flex-wrap gap-4">
                  {schema.fields.map((field) => {
                    const wClass =
                      field.width === "half"
                        ? "w-full md:w-[calc(50%-0.5rem)]"
                        : "w-full";

                    if (field.type === "textarea") {
                      return (
                        <textarea
                          key={field.key}
                          placeholder={field.placeholder}
                          value={editingItem[field.key]}
                          onChange={(e) =>
                            setEditingItem({
                              ...editingItem,
                              [field.key]: e.target.value,
                            })
                          }
                          rows={3}
                          className={`${inputBaseClass} ${wClass} resize-none`}
                        />
                      );
                    }
                    if (field.type === "tags") {
                      return (
                        <div
                          key={field.key}
                          className={`flex flex-col gap-3 ${wClass}`}
                        >
                          <input
                            type="text"
                            placeholder={field.placeholder}
                            onKeyDown={(e) => handleAddHighlight(e, field.key)}
                            className={inputBaseClass}
                          />
                          {editingItem[field.key] &&
                            editingItem[field.key].length > 0 && (
                              <ul className="flex flex-col gap-2 mt-2">
                                {editingItem[field.key].map((tag, i) => (
                                  <li
                                    key={i}
                                    className="flex items-start gap-2 text-sm text-[var(--foreground)]/80 group/tag bg-[var(--input-glass)] p-3 rounded-xl border border-[var(--border)]"
                                  >
                                    <Check
                                      size={16}
                                      className="text-[var(--primary)] shrink-0 mt-0.5"
                                    />
                                    <span className="flex-1">{tag}</span>
                                    <button
                                      onClick={() =>
                                        setEditingItem({
                                          ...editingItem,
                                          [field.key]: editingItem[
                                            field.key
                                          ].filter((_, tIdx) => tIdx !== i),
                                        })
                                      }
                                      className="text-[var(--foreground)]/40 hover:text-red-500 transition-colors"
                                    >
                                      <X size={16} />
                                    </button>
                                  </li>
                                ))}
                              </ul>
                            )}
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
                          setEditingItem({
                            ...editingItem,
                            [field.key]: e.target.value,
                          })
                        }
                        className={`${inputBaseClass} ${wClass}`}
                      />
                    );
                  })}
                </div>

                <div className="flex gap-3 mt-4 justify-end border-t border-[var(--border)] pt-6">
                  <button
                    onClick={() => setEditingItem(null)}
                    className="px-6 py-3 rounded-full font-bold text-sm bg-[var(--input-glass)] border border-[var(--border)] text-[var(--foreground)] hover:bg-[var(--muted)] transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      setFormData((prev) => ({
                        ...prev,
                        [currentConfig.id]: [
                          ...prev[currentConfig.id],
                          editingItem,
                        ],
                      }));
                      setEditingItem(null);
                    }}
                    disabled={!editingItem.name}
                    className="px-8 py-3 rounded-full font-bold text-sm bg-[var(--primary)] text-[var(--primary-foreground)] disabled:opacity-50 shadow-lg shadow-[var(--primary)]/20 hover:scale-105 transition-all"
                  >
                    Save {schema.title}
                  </button>
                </div>
              </div>
            )}
          </div>
        );
      }

      case "location":
        return (
          <div className="relative w-full max-w-xl">
            <div className="absolute left-5 top-1/2 -translate-y-1/2 text-[var(--primary)]">
              {currentConfig.icon}
            </div>
            <input
              type="text"
              value={locationQuery || currentValue}
              onChange={(e) => {
                setLocationQuery(e.target.value);
                handleChange(currentConfig.id, "");
                setShowLocationSuggestions(true);
              }}
              onFocus={() => setShowLocationSuggestions(true)}
              placeholder={currentConfig.placeholder}
              className={`${inputBaseClass} pl-14`}
            />
            {showLocationSuggestions && locationQuery.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-3 bg-[var(--card-solid)] border border-[var(--border)] rounded-2xl shadow-xl z-50 max-h-60 overflow-y-auto">
                {locationSuggestions.length > 0 ? (
                  locationSuggestions.map((loc) => (
                    <div
                      key={loc}
                      onClick={() => {
                        handleChange(currentConfig.id, loc);
                        setLocationQuery("");
                        setShowLocationSuggestions(false);
                      }}
                      className="px-6 py-4 hover:bg-[var(--muted)] hover:text-[var(--primary)] font-medium cursor-pointer transition-colors border-b border-[var(--border)]/50 last:border-b-0"
                    >
                      {loc}
                    </div>
                  ))
                ) : (
                  <div className="px-6 py-4 text-[var(--foreground)]/50 italic">
                    Press enter to use "{locationQuery}" as custom location.
                  </div>
                )}
              </div>
            )}
            {currentValue && !showLocationSuggestions && (
              <div className="absolute -bottom-8 left-4 text-sm font-semibold text-[var(--primary)]">
                Selected: {currentValue}
              </div>
            )}
          </div>
        );

      case "gridSelect":
        return (
          <div className="flex flex-wrap justify-center gap-3 w-full max-w-3xl">
            {currentConfig.options.map((opt) => (
              <button
                key={opt}
                onClick={() => handleChange(currentConfig.id, opt)}
                className={`px-6 py-4 rounded-2xl border transition-all duration-300 font-bold text-sm md:text-base flex-grow sm:flex-grow-0
                  ${
                    currentValue === opt
                      ? "bg-[var(--primary)] text-[var(--primary-foreground)] border-[var(--primary)] shadow-[0_8px_20px_rgba(249,87,56,0.3)] scale-[1.02]"
                      : "bg-[var(--input-glass)] text-[var(--foreground)]/80 border-[var(--border)] hover:border-[var(--primary)]/50 hover:bg-[var(--card-solid)] shadow-sm"
                  }`}
              >
                {opt}
              </button>
            ))}
          </div>
        );

      case "text":
        return (
          <div className="relative w-full max-w-xl">
            <div className="absolute left-5 top-1/2 -translate-y-1/2 text-[var(--primary)]">
              {currentConfig.icon}
            </div>
            <input
              type="text"
              value={currentValue}
              onChange={(e) => handleChange(currentConfig.id, e.target.value)}
              placeholder={currentConfig.placeholder}
              className={`${inputBaseClass} pl-14 font-['Fira_Code',monospace] text-[15px]`}
            />
          </div>
        );

      case "currency":
        return (
          <div className="relative w-full max-w-xl flex items-center bg-[var(--input-glass)] border border-[var(--border)] rounded-[var(--input-radius)] shadow-sm focus-within:ring-2 focus-within:ring-[var(--primary)]/50 focus-within:bg-[var(--card-solid)] transition-all overflow-hidden">
            <div className="pl-6 pr-3 text-xl font-bold text-[var(--primary)]">
              ₹
            </div>
            <input
              type="number"
              value={currentValue}
              onChange={(e) => handleChange(currentConfig.id, e.target.value)}
              placeholder={currentConfig.placeholder}
              className="w-full py-4 pr-6 bg-transparent text-lg font-medium text-[var(--foreground)] focus:outline-none placeholder:text-[var(--foreground)]/40"
            />
          </div>
        );

      case "textarea":
        return (
          <textarea
            value={currentValue}
            onChange={(e) => handleChange(currentConfig.id, e.target.value)}
            placeholder={currentConfig.placeholder}
            rows={5}
            className={`${inputBaseClass} max-w-2xl resize-none`}
          />
        );

      case "segmented":
        const activeIndex =
          currentConfig.options.indexOf(currentValue) !== -1
            ? currentConfig.options.indexOf(currentValue)
            : 0;
        return (
          <div className="relative flex w-full max-w-lg bg-[var(--input-glass)] p-2 rounded-full border border-[var(--border)] shadow-sm backdrop-blur-sm overflow-hidden">
            <div className="absolute inset-y-2 left-2 right-2 pointer-events-none overflow-hidden rounded-full">
              <div
                className="h-full rounded-full bg-[var(--primary)] shadow-md transition-transform duration-[600ms]"
                style={{
                  width: `${100 / currentConfig.options.length}%`,
                  transform: `translateX(${activeIndex * 100}%)`,
                  transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)",
                }}
              />
            </div>
            {currentConfig.options.map((opt) => (
              <button
                key={opt}
                onClick={() => handleChange(currentConfig.id, opt)}
                className={`relative z-10 flex-1 py-3 text-base font-bold transition-colors duration-300 ${currentValue === opt ? "text-[var(--primary-foreground)]" : "text-[var(--foreground)]/70 hover:text-[var(--foreground)]"}`}
              >
                {opt}
              </button>
            ))}
          </div>
        );

      case "destinations":
        return (
          <div className="w-full max-w-2xl flex flex-col gap-4 relative">
            <div className="relative w-full">
              <input
                type="text"
                value={destinationQuery}
                onChange={(e) => {
                  setDestinationQuery(e.target.value);
                  setShowDestinationSuggestions(true);
                }}
                onFocus={() => setShowDestinationSuggestions(true)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === ",") {
                    e.preventDefault();
                    const val = destinationQuery.trim().replace(/,$/, "");
                    if (val && !currentValue.includes(val)) {
                      handleChange(currentConfig.id, [...currentValue, val]);
                      setDestinationQuery("");
                      setShowDestinationSuggestions(false);
                    }
                  }
                }}
                placeholder="Search city or country..."
                className={inputBaseClass}
              />
              {showDestinationSuggestions && destinationQuery.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-3 bg-[var(--card-solid)] border border-[var(--border)] rounded-2xl shadow-xl z-50 max-h-60 overflow-y-auto">
                  {destinationSuggestions.length > 0 ? (
                    destinationSuggestions.map((loc) => (
                      <div
                        key={loc}
                        onClick={() => {
                          if (!currentValue.includes(loc)) {
                            handleChange(currentConfig.id, [
                              ...currentValue,
                              loc,
                            ]);
                          }
                          setDestinationQuery("");
                          setShowDestinationSuggestions(false);
                        }}
                        className="px-6 py-4 hover:bg-[var(--muted)] hover:text-[var(--primary)] font-medium cursor-pointer transition-colors border-b border-[var(--border)]/50 last:border-b-0"
                      >
                        {loc}
                      </div>
                    ))
                  ) : (
                    <div className="px-6 py-4 text-[var(--foreground)]/50 italic">
                      Press enter to add "{destinationQuery}".
                    </div>
                  )}
                </div>
              )}
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {currentValue.map((dest) => (
                <div
                  key={dest}
                  className="flex items-center gap-2 bg-[var(--tertiary)]/10 text-[var(--tertiary)] border border-[var(--tertiary)]/20 px-4 py-2 rounded-full"
                >
                  <span className="font-semibold text-sm">{dest}</span>
                  <button
                    onClick={() => handleRemoveTag(currentConfig.id, dest)}
                    className="hover:text-red-500 font-bold ml-1 transition-colors"
                  >
                    &times;
                  </button>
                </div>
              ))}
              {currentValue.length === 0 && (
                <span className="text-[var(--foreground)]/40 italic text-sm px-4">
                  No destinations added yet.
                </span>
              )}
            </div>
          </div>
        );

      case "slider":
        const percent =
          ((currentValue - currentConfig.min) /
            (currentConfig.max - currentConfig.min)) *
          100;
        return (
          <div className="w-full max-w-xl flex flex-col items-center gap-8">
            <div className="text-7xl font-extrabold text-[var(--primary)]">
              {currentValue}
              {currentValue === 10 ? "+" : ""}{" "}
              <span className="text-2xl text-[var(--foreground)]/40 font-medium tracking-widest">
                YRS
              </span>
            </div>
            <input
              type="range"
              min={currentConfig.min}
              max={currentConfig.max}
              value={currentValue}
              onChange={(e) =>
                handleChange(currentConfig.id, parseInt(e.target.value))
              }
              className="w-full h-3 rounded-full appearance-none cursor-pointer shadow-inner transition-all duration-150"
              style={{
                background: `linear-gradient(to right, var(--primary) ${percent}%, var(--muted) ${percent}%)`,
                border: "1px solid var(--border)",
              }}
            />
          </div>
        );

      case "tagsWithPresets":
        return (
          <div className="w-full max-w-2xl flex flex-col gap-6">
            <div className="flex flex-wrap gap-2 justify-center">
              {currentConfig.presets.map((skill) => (
                <button
                  key={skill}
                  onClick={() => toggleArrayItem(currentConfig.id, skill)}
                  className={`px-5 py-2.5 rounded-full font-semibold transition-all duration-300 text-sm ${currentValue.includes(skill) ? "bg-[var(--primary)] text-[var(--primary-foreground)] shadow-md scale-105" : "bg-[var(--card-solid)] border border-[var(--border)] text-[var(--foreground)]/70 hover:border-[var(--primary)]/50 hover:text-[var(--primary)] shadow-sm"}`}
                >
                  {skill}
                </button>
              ))}
            </div>
            <div className="relative mt-2">
              <input
                type="text"
                onKeyDown={(e) => handleAddTag(currentConfig.id, e)}
                placeholder={currentConfig.placeholder}
                className={inputBaseClass}
              />
            </div>
            <div className="flex flex-wrap gap-2 justify-center">
              {currentValue
                .filter((s) => !currentConfig.presets.includes(s))
                .map((tag) => (
                  <div
                    key={tag}
                    className="flex items-center gap-2 bg-[var(--foreground)] text-[var(--background)] px-4 py-2 rounded-full shadow-sm"
                  >
                    <span className="font-semibold text-sm">{tag}</span>
                    <button
                      onClick={() => handleRemoveTag(currentConfig.id, tag)}
                      className="text-[var(--background)]/60 hover:text-red-400 font-bold ml-1 transition-colors"
                    >
                      &times;
                    </button>
                  </div>
                ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="w-full h-full flex items-center justify-center p-4 md:p-8 relative overflow-hidden">
      {/* Abstract Background Elements specific to Onboarding */}
      <div className="absolute top-10 left-10 flex gap-2 opacity-30 pointer-events-none">
        <div className="w-16 h-16 bg-[var(--accent)] rounded-2xl rotate-12 backdrop-blur-md"></div>
      </div>
      <div className="absolute bottom-12 right-12 flex gap-2 opacity-20 pointer-events-none">
        <div className="w-20 h-20 bg-[var(--tertiary)] rounded-3xl -rotate-12 backdrop-blur-md"></div>
      </div>
      <div className="absolute top-1/4 right-24 w-12 h-12 bg-[var(--secondary)] rounded-xl rotate-45 opacity-20 pointer-events-none"></div>

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-[1000px] h-full max-h-[800px] bg-[var(--card-glass)] backdrop-blur-3xl border border-[var(--border-glass)] shadow-[0_30px_80px_rgba(0,0,0,0.08)] rounded-[var(--radius)] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="h-16 border-b border-[var(--border)]/50 bg-[var(--header-glass)] flex items-center justify-between px-8 shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-3.5 h-3.5 rounded-full bg-[#EE4266]/80"></div>
            <div className="w-3.5 h-3.5 rounded-full bg-[#FFD166]/80"></div>
            <div className="w-3.5 h-3.5 rounded-full bg-[#82D093]/80"></div>
          </div>
          <div className="font-['Fira_Code',monospace] font-bold text-[var(--foreground)]/40 text-xs tracking-widest uppercase">
            setup.careerlens.app
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="p-1.5 rounded-full hover:bg-[var(--input-glass)] text-[var(--foreground)]/60 transition-colors"
              title="Toggle Theme"
            >
              {isDarkMode ? (
                <Sun size={18} strokeWidth={2.5} />
              ) : (
                <Moon size={18} strokeWidth={2.5} />
              )}
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="px-10 py-6 flex flex-col gap-3 shrink-0 bg-gradient-to-b from-[var(--header-glass)] to-transparent">
          <div className="flex justify-between items-end">
            <span className="text-xs font-bold text-[var(--foreground)]/50 tracking-widest uppercase">
              Step {step + 1} of {activeSteps.length}
            </span>
            <span className="flex items-center gap-3">
              {!currentConfig.required && (
                <span className="px-3 py-1 bg-[var(--muted)] text-[var(--foreground)]/60 rounded-full text-[10px] font-bold tracking-widest uppercase">
                  Optional
                </span>
              )}
              <span className="text-xl font-black text-[var(--primary)]">
                {Math.round(((step + 1) / activeSteps.length) * 100)}%
              </span>
            </span>
          </div>
          <div className="w-full h-1.5 bg-[var(--muted)] rounded-full overflow-hidden flex">
            <div
              className="h-full bg-gradient-to-r from-[var(--secondary)] to-[var(--primary)] transition-all duration-500 ease-out rounded-full"
              style={{ width: `${((step + 1) / activeSteps.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 flex flex-col px-10 overflow-y-auto relative">
          <div className="w-full my-auto flex flex-col items-center py-10">
            <div className="text-center mb-10 w-full animate-fade-in-up">
              <div className="mx-auto w-16 h-16 bg-[var(--primary)]/10 text-[var(--primary)] rounded-2xl flex items-center justify-center mb-6 shadow-inner">
                {React.cloneElement(currentConfig.icon, {
                  size: 32,
                  strokeWidth: 2,
                })}
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[var(--foreground)]">
                {currentConfig.title}
              </h2>
              {!currentConfig.required && (
                <p className="mt-4 text-[var(--foreground)]/50 font-medium">
                  You can fill this out later.
                </p>
              )}
            </div>

            <div className="w-full flex justify-center animate-fade-in-up delay-75">
              {renderInput()}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="h-24 border-t border-[var(--border)]/50 bg-[var(--header-glass)] flex items-center justify-between px-10 shrink-0">
          <button
            onClick={handlePrev}
            disabled={step === 0}
            className={`flex items-center gap-2 px-8 py-3.5 rounded-full font-bold text-sm tracking-wide transition-all ${step === 0 ? "opacity-0 cursor-default pointer-events-none" : "bg-[var(--card-solid)] border border-[var(--border)] text-[var(--foreground)] hover:bg-[var(--muted)] shadow-sm hover:shadow-md"}`}
          >
            <ArrowLeft size={18} strokeWidth={2.5} /> Back
          </button>

          {step < activeSteps.length - 1 ? (
            <button
              onClick={handleNext}
              disabled={!isStepValid()}
              className={`flex items-center gap-2 px-8 py-3.5 rounded-full font-bold text-sm tracking-wide transition-all duration-300 ${isStepValid() ? (isOptionalAndEmpty ? "bg-[var(--card-solid)] text-[var(--foreground)] border border-[var(--border)] shadow-sm hover:shadow-md" : "bg-[var(--primary)] text-[var(--primary-foreground)] shadow-lg shadow-[var(--primary)]/20 hover:scale-105") : "opacity-50 cursor-not-allowed bg-[var(--muted)] text-[var(--foreground)]/40"}`}
            >
              {buttonActionText} <ArrowRight size={18} strokeWidth={2.5} />
            </button>
          ) : (
            <button
              onClick={onComplete}
              disabled={!isStepValid()}
              className={`flex items-center gap-2 px-8 py-3.5 rounded-full font-bold text-sm tracking-wide transition-all duration-300 ${isStepValid() ? "bg-[var(--foreground)] text-[var(--background)] shadow-xl shadow-black/10 hover:scale-105" : "opacity-50 cursor-not-allowed bg-[var(--muted)] text-[var(--foreground)]/40"}`}
            >
              FINISH{" "}
              <Check
                size={18}
                strokeWidth={2.5}
                className="text-[var(--accent)]"
              />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 2. LANDING / CHOICE PAGE COMPONENT
// ==========================================
const ChoicePage = ({
  isDarkMode,
  toggleTheme,
  onOpenDashboard,
  onOpenProfile,
  onOpenMockInterview,
  onOpenResumeAnalysis,
  onOpenLanding,
}) => {
  const gridCells = Array.from({ length: 300 });
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <div className="w-full h-full flex overflow-hidden relative">
      <OverlaySidebarNav
        isOpen={isNavOpen}
        setIsOpen={setIsNavOpen}
        activeItem={null}
        isDarkMode={isDarkMode}
        onToggleTheme={toggleTheme}
        onOpenLanding={onOpenLanding}
        onOpenDashboard={onOpenDashboard}
        onOpenResumeAnalysis={onOpenResumeAnalysis}
        onOpenMockInterview={onOpenMockInterview}
        onOpenProfile={onOpenProfile}
        backdropZClass="z-[8000]"
        navZClass="z-[9000]"
        inactiveButtonClass="bg-[var(--input-glass)] border border-transparent hover:border-[var(--primary)]/30 hover:bg-[var(--primary)] hover:text-[var(--primary-foreground)] text-[var(--foreground)] shadow-sm"
        themeButtonClass="bg-[var(--input-glass)] border border-transparent hover:border-[var(--foreground)]/20 hover:bg-[var(--background)] text-[var(--foreground)] shadow-sm"
        triggerTextClass="text-[var(--foreground)]/60 hover:text-[var(--primary)]"
      />

      {/* Main Content Area */}
      <main className="relative z-10 flex-1 h-full overflow-y-auto overflow-x-hidden p-4 md:p-6">
        <div className="min-h-full flex items-center justify-center py-4 md:py-8">
          <div className="w-full max-w-[1500px] grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-5">
          <div
            className="lg:col-span-8 lg:row-span-1 min-h-[320px] rounded-[var(--radius)] backdrop-blur-xl border relative overflow-hidden flex flex-col justify-center p-8 md:p-14 shadow-sm group transition-colors duration-500"
            style={{
              backgroundColor: "var(--color-box1-bg)",
              borderColor: "var(--color-box1-border)",
            }}
          >
            <div className="absolute inset-0 z-0 flex flex-wrap content-start overflow-hidden pointer-events-auto">
              {gridCells.map((_, i) => (
                <div
                  key={i}
                  className="w-[60px] h-[60px] hover:bg-[var(--primary)] hover:bg-opacity-10 transition-all duration-[1200ms] ease-out hover:duration-75 cursor-default border border-transparent hover:border-[var(--primary)]/20"
                ></div>
              ))}
            </div>
            <div className="relative z-10 pointer-events-none">
              <p className="text-[var(--primary)] font-['Fira_Code',monospace] font-bold mb-3 tracking-[0.2em] uppercase text-xs">
                Setup Complete
              </p>
              <h1 className="text-6xl md:text-8xl lg:text-[100px] font-extrabold tracking-tighter text-[var(--foreground)] leading-[0.85]">
                Select your
                <br />
                path.
              </h1>
            </div>
            <div className="absolute right-12 bottom-12 flex flex-col gap-2 z-10 opacity-100 pointer-events-none scale-75 md:scale-100 origin-bottom-right">
              <div className="flex gap-2">
                <div className="w-8 h-8 bg-[var(--foreground)] rounded-md"></div>
                <div className="w-8 h-8 bg-[var(--foreground)] rounded-md"></div>
              </div>
              <div className="flex gap-2">
                <div className="w-8 h-8 bg-transparent"></div>
                <div className="w-8 h-8 bg-[var(--primary)] rounded-md"></div>
                <div className="w-8 h-8 bg-[var(--secondary)] rounded-md"></div>
              </div>
            </div>
          </div>

          <button
            onClick={onOpenDashboard}
            className="lg:col-span-4 lg:row-span-1 min-h-[320px] rounded-[var(--radius)] backdrop-blur-xl border text-white p-8 md:p-12 flex flex-col justify-between items-start text-left hover:brightness-105 active:scale-[0.98] transition-all duration-500 group overflow-hidden relative shadow-md"
            style={{
              backgroundColor: "var(--color-box2-bg)",
              borderColor: "var(--color-box2-border)",
            }}
          >
            <div className="absolute -top-10 -right-10 w-56 h-56 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-all"></div>
            <div className="relative z-10 w-full flex justify-between items-start text-white">
              <div>
                <h3 className="text-4xl md:text-5xl font-extrabold tracking-tighter leading-[1.0] mb-3">
                  Metrics
                  <br />& Profile
                </h3>
                <p className="font-['Fira_Code',monospace] text-white/80 font-medium mt-2 text-sm">
                  Track your readiness
                </p>
              </div>
              <div className="w-14 h-14 rounded-full bg-white text-[var(--secondary)] flex items-center justify-center shrink-0 group-hover:rotate-45 transition-transform shadow-lg">
                <ArrowRight size={22} strokeWidth={2.5} />
              </div>
            </div>
            <div className="mt-8 flex gap-2 relative z-10">
              <div className="w-6 h-6 bg-white/30 rounded-md backdrop-blur-sm"></div>
              <div className="w-6 h-6 bg-white rounded-md shadow-sm"></div>
            </div>
          </button>

          <button
            onClick={onOpenMockInterview}
            className="lg:col-span-4 lg:row-span-1 min-h-[420px] rounded-[var(--radius)] backdrop-blur-xl border text-white p-8 md:p-12 flex flex-col justify-between items-start text-left hover:brightness-110 active:scale-[0.98] transition-all duration-500 group overflow-hidden relative shadow-md"
            style={{
              backgroundColor: "var(--color-box3-bg)",
              borderColor: "var(--color-box3-border)",
            }}
          >
            <div className="w-full flex justify-between items-start relative z-10">
              <div className="flex flex-col gap-3">
                <div className="w-16 h-16 bg-white rounded-[18px] flex items-center justify-center text-[var(--tertiary)] mb-2 shadow-xl">
                  <Bot size={36} strokeWidth={2} />
                </div>
                <p className="font-['Fira_Code',monospace] text-[var(--accent)] font-bold text-xs tracking-[0.15em] uppercase">
                  Voice AI Engine
                </p>
              </div>
              <div className="flex flex-col gap-2 opacity-100">
                <div className="flex gap-2">
                  <div className="w-6 h-6 bg-[var(--accent)] rounded-md shadow-sm backdrop-blur-sm"></div>
                  <div className="w-6 h-6 bg-[var(--accent)] rounded-md shadow-sm backdrop-blur-sm"></div>
                </div>
                <div className="flex gap-2">
                  <div className="w-6 h-6 bg-transparent"></div>
                  <div className="w-6 h-6 bg-[var(--accent)] rounded-md shadow-sm backdrop-blur-sm"></div>
                </div>
              </div>
            </div>
            <div className="relative z-10 mt-12 w-full text-white">
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter leading-[0.85] mb-8">
                Mock
                <br />
                AI Inter-
                <br />
                view.
              </h2>
              <div className="inline-flex items-center gap-3 bg-white text-[var(--tertiary)] px-7 py-3.5 rounded-full font-bold tracking-wide group-hover:px-9 transition-all shadow-lg">
                <Play size={18} className="fill-current" /> Start Session
              </div>
            </div>
          </button>

          <button
            onClick={onOpenResumeAnalysis}
            className="lg:col-span-8 lg:row-span-1 min-h-[420px] rounded-[var(--radius)] backdrop-blur-xl border text-white p-8 md:p-14 flex flex-col justify-between items-start text-left hover:brightness-105 active:scale-[0.98] transition-all duration-500 group overflow-hidden relative shadow-md"
            style={{
              backgroundColor: "var(--color-box4-bg)",
              borderColor: "var(--color-box4-border)",
            }}
          >
            <div className="w-full flex flex-col md:flex-row justify-between items-start gap-8 relative z-10 text-white">
              <div className="max-w-md">
                <p className="text-lg md:text-xl font-medium text-white/95 leading-relaxed mb-4">
                  Get instant ATS scoring, formatting fixes, and AI-driven
                  tailoring for your target roles.
                </p>
                <p
                  className="text-xs font-bold tracking-[0.2em] uppercase font-['Fira_Code',monospace] transition-colors duration-500"
                  style={{ color: "var(--color-box4-muted)" }}
                >
                  resume.careerlens.app
                </p>
              </div>
              <div className="flex gap-4 items-center self-end md:self-start">
                <div className="hidden md:flex flex-col gap-2 opacity-100">
                  <div className="flex gap-2">
                    <div className="w-8 h-8 bg-transparent"></div>
                    <div
                      className="w-8 h-8 rounded-md backdrop-blur-sm transition-colors duration-500"
                      style={{ backgroundColor: "var(--color-box4-deco1)" }}
                    ></div>
                    <div
                      className="w-8 h-8 rounded-md backdrop-blur-sm transition-colors duration-500"
                      style={{ backgroundColor: "var(--color-box4-deco2)" }}
                    ></div>
                  </div>
                  <div className="flex gap-2">
                    <div
                      className="w-8 h-8 rounded-md backdrop-blur-sm transition-colors duration-500"
                      style={{ backgroundColor: "var(--color-box4-deco2)" }}
                    ></div>
                    <div className="w-8 h-8 bg-transparent"></div>
                    <div className="w-8 h-8 bg-white shadow-sm rounded-md"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-12 w-full flex flex-col md:flex-row justify-between items-end gap-8 relative z-10 text-white">
              <h2 className="text-6xl md:text-8xl lg:text-[110px] font-extrabold tracking-tighter leading-[0.85]">
                Resume
                <br />
                Analysis
              </h2>
              <div className="inline-flex shrink-0 items-center justify-center w-24 h-24 bg-white text-[var(--primary)] rounded-full group-hover:scale-110 group-hover:bg-[var(--background)] group-hover:text-[var(--foreground)] transition-all shadow-2xl">
                <Upload size={32} strokeWidth={2.5} />
              </div>
            </div>
            <div className="absolute -bottom-24 -right-16 flex flex-col gap-4 z-0 opacity-[0.08] pointer-events-none scale-150 rotate-12">
              <div className="flex gap-4">
                <div className="w-40 h-40 bg-white rounded-2xl"></div>
                <div className="w-40 h-40 bg-white rounded-2xl"></div>
              </div>
              <div className="flex gap-4">
                <div className="w-40 h-40 bg-transparent"></div>
                <div className="w-40 h-40 bg-white rounded-2xl"></div>
              </div>
            </div>
          </button>
          </div>
        </div>
      </main>
    </div>
  );
};

// ==========================================
// 3. MAIN APP
// ==========================================
export default function OnboardingAndLanding({
  startOnboarding = true,
  onOnboardingComplete,
  onOpenLanding,
  onOpenDashboard,
  onOpenProfile,
  onOpenMockInterview,
  onOpenResumeAnalysis,
  isDarkMode: controlledIsDarkMode,
  onToggleTheme,
}) {
  const [isOnboardingComplete, setIsOnboardingComplete] = useState(
    !startOnboarding,
  );
  const [internalDarkMode, setInternalDarkMode] = useState(true);
  const isDarkMode =
    typeof controlledIsDarkMode === "boolean"
      ? controlledIsDarkMode
      : internalDarkMode;
  const toggleTheme = () => {
    if (onToggleTheme) {
      onToggleTheme();
      return;
    }
    setInternalDarkMode((prev) => !prev);
  };
  const currentTheme = isDarkMode ? darkTheme : lightTheme;

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Fira+Code:wght@400;500;700&display=swap');
        ::-webkit-scrollbar { display: none; }
        input[type="number"]::-webkit-inner-spin-button, input[type="number"]::-webkit-outer-spin-button { -webkit-appearance: none; margin: 0; }
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none; appearance: none;
          width: 24px; height: 24px; border-radius: 50%;
          background: var(--primary); border: 4px solid var(--card-solid); cursor: pointer; box-shadow: 0 2px 6px rgba(0,0,0,0.2);
        }
        
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in-up { animation: fadeInUp 0.4s ease-out forwards; }
        .delay-75 { animation-delay: 75ms; }
      `,
        }}
      />

      <div
        style={currentTheme}
        className="relative w-full h-screen overflow-hidden bg-[var(--background)] font-['Plus_Jakarta_Sans',sans-serif] text-[var(--foreground)] selection:bg-[var(--primary)] selection:text-[var(--primary-foreground)] transition-colors duration-500"
      >
        {/* Ambient Background Glows */}
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-[radial-gradient(circle_at_center,var(--primary-glow)_0%,transparent_60%)] pointer-events-none z-0 transition-colors duration-500"></div>
        <div className="absolute top-[0%] right-[-10%] w-[50%] h-[70%] bg-[radial-gradient(circle_at_center,var(--tertiary-glow)_0%,transparent_60%)] pointer-events-none z-0 transition-colors duration-500"></div>
        <div className="absolute bottom-[-20%] left-[10%] w-[60%] h-[60%] bg-[radial-gradient(circle_at_center,var(--secondary-glow)_0%,transparent_60%)] pointer-events-none z-0 transition-colors duration-500"></div>

        {/* View 1: Onboarding */}
        <div
          className={`absolute inset-0 w-full h-full z-10 ${
            isOnboardingComplete ? "pointer-events-none" : ""
          }`}
          aria-hidden={isOnboardingComplete}
        >
          <Onboarding
            onComplete={() => {
              setIsOnboardingComplete(true);
              if (onOnboardingComplete) onOnboardingComplete();
            }}
            isDarkMode={isDarkMode}
            toggleTheme={toggleTheme}
          />
        </div>

        {/* Transition Panels */}
        <div
          className={`absolute inset-0 w-full h-full bg-[var(--accent)] transition-transform duration-[1000ms] ease-[cubic-bezier(0.76,0,0.24,1)] z-20 transform-gpu will-change-transform
          ${isOnboardingComplete ? "translate-y-0" : "translate-y-full"}`}
        />
        <div
          className={`absolute inset-0 w-full h-full bg-[var(--secondary)] transition-transform duration-[1000ms] ease-[cubic-bezier(0.76,0,0.24,1)] z-30 transform-gpu will-change-transform
          ${isOnboardingComplete ? "translate-y-0" : "translate-y-full"}`}
          style={{ transitionDelay: isOnboardingComplete ? "150ms" : "0ms" }}
        />

        {/* View 2: Choice Page */}
        <div
          className={`absolute inset-0 w-full h-full bg-[var(--background)] transition-transform duration-[1000ms] ease-[cubic-bezier(0.76,0,0.24,1)] z-40 transform-gpu will-change-transform transition-colors
          ${isOnboardingComplete ? "translate-y-0" : "translate-y-full pointer-events-none invisible"}`}
          style={{ transitionDelay: isOnboardingComplete ? "300ms" : "0ms" }}
          aria-hidden={!isOnboardingComplete}
        >
          {/* Re-apply the ambient glows inside the choice page layer for correct stacking */}
          <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-[radial-gradient(circle_at_center,var(--primary-glow)_0%,transparent_60%)] pointer-events-none z-0 transition-colors duration-500"></div>
          <div className="absolute top-[0%] right-[-10%] w-[50%] h-[70%] bg-[radial-gradient(circle_at_center,var(--tertiary-glow)_0%,transparent_60%)] pointer-events-none z-0 transition-colors duration-500"></div>
          <div className="absolute bottom-[-20%] left-[10%] w-[60%] h-[60%] bg-[radial-gradient(circle_at_center,var(--secondary-glow)_0%,transparent_60%)] pointer-events-none z-0 transition-colors duration-500"></div>

          <ChoicePage
            isDarkMode={isDarkMode}
            toggleTheme={toggleTheme}
            onOpenDashboard={onOpenDashboard}
            onOpenProfile={onOpenProfile}
            onOpenMockInterview={onOpenMockInterview}
            onOpenResumeAnalysis={onOpenResumeAnalysis}
            onOpenLanding={onOpenLanding}
          />
        </div>
      </div>
    </>
  );
}
