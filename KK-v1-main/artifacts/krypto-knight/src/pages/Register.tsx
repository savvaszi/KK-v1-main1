import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Eye, EyeOff } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const schema = z.object({
  firstName: z.string().min(1, "Required"),
  lastName: z.string().min(1, "Required"),
  email: z.string().email("Enter a valid email"),
  password: z.string().min(8, "At least 8 characters"),
  confirm: z.string(),
}).refine(d => d.password === d.confirm, {
  message: "Passwords do not match",
  path: ["confirm"],
});

type FormValues = z.infer<typeof schema>;

export default function Register() {
  const { register: registerUser } = useAuth();
  const [, navigate] = useLocation();
  const [error, setError] = useState("");
  const [showPass, setShowPass] = useState(false);

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (values: FormValues) => {
    setError("");
    try {
      await registerUser(values.email, values.password, values.firstName, values.lastName);
      navigate("/dashboard");
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Registration failed");
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
    <Navbar />
    <div className="flex-1 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6 group">
            <div className="w-10 h-10 rounded-full bg-black/50 border border-primary/20 flex items-center justify-center">
              <img src="/knight-head.png" alt="Krypto Knight" className="w-6 h-6 drop-shadow-[0_0_8px_rgba(0,255,156,0.8)]" />
            </div>
            <span className="font-bold text-lg tracking-tight text-white group-hover:text-primary transition-colors">KRYPTO KNIGHT</span>
          </Link>
          <h1 className="text-2xl font-bold text-white mb-2">Create your account</h1>
          <p className="text-muted-foreground text-sm">Start your KryptoKnight journey</p>
        </div>

        <div className="glass border border-white/10 rounded-2xl p-8">
          {error && (
            <Alert className="mb-6 border-red-500/30 bg-red-500/10">
              <AlertCircle className="h-4 w-4 text-red-400" />
              <AlertDescription className="text-red-400">{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">First Name</Label>
                <Input
                  placeholder="John"
                  className="bg-black/30 border-white/10 text-white placeholder:text-muted-foreground/50 focus:border-primary"
                  {...register("firstName")}
                />
                {errors.firstName && <p className="text-xs text-red-400">{errors.firstName.message}</p>}
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Last Name</Label>
                <Input
                  placeholder="Doe"
                  className="bg-black/30 border-white/10 text-white placeholder:text-muted-foreground/50 focus:border-primary"
                  {...register("lastName")}
                />
                {errors.lastName && <p className="text-xs text-red-400">{errors.lastName.message}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Email Address</Label>
              <Input
                type="email"
                placeholder="you@example.com"
                className="bg-black/30 border-white/10 text-white placeholder:text-muted-foreground/50 focus:border-primary"
                {...register("email")}
              />
              {errors.email && <p className="text-xs text-red-400">{errors.email.message}</p>}
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Password</Label>
              <div className="relative">
                <Input
                  type={showPass ? "text" : "password"}
                  placeholder="Min. 8 characters"
                  className="bg-black/30 border-white/10 text-white placeholder:text-muted-foreground/50 focus:border-primary pr-10"
                  {...register("password")}
                />
                <button
                  type="button"
                  onClick={() => setShowPass(p => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-white"
                >
                  {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password && <p className="text-xs text-red-400">{errors.password.message}</p>}
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Confirm Password</Label>
              <Input
                type={showPass ? "text" : "password"}
                placeholder="Repeat password"
                className="bg-black/30 border-white/10 text-white placeholder:text-muted-foreground/50 focus:border-primary"
                {...register("confirm")}
              />
              {errors.confirm && <p className="text-xs text-red-400">{errors.confirm.message}</p>}
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold shadow-[0_0_20px_rgba(0,255,156,0.3)] hover:shadow-[0_0_30px_rgba(0,255,156,0.5)] transition-all mt-2"
            >
              {isSubmitting ? "Creating account…" : "Create Account"}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Already have an account?{" "}
            <Link href="/login" className="text-primary hover:underline font-medium">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
    <Footer />
    </div>
  );
}
