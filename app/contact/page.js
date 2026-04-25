"use client";

import { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (response.ok) {
        setForm({ name: "", email: "", message: "" });
        setShowSuccessMessage(true);
        setTimeout(() => setShowSuccessMessage(false), 5000); // Hide after 5 seconds
      } else {
        alert(`Error al enviar el mensaje: ${data.message || "Ha ocurrido un error."}`); // Keep alert for errors for now
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert("Error al enviar el mensaje. Por favor, inténtalo de nuevo más tarde.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative min-h-screen overflow-hidden pt-36 bg-[#F6F6F6]">
      <div className="max-w-3xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-[#8B3A4F] font-display">
            Contáctanos
          </h1>
          <p className="mt-6 text-lg text-[#4B5563] max-w-md mx-auto">
            ¿Tienes alguna duda, idea o quieres colaborar con nosotros? 
            Nos encantaría escucharte.
          </p>
        </div>

        {/* Formulario con tarjeta */}
        <div className="bg-white rounded-3xl shadow-sm p-10 md:p-12 border border-[#E7DDDC]">
          {showSuccessMessage && (
            <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6" role="alert">
              <p className="font-bold">¡Mensaje enviado con éxito!</p>
              <p>Gracias por contactarnos. Te responderemos lo antes posible.</p>
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <label className="block text-sm text-[#9CA3AF] mb-2 font-medium">
                Nombre completo
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full p-4 rounded-2xl bg-[#F6F6F6] border border-[#E7DDDC] 
                           focus:border-[#8B3A4F] outline-none transition-all text-[#131416]"
                placeholder="Escribe tu nombre"
                required
              />
            </div>

            <div>
              <label className="block text-sm text-[#9CA3AF] mb-2 font-medium">
                Correo electrónico
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full p-4 rounded-2xl bg-[#F6F6F6] border border-[#E7DDDC] 
                           focus:border-[#8B3A4F] outline-none transition-all text-[#131416]"
                placeholder="tu@email.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm text-[#9CA3AF] mb-2 font-medium">
                Mensaje
              </label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows="6"
                className="w-full p-4 rounded-3xl bg-[#F6F6F6] border border-[#E7DDDC] 
                           focus:border-[#8B3A4F] outline-none resize-y min-h-[160px] transition-all text-[#131416]"
                placeholder="Cuéntanos cómo podemos ayudarte..."
                required
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#8B3A4F] hover:bg-[#653F3C] disabled:bg-gray-400 
                         text-white py-4 rounded-full font-semibold text-lg 
                         transition-all active:scale-[0.985]"
            >
              {isSubmitting ? "Enviando mensaje..." : "Enviar mensaje →"}
            </button>
          </form>
        </div>

        {/* Contacto alternativo */}
        <div className="mt-12 text-center pb-16">
          <p className="text-[#9CA3AF] text-sm">O escríbenos directamente a:</p>
          <a 
            href="mailto:contact@attiraai.com"
            className="mt-2 inline-block text-[#8B3A4F] hover:text-[#653F3C] font-medium text-lg transition-colors"
          >
            contact@attiraai.com
          </a>
        </div>
      </div>
    </section>
  );
}