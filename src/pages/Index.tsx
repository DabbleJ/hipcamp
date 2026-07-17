import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Flame,
  Heart,
  LayoutDashboard,
  MapPin,
  MoonStar,
  Mountain,
  Sprout,
  Ticket,
  Users,
  Utensils,
  Waves,
} from "lucide-react";

const eventTypes = [
  {
    id: "guided-adventures",
    icon: Mountain,
    title: "Guided outdoor adventures",
    subtitle: "Hikes, trail runs, climbing clinics, paddles",
    audience: "Outdoor clubs, local guides, brand communities",
    hostValue: "Turn existing land access and expertise into ticketed experiences that also drive overnight stays.",
    guestValue: "A clear reason to go outside with a host, a route, and a group already built in.",
    launchPlay: "Start with REI-style skill clinics and trail running community weekends near high-demand metros.",
    color: "bg-[#536247]",
  },
  {
    id: "farm-table",
    icon: Utensils,
    title: "Farm-to-campfire dinners",
    subtitle: "Outdoor meals, tastings, chef pop-ups",
    audience: "Farms, wineries, chefs, food creators",
    hostValue: "Let scenic hosts monetize one-night gatherings without needing to become full-service venues.",
    guestValue: "A memorable dinner in a place people could never book through a restaurant marketplace.",
    launchPlay: "Curate 20 host properties within 90 minutes of major cities and package dinner + optional stay.",
    color: "bg-[#c56b2c]",
  },
  {
    id: "stargazing",
    icon: MoonStar,
    title: "Stargazing & nature nights",
    subtitle: "Astronomy, wildlife walks, dark-sky campouts",
    audience: "Families, date-night planners, nature educators",
    hostValue: "Use the land’s quiet, darkness, and natural assets as the experience itself.",
    guestValue: "A low-barrier first outdoor experience that feels special, guided, and safe.",
    launchPlay: "Launch monthly dark-sky drops with astronomers, naturalists, and ready-to-stay listings.",
    color: "bg-[#5f5a72]",
  },
  {
    id: "wellness-retreats",
    icon: Waves,
    title: "Wellness retreats",
    subtitle: "Yoga, breathwork, cold plunge, creative reset days",
    audience: "Yoga studios, wellness creators, corporate teams",
    hostValue: "Match underutilized beautiful properties with communities that already gather offline.",
    guestValue: "The escape of a retreat without the complexity or cost of a multi-day program.",
    launchPlay: "Pair lavender farms, waterfront sites, and cabins with studio partners for recurring Saturdays.",
    color: "bg-[#57786d]",
  },
  {
    id: "skill-shops",
    icon: Sprout,
    title: "Outdoor skill workshops",
    subtitle: "Camping basics, foraging, bushcraft, photography",
    audience: "First-time campers, parents, outdoor retailers",
    hostValue: "Create daytime revenue and convert curious guests into future campers.",
    guestValue: "Learn the skills that make camping feel approachable before booking a bigger trip.",
    launchPlay: "Bundle beginner workshops with Dick’s Sporting Goods or REI gear checklists and credits.",
    color: "bg-[#6f7f3c]",
  },
  {
    id: "micro-festivals",
    icon: Users,
    title: "Micro-festivals",
    subtitle: "Music, maker markets, campfire talks, community weekends",
    audience: "Creators, local brands, clubs, college outdoor groups",
    hostValue: "Fill shoulder-season inventory with high-intent groups and repeatable event formats.",
    guestValue: "A reason to travel now: intimate, outdoor, community-led programming plus camping.",
    launchPlay: "Pilot invite-only weekends with 5–10 hosts that can support groups, parking, and simple amenities.",
    color: "bg-[#9a4c44]",
  },
];

const metrics = [
  { label: "New demand loops", value: "Events → stays", icon: Ticket },
  { label: "Host revenue layer", value: "Tickets + nights", icon: CalendarDays },
  { label: "Community acquisition", value: "1 host → 20 guests", icon: Users },
];

