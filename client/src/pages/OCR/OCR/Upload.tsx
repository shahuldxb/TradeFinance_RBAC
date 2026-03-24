import React, { useState,useEffect, useMemo, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
// import mammoth from "mammoth";

import {
  Upload as UploadIcon,
  FileText,
  Image,
  X,
  Check,
  AlertCircle,
  Plus,
  FolderOpen,
  Clock,
  CheckCircle2,
  RefreshCw,
  SparklesIcon,
  DownloadCloudIcon,
  DownloadCloud
} from 'lucide-react';
import { useSessionStore } from '../store/sessionStore';
import { useAuthStore } from '../store/authStore';
import axios from 'axios';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";


interface UploadedFile {
  file: File;
  id: string;
  status: 'pending' | 'uploading' | 'success' | 'error' | 'processing';
  progress: number;
  error?: string;
  documentId?: string;
  processingProgress?: {
    stage: string;
    progress: number;
    message: string;
    timestamp: string;
  };
}

interface Lifecycle {
  id: string;
  name: string;
  instrument: string;
  transition: string;
  requiredDocuments: string[];
  variation_list: string[];
}

const Upload: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [lifecycles, setLifecycles] = useState<Lifecycle[]>([]);
  const [uploadStatus, setUploadStatus] = useState("Processing...");
  // const [demoMode, setDemoMode] = useState<'Y' | 'N'>('N');
  const { sessions, loadSessions, createSession, uploadDocument, isLoading, setCurrentSession } = useSessionStore();
  const [selectedSessionId, setSelectedSessionId] = useState<string>('');
  const [showCreateSession, setShowCreateSession] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadAbortController, setUploadAbortController] = useState<AbortController | null>(null);
  const uploadTimersRef = useRef<number[]>([]);
  const [uploadingNames, setUploadingNames] = useState<string[]>([]);
  // Inside your Upload component
  const selectedSession = sessions.find(s => s.id === selectedSessionId);
  const [showUploadNotes, setShowUploadNotes] = useState(false);

  // At the top of your Upload component
  const [isNewLifecycle, setIsNewLifecycle] = useState(false);
  const [userId, setUserId] = useState<string>("");
  const [variations, setVariations] = useState<any[]>([]);

  const [newSession, setNewSession] = useState({
    cifno: '',
    customer_ID: '',

    lc_number: '',
    instrument: '',
    lifecycle: '',
    variations: '',
    accountName: '',
    customer_name: '',
    customer_type: ''
  });

  const [masterDocs, setMasterDocs] = useState<
    { id: number; code: string; name: string; documentName: string; documentId: string }[]
  >([]);
   const { data: demoMode = 'N' } = useQuery({
      queryKey: ['demoMode'],
      queryFn: async () => {
        const res = await fetch('/api/lc/control/demo-mode');
        const data = await res.json();
        return data.demomode === 'Y' ? 'Y' : 'N';
      },
      staleTime: Infinity,   // 👈 no auto refetch
    });

  useEffect(() => {
    // 1. Check if we arrived with a sessionId in the navigation state
    const stateSessionId = location.state?.sessionId;

    // 2. Check localStorage for a session set by the Sessions list
    const storedSessionId = localStorage.getItem("selectedSessionAfterReload");

    const idToSelect = stateSessionId || storedSessionId;

    if (idToSelect) {
      setSelectedSessionId(idToSelect);
      setShowCreateSession(false); // Ensure the creation form is hidden

      // Optional: Find the session object and set it as current
      const session = sessions.find(s => s.id === idToSelect);
      if (session) setCurrentSession(session);

      // Clear the reload flag so it doesn't interfere next time
      localStorage.removeItem("selectedSessionAfterReload");
    }
  }, [location.state, sessions]);



  const [mainDocument, setMainDocument] = useState<File | null>(null);
  const [subDocuments, setSubDocuments] = useState<File[]>([]);
  // const [isUploading, setIsUploading] = useState(false);

  // const hasFilesSelected = mainDocument || subDocuments.length > 0;


  const [uploadMode, setUploadMode] = useState("file"); // file | copy

  // MAIN COPY DOC
  const [mainCopyDoc, setMainCopyDoc] = useState({
    name: "",
    content: ""
  });

  // SUB COPY DOCS
  const [subCopyDocs, setSubCopyDocs] = useState<{ name: string; content: string }[]>([]);
  const [classifiedDocName, setClassifiedDocName] = useState<
    { doc_id: string; classified_name: string }[]
  >([]);
  const [isClassifying, setIsClassifying] = useState(false);

  const [selectedDocId, setSelectedDocId] = useState<string[]>([]);
  const [mainUploadedDocId, setMainUploadedDocId] = useState<string | null>(null);
  const [showMissingDetails, setShowMissingDetails] = useState(false);
  const [missingDetails, setMissingDetails] = useState<any | null>(null);
  const [missingLoading, setMissingLoading] = useState(false);
  const [missingError, setMissingError] = useState<string | null>(null);
  const [missingTab, setMissingTab] = useState<"required" | "present" | "missing">("required");

  const getBackendBase = () => (
    import.meta.env.VITE_BACKEND_URL ||
    `${window.location.protocol}//${window.location.hostname}:8000`
  );

  const fetchClassifiedDocumentName = async (docIdsToUse?: string[]) => {
    const ids = docIdsToUse || selectedDocId;
    // if (ids.length === 0) {
    //   alert("No documents selected");
    //   return;
    // }

    setIsClassifying(true);
    try {
      const results = await Promise.all(
        ids.map(docId =>
          axios.get(
            `/api/lc/classification/current/${docId}`
          )
        )
      );

      const names = results.flatMap(res =>
        res.data.map((d: any) => ({
          doc_id: d.doc_id,
          classified_name: d.classified_name
        }))
      );

      console.log("📄 All classified names:", names);

      setClassifiedDocName(names);
    } catch (err) {
      alert("Failed to fetch classifications");
    } finally {
      setIsClassifying(false);
    }
  };


  const hasActiveSession = Boolean(selectedSessionId);

  const uploadingDocNames = useMemo(() => {
    const names: string[] = [];
    if (uploadMode === "copy") {
      if (mainCopyDoc.name) names.push(mainCopyDoc.name);
      subCopyDocs.forEach((d) => {
        if (d.name) names.push(d.name);
      });
      return names;
    }
    if (mainDocument) names.push(mainDocument.name);
    subDocuments.forEach((f) => names.push(f.name));
    return names;
  }, [uploadMode, mainCopyDoc, subCopyDocs, mainDocument, subDocuments]);







  useEffect(() => {
    setMainDocument(null);
    setSubDocuments([]);
    setMainCopyDoc({ name: "", content: "" });
    setSubCopyDocs([]);
  }, [uploadMode]);

  useEffect(() => {
    if (selectedSession) {
      const lifecycleExists = lifecycles.some(
        lc => `${lc.name} — ${lc.instrument}` === selectedSession.lifecycle
      );
      setIsNewLifecycle(!lifecycleExists);
    }
  }, [selectedSession, lifecycles]);

  useEffect(() => {
    fetchMasterDocuments();
  }, []);

  const fetchMasterDocuments = async () => {
    try {
      const res = await axios.get("/api/lc/master-documents");
      setMasterDocs(res.data);
    } catch (err) {
      console.error("Failed to load master documents", err);
    }
  };



  const [focused, setFocused] = useState({
    cifno: false,
    customer_ID: false,
    lc_number: false,
    instrument: false,
    lifecycle: false,
    variations: false,
    accountName: false,
    customer_name: false,
    customer_type: false
  });

  useEffect(() => {
    loadSessions();
  }, [loadSessions]);

  const [showAllSessions, setShowAllSessions] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const activeSessions = sessions.filter(s => s.status !== 'completed' && s.status !== 'frozen');
  const filteredSessions = useMemo(() => {
    if (showAllSessions) return activeSessions;
    if (activeSessions.length === 0) return [];

    // default filter by lc_number of the first session
    const defaultLc = activeSessions[0].lc_number;
    return activeSessions.filter((s) => s.lc_number === defaultLc);
  }, [activeSessions, showAllSessions]);

  useEffect(() => {
    const fetchLifecycles = async () => {
      try {
        const res = await fetch("/api/lc/lifecycles");
        if (!res.ok) throw new Error("Failed to fetch lifecycles");

        const data = await res.json();

        const instruments = data.map((item: any) => ({
          id: item.ID,
          name: item.Instrument,
          instrument: item.Instrument,
          transition: item.LifecycleName,
          fullLifecycle: `${item.Instrument} — ${item.LifecycleName}`,
          requiredDocuments: item.Applicable_Documents
            ? item.Applicable_Documents.split(',').map((d: string) => d.trim())
            : [],
          variation_list: item.variation_list ?? []
        }));

        setLifecycles(instruments);
      } catch (error) {
        console.error("❌ Error fetching lifecycles:", error);
      }
    };

    fetchLifecycles();
  }, []);






  const uniqueInstruments = Array.from(
    new Set(lifecycles.map((item) => item.name))
  );



  const handleCreateSession = async () => {
    const payload = {
      cifno: newSession.cifno.trim(),
      customer_ID: newSession.customer_ID?.trim() || null,
      customer_name: newSession.customer_name.trim(),
      accountName: newSession.accountName?.trim() || null,
      customer_type: newSession.customer_type.trim(),
      lc_number: newSession.lc_number.trim(),
      instrument: newSession.instrument?.trim() || null,
      lifecycle: newSession.lifecycle.trim(),
      variations: newSession.variations?.trim() || null,
      user_id: userId || null

    };

    if (
      !payload.cifno ||
      !payload.customer_name ||
      !payload.customer_type ||
      !payload.lc_number ||
      !payload.lifecycle ||
      !payload.variations
    ) {
      alert("Please fill all required fields");
      return;
    }

    try {
      // ============================
      // 1️⃣ CREATE SESSION
      // ============================
      const sessionRes = await axios.post(
        "/api/lc/sessions",
        payload
      );

      const session = sessionRes.data;
      localStorage.setItem("currentSession", JSON.stringify(session));


      // ============================
      // 2️⃣ CREATE CUSTOMER
      // ============================
      await axios.post(
        "/api/lc/save-customers",
        {
          sessionId: session.id,
          cifno: payload.cifno,
          customer_ID: payload.customer_ID,
          customer_name: payload.customer_name,
          accountName: payload.accountName,
          customer_type: payload.customer_type,
          lc_number: payload.lc_number,
          instrument: payload.instrument,
          lifecycle: payload.lifecycle,
          variations: payload.variations,
          user_id: payload.user_id

        }
      );

      // ============================
      // 3️⃣ UI UPDATES
      // ============================
      setSelectedSessionId(session.id);
      setShowCreateSession(false);
      localStorage.setItem("selectedSessionAfterReload", session.id);
      localStorage.setItem("scrollToUpload", "true");
      window.location.reload();

      setNewSession({
        cifno: "",
        customer_ID: "",
        customer_name: "",
        accountName: "",
        customer_type: "",
        lc_number: "",
        instrument: "",
        lifecycle: "",
        variations: ""
      });




    } catch (error) {
      console.error("Error creating session/customer:", error);
      alert("Failed to create session or customer");
    }
  };


  useEffect(() => {
    const sessionAfterReload = localStorage.getItem("selectedSessionAfterReload");
    if (sessionAfterReload) {
      setSelectedSessionId(sessionAfterReload);
      localStorage.removeItem("selectedSessionAfterReload");
    }
  }, []);


  // 2️⃣ At the top level of your component
  useEffect(() => {
    const sessionAfterReload = localStorage.getItem("selectedSessionAfterReload");
    const scrollFlag = localStorage.getItem("scrollToUpload");

    if (sessionAfterReload) {
      setSelectedSessionId(sessionAfterReload); // auto-select new session
      localStorage.removeItem("selectedSessionAfterReload");
    }

    if (scrollFlag) {
      const uploadSection = document.getElementById("upload-section");
      if (uploadSection) {
        uploadSection.scrollIntoView({ behavior: "smooth" });
      }
      localStorage.removeItem("scrollToUpload");
    }
  }, []);



  const fetchCustomerIfExists = async (cif?: string, customer_ID?: string) => {
    if (!cif && !customer_ID) return;

    const res = await axios.get("/api/lc/get-customer", {
      params: {
        cifno: cif || undefined,
        customer_ID: customer_ID || undefined
      }
    });

    if (!res.data) return;

    setNewSession(prev => ({
      ...prev,
      cifno: res.data.cifno || prev.cifno,
      customer_ID: res.data.customer_ID || prev.customer_ID,
      accountName: res.data.accountName || "",
      customer_name: res.data.customer_name || "",
      customer_type: res.data.customer_type || "",
      variations: res.data.variations || ""
    }));


  };







  const getStatusColor = (status: string) => {
    switch (status) {
      case 'created': return 'bg-gray-100 dark:bg-coal-500 text-gray-800 dark:text-gray-700';
      case 'uploading': return 'bg-blue-100 text-blue-800';
      case 'processing': return 'bg-yellow-100 text-yellow-800';
      case 'reviewing': return 'bg-purple-100 text-purple-800';
      case 'completed': return 'bg-green-100 text-green-800';
      default: return 'bg-slate-100 dark:bg-coal-500 text-slate-800 dark:text-gray-700';
    }
  };



  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const [isUploadComplete, setIsUploadComplete] = useState(false);
  const [uploadedMainTextFile, setUploadedMainTextFile] = useState<File | null>(null);
  const [uploadedMainImageFile, setUploadedMainImageFile] = useState<File | null>(null);


  const clearUploadTimers = () => {
    uploadTimersRef.current.forEach((timerId) => window.clearTimeout(timerId));
    uploadTimersRef.current = [];
  };

  const startUploadStatusTimeline = (mode: string, totalTime: number) => {
    clearUploadTimers();
    setUploadStatus("Uploading documents...");

    // TEXT & COPY
    if (mode === "text" || mode === "copy") {
      const t1 = window.setTimeout(() => {
        setUploadStatus("Classifying documents...");
      }, totalTime * 0.6);
      uploadTimersRef.current.push(t1);
    }

    // IMAGE
    if (mode === "image") {
      const t1 = window.setTimeout(() => {
        setUploadStatus("Vision analysing...");
      }, totalTime * 0.3);

      const t2 = window.setTimeout(() => {
        setUploadStatus("Classifying documents...");
      }, totalTime * 0.7);
      uploadTimersRef.current.push(t1, t2);
    }

    // PDF (same as existing)
    if (mode === "pdf") {
      const t1 = window.setTimeout(() => {
        setUploadStatus("OCR Processing started...");
      }, totalTime * 0.1);

      const t2 = window.setTimeout(() => {
        setUploadStatus("Vision analysing...");
      }, totalTime * 0.3);

      const t3 = window.setTimeout(() => {
        setUploadStatus("Classifying documents...");
      }, totalTime * 0.7);
      uploadTimersRef.current.push(t1, t2, t3);
    }
  };

  const uploadSelectedDocuments = async () => {
    setIsButtonLoading(true);
    setIsUploadComplete(false);

    // Default status
    setUploadStatus("Processing...");

    if (!selectedSessionId) {
      alert("Please select a session first.");
      setIsButtonLoading(false);
      return;
    }

    setIsUploading(true);
    setUploadingNames(uploadingDocNames);
    const controller = new AbortController();
    setUploadAbortController(controller);

    try {
      let responses: any[] = [];

      if (uploadMode === "pdf" || uploadMode === "text" || uploadMode === "image") {
        // 🔹 Prepare one request with all files
        const formData = new FormData();
        formData.append("product", "LC");
        formData.append("session_id", selectedSessionId);

        const docTypes: string[] = [];

        if (mainDocument) {
          formData.append("files", mainDocument);
          docTypes.push("MAIN");
        }

        subDocuments.forEach(file => {
          formData.append("files", file);
          docTypes.push("SUB");
        });

        // append doc_type array
        docTypes.forEach(dt => formData.append("doc_type", dt));

        // 🔹 Single request for all files
        const res = await axios.post("/api/lc/upload-bulk", formData, {
          headers: { "Content-Type": "multipart/form-data" },
          signal: controller.signal
        });

        responses.push(res.data);

        // Keep reference for text/image
        if (uploadMode === "text" && mainDocument) setUploadedMainTextFile(mainDocument);
        if (uploadMode === "image" && mainDocument) setUploadedMainImageFile(mainDocument);
      }

      // Copy mode
      if (uploadMode === "copy") {
        const payload = {
          session_id: String(selectedSessionId),
          product: "lc",
          documents: [
            ...(mainCopyDoc.name && mainCopyDoc.content
              ? [{
                document_name: mainCopyDoc.name,
                content: mainCopyDoc.content,
                doc_type: "MAIN"
              }]
              : []),

            ...subCopyDocs
              .filter(d => d.name && d.content)
              .map(d => ({
                document_name: d.name,
                content: d.content,
                doc_type: "SUB"
              }))
          ]
        };

        const res = await axios.post("/api/lc/upload-text-json", payload, {
          signal: controller.signal
        });
        responses.push(res.data);
      }



      // 🔹 Collect document IDs
      const newDocIds: string[] = [];
      const uploadedDocs: { doc_id: string; doc_type?: string }[] = [];
      responses.forEach(res => {
        const docs = res?.documents || res?.data?.documents || [];
        docs.forEach((doc: any) => {
          if (doc.doc_id) {
            newDocIds.push(doc.doc_id);
            uploadedDocs.push({ doc_id: doc.doc_id, doc_type: doc.doc_type });
          }
        });
      });

      const mainDoc = uploadedDocs.find(d => String(d.doc_type || "").toUpperCase() === "MAIN");
      setMainUploadedDocId(mainDoc?.doc_id || null);
      setShowMissingDetails(false);
      setMissingDetails(null);
      setMissingError(null);

      // 🔹 Failure check
      const failed = responses.filter(res => res?.status && res.status !== 200);
      if (failed.length > 0) {
        alert(`${failed.length} document(s) failed to upload`);
        setIsButtonLoading(false);
        return;
      }

      // 🔹 Reset local inputs
      setMainDocument(null);
      setSubDocuments([]);
      setMainCopyDoc({ name: "", content: "" });
      setSubCopyDocs([]);

      // ⏱ Determine wait time
      let timeout = 15000;
      if (uploadMode === "pdf") timeout = 200000;
      else if (uploadMode === "image") timeout = 30000;
      else if (uploadMode === "copy") timeout = 10000;

      startUploadStatusTimeline(uploadMode, timeout);

      // ✅ Final completion
      const completionTimer = window.setTimeout(async () => {
        setIsUploadComplete(true);
        setIsButtonLoading(false);
        setIsUploading(false);
        setUploadingNames([]);
        clearUploadTimers();
        await fetchClassifiedDocumentName(newDocIds);
      }, timeout);
      uploadTimersRef.current.push(completionTimer);

    } catch (err: any) {
      if (err?.name === "CanceledError" || err?.message === "canceled" || err?.code === "ERR_CANCELED") {
        setUploadStatus("Upload canceled.");
        setIsUploading(false);
        setUploadingNames([]);
        clearUploadTimers();
      } else {
        console.error(err);
        alert(err?.message || "Upload failed");
        setIsUploading(false);
        setUploadingNames([]);
        clearUploadTimers();
      }
      setIsButtonLoading(false);
    } finally {
      setUploadAbortController(null);
    }
  };

  const handleCancelUpload = () => {
    if (uploadAbortController) {
      uploadAbortController.abort();
    }
    if (selectedSessionId) {
      axios.post("/api/lc/cancel-upload", { session_id: selectedSessionId }).catch(() => {
        axios.post(`/api/lc/cancel-upload/${selectedSessionId}`).catch(() => {});
      });
    }
    setIsUploading(false);
    setIsButtonLoading(false);
    setUploadStatus("Upload canceled.");
    setUploadingNames([]);
    clearUploadTimers();
  };

  const fetchMissingDocumentDetails = async () => {
    if (!mainUploadedDocId) {
      setMissingError("Main document not found for this upload.");
      return;
    }

    setMissingLoading(true);
    setMissingError(null);
    try {
      try {
        const res = await axios.get(`/api/lc/required-documents/${mainUploadedDocId}`);
        setMissingDetails(res.data || null);
        return;
      } catch (innerErr: any) {
        if (innerErr?.response?.status !== 404) {
          throw innerErr;
        }
      }

      const backendBase = getBackendBase();
      const res = await axios.get(`${backendBase}/api/lc/required-documents/${mainUploadedDocId}`);
      setMissingDetails(res.data || null);
    } catch (err: any) {
      const status = err?.response?.status;
      const statusText = err?.response?.statusText;
      const detail = err?.response?.data?.detail || err?.response?.data || err?.message;
      console.error("Missing document details error:", err);
      setMissingError(`Failed to load missing document details. ${status ? `HTTP ${status} ${statusText || ""}` : ""} ${detail ? `- ${String(detail)}` : ""}`.trim());
    } finally {
      setMissingLoading(false);
    }
  };


  const currentSession = JSON.parse(localStorage.getItem("currentSession") || "null");
  const currentCustomerCIF = currentSession?.cifno || null;

  const customerSessions =
    currentCustomerCIF
      ? sessions.filter(s => s.cifno === currentCustomerCIF)
      : [];



  let sampleCounter = 0;

  const companyCodes = [
    "ABC", "ZYX", "QWE", "RTY", "LMN",
    "PQR", "DEF", "GHI", "JKL", "MNO",
    "TUV", "WXY", "KLM", "NOP", "STU"
  ];


  const generateSampleSessionData = () => {
    sampleCounter += 1;

    const ts = Date.now();
    const code = companyCodes[sampleCounter % companyCodes.length];

    return {
      cifno: `ACC-TRD-${ts.toString().slice(-9)}`,
      accountName: `${code} Exports Pvt Ltd`,

      customer_ID: `2025${(ts % 100000).toString().padStart(5, "0")}`,
      customer_name: `${code} Exports Pvt Ltd`,
      customer_type: "Corporate",

      lc_number: `LC-TD-${ts.toString().slice(-9)}`,
      instrument: "",
      lifecycle: "",
      variations: ""
    };
  };

  const handleLoadSample = () => {
    const sampleSessionData = generateSampleSessionData();

    // Step 1: set everything except lifecycle
    setNewSession((prev) => ({
      ...prev,
      cifno: sampleSessionData.cifno,
      accountName: sampleSessionData.accountName,
      customer_ID: sampleSessionData.customer_ID,
      customer_name: sampleSessionData.customer_name,
      customer_type: sampleSessionData.customer_type,
      lc_number: sampleSessionData.lc_number,
      instrument: sampleSessionData.instrument,
      lifecycle: "",
      variations: ""
    }));

    // Step 2: set lifecycle AFTER instrument is applied
    setTimeout(() => {
      setNewSession((prev) => ({
        ...prev,
        lifecycle: sampleSessionData.lifecycle,
        variations: sampleSessionData.variations,
      }));
    }, 0);
  };

  const readTextFile = async (path: string) => {
    const res = await fetch(path);
    return await res.text();
  };


  const loadSampleFromPublic = async () => {
    try {
      // RESET STATE
      setMainDocument(null);
      setSubDocuments([]);
      setMainCopyDoc({ name: "", content: "" });
      setSubCopyDocs([]);
      setClassifiedDocName([]);
      setIsUploadComplete(false);

      /* =========================
         COPY–PASTE MODE (DOCX)
      ========================= */
      if (uploadMode === "copy") {

        const mainText = await readTextFile(
          "/ocr_sample/text/ILC_MailDocumeny.txt"
        );

        const commercialInv = await readTextFile(
          "/ocr_sample/text/COMMERCIAL_INVOICE.txt"
        );

        const plText = await readTextFile(
          "/ocr_sample/text/PACKING LIST.txt"
        );

        setMainCopyDoc({
          name: "LC Application",
          content: mainText
        });

        setSubCopyDocs([
          {
            name: "Commercial Invoice",
            content: commercialInv
          },
          {
            name: "Packing List",
            content: plText
          }
        ]);

        return;
      }


      /* =========================
         FILE MODES (PDF / DOCX / IMAGE)
      ========================= */
      const sampleConfig: Record<string, { main: string; subs: string[] }> = {
        pdf: {
          main: "/ocr_sample/pdf/lc_sample.pdf",
          subs: ["/ocr_sample/pdf/sample_document.pdf"]
        },
        text: {
          main: "/ocr_sample/text/ILC_MailDocumeny.txt",
          subs: ["/ocr_sample/text/COMMERCIAL_INVOICE.txt", "/ocr_sample/text/CERTIFICATE_OF_ORIGIN.txt", "/ocr_sample/text/INSURANCE_CERTIFICATE.txt"]
        },
        image: {
          main: "/ocr_sample/img/lc_sample_page-0001.jpg",
          subs: [
            "/ocr_sample/img/sample_document_page-0001.jpg",
            "/ocr_sample/img/sample_document_page-0002.jpg",
            "/ocr_sample/img/sample_document_page-0004.jpg"
          ]
        }
      };

      const config = sampleConfig[uploadMode];
      if (!config) return;

      // MAIN FILE
      const mainBlob = await fetch(config.main).then(r => r.blob());
      const mainName = config.main.split("/").pop() || "main-document";
      setMainDocument(new File([mainBlob], mainName, { type: mainBlob.type }));

      // SUB FILES
      const subFiles = await Promise.all(
        config.subs.map(async (path) => {
          const blob = await fetch(path).then(r => r.blob());
          const name = path.split("/").pop() || "document";
          return new File([blob], name, { type: blob.type });
        })
      );

      setSubDocuments(subFiles);
    } catch (err) {
      console.error("Sample load failed", err);
    }
  };



  useEffect(() => {
    const storedUserId = localStorage.getItem("userID");
    setUserId(storedUserId ?? "");
  }, []);


  const canShowUploadButton = (() => {
    if (isButtonLoading || isUploading) return true;

    if (!uploadMode) return false;

    if (uploadMode === "pdf" || uploadMode === "text" || uploadMode === "image") {
      return !!mainDocument || subDocuments.length > 0;
    }

    if (uploadMode === "copy") {
      return (
        !!mainCopyDoc.name &&
        !!mainCopyDoc.content &&
        subCopyDocs.every(d => d.name && d.content)
      );
    }

    return false;
  })();



  if (isLoading) {
    return (
      <div className="p-6 max-w-6xl mx-auto">
        <div className="animate-pulse space-y-8">
          <div className="text-center">
            <div className="h-10 bg-slate-200 dark:bg-coal-500 rounded w-1/3 mx-auto mb-4"></div>
            <div className="h-6 bg-slate-200 dark:bg-coal-500 rounded w-2/3 mx-auto"></div>
          </div>
          <div className="bg-white dark:bg-coal-400 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700/60 p-8">
            <div className="h-8 bg-slate-200 dark:bg-coal-500 rounded w-1/4 mb-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-32 bg-slate-200 dark:bg-coal-500 rounded-xl"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }





  return (
    <div className="p-6 mx-auto space-y-8 text-slate-900 dark:text-gray-700">
      {/* Header */}

      <div className="card bg-light p-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-700 flex items-center gap-3">
          <DownloadCloudIcon className="text-blue-400" />
          Upload Documents</h1>
        <p className="text-slate-900 dark:text-gray-700 mt-1">
          Upload trade finance documents for processing. Select an existing session or create a new one to get started.
        </p>
      </div>

      {!hasActiveSession && (

        <div className="card bg-light rounded-2xl shadow-sm  p-6 mt-8">
          {/* New logic */}
          <>

            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-slate-900 dark:text-gray-700">Create New Session</h3>
              {demoMode === 'Y' && (
                <div className="flex justify-end mb-4">
                  <button
                    type="button"
                    onClick={handleLoadSample}
                    className="px-4 py-2 text-sm font-medium rounded-md 
               bg-indigo-100 text-indigo-800 hover:bg-indigo-200
               transition cursor-pointer"
                  >
                    Load Sample Data
                  </button>
                </div>

              )}
            </div>

            <div className="space-y-6">

              {/* User ID (Read Only) */}
              <div className="bg-white dark:bg-coal-400 border border-slate-300 dark:border-slate-600 rounded-lg p-6 shadow-sm">

                <div className="flex flex-1 min-w-[250px] items-center space-x-3">
                  <label className="w-40 text-md font-medium flex items-center gap-1">
                    User ID
                  </label>
                  <input
                    type="text"
                    value={userId}
                    readOnly
                    className="flex-1 input bg-gray-200 border border-slate-400 rounded-md px-3 py-2 text-sm text-gray-600 dark:text-gray-700 cursor-not-allowed"
                  />
                </div>
              </div>


              {/* ---------------- Account Details Section ---------------- */}
              <div className="bg-white dark:bg-coal-400 border border-slate-300 dark:border-slate-600 rounded-lg p-6 shadow-sm">
                <h2 className="text-lg font-semibold mb-4">Account Details</h2>
                <div className="flex flex-col gap-5 w-full">
                  {/* Account Number */}
                  <div className="flex flex-1 min-w-[250px] items-center space-x-3">
                    <label className="w-40 text-md font-medium flex items-center gap-1">
                      Account Number<span className="text-danger text-xl">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Account Number (E.g., ACC-TRD-987654321)"
                      value={newSession.cifno}
                      onChange={(e) =>
                        setNewSession((prev) => ({ ...prev, cifno: e.target.value }))
                      }
                      className="flex-1 input bg-gray-100 dark:bg-coal-500 border border-slate-400 rounded-md px-3 py-2 text-sm text-gray-700 dark:text-gray-700"
                    />
                  </div>

                  {/* Account Name */}
                  <div className="flex flex-1 min-w-[250px] items-center space-x-3">
                    <label className="w-40 text-md font-medium flex items-center gap-1">
                      Account Name<span className="text-danger text-xl">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Account Name"
                      value={newSession.accountName}
                      onChange={(e) =>
                        setNewSession((prev) => ({ ...prev, accountName: e.target.value }))
                      }
                      className="flex-1 input bg-gray-100 dark:bg-coal-500 border border-slate-400 rounded-md px-3 py-2 text-sm text-gray-700 dark:text-gray-700"
                    />
                  </div>
                </div>
              </div>

              {/* ---------------- Applicant Details Section ---------------- */}
              <div className="bg-white dark:bg-coal-400 border border-slate-300 dark:border-slate-600 rounded-lg p-6 shadow-sm">
                <h2 className="text-lg font-semibold mb-4">Applicant Details</h2>
                <div className="flex flex-col gap-5 w-full">
                  {/* Applicant ID */}
                  <div className="flex flex-1 min-w-[250px] items-center space-x-3">
                    <label className="w-40 text-md font-medium flex items-center gap-1">
                      Applicant ID<span className="text-danger text-xl">*</span>
                    </label>
                    <input
                      type="text"
                      value={newSession.customer_ID}
                      placeholder='Applicant ID (E.g., APPL20250045)'
                      onChange={(e) =>
                        setNewSession((prev) => ({
                          ...prev,
                          customer_ID: e.target.value.replace(/[^0-9]/g, ""),
                        }))
                      }
                      onBlur={() => {
                        fetchCustomerIfExists(
                          newSession.cifno.trim(),
                          newSession.customer_ID.trim()
                        );
                      }}
                      className="flex-1 input bg-gray-100 dark:bg-coal-500 border border-slate-400 rounded-md px-3 py-2 text-sm text-gray-700 dark:text-gray-700"
                    />
                  </div>

                  {/* Applicant Name */}
                  <div className="flex flex-1 min-w-[250px] items-center space-x-3">
                    <label className="w-40 text-md font-medium flex items-center gap-1">
                      Applicant Name<span className="text-danger text-xl">*</span>
                    </label>
                    <input
                      type="text"
                      value={newSession.customer_name}
                      placeholder='Applicant Name'
                      onChange={(e) =>
                        setNewSession((prev) => ({ ...prev, customer_name: e.target.value }))
                      }
                      className="flex-1 input bg-gray-100 dark:bg-coal-500 border border-slate-400 rounded-md px-3 py-2 text-sm text-gray-700 dark:text-gray-700"
                    />
                  </div>

                  {/* Applicant Type */}
                  <div className="flex flex-1 min-w-[250px] items-center space-x-3">
                    <label className="w-40 text-md font-medium flex items-center gap-1">
                      Applicant Type<span className="text-danger text-xl">*</span>
                    </label>
                    <input
                      type="text"
                      value={newSession.customer_type}
                      placeholder='Applicant Type'
                      onChange={(e) =>
                        setNewSession((prev) => ({ ...prev, customer_type: e.target.value }))
                      }
                      className="flex-1 input bg-gray-100 dark:bg-coal-500 border border-slate-400 rounded-md px-3 py-2 text-sm text-gray-700 dark:text-gray-700"
                    />
                  </div>
                </div>
              </div>

              {/* ---------------- Instrument & Lifecycle Section ---------------- */}
              <div className="bg-white dark:bg-coal-400 border border-slate-300 dark:border-slate-600 rounded-lg p-6 shadow-sm">
                <h2 className="text-lg font-semibold mb-4">Instrument & Lifecycle</h2>
                <div className="flex flex-col gap-5 w-full">
                  {/* Instrument Type */}

                  {/* LC Number */}
                  <div className="flex flex-1 min-w-[250px] items-center space-x-3">
                    <label className="w-40 text-md font-medium flex items-center gap-1">
                      LC Number<span className="text-danger text-xl">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="LC Number (E.g., LC-TD-123456789)"
                      value={newSession.lc_number}
                      onChange={(e) =>
                        setNewSession((prev) => ({ ...prev, lc_number: e.target.value }))
                      }
                      className="flex-1 input bg-gray-100 dark:bg-coal-500 border border-slate-400 rounded-md px-3 py-2 text-sm text-gray-700 dark:text-gray-700"
                    />
                  </div>


                  <div className="flex flex-1 min-w-[250px] items-center space-x-3">
                    <label className="w-40 text-md font-medium flex items-center gap-1">
                      Instrument Type<span className="text-danger text-xl">*</span>
                    </label>
                    <div className="flex-1">
                      <Select
                        onValueChange={(value) => {
                          setNewSession((prev) => ({
                            ...prev,
                            instrument: value,
                            lifecycle: "",
                          }));
                        }}
                        value={newSession.instrument ?? ""}
                      >
                        <SelectTrigger className="w-full bg-gray-100 dark:bg-coal-500 border border-slate-400 rounded-md px-3 py-2 text-sm text-gray-700 dark:text-gray-700">
                          <SelectValue placeholder="Select Instrument" />
                        </SelectTrigger>
                        <SelectContent>
                          {uniqueInstruments.map((inst, index) => (
                            <SelectItem key={index} value={inst}>
                              {inst}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Lifecycle */}
                  <div className="flex flex-1 min-w-[250px] items-center space-x-3">
                    <label className="w-40 text-md font-medium flex items-center gap-1">
                      Lifecycle<span className="text-danger text-xl">*</span>
                    </label>
                    <div className="flex-1">
                      <Select
                        onValueChange={(value) =>
                          setNewSession((prev) => ({ ...prev, lifecycle: value }))
                        }
                        value={newSession.lifecycle ?? ""}
                      >
                        <SelectTrigger className="w-full bg-gray-100 dark:bg-coal-500 border border-slate-400 rounded-md px-3 py-2 text-sm text-gray-700 dark:text-gray-700">
                          <SelectValue placeholder="Select Lifecycle" />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from(
                            new Map(
                              lifecycles
                                .filter((item) => item.instrument === newSession.instrument)
                                .map((item) => [item.transition, item])   // 👈 dedupe by lifecycle
                            ).values()
                          ).map((item) => (
                            <SelectItem key={item.transition} value={item.transition}>
                              {item.transition}
                            </SelectItem>
                          ))}

                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Variation */}
                  <div className="flex flex-1 min-w-[250px] items-center space-x-3">
                    <label className="w-40 text-md font-medium flex items-center gap-1">
                      Variation<span className="text-danger text-xl">*</span>
                    </label>
                    <div className="flex-1">
                      <Select
                        onValueChange={(value) =>
                          setNewSession((prev) => ({ ...prev, variations: value }))
                        }
                        value={newSession.variations ?? ""}
                      >
                        <SelectTrigger className="w-full bg-gray-100 dark:bg-coal-500 border border-slate-400 rounded-md px-3 py-2 text-sm text-gray-700 dark:text-gray-700">
                          <SelectValue placeholder="Select Variation" />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from(
                            new Set(
                              lifecycles
                                .filter(
                                  (lc) =>
                                    lc.instrument.trim().toLowerCase() ===
                                    (newSession.instrument ?? "").trim().toLowerCase()
                                )
                                .flatMap((lc) => lc.variation_list)
                            )
                          ).map((variation, idx) => (
                            <SelectItem key={idx} value={variation}>
                              {variation}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>




                </div>
              </div>
            </div>

            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowCreateSession(false)}
                className="flex-1 px-4 py-2 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-gray-700 rounded-lg hover:bg-slate-50 dark:hover:bg-coal-400/70 dark:bg-coal-500 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateSession}
                disabled={
                  !newSession.cifno ||
                  !newSession.customer_ID ||
                  !newSession.lc_number ||
                  !newSession.instrument ||
                  !newSession.lifecycle ||
                  !newSession.variations ||
                  !newSession.accountName ||
                  !newSession.customer_name ||
                  !newSession.customer_type
                }
                // style={{ fontWeight: "600" }}
                className={`flex-1 px-4 py-2 rounded-lg text-blue-600 transition-colors
    ${!newSession.cifno ||
                    !newSession.customer_ID ||
                    !newSession.lc_number ||
                    !newSession.instrument ||
                    !newSession.lifecycle ||
                    !newSession.variations ||
                    !newSession.accountName ||
                    !newSession.customer_name ||
                    !newSession.customer_type
                    ? "bg-blue-100 cursor-not-allowed"
                    : "bg-blue-100 hover:bg-blue-200 cursor-pointer"
                  }`}
              >
                Create Session
              </button>

            </div>

          </>
        </div>

      )}




      {/* Session Selection */}
      {hasActiveSession && (

        <div className="bg-white dark:bg-coal-400 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700/60 p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-gray-700">Select Session</h2>

            {/* Toggle View: Show all sessions for current customer */}
            {customerSessions.length > 1 && (
              <div className="flex justify-end mb-4">
                <button
                  onClick={() => setShowAllSessions(prev => !prev)}
                  className="px-4 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-coal-400 hover:bg-slate-50 dark:hover:bg-coal-400/70 dark:bg-coal-500 transition-colors"
                >
                  {showAllSessions ? "View Latest Session" : "View All My Sessions"}
                </button>
              </div>
            )}
          </div>

          {/* Filter sessions by current customer's CIF */}
          {(() => {


            const filteredSessions = showAllSessions
              ? customerSessions // show all sessions for this customer
              : customerSessions.length > 0
                ? [customerSessions[customerSessions.length - 1]] // show latest session only
                : [];



            if (filteredSessions.length === 0) {
              return (
                <div className="text-center py-12">
                  <FolderOpen className="mx-auto text-slate-400 dark:text-gray-700 mb-4" size={48} />
                  <h3 className="text-lg font-medium text-slate-900 dark:text-gray-700 mb-2">No Active Sessions</h3>
                  <p className="text-slate-600 dark:text-gray-700 mb-4">Create a new session to start uploading documents</p>
                  <button
                    onClick={() => setShowCreateSession(true)}
                    disabled={isUploading}
                    className={`px-6 py-3 rounded-lg text-blue-600 transition-colors
              ${isUploading ? "bg-blue-100 cursor-not-allowed" : "bg-blue-100 hover:bg-blue-200 cursor-pointer"}`}
                  >
                    Create First Session
                  </button>
                </div>
              );
            }

            return (
              <div className="card bg-white dark:bg-coal-400 p-6 rounded-2xl shadow-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredSessions.map(session => (
                    <div
                      key={session.id}
                      onClick={() => !isUploading && setSelectedSessionId(session.id)}
                      className={`p-4 card ${isUploading
                        ? "cursor-not-allowed opacity-50"
                        : "cursor-pointer"
                        } ${selectedSessionId === session.id
                          ? "border-blue-500"
                          : ""
                        }`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="font-semibold text-slate-900 dark:text-gray-700">{session.lc_number}</h3>
                          <p className="text-sm text-slate-600 dark:text-gray-700">CIF: {session.cifno}</p>
                          <p className="text-xs text-slate-500 dark:text-gray-700 mt-1">Instrument: {session.instrument}</p>
                          <p className="text-xs text-slate-500 dark:text-gray-700 mt-1">Lifecycle: {session.lifecycle}</p>
                        </div>
                        {selectedSessionId === session.id && (
                          <CheckCircle2 className="text-blue-500" size={20} />
                        )}
                      </div>
                      <div className="flex justify-end">
                        <span
                          className={`inline-flex pb-2 pt-1 px-2 text-xs font-medium capitalize rounded-md ${getStatusColor(session.status)}`}
                        >
                          {session.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })()}

          {/* Selected Session Upload */}
          <div id="upload-section">

            {(() => {
              const selectedSession = sessions.find(s => s.id === selectedSessionId);
              // if (!selectedSession) return null;

              // Define upload options
              const uploadOptions = [
                { label: "PDF", value: "pdf" },
                { label: "Text File", value: "text" },
                { label: "Scanned Images", value: "image" },
                { label: "Copy & Paste", value: "copy" },
              ];

              return (
                <div className="mt-6 p-6 border border-slate-200 dark:border-slate-700/60 rounded-2xl bg-slate-50 dark:bg-coal-500">

                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-semibold text-slate-900 dark:text-gray-700 mb-6">Upload LC Documents</h3>
                    <div className="flex gap-3">


                      {/* Show Notes Button */}
                      <button
                        type="button"
                        onClick={() => setShowUploadNotes(prev => !prev)}
                        className="px-4 py-2 text-sm font-medium rounded-md 
                 bg-red-100 text-red-800 hover:bg-red-200
                 transition cursor-pointer"
                      >
                        {showUploadNotes ? "Hide Upload Notes" : "Show Upload Notes (*)"}
                      </button>

                      {/* Load Sample Documents */}
                      <button
                        type="button"
                        onClick={loadSampleFromPublic}
                        className="px-4 py-2 text-sm font-medium rounded-md 
                 bg-indigo-100 text-indigo-800 hover:bg-indigo-200
                 transition cursor-pointer"
                      >
                        Load Sample Documents
                      </button>
                    </div>
                  </div>

                  {showUploadNotes && (
                    <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6 rounded-md text-sm text-red-900">
                      <ul className="list-disc list-inside space-y-2">
                        <li><strong>300 DPI:</strong> The industry standard. At 300 DPI, a standard 12pt font is roughly 50 pixels tall, which is enough for 99% accuracy.</li>
                        <li><strong>200 DPI:</strong> The bare minimum for standard office documents. Accuracy drops significantly below this point.</li>
                        <li><strong>400–600 DPI:</strong> Required for "fine print" (6pt fonts or smaller) or handwritten notes.</li>
                        <li><strong>Minimum:</strong> 12–18 pixels for simple fonts (Arial/Helvetica) with high contrast only.</li>
                      </ul>
                    </div>
                  )}



                  {/* RADIO BUTTON FOR UPLOAD MODE */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-slate-700 dark:text-gray-700 mb-2">
                      Select Upload Type
                    </label>
                    <div className="flex flex-wrap gap-6">
                      {uploadOptions.map(option => (
                        <label key={option.value} className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="radio"
                            name="uploadMode"
                            value={option.value}
                            checked={uploadMode === option.value}
                            onChange={() => setUploadMode(option.value)}
                            className="accent-blue-600"
                            disabled={isUploading}
                          />
                          <span>{option.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* FILE UPLOAD FLOW */}
                  {(uploadMode === "pdf" || uploadMode === "text" || uploadMode === "image") && (
                    <>
                      {/* Main Document */}
                      <div className="mb-6">
                        <h3 className=" mb-2 font-semibold">
                          Main LC Document
                        </h3>

                        <div className="border border-dashed border-blue-300 rounded-xl p-4 text-center bg-blue-50 dark:bg-[#1F212A]">
                          <div
                            className={`cursor-pointer ${isUploading ? "pointer-events-none opacity-60" : ""}`}
                            onClick={() => !isUploading && document.getElementById("mainLcInput")?.click()}
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={(e) => {
                              e.preventDefault();
                              if (isUploading) return;
                              const file = e.dataTransfer.files?.[0];
                              if (file) setMainDocument(file);
                            }}
                          >
                            <i className="ki-solid ki-exit-down text-3xl text-primary"></i>

                            <p className="text-lg font-semibold mt-2">
                              Drag & Drop your file here
                            </p>

                            <p className="text-sm text-gray-500 dark:text-gray-700">OR</p>

                            <button
                              type="button"
                              className="btn btn-primary mt-2 text-md"
                              disabled={isUploading}
                            >
                              Browse Files
                            </button>

                            {mainDocument && (
                              <p className="mt-3 text-sm text-green-600">
                                Selected: {mainDocument.name}
                              </p>
                            )}
                          </div>

                          <input
                            id="mainLcInput"
                            type="file"
                            accept={
                              uploadMode === "pdf" ? ".pdf" :
                                uploadMode === "text" ? ".txt" :
                                  uploadMode === "image" ? "image/*" : ""
                            }
                            className="hidden"
                            disabled={isUploading}
                            onChange={(e) => setMainDocument(e.target.files?.[0] || null)}
                          />
                        </div>
                      </div>


                      {/* Sub Documents */}
                      <div>
                        <h3 className="mb-2 font-semibold">
                          Sub Documents
                        </h3>

                        <div className="border border-dashed border-blue-300 rounded-xl p-4 text-center bg-blue-50 dark:bg-[#1F212A]">
                          <div
                            className={`cursor-pointer ${isUploading ? "pointer-events-none opacity-60" : ""}`}
                            onClick={() => !isUploading && document.getElementById("subDocsInput")?.click()}
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={(e) => {
                              e.preventDefault();
                              if (isUploading) return;
                              const files = Array.from(e.dataTransfer.files || []);
                              if (files.length) setSubDocuments(files);
                            }}
                          >
                            <i className="ki-solid ki-exit-down text-3xl text-primary"></i>

                            <p className="text-lg font-semibold mt-2">
                              Drag & Drop your files here
                            </p>

                            <p className="text-sm text-gray-500 dark:text-gray-700">OR</p>

                            <button
                              type="button"
                              className="btn btn-primary mt-2 text-md"
                              disabled={isUploading}
                            >
                              Browse Files
                            </button>

                            {subDocuments.length > 0 && (
                              <div>
                                <ul className="mt-3 text-sm text-green-700 text-left inline-block">
                                  {subDocuments.map((f, i) => (
                                    <li key={i}>• {f.name}</li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>

                          <input
                            id="subDocsInput"
                            type="file"
                            multiple
                            accept={
                              uploadMode === "pdf" ? ".pdf" :
                                uploadMode === "text" ? ".txt" :
                                  uploadMode === "image" ? "image/*" : ""
                            }
                            className="hidden"
                            disabled={isUploading}
                            onChange={(e) =>
                              setSubDocuments(Array.from(e.target.files || []))
                            }
                          />
                        </div>
                      </div>


                      {((uploadMode === "text" && uploadedMainTextFile) || (uploadMode === "image" && uploadedMainImageFile)) && isUploadComplete && (
                        <div className="mb-6  mt-6 flex flex-col gap-3">
                          {/* Detected Document Names */}
                          {classifiedDocName.length > 0 && (
                            <div className="space-y-3">

                              {/* Main LC Document */}
                              <div className="flex items-center gap-3">
                                <span className="text-xs font-semibold text-slate-600 dark:text-gray-700 w-40">
                                  Main LC Document
                                </span>

                                <div className="px-3 py-1 rounded-full bg-blue-50 text-blue-800 text-xs border border-blue-200">
                                  {classifiedDocName[0].classified_name}
                                </div>
                              </div>

                              {/* Supporting Documents */}
                              {classifiedDocName.length > 1 && (
                                <div className="flex items-start gap-3">
                                  <span className="text-xs font-semibold text-slate-600 dark:text-gray-700 w-40">
                                    Supporting Documents
                                  </span>

                                  <div className="flex flex-wrap gap-2">
                                    {classifiedDocName.slice(1).map(d => (
                                      <div
                                        key={d.doc_id}
                                        className="px-3 py-1 rounded-full bg-green-50 text-green-800 text-xs border border-green-200"
                                      >
                                        {d.classified_name}
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}

                            </div>
                          )}

                        </div>

                      )}
                    </>
                  )}


                  {/* COPY-PASTE FLOW */}
                  {uploadMode === "copy" && (
                    <div className="space-y-6">
                      {/* Main Document */}
                      <div className="border border-slate-300 dark:border-slate-600 rounded-xl p-4 bg-white dark:bg-coal-400">
                        <h4 className="font-semibold text-slate-800 dark:text-gray-700 mb-3">Swift Document</h4>
                        <select
                          value={mainCopyDoc.name}
                          onChange={(e) => setMainCopyDoc(prev => ({ ...prev, name: e.target.value }))}
                          className="w-full border border-slate-300 dark:border-slate-600 rounded-md px-3 py-2 text-sm mb-3"
                        >
                          <option value="">Select Swift Document</option>
                          {masterDocs.map(doc => (
                            <option key={doc.id} value={doc.name}>
                              {doc.name}
                            </option>
                          ))}
                        </select>


                        <textarea
                          rows={6}
                          placeholder="Paste main document content here..."
                          value={mainCopyDoc.content}
                          onChange={(e) => setMainCopyDoc(prev => ({ ...prev, content: e.target.value }))}
                          className="w-full border border-slate-300 dark:border-slate-600 rounded-md px-3 py-2 text-sm"
                        />
                      </div>

                      {/* Sub Documents */}
                      <div className="border border-slate-300 dark:border-slate-600 rounded-xl p-4 bg-white dark:bg-coal-400">
                        <div className="flex justify-between items-center mb-3">
                          <h4 className="font-semibold text-slate-800 dark:text-gray-700">Sub Documents</h4>
                          <button
                            type="button"
                            onClick={() => setSubCopyDocs(prev => [...prev, { name: "", content: "" }])}
                            className="text-blue-600 text-sm font-medium"
                          >
                            + Add Sub Document
                          </button>
                        </div>
                        {subCopyDocs.length === 0 && <p className="text-sm text-slate-500 dark:text-gray-700">No sub documents added</p>}
                        {subCopyDocs.map((doc, index) => (
                          <div key={index} className="border border-slate-200 dark:border-slate-700/60 rounded-lg p-3 mb-4">
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-sm font-medium">Sub Document {index + 1}</span>
                              <button
                                type="button"
                                onClick={() => setSubCopyDocs(prev => prev.filter((_, i) => i !== index))}
                                className="text-red-500 text-xs"
                              >
                                Remove
                              </button>
                            </div>

                            {/* Dropdown for sub-document name */}
                            <select
                              value={doc.name}
                              onChange={(e) => {
                                const updated = [...subCopyDocs];
                                updated[index].name = e.target.value;
                                setSubCopyDocs(updated);
                              }}
                              className="w-full border border-slate-300 dark:border-slate-600 rounded-md px-3 py-2 text-sm mb-2"
                            >
                              <option value="">Select Sub Document</option>
                              {masterDocs.map(md => (
                                <option key={md.id} value={md.name}>
                                  {md.name}
                                </option>
                              ))}
                            </select>

                            {/* Textarea for sub-document content */}
                            <textarea
                              rows={5}
                              placeholder="Paste document content"
                              value={doc.content}
                              onChange={(e) => {
                                const updated = [...subCopyDocs];
                                updated[index].content = e.target.value;
                                setSubCopyDocs(updated);
                              }}
                              className="w-full border border-slate-300 dark:border-slate-600 rounded-md px-3 py-2 text-sm"
                            />
                          </div>
                        ))}

                      </div>
                    </div>
                  )}

                  {/* Upload Button */}
                  <div className="mt-10 flex flex-wrap justify-center gap-4">
                    {/* Upload Button: show only if upload NOT complete */}
                    {!isUploadComplete && canShowUploadButton && (
                      <button
                        onClick={uploadSelectedDocuments}
                        disabled={isButtonLoading || isUploading}
                        className="bg-green-100 text-green-800 w-[500px] h-12 rounded-lg flex items-center justify-center space-x-2 disabled:opacity-70 text-center"
                      >
                        {isButtonLoading && (
                          <div className="w-5 h-5 border-2 border-green-800 border-t-transparent rounded-full animate-spin"></div>
                        )}

                        <span className="text-center">
                          {isButtonLoading ? uploadStatus : "Upload"}
                        </span>

                      </button>
                    )}

                    {isUploading && (
                      <button
                        type="button"
                        onClick={handleCancelUpload}
                        className="bg-red-100 text-red-800 w-[500px] h-12 rounded-lg flex items-center justify-center hover:bg-red-200 text-center"
                      >
                        Cancel Upload
                      </button>
                    )}

                    {/* Navigate Button: show only after upload completes */}
                    {isUploadComplete && (
                      <>
                        <button
                          onClick={() =>
                            navigate(
                              `/tf_genie/discrepancy/ocr-factory/${selectedSessionId}`
                            )
                          }
                          className="bg-blue-100 text-blue-800 w-[500px] h-12 rounded-lg flex items-center justify-center hover:bg-blue-200 cursor-pointer text-center"
                        >
                          Go to OCR Factory
                        </button>

                        <button
                          onClick={async () => {
                            if (!showMissingDetails) {
                              await fetchMissingDocumentDetails();
                            }
                            setShowMissingDetails(prev => !prev);
                          }}
                          disabled={!mainUploadedDocId}
                          className={`w-[500px] h-12 rounded-lg flex items-center justify-center text-center ${
                            mainUploadedDocId
                              ? "bg-indigo-100 text-indigo-800 hover:bg-indigo-200 cursor-pointer"
                              : "bg-slate-100 dark:bg-coal-500 text-slate-400 dark:text-gray-700 cursor-not-allowed"
                          }`}
                        >
                          Missing Document Details
                        </button>
                      </>
                    )}
                  </div>

                  {(isUploading || isButtonLoading) && uploadingNames.length > 0 && (
                    <div className="mt-4 bg-slate-50 dark:bg-coal-500 border border-slate-200 dark:border-slate-700/60 rounded-lg p-4 text-sm text-slate-700 dark:text-gray-700">
                      <div className="font-semibold mb-2">Uploading documents</div>
                      <ul className="list-disc list-inside space-y-1">
                        {uploadingNames.map((name, i) => (
                          <li key={`${name}-${i}`}>{name}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {isUploadComplete && showMissingDetails && (
                    <div className="mt-6 bg-white dark:bg-coal-400 border border-slate-200 dark:border-slate-700/60 rounded-xl shadow-sm overflow-hidden">
                      <div className="bg-slate-50 dark:bg-coal-500 px-4 py-3 border-b border-slate-200 dark:border-slate-700/60">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                          <h4 className="font-semibold text-slate-800 dark:text-gray-700">Missing Document Details</h4>
                          {missingDetails?.main_document_name && (
                            <span className="text-xs text-slate-500 dark:text-gray-700">
                              Main: {missingDetails.main_document_name}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="p-4 sm:p-6">
                        <div className="flex flex-wrap gap-2 mb-4">
                          <button
                            type="button"
                            onClick={() => setMissingTab("required")}
                            className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                              missingTab === "required"
                                ? "bg-blue-100 text-blue-800 border-blue-200"
                                : "bg-slate-100 dark:bg-coal-500 text-slate-600 dark:text-gray-700 border-slate-200 dark:border-slate-700/60"
                            }`}
                          >
                            Required (46A)
                          </button>
                          <button
                            type="button"
                            onClick={() => setMissingTab("present")}
                            className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                              missingTab === "present"
                                ? "bg-green-100 text-green-800 border-green-200"
                                : "bg-slate-100 dark:bg-coal-500 text-slate-600 dark:text-gray-700 border-slate-200 dark:border-slate-700/60"
                            }`}
                          >
                            Present (Classification)
                          </button>
                          <button
                            type="button"
                            onClick={() => setMissingTab("missing")}
                            className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                              missingTab === "missing"
                                ? "bg-red-100 text-red-700 border-red-200"
                                : "bg-slate-100 dark:bg-coal-500 text-slate-600 dark:text-gray-700 border-slate-200 dark:border-slate-700/60"
                            }`}
                          >
                            Missing
                          </button>
                        </div>

                        {missingLoading && (
                          <div className="text-sm text-slate-500 dark:text-gray-700">Loading missing document details...</div>
                        )}

                        {missingError && (
                          <div className="text-sm text-red-600">{missingError}</div>
                        )}

                        {!missingLoading && !missingError && (
                          <>
                            {missingTab === "required" && (
                              <div className="flex flex-wrap gap-2">
                                {(missingDetails?.required_documents || []).length > 0 ? (
                                  missingDetails.required_documents.map((doc: string, idx: number) => (
                                    <span
                                      key={idx}
                                      className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200"
                                    >
                                      {doc}
                                    </span>
                                  ))
                                ) : (
                                  <div className="text-sm text-slate-500 dark:text-gray-700">No required documents found.</div>
                                )}
                              </div>
                            )}

                            {missingTab === "present" && (
                              <div className="flex flex-wrap gap-2">
                                {(missingDetails?.classified_documents || []).length > 0 ? (
                                  missingDetails.classified_documents.map((doc: string, idx: number) => (
                                    <span
                                      key={idx}
                                      className="px-3 py-1 rounded-full text-xs font-semibold bg-green-50 text-green-800 border border-green-200"
                                    >
                                      {doc}
                                    </span>
                                  ))
                                ) : (
                                  <div className="text-sm text-slate-500 dark:text-gray-700">No classified sub documents found.</div>
                                )}
                              </div>
                            )}

                            {missingTab === "missing" && (
                              <div className="flex flex-wrap gap-2">
                                {(missingDetails?.missing_documents || []).length > 0 ? (
                                  missingDetails.missing_documents.map((doc: string, idx: number) => (
                                    <span
                                      key={idx}
                                      className="px-3 py-1 rounded-full text-xs font-semibold bg-red-50 text-red-600 border border-red-200"
                                    >
                                      {doc}
                                    </span>
                                  ))
                                ) : (
                                  <div className="text-sm text-slate-500 dark:text-gray-700">No missing documents detected.</div>
                                )}
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  )}


                </div>
              );
            })()}
          </div>

        </div>


      )}

    </div>
  );
};

export default Upload;
