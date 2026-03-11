import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { User, Package, CheckCircle, Edit2, LogOut, Mail, GraduationCap, Building2, Calendar, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/contexts/AuthContext";
import { useMyItems } from "@/hooks/useMyItems";
import { useMyMessages, useMarkAsRead, useSendMessage } from "@/hooks/useMessages";
import ItemCard from "@/components/ItemCard";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();
  const { data: myItems = [], isLoading } = useMyItems();
  
  // Real Message Hooks
  const { data: messages = [], isLoading: loadingMessages } = useMyMessages();
  const markAsRead = useMarkAsRead();
  const sendMsg = useSendMessage();

  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(profile?.name || "");
  const [college, setCollege] = useState(profile?.college || "LNCT");
  const [course, setCourse] = useState(profile?.course || "");
  const [year, setYear] = useState(profile?.year || "");
  const [contactInfo, setContactInfo] = useState(profile?.contact_info || "");
  const [saving, setSaving] = useState(false);

  // Reply Modal State
  const [replyOpen, setReplyOpen] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const [selectedMessage, setSelectedMessage] = useState<any>(null);

  const activeItems = myItems.filter((item) => item.status === "available");
  const soldItems = myItems.filter((item) => item.status === "sold");
  const unreadCount = messages.filter(m => !m.read).length;

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);
    try {
      const { error } = await supabase
        .from("profiles")
        .update({ name, college, course, year, contact_info: contactInfo })
        .eq("id", user.id);
      if (error) throw error;
      toast.success("Profile updated! ✅");
      setEditing(false);
      window.location.reload();
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    await signOut();
    toast.success("Logged out successfully");
    navigate("/");
  };

// 1. When the user clicks "Reply" on a message card
const openReply = (msg: any) => {
  setSelectedMessage(msg); // Store the message you are replying to
  setReplyContent("");     // Clear the text area
  setReplyOpen(true);      // Open the modal
  
  // If it's unread, mark it as read immediately
  if (!msg.read) {
    markAsRead.mutate(msg.id);
  }
};

