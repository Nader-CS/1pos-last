'use server';

import {revalidateTag} from 'next/cache';

export default async function serverRevalidateTag(tag) {
  revalidateTag(tag);
}
