import React, { useState, useRef } from 'react';
import { 
  X, Image as ImageIcon, Video, Upload, Link as LinkIcon, 
  Sparkles, CheckCircle, Flame, Play, AlertCircle, Eye, 
  RefreshCw, Check, Camera, Plus
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { DiyaIcon, GaneshaIcon } from './FestiveIcons';
import { playTempleBell } from '../utils/festiveAudio';
import { MediaItem } from '../types';

interface AddMediaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onMediaAdded?: (item: MediaItem) => void;
  defaultType?: 'image' | 'video';
}

interface SelectedFileItem {
  id: string;
  name: string;
  dataUrl: string;
  type: 'image' | 'video';
  sizeFormatted: string;
}

export function AddMediaModal({ isOpen, onClose, onMediaAdded, defaultType = 'image' }: AddMediaModalProps) {
  const [activeTab, setActiveTab] = useState<'device' | 'link'>('device');
  const [selectedFiles, setSelectedFiles] = useState<SelectedFileItem[]>([]);
  const [urlInput, setUrlInput] = useState('');
  const [videoThumbnail, setVideoThumbnail] = useState<string | null>(null);
  const [detectedYtId, setDetectedYtId] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [successItems, setSuccessItems] = useState<MediaItem[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  if (!isOpen) return null;

  // Extract YouTube ID helper
  const checkYouTubeUrl = (testUrl: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|shorts\/)([^#&?]*).*/;
    const match = testUrl.match(regExp);
    if (match && match[2].length === 11) {
      const id = match[2];
      setDetectedYtId(id);
      setVideoThumbnail(`https://img.youtube.com/vi/${id}/hqdefault.jpg`);
    } else {
      setDetectedYtId(null);
      setVideoThumbnail(null);
    }
  };

  const handleUrlInputChange = (val: string) => {
    setUrlInput(val);
    setError(null);
    checkYouTubeUrl(val);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024 * 1024) {
      return `${(bytes / 1024).toFixed(0)} KB`;
    }
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const processFiles = (files: FileList | File[]) => {
    setError(null);
    const validFiles: SelectedFileItem[] = [];

    Array.from(files).forEach((file) => {
      if (file.size > 30 * 1024 * 1024) {
        setError(`File "${file.name}" exceeds 30MB. Please choose smaller photos/videos.`);
        return;
      }

      const isImg = file.type.startsWith('image/');
      const isVid = file.type.startsWith('video/');

      if (!isImg && !isVid) {
        setError("Please select images (JPG, PNG, WebP) or videos (MP4, WebM).");
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        const dataUrl = reader.result as string;
        setSelectedFiles((prev) => [
          ...prev,
          {
            id: `file-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
            name: file.name,
            dataUrl,
            type: isVid ? 'video' : 'image',
            sizeFormatted: formatFileSize(file.size),
          },
        ]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFiles(e.target.files);
    }
    // reset input so same file can be re-selected if removed
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleRemoveFile = (id: string) => {
    setSelectedFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(e.dataTransfer.files);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  // Easy 1-Click Upload Execution
  const handleEasyUpload = async () => {
    setError(null);

    // 1. If link tab
    if (activeTab === 'link') {
      const trimmedUrl = urlInput.trim();
      if (!trimmedUrl) {
        setError("Please paste a YouTube or video link.");
        return;
      }

      setIsUploading(true);
      try {
        const res = await fetch('/api/media', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type: 'video',
            title: 'Sri Siddhi Vinayaka Utsav Video',
            url: trimmedUrl,
            thumbnailUrl: videoThumbnail || undefined,
            uploadedBy: 'Bennur Devotee',
            category: 'pooja',
            eventYear: '2026',
          }),
        });

        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || "Failed to upload video link.");
        }

        playTempleBell();
        try {
          confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
        } catch (_) {}

        setSuccessItems([data.media]);
        if (onMediaAdded) onMediaAdded(data.media);
      } catch (err: any) {
        setError(err.message || "Failed to upload video link.");
      } finally {
        setIsUploading(false);
      }
      return;
    }

    // 2. If device files
    if (selectedFiles.length === 0) {
      setError("Please tap below to select at least one photo or video.");
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);
    const addedItems: MediaItem[] = [];

    try {
      for (let i = 0; i < selectedFiles.length; i++) {
        const fileItem = selectedFiles[i];
        const res = await fetch('/api/media', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type: fileItem.type,
            title: 'Sri Siddhi Vinayaka Utsav 2026',
            url: fileItem.dataUrl,
            uploadedBy: 'Bennur Devotee',
            category: 'idol',
            eventYear: '2026',
          }),
        });

        const data = await res.json();
        if (res.ok && data.media) {
          addedItems.push(data.media);
          if (onMediaAdded) onMediaAdded(data.media);
        }
        setUploadProgress(Math.round(((i + 1) / selectedFiles.length) * 100));
      }

      if (addedItems.length > 0) {
        playTempleBell();
        try {
          confetti({ particleCount: 70, spread: 80, origin: { y: 0.6 } });
        } catch (_) {}

        setSuccessItems(addedItems);
      } else {
        throw new Error("Could not complete upload. Please check your connection.");
      }
    } catch (err: any) {
      setError(err.message || "Upload failed. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleReset = () => {
    setSelectedFiles([]);
    setUrlInput('');
    setVideoThumbnail(null);
    setDetectedYtId(null);
    setSuccessItems([]);
    setError(null);
    setUploadProgress(0);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-[#FFFDF9] rounded-3xl max-w-lg w-full border-2 border-amber-400 shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 p-4 sm:p-5 text-white flex items-center justify-between shadow-md relative">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-amber-200 shadow-inner">
              <Upload className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-[10px] font-black uppercase tracking-wider text-amber-200 flex items-center gap-1">
                <DiyaIcon className="w-3.5 h-3.5 text-amber-300" />
                <span>EASY PUBLIC UPLOAD • సులభమైన అప్‌లోడ్</span>
              </div>
              <h3 className="font-heading font-black text-lg sm:text-xl text-white">
                Upload Festival Photos &amp; Videos
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-4">
          
          {successItems.length > 0 ? (
            /* SUCCESS STATE */
            <div className="text-center py-6 px-3 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-600 text-white mx-auto flex items-center justify-center shadow-lg animate-bounce">
                <CheckCircle className="w-10 h-10" />
              </div>

              <div className="space-y-1">
                <h4 className="font-heading font-black text-2xl text-emerald-950">
                  Uploaded Successfully! 🎉
                </h4>
                <p className="text-xs sm:text-sm text-stone-600">
                  {successItems.length} festival {successItems.length === 1 ? 'memory is' : 'memories are'} now live on the public gallery wall.
                </p>
                <p className="text-xs text-amber-800 font-bold">
                  (మీ ఫోటోలు గ్యాలరీలో విజయవంతంగా చేర్చబడ్డాయి)
                </p>
              </div>

              {/* Uploaded Previews */}
              <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto p-2 bg-stone-50 rounded-2xl border border-stone-200">
                {successItems.map((item, idx) => (
                  <div key={idx} className="relative aspect-video rounded-xl overflow-hidden bg-stone-900 border border-amber-200">
                    <img 
                      src={item.type === 'video' ? (item.thumbnailUrl || item.url) : item.url} 
                      alt="Uploaded" 
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded text-[9px] font-black uppercase bg-black/80 text-white">
                      {item.type}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  onClick={handleReset}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-950 font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Upload More Photos</span>
                </button>

                <button
                  onClick={onClose}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <span>Done &amp; View Gallery</span>
                </button>
              </div>
            </div>
          ) : (
            /* EASY UPLOAD INTERFACE - ZERO FORM FIELDS */
            <div className="space-y-4">
              
              {/* Tab: From Device vs Paste Video Link */}
              <div className="grid grid-cols-2 gap-2 p-1 bg-stone-100 rounded-2xl border border-stone-200">
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('device');
                    setError(null);
                  }}
                  className={`py-2 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    activeTab === 'device'
                      ? 'bg-white text-amber-950 shadow-sm border border-amber-300 font-black'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  <Camera className="w-4 h-4 text-amber-600" />
                  <span>Camera &amp; Gallery</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('link');
                    setError(null);
                  }}
                  className={`py-2 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    activeTab === 'link'
                      ? 'bg-white text-amber-950 shadow-sm border border-amber-300 font-black'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  <LinkIcon className="w-4 h-4 text-red-600" />
                  <span>YouTube / Video Link</span>
                </button>
              </div>

              {error && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
                  <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {/* OPTION 1: INSTANT CAMERA / DEVICE SELECTOR */}
              {activeTab === 'device' && (
                <div className="space-y-3">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileInputChange}
                    accept="image/*,video/*"
                    multiple
                    className="hidden"
                  />

                  {/* Big Drag & Drop or Click Area */}
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    className={`border-3 border-dashed rounded-3xl p-6 sm:p-8 text-center cursor-pointer transition-all duration-200 flex flex-col items-center justify-center space-y-3 group ${
                      isDragOver
                        ? 'border-amber-600 bg-amber-100/60 scale-[1.01]'
                        : selectedFiles.length > 0
                        ? 'border-amber-400 bg-amber-50/50 hover:bg-amber-50'
                        : 'border-amber-300 bg-amber-50/30 hover:bg-amber-50/70'
                    }`}
                  >
                    <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-500 to-orange-500 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Camera className="w-8 h-8" />
                    </div>

                    <div className="space-y-1">
                      <p className="font-heading font-black text-base sm:text-lg text-amber-950">
                        {selectedFiles.length > 0
                          ? 'Tap to select more photos or videos'
                          : 'Tap here to Choose Photo / Video'}
                      </p>
                      <p className="text-xs text-stone-600">
                        Direct from Mobile Gallery or Camera • No forms or typing needed!
                      </p>
                      <p className="text-[11px] text-amber-800 font-semibold">
                        (ఫోటోలు లేదా వీడియోలను ఎంచుకోండి)
                      </p>
                    </div>
                  </div>

                  {/* Selected Previews Grid */}
                  {selectedFiles.length > 0 && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs font-bold text-stone-700 px-1">
                        <span>Selected ({selectedFiles.length} files):</span>
                        <button
                          type="button"
                          onClick={() => setSelectedFiles([])}
                          className="text-red-600 hover:text-red-800 text-[11px]"
                        >
                          Clear all
                        </button>
                      </div>

                      <div className="grid grid-cols-3 gap-2 max-h-48 overflow-y-auto p-2 bg-stone-100 rounded-2xl border border-stone-200">
                        {selectedFiles.map((file) => (
                          <div
                            key={file.id}
                            className="relative aspect-square rounded-xl overflow-hidden bg-stone-900 border border-stone-300 group"
                          >
                            {file.type === 'image' ? (
                              <img
                                src={file.dataUrl}
                                alt={file.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center bg-stone-800 text-white">
                                <Video className="w-6 h-6 text-red-500" />
                              </div>
                            )}

                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleRemoveFile(file.id);
                              }}
                              className="absolute top-1 right-1 p-1 rounded-full bg-black/70 hover:bg-red-600 text-white transition-colors"
                              title="Remove"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>

                            <span className="absolute bottom-1 left-1 px-1 py-0.5 rounded text-[8px] font-black uppercase bg-black/70 text-white truncate max-w-[90%]">
                              {file.type}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* OPTION 2: VIDEO LINK PASTE */}
              {activeTab === 'link' && (
                <div className="space-y-3 p-4 rounded-2xl bg-amber-50/40 border border-amber-200">
                  <div className="space-y-1">
                    <label className="block text-xs font-bold uppercase tracking-wider text-amber-950 flex items-center gap-1">
                      <LinkIcon className="w-3.5 h-3.5 text-amber-700" />
                      <span>Paste YouTube / Video Link:</span>
                    </label>
                    <input
                      type="url"
                      value={urlInput}
                      onChange={(e) => handleUrlInputChange(e.target.value)}
                      placeholder="e.g. https://www.youtube.com/watch?v=... or shorts link"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-amber-300 focus:border-amber-600 focus:ring-2 focus:ring-amber-200 outline-none text-xs font-medium text-stone-900 bg-white placeholder:text-stone-400"
                    />
                  </div>

                  {detectedYtId && videoThumbnail && (
                    <div className="relative aspect-video rounded-xl overflow-hidden bg-black border border-stone-300">
                      <img src={videoThumbnail} alt="YouTube Thumbnail" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                        <Play className="w-10 h-10 text-white fill-white" />
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* UPLOAD PROGRESS BAR */}
              {isUploading && (
                <div className="space-y-1.5 pt-1">
                  <div className="flex items-center justify-between text-xs font-bold text-amber-950">
                    <span>Uploading to Gallery...</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <div className="w-full h-2.5 bg-stone-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-amber-500 to-orange-500 transition-all duration-300 rounded-full"
                      style={{ width: `${uploadProgress || 15}%` }}
                    />
                  </div>
                </div>
              )}

              {/* 1-CLICK EASY UPLOAD BUTTON */}
              <button
                type="button"
                onClick={handleEasyUpload}
                disabled={isUploading || (activeTab === 'device' && selectedFiles.length === 0) || (activeTab === 'link' && !urlInput.trim())}
                className="w-full py-4 px-4 rounded-2xl font-black text-sm sm:text-base text-white bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:to-orange-600 shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed border border-amber-300"
              >
                {isUploading ? (
                  <span className="flex items-center gap-2">
                    <RefreshCw className="w-5 h-5 animate-spin text-white" />
                    <span>Uploading ({uploadProgress}%)...</span>
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Upload className="w-5 h-5" />
                    <span>
                      {activeTab === 'device' && selectedFiles.length > 1
                        ? `Upload ${selectedFiles.length} Photos Now (వెంటనే అప్‌లోడ్ చేయండి)`
                        : 'Upload to Gallery (వెంటనే అప్‌లోడ్ చేయండి)'}
                    </span>
                  </span>
                )}
              </button>

              <div className="text-center pt-1">
                <span className="text-[11px] text-stone-500 flex items-center justify-center gap-1">
                  <DiyaIcon className="w-3.5 h-3.5 text-amber-600" />
                  <span>Sri Siddhi Vinayaka Utsav • B-Phase Colony, Bennur</span>
                </span>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
}
