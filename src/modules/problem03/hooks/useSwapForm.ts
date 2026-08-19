import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTokenPrices } from './useTokenPrices';
import { swapFormSchema, type SwapFormValues } from '../schema';
import type { TypeSubmitState } from '../types';
import { exchangeTokens } from '../helpers/exchangeTokens';
import { toAmount } from '../helpers/toAmount';
import { useToast } from '../../../shares/modules/Toast';

export const useSwapForm = () => {
  const toast = useToast();
  const { tokens, isLoading, error: tokensError } = useTokenPrices();
  const [submitState, setSubmitState] = useState<TypeSubmitState>({
    status: 'idle',
  });

  const {
    control,
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<SwapFormValues>({
    resolver: zodResolver(swapFormSchema),
    defaultValues: {
      fromToken: '',
      toToken: '',
    },
  });

  const fromTokenSymbol = watch('fromToken');
  const toTokenSymbol = watch('toToken');
  const fromAmount = watch('fromAmount');
  const fromToken = exchangeTokens(tokens, fromTokenSymbol);
  const toToken = exchangeTokens(tokens, toTokenSymbol);

  const toAmountTransferred = toAmount({ fromToken, toToken, fromAmount });

  const handleFlip = () => {
    const values = getValues();
    setValue('fromToken', values.toToken, { shouldValidate: true });
    setValue('toToken', values.fromToken, { shouldValidate: true });
  };

  const onSubmit = handleSubmit(
    async (values) => {
      setSubmitState({ status: 'submitting' });
      // No real swap backend — simulate network latency for the demo.
      await new Promise((resolve) => setTimeout(resolve, 800));
      setSubmitState({
        status: 'success',
        message: `Swapped ${values.fromAmount} ${values.fromToken} for ${toAmountTransferred.toFixed(6)} ${values.toToken}`,
      });
    },
    (errors) => {
      if (errors?.fromAmount) {
        toast.error(`${errors.fromAmount.message}`);
      }
    },
  );

  return {
    tokens,
    isLoading,
    tokensError,
    control,
    register,
    errors,
    fromTokenSymbol,
    toTokenSymbol,
    toAmountTransferred,
    submitState,
    handleFlip,
    onSubmit,
  };
};
