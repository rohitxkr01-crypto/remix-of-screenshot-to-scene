import { createFileRoute } from "@tanstack/react-router";
import { GatewayError, streamResponse } from "@lovable.dev/ai-gateway";

import { SYSTEM_PROMPT, sanitizeChatHistory } from "@/lib/hospital-assistant";

const FALLBACK_ERROR =
  "माफ गर्नुहोस्, अहिले जवाफ दिन सकिएन। कृपया केही समयपछि फेरि प्रयास गर्नुहोस् वा अस्पताललाई +977 41-591584 मा फोन गर्नुहोस्।";

// Public on purpose: the website chatbot is open to every visitor. It only answers from the
// fixed hospital FAQ prompt and never reads private data; input size is capped by sanitizeChatHistory.
export const Route = createFileRoute("/api/public/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let body: unknown;
        try {
          body = await request.json();
        } catch {
          return Response.json({ error: "Invalid request" }, { status: 400 });
        }
        const history = sanitizeChatHistory(body);
        if (!history) {
          return Response.json({ error: "Invalid request" }, { status: 400 });
        }

        let stream: Awaited<ReturnType<typeof streamResponse<"openai/gpt-6-astra">>>;
        try {
          stream = await streamResponse(
            {
              model: "openai/gpt-6-astra",
              instructions: SYSTEM_PROMPT,
              input: history.map((t) => ({ role: t.role, content: t.content })),
              reasoning: { effort: "low" },
            },
            { signal: request.signal },
          );
        } catch (error) {
          console.error("chat start failed", error instanceof GatewayError ? error.toJSON() : error);
          const status = error instanceof GatewayError && error.httpStatus === 429 ? 429 : 502;
          return Response.json({ error: FALLBACK_ERROR }, { status });
        }

        const encoder = new TextEncoder();
        const body$ = new ReadableStream<Uint8Array>({
          async start(controller) {
            let wrote = false;
            try {
              for await (const event of stream) {
                if (event.type === "response.output_text.delta") {
                  wrote = true;
                  controller.enqueue(encoder.encode(event.delta));
                }
              }
            } catch (error) {
              console.error("chat stream failed", error);
              controller.enqueue(encoder.encode((wrote ? "\n\n" : "") + FALLBACK_ERROR));
            } finally {
              controller.close();
            }
          },
        });

        return new Response(body$, {
          headers: {
            "content-type": "text/plain; charset=utf-8",
            "cache-control": "no-store",
          },
        });
      },
    },
  },
});
