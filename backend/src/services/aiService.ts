import axios from 'axios';

const AI_SERVICE_URL = process.env.AI_SERVICE_URL || 'http://localhost:8000';

export const extractTraits = async (answers: string[]) => {
    try {
        const response = await axios.post(`${AI_SERVICE_URL}/extract-traits`, { answers });
        return response.data.traits;
    } catch (error) {
        console.error('Error calling AI service:', error);
        return [];
    }
};

export const getCareerRecommendations = async (answers: string[]) => {
    try {
        console.log(`[AI Service] Requesting recommendations from: ${AI_SERVICE_URL}/recommend-careers`);
        console.log(`[AI Service] Payload:`, { answers });

        const response = await axios.post(`${AI_SERVICE_URL}/recommend-careers`, { answers });

        console.log(`[AI Service] Response status:`, response.status);
        console.log(`[AI Service] Data received:`, response.data);

        return response.data;
    } catch (error: any) {
        console.error('[AI Service] Error getting career recommendations:', error.message);
        if (error.response) {
            console.error('[AI Service] Response data:', error.response.data);
            console.error('[AI Service] Response status:', error.response.status);
        } else if (error.request) {
            console.error('[AI Service] No response received:', error.request);
        } else {
            console.error('[AI Service] Error setup:', error.message);
        }
        return { recommendations: [], analysis: "Could not generate analysis. Check backend logs for details." };
    }
};
