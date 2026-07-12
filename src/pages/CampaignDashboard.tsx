import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowUpRight,
  CalendarDays,
  CheckCircle2,
  Clock,
  Flame,
  Home,
  MapPin,
  MoreHorizontal,
  Mountain,
  MoonStar,
  Plus,
  Sparkles,
  Ticket,
  Utensils,
  Waves,
} from "lucide-react";

const events = [
  {
    id: 1,
    name: "Redwood Supper & Stargazing",
    type: "farm-table",
    status: "live",
    location: "Big Sur, CA",
    date: "Aug 16",
    capacity: 48,
    booked: 39,
    waitlist: 12,
    revenue: 3705,
    host: "Redwood Grove Campground",
  },
  {
    id: 2,
    name: "Beginner Backpacking Clinic",
    type: "skill-shops",
    status: "live",
    location: "Mt. Hood, OR",
    date: "Aug 23",
    capacity: 30,
    booked: 22,
    waitlist: 4,
    revenue: 1980,
    host: "Fern Valley Basecamp",
  },
  {
    id: 3,
    name: "Trail Run Campout Weekend",
    type: "guided-adventures",
    status: "sold-out",
    location: "Bend, OR",
    date: "Sep 6",
    capacity: 60,
    booked: 60,
    waitlist: 27,
    revenue: 7200,
    host: "Juniper Ridge Ranch",
  },
  {
    id: 4,
    name: "Morning Yoga on the Farm",
    type: "wellness-retreats",
    status: "draft",
    location: "Petaluma, CA",
    date: "Sep 14",
    capacity: 24,
    booked: 0,
    waitlist: 0,
    revenue: 0,
    host: "Lavender Hill Farm",
  },
  {
    id: 5,
    name: "Dark Sky Family Night",
    type: "stargazing",
    status: "live",
    location: "Joshua Tree, CA",
    date: "Sep 21",
    capacity: 40,
    booked: 31,
    waitlist: 8,
    revenue: 2480,
    host: "Desert Moon Camp",
  },
];

const typeIcons: Record<string, typeof Mountain> = {
  "guided-adventures": Mountain,
  "farm-table": Utensils,
  "skill-shops": Sparkles,
  "wellness-retreats": Waves,
  stargazing: MoonStar,
};

