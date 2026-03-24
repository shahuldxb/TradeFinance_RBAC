import React, { useEffect, useState } from "react";
import { KeenIcon } from "@/components";
import { toAbsoluteUrl } from "@/utils";
import { toast } from "sonner";
import { apiFetch } from "@/utils/apiFetch";

type Props = {
  open: boolean;
  onClose: () => void;
  defaultTo?: string;
  defaultSubject?: string;
  defaultBody?: string;
  attachmentFile?: File | null;
};

export const ComposeEmail: React.FC<Props> = ({
  open,
  onClose,
  defaultTo = "",
  defaultSubject = "",
  defaultBody = "",
  attachmentFile = null,
}) => {
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [attachmentUrl, setAttachmentUrl] = useState<string>("");
  const [sending, setSending] = useState(false);

  useEffect(() => {
    if (!open) return;
    setTo(defaultTo || "");
    setSubject(defaultSubject || "");
    setBody(defaultBody || "");
  }, [open, defaultTo, defaultSubject, defaultBody]);

  useEffect(() => {
    if (!attachmentFile) {
      setAttachmentUrl("");
      return;
    }
    const url = URL.createObjectURL(attachmentFile);
    setAttachmentUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [attachmentFile]);

  if (!open) return null;

  const toBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = String(reader.result || "");
        const commaIndex = result.indexOf(",");
        resolve(commaIndex >= 0 ? result.slice(commaIndex + 1) : result);
      };
      reader.onerror = () => reject(reader.error);
      reader.readAsDataURL(file);
    });

  const handleSend = async () => {
    if (!to.trim() || sending) return;

    try {
      setSending(true);

      const attachmentPayload = attachmentFile
        ? {
            filename: attachmentFile.name,
            content_type: attachmentFile.type || "application/pdf",
            data_base64: await toBase64(attachmentFile),
          }
        : null;

      const res = await apiFetch("/api/lc/email/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to,
          subject,
          body,
          attachment: attachmentPayload,
        }),
      });

      let data: any = null;
      try {
        data = await res.json();
      } catch {
        data = null;
      }
      if (!res.ok || !data?.success) {
        throw new Error(
          data?.detail ||
            data?.message ||
            data?.error?.message ||
            `Email send failed (HTTP ${res.status})`
        );
      }

      toast.success("Email sent successfully");
      onClose();
    } catch (err: any) {
      toast.error(err?.message || "Failed to send email");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-end p-4">
      {/* backdrop */}
      <div
        className="absolute inset-0 bg-black/30"
        onClick={onClose}
      />

      {/* compose box */}
      <div className="card relative w-[420px] shadow-xl ">
        <div className=" flex items-center justify-between px-4 py-2 border-b">
          <div className="font-bold">New Message</div>
          <button onClick={onClose}>
            <KeenIcon icon="cross" />
          </button>
        </div>

        <div className="p-3 space-y-2">
          <input
            className="input bg-gray-100 "
            placeholder="To"
            value={to}
            onChange={(e) => setTo(e.target.value)}
          />

          <input
            className="input w-full"
            placeholder="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />

          <textarea
            className="input w-full min-h-[120px] p-2"
            placeholder="Write your message..."
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />

          {attachmentFile ? (
            <div className="text-xs text-gray-600 card p-2 ">
              <div>
                Attachment: <span className="font-semibold">{attachmentFile.name}</span>
              </div>
              
            </div>
          ) : null}
        </div>

        <div className="flex items-center justify-between px-4 py-2 ">
          <button
            className="btn btn-primary btn-sm"
            onClick={handleSend}
            disabled={sending}
          >
            {sending ? "Sending..." : "Send"}
          </button>

          <img
            src={toAbsoluteUrl("/media/avatars/300-2.png")}
            className="rounded-full size-[28px]"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};
