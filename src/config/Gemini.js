import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

const Model_Name = "gemini-2.5-flash";
const Api_Key = "AIzaSyA6EPQtzGaacnK-MQtKs2H-vyT2mOWWY9I";

async function runChat(prompt) {
  const genAI = new GoogleGenerativeAI(Api_Key);
  const model = genAI.getGenerativeModel({ model: Model_Name });

  const generationConfig = {
    temperature: 0.9,
    topK: 1, 
    topP: 1,
    maxOutputTokens: 2048,
  };

  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
  ];

  const chat = model.startChat({
    generationConfig,
    safetySettings,
    history: [
    ],
  });

  const result = await chat.sendMessage(prompt);
  const response = result.response;
  console.log(response.text());
  return response.text()
}

export default runChat;
   