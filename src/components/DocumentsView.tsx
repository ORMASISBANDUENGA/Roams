import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import {
  FileText,
  Upload,
  Plus,
  Trash2,
  Sparkles,
  FileCode,
  FileSpreadsheet,
  FileCheck,
  ArrowRight,
  Search,
  BookOpen,
  Languages,
  Filter,
  CheckCircle2
} from 'lucide-react';
import { DocumentFile } from '../types/roam';

interface DocumentsViewProps {
  documents: DocumentFile[];
  onUploadDocument: (file: DocumentFile) => void;
  onDeleteDocument: (docId: string) => void;
  onAnalyzeDocumentInChat: (doc: DocumentFile, actionPrompt: string) => void;
}

export const DocumentsView: React.FC<DocumentsViewProps> = ({
  documents,
  onUploadDocument,
  onDeleteDocument,
  onAnalyzeDocumentInChat,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDoc, setSelectedDoc] = useState<DocumentFile | null>(documents[0] || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const filteredDocs = documents.filter((d) =>
    d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (d.tags && d.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase())))
  );

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    const extension = file.name.split('.').pop()?.toLowerCase() || '';

    let type: DocumentFile['type'] = 'txt';
    if (extension === 'pdf') type = 'pdf';
    else if (['doc', 'docx'].includes(extension)) type = 'word';
    else if (['xls', 'xlsx'].includes(extension)) type = 'excel';
    else if (['ppt', 'pptx'].includes(extension)) type = 'powerpoint';
    else if (['jpg', 'jpeg', 'png', 'webp', 'svg'].includes(extension)) type = 'image';
    else if (['ts', 'tsx', 'js', 'py', 'sql', 'rs', 'html', 'css'].includes(extension)) type = 'code';
    else if (extension === 'csv') type = 'csv';

    const newDoc: DocumentFile = {
      id: `doc-${Date.now()}`,
      name: file.name,
      size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
      type,
      uploadedAt: 'À l’instant',
      summary: `Document importé (${file.name}). Prêt pour analyse, extraction de données et questions.`,
      tags: ['Importé', extension.toUpperCase()],
    };

    onUploadDocument(newDoc);
    setSelectedDoc(newDoc);
  };

  const getIconForType = (type: DocumentFile['type']) => {
    switch (type) {
      case 'pdf':
        return <FileText className="w-5 h-5 text-rose-400" />;
      case 'word':
        return <FileText className="w-5 h-5 text-sky-400" />;
      case 'excel':
      case 'csv':
        return <FileSpreadsheet className="w-5 h-5 text-emerald-400" />;
      case 'code':
        return <FileCode className="w-5 h-5 text-amber-400" />;
      default:
        return <FileText className="w-5 h-5 text-purple-400" />;
    }
  };

  return (
    <div className="flex-1 overflow-y-auto bg-slate-950 text-slate-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-100 flex items-center space-x-3">
              <FileText className="w-7 h-7 text-sky-400" />
              <span>Documents & Analyse</span>
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Importez des fichiers PDF, Word, Excel, Code ou Images pour les résumer, les traduire ou poser des questions.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-semibold text-sm transition-all shadow-lg shadow-sky-500/20"
            >
              <Upload className="w-4 h-4" />
              <span>Importer un document</span>
            </button>
          </div>
        </div>

        {/* Layout with 2 Columns: List on left, Inspector & Actions on right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column: Documents list */}
          <div className="lg:col-span-5 space-y-4">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Rechercher un document ou tag..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-slate-200 focus:outline-none focus:border-sky-500"
              />
            </div>

            <div className="space-y-2.5">
              {filteredDocs.map((doc) => (
                <div
                  key={doc.id}
                  onClick={() => setSelectedDoc(doc)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                    selectedDoc?.id === doc.id
                      ? 'bg-slate-900 border-sky-500/60 shadow-lg shadow-sky-500/10'
                      : 'bg-slate-900/60 border-slate-800/80 hover:bg-slate-900 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center space-x-3 min-w-0">
                    <div className="p-2 rounded-lg bg-slate-950">
                      {getIconForType(doc.type)}
                    </div>
                    <div className="truncate">
                      <div className="text-sm font-semibold text-slate-200 truncate">{doc.name}</div>
                      <div className="text-xs text-slate-500">{doc.size} • {doc.uploadedAt}</div>
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteDocument(doc.id);
                    }}
                    className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-slate-800 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Selected Document Actions & Details */}
          <div className="lg:col-span-7">
            {selectedDoc ? (
              <motion.div
                key={selectedDoc.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-6 shadow-xl"
              >
                <div className="flex items-start justify-between pb-4 border-b border-slate-800">
                  <div className="flex items-center space-x-3">
                    <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                      {getIconForType(selectedDoc.type)}
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-slate-100">{selectedDoc.name}</h2>
                      <p className="text-xs text-slate-400">
                        {selectedDoc.size} • Type : {selectedDoc.type.toUpperCase()} • {selectedDoc.uploadedAt}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Summary */}
                <div className="space-y-2">
                  <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Résumé synthétique
                  </div>
                  <p className="text-sm text-slate-300 bg-slate-950/60 p-4 rounded-xl border border-slate-800/80 leading-relaxed">
                    {selectedDoc.summary || 'Ce document a été indexé par ROAM. Choisissez une action ci-dessous pour l’exploiter.'}
                  </p>
                </div>

                {/* Tags */}
                {selectedDoc.tags && (
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-slate-500">Tags :</span>
                    {selectedDoc.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700/60"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* 5 Quick Actions on Document */}
                <div className="space-y-3 pt-2">
                  <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Que souhaitez-vous faire avec ce document ?
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      onClick={() =>
                        onAnalyzeDocumentInChat(
                          selectedDoc,
                          `Fais un résumé complet et structuré en 5 points clés du document "${selectedDoc.name}".`
                        )
                      }
                      className="p-3.5 rounded-xl bg-slate-950/70 hover:bg-slate-950 border border-slate-800 hover:border-sky-500/40 transition-all flex items-center justify-between text-left group"
                    >
                      <div className="flex items-center space-x-3">
                        <BookOpen className="w-4 h-4 text-sky-400" />
                        <div>
                          <div className="text-sm font-semibold text-slate-200">Résumer</div>
                          <div className="text-xs text-slate-400">Points clés et synthèse</div>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-sky-400 transition-colors" />
                    </button>

                    <button
                      onClick={() =>
                        onAnalyzeDocumentInChat(
                          selectedDoc,
                          `Pose des questions et identifie les points d'attention critiques sur le document "${selectedDoc.name}".`
                        )
                      }
                      className="p-3.5 rounded-xl bg-slate-950/70 hover:bg-slate-950 border border-slate-800 hover:border-amber-500/40 transition-all flex items-center justify-between text-left group"
                    >
                      <div className="flex items-center space-x-3">
                        <Sparkles className="w-4 h-4 text-amber-400" />
                        <div>
                          <div className="text-sm font-semibold text-slate-200">Poser des questions</div>
                          <div className="text-xs text-slate-400">Interroger le contenu</div>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-amber-400 transition-colors" />
                    </button>

                    <button
                      onClick={() =>
                        onAnalyzeDocumentInChat(
                          selectedDoc,
                          `Extrais toutes les données chiffrées, tableaux et métriques du document "${selectedDoc.name}".`
                        )
                      }
                      className="p-3.5 rounded-xl bg-slate-950/70 hover:bg-slate-950 border border-slate-800 hover:border-emerald-500/40 transition-all flex items-center justify-between text-left group"
                    >
                      <div className="flex items-center space-x-3">
                        <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
                        <div>
                          <div className="text-sm font-semibold text-slate-200">Extraire les données</div>
                          <div className="text-xs text-slate-400">Chiffres & tableaux</div>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-emerald-400 transition-colors" />
                    </button>

                    <button
                      onClick={() =>
                        onAnalyzeDocumentInChat(
                          selectedDoc,
                          `Traduis fidèlement le document "${selectedDoc.name}" en anglais professionnel.`
                        )
                      }
                      className="p-3.5 rounded-xl bg-slate-950/70 hover:bg-slate-950 border border-slate-800 hover:border-purple-500/40 transition-all flex items-center justify-between text-left group"
                    >
                      <div className="flex items-center space-x-3">
                        <Languages className="w-4 h-4 text-purple-400" />
                        <div>
                          <div className="text-sm font-semibold text-slate-200">Traduire</div>
                          <div className="text-xs text-slate-400">Vers d'autres langues</div>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-purple-400 transition-colors" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="p-12 rounded-2xl bg-slate-900/40 border border-slate-800/80 text-center text-slate-500">
                Sélectionnez un document ou importez-en un pour démarrer.
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
