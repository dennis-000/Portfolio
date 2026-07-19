import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import fs from "fs";
import path from "path";

// Beautiful, responsive HTML newsletter template
function generateEmailHtml(title: string, body: string, headerImage: string, blogPost?: any) {
  const blogSection = blogPost ? `
    <div style="margin-top: 30px; padding: 20px; border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; background-color: rgba(255,255,255,0.02); text-align: left;">
      <span style="font-size: 10px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; color: #f43f5e;">Featured Article</span>
      <h3 style="font-size: 16px; font-weight: bold; margin: 10px 0; color: #ffffff;">${blogPost.title}</h3>
      <p style="font-size: 13px; color: #94a3b8; line-height: 1.6; margin-bottom: 15px;">${blogPost.excerpt}</p>
      <a href="https://dennis-portfolio-ruddy.vercel.app/blog/${blogPost.slug}" style="display: inline-block; font-size: 12px; font-weight: bold; color: #ffffff; background-color: #f43f5e; padding: 8px 16px; border-radius: 8px; text-decoration: none;">Read Full Article</a>
    </div>
  ` : "";

  const banner = headerImage ? `
    <img src="${headerImage}" alt="${title}" style="width: 100%; max-height: 240px; object-cover: cover; border-radius: 8px; margin-bottom: 20px;" />
  ` : "";

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>${title}</title>
      </head>
      <body style="margin: 0; padding: 0; background-color: #070708; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #e2e8f0; -webkit-font-smoothing: antialiased;">
        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #070708; padding: 40px 20px;">
          <tr>
            <td align="center">
              <table width="100%" max-width="600" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; background-color: #0f0f11; border: 1px solid rgba(255,255,255,0.05); border-radius: 16px; padding: 30px; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
                <!-- Header logo -->
                <tr>
                  <td align="left" style="border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 20px; margin-bottom: 25px;">
                    <span style="font-size: 14px; font-weight: bold; letter-spacing: 2px; text-transform: uppercase; color: #ffffff;">Dennis Opoku Asiedu</span>
                  </td>
                </tr>
                
                <!-- Main Body -->
                <tr>
                  <td align="left" style="padding-top: 20px;">
                    ${banner}
                    <h1 style="font-size: 22px; font-weight: bold; margin-top: 0; margin-bottom: 15px; color: #ffffff; line-height: 1.3;">${title}</h1>
                    <div style="font-size: 14px; color: #94a3b8; line-height: 1.8; white-space: pre-line; margin-bottom: 20px;">
                      ${body}
                    </div>
                    ${blogSection}
                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td align="center" style="border-top: 1px solid rgba(255,255,255,0.05); margin-top: 35px; padding-top: 25px; font-size: 11px; color: #64748b; line-height: 1.5;">
                    <p style="margin: 0;">Sent by Dennis Opoku Asiedu • Accra, Ghana</p>
                    <p style="margin: 5px 0 0 0;">To unsubscribe, reply directly to this email or hello@dennisopoku.com</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;
}

export async function POST(request: Request) {
  try {
    // Validate session
    const cookieStore = await cookies();
    const token = cookieStore.get("admin_token");

    if (!token || token.value !== "authorized_session") {
      return NextResponse.json(
        { success: false, error: "Unauthorized session" },
        { status: 401 }
      );
    }

    const { subject, headerImage, title, body, featuredSlug } = await request.json();

    if (!subject || !title || !body) {
      return NextResponse.json(
        { success: false, error: "Please fill in Subject, Title, and Main Body Content." },
        { status: 400 }
      );
    }

    // Retrieve database
    const filePath = path.join(process.cwd(), "src/lib/data.json");
    const fileContent = fs.readFileSync(filePath, "utf8");
    const data = JSON.parse(fileContent);

    const subscribers = data.SUBSCRIBERS || [];
    if (subscribers.length === 0) {
      return NextResponse.json(
        { success: false, error: "No subscribers found in your audience database." },
        { status: 400 }
      );
    }

    // Find optional blog post details
    let blogPost = null;
    if (featuredSlug && data.BLOG_POSTS) {
      blogPost = data.BLOG_POSTS.find((p: any) => p.slug === featuredSlug);
    }

    // Generate HTML
    const htmlContent = generateEmailHtml(title, body, headerImage, blogPost);

    // Save broadcast record to history
    if (!data.NEWSLETTERS) data.NEWSLETTERS = [];
    data.NEWSLETTERS.push({
      id: Date.now().toString(),
      subject,
      title,
      date: new Date().toISOString().split("T")[0],
      recipients: subscribers.length,
    });
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");

    // Check if Resend Key is configured
    const apiKey = process.env.RESEND_API_KEY;

    if (apiKey) {
      // Trigger automated Resend broadcast
      // Since Resend onboarding API has a 1-to-1 restriction, we chunk or map deliveries
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Dennis Opoku Asiedu <onboarding@resend.dev>",
          to: subscribers.length === 1 ? subscribers[0] : "asiedudennis30@gmail.com", // testing safety
          bcc: subscribers.length > 1 ? subscribers.filter((email: string) => email !== "asiedudennis30@gmail.com") : undefined,
          subject: subject,
          html: htmlContent,
        }),
      });

      const resJson = await res.json();
      if (res.ok) {
        return NextResponse.json({ success: true, message: `Successfully broadcasted to ${subscribers.length} subscribers!` });
      } else {
        return NextResponse.json({ 
          success: false, 
          error: resJson.message || "Failed to trigger Resend API. Falling back to desktop client.", 
          fallback: true,
          subscribers,
          subject,
          textBody: `${title}\n\n${body}\n\nRead more: https://dennis-portfolio-ruddy.vercel.app/blog`,
          htmlBody: htmlContent
        });
      }
    }

    // If no API key, return parameters for mailto desktop fallback launch
    return NextResponse.json({
      success: false,
      fallback: true,
      subscribers,
      subject,
      textBody: `${title}\n\n${body}\n\n${blogPost ? `Read featured post: https://dennis-portfolio-ruddy.vercel.app/blog/${blogPost.slug}` : ""}`,
      htmlBody: htmlContent,
      message: "Resend API Key is missing. Launching desktop email client."
    });

  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to initiate newsletter broadcast" },
      { status: 500 }
    );
  }
}