// 2. When the user hits "Send Reply" in the Dialog
const handleSendReply = async () => {
  if (!replyContent.trim() || !selectedMessage) return;
  
  try {
    await sendMsg.mutateAsync({ 
      // CRITICAL: Send to the sender of the message you received
      receiverId: selectedMessage.sender_id, 
      itemId: selectedMessage.item_id, 
      content: replyContent 
    });
    
    toast.success("Reply sent! 🚀");
    setReplyOpen(false);
    setReplyContent("");
  } catch (error) {
    toast.error("Could not send reply. Try again.");
    console.error(error);
  }
};

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <User className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
        <p className="font-display text-xl font-semibold text-foreground">Please log in</p>
        <Link to="/login" className="mt-4 inline-block font-body text-sm font-medium text-primary hover:underline">
          Go to Login →
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>

        {/* Profile Header (Unchanged) */}
        <div className="mb-8 rounded-xl border border-border bg-card p-6 shadow-card">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-hero-gradient text-2xl font-bold text-primary-foreground">
                {profile?.name?.charAt(0)?.toUpperCase() || "U"}
              </div>
              <div>
                <h1 className="font-display text-2xl font-bold text-foreground">
                  {profile?.name || "User"}
                </h1>
                <p className="mt-0.5 font-body text-sm text-muted-foreground">
                  {user.email}
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {profile?.college && (
                    <Badge variant="secondary" className="gap-1 font-body text-xs">
                      <Building2 className="h-3 w-3" /> {profile.college}
                    </Badge>
                  )}
                  {profile?.course && (
                    <Badge variant="secondary" className="gap-1 font-body text-xs">
                      <GraduationCap className="h-3 w-3" /> {profile.course}
                    </Badge>
                  )}
                  {profile?.year && (
                    <Badge variant="secondary" className="gap-1 font-body text-xs">
                      <Calendar className="h-3 w-3" /> {profile.year}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="gap-1.5 font-display text-xs font-semibold" onClick={() => setEditing(!editing)}>
                <Edit2 className="h-3.5 w-3.5" /> Edit Profile
              </Button>
              <Button variant="outline" size="sm" className="gap-1.5 font-display text-xs font-semibold text-destructive hover:text-destructive" onClick={handleLogout}>
                <LogOut className="h-3.5 w-3.5" /> Logout
              </Button>
            </div>
          </div>

          {/* Edit Form */}
          {editing && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="mt-6 border-t border-border pt-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label className="font-display text-sm font-semibold">Name</Label>
                  <Input value={name} onChange={(e) => setName(e.target.value)} className="mt-1.5 font-body text-sm" />
                </div>
                <div>
                  <Label className="font-display text-sm font-semibold">College</Label>
                  <select value={college} onChange={(e) => setCollege(e.target.value)} className="mt-1.5 flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 font-body">
                    <option value="LNCT">LNCT</option>
                    <option value="LNCTS">LNCTS</option>
                    <option value="LNCTE">LNCTE</option>
                  </select>
                </div>
                <div>
                  <Label className="font-display text-sm font-semibold">Course</Label>
                  <Input value={course} onChange={(e) => setCourse(e.target.value)} placeholder="B.Tech CSE" className="mt-1.5 font-body text-sm" />
                </div>
                <div>
                  <Label className="font-display text-sm font-semibold">Year</Label>
                  <Input value={year} onChange={(e) => setYear(e.target.value)} placeholder="3rd Year" className="mt-1.5 font-body text-sm" />
                </div>
                <div className="sm:col-span-2">
                  <Label className="font-display text-sm font-semibold">Contact Info (WhatsApp/Phone)</Label>
                  <Input value={contactInfo} onChange={(e) => setContactInfo(e.target.value)} placeholder="+91 98765 43210" className="mt-1.5 font-body text-sm" />
                </div>
              </div>
              <div className="mt-4 flex gap-2">
                <Button onClick={handleSave} disabled={saving} className="bg-hero-gradient font-display text-sm font-semibold text-primary-foreground hover:opacity-90">
                  {saving ? "Saving…" : "Save Changes"}
                </Button>
                <Button variant="outline" onClick={() => setEditing(false)} className="font-display text-sm font-semibold">
                  Cancel
                </Button>
              </div>
            </motion.div>
          )}
        </div>

        {/* Stats Cards */}
        <div className="mb-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-border bg-card p-4 shadow-card text-center">
            <Package className="mx-auto mb-2 h-6 w-6 text-primary" />
            <p className="font-display text-2xl font-bold text-foreground">{myItems.length}</p>
            <p className="font-body text-xs text-muted-foreground">Total Listed</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-4 shadow-card text-center">
            <Package className="mx-auto mb-2 h-6 w-6 text-green-500" />
            <p className="font-display text-2xl font-bold text-foreground">{activeItems.length}</p>
            <p className="font-body text-xs text-muted-foreground">Active Listings</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-4 shadow-card text-center relative">
            {unreadCount > 0 && (
              <span className="absolute top-3 right-3 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-white">
                {unreadCount}
              </span>
            )}
            <MessageCircle className="mx-auto mb-2 h-6 w-6 text-warning" />
            <p className="font-display text-2xl font-bold text-foreground">{messages.length}</p>
            <p className="font-body text-xs text-muted-foreground">Total Messages</p>
          </div>
        </div>

        {/* Tabs: Active / Sold / Messages */}
        <Tabs defaultValue="active">
          <TabsList className="mb-6 w-full justify-start overflow-x-auto">
            <TabsTrigger value="active" className="font-display text-sm font-semibold">
              Active ({activeItems.length})
            </TabsTrigger>
            <TabsTrigger value="sold" className="font-display text-sm font-semibold">
              Sold ({soldItems.length})
            </TabsTrigger>
            <TabsTrigger value="messages" className="font-display text-sm font-semibold flex items-center gap-2">
              Messages
              {unreadCount > 0 && (
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[9px] font-bold text-white">
                  {unreadCount}
                </span>
              )}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="active">
             {/* ... (Keep your existing Active Items map here) ... */}
             {activeItems.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {activeItems.map((item, i) => (
                  <ItemCard key={item.id} item={item} index={i} />
                ))}
              </div>
             ) : (
              <div className="py-16 text-center">
                <Package className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
                <p className="font-display text-xl font-semibold text-foreground">No active listings</p>
              </div>
             )}
          </TabsContent>

          <TabsContent value="sold">
             {/* ... (Keep your existing Sold Items map here) ... */}
             {soldItems.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {soldItems.map((item, i) => (
                  <ItemCard key={item.id} item={item} index={i} />
                ))}
              </div>
             ) : (
              <div className="py-16 text-center">
                <CheckCircle className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
                <p className="font-display text-xl font-semibold text-foreground">No sold items</p>
              </div>
             )}
          </TabsContent>

          {/* REAL MESSAGES TAB */}
          <TabsContent value="messages">
            {loadingMessages ? (
              <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="h-24 animate-pulse rounded-xl bg-muted" />
                ))}
              </div>
            ) : messages.length > 0 ? (
              <div className="space-y-4">
                {messages.map((msg: any) => (
                  <div key={msg.id} className={`rounded-xl border border-border p-4 shadow-sm transition-colors ${!msg.read ? 'bg-primary/5 border-primary/20' : 'bg-card'}`}>
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-display text-sm font-bold text-foreground flex items-center gap-2">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          {msg.profiles?.name || "Anonymous User"}
                          {!msg.read && <span className="h-2 w-2 rounded-full bg-primary inline-block"></span>}
                        </p>
                        <p className="font-body text-xs font-medium text-primary mt-0.5">
                          Interested in: {msg.items?.title || "an item"}
                        </p>
                      </div>
                      <span className="font-body text-xs text-muted-foreground">
                        {new Date(msg.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="font-body text-sm text-muted-foreground leading-relaxed bg-muted/30 p-3 rounded-lg mt-3">
                      "{msg.content}"
                    </p>
                    <div className="mt-4 flex gap-2">
                      <Button variant="outline" size="sm" className="h-8 text-xs font-semibold" onClick={() => openReply(msg)}>
                        Reply
                      </Button>
                      {!msg.read && (
                        <Button variant="ghost" size="sm" className="h-8 text-xs text-muted-foreground" onClick={() => markAsRead.mutate(msg.id)}>
                          Mark as read
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-16 text-center">
                <MessageCircle className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
                <p className="font-display text-xl font-semibold text-foreground">No messages yet</p>
                <p className="mt-2 font-body text-sm text-muted-foreground">When buyers contact you about your items, their messages will appear here.</p>
              </div>
            )}
          </TabsContent>
        </Tabs>

      </motion.div>

      {/* REPLY DIALOG */}
      <Dialog open={replyOpen} onOpenChange={setReplyOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-display">
              Reply to {selectedMessage?.profiles?.name || "User"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <Label className="font-display text-sm font-semibold">Your message</Label>
            <Textarea
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              placeholder="Type your reply here..."
              className="min-h-[100px] font-body text-sm"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setReplyOpen(false)}>Cancel</Button>
            <Button
              className="bg-hero-gradient font-display text-sm font-semibold text-primary-foreground hover:opacity-90"
              onClick={handleSendReply}
              disabled={sendMsg.isPending || !replyContent.trim()}
            >
              {sendMsg.isPending ? "Sending…" : "Send Reply"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

    </div>
  );
};

export default Profile;