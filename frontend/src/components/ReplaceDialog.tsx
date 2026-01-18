import React from "react";

interface ReplaceDialogProps {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ReplaceDialog({ open, onConfirm, onCancel }: ReplaceDialogProps) {
  if (!open) return null;

  return (
    <div className="modal-backdrop">
      <div className="card" style={{ minWidth: 360 }}>
        <h3 className="section-title">Replace existing data?</h3>
        <p className="muted">A statement already exists for this month/year. Replace it?</p>
        <div style={{ display: "flex", gap: 12, justifyContent: "flex-end", marginTop: 16 }}>
          <button className="button ghost" onClick={onCancel}>
            Keep existing
          </button>
          <button className="button primary" onClick={onConfirm}>
            Replace
          </button>
        </div>
      </div>
    </div>
  );
}
