import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import {
  User, FileText, MapPin, ChevronRight, ChevronLeft,
  Check, Upload, X, AlertCircle,
} from "lucide-react";

// ── Countries ────────────────────────────────────────────────────────────────
const COUNTRIES = ["Afghanistan","Albania","Algeria","American Samoa","Andorra","Angola","Anguilla","Antarctica","Antigua and Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bonaire, Sint Eustatius and Saba","Bosnia and Herzegovina","Botswana","Bouvet Island","Brazil","British Indian Ocean Territory","Brunei Darussalam","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Canada","Cape Verde","Cayman Islands","Central African Republic","Chad","Chile","China","Christmas Island","Cocos Islands","Colombia","Comoros","Congo, Democratic Republic of the","Congo, Republic of the","Cook Islands","Costa Rica","Croatia","Cuba","Curaçao","Cyprus","Czech Republic","Côte d'Ivoire","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Eritrea","Estonia","Eswatini (Swaziland)","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Guiana","French Polynesia","French Southern Territories","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guadeloupe","Guam","Guatemala","Guernsey","Guinea","Guinea-Bissau","Guyana","Haiti","Heard and McDonald Islands","Holy See","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kiribati","Kuwait","Kyrgyzstan","Lao People's Democratic Republic","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Marshall Islands","Martinique","Mauritania","Mauritius","Mayotte","Mexico","Micronesia","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Myanmar","Namibia","Nauru","Nepal","Netherlands","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","Niue","Norfolk Island","North Korea","Northern Mariana Islands","Norway","Oman","Pakistan","Palau","Palestine, State of","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Pitcairn","Poland","Portugal","Puerto Rico","Qatar","Romania","Russia","Rwanda","Réunion","Saint Barthélemy","Saint Helena","Saint Kitts and Nevis","Saint Lucia","Saint Martin","Saint Pierre and Miquelon","Saint Vincent and the Grenadines","Samoa","San Marino","Sao Tome and Principe","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Sint Maarten","Slovakia","Slovenia","Solomon Islands","Somalia","South Africa","South Georgia","South Korea","South Sudan","Spain","Sri Lanka","Sudan","Suriname","Svalbard and Jan Mayen Islands","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor-Leste","Togo","Tokelau","Tonga","Trinidad and Tobago","Tunisia","Turkey","Turkmenistan","Turks and Caicos Islands","Tuvalu","US Minor Outlying Islands","Uganda","Ukraine","United Arab Emirates","United Kingdom","United States","Uruguay","Uzbekistan","Vanuatu","Venezuela","Vietnam","Virgin Islands, British","Virgin Islands, U.S.","Wallis and Futuna","Western Sahara","Yemen","Zambia","Zimbabwe","Åland Islands"];

// ── Reusable form components ──────────────────────────────────────────────────
const Label = ({ children, required }: { children: React.ReactNode; required?: boolean }) => (
  <label className="block text-sm font-medium text-white/80 mb-1.5">
    {children}{required && <span className="text-primary ml-1">*</span>}
  </label>
);

const Input = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input
    {...props}
    className={`w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-white/30 focus:outline-none focus:border-primary/50 focus:bg-white/8 transition-all ${props.className ?? ""}`}
  />
);

const Select = ({ children, ...props }: React.SelectHTMLAttributes<HTMLSelectElement>) => (
  <select
    {...props}
    className="w-full bg-[#0d1117] border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-primary/50 transition-all appearance-none"
  >
    {children}
  </select>
);

const Textarea = (props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) => (
  <textarea
    {...props}
    rows={3}
    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-white/30 focus:outline-none focus:border-primary/50 transition-all resize-none"
  />
);

