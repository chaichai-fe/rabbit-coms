import { test, expect } from '@playwright/experimental-ct-react'
import { ImgPreview } from '../src/core/index'
import { imgList } from '../src/core/ImgPreview/mock'
import React from 'react'

test('ImgPrew init render', async ({ mount }) => {
  const component = await mount(<ImgPreview imgList={imgList} />)
  await expect(component.getByTestId('large')).toBeHidden()

  await expect(component.getByAltText('middleImg')).toBeVisible()

  await expect(
    await component.getByAltText('middleImg').getAttribute('src')
  ).toBe(imgList[0])
})

test('small click change', async ({ mount }) => {
  const component = await mount(<ImgPreview imgList={imgList} />)
  await component.getByTestId('small-1').click()
  await expect(
    await component.getByAltText('middleImg').getAttribute('src')
  ).toBe(imgList[1])

  await component.getByTestId('small-2').click()
  await expect(
    await component.getByAltText('middleImg').getAttribute('src')
  ).toBe(imgList[2])
})
