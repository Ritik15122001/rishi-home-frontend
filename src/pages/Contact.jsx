import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import Picture from "../components/Picture";
import SectionHead from "../components/SectionHead";
import FaqBlock from "../components/FaqBlock";
import useReveal from "../hooks/useReveal";
import { submitConsultation } from "../lib/api";
import { BRAND, PROPERTY_TYPES, BUDGETS, HOME_SIZES } from "../lib/content";
import { PhoneIcon, MailIcon, PinIcon, ClockIcon, Arrow, Tick } from "../lib/icons";

const RE_EMAIL = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;
const RE_PHONE = /^(\+?\d{1,3}[\s-]?)?[6-9]\d{9}$/;

const initialForm = { name: "", phone: "", email: "", city: "", property: "", size: "", budget: "", message: "" };

export default function Contact() {
  const rootRef = useRef(null);
  useReveal(rootRef, []);

  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState("");

  function update(name, value) {
    setForm((f) => ({ ...f, [name]: value }));
  }

  function validate(values) {
    const e = {};
    if (!values.name || values.name.trim().length < 2) e.name = "Please enter your name.";
    if (!values.phone || !RE_PHONE.test(values.phone.replace(/[\s-]/g, ""))) e.phone = "Enter a valid 10-digit mobile number.";
    if (!values.email || !RE_EMAIL.test(values.email)) e.email = "Enter a valid email address.";
    return e;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setTouched(true);
    setServerError("");
    const validation = validate(form);
    setErrors(validation);
    if (Object.keys(validation).length) return;

    setSubmitting(true);
    try {
      await submitConsultation(form);
      setSubmitted(true);
    } catch (err) {
      setServerError((err.response && err.response.data && err.response.data.message) || "Something went wrong. Please try again or call us.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div ref={rootRef} data-nav="light">
      <div className="contact-split">
        <div className="contact-media">
          <Picture id="photo-1696987007764-7f8b85dd3033" alt="Marble and brass bathroom interior by Rishi Home Interior" w={1200} h={1600} eager sizes="(max-width:1080px) 100vw, 42vw" />
          <div className="contact-media-in">
            <span className="label on-dark">Get in touch</span>
            <h1 className="d2" style={{ color: "#F7F4EE" }}>
              Let&rsquo;s design
              <br />
              your <em>space.</em>
            </h1>
            <div className="cinfo">
              <a href={BRAND.phoneHref}>
                <PhoneIcon />
                <span>{BRAND.phone}</span>
              </a>
              <a href={`mailto:${BRAND.email}`}>
                <MailIcon />
                <span>{BRAND.email}</span>
              </a>
              <p>
                <PinIcon />
                <span>{BRAND.address}</span>
              </p>
              <p>
                <ClockIcon />
                <span>{BRAND.hours}</span>
              </p>
            </div>
          </div>
        </div>

        <div className="form-wrap">
          <div id="formHost">
            {submitted ? (
              <div className="success" role="status">
                <span className="tick">
                  <Tick />
                </span>
                <h2 className="d3">Thank you.</h2>
                <p className="lede">
                  Our design team will get in touch with you shortly — usually within one working day. If it is
                  urgent, call us on{" "}
                  <a href={BRAND.phoneHref} style={{ color: "var(--accent)", textDecoration: "underline", textUnderlineOffset: "3px" }}>
                    {BRAND.phone}
                  </a>
                  .
                </p>
                <Link className="btn btn-ghost" to="/design-ideas">
                  Browse design ideas <Arrow />
                </Link>
              </div>
            ) : (
              <>
                <span className="label rv">Free consultation</span>
                <h2 className="d3 rv" data-d="1" style={{ margin: "14px 0 14px" }}>
                  Tell us about
                  <br />
                  your <em>home.</em>
                </h2>
                <p className="lede rv" data-d="2" style={{ marginBottom: "clamp(26px,3vw,40px)" }}>
                  Share a few details and a designer will call you back within one working day. No obligation, no
                  charge.
                </p>
                <form className="form rv" data-d="3" noValidate onSubmit={handleSubmit}>
                  <div className="f2">
                    <Field label="Name" name="name" req value={form.name} onChange={update} placeholder="Your full name" autoComplete="name" error={touched && errors.name} />
                    <Field label="Phone" name="phone" req type="tel" inputMode="tel" value={form.phone} onChange={update} placeholder="10-digit mobile number" autoComplete="tel" error={touched && errors.phone} />
                  </div>
                  <div className="f2">
                    <Field label="Email" name="email" req type="email" value={form.email} onChange={update} placeholder="you@example.com" autoComplete="email" error={touched && errors.email} />
                    <Field label="City" name="city" value={form.city} onChange={update} placeholder="Delhi" autoComplete="address-level2" />
                  </div>
                  <div className="f2">
                    <SelectField label="Property type" name="property" options={PROPERTY_TYPES} value={form.property} onChange={update} />
                    <SelectField label="Home size" name="size" options={HOME_SIZES} value={form.size} onChange={update} />
                  </div>
                  <SelectField label="Budget range" name="budget" options={BUDGETS} value={form.budget} onChange={update} />
                  <TextareaField label="Message" name="message" value={form.message} onChange={update} placeholder="Rooms you want designed, timelines, anything else we should know" />

                  {serverError && (
                    <p className="err-msg" role="alert">
                      {serverError}
                    </p>
                  )}

                  <div style={{ display: "flex", flexWrap: "wrap", gap: 18, alignItems: "center", marginTop: 6 }}>
                    <button className="btn" type="submit" disabled={submitting}>
                      {submitting ? "Sending…" : "Request consultation"} {!submitting && <Arrow />}
                    </button>
                    <span className="form-note">We reply within one working day.</span>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      </div>

      <section className="sec">
        <div className="wrap">
          <SectionHead
            ix="FAQ"
            label="Before you ask"
            title="Frequently asked<br><em>questions.</em>"
            aside={<p className="lede">Still unsure about something? Call the studio on {BRAND.phone} — we would rather answer it properly than in a form.</p>}
          />
          <FaqBlock />
        </div>
      </section>
    </div>
  );
}

function Field({ label, name, value, onChange, req, error, type = "text", ...rest }) {
  const id = "f_" + name;
  return (
    <div className={"field" + (error ? " err" : "")} data-field={name}>
      <label htmlFor={id}>
        {label}
        {req ? " *" : ""}
      </label>
      <input id={id} name={name} type={type} value={value} onChange={(e) => onChange(name, e.target.value)} aria-describedby={id + "_e"} {...rest} />
      <span className="err-msg" id={id + "_e"} role="alert">
        {error || ""}
      </span>
    </div>
  );
}

function SelectField({ label, name, options, value, onChange }) {
  const id = "f_" + name;
  return (
    <div className="field" data-field={name}>
      <label htmlFor={id}>{label}</label>
      <select id={id} name={name} value={value} onChange={(e) => onChange(name, e.target.value)}>
        <option value="">Select&hellip;</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      <span className="err-msg"></span>
    </div>
  );
}

function TextareaField({ label, name, value, onChange, placeholder }) {
  const id = "f_" + name;
  return (
    <div className="field" data-field={name}>
      <label htmlFor={id}>{label}</label>
      <textarea id={id} name={name} rows={3} placeholder={placeholder} value={value} onChange={(e) => onChange(name, e.target.value)}></textarea>
      <span className="err-msg"></span>
    </div>
  );
}
