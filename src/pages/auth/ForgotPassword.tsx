import { useState } from "react";
import { Link } from "react-router";
import { Building2, Mail, ArrowLeft } from "lucide-react";

export default function ForgotPassword() {
  const [sent, setSent] = useState(false);
  const [email, setEmail] = useState("");

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-background">
      <div className="w-full max-w-md">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <Building2 size={16} className="text-white" />
          </div>
          <span className="font-bold text-foreground text-lg">AcmeCorp HRMS</span>
        </div>
        {!sent ? (
          <>
            <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center mb-6">
              <Mail size={24} className="text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-foreground">Forgot password?</h2>
            <p className="text-muted-foreground mt-1 mb-8">{"Enter your work email and we'll send you a reset link"}</p>
            <div className="space-y-4">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@acmecorp.com"
                className="w-full px-4 py-3 rounded-xl border border-border bg-input-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
              />
              <button onClick={() => setSent(true)} className="w-full py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-all">
                Send Reset Link
              </button>
            </div>
          </>
        ) : (
          <div className="text-center">
            <div className="w-14 h-14 rounded-2xl bg-emerald-100 flex items-center justify-center mx-auto mb-6">
              <Mail size={24} className="text-emerald-600" />
            </div>
            <h2 className="text-2xl font-bold text-foreground">Check your email</h2>
            <p className="text-muted-foreground mt-2">{"We've sent a password reset link to "}<strong>{email}</strong></p>
          </div>
        )}
        <Link to="/login" className="flex items-center gap-2 justify-center mt-6 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft size={14} /> Back to sign in
        </Link>
      </div>
    </div>
  );
}
