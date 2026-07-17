import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowUpRight,
  BrainCircuit,
  CalendarDays,
  Camera,
  CheckCircle2,
  Clock,
  Code2,
  Database,
  Flame,
  GitBranch,
  Home,
  MapPin,
  MessageSquareReply,
  MoreHorizontal,
  Mountain,
  MoonStar,
  Plus,
  Sparkles,
  Ticket,
  TrendingUp,
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

const mlSignals = [
  {
    label: "Host response velocity",
    icon: MessageSquareReply,
    lift: "+22% bookings",
    confidence: "0.87",
    copy: "Faster host replies predict more completed bookings and stronger review sentiment.",
    bars: [64, 78, 91],
  },
  {
    label: "Photo depth + UGC share",
    icon: Camera,
    lift: "+18% revenue",
    confidence: "0.82",
    copy: "More listing photos, especially guest-uploaded photos, correlate with conversion and booking value.",
    bars: [52, 73, 84],
  },
  {
    label: "Dynamic pricing opt-in",
    icon: TrendingUp,
    lift: "+31% event-assisted revenue",
    confidence: "0.79",
    copy: "Hipcamp-set dynamic pricing expands yield when compared against hosts not running Hip Events.",
    bars: [48, 68, 86],
  },
  {
    label: "Post-event repeat intent",
    icon: GitBranch,
    lift: "+14% follow-up stays",
    confidence: "0.76",
    copy: "Guests who attend events are more likely to book a future overnight stay at the property.",
    bars: [44, 61, 75],
  },
];

const sqlPreview = [
  "WITH event_guests AS (",
  "  SELECT host_id, guest_id, attended_event, follow_up_booking",
  "  FROM hip_events.guest_journeys",
  "), model_features AS (",
  "  SELECT response_mins, host_photos, user_photo_pct, dynamic_pricing",
  "  FROM marketplace.host_quality_signals",
  ")",
  "SELECT corr(feature_value, completed_bookings) AS booking_lift;",
];

