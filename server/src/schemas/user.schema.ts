import { z } from 'zod'

export const createUserSchema = z.object({
  name: z.string(),
  email: z.string().email(),
})

export type CreateUserSchema = z.infer<typeof createUserSchema>

export const requestOtpSchema = z.object({
  email: z.string().email(),
  redirect: z.string().default('/'),
})

export type RequestOtpSchema = z.infer<typeof requestOtpSchema>

export const verifyOtpSchema = z.object({
  hash: z.string(),
})

export type VerifyOtpSchema = z.infer<typeof verifyOtpSchema>