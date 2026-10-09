"use client";

import { useState, useEffect, useRef } from "react";
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
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Download,
  Image as ImageIcon,
  Sparkles,
  Clock,
  X,
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
  type FAQSectionContent,
  type FAQItem,
  type SiteContentHistoryEntry,
} from "@/types/site-content";

/* ── Hardcoded Defaults for "Load current content" ───────────────────────── */
const DEFAULT_FAQ: FAQSectionContent = {
  visible: true,
  eyebrow: "FAQ",
  title: "Frequently Asked",
  highlight: "Questions",
  subtitle: "Answers to common questions about working with AlisTech.",
  items: FAQ_ITEMS.map((item) => ({ ...item })),
};

export default function SiteContentAdminPage() {
  const { user, isAdmin } = useAuth();

  /* ── Section Selection ─────────────────────────────────────────────────── */
  const [selectedSection, setSelectedSection] = useState<"faq">("faq");

  /* ── Form State (FAQ) ──────────────────────────────────────────────────── */
  const [formData, setFormData] = useState<FAQSectionContent>(DEFAULT_FAQ);
  const [loading, setLoading] = useState(true);
  const [savingDraft, setSavingDraft] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  /* ── History Modal / Drawer ────────────────────────────────────────────── */
  const [historyOpen, setHistoryOpen] = useState(false);
  const [historyEntries, setHistoryEntries] = useState<SiteContentHistoryEntry[]>([]);
  const [loadingHistory, setLoadingHistory] = useState(false);
  const [restoringId, setRestoringId] = useState<string | null>(null);

  const fetchedRef = useRef(false);

  /* ── Initial Load ──────────────────────────────────────────────────────── */
  const loadSectionDraft = async () => {
    setLoading(true);
    try {
      const data = await getDraftContent<FAQSectionContent>(
        selectedSection,
        DEFAULT_FAQ
      );
      setFormData(data || DEFAULT_FAQ);
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
    loadSectionDraft();
  }, [user, isAdmin, selectedSection]);

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
      setFormData(DEFAULT_FAQ);
      await saveDraftContent(selectedSection, DEFAULT_FAQ, user?.email ?? undefined);
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
      await saveDraftContent(selectedSection, formData, user?.email ?? undefined);
      setHasUnsavedChanges(false);
      toast.success("Draft saved successfully.");
    } catch (err: any) {
      console.error("Save draft failed:", err);
      toast.error("Failed to save draft.");
    } finally {
      setSavingDraft(false);
    }
  };

  /* ── Publish Live ──────────────────────────────────────────────────────── */
  const handlePublish = async () => {
    if (
      !confirm(
        "Publish this content live? Visitors will see these changes immediately on the public website."
      )
    ) {
      return;
    }

    setPublishing(true);
    try {
      await publishContent(selectedSection, formData, user?.email ?? undefined);
      setHasUnsavedChanges(false);
      toast.success("Section published live to website!");
    } catch (err: any) {
      console.error("Publish failed:", err);
      toast.error("Failed to publish content.");
    } finally {
      setPublishing(false);
    }
  };

  /* ── History Viewer & Restore ──────────────────────────────────────────── */
  const openHistory = async () => {
    setHistoryOpen(true);
    setLoadingHistory(true);
    try {
      const list = await getContentHistory(selectedSection);
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
        selectedSection,
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

  /* ── Card List Helpers (FAQ Items) ─────────────────────────────────────── */
  const handleItemChange = (
    index: number,
    field: "question" | "answer",
    value: string
  ) => {
    const next = [...formData.items];
    next[index] = { ...next[index], [field]: value };
    setFormData({ ...formData, items: next });
    setHasUnsavedChanges(true);
  };

  const handleAddItem = () => {
    setFormData({
      ...formData,
      items: [
        ...formData.items,
        { question: "New Question Title", answer: "Provide a detailed answer here." },
      ],
    });
    setHasUnsavedChanges(true);
  };

  const handleDeleteItem = (index: number) => {
    if (formData.items.length <= 1) {
      toast.error("At least one item must remain in the list.");
      return;
    }
    const next = formData.items.filter((_, i) => i !== index);
    setFormData({ ...formData, items: next });
    setHasUnsavedChanges(true);
  };

  const handleMoveItem = (index: number, direction: "up" | "down") => {
    const target = direction === "up" ? index - 1 : index + 1;
    if (target < 0 || target >= formData.items.length) return;
    const next = [...formData.items];
    const temp = next[index];
    next[index] = next[target];
    next[target] = temp;
    setFormData({ ...formData, items: next });
    setHasUnsavedChanges(true);
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
            <button
              className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${
                selectedSection === "faq"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-white/40 hover:text-white"
              }`}
            >
              FAQ Section
            </button>
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
          <span>You have unsaved changes in this draft. Click <b>Save Draft</b> or <b>Publish Live</b> when finished.</span>
        </div>
      )}

      {/* ── Schema Fields Editor ─────────────────────────────────────────── */}
      <div className="space-y-6 rounded-2xl border border-white/[0.07] bg-white/[0.015] p-6 lg:p-8">
        
        {/* Section Visibility Toggle */}
        <div className="flex items-center justify-between pb-6 border-b border-white/[0.05]">
          <div>
            <h3 className="font-sora font-semibold text-sm text-white flex items-center gap-2">
              Section Visibility
            </h3>
            <p className="text-white/40 text-xs mt-0.5">
              Control whether this section appears on the public website.
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              setFormData({ ...formData, visible: !formData.visible });
              setHasUnsavedChanges(true);
            }}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium border transition-all ${
              formData.visible
                ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                : "bg-red-500/10 border-red-500/30 text-red-400"
            }`}
          >
            {formData.visible ? (
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

        {/* Section Headings (Eyebrow, Title, Highlight, Subtitle) */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-widest text-white/40">
            Section Headings & Copy
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium text-white/60 mb-1.5">
                Eyebrow Badge
              </label>
              <input
                type="text"
                value={formData.eyebrow}
                onChange={(e) => {
                  setFormData({ ...formData, eyebrow: e.target.value });
                  setHasUnsavedChanges(true);
                }}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-sm text-white placeholder-white/20 focus:outline-none focus:border-blue-500/50"
                placeholder="e.g. FAQ"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-white/60 mb-1.5">
                Title Prefix
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => {
                  setFormData({ ...formData, title: e.target.value });
                  setHasUnsavedChanges(true);
                }}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-sm text-white placeholder-white/20 focus:outline-none focus:border-blue-500/50"
                placeholder="Frequently Asked"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-white/60 mb-1.5">
                Title Highlight (Glow Text)
              </label>
              <input
                type="text"
                value={formData.highlight ?? ""}
                onChange={(e) => {
                  setFormData({ ...formData, highlight: e.target.value });
                  setHasUnsavedChanges(true);
                }}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-sm text-white placeholder-white/20 focus:outline-none focus:border-blue-500/50"
                placeholder="Questions"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-white/60 mb-1.5">
              Subtitle / Description
            </label>
            <textarea
              rows={2}
              value={formData.subtitle}
              onChange={(e) => {
                setFormData({ ...formData, subtitle: e.target.value });
                setHasUnsavedChanges(true);
              }}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-sm text-white placeholder-white/20 focus:outline-none focus:border-blue-500/50 leading-relaxed"
              placeholder="Answers to common questions about working with AlisTech."
            />
          </div>
        </div>

        {/* ── FAQ Card List Editor (Add, Delete, Reorder) ──────────────────── */}
        <div className="pt-6 border-t border-white/[0.05] space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-white/40">
                FAQ Items ({formData.items.length})
              </h3>
              <p className="text-white/30 text-[11px] mt-0.5">
                Reorder cards using up/down arrows or add new question/answer blocks.
              </p>
            </div>

            <button
              type="button"
              onClick={handleAddItem}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-blue-600/10 border border-blue-500/20 text-blue-400 hover:bg-blue-600/20 transition-all"
            >
              <Plus className="w-3.5 h-3.5" />
              Add Question
            </button>
          </div>

          <div className="space-y-3">
            {formData.items.map((item, index) => (
              <div
                key={index}
                className="p-4 rounded-xl border border-white/[0.06] bg-white/[0.02] space-y-3 group hover:border-white/[0.12] transition-colors"
              >
                {/* Header row with index and reorder buttons */}
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-white/40 font-sora">
                    Item #{index + 1}
                  </span>

                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      disabled={index === 0}
                      onClick={() => handleMoveItem(index, "up")}
                      className="p-1 rounded text-white/30 hover:text-white disabled:opacity-20 hover:bg-white/[0.05]"
                      title="Move Up"
                    >
                      <ChevronUp className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      disabled={index === formData.items.length - 1}
                      onClick={() => handleMoveItem(index, "down")}
                      className="p-1 rounded text-white/30 hover:text-white disabled:opacity-20 hover:bg-white/[0.05]"
                      title="Move Down"
                    >
                      <ChevronDown className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteItem(index)}
                      className="p-1 rounded text-red-400/50 hover:text-red-400 hover:bg-red-500/[0.08] ml-1"
                      title="Delete Question"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Question Input */}
                <div>
                  <label className="block text-[11px] font-medium text-white/50 mb-1">
                    Question Title
                  </label>
                  <input
                    type="text"
                    value={item.question}
                    onChange={(e) => handleItemChange(index, "question", e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-white/[0.03] border border-white/[0.06] text-xs font-semibold text-white placeholder-white/20 focus:outline-none focus:border-blue-500/50"
                  />
                </div>

                {/* Answer Input */}
                <div>
                  <label className="block text-[11px] font-medium text-white/50 mb-1">
                    Answer Content
                  </label>
                  <textarea
                    rows={2}
                    value={item.answer}
                    onChange={(e) => handleItemChange(index, "answer", e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-white/[0.03] border border-white/[0.06] text-xs text-white/80 placeholder-white/20 focus:outline-none focus:border-blue-500/50 leading-relaxed"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
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
                            By {entry.publishedBy || "admin"} · {entry.content?.items?.length || 0} FAQ items
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
