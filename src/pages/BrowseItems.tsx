import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Leaf,
  Heart,
  Star,
  Search,
  Shirt,
  Package,
  Filter,
  SlidersHorizontal,
  ChevronDown,
  Grid,
  List,
  MapPin,
  Clock,
  User,
  ArrowUpDown,
} from "lucide-react";

const BrowsePage = () => {
  // State for filtering and sorting
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedCondition, setSelectedCondition] = useState("All");
  const [sortBy, setSortBy] = useState("newest");
  const [viewMode, setViewMode] = useState("grid");
  const [showFilters, setShowFilters] = useState(false);

  // Sample items data - this would come from your API
  const [allItems, setAllItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      const { data, error } = await supabase
        .from("items")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching items:", error);
      } else {
        setAllItems(data);
      }

      setLoading(false);
    };

    fetchItems();
  }, []);

  const categories = [
    "All",
    "Tops",
    "Bottoms",
    "Dresses",
    "Outerwear",
    "Shoes",
    "Accessories",
  ];

  const conditions = [
    "All",
    "Like New",
    "Excellent",
    "Very Good",
    "Good",
    "Fair",
  ];

  const sortOptions = [
    { value: "newest", label: "Newest First" },
    { value: "oldest", label: "Oldest First" },
    { value: "points-high", label: "Points: High to Low" },
    { value: "points-low", label: "Points: Low to High" },
    { value: "alphabetical", label: "Alphabetical" },
  ];

  // Filter and sort items based on current state
  const filteredItems = allItems.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.user.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || item.category === selectedCategory;
    const matchesCondition =
      selectedCondition === "All" || item.condition === selectedCondition;

    return matchesSearch && matchesCategory && matchesCondition;
  });

  const sortedItems = [...filteredItems].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return new Date(b.postedDate) - new Date(a.postedDate);
      case "oldest":
        return new Date(a.postedDate) - new Date(b.postedDate);
      case "points-high":
        return b.points - a.points;
      case "points-low":
        return a.points - b.points;
      case "alphabetical":
        return a.title.localeCompare(b.title);
      default:
        return 0;
    }
  });

  // Handle item click - this would navigate to the item detail page
  const handleItemClick = (itemId) => {
    console.log(`Navigate to /item/${itemId}`);
    // In a real app, you'd use React Router: navigate(`/item/${itemId}`)
  };

  if (loading) {
    return (
      <div className="text-center py-20">
        <p className="text-muted-foreground">Loading items...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <Leaf className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-bold text-xl text-primary">ReWear</span>
            </div>

            <nav className="hidden md:flex items-center gap-6">
              <span className="text-primary font-medium">Browse</span>
              <span className="text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                How it Works
              </span>
              <span className="text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                Community
              </span>
            </nav>

            <div className="flex items-center gap-3">
              <Button variant="ghost">Login</Button>
              <Button className="btn-primary">Sign Up</Button>
            </div>
          </div>
        </div>
      </header>

      {/* Search and Filter Section */}
      <section className="border-b bg-card/30 py-6">
        <div className="container mx-auto px-4">
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search for clothes, brands, or users..."
                className="pl-10 pr-4 py-3 text-base"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Filter Controls */}
          <div className="flex flex-wrap items-center gap-4 justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2"
              >
                <Filter className="w-4 h-4" />
                Filters
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    showFilters ? "rotate-180" : ""
                  }`}
                />
              </Button>

              {/* Quick Category Filters */}
              <div className="hidden md:flex items-center gap-2">
                {categories.slice(0, 5).map((category) => (
                  <Button
                    key={category}
                    variant={
                      selectedCategory === category ? "default" : "outline"
                    }
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className="text-xs"
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Sort Dropdown */}
              <div className="flex items-center gap-2">
                <ArrowUpDown className="w-4 h-4 text-muted-foreground" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-background border border-border rounded px-3 py-1 text-sm"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* View Mode Toggle */}
              <div className="flex items-center border rounded">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="rounded-r-none"
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="rounded-l-none"
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Expanded Filters */}
          {showFilters && (
            <div className="mt-6 p-4 bg-card rounded-lg border">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Category
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full bg-background border border-border rounded px-3 py-2 text-sm"
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Condition
                  </label>
                  <select
                    value={selectedCondition}
                    onChange={(e) => setSelectedCondition(e.target.value)}
                    className="w-full bg-background border border-border rounded px-3 py-2 text-sm"
                  >
                    {conditions.map((condition) => (
                      <option key={condition} value={condition}>
                        {condition}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Size</label>
                  <select className="w-full bg-background border border-border rounded px-3 py-2 text-sm">
                    <option>All Sizes</option>
                    <option>XS</option>
                    <option>S</option>
                    <option>M</option>
                    <option>L</option>
                    <option>XL</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Results Section */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          {/* Results Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">
              {sortedItems.length} Items Found
            </h2>
            <div className="text-sm text-muted-foreground">
              {searchTerm && `Results for "${searchTerm}"`}
              {selectedCategory !== "All" && ` in ${selectedCategory}`}
            </div>
          </div>

          {/* Items Grid/List */}
          <div
            className={`grid gap-6 ${
              viewMode === "grid"
                ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                : "grid-cols-1"
            }`}
          >
            {sortedItems.map((item) => (
              <Card
                key={item.id}
                className="card-hover cursor-pointer"
                onClick={() => handleItemClick(item.id)}
              >
                <CardContent className="p-0">
                  {viewMode === "grid" ? (
                    // Grid View
                    <>
                      <div className="aspect-square bg-muted rounded-t-lg flex items-center justify-center">
                        {item.images && item.images.length > 0 ? (
                          <img
                            src={item.images[0]}
                            alt={item.title}
                            className="w-full h-full object-cover rounded-t-lg"
                          />
                        ) : (
                          <Shirt className="w-16 h-16 text-muted-foreground" />
                        )}
                      </div>
                      <div className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-medium text-sm line-clamp-2">
                            {item.title}
                          </h3>
                        </div>
                        <p className="text-xs text-muted-foreground mb-2">
                          {item.brand} • Size {item.size}
                        </p>
                        <div className="flex items-center gap-2 mb-2">
                          <User className="w-3 h-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">
                            {item.user}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 mb-3">
                          <MapPin className="w-3 h-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">
                            {item.location}
                          </span>
                          <Clock className="w-3 h-3 text-muted-foreground ml-2" />
                          <span className="text-xs text-muted-foreground">
                            {item.postedDate}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <Badge variant="outline" className="text-xs">
                            {item.condition}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {item.category}
                          </Badge>
                        </div>
                      </div>
                    </>
                  ) : (
                    // List View
                    <div className="p-4 flex items-center gap-4">
                      <div className="w-24 h-24 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
                        <Shirt className="w-8 h-8 text-muted-foreground" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-medium text-lg">{item.title}</h3>
                          <Badge variant="secondary" className="text-sm">
                            {item.points} pts
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          {item.brand} • Size {item.size} • {item.condition}
                        </p>
                        <p className="text-sm text-muted-foreground mb-2 line-clamp-1">
                          {item.description}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <User className="w-3 h-3" />
                            <span>{item.user}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            <span>{item.location}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            <span>{item.postedDate}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* No Results State */}
          {sortedItems.length === 0 && (
            <div className="text-center py-12">
              <Shirt className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No items found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search terms or filters
              </p>
              <Button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("All");
                  setSelectedCondition("All");
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default BrowsePage;
