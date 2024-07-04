import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const fetchProfile = async () => {
  // Mock data for now
  return {
    name: "John Doe",
    age: 30,
    weight: 70,
    height: 175,
  };
};

const updateProfile = async (profile) => {
  // Mock updating profile
  return profile;
};

const Profile = () => {
  const queryClient = useQueryClient();
  const { data, error, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: fetchProfile,
  });

  const mutation = useMutation(updateProfile, {
    onSuccess: () => {
      queryClient.invalidateQueries("profile");
    },
  });

  const { register, handleSubmit, reset } = useForm({
    defaultValues: data,
  });

  const onSubmit = (data) => {
    mutation.mutate(data);
    reset(data);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading profile</div>;

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>User Information</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input id="name" {...register("name", { required: true })} />
            </div>
            <div>
              <Label htmlFor="age">Age</Label>
              <Input id="age" type="number" {...register("age", { required: true })} />
            </div>
            <div>
              <Label htmlFor="weight">Weight (kg)</Label>
              <Input id="weight" type="number" {...register("weight", { required: true })} />
            </div>
            <div>
              <Label htmlFor="height">Height (cm)</Label>
              <Input id="height" type="number" {...register("height", { required: true })} />
            </div>
            <Button type="submit">Update Profile</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;