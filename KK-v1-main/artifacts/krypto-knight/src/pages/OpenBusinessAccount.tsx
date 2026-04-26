import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import {
  Building2, FileText, MapPin, ChevronRight, ChevronLeft,
  Check, Upload, X, AlertCircle,
} from "lucide-react";

// ── Countries ────────────────────────────────────────────────────────────────
const COUNTRIES = ["Afghanistan","Albania","Algeria","American Samoa","Andorra","Angola","Anguilla","Antarctica","Antigua and Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bonaire, Sint Eustatius and Saba","Bosnia and Herzegovina","Botswana","Bouvet Island","Brazil","British Indian Ocean Territory","Brunei Darussalam","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Canada","Cape Verde","Cayman Islands","Central African Republic","Chad","Chile","China","Christmas Island","Cocos Islands","Colombia","Comoros","Congo, Democratic Republic of the","Congo, Republic of the","Cook Islands","Costa Rica","Croatia","Cuba","Curaçao","Cyprus","Czech Republic","Côte d'Ivoire","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Eritrea","Estonia","Eswatini (Swaziland)","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Guiana","French Polynesia","French Southern Territories","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guadeloupe","Guam","Guatemala","Guernsey","Guinea","Guinea-Bissau","Guyana","Haiti","Heard and McDonald Islands","Holy See","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kiribati","Kuwait","Kyrgyzstan","Lao People's Democratic Republic","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Marshall Islands","Martinique","Mauritania","Mauritius","Mayotte","Mexico","Micronesia","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Myanmar","Namibia","Nauru","Nepal","Netherlands","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","Niue","Norfolk Island","North Korea","Northern Mariana Islands","Norway","Oman","Pakistan","Palau","Palestine, State of","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Pitcairn","Poland","Portugal","Puerto Rico","Qatar","Romania","Russia","Rwanda","Réunion","Saint Barthélemy","Saint Helena","Saint Kitts and Nevis","Saint Lucia","Saint Martin","Saint Pierre and Miquelon","Saint Vincent and the Grenadines","Samoa","San Marino","Sao Tome and Principe","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Sint Maarten","Slovakia","Slovenia","Solomon Islands","Somalia","South Africa","South Georgia","South Korea","South Sudan","Spain","Sri Lanka","Sudan","Suriname","Svalbard and Jan Mayen Islands","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor-Leste","Togo","Tokelau","Tonga","Trinidad and Tobago","Tunisia","Turkey","Turkmenistan","Turks and Caicos Islands","Tuvalu","US Minor Outlying Islands","Uganda","Ukraine","United Arab Emirates","United Kingdom","United States","Uruguay","Uzbekistan","Vanuatu","Venezuela","Vietnam","Virgin Islands, British","Virgin Islands, U.S.","Wallis and Futuna","Western Sahara","Yemen","Zambia","Zimbabwe","Åland Islands"];

const ANNUAL_INCOME = ["0", "EUR 300 – EUR 1,000", "EUR 1,000 – EUR 3,000", "Over EUR 3,000"];

