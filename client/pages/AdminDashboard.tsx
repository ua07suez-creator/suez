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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import {
  Users,
  FileText,
  DollarSign,
  Clock,
  AlertTriangle,
  TrendingUp,
  CheckCircle,
  XCircle,
  Plus,
  Settings,
  BarChart3,
  Search,
} from "lucide-react";
import { Alert, AlertDescription } from "../components/ui/alert";
import { Input } from "../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";

interface AdminStats {
  total_clients: number;
  total_cases: number;
  active_cases: number;
  completed_cases: number;
  pending_cases: number;
  overdue_cases: number;
  total_revenue: number;
  pending_payments: number;
  this_month_revenue: number;
  this_month_cases: number;
}

interface RecentActivity {
  id: number;
  type:
    | "case_created"
    | "payment_received"
    | "document_uploaded"
    | "case_completed";
  description: string;
  user_name: string;
  case_number?: string;
  timestamp: string;
}

interface Employee {
  id: number;
  full_name: string;
  email: string;
  user_type: string;
  active_cases: number;
  completed_cases: number;
  is_active: boolean;
}

export default function AdminDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState<AdminStats>({
    total_clients: 0,
    total_cases: 0,
    active_cases: 0,
    completed_cases: 0,
    pending_cases: 0,
    overdue_cases: 0,
    total_revenue: 0,
    pending_payments: 0,
    this_month_revenue: 0,
    this_month_cases: 0,
  });

  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // TODO: استدعاء API للحصول على البيانات
    // محاكاة البيانات مؤقتاً
    setTimeout(() => {
      setStats({
        total_clients: 156,
        total_cases: 324,
        active_cases: 45,
        completed_cases: 279,
        pending_cases: 12,
        overdue_cases: 3,
        total_revenue: 2450000,
        pending_payments: 180000,
        this_month_revenue: 340000,
        this_month_cases: 28,
      });

      setRecentActivity([
        {
          id: 1,
          type: "case_created",
          description: "تم إنشاء ملف جديد",
          user_name: "أحمد محمد",
          case_number: "CU-2024-045",
          timestamp: "2024-01-16T10:30:00",
        },
        {
          id: 2,
          type: "payment_received",
          description: "تم استلام دفعة",
          user_name: "شركة النصر للتجارة",
          timestamp: "2024-01-16T09:15:00",
        },
        {
          id: 3,
          type: "document_uploaded",
          description: "تم رفع مستند",
          user_name: "فاطمة علي",
          case_number: "CU-2024-043",
          timestamp: "2024-01-16T08:45:00",
        },
        {
          id: 4,
          type: "case_completed",
          description: "تم إكمال ملف",
          user_name: "محمد أحمد",
          case_number: "CU-2024-040",
          timestamp: "2024-01-15T16:20:00",
        },
      ]);

      setEmployees([
        {
          id: 2,
          full_name: "موظف العمليات",
          email: "employee1@company.com",
          user_type: "employee",
          active_cases: 12,
          completed_cases: 87,
          is_active: true,
        },
        {
          id: 3,
          full_name: "المحاسب",
          email: "accountant@company.com",
          user_type: "accountant",
          active_cases: 8,
          completed_cases: 145,
          is_active: true,
        },
      ]);

      setIsLoading(false);
    }, 1000);
  }, []);

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "case_created":
        return <Plus className="h-4 w-4 text-blue-600" />;
      case "payment_received":
        return <DollarSign className="h-4 w-4 text-green-600" />;
      case "document_uploaded":
        return <FileText className="h-4 w-4 text-orange-600" />;
      case "case_completed":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("ar-EG", {
      style: "currency",
      currency: "EGP",
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("ar-EG", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-navy-light mx-auto"></div>
          <p className="mt-4 text-gray-600">جاري تحميل البيانات...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* رسالة الترحيب */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              مرحباً، {user?.full_name}
            </h1>
            <p className="text-gray-600 mt-1">
              ل��حة التحكم الإدارية -{" "}
              {user?.user_type === "admin" ? "مدير عام" : "موظف"}
            </p>
          </div>
          <div className="flex space-x-2 space-x-reverse">
            <Button className="btn-navy">
              <Plus className="w-4 h-4 ml-2" />
              عميل جديد
            </Button>
            <Button variant="outline">
              <Settings className="w-4 h-4 ml-2" />
              الإعدادات
            </Button>
          </div>
        </div>
      </div>

      {/* التنبيهات الهامة */}
      {stats.overdue_cases > 0 && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            تحذير: لديك {stats.overdue_cases} ملفات متأخرة تحتاج لمتابعة فورية.
          </AlertDescription>
        </Alert>
      )}

      {/* الإحصائيات الرئيسية */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div className="mr-4">
                <p className="text-sm font-medium text-gray-600">
                  إجمالي العملاء
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.total_clients}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <FileText className="h-6 w-6 text-green-600" />
              </div>
              <div className="mr-4">
                <p className="text-sm font-medium text-gray-600">
                  إجمالي الملفات
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.total_cases}
                </p>
                <p className="text-xs text-green-600">
                  +{stats.this_month_cases} هذا الشهر
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="mr-4">
                <p className="text-sm font-medium text-gray-600">ملفات نشطة</p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.active_cases}
                </p>
                <p className="text-xs text-red-600">
                  {stats.overdue_cases} متأخر
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
              <div className="mr-4">
                <p className="text-sm font-medium text-gray-600">
                  الإيرادات الشهرية
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(stats.this_month_revenue)}
                </p>
                <p className="text-xs text-gray-600">
                  {formatCurrency(stats.pending_payments)} معلق
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* التبويبات الرئيسية */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">نظرة ع��مة</TabsTrigger>
          <TabsTrigger value="cases">الملفات</TabsTrigger>
          <TabsTrigger value="clients">العملاء</TabsTrigger>
          <TabsTrigger value="employees">الموظفين</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* النشاط الأخير */}
            <Card>
              <CardHeader>
                <CardTitle>النشاط الأخير</CardTitle>
                <CardDescription>آخر العمليات التي تمت</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-center space-x-3 space-x-reverse"
                    >
                      <div className="p-2 bg-gray-100 rounded-lg">
                        {getActivityIcon(activity.type)}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">
                          {activity.description}
                        </p>
                        <div className="flex items-center space-x-2 space-x-reverse text-xs text-gray-500">
                          <span>{activity.user_name}</span>
                          {activity.case_number && (
                            <>
                              <span>•</span>
                              <span>{activity.case_number}</span>
                            </>
                          )}
                          <span>•</span>
                          <span>{formatDate(activity.timestamp)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* الملفات حسب الحالة */}
            <Card>
              <CardHeader>
                <CardTitle>الملفات حسب الحالة</CardTitle>
                <CardDescription>توزيع الملفات الحالية</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-gray-600">مكتملة</span>
                    </div>
                    <span className="font-medium">{stats.completed_cases}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <span className="text-sm text-gray-600">
                        قيد المعالجة
                      </span>
                    </div>
                    <span className="font-medium">{stats.active_cases}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <span className="text-sm text-gray-600">معلقة</span>
                    </div>
                    <span className="font-medium">{stats.pending_cases}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <span className="text-sm text-gray-600">متأخرة</span>
                    </div>
                    <span className="font-medium text-red-600">
                      {stats.overdue_cases}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="cases" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>إدارة الملفات</CardTitle>
                  <CardDescription>جميع ملفات التخليص الجمركي</CardDescription>
                </div>
                <Button className="btn-navy">
                  <Plus className="w-4 h-4 ml-2" />
                  ملف جديد
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4 space-x-reverse mb-4">
                <div className="flex-1">
                  <Input placeholder="البحث في الملفات..." />
                </div>
                <Select>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="تصفية حسب الحالة" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">جميع الحالات</SelectItem>
                    <SelectItem value="active">نشطة</SelectItem>
                    <SelectItem value="completed">مكتملة</SelectItem>
                    <SelectItem value="pending">معلقة</SelectItem>
                    <SelectItem value="overdue">متأخرة</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="text-center py-8 text-gray-500">
                سيتم عرض جدول الملفات هنا...
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="clients" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>إدارة العملاء</CardTitle>
                  <CardDescription>جميع عملاء الشركة</CardDescription>
                </div>
                <Button className="btn-navy">
                  <Plus className="w-4 h-4 ml-2" />
                  عميل جديد
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-gray-500">
                سيتم عرض جدول العملاء هنا...
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="employees" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>إدارة الموظفين</CardTitle>
                  <CardDescription>فريق العمل وأدائهم</CardDescription>
                </div>
                <Button className="btn-navy">
                  <Plus className="w-4 h-4 ml-2" />
                  موظف جديد
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {employees.map((employee) => (
                  <div
                    key={employee.id}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="flex items-center space-x-3 space-x-reverse">
                      <div className="p-2 bg-gray-100 rounded-lg">
                        <User className="h-4 w-4 text-gray-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          {employee.full_name}
                        </p>
                        <p className="text-sm text-gray-600">
                          {employee.email}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-6 space-x-reverse">
                      <div className="text-center">
                        <p className="text-sm font-medium text-gray-900">
                          {employee.active_cases}
                        </p>
                        <p className="text-xs text-gray-600">ملفات نشطة</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-medium text-gray-900">
                          {employee.completed_cases}
                        </p>
                        <p className="text-xs text-gray-600">مكتملة</p>
                      </div>
                      <Badge
                        variant={employee.is_active ? "default" : "secondary"}
                      >
                        {employee.is_active ? "نشط" : "غير نشط"}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