const bookingExamples = [
  {
    time: "Aug 3",
    title: "Guided Redwood Foraging Walk",
    price: "$48",
    rating: "4.98",
    location: "Santa Cruz, CA",
    image: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=700&q=80",
  },
  {
    time: "Aug 17",
    title: "Campfire Dinner at Lavender Hill",
    price: "$95",
    rating: "4.96",
    location: "Petaluma, CA",
    image: "https://images.unsplash.com/photo-1506368249639-73a05d6f6488?auto=format&fit=crop&w=700&q=80",
  },
  {
    time: "Aug 29",
    title: "Dark Sky Stargazing Campout",
    price: "$72",
    rating: "4.94",
    location: "Joshua Tree, CA",
    image: "https://images.unsplash.com/photo-1532798369041-b33eb576ef16?auto=format&fit=crop&w=700&q=80",
  },
  {
    time: "Sep 6",
    title: "Mountain Hike + Recovery Brunch",
    price: "$64",
    rating: "4.91",
    location: "Bend, OR",
    image: "https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=700&q=80",
  },
  {
    time: "Sep 18",
    title: "Beginner Camp Skills Workshop",
    price: "$55",
    rating: "4.89",
    location: "Mt. Hood, OR",
    image: "https://images.unsplash.com/photo-1504851149312-7a075b496cc7?auto=format&fit=crop&w=700&q=80",
  },
  {
    time: "Sep 27",
    title: "Riverside Yoga & Sound Bath",
    price: "$68",
    rating: "4.97",
    location: "Russian River, CA",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=700&q=80",
  },
];

