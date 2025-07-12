import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Shirt, 
  Plus, 
  Star, 
  Package, 
  RefreshCw, 
  CheckCircle,
  Clock,
  TrendingUp,
  Heart,
  Settings
} from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const user = {
    name: "Sarah Johnson",
    email: "sarah@example.com",
    points: 245,
    avatar: "",
    memberSince: "March 2024",
    totalSwaps: 18,
    totalListings: 12
  };

  const recentListings = [
    { id: 1, title: "Vintage Denim Jacket", status: "active", views: 23, image: "" },
    { id: 2, title: "Summer Floral Dress", status: "pending", views: 15, image: "" },
    { id: 3, title: "Wool Winter Coat", status: "swapped", views: 45, image: "" },
  ];

  const recentSwaps = [
    { id: 1, item: "Blue Sweater", partner: "Emily Chen", status: "completed", type: "swap" },
    { id: 2, item: "Black Boots", partner: "Point Redemption", status: "pending", type: "redeem" },
    { id: 3, item: "Silk Scarf", partner: "Maria Lopez", status: "in-progress", type: "swap" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <Shirt className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-bold text-xl text-primary">ReWear</span>
            </Link>
            
            <div className="flex items-center gap-4">
              <Link to="/add-item">
                <Button className="btn-accent">
                  <Plus className="w-4 h-4 mr-2" />
                  List Item
                </Button>
              </Link>
              <Button variant="ghost" size="sm">
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Profile Header */}
        <div className="mb-8">
          <Card className="shadow-card">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback className="bg-primary text-primary-foreground text-lg">
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h1 className="text-2xl font-bold">{user.name}</h1>
                    <p className="text-muted-foreground">{user.email}</p>
                    <p className="text-sm text-muted-foreground">Member since {user.memberSince}</p>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="bg-accent/10 rounded-lg p-3 mb-2">
                    <div className="flex items-center gap-2">
                      <Star className="w-5 h-5 text-accent" />
                      <span className="text-2xl font-bold text-accent">{user.points}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">ReWear Points</p>
                  </div>
                </div>
              </div>
              
              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <RefreshCw className="w-4 h-4 text-success" />
                    <span className="text-2xl font-bold">{user.totalSwaps}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Total Swaps</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <Package className="w-4 h-4 text-primary" />
                    <span className="text-2xl font-bold">{user.totalListings}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Items Listed</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <TrendingUp className="w-4 h-4 text-accent" />
                    <span className="text-2xl font-bold">4.8</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Rating</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="listings" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="listings">My Listings</TabsTrigger>
            <TabsTrigger value="swaps">Swap History</TabsTrigger>
            <TabsTrigger value="favorites">Favorites</TabsTrigger>
          </TabsList>

          <TabsContent value="listings" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Your Listed Items</h2>
              <Link to="/add-item">
                <Button variant="outline">
                  <Plus className="w-4 h-4 mr-2" />
                  Add New Item
                </Button>
              </Link>
            </div>
            
            <div className="grid gap-4">
              {recentListings.map((item) => (
                <Card key={item.id} className="card-hover">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center">
                          <Shirt className="w-8 h-8 text-muted-foreground" />
                        </div>
                        <div>
                          <h3 className="font-medium">{item.title}</h3>
                          <p className="text-sm text-muted-foreground">{item.views} views</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge 
                          variant={item.status === 'active' ? 'default' : 
                                  item.status === 'pending' ? 'secondary' : 'outline'}
                        >
                          {item.status}
                        </Badge>
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="swaps" className="space-y-4">
            <h2 className="text-xl font-semibold">Recent Swaps & Redemptions</h2>
            
            <div className="grid gap-4">
              {recentSwaps.map((swap) => (
                <Card key={swap.id} className="card-hover">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center">
                          {swap.status === 'completed' ? (
                            <CheckCircle className="w-6 h-6 text-success" />
                          ) : swap.status === 'pending' ? (
                            <Clock className="w-6 h-6 text-warning" />
                          ) : (
                            <RefreshCw className="w-6 h-6 text-primary" />
                          )}
                        </div>
                        <div>
                          <h3 className="font-medium">{swap.item}</h3>
                          <p className="text-sm text-muted-foreground">
                            {swap.type === 'swap' ? `Swapped with ${swap.partner}` : swap.partner}
                          </p>
                        </div>
                      </div>
                      <Badge 
                        variant={swap.status === 'completed' ? 'default' : 
                                swap.status === 'pending' ? 'secondary' : 'outline'}
                      >
                        {swap.status.replace('-', ' ')}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="favorites" className="space-y-4">
            <h2 className="text-xl font-semibold">Saved Items</h2>
            
            <div className="text-center py-12">
              <Heart className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-muted-foreground mb-2">No favorites yet</h3>
              <p className="text-muted-foreground mb-4">Items you like will appear here</p>
              <Link to="/">
                <Button variant="outline">Browse Items</Button>
              </Link>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;