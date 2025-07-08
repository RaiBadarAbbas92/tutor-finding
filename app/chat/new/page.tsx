"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search, Loader2 } from "lucide-react"
import { useAuthStore } from "@/lib/stores/auth-store"
import * as usersApi from '@/lib/api/users'
import * as userMapping from '@/lib/utils/user-mapping'
import { toast } from "sonner"

export default function NewChatPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [users, setUsers] = useState<usersApi.User[]>([])
  const [loading, setLoading] = useState(true)
  const [processingUser, setProcessingUser] = useState<number | null>(null)
  const router = useRouter()
  const user = useAuthStore(state => state.user)

  useEffect(() => {
    const loadUsers = async () => {
      try {
        setLoading(true);
        const allUsers = await usersApi.getUsers();
        // Filter users based on role - if current user is student, show teachers and vice versa
        const filteredUsers = allUsers.filter(u =>
          u.is_active && u.id !== user?.id &&
          ((user?.role === 'student' && u.role === 'teacher') ||
           (user?.role === 'teacher' && u.role === 'student'))
        );
        setUsers(filteredUsers);
      } catch (error) {
        console.error('Error loading users:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      loadUsers();
    }
  }, [user]);

  // Function to handle starting a chat with a user
  const handleStartChat = async (selectedUser: usersApi.User) => {
    try {
      setProcessingUser(selectedUser.id);

      // Initialize user mappings
      await userMapping.initializeUserMappings();

      // Store the selected user information in the cache
      userMapping.storeUserInfo(selectedUser);
      console.log(`Stored selected user in cache: ${selectedUser.username} (ID: ${selectedUser.id})`);

      let chatId: number | null = selectedUser.id;

      // Map user ID to the appropriate teacher/student ID based on roles
      if (user?.role === 'student' && selectedUser.role === 'teacher') {
        // If current user is a student and selected user is a teacher, get teacher ID
        const teacherId = await userMapping.getTeacherIdFromUserId(selectedUser.id);
        if (teacherId) {
          chatId = teacherId;

          // Store the mapping in localStorage for persistence
          localStorage.setItem(`chat_teacher_${teacherId}`, JSON.stringify({
            userId: selectedUser.id,
            username: selectedUser.username,
            email: selectedUser.email
          }));

          console.log(`Stored teacher mapping in localStorage: Teacher ID ${teacherId} -> User ${selectedUser.username}`);
        } else {
          toast.error("Could not find teacher profile for this user");
          setProcessingUser(null);
          return;
        }
      } else if (user?.role === 'teacher' && selectedUser.role === 'student') {
        // If current user is a teacher and selected user is a student, get student ID
        const studentId = await userMapping.getStudentIdFromUserId(selectedUser.id);
        if (studentId) {
          chatId = studentId;

          // Store the mapping in localStorage for persistence
          localStorage.setItem(`chat_student_${studentId}`, JSON.stringify({
            userId: selectedUser.id,
            username: selectedUser.username,
            email: selectedUser.email
          }));

          console.log(`Stored student mapping in localStorage: Student ID ${studentId} -> User ${selectedUser.username}`);
        } else {
          toast.error("Could not find student profile for this user");
          setProcessingUser(null);
          return;
        }
      }

      // Navigate to the chat page with the correct ID
      router.push(`/chat/${chatId}`);
    } catch (error) {
      console.error('Error starting chat:', error);
      toast.error("Failed to start chat. Please try again.");
      setProcessingUser(null);
    }
  };

  // Filter users based on search term
  const filteredUsers = users.filter(u =>
    u.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!user) {
    router.push('/login');
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>Start New Conversation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative mb-6">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder={`Search ${user.role === 'student' ? 'teachers' : 'students'}...`}
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {loading ? (
            <div className="text-center py-8">Loading...</div>
          ) : (
            <div className="space-y-2">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((u) => (
                  <Button
                    key={u.id}
                    variant="ghost"
                    className="w-full justify-start p-3 h-auto"
                    onClick={() => handleStartChat(u)}
                    disabled={processingUser === u.id}
                  >
                    {processingUser === u.id && (
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    )}
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback>{u.username[0].toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <div className="text-left">
                        <p className="font-medium">{u.username}</p>
                        <p className="text-sm text-muted-foreground">{u.email}</p>
                      </div>
                    </div>
                  </Button>
                ))
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  {searchTerm
                    ? "No users match your search"
                    : `No ${user.role === 'student' ? 'teachers' : 'students'} available`}
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
