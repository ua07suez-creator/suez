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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Alert, AlertDescription } from '../components/ui/alert';
import { 
  Plus,
  Search,
  Filter,
  Eye,
  Download,
  DollarSign,
  Calendar,
  CheckCircle,
  Clock,
  AlertTriangle,
  XCircle,
  Send,
  Edit,
  Trash2
} from 'lucide-react';
import { Invoice, InvoiceItem } from '@shared/customs-types';

interface InvoiceWithDetails extends Invoice {
  client_name: string;
  case_number: string;
  items: InvoiceItem[];
}

interface NewInvoiceForm {
  case_id: string;
  client_id: string;
  tax_amount: string;
  discount_amount: string;
  issue_date: string;
  due_date: string;
  payment_method: string;
  notes: string;
  items: Array<{
    description: string;
    quantity: string;
    unit_price: string;
  }>;
}

export default function Invoices() {
  const { user } = useAuth();
  const [invoices, setInvoices] = useState<InvoiceWithDetails[]>([]);
  const [filteredInvoices, setFilteredInvoices] = useState<InvoiceWithDetails[]>([]);
  const [selectedInvoice, setSelectedInvoice] = useState<InvoiceWithDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isNewInvoiceOpen, setIsNewInvoiceOpen] = useState(false);
  const [isInvoiceDetailsOpen, setIsInvoiceDetailsOpen] = useState(false);

  const [newInvoiceForm, setNewInvoiceForm] = useState<NewInvoiceForm>({
    case_id: '',
    client_id: '',
    tax_amount: '14', // الضريبة المصرية 14%
    discount_amount: '0',
    issue_date: new Date().toISOString().split('T')[0],
    due_date: '',
    payment_method: '',
    notes: '',
    items: [
      { description: '', quantity: '1', unit_price: '0' }
    ]
  });

  useEffect(() => {
    // محاكاة البيانات
    setTimeout(() => {
      const mockInvoices: InvoiceWithDetails[] = [
        {
          id: 1,
          invoice_number: 'INV-2024-001',
          case_id: 1,
          client_id: 1,
          client_name: 'شركة النصر للتجارة',
          case_number: 'CU-2024-001',
          total_amount: 5750,
          currency: 'EGP',
          tax_amount: 700,
          discount_amount: 0,
          payment_status: 'pending',
          issue_date: '2024-01-15',
          due_date: '2024-02-15',
          payment_date: undefined,
          payment_method: undefined,
          notes: 'رسوم التخليص الجمركي للشحنة المستوردة',
          created_by: 2,
          created_at: '2024-01-15T10:00:00',
          updated_at: '2024-01-16T14:30:00',
          items: [
            {
              id: 1,
              invoice_id: 1,
              description: 'رسوم التخليص الجمركي',
              quantity: 1,
              unit_price: 4000,
              total_price: 4000,
              created_at: '2024-01-15T10:00:00'
            },
            {
              id: 2,
              invoice_id: 1,
              description: 'رسوم النقل والمناولة',
              quantity: 1,
              unit_price: 1050,
              total_price: 1050,
              created_at: '2024-01-15T10:00:00'
            }
          ]
        },
        {
          id: 2,
          invoice_number: 'INV-2024-002',
          case_id: 2,
          client_id: 2,
          client_name: 'أحمد محمد للاستيراد',
          case_number: 'CU-2024-002',
          total_amount: 3420,
          currency: 'EGP',
          tax_amount: 420,
          discount_amount: 200,
          payment_status: 'paid',
          issue_date: '2024-01-10',
          due_date: '2024-02-10',
          payment_date: '2024-01-25',
          payment_method: 'bank_transfer',
          notes: 'تم السداد بالتحويل البنكي',
          created_by: 2,
          created_at: '2024-01-10T09:00:00',
          updated_at: '2024-01-25T11:15:00',
          items: [
            {
              id: 3,
              invoice_id: 2,
              description: 'رسوم التخليص الجمركي',
              quantity: 1,
              unit_price: 3200,
              total_price: 3200,
              created_at: '2024-01-10T09:00:00'
            }
          ]
        },
        {
          id: 3,
          invoice_number: 'INV-2024-003',
          case_id: 3,
          client_id: 3,
          client_name: 'شركة المستقبل',
          case_number: 'CU-2024-003',
          total_amount: 8550,
          currency: 'EGP',
          tax_amount: 1050,
          discount_amount: 500,
          payment_status: 'overdue',
          issue_date: '2024-01-05',
          due_date: '2024-01-20',
          payment_date: undefined,
          payment_method: undefined,
          notes: 'فاتورة متأخرة - يتطلب متابعة',
          created_by: 2,
          created_at: '2024-01-05T08:00:00',
          updated_at: '2024-01-12T16:45:00',
          items: [
            {
              id: 4,
              invoice_id: 3,
              description: 'رسوم التخليص الجمركي',
              quantity: 1,
              unit_price: 6000,
              total_price: 6000,
              created_at: '2024-01-05T08:00:00'
            },
            {
              id: 5,
              invoice_id: 3,
              description: 'رسوم التخزين',
              quantity: 5,
              unit_price: 400,
              total_price: 2000,
              created_at: '2024-01-05T08:00:00'
            }
          ]
        }
      ];

      setInvoices(mockInvoices);
      setFilteredInvoices(mockInvoices);
      setIsLoading(false);
    }, 1000);
  }, []);

  // تصفية الفواتير
  useEffect(() => {
    let filtered = invoices;

    if (searchTerm) {
      filtered = filtered.filter(invoice => 
        invoice.invoice_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
        invoice.client_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        invoice.case_number.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(invoice => invoice.payment_status === statusFilter);
    }

    setFilteredInvoices(filtered);
  }, [invoices, searchTerm, statusFilter]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'partial':
        return 'bg-blue-100 text-blue-800';
      case 'overdue':
        return 'bg-red-100 text-red-800';
      case 'cancelled':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'paid': return 'مدفوعة';
      case 'pending': return 'معلقة';
      case 'partial': return 'مدفوعة جزئياً';
      case 'overdue': return 'متأخرة';
      case 'cancelled': return 'ملغية';
      default: return status;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'overdue':
        return <AlertTriangle className="h-4 w-4 text-red-600" />;
      case 'cancelled':
        return <XCircle className="h-4 w-4 text-gray-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ar-EG', {
      style: 'currency',
      currency: 'EGP'
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ar-EG');
  };

  const calculateSubtotal = () => {
    return newInvoiceForm.items.reduce((sum, item) => {
      return sum + (parseFloat(item.quantity) || 0) * (parseFloat(item.unit_price) || 0);
    }, 0);
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const taxAmount = subtotal * (parseFloat(newInvoiceForm.tax_amount) || 0) / 100;
    const discountAmount = parseFloat(newInvoiceForm.discount_amount) || 0;
    return subtotal + taxAmount - discountAmount;
  };

  const addInvoiceItem = () => {
    setNewInvoiceForm({
      ...newInvoiceForm,
      items: [...newInvoiceForm.items, { description: '', quantity: '1', unit_price: '0' }]
    });
  };

  const removeInvoiceItem = (index: number) => {
    setNewInvoiceForm({
      ...newInvoiceForm,
      items: newInvoiceForm.items.filter((_, i) => i !== index)
    });
  };

  const updateInvoiceItem = (index: number, field: string, value: string) => {
    const updatedItems = [...newInvoiceForm.items];
    updatedItems[index] = { ...updatedItems[index], [field]: value };
    setNewInvoiceForm({ ...newInvoiceForm, items: updatedItems });
  };

  const handleCreateInvoice = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: إرسال البيانات إلى API
    console.log('New invoice data:', newInvoiceForm);
    setIsNewInvoiceOpen(false);
    
    // إعادة تعيين النموذج
    setNewInvoiceForm({
      case_id: '',
      client_id: '',
      tax_amount: '14',
      discount_amount: '0',
      issue_date: new Date().toISOString().split('T')[0],
      due_date: '',
      payment_method: '',
      notes: '',
      items: [{ description: '', quantity: '1', unit_price: '0' }]
    });
  };

  const handleViewInvoice = (invoice: InvoiceWithDetails) => {
    setSelectedInvoice(invoice);
    setIsInvoiceDetailsOpen(true);
  };

  const handleSendPaymentReminder = (invoiceId: number) => {
    // TODO: إرسال تذكير دفع
    console.log('Sending payment reminder for invoice:', invoiceId);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-navy-light mx-auto"></div>
          <p className="mt-4 text-gray-600">جاري تحميل الفواتير...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* العنوان والإجراءات */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">إدارة الفواتير</h1>
          <p className="text-gray-600">إدارة فواتير التخليص الجمركي والمدفوعات</p>
        </div>
        
        <Dialog open={isNewInvoiceOpen} onOpenChange={setIsNewInvoiceOpen}>
          <DialogTrigger asChild>
            <Button className="btn-navy">
              <Plus className="w-4 h-4 ml-2" />
              فاتورة جديدة
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>إنشاء فاتورة جديدة</DialogTitle>
              <DialogDescription>
                إنشاء فاتورة جديدة لخدمات التخليص الجمركي
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleCreateInvoice} className="space-y-6">
              {/* معلومات أساسية */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="case_id">الملف *</Label>
                  <Select value={newInvoiceForm.case_id} onValueChange={(value) => 
                    setNewInvoiceForm({...newInvoiceForm, case_id: value})
                  }>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر الملف" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">CU-2024-001 - شركة النصر</SelectItem>
                      <SelectItem value="2">CU-2024-002 - أحمد محمد</SelectItem>
                      <SelectItem value="3">CU-2024-003 - شركة المستقبل</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="client_id">العميل *</Label>
                  <Select value={newInvoiceForm.client_id} onValueChange={(value) => 
                    setNewInvoiceForm({...newInvoiceForm, client_id: value})
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
                  <Label htmlFor="issue_date">تاريخ الإصدار *</Label>
                  <Input
                    id="issue_date"
                    type="date"
                    value={newInvoiceForm.issue_date}
                    onChange={(e) => setNewInvoiceForm({...newInvoiceForm, issue_date: e.target.value})}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="due_date">تاريخ الاستحقاق *</Label>
                  <Input
                    id="due_date"
                    type="date"
                    value={newInvoiceForm.due_date}
                    onChange={(e) => setNewInvoiceForm({...newInvoiceForm, due_date: e.target.value})}
                    required
                  />
                </div>
              </div>

              {/* بنود الفاتورة */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-900">بنود الفاتورة</h3>
                  <Button type="button" variant="outline" onClick={addInvoiceItem}>
                    <Plus className="w-4 h-4 ml-2" />
                    إضافة بند
                  </Button>
                </div>

                <div className="space-y-3">
                  {newInvoiceForm.items.map((item, index) => (
                    <div key={index} className="grid grid-cols-12 gap-2 items-end">
                      <div className="col-span-5">
                        <Label htmlFor={`description_${index}`}>الوصف</Label>
                        <Input
                          id={`description_${index}`}
                          value={item.description}
                          onChange={(e) => updateInvoiceItem(index, 'description', e.target.value)}
                          placeholder="وصف الخدمة"
                        />
                      </div>
                      
                      <div className="col-span-2">
                        <Label htmlFor={`quantity_${index}`}>الكمية</Label>
                        <Input
                          id={`quantity_${index}`}
                          type="number"
                          value={item.quantity}
                          onChange={(e) => updateInvoiceItem(index, 'quantity', e.target.value)}
                          min="0"
                          step="0.01"
                        />
                      </div>
                      
                      <div className="col-span-2">
                        <Label htmlFor={`unit_price_${index}`}>السعر</Label>
                        <Input
                          id={`unit_price_${index}`}
                          type="number"
                          value={item.unit_price}
                          onChange={(e) => updateInvoiceItem(index, 'unit_price', e.target.value)}
                          min="0"
                          step="0.01"
                        />
                      </div>
                      
                      <div className="col-span-2">
                        <Label>الإجمالي</Label>
                        <Input
                          value={formatCurrency((parseFloat(item.quantity) || 0) * (parseFloat(item.unit_price) || 0))}
                          disabled
                        />
                      </div>
                      
                      <div className="col-span-1">
                        {newInvoiceForm.items.length > 1 && (
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => removeInvoiceItem(index)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* المجاميع */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="tax_amount">الضريبة (%)</Label>
                  <Input
                    id="tax_amount"
                    type="number"
                    value={newInvoiceForm.tax_amount}
                    onChange={(e) => setNewInvoiceForm({...newInvoiceForm, tax_amount: e.target.value})}
                    min="0"
                    max="100"
                    step="0.01"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="discount_amount">الخصم (جنيه)</Label>
                  <Input
                    id="discount_amount"
                    type="number"
                    value={newInvoiceForm.discount_amount}
                    onChange={(e) => setNewInvoiceForm({...newInvoiceForm, discount_amount: e.target.value})}
                    min="0"
                    step="0.01"
                  />
                </div>

                <div className="space-y-2">
                  <Label>الإجمالي النهائي</Label>
                  <Input
                    value={formatCurrency(calculateTotal())}
                    disabled
                    className="font-bold"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">ملاحظات</Label>
                <Textarea
                  id="notes"
                  value={newInvoiceForm.notes}
                  onChange={(e) => setNewInvoiceForm({...newInvoiceForm, notes: e.target.value})}
                  placeholder="أي ملاحظات إضافية"
                  rows={3}
                />
              </div>

              <div className="flex justify-end space-x-2 space-x-reverse">
                <Button type="button" variant="outline" onClick={() => setIsNewInvoiceOpen(false)}>
                  إلغاء
                </Button>
                <Button type="submit" className="btn-navy">
                  إنشاء الفاتورة
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* إحصائيات سريعة */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <DollarSign className="h-6 w-6 text-blue-600" />
              </div>
              <div className="mr-4">
                <p className="text-sm font-medium text-gray-600">إجمالي الفواتير</p>
                <p className="text-2xl font-bold text-gray-900">{invoices.length}</p>
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
                <p className="text-sm font-medium text-gray-600">مدفوعة</p>
                <p className="text-2xl font-bold text-gray-900">
                  {invoices.filter(inv => inv.payment_status === 'paid').length}
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
                <p className="text-sm font-medium text-gray-600">معلقة</p>
                <p className="text-2xl font-bold text-gray-900">
                  {invoices.filter(inv => inv.payment_status === 'pending').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-red-100 rounded-lg">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              <div className="mr-4">
                <p className="text-sm font-medium text-gray-600">متأخرة</p>
                <p className="text-2xl font-bold text-gray-900">
                  {invoices.filter(inv => inv.payment_status === 'overdue').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* أدوات البحث والتصفية */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="البحث في الفواتير (رقم الفاتورة، العميل، الملف...)"
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
                <SelectItem value="pending">معلقة</SelectItem>
                <SelectItem value="paid">مدفوعة</SelectItem>
                <SelectItem value="partial">مدفوعة جزئياً</SelectItem>
                <SelectItem value="overdue">متأخرة</SelectItem>
                <SelectItem value="cancelled">ملغية</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* جدول الفواتير */}
      <Card>
        <CardHeader>
          <CardTitle>الفواتير ({filteredInvoices.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>رقم الفاتورة</TableHead>
                <TableHead>العميل</TableHead>
                <TableHead>الملف</TableHead>
                <TableHead>المبلغ</TableHead>
                <TableHead>تاريخ الإصدار</TableHead>
                <TableHead>تاريخ الاستحقاق</TableHead>
                <TableHead>الحالة</TableHead>
                <TableHead>الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInvoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell className="font-medium">
                    {invoice.invoice_number}
                  </TableCell>
                  <TableCell>{invoice.client_name}</TableCell>
                  <TableCell>{invoice.case_number}</TableCell>
                  <TableCell className="font-medium">
                    {formatCurrency(invoice.total_amount)}
                  </TableCell>
                  <TableCell>{formatDate(invoice.issue_date)}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span>{formatDate(invoice.due_date)}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2 space-x-reverse">
                      {getStatusIcon(invoice.payment_status)}
                      <Badge className={getStatusColor(invoice.payment_status)}>
                        {getStatusLabel(invoice.payment_status)}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleViewInvoice(invoice)}
                      >
                        <Eye className="h-4 w-4 ml-1" />
                        عرض
                      </Button>
                      
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 ml-1" />
                        تحميل
                      </Button>
                      
                      {invoice.payment_status === 'pending' || invoice.payment_status === 'overdue' ? (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleSendPaymentReminder(invoice.id)}
                        >
                          <Send className="h-4 w-4 ml-1" />
                          تذكير
                        </Button>
                      ) : null}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          {filteredInvoices.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              لا توجد فواتير مطابقة لمعايير البحث
            </div>
          )}
        </CardContent>
      </Card>

      {/* نافذة تفاصيل الفاتورة */}
      <Dialog open={isInvoiceDetailsOpen} onOpenChange={setIsInvoiceDetailsOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedInvoice && (
            <>
              <DialogHeader>
                <DialogTitle>فاتورة {selectedInvoice.invoice_number}</DialogTitle>
                <DialogDescription>
                  تفاصيل الفاتورة ومعلومات الدفع
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6">
                {/* معلومات الفاتورة */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h4 className="font-medium text-gray-900">معلومات الفاتورة</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">رقم الفاتورة:</span>
                        <span className="font-medium">{selectedInvoice.invoice_number}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">تاريخ الإصدار:</span>
                        <span>{formatDate(selectedInvoice.issue_date)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">تاريخ الاستحقاق:</span>
                        <span>{formatDate(selectedInvoice.due_date)}</span>
                      </div>
                      {selectedInvoice.payment_date && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">تاريخ الدفع:</span>
                          <span>{formatDate(selectedInvoice.payment_date)}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-medium text-gray-900">معلومات العميل</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">العميل:</span>
                        <span className="font-medium">{selectedInvoice.client_name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">رقم الملف:</span>
                        <span>{selectedInvoice.case_number}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">الحالة:</span>
                        <Badge className={getStatusColor(selectedInvoice.payment_status)}>
                          {getStatusLabel(selectedInvoice.payment_status)}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>

                {/* بنود الفاتورة */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-4">بنود الفاتورة</h4>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>الوصف</TableHead>
                        <TableHead>الكمية</TableHead>
                        <TableHead>السعر</TableHead>
                        <TableHead>الإجمالي</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {selectedInvoice.items.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell>{item.description}</TableCell>
                          <TableCell>{item.quantity}</TableCell>
                          <TableCell>{formatCurrency(item.unit_price)}</TableCell>
                          <TableCell>{formatCurrency(item.total_price)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                {/* ملخص المبالغ */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>المجموع الفرعي:</span>
                      <span>{formatCurrency(selectedInvoice.total_amount - selectedInvoice.tax_amount + selectedInvoice.discount_amount)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>الضريبة:</span>
                      <span>{formatCurrency(selectedInvoice.tax_amount)}</span>
                    </div>
                    {selectedInvoice.discount_amount > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>الخصم:</span>
                        <span>-{formatCurrency(selectedInvoice.discount_amount)}</span>
                      </div>
                    )}
                    <div className="flex justify-between font-bold text-lg border-t pt-2">
                      <span>الإجمالي:</span>
                      <span>{formatCurrency(selectedInvoice.total_amount)}</span>
                    </div>
                  </div>
                </div>

                {selectedInvoice.notes && (
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">ملاحظات</h4>
                    <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded">
                      {selectedInvoice.notes}
                    </p>
                  </div>
                )}

                <div className="flex justify-end space-x-2 space-x-reverse">
                  <Button variant="outline">
                    <Download className="h-4 w-4 ml-2" />
                    تحميل PDF
                  </Button>
                  
                  <Button variant="outline">
                    <Edit className="h-4 w-4 ml-2" />
                    تحرير
                  </Button>
                  
                  {(selectedInvoice.payment_status === 'pending' || selectedInvoice.payment_status === 'overdue') && (
                    <Button className="btn-navy">
                      <Send className="h-4 w-4 ml-2" />
                      إرسال تذكير دفع
                    </Button>
                  )}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