// ── Reusable components (same design system as Personal form) ────────────────
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
  label, file, onChange, required, hint,
}: {
  label: string; file: File | null;
  onChange: (f: File | null) => void; required?: boolean; hint?: string;
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
    {hint && <p className="text-white/40 text-xs mt-2">{hint}</p>}
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

// ── Steps ─────────────────────────────────────────────────────────────────────
const STEPS = [
  { label: "Company Info", icon: Building2 },
  { label: "Documents", icon: FileText },
  { label: "Address & Contact", icon: MapPin },
];

// ── Initial state ─────────────────────────────────────────────────────────────
const initialState = {
  // Step 1
  legalName: "",
  countryOfIncorporation: "",
  tradingName: "",
  incorporationDate: "",
  registrationNumber: "",
  hasTaxId: "",
  taxId: "",
  noTaxIdReason: "",
  businessActivities: "",
  yearsOfOperation: "",
  numberOfEmployees: "",
  annualIncome: "",
  partOfGroup: "",
  groupDetails: "",
  isRegulated: "",
  licenseNumber: "",
  issuingRegulator: "",
  incorporationDoc: null as File | null,
  // Step 2
  additionalDoc: null as File | null,
  // Step 3
  regStreet: "", regCity: "", regState: "", regZip: "", regCountry: "",
  sameAsBusiness: "",
  bizStreet: "", bizCity: "", bizState: "", bizZip: "", bizCountry: "",
  addressProof: null as File | null,
  phone: "",
  email: "",
  website: "",
};

type FormState = typeof initialState;

// ── Component ─────────────────────────────────────────────────────────────────
const OpenBusinessAccount = () => {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const set = (field: keyof FormState, value: FormState[keyof FormState]) =>
    setForm(prev => ({ ...prev, [field]: value }));

  const clearError = (field: keyof FormState) =>
    setErrors(prev => { const next = { ...prev }; delete next[field]; return next; });

  const validateStep = (s: number): boolean => {
    const errs: Partial<Record<keyof FormState, string>> = {};
    if (s === 0) {
      if (!form.legalName.trim()) errs.legalName = "Company legal name is required";
      if (!form.countryOfIncorporation) errs.countryOfIncorporation = "Country of incorporation is required";
      if (!form.incorporationDate) errs.incorporationDate = "Incorporation date is required";
      if (!form.hasTaxId) errs.hasTaxId = "Please select an option";
      if (form.hasTaxId === "Yes" && !form.taxId.trim()) errs.taxId = "Tax ID is required";
      if (!form.businessActivities.trim()) errs.businessActivities = "Business activities are required";
      if (!form.yearsOfOperation.trim()) errs.yearsOfOperation = "Years of operation is required";
      if (!form.numberOfEmployees.trim()) errs.numberOfEmployees = "Number of employees is required";
      if (!form.partOfGroup) errs.partOfGroup = "Please select an option";
      if (!form.incorporationDoc) errs.incorporationDoc = "Please upload the certificate of incorporation";
    }
    if (s === 1) {
      if (!form.additionalDoc) errs.additionalDoc = "Please upload the required additional document";
    }
    if (s === 2) {
      if (!form.email.trim()) errs.email = "Email is required";
      if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
        errs.email = "Invalid email address";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => { if (validateStep(step)) setStep(s => s + 1); };
  const handleBack = () => { setErrors({}); setStep(s => s - 1); };

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
            Thank you for submitting your business account application. Our compliance team will
            review your documents and contact you within 2–5 business days.
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
            <Building2 className="w-4 h-4 text-primary" />
            <span className="text-primary text-sm font-medium">Business Account</span>
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold text-white mb-3">
            Open a Business Account
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Complete the steps below to apply for your corporate Krypto Knight account.
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
            {/* ── STEP 0: Company Information ───────────────────────────── */}
            {step === 0 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-white mb-6 pb-3 border-b border-white/10">
                  Company Information
                </h2>

                {/* Legal & trading name */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label required>Company's Legal Name</Label>
                    <Input
                      placeholder="e.g. Acme Holdings Ltd"
                      value={form.legalName}
                      onChange={e => { set("legalName", e.target.value); clearError("legalName"); }}
                    />
                    <FieldError field="legalName" />
                  </div>
                  <div>
                    <Label>Trading Name (if different)</Label>
                    <Input
                      placeholder="e.g. Acme Corp"
                      value={form.tradingName}
                      onChange={e => set("tradingName", e.target.value)}
                    />
                  </div>
                </div>

                {/* Country + Date */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <CountrySelect
                      label="Country of Incorporation"
                      value={form.countryOfIncorporation}
                      onChange={v => { set("countryOfIncorporation", v); clearError("countryOfIncorporation"); }}
                      required
                    />
                    <FieldError field="countryOfIncorporation" />
                  </div>
                  <div>
                    <Label required>Incorporation Date</Label>
                    <Input
                      type="date"
                      value={form.incorporationDate}
                      onChange={e => { set("incorporationDate", e.target.value); clearError("incorporationDate"); }}
                    />
                    <FieldError field="incorporationDate" />
                  </div>
                </div>

                {/* Registration number */}
                <div>
                  <Label>Registration Number</Label>
                  <Input
                    placeholder="Company registration / HE number"
                    value={form.registrationNumber}
                    onChange={e => set("registrationNumber", e.target.value)}
                  />
                </div>

                {/* Tax ID section */}
                <div className="glass rounded-xl p-5 space-y-4 border border-white/5">
                  <RadioGroup
                    label="Please provide your company's Tax Identification Number if available."
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
                          placeholder="Enter company TIN"
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
                </div>

                {/* Business activities */}
                <div>
                  <Label required>Business Activities</Label>
                  <Textarea
                    placeholder="Describe your company's main business activities..."
                    value={form.businessActivities}
                    onChange={e => { set("businessActivities", e.target.value); clearError("businessActivities"); }}
                  />
                  <FieldError field="businessActivities" />
                </div>

                {/* Years, employees, income */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <Label required>Years of Operation</Label>
                    <Input
                      type="number"
                      min="0"
                      placeholder="e.g. 5"
                      value={form.yearsOfOperation}
                      onChange={e => { set("yearsOfOperation", e.target.value); clearError("yearsOfOperation"); }}
                    />
                    <FieldError field="yearsOfOperation" />
                  </div>
                  <div>
                    <Label required>Number of Employees</Label>
                    <Input
                      type="number"
                      min="0"
                      placeholder="e.g. 25"
                      value={form.numberOfEmployees}
                      onChange={e => { set("numberOfEmployees", e.target.value); clearError("numberOfEmployees"); }}
                    />
                    <FieldError field="numberOfEmployees" />
                  </div>
                  <div>
                    <Label>Annual Income</Label>
                    <Select value={form.annualIncome} onChange={e => set("annualIncome", e.target.value)}>
                      <option value="">Select range</option>
                      {ANNUAL_INCOME.map(v => <option key={v} value={v}>{v}</option>)}
                    </Select>
                  </div>
                </div>

                {/* Group membership */}
                <div className="glass rounded-xl p-5 space-y-4 border border-white/5">
                  <RadioGroup
                    label="Are you part of a Group?"
                    name="partOfGroup"
                    options={["Yes", "No"]}
                    value={form.partOfGroup}
                    onChange={v => { set("partOfGroup", v); clearError("partOfGroup"); }}
                    required
                  />
                  <FieldError field="partOfGroup" />
                  <AnimatePresence>
                    {form.partOfGroup === "Yes" && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}>
                        <Label>Tell us more about the Group</Label>
                        <Textarea
                          placeholder="Describe the group structure and your company's role..."
                          value={form.groupDetails}
                          onChange={e => set("groupDetails", e.target.value)}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Regulated entity */}
                <div className="glass rounded-xl p-5 space-y-4 border border-white/5">
                  <RadioGroup
                    label="Are you a regulated entity?"
                    name="isRegulated"
                    options={["Yes", "No"]}
                    value={form.isRegulated}
                    onChange={v => set("isRegulated", v)}
                  />
                  <AnimatePresence>
                    {form.isRegulated === "Yes" && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <Label>License Number</Label>
                          <Input
                            placeholder="e.g. 015/24"
                            value={form.licenseNumber}
                            onChange={e => set("licenseNumber", e.target.value)}
                          />
                        </div>
                        <div>
                          <Label>Issuing Authority / Regulator</Label>
                          <Input
                            placeholder="e.g. CySEC"
                            value={form.issuingRegulator}
                            onChange={e => set("issuingRegulator", e.target.value)}
                          />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Certificate of incorporation upload */}
                <div className="glass rounded-xl p-5 border border-white/5">
                  <FileUploadZone
                    label="Certificate of Incorporation / Company Registration"
                    file={form.incorporationDoc}
                    onChange={f => { set("incorporationDoc", f); clearError("incorporationDoc"); }}
                    required
                    hint="Official document confirming your company's legal incorporation."
                  />
                  <FieldError field="incorporationDoc" />
                </div>
              </div>
            )}

            {/* ── STEP 1: Additional Documents ──────────────────────────── */}
            {step === 1 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-white mb-6 pb-3 border-b border-white/10">
                  Additional Documents
                </h2>
                <p className="text-muted-foreground text-sm">
                  Please upload supporting documents such as the company's Memorandum &amp; Articles of
                  Association, a Certificate of Good Standing, or any other relevant corporate documents.
                </p>
                <div className="glass rounded-xl p-5 border border-white/5">
                  <FileUploadZone
                    label="Supporting Corporate Document"
                    file={form.additionalDoc}
                    onChange={f => { set("additionalDoc", f); clearError("additionalDoc"); }}
                    required
                    hint="M&A, Certificate of Good Standing, shareholder register, or similar."
                  />
                  <FieldError field="additionalDoc" />
                </div>
                <div className="bg-primary/5 border border-primary/20 rounded-xl p-4">
                  <p className="text-white/70 text-sm">
                    <span className="text-primary font-medium">Note:</span> Our compliance team may
                    request additional documents during the review process. All documents are handled
                    in accordance with CySEC CASP requirements and our Privacy Policy.
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

                {/* Registered office address */}
                <div className="space-y-4">
                  <h3 className="text-white/70 text-sm font-medium uppercase tracking-wider">Registered Office Address</h3>
                  <div>
                    <Label>Street Address</Label>
                    <Input placeholder="123 Business Avenue" value={form.regStreet} onChange={e => set("regStreet", e.target.value)} />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div><Label>City</Label><Input placeholder="City" value={form.regCity} onChange={e => set("regCity", e.target.value)} /></div>
                    <div><Label>State / Region</Label><Input placeholder="State / Region" value={form.regState} onChange={e => set("regState", e.target.value)} /></div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div><Label>Postal / ZIP Code</Label><Input placeholder="12345" value={form.regZip} onChange={e => set("regZip", e.target.value)} /></div>
                    <div><CountrySelect label="Country" value={form.regCountry} onChange={v => set("regCountry", v)} /></div>
                  </div>
                </div>

                {/* Official business location */}
                <div className="glass rounded-xl p-5 border border-white/5 space-y-4">
                  <RadioGroup
                    label="Official business location: Same as registered office address?"
                    name="sameAsBusiness"
                    options={["Yes", "No"]}
                    value={form.sameAsBusiness}
                    onChange={v => set("sameAsBusiness", v)}
                  />
                  <AnimatePresence>
                    {form.sameAsBusiness === "No" && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="space-y-4 pt-2">
                        <h3 className="text-white/70 text-sm font-medium uppercase tracking-wider">Business Location Address</h3>
                        <div><Label>Street Address</Label><Input placeholder="123 Operations Street" value={form.bizStreet} onChange={e => set("bizStreet", e.target.value)} /></div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div><Label>City</Label><Input placeholder="City" value={form.bizCity} onChange={e => set("bizCity", e.target.value)} /></div>
                          <div><Label>State / Region</Label><Input placeholder="State / Region" value={form.bizState} onChange={e => set("bizState", e.target.value)} /></div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div><Label>Postal / ZIP Code</Label><Input placeholder="12345" value={form.bizZip} onChange={e => set("bizZip", e.target.value)} /></div>
                          <div><CountrySelect label="Country" value={form.bizCountry} onChange={v => set("bizCountry", v)} /></div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Proof of address upload */}
                <div className="glass rounded-xl p-5 border border-white/5">
                  <FileUploadZone
                    label="Proof of Business Address"
                    file={form.addressProof}
                    onChange={f => set("addressProof", f)}
                    hint="Utility bill, lease agreement, or bank statement dated within 3 months."
                  />
                </div>

                {/* Contact details */}
                <div className="space-y-4">
                  <h3 className="text-white/70 text-sm font-medium uppercase tracking-wider">Contact Information</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label>Phone / Mobile</Label>
                      <Input
                        type="tel"
                        placeholder="+357 22 000 000"
                        value={form.phone}
                        onChange={e => set("phone", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label required>Business Email</Label>
                      <Input
                        type="email"
                        placeholder="contact@company.com"
                        value={form.email}
                        onChange={e => { set("email", e.target.value); clearError("email"); }}
                      />
                      <FieldError field="email" />
                    </div>
                  </div>
                  <div>
                    <Label>Business Website</Label>
                    <Input
                      type="url"
                      placeholder="https://www.company.com"
                      value={form.website}
                      onChange={e => set("website", e.target.value)}
                    />
                  </div>
                </div>

                <p className="text-white/30 text-xs">
                  By submitting this form you confirm that all information provided is accurate and
                  complete. Your data will be processed in accordance with our Privacy Policy and
                  CySEC CASP registration requirements (Reg. No. 015/24).
                </p>
              </form>
            )}

            {/* Navigation */}
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

export default OpenBusinessAccount;
