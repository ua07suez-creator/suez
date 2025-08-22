import React, { useState } from "react";
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
import { Badge } from "./ui/badge";
import { Switch } from "./ui/switch";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import {
  Users,
  Plus,
  Search,
  Filter,
  Edit,
  Trash,
  Shield,
  User,
  Crown,
  Settings,
  Mail,
  Phone,
  Calendar,
  Activity,
} from "lucide-react";

interface User {
  id: number;
  full_name: string;
  email: string;
  phone?: string;
  user_type: "admin" | "employee" | "accountant" | "support" | "client";
  is_active: boolean;
  last_login?: string;
  created_at: string;
  company_name?: string;
}

interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  color: string;
}

export default function UserManagement() {
  const [users, setUsers] = useState<User[]>([
    {
      id: 1,
      full_name: "مدير النظام",
      email: "admin@customs.com",
      phone: "01234567890",
      user_type: "admin",
      is_active: true,
      last_login: "2024-01-16T10:30:00",
      created_at: "2024-01-01",
    },
    {
      id: 2,
      full_name: "موظ�� العمليات",
      email: "employee@customs.com",
      phone: "01234567891",
      user_type: "employee",
      is_active: true,
      last_login: "2024-01-16T09:15:00",
      created_at: "2024-01-05",
    },
    {
      id: 3,
      full_name: "المحاسب الرئيسي",
      email: "accountant@customs.com",
      user_type: "accountant",
      is_active: true,
      last_login: "2024-01-15T16:20:00",
      created_at: "2024-01-03",
    },
    {
      id: 4,
      full_name: "أحمد محمد",
      email: "ahmed@client.com",
      phone: "01234567892",
      user_type: "client",
      is_active: true,
      company_name: "شركة التجارة الدولية",
      last_login: "2024-01-16T08:45:00",
      created_at: "2024-01-10",
    },
  ]);

  const [roles] = useState<Role[]>([
    {
      id: "admin",
      name: "مدير عام",
      description: "صلاحيات كاملة لإدارة النظام",
      permissions: ["all"],
      color: "bg-red-100 text-red-800",
    },
    {
      id: "employee",
      name: "موظف العمليات",
      description: "إدارة الملفات والعمليات",
      permissions: ["cases.read", "cases.write", "clients.read"],
      color: "bg-blue-100 text-blue-800",
    },
    {
      id: "accountant",
      name: "محاسب",
      description: "إدارة الفواتير والمدفوعات",
      permissions: ["invoices.read", "invoices.write", "reports.read"],
      color: "bg-green-100 text-green-800",
    },
    {
      id: "support",
      name: "دعم فني",
      description: "دعم العملاء والمساعدة",
      permissions: ["messages.read", "messages.write", "clients.read"],
      color: "bg-purple-100 text-purple-800",
    },
    {
      id: "client",
      name: "عميل",
      description: "صلاحيات محدودة للعملاء",
      permissions: ["dashboard.read", "cases.read", "invoices.read"],
      color: "bg-gray-100 text-gray-800",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const getUserTypeIcon = (userType: string) => {
    switch (userType) {
      case "admin":
        return <Crown className="w-4 h-4 text-red-600" />;
      case "employee":
        return <User className="w-4 h-4 text-blue-600" />;
      case "accountant":
        return <Settings className="w-4 h-4 text-green-600" />;
      case "support":
        return <Shield className="w-4 h-4 text-purple-600" />;
      default:
        return <User className="w-4 h-4 text-gray-600" />;
    }
  };

  const getRoleInfo = (userType: string) => {
    return roles.find((role) => role.id === userType);
  };

  const toggleUserStatus = (userId: number) => {
    setUsers((users) =>
      users.map((user) =>
        user.id === userId ? { ...user, is_active: !user.is_active } : user,
      ),
    );
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.company_name?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter = filterType === "all" || user.user_type === filterType;

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">إدارة المستخدمين</h2>
          <p className="text-gray-600">إدارة المستخدمين والأدوار والصلاحيات</p>
        </div>

        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="btn-navy">
              <Plus className="w-4 h-4 ml-2" />
              مستخدم جديد
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>إضافة مستخدم جديد</DialogTitle>
              <DialogDescription>
                قم بإنشاء مستخدم جديد وتحديد صلاحياته
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="full_name">الاسم الكامل</Label>
                <Input id="full_name" className="text-right" />
              </div>
              <div>
                <Label htmlFor="email">البريد الإلكتروني</Label>
                <Input id="email" type="email" className="text-right" />
              </div>
              <div>
                <Label htmlFor="phone">رقم الهاتف</Label>
                <Input id="phone" className="text-right" />
              </div>
              <div>
                <Label htmlFor="user_type">نوع المستخدم</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر نوع المستخدم" />
                  </SelectTrigger>
                  <SelectContent>
                    {roles.map((role) => (
                      <SelectItem key={role.id} value={role.id}>
                        {role.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button className="w-full btn-navy">إنشاء المستخدم</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Roles Overview */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {roles.map((role) => (
          <Card key={role.id}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <Badge className={role.color}>{role.name}</Badge>
                <span className="text-sm font-medium">
                  {users.filter((u) => u.user_type === role.id).length}
                </span>
              </div>
              <p className="text-xs text-gray-600">{role.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="البحث عن المستخدمين..."
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
            {roles.map((role) => (
              <SelectItem key={role.id} value={role.id}>
                {role.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>قائمة المستخدمين ({filteredUsers.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-right">المستخدم</TableHead>
                  <TableHead className="text-right">النوع</TableHead>
                  <TableHead className="text-right">الاتصال</TableHead>
                  <TableHead className="text-right">الحالة</TableHead>
                  <TableHead className="text-right">آخر دخول</TableHead>
                  <TableHead className="text-right">الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => {
                  const roleInfo = getRoleInfo(user.user_type);
                  return (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3 space-x-reverse">
                          <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                            {getUserTypeIcon(user.user_type)}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">
                              {user.full_name}
                            </p>
                            <p className="text-sm text-gray-600">
                              {user.email}
                            </p>
                            {user.company_name && (
                              <p className="text-xs text-gray-500">
                                {user.company_name}
                              </p>
                            )}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={roleInfo?.color}>
                          {roleInfo?.name}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2 space-x-reverse text-sm">
                            <Mail className="w-3 h-3 text-gray-400" />
                            <span className="text-gray-600">{user.email}</span>
                          </div>
                          {user.phone && (
                            <div className="flex items-center space-x-2 space-x-reverse text-sm">
                              <Phone className="w-3 h-3 text-gray-400" />
                              <span className="text-gray-600">
                                {user.phone}
                              </span>
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <Switch
                            checked={user.is_active}
                            onCheckedChange={() => toggleUserStatus(user.id)}
                          />
                          <span className="text-sm">
                            {user.is_active ? "نشط" : "معطل"}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2 space-x-reverse text-sm">
                          <Activity className="w-3 h-3 text-gray-400" />
                          <span className="text-gray-600">
                            {user.last_login
                              ? new Date(user.last_login).toLocaleDateString(
                                  "ar-EG",
                                )
                              : "لم يسجل دخول"}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <Button size="sm" variant="outline">
                            <Edit className="w-3 h-3" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Settings className="w-3 h-3" />
                          </Button>
                          {user.user_type !== "admin" && (
                            <Button size="sm" variant="outline">
                              <Trash className="w-3 h-3" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>

          {filteredUsers.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <Users className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p className="text-lg font-medium mb-2">لا توجد مستخدمين</p>
              <p className="text-sm">
                قم بإضافة مستخدمين جدد أو غير معايير البحث
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
