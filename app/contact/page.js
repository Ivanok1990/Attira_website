"use client";

import { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
    // 👉 aquí puedes conectar Supabase o email service
  };

  return (
    <main className="bg-[#F6F6F6] text-[#8B3A4F] min-h-screen px-6 py-24">

      <div className="max-w-3xl mx-auto">

        {/* 🧠 Header */}
        <h1 className="text-5xl font-bold">
          Contact Us
        </h1>

        <p className="mt-4 text-[#9CA3AF]">
          Have questions, ideas, or want to collaborate? We’d love to hear from you.
        </p>

        {/* 📩 Form */}
        <form onSubmit={handleSubmit} className="mt-12 space-y-6">

          <div>
            <label className="block text-sm text-[#9CA3AF]">Name</label>
            <input
              type="text"
              name="name"
              onChange={handleChange}
              className="w-full mt-2 p-3 rounded-lg bg-[#E7DDDC] border border-[#1F2937] focus:border-[#8B3A4F] outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-[#9CA3AF]">Email</label>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              className="w-full mt-2 p-3 rounded-lg bg-[#E7DDDC] border border-[#1F2937] focus:border-[#60A5FA] outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-[#9CA3AF]">Message</label>
            <textarea
              name="message"
              rows="5"
              onChange={handleChange}
              className="w-full mt-2 p-3 rounded-lg bg-[#E7DDDC] border border-[#1F2937] focus:border-[#60A5FA] outline-none"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="bg-[#8B3A4F] text-black px-6 py-3 rounded-full font-medium hover:bg-[#93C5FD] transition"
          >
            Send Message →
          </button>

        </form>

        {/* 📧 Extra */}
        <div className="mt-12 text-[#9CA3AF] text-sm">
          Or reach us at: <span className="text-white">hello@attira.com</span>
        </div>

      </div>

    </main>
  );
}