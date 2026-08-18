import { z } from 'zod';

export const swapFormSchema = z
  .object({
    fromToken: z.string().min(1, 'Select a token to swap from'),
    toToken: z.string().min(1, 'Select a token to receive'),
    fromAmount: z
      .number({ error: 'Enter a valid amount' })
      .positive('Amount must be greater than 0'),
  })
  .refine((data) => data.fromToken !== data.toToken, {
    message: 'From and to tokens must be different',
    path: ['toToken'],
  });

export type SwapFormValues = z.infer<typeof swapFormSchema>;
