import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Alert, AlertDescription } from "../components/ui/alert";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Textarea } from "../components/ui/textarea";
import { Loader2, Eye, EyeOff, CheckCircle } from "lucide-react";

export default function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    full_name: "",
    phone: "",
    company_name: "",
    company_type: "company" as "individual" | "company",
    tax_number: "",
    commercial_register: "",
    address: "",
    city: "القاهرة",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // التحقق من كلمة المرور
    if (formData.password !== formData.confirmPassword) {
      setError("كلمة المرور غير متطابقة");
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError("كلمة المرور يجب أن تكون 6 أحرف على الأقل");
      setIsLoading(false);
      return;
    }

    try {
      const { confirmPassword, ...dataToSend } = formData;
      const result = await register(dataToSend);

      if (result.success) {
        setSuccess(true);
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        setError(result.message || "حدث خطأ في إنشاء الحساب");
      }
    } catch (err) {
      setError("حدث خطأ في الاتصال");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectChange = (value: string) => {
    setFormData({
      ...formData,
      company_type: value as "individual" | "company",
    });
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <Card className="max-w-md w-full">
          <CardContent className="pt-6 text-center">
            <CheckCircle className="mx-auto h-12 w-12 text-green-500 mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              تم إنشاء الحساب بنجاح!
            </h2>
            <p className="text-gray-600 mb-4">
              سيتم توجيهك إلى صفحة تسجيل الدخول خلال ثانية...
            </p>
            <Button onClick={() => navigate("/login")} className="btn-navy">
              الذهاب إلى تسجيل الدخول
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            إنشاء حساب جديد
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            أو{" "}
            <Link
              to="/login"
              className="font-medium text-navy-light hover:text-navy-hover"
            >
              تسجيل الدخول إلى حساب موجود
            </Link>
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>معلومات الحساب</CardTitle>
            <CardDescription>
              املأ البيانات التالية لإنشاء ��سابك
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {/* معلومات شخصية */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="full_name">الاسم الكامل *</Label>
                  <Input
                    id="full_name"
                    name="full_name"
                    required
                    value={formData.full_name}
                    onChange={handleChange}
                    placeholder="أدخل اسمك الكامل"
                    className="text-right"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">رقم الهاتف</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="01xxxxxxxxx"
                    className="text-right"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">البريد الإلكتروني *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="example@email.com"
                    className="text-right"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company_type">نوع النشاط *</Label>
                  <Select
                    value={formData.company_type}
                    onValueChange={handleSelectChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="اختر نوع النشاط" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="individual">فردي</SelectItem>
                      <SelectItem value="company">شركة</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* كلمة المرور */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="password">كلمة المرور *</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      required
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="على الأقل 6 أحرف"
                      className="text-right pr-10"
                    />
                    <button
                      type="button"
                      className="absolute left-3 top-1/2 transform -translate-y-1/2"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-400" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-400" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">تأكيد كلمة المرور *</Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      required
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="أعد كتابة كلمة المرور"
                      className="text-right pr-10"
                    />
                    <button
                      type="button"
                      className="absolute left-3 top-1/2 transform -translate-y-1/2"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-400" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-400" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* معلومات الشركة */}
              <div className="space-y-4 border-t pt-4">
                <h3 className="text-lg font-medium text-gray-900">
                  معلومات الشركة
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="company_name">اسم الشركة</Label>
                    <Input
                      id="company_name"
                      name="company_name"
                      value={formData.company_name}
                      onChange={handleChange}
                      placeholder="اسم الشركة أو النشاط التجاري"
                      className="text-right"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="city">المدينة</Label>
                    <Input
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="المدينة"
                      className="text-right"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="tax_number">الرقم الضريبي</Label>
                    <Input
                      id="tax_number"
                      name="tax_number"
                      value={formData.tax_number}
                      onChange={handleChange}
                      placeholder="الرقم الضريبي"
                      className="text-right"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="commercial_register">السجل التجاري</Label>
                    <Input
                      id="commercial_register"
                      name="commercial_register"
                      value={formData.commercial_register}
                      onChange={handleChange}
                      placeholder="رقم السجل التجاري"
                      className="text-right"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">العنوان</Label>
                  <Textarea
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="العنوان التفصيلي"
                    className="text-right"
                    rows={3}
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full btn-navy"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                    جاري إنشاء الحساب...
                  </>
                ) : (
                  "إنشاء الحساب"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            بالتسجيل، أنت توافق على{" "}
            <Link
              to="/terms"
              className="font-medium text-navy-light hover:text-navy-hover"
            >
              الشروط والأحكام
            </Link>{" "}
            و{" "}
            <Link
              to="/privacy"
              className="font-medium text-navy-light hover:text-navy-hover"
            >
              سياسة الخصوصية
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
