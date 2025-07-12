import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { 
  Shield, 
  Users, 
  Package, 
  AlertTriangle, 
  CheckCircle, 
  XCircle,
  Search,
  MoreHorizontal,
  Eye,
  Shirt,
  TrendingUp,
  Clock
} from "lucide-react";

const AdminPanel = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Mock data
  const stats = {
    totalUsers: 1245,
    activeListings: 348,
    pendingReviews: 23,
    completedSwaps: 892
  };

  const pendingItems = [
    {
      id: 1,
      title: "Vintage Band T-Shirt",
      user: "Mike Johnson",
      category: "Tops",
      submittedDate: "2024-01-15",
      status: "pending",
      flagged: false
    },
    {
      id: 2,
      title: "Designer Handbag",
      user: "Sarah Wilson",
      category: "Accessories",
      submittedDate: "2024-01-14",
      status: "pending",
      flagged: true
    },
    {
      id: 3,
      title: "Winter Boots",
      user: "Alex Chen",
      category: "Shoes",
      submittedDate: "2024-01-14",
      status: "pending",
      flagged: false
    }
  ];

  const users = [
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah@example.com",
      joinDate: "2024-01-10",
      totalSwaps: 18,
      status: "active",
      reports: 0
    },
    {
      id: 2,
      name: "Mike Davis",
      email: "mike@example.com",
      joinDate: "2024-01-08",
      totalSwaps: 12,
      status: "active",
      reports: 1
    },
    {
      id: 3,
      name: "Emma Wilson",
      email: "emma@example.com",
      joinDate: "2024-01-05",
      totalSwaps: 25,
      status: "suspended",
      reports: 3
    }
  ];

  const handleApproveItem = (itemId: number) => {
    console.log("Approved item:", itemId);
  };

  const handleRejectItem = (itemId: number) => {
    console.log("Rejected item:", itemId);
  };

  const handleUserAction = (userId: number, action: string) => {
    console.log(`${action} user:`, userId);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Admin Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Shield className="w-6 h-6 text-primary" />
                <h1 className="text-xl font-bold">ReWear Admin</h1>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-primary/10">
                Administrator
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Users</p>
                  <p className="text-2xl font-bold">{stats.totalUsers}</p>
                </div>
                <Users className="w-8 h-8 text-primary/60" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Listings</p>
                  <p className="text-2xl font-bold">{stats.activeListings}</p>
                </div>
                <Package className="w-8 h-8 text-success/60" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Pending Reviews</p>
                  <p className="text-2xl font-bold text-warning">{stats.pendingReviews}</p>
                </div>
                <Clock className="w-8 h-8 text-warning/60" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Completed Swaps</p>
                  <p className="text-2xl font-bold">{stats.completedSwaps}</p>
                </div>
                <TrendingUp className="w-8 h-8 text-accent/60" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Admin Tabs */}
        <Tabs defaultValue="pending" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="pending">Pending Items</TabsTrigger>
            <TabsTrigger value="users">Manage Users</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          {/* Pending Items Tab */}
          <TabsContent value="pending" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Items Awaiting Review</h2>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search items..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {pendingItems.map((item) => (
                <Card key={item.id} className={`${item.flagged ? 'border-warning' : ''}`}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center">
                          <Shirt className="w-8 h-8 text-muted-foreground" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-medium">{item.title}</h3>
                            {item.flagged && (
                              <Badge variant="destructive" className="text-xs">
                                <AlertTriangle className="w-3 h-3 mr-1" />
                                Flagged
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Listed by {item.user} • {item.category} • {item.submittedDate}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          className="btn-primary"
                          onClick={() => handleApproveItem(item.id)}
                        >
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Approve
                        </Button>
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={() => handleRejectItem(item.id)}
                        >
                          <XCircle className="w-4 h-4 mr-2" />
                          Reject
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">User Management</h2>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search users..."
                    className="pl-10"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {users.map((user) => (
                <Card key={user.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                          <span className="font-medium text-primary">
                            {user.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-medium">{user.name}</h3>
                            <Badge 
                              variant={user.status === 'active' ? 'default' : 
                                      user.status === 'suspended' ? 'destructive' : 'secondary'}
                            >
                              {user.status}
                            </Badge>
                            {user.reports > 0 && (
                              <Badge variant="destructive" className="text-xs">
                                {user.reports} reports
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {user.email} • Joined {user.joinDate} • {user.totalSwaps} swaps
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        {user.status === 'active' ? (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleUserAction(user.id, 'suspend')}
                          >
                            Suspend
                          </Button>
                        ) : (
                          <Button 
                            size="sm"
                            onClick={() => handleUserAction(user.id, 'activate')}
                          >
                            Activate
                          </Button>
                        )}
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Reports Tab */}
          <TabsContent value="reports" className="space-y-4">
            <div className="text-center py-12">
              <AlertTriangle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-muted-foreground mb-2">No pending reports</h3>
              <p className="text-muted-foreground">All reports have been resolved</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminPanel;