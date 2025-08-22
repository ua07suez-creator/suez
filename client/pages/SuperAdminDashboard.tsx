import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Switch } from "../components/ui/switch";
import {
  Settings,
  Users,
  FileText,
  Layout,
  Database,
  Shield,
  BarChart3,
  Image,
  Globe,
  Mail,
  Bell,
  Code,
  Palette,
  Upload,
  Download,
  Search,
  Plus,
  Edit,
  Trash,
  Eye,
  Save,
  RefreshCw,
  Monitor,
  Smartphone,
  MessageCircle,
  DollarSign,
  TrendingUp,
  Activity,
  Calendar,
  Filter,
  Archive,
  Lock,
  Unlock,
  CheckCircle,
  AlertTriangle,
  Info,
  ExternalLink,
} from "lucide-react";

interface SiteSettings {
  site_name: string;
  site_description: string;
  site_logo: string;
  contact_email: string;
  contact_phone: string;
  address: string;
  facebook_url: string;
  whatsapp_number: string;
  maintenance_mode: boolean;
  allow_registration: boolean;
  email_notifications: boolean;
  sms_notifications: boolean;
}

interface ContentPage {
  id: number;
  title: string;
  slug: string;
  content: string;
  status: "published" | "draft" | "private";
  created_at: string;
  updated_at: string;
}

interface SystemUser {
  id: number;
  full_name: string;
  email: string;
  user_type: "admin" | "employee" | "accountant" | "support" | "client";
  is_active: boolean;
  last_login: string;
  created_at: string;
}

