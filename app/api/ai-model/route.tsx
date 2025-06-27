import Constants from "@/data/Constants";
import { NextRequest } from "next/server";
import OpenAI from "openai"

const openai = new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: process.env.NEXT_PUBLIC_OPENROUTER_AI_API_KEY,
})

export const maxDuration = 300;

export async function POST(req: NextRequest) {
    const { model, description, imageUrl } = await req.json();

    const ModelObj = Constants.AiModelList.find(item => item.name == model)
    const modelName = ModelObj?.modelName;
    console.log(modelName);

    if (!imageUrl || !imageUrl.startsWith('data:image/')) {
        return new Response('Formato de imagen inválido', { status: 400 });
    }

    // Construcción del prompt específico para wireframes
    const wireframePrompt = `${Constants.WIREFRAME_TO_CODE_PROMPT}

USER DESCRIPTION/REQUIREMENTS:
${description}

IMPORTANT: Look at the wireframe image carefully and recreate EXACTLY what you see. Don't create a generic website - follow the wireframe structure, layout, and content precisely.`;

    console.log("Using Wireframe-Specific Prompt:", wireframePrompt);

    const response = await openai.chat.completions.create({
        model: modelName ?? 'google/gemini-2.0-flash-001', // Cambiado a Flash que es mejor para imágenes
        stream: true,
        temperature: 0.1, // Más determinístico
        max_tokens: 4000,
        messages: [
            {
                "role": "system",
                "content": "You are an expert React developer who converts wireframes to pixel-perfect code. Always analyze the wireframe image first, then code exactly what you see."
            },
            {
                "role": "user",
                "content": [
                    {
                        "type": "text",
                        "text": wireframePrompt
                    },
                    {
                        "type": "image_url",
                        "image_url": {
                            "url": imageUrl
                        }
                    }
                ]
            }
        ]
    });

    // Create a readable stream to send data in real-time
    const stream = new ReadableStream({
        async start(controller) {
            try {
                for await (const chunk of response) {
                    const text = chunk.choices?.[0]?.delta?.content || "";
                    controller.enqueue(new TextEncoder().encode(text));
                }
            } catch (error) {
                console.error('Stream error:', error);
                controller.error(error);
            } finally {
                controller.close();
            }
        },
    });

    return new Response(stream, {
        headers: {
            "Content-Type": "text/plain; charset=utf-8",
        },
    });
}