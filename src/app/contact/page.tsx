"use client";

import { useState, memo } from "react";
import { usePersonal, useContactSubjects, useSocial } from "@/hooks";
import {
  Button,
  Section,
  SectionHeader,
  Card,
  Animate,
  MailIcon,
  PhoneIcon,
  LocationIcon,
  ArrowRightIcon,
  CheckIcon,
  GithubIcon,
  LinkedinIcon,
  TwitterIcon,
  DribbbleIcon,
} from "@/components/ui";
import { styles } from "@/lib";

const ContactForm = memo(function ContactForm() {
  const subjects = useContactSubjects();
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 800));
    setSubmitting(false);
    setSent(true);
    setForm({ name: "", email: "", subject: "", message: "" });
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className={styles.label}>Name</label>
            <input
              type="text"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className={styles.input}
              placeholder="John Smith"
            />
          </div>
          <div>
            <label className={styles.label}>Email</label>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className={styles.input}
              placeholder="john@example.com"
            />
          </div>
        </div>
        <div>
          <label className={styles.label}>Subject</label>
          <select
            required
            value={form.subject}
            onChange={(e) => setForm({ ...form, subject: e.target.value })}
            className={`${styles.input} cursor-pointer`}
          >
            <option value="">Select a subject</option>
            {subjects.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={styles.label}>Message</label>
          <textarea
            required
            rows={4}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className={`${styles.input} resize-none`}
            placeholder="Your message..."
          />
        </div>
        <Button type="submit" className="w-full" disabled={submitting}>
          {submitting ? (
            "Sending..."
          ) : (
            <span className="flex items-center gap-1.5">
              Send Message
              <ArrowRightIcon size={14} />
            </span>
          )}
        </Button>
        {sent && (
          <p className="flex items-center gap-1.5 text-white text-sm">
            <CheckIcon size={14} /> Message sent!
          </p>
        )}
      </form>
    </Card>
  );
});

export default function Contact() {
  const personal = usePersonal();
  const social = useSocial();

  const contactInfo = [
    {
      icon: <MailIcon size={18} />,
      label: "Email",
      value: personal.email,
      href: `mailto:${personal.email}`,
    },
    {
      icon: <PhoneIcon size={18} />,
      label: "Phone",
      value: personal.phone,
      href: `tel:${personal.phone.replace(/\D/g, "")}`,
    },
    {
      icon: <LocationIcon size={18} />,
      label: "Location",
      value: personal.location,
    },
  ];

  const socialLinks = [
    { icon: <GithubIcon />, href: social.github },
    { icon: <LinkedinIcon />, href: social.linkedin },
    { icon: <TwitterIcon />, href: social.twitter },
    { icon: <DribbbleIcon />, href: social.dribbble },
  ];

  return (
    <Section>
      <Animate>
        <SectionHeader
          label="Get in Touch"
          title="Let's Connect"
          description="Have a project in mind? I'd love to hear from you."
        />
      </Animate>

      <div className="grid lg:grid-cols-2 gap-8">
        <Animate delay={0.05}>
          <ContactForm />
        </Animate>

        <div className="space-y-5">
          <Animate delay={0.08}>
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">
              Contact Information
            </h2>
            <p className="text-gray-500 text-sm">
              I typically respond within 24-48 hours.
            </p>
          </Animate>

          {contactInfo.map((info, i) => (
            <Animate key={info.label} delay={0.1 + i * 0.02}>
              {info.href ? (
                <a
                  href={info.href}
                  className="flex items-center gap-3 p-3 border border-white/20 hover:border-white/40 transition-colors group"
                >
                  <div className="p-2 border border-white/20 text-white group-hover:bg-white group-hover:text-black transition-colors">
                    {info.icon}
                  </div>
                  <div>
                    <p className={styles.label}>{info.label}</p>
                    <p className="text-white text-sm">{info.value}</p>
                  </div>
                </a>
              ) : (
                <div className="flex items-center gap-3 p-3 border border-white/20">
                  <div className="p-2 border border-white/20 text-white">
                    {info.icon}
                  </div>
                  <div>
                    <p className={styles.label}>{info.label}</p>
                    <p className="text-white text-sm">{info.value}</p>
                  </div>
                </div>
              )}
            </Animate>
          ))}

          <Animate delay={0.16}>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider pt-2">
              Follow Me
            </h3>
            <div className="flex gap-2">
              {socialLinks.map((link, i) => (
                <a
                  key={i}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 border border-white/20 text-white hover:bg-white hover:text-black transition-colors"
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </Animate>

          <Animate delay={0.18}>
            <div className="border border-white p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 bg-white animate-pulse" />
                <span className="text-white text-xs font-medium uppercase tracking-wider">
                  {personal.available
                    ? "Currently Available"
                    : "Currently Unavailable"}
                </span>
              </div>
              <p className="text-gray-500 text-sm">
                Open to freelance, full-time, or collaborations.
              </p>
            </div>
          </Animate>
        </div>
      </div>
    </Section>
  );
}
