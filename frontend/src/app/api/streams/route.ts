import crypto from "crypto";

// In-memory storage for stream links
let streamChannels = {
  video: {
    id: "video",
    name: "Live Video",
    type: "video" as const,
    link: "",
  },
  audio: {
    id: "audio",
    name: "Live Audio",
    type: "audio" as const,
    link: "",
  },
};

// In-memory session storage (expires after 1 hour of inactivity)
let adminSessions = new Map<string, { createdAt: number }>();
const SESSION_DURATION = 60 * 60 * 1000; // 1 hour

// Generate a secure random token
function generateToken() {
  return crypto.randomBytes(32).toString("hex");
}

// Validate session token
function isValidSession(token: string): boolean {
  const session = adminSessions.get(token);
  if (!session) return false;

  const now = Date.now();
  const age = now - session.createdAt;

  if (age > SESSION_DURATION) {
    adminSessions.delete(token);
    return false;
  }

  // Refresh session timestamp
  session.createdAt = now;
  return true;
}

export async function GET(request: Request) {
  // Check for valid session token in headers
  const token = request.headers.get("x-admin-token");

  // For read-only access (no token needed)
  return Response.json(streamChannels);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, password, token, channelType, link } = body;

    const ADMIN_PASSWORD = "blast2026";

    // Action 1: Login with password, get token
    if (action === "login") {
      if (password !== ADMIN_PASSWORD) {
        return Response.json({ error: "Unauthorized" }, { status: 401 });
      }

      const newToken = generateToken();
      adminSessions.set(newToken, { createdAt: Date.now() });

      return Response.json({ token: newToken, message: "Login successful" });
    }

    // Action 2: Update stream (requires valid token)
    if (action === "update") {
      if (!token || !isValidSession(token)) {
        return Response.json(
          { error: "Invalid or expired session" },
          { status: 401 },
        );
      }

      if (!channelType || !["video", "audio"].includes(channelType)) {
        return Response.json(
          { error: "Invalid channel type" },
          { status: 400 },
        );
      }

      streamChannels[channelType as "video" | "audio"].link = link;

      return Response.json(streamChannels);
    }

    // Action 3: Logout
    if (action === "logout") {
      if (token) {
        adminSessions.delete(token);
      }
      return Response.json({ message: "Logged out" });
    }

    return Response.json({ error: "Invalid action" }, { status: 400 });
  } catch (error) {
    return Response.json({ error: "Invalid request" }, { status: 400 });
  }
}
