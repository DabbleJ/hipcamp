import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Users, 
  Calendar, 
  MapPin, 
  DollarSign, 
  Plus,
  Send,
  CheckCircle2,
  Clock,
  Star,
  Share2,
  Copy,
  Mail,
  Phone,
  LogOut,
  Home
} from "lucide-react";
import { Link } from "react-router-dom";

const GroupTripPlanner = () => {
  const { logout } = useAuth();

  const [step, setStep] = useState(1);
  const [tripData, setTripData] = useState({
    destination: "",
    dates: { start: "", end: "" },
    groupSize: 8,
    budget: 500,
    description: "",
    invitees: [
      { name: "Sarah Johnson", email: "sarah@email.com", status: "accepted" },
      { name: "Mike Chen", email: "mike@email.com", status: "pending" },
      { name: "Emma Davis", email: "emma@email.com", status: "pending" }
    ]
  });

  const [selectedSite, setSelectedSite] = useState({
    name: "Redwood Grove Campground",
    location: "Big Sur, CA",
    price: 85,
    rating: 4.8,
    image: "/api/placeholder/400/300",
    amenities: ["Fire pit", "Picnic table", "Restrooms", "Water access"]
  });

  const popularSites = [
    {
      name: "Redwood Grove Campground",
      location: "Big Sur, CA",
      price: 85,
      rating: 4.8,
      image: "/api/placeholder/400/300",
      amenities: ["Fire pit", "Picnic table", "Restrooms", "Water access"]
    },
    {
      name: "Mountain View Retreat",
      location: "Yosemite, CA",
      price: 120,
      rating: 4.9,
      image: "/api/placeholder/400/300",
      amenities: ["Hot tub", "Kitchen", "WiFi", "Hiking trails"]
    },
    {
      name: "Lakeside Paradise",
      location: "Lake Tahoe, CA",
      price: 95,
      rating: 4.7,
      image: "/api/placeholder/400/300",
      amenities: ["Lake access", "Boat rental", "Fishing", "Beach"]
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "accepted":
        return <CheckCircle2 className="w-4 h-4 text-emerald-600" />;
      case "pending":
        return <Clock className="w-4 h-4 text-amber-600" />;
      default:
        return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "accepted":
        return <Badge className="bg-emerald-100 text-emerald-800">Accepted</Badge>;
      case "pending":
        return <Badge className="bg-amber-100 text-amber-800">Pending</Badge>;
      default:
        return <Badge variant="outline">Invited</Badge>;
    }
  };

  const handleNextStep = () => {
    if (step < 4) setStep(step + 1);
  };

  const handlePrevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleAddInvitee = () => {
    const newInvitee = {
      name: "New Friend",
      email: "friend@email.com",
      status: "pending"
    };
    setTripData({
      ...tripData,
      invitees: [...tripData.invitees, newInvitee]
    });
  };

  const handleShareTrip = () => {
    const shareUrl = `https://hipcamp.com/group-trip/${Date.now()}`;
    navigator.clipboard.writeText(shareUrl);
    alert("Trip link copied to clipboard!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-emerald-50/30 to-amber-50/30">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
                          <Users className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h1 className="text-2xl font-bold text-gray-900">Group Trip Planner</h1>
                          <p className="text-gray-600">Organize your next outdoor adventure</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge className="bg-emerald-100 text-emerald-800">
                          <CheckCircle2 className="w-3 h-3 mr-1" />
                          Beta
                        </Badge>
                        <Link to="/">
                          <Button variant="outline" size="sm">
                            <Home className="w-4 h-4 mr-2" />
                            Home
                          </Button>
                        </Link>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={logout}
                          className="text-gray-600 hover:text-gray-900"
                        >
                          <LogOut className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
        </div>
      </header>

      {/* Progress Steps */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            {[1, 2, 3, 4].map((stepNum) => (
              <div key={stepNum} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                  step >= stepNum 
                    ? 'bg-emerald-600 text-white' 
                    : 'bg-gray-200 text-gray-500'
                }`}>
                  {stepNum}
                </div>
                {stepNum < 4 && (
                  <div className={`w-24 h-1 mx-2 ${
                    step > stepNum ? 'bg-emerald-600' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>

          {/* Step Content */}
          <div className="bg-white rounded-2xl shadow-xl border-2 border-gray-100 overflow-hidden">
            {step === 1 && (
              <div className="p-8">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">Plan Your Group Trip</h2>
                  <p className="text-gray-600 text-lg">Start by selecting your destination and dates</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="space-y-4">
                    <Label htmlFor="destination">Where do you want to go?</Label>
                    <Select value={tripData.destination} onValueChange={(value) => setTripData({...tripData, destination: value})}>
                      <SelectTrigger id="destination">
                        <MapPin className="w-4 h-4 mr-2" />
                        <SelectValue placeholder="Choose a destination" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="big-sur">Big Sur, CA</SelectItem>
                        <SelectItem value="yosemite">Yosemite, CA</SelectItem>
                        <SelectItem value="tahoe">Lake Tahoe, CA</SelectItem>
                        <SelectItem value="joshua-tree">Joshua Tree, CA</SelectItem>
                        <SelectItem value="oregon">Oregon Coast</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-4">
                    <Label htmlFor="group-size">Group Size</Label>
                    <Select value={tripData.groupSize.toString()} onValueChange={(value) => setTripData({...tripData, groupSize: parseInt(value)})}>
                      <SelectTrigger id="group-size">
                        <Users className="w-4 h-4 mr-2" />
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="4">4 people</SelectItem>
                        <SelectItem value="6">6 people</SelectItem>
                        <SelectItem value="8">8 people</SelectItem>
                        <SelectItem value="10">10 people</SelectItem>
                        <SelectItem value="12">12+ people</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="space-y-4">
                    <Label htmlFor="start-date">Start Date</Label>
                    <Input 
                      id="start-date" 
                      type="date" 
                      value={tripData.dates.start}
                      onChange={(e) => setTripData({...tripData, dates: {...tripData.dates, start: e.target.value}})}
                    />
                  </div>
                  <div className="space-y-4">
                    <Label htmlFor="end-date">End Date</Label>
                    <Input 
                      id="end-date" 
                      type="date" 
                      value={tripData.dates.end}
                      onChange={(e) => setTripData({...tripData, dates: {...tripData.dates, end: e.target.value}})}
                    />
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  <Label htmlFor="budget">Budget per person</Label>
                  <div className="flex items-center gap-4">
                    <DollarSign className="w-5 h-5 text-gray-400" />
                    <Input 
                      id="budget" 
                      type="number" 
                      value={tripData.budget}
                      onChange={(e) => setTripData({...tripData, budget: parseInt(e.target.value)})}
                      className="max-w-xs"
                    />
                    <span className="text-gray-600">per person</span>
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  <Label htmlFor="description">Trip Description</Label>
                  <Textarea 
                    id="description"
                    placeholder="What's the occasion? Weekend getaway, birthday celebration, trail running retreat..."
                    value={tripData.description}
                    onChange={(e) => setTripData({...tripData, description: e.target.value})}
                    rows={3}
                  />
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="p-8">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Site</h2>
                  <p className="text-gray-600 text-lg">Select the perfect spot for your group</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  {popularSites.map((site, index) => (
                    <Card 
                      key={index} 
                      className={`cursor-pointer transition-all hover:shadow-lg ${
                        selectedSite.name === site.name ? 'border-2 border-emerald-500 ring-4 ring-emerald-500/20' : 'border border-gray-200'
                      }`}
                      onClick={() => setSelectedSite(site)}
                    >
                      <CardHeader className="pb-3">
                        <div className="w-full h-32 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-lg mb-3" />
                        <CardTitle className="text-lg">{site.name}</CardTitle>
                        <CardDescription className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          {site.location}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center">
                            <Star className="w-4 h-4 text-amber-500 mr-1" />
                            <span className="font-medium">{site.rating}</span>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-bold text-emerald-600">${site.price}</p>
                            <p className="text-xs text-gray-500">per night</p>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {site.amenities.slice(0, 3).map((amenity, i) => (
                            <Badge key={i} variant="secondary" className="text-xs">
                              {amenity}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {selectedSite && (
                  <Card className="border-2 border-emerald-200 bg-emerald-50/30">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900">{selectedSite.name}</h3>
                          <p className="text-gray-600 flex items-center">
                            <MapPin className="w-4 h-4 mr-1" />
                            {selectedSite.location}
                          </p>
                        </div>
                        <Badge className="bg-emerald-100 text-emerald-800">
                          Selected
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Total Cost</p>
                          <p className="text-2xl font-bold text-emerald-600">
                            ${selectedSite.price * tripData.groupSize}
                          </p>
                          <p className="text-xs text-gray-500">
                            ${selectedSite.price} × {tripData.groupSize} people
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Per Person</p>
                          <p className="text-2xl font-bold text-gray-900">
                            ${selectedSite.price}
                          </p>
                          <p className="text-xs text-gray-500">per night</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}

            {step === 3 && (
              <div className="p-8">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">Invite Your Group</h2>
                  <p className="text-gray-600 text-lg">Add friends and split the cost</p>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center justify-between">
                    <Label>Group Members</Label>
                    <Button variant="outline" size="sm" onClick={handleAddInvitee}>
                      <Plus className="w-4 h-4 mr-1" />
                      Add Person
                    </Button>
                  </div>

                  {tripData.invitees.map((invitee, index) => (
                    <Card key={index} className="border border-gray-200">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarFallback>
                                {invitee.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium text-gray-900">{invitee.name}</p>
                              <p className="text-sm text-gray-500">{invitee.email}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {getStatusIcon(invitee.status)}
                            {getStatusBadge(invitee.status)}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <Card className="border-2 border-emerald-200 bg-emerald-50/30">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-lg text-gray-900 mb-4">Payment Split</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Total Cost</span>
                        <span className="font-semibold">${selectedSite.price * tripData.groupSize}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Per Person</span>
                        <span className="font-semibold text-emerald-600">${selectedSite.price}</span>
                      </div>
                      <div className="border-t pt-3">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">Your Share</span>
                          <span className="font-bold text-lg text-emerald-600">${selectedSite.price}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="flex gap-4 mt-6">
                  <Button variant="outline" className="flex-1" onClick={handleShareTrip}>
                    <Share2 className="w-4 h-4 mr-2" />
                    Share Trip Link
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Copy className="w-4 h-4 mr-2" />
                    Copy Details
                  </Button>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Trip Created!</h2>
                <p className="text-gray-600 text-lg mb-8">
                  Your group trip is ready. Invitations have been sent and everyone can now book their spot.
                </p>

                <Card className="border-2 border-emerald-200 bg-emerald-50/30 mb-8">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-lg text-gray-900 mb-4">Trip Summary</h3>
                    <div className="space-y-3 text-left">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Destination:</span>
                        <span className="font-medium">{selectedSite.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Dates:</span>
                        <span className="font-medium">{tripData.dates.start} - {tripData.dates.end}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Group Size:</span>
                        <span className="font-medium">{tripData.groupSize} people</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Total Cost:</span>
                        <span className="font-bold text-emerald-600">${selectedSite.price * tripData.groupSize}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="flex gap-4 justify-center">
                  <Button className="bg-emerald-600 hover:bg-emerald-700">
                    <Calendar className="w-4 h-4 mr-2" />
                    Add to Calendar
                  </Button>
                  <Button variant="outline">
                    <Mail className="w-4 h-4 mr-2" />
                    Send Reminders
                  </Button>
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between p-8 border-t border-gray-200">
              <Button 
                variant="outline" 
                onClick={handlePrevStep}
                disabled={step === 1}
                className="rounded-full px-6"
              >
                Previous
              </Button>
              
              {step < 4 ? (
                <Button 
                  onClick={handleNextStep}
                  className="bg-emerald-600 hover:bg-emerald-700 rounded-full px-6"
                >
                  {step === 3 ? <Send className="w-4 h-4 mr-2" /> : null}
                  {step === 3 ? "Send Invitations" : "Next Step"}
                </Button>
              ) : (
                <Button 
                  onClick={() => setStep(1)}
                  className="bg-emerald-600 hover:bg-emerald-700 rounded-full px-6"
                >
                  Plan Another Trip
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupTripPlanner;