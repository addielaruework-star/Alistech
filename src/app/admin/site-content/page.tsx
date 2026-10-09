"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { useAuth } from "@/lib/auth-context";
import { motion, AnimatePresence } from "framer-motion";
import {
  Layers,
  Save,
  Send,
  History,
  RotateCcw,
  Plus,
  Trash2,
  ChevronUp,
  ChevronDown,
  Eye,
  EyeOff,
  AlertCircle,
  Download,
  Image as ImageIcon,
  Clock,
  X,
  Link as LinkIcon,
} from "lucide-react";
import { toast } from "sonner";
import {
  getDraftContent,
  saveDraftContent,
  publishContent,
  getContentHistory,
  restoreContentVersion,
} from "@/lib/site-content";
import { uploadSiteImage } from "@/lib/site-storage";
import { FAQ_ITEMS } from "@/lib/constants";
import {
  type SectionSchema,
  type FieldDefinition,
  type SubFieldDefinition,
  type SiteContentHistoryEntry,
  type FAQSectionContent,
} from "@/types/site-content";

/* ── FAQ Schema Definition ────────────────────────────────────────────────── */
const DEFAULT_FAQ: FAQSectionContent = {
  visible: true,
  eyebrow: "FAQ",
  title: "Frequently Asked ", // Notice: Trailing space exactly matches original FAQSection
  highlight: "Questions",
  subtitle: "Answers to common questions about working with AlisTech.",
  items: FAQ_ITEMS.map((item) => ({ ...item })),
};

const FAQ_SCHEMA: SectionSchema = {
  sectionKey: "faq",
  title: "FAQ Section",
  description: "Frequently Asked Questions accordion section",
  defaults: DEFAULT_FAQ,
  fields: [
    {
      key: "visible",
      label: "Section Visibility",
      type: "boolean",
      description: "Control whether this section appears on the public website",
    },
    {
      key: "eyebrow",
      label: "Eyebrow Badge",
      type: "text",
      maxLength: 60,
      placeholder: "e.g. FAQ",
    },
    {
      key: "title",
      label: "Title Prefix",
      type: "text",
      maxLength: 120, // Requirement 4: title 120 max length
      placeholder: "Frequently Asked ",
    },
    {
      key: "highlight",
      label: "Title Highlight (Gradient Glow)",
      type: "text",
      maxLength: 120,
      placeholder: "Questions",
    },
    {
      key: "subtitle",
      label: "Subtitle / Description",
      type: "textarea",
      maxLength: 300, // Requirement 4: subtitle 300 max length
      placeholder: "Answers to common questions about working with AlisTech.",
    },
    {
      key: "items",
      label: "FAQ Questions & Answers",
      type: "card-list",
      description: "Interactive question and answer accordion cards",
      subFields: [
        {
          key: "question",
          label: "Question Title",
          type: "text",
          maxLength: 200, // Requirement 4: question 200 max length
          placeholder: "e.g. How long does a project usually take?",
        },
        {
          key: "answer",
          label: "Answer Details",
          type: "textarea",
          maxLength: 1500, // Requirement 4: answer 1500 max length
          placeholder: "Detailed explanation...",
        },
      ],
    },
  ],
};

/* ── Registered Section Schemas (FAQ only for now per instruction) ──────── */
const REGISTERED_SECTIONS: SectionSchema[] = [FAQ_SCHEMA];

