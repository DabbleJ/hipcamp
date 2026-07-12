import { useState } from "react";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  CheckCircle2,
  Copy,
  DollarSign,
  Flame,
  Home,
  Mail,
  MapPin,
  Send,
  Sparkles,
  Star,
} from "lucide-react";

const hostSites = [
  {
    name: "Redwood Grove Campground",
    location: "Big Sur, CA",
    fit: "Farm dinners, stargazing, guided hikes",
    baseFee: 450,
    rating: 4.8,
    capacity: 48,
    amenities: ["Fire pit", "Picnic tables", "Restrooms", "Dark sky"],
  },
  {
    name: "Lavender Hill Farm",
    location: "Petaluma, CA",
    fit: "Yoga, sound baths, creative workshops",
    baseFee: 300,
    rating: 4.9,
    capacity: 28,
    amenities: ["Barn", "Meadow", "Parking", "Water"],
  },
  {
    name: "Juniper Ridge Ranch",
    location: "Bend, OR",
    fit: "Trail runs, clinics, micro-festivals",
    baseFee: 650,
    rating: 4.7,
    capacity: 80,
    amenities: ["Trail access", "Group area", "Showers", "Cabins"],
  },
];

const partners = [
  { name: "REI Co-op", email: "events@rei.example", status: "interested" },
  { name: "Local Trail Club", email: "lead@trailclub.example", status: "confirmed" },
  { name: "Campfire Chef Collective", email: "hello@campchef.example", status: "pending" },
];

