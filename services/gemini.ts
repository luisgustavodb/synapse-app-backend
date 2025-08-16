import { GoogleGenAI, Chat } from "@google/genai";

export const DEFAULT_SYSTEM_INSTRUCTION = "Você é o Synapse, um companheiro de bem-estar de IA amigável e empático. Seu objetivo é fornecer conversas de apoio, úteis e educativas sobre bem-estar mental, gerenciamento de estresse e autocuidado. Você não é um terapeuta licenciado e deve lembrar gentilmente o usuário disso se ele pedir conselhos médicos, diagnóstico ou tratamento, sugerindo que consultem um profissional qualificado. Ofereça informações baseadas em evidências, exercícios de mindfulness e um ouvido atento. Mantenha seu tom caloroso, encorajador e sem julgamentos. Seu estilo de comunicação é claro, direto e alinhado com o público jovem adulto, sem ser excessivamente superficial.";

function createPersonalizedSystemInstruction(professionalName: string, specialty: string, bio: string): string {
    return `Você é ${professionalName}, um(a) profissional compassivo(a) e especialista em ${specialty}. Sua biografia é: "${bio}". Interaja com o usuário se apresentando e oferecendo ajuda com base na sua especialidade. Mantenha um tom profissional, mas caloroso e encorajador. Você não é um terapeuta licenciado de verdade e deve lembrar gentilmente o usuário disso se ele pedir conselhos médicos, diagnóstico ou tratamento, sugerindo que consultem um profissional qualificado do mundo real.`;
}

/**
 * Cria e retorna uma nova instância do Chat do Gemini.
 * Lança um erro se a chave de API não estiver configurada.
 */
export function createChat(isProfessional: boolean, name?: string, specialty?: string, bio?: string): Chat {
    if (!process.env.API_KEY) {
        throw new Error("A chave da API não está disponível. Por favor, configure a variável de ambiente API_KEY.");
    }

    let systemInstruction = DEFAULT_SYSTEM_INSTRUCTION;
    if (isProfessional && name && specialty && bio) {
        systemInstruction = createPersonalizedSystemInstruction(name, specialty, bio);
    }

    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const chat = ai.chats.create({
        model: 'gemini-2.5-flash',
        config: {
            systemInstruction: systemInstruction,
        },
    });
    
    return chat;
}