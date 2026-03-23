import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { 
  Users, 
  Gift, 
  Calendar, 
  GraduationCap, 
  MapPin, 
  Tent, 
  Heart,
  ArrowRight,
  Sparkles,
  TrendingUp,
  Target,
  CheckCircle2,
  Flame,
  LayoutDashboard,
  LogOut
} from "lucide-react";

const Index = () => {
  const [activeStrategy, setActiveStrategy] = useState<string>("group-trip");
  const { logout } = useAuth();

  const strategies = [
    {
      id: "group-trip",
      icon: Users,
      title: "Group Trip OS",
      subtitle: "For Existing Outdoor Communities",
      color: "from-emerald-500 to-teal-600",
      target: "Trail running groups, climbing gyms, college outdoor clubs",
      insight: "These groups already organize trips—it's just messy (Google Docs, Venmo, text threads)",
      experiment: "Create a lightweight 'Plan a Group Trip' flow on Hipcamp. One person (group leader) selects a site → invites others → shared booking / split payment. Seed with 10–20 communities.",
      whyItWorks: ["Converts existing intent (not trying to create new behavior)", "High LTV (groups repeat trips)", "One organizer = 5–20 new users"],
      scrappyVersion: "No product build—just a landing page + concierge support + discount code",
      metrics: { potential: "5-20x", effort: "Low", impact: "High" }
    },
    {
      id: "first-trip",
      icon: Gift,
      title: "First Trip Free(ish)",
      subtitle: "For Lapsed Campers",
      color: "from-orange-500 to-amber-600",
      target: "Existing Hipcamp users who haven't booked in 6–12 months",
      insight: "Dormant users need a compelling reason to return",
      experiment: "Email/SMS: 'We'll cover $25–$50 of your next stay if you bring someone new'. Require +1 new user to unlock the credit.",
      whyItWorks: ["Reactivates dormant demand", "Bakes in viral loop (each booking pulls in a new user)", "Lower CAC vs paid"],
      scrappyVersion: "Frame it as 'introduce a friend to camping' vs discount",
      metrics: { potential: "2-3x", effort: "Low", impact: "Medium" }
    },
    {
      id: "event-based",
      icon: Calendar,
      title: "Event-Based Inventory",
      subtitle: "Pop-Up Weekends",
      color: "from-purple-500 to-indigo-600",
      target: "Trail runners, cyclists, festival-goers",
      insight: "People already traveling for events—they just need lodging",
      experiment: "Partner with specific events (trail races, gravel rides). Create Hipcamp 'zones' near events (clusters of bookable sites). Bundle: stay + event proximity + community.",
      whyItWorks: ["Taps into time-bound intent", "People already traveling → just need lodging", "Can dominate niche verticals"],
      scrappyVersion: "Start with 2-3 trail race partnerships",
      metrics: { potential: "3-5x", effort: "Medium", impact: "High" }
    },
    {
      id: "campus",
      icon: GraduationCap,
      title: "Campus Ambassador",
      subtitle: "Outdoor Club Leads",
      color: "from-blue-500 to-cyan-600",
      target: "College outdoor programs, outing clubs",
      insight: "Students are high-frequency + social, creating long-term habits early",
      experiment: "Recruit 1–2 'Hipcamp Trip Leads' per campus. Give them: $ credits, Early access to curated sites, Simple booking tools for group trips.",
      whyItWorks: ["Students are high-frequency + social", "Creates long-term habit early", "Word-of-mouth > paid ads"],
      scrappyVersion: "Pilot with 5 universities in outdoor-heavy regions",
      metrics: { potential: "10-50x", effort: "Medium", impact: "High" }
    },
    {
      id: "near-me",
      icon: MapPin,
      title: "Near Me, This Weekend",
      subtitle: "Hyper-Local Drops",
      color: "from-rose-500 to-pink-600",
      target: "Last-minute planners (huge segment)",
      insight: "Decision paralysis kills spontaneous trips",
      experiment: "Weekly push/email: '5 great spots within 90 minutes of you this weekend'. Curated, not marketplace overwhelm. Add urgency: limited availability.",
      whyItWorks: ["Reduces decision friction", "Captures spontaneous demand", "Especially effective for PNW audience"],
      scrappyVersion: "Manual curation + email sequence",
      metrics: { potential: "2-4x", effort: "Low", impact: "Medium" }
    },
    {
      id: "no-gear",
      icon: Tent,
      title: "Try Camping Without Gear",
      subtitle: "First-Timer Funnel",
      color: "from-green-500 to-emerald-600",
      target: "Curious but intimidated first-timers",
      insight: "Gear ownership is the biggest barrier to entry",
      experiment: "Curate only ready-to-go sites (tents, yurts, cabins). Position as: 'Camping, no gear needed'. Distribute via lifestyle creators, urban audiences, parents.",
      whyItWorks: ["Expands TAM beyond 'campers'", "Removes biggest barrier to entry", "Parents are a huge segment"],
      scrappyVersion: "Filter + landing page + influencer partnerships",
      metrics: { potential: "5-10x", effort: "Medium", impact: "High" }
    },
    {
      id: "matching",
      icon: Heart,
      title: "Host x Community Matching",
      subtitle: "Niche Community Alignment",
      color: "from-violet-500 to-purple-600",
      target: "Niche communities + underutilized hosts",
      insight: "Specialized properties need specialized audiences",
      experiment: "Match: Lavender farm → yoga groups, Large land → trail running retreats, Waterfront → college clubs",
      whyItWorks: ["Creates perfect property-community fit", "Increases host utilization", "Builds community loyalty"],
      scrappyVersion: "Manual matching + outreach to 20 hosts",
      metrics: { potential: "3-7x", effort: "Medium", impact: "High" }
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-emerald-50/30 to-amber-50/30">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
                <Flame className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl text-gray-900">Hipcamp Growth</span>
            </div>
            <div className="flex gap-3">
                          <Link to="/dashboard">
                            <Button variant="outline" size="sm" className="rounded-full">
                              <LayoutDashboard className="w-4 h-4 mr-2" />
                              Dashboard
                            </Button>
                          </Link>
                          <Link to="/group-trip">
                            <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 rounded-full">
                              <Users className="w-4 h-4 mr-2" />
                              Try Group Trip
                            </Button>
                          </Link>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={logout}
                            className="rounded-full text-gray-600 hover:text-gray-900"
                          >
                            <LogOut className="w-4 h-4 mr-2" />
                            Logout
                          </Button>
                        </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/10 via-transparent to-amber-600/10" />
        <div className="container mx-auto px-4 py-16 md:py-24 relative">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-emerald-100 text-emerald-800 hover:bg-emerald-200 border-emerald-200">
              <Flame className="w-3 h-3 mr-1" />
              Growth Strategy Framework
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 tracking-tight">
              Grow Camper Demand
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-amber-600">
                for Hipcamp
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
                          Data-driven growth levers for leveraging partnerships and camper growth
                        </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/group-trip">
                <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-full px-8">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Try Group Trip Planner
                </Button>
              </Link>
              <Link to="/dashboard">
                <Button size="lg" variant="outline" className="rounded-full px-8 border-2">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  View Campaign Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Strategy Overview */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            7 Demand Growth Lever Experiments
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Each strategy targets a specific audience with a tailored approach to drive demand and acquisition
          </p>
        </div>

        {/* Strategy Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {strategies.map((strategy) => {
            const Icon = strategy.icon;
            return (
              <Card 
                key={strategy.id}
                className={`cursor-pointer transition-all duration-300 hover:shadow-2xl hover:scale-105 border-2 ${
                  activeStrategy === strategy.id 
                    ? 'border-emerald-500 shadow-xl ring-4 ring-emerald-500/20' 
                    : 'border-gray-200 hover:border-emerald-300'
                }`}
                onClick={() => setActiveStrategy(strategy.id)}
              >
                <CardHeader>
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${strategy.color} flex items-center justify-center mb-4`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">{strategy.title}</CardTitle>
                  <CardDescription className="text-base">{strategy.subtitle}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center text-sm text-gray-600">
                      <Target className="w-4 h-4 mr-2 text-emerald-600" />
                      <span className="line-clamp-2">{strategy.target}</span>
                    </div>
                    <div className="flex gap-2 pt-2">
                      <Badge variant="secondary" className="text-xs">
                        {strategy.metrics.potential} potential
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {strategy.metrics.effort} effort
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Detailed Strategy View */}
        <div className="max-w-5xl mx-auto">
          {strategies.map((strategy) => {
            const Icon = strategy.icon;
            const isActive = activeStrategy === strategy.id;
            return (
              <div 
                key={strategy.id}
                className={`transition-all duration-500 ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 hidden'}`}
              >
                <Card className="border-2 border-emerald-200 shadow-xl overflow-hidden">
                  <div className={`bg-gradient-to-r ${strategy.color} p-8 text-white`}>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center">
                          <Icon className="w-8 h-8" />
                        </div>
                        <div>
                          <h3 className="text-3xl font-bold mb-2">{strategy.title}</h3>
                          <p className="text-white/90 text-lg">{strategy.subtitle}</p>
                        </div>
                      </div>
                      <div className="hidden md:flex gap-3">
                        <Badge className="bg-white/20 text-white border-white/30">
                          {strategy.metrics.potential} Potential
                        </Badge>
                        <Badge className="bg-white/20 text-white border-white/30">
                          {strategy.metrics.impact} Impact
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <CardContent className="p-8">
                    <Tabs defaultValue="insight" className="w-full">
                      <TabsList className="grid w-full grid-cols-4 mb-8">
                        <TabsTrigger value="insight">Insight</TabsTrigger>
                        <TabsTrigger value="experiment">Experiment</TabsTrigger>
                        <TabsTrigger value="why">Why It Works</TabsTrigger>
                        <TabsTrigger value="scrappy">Scrappy Version</TabsTrigger>
                      </TabsList>

                      <TabsContent value="insight" className="space-y-4">
                        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-6 border border-emerald-100">
                          <h4 className="font-semibold text-lg text-gray-900 mb-3 flex items-center">
                            <Target className="w-5 h-5 mr-2 text-emerald-600" />
                            Target Audience
                          </h4>
                          <p className="text-gray-700 text-lg">{strategy.target}</p>
                        </div>
                        <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-100">
                          <h4 className="font-semibold text-lg text-gray-900 mb-3 flex items-center">
                            <Sparkles className="w-5 h-5 mr-2 text-amber-600" />
                            Key Insight
                          </h4>
                          <p className="text-gray-700 text-lg">{strategy.insight}</p>
                        </div>
                      </TabsContent>

                      <TabsContent value="experiment" className="space-y-4">
                        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
                          <h4 className="font-semibold text-lg text-gray-900 mb-3 flex items-center">
                            <Flame className="w-5 h-5 mr-2 text-blue-600" />
                            Experiment Design
                          </h4>
                          <p className="text-gray-700 text-lg leading-relaxed">{strategy.experiment}</p>
                        </div>
                      </TabsContent>

                      <TabsContent value="why" className="space-y-4">
                        <div className="space-y-3">
                          {strategy.whyItWorks.map((reason, index) => (
                            <div key={index} className="flex items-start gap-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 border border-green-100">
                              <CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                              <p className="text-gray-700 text-lg">{reason}</p>
                            </div>
                          ))}
                        </div>
                      </TabsContent>

                      <TabsContent value="scrappy" className="space-y-4">
                        <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-2xl p-6 border border-purple-100">
                          <h4 className="font-semibold text-lg text-gray-900 mb-3 flex items-center">
                            <TrendingUp className="w-5 h-5 mr-2 text-purple-600" />
                            MVP / Scrappy Version
                          </h4>
                          <p className="text-gray-700 text-lg leading-relaxed">{strategy.scrappyVersion}</p>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>
      </section>

      {/* Partnership Section */}
      <section className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Strategic Partnerships
            </h2>
            <p className="text-xl text-gray-300 mb-12">
              Leverage existing outdoor communities and retail partnerships to amplify reach
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/20">
                <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-lg mb-2">REI</h3>
                <p className="text-gray-400 text-sm">Co-marketing to outdoor enthusiasts</p>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/20">
                <div className="w-12 h-12 bg-amber-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Tent className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Dick's Sporting Goods</h3>
                <p className="text-gray-400 text-sm">In-store promotions and bundles</p>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/20">
                <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Trail Running Groups</h3>
                <p className="text-gray-400 text-sm">Community-led trip organization</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-3xl mx-auto text-center">
          <Card className="border-2 border-emerald-200 shadow-2xl overflow-hidden">
            <CardContent className="p-12">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Flame className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Ready to Grow?
              </h2>
              <p className="text-gray-600 text-lg mb-8">
                Start with one strategy, measure results, then scale what works. Focus on high-impact, low-effort wins first.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link to="/group-trip">
                  <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-full px-8">
                    <ArrowRight className="w-4 h-4 mr-2" />
                    Try Group Trip OS
                  </Button>
                </Link>
                <Link to="/dashboard">
                  <Button size="lg" variant="outline" className="rounded-full px-8 border-2">
                    View Dashboard
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">
            Growth Strategy Framework for Hipcamp • Built with data-driven insights
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;