"use client";
import AdminHeader from "@/Components/admin/AdminHeader";
import AdminFooter from "@/Components/admin/AdminFooter";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Shield } from "lucide-react";
import Header from "@/Components/Header";

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <AdminHeader />
      {/* <Header /> */}
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <Card className="mt-8">
          <CardHeader className="space-y-1 flex flex-row items-center gap-4">
            <Shield className="h-8 w-8 text-primary" />
            <div>
              <CardTitle className="text-2xl font-bold text-foreground">
                Welcome to Admin Portal
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Manage your application from here
              </p>
            </div>
          </CardHeader>
          <CardContent className="mt-4">
            <div className="prose prose-slate dark:prose-invert">
              <p>Quick actions:</p>
              <ul>
                <li>Review job postings</li>
                <li>Manage user accounts</li>
                <li>View application statistics</li>
                <li>Update system settings</li>
              </ul>
              <p className="text-muted-foreground mt-4">
                Use the navigation menu above to access different sections of the admin portal.
              </p>
            </div>
          </CardContent>
        </Card>
      </main>

      <AdminFooter />
    </div>
  );
}