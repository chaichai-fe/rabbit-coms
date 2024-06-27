import { useEffect, useRef, useState } from 'react'
import { skuClass } from './style'
import { SkuGoods, SkuItem, SpecItem, ValueItem } from './type'
import { produce } from 'immer'
import classNames from 'classnames'
import { bwPowerSet } from './power-set'
// create path map
const getPathMap = (goods: SkuGoods) => {
  const pathMap: Record<string, string[]> = {}
  const effectiveSkus = goods.skus.filter((sku) => sku.inventory > 0)
  effectiveSkus.forEach((sku) => {
    const selectedValArr = sku.specs.map((val) => val.valueName)
    const valueArrPowerSet = bwPowerSet(selectedValArr)
    valueArrPowerSet.forEach((arr) => {
      const key = arr.join('*')
      if (pathMap[key]) {
        pathMap[key].push(sku.id)
      } else {
        pathMap[key] = [sku.id]
      }
    })
  })
  return pathMap
}

// get seleted value
const getSelectedValues = (goods: SkuGoods) => {
  const arr: (string | undefined)[] = []
  goods.specs.forEach((spec) => {
    const selectedVal = spec.values.find((value) => value.selected)
    arr.push(selectedVal ? selectedVal.name : undefined)
  })
  return arr
}

interface Props {
  goods: SkuGoods
  onSkuChange: (skuObj: SkuItem) => void
}

const Sku = (props: Props) => {
  const [goods, setGoods] = useState<SkuGoods>(() => props.goods)
  let pathMap = useRef<Record<string, string[]>>({})
  pathMap.current = getPathMap(goods)
  // toggle selected state
  const toggleSeleted = (spec: SpecItem, val: ValueItem) => {
    const nextGoods = produce(goods, (draftGoods) => {
      const targetSpec = draftGoods?.specs.find(
        (specItem) => specItem.id === spec.id
      )
      const targetVal = targetSpec?.values.find(
        (valItem) => valItem.name === val.name
      )

      if (targetVal) {
        if (targetVal?.selected) {
          targetVal.selected = false
        } else {
          targetSpec?.values.forEach((val) => (val.selected = false))
          targetVal.selected = true
        }
      }
    })

    if (nextGoods && pathMap.current) {
      setGoods(nextGoods)
      updateDisabledState(nextGoods, pathMap.current)
      changeSku(nextGoods)
    }
  }

  // init disabled state
  const initDisabledState = (
    goods: SkuGoods,
    pathMap: Record<string, string[]>
  ) => {
    const nextGoods = produce(goods, (draftGoods) => {
      draftGoods.specs.forEach((item) => {
        item.values.forEach((val) => {
          val.disabled = !pathMap[val.name]
        })
      })
    })
    setGoods(nextGoods)
  }

  // update disable state
  const updateDisabledState = (
    goods: SkuGoods,
    pathMap: Record<string, string[]>
  ) => {
    const nextGoods = produce(goods, (draftGoods) => {
      draftGoods.specs.forEach((item, i) => {
        const selectedValues = getSelectedValues(goods)
        item.values.forEach((val) => {
          if (val.selected) return
          const _seletedValues = [...selectedValues]
          _seletedValues[i] = val.name
          const key = _seletedValues.filter((value) => value).join('*')
          val.disabled = !pathMap[key]
        })
      })
    })
    setGoods(nextGoods)
  }

  const changeSku = (goods: SkuGoods) => {
    const index = getSelectedValues(goods).findIndex(
      (item) => item === undefined
    )

    if (index > -1) {
      console.log('找到了，信息不完整')
    } else {
      const key = getSelectedValues(goods).join('*')
      const skuIds = pathMap.current[key]
      const skuItem = goods.skus.find((item) => item.id === skuIds[0])
      if (skuItem) {
        props.onSkuChange(skuItem)
      }
    }
  }

  useEffect(() => {
    initDisabledState(goods, pathMap.current)
  }, [])

  return (
    <div className={skuClass}>
      {goods?.specs.map((spec) => (
        <dl key={spec.id}>
          <dt>{spec.name}</dt>
          <dd>
            {spec.values.map((val) =>
              val.picture ? (
                <img
                  src={val.picture}
                  key={val.picture}
                  onClick={() => toggleSeleted(spec, val)}
                  className={classNames({
                    selected: val.selected,
                    disabled: val.disabled,
                  })}
                />
              ) : (
                <span
                  key={val.name}
                  onClick={() => toggleSeleted(spec, val)}
                  className={classNames({
                    selected: val.selected,
                    disabled: val.disabled,
                  })}
                >
                  {val.name}
                </span>
              )
            )}
          </dd>
        </dl>
      ))}
    </div>
  )
}

export { Sku }
export type { SkuGoods }
