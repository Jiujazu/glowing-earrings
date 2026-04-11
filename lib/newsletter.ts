// Newsletter provider abstraction
// The concrete provider will be swapped in once Julian decides (Buttondown, Loops, or Listmonk)

export interface NewsletterResult {
  success: boolean;
  message: string;
}

interface SubscribeOptions {
  firstName?: string;
  source?: string; // e.g. "course-karpathy-llm-wiki", "footer", "landing"
}

export async function subscribeToNewsletter(
  email: string,
  options?: SubscribeOptions
): Promise<NewsletterResult> {
  const apiKey = process.env.NEWSLETTER_API_KEY;

  if (!apiKey) {
    console.warn("NEWSLETTER_API_KEY not set — signup not sent");
    console.log(`[Newsletter Signup] ${email}`, options);
    return {
      success: false,
      message: "Der Newsletter ist noch nicht aktiv. Schau bald wieder vorbei!",
    };
  }

  // TODO: Replace with actual provider implementation
  // Example for Buttondown:
  // const response = await fetch("https://api.buttondown.email/v1/subscribers", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //     Authorization: `Token ${apiKey}`,
  //   },
  //   body: JSON.stringify({
  //     email,
  //     metadata: { firstName: options?.firstName, source: options?.source },
  //     tags: [options?.source].filter(Boolean),
  //   }),
  // });

  console.log(`[Newsletter Signup] ${email}`, options);
  return {
    success: true,
    message: "Willkommen! Check deine Inbox für die Bestätigung.",
  };
}
