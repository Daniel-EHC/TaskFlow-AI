import * as chrono from 'chrono-node';
import { Category, Priority } from '../types';
import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = process.env.VITE_AI_API_KEY;

interface AIAnalysis {
  category: Category;
  priority: Priority;
  dueDate: Date | null;
  aiReasoning: string;
}

export async function analyzeTodoWithAI(text: string): Promise<AIAnalysis> {
  if (!apiKey) {
    console.warn('Missing AI API key. Using default categorization.');
    return getDefaultAnalysis(text);
  }

  try {
    // Initialize Gemini AI using GoogleGenerativeAI
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    // Build the prompt with instructions and the todo text
    const prompt = `You are a helpful assistant that analyzes todo items. For each todo, you must return a JSON object with exactly these fields:
      - category: one of [groceries, work, personal, health, home, social, other]
      - priority: one of [low, medium, high]
      - reasoning: a brief explanation of your choices

      Todo: ${text}`;

    // Generate content using gemini
    const result = await model.generateContent(prompt);
    const content = result.response.text();

    if (!content) {
      throw new Error('Empty response from Gemini AI');
    }

    // Try to extract JSON from the response
    let parsedResult;
    try {
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      parsedResult = jsonMatch ? JSON.parse(jsonMatch[0]) : null;
      if (!parsedResult) {
        throw new Error('No valid JSON found in response');
      }
    } catch (e) {
      console.warn('Failed to parse AI response as JSON:', e);
      return getDefaultAnalysis(text);
    }

    return {
      category: validateCategory(parsedResult.category) || guessCategory(text),
      priority: validatePriority(parsedResult.priority) || guessPriority(text),
      dueDate: chrono.parseDate(text),
      aiReasoning: parsedResult.reasoning || 'No reasoning provided'
    };
  } catch (error) {
    console.error('AI Analysis with Gemini failed:', error);
    return getDefaultAnalysis(text);
  }
}

function validateCategory(category: string): Category | null {
  const validCategories: Category[] = ['groceries', 'work', 'personal', 'health', 'home', 'social', 'other'];
  return validCategories.includes(category as Category) ? category as Category : null;
}

function validatePriority(priority: string): Priority | null {
  const validPriorities: Priority[] = ['low', 'medium', 'high'];
  return validPriorities.includes(priority as Priority) ? priority as Priority : null;
}

function getDefaultAnalysis(text: string): AIAnalysis {
  return {
    category: guessCategory(text),
    priority: guessPriority(text),
    dueDate: chrono.parseDate(text),
    aiReasoning: 'Using basic text analysis since AI service is unavailable.'
  };
}

// Simple heuristic categorization when AI is unavailable
function guessCategory(text: string): Category {
  const lower = text.toLowerCase();
  if (lower.includes('buy') || lower.includes('grocery') || lower.includes('food')) return 'groceries';
  if (lower.includes('work') || lower.includes('meeting') || lower.includes('project')) return 'work';
  if (lower.includes('doctor') || lower.includes('gym') || lower.includes('exercise')) return 'health';
  if (lower.includes('clean') || lower.includes('fix') || lower.includes('house')) return 'home';
  if (lower.includes('call') || lower.includes('meet') || lower.includes('party')) return 'social';
  if (lower.includes('personal') || lower.includes('self')) return 'personal';
  return 'other';
}

// Simple heuristic priority detection when AI is unavailable
function guessPriority(text: string): Priority {
  const lower = text.toLowerCase();
  if (lower.includes('urgent') || lower.includes('asap') || lower.includes('important')) return 'high';
  if (lower.includes('soon') || lower.includes('tomorrow')) return 'medium';
  return 'low';
}