import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";

const fetchStats = async () => {
  // Mock data for now
  return {
    totalWorkouts: 42,
    totalCalories: 12345,
    totalDistance: 678,
    recentActivities: [
      { date: "2023-10-01", type: "Running", duration: "30 mins", calories: 300 },
      { date: "2023-09-30", type: "Cycling", duration: "45 mins", calories: 450 },
    ],
  };
};

const Index = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["stats"],
    queryFn: fetchStats,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading stats</div>;

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Welcome to Fitness Tracker</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Track your workouts, monitor your progress, and stay fit!</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Quick Stats</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            <div>Total Workouts: {data.totalWorkouts}</div>
            <div>Total Calories Burned: {data.totalCalories}</div>
            <div>Total Distance Covered: {data.totalDistance} km</div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activities</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {data.recentActivities.map((activity, index) => (
              <li key={index} className="flex justify-between">
                <span>{activity.date}</span>
                <span>{activity.type}</span>
                <span>{activity.duration}</span>
                <span>{activity.calories} kcal</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;