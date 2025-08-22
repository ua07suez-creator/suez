import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Alert, AlertDescription } from '../components/ui/alert';
import { 
  Plus,
  Search,
  Filter,
  Eye,
  Edit,
  FileText,
  Upload,
  Clock,
  Ship,
  AlertCircle,
  CheckCircle,
  DollarSign,
  User
} from 'lucide-react';
import { CaseWithDetails } from '@shared/customs-types';

interface CaseListItem {
  id: number;
  case_number: string;
  client_name: string;
  operation_type: 'import' | 'export';
  port: string;
  current_status: string;
  goods_description: string;
  goods_value: number;
  currency: string;
  created_at: string;
  updated_at: string;
  priority: 'low' | 'normal' | 'high' | 'urgent';
  assigned_employee_name?: string;
}

interface NewCaseForm {
  client_id: string;
  operation_type: 'import' | 'export';
  port: string;
  bill_of_lading: string;
  shipment_number: string;
  shipping_company: string;
  goods_description: string;
  goods_value: string;
  currency: string;
  priority: 'low' | 'normal' | 'high' | 'urgent';
  target_completion_date: string;
  notes: string;
}

export default function CaseManagement() {
  const { user } = useAuth();
  const [cases, setCases] = useState<CaseListItem[]>([]);
  const [filteredCases, setFilteredCases] = useState<CaseListItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [operationFilter, setOperationFilter] = useState('all');
  const [isNewCaseOpen, setIsNewCaseOpen] = useState(false);
  const [selectedCase, setSelectedCase] = useState<CaseWithDetails | null>(null);
  const [isCaseDetailsOpen, setIsCaseDetailsOpen] = useState(false);

  const [newCaseForm, setNewCaseForm] = useState<NewCaseForm>({
    client_id: '',
    operation_type: 'import',
    port: '',
    bill_of_lading: '',
    shipment_number: '',
    shipping_company: '',
    goods_description: '',
    goods_value: '',
    currency: 'EGP',
    priority: 'normal',
    target_completion_date: '',
    notes: ''
  });

  // محاكاة البيانات
  useEffect(() => {
    setTimeout(() => {
      const mockCases: CaseListItem[] = [
        {
          id: 1,
          case_number: 'CU-2024-001',
          client_name: 'شركة النصر للتجارة',
          operation_type: 'import',
          port: 'الإسكندرية',
          current_status: 'بانتظار المستندات',
          goods_description: 'مواد خام للصناعة',
          goods_value: 125000,
          currency: 'EGP',
          created_at: '2024-01-15T10:00:00',
          updated_at: '2024-01-16T14:30:00',
          priority: 'high',
          assigned_employee_name: 'موظف العمليات'
        },
        {
          id: 2,
          case_number: 'CU-2024-002',
          client_name: 'أحم�� محمد للاستيراد',
          operation_type: 'export',
          port: 'دمياط',
          current_status: 'تم التقديم للجمارك',
          goods_description: 'منتجات زراعية',
          goods_value: 85000,
          currency: 'EGP',
          created_at: '2024-01-10T09:00:00',
          updated_at: '2024-01-14T11:15:00',
          priority: 'normal',
          assigned_employee_name: 'موظف العمليات'
        },
        {
          id: 3,
          case_number: 'CU-2024-003',
          client_name: 'شركة المستقبل',
          operation_type: 'import',
          port: 'العين السخنة',
          current_status: 'تم الإفراج الجمركي',
          goods_description: 'معدات إلكترونية',
          goods_value: 250000,
          currency: 'USD',
          created_at: '2024-01-05T08:00:00',
          updated_at: '2024-01-12T16:45:00',
          priority: 'urgent',
          assigned_employee_name: 'موظف العمليات'
        }
      ];

      setCases(mockCases);
      setFilteredCases(mockCases);
      setIsLoading(false);
    }, 1000);
  }, []);

  // تصفية البيانات
  useEffect(() => {
    let filtered = cases;

    if (searchTerm) {
      filtered = filtered.filter(case_ => 
        case_.case_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
        case_.client_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        case_.goods_description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(case_ => case_.current_status === statusFilter);
    }

    if (operationFilter !== 'all') {
      filtered = filtered.filter(case_ => case_.operation_type === operationFilter);
    }

    setFilteredCases(filtered);
  }, [cases, searchTerm, statusFilter, operationFilter]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'تم الإفراج الجمركي':
        return 'bg-green-100 text-green-800';
      case 'بانتظار المستندات':
        return 'bg-yellow-100 text-yellow-800';
      case 'تم التقديم للجمارك':
        return 'bg-blue-100 text-blue-800';
      case 'بانتظار الفحص والمعاينة':
        return 'bg-orange-100 text-orange-800';
      case 'تم دفع الرسوم':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'bg-red-100 text-red-800';
      case 'high':
        return 'bg-orange-100 text-orange-800';
      case 'normal':
        return 'bg-blue-100 text-blue-800';
      case 'low':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'عاجل';
      case 'high': return 'عالي';
      case 'normal': return 'عادي';
      case 'low': return 'منخفض';
      default: return priority;
    }
  };

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('ar-EG', {
      style: 'currency',
      currency: currency
    }).format(amount);
  };

  const handleNewCaseSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: إرسال البيانات إلى API
    console.log('New case data:', newCaseForm);
    setIsNewCaseOpen(false);
    // إعادة تعيين النموذج
    setNewCaseForm({
      client_id: '',
      operation_type: 'import',
      port: '',
      bill_of_lading: '',
      shipment_number: '',
      shipping_company: '',
      goods_description: '',
      goods_value: '',
      currency: 'EGP',
      priority: 'normal',
      target_completion_date: '',
      notes: ''
    });
  };

  const handleViewCase = (caseId: number) => {
    // TODO: استدعاء API للحصول على تفاصيل الملف
    const mockCaseDetails: CaseWithDetails = {
      id: caseId,
      case_number: 'CU-2024-001',
      client_id: 1,
      assigned_employee_id: 2,
      operation_type: 'import',
      port: 'الإسكندرية',
      bill_of_lading: 'BL12345',
      shipment_number: 'SH67890',
      shipping_company: 'شركة الشحن العالمية',
      goods_description: 'مواد خام للصناعة',
      goods_value: 125000,
      currency: 'EGP',
      current_status: 'بانتظار المستندات',
      target_completion_date: '2024-02-15',
      actual_completion_date: undefined,
      priority: 'high',
      notes: 'ملف مهم - يتطلب متابعة سريعة',
      created_at: '2024-01-15T10:00:00',
      updated_at: '2024-01-16T14:30:00',
      status_history: [
        {
          id: 1,
          case_id: caseId,
          status: 'تم استلام الطلب',
          status_date: '2024-01-15T10:00:00',
          notes: 'تم إنشاء الملف وتسجيل البيانات الأولية',
          created_by: 2,
          created_at: '2024-01-15T10:00:00'
        },
        {
          id: 2,
          case_id: caseId,
          status: 'بانتظار المستندات',
          status_date: '2024-01-15T10:30:00',
          notes: 'في انتظار استلام المستندات المطلوبة من العميل',
          created_by: 2,
          created_at: '2024-01-15T10:30:00'
        }
      ],
      documents: [
        {
          id: 1,
          case_id: caseId,
          document_name: 'الفاتورة التجارية',
          document_type: 'invoice',
          file_path: '/uploads/invoice_001.pdf',
          file_size: 245760,
          mime_type: 'application/pdf',
          uploaded_by: 1,
          upload_date: '2024-01-15T11:00:00',
          is_required: true,
          status: 'approved',
          notes: 'تم المراجعة والموافقة'
        },
        {
          id: 2,
          case_id: caseId,
          document_name: 'قائمة التعبئة',
          document_type: 'packing_list',
          file_path: undefined,
          file_size: undefined,
          mime_type: undefined,
          uploaded_by: undefined,
          upload_date: '2024-01-15T11:00:00',
          is_required: true,
          status: 'pending',
          notes: 'مطلوب من العميل'
        }
      ]
    };

    setSelectedCase(mockCaseDetails);
    setIsCaseDetailsOpen(true);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-navy-light mx-auto"></div>
          <p className="mt-4 text-gray-600">جاري تحميل الملفات...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* العنوان والإجراءات */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">إدارة الملفات</h1>
          <p className="text-gray-600">إدارة جميع ملفات التخليص الجمركي</p>
        </div>
        
        <Dialog open={isNewCaseOpen} onOpenChange={setIsNewCaseOpen}>
          <DialogTrigger asChild>
            <Button className="btn-navy">
              <Plus className="w-4 h-4 ml-2" />
              ملف جديد
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>إنشاء ملف جديد</DialogTitle>
              <DialogDescription>
                املأ البيانات التالية لإنشاء ملف تخليص جمركي جديد
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleNewCaseSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="client_id">العميل *</Label>
                  <Select value={newCaseForm.client_id} onValueChange={(value) => 
                    setNewCaseForm({...newCaseForm, client_id: value})
                  }>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر العميل" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">شركة النصر للتجارة</SelectItem>
                      <SelectItem value="2">أحمد محمد للاستيراد</SelectItem>
                      <SelectItem value="3">شركة المستقبل</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="operation_type">نوع العملية *</Label>
                  <Select value={newCaseForm.operation_type} onValueChange={(value: 'import' | 'export') => 
                    setNewCaseForm({...newCaseForm, operation_type: value})
                  }>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="import">استيراد</SelectItem>
                      <SelectItem value="export">تصدير</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="port">الميناء *</Label>
                  <Select value={newCaseForm.port} onValueChange={(value) => 
                    setNewCaseForm({...newCaseForm, port: value})
                  }>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر الميناء" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="الإسكندرية">الإسكندرية</SelectItem>
                      <SelectItem value="دمياط">دمياط</SelectItem>
                      <SelectItem value="العين السخنة">العين السخنة</SelectItem>
                      <SelectItem value="بورسعيد">بورسعيد</SelectItem>
                      <SelectItem value="السخنة">السخنة</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="priority">الأولوية</Label>
                  <Select value={newCaseForm.priority} onValueChange={(value: 'low' | 'normal' | 'high' | 'urgent') => 
                    setNewCaseForm({...newCaseForm, priority: value})
                  }>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">منخفض</SelectItem>
                      <SelectItem value="normal">عادي</SelectItem>
                      <SelectItem value="high">عالي</SelectItem>
                      <SelectItem value="urgent">عاجل</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bill_of_lading">رقم البوليصة</Label>
                  <Input
                    id="bill_of_lading"
                    value={newCaseForm.bill_of_lading}
                    onChange={(e) => setNewCaseForm({...newCaseForm, bill_of_lading: e.target.value})}
                    placeholder="رقم ��وليصة الشحن"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="shipment_number">رقم الشحنة</Label>
                  <Input
                    id="shipment_number"
                    value={newCaseForm.shipment_number}
                    onChange={(e) => setNewCaseForm({...newCaseForm, shipment_number: e.target.value})}
                    placeholder="رقم الشحنة"
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="shipping_company">شركة الشحن</Label>
                  <Input
                    id="shipping_company"
                    value={newCaseForm.shipping_company}
                    onChange={(e) => setNewCaseForm({...newCaseForm, shipping_company: e.target.value})}
                    placeholder="اسم شركة الشحن"
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="goods_description">وصف البضاعة *</Label>
                  <Textarea
                    id="goods_description"
                    value={newCaseForm.goods_description}
                    onChange={(e) => setNewCaseForm({...newCaseForm, goods_description: e.target.value})}
                    placeholder="وصف تفصيلي للبضاعة"
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="goods_value">قيمة البضاعة</Label>
                  <Input
                    id="goods_value"
                    type="number"
                    value={newCaseForm.goods_value}
                    onChange={(e) => setNewCaseForm({...newCaseForm, goods_value: e.target.value})}
                    placeholder="0.00"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="currency">العملة</Label>
                  <Select value={newCaseForm.currency} onValueChange={(value) => 
                    setNewCaseForm({...newCaseForm, currency: value})
                  }>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="EGP">جنيه مصري (EGP)</SelectItem>
                      <SelectItem value="USD">دولار أمريكي (USD)</SelectItem>
                      <SelectItem value="EUR">يورو (EUR)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="target_completion_date">التاريخ المستهدف للإنجاز</Label>
                  <Input
                    id="target_completion_date"
                    type="date"
                    value={newCaseForm.target_completion_date}
                    onChange={(e) => setNewCaseForm({...newCaseForm, target_completion_date: e.target.value})}
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="notes">ملاحظات</Label>
                  <Textarea
                    id="notes"
                    value={newCaseForm.notes}
                    onChange={(e) => setNewCaseForm({...newCaseForm, notes: e.target.value})}
                    placeholder="أي ملاحظات إضافية"
                    rows={3}
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-2 space-x-reverse">
                <Button type="button" variant="outline" onClick={() => setIsNewCaseOpen(false)}>
                  إلغاء
                </Button>
                <Button type="submit" className="btn-navy">
                  إنشاء الملف
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* أدوات البحث والتصفية */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="البحث في الملفات (رقم الملف، العميل، البضاعة...)"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pr-10"
                />
              </div>
            </div>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="تصفية حسب الحالة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع الحالات</SelectItem>
                <SelectItem value="بانتظار المستندات">بانتظار المستندات</SelectItem>
                <SelectItem value="تم التقديم للجمارك">تم التقديم للجمارك</SelectItem>
                <SelectItem value="بانتظار الفحص والمعاينة">بانتظار الفحص</SelectItem>
                <SelectItem value="تم دفع الرسوم">تم دفع الرسوم</SelectItem>
                <SelectItem value="تم الإفراج الجمركي">تم الإفراج</SelectItem>
              </SelectContent>
            </Select>

            <Select value={operationFilter} onValueChange={setOperationFilter}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="النوع" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">الكل</SelectItem>
                <SelectItem value="import">استيراد</SelectItem>
                <SelectItem value="export">تصدير</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* جدول الملفات */}
      <Card>
        <CardHeader>
          <CardTitle>الملفات ({filteredCases.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredCases.map((caseItem) => (
              <div key={caseItem.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 space-x-reverse">
                    <div className="p-3 bg-navy-light/10 rounded-lg">
                      <Ship className="h-6 w-6 text-navy-light" />
                    </div>
                    
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <h3 className="font-semibold text-gray-900">{caseItem.case_number}</h3>
                        <Badge className={getPriorityColor(caseItem.priority)}>
                          {getPriorityLabel(caseItem.priority)}
                        </Badge>
                        <Badge variant="outline">
                          {caseItem.operation_type === 'import' ? 'استيراد' : 'تصدير'}
                        </Badge>
                      </div>
                      
                      <p className="text-sm text-gray-600">
                        العميل: {caseItem.client_name} • الميناء: {caseItem.port}
                      </p>
                      
                      <p className="text-sm text-gray-500">
                        {caseItem.goods_description}
                      </p>
                      
                      <div className="flex items-center space-x-4 space-x-reverse text-xs text-gray-500">
                        <span>القيمة: {formatCurrency(caseItem.goods_value, caseItem.currency)}</span>
                        <span>•</span>
                        <span>المسؤول: {caseItem.assigned_employee_name}</span>
                        <span>•</span>
                        <span>آخر تحديث: {new Date(caseItem.updated_at).toLocaleDateString('ar-EG')}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 space-x-reverse">
                    <Badge className={getStatusColor(caseItem.current_status)}>
                      {caseItem.current_status}
                    </Badge>
                    
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleViewCase(caseItem.id)}
                      >
                        <Eye className="h-4 w-4 ml-1" />
                        عرض
                      </Button>
                      
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4 ml-1" />
                        تحرير
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {filteredCases.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                لا توجد ملفات مطابقة لمعايير البحث
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* نافذة تفاصيل الملف */}
      <Dialog open={isCaseDetailsOpen} onOpenChange={setIsCaseDetailsOpen}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          {selectedCase && (
            <>
              <DialogHeader>
                <DialogTitle>تفاصيل الملف {selectedCase.case_number}</DialogTitle>
                <DialogDescription>
                  إدارة وتتبع حالة الملف والمستندات
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6">
                {/* معلومات عامة */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <Ship className="h-5 w-5 text-navy-light" />
                        <div>
                          <p className="text-sm text-gray-600">نوع العملية</p>
                          <p className="font-medium">
                            {selectedCase.operation_type === 'import' ? 'استيراد' : 'تصدير'}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <DollarSign className="h-5 w-5 text-green-600" />
                        <div>
                          <p className="text-sm text-gray-600">قيمة البضاعة</p>
                          <p className="font-medium">
                            {formatCurrency(selectedCase.goods_value || 0, selectedCase.currency)}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <Clock className="h-5 w-5 text-orange-600" />
                        <div>
                          <p className="text-sm text-gray-600">الحالة الحالية</p>
                          <Badge className={getStatusColor(selectedCase.current_status)}>
                            {selectedCase.current_status}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* الجدول الزمني */}
                <Card>
                  <CardHeader>
                    <CardTitle>الجدول الزمني للحالة</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {selectedCase.status_history?.map((status, index) => (
                        <div key={status.id} className="flex items-start space-x-3 space-x-reverse">
                          <div className="p-2 bg-navy-light/10 rounded-full">
                            <CheckCircle className="h-4 w-4 text-navy-light" />
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 space-x-reverse">
                              <h4 className="font-medium text-gray-900">{status.status}</h4>
                              <span className="text-sm text-gray-500">
                                {new Date(status.status_date).toLocaleString('ar-EG')}
                              </span>
                            </div>
                            {status.notes && (
                              <p className="text-sm text-gray-600 mt-1">{status.notes}</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* المستندات */}
                <Card>
                  <CardHeader>
                    <CardTitle>المستندات</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {selectedCase.documents?.map((doc) => (
                        <div key={doc.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center space-x-3 space-x-reverse">
                            <FileText className="h-5 w-5 text-gray-400" />
                            <div>
                              <p className="font-medium text-gray-900">{doc.document_name}</p>
                              <p className="text-sm text-gray-600">{doc.notes}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-2 space-x-reverse">
                            <Badge 
                              className={
                                doc.status === 'approved' ? 'bg-green-100 text-green-800' :
                                doc.status === 'rejected' ? 'bg-red-100 text-red-800' :
                                'bg-yellow-100 text-yellow-800'
                              }
                            >
                              {doc.status === 'approved' ? 'مُعتمد' : 
                               doc.status === 'rejected' ? 'مرفوض' : 'في الانتظار'}
                            </Badge>
                            
                            {doc.file_path ? (
                              <Button variant="outline" size="sm">
                                تحميل
                              </Button>
                            ) : (
                              <Button variant="outline" size="sm">
                                <Upload className="h-4 w-4 ml-1" />
                                رفع
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
