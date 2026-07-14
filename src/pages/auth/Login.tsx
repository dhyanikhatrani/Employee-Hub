import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Eye, EyeOff, Users, Shield, BarChart3, Clock, CheckCircle2, Building2 } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import type { UserRole } from "../../types";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [role, setRole] = useState<UserRole>("hr");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    const success = login(email, password, role);
    setLoading(false);
    if (success) {
      navigate(role === "hr" ? "/hr/dashboard" : "/employee/dashboard");
    } else {
      setError("Invalid credentials. Try the demo emails shown below.");
    }
  };

  const demoLogin = (demoRole: UserRole) => {
    const demoEmail = demoRole === "hr" ? "sarah.mitchell@acmecorp.com" : "marcus.chen@acmecorp.com";
    setRole(demoRole);
    setEmail(demoEmail);
    setPassword("demo123");
  };

  const features = [
    { icon: Users, text: "Manage 100+ employees with ease" },
    { icon: BarChart3, text: "Real-time analytics and reporting" },
    { icon: Clock, text: "Automated attendance tracking" },
    { icon: Shield, text: "Enterprise-grade security" },
  ];

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-700 p-12 flex-col justify-between relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-30" />
        <div className="relative">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
              <Building2 size={20} className="text-white" />
            </div>
            <span className="text-white font-bold text-xl">AcmeCorp HRMS</span>
          </div>
          <h1 className="text-4xl font-bold text-white leading-tight mb-4">
            Simplify your<br />HR operations
          </h1>
          <p className="text-blue-100 text-lg leading-relaxed max-w-sm">
            A modern HR platform built for enterprise teams. Manage people, payroll, and performance — all in one place.
          </p>
        </div>
        <div className="relative space-y-4">
          {features.map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                <Icon size={16} className="text-white" />
              </div>
              <span className="text-blue-100 text-sm">{text}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-6 lg:p-12 bg-background">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Building2 size={16} className="text-white" />
            </div>
            <span className="font-bold text-foreground">AcmeCorp HRMS</span>
          </div>

          <h2 className="text-2xl font-bold text-foreground">Welcome back</h2>
          <p className="text-muted-foreground mt-1 mb-8">Sign in to your account to continue</p>

          <div className="flex bg-muted rounded-xl p-1 mb-6">
            {(["hr", "employee"] as UserRole[]).map(r => (
              <button
                key={r}
                onClick={() => setRole(r)}
                className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all
                  ${role === r ? "bg-white text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
              >
                {r === "hr" ? "HR Administrator" : "Employee"}
              </button>
            ))}
          </div>

          <div className="flex gap-2 mb-6">
            <button onClick={() => demoLogin("hr")} className="flex-1 py-2 px-3 border border-border rounded-xl text-xs text-muted-foreground hover:border-primary hover:text-primary transition-colors text-left">
              <span className="block font-medium text-foreground">Demo: HR</span>
              sarah.mitchell@acmecorp.com
            </button>
            <button onClick={() => demoLogin("employee")} className="flex-1 py-2 px-3 border border-border rounded-xl text-xs text-muted-foreground hover:border-primary hover:text-primary transition-colors text-left">
              <span className="block font-medium text-foreground">Demo: Employee</span>
              marcus.chen@acmecorp.com
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Work Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@acmecorp.com"
                className="w-full px-4 py-3 rounded-xl border border-border bg-input-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 rounded-xl border border-border bg-input-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all pr-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-muted-foreground cursor-pointer">
                <input type="checkbox" className="rounded" />
                Remember me
              </label>
              <Link to="/forgot-password" className="text-sm text-primary hover:text-primary/80">Forgot password?</Link>
            </div>

            {error && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm">{error}</div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 disabled:opacity-60 transition-all flex items-center justify-center gap-2"
            >
              {loading ? (
                <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Signing in...</>
              ) : (
                <><CheckCircle2 size={16} /> Sign In</>
              )}
            </button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            {"Don't have an account? "}
            <Link to="/register" className="text-primary font-medium hover:text-primary/80">Create account</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