const typeColors: Record<string, string> = {
  "guided-adventures": "bg-emerald-700",
  "farm-table": "bg-amber-700",
  "skill-shops": "bg-lime-700",
  "wellness-retreats": "bg-teal-700",
  stargazing: "bg-indigo-700",
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case "live":
      return <Badge className="rounded-full bg-emerald-100 text-emerald-900 hover:bg-emerald-100"><CheckCircle2 className="mr-1 h-3 w-3" />Live</Badge>;
    case "sold-out":
      return <Badge className="rounded-full bg-amber-100 text-amber-900 hover:bg-amber-100"><Ticket className="mr-1 h-3 w-3" />Sold out</Badge>;
    case "draft":
      return <Badge className="rounded-full bg-slate-100 text-slate-700 hover:bg-slate-100"><Clock className="mr-1 h-3 w-3" />Draft</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

const EventDashboard = () => {
  const liveEvents = events.filter((event) => event.status === "live");
  const totalBooked = events.reduce((sum, event) => sum + event.booked, 0);
  const totalCapacity = events.reduce((sum, event) => sum + event.capacity, 0);
  const totalRevenue = events.reduce((sum, event) => sum + event.revenue, 0);
  const totalWaitlist = events.reduce((sum, event) => sum + event.waitlist, 0);
  const sellThrough = Math.round((totalBooked / totalCapacity) * 100);

  const renderEventCard = (event: (typeof events)[number]) => {
    const Icon = typeIcons[event.type] ?? CalendarDays;
    const color = typeColors[event.type] ?? "bg-emerald-700";
    const eventProgress = Math.round((event.booked / event.capacity) * 100);

    return (
      <Card key={event.id} className="rounded-3xl border-2 border-stone-200 bg-white transition hover:-translate-y-0.5 hover:shadow-lg">
        <CardContent className="p-6">
          <div className="mb-5 flex items-start justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl ${color} text-white`}>
                <Icon className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-950">{event.name}</h3>
                <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-slate-500">
                  {getStatusBadge(event.status)}
                  <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{event.location}</span>
                  <span className="flex items-center gap-1"><CalendarDays className="h-3.5 w-3.5" />{event.date}</span>
                </div>
              </div>
            </div>
            <Button variant="ghost" size="icon" className="rounded-full">
              <MoreHorizontal className="h-5 w-5" />
            </Button>
          </div>

          <div className="mb-5">
            <div className="mb-2 flex justify-between text-sm">
              <span className="font-medium text-slate-600">Tickets booked</span>
              <span className="font-black text-slate-950">{event.booked}/{event.capacity}</span>
            </div>
            <Progress value={eventProgress} className="h-2" />
          </div>

          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            <div className="rounded-2xl bg-stone-100 p-3">
              <p className="text-xs font-medium text-slate-500">Revenue</p>
              <p className="mt-1 text-lg font-black text-slate-950">${event.revenue.toLocaleString()}</p>
            </div>
            <div className="rounded-2xl bg-stone-100 p-3">
              <p className="text-xs font-medium text-slate-500">Waitlist</p>
              <p className="mt-1 text-lg font-black text-slate-950">{event.waitlist}</p>
            </div>
            <div className="rounded-2xl bg-stone-100 p-3 md:col-span-2">
              <p className="text-xs font-medium text-slate-500">Host property</p>
              <p className="mt-1 truncate text-lg font-black text-slate-950">{event.host}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-stone-50 text-slate-950">
      <header className="sticky top-0 z-10 border-b border-stone-200 bg-stone-50/95 backdrop-blur">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-700 text-white">
              <Flame className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-tight">Hip Events Dashboard</h1>
              <p className="text-sm text-slate-500">Track ticket sales, host revenue, and event demand</p>
            </div>
          </div>
          <div className="flex gap-2 sm:gap-3">
            <Link to="/">
              <Button variant="outline" size="sm" className="rounded-full bg-white">
                <Home className="mr-2 h-4 w-4" />
                Home
              </Button>
            </Link>
            <Link to="/host-event">
              <Button size="sm" className="rounded-full bg-emerald-700 text-white hover:bg-emerald-800">
                <Plus className="mr-2 h-4 w-4" />
                New event
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 grid gap-5 md:grid-cols-4">
          <Card className="rounded-3xl border-2 border-emerald-200 bg-white">
            <CardHeader className="pb-3">
              <CardDescription>Tickets booked</CardDescription>
              <CardTitle className="text-3xl font-black">{totalBooked}</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center text-sm font-medium text-emerald-700">
              <ArrowUpRight className="mr-1 h-4 w-4" />
              +31 this week
            </CardContent>
          </Card>
          <Card className="rounded-3xl border-2 border-amber-200 bg-white">
            <CardHeader className="pb-3">
              <CardDescription>Event revenue</CardDescription>
              <CardTitle className="text-3xl font-black">${totalRevenue.toLocaleString()}</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center text-sm font-medium text-amber-700">
              <ArrowUpRight className="mr-1 h-4 w-4" />
              +$2.6k this week
            </CardContent>
          </Card>
          <Card className="rounded-3xl border-2 border-indigo-200 bg-white">
            <CardHeader className="pb-3">
              <CardDescription>Waitlist demand</CardDescription>
              <CardTitle className="text-3xl font-black">{totalWaitlist}</CardTitle>
            </CardHeader>
            <CardContent className="text-sm font-medium text-indigo-700">Signals expansion opportunities</CardContent>
          </Card>
          <Card className="rounded-3xl border-2 border-teal-200 bg-white">
            <CardHeader className="pb-3">
              <CardDescription>Sell-through</CardDescription>
              <CardTitle className="text-3xl font-black">{sellThrough}%</CardTitle>
            </CardHeader>
            <CardContent>
              <Progress value={sellThrough} className="h-2" />
              <p className="mt-2 text-xs text-slate-500">{totalBooked} of {totalCapacity} tickets</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-6 rounded-2xl bg-stone-200 p-1">
            <TabsTrigger value="all" className="rounded-xl">All events</TabsTrigger>
            <TabsTrigger value="live" className="rounded-xl">Live</TabsTrigger>
            <TabsTrigger value="sold-out" className="rounded-xl">Sold out</TabsTrigger>
            <TabsTrigger value="draft" className="rounded-xl">Drafts</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {events.map(renderEventCard)}
          </TabsContent>
          <TabsContent value="live" className="space-y-4">
            {liveEvents.map(renderEventCard)}
          </TabsContent>
          <TabsContent value="sold-out" className="space-y-4">
            {events.filter((event) => event.status === "sold-out").map(renderEventCard)}
          </TabsContent>
          <TabsContent value="draft" className="space-y-4">
            {events.filter((event) => event.status === "draft").map(renderEventCard)}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default EventDashboard;
