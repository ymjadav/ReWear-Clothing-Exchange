import { useState } from "react";
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
  User
} from "lucide-react";

const ItemDetail = () => {
  const { id } = useParams();
  const [isFavorited, setIsFavorited] = useState(false);
  
  // Mock item data
  const item = {
    id: 1,
    title: "Vintage Denim Jacket",
    description: "Beautiful vintage denim jacket in excellent condition. Perfect for layering during cool evenings. Has a classic fit and authentic vintage wash. No stains or holes, only minimal signs of wear that add to its character.",
    category: "Outerwear",
    size: "M",
    condition: "Excellent",
    brand: "Levi's",
    color: "Blue",
    images: ["", "", ""],
    uploader: {
      name: "Sarah Johnson",
      avatar: "",
      rating: 4.8,
      totalSwaps: 18,
      location: "Brooklyn, NY",
      memberSince: "March 2024"
    },
    tags: ["vintage", "denim", "classic", "layering"],
    pointValue: 45,
    isAvailable: true,
    postedDate: "3 days ago",
    views: 127
  };

  const relatedItems = [
    { id: 2, title: "Black Leather Jacket", user: "Emma Wilson", image: "" },
    { id: 3, title: "Wool Peacoat", user: "Mike Davis", image: "" },
    { id: 4, title: "Bomber Jacket", user: "Lisa Chen", image: "" },
    { id: 5, title: "Trench Coat", user: "Anna Miller", image: "" },
  ];

  const handleSwapRequest = () => {
    // Handle swap request logic
    console.log("Swap request for item:", item.id);
  };

  const handleRedeemPoints = () => {
    // Handle point redemption logic
    console.log("Redeem points for item:", item.id);
  };

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
                <Heart className={`w-4 h-4 ${isFavorited ? 'fill-red-500 text-red-500' : ''}`} />
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
              <Shirt className="w-24 h-24 text-muted-foreground" />
            </div>
            <div className="grid grid-cols-3 gap-2">
              {item.images.map((_, index) => (
                <div key={index} className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                  <Shirt className="w-8 h-8 text-muted-foreground" />
                </div>
              ))}
            </div>
          </div>

          {/* Item Details */}
          <div className="space-y-6">
            <div>
              <div className="flex items-start justify-between mb-2">
                <h1 className="text-3xl font-bold">{item.title}</h1>
                <Badge variant={item.isAvailable ? "default" : "secondary"}>
                  {item.isAvailable ? "Available" : "Not Available"}
                </Badge>
              </div>
              
              <div className="flex items-center gap-4 text-muted-foreground mb-4">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {item.postedDate}
                </span>
                <span>{item.views} views</span>
              </div>

              <p className="text-foreground leading-relaxed">{item.description}</p>
            </div>

            {/* Item Specifications */}
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-3">Item Details</h3>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="text-muted-foreground">Category:</span>
                    <span className="ml-2 font-medium">{item.category}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Size:</span>
                    <span className="ml-2 font-medium">{item.size}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Condition:</span>
                    <span className="ml-2 font-medium">{item.condition}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Brand:</span>
                    <span className="ml-2 font-medium">{item.brand}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Color:</span>
                    <span className="ml-2 font-medium">{item.color}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Points:</span>
                    <span className="ml-2 font-medium text-accent">{item.pointValue}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tags */}
            <div>
              <h3 className="font-semibold mb-2">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {item.tags.map((tag) => (
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
                    <AvatarImage src={item.uploader.avatar} />
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {item.uploader.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h4 className="font-medium">{item.uploader.name}</h4>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        {item.uploader.rating}
                      </span>
                      <span className="flex items-center gap-1">
                        <RefreshCw className="w-3 h-3" />
                        {item.uploader.totalSwaps} swaps
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {item.uploader.location}
                      </span>
                    </div>
                  </div>
                  <Link to={`/profile/${item.uploader.name}`}>
                    <Button variant="outline" size="sm">
                      <User className="w-4 h-4 mr-2" />
                      View Profile
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            {item.isAvailable && (
              <div className="grid grid-cols-2 gap-4">
                <Button onClick={handleSwapRequest} className="btn-primary">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Request Swap
                </Button>
                <Button onClick={handleRedeemPoints} variant="outline">
                  <Star className="w-4 h-4 mr-2" />
                  Redeem ({item.pointValue} points)
                </Button>
              </div>
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
                    <h3 className="font-medium text-sm mb-1">{relatedItem.title}</h3>
                    <p className="text-xs text-muted-foreground">by {relatedItem.user}</p>
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