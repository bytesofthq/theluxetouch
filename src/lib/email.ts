interface BookingNotificationParams {
  bookingReference: string;
  customerName: string;
  phone: string;
  serviceName: string;
  preferredDate: string;
  preferredTime: string;
  address: string;
}

export async function sendBookingNotificationEmail(params: BookingNotificationParams): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  const adminEmail = process.env.ADMIN_NOTIFICATION_EMAIL;
  const fromEmail = process.env.EMAIL_FROM || "concierge@theluxetouch.com";

  if (!apiKey || !adminEmail) {
    // Optional integration fails gracefully when unconfigured
    console.log("[Email Notification Skipped] Resend API key or admin notification email not configured.");
    return false;
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: adminEmail,
        subject: `New Luxe Touch Booking Enquiry: ${params.bookingReference} - ${params.customerName}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #EAE7E0; border-radius: 8px;">
            <h2 style="color: #073C33;">New Luxury In-Home Appointment Enquiry</h2>
            <p><strong>Reference:</strong> ${params.bookingReference}</p>
            <p><strong>Customer:</strong> ${params.customerName} (${params.phone})</p>
            <p><strong>Service:</strong> ${params.serviceName}</p>
            <p><strong>Date & Time:</strong> ${params.preferredDate} at ${params.preferredTime}</p>
            <p><strong>Venue Address:</strong> ${params.address}</p>
            <hr style="border: none; border-top: 1px solid #EAE7E0; margin: 20px 0;" />
            <p style="font-size: 12px; color: #827B72;">Review and update this booking in The Luxe Touch Admin Portal.</p>
          </div>
        `,
      }),
    });

    return res.ok;
  } catch (error) {
    console.warn("Failed to send transactional email notification:", error);
    return false;
  }
}

