import Skeleton from '@mui/material/Skeleton'

type Props = {
  style?: 'wave' | 'pulse'
  height: number | string
}
/**
 * PatientIdCardSkeleton * @param style style of the skeleton animation pulse | wave
 * @height css style either as number or string of px or em or rem
 * @returns JSX
 */
export default function PatientIdCardSkeleton({
  style = 'wave',
  height,
}: Props) {
  return (
    <Skeleton
      animation={style}
      width={'full'}
      height={height}
      sx={{ borderRadius: '10px' }}
    />
  )
}
