export const EffectHighlight = () => {
  return (
    <>
      <span aria-hidden className='group-hover/btn:opacity-100 block transition opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-primary to-transparent' />
      <span aria-hidden className='group-hover/btn:opacity-100 blur-sm block transition opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-primary to-transparent' />
    </>
  )
}