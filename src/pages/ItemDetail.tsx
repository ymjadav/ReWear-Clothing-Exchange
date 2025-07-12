import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  ArrowLeft,
  Heart,
  Share2,
  Star,
  Package,
  Shirt,
  RefreshCw,
  MapPin,
  Calendar,
  User,
} from "lucide-react";
import { createSwapRequest, getItemById, getItemsByUser } from "@/lib/supabase";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"; // If you have a dialog/modal component
import { get } from "http";
import { useAuth } from "@/hooks/useAuth";

const ItemDetail = () => {
  const { id } = useParams();
  const [isFavorited, setIsFavorited] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showSwapModal, setShowSwapModal] = useState(false);
  const [userItems, setUserItems] = useState([]);
  const [requestedItemId, setRequestedItemId] = useState<string | null>(null);
  const { user } = useAuth(); // Assuming you have a useAuth hook to get the current user

  interface ItemDetails {
    id: string;
    title: string;
    description: string;
    category: string;
    size: string;
    condition: string;
    brand?: string;
    color?: string;
    tags: string[];
    images: string[];
    pointValue: number;
    isAvailable: boolean;
    postedDate: string;
    views: number;
    uploader: {
      name: string;
      avatar?: string;
      rating: number;
      totalSwaps: number;
      location: string;
    };
  }

  const [itemDetails, setItemDetails] = useState<ItemDetails | null>(null);

  const relatedItems = [
    { id: 2, title: "Black Leather Jacket", user: "Emma Wilson", image: "" },
    { id: 3, title: "Wool Peacoat", user: "Mike Davis", image: "" },
    { id: 4, title: "Bomber Jacket", user: "Lisa Chen", image: "" },
    { id: 5, title: "Trench Coat", user: "Anna Miller", image: "" },
  ];

  // Fetch user's items (replace with your actual fetch logic)
  const fetchUserItems = async () => {
    const items = await getItemsByUser(user.id);
    setUserItems(items);
  };

  const handleSwapRequest = () => {
    setShowSwapModal(true);
    fetchUserItems();
  };

  const submitSwapRequest = async () => {
    if (!requestedItemId || !itemDetails?.id) {
      setError("Please select an item to swap.");
      return;
    }
    if (!user) {
      setError("You must be logged in to request a swap.");
      return;
    }
    setIsLoading(true);
    setError(null);
    await createSwapRequest(itemDetails.id, requestedItemId, user.id);
    console.log("Request swap:", {
      requestedItemId,
      targetItemId: itemDetails?.id,
      requesterId: user.id,
    });
    setIsLoading(false);
    setRequestedItemId(null);
    setShowSwapModal(false);
  };

  const getItemDetails = async () => {
    setIsLoading(true);
    try {
      const item = await getItemById(id);
      console.log("Fetched item details:", item);
      setItemDetails(item);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectImage = (imageUrl: string) => {
    setSelectedImage(imageUrl);
  };

  useEffect(() => {
    getItemDetails();
  }, [id]);

  if (isLoading || !itemDetails) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span>Loading...</span>
      </div>
    );
  }

  console.log("Item details:", itemDetails);

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              </Link>
              <div className="flex items-center gap-2">
                <Shirt className="w-6 h-6 text-primary" />
                <span className="font-bold text-lg text-primary">ReWear</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsFavorited(!isFavorited)}
              >
                <Heart
                  className={`w-4 h-4 ${
                    isFavorited ? "fill-red-500 text-red-500" : ""
                  }`}
                />
              </Button>
              <Button variant="ghost" size="sm">
                <Share2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Images Section */}
          <div className="space-y-4">
            <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
              {selectedImage ? (
                <img
                  src={selectedImage}
                  alt="Item"
                  className="w-full h-full object-cover rounded-lg"
                />
              ) : itemDetails.images.length > 0 ? (
                <img
                  src={itemDetails.images[0]}
                  alt="Item"
                  className="w-full h-full object-cover rounded-lg"
                />
              ) : (
                <Shirt className="w-24 h-24 text-muted-foreground" />
              )}
            </div>
            <div className="grid grid-cols-3 gap-2">
              {itemDetails?.images.map((imageUrl, index) => (
                <div
                  key={index}
                  className="aspect-square bg-muted rounded-lg flex items-center justify-center"
                >
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt={`Item image ${index + 1}`}
                      className="w-24  h-24 object-cover rounded-lg"
                      onClick={() => handleSelectImage(imageUrl)}
                    />
                  ) : (
                    <Shirt className="w-24 h-24 text-muted-foreground" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Item Details */}
          <div className="space-y-6">
            <div>
              <div className="flex items-start justify-between mb-2">
                <h1 className="text-3xl font-bold">{itemDetails?.title}</h1>
                <Badge
                  variant={itemDetails?.isAvailable ? "default" : "secondary"}
                >
                  {itemDetails?.isAvailable ? "Available" : "Not Available"}
                </Badge>
              </div>

              <div className="flex items-center gap-4 text-muted-foreground mb-4">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {itemDetails?.postedDate}
                </span>
                <span>{itemDetails?.views} views</span>
              </div>

              <p className="text-foreground leading-relaxed">
                {itemDetails?.description}
              </p>
            </div>

            {/* Item Specifications */}
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-3">Item Details</h3>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="text-muted-foreground">Category:</span>
                    <span className="ml-2 font-medium">
                      {itemDetails?.category}
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Size:</span>
                    <span className="ml-2 font-medium">
                      {itemDetails?.size}
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Condition:</span>
                    <span className="ml-2 font-medium">
                      {itemDetails.condition}
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Brand:</span>
                    <span className="ml-2 font-medium">
                      {itemDetails.brand}
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Color:</span>
                    <span className="ml-2 font-medium">
                      {itemDetails?.color}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tags */}
            <div>
              <h3 className="font-semibold mb-2">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {itemDetails?.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Uploader Info */}
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-3">Listed by</h3>
                <div className="flex items-center gap-3">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={itemDetails?.uploader.avatar} />
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {itemDetails?.uploader.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h4 className="font-medium">
                      {itemDetails?.uploader.name}
                    </h4>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        {itemDetails?.uploader.rating}
                      </span>
                      <span className="flex items-center gap-1">
                        <RefreshCw className="w-3 h-3" />
                        {itemDetails?.uploader.totalSwaps} swaps
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {itemDetails?.uploader.location}
                      </span>
                    </div>
                  </div>
                  <Link to={`/profile/${itemDetails?.uploader.name}`}>
                    <Button variant="outline" size="sm">
                      <User className="w-4 h-4 mr-2" />
                      View Profile
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            {itemDetails?.isAvailable && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <Button onClick={handleSwapRequest} className="btn-primary">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Request Swap
                  </Button>
                </div>
                <Dialog open={showSwapModal} onOpenChange={setShowSwapModal}>
                  <DialogTitle>Select an item to offer for swap</DialogTitle>
                  <DialogContent>
                    {userItems.map((item) => (
                      <Button
                        key={item.id}
                        variant={
                          requestedItemId === item.id
                            ? "destructive"
                            : "outline"
                        }
                        onClick={() => setRequestedItemId(item.id)}
                      >
                        {item.title}
                      </Button>
                    ))}
                    <Button
                      disabled={!requestedItemId}
                      onClick={submitSwapRequest}
                      className="mt-4"
                    >
                      Confirm Swap Request
                    </Button>
                  </DialogContent>
                </Dialog>
              </>
            )}
          </div>
        </div>

        {/* Related Items */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Similar Items</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {relatedItems.map((relatedItem) => (
              <Card key={relatedItem.id} className="card-hover">
                <CardContent className="p-0">
                  <div className="aspect-square bg-muted rounded-t-lg flex items-center justify-center">
                    <Package className="w-12 h-12 text-muted-foreground" />
                  </div>
                  <div className="p-3">
                    <h3 className="font-medium text-sm mb-1">
                      {relatedItem.title}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      by {relatedItem.user}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetail;
