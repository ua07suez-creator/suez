import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { 
  FileText, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  DollarSign, 
  Ship, 
  User,
  Bell,
  Plus,
  Download
} from 'lucide-react';
import { Alert, AlertDescription } from '../components/ui/alert';

interface DashboardStats {
  total_cases: number;
  active_cases: number;
  completed_cases: number;
  pending_documents: number;
  pending_payments: number;
  overdue_invoices: number;
}

interface RecentCase {
  id: number;
  case_number: string;
  operation_type: 'import' | 'export';
  current_status: string;
  port: string;
  created_at: string;
  updated_at: string;
}

export default function Dashboard() {
  const { user, client } = useAuth();
  const [stats, setStats] = useState<DashboardStats>({
    total_cases: 0,
    active_cases: 0,
    completed_cases: 0,
    pending_documents: 0,
    pending_payments: 0,
    overdue_invoices: 0
  });
  const [recentCases, setRecentCases] = useState<RecentCase[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // TODO: استدعاء API للحصول على البيانات
    // محاكاة البيانات مؤقتاً
    setTimeout(() => {
      setStats({
        total_cases: 24,
        active_cases: 6,
        completed_cases: 18,
        pending_documents: 3,
        pending_payments: 2,
        overdue_invoices: 1
      });

      setRecentCases([
        {
          id: 1,
          case_number: 'CU-2024-001',
          operation_type: 'import',
          current_status: 'بانتظار المستندات',
          port: 'الإسكندرية',
          created_at: '2024-01-15',
          updated_at: '2024-01-16'
        },
        {
          id: 2,
          case_number: 'CU-2024-002',
          operation_type: 'export',
          current_status: 'تم التقديم للجمارك',
          port: 'دمياط',
          created_at: '2024-01-10',
          updated_at: '2024-01-14'
        },
        {
          id: 3,
          case_number: 'CU-2024-003',
          operation_type: 'import',
          current_status: 'تم الإفراج الجمركي',
          port: 'العين السخنة',
          created_at: '2024-01-05',
          updated_at: '2024-01-12'
        }
      ]);

      setIsLoading(false);
    }, 1000);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'تم الإفراج الجمركي':
        return 'bg-green-100 text-green-800';
      case 'بانتظار المستندات':
        return 'bg-yellow-100 text-yellow-800';
      case 'تم التقديم للجمارك':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getOperationTypeLabel = (type: 'import' | 'export') => {
    return type === 'import' ? 'استيراد' : 'تصدير';
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
              {client?.company_name && `${client.company_name} - `}
              آخر دخول: اليوم
            </p>
          </div>
          <div className="flex space-x-2 space-x-reverse">
            <Button className="btn-navy">
              <Plus className="w-4 h-4 ml-2" />
              ملف جديد
            </Button>
            <Button variant="outline">
              <Bell className="w-4 h-4 ml-2" />
              الإشعارات
            </Button>
          </div>
        </div>
      </div>

      {/* التنبيهات الهامة */}
      {stats.pending_documents > 0 && (
        <Alert className="border-yellow-200 bg-yellow-50">
          <AlertCircle className="h-4 w-4 text-yellow-600" />
          <AlertDescription className="text-yellow-800">
            لديك {stats.pending_documents} مستندات مطلوبة للمراجعة.
          </AlertDescription>
        </Alert>
      )}

      {stats.overdue_invoices > 0 && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            لديك {stats.overdue_invoices} فاتورة متأخرة السداد.
          </AlertDescription>
        </Alert>
      )}

      {/* إحصائيات سريعة */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
              <div className="mr-4">
                <p className="text-sm font-medium text-gray-600">إجمالي الملفات</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total_cases}</p>
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
                <p className="text-2xl font-bold text-gray-900">{stats.active_cases}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div className="mr-4">
                <p className="text-sm font-medium text-gray-600">ملفات مكتملة</p>
                <p className="text-2xl font-bold text-gray-900">{stats.completed_cases}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-red-100 rounded-lg">
                <DollarSign className="h-6 w-6 text-red-600" />
              </div>
              <div className="mr-4">
                <p className="text-sm font-medium text-gray-600">مدفوعات معلقة</p>
                <p className="text-2xl font-bold text-gray-900">{stats.pending_payments}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* الملفات الحديثة */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>أحدث الملفات</CardTitle>
            <CardDescription>
              آخر 3 ملفات تم تحديثها
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentCases.map((caseItem) => (
                <div key={caseItem.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-3 space-x-reverse">
                    <div className="p-2 bg-gray-100 rounded-lg">
                      <Ship className="h-4 w-4 text-gray-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{caseItem.case_number}</p>
                      <p className="text-sm text-gray-600">
                        {getOperationTypeLabel(caseItem.operation_type)} - {caseItem.port}
                      </p>
                    </div>
                  </div>
                  <div className="text-left">
                    <Badge className={getStatusColor(caseItem.current_status)}>
                      {caseItem.current_status}
                    </Badge>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(caseItem.updated_at).toLocaleDateString('ar-EG')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <Button variant="outline" className="w-full">
                عرض جميع الملفات
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* الإجراءات السريعة */}
        <Card>
          <CardHeader>
            <CardTitle>الإجراءات السريعة</CardTitle>
            <CardDescription>
              الإجراءات الأكثر استخداماً
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Button className="w-full justify-start btn-navy">
                <Plus className="w-4 h-4 ml-2" />
                فتح ملف جديد
              </Button>
              
              <Button variant="outline" className="w-full justify-start">
                <Download className="w-4 h-4 ml-2" />
                رفع مستند
              </Button>
              
              <Button variant="outline" className="w-full justify-start">
                <DollarSign className="w-4 h-4 ml-2" />
                عرض الفواتير
              </Button>
              
              <Button variant="outline" className="w-full justify-start">
                <User className="w-4 h-4 ml-2" />
                تواصل مع الفريق
              </Button>
              
              <Button variant="outline" className="w-full justify-start">
                <FileText className="w-4 h-4 ml-2" />
                تقارير الملفات
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* معلومات الحساب */}
      <Card>
        <CardHeader>
          <CardTitle>معلومات الحساب</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">بيانات الاتصال</h4>
              <div className="space-y-1 text-sm text-gray-600">
                <p>البريد الإلكتروني: {user?.email}</p>
                {user?.phone && <p>الهاتف: {user.phone}</p>}
              </div>
            </div>
            
            {client && (
              <div>
                <h4 className="font-medium text-gray-900 mb-2">بيانات الشركة</h4>
                <div className="space-y-1 text-sm text-gray-600">
                  {client.company_name && <p>اسم الشركة: {client.company_name}</p>}
                  <p>نوع النشاط: {client.company_type === 'company' ? 'شركة' : 'فردي'}</p>
                  {client.city && <p>المدينة: {client.city}</p>}
                  {client.tax_number && <p>الرقم الضريبي: {client.tax_number}</p>}
                </div>
              </div>
            )}
          </div>
          
          <div className="mt-4">
            <Button variant="outline">
              تحديث البيانات
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
