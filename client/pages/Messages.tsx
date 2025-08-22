import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Badge } from '../components/ui/badge';
import { Avatar, AvatarFallback } from '../components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Label } from '../components/ui/label';
import { 
  Send,
  Search,
  Plus,
  Paperclip,
  Clock,
  CheckCircle,
  User,
  MessageSquare,
  AlertCircle,
  Filter
} from 'lucide-react';
import { Message } from '@shared/customs-types';

interface MessageThread {
  id: number;
  case_id: number;
  case_number: string;
  client_name: string;
  last_message: string;
  last_message_time: string;
  unread_count: number;
  message_type: 'general' | 'urgent' | 'document_request' | 'payment_reminder';
  participants: Array<{
    id: number;
    name: string;
    user_type: string;
  }>;
}

interface MessageDetail extends Message {
  sender_name: string;
  sender_type: string;
}

interface NewMessageForm {
  case_id: string;
  receiver_id: string;
  subject: string;
  message: string;
  message_type: 'general' | 'urgent' | 'document_request' | 'payment_reminder';
  attachment: File | null;
}

export default function Messages() {
  const { user } = useAuth();
  const [threads, setThreads] = useState<MessageThread[]>([]);
  const [selectedThread, setSelectedThread] = useState<MessageThread | null>(null);
  const [messages, setMessages] = useState<MessageDetail[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [isNewMessageOpen, setIsNewMessageOpen] = useState(false);
  const [newMessage, setNewMessage] = useState('');
  const [isNewThreadOpen, setIsNewThreadOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [newMessageForm, setNewMessageForm] = useState<NewMessageForm>({
    case_id: '',
    receiver_id: '',
    subject: '',
    message: '',
    message_type: 'general',
    attachment: null
  });

  useEffect(() => {
    // محاكاة البيانات
    setTimeout(() => {
      const mockThreads: MessageThread[] = [
        {
          id: 1,
          case_id: 1,
          case_number: 'CU-2024-001',
          client_name: 'شركة النصر للتجارة',
          last_message: 'تم رفع المستندات المطلوبة، يرجى المراجعة',
          last_message_time: '2024-01-16T14:30:00',
          unread_count: 2,
          message_type: 'document_request',
          participants: [
            { id: 1, name: 'أحمد محمد', user_type: 'client' },
            { id: 2, name: 'موظف العمليات', user_type: 'employee' }
          ]
        },
        {
          id: 2,
          case_id: 2,
          case_number: 'CU-2024-002',
          client_name: 'أحمد محمد للاستيراد',
          last_message: 'متى سيتم الانتهاء من عملية التخليص؟',
          last_message_time: '2024-01-16T11:15:00',
          unread_count: 0,
          message_type: 'general',
          participants: [
            { id: 3, name: 'فاطمة علي', user_type: 'client' },
            { id: 2, name: 'موظف العمليات', user_type: 'employee' }
          ]
        },
        {
          id: 3,
          case_id: 3,
          case_number: 'CU-2024-003',
          client_name: 'شركة المستقبل',
          last_message: 'تم الإفراج عن البضاعة، يمكنكم الاستلام',
          last_message_time: '2024-01-15T16:45:00',
          unread_count: 0,
          message_type: 'general',
          participants: [
            { id: 4, name: 'محمد أحمد', user_type: 'client' },
            { id: 2, name: 'موظف العمليات', user_type: 'employee' }
          ]
        }
      ];

      setThreads(mockThreads);
      setIsLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    if (selectedThread) {
      // محاكاة رس��ئل المحادثة
      const mockMessages: MessageDetail[] = [
        {
          id: 1,
          case_id: selectedThread.case_id,
          sender_id: 1,
          receiver_id: 2,
          message_type: 'general',
          subject: 'استفسار عن الملف',
          message: 'السلام عليكم، أريد الاستفسار عن حالة الملف الحالية',
          attachment_path: undefined,
          is_read: true,
          sent_at: '2024-01-15T10:00:00',
          read_at: '2024-01-15T10:05:00',
          sender_name: 'أحمد محمد',
          sender_type: 'client'
        },
        {
          id: 2,
          case_id: selectedThread.case_id,
          sender_id: 2,
          receiver_id: 1,
          message_type: 'general',
          subject: 'رد: استفسار عن الملف',
          message: 'وعليكم السلام، الملف حالياً في مرحلة مراجعة المستندات. سنقوم بإبلاغكم بأي تحديث.',
          attachment_path: undefined,
          is_read: true,
          sent_at: '2024-01-15T10:30:00',
          read_at: '2024-01-15T10:35:00',
          sender_name: 'موظف العمليات',
          sender_type: 'employee'
        },
        {
          id: 3,
          case_id: selectedThread.case_id,
          sender_id: 1,
          receiver_id: 2,
          message_type: 'document_request',
          subject: 'رفع المستندات',
          message: 'تم رفع المستندات المطلوبة، يرجى المراجعة',
          attachment_path: '/uploads/documents.zip',
          is_read: false,
          sent_at: '2024-01-16T14:30:00',
          read_at: undefined,
          sender_name: 'أحمد محمد',
          sender_type: 'client'
        }
      ];

      setMessages(mockMessages);
    }
  }, [selectedThread]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const getMessageTypeIcon = (type: string) => {
    switch (type) {
      case 'urgent':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      case 'document_request':
        return <Paperclip className="h-4 w-4 text-blue-500" />;
      case 'payment_reminder':
        return <Clock className="h-4 w-4 text-orange-500" />;
      default:
        return <MessageSquare className="h-4 w-4 text-gray-500" />;
    }
  };

  const getMessageTypeLabel = (type: string) => {
    switch (type) {
      case 'urgent': return 'عاجل';
      case 'document_request': return 'طلب مستند';
      case 'payment_reminder': return 'تذكير دفع';
      default: return 'عام';
    }
  };

  const getMessageTypeColor = (type: string) => {
    switch (type) {
      case 'urgent': return 'bg-red-100 text-red-800';
      case 'document_request': return 'bg-blue-100 text-blue-800';
      case 'payment_reminder': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.abs(now.getTime() - date.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 24) {
      return date.toLocaleTimeString('ar-EG', { 
        hour: '2-digit', 
        minute: '2-digit' 
      });
    } else {
      return date.toLocaleDateString('ar-EG', { 
        month: 'short', 
        day: 'numeric',
        hour: '2-digit', 
        minute: '2-digit' 
      });
    }
  };

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedThread) return;

    const message: MessageDetail = {
      id: Date.now(),
      case_id: selectedThread.case_id,
      sender_id: user?.id || 0,
      receiver_id: selectedThread.participants.find(p => p.id !== user?.id)?.id || 0,
      message_type: 'general',
      subject: '',
      message: newMessage,
      attachment_path: undefined,
      is_read: false,
      sent_at: new Date().toISOString(),
      read_at: undefined,
      sender_name: user?.full_name || '',
      sender_type: user?.user_type || ''
    };

    setMessages([...messages, message]);
    setNewMessage('');

    // تحديث آخر رسالة في thread
    setThreads(threads.map(thread => 
      thread.id === selectedThread.id 
        ? { ...thread, last_message: newMessage, last_message_time: message.sent_at }
        : thread
    ));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const filteredThreads = threads.filter(thread => {
    const matchesSearch = thread.case_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         thread.client_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         thread.last_message.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = typeFilter === 'all' || thread.message_type === typeFilter;
    
    return matchesSearch && matchesType;
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-navy-light mx-auto"></div>
          <p className="mt-4 text-gray-600">جاري تحميل الرسائل...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex">
      {/* قائمة المحادثات */}
      <div className="w-1/3 border-l border-gray-200 bg-white">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">المراسلات</h2>
            
            <Dialog open={isNewThreadOpen} onOpenChange={setIsNewThreadOpen}>
              <DialogTrigger asChild>
                <Button size="sm" className="btn-navy">
                  <Plus className="h-4 w-4 ml-1" />
                  جديد
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>محادثة جديدة</DialogTitle>
                  <DialogDescription>
                    إنشاء محادثة جديدة مع عميل
                  </DialogDescription>
                </DialogHeader>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="case_select">الملف</Label>
                    <Select>
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
                  
                  <div>
                    <Label htmlFor="message_type">نوع الرسالة</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر النوع" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">عام</SelectItem>
                        <SelectItem value="urgent">عاجل</SelectItem>
                        <SelectItem value="document_request">طلب مستند</SelectItem>
                        <SelectItem value="payment_reminder">تذكير دفع</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="subject">الموضوع</Label>
                    <Input placeholder="موضوع الرسالة" />
                  </div>
                  
                  <div>
                    <Label htmlFor="message">الرسالة</Label>
                    <Textarea placeholder="اكتب رسالتك هنا..." rows={4} />
                  </div>
                  
                  <div className="flex justify-end space-x-2 space-x-reverse">
                    <Button variant="outline" onClick={() => setIsNewThreadOpen(false)}>
                      إلغاء
                    </Button>
                    <Button className="btn-navy">
                      إرسال
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="space-y-2">
            <div className="relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="البحث في المحادثات..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pr-10"
              />
            </div>
            
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="تصفية حسب النوع" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع الأنواع</SelectItem>
                <SelectItem value="general">عام</SelectItem>
                <SelectItem value="urgent">عاجل</SelectItem>
                <SelectItem value="document_request">طلب مستند</SelectItem>
                <SelectItem value="payment_reminder">تذكير دفع</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="overflow-y-auto h-full">
          {filteredThreads.map((thread) => (
            <div
              key={thread.id}
              className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                selectedThread?.id === thread.id ? 'bg-blue-50 border-blue-200' : ''
              }`}
              onClick={() => setSelectedThread(thread)}
            >
              <div className="flex items-start space-x-3 space-x-reverse">
                <Avatar className="h-10 w-10">
                  <AvatarFallback>
                    {thread.client_name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {thread.case_number}
                      </p>
                      {getMessageTypeIcon(thread.message_type)}
                    </div>
                    
                    {thread.unread_count > 0 && (
                      <Badge className="bg-red-500 text-white">
                        {thread.unread_count}
                      </Badge>
                    )}
                  </div>
                  
                  <p className="text-sm text-gray-600 truncate">
                    {thread.client_name}
                  </p>
                  
                  <p className="text-xs text-gray-500 truncate mt-1">
                    {thread.last_message}
                  </p>
                  
                  <div className="flex items-center justify-between mt-2">
                    <Badge className={getMessageTypeColor(thread.message_type)}>
                      {getMessageTypeLabel(thread.message_type)}
                    </Badge>
                    
                    <span className="text-xs text-gray-400">
                      {formatTime(thread.last_message_time)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {filteredThreads.length === 0 && (
            <div className="p-8 text-center text-gray-500">
              لا توجد محادثات مطابقة
            </div>
          )}
        </div>
      </div>

      {/* منطقة المحادثة */}
      <div className="flex-1 flex flex-col">
        {selectedThread ? (
          <>
            {/* رأس المحادثة */}
            <div className="p-4 border-b border-gray-200 bg-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3 space-x-reverse">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback>
                      {selectedThread.client_name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div>
                    <h3 className="font-medium text-gray-900">
                      {selectedThread.case_number} - {selectedThread.client_name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      المشاركون: {selectedThread.participants.map(p => p.name).join('، ')}
                    </p>
                  </div>
                </div>
                
                <Badge className={getMessageTypeColor(selectedThread.message_type)}>
                  {getMessageTypeLabel(selectedThread.message_type)}
                </Badge>
              </div>
            </div>

            {/* منطقة الرسائل */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.sender_id === user?.id ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
                      message.sender_id === user?.id
                        ? 'bg-navy-light text-white'
                        : 'bg-white text-gray-900 border border-gray-200'
                    }`}
                  >
                    <div className="flex items-center space-x-2 space-x-reverse mb-1">
                      <span className="text-xs font-medium">
                        {message.sender_name}
                      </span>
                      {message.message_type !== 'general' && (
                        <Badge 
                          className={`text-xs ${
                            message.sender_id === user?.id 
                              ? 'bg-white/20 text-white' 
                              : getMessageTypeColor(message.message_type)
                          }`}
                        >
                          {getMessageTypeLabel(message.message_type)}
                        </Badge>
                      )}
                    </div>
                    
                    {message.subject && (
                      <p className="text-sm font-medium mb-2">
                        {message.subject}
                      </p>
                    )}
                    
                    <p className="text-sm whitespace-pre-wrap">
                      {message.message}
                    </p>
                    
                    {message.attachment_path && (
                      <div className="mt-2 p-2 bg-black/10 rounded">
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <Paperclip className="h-4 w-4" />
                          <span className="text-xs">مرفق</span>
                        </div>
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs opacity-75">
                        {formatTime(message.sent_at)}
                      </span>
                      
                      {message.sender_id === user?.id && (
                        <div className="flex items-center space-x-1 space-x-reverse">
                          {message.is_read ? (
                            <CheckCircle className="h-3 w-3 opacity-75" />
                          ) : (
                            <div className="h-3 w-3 rounded-full bg-white/30" />
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* صندوق الإرسال */}
            <div className="p-4 border-t border-gray-200 bg-white">
              <div className="flex items-end space-x-2 space-x-reverse">
                <Textarea
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="اكتب رسالتك هنا..."
                  className="flex-1 min-h-[40px] max-h-32 resize-none"
                  rows={1}
                />
                
                <div className="flex space-x-2 space-x-reverse">
                  <Button variant="outline" size="sm">
                    <Paperclip className="h-4 w-4" />
                  </Button>
                  
                  <Button 
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()}
                    className="btn-navy"
                    size="sm"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-gray-50">
            <div className="text-center">
              <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                اختر محادثة لبدء المراسلة
              </h3>
              <p className="text-gray-600">
                اختر محادثة من القائمة الجانبية أو ابدأ محادثة جديدة
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