const Index = () => {
  const [activeEvent, setActiveEvent] = useState(eventTypes[0].id);
  const selectedEvent = eventTypes.find((event) => event.id === activeEvent) ?? eventTypes[0];
  const SelectedIcon = selectedEvent.icon;

  return (
    <div className="min-h-screen bg-[#fbfaf6] text-[#303228]">
      <nav className="sticky top-0 z-50 border-b border-[#e8e2d8] bg-[#fbfaf6]/95 backdrop-blur">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#334227] text-white shadow-sm">
              <Flame className="h-5 w-5" />
            </div>
            <div>
              <p className="text-lg font-black leading-none tracking-tight text-[#2f3324]">Hip Events</p>
              <p className="text-xs font-semibold text-[#777063]">Hosted on Hipcamp</p>
            </div>
          </Link>
          <div className="flex items-center gap-2 sm:gap-3">
            <Link to="/dashboard">
              <Button variant="outline" size="sm" className="rounded-full border-[#d9d1c5] bg-white font-bold text-[#39402e] hover:bg-[#f4f0e8]">
                <LayoutDashboard className="mr-2 h-4 w-4" />
                Dashboard
              </Button>
            </Link>
            <Link to="/host-event">
              <Button size="sm" className="rounded-full bg-[#f15a24] px-4 font-bold text-white hover:bg-[#d94d1e]">
                <Ticket className="mr-2 h-4 w-4" />
                Host an event
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <header className="relative overflow-hidden border-b border-[#e8e2d8] bg-[#334227] text-white">
        <div className="absolute -right-24 top-6 h-72 w-72 rounded-full bg-[#f15a24]/25 blur-3xl" />
        <div className="absolute -bottom-28 -left-16 h-80 w-80 rounded-full bg-[#e8c15a]/25 blur-3xl" />
        <div className="container relative mx-auto px-4 py-16 md:py-24">
          <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <Badge className="mb-5 rounded-full border-[#f0c36b]/40 bg-[#f0c36b]/20 px-4 py-1.5 font-bold text-[#fff7dc] hover:bg-[#f0c36b]/25">
                Outdoor experiences hosted on Hipcamp
              </Badge>
              <h1 className="max-w-4xl text-5xl font-black tracking-tight md:text-7xl">
                Host unforgettable outdoor events on Hipcamp.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[#f4f0e8] md:text-xl">
                Hip Events turns campsites, farms, cabins, and wild places into bookable experiences: guided adventures, campfire dinners, wellness retreats, workshops, and micro-festivals.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link to="/host-event">
                  <Button size="lg" className="rounded-full bg-[#f4c542] px-8 font-black text-[#2f3324] hover:bg-[#ffd75c]">
                    Build an event listing
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/dashboard">
                  <Button size="lg" variant="outline" className="rounded-full border-white/35 bg-white/10 px-8 font-bold text-white hover:bg-white/20 hover:text-white">
                    View event performance
                  </Button>
                </Link>
              </div>
            </div>

            <Card className="rounded-[2rem] border-0 bg-white p-2 shadow-2xl">
              <CardContent className="rounded-[1.5rem] bg-[#f6f2ea] p-6">
                <div className="mb-6 flex items-start justify-between gap-4">
                  <div>
                    <Badge className="mb-3 rounded-full bg-[#e7f0df] font-bold text-[#334227] hover:bg-[#e7f0df]">Featured drop</Badge>
                    <h2 className="text-2xl font-black text-[#2f3324]">Redwood supper & stargazing</h2>
                    <p className="mt-2 text-sm leading-6 text-[#68645b]">A farm dinner, naturalist-led night walk, and optional yurt stay outside Big Sur.</p>
                  </div>
                  <div className="rounded-2xl bg-[#334227] px-4 py-3 text-center text-white">
                    <p className="text-xs uppercase tracking-wide text-[#dce8d2]">From</p>
                    <p className="text-2xl font-black">$95</p>
                  </div>
                </div>
                <div className="mb-5 overflow-hidden rounded-[1.35rem] border border-[#e2dace] bg-white shadow-sm">
                  <img
                    src="https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=900&q=80"
                    alt="Sunlight filtering through redwood trees"
                    className="h-28 w-full object-cover"
                  />
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {metrics.map((metric) => {
                    const Icon = metric.icon;
                    return (
                      <div key={metric.label} className="rounded-2xl border border-[#e2dace] bg-white p-4">
                        <Icon className="mb-3 h-5 w-5 text-[#f15a24]" />
                        <p className="text-sm font-black text-[#2f3324]">{metric.value}</p>
                        <p className="mt-1 text-xs text-[#777063]">{metric.label}</p>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </header>

      <main>
        <section className="border-b border-[#e8e2d8] bg-white py-12 md:py-14">
          <div className="container mx-auto px-4">
            <div className="mb-7 flex items-end justify-between gap-4">
              <div>
                <Badge className="mb-3 rounded-full bg-[#fff0cc] font-bold text-[#7d4b00] hover:bg-[#fff0cc]">
                  Guest booking examples
                </Badge>
                <h2 className="text-3xl font-black tracking-tight text-[#2f3324] md:text-4xl">This weekend on Hip Events</h2>
                <p className="mt-2 max-w-2xl text-[#68645b]">
                  A consumer-facing row of bookable experiences that gives campers a reason to plan a trip now.
                </p>
              </div>
              <Link to="/host-event" className="hidden md:block">
                <Button variant="outline" className="rounded-full border-[#d9d1c5] bg-white font-bold text-[#39402e] hover:bg-[#f4f0e8]">
                  Build one
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>

            <div className="-mx-4 flex snap-x gap-4 overflow-x-auto px-4 pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {bookingExamples.map((experience) => (
                <article key={experience.title} className="w-[245px] flex-none snap-start md:w-[270px]">
                  <div
                    className="relative h-56 overflow-hidden rounded-[1.6rem] bg-[#e2ded5] bg-cover bg-center shadow-sm transition duration-300 hover:scale-[1.02]"
                    style={{ backgroundImage: `url(${experience.image})` }}
                  >
                    <div className="absolute inset-0 bg-[#2f3324]/10" />
                    <Badge className="absolute left-4 top-4 rounded-full bg-white/95 px-4 py-2 text-sm font-black text-[#2f3324] shadow-lg hover:bg-white">
                      {experience.time}
                    </Badge>
                    <button className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#2f3324]/35 text-white backdrop-blur transition hover:bg-[#2f3324]/55" aria-label={`Save ${experience.title}`}>
                      <Heart className="h-5 w-5" />
                    </button>
                  </div>
                  <div className="px-1 pt-4">
                    <h3 className="line-clamp-2 text-lg font-black leading-tight text-[#2f3324]">{experience.title}</h3>
                    <p className="mt-1 text-sm font-semibold text-[#777063]">{experience.location}</p>
                    <p className="mt-1 text-base text-[#68645b]">
                      From {experience.price} / guest · ★ {experience.rating}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-16 md:py-20">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <Badge className="mb-4 rounded-full bg-[#e7f0df] font-bold text-[#334227] hover:bg-[#e7f0df]">
              Experience categories
            </Badge>
            <h2 className="text-4xl font-black tracking-tight text-[#2f3324] md:text-5xl">Six ways Hip Events creates new camper demand</h2>
            <p className="mt-4 text-lg leading-8 text-[#68645b]">
              Each format gives people a reason to book now, while giving hosts a higher-value revenue stream beyond nightly stays.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {eventTypes.map((event) => {
              const Icon = event.icon;
              return (
                <Card
                  key={event.id}
                  onClick={() => setActiveEvent(event.id)}
                  className={`cursor-pointer rounded-[1.7rem] border-2 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl ${
                    activeEvent === event.id ? "border-[#f15a24] shadow-lg" : "border-[#e2dace]"
                  }`}
                >
                  <CardHeader>
                    <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-2xl ${event.color} text-white`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-xl font-black text-[#2f3324]">{event.title}</CardTitle>
                    <CardDescription className="text-base text-[#68645b]">{event.subtitle}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-start gap-2 rounded-2xl bg-[#f4f0e8] p-3 text-sm text-[#68645b]">
                      <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#f15a24]" />
                      <span>{event.audience}</span>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <Card className="mt-10 overflow-hidden rounded-[2rem] border-2 border-[#dbe5d2] bg-white shadow-xl">
            <div className={`${selectedEvent.color} p-8 text-white`}>
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-white/20">
                    <SelectedIcon className="h-8 w-8" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-black">{selectedEvent.title}</h3>
                    <p className="text-white/90">{selectedEvent.subtitle}</p>
                  </div>
                </div>
                <Badge className="w-fit rounded-full bg-white/20 font-bold text-white hover:bg-white/20">Event-ready playbook</Badge>
              </div>
            </div>
            <CardContent className="p-6 md:p-8">
              <Tabs defaultValue="host" className="w-full">
                <TabsList className="grid h-auto w-full grid-cols-3 rounded-2xl bg-[#f4f0e8] p-1">
                  <TabsTrigger value="host" className="rounded-xl">For hosts</TabsTrigger>
                  <TabsTrigger value="guest" className="rounded-xl">For guests</TabsTrigger>
                  <TabsTrigger value="launch" className="rounded-xl">Launch play</TabsTrigger>
                </TabsList>
                <TabsContent value="host" className="mt-6 rounded-3xl border border-[#dbe5d2] bg-[#f2f7ec] p-6 text-lg leading-8 text-[#5f5b52]">
                  {selectedEvent.hostValue}
                </TabsContent>
                <TabsContent value="guest" className="mt-6 rounded-3xl border border-[#f3dcac] bg-[#fff6df] p-6 text-lg leading-8 text-[#5f5b52]">
                  {selectedEvent.guestValue}
                </TabsContent>
                <TabsContent value="launch" className="mt-6 rounded-3xl border border-[#d7e3de] bg-[#eef6f2] p-6 text-lg leading-8 text-[#5f5b52]">
                  {selectedEvent.launchPlay}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </section>

        <section className="bg-[#2f3324] py-16 text-white md:py-20">
          <div className="container mx-auto px-4">
            <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
              <div>
                <Badge className="mb-4 rounded-full bg-[#f4c542] font-bold text-[#2f3324] hover:bg-[#f4c542]">Marketplace flywheel</Badge>
                <h2 className="text-4xl font-black tracking-tight">Events make Hipcamp a place to do things, not just sleep somewhere.</h2>
                <p className="mt-5 text-lg leading-8 text-[#d8d4ca]">
                  Experiences create time-bound intent, social sharing, and repeatable programming that can be distributed through brands, clubs, creators, and local hosts.
                </p>
              </div>
              <div className="grid gap-4 md:grid-cols-3">
                {[
                  ["Hosts", "Earn through tickets, add-ons, and overnight stays."],
                  ["Guests", "Discover guided reasons to get outside this weekend."],
                  ["Partners", "Bring communities to curated outdoor moments."],
                ].map(([title, copy]) => (
                  <div key={title} className="rounded-3xl border border-white/10 bg-white/10 p-6">
                    <CheckCircle2 className="mb-5 h-6 w-6 text-[#f4c542]" />
                    <h3 className="text-xl font-black">{title}</h3>
                    <p className="mt-3 text-sm leading-6 text-[#d8d4ca]">{copy}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-16 md:py-20">
          <Card className="overflow-hidden rounded-[2rem] border-2 border-[#dbe5d2] bg-white shadow-xl">
            <CardContent className="grid gap-8 p-8 md:grid-cols-[1fr_auto] md:items-center md:p-12">
              <div>
                <Badge className="mb-4 rounded-full bg-[#e7f0df] font-bold text-[#334227] hover:bg-[#e7f0df]">Pilot concept</Badge>
                <h2 className="text-3xl font-black tracking-tight text-[#2f3324] md:text-4xl">Start with curated event drops, then open self-serve hosting.</h2>
                <p className="mt-4 max-w-2xl text-lg leading-8 text-[#68645b]">
                  Seed the marketplace with high-quality hosts and trusted partners, learn what sells, then give qualified Hipcamp hosts a simple event listing flow.
                </p>
              </div>
              <Link to="/host-event">
                <Button size="lg" className="rounded-full bg-[#f15a24] px-8 font-black text-white hover:bg-[#d94d1e]">
                  Build the first event
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </section>
      </main>

      <footer className="bg-[#2f3324] py-10 text-white">
        <div className="container mx-auto px-4 text-center text-sm text-[#d8d4ca]">
          Hip Events for Hipcamp • Outdoor experiences, hosted where camping already happens
        </div>
      </footer>
    </div>
  );
};

export default Index;
