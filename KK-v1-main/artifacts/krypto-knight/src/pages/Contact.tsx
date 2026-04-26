import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Mail, MapPin, Clock, Send, MessageSquare, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "support@krypto-knight.com",
    href: "mailto:support@krypto-knight.com",
  },
  {
    icon: MapPin,
    label: "Headquarters",
    value: "Cyprus (Company Reg. No. HE 434989)",
    href: null,
  },
  {
    icon: Clock,
    label: "Business Hours",
    value: "Monday – Friday, 9:00 – 18:00 CET",
    href: null,
  },
];

export default function Contact() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.email || !form.message) return;
    setSubmitting(true);
    // Simulate a brief delay (replace with real API call if desired)
    await new Promise(r => setTimeout(r, 1200));
    setSubmitting(false);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden selection:bg-primary/30 selection:text-white">
      <Navbar />

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative pt-40 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-background">
          <div className="absolute top-1/3 left-1/3 w-[600px] h-[300px] bg-primary/10 rounded-full blur-[128px] opacity-40 pointer-events-none" />
        </div>
        <div className="container relative z-10 mx-auto px-6 lg:px-12 text-center max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/5 text-primary text-sm font-medium mb-8">
              <MessageSquare className="w-4 h-4" />
              We're here to help
            </div>
            <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight text-white mb-6 leading-[1.1]">
              Want to Know <span className="text-gradient-primary">More?</span>
            </h1>
            <p className="text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto font-light leading-relaxed">
              We are here to assist you during our business hours. Please feel free to
              contact us for any questions or issues you may have.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Main Content ──────────────────────────────────────────────────── */}
      <section className="pb-32">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">

            {/* Left: Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-2 space-y-6"
            >
              <h2 className="text-2xl font-bold text-white">Get In Touch</h2>
              <p className="text-muted-foreground leading-relaxed">
                Whether you have a question about our services, compliance requirements,
                or want to explore a partnership — our team is ready to help.
              </p>

              <div className="space-y-4 mt-8">
                {contactInfo.map((info, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-4 p-5 glass-card rounded-xl border border-white/10"
                  >
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <info.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-xs font-mono text-primary mb-1">{info.label.toUpperCase()}</div>
                      {info.href ? (
                        <a href={info.href} className="text-white hover:text-primary transition-colors font-medium">
                          {info.value}
                        </a>
                      ) : (
                        <div className="text-white font-medium">{info.value}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Trust badge */}
              <div className="p-5 glass-card rounded-xl border border-primary/20 mt-8">
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_8px_rgba(0,255,156,0.8)]" />
                  <span className="text-xs font-mono text-primary">REGULATED ENTITY</span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Krypto Knight Ltd is registered with the Cyprus Securities and Exchange Commission
                  (CySEC) as a Crypto Asset Services Provider — CASP Registration No. 015/24.
                </p>
              </div>
            </motion.div>

            {/* Right: Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-3"
            >
              {submitted ? (
                <div className="glass-card rounded-2xl border border-primary/30 p-12 text-center h-full flex flex-col items-center justify-center min-h-[500px]">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                    <Send className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">Message Sent!</h3>
                  <p className="text-muted-foreground mb-8 max-w-sm">
                    Thank you for reaching out. Our team will get back to you within one business day.
                  </p>
                  <Button
                    onClick={() => setSubmitted(false)}
                    variant="outline"
                    className="border-white/10 hover:bg-white/5 hover:text-white"
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="glass-card rounded-2xl border border-white/10 p-8 lg:p-10 space-y-6"
                >
                  <h3 className="text-xl font-bold text-white mb-2">Contact Form</h3>

                  {/* Name row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName" className="text-muted-foreground text-sm">First Name</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        value={form.firstName}
                        onChange={handleChange}
                        placeholder="John"
                        className="bg-white/5 border-white/10 text-white placeholder:text-muted-foreground/50 focus:border-primary/50 rounded-lg h-11"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName" className="text-muted-foreground text-sm">Last Name</Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        value={form.lastName}
                        onChange={handleChange}
                        placeholder="Smith"
                        className="bg-white/5 border-white/10 text-white placeholder:text-muted-foreground/50 focus:border-primary/50 rounded-lg h-11"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-muted-foreground text-sm">Email Address *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      placeholder="john@company.com"
                      className="bg-white/5 border-white/10 text-white placeholder:text-muted-foreground/50 focus:border-primary/50 rounded-lg h-11"
                    />
                  </div>

                  {/* Subject */}
                  <div className="space-y-2">
                    <Label htmlFor="subject" className="text-muted-foreground text-sm">Subject</Label>
                    <Input
                      id="subject"
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      placeholder="How can we help?"
                      className="bg-white/5 border-white/10 text-white placeholder:text-muted-foreground/50 focus:border-primary/50 rounded-lg h-11"
                    />
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-muted-foreground text-sm">Your Message *</Label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      value={form.message}
                      onChange={handleChange}
                      rows={5}
                      placeholder="Tell us about your needs..."
                      className="w-full bg-white/5 border border-white/10 text-white placeholder:text-muted-foreground/50 focus:border-primary/50 rounded-lg px-4 py-3 text-sm outline-none transition-colors resize-none focus:ring-1 focus:ring-primary/30"
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    disabled={submitting}
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-12 font-semibold shadow-[0_0_20px_rgba(0,255,156,0.2)] hover:shadow-[0_0_30px_rgba(0,255,156,0.4)] transition-all rounded-sm group disabled:opacity-60"
                  >
                    {submitting ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        Submit Form
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </span>
                    )}
                  </Button>

                  <p className="text-xs text-muted-foreground text-center">
                    By submitting this form you agree to our{" "}
                    <a href="#" className="text-primary hover:underline">Privacy Policy</a>.
                  </p>
                </form>
              )}
            </motion.div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
