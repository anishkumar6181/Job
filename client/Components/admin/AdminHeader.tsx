import { Button } from "@/Components/ui/button";
import { useGlobalContext } from "@/context/globalContext";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "../themeToggle";

export default function AdminHeader() {
  const { admin, logout } = useGlobalContext();
  const pathname = usePathname();

  return (
    <header className="px-10 py-6 bg-background border-b border-border">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/admin/dashboard" className="text-xl font-bold text-primary">
          Admin Dashboard
        </Link>
        {/* <ThemeToggle /> */}
        
        {/* <div className="flex items-center gap-4">
          <span className="text-muted-foreground">
            Welcome, {admin?.name || 'Admin'}
          </span> */}
          <ul className="flex items-center gap-12">
          <Link
            href={"/admin/myjobs"}
            className={`py-2 px-6 rounded-md transition-colors ${
              pathname === "/admin/myjobs"
                ? "text-primary border-primary border bg-primary/10"
                : "hover:text-primary"
            }`}
          >
            Posted Jobs
          </Link>
          <Link
            href={"/admin/post"}
            className={`py-2 px-6 rounded-md transition-colors ${
              pathname === "/admin/post"
                ? "text-primary border-primary border bg-primary/10"
                : "hover:text-primary"
            }`}
          >
            Post Job
          </Link>
          </ul>

          <ThemeToggle />
        
        <div className="flex items-center gap-4">
          <span className="text-muted-foreground">
            Welcome, {admin?.name || 'Admin'}
          </span>



          <Button variant="outline" onClick={logout}>
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
}