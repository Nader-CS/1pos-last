'use client';

import {ErrorView} from '@/components';

export default function Error({error, reset}) {
  return <ErrorView hasError={true} error={error} onRetry={reset} />;
}
