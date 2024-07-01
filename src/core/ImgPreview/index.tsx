import { MutableRefObject, useEffect, useRef, useState } from 'react'
import { imgPreviewClass } from './style'
import { useMouse } from 'react-use'
import { getBgPos } from './util'

const useIsOutside = (ref: MutableRefObject<Element | null>) => {
  const [isOutside, setIsOutside] = useState(true)
  const mouseenterHandler = () => setIsOutside(false)
  const mouseleaveHandler = () => setIsOutside(true)

  useEffect(() => {
    ref.current?.addEventListener('mouseenter', mouseenterHandler)
    ref.current?.addEventListener('mouseleave', mouseleaveHandler)

    return () => {
      ref.current?.removeEventListener('mouseenter', mouseenterHandler)
      ref.current?.removeEventListener('mouseleave', mouseleaveHandler)
    }
  }, [])
  return isOutside
}

type Props = {
  imgList: string[]
}

const ImgPreview = (props: Props) => {
  const { imgList } = props

  const [activeIndex, setActiveIndex] = useState(0)
  const ref = useRef<HTMLDivElement | null>(null)
  const { elX, elY } = useMouse(ref)
  const { left, top, posX, posY } = getBgPos(elX, elY)
  const isOutside = useIsOutside(ref)
  return (
    <div className={imgPreviewClass}>
      {!isOutside && (
        <div
          className="large"
          data-testid="large"
          style={{
            backgroundImage: `url(${imgList[activeIndex]})`,
            backgroundPositionX: posX + 'px',
            backgroundPositionY: posY + 'px',
          }}
        ></div>
      )}
      <div className="middle" ref={ref} data-testid="middle">
        <img src={imgList[activeIndex]} alt="middleImg" />
        {!isOutside && (
          <div
            className="layer"
            style={{
              left: left + 'px',
              top: top + 'px',
            }}
          ></div>
        )}
      </div>
      <ul className="small">
        {imgList.map((url, index) => (
          <li
            data-testid={`small-${index}`}
            key={index}
            onMouseEnter={() => setActiveIndex(index)}
          >
            <img src={url} alt="" />
          </li>
        ))}
      </ul>
    </div>
  )
}

export { ImgPreview }
