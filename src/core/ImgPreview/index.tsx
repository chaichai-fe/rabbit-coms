import { MutableRefObject, useEffect, useRef, useState } from 'react'
import { imgPreviewClass } from './style'
import { useMouse } from 'react-use'
import { getBgPos } from './util'

const imgList = [
  'https://yanxuan-item.nosdn.127.net/a68a4385df27f8664b318364f4cdae08.jpg',
  'https://yanxuan-item.nosdn.127.net/9563e807278f8ea35bb4356bfd583e22.jpg',
  'https://yanxuan-item.nosdn.127.net/ba5ca0e5d39a714540b554a6b547e3a3.jpg',
  'https://yanxuan-item.nosdn.127.net/714eb0cc1cdb64608f7ce25b4c5ab600.jpg',
  'https://yanxuan-item.nosdn.127.net/d0394c83f5e195d26e7c76dcbef6c217.jpg',
]

const useIsOutside = (ref: MutableRefObject<Element | null>) => {
  const [isOutside, setIsOutside] = useState(false)
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

const ImgPreview = () => {
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
          style={{
            backgroundImage: `url(${imgList[activeIndex]})`,
            backgroundPositionX: posX + 'px',
            backgroundPositionY: posY + 'px',
          }}
        ></div>
      )}
      <div className="middle" ref={ref}>
        <img src={imgList[activeIndex]} alt="" />
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
          <li key={index} onMouseEnter={() => setActiveIndex(index)}>
            <img src={url} alt="" />
          </li>
        ))}
      </ul>
    </div>
  )
}

export { ImgPreview }
