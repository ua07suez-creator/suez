import React, { useState, useCallback } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Badge } from "./ui/badge";
import {
  Upload,
  Image,
  File,
  Video,
  Music,
  FolderPlus,
  Search,
  Filter,
  Grid,
  List,
  Download,
  Edit,
  Trash,
  Copy,
  Eye,
  Share,
  MoreHorizontal,
  X,
} from "lucide-react";

interface MediaFile {
  id: number;
  original_name: string;
  file_name: string;
  file_path: string;
  file_type: string;
  mime_type: string;
  file_size: number;
  width?: number;
  height?: number;
  alt_text?: string;
  title?: string;
  folder_path: string;
  created_at: string;
}

interface MediaFolder {
  id: number;
  name: string;
  path: string;
  parent_id?: number;
  created_at: string;
}

export default function MediaManager() {
  const [files, setFiles] = useState<MediaFile[]>([
    {
      id: 1,
      original_name: "شعار-الشركة.png",
      file_name: "logo_1234567.png",
      file_path: "/uploads/images/logo_1234567.png",
      file_type: "image",
      mime_type: "image/png",
      file_size: 125840,
      width: 300,
      height: 200,
      alt_text: "شعار الشركة",
      title: "شعار الشركة",
      folder_path: "/images",
      created_at: "2024-01-15T10:30:00",
    },
    {
      id: 2,
      original_name: "تقرير-شهري.pdf",
      file_name: "report_7891011.pdf",
      file_path: "/uploads/documents/report_7891011.pdf",
      file_type: "document",
      mime_type: "application/pdf",
      file_size: 2546781,
      folder_path: "/documents",
      created_at: "2024-01-14T14:20:00",
    },
  ]);

  const [folders, setFolders] = useState<MediaFolder[]>([
    { id: 1, name: "الصور", path: "/images", created_at: "2024-01-01" },
    { id: 2, name: "المستندات", path: "/documents", created_at: "2024-01-01" },
    { id: 3, name: "الفيديوهات", path: "/videos", created_at: "2024-01-01" },
  ]);

  const [currentFolder, setCurrentFolder] = useState("/");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [selectedFiles, setSelectedFiles] = useState<number[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const getFileIcon = (fileType: string, mimeType: string) => {
    if (fileType === "image")
      return <Image className="w-5 h-5 text-blue-500" />;
    if (fileType === "video")
      return <Video className="w-5 h-5 text-purple-500" />;
    if (fileType === "audio")
      return <Music className="w-5 h-5 text-green-500" />;
    if (mimeType.includes("pdf"))
      return <File className="w-5 h-5 text-red-500" />;
    return <File className="w-5 h-5 text-gray-500" />;
  };

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    const droppedFiles = Array.from(e.dataTransfer.files);
    handleFileUpload(droppedFiles);
  }, []);

  const handleFileUpload = async (fileList: File[]) => {
    setIsUploading(true);

    // محاكاة رفع الملفات
    for (const file of fileList) {
      const newFile: MediaFile = {
        id: files.length + Math.random(),
        original_name: file.name,
        file_name: `${Date.now()}_${file.name}`,
        file_path: `/uploads${currentFolder}/${Date.now()}_${file.name}`,
        file_type: file.type.startsWith("image/")
          ? "image"
          : file.type.startsWith("video/")
            ? "video"
            : file.type.startsWith("audio/")
              ? "audio"
              : "document",
        mime_type: file.type,
        file_size: file.size,
        folder_path: currentFolder,
        created_at: new Date().toISOString(),
      };

      setFiles((prev) => [...prev, newFile]);
    }

    setIsUploading(false);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFileUpload(Array.from(e.target.files));
    }
  };

  const toggleFileSelection = (fileId: number) => {
    setSelectedFiles((prev) =>
      prev.includes(fileId)
        ? prev.filter((id) => id !== fileId)
        : [...prev, fileId],
    );
  };

  const deleteSelectedFiles = () => {
    setFiles((prev) => prev.filter((file) => !selectedFiles.includes(file.id)));
    setSelectedFiles([]);
  };

  const filteredFiles = files.filter((file) => {
    const matchesSearch =
      file.original_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      file.title?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === "all" || file.file_type === filterType;
    const matchesFolder =
      currentFolder === "/" || file.folder_path === currentFolder;

    return matchesSearch && matchesFilter && matchesFolder;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">
          مدير الملفات والوسائط
        </h2>
        <div className="flex items-center space-x-2 space-x-reverse">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
          >
            {viewMode === "grid" ? (
              <List className="w-4 h-4" />
            ) : (
              <Grid className="w-4 h-4" />
            )}
          </Button>

          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm" className="btn-navy">
                <FolderPlus className="w-4 h-4 ml-2" />
                مجلد جديد
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>إنشاء مجلد جديد</DialogTitle>
                <DialogDescription>
                  قم بإنشاء مجلد جديد لتنظيم ملفاتك
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="folder_name">اسم المجلد</Label>
                  <Input
                    id="folder_name"
                    placeholder="أدخل اسم المجلد"
                    className="text-right"
                  />
                </div>
                <Button className="w-full btn-navy">إنشاء المجلد</Button>
              </div>
            </DialogContent>
          </Dialog>

          <input
            type="file"
            multiple
            onChange={handleFileInputChange}
            className="hidden"
            id="file-upload"
          />
          <Label htmlFor="file-upload" className="cursor-pointer">
            <Button size="sm" className="btn-navy" asChild>
              <span>
                <Upload className="w-4 h-4 ml-2" />
                رفع ملفات
              </span>
            </Button>
          </Label>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="البحث في الملفات..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pr-10 text-right"
            />
          </div>
        </div>

        <Select value={filterType} onValueChange={setFilterType}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="تصفية حسب النوع" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">جميع الأنواع</SelectItem>
            <SelectItem value="image">الصور</SelectItem>
            <SelectItem value="document">المستندات</SelectItem>
            <SelectItem value="video">الفيديوهات</SelectItem>
            <SelectItem value="audio">الملفات الصوتية</SelectItem>
          </SelectContent>
        </Select>

        <Select value={currentFolder} onValueChange={setCurrentFolder}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="اختر المجلد" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="/">الجذر</SelectItem>
            {folders.map((folder) => (
              <SelectItem key={folder.id} value={folder.path}>
                {folder.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Selected Actions */}
      {selectedFiles.length > 0 && (
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">
                تم تحديد {selectedFiles.length} ملف
              </span>
              <div className="flex items-center space-x-2 space-x-reverse">
                <Button size="sm" variant="outline">
                  <Download className="w-4 h-4 ml-2" />
                  تحميل
                </Button>
                <Button size="sm" variant="outline">
                  <Copy className="w-4 h-4 ml-2" />
                  نسخ
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={deleteSelectedFiles}
                >
                  <Trash className="w-4 h-4 ml-2" />
                  حذف
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setSelectedFiles([])}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Upload Area */}
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          isDragOver ? "border-navy-light bg-navy-light/5" : "border-gray-300"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <p className="text-lg font-medium text-gray-600 mb-2">
          اسحب الملفات هنا أو انقر لتحديدها
        </p>
        <p className="text-sm text-gray-500">
          يدعم: JPG, PNG, PDF, DOC, MP4 (الحد الأقصى: 10MB)
        </p>
        {isUploading && (
          <div className="mt-4">
            <div className="text-sm text-navy-light">جاري رفع الملفات...</div>
          </div>
        )}
      </div>

      {/* Files Display */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>الملفات ({filteredFiles.length})</span>
            <Badge variant="secondary">
              {currentFolder === "/" ? "الجذر" : currentFolder}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {viewMode === "grid" ? (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {filteredFiles.map((file) => (
                <div
                  key={file.id}
                  className={`relative border rounded-lg p-3 cursor-pointer transition-all hover:shadow-md ${
                    selectedFiles.includes(file.id)
                      ? "border-navy-light bg-navy-light/5"
                      : ""
                  }`}
                  onClick={() => toggleFileSelection(file.id)}
                >
                  <div className="aspect-square flex items-center justify-center mb-2 bg-gray-50 rounded">
                    {file.file_type === "image" ? (
                      <img
                        src={file.file_path}
                        alt={file.alt_text || file.original_name}
                        className="w-full h-full object-cover rounded"
                      />
                    ) : (
                      getFileIcon(file.file_type, file.mime_type)
                    )}
                  </div>
                  <p className="text-xs font-medium text-gray-900 truncate">
                    {file.original_name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {formatFileSize(file.file_size)}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              {filteredFiles.map((file) => (
                <div
                  key={file.id}
                  className={`flex items-center justify-between p-3 border rounded-lg cursor-pointer transition-all hover:bg-gray-50 ${
                    selectedFiles.includes(file.id)
                      ? "border-navy-light bg-navy-light/5"
                      : ""
                  }`}
                  onClick={() => toggleFileSelection(file.id)}
                >
                  <div className="flex items-center space-x-3 space-x-reverse">
                    {getFileIcon(file.file_type, file.mime_type)}
                    <div>
                      <p className="font-medium text-gray-900">
                        {file.original_name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {formatFileSize(file.file_size)} •{" "}
                        {new Date(file.created_at).toLocaleDateString("ar-EG")}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <Button size="sm" variant="ghost">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="ghost">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="ghost">
                      <Download className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="ghost">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {filteredFiles.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <File className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p className="text-lg font-medium mb-2">لا توجد ملفات</p>
              <p className="text-sm">قم برفع ملفات جديدة أو غير معايير البحث</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
