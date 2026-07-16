import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CalendarDays, Heart, Search, ShieldCheck, SlidersHorizontal, Users } from "lucide-react";

const placeholder = "/assets/placeholder.svg";

const nearbyCamps = [
  ["C2T Ranch on the Saline River", "Plainville, KS", "99%", "from $35 / night"],
  ["Lake Georgia-Sue", "Ottawa, KS", "95%", "from $20 / night"],
  ["Basecamp Flint Hills", "Allen, KS", "98%", "from $15 / night"],
  ["Rpm Ranch", "Stillwater, OK", "New", "from $45 / night"],
];

const guideTiles = [
  ["Free availability alerts", "Snag sold-out campsites", "bg-[#8f3153]"],
  ["Roadtrip planner", "Plan in advance or book last minute", "bg-[#6d596f]"],
  ["Pro map layers", "For the campers Forever", "bg-[#a13f28]"],
  ["All camping in one place", "One subscription required", "bg-[#466f61]"],
  ["Explore national parks", "Book with real-time availability", "bg-[#234f41]"],
  ["Get the Hipcamp app", "The #1 camping app", "bg-[#ef4d26]"],
];

const tripTypes = ["Available tonight", "Available this weekend", "Available next weekend", "Camping near me", "Glamping near me", "RV sites near me"];

const getaways = [
  ["Beach stays", "Set up by the water"],
  ["Camping near hot springs", "Take a dip"],
  ["Lake camping", "Go for a cleanse"],
  ["Yosemite", "California"],
  ["Sequoia", "California"],
  ["Joshua Tree", "California"],
  ["Yellowstone", "Wyoming"],
  ["Olympic", "Washington"],
  ["Bryce Canyon", "Utah"],
  ["Glacier", "Montana"],
  ["Zion", "Utah"],
  ["Ocala", "Florida"],
];

const columns = {
  States: ["North Carolina", "Utah", "Wisconsin", "California", "Colorado", "Florida", "Maine", "Oregon"],
  "Best camping regions": ["Big Sur", "Lake Tahoe", "Joshua Tree", "Olympic Peninsula", "Blue Ridge", "Great Smokies"],
  "Public parks": ["Arches National Park", "Grand Teton National Park", "Yosemite National Park", "Redwood National Park", "Glacier National Park"],
  "Trending campgrounds": ["Adena Pines", "Boulder Ridge", "Cedar Creek", "Pine Valley", "Hidden Springs"],
};

