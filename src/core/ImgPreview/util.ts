export const getBgPos = (elX: number, elY: number) => {
  let left = 0,
    top = 0

  if (elX < 100) {
    left = 0
  } else if (elX > 300) {
    left = 200
  } else {
    left = elX - 100
  }

  if (elY < 100) {
    top = 0
  } else if (elY > 300) {
    top = 200
  } else {
    top = elY - 100
  }

  return {
    left,
    top,
    posX: -left * 2,
    posY: -top * 2,
  }
}