const EventBuilder = () => {
  const [step, setStep] = useState(1);
  const [eventData, setEventData] = useState({
    title: "Redwood Supper & Stargazing",
    category: "farm-table",
    date: "",
    time: "18:00",
    capacity: 40,
    ticketPrice: 95,
    description: "A campfire dinner followed by a naturalist-led night walk under the redwoods.",
  });
  const [selectedSite, setSelectedSite] = useState(hostSites[0]);

  const grossRevenue = eventData.capacity * eventData.ticketPrice;
  const hostFee = selectedSite.baseFee;
  const estimatedMargin = grossRevenue - hostFee;

  const handleNextStep = () => {
    if (step < 4) setStep(step + 1);
  };

  const handlePrevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleShareEvent = () => {
    const shareUrl = `https://hipcamp.com/events/${Date.now()}`;
    navigator.clipboard.writeText(shareUrl);
    alert("Event preview link copied to clipboard!");
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return <Badge className="rounded-full bg-emerald-100 text-emerald-900 hover:bg-emerald-100">Confirmed</Badge>;
      case "interested":
        return <Badge className="rounded-full bg-blue-100 text-blue-900 hover:bg-blue-100">Interested</Badge>;
      default:
        return <Badge className="rounded-full bg-amber-100 text-amber-900 hover:bg-amber-100">Pending</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 text-slate-950">
      <header className="border-b border-stone-200 bg-stone-50/95 backdrop-blur">
        <div className="container mx-auto flex items-center justify-between px-4 py-5">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-700 text-white">
              <Flame className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-tight">Host a Hip Event</h1>
              <p className="text-sm text-slate-500">Create an outdoor experience listing for Hipcamp</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Badge className="hidden rounded-full bg-emerald-100 text-emerald-900 hover:bg-emerald-100 sm:inline-flex">
              <Sparkles className="mr-1 h-3 w-3" />
              Event builder
            </Badge>
            <Link to="/">
              <Button variant="outline" size="sm" className="rounded-full bg-white">
                <Home className="mr-2 h-4 w-4" />
                Home
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-5xl">
          <div className="mb-10 grid grid-cols-4 gap-2 sm:gap-4">
            {["Basics", "Site", "Tickets", "Publish"].map((label, index) => {
              const stepNumber = index + 1;
              const isActive = step >= stepNumber;
              return (
                <div key={label} className="flex items-center gap-2">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-black ${isActive ? "bg-emerald-700 text-white" : "bg-stone-200 text-slate-500"}`}>
                    {stepNumber}
                  </div>
                  <span className={`hidden text-sm font-bold sm:inline ${isActive ? "text-slate-950" : "text-slate-400"}`}>{label}</span>
                </div>
              );
            })}
          </div>

          <Card className="overflow-hidden rounded-[2rem] border-2 border-stone-200 bg-white shadow-xl">
            {step === 1 && (
              <CardContent className="p-6 md:p-8">
                <div className="mb-8 text-center">
                  <Badge className="mb-4 rounded-full bg-emerald-100 text-emerald-900 hover:bg-emerald-100">Step 1</Badge>
                  <h2 className="text-3xl font-black tracking-tight">Shape the experience</h2>
                  <p className="mt-3 text-lg text-slate-600">Define what guests will do, when it happens, and why it is worth booking.</p>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-3 md:col-span-2">
                    <Label htmlFor="title">Event title</Label>
                    <Input
                      id="title"
                      value={eventData.title}
                      onChange={(event) => setEventData({ ...eventData, title: event.target.value })}
                      className="h-12 rounded-2xl"
                    />
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="category">Experience category</Label>
                    <Select value={eventData.category} onValueChange={(value) => setEventData({ ...eventData, category: value })}>
                      <SelectTrigger id="category" className="h-12 rounded-2xl">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="farm-table">Farm-to-campfire dinner</SelectItem>
                        <SelectItem value="guided-adventure">Guided adventure</SelectItem>
                        <SelectItem value="stargazing">Stargazing & nature night</SelectItem>
                        <SelectItem value="wellness">Wellness retreat</SelectItem>
                        <SelectItem value="workshop">Outdoor skill workshop</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="capacity">Guest capacity</Label>
                    <Input
                      id="capacity"
                      type="number"
                      value={eventData.capacity}
                      onChange={(event) => setEventData({ ...eventData, capacity: Number(event.target.value) })}
                      className="h-12 rounded-2xl"
                    />
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="date">Date</Label>
                    <Input
                      id="date"
                      type="date"
                      value={eventData.date}
                      onChange={(event) => setEventData({ ...eventData, date: event.target.value })}
                      className="h-12 rounded-2xl"
                    />
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="time">Start time</Label>
                    <Input
                      id="time"
                      type="time"
                      value={eventData.time}
                      onChange={(event) => setEventData({ ...eventData, time: event.target.value })}
                      className="h-12 rounded-2xl"
                    />
                  </div>
                  <div className="space-y-3 md:col-span-2">
                    <Label htmlFor="description">Guest-facing description</Label>
                    <Textarea
                      id="description"
                      value={eventData.description}
                      onChange={(event) => setEventData({ ...eventData, description: event.target.value })}
                      rows={4}
                      className="rounded-2xl"
                    />
                  </div>
                </div>
              </CardContent>
            )}

            {step === 2 && (
              <CardContent className="p-6 md:p-8">
                <div className="mb-8 text-center">
                  <Badge className="mb-4 rounded-full bg-emerald-100 text-emerald-900 hover:bg-emerald-100">Step 2</Badge>
                  <h2 className="text-3xl font-black tracking-tight">Choose an event-ready Hipcamp</h2>
                  <p className="mt-3 text-lg text-slate-600">Match the experience with a host property that can support the format.</p>
                </div>

                <div className="grid gap-5 md:grid-cols-3">
                  {hostSites.map((site) => (
                    <Card
                      key={site.name}
                      onClick={() => setSelectedSite(site)}
                      className={`cursor-pointer rounded-3xl transition hover:-translate-y-1 hover:shadow-lg ${selectedSite.name === site.name ? "border-2 border-emerald-600" : "border border-stone-200"}`}
                    >
                      <CardHeader>
                        <div className="mb-3 flex h-32 items-end rounded-3xl bg-emerald-900 p-4 text-white">
                          <MapPin className="mr-2 h-5 w-5" />
                          <span className="text-sm font-bold">{site.location}</span>
                        </div>
                        <CardTitle className="text-lg font-black">{site.name}</CardTitle>
                        <CardDescription>{site.fit}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="mb-4 flex items-center justify-between">
                          <span className="flex items-center text-sm font-bold text-amber-600"><Star className="mr-1 h-4 w-4" />{site.rating}</span>
                          <span className="text-sm text-slate-500">Up to {site.capacity} guests</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {site.amenities.slice(0, 3).map((amenity) => (
                            <Badge key={amenity} variant="secondary" className="rounded-full">{amenity}</Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            )}

            {step === 3 && (
              <CardContent className="p-6 md:p-8">
                <div className="mb-8 text-center">
                  <Badge className="mb-4 rounded-full bg-emerald-100 text-emerald-900 hover:bg-emerald-100">Step 3</Badge>
                  <h2 className="text-3xl font-black tracking-tight">Set tickets and partners</h2>
                  <p className="mt-3 text-lg text-slate-600">Price the event, estimate host revenue, and coordinate partner distribution.</p>
                </div>

                <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
                  <Card className="rounded-3xl border-2 border-emerald-200 bg-emerald-50">
                    <CardHeader>
                      <CardTitle className="flex items-center text-xl font-black"><DollarSign className="mr-2 h-5 w-5" />Ticket economics</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-5">
                      <div className="space-y-3">
                        <Label htmlFor="ticketPrice">Ticket price</Label>
                        <Input
                          id="ticketPrice"
                          type="number"
                          value={eventData.ticketPrice}
                          onChange={(event) => setEventData({ ...eventData, ticketPrice: Number(event.target.value) })}
                          className="h-12 rounded-2xl bg-white"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="rounded-2xl bg-white p-4">
                          <p className="text-xs font-medium text-slate-500">Gross revenue</p>
                          <p className="mt-1 text-2xl font-black text-slate-950">${grossRevenue.toLocaleString()}</p>
                        </div>
                        <div className="rounded-2xl bg-white p-4">
                          <p className="text-xs font-medium text-slate-500">Host/site fee</p>
                          <p className="mt-1 text-2xl font-black text-slate-950">${hostFee.toLocaleString()}</p>
                        </div>
                        <div className="col-span-2 rounded-2xl bg-emerald-700 p-4 text-white">
                          <p className="text-xs font-medium text-emerald-100">Estimated margin before staffing</p>
                          <p className="mt-1 text-3xl font-black">${estimatedMargin.toLocaleString()}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label>Partner distribution</Label>
                      <Badge className="rounded-full bg-amber-100 text-amber-900 hover:bg-amber-100">3 partners</Badge>
                    </div>
                    {partners.map((partner) => (
                      <Card key={partner.name} className="rounded-3xl border border-stone-200">
                        <CardContent className="flex items-center justify-between p-4">
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarFallback>{partner.name.split(" ").map((word) => word[0]).join("").slice(0, 2)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-black text-slate-950">{partner.name}</p>
                              <p className="text-sm text-slate-500">{partner.email}</p>
                            </div>
                          </div>
                          {getStatusBadge(partner.status)}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </CardContent>
            )}

            {step === 4 && (
              <CardContent className="p-6 text-center md:p-10">
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-700 text-white">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <h2 className="text-3xl font-black tracking-tight">Event listing ready to publish</h2>
                <p className="mx-auto mt-3 max-w-2xl text-lg leading-8 text-slate-600">
                  Your Hip Event has the core pieces: guest promise, event-ready host property, tickets, and partner distribution.
                </p>

                <Card className="mx-auto my-8 max-w-2xl rounded-3xl border-2 border-emerald-200 bg-emerald-50 text-left">
                  <CardContent className="space-y-4 p-6">
                    <div className="flex justify-between gap-4">
                      <span className="text-slate-600">Event</span>
                      <span className="font-black text-slate-950">{eventData.title}</span>
                    </div>
                    <div className="flex justify-between gap-4">
                      <span className="text-slate-600">Host site</span>
                      <span className="font-black text-slate-950">{selectedSite.name}</span>
                    </div>
                    <div className="flex justify-between gap-4">
                      <span className="text-slate-600">Capacity</span>
                      <span className="font-black text-slate-950">{eventData.capacity} guests</span>
                    </div>
                    <div className="flex justify-between gap-4">
                      <span className="text-slate-600">Ticket price</span>
                      <span className="font-black text-emerald-700">${eventData.ticketPrice}</span>
                    </div>
                  </CardContent>
                </Card>

                <div className="flex flex-wrap justify-center gap-4">
                  <Button className="rounded-full bg-emerald-700 px-6 text-white hover:bg-emerald-800" onClick={handleShareEvent}>
                    <Copy className="mr-2 h-4 w-4" />
                    Copy preview link
                  </Button>
                  <Button variant="outline" className="rounded-full bg-white px-6">
                    <Mail className="mr-2 h-4 w-4" />
                    Send to partners
                  </Button>
                </div>
              </CardContent>
            )}

            <div className="flex justify-between border-t border-stone-200 p-6 md:p-8">
              <Button variant="outline" onClick={handlePrevStep} disabled={step === 1} className="rounded-full bg-white px-6">
                Previous
              </Button>
              {step < 4 ? (
                <Button onClick={handleNextStep} className="rounded-full bg-emerald-700 px-6 text-white hover:bg-emerald-800">
                  {step === 3 && <Send className="mr-2 h-4 w-4" />}
                  {step === 3 ? "Prepare publish" : "Next step"}
                </Button>
              ) : (
                <Button onClick={() => setStep(1)} className="rounded-full bg-emerald-700 px-6 text-white hover:bg-emerald-800">
                  Create another event
                </Button>
              )}
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default EventBuilder;