const correlationInsights = [
  {
    title: "Responsiveness → bookings + reviews",
    icon: MessageSquareReply,
    query: "corr(response_mins, completed_bookings, avg_review_score)",
    lift: "+22% completed bookings",
    secondary: "+0.34 review sentiment",
    detail: "Hosts replying fastest show stronger conversion and more positive guest review language.",
    strength: 87,
  },
  {
    title: "Photo depth + UGC → revenue",
    icon: Camera,
    query: "corr(photo_count, user_photo_pct, booking_revenue)",
    lift: "+18% booking revenue",
    secondary: "+12% booking conversion",
    detail: "Higher photo counts and a larger share of guest-uploaded photos build trust before checkout.",
    strength: 82,
  },
  {
    title: "Dynamic pricing × Hip Events",
    icon: TrendingUp,
    query: "uplift(dynamic_pricing_opt_in, has_hip_event)",
    lift: "+31% event-assisted revenue",
    secondary: "+19% booking volume",
    detail: "Hipcamp-priced hosts outperform static pricing, especially when event demand is present.",
    strength: 79,
  },
  {
    title: "Event attendance → follow-up stays",
    icon: GitBranch,
    query: "corr(attended_event, follow_up_booking_90d)",
    lift: "+14% follow-up bookings",
    secondary: "90-day property return window",
    detail: "Guests attending Hip Events are more likely to come back for overnight stays at that property.",
    strength: 76,
  },
];

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
        <section className="mb-8 overflow-hidden rounded-[2rem] border-2 border-[#dfe7d8] bg-[#293121] text-white shadow-xl">
          <div className="grid gap-0 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="p-6 md:p-8">
              <div className="mb-6 flex flex-wrap items-center gap-3">
                <Badge className="rounded-full bg-[#f4c542] px-3 py-1 font-black text-[#293121] hover:bg-[#f4c542]">
                  <BrainCircuit className="mr-1.5 h-3.5 w-3.5" /> ML signal layer
                </Badge>
                <Badge className="rounded-full border-white/15 bg-white/10 px-3 py-1 font-bold text-white hover:bg-white/10">
                  <Database className="mr-1.5 h-3.5 w-3.5" /> warehouse correlations
                </Badge>
              </div>
              <h2 className="max-w-2xl text-3xl font-black tracking-tight md:text-4xl">
                Predict which host behaviors turn Hip Events into repeatable revenue.
              </h2>
              <p className="mt-4 max-w-2xl text-sm font-medium leading-7 text-[#d8d4ca] md:text-base">
                A top-level model view connects host operations, listing quality, pricing strategy, and event attendance to completed bookings, review lift, and follow-up stays.
              </p>

              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                {mlSignals.map((signal) => {
                  const Icon = signal.icon;
                  return (
                    <div key={signal.label} className="rounded-3xl border border-white/10 bg-white/[0.07] p-4 backdrop-blur">
                      <div className="mb-3 flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/12 text-[#f4c542]">
                            <Icon className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="text-sm font-black">{signal.label}</p>
                            <p className="text-xs font-semibold text-[#d8d4ca]">confidence {signal.confidence}</p>
                          </div>
                        </div>
                        <span className="rounded-full bg-[#f15a24] px-3 py-1 text-xs font-black text-white">{signal.lift}</span>
                      </div>
                      <p className="min-h-12 text-xs font-medium leading-5 text-[#d8d4ca]">{signal.copy}</p>
                      <div className="mt-4 space-y-2">
                        {signal.bars.map((bar, index) => (
                          <div key={`${signal.label}-${bar}`} className="flex items-center gap-2">
                            <span className="w-10 text-[10px] font-black uppercase tracking-wide text-white/55">Q{index + 1}</span>
                            <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/10">
                              <div className="h-full rounded-full bg-[#f4c542]" style={{ width: `${bar}%` }} />
                            </div>
                            <span className="w-8 text-right text-[10px] font-black text-white/75">{bar}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="border-t border-white/10 bg-[#171d14] p-6 md:p-8 lg:border-l lg:border-t-0">
              <div className="mb-5 flex items-center justify-between gap-3">
                <div>
                  <p className="flex items-center gap-2 text-sm font-black text-[#f4c542]"><Code2 className="h-4 w-4" /> SQL feature extraction</p>
                  <p className="mt-1 text-xs font-semibold text-[#aaa79e]">daily model refresh · causal lift monitor</p>
                </div>
                <Badge className="rounded-full bg-white/10 font-bold text-white hover:bg-white/10">v0.4 beta</Badge>
              </div>
              <div className="rounded-3xl border border-white/10 bg-black/25 p-5 font-mono text-xs leading-6 text-[#dce8d2] shadow-inner">
                {sqlPreview.map((line, index) => (
                  <div key={line} className="flex gap-4">
                    <span className="select-none text-white/30">{String(index + 1).padStart(2, "0")}</span>
                    <span className={line.startsWith("SELECT") || line.startsWith("WITH") ? "text-[#f4c542]" : "text-[#dce8d2]"}>{line}</span>
                  </div>
                ))}
              </div>
              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="rounded-2xl bg-white/8 p-4">
                  <p className="text-xs font-semibold text-[#aaa79e]">Model target</p>
                  <p className="mt-1 text-lg font-black">Booking lift</p>
                </div>
                <div className="rounded-2xl bg-white/8 p-4">
                  <p className="text-xs font-semibold text-[#aaa79e]">Explainability</p>
                  <p className="mt-1 text-lg font-black">SHAP ranked</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-8 rounded-[2rem] border-2 border-[#e2dace] bg-white p-5 shadow-sm md:p-6">
          <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <Badge className="mb-3 rounded-full bg-[#fff0cc] font-black text-[#7d4b00] hover:bg-[#fff0cc]">
                feature correlation matrix
              </Badge>
              <h2 className="text-2xl font-black tracking-tight text-[#2f3324]">Data points the model is watching</h2>
              <p className="mt-2 max-w-3xl text-sm font-semibold leading-6 text-[#68645b]">
                SQL-derived features are scored as directional signals, helping the team see where host behavior, listing quality, pricing, and Hip Events attendance line up with revenue outcomes.
              </p>
            </div>
            <div className="rounded-2xl bg-[#f4f0e8] px-4 py-3 text-xs font-black text-[#596247]">
              updated daily · correlation ≠ causation
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-4">
            {correlationInsights.map((insight) => {
              const Icon = insight.icon;
              return (
                <Card key={insight.title} className="rounded-[1.6rem] border border-[#e2dace] bg-[#fbfaf6] shadow-none">
                  <CardContent className="p-5">
                    <div className="mb-4 flex items-start justify-between gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#334227] text-white">
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className="rounded-full bg-[#e7f0df] px-3 py-1 text-xs font-black text-[#334227]">r≈.{insight.strength}</span>
                    </div>
                    <h3 className="text-base font-black leading-tight text-[#2f3324]">{insight.title}</h3>
                    <p className="mt-3 rounded-2xl bg-[#2f3324] px-3 py-2 font-mono text-[11px] leading-5 text-[#dce8d2]">
                      {insight.query}
                    </p>
                    <div className="mt-4 space-y-2">
                      <div className="flex items-center justify-between gap-3 text-sm">
                        <span className="font-semibold text-[#68645b]">Primary lift</span>
                        <span className="font-black text-[#f15a24]">{insight.lift}</span>
                      </div>
                      <div className="flex items-center justify-between gap-3 text-sm">
                        <span className="font-semibold text-[#68645b]">Secondary signal</span>
                        <span className="text-right font-black text-[#334227]">{insight.secondary}</span>
                      </div>
                    </div>
                    <div className="mt-4 h-2 overflow-hidden rounded-full bg-[#e2dace]">
                      <div className="h-full rounded-full bg-[#f4c542]" style={{ width: `${insight.strength}%` }} />
                    </div>
                    <p className="mt-4 text-xs font-semibold leading-5 text-[#68645b]">{insight.detail}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

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