const RadioGroup = ({
  label, name, options, value, onChange, required,
}: {
  label: string; name: string; options: string[]; value: string;
  onChange: (v: string) => void; required?: boolean;
}) => (
  <div>
    <Label required={required}>{label}</Label>
    <div className="flex gap-4 mt-1">
      {options.map(opt => (
        <label key={opt} className="flex items-center gap-2 cursor-pointer group">
          <div
            onClick={() => onChange(opt)}
            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all cursor-pointer ${
              value === opt ? "border-primary bg-primary/20" : "border-white/30 group-hover:border-white/60"
            }`}
          >
            {value === opt && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
          </div>
          <span className="text-white/80 text-sm">{opt}</span>
        </label>
      ))}
    </div>
  </div>
);

const FileUploadZone = ({
  label, name, file, onChange, required,
}: {
  label: string; name: string; file: File | null;
  onChange: (f: File | null) => void; required?: boolean;
}) => (
  <div>
    <Label required={required}>{label}</Label>
    <label className="block cursor-pointer">
      <input
        type="file"
        className="hidden"
        accept=".pdf,.jpg,.jpeg,.png"
        onChange={e => onChange(e.target.files?.[0] ?? null)}
      />
      <div className={`border-2 border-dashed rounded-xl p-8 text-center transition-all ${
        file ? "border-primary/60 bg-primary/5" : "border-white/15 hover:border-white/30 hover:bg-white/3"
      }`}>
        {file ? (
          <div className="flex items-center justify-center gap-3">
            <Check className="w-5 h-5 text-primary" />
            <span className="text-white/80 text-sm">{file.name}</span>
            <button
              type="button"
              onClick={e => { e.preventDefault(); onChange(null); }}
              className="text-white/40 hover:text-white/80"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <>
            <Upload className="w-8 h-8 text-white/30 mx-auto mb-2" />
            <p className="text-white/50 text-sm">Drag and drop or <span className="text-primary">browse</span></p>
            <p className="text-white/30 text-xs mt-1">PDF, JPG, PNG accepted</p>
          </>
        )}
      </div>
    </label>
  </div>
);

const CountrySelect = ({ label, value, onChange, required, placeholder = "Select country" }: {
  label: string; value: string; onChange: (v: string) => void;
  required?: boolean; placeholder?: string;
}) => (
  <div>
    <Label required={required}>{label}</Label>
    <Select value={value} onChange={e => onChange(e.target.value)}>
      <option value="">{placeholder}</option>
      {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
    </Select>
  </div>
);

// ── Steps config ──────────────────────────────────────────────────────────────
const STEPS = [
  { label: "Personal Info", icon: User },
  { label: "Documents", icon: FileText },
  { label: "Address & Contact", icon: MapPin },
];

// ── Initial state ─────────────────────────────────────────────────────────────
const initialState = {
  // Step 1
  firstName: "", middleName: "", lastName: "",
  dateOfBirth: "",
  placeOfBirth: "",
  hasTaxId: "",
  taxId: "",
  noTaxIdReason: "",
  taxCountry: "",
  nationality: "",
  citizenship: "",
  passportNo: "",
  issuingAuthority: "",
  dateOfIssue: "",
  dateOfExpiry: "",
  hasDualCitizenship: "",
  secondNationality: "",
  // Step 2
  idDocument: null as File | null,
  // Step 3
  street: "", city: "", state: "", zip: "", country: "",
  addressProof: null as File | null,
  differentMailing: "",
  mailingStreet: "", mailingCity: "", mailingState: "", mailingZip: "", mailingCountry: "",
  countryCode: "",
  phone: "",
  email: "",
  facebook: "", linkedin: "", other: "",
};

type FormState = typeof initialState;

// ── Component ─────────────────────────────────────────────────────────────────
const OpenPersonalAccount = () => {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const set = (field: keyof FormState, value: FormState[keyof FormState]) =>
    setForm(prev => ({ ...prev, [field]: value }));

  const clearError = (field: keyof FormState) =>
    setErrors(prev => { const next = { ...prev }; delete next[field]; return next; });

  // ── Validation per step ────────────────────────────────────────────────────
  const validateStep = (s: number): boolean => {
    const errs: Partial<Record<keyof FormState, string>> = {};
    if (s === 0) {
      if (!form.firstName.trim()) errs.firstName = "First name is required";
      if (!form.lastName.trim()) errs.lastName = "Last name is required";
      if (!form.dateOfBirth) errs.dateOfBirth = "Date of birth is required";
      if (!form.placeOfBirth) errs.placeOfBirth = "Place of birth is required";
      if (!form.hasTaxId) errs.hasTaxId = "Please select an option";
      if (form.hasTaxId === "Yes" && !form.taxId.trim()) errs.taxId = "Tax ID is required";
      if (!form.taxCountry) errs.taxCountry = "Tax country is required";
      if (!form.nationality) errs.nationality = "Nationality is required";
      if (!form.citizenship) errs.citizenship = "Citizenship is required";
      if (!form.hasDualCitizenship) errs.hasDualCitizenship = "Please select an option";
    }
    if (s === 1) {
      if (!form.idDocument) errs.idDocument = "Please upload your ID or passport document";
    }
    if (s === 2) {
      if (!form.email.trim()) errs.email = "Email is required";
      if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
        errs.email = "Invalid email address";
      if (!form.phone.trim()) errs.phone = "Phone number is required";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) setStep(s => s + 1);
  };

  const handleBack = () => {
    setErrors({});
    setStep(s => s - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(2)) return;
    setSubmitting(true);
    await new Promise(r => setTimeout(r, 1500));
    setSubmitting(false);
    setSubmitted(true);
  };

  const FieldError = ({ field }: { field: keyof FormState }) =>
    errors[field] ? (
      <p className="flex items-center gap-1 text-red-400 text-xs mt-1">
        <AlertCircle className="w-3 h-3" />{errors[field]}
      </p>
    ) : null;

  // ── Success screen ─────────────────────────────────────────────────────────
  if (submitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card rounded-2xl p-10 max-w-md w-full text-center"
        >
          <div className="w-16 h-16 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center mx-auto mb-6">
            <Check className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-3">Application Submitted</h2>
          <p className="text-muted-foreground mb-6">
            Thank you for submitting your personal account application. Our team will review your
            documents and contact you within 1–3 business days.
          </p>
          <Link href="/">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold w-full">
              Back to Home
            </Button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-28 pb-20 px-6">
      <div className="container mx-auto max-w-3xl">

        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5 mb-4">
            <User className="w-4 h-4 text-primary" />
            <span className="text-primary text-sm font-medium">Personal Account</span>
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold text-white mb-3">
            Open a Personal Account
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Complete the steps below to apply for your personal Krypto Knight account.
            All fields marked with <span className="text-primary">*</span> are required.
          </p>
        </div>

        {/* Step indicator */}
        <div className="flex items-center justify-center mb-10 gap-0">
          {STEPS.map((s, i) => {
            const Icon = s.icon;
            const done = i < step;
            const active = i === step;
            return (
              <React.Fragment key={s.label}>
                <div className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${
                    done ? "bg-primary border-primary" :
                    active ? "border-primary bg-primary/10" :
                    "border-white/20 bg-white/5"
                  }`}>
                    {done
                      ? <Check className="w-5 h-5 text-black" />
                      : <Icon className={`w-5 h-5 ${active ? "text-primary" : "text-white/30"}`} />
                    }
                  </div>
                  <span className={`text-xs mt-2 font-medium ${active ? "text-primary" : done ? "text-white/60" : "text-white/30"}`}>
                    {s.label}
                  </span>
                </div>
                {i < STEPS.length - 1 && (
                  <div className={`h-0.5 w-16 sm:w-24 mx-2 mb-5 transition-all ${i < step ? "bg-primary" : "bg-white/10"}`} />
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Form card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.25 }}
            className="glass-card rounded-2xl p-8"
          >
            {/* ── STEP 0: Personal Information ──────────────────────────── */}
            {step === 0 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-white mb-6 pb-3 border-b border-white/10">
                  Personal Information
                </h2>

                {/* Name row */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <Label required>First Name</Label>
                    <Input
                      placeholder="First name"
                      value={form.firstName}
                      onChange={e => { set("firstName", e.target.value); clearError("firstName"); }}
                    />
                    <FieldError field="firstName" />
                  </div>
                  <div>
                    <Label>Middle Name</Label>
                    <Input
                      placeholder="Middle name"
                      value={form.middleName}
                      onChange={e => set("middleName", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label required>Last Name</Label>
                    <Input
                      placeholder="Last name"
                      value={form.lastName}
                      onChange={e => { set("lastName", e.target.value); clearError("lastName"); }}
                    />
                    <FieldError field="lastName" />
                  </div>
                </div>

                {/* DOB + Place of birth */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label required>Date of Birth</Label>
                    <Input
                      type="date"
                      value={form.dateOfBirth}
                      onChange={e => { set("dateOfBirth", e.target.value); clearError("dateOfBirth"); }}
                    />
                    <FieldError field="dateOfBirth" />
                  </div>
                  <div>
                    <CountrySelect
                      label="Place of Birth"
                      value={form.placeOfBirth}
                      onChange={v => { set("placeOfBirth", v); clearError("placeOfBirth"); }}
                      required
                      placeholder="Select country"
                    />
                    <FieldError field="placeOfBirth" />
                  </div>
                </div>

                {/* Tax ID section */}
                <div className="glass rounded-xl p-5 space-y-4 border border-white/5">
                  <RadioGroup
                    label="Please provide your Tax Identification Number if available."
                    name="hasTaxId"
                    options={["Yes", "No"]}
                    value={form.hasTaxId}
                    onChange={v => { set("hasTaxId", v); clearError("hasTaxId"); }}
                    required
                  />
                  <FieldError field="hasTaxId" />

                  <AnimatePresence>
                    {form.hasTaxId === "Yes" && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}>
                        <Label required>Tax Identification Number</Label>
                        <Input
                          placeholder="Enter TIN"
                          value={form.taxId}
                          onChange={e => { set("taxId", e.target.value); clearError("taxId"); }}
                        />
                        <FieldError field="taxId" />
                      </motion.div>
                    )}
                    {form.hasTaxId === "No" && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}>
                        <Label>Reason TIN is not available</Label>
                        <Textarea
                          placeholder="Please explain..."
                          value={form.noTaxIdReason}
                          onChange={e => set("noTaxIdReason", e.target.value)}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <CountrySelect
                    label="Tax Country"
                    value={form.taxCountry}
                    onChange={v => { set("taxCountry", v); clearError("taxCountry"); }}
                    required
                  />
                  <FieldError field="taxCountry" />
                </div>

                {/* Nationality & Citizenship */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <CountrySelect
                      label="Nationality"
                      value={form.nationality}
                      onChange={v => { set("nationality", v); clearError("nationality"); }}
                      required
                    />
                    <FieldError field="nationality" />
                  </div>
                  <div>
                    <CountrySelect
                      label="Citizenship"
                      value={form.citizenship}
                      onChange={v => { set("citizenship", v); clearError("citizenship"); }}
                      required
                    />
                    <FieldError field="citizenship" />
                  </div>
                </div>

                {/* ID / Passport details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label>ID / Passport No</Label>
                    <Input
                      placeholder="e.g. A12345678"
                      value={form.passportNo}
                      onChange={e => set("passportNo", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>Issuing Authority</Label>
                    <Input
                      placeholder="e.g. Ministry of Interior"
                      value={form.issuingAuthority}
                      onChange={e => set("issuingAuthority", e.target.value)}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label>Date of Issue</Label>
                    <Input
                      type="date"
                      value={form.dateOfIssue}
                      onChange={e => set("dateOfIssue", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>Date of Expiry</Label>
                    <Input
                      type="date"
                      value={form.dateOfExpiry}
                      onChange={e => set("dateOfExpiry", e.target.value)}
                    />
                  </div>
                </div>

                {/* Dual citizenship */}
                <div className="glass rounded-xl p-5 space-y-4 border border-white/5">
                  <RadioGroup
                    label="I have dual citizenship"
                    name="hasDualCitizenship"
                    options={["Yes", "No"]}
                    value={form.hasDualCitizenship}
                    onChange={v => { set("hasDualCitizenship", v); clearError("hasDualCitizenship"); }}
                    required
                  />
                  <FieldError field="hasDualCitizenship" />
                  <AnimatePresence>
                    {form.hasDualCitizenship === "Yes" && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}>
                        <CountrySelect
                          label="Second Nationality"
                          value={form.secondNationality}
                          onChange={v => set("secondNationality", v)}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            )}

            {/* ── STEP 1: Document Upload ────────────────────────────────── */}
            {step === 1 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-white mb-6 pb-3 border-b border-white/10">
                  Identity Documents
                </h2>
                <p className="text-muted-foreground text-sm">
                  Please upload a clear, colour copy of your valid government-issued ID or passport.
                  Accepted formats: PDF, JPG, PNG.
                </p>
                <div className="glass rounded-xl p-5 border border-white/5">
                  <FileUploadZone
                    label="ID / Passport Document"
                    name="idDocument"
                    file={form.idDocument}
                    onChange={f => { set("idDocument", f); clearError("idDocument"); }}
                    required
                  />
                  <FieldError field="idDocument" />
                </div>
                <div className="bg-primary/5 border border-primary/20 rounded-xl p-4">
                  <p className="text-white/70 text-sm">
                    <span className="text-primary font-medium">Requirements:</span> The document must be
                    valid (not expired), show your full name, date of birth, and the document number.
                    All four corners must be visible.
                  </p>
                </div>
              </div>
            )}

            {/* ── STEP 2: Address & Contact ─────────────────────────────── */}
            {step === 2 && (
              <form onSubmit={handleSubmit} className="space-y-6">
                <h2 className="text-xl font-semibold text-white mb-6 pb-3 border-b border-white/10">
                  Address &amp; Contact Details
                </h2>

                {/* Residential address */}
                <div className="space-y-4">
                  <h3 className="text-white/70 text-sm font-medium uppercase tracking-wider">Residential Address</h3>
                  <div>
                    <Label>Street Address</Label>
                    <Input placeholder="123 Main Street" value={form.street} onChange={e => set("street", e.target.value)} />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label>City</Label>
                      <Input placeholder="City" value={form.city} onChange={e => set("city", e.target.value)} />
                    </div>
                    <div>
                      <Label>State / Region</Label>
                      <Input placeholder="State / Region" value={form.state} onChange={e => set("state", e.target.value)} />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label>Postal / ZIP Code</Label>
                      <Input placeholder="12345" value={form.zip} onChange={e => set("zip", e.target.value)} />
                    </div>
                    <div>
                      <CountrySelect label="Country" value={form.country} onChange={v => set("country", v)} />
                    </div>
                  </div>
                </div>

                {/* Proof of address */}
                <div className="glass rounded-xl p-5 border border-white/5">
                  <FileUploadZone
                    label="Proof of Address"
                    name="addressProof"
                    file={form.addressProof}
                    onChange={f => set("addressProof", f)}
                    required
                  />
                  <p className="text-white/40 text-xs mt-2">Utility bill, bank statement, or government letter dated within 3 months.</p>
                </div>

                {/* Mailing address toggle */}
                <div className="glass rounded-xl p-5 border border-white/5 space-y-4">
                  <RadioGroup
                    label="Mailing address (if different from residential):"
                    name="differentMailing"
                    options={["Yes", "No"]}
                    value={form.differentMailing}
                    onChange={v => set("differentMailing", v)}
                  />
                  <AnimatePresence>
                    {form.differentMailing === "Yes" && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="space-y-4 pt-2">
                        <div>
                          <Label>Street Address</Label>
                          <Input placeholder="123 Mailing Street" value={form.mailingStreet} onChange={e => set("mailingStreet", e.target.value)} />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <Label>City</Label>
                            <Input placeholder="City" value={form.mailingCity} onChange={e => set("mailingCity", e.target.value)} />
                          </div>
                          <div>
                            <Label>State / Region</Label>
                            <Input placeholder="State / Region" value={form.mailingState} onChange={e => set("mailingState", e.target.value)} />
                          </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <Label>Postal / ZIP Code</Label>
                            <Input placeholder="12345" value={form.mailingZip} onChange={e => set("mailingZip", e.target.value)} />
                          </div>
                          <div>
                            <CountrySelect label="Country" value={form.mailingCountry} onChange={v => set("mailingCountry", v)} />
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Phone & Email */}
                <div className="space-y-4">
                  <h3 className="text-white/70 text-sm font-medium uppercase tracking-wider">Contact Information</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label required>Phone / Mobile</Label>
                      <Input
                        type="tel"
                        placeholder="+1 555 000 0000"
                        value={form.phone}
                        onChange={e => { set("phone", e.target.value); clearError("phone"); }}
                      />
                      <FieldError field="phone" />
                    </div>
                    <div>
                      <Label required>Email Address</Label>
                      <Input
                        type="email"
                        placeholder="you@example.com"
                        value={form.email}
                        onChange={e => { set("email", e.target.value); clearError("email"); }}
                      />
                      <FieldError field="email" />
                    </div>
                  </div>
                </div>

                {/* Social media */}
                <div className="space-y-4">
                  <h3 className="text-white/70 text-sm font-medium uppercase tracking-wider">Social Media (Optional)</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <Label>Facebook</Label>
                      <Input placeholder="facebook.com/..." value={form.facebook} onChange={e => set("facebook", e.target.value)} />
                    </div>
                    <div>
                      <Label>LinkedIn</Label>
                      <Input placeholder="linkedin.com/in/..." value={form.linkedin} onChange={e => set("linkedin", e.target.value)} />
                    </div>
                    <div>
                      <Label>Other</Label>
                      <Input placeholder="e.g. Twitter, Telegram" value={form.other} onChange={e => set("other", e.target.value)} />
                    </div>
                  </div>
                </div>

                <p className="text-white/30 text-xs">
                  By submitting this form you confirm that all information provided is accurate and complete.
                  Your data will be processed in accordance with our Privacy Policy and CySEC CASP registration requirements.
                </p>
              </form>
            )}

            {/* Navigation buttons */}
            <div className="flex items-center justify-between pt-8 mt-8 border-t border-white/10">
              <div>
                {step > 0 && (
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={handleBack}
                    className="text-white/60 hover:text-white hover:bg-white/5 gap-2"
                  >
                    <ChevronLeft className="w-4 h-4" /> Back
                  </Button>
                )}
              </div>
              <div className="text-white/30 text-sm">Step {step + 1} of {STEPS.length}</div>
              <div>
                {step < STEPS.length - 1 ? (
                  <Button
                    type="button"
                    onClick={handleNext}
                    className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold gap-2 shadow-[0_0_20px_rgba(0,255,156,0.25)]"
                  >
                    Next <ChevronRight className="w-4 h-4" />
                  </Button>
                ) : (
                  <Button
                    type="button"
                    onClick={handleSubmit as any}
                    disabled={submitting}
                    className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold gap-2 shadow-[0_0_20px_rgba(0,255,156,0.25)] min-w-[140px]"
                  >
                    {submitting ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                        </svg>
                        Submitting…
                      </span>
                    ) : (
                      <>Submit Application <Check className="w-4 h-4" /></>
                    )}
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default OpenPersonalAccount;
