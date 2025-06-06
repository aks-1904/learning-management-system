import { Card, CardHeader, CardTitle } from "@/components/ui/card";

const Dashboard = () => {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      <Card>
        <CardHeader>
          <CardTitle>Total sales</CardTitle>
        </CardHeader>
      </Card>
    </div>
  );
};

export default Dashboard;
