/**
 * Google Ads & Analytics tracking helper for OSO Logistics
 * Supports gtag.js, Google Tag Manager, and custom conversion events.
 */

declare global {
  interface Window {
    dataLayer?: any[];
    gtag?: (...args: any[]) => void;
  }
}

/**
 * Safely dispatches a Google Tag / Google Ads event
 */
export function trackEvent(eventName: string, params: Record<string, any> = {}) {
  try {
    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      window.gtag("event", eventName, params);
    } else if (typeof window !== "undefined" && Array.isArray(window.dataLayer)) {
      window.dataLayer.push({ event: eventName, ...params });
    }
  } catch (error) {
    console.debug("Analytics event failed to dispatch:", error);
  }
}

/**
 * Track lead submission (e.g. Quote Request Form)
 */
export function trackLeadSubmission(data: {
  serviceType: string;
  origin?: string;
  destination?: string;
}) {
  trackEvent("generate_lead", {
    event_category: "Leads",
    event_label: data.serviceType,
    service_type: data.serviceType,
    route: `${data.origin || "Sin origen"} -> ${data.destination || "Sin destino"}`,
    value: 1,
    currency: "MXN",
  });

  // Also trigger Google Ads default conversion label if available
  trackEvent("conversion", {
    send_to: "default",
    value: 1.0,
    currency: "MXN",
  });
}

/**
 * Track direct WhatsApp contact click
 */
export function trackWhatsAppClick(placement: string) {
  trackEvent("contact_whatsapp", {
    event_category: "Engagement",
    event_label: placement,
    channel: "whatsapp",
  });
}

/**
 * Track direct Phone Call click
 */
export function trackPhoneClick(placement: string) {
  trackEvent("contact_phone", {
    event_category: "Engagement",
    event_label: placement,
    channel: "phone",
  });
}
