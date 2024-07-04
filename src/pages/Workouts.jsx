import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const fetchWorkouts = async () => {
  // Mock data for now
  return [
    { date: "2023-10-01", type: "Running", duration: "30 mins", calories: 300 },
    { date: "2023-09-30", type: "Cycling", duration: "45 mins", calories: 450 },
  ];
};

const addWorkout = async (newWorkout) => {
  // Mock adding workout
  return newWorkout;
};

const Workouts = () => {
  const queryClient = useQueryClient();
  const { data, error, isLoading } = useQuery({
    queryKey: ["workouts"],
    queryFn: fetchWorkouts,
  });

  const mutation = useMutation(addWorkout, {
    onSuccess: () => {
      queryClient.invalidateQueries("workouts");
    },
  });

  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    mutation.mutate(data);
    reset();
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading workouts</div>;

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Log a New Workout</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label htmlFor="date">Date</Label>
              <Input id="date" type="date" {...register("date", { required: true })} />
            </div>
            <div>
              <Label htmlFor="type">Type of Workout</Label>
              <Input id="type" {...register("type", { required: true })} />
            </div>
            <div>
              <Label htmlFor="duration">Duration</Label>
              <Input id="duration" {...register("duration", { required: true })} />
            </div>
            <div>
              <Label htmlFor="calories">Calories Burned</Label>
              <Input id="calories" type="number" {...register("calories", { required: true })} />
            </div>
            <Button type="submit">Add Workout</Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Workout List</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {data.map((workout, index) => (
              <li key={index} className="flex justify-between">
                <span>{workout.date}</span>
                <span>{workout.type}</span>
                <span>{workout.duration}</span>
                <span>{workout.calories} kcal</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default Workouts;