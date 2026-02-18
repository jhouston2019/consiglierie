import { z } from 'zod';

export const processingRequestSchema = z.object({
  input_text: z.string().min(1, 'Input text required').max(10000, 'Input too long'),
  input_mode: z.enum(['free_write', 'question', 'scenario', 'decision', 'emotional', 'identity']),
  active_lens: z.enum(['adaptive', 'strategist', 'therapist', 'philosopher', 'shadow', 'non_dual', 'manifestation']),
  depth_level: z.number().min(1).max(4),
  brutal_mode: z.boolean(),
});

export type ProcessingRequestSchema = z.infer<typeof processingRequestSchema>;

export function validateProcessingRequest(data: unknown): ProcessingRequestSchema {
  return processingRequestSchema.parse(data);
}
