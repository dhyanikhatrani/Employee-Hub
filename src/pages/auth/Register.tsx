import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Eye, EyeOff, Building2 } from "lucide-react";

export default function Register() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-background">
      <div className="w-full max-w-md">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <Building2 size={16} className="text-white" />
          </div>
          <span className="font-bold text-foreground text-lg">AcmeCorp HRMS</span>
        </div>
        <h2 className="text-2xl font-bold text-foreground">Create account</h2>
        <p className="text-muted-foreground mt-1 mb-8">Join the AcmeCorp team portal</p>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">First Name</label>
              <input className="w-full px-4 py-3 rounded-xl border border-border bg-input-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" placeholder="John" />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Last Name</label>
              <input className="w-full px-4 py-3 rounded-xl border border-border bg-input-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" placeholder="Doe" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Work Email</label>
            <input type="email" className="w-full px-4 py-3 rounded-xl border border-border bg-input-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" placeholder="john.doe@acmecorp.com" />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Employee ID</label>
            <input className="w-full px-4 py-3 rounded-xl border border-border bg-input-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" placeholder="EMP009" />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Password</label>
            <div className="relative">
              <input type={showPassword ? "text" : "password"} className="w-full px-4 py-3 rounded-xl border border-border bg-input-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary pr-12" placeholder="Create a strong password" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>
          <button onClick={() => navigate("/login")} className="w-full py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-all">
            Create Account
          </button>
        </div>
        <p className="text-center text-sm text-muted-foreground mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-primary font-medium hover:text-primary/80">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
