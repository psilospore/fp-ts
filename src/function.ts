import { HKT } from './HKT'

/**
 * @since 2.0.0
 */
export const identity = <A>(a: A): A => {
  return a
}

/**
 * @since 2.0.0
 */
export const unsafeCoerce: <A, B>(a: A) => B = identity as any

/**
 * Thunk type
 */
export type Lazy<A> = () => A

/**
 * @example
 * import { FunctionN } from 'fp-ts/lib/function'
 *
 * export const sum: FunctionN<[number, number], number> = (a, b) => a + b
 *
 * @since 2.0.0
 */
export type FunctionN<A extends Array<unknown>, B> = (...args: A) => B

export type Curried2<A, B, C> = (a: A) => (b: B) => C
export type Curried3<A, B, C, D> = (a: A) => (b: B) => (c: C) => D
export type Curried4<A, B, C, D, E> = (a: A) => (b: B) => (c: C) => (d: D) => E
export type Curried5<A, B, C, D, E, F> = (a: A) => (b: B) => (c: C) => (d: D) => (e: E) => F
export type Curried6<A, B, C, D, E, F, G> = (a: A) => (b: B) => (c: C) => (d: D) => (e: E) => (f: F) => G
export type Curried7<A, B, C, D, E, F, G, H> = (a: A) => (b: B) => (c: C) => (d: D) => (e: E) => (f: F) => (g: G) => H
export type Curried8<A, B, C, D, E, F, G, H, I> = (
  a: A
) => (b: B) => (c: C) => (d: D) => (e: E) => (f: F) => (g: G) => (h: H) => I
export type Curried9<A, B, C, D, E, F, G, H, I, J> = (
  a: A
) => (b: B) => (c: C) => (d: D) => (e: E) => (f: F) => (g: G) => (h: H) => (i: I) => J

export type Predicate<A> = (a: A) => boolean

export type Refinement<A, B extends A> = (a: A) => a is B

/**
 * @since 2.0.0
 */
export const not = <A>(predicate: Predicate<A>): Predicate<A> => {
  return a => !predicate(a)
}

/**
 * @since 2.0.0
 */
export function or<A, B1 extends A, B2 extends A>(p1: Refinement<A, B1>, p2: Refinement<A, B2>): Refinement<A, B1 | B2>
export function or<A>(p1: Predicate<A>, p2: Predicate<A>): Predicate<A>
export function or<A>(p1: Predicate<A>, p2: Predicate<A>): Predicate<A> {
  return a => p1(a) || p2(a)
}

/**
 * @since 2.0.0
 */
export const and = <A>(p1: Predicate<A>, p2: Predicate<A>): Predicate<A> => {
  return a => p1(a) && p2(a)
}

export type Endomorphism<A> = (a: A) => A

export type BinaryOperation<A, B> = (a1: A, a2: A) => B

export type Kleisli<F, A, B> = (a: A) => HKT<F, B>
export type Cokleisli<F, A, B> = (fa: HKT<F, A>) => B

/**
 * @since 2.0.0
 */
export const constant = <A>(a: A): Lazy<A> => {
  return () => a
}

/**
 * A thunk that returns always `true`
 *
 * @since 2.0.0
 */
export const constTrue = (): boolean => {
  return true
}

/**
 * A thunk that returns always `false`
 *
 * @since 2.0.0
 */
export const constFalse = (): boolean => {
  return false
}

/**
 * A thunk that returns always `null`
 *
 * @since 2.0.0
 */
export const constNull = (): null => {
  return null
}

/**
 * A thunk that returns always `undefined`
 *
 * @since 2.0.0
 */
export const constUndefined = (): undefined => {
  return
}

/**
 * A thunk that returns always `void`
 *
 * @since 2.0.0
 */
export const constVoid = (): void => {
  return
}

/**
 * Flips the order of the arguments of a function of two arguments
 *
 * @since 2.0.0
 */
export function flip<A, B, C>(f: (a: A, b: B) => C): ((b: B, a: A) => C) {
  return (b, a) => f(a, b)
}

/**
 * The `on` function is used to change the domain of a binary operator
 *
 * @since 2.0.0
 */
export const on = <B, C>(op: BinaryOperation<B, C>) => <A>(f: (a: A) => B): BinaryOperation<A, C> => {
  return (x, y) => op(f(x), f(y))
}

/**
 * @since 2.0.0
 */
export function pipe<A, B, C>(ab: (a: A) => B, bc: (b: B) => C): (a: A) => C
export function pipe<A, B, C, D>(ab: (a: A) => B, bc: (b: B) => C, cd: (c: C) => D): (a: A) => D
export function pipe<A, B, C, D, E>(ab: (a: A) => B, bc: (b: B) => C, cd: (c: C) => D, de: (d: D) => E): (a: A) => E
export function pipe<A, B, C, D, E, F>(
  ab: (a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F
): (a: A) => F
export function pipe<A, B, C, D, E, F, G>(
  ab: (a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
  fg: (f: F) => G
): (a: A) => G
export function pipe<A, B, C, D, E, F, G, H>(
  ab: (a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
  fg: (f: F) => G,
  gh: (g: G) => H
): (a: A) => H
export function pipe<A, B, C, D, E, F, G, H, I>(
  ab: (a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
  fg: (f: F) => G,
  gh: (g: G) => H,
  hi: (h: H) => I
): (a: A) => I
export function pipe<A, B, C, D, E, F, G, H, I, J>(
  ab: (a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
  fg: (f: F) => G,
  gh: (g: G) => H,
  hi: (h: H) => I,
  ij: (i: I) => J
): (a: A) => J
export function pipe(...fns: Array<Function>): Function {
  const len = fns.length - 1
  return function(this: any, x: any) {
    let y = x
    for (let i = 0; i <= len; i++) {
      y = fns[i].call(this, y)
    }
    return y
  }
}

/**
 * @since 2.0.0
 */
export const tuple = <T extends Array<any>>(...t: T): T => {
  return t
}

/**
 * Applies a function to an argument ($)
 *
 * @since 2.0.0
 */
export const apply = <A, B>(f: (a: A) => B) => (a: A): B => {
  return f(a)
}

/**
 * Applies an argument to a function (#)
 *
 * @since 2.0.0
 */
export const applyFlipped = <A>(a: A) => <B>(f: (a: A) => B): B => {
  return f(a)
}

/**
 * For use with phantom fields
 *
 * @since 2.0.0
 */
export const phantom: any = undefined

/**
 * @since 2.0.0
 */
export const increment = (n: number): number => {
  return n + 1
}

/**
 * @since 2.0.0
 */
export const decrement = (n: number): number => {
  return n - 1
}
