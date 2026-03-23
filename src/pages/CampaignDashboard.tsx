import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Users, 
  Gift, 
  Calendar, 
  GraduationCap, 
  MapPin, 
  Tent, 
  Heart,
  TrendingUp,
  ArrowUpRight,
  Play,
  Pause,
  MoreHorizontal,
  CheckCircle2,
  Clock,
  AlertCircle
} from "lucide-react";

const CampaignDashboard = () => {
  const [campaigns, setCampaigns] = useState([
    {
      id: 1,
      name: "Group Trip OS - Trail Running Groups",
      strategy: "group-trip",
      status: "active",
      progress: 65,
      metrics: {
        leads: 847,
        conversions: 156,
        revenue: 23400,
        cac: 42
      },
      target: 1200,
      startDate: "2024-01-15",
      endDate: "2024-03-15"
    },
    {
      id: 2,
      name: "First Trip Free - Lapsed Users",
      strategy: "first-trip",
      status: "active",
      progress: 45,
      metrics: {
        leads: 2341,
        conversions: 312,
        revenue: 15600,
        cac: 28
      },
      target: 5000,
      startDate: "2024-02-01",
      endDate: "2024-04-01"
    },
    {
      id: 3,
      name: "Event-Based - Trail Race Partnerships",
      strategy: "event-based",
      status: "paused",
      progress: 30,
      metrics: {
        leads: 234,
        conversions: 45,
        revenue: 8900,
        cac: 65
      },
      target: 800,
      startDate: "2024-03-01",
      endDate: "2024-05-01"
    },
    {
      id: 4,
      name: "Campus Ambassador - University Pilot",
      strategy: "campus",
      status: "planned",
      progress: 0,
      metrics: {
        leads: 0,
        conversions: 0,
        revenue: 0,
        cac: 0
      },
      target: 2500,
      startDate: "2024-04-01",
      endDate: "2024-06-01"
    },
    {
      id: 5,
      name: "No Gear Needed - First Timers",
      strategy: "no-gear",
      status: "planned",
      progress: 0,
      metrics: {
        leads: 0,
        conversions: 0,
        revenue: 0,
        cac: 0
      },
      target: 3000,
      startDate: "2024-04-15",
      endDate: "2024-07-15"
    }
  ]);

  const strategyIcons: Record<string, any> = {
    "group-trip": Users,
    "first-trip": Gift,
    "event-based": Calendar,
    "campus": GraduationCap,
    "near-me": MapPin,
    "no-gear": Tent,
    "matching": Heart
  };

  const strategyColors: Record<string, string> = {
    "group-trip": "from-emerald-500 to-teal-600",
    "first-trip": "from-orange-500 to-amber-600",
    "event-based": "from-purple-500 to-indigo-600",
    "campus": "from-blue-500 to-cyan-600",
    "near-me": "from-rose-500 to-pink-600",
    "no-gear": "from-green-500 to-emerald-600",
    "matching": "from-violet-500 to-purple-600"
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-200"><CheckCircle2 className="w-3 h-3 mr-1" />Active</Badge>;
      case "paused":
        return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200"><Pause className="w-3 h-3 mr-1" />Paused</Badge>;
      case "planned":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200"><Clock className="w-3 h-3 mr-1" />Planned</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const totalMetrics = campaigns.reduce((acc, campaign) => ({
    leads: acc.leads + campaign.metrics.leads,
    conversions: acc.conversions + campaign.metrics.conversions,
    revenue: acc.revenue + campaign.metrics.revenue,
    target: acc.target + campaign.target
  }), { leads: 0, conversions: 0, revenue: 0, target: 0 });

  const overallProgress = Math.round((totalMetrics.conversions / totalMetrics.target) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-emerald-50/30 to-amber-50/30">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Campaign Dashboard</h1>
              <p className="text-gray-600 text-sm">Track and manage growth initiatives</p>
            </div>
            <Button className="bg-emerald-600 hover:bg-emerald-700">
              <Play className="w-4 h-4 mr-2" />
              New Campaign
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-2 border-emerald-200">
            <CardHeader className="pb-3">
              <CardDescription>Total Leads</CardDescription>
              <CardTitle className="text-3xl">{totalMetrics.leads.toLocaleString()}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center text-emerald-600 text-sm">
                <ArrowUpRight className="w-4 h-4 mr-1" />
                <span>+234 this week</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-blue-200">
            <CardHeader className="pb-3">
              <CardDescription>Conversions</CardDescription>
              <CardTitle className="text-3xl">{totalMetrics.conversions.toLocaleString()}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center text-blue-600 text-sm">
                <ArrowUpRight className="w-4 h-4 mr-1" />
                <span>+89 this week</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-purple-200">
            <CardHeader className="pb-3">
              <CardDescription>Revenue</CardDescription>
              <CardTitle className="text-3xl">${totalMetrics.revenue.toLocaleString()}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center text-purple-600 text-sm">
                <ArrowUpRight className="w-4 h-4 mr-1" />
                <span>+$12,400 this week</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-amber-200">
            <CardHeader className="pb-3">
              <CardDescription>Overall Progress</CardDescription>
              <CardTitle className="text-3xl">{overallProgress}%</CardTitle>
            </CardHeader>
            <CardContent>
              <Progress value={overallProgress} className="h-2" />
              <p className="text-xs text-gray-500 mt-2">{totalMetrics.conversions} / {totalMetrics.target} target</p>
            </CardContent>
          </Card>
        </div>

        {/* Campaign List */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="all">All Campaigns</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="paused">Paused</TabsTrigger>
            <TabsTrigger value="planned">Planned</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {campaigns.map((campaign) => {
              const Icon = strategyIcons[campaign.strategy];
              return (
                <Card key={campaign.id} className="border-2 hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start gap-4">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${strategyColors[campaign.strategy]} flex items-center justify-center flex-shrink-0`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg text-gray-900">{campaign.name}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            {getStatusBadge(campaign.status)}
                            <span className="text-sm text-gray-500">
                              {campaign.startDate} - {campaign.endDate}
                            </span>
                          </div>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="w-5 h-5" />
                      </Button>
                    </div>

                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-600">Progress</span>
                        <span className="font-medium">{campaign.progress}%</span>
                      </div>
                      <Progress value={campaign.progress} className="h-2" />
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="bg-gray-50 rounded-lg p-3">
                        <p className="text-xs text-gray-500 mb-1">Leads</p>
                        <p className="font-semibold text-lg">{campaign.metrics.leads.toLocaleString()}</p>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-3">
                        <p className="text-xs text-gray-500 mb-1">Conversions</p>
                        <p className="font-semibold text-lg">{campaign.metrics.conversions.toLocaleString()}</p>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-3">
                        <p className="text-xs text-gray-500 mb-1">Revenue</p>
                        <p className="font-semibold text-lg">${campaign.metrics.revenue.toLocaleString()}</p>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-3">
                        <p className="text-xs text-gray-500 mb-1">CAC</p>
                        <p className="font-semibold text-lg">${campaign.metrics.cac}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </TabsContent>

          <TabsContent value="active">
            {campaigns.filter(c => c.status === "active").map((campaign) => {
              const Icon = strategyIcons[campaign.strategy];
              return (
                <Card key={campaign.id} className="border-2 border-emerald-200 mb-4">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start gap-4">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${strategyColors[campaign.strategy]} flex items-center justify-center flex-shrink-0`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg text-gray-900">{campaign.name}</h3>
                          {getStatusBadge(campaign.status)}
                        </div>
                      </div>
                    </div>
                    <Progress value={campaign.progress} className="h-2 mb-2" />
                    <p className="text-sm text-gray-500">{campaign.metrics.conversions} / {campaign.target} conversions</p>
                  </CardContent>
                </Card>
              );
            })}
          </TabsContent>

          <TabsContent value="paused">
            {campaigns.filter(c => c.status === "paused").map((campaign) => {
              const Icon = strategyIcons[campaign.strategy];
              return (
                <Card key={campaign.id} className="border-2 border-amber-200 mb-4">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${strategyColors[campaign.strategy]} flex items-center justify-center flex-shrink-0`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg text-gray-900">{campaign.name}</h3>
                        {getStatusBadge(campaign.status)}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </TabsContent>

          <TabsContent value="planned">
            {campaigns.filter(c => c.status === "planned").map((campaign) => {
              const Icon = strategyIcons[campaign.strategy];
              return (
                <Card key={campaign.id} className="border-2 border-blue-200 mb-4">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${strategyColors[campaign.strategy]} flex items-center justify-center flex-shrink-0`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg text-gray-900">{campaign.name}</h3>
                        {getStatusBadge(campaign.status)}
                        <p className="text-sm text-gray-500 mt-1">Starts: {campaign.startDate}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CampaignDashboard;