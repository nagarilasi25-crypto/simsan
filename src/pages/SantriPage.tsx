import React, { useState } from 'react';
import { SantriList } from '../components/santri/SantriList';
import { SantriFormModal } from '../components/santri/SantriFormModal';
import { SantriDetailModal } from '../components/santri/SantriDetailModal';
import { SantriCardModal } from '../components/santri/SantriCardModal';
import { SantriQRModal } from '../components/santri/SantriQRModal';
import { Santri } from '../types';

export const SantriPage: React.FC = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [santriToEdit, setSantriToEdit] = useState<Santri | null>(null);
  const [selectedDetail, setSelectedDetail] = useState<Santri | null>(null);
  const [selectedCard, setSelectedCard] = useState<Santri | null>(null);
  const [selectedQR, setSelectedQR] = useState<Santri | null>(null);

  return (
    <div>
      <SantriList
        onOpenAddModal={() => {
          setSantriToEdit(null);
          setIsAddModalOpen(true);
        }}
        onEditSantri={(s) => {
          setSantriToEdit(s);
          setIsAddModalOpen(true);
        }}
        onViewDetail={(s) => setSelectedDetail(s)}
        onViewCard={(s) => setSelectedCard(s)}
        onViewQR={(s) => setSelectedQR(s)}
      />

      {/* Form Modal (Add / Edit) */}
      <SantriFormModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        santriToEdit={santriToEdit}
      />

      {/* Detail Profile Modal */}
      <SantriDetailModal
        santri={selectedDetail}
        onClose={() => setSelectedDetail(null)}
        onEdit={(s) => {
          setSelectedDetail(null);
          setSantriToEdit(s);
          setIsAddModalOpen(true);
        }}
        onViewCard={(s) => {
          setSelectedDetail(null);
          setSelectedCard(s);
        }}
        onViewQR={(s) => {
          setSelectedDetail(null);
          setSelectedQR(s);
        }}
      />

      {/* PVC Student Card Modal */}
      <SantriCardModal
        santri={selectedCard}
        onClose={() => setSelectedCard(null)}
      />

      {/* QR Code Viewer Modal */}
      <SantriQRModal
        santri={selectedQR}
        onClose={() => setSelectedQR(null)}
      />
    </div>
  );
};