export default function SuperAdminDashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [isLoading, setIsLoading] = useState(false);
  
  // Site Settings State
  const [siteSettings, setSiteSettings] = useState<SiteSettings>({
    site_name: "شركة التخليص الجمركي",
    site_description: "أفضل خدمات التخليص الجمركي في مصر",
    site_logo: "",
    contact_email: "info@customs.com",
    contact_phone: "01234567890",
    address: "القاهرة، مصر",
    facebook_url: "",
    whatsapp_number: "201234567890",
    maintenance_mode: false,
    allow_registration: true,
    email_notifications: true,
    sms_notifications: false,
  });

  // Content Management State
  const [pages, setPages] = useState<ContentPage[]>([
    {
      id: 1,
      title: "من نحن",
      slug: "about",
      content: "محتوى صفحة من نحن...",
      status: "published",
      created_at: "2024-01-15",
      updated_at: "2024-01-16",
    },
    {
      id: 2,
      title: "خدماتنا",
      slug: "services",
      content: "محتوى صفحة الخدمات...",
      status: "published",
      created_at: "2024-01-10",
      updated_at: "2024-01-14",
    },
  ]);

  // Users Management State
  const [systemUsers, setSystemUsers] = useState<SystemUser[]>([
    {
      id: 1,
      full_name: "مدير النظام",
      email: "admin@customs.com",
      user_type: "admin",
      is_active: true,
      last_login: "2024-01-16T10:30:00",
      created_at: "2024-01-01",
    },
    {
      id: 2,
      full_name: "موظف العمليات",
      email: "employee@customs.com",
      user_type: "employee",
      is_active: true,
      last_login: "2024-01-16T09:15:00",
      created_at: "2024-01-05",
    },
  ]);

  // Statistics
  const [systemStats, setSystemStats] = useState({
    total_users: 156,
    active_users: 142,
    total_pages: 15,
    total_cases: 324,
    active_cases: 45,
    server_storage: 67,
    database_size: 2.4,
    monthly_visits: 8547,
    bounce_rate: 34,
  });

  const handleSaveSettings = async () => {
    setIsLoading(true);
    // TODO: API call to save settings
    setTimeout(() => {
      setIsLoading(false);
      alert("تم حفظ الإعدادات بنجاح!");
    }, 1000);
  };

  const handleCreatePage = () => {
    const newPage: ContentPage = {
      id: pages.length + 1,
      title: "صفحة جديدة",
      slug: "new-page",
      content: "",
      status: "draft",
      created_at: new Date().toISOString().split('T')[0],
      updated_at: new Date().toISOString().split('T')[0],
    };
    setPages([...pages, newPage]);
  };

  const handleCreateUser = () => {
    // TODO: Open user creation dialog
    alert("سيتم فتح نموذج إنشاء مستخدم جديد");
  };

  const toggleUserStatus = (userId: number) => {
    setSystemUsers(users =>
      users.map(user =>
        user.id === userId ? { ...user, is_active: !user.is_active } : user
      )
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center space-x-2 space-x-reverse">
              <Shield className="w-8 h-8 text-navy-light" />
              <span>لوحة التحكم الشاملة</span>
            </h1>
            <p className="text-gray-600 mt-1">
              إدارة كاملة للموقع والنظام - {user?.full_name}
            </p>
          </div>
          <div className="flex space-x-2 space-x-reverse">
            <Button variant="outline" size="sm">
              <Monitor className="w-4 h-4 ml-2" />
              معاينة الموقع
            </Button>
            <Button className="btn-navy" size="sm">
              <Save className="w-4 h-4 ml-2" />
              حفظ التغييرات
            </Button>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">إجمالي المستخدمين</p>
                <p className="text-2xl font-bold text-navy-dark">{systemStats.total_users}</p>
                <p className="text-xs text-green-600">+12 هذا الشهر</p>
              </div>
              <Users className="w-8 h-8 text-navy-light" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">الزيارات الشهرية</p>
                <p className="text-2xl font-bold text-navy-dark">{systemStats.monthly_visits.toLocaleString()}</p>
                <p className="text-xs text-green-600">+18% نمو</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">استخدام التخزين</p>
                <p className="text-2xl font-bold text-navy-dark">{systemStats.server_storage}%</p>
                <p className="text-xs text-yellow-600">متوسط</p>
              </div>
              <Database className="w-8 h-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">معدل الارتداد</p>
                <p className="text-2xl font-bold text-navy-dark">{systemStats.bounce_rate}%</p>
                <p className="text-xs text-green-600">منخفض</p>
              </div>
              <Activity className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview" className="text-xs">نظرة عامة</TabsTrigger>
          <TabsTrigger value="content" className="text-xs">إدارة المحتوى</TabsTrigger>
          <TabsTrigger value="users" className="text-xs">المستخدمين</TabsTrigger>
          <TabsTrigger value="settings" className="text-xs">إعدادات الموقع</TabsTrigger>
          <TabsTrigger value="analytics" className="text-xs">التحليلات</TabsTrigger>
          <TabsTrigger value="system" className="text-xs">النظام</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 space-x-reverse">
                  <BarChart3 className="w-5 h-5" />
                  <span>إحصائيات سريعة</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <p className="text-2xl font-bold text-navy-dark">{systemStats.active_cases}</p>
                    <p className="text-xs text-gray-600">ملفات نشطة</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <p className="text-2xl font-bold text-navy-dark">{systemStats.total_pages}</p>
                    <p className="text-xs text-gray-600">صفحات الموقع</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <p className="text-2xl font-bold text-navy-dark">{systemStats.active_users}</p>
                    <p className="text-xs text-gray-600">مستخدمين نشطين</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <p className="text-2xl font-bold text-navy-dark">{systemStats.database_size} GB</p>
                    <p className="text-xs text-gray-600">حجم قاعدة البيانات</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 space-x-reverse">
                  <Activity className="w-5 h-5" />
                  <span>حالة النظام</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">خادم الويب</span>
                  <Badge className="bg-green-100 text-green-800">متصل</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">قاعدة البيانات</span>
                  <Badge className="bg-green-100 text-green-800">متصل</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">خدمة البريد الإلكتروني</span>
                  <Badge className="bg-yellow-100 text-yellow-800">محدود</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">النسخ الاحتياطي</span>
                  <Badge className="bg-green-100 text-green-800">يعمل</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Content Management Tab */}
        <TabsContent value="content" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center space-x-2 space-x-reverse">
                    <Layout className="w-5 h-5" />
                    <span>إدارة المحتوى</span>
                  </CardTitle>
                  <CardDescription>إدارة صفحات الموقع والمحتوى</CardDescription>
                </div>
                <Button onClick={handleCreatePage} className="btn-navy">
                  <Plus className="w-4 h-4 ml-2" />
                  صفحة جديدة
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pages.map((page) => (
                  <div key={page.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{page.title}</h3>
                      <p className="text-sm text-gray-600">/{page.slug}</p>
                      <p className="text-xs text-gray-500">آخر تحديث: {page.updated_at}</p>
                    </div>
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <Badge 
                        variant={page.status === "published" ? "default" : "secondary"}
                      >
                        {page.status === "published" ? "منشور" : "مسودة"}
                      </Badge>
                      <Button size="sm" variant="outline">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Users Management Tab */}
        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center space-x-2 space-x-reverse">
                    <Users className="w-5 h-5" />
                    <span>إدارة المستخدمين</span>
                  </CardTitle>
                  <CardDescription>إدارة المستخدمين والأدوار</CardDescription>
                </div>
                <Button onClick={handleCreateUser} className="btn-navy">
                  <Plus className="w-4 h-4 ml-2" />
                  مستخدم جديد
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {systemUsers.map((user) => (
                  <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{user.full_name}</h3>
                      <p className="text-sm text-gray-600">{user.email}</p>
                      <p className="text-xs text-gray-500">آخر دخول: {new Date(user.last_login).toLocaleDateString('ar-EG')}</p>
                    </div>
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <Badge 
                        variant={user.user_type === "admin" ? "default" : "secondary"}
                      >
                        {user.user_type === "admin" ? "مدير" : 
                         user.user_type === "employee" ? "موظف" :
                         user.user_type === "accountant" ? "محاسب" : "عميل"}
                      </Badge>
                      <Switch 
                        checked={user.is_active}
                        onCheckedChange={() => toggleUserStatus(user.id)}
                      />
                      <Button size="sm" variant="outline">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Site Settings Tab */}
        <TabsContent value="settings" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 space-x-reverse">
                  <Settings className="w-5 h-5" />
                  <span>إعدادات عامة</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="site_name">اسم الموقع</Label>
                  <Input
                    id="site_name"
                    value={siteSettings.site_name}
                    onChange={(e) => setSiteSettings({...siteSettings, site_name: e.target.value})}
                    className="text-right"
                  />
                </div>
                <div>
                  <Label htmlFor="site_description">وصف الموقع</Label>
                  <Textarea
                    id="site_description"
                    value={siteSettings.site_description}
                    onChange={(e) => setSiteSettings({...siteSettings, site_description: e.target.value})}
                    className="text-right"
                  />
                </div>
                <div>
                  <Label htmlFor="contact_email">البريد الإلكتروني</Label>
                  <Input
                    id="contact_email"
                    type="email"
                    value={siteSettings.contact_email}
                    onChange={(e) => setSiteSettings({...siteSettings, contact_email: e.target.value})}
                    className="text-right"
                  />
                </div>
                <div>
                  <Label htmlFor="contact_phone">رقم الهاتف</Label>
                  <Input
                    id="contact_phone"
                    value={siteSettings.contact_phone}
                    onChange={(e) => setSiteSettings({...siteSettings, contact_phone: e.target.value})}
                    className="text-right"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 space-x-reverse">
                  <Globe className="w-5 h-5" />
                  <span>إعدادات النظام</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="maintenance_mode">وضع الصيانة</Label>
                  <Switch
                    id="maintenance_mode"
                    checked={siteSettings.maintenance_mode}
                    onCheckedChange={(checked) => setSiteSettings({...siteSettings, maintenance_mode: checked})}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="allow_registration">السماح بالتسجيل</Label>
                  <Switch
                    id="allow_registration"
                    checked={siteSettings.allow_registration}
                    onCheckedChange={(checked) => setSiteSettings({...siteSettings, allow_registration: checked})}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="email_notifications">إشعارات البريد</Label>
                  <Switch
                    id="email_notifications"
                    checked={siteSettings.email_notifications}
                    onCheckedChange={(checked) => setSiteSettings({...siteSettings, email_notifications: checked})}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="sms_notifications">إشعارات SMS</Label>
                  <Switch
                    id="sms_notifications"
                    checked={siteSettings.sms_notifications}
                    onCheckedChange={(checked) => setSiteSettings({...siteSettings, sms_notifications: checked})}
                  />
                </div>
                <Button 
                  onClick={handleSaveSettings} 
                  disabled={isLoading}
                  className="w-full btn-navy"
                >
                  {isLoading ? (
                    <RefreshCw className="w-4 h-4 ml-2 animate-spin" />
                  ) : (
                    <Save className="w-4 h-4 ml-2" />
                  )}
                  حفظ الإعدادات
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 space-x-reverse">
                  <BarChart3 className="w-5 h-5" />
                  <span>تحليلات الزوار</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-gray-500">
                  سيتم عرض رسوم بيانية للزوار هنا
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 space-x-reverse">
                  <Activity className="w-5 h-5" />
                  <span>تحليلات الأداء</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">سرعة تحميل الصفحة</span>
                    <span className="font-medium">2.3 ثانية</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">الصفحات الأكثر زيارة</span>
                    <span className="font-medium">الرئيسية</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">مصدر الزوار</span>
                    <span className="font-medium">بحث مباشر</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* System Tab */}
        <TabsContent value="system" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 space-x-reverse">
                  <Database className="w-5 h-5" />
                  <span>إدارة قاعدة البيانات</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="outline" className="w-full">
                  <Download className="w-4 h-4 ml-2" />
                  تصدير قاعدة البيانات
                </Button>
                <Button variant="outline" className="w-full">
                  <Upload className="w-4 h-4 ml-2" />
                  استيراد البيانات
                </Button>
                <Button variant="outline" className="w-full">
                  <RefreshCw className="w-4 h-4 ml-2" />
                  تحسين قاعدة البيانات
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 space-x-reverse">
                  <Shield className="w-5 h-5" />
                  <span>الأمان والنسخ الاحتياطي</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="outline" className="w-full">
                  <Archive className="w-4 h-4 ml-2" />
                  إنشاء نسخة احتياطية
                </Button>
                <Button variant="outline" className="w-full">
                  <Shield className="w-4 h-4 ml-2" />
                  فحص الأمان
                </Button>
                <Button variant="outline" className="w-full">
                  <Activity className="w-4 h-4 ml-2" />
                  سجل النشاطات
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
