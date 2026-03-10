import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Heart, MapPin, MessageCircle, Star } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useItem } from "@/hooks/useItem";
import { useIsInWishlist, useToggleWishlist } from "@/hooks/useWishlistQuery";
import { useWishlist } from "@/hooks/useWishlist";
import { useReviews, useAverageRating, useCreateReview } from "@/hooks/useReviews";
import { useSendMessage } from "@/hooks/useMessages";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const StarPicker = ({ value, onChange }: { value: number; onChange: (v: number) => void }) => (
  <div className="flex gap-1">
    {[1, 2, 3, 4, 5].map((n) => (
      <button key={n} type="button" onClick={() => onChange(n)}>
        <Star className={`h-5 w-5 ${n <= value ? "fill-warning text-warning" : "text-muted-foreground"}`} />
      </button>
    ))}
  </div>
);

const ItemDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const { data: item, isLoading, isError } = useItem(id);

  // Wishlist
  const { data: wishlisted } = useIsInWishlist(id ?? "");
  const { add: addWishlist, remove: removeWishlist } = useToggleWishlist(id ?? "");
  const { isInWishlist: isInMemory, toggleWishlist: toggleMemory } = useWishlist();

  // Messaging
  const [msgOpen, setMsgOpen] = useState(false);
  const [msgContent, setMsgContent] = useState("");
  const sendMsg = useSendMessage();

  // Reviews
  const [reviewOpen, setReviewOpen] = useState(false);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const { data: reviews = [] } = useReviews(item?.seller_id);
  const { data: avgRating } = useAverageRating(item?.seller_id);
  const createReview = useCreateReview(item?.seller_id ?? "");

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="aspect-[4/3] animate-pulse rounded-xl bg-muted" />
          <div className="space-y-4">
            <div className="h-6 w-1/3 animate-pulse rounded bg-muted" />
            <div className="h-8 w-3/4 animate-pulse rounded bg-muted" />
            <div className="h-10 w-1/4 animate-pulse rounded bg-muted" />
          </div>
        </div>
      </div>
    );
  }

  if (isError || !item) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <p className="font-display text-xl font-semibold text-foreground">Item not found</p>
        <Link to="/browse" className="mt-4 inline-block font-body text-sm text-primary hover:underline">← Back to browse</Link>
      </div>
    );
  }

  const isOwner = user?.id === item.seller_id;
  const canReview = user && !isOwner && reviews.every((r) => r.reviewer_id !== user.id);

  const handleContact = async () => {
    if (!user) {
      toast.error("Please log in to contact the seller");
      return;
    }
    if (!msgContent.trim()) return;
    try {
      await sendMsg.mutateAsync({ receiverId: item.seller_id, itemId: item.id, content: msgContent });
      toast.success("Message sent! The seller will contact you soon.");
      setMsgOpen(false);
      setMsgContent("");
    } catch {
      toast.error("Failed to send message");
    }
  };

  const handleReview = async () => {
    if (!user) return;
    try {
      await createReview.mutateAsync({ itemId: item.id, rating, comment });
      toast.success("Review submitted!");
      setReviewOpen(false);
      setComment("");
      setRating(5);
    } catch {
      toast.error("Failed to submit review");
    }
  };

  const toggleWishlistAction = () => {
    if (!user) {
      toggleMemory(item.id);
      return;
    }
    if (wishlisted) {
      removeWishlist.mutate();
    } else {
      addWishlist.mutate();
    }
  };

  const isWishlisted = user ? !!wishlisted : isInMemory(item.id);

  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/browse" className="mb-6 inline-flex items-center gap-2 font-body text-sm text-muted-foreground hover:text-primary">
        <ArrowLeft className="h-4 w-4" /> Back to listings
      </Link>

      <div className="grid gap-8 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="overflow-hidden rounded-xl border border-border"
        >
          {item.image_url ? (
            <img src={item.image_url} alt={item.title} className="h-full max-h-[500px] w-full object-cover" />
          ) : (
            <div className="flex h-64 w-full items-center justify-center bg-muted text-muted-foreground">
              No image available
            </div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="mb-3 flex items-center gap-2">
            <Badge variant="secondary" className="font-body">{item.category}</Badge>
            <Badge variant="outline" className="font-body">{item.condition}</Badge>
            {item.status === "sold" && <Badge className="bg-destructive text-destructive-foreground">Sold</Badge>}
          </div>

          <h1 className="mb-2 font-display text-2xl font-bold text-foreground md:text-3xl">{item.title}</h1>
          <p className="mb-4 font-display text-3xl font-extrabold text-primary">₹{item.price}</p>

          <p className="mb-6 font-body text-sm leading-relaxed text-muted-foreground">{item.description}</p>

          {item.location && (
            <div className="mb-6 flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span className="font-body text-sm">{item.location}</span>
              <span className="font-body text-xs">• Listed {new Date(item.created_at).toLocaleDateString()}</span>
            </div>
          )}

          {/* Seller */}
          {item.seller && (
            <div className="mb-6 rounded-xl border border-border bg-muted/50 p-4">
              <div className="flex items-center gap-3">
                {item.seller.avatar_url ? (
                  <img src={item.seller.avatar_url} alt={item.seller.name} className="h-12 w-12 rounded-full object-cover" />
                ) : (
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20 font-display text-lg font-bold text-primary">
                    {item.seller.name[0]}
                  </div>
                )}
                <div>
                  <p className="font-display text-sm font-semibold text-foreground">{item.seller.name}</p>
                  {item.seller.college && (
                    <p className="font-body text-xs text-muted-foreground">{item.seller.college} • {item.seller.year}</p>
                  )}
                  {avgRating !== null && avgRating !== undefined && (
                    <div className="mt-1 flex items-center gap-1">
                      <Star className="h-3 w-3 fill-warning text-warning" />
                      <span className="font-body text-xs font-medium text-foreground">{avgRating}</span>
                      <span className="font-body text-xs text-muted-foreground">({reviews.length} reviews)</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          <div className="flex gap-3">
            {!isOwner && (
              <Button
                className="flex-1 gap-2 bg-hero-gradient font-display text-sm font-semibold text-primary-foreground hover:opacity-90"
                onClick={() => {
                  if (!user) {
                    toast.error("Please log in to contact the seller");
                    return;
                  }
                  setMsgOpen(true);
                }}
                disabled={item.status === "sold"}
              >
                <MessageCircle className="h-4 w-4" /> Contact Seller
              </Button>
            )}
            <Button
              variant="outline"
              className="gap-2 font-display text-sm font-semibold"
              onClick={toggleWishlistAction}
            >
              <Heart className={`h-4 w-4 ${isWishlisted ? "fill-destructive text-destructive" : ""}`} />
              {isWishlisted ? "Saved" : "Save"}
            </Button>
          </div>

          {canReview && (
            <Button variant="outline" className="mt-3 w-full gap-2 font-display text-sm" onClick={() => setReviewOpen(true)}>
              <Star className="h-4 w-4" /> Leave a Review
            </Button>
          )}
        </motion.div>
      </div>

      {/* Reviews Section */}
      {reviews.length > 0 && (
        <div className="mt-12">
          <h2 className="mb-6 font-display text-xl font-bold text-foreground">Seller Reviews</h2>
          <div className="space-y-4">
            {reviews.map((review) => (
              <div key={review.id} className="rounded-xl border border-border bg-card p-4 shadow-card">
                <div className="mb-2 flex items-center gap-3">
                  {review.reviewer?.avatar_url ? (
                    <img src={review.reviewer.avatar_url} alt={review.reviewer.name} className="h-8 w-8 rounded-full object-cover" />
                  ) : (
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-sm font-bold text-primary">
                      {review.reviewer?.name?.[0] ?? "?"}
                    </div>
                  )}
                  <div>
                    <p className="font-display text-sm font-semibold">{review.reviewer?.name ?? "Anonymous"}</p>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((n) => (
                        <Star key={n} className={`h-3 w-3 ${n <= review.rating ? "fill-warning text-warning" : "text-muted-foreground"}`} />
                      ))}
                    </div>
                  </div>
                </div>
                {review.comment && <p className="font-body text-sm text-muted-foreground">{review.comment}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Contact Dialog */}
      <Dialog open={msgOpen} onOpenChange={setMsgOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-display">Contact Seller</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <Label className="font-display text-sm font-semibold">Your message</Label>
            <Textarea
              value={msgContent}
              onChange={(e) => setMsgContent(e.target.value)}
              placeholder={`Hi, I'm interested in "${item.title}". Is it still available?`}
              className="min-h-[100px] font-body text-sm"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setMsgOpen(false)}>Cancel</Button>
            <Button
              className="bg-hero-gradient font-display text-sm font-semibold text-primary-foreground hover:opacity-90"
              onClick={handleContact}
              disabled={sendMsg.isPending || !msgContent.trim()}
            >
              {sendMsg.isPending ? "Sending…" : "Send Message"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Review Dialog */}
      <Dialog open={reviewOpen} onOpenChange={setReviewOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-display">Leave a Review</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label className="font-display text-sm font-semibold">Rating</Label>
              <div className="mt-1.5">
                <StarPicker value={rating} onChange={setRating} />
              </div>
            </div>
            <div>
              <Label className="font-display text-sm font-semibold">Comment (optional)</Label>
              <Textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Share your experience..."
                className="mt-1.5 font-body text-sm"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setReviewOpen(false)}>Cancel</Button>
            <Button
              className="bg-hero-gradient font-display text-sm font-semibold text-primary-foreground hover:opacity-90"
              onClick={handleReview}
              disabled={createReview.isPending}
            >
              {createReview.isPending ? "Submitting…" : "Submit Review"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ItemDetail;