const Nav = () => (
  <>
    <div className="bg-[#f3f1ed] px-4 py-2 text-center text-[11px] font-semibold text-[#514d42]">
      Most wildfires are preventable. <span className="underline">Learn to be fire safe</span>
    </div>
    <header className="sticky top-0 z-50 border-b border-[#e8e4dd] bg-[#fbfaf6]/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link to="/" className="text-[18px] font-black tracking-[0.18em] text-[#2f3324]">
          HIP<span className="text-[#f15a24]">CAMP</span>
        </Link>
        <nav className="hidden items-center gap-7 text-sm font-bold text-[#393a2f] md:flex">
          <a href="#near">Near Me</a>
          <a href="#about">About</a>
          <a href="#host">Become a Host</a>
          <a href="#login">Log in</a>
          <Button className="h-9 rounded-full bg-[#334227] px-5 text-xs font-black text-white hover:bg-[#26331d]">Sign up</Button>
        </nav>
        <Button className="rounded-full bg-[#334227] text-white md:hidden">Sign up</Button>
      </div>
    </header>
  </>
);

const ImageCard = ({ title, subtitle, pill }: { title: string; subtitle: string; pill?: string }) => (
  <article className="group min-w-[245px] flex-1">
    <div className="relative overflow-hidden rounded-2xl border border-[#e2ded5] bg-[#e2e2e2] shadow-sm">
      <img src={placeholder} alt="placeholder" className="h-48 w-full object-cover transition duration-300 group-hover:scale-105" />
      <button className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-[#37382f] shadow-sm" aria-label={`Save ${title}`}>
        <Heart className="h-4 w-4" />
      </button>
      {pill && <span className="absolute bottom-3 left-3 rounded-full bg-[#f6c32f] px-4 py-2 text-xs font-black text-[#2f3324]">{pill}</span>}
    </div>
    <h3 className="mt-3 line-clamp-1 text-sm font-black text-[#2d3028]">{title}</h3>
    <p className="mt-1 text-xs font-semibold text-[#6a675d]">{subtitle}</p>
  </article>
);

const SectionTitle = ({ children, id }: { children: string; id?: string }) => (
  <h2 id={id} className="mb-5 text-xl font-black tracking-tight text-[#2f3324] md:text-2xl">
    {children}
  </h2>
);

const Index = () => {
  return (
    <div className="min-h-screen bg-[#fbfaf6] font-sans text-[#303228]">
      <Nav />

      <main>
        <section className="mx-auto max-w-6xl px-4 pb-10 pt-10 text-center md:pb-14 md:pt-16">
          <h1 className="mx-auto max-w-3xl text-4xl font-black leading-[0.95] tracking-tight text-[#2f3324] md:text-6xl">
            Everywhere you want to camp.
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-base font-semibold leading-6 text-[#656258] md:text-lg">
            Explore all your favorite campsites in one place, from national parks to blueberry farms.
          </p>

          <div className="mx-auto mt-8 max-w-4xl rounded-2xl border border-[#dfd9cf] bg-white p-3 text-left shadow-[0_14px_40px_rgba(45,48,40,0.10)]">
            <div className="mb-3 flex gap-2">
              <button className="rounded-full bg-[#f3f1ed] px-4 py-2 text-xs font-black text-[#2f3324]">Destination</button>
              <button className="rounded-full px-4 py-2 text-xs font-black text-[#6d695f]">Roadtrip</button>
            </div>
            <div className="grid gap-2 md:grid-cols-[1.4fr_1fr_1fr_auto]">
              <label className="flex items-center gap-3 rounded-xl border border-[#e4dfd7] bg-[#fbfaf6] px-4 py-4 text-sm font-bold text-[#5c594f]">
                <Search className="h-4 w-4" /> Search destinations
              </label>
              <label className="flex items-center gap-3 rounded-xl border border-[#e4dfd7] bg-[#fbfaf6] px-4 py-4 text-sm font-bold text-[#5c594f]">
                <CalendarDays className="h-4 w-4" /> Add dates
              </label>
              <label className="flex items-center gap-3 rounded-xl border border-[#e4dfd7] bg-[#fbfaf6] px-4 py-4 text-sm font-bold text-[#5c594f]">
                <Users className="h-4 w-4" /> Add guests
              </label>
              <Button className="h-full rounded-xl bg-[#f15a24] px-8 font-black text-white hover:bg-[#d94d1e]">
                <Search className="mr-2 h-4 w-4" /> Search
              </Button>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-7" id="near">
          <SectionTitle>Camper favorites nearby</SectionTitle>
          <div className="flex gap-4 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {nearbyCamps.map(([title, location, rating, price]) => (
              <article key={title} className="min-w-[250px] flex-1">
                <div className="relative overflow-hidden rounded-2xl bg-[#e2e2e2]">
                  <img src={placeholder} alt="placeholder" className="h-52 w-full object-cover" />
                  <span className="absolute left-3 top-3 rounded-full bg-white px-3 py-1 text-xs font-black text-[#2f3324]">★ {rating}</span>
                </div>
                <h3 className="mt-3 line-clamp-1 text-sm font-black">{title}</h3>
                <p className="mt-1 text-xs font-semibold text-[#69665d]">{location} · Tents, RVs, Lodging</p>
                <p className="mt-1 text-xs font-black text-[#2f3324]">{price}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto grid max-w-6xl gap-4 px-4 py-8 md:grid-cols-2">
          <div className="relative min-h-[260px] overflow-hidden rounded-2xl bg-[#2f3324] text-white">
            <img src={placeholder} alt="placeholder" className="absolute inset-0 h-full w-full object-cover opacity-45" />
            <div className="relative flex h-full flex-col justify-end p-7">
              <p className="text-xs font-black tracking-[0.3em]">OVERLAND EXPO</p>
              <h2 className="mt-2 max-w-sm text-2xl font-black leading-tight">Camp along the 2026 Overland Expo circuit.</h2>
              <Button className="mt-6 w-fit rounded-full bg-white px-6 font-black text-[#2f3324] hover:bg-[#f5f2eb]">Explore route</Button>
            </div>
          </div>
          <div className="relative min-h-[260px] overflow-hidden rounded-2xl bg-[#f0a21a] text-[#2f3324]">
            <img src={placeholder} alt="placeholder" className="absolute inset-0 h-full w-full object-cover opacity-50" />
            <div className="relative flex h-full flex-col justify-end p-7">
              <p className="text-xs font-black tracking-[0.25em]">NEW ON HIPCAMP</p>
              <h2 className="mt-2 max-w-sm text-2xl font-black leading-tight">Welcome Modern America Campgrounds to Hipcamp.</h2>
              <Button className="mt-6 w-fit rounded-full bg-[#2f3324] px-6 font-black text-white hover:bg-[#26311f]">Book now</Button>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-8" id="host">
          <div className="relative overflow-hidden rounded-3xl bg-[#d94d1e] md:min-h-[360px]">
            <img src={placeholder} alt="placeholder" className="h-[340px] w-full object-cover opacity-65 md:h-[410px]" />
            <div className="absolute left-6 top-1/2 max-w-xs -translate-y-1/2 rounded-2xl bg-[#ef4d26] p-6 text-white shadow-xl md:left-10">
              <h2 className="text-2xl font-black leading-tight">Grow your campground or glamping business.</h2>
              <p className="mt-3 text-sm font-semibold leading-6 text-white/90">Host our community of good-natured RVers and campers at your property, campground, or RV resort.</p>
              <Button className="mt-5 rounded-full bg-white px-6 font-black text-[#d94d1e] hover:bg-[#f7f2e9]">Become a Host</Button>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-10">
          <SectionTitle>New ways to find yourself outside</SectionTitle>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {guideTiles.map(([title, subtitle, color]) => (
              <article key={title} className={`overflow-hidden rounded-2xl ${color} text-white shadow-sm`}>
                <img src={placeholder} alt="placeholder" className="h-40 w-full object-cover opacity-75" />
                <div className="p-5">
                  <h3 className="text-lg font-black">{title}</h3>
                  <p className="mt-1 text-sm font-semibold text-white/85">{subtitle}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-10">
          <div className="relative overflow-hidden rounded-3xl bg-[#ece6d9]">
            <img src={placeholder} alt="placeholder" className="h-[330px] w-full object-cover opacity-70" />
            <div className="absolute left-6 top-1/2 max-w-sm -translate-y-1/2 rounded-2xl bg-white p-7 shadow-xl">
              <h2 className="text-2xl font-black text-[#2f3324]">Hipcamp now offers a Weather Guarantee.</h2>
              <p className="mt-3 text-sm font-semibold leading-6 text-[#68645b]">If it rains on your trip, we’ll automatically reimburse you for your trip costs.</p>
              <Button className="mt-5 rounded-full bg-[#2f3324] px-6 font-black text-white hover:bg-[#26311f]">Book with confidence</Button>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-10">
          <SectionTitle>Discover top spots near you</SectionTitle>
          <div className="grid gap-4 md:grid-cols-3">
            {tripTypes.map((type) => (
              <ImageCard key={type} title={type} subtitle="Explore stays picked for your timing" pill={type} />
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-10">
          <div className="rounded-3xl bg-[#f4f0e7] px-6 py-10 text-center md:px-12">
            <h2 className="mx-auto max-w-2xl text-3xl font-black leading-tight text-[#2f3324] md:text-4xl">
              Hipcamp is the #1 camping app for vanlifers, RVers, and tent campers.
            </h2>
            <div className="mt-10 grid gap-8 md:grid-cols-3">
              {["Everywhere you want to camp.", "Camp your way.", "Only on Hipcamp."].map((item) => (
                <div key={item} className="mx-auto max-w-xs">
                  <img src={placeholder} alt="placeholder" className="mx-auto h-36 w-36 rounded-full object-cover" />
                  <h3 className="mt-4 text-sm font-black">{item}</h3>
                  <p className="mt-2 text-xs font-semibold leading-5 text-[#6a675d]">Explore unique places, camp your way, and book stays you won’t find anywhere else.</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-10">
          <SectionTitle>Find your next getaway</SectionTitle>
          <div className="grid gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {getaways.map(([title, subtitle]) => (
              <ImageCard key={`${title}-${subtitle}`} title={title} subtitle={subtitle} />
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-12">
          <div className="grid gap-8 border-y border-[#e6e0d8] py-10 md:grid-cols-4">
            {Object.entries(columns).map(([heading, links]) => (
              <div key={heading}>
                <h3 className="mb-4 text-sm font-black text-[#2f3324]">{heading}</h3>
                <ul className="space-y-2 text-xs font-semibold text-[#69665d]">
                  {links.map((link) => (
                    <li key={link}>{link}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="mx-auto max-w-6xl px-4 pb-12 pt-4" id="about">
        <div className="grid gap-10 border-b border-[#e6e0d8] pb-10 md:grid-cols-[1fr_2fr]">
          <div>
            <div className="text-[18px] font-black tracking-[0.18em] text-[#2f3324]">HIP<span className="text-[#f15a24]">CAMP</span></div>
            <div className="mt-6 grid grid-cols-2 gap-3 text-xs font-semibold text-[#69665d]">
              <span>About us</span><span>Hosting</span><span>Careers</span><span>Journal</span><span>Support</span><span>Privacy</span>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-black text-[#2f3324]">Experience “You Had To Be There”</h3>
            <p className="mt-3 max-w-3xl text-sm font-semibold leading-7 text-[#69665d]">
              Hipcamp is full of camping near national parks, farms, forests, lakes, and backyards. This page recreates the calm, earthy marketplace feel with rounded cards, compact search, curated discovery modules, and deep footer directories.
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-4 py-8 text-xs font-semibold text-[#777269] md:flex-row md:items-center md:justify-between">
          <span>© 2026 Hipcamp, Inc. All rights reserved.</span>
          <span className="flex items-center gap-2"><ShieldCheck className="h-4 w-4" /> USA · English</span>
        </div>
      </footer>

      <button className="fixed bottom-5 right-5 flex items-center gap-2 rounded-full bg-[#596247] px-4 py-3 text-xs font-black text-white shadow-lg">
        <SlidersHorizontal className="h-4 w-4" /> Support
      </button>
    </div>
  );
};

export default Index;
