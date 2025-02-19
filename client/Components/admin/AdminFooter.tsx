export default function AdminFooter() {
    return (
      <footer className="py-6 border-t border-border">
        <div className="container mx-auto text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} JobFindr Admin Portal. All rights reserved.
        </div>
      </footer>
    );
  }