export default function SiteContentAdminPage() {
  const { user, isAdmin } = useAuth();

  /* ── Active Schema ─────────────────────────────────────────────────────── */
  const [selectedKey, setSelectedKey] = useState<string>("faq");
  const activeSchema = useMemo(
    () =>
      REGISTERED_SECTIONS.find((s) => s.sectionKey === selectedKey) ||
      REGISTERED_SECTIONS[0],
    [selectedKey]
  );

  /* ── Form State ────────────────────────────────────────────────────────── */
  const [formData, setFormData] = useState<Record<string, any>>(activeSchema.defaults);
  const [loading, setLoading] = useState(true);
  const [savingDraft, setSavingDraft] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  /* ── History State ─────────────────────────────────────────────────────── */
  const [historyOpen, setHistoryOpen] = useState(false);
  const [historyEntries, setHistoryEntries] = useState<SiteContentHistoryEntry[]>([]);
  const [loadingHistory, setLoadingHistory] = useState(false);
  const [restoringId, setRestoringId] = useState<string | null>(null);

  const fetchedRef = useRef(false);

  /* ── Requirement 4: Warn when leaving page with unsaved changes ────────── */
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = "You have unsaved changes in your draft. Are you sure you want to leave?";
        return e.returnValue;
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [hasUnsavedChanges]);

  /* ── Initial Load ──────────────────────────────────────────────────────── */
  const loadDraft = async (schema: SectionSchema) => {
    setLoading(true);
    try {
      const data = await getDraftContent(schema.sectionKey, schema.defaults);
      setFormData(data || schema.defaults);
      setHasUnsavedChanges(false);
    } catch (err: any) {
      console.error("Failed to load draft:", err);
      toast.error("Failed to load section draft.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user || !isAdmin) return;
    if (fetchedRef.current) return;
    fetchedRef.current = true;
    loadDraft(activeSchema);
  }, [user, isAdmin, activeSchema]);

  /* ── Value Mutation Helpers ────────────────────────────────────────────── */
  const updateFieldValue = (key: string, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    setHasUnsavedChanges(true);
  };

  /* ── Load Current Hardcoded Content into Draft ─────────────────────────── */
  const handleLoadCurrentContent = async () => {
    if (
      !confirm(
        "Load hardcoded defaults into this draft? This will replace your current editor content with the original static site copy."
      )
    ) {
      return;
    }

    try {
      setFormData(activeSchema.defaults);
      await saveDraftContent(
        activeSchema.sectionKey,
        activeSchema.defaults,
        user?.email ?? undefined
      );
      setHasUnsavedChanges(false);
      toast.success("Loaded current site defaults into draft!");
    } catch (err: any) {
      console.error("Failed to write defaults to draft:", err);
      toast.error("Failed to save defaults to draft.");
    }
  };

  /* ── Save Draft ────────────────────────────────────────────────────────── */
  const handleSaveDraft = async () => {
    setSavingDraft(true);
    try {
      await saveDraftContent(
        activeSchema.sectionKey,
        formData,
        user?.email ?? undefined
      );
      setHasUnsavedChanges(false);
      toast.success("Draft saved successfully.");
    } catch (err: any) {
      console.error("Save draft failed:", err);
      toast.error("Failed to save draft.");
    } finally {
      setSavingDraft(false);
    }
  };

  /* ── Requirement 2: Publish confirm text mentions ~1 minute ───────────── */
  const handlePublish = async () => {
    if (
      !confirm(
        "Publish this content live? Changes will appear on the public website within about a minute."
      )
    ) {
      return;
    }

    setPublishing(true);
    try {
      await publishContent(
        activeSchema.sectionKey,
        formData,
        user?.email ?? undefined
      );
      setHasUnsavedChanges(false);
      toast.success("Section published live to website!");
    } catch (err: any) {
      console.error("Publish failed:", err);
      toast.error("Failed to publish content.");
    } finally {
      setPublishing(false);
    }
  };

  /* ── History Actions ───────────────────────────────────────────────────── */
  const openHistory = async () => {
    setHistoryOpen(true);
    setLoadingHistory(true);
    try {
      const list = await getContentHistory(activeSchema.sectionKey);
      setHistoryEntries(list);
    } catch (err: any) {
      console.error("Failed to load history:", err);
      toast.error("Failed to load version history.");
    } finally {
      setLoadingHistory(false);
    }
  };

  const handleRestore = async (entry: SiteContentHistoryEntry) => {
    if (
      !confirm(
        "Restore this version to your editor draft? You can review it before publishing."
      )
    ) {
      return;
    }

    setRestoringId(entry.id);
    try {
      const restored = await restoreContentVersion(
        activeSchema.sectionKey,
        entry.id,
        user?.email ?? undefined
      );
      if (restored) {
        setFormData(restored);
        setHasUnsavedChanges(true);
        setHistoryOpen(false);
        toast.success("Version restored to draft! Review and click Publish when ready.");
      }
    } catch (err: any) {
      console.error("Restore failed:", err);
      toast.error("Failed to restore version.");
    } finally {
      setRestoringId(null);
    }
  };

  /* ── Generic Schema Field Renderer ─────────────────────────────────────── */
  const renderField = (field: FieldDefinition) => {
    const value = formData[field.key];

    switch (field.type) {
      case "boolean":
        return (
          <div
            key={field.key}
            className="flex items-center justify-between pb-6 border-b border-white/[0.05]"
          >
            <div>
              <h3 className="font-sora font-semibold text-sm text-white">
                {field.label}
              </h3>
              {field.description && (
                <p className="text-white/40 text-xs mt-0.5">
                  {field.description}
                </p>
              )}
            </div>

            <button
              type="button"
              onClick={() => updateFieldValue(field.key, !value)}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                value
                  ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                  : "bg-red-500/10 border-red-500/30 text-red-400"
              }`}
            >
              {value ? (
                <>
                  <Eye className="w-3.5 h-3.5" /> Published (Visible)
                </>
              ) : (
                <>
                  <EyeOff className="w-3.5 h-3.5" /> Hidden (Draft only)
                </>
              )}
            </button>
          </div>
        );

      case "text":
        return (
          <div key={field.key} className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-medium text-white/60">
                {field.label}
              </label>
              {field.maxLength && (
                <span className="text-[10px] text-white/30">
                  {String(value || "").length} / {field.maxLength}
                </span>
              )}
            </div>
            <input
              type="text"
              maxLength={field.maxLength}
              value={value || ""}
              onChange={(e) => updateFieldValue(field.key, e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-sm text-white placeholder-white/20 focus:outline-none focus:border-blue-500/50"
              placeholder={field.placeholder}
            />
            {field.description && (
              <p className="text-[11px] text-white/30">{field.description}</p>
            )}
          </div>
        );

      case "textarea":
        return (
          <div key={field.key} className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-medium text-white/60">
                {field.label}
              </label>
              {field.maxLength && (
                <span className="text-[10px] text-white/30">
                  {String(value || "").length} / {field.maxLength}
                </span>
              )}
            </div>
            <textarea
              rows={3}
              maxLength={field.maxLength}
              value={value || ""}
              onChange={(e) => updateFieldValue(field.key, e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-sm text-white placeholder-white/20 focus:outline-none focus:border-blue-500/50 leading-relaxed"
              placeholder={field.placeholder}
            />
            {field.description && (
              <p className="text-[11px] text-white/30">{field.description}</p>
            )}
          </div>
        );

      case "image":
        return (
          <div key={field.key} className="space-y-2">
            <label className="block text-xs font-medium text-white/60">
              {field.label}
            </label>
            <div className="flex items-center gap-4">
              {value ? (
                <div className="w-16 h-16 rounded-xl border border-white/10 overflow-hidden bg-white/5 relative flex-shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={value}
                    alt={field.label}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="w-16 h-16 rounded-xl border border-white/10 flex items-center justify-center bg-white/5 text-white/20 flex-shrink-0">
                  <ImageIcon className="w-6 h-6" />
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  try {
                    const toastId = toast.loading("Uploading image...");
                    const url = await uploadSiteImage(activeSchema.sectionKey, file);
                    updateFieldValue(field.key, url);
                    toast.dismiss(toastId);
                    toast.success("Image uploaded!");
                  } catch (err: any) {
                    toast.error(err?.message || "Upload failed");
                  }
                }}
                className="text-xs text-white/50 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-blue-600/10 file:text-blue-400 hover:file:bg-blue-600/20 cursor-pointer"
              />
            </div>
          </div>
        );

      case "link":
        const linkVal = value || { label: "", href: "" };
        return (
          <div key={field.key} className="space-y-2">
            <label className="block text-xs font-medium text-white/60">
              {field.label}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="Button Label (e.g. Learn More)"
                value={linkVal.label || ""}
                onChange={(e) =>
                  updateFieldValue(field.key, {
                    ...linkVal,
                    label: e.target.value,
                  })
                }
                className="px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-xs text-white placeholder-white/20 focus:outline-none focus:border-blue-500/50"
              />
              <input
                type="text"
                placeholder="Link URL (e.g. /contact or https://...)"
                value={linkVal.href || ""}
                onChange={(e) =>
                  updateFieldValue(field.key, {
                    ...linkVal,
                    href: e.target.value,
                  })
                }
                className="px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-xs text-white placeholder-white/20 focus:outline-none focus:border-blue-500/50"
              />
            </div>
          </div>
        );

      case "card-list":
        const items: any[] = Array.isArray(value) ? value : [];
        const subFields = field.subFields || [];

        const handleAddCard = () => {
          const newItem: Record<string, any> = {};
          subFields.forEach((sf) => {
            newItem[sf.key] = "";
          });
          updateFieldValue(field.key, [...items, newItem]);
        };

        const handleDeleteCard = (idx: number) => {
          if (items.length <= 1) {
            toast.error("At least one item must remain in the list.");
            return;
          }
          const next = items.filter((_, i) => i !== idx);
          updateFieldValue(field.key, next);
        };

        const handleMoveCard = (idx: number, direction: "up" | "down") => {
          const target = direction === "up" ? idx - 1 : idx + 1;
          if (target < 0 || target >= items.length) return;
          const next = [...items];
          const temp = next[idx];
          next[idx] = next[target];
          next[target] = temp;
          updateFieldValue(field.key, next);
        };

        const handleSubFieldChange = (idx: number, subKey: string, subVal: any) => {
          const next = [...items];
          next[idx] = { ...next[idx], [subKey]: subVal };
          updateFieldValue(field.key, next);
        };

        return (
          <div key={field.key} className="pt-6 border-t border-white/[0.05] space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-widest text-white/40">
                  {field.label} ({items.length})
                </h3>
                {field.description && (
                  <p className="text-white/30 text-[11px] mt-0.5">
                    {field.description}
                  </p>
                )}
              </div>

              <button
                type="button"
                onClick={handleAddCard}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-blue-600/10 border border-blue-500/20 text-blue-400 hover:bg-blue-600/20 transition-all"
              >
                <Plus className="w-3.5 h-3.5" />
                Add Item
              </button>
            </div>

            <div className="space-y-3">
              {items.map((item, index) => (
                <div
                  key={index}
                  className="p-4 rounded-xl border border-white/[0.06] bg-white/[0.02] space-y-3 group hover:border-white/[0.12] transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-white/40 font-sora">
                      Item #{index + 1}
                    </span>

                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        disabled={index === 0}
                        onClick={() => handleMoveCard(index, "up")}
                        className="p-1 rounded text-white/30 hover:text-white disabled:opacity-20 hover:bg-white/[0.05]"
                        title="Move Up"
                      >
                        <ChevronUp className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        disabled={index === items.length - 1}
                        onClick={() => handleMoveCard(index, "down")}
                        className="p-1 rounded text-white/30 hover:text-white disabled:opacity-20 hover:bg-white/[0.05]"
                        title="Move Down"
                      >
                        <ChevronDown className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteCard(index)}
                        className="p-1 rounded text-red-400/50 hover:text-red-400 hover:bg-red-500/[0.08] ml-1"
                        title="Delete Item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Render Card Subfields Dynamically */}
                  <div className="space-y-3">
                    {subFields.map((sf: SubFieldDefinition) => {
                      const sfVal = item[sf.key] || "";
                      return (
                        <div key={sf.key} className="space-y-1">
                          <div className="flex items-center justify-between">
                            <label className="block text-[11px] font-medium text-white/50">
                              {sf.label}
                            </label>
                            {sf.maxLength && (
                              <span className="text-[10px] text-white/30">
                                {String(sfVal).length} / {sf.maxLength}
                              </span>
                            )}
                          </div>

                          {sf.type === "textarea" ? (
                            <textarea
                              rows={2}
                              maxLength={sf.maxLength}
                              value={sfVal}
                              onChange={(e) =>
                                handleSubFieldChange(index, sf.key, e.target.value)
                              }
                              className="w-full px-3 py-2 rounded-lg bg-white/[0.03] border border-white/[0.06] text-xs text-white/80 placeholder-white/20 focus:outline-none focus:border-blue-500/50 leading-relaxed"
                              placeholder={sf.placeholder}
                            />
                          ) : (
                            <input
                              type="text"
                              maxLength={sf.maxLength}
                              value={sfVal}
                              onChange={(e) =>
                                handleSubFieldChange(index, sf.key, e.target.value)
                              }
                              className="w-full px-3 py-2 rounded-lg bg-white/[0.03] border border-white/[0.06] text-xs font-semibold text-white placeholder-white/20 focus:outline-none focus:border-blue-500/50"
                              placeholder={sf.placeholder}
                            />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto py-12 space-y-6">
        <div className="h-8 w-48 rounded-lg bg-white/[0.05] animate-pulse" />
        <div className="h-64 rounded-2xl bg-white/[0.02] border border-white/[0.05] animate-pulse" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      {/* ── Top Header Bar ───────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.06] pb-6">
        <div>
          <div className="flex items-center gap-2.5 mb-1">
            <div className="w-7 h-7 rounded-lg bg-blue-600/15 border border-blue-500/20 flex items-center justify-center">
              <Layers className="w-3.5 h-3.5 text-blue-400" />
            </div>
            <h1 className="font-sora font-bold text-xl text-white">Site Content CMS</h1>
          </div>
          <p className="text-white/40 text-xs">
            Schema-driven editor for live public website sections with drafts & version history.
          </p>
        </div>

        {/* Global Action Controls */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={openHistory}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-white/[0.03] border border-white/[0.08] text-white/70 hover:text-white hover:bg-white/[0.06] transition-all"
          >
            <History className="w-3.5 h-3.5" />
            History
          </button>

          <button
            type="button"
            onClick={handleSaveDraft}
            disabled={savingDraft || publishing}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-white/[0.05] border border-white/[0.1] text-white hover:bg-white/[0.08] transition-all disabled:opacity-50"
          >
            <Save className="w-3.5 h-3.5 text-blue-400" />
            {savingDraft ? "Saving..." : "Save Draft"}
          </button>

          <button
            type="button"
            onClick={handlePublish}
            disabled={savingDraft || publishing}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white shadow-[0_0_20px_rgba(37,99,235,0.3)] transition-all disabled:opacity-50"
          >
            <Send className="w-3.5 h-3.5" />
            {publishing ? "Publishing..." : "Publish Live"}
          </button>
        </div>
      </div>

      {/* ── Section Selection & Default Importer ─────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold text-white/40 uppercase tracking-wider">
            Section:
          </span>
          <div className="inline-flex rounded-lg border border-white/[0.08] bg-[#08080d] p-1">
            {REGISTERED_SECTIONS.map((sec) => (
              <button
                key={sec.sectionKey}
                onClick={() => {
                  setSelectedKey(sec.sectionKey);
                  loadDraft(sec);
                }}
                className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${
                  selectedKey === sec.sectionKey
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-white/40 hover:text-white"
                }`}
              >
                {sec.title}
              </button>
            ))}
          </div>
        </div>

        {/* Load Current Content Button */}
        <button
          type="button"
          onClick={handleLoadCurrentContent}
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium bg-blue-600/10 border border-blue-500/20 text-blue-400 hover:bg-blue-600/20 transition-all self-start sm:self-auto"
          title="Reset or seed draft with hardcoded static copy"
        >
          <Download className="w-3.5 h-3.5" />
          Load current content
        </button>
      </div>

      {/* ── Unsaved Changes Alert ────────────────────────────────────────── */}
      {hasUnsavedChanges && (
        <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>
            You have unsaved changes in this draft. Leaving the page now will discard them. Click <b>Save Draft</b> or <b>Publish Live</b> to persist.
          </span>
        </div>
      )}

      {/* ── Schema Fields Rendered Dynamically ───────────────────────────── */}
      <div className="space-y-6 rounded-2xl border border-white/[0.07] bg-white/[0.015] p-6 lg:p-8">
        {activeSchema.fields.map((field) => renderField(field))}
      </div>

      {/* ── Version History Slide-Over Drawer ────────────────────────────── */}
      <AnimatePresence>
        {historyOpen && (
          <div className="fixed inset-0 z-50 flex justify-end">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setHistoryOpen(false)}
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 280 }}
              className="relative w-full max-w-md h-full bg-[#08080d] border-l border-white/[0.08] p-6 overflow-y-auto flex flex-col z-10"
            >
              <div className="flex items-center justify-between pb-4 border-b border-white/[0.06]">
                <div className="flex items-center gap-2">
                  <History className="w-4 h-4 text-blue-400" />
                  <h2 className="font-sora font-semibold text-sm text-white">
                    Version History
                  </h2>
                </div>
                <button
                  onClick={() => setHistoryOpen(false)}
                  className="p-1 rounded text-white/40 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 py-4 space-y-3">
                {loadingHistory ? (
                  <p className="text-white/40 text-xs text-center py-8">
                    Loading snapshots...
                  </p>
                ) : historyEntries.length === 0 ? (
                  <div className="text-center py-12 space-y-2">
                    <Clock className="w-6 h-6 text-white/20 mx-auto" />
                    <p className="text-white/40 text-xs">
                      No published history snapshots yet.
                    </p>
                    <p className="text-white/20 text-[11px]">
                      Each time you click &quot;Publish Live&quot;, an immutable revision is archived here.
                    </p>
                  </div>
                ) : (
                  historyEntries.map((entry) => {
                    const date = entry.publishedAt?.toDate
                      ? entry.publishedAt.toDate()
                      : new Date();
                    const dateStr = date.toLocaleString();
                    return (
                      <div
                        key={entry.id}
                        className="p-3.5 rounded-xl border border-white/[0.06] bg-white/[0.02] flex items-center justify-between gap-3"
                      >
                        <div>
                          <p className="text-xs font-semibold text-white">
                            {dateStr}
                          </p>
                          <p className="text-[10px] text-white/30">
                            By {entry.publishedBy || "admin"} · {entry.content?.items?.length || 0} items
                          </p>
                        </div>

                        <button
                          type="button"
                          disabled={restoringId === entry.id}
                          onClick={() => handleRestore(entry)}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-semibold bg-white/[0.05] border border-white/[0.1] text-white/70 hover:text-white hover:bg-white/[0.1] transition-all disabled:opacity-50"
                        >
                          <RotateCcw className="w-3 h-3 text-blue-400" />
                          {restoringId === entry.id ? "Restoring..." : "Restore"}
                        </button>
                      </div>
                    );
                  })
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